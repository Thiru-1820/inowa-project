const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema (For normal users)
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Interview Credentials Schema (For assigned credentials)
const InterviewCredentialSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true },
});
const InterviewCredential = mongoose.model(
  "InterviewCredential",
  InterviewCredentialSchema
);

// Generate Random Password
const generatePassword = () => crypto.randomBytes(4).toString("hex");

// Send Email Function
const sendEmail = async (email, password, company) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "therealbugbountyhunter@gmail.com",
      pass: "tgwg jqzd bpdq vomk",
    },
  });

  let mailOptions = {
    from: "hirepro@gmail.com",
    to: email,
    subject: `Your Exam Credentials for ${company}`,
    text: `Your credentials for ${company}:
Username: ${email}
Password: ${password}`,
  };

  await transporter.sendMail(mailOptions);
};

// API to Assign Interview Credentials
app.post("/api/assign-credentials", async (req, res) => {
  const { emails, company } = req.body;
  let credentials = [];
  let existingEmails = [];

  for (let email of emails) {
    const existingUser = await InterviewCredential.findOne({ email, company });
    if (existingUser) {
      existingEmails.push(email);
      continue;
    }

    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);

    await InterviewCredential.create({
      email,
      password: hashedPassword,
      company,
    });
    await sendEmail(email, password, company);

    credentials.push({ email, password, company });
  }

  if (existingEmails.length > 0) {
    return res.status(400).json({
      message: `The following email(s) already exist for this company: ${existingEmails.join(
        ", "
      )}`,
      credentials,
    });
  }

  res.json({ message: "Credentials assigned and emails sent", credentials });
});

// API to Verify Interview Credentials
app.post("/api/verify-credentials", async (req, res) => {
  const { email, password, company } = req.body;
  const user = await InterviewCredential.findOne({ email, company });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Credentials verified successfully" });
});

// User Signup API (For normal users)
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "Signup successful! You can now log in." });
  } catch (err) {
    res.status(500).json({ message: "Error signing up. Try again." });
  }
});

// User Login API (For normal users)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id, email: user.email }, "abc123", {
    expiresIn: "2h",
  });

  res.json({ token });
});

// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
