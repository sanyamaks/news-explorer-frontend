import isEmail from 'validator/es/lib/isEmail';

class FormValidator {
  constructor() {
    this._errorMessages = {
      requiredField: 'Это обязательное поле',
      specifiedInterval: 'Должно быть от 2 до 30 символов',
      specifiedPasswordInterval: 'Должно быть не менее 8 символов',
      noEmail: 'Здесь должна быть Email',
    };
  }

  getInputValidityInfo = (input) => {
    const value = input.value.trim();

    let errorMessage = '';
    if (input.validity.valueMissing || value === "") {
      errorMessage = this._errorMessages.requiredField;
    } else if (input.type === 'email' && !isEmail(value)) {
      errorMessage = this._errorMessages.noEmail;
    } else if (input.type === 'password' && input.validity.tooShort) {
      errorMessage = this._errorMessages.specifiedPasswordInterval;
    } else if (input.validity.tooLong || input.validity.tooShort) {
      errorMessage = this._errorMessages.specifiedInterval;
    }
    input.setCustomValidity(errorMessage);
    const isValid = !input.validationMessage;

    return { input, isValid, errorMessage };
  };

  getFormValidityInfo = (inputs) =>
    inputs.map((item) =>
      this.getInputValidityInfo(item)
    );

  resetInputValidityInfo = (input) => {
    const errorMessage = '';
    const isValid = true;
    input.setCustomValidity(errorMessage);

    return { input, isValid, errorMessage };
  }

  isValidForm = (inputs) => {
   return this.getFormValidityInfo(inputs).every((item) => item.isValid);
  }

}

export default FormValidator;
