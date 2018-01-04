import Boom from 'boom';
import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as jwtGenerator from '../utils/jwt';
import { findTodo } from '../validators/todoValidator';
import * as userService from '../services/userService';
import * as todoService from '../services/todoService';
import { findUser, userValidator } from '../validators/userValidator';

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

// router.get('/:id/todo', userService.ensureToken, (req, res, next) => {   if
// (!req.query.search) {     let verified =
// jwtGenerator.verifyAccessToken(req.token);     //
// console.log('verified',verified);     if (!verified.userId) {
// res.sendStatus(403);     } else {       if (Number(req.params.id) ===
// verified.userId) {
//         todoService           .getUserTodos(req.params.id) .then(data =>
// res.json({ data: data, pagination: data.pagination }))  .catch(err =>
// next(err));         // next();       } else {         throw new
// Boom.forbidden('No no not allowed');       }     }   } else {     let
// verified = jwtGenerator.verifyAccessToken(req.token);     let searchTodo =
// req.query.search;     return todoService.searchTodo(searchTodo,
// verified.userId).then(data => res.json(data))       .catch(err => next(err));
//   }   // token.verifyAccessToken(req.token); });

/** get individual todo
 *
 */
router.get('/:id/todo', (req, res, next) => {
  /*
  if (!req.query.search) {
    let verified = jwtGenerator.verifyAccessToken(req.token);
    // console.log('verified',verified);

    if (!verified.userId) {
      res.sendStatus(403);
    } else {
      if (Number(req.params.id) === verified.userId) {
        */
  const paginate = req.query.page;
  if (!req.query.search) {
    todoService
      .getUserTodos(req.params.id, paginate)
      .then(data => {
        res.json(data);
      })
      .catch(err => next(err));
  } else {
    let searchTodo = req.query.search;

    return todoService
      .searchTodo(searchTodo, req.params.id)
      .then(data => res.json(data))
      .catch(err => next(err));
  }

  // next(); } else {   throw new Boom.forbidden('No no not allowed'); }   } }
  // else { let verified = jwtGenerator.verifyAccessToken(req.token); let
  // searchTodo = req.query.search; return todoService.searchTodo(searchTodo,
  // verified.userId).then(data => res.json(data))   .catch(err => next(err));
});
// token.verifyAccessToken(req.token); });

/*
with token
*/
/*
router.get('/:id/todo', userService.ensureToken, (req, res, next) => {
  if (!req.query.search) {
    let verified = jwtGenerator.verifyAccessToken(req.token);
    // console.log('verified',verified);

    if (!verified.userId) {
      res.sendStatus(403);
    } else {
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
  } else {
    let verified = jwtGenerator.verifyAccessToken(req.token);

    let searchTodo = req.query.search;
    return todoService.searchTodo(searchTodo, verified.userId).then(data => res.json(data))
      .catch(err => next(err));

  }
  // token.verifyAccessToken(req.token);
});
*/
router.get('/:id/todo/:todoId', userService.ensureToken, (req, res, next) => {
  let verified = jwtGenerator.verifyAccessToken(req.token);
  if (!verified.userId) {
    res.sendStatus(403);
  } else {
    if (Number(req.params.id) === verified.userId) {
      todoService
        .getTodo(req.params.todoId, req.params.id)
        .then(data => res.json({ data: data, pagination: data.pagination }))
        .catch(
          err => next(err) // .then(data => res.json({ data: data, pagination: data.pagination }))
        );
    } else {
      throw new Boom.forbidden('No no not allowed');
    }
  }
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

/**
 * without token
 */
// router.post('/:id/todo', (req, res, next) => {
//   // let verifiedId = jwtGenerator.verifyAccessToken(req.token); if
//   // (!verifiedId.userId) {   res.sendStatus(403); } else { if (req.params.id ==
//   // verifiedId.userId) {
//   // todoService .createTags(req.body);
//   // console.log('sushan',todoService.createUserTodos(req.params.id,req.body));

//   todoService
//     .createUserTodos(req.params.id, req.body)
//     .then(data => res.status(HttpStatus.CREATED).json(data))
//     .catch(err => next(err));
//   // } else {   throw new Boom.forbidden('No no not allowed'); } }

// });
/*
with token
*/

router.post('/:id/todo', userService.ensureToken, (req, res, next) => {
  let verifiedId = jwtGenerator.verifyAccessToken(req.token);
  // console.log(typeof req.params.id);

  if (!verifiedId.userId) {
    res.sendStatus(403);
  } else {
    if (+req.params.id === verifiedId.userId) {
      // todoService
      // .createTags(req.body);
      // console.log('sushan',todoService.createUserTodos(req.params.id,req.body));

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
router.put('/:id/todo/:todoId', findTodo, (req, res, next) => {
  todoService
    .updateTodo(req.params.todoId, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

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

/**
 * delete todo
 */
router.delete('/:id/todo/:todoId', findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.todoId)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});
/** with token
* router.delete('/:id/todo/:todoId', userService.ensureToken, findTodo, (req, res, next) => {
  let verifiedId = jwtGenerator.verifyAccessToken(req.token);
  if (!verifiedId.userId) {
    res.sendStatus(403);
  } else {
    if (req.params.id == verifiedId.userId) {
      todoService
        .deleteTodo(req.params.todoId)
        .then(data => res.status(HttpStatus.NO_CONTENT).json({data}))
        .catch(err => next(err));

    } else {
      throw new Boom.forbidden('no no not allowed');
    }
  }
});
 */
export default router;
