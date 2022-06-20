export const LOADMOREARTICLES = 'LOADMOREARTICLES';
export const RELOADARTICLES = 'RELOADARTICLES';
export const SEARCHFORARTICLES = 'SEARCHFORARTICLES';

export const loadMoreArticles = (token, currentPage, value) => {
  return async dispatch => {
    const response = await fetch(
      `http://34.245.213.76:3000/articles?page=${currentPage}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
    }

    const resData = await response.json();

    if (resData.response.docs.length == 0)
      throw new Error('No more data to load');
    dispatch({type: LOADMOREARTICLES, articles: resData.response, value});
  };
};

export const reloadArticles = token => {
  return async dispatch => {
    const response = await fetch(`http://34.245.213.76:3000/articles?page=0`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
    }

    const resData = await response.json();
    dispatch({type: RELOADARTICLES, articles: resData.response});
  };
};

export const searchForArticles = (searchInput, currentArticles) => {
  const filteredList = currentArticles.filter(item =>
    item.title.includes(searchInput),
  );
  return {
    type: SEARCHFORARTICLES,
    fileredList: filteredList,
  };
};
