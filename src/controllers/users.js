import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as todoService from '../services/todoService';
import { findUser, userValidator } from '../validators/userValidator';
import jwt from 'jsonwebtoken';
import * as jwtGenerator from '../utils/jwt';
import * as token from '../utils/token';
import Boom from 'boom';
const router = Router();

/**
 * GET /api/users
 */

router.get('/', (req, res, next) => {
  userService
    .getAllUsers()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/users/:id
 */
router.get('/:id', (req, res, next) => {
  userService
    .getUser(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

router.get('/:id/todo', userService.ensureToken,(req,res,next)=>{
  if(!req.query.search){
  let verified = jwtGenerator.verifyAccessToken(req.token);
  // console.log('verified',verified);
  
   if(!verified.userId){
     res.sendStatus(403);
   }else{
     if (Number(req.params.id) === verified.userId) {
        todoService
          .getUserTodos(req.params.id)
          .then(data => res.json(data))
          .catch(err => next(err));
        // next();
      } else {
       throw new Boom.forbidden('No no not allowed');
      }
   }
  }else{
    let verified = jwtGenerator.verifyAccessToken(req.token);

    let searchTodo = req.query.search;
    return todoService.searchTodo(searchTodo, verified.userId).then(data => res.json(data))
      .catch(err => next(err));

  }
  // token.verifyAccessToken(req.token);
  });

/**
 * POST /api/users
 */
router.post('/', userValidator, (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

router.post('/:id/todo', userService.ensureToken,(req, res, next) => {
  let verifiedId = jwtGenerator.verifyAccessToken(req.token);
  if (!verifiedId.userId) {
    res.sendStatus(403);
  } else {
    if (req.params.id == verifiedId.userId) {
      todoService
        .createUserTodos(req.params.id, req.body)
        .then(data => res.status(HttpStatus.CREATED).json(data))
        .catch(err => next(err));
    } else {
      throw new Boom.forbidden('No no not allowed');
    }
  }

});



/**
 * PUT /api/users/:id
 */
router.put('/:id', findUser, userValidator, (req, res, next) => {
  userService
    .updateUser(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', findUser, (req, res, next) => {
  userService
    .deleteUser(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});


export default router;
