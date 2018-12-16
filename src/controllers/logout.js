import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as loginService from '../services/loginService';
import * as userService from '../services/userService';
import * as jwtGenerator from '../utils/jwt';

const router = Router();

router.get('/', userService.ensureToken, (req, res, next) => {
  const verified = jwtGenerator.verifyRefreshToken(req.token);
  const id = verified.userId;
  if (!id) {
    res.sendStatus(403);
  } else {
    loginService.deleteSession(verified);
    res.sendStatus(200);
  }
  // next();
});

// router.delete('/', (req, res, next) => {   console.log("kfldsjkfldsajkl
// jklfds jkls");   loginService     .findUser(req.body)     .then(data => {
//   loginService.deleteSession(data);       res.json(data);     })
// .catch(err => next(err)); });
export default router;
