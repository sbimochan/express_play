import Boom from 'boom';
import User from '../models/user';
import Session from '../models/session';
import jwt from 'jsonwebtoken';
import * as jwtGenerator from '../utils/jwt';
/**
 * login
 */
export function findUser(user) {

  return new User({username: user.username, password: user.password})
    .fetch()
    .then(user => {
      if (!user) {
        throw new Boom.notFound('User not found');
      }
      const payload = {
        id: user.attributes.id,
        password: user.attributes.password
      }
      let token = jwtGenerator.generateTokens(payload.id);
      token.userId = payload.id;
      return token;

    });
}
export function saveSession(data) {
  return new Session({user_id: data.userId, refresh_token: data.refreshToken})
    .save()
    .then(data => data.refresh())
    .catch(err => err);

  // return allToken;
}
// function updateRefreshToken(err,data){   if(err.code === '23505'){     let id
// = data.userId;     return new Session({user_id:id})
// .save({refresh_token:data.refreshToken})
// .then(session=>session.refresh());   } }
export function deleteSession(data) {
  //  console.log('user id',data);

  return new Session({user_id: data.userId})
    .fetch()
    .then(session => session.destroy());
}