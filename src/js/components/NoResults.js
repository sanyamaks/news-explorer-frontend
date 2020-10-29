class NoResults {
  constructor(noResults) {
    this._noResults = noResults;
  }

  showNoResults = () => {
    this._noResults.classList.remove('no-results_disabled');
  };

  hideNoResults = () => {
    if (!this._noResults.classList.contains('no-results_disabled')) {
      this._noResults.classList.add('no-results_disabled');
    }
  };
}

export default NoResults;
