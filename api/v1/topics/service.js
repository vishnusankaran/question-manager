import cassandra from 'cassandra-driver';

const client = new cassandra.Client({contactPoints: ['127.0.0.1']});

client.connect(function (err) {
    if (err) return console.error(err);
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
});

const getQuestions = (res, topic, { limit }) => {
    client.execute(`SELECT * FROM qm.ques WHERE topic = '${ topic }' LIMIT ${ limit }`)
        .then(result => {
            console.log(result.rows);
            res.status(200).send(result.rows);
        });
}

export default { getQuestions };