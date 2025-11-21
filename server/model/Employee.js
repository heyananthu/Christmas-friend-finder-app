import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  interests: String,
  // preferences: String,
});

export default mongoose.model("Employee", employeeSchema);
