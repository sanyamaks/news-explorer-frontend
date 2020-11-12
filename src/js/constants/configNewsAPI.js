const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const configNewsAPI = {
  baseUrl: isDev ? 'https://newsapi.org' : 'https://nomoreparties.co',
  endPoint: isDev ? '/v2/everything' : '/news/v2/top-headlines',
  pageSize: 100,
  apiKey: 'd7ccae45ca9b4423a7ee6266da975c9b',
};

export default configNewsAPI;
