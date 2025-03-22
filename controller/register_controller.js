import asyncHandler from "../middleware/asyncHandler.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

export const register = asyncHandler(async (req, res, next) => {
  try {
    const { email, name, password, isAdmin } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Мэдээлэлээ бүрэн оруулна уу",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Уучлаарай. Бүртгэлтэй хэрэглэгч байна",
      });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Бүртгэл үүсгэхэд алдаа гарлаа",
      error: error.message,
    });
  }
});
