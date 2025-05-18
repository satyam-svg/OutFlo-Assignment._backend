import { Router, Request, Response } from 'express';
import userRoutes from './user.route';

const router = Router();

// Use user routes under /v1
router.use('/v1', userRoutes);

// Health Check with Proper Typing
router.get('/health', (req: Request, res: Response) => {
    res.send('OK');
});

export default router;
