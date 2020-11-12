import Form from "./Form";

class FormSignIn extends Form {
  constructor(form, currentPopup, anotherPopup,setEventListenerAnotherForm, signupHandler) {
    super(form, currentPopup, anotherPopup);
    this.setEventListenerAnotherForm = setEventListenerAnotherForm;
    this.signupHandler = signupHandler;
  }

  setEventListenerToggle() {
    super.setEventListenerToggle();
    this.setEventListenerAnotherForm();
  }

  setSubmitListener() {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.signupHandler();
    })
  }
}

export default FormSignIn;
