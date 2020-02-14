import MessageController from "../../controllers/message/message.controller";

const schedule: any = require('node-schedule');

export const scheduleMessagesProducer: any = (): void => {
     MessageController.publishMessages();
};