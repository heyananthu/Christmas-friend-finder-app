import express from "express";
import Employee from "../model/Employee.js";
import nodemailer from "nodemailer";
import SibApiV3Sdk from '@sendinblue/client';


const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { email } = req.body;

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const newEmployee = new Employee(req.body);
    await newEmployee.save();

    res.json({ msg: "Employee added" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});


router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.delete("/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    await Employee.findByIdAndDelete(employeeId);
    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
})

router.post("/match", async (req, res) => {
  try {
    const employees = await Employee.find();

    if (employees.length < 2) {
      return res.status(400).json({ msg: "Need at least 2 employees" });
    }

    const shuffled = [...employees].sort(() => Math.random() - 0.5);

    let pairs = [];
    for (let i = 0; i < shuffled.length; i++) {
      const giver = shuffled[i];
      const receiver = shuffled[(i + 1) % shuffled.length];
      pairs.push({ giver, receiver });
    }

    const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
    brevo.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    for (let p of pairs) {

      const htmlTemplate = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">

  <h2 style="color:#d32f2f; text-align:center; margin-bottom:10px; font-size:32px;">
    🎄 Merry Christmas! 🎁
  </h2>

  <p style="color:#444; font-size:28px; font-size:15px;">
    Hi <b>${p.giver.name}</b>,
  </p>

  <p style="color:#444; font-size:15px; line-height:1.5;">
    Your Secret Santa match is ready!  
    This Christmas, let's make someone smile with a thoughtful gift. 🎅✨
  </p>

  <!-- MAIN MATCH BOX (Simple + Clean) -->
  <div style="
    background:#fff8f8;
    padding:15px;
    border-radius:8px;
    border-left:4px solid #d32f2f;
    margin:20px 0;
    text-align:center;
    box-shadow:0 2px 4px rgba(0,0,0,.1);
  ">
    <p style="margin:0; font-size:16px; color:#d32f2f;">
      <b>Your Christmas Friend:</b>
    </p>
    <p style="font-size:28px; color:#333; margin:5px 0 0;">
      <b>${p.receiver.name}</b>
    </p>
    <p style="font-size:14px; color:#666;">
      📧 ${p.receiver.email}
    </p>
  </div>

  <!-- DETAILS BOX (Light Style) -->
  <div style="
    background:#fffbe8;
    padding:15px;
    border-radius:8px;
    border-left:4px solid #f1c40f;
    margin-bottom:20px;
  ">
    <p style="margin:0 0 10px; font-size:15px; color:#d35400;">
      ⭐ <b>Interests & Preferences</b>
    </p>

    <p style="margin:4px 0; font-size:14px; color:#444;">
      <b>🎯 Interests:</b> ${p.receiver.interests || "Not provided"}
    </p>

  
  </div>

  <p style="color:#444; font-size:15px;">
    Choose something thoughtful and make their Christmas special! 🎄😊
  </p>

  <p style="color:#444; font-size:15px;">
    Warm wishes,<br/>
    <b>Team Voicene</b>
  </p>

</div>
`;

      await brevo.sendTransacEmail({
        sender: { name: "Voicene", email: process.env.SENDER_EMAIL },
        to: [{ email: p.giver.email }],
        subject: "🎄 Your Christmas Friend!",
        htmlContent: htmlTemplate // your same HTML
      });
    }

    res.json({ msg: "Match completed & Emails sent!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
