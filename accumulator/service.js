import cassandra from 'cassandra-driver';

const client = new cassandra.Client({contactPoints: ['127.0.0.1']});

client.connect(function (err) {
    if (err) return console.error(err);
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
});


const updateQuestions = ({ topic, question, answer, distractors }) => {
    let arr = [ { value: answer, isCorrect: true }, ...(distractors.map((item) => ({
        value: item,
        isCorrect: false
    }))) ].sort(() => (.5 - Math.random()));
    let row = {
        question,
        topic,
        answer: arr
    };

    client.execute(`INSERT INTO qm.ques JSON '${ JSON.stringify(row) }'`);
}

export default { updateQuestions };