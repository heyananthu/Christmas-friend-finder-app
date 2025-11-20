import express from "express";
import Employee from "../model/Employee.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json({ msg: "Employee added" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

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

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER, // 9bf7xxxx@smtp-brevo.com
        pass: process.env.BREVO_PASS, // xsmtpsib-xxxxxx...
      },
    });

    for (let p of pairs) {

      const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:20px;">
  <div style="max-width:600px; margin:auto; background:white; border-radius:10px; padding:30px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

    <div style="text-align:center;">
      <h1 style="color:#d32f2f; font-size:28px; margin-bottom:10px;">
        🎄 Merry Christmas! 🎁
      </h1>
      <p style="color:#555; font-size:16px; margin-top:-10px;">
        Your Christmas Friend Finder Match is Here!
      </p>
    </div>

    <hr style="border:0; border-top:1px solid #eee; margin:25px 0;">

    <p style="font-size:16px; color:#444;">
      Hi <b>${p.giver.name}</b>,
    </p>

    <p style="font-size:16px; color:#444; line-height:1.6;">
      We’re excited to share that your Christmas Friend has been selected!  
      🎅✨ This season is all about surprises, joy, and spreading happiness.
    </p>

    <!-- MAIN MATCH CARD -->
    <div style="background:#fff4f4; padding:15px; border-left:4px solid #d32f2f; border-radius:5px; margin:20px 0; text-align:center;">
      <p style="font-size:18px; color:#d32f2f; margin:0;">
        🎁 <b>Your Christmas Friend:</b>
      </p>
      <p style="font-size:20px; color:#444; margin:5px 0 0;">
        <b>${p.receiver.name}</b>
      </p>
      <p style="font-size:15px; color:#555; margin-top:2px;">
        📧 ${p.receiver.email}
      </p>
    </div>

    <!-- EXTRA DETAILS SECTION -->
    <div style="background:#fef9e7; padding:15px; border-left:4px solid #f1c40f; border-radius:5px; margin:20px 0;">
      <p style="font-size:18px; color:#d35400; margin:0 0 10px 0;">
        ⭐ <b>Their Interests & Preferences</b>
      </p>

      <p style="font-size:15px; color:#444; margin:6px 0;">
        <b>🎯 Interests:</b> ${p.receiver.interests || "No interests provided"}
      </p>

      <p style="font-size:15px; color:#444; margin:6px 0;">
        <b>🎁 Gift Preferences:</b> ${p.receiver.preferences || "No specific preferences mentioned"}
      </p>
    </div>

    <p style="font-size:16px; color:#444; line-height:1.6;">
      Use these details to plan a thoughtful gift and make their Christmas even more special!  
      Small gestures can bring big smiles. 🎄😊
    </p>

    <p style="font-size:16px; color:#444;">
      Wishing you joy, laughter, and holiday cheer!
    </p>

    <div style="text-align:center; margin-top:20px;">
      <p style="font-size:14px; color:#888;">
        — Voicene Team 🎅✨
      </p>
    </div>

  </div>
</div>


      
<p>Enjoy the season!<br/></p>

      `;

      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: p.giver.email,
        subject: "🎄 Your Christmas Friend!",
        html: htmlTemplate,
      });
    }

    res.json({ msg: "Match completed & Emails sent!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
