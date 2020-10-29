class MainAPI {
  constructor(options) {
    this.options = options;
    this.authorization = null;
  }

  signIn(body) {
    return fetch(this.options.baseUrl + '/signin', {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(body),
    }).then((res) => this.isResolve(res));
  }

  signUp(body) {
    return fetch(this.options.baseUrl + '/signup', {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify(body),
    }).then((res) => this.isResolve(res));
  }

  getUserInfo() {
    this.setAuthorization();
    return fetch(this.options.baseUrl + '/users/me', {
      headers: { ...this.options.headers, authorization: this.authorization },
    })
      .then((res) => this.isResolve(res))
      .then((res) => {
        return res.data;
      });
  }

  saveNews = (newsItem) => {
    return fetch(this.options.baseUrl + '/articles', {
      method: 'POST',
      headers: { ...this.options.headers, authorization: this.authorization },
      body: JSON.stringify(newsItem),
    })
      .then((res) => this.isResolve(res))
      .then((res) => res.data);
  };

  removeNews = (articleId) => {
    return fetch(this.options.baseUrl + '/articles' + '/' + articleId, {
      method: 'DELETE',
      headers: { ...this.options.headers, authorization: this.authorization },
    })
      .then((res) => this.isResolve(res))
      .then((res) => res.data);
  };

  getArticles = () => {
    return fetch(this.options.baseUrl + '/articles', {
      headers: { ...this.options.headers, authorization: this.authorization },
    })
      .then((res) => this.isResolve(res))
      .then((res) => res.data);
  };

  setAuthorization() {
    this.authorization =
      'Bearer ' + localStorage.getItem('token') || this.options.authorization;
  }

  isResolve(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject({ status: res.status });
    }
  }
}

export default MainAPI;
