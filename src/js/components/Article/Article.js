class Article {
  constructor(articleInfo, deleteArticleHandler, hoverIconArticleHandler) {
    this._articleInfo = articleInfo;
    this._deleteArticleHandler = deleteArticleHandler;
    this._hoverIconArticleHandler = hoverIconArticleHandler;
    this._onClick = this._onClick.bind(this);
  }

  getArticleInfo = () =>  this._articleInfo;

  getArticle() {
    const article = document.createElement('article');
    const tooltip = document.createElement('p');
    const icon = document.createElement('div');
    const background = document.createElement('div');
    const info = document.createElement('div');
    const date = document.createElement('p');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const source = document.createElement('p');

    article.classList.add('article');
    tooltip.classList.add('article__tooltip');
    icon.classList.add('article__icon');
    background.classList.add('article__background');
    info.classList.add('article__info');
    date.classList.add('article__date');
    title.classList.add('article__title');
    description.classList.add('article__description');
    source.classList.add('article__source');

    background.style.backgroundImage = `url(${this._articleInfo.image})`;
    info.textContent = this._articleInfo.date;
    title.textContent = this._articleInfo.title;
    description.textContent = this._articleInfo.text;
    source.textContent = this._articleInfo.source;

    article.appendChild(background);
    article.appendChild(info);
    article.appendChild(icon);
    article.appendChild(tooltip);
    info.appendChild(date);
    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(source);

    this._article = article;
    this.setArticleListener();
  }

  _deleteArticle() {}

  _hoverIconArticle = (event) => {
    this._hoverIconArticleHandler(event, this);
  };

  _onClick(event) {
    if (event.target !== this._article.querySelector('.article__icon')) {
      window.open(this._articleInfo.link, '_blank');
    }
  };

  _setHoverIconArticleListener = () => {
    this._article
      .querySelector('.article__icon')
      .addEventListener('mouseout', this._hoverIconArticle);
    this._article
      .querySelector('.article__icon')
      .addEventListener('mouseover', this._hoverIconArticle);
  };

  _setClickListener = () => {
    this._article.addEventListener('click', this._onClick);
  };

  setArticleListener() {
    this._setHoverIconArticleListener();
    this._setClickListener();
  }

  _removeHoverIconArticleListener = () => {
    this._article
      .querySelector('.article__icon')
      .removeEventListener('mouseout', this._hoverIconArticle);
    this._article
      .querySelector('.article__icon')
      .removeEventListener('mouseover', this._hoverIconArticle);
  };

  _removeClickListener = () => {
    this._article.removeEventListener('click', this._onClick);
  }

  removeArticleListener = () => {
    this._removeHoverIconArticleListener();
    this._removeClickListener();
  }

  showIconArticle = () => {
    this._article
      .querySelector('.article__tooltip')
      .classList.add('article__tooltip_active');
  };

  hideIconArticle = () => {
    this._article
      .querySelector('.article__tooltip')
      .classList.remove('article__tooltip_active');
  };
  }

export default Article;
