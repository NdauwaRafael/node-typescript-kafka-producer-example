import Message from "../../../models/message.model";

export default class MessageControllerHelper {
    static saveMessage(msg: any) {
        const {
            title,
            message
        } = msg;

        return Message.create({
            message,
            title
        })
    }

    static loadAll(){
        return Message.findAll();
    }

}