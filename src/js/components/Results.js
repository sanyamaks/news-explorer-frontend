class Results {
  constructor(results, showMoreHandler) {
    this._results = results;
    this._showMoreHandler = showMoreHandler;
    this._text = this._results.querySelector('.results__subtitle');
    this._button = this._results.querySelector('.results__button');
    this._articles = this._results.querySelector('.results__articles');
  }

  showResults = () => {
    this._results.classList.remove('results_disabled');
  };

  hideResults = () => {
    if (!this._results.classList.contains('results_disabled')) {
      this._results.classList.add('results_disabled');
    }
  };

  _setStateText = (isActive) => {
    if (isActive) {
      if (!this._text.classList.contains('results__subtitle_disabled')) {
        this._text.classList.add('results__subtitle_disabled');
      }
    } else {
      this._text.classList.remove('results__subtitle_disabled');
    }
  };

  setStateButton = (isActive) => {
    if (!isActive) {
      if (!this._button.classList.contains('results__button_disabled')) {
        this._button.classList.add('results__button_disabled');
      }
    } else {
      this._button.classList.remove('results__button_disabled');
    }
  };

  _setStateArticles = (isActive) => {
    if (!isActive) {
      if (!this._articles.classList.contains('results__articles_disabled')) {
        this._articles.classList.add('results__articles_disabled');
      }
    } else {
      this._articles.classList.remove('results__articles_disabled');
    }
  };

  setStateResults = (isActive) => {
    this._setStateText(isActive);
    this.setStateButton(isActive);
    this._setStateArticles(isActive);
  };

  _showMore = (event) => {
    event.preventDefault();
    this._showMoreHandler();
  };

  setShowMoreButtonListener = () => {
    this._button.addEventListener('click', this._showMore);
  };
}

export default Results;
