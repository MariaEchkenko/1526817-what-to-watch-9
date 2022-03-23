import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { films } from './mocks/films';
import { store } from './store';


const promoFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        promoFilmName={promoFilm.name}
        promoFilmGenre={promoFilm.genre}
        promoFilmYear={promoFilm.year}
        films={films}
      />
    </Provider>
  </React.StrictMode>, document.getElementById('root'));
