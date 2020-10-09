import Form from "./Form";

class FormSignIn extends Form {
  constructor(form, currentPopup, anotherPopup) {
    super(form, currentPopup, anotherPopup);
  }

  setEventListenerToggle() {
    super.setEventListenerToggle();
    this.setSubmitListener();
  }

  setSubmitListener() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.currentPopup.closePopup();
    })
  }
}

export default FormSignIn;
