CREATE KEYSPACE IF NOT EXISTS qm WITH REPLICATION = { 'class': 'SimpleStrategy', 'replication_factor': 1 };

USE qm;

CREATE TYPE IF NOT EXISTS answer (value text, isCorrect boolean);

CREATE TABLE IF NOT EXISTS ques (question text, answer list<frozen <answer>>, topic text, PRIMARY KEY (question));

CREATE INDEX IF NOT EXISTS topic_index ON qm.ques (topic);

INSERT INTO ques (question, answer, topic) VALUES ('What is your name?', [{ value: 'vishnu', isCorrect: true }, { value: 'jishnu', isCorrect: false}], 'cricket');

SELECT * FROM ques WHERE topic = 'cricket';