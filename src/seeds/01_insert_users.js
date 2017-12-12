/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          name: 'Saugat Acharya',
          username:'saugat',
          updated_at: new Date(),
          password: 'saugatpw'
        }),
        knex('users').insert({ name: 'John Doe',username:'john',password:'johnpw', updated_at: new Date() })
      ]);
    });

}
