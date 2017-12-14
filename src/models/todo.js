import bookshelf from "../db";
import User from "../models/user";
import Tag from "../models/tag";

const TABLE_NAME = 'todoLists';

/**
 * Todo Model
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
   user(){
    return this.belongsTo(User);
  }

   tags(){
    return this.belongsToMany(Tag);
  }
}
// class TodoUser extends bookshelf.Model{
//   get user(){
//     return this.belongsTo(User);
//   }
// }
// let UsersOfTodo = bookshelf.Model.extend({
//   tableName:'todo-list',
//   user: ()=>{
//     return this.belongsTo(User);
//   }
// });

// let TodoUser = bookshelf.Model.extend({
//   tableName: 'todo-list',
//   user: () => {
//     return this.belongsTo(UserTodo);
//   }
// });

export default Todo;

// export { TodoUser }