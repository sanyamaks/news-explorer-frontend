class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeButton = this._popup.querySelector('.popup__button-close');
  }

  openPopup() {
    this._popup.classList.remove('popup_disabled');
  }

  closePopup = () => {
    this._popup.classList.add('popup_disabled');
    this.removeListeners();
  };

  _closePopupHandler = (event) => {
    if (event.target === this._popup) {
      this.closePopup();
    }
  };

  _keyPress = (event) => {
    if (event.keyCode === 27) {
      this.closePopup();
    }
  };

  _setCloseButtonListeners() {
    this._closeButton.addEventListener('click', this.closePopup);
  }

  _setPopupListeners() {
    this._popup.addEventListener('click', this._closePopupHandler);
  }

  _setKeyPressListener() {
    document.body.addEventListener('keydown', this._keyPress);
  }

  setListeners() {
    this._setCloseButtonListeners();
    this._setPopupListeners();
    this._setKeyPressListener();
  }

  _removeCloseButtonListeners() {
    this._closeButton.removeEventListener('click', this.closePopup);
  }
  _removeKeyPressListener() {
    document.body.removeEventListener('keydown', this._keyPress);
  }

  _removePopupListeners() {
    this._popup.removeEventListener('click', this._closePopupHandler);
  }

  removeListeners() {
    this._removeCloseButtonListeners();
    this._removePopupListeners();
    this._removeKeyPressListener();
  }
}

export default Popup;
