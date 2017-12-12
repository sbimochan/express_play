import bookshelf from "../db";
import User from "../models/user";

const TABLE_NAME = 'todo-list';

/**
 * Todo Model
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
}

// let UsersOfTodo = bookshelf.Model.extend({
//   tableName:'todo-list',
//   user: ()=>{
//     return this.belongsTo(User);
//   }
// });

export default Todo;

