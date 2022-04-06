import { AxiosInstance } from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, State, ReviewsData } from '../../types/state';
import { Comment, Comments, userComment } from '../../types/comment';
import { errorHandle } from '../../services/error-handle';
import { redirectToRoute } from '../action';
import { LoadingStatus, AppRoute, APIRoute, NameSpace } from '../../const';

export const fetchReviewsAction = createAsyncThunk<Comments, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      return data;
    } catch (error) {
      errorHandle(error);
      throw error;
    }
  },
);

export const sendUserReviewAction = createAsyncThunk<Comment, userComment, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/sendUserReview',
  async ({id, rating, comment}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post(`${APIRoute.Comments}/${id}`, {rating, comment});
      dispatch(redirectToRoute(`${AppRoute.Film}/${id}`));
      return data;
    } catch (error) {
      errorHandle(error);
      throw error;
    }
  },
);

const initialState: ReviewsData = {
  reviews: [],
  userReview: null,
  reviewsStatus: LoadingStatus.IDLE,
  reviewSendedStatus: LoadingStatus.IDLE,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.reviewsStatus = LoadingStatus.LOADING;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.reviewsStatus = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.reviewsStatus = LoadingStatus.FAILED;
      })
      .addCase(sendUserReviewAction.pending, (state) => {
        state.reviewSendedStatus = LoadingStatus.LOADING;
      })
      .addCase(sendUserReviewAction.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.reviewSendedStatus = LoadingStatus.SUCCEEDED;
      })
      .addCase(sendUserReviewAction.rejected, (state) => {
        state.reviewSendedStatus = LoadingStatus.FAILED;
      });
  },
});
