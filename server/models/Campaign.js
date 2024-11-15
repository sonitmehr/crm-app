import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  targetAudience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Audience' }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
