
function isLoggedIn() {
  const localStorage = window.localStorage;

  const wstToken = localStorage.getItem('wst_token')
  if (wstToken) {
    return true;
  } else {
    //Request user to sign-in using Twitter
    return false;
  }
}




export default isLoggedIn;
