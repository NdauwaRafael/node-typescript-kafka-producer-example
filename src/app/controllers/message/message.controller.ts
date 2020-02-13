import IControllerBase from "../interfaces/IControllerBase.interface";
import express, {Request, Response} from "express";
import MessageControllerHelper from "./resource/message.controller.helper";
import faker from 'faker';

class MessageController implements IControllerBase {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/messages', this.index);
        this.router.post('/messages', this.post);
        this.router.post('/messages/fake', this.fake);
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

    fake = async (req: Request, res: Response) => {
        const {count} = req.body;
        for(var counter:number = 1; counter < parseInt(count); counter++){
            await MessageControllerHelper.saveMessage({
                title: faker.name.findName(),
                message: faker.lorem.paragraph()
            })
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