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

  get hasTimestamps() {
    return true;
  }
}
// class TodoOfUsers extends bookshelf.Model {
//    todos() {
//     return this.hasMany(Todo);
//   }
// }

let TodoOfUsers = bookshelf.Model.extend({
  tableName:'todo-list',
  todo:()=>{
    return this.hasMany(Todo);
  }
});

export default User;
export {TodoOfUsers};
