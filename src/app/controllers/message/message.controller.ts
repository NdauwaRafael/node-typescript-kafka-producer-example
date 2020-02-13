import IControllerBase from "../interfaces/IControllerBase.interface";
import express, {Request, Response} from "express";
import Message from "../../models/message.model";
import MessageControllerHelper from "./resource/message.controller.helper";

class MessageController implements IControllerBase {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/messages', this.index)
        this.router.post('/messages', this.post)
    }

    index = (req: Request, res: Response) => {

    };

    post = async (req: Request, res: Response) => {
        try {
           let message = await MessageControllerHelper.saveMessage(req.body);
           console.log(message);
           
        } catch (e) {
            console.log(e, 'error saving message')
        }
    };

    public async save(message: any) {
        try {
            await MessageControllerHelper.saveMessage(message)
        } catch (e) {
            console.log(e, 'error saving message')
        }
    }

}

export default MessageController;