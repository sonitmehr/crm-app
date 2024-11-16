import mongoose from 'mongoose';

const audienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  criteria: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true }
});

const Audience = mongoose.model('Audience', audienceSchema);
export default Audience;
