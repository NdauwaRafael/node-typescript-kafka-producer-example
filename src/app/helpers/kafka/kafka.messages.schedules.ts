import MessageController from "../../controllers/message/message.controller";

const schedule: any = require('node-schedule');

export const scheduleMessagesProducer: any = (): void => {
    schedule.scheduleJob('*/5 * * * *', async function () {
        console.log('Running daily task scheduler.');
        let messageObj = new MessageController;
        await messageObj.publishMessages();
    });
};