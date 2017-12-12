import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as loginService from '../services/loginService';


const router = Router();

router.post('/', (req, res, next) => {
  // console.log(req.body);
  loginService
    .findUser(req.body)
    .then(data => res.json(data))
    .catch(err => next(err));
});

export default router;