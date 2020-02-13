import IControllerBase from "../interfaces/IControllerBase.interface";
import express, {Request, Response} from "express";
import MessageControllerHelper from "./resource/message.controller.helper";
import Message from "../../models/message.model";

class MessageController implements IControllerBase {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/messages', this.index);
        this.router.post('/messages', this.post);
        this.router.post('/messages/fake/:count', this.fake);
    }

    index = async (req: Request, res: Response) => {
        try {
            let messages = await Message.findAll();
            res.status(200).send({
                message: "Success",
                messages
            })
        } catch (e) {
            res.status(422).send({
                message: 'failed'
            })
        }
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
        try {
            const faker: any = require('faker');
            const count = req.params.count;
            let messagesArray: any = [];
            for (var i = 0; i < parseInt(count); i++) {
                messagesArray.push({
                    title: faker.name.findName(),
                    message: faker.lorem.sentence()
                })
            }

            let messages = await Message.bulkCreate([
                ...messagesArray
            ]);

            // await MessageControllerHelper.saveMessage({
            //     title: faker.name.findName(),
            //     message: faker.lorem.sentence()
            // });


            res.status(200).send({
                message: "Success",
                messages,
                count
            })

        } catch (e) {
            res.status(422).send({
                message: 'failed',
                error: e
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