import {TabActions} from '@react-navigation/native';
import Article from '../../models/Article';
import {
  LOADMOREARTICLES,
  SEARCHFORARTICLES,
  RELOADARTICLES,
} from '../actions/articles';

const initialState = {
  articles: [],
  filteredArticles: [],
  currentPage: 0,
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case LOADMOREARTICLES:
      const newArticles = [];
      for (var i = 0; i < action.articles.docs.length; i++) {
        let article = action.articles.docs[i];
        const image = null;
        const isFound = state.articles.some(element =>
          element.id === article._id ? true : false,
        );
        if (article.multimedia.length != 0)
          image = 'https://www.nytimes.com/' + article.multimedia[0].url;
        if (!isFound) {
          newArticles.push(
            new Article(
              article._id,
              article.headline.main,
              article.lead_paragraph,
              article.byline.person.firstname,
              article.byline.person.lastname,
              article.pub_date,
              image,
            ),
          );
        }
      }
      return {
        ...state,
        articles: state.articles.concat(newArticles),
        filteredArticles: [],
        currentPage: state.currentPage + 1,
      };
    case RELOADARTICLES:
      const fetchArticles = [];
      for (var i = 0; i < action.articles.docs.length; i++) {
        let article = action.articles.docs[i];
        const image = null;
        if (article.multimedia.length != 0)
          image = 'https://www.nytimes.com/' + article.multimedia[0].url;

        fetchArticles.push(
          new Article(
            article._id,
            article.headline.main,
            article.lead_paragraph,
            article.byline.person.firstname,
            article.byline.person.lastname,
            article.pub_date,
            image,
          ),
        );
      }
      return {
        ...state,
        articles: fetchArticles,
        filteredArticles: [],
        currentPage: 1,
      };
    case SEARCHFORARTICLES:
      return {
        ...state,
        articles: state.articles,
        filteredArticles: action.fileredList,
        currentPage: state.currentPage,
      };
  }
  return initialState;
};

export default articles;
