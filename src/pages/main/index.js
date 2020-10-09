import './index.css';
import setFullState from '../../testjs/setFullState';
import Popup from '../../testjs/Popup';
import FormSignIn from '../../testjs/FormSignIn';
import FormSignUp from '../../testjs/FormSignUp';


const openSignupButton = document.querySelector('.header__button');
const btnCloseNav = document.querySelector('.header__nav-btn-active');
const popupSuccess = document.querySelector('.popup_success');
const popupSignUp = document.querySelector('.popup_signup');
const formSignUp = popupSignUp.querySelector('.form');
const popupSignIn = document.querySelector('.popup_signin');
const formSignIn = popupSignIn.querySelector('.form');
const formSuccess = popupSuccess.querySelector('.notification');


const popupSuccessObj = new Popup(popupSuccess);
const popupSignUpObj = new Popup(popupSignUp);
const popupSignInObj = new Popup(popupSignIn);
const formSignInObj = new FormSignIn(formSignIn, popupSignInObj, popupSignUpObj);
const formSuccessObj = new FormSignIn(formSuccess, popupSuccessObj, popupSignInObj);

const setEventListenerAnotherForm = () => {
  formSignInObj.setEventListenerToggle();
  formSignInObj.setSubmitListener();
};

const signupHandler = () => {
  popupSignUpObj.closePopup();
  popupSuccessObj.openPopup();
  formSuccessObj.setEventListenerToggle();
}
const formSignUpObj = new FormSignUp(formSignUp, popupSignUpObj, popupSignInObj, setEventListenerAnotherForm, signupHandler);



const openSignupButtonHandler = () => {
  popupSignUpObj.openPopup();
  popupSignUpObj.setStateCloseButton();
  popupSignUpObj.setStateClosePopup();
  formSignUpObj.setEventListenerToggle();
  formSignUpObj.setSubmitListener();
};

openSignupButton.addEventListener('click', openSignupButtonHandler);
btnCloseNav.addEventListener('click', setFullState);
