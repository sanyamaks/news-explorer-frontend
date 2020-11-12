class Articles {
  constructor(articles, createCard) {
    this._articles = articles;
    this._createCard = createCard;
    this._news = null;
    this._partNews = null;
    this._initialNumber = 0;
    this._step = 3;
    this._finiteNumber = this._step;
  }

  getNews = () => this._news;

  setNews = (news) => {
    this._news = news;
    this._partNews = this._news;
  };

  convertAndSetNews = (news, keyword) => {
    this.setNews(
      news.map((newsItem) => {
        return {
          keyword: keyword,
          text: newsItem.description || 'Без текста',
          date: this._getDate(newsItem.publishedAt) || 'Дата неизвестна',
          source: newsItem.source.name || 'https://www.google.com/',
          title: newsItem.title || 'Без названия',
          link: newsItem.url || 'https://www.google.com/',
          image:
            newsItem.urlToImage ||
            'https://smmis.ru/wp-content/uploads/2015/05/pustota.jpg',
        };
      })
    );
  };

  renderPartArticles = () => {
    if (this._news) {
      this._partNews = this._news.slice(
        this._initialNumber,
        this._finiteNumber
      );
      this.renderArticles();
      this._updateNumbers();
    }
  };

  renderArticles = () => {
    this._partNews.map((newsItem) => {
      this._articles.appendChild(this._createCard(newsItem));
    });
  };

  removeArticles = () => {
    this._news = null;
    this._partNews = null;
    this._articles.innerHTML = '';
    this._resetNumbers();
  };

  resetArticles = () => {
    this._articles.innerHTML = '';
    if (this._news) {
      this._news = this._news.map((item) => {
        delete item._id;
        return item;
      });
    }
    this._resetNumbers();
  };

  isNumberMoreArticle = () => this._initialNumber >= this._news.length;

  _updateNumbers = () => {
    this._initialNumber = this._initialNumber + this._step;
    this._finiteNumber = this._finiteNumber + this._step;
  };

  _resetNumbers = () => {
    this._initialNumber = 0;
    this._finiteNumber = this._step;
  };

  _getMonth = (monthNumber) =>
    [
      'Января',
      'Февраля',
      'Марта',
      'Апреля',
      'Мая',
      'Июня',
      'Июля',
      'Августа',
      'Сентября',
      'Октября',
      'Ноября',
      'Декабря',
    ][monthNumber];

  _getDate = (publishedAt) => {
    const date = new Date(publishedAt);
    return `${date.getDate()} ${this._getMonth(
      date.getMonth()
    )}, ${date.getFullYear()}`;
  };
}

export default Articles;
