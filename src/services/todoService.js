import Boom from 'boom';
import Todo from '../models/todo';
import TodoOfUsers from '../models/user';
import UsersOfTodo from '../models/todo';


/**
 * Get all lists.
 *
 * @return {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll();
}

/**
 * Get a list.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(id) {
  return new Todo({ id }).fetch().then(todo => {
    if (!todo) {
      throw new Boom.notFound('todo not found');
    }

    return todo;
  });
}

/***get individual todos
 * 
 */
export function getUserTodos(userId) { //user id
  return new UsersOfTodo({user_id:userId}).fetch()
  .then(todo => {
    if (!todo) {
      throw new Boom.notFound('todo not found');
    }

    return todo;
  });
   

}
// export function getUserTodos(userId){ //user id
//   return new Todo().query({ where: { user_id: userId } }).fetch().then(todo => {
//     if (!todo) {
//       throw new Boom.notFound('todo not found');
//     }

//     return todo;
//   });

// }

/**
 * Create new vehicleObj.
 *
 * @param  {Object}  todoObj
 * @return {Promise}
 */
export function createTodo(todoObj) {
  return new Todo({ description: todoObj.description})
    .save().then(todoObj => todoObj.refresh());
}

export function createUserTodos(userId,body) { //user id
  // return new Todo({description:body.description, user_id:userId})
  return new Todo({ description: body.description, userId: userId })
  
  .save().then(body => body.refresh());
}
/**
 * Update a vehicle.
 *
 * @param  {Number|String}  id
 * @param  {Object}         vehicle
 * @return {Promise}
 */
export function updateTodo(id, todoObj) {
  return new Todo({ id })
    .save({ description: todoObj.description })
    .then(todoObj => todoObj.refresh());
}

/**
 * Delete a list.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new Todo({ id }).fetch().then(todoObj => todoObj.destroy());
}
