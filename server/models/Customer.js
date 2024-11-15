import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  visits: { type: Number, required: true, default: 0 }, 
  totalSpending: { type: Number, default: 0.0 },
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
