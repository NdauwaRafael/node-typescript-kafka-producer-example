
import { KafkaClient as Client, Producer, ProduceRequest} from 'kafka-node';

const kafkaHost: string = process.env.KAFKA_HOST || 'localhost:9092';

export const publish:any = (topic: string, message: string): void => {
    // The client connects to a Kafka broker
    const client = new Client({ kafkaHost });
    // The producer handles publishing messages over a topic
    const producer = new Producer(client);

    producer.on('ready', ():void=>{
        client.refreshMetadata(
            [topic],
            (err: Error): void=>{
                if (err) {
                    throw err;
                }

                console.log(`Sending message to ${topic}: ${message}`);

                producer.send(
                    [{ topic, messages: [message] }],
                    (err: Error, result: ProduceRequest): void => {
                        console.log(err || result);
                        process.exit();
                    }
                );
            }
        )
    });


    // Handle errors
    producer.on(
        'error',
        (err: Error): void => {
            console.log('error', err);
        }
    );

};