class Popup {
  constructor(popup) {
    this.popup = popup;
    this.closeButton = this.popup.querySelector('.popup__button-close');
  }

  openPopup() {
    console.log(this.popup);
    this.popup.classList.remove('popup_disabled');
  }

  closePopup() {
    this.popup.classList.add('popup_disabled');
  }

  setStateCloseButton() {
    this.closeButton.addEventListener('click', () => {
      this.closePopup();
    });
  }

  setStateClosePopup() {
    this.popup.addEventListener('click', (event) => {
      if (event.target === this.popup) {
        this.closePopup();
      }
    });
  }
}

export default Popup;
