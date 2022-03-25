import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { store } from './store';
import { checkAuthAction, fetchMovieAction } from './store/api-actions';

const promoFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
};

store.dispatch(fetchMovieAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        promoFilmName={promoFilm.name}
        promoFilmGenre={promoFilm.genre}
        promoFilmYear={promoFilm.year}
      />
    </Provider>
  </React.StrictMode>, document.getElementById('root'));
