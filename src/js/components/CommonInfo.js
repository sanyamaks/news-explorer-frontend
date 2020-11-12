class CommonInfo {
  constructor(commonInfo) {
    this._commonInfo = commonInfo;
    this._title = this._commonInfo.querySelector('.common-info__notice');
    this._keywords = this._commonInfo.querySelector('.common-info__keywords');
    this._enumerationKeywords = this._commonInfo.querySelector(
      '.common-info__enumeration-keywords'
    );
  }

  setStateCommonInfo = (name, keywordsList) => {
    this._setTitle(name, keywordsList.length);
    this.setKeywords(this._setListUniqueKeywords(keywordsList));
  };

  _setTitle = (name, number) => {
    this._title.textContent = `${name}, у вас ${
      number === 0 ? 'нету' : number
    } ${this._getCaseSavedArticles(number)}`;
  };

  _getCaseSavedArticles = (number) => {
    const remainder = number % 10;
    switch (remainder) {
      case 1: {
        return 'сохранённая статья';
      }
      case 2:
      case 3:
      case 4: {
        return 'сохранённые статьи';
      }
      default: {
        return 'сохранённых статей';
      }
    }
  };

  setKeywords = (keywordsList) => {
    if (keywordsList.length === 0) {
      if (
        !this._keywords.classList.contains('common-info__keywords_disabled')
      ) {
        this._keywords.classList.add('common-info__keywords_disabled');
      }
    } else {
      if (this._keywords.classList.contains('common-info__keywords_disabled')) {
        this._keywords.classList.remove('common-info__keywords_disabled');
      }
      this._enumerationKeywords.textContent = keywordsList;
    }
  };

  _setListUniqueKeywords = (keywordsList) => {
    const objUniqueKeywords = {};
    keywordsList.forEach((item) => {
      if (!(item in objUniqueKeywords)) {
        objUniqueKeywords[item] = 1;
      } else {
        objUniqueKeywords[item] += 1;
      }
    });

    const listUniqueKeywords = [];
    for (let key in objUniqueKeywords) {
      listUniqueKeywords.push({ keyword: key, number: objUniqueKeywords[key] });
    }

    listUniqueKeywords.sort((a, b) => b.number - a.number);

    if (listUniqueKeywords.length > 3) {
      return `${listUniqueKeywords[0].keyword}, ${
        listUniqueKeywords[1].keyword
      } и ${listUniqueKeywords.length - 2} другим`;
    }
    return listUniqueKeywords.reduce((acc, item, index) => {
      if (index === 0) {
        return item.keyword;
      } else {
        return `${acc}, ${item.keyword}`;
      }
    }, '');
  };
}

export default CommonInfo;
