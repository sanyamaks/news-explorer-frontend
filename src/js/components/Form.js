class Form {
  constructor(form, toggleFormHandler, onInputFormHandler, onSubmitHandler) {
    this._form = form;
    this._formToggle = this._form.querySelector('.form__signin-signup');
    this._toggleFormHandler = toggleFormHandler;
    this._onInputFormHandler = onInputFormHandler;
    this._onSubmitHandler = onSubmitHandler;
    this.setInputErrorMessage = this.setInputErrorMessage.bind(this);
    this._prompt = this._form.querySelector('.form__prompt');
  }

  getInputs = () => Array(...this._form.querySelectorAll('input'));

  getInputValues = () => this._form.elements;

  openForm = () => {
    this._setStateActive(true);
    this._resetInputs();
    this.setListeners();
    this.hidePrompt();
  }

  closeForm = () => {
    this._setStateActive(false);
    this.removeListeners();
  }

  showPrompt = () => {
    this._prompt.classList.remove('form__prompt_disable');
  };

  hidePrompt = () => {
    this._prompt.classList.add('form__prompt_disable');
  };

  setPrompt = (text) => {
    this._prompt.textContent = text;
  }


  _toggleForm = () => {
    this._toggleFormHandler();
  }

  _onSubmit = () => {
    this._onSubmitHandler();
  }

  _onClick = (event) => {
    event.preventDefault();
    this._onSubmitHandler();
  }

  _onInputForm = (event) => {
    this._onInputFormHandler(event.target, this);
  };

  _setFormToggleListeners() {
    this._formToggle.addEventListener('click', this._toggleForm);
  }

  _setSubmitListener() {
    this._form.addEventListener('submit', this._onSubmit);
  }

  _setClickListener() {
    this._form.querySelector('.button').addEventListener('click', this._onClick);
  }

  _setInputsListener = () => {
    Array(...this._form.querySelectorAll('input')).map((item) => {
      item.addEventListener('input', this._onInputForm);
    });
  };

  setListeners() {
    this._setFormToggleListeners();
    this._setSubmitListener();
    this._setInputsListener();
    this._setClickListener();
  }

  _removeFormToggleListeners() {
    this._formToggle.removeEventListener('click', this._toggleForm);
  }

  _removeSubmitListener() {
    this._form.removeEventListener('submit', this._onSubmit);
  }

  _removeClickListener() {
    this._form.querySelector('.button').removeEventListener('click', this._onClick);
  }

  _removeInputsListener = () => {
    Array(...this._form.querySelectorAll('input')).map((item) => {
      item.removeEventListener('input', this._onInputForm);
    });
  };

  removeListeners()  {
    this._removeFormToggleListeners();
    this._removeSubmitListener();
    this._removeInputsListener();
    this._removeClickListener();
  }

  _setStateActive(activity) {
    if (!activity) {
      this._form.classList.add('form_disabled');
    } else {
      this._form.classList.remove('form_disabled');
    }
  }


  _resetInputs = () => {
    this.getInputs().map((item) => {
      item.value = '';
    });
  };


  isActive = () => this._form.classList.contains('form_disabled');

  setButtonState = (isValid) => {
    const button = this._form.querySelector('.button');
    if (isValid) {
      button.classList.remove('button_disabled');
    } else {
      if (!button.classList.contains('button_disabled')) {
        button.classList.add('button_disabled');
      }
    }
  };

  setInputErrorMessage = (inputValidityInfo) => {
    const prompt = inputValidityInfo.input
      .closest('.input-wrapper')
      .querySelector('.input-wrapper__prompt');

    prompt.textContent = inputValidityInfo.errorMessage;
    if (!inputValidityInfo.isValid) {
      prompt.classList.remove('input-wrapper__prompt_disabled');
    } else {
      if (prompt.classList.contains('input-wrapper__prompt_disabled')) {
        prompt.classList.add('input-wrapper__prompt_disabled');
      }
    }
  };
}

export default Form;
