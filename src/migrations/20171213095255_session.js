
exports.up = function (knex, Promise) {
  return knex.schema.createTable('sessions', function (table) {
    table.increments();
    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNull();
    table.integer('user_id').references('users.id').onDelete('CASCADE').unique().notNull();
    table.string('refresh_token').notNull().unique();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('sessions');
};
