import './index.css';
import Navbar from '../../js/components/Navbar';
import UserInfo from '../../js/components/UserInfo';
import Header from '../../js/components/Header';
import MainAPI from '../../js/API/MainAPI';
import SavedArticles from '../../js/components/SavedArticles';
import Articles from '../../js/components/Articles';
import SavedArticle from '../../js/components/Article/SavedArticle/SavedArticle';
import CommonInfo from '../../js/components/CommonInfo';

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const configMainAPI = {
  baseUrl: isDev
    ? 'http://localhost:3000'
    : 'https://api.aleksmaksimovnews.tk',
  headers: {
    'Content-Type': 'application/json',
    authorization: null,
  },
};

const navbarWrapper = document.querySelector('.header__nav-wrapper');
const btnNavbar = document.querySelector('.header__nav-btn-active');
const header = document.querySelector('.header');
const btnSignUpLogout = document.querySelector('.header__button');
const savedArticles = document.querySelector('.saved-articles');
const articles = document.querySelector('.articles');
const commonInfo = document.querySelector('.common-info');

const navbarObj = new Navbar(navbarWrapper, btnNavbar);
const userInfoObj = new UserInfo();
const headerObj = new Header(header, btnSignUpLogout);
const savedArticlesObj = new SavedArticles(savedArticles);
const mainAPI = new MainAPI(configMainAPI);
const commonInfoObj = new CommonInfo(commonInfo);

const hoverIconArticleHandler = (event, article) => {
  if (event.type === 'mouseover') {
    article.showIconArticle();
  } else if (event.type === 'mouseout') {
    article.hideIconArticle();
  }
};

const deleteArticleHandler = async (id) =>
  await mainAPI
    .removeNews(id)
    .then(() => {
      const positionDeletedArticle = articlesObj
        .getNews()
        .findIndex((item) => item._id === id);
      const newsBeforePositionDeletedArticle = articlesObj
        .getNews()
        .slice(0, positionDeletedArticle);
      const newsAfterPositionDeletedArticle = articlesObj
        .getNews()
        .slice(positionDeletedArticle + 1, articlesObj.getNews().length);
      articlesObj.setNews([
        ...newsBeforePositionDeletedArticle,
        ...newsAfterPositionDeletedArticle,
      ]);
      if (articlesObj.getNews().length === 0) {
        savedArticlesObj.hideSavedArticles();
      }
      commonInfoObj.setStateCommonInfo(
        userInfoObj.getNameUser(),
        articlesObj.getNews().map((item) => item.keyword)
      );
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

const createArticle = (newsItem) => {
  const articleObj = new SavedArticle(
    newsItem,
    deleteArticleHandler,
    hoverIconArticleHandler
  );

  return articleObj.getArticle();
};

const articlesObj = new Articles(articles, createArticle);

const onClickBtnSignUpLogoutHandler = () => {
  if (!userInfoObj.getAuth()) {
    return null;
  } else {
    localStorage.removeItem('token');
    setAuthorization().then();
  }
};

const setAuthorization = async () => {
  try {
    const userInfo = await mainAPI.getUserInfo();
    userInfoObj.setUserInfo(userInfo);
    userInfoObj.setAuthState(true);
    headerObj.setStateHeader(userInfoObj.getAuth(), userInfoObj.getNameUser());
    const savedListArticles = await mainAPI.getArticles();
    commonInfoObj.setKeywords(userInfoObj.getNameUser(), []);
    if (savedListArticles.length === 0) {
      savedArticlesObj.hideSavedArticles();
    } else {
      savedArticlesObj.showSavedArticles();
      savedArticlesObj.setStateSavedArticles(false);
      articlesObj.setNews(savedListArticles);
      articlesObj.renderArticles();
    }
    commonInfoObj.setStateCommonInfo(
      userInfoObj.getNameUser(),
      savedListArticles.map((item) => item.keyword)
    );
  } catch (err) {
    window.location.href = './index.html';
  }
};

setAuthorization();

btnSignUpLogout.addEventListener('click', onClickBtnSignUpLogoutHandler);
btnNavbar.addEventListener('click', navbarObj.setStateNavbar);
