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
          first_name: 'Saugat',
          last_name:'Acharya',
          email:'saugat@gmail.com',
          username:'saugat',
          updated_at: new Date(),
          password: 'saugatpw'
        }),
        knex('users').insert({ 
          first_name:'John',
          last_name:'Doe',
          email:'john@gmail.com',
          username:'john',
          password:'johnpw', 
          updated_at: 
          new Date() })
      ]);
    });

}
