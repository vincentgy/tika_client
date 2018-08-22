class UserManager {
  constructor() {
    this._token = '';
  }

  setToken = token => {
    this._token = token;
  };

  getToken = () => {
    return this._token;
  };
}

export default new UserManager();
