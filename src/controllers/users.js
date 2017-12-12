import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as todoService from '../services/todoService';
import { findUser, userValidator } from '../validators/userValidator';
import jwt from 'jsonwebtoken';


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
  
  jwt.verify(req.token, process.env.SECRET_KEY, function (err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      if (req.params.id == data.user) {
        
        todoService
        .getUserTodos(req.params.id)
        .then(data => res.json( data ))
        .catch(err => next(err));
        
      }else{
        res.sendStatus(403);
      }
    }
  });
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
  jwt.verify(req.token, process.env.SECRET_KEY, function (err, data) {
    if (err) {
      
      res.sendStatus(403);
    } else {
      if (req.params.id == data.user) {
        todoService
          .createUserTodos(req.params.id, req.body)
          .then(data => res.status(HttpStatus.CREATED).json( data))
          .catch(err => next(err));

      } else {
        res.sendStatus(403);
      }
    }
  });  
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
