class Loader {
  constructor(loader) {
    this._loader = loader;
  }

  showLoader = () => {
    this._loader.classList.remove('loader_disabled');
  };

  hideLoader = () => {
    this._loader.classList.add('loader_disabled');
  };
}

export default Loader;
