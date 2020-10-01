import './pages/index.css';

const headerNavWrapper = document.querySelector('.header__nav-wrapper');
const btnCloseNav = document.querySelector('.header__nav-btn-active');
const btnCloseNavLines = document.querySelectorAll('.header__nav-btn-active-line');


const setActiveNavWrapper = () => {
  if (!headerNavWrapper.classList.contains('header__nav-wrapper_enabled')) {
    headerNavWrapper.classList.add('header__nav-wrapper_enabled');
  } else {
    headerNavWrapper.classList.remove('header__nav-wrapper_enabled');
  }
}

const setStateBtnCloseNav = () => {
  if (!btnCloseNavLines[0].classList.contains('header__nav-btn-active-line_enable')) {
    btnCloseNavLines[0].classList.add('header__nav-btn-active-line_enable');
    btnCloseNavLines[1].classList.add('header__nav-btn-active-line_enable');
  } else {
    btnCloseNavLines[0].classList.remove('header__nav-btn-active-line_enable');
    btnCloseNavLines[1].classList.remove('header__nav-btn-active-line_enable');
  }
}

const setFullState = () => {
  setStateBtnCloseNav();
  setActiveNavWrapper();
}

btnCloseNav.addEventListener('click', setFullState);


