import redis from 'redis';
import service from './service';

const client = redis.createClient();

client.on('connect', function() {
    console.log('Connected to Redis');
});

const listen = () => {
    client.brpop('questions', 200, (listName, item) => {

    if (item)
        service.updateQuestions(JSON.parse(JSON.parse(JSON.stringify(item))[1]));

        process.nextTick(listen);
    });
}

export default { listen };