import Article from '../Article';

class NewArticle extends Article {
  constructor(
    articleInfo,
    deleteArticleHandler,
    hoverIconArticleHandler,
    addArticleHandler
  ) {
    super(articleInfo, deleteArticleHandler, hoverIconArticleHandler);
    this._addArticleHandler = addArticleHandler;
  }

  getArticle() {
    super.getArticle();

    const tooltip = this._article.querySelector('.article__tooltip');
    const icon = this._article.querySelector('.article__icon');

    tooltip.classList.add('article__tooltip_save');
    icon.classList.add('article__icon_save-icon');

    tooltip.textContent = 'Войдите, чтобы сохранять статьи';

    this.isSavedArticle = false;
    return this._article;
  }

  _addArticle = () => {
    this._addArticleHandler(this).then((isSuccess) => {
      if (!isSuccess) {
        return null;
      }
      this._setStateArticle();
    });
  };

  _deleteArticle() {
    super._deleteArticle();
    this._deleteArticleHandler(this._articleInfo._id).then((isSuccess) => {
      if (!isSuccess) {
        return null;
      }
      this._removeArticleId();
      this._setStateArticle();
      this.setArticleListener();
    });
  }

  _onClick(event) {
    super._onClick(event);
    if (event.target === this._article.querySelector('.article__icon')) {
      if (this.isSavedArticle) {
        this._deleteArticle();
      } else {
        this._addArticle();
      }
    }
  }

  _setStateArticle = () => {
    if (!this.isSavedArticle) {
      this._article
        .querySelector('.article__icon')
        .classList.add('article__icon_save-icon_active');
      this.isSavedArticle = true;
    } else {
      this._article
        .querySelector('.article__icon')
        .classList.remove('article__icon_save-icon_active');
      this.isSavedArticle = false;
    }
  };

  setArticleId = (id) => {
    this._articleInfo._id = id;
  };

  _removeArticleId = () => {
    delete this._articleInfo._id;
  };
}

export default NewArticle;
