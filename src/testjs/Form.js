class Form {
  constructor(form, currentPopup, anotherPopup) {
    this.form = form;
    this.togglePopup =
      this.form.querySelector('.form__signin-signup') ||
      this.form.querySelector('.notification__signin');
    this.currentPopup = currentPopup;
    this.anotherPopup = anotherPopup;
  }

  setEventListenerToggle() {
    this.togglePopup.addEventListener('click', () => {
      this.currentPopup.closePopup();
      this.anotherPopup.openPopup();
      this.anotherPopup.setStateClosePopup();
      this.anotherPopup.setStateCloseButton();
    });
  }
}

export default Form;
