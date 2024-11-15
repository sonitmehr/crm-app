import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import audienceRoutes from './routes/audienceRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import communicationLogRoutes from './routes/communicationLogRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/audience', audienceRoutes);
app.use('/api/campaign', campaignRoutes);
app.use('/api/communication-log', communicationLogRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
