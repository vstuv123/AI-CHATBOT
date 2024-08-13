import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi } from "openai";


export const createChat = catchAsyncErrors(async (req, res, next) => {
    const { message } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new ErrorHandler("User not found.Please Login", 401));
    }

    //grab chats of user
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ role: "user", content: message });
    user.chats.push({ content: message, role: "user" })

    //send all chats with new one to open AI
    const config = configureOpenAI();
    const openAI = new OpenAIApi(config);
    //get latest response
    const chatResponse = await openAI.createChatCompletion({ model: "gpt-3.5-turbo", messages: chats })
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    res.status(200).json({ success: true, chats: user.chats });
})