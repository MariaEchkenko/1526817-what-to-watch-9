type RatingItemProps = {
  item: number;
  onRatingChange: (item: number) => void;
}

function RatingItem({item, onRatingChange}: RatingItemProps): JSX.Element {
  return (
    <>
      <input
        className="rating__input"
        id={`star-${item}`}
        type="radio"
        name="rating"
        value={item}
        onChange={() => onRatingChange(item)}
      />
      <label className="rating__label" htmlFor={`star-${item}`}>
        {`Rating ${item}`}
      </label>
    </>
  );
}

export default RatingItem;
