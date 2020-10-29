class Navbar {
  constructor(navbarWrapper, btnNavbar) {
    this._navbarWrapper = navbarWrapper;
    this._btnNavbarLines = btnNavbar.querySelectorAll(
      '.header__nav-btn-active-line'
    );
  }

  _setStateNavWrapper = () => {
    if (
      !this._navbarWrapper.classList.contains('header__nav-wrapper_enabled')
    ) {
      this._navbarWrapper.classList.add('header__nav-wrapper_enabled');
    } else {
      this._navbarWrapper.classList.remove('header__nav-wrapper_enabled');
    }
  };

  _setStateBtnNavbar = () => {
    if (
      !this._btnNavbarLines[0].classList.contains(
        'header__nav-btn-active-line_enable'
      )
    ) {
      this._btnNavbarLines[0].classList.add(
        'header__nav-btn-active-line_enable'
      );
      this._btnNavbarLines[1].classList.add(
        'header__nav-btn-active-line_enable'
      );
    } else {
      this._btnNavbarLines[0].classList.remove(
        'header__nav-btn-active-line_enable'
      );
      this._btnNavbarLines[1].classList.remove(
        'header__nav-btn-active-line_enable'
      );
    }
  };

  setStateNavbar = () => {
    this._setStateNavWrapper();
    this._setStateBtnNavbar();
  };
}
export default Navbar;
