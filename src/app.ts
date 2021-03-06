import express from 'express'
import { Application } from 'express'
import {db} from "./app/helpers/database";
import {scheduleMessagesProducer} from "./app/helpers/kafka/kafka.messages.schedules";

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: any; }) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();
        this.syncDb();
        this.subscribeKafka();
    }

    private middlewares(middleWares: {forEach: (arg0: (middleware: any)=>void)=>void}){
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }

    private template() {
        this.app.set('view engine', 'ejs')
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }

    public syncDb(){
        db.sync();
    }

    public subscribeKafka(){
        // kafkaSubscribe();
        scheduleMessagesProducer();
    }
}

export default App;