import Boom from 'boom';
import User from '../models/user';
import jwt from 'jsonwebtoken';
/**
 * login
 */
export function findUser(user) {
  
  return new User({ username: user.username,password:user.password })
  .fetch()
  .then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }
    const payload = {
      id: user.attributes.id,
      password: user.attributes.password
    }
    console.log(payload);
    const token = jwt.sign({user: payload.id},process.env.SECRET_KEY);
    return {
      username:user.attributes.username,
      token: token,
      userId:payload.id
    };
  });
}