import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-reviews/film-reviews';
import classNames from 'classnames';

const getComponentByTab = (activeTab: string, film: Movie) => {
  switch (activeTab) {
    case 'Overview':
      return <FilmOverview film={film} />;
    case 'Details':
      return <FilmDetails film={film} />;
    case 'Reviews':
      return <FilmReviews reviews={film.review} />;
  }
};

type TabsProps = {
  film: Movie;
}

const TABS = ['Overview', 'Details', 'Reviews'];

function Tabs({film}: TabsProps): JSX.Element {

  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {TABS.map((tab) => (
            <li
              key={tab}
              className={classNames('film-nav__item', {
                'film-nav__item--active': tab === activeTab,
              })}
              onClick={() => setActiveTab(tab)}
            >
              <Link to={'#'} className="film-nav__link">{tab}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {getComponentByTab(activeTab, film)}
    </>
  );
}

export default Tabs;
