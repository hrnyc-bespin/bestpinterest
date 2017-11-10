import url from 'url';

export default class Helpers {
  validateLogin(username, password) {
    return username.length && password.length;
  }

  validateSignup(username, password, info, profilepic) {
    try {
      let test = url.parse(profilepic); 
      return test.hostname && username.length && password.length && info.length && profilepic.length;
    } catch (err) {
      return false;
    }
  }
}