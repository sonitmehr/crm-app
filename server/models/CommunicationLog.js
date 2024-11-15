import mongoose from 'mongoose';

const CommunicationLogSchema = new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  message: String,
  status: String,
});

const CommunicationLog = mongoose.model('CommunicationLog', CommunicationLogSchema);

export default CommunicationLog;
