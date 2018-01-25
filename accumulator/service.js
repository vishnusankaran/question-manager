import cassandra from 'cassandra-driver';

const client = new cassandra.Client({contactPoints: ['127.0.0.1']});

client.connect(err => {
    if (err) return console.error(err);
    console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());

    client.execute(`CREATE KEYSPACE IF NOT EXISTS qm WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 };`);
    client.execute(`USE qm;`);
    client.execute(`CREATE TYPE IF NOT EXISTS answer (value text, isCorrect boolean);`);
    client.execute(`CREATE TABLE IF NOT EXISTS ques (question text, answer list<frozen <answer>>, topic text, PRIMARY KEY (question));`);
    client.execute(`CREATE INDEX IF NOT EXISTS topic_index ON qm.ques (topic);`);
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