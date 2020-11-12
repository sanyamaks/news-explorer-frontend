class Header {
  constructor(header, btnSignUpLogout) {
    this._header = header;
    this._btnSignUpLogout = btnSignUpLogout;
    this._tabSavedArticles = this._header.querySelector(
      '.header__nav-item_saved-articles'
    );
    this._btnText = this._btnSignUpLogout.querySelector('.button__text');
    this._iconLogout = this._btnSignUpLogout.querySelector(
      '.button__icon-logout'
    );
  }

  _setNameBtnSignUpLogout = (name) => {
    this._btnText.textContent = name;
  };

  _setImageBtnSignUpLogout = (isActive) => {
    isActive
      ? this._iconLogout.classList.remove('button__icon-logout_disabled')
      : this._iconLogout.classList.add('button__icon-logout_disabled');
  };

  _setStateTabSavedArticle = (isActive) => {
    isActive
      ? this._tabSavedArticles.classList.remove('header__nav-item_disabled')
      : this._tabSavedArticles.classList.add('header__nav-item_disabled');
  };

  setStateHeader = (isAuth, name) => {
    if (!isAuth) {
      this._setNameBtnSignUpLogout('Регистрация');
      this._setImageBtnSignUpLogout(false);
      this._setStateTabSavedArticle(false);
    } else {
      this._setNameBtnSignUpLogout(name);
      this._setImageBtnSignUpLogout(true);
      this._setStateTabSavedArticle(true);
    }
  };
}

export default Header;
