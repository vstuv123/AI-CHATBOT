import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors.js";
import User from "../models/userModel.js";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login first to access this resource", 400));
    }

    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
})

