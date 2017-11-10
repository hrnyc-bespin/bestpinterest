import url from 'url';

/**
 * Singleton Helper class, instantiated and managed by
 * the App component. 
 */

export default class Helpers {

  /**
   * Big problems here would be if the username or password
   * are empty
   * @param {*} username 
   * @param {*} password 
   */
  validateLogin(username, password) {
    return username.length && password.length;
  }

  /**
   * Quickly checks URL in a somewhat hacky function
   * Valid imagehosts should have a valid hostname
   * Naively assume htat if the user put a valid hostname, so too is the
   * overall image url
   * @param {*} username 
   * @param {*} password 
   * @param {*} info 
   * @param {*} profilepic 
   */
  validateSignup(username, password, info, profilepic) {
    try {
      let test = url.parse(profilepic); 
      
      return test.hostname && username.length && password.length && info.length && profilepic.length !== 0;
    } catch (err) {
      return false;
    }
  }

  /**
   * Similar validation to the above, with identical means of checking
   * URL validation. 
   * 
   * @param {*} photoUrl 
   * @param {*} info 
   */
  validatePhoto(photoUrl, info) {
    try {
      let test = url.parse(photoUrl);
      console.log(photoUrl, info);
      // Have last as explicit boolean to coerce
      return test.hostname && photoUrl.length && info.length !== 0;
    } catch (err) {
      return false;
    }
  }

  validateBespin(postId, boardId) {
    return postId >= 0 && boardId >= 0;
  }

  validateBoardName(boardName) {
    return boardName.length > 0;
  }
}