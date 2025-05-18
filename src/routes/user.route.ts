import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router
  .route('/users')
  .get(UserController.getUsers)
  .post(UserController.createUser);

export default router;