import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();
const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ===================
// ჩვეულებრივი რეგისტრაცია
// ===================
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      provider: "local"
    });

    res.json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===================
// ჩვეულებრივი შესვლა
// ===================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===================
// გუგლით რეგისტრაცია / შესვლა
// ===================
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const [firstName, lastName] = payload.name.split(" ");
    const { email, picture, sub } = payload;

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        photo: picture,
        googleId: sub,
        provider: "google"
      });
    }

    res.json({ message: "Google login success", user });
  } catch (err) {
    res.status(500).json({ message: "Google auth failed", error: err.message });
  }
});

// ===================
// ფეისბუქ რეგისტრაცია / შესვლა
// ===================
router.post("/facebook", async (req, res) => {
  try {
    const { accessToken } = req.body;
    const fbRes = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`);
    const data = await fbRes.json();

    const [firstName, lastName] = data.name.split(" ");
    const email = data.email;
    const picture = data.picture?.data?.url;
    const facebookId = data.id;

    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        photo: picture,
        facebookId,
        provider: "facebook"
      });
    }

    res.json({ message: "Facebook login success", user });
  } catch (err) {
    res.status(500).json({ message: "Facebook auth failed", error: err.message });
  }
});

export default router;
