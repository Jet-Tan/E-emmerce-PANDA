import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshToken,
  registerUserController,
  resetpassword,
  updateUserDetails,
  uploadAvatar,
  userDetails,
  verifyEmailController,
  verifyForgotPasswordOtp,
  userAll,
  deleteUser,
  updateUser,
  createUserController,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import { admin } from "../middleware/Admin.js";
const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.put("/reset-password", resetpassword);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);
userRouter.get("/user-all", auth, admin, userAll);
userRouter.delete("/delete-user", auth, admin, deleteUser);
userRouter.put("/update-user", auth, admin, updateUser);
userRouter.post("/create-user", auth, admin, createUserController);
export default userRouter;
