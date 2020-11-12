import Article from '../Article';

class savedArticle extends Article {
  constructor(articleInfo, deleteArticleHandler, hoverIconArticleHandler) {
    super(articleInfo, deleteArticleHandler, hoverIconArticleHandler);
  }

  getArticle() {
    super.getArticle();

    const category = document.createElement('p');
    const tooltip = this._article.querySelector('.article__tooltip');
    const icon = this._article.querySelector('.article__icon');

    category.classList.add('article__category');
    tooltip.classList.add('article__tooltip_delete');
    icon.classList.add('article__icon_delete-icon');

    category.textContent = this._articleInfo.keyword;
    tooltip.textContent = 'Убрать из сохранённых';

    this._article.appendChild(category);

    return this._article;
  }

  _deleteArticle() {
    super._deleteArticle();
    this._deleteArticleHandler(this._articleInfo._id).then((isSuccess) => {
      if (!isSuccess) {
        return null;
      }
      this._article.remove();
      this.removeArticleListener();
      this._article = null;
    });
  }

  _onClick(event) {
    super._onClick(event);
    if (event.target === this._article.querySelector('.article__icon')) {
      this._deleteArticle();
    }
  }
}

export default savedArticle;
