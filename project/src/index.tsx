import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { checkAuthAction } from './store/user-process/user-process';
import { fetchMoviesAction, fetchPromoFilmAction } from './store/films-data/films-data';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchMoviesAction());
store.dispatch(fetchPromoFilmAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>, document.getElementById('root'));
