import cassandra from 'cassandra-driver';
import mongoose from 'mongoose';
import config from '../../../config';
import StubModal from './entity/stub';

mongoose.connect(config.MONGO.URL);
mongoose.connection.on('connected', function() {
    console.log('Mongoose is now connected to ', config.MONGO.URL);
});

const cassandraClient = new cassandra.Client({contactPoints: [config.CASSANDRA.URL]});
cassandraClient.connect(function (err) {
    if (err) return console.error(err);
    console.log('Connected to cluster with %d host(s): %j', cassandraClient.hosts.length, cassandraClient.hosts.keys());
});

const getQuestions = (res, topic, { limit }) => {
    cassandraClient.execute(`SELECT * FROM qm.ques WHERE topic = '${ topic }' LIMIT ${ limit }`)
        .then(result => {
            res.status(200).send(result.rows);
        });
}

const createStubs = (res, topic, { stubs }) => {
    StubModal.insertMany(stubs, {ordered:false}, (err, response) => {
        if (err) throw err;
        res.status(200).send(response);
    });
}

export default { getQuestions, createStubs };