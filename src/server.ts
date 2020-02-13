import App from './app';
import * as bodyParser from 'body-parser';
import dotenv from "dotenv";
import {controllers} from "./app/controllers";
import loggerMiddleware from './middleware/logger';
import express from 'express';

// initialize configuration
dotenv.config();
const port:number = parseInt(process.env.SERVER_PORT);

const app = new App({
    port: port,
    controllers: controllers,
    middleWares: [
        express.json(),
        bodyParser.urlencoded({ extended: false }),
        express.urlencoded({extended: false}),
        loggerMiddleware
    ]
});

app.listen();