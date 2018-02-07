import mongoose from 'mongoose';

const schema = new mongoose.Schema({
        topic: { type: String, required: true },
        query: { type: String, required: true },
        questionTemplate: { type: String, required: true },
        answerTemplate: { type: String, required: true },
        distractors: {
            count: { type: Number, required: true, default: 3 },
            query: { type: String, required: true },
            distractorTemplate: { type: String, required: true }
        }
    }, { collection: 'stubs' });

export default mongoose.model('stub', schema);