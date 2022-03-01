import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {films} from './mocks/films';

const promoFilm = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      promoFilmName ={promoFilm.name}
      promoFilmGenre ={promoFilm.genre}
      promoFilmYear ={promoFilm.year}
      films ={films}
    />
  </React.StrictMode>, document.getElementById('root'));
