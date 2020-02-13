import Message from "../../models/message.model";
import {publish} from "./kafka.producer.helper";

const schedule: any = require('node-schedule');

export const scheduleMessagesProducer: any = (): void => {
    schedule.scheduleJob('*/5 * * * *', async function(){
        console.log('Running daily task scheduler.');
        let messages = await Message.findAll();
        publish('messages', messages);
    });
};