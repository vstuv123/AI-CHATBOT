import express from 'express';
import connection from './db/connect.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middleware/Error.js'
import userRouter from './routes/userRoute.js';
import chatRouter from './routes/chatRoute.js';
import dotenv from 'dotenv';

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught promise exception");
    process.exit(1);
})

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config({path: 'server/.env'});

app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1', userRouter);
app.use('/api/v1', chatRouter);

//middlewares
app.use(errorMiddleware);


const server = app.listen(PORT, () => {console.log(`Server running successfully on port ${PORT}`)})
connection();

process.on("unhandledRejection", (err) => {
    console.log('Error: ', err.message);
    console.log('Shutting down the server due to unhandled promise rejection');
    
    server.close(() => {
        process.exit(1);
    })
})