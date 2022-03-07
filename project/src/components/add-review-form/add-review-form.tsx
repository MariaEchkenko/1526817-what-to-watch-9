import {useState} from 'react';
import RatingItem from '../rating-item/rating-item';

//const RATING_ITEMS = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function AddReviewForm(): JSX.Element {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleInputChange = (item: number): void => setRating(item);

  return (
    <form action="#" className="add-review__form">
      <div className="rating">
        <div className="rating__stars">
          {Array.from({length:10}, (k, i) => (
            <RatingItem
              key={i+1}
              item={i+1}
              onRatingChange={handleInputChange}
            />
          )).reverse()}
        </div>
      </div>
      <h1 className="visually-hidden">{rating}</h1> {/*Добавила пока,чтобы не крашилась сборка*/}

      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          value={review}
          onChange={(evt) => setReview(evt.target.value)}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}

export default AddReviewForm;
