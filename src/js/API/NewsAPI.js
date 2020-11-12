class NewsAPI {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.endPoint = options.endPoint;
    this.pageSize = options.pageSize;
    this.apiKey = options.apiKey;
  }

  setFromDate = () => {
    const date = new Date(new Date() - 1000 * 60 * 60 * 24 * 7);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  setToDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  setUrl = (query) => {
    const fromDate = this.setFromDate();
    const toDate = this.setToDate();
    this.url = `${this.baseUrl}${
      this.endPoint
    }?q=${query}&from=${fromDate}&to=${toDate}&pageSize=${
      this.pageSize
    }&apiKey=${this.apiKey}`;
  };

  getNews = (query) => {
    this.setUrl(query);
    return fetch(this.url)
      .then((res) => this.isResolve(res))
      .then((res) => res.articles);
  };

  isResolve(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject({ status: res.status });
    }
  }
}

export default NewsAPI;
