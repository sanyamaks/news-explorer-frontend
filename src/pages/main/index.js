import './index.css';
import configMainAPI from "../../js/constants/configMainAPI";
import configNewsAPI from "../../js/constants/configNewsAPI";
import MainAPI from '../../js/API/MainAPI';
import NewsAPI from '../../js/API/NewsAPI';

import Header from '../../js/components/Header';
import Navbar from '../../js/components/Navbar';
import UserInfo from '../../js/components/UserInfo';
import Popup from '../../js/components/Popup';
import Notification from '../../js/components/Notification';
import Form from '../../js/components/Form';
import SearchForm from '../../js/components/SearchForm';
import Loader from '../../js/components/Loader';
import Results from '../../js/components/Results';
import NoResults from '../../js/components/NoResults';
import Articles from '../../js/components/Articles';
import NewArticle from '../../js/components/Article/NewArticle/NewArticle';
import FormValidator from '../../js/components/FormValidator';

const header = document.querySelector('.header');
const navbarWrapper = document.querySelector('.header__nav-wrapper');
const btnNavbar = document.querySelector('.header__nav-btn-active');
const btnSignUpLogout = document.querySelector('.header__button');
const searchForm = document.querySelector('.search__form');
const popup = document.querySelector('.popup');
const loader = document.querySelector('.loader');
const results = document.querySelector('.results');
const articles = document.querySelector('.articles');
const noResults = document.querySelector('.no-results');
const notification = document.querySelector('.notification');
const formSignUp = document.querySelector('.form_signup');
const formSignIn = document.querySelector('.form_signin');

const navbarObj = new Navbar(navbarWrapper, btnNavbar);
const popupObj = new Popup(popup);
const mainAPI = new MainAPI(configMainAPI);
const newsAPI = new NewsAPI(configNewsAPI);
const userInfoObj = new UserInfo();
const headerObj = new Header(header, btnSignUpLogout);
const loaderObj = new Loader(loader);
const noResultsObj = new NoResults(noResults);

const hoverIconArticleHandler = (event, article) => {
  if (userInfoObj.getAuth()) {
    return null;
  }
  if (event.type === 'mouseover') {
    article.showIconArticle();
  } else if (event.type === 'mouseout') {
    article.hideIconArticle();
  }
};

const addArticleHandler = async (article) => {
  if (!userInfoObj.getAuth()) {
    return null;
  }
  return await mainAPI
    .saveNews(article.getArticleInfo())
    .then((savedArticle) => {
      article.setArticleId(savedArticle._id);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const deleteArticleHandler = async (id) => {
  if (!userInfoObj.getAuth()) {
    return null;
  }
  return await mainAPI
    .removeNews(id)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const showMoreHandler = () => {
  articlesObj.renderPartArticles();
  if (articlesObj.isNumberMoreArticle()) {
    resultsObj.setStateButton(false);
  }
};

const createArticle = (newsItem) => {
  const articleObj = new NewArticle(
    newsItem,
    deleteArticleHandler,
    hoverIconArticleHandler,
    addArticleHandler
  );

  return articleObj.getArticle();
};

const openForm = (form) => {
  form.openForm();
  form.getInputs().map((item) => {
    form.setInputErrorMessage(formValidatorObj.resetInputValidityInfo(item));
  });
  form.setButtonState(formValidatorObj.isValidForm(form.getInputs()));
};

const toggleFormHandler = () => {
  if (!formSignUpObj.isActive()) {
    formSignUpObj.closeForm();
    openForm(formSignInObj);
  } else {
    formSignInObj.closeForm();
    openForm(formSignUpObj);
  }
};

const signInHandler = async () => {
  if (!formValidatorObj.isValidForm(formSignInObj.getInputs())) {
    formSignInObj.getInputs().map((item) => {
      formSignInObj.setInputErrorMessage(
        formValidatorObj.getInputValidityInfo(item)
      );
    });
    return null;
  }

  const { email, password } = formSignInObj.getInputValues();
  try {
    const data = await mainAPI.signIn({
      email: email.value,
      password: password.value,
    });
    localStorage.setItem('token', data.token);
    setAuthorization().then();
    popupObj.closePopup();
    searchFormObj.resetInput();
    searchFormObj.setInputErrorMessage(
      formValidatorObj.resetInputValidityInfo(searchFormObj.getInput())
    );
  } catch (err) {
    formSignInObj.showPrompt();
    if (err.status === 401) {
      formSignInObj.setPrompt('Введен неверный логин или пароль');
    } else if (err.status === 400) {
      formSignInObj.setPrompt('Введены невалидные данные');
    } else {
      formSignInObj.setPrompt('Серверная ошибка. Подождите и повторите.');
    }
  }
};

const signUpHandler = async () => {
  if (!formValidatorObj.isValidForm(formSignUpObj.getInputs())) {
    formSignUpObj.getInputs().map((item) => {
      formSignUpObj.setInputErrorMessage(
        formValidatorObj.getInputValidityInfo(item)
      );
    });
    return null;
  }

  const { email, password, name } = formSignUpObj.getInputValues();
  try {
    const data = await mainAPI.signUp({
      email: email.value,
      password: password.value,
      name: name.value,
    });
    formSignUpObj.closeForm();
    notificationObj.setStateActive(true);
    notificationObj.setToggleListener();
  } catch (err) {
    formSignUpObj.showPrompt();
    if (err.status === 409) {
      formSignUpObj.setPrompt('Такой пользовтель уже существует');
    } else if (err.status === 400) {
      formSignUpObj.setPrompt('Введены невалидные данные');
    } else {
      formSignUpObj.setPrompt('Серверная ошибка. Подождите и повторите.');
    }
  }
};

const toggleNotificationHandler = () => {
  notificationObj.setStateActive(false);
  notificationObj.removeToggleListener();
  openForm(formSignInObj);
};

const searchNewsHandler = () => {
  const inputValidityInfo = formValidatorObj.getInputValidityInfo(
    searchFormObj.getInput()
  );
  if (!inputValidityInfo.isValid) {
    searchFormObj.setInputErrorMessage(inputValidityInfo);
    return null;
  }
  noResultsObj.hideNoResults();
  resultsObj.hideResults();
  loaderObj.showLoader();
  articlesObj.removeArticles();
  const key = searchFormObj.getInputValue().value;
  newsAPI
    .getNews(key)
    .then((news) => {
      if (news.length === 0) {
        noResultsObj.showNoResults();
      } else {
        resultsObj.showResults();
        resultsObj.setStateResults(true);
        resultsObj.setShowMoreButtonListener();
        articlesObj.convertAndSetNews(news, key);
        articlesObj.renderPartArticles();
        if (articlesObj.isNumberMoreArticle()) {
          resultsObj.setStateButton(false);
        }
      }
    })
    .catch((err) => {
      console.log(err);
      resultsObj.showResults();
      resultsObj.setStateResults(false);
    })
    .finally(() => {
      loaderObj.hideLoader();
      searchFormObj.resetInput();
      searchFormObj.setInputErrorMessage(
        formValidatorObj.resetInputValidityInfo(searchFormObj.getInput())
      );
    });
};

const onInputFormHandler = (input, form) => {
  form.setInputErrorMessage(formValidatorObj.getInputValidityInfo(input));
  form.setButtonState(formValidatorObj.isValidForm(form.getInputs()));
};
const onInputSearchFormHandler = (form) => {
  form.setInputErrorMessage(
    formValidatorObj.resetInputValidityInfo(form.getInput())
  );
};

const resultsObj = new Results(results, showMoreHandler);
const articlesObj = new Articles(articles, createArticle);
const searchFormObj = new SearchForm(
  searchForm,
  searchNewsHandler,
  onInputSearchFormHandler
);
const formSignUpObj = new Form(
  formSignUp,
  toggleFormHandler,
  onInputFormHandler,
  signUpHandler
);
const formValidatorObj = new FormValidator();
const formSignInObj = new Form(
  formSignIn,
  toggleFormHandler,
  onInputFormHandler,
  signInHandler
);
const notificationObj = new Notification(
  notification,
  toggleNotificationHandler
);

const onClickBtnSignUpLogoutHandler = () => {
  if (!userInfoObj.getAuth()) {
    navbarObj.setStateNavbar();
    popupObj.openPopup();
    popupObj.setListeners();
    formSignInObj.closeForm();
    notificationObj.setStateActive(false);
    notificationObj.removeToggleListener();
    openForm(formSignUpObj);
    formSignUpObj.hidePrompt();
  } else {
    localStorage.removeItem('token');
    setAuthorization().then();
    articlesObj.resetArticles();
    articlesObj.renderPartArticles();
  }
};

const setAuthorization = async () => {
  try {
    const userInfo = await mainAPI.getUserInfo();
    userInfoObj.setUserInfo(userInfo);
    userInfoObj.setAuthState(true);
    headerObj.setStateHeader(userInfoObj.getAuth(), userInfoObj.getNameUser());
  } catch {
    userInfoObj.setUserInfo(null);
    userInfoObj.setAuthState(false);
    headerObj.setStateHeader(userInfoObj.getAuth(), null);
  }
};

setAuthorization();

btnSignUpLogout.addEventListener('click', onClickBtnSignUpLogoutHandler);
btnNavbar.addEventListener('click', navbarObj.setStateNavbar);
searchFormObj.setListeners();
