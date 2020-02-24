import * as axios from 'axios';

/*https://www.googleapis.com/customsearch/v1?key=AIzaSyC33uQUOr7QgbO20D6orLrWeRROOVu0Xgs&cx=004978606921782811422:43e414canbf&q=pasta&searchType=image*/
export const retrieveImages = searchTerm => {
  const CSE_ID = '004978606921782811422:43e414canbf',
    CSE_API_KEY = 'AIzaSyC33uQUOr7QgbO20D6orLrWeRROOVu0Xgs';

  let parameters = '&q=' + encodeURIComponent('pasta');
  parameters += '&searchType=image';

  let host = 'https://www.googleapis.com/customsearch/v1';
  let path =
    '/customsearch/v1?key=' + CSE_API_KEY + '&cx=' + CSE_ID + parameters;
  console.log(host + path);
  let headers = {
    'Content-Type': 'application/json',
  };
  return axios
    .get(host, {
      params: {
        key: CSE_API_KEY,
        cx: CSE_ID,
        q: encodeURIComponent(searchTerm),
        searchType: 'image',
      },
      headers: headers,
    })
    .then(res => {
      return res;
    })
    .catch(error => {
      console.error('Image retrieving error : ', error);
    });
};
