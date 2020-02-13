import App from './app';
import * as bodyParser from 'body-parser';
import dotenv from "dotenv";
import loggerMiddleware from './middleware/logger';

// initialize configuration
dotenv.config();
const port:number = parseInt(process.env.SERVER_PORT);

const app = new App({
    port: port,
    controllers: [],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();