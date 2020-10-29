const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';

const configMainAPI = {
  baseUrl: isDev ? 'http://localhost:3000' : 'https://api.aleksmaksimovnews.tk',
  headers: {
    'Content-Type': 'application/json',
    authorization: null,
  },
};

export default configMainAPI;
