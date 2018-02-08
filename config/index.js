export default {
	MONGO: {
		URL: (process.env.MONGO_URL || 'mongodb://localhost:27017/qm')
	},
	CASSANDRA: {
		URL: '127.0.0.1'
	},
	REDIS: {
		HOST: '127.0.0.1',
		PORT: 6379
	}
};