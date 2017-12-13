
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table.string('tag_name').notNull();
    table.integer('todo_id').references('todoList.id');
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};

