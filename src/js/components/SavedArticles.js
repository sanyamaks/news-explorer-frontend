class SavedArticles {
  constructor(savedArticles) {
    this._savedArticles = savedArticles;
    this._articles = this._savedArticles.querySelector(
      '.saved-articles__articles'
    );
  }

  showSavedArticles = () => {
    this._savedArticles.classList.remove('saved-articles_disabled');
  };

  hideSavedArticles = () => {
    if (!this._savedArticles.classList.contains('saved-articles_disabled')) {
      this._savedArticles.classList.add('saved-articles_disabled');
    }
  };

  setStateSavedArticles = (isError) => {
    if (isError) {
      this._articles.classList.add('saved-articles__articles_disabled');
    } else {
      this._articles.classList.remove('saved-articles__articles_disabled');
    }
  };
}
export default SavedArticles;
