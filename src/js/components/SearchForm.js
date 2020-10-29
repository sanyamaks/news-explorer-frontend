class SearchForm {
  constructor(form, searchNewsHandler, onInputSearchFormHandler) {
    this._form = form;
    this._searchNewsHandler = searchNewsHandler;
    this._onInputSearchFormHandler = onInputSearchFormHandler;
    this._button = this._form.querySelector('.button');
  }

  getInput = () => this._form.querySelector('input');

  getInputValue = () => this._form.key;

  setInputErrorMessage = (inputValidityInfo) => {
    const prompt = inputValidityInfo.input
      .closest('.search__form')
      .querySelector('.search__input-prompt');

    prompt.textContent = inputValidityInfo.errorMessage;
    if (!inputValidityInfo.isValid) {
      prompt.classList.remove('search__input-prompt_disabled');
    } else {
      if (prompt.classList.contains('search__input-prompt_disabled')) {
        prompt.classList.add('search__input-prompt_disabled');
      }
    }
  };

  resetInput = () => {
    this.getInput().value = '';
  };

  setListeners = () => {
    this._setSubmitListener();
    this._setButtonListener();
    this._setInputsListener();
  };

  _searchNews = (event) => {
    event.preventDefault();
    this._searchNewsHandler(this.getInputValue());
  };

  _onInputForm = () => {
    this._onInputSearchFormHandler(this);
  };

  _setSubmitListener = () => {
    this._form.addEventListener('submit', this._searchNews);
  };

  _setButtonListener = () => {
    this._button.addEventListener('click', this._searchNews);
  };

  _setInputsListener = () => {
    this._form
      .querySelector('input')
      .addEventListener('input', this._onInputForm);
  };
}

export default SearchForm;
