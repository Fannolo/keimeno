import * as axios from 'axios';

/*https://www.googleapis.com/customsearch/v1?key=AIzaSyC33uQUOr7QgbO20D6orLrWeRROOVu0Xgs&cx=004978606921782811422:43e414canbf&q=pasta&searchType=image*/
export const searchImages = searchTerm => {
  const subscriptionKey = '9e00c4ffa83c4d47a2bd9d3113091ace';

  const host = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search';
  const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': subscriptionKey,
  };
  return axios
    .get(host, {
      params: {
        q: searchTerm,
        count: 20,
        safeSearch: 'Moderate',
      },
      headers: headers,
    })
    .then(res => {
      console.log('Results : ', res.data.value);
      return res.data.value;
    })
    .catch(error => {
      console.error('Image retrieving error : ', error);
    });
};
