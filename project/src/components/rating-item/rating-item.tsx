type RatingItemProps = {
  item: number;
  onChecked: (item: number) => void;
}

function RatingItem({item, onChecked}: RatingItemProps): JSX.Element {
  return (
    <>
      <input
        className="rating__input"
        id={`star-${item}`}
        type="radio"
        name="rating"
        value={item}
        onChange={() => onChecked(item)}
      />
      <label className="rating__label" htmlFor={`star-${item}`}>
        {`Rating ${item}`}
      </label>
    </>
  );
}

export default RatingItem;
