function Tabs(): JSX.Element {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li className="film-nav__item">
          <a href="/" className="film-nav__link">Overview</a>
        </li>
        <li className="film-nav__item film-nav__item--active">
          <a href="/" className="film-nav__link">Details</a>
        </li>
        <li className="film-nav__item">
          <a href="/" className="film-nav__link">Reviews</a>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;
