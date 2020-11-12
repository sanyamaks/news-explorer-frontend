class UserInfo {
  constructor() {
    this._userInfo = null;
    this._isAuth = false;
  }

  setUserInfo = (userInfo) => {
    this._userInfo = userInfo;
  };

  getNameUser = () => this._userInfo.name;

  setAuthState = (isAuth) => {
    this._isAuth = isAuth;
  };

  getAuth = () => this._isAuth;
}

export default UserInfo;
