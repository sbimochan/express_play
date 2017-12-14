
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table.string('tag_name').notNull();
    // table.integer('todoList_id').references('todoLists.id');
    table.timestamp('created_at').defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};

