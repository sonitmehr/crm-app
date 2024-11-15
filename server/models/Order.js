import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  totalAmount: Number,
  items: Array,
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
