import { Router } from 'express';
import * as loginService from '../services/loginService';

const router = Router();

router.post('/', (req, res, next) => {
  loginService
    .findUser(req.body)
    .then(data => {
      loginService.saveSession(data);
      res.json(data);
    })
    .catch(err => next(err));
  // next();
});

export default router;
