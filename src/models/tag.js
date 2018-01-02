import bookshelf from '../db';
import Todo from '../models/todo';

const TABLE_NAME = 'tags';

/**
 * Tags
 */
class Tag extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }
  todos() {
    return this.belongsToMany(Todo);
  }
}
export default Tag;
