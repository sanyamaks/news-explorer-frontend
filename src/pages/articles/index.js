import './index.css';
import setFullState from  '../../testjs/setFullState'

const btnCloseNav = document.querySelector('.header__nav-btn-active');


btnCloseNav.addEventListener('click', setFullState);
