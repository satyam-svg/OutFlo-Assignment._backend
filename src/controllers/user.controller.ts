import { Request, Response } from 'express';

class UserController {
  static getUsers(req: Request, res: Response) {
    res.json([{ id: 1, name: 'John Doe' }]);
  }

  static createUser(req: Request, res: Response) {
    // Logic here
    res.status(201).json(req.body);
  }
}

export default UserController;