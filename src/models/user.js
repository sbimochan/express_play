import bookshelf from '../db';
import Todo from '../models/todo';

const TABLE_NAME = 'users';

/**
 * User model.
 */
class User extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  hasTimestamps() {
    return true;
  }
  todos() {
    return this.hasMany(Todo);
  }
}
// class UserTodo extends bookshelf.Model {   get todos(){     return
// this.hasMany(Todo);   } } let UserTodo = bookshelf.Model.extend({
// tableName:'users',
//   todos: ()=>{     return this.hasMany(TodoUser);   } });

export default User;
// export {UserTodo};