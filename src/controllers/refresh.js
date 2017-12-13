import { Router } from 'express';
import * as userService from '../services/userService';
import * as jwtGenerator from '../utils/jwt';

const router = Router();

router.get('/', userService.ensureToken, (req, res, next) => {
  const verified = jwtGenerator.verifyRefreshToken(req.token);
  const id = verified.userId;
  if (!id) {
    res.sendStatus(403);
  }
  else {
    let accessToken = jwtGenerator.generateAccessToken(id);
    res.json({ "new access token": accessToken });
  }

});

export default router;