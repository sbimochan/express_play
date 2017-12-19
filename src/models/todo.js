import bookshelf from '../db';
import User from '../models/user';
import Tag from '../models/tag';

const TABLE_NAME = 'todoLists';

/**
 * Todo Model
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  user() {
    return this.belongsTo(User);
  }

  tags() {
    return this.belongsToMany(Tag);
  }
}

export default Todo;

// export { TodoUser }