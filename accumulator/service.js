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
    console.log(arr);
    arr = arr.map(item => JSON.stringify(item));
    console.log(arr);
    client.execute(`INSERT INTO qm.ques (question, answer, topic) VALUES ('${ question }', [ ${ arr.map((item)=>item.replace(/"/g, "'")).join(",") } ], '${ topic }')`)
    .then(result => {
        console.log(result.rows);
    })
    .catch((err) => {
        throw err;
    });
}

export default { updateQuestions };