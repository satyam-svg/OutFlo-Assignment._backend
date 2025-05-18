import express from 'express';
import mainRouter from './routes/main.route';
import CampaignRouter from './routes/campaign.route'
import OutreachRouter from './routes/outreach.route'
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'https://out-flo-assignment-tawny.vercel.app', // Allow your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use('/api', mainRouter);
app.use('/api',CampaignRouter)
app.use('/api',OutreachRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});