import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, store } from '../index';
import { ReviewsData } from '../../types/state';
import { Comments, userComment } from '../../types/comment';
import { errorHandle } from '../../services/error-handle';
import { redirectToRoute } from '../action';
import { LoadingStatus, AppRoute, APIRoute, NameSpace } from '../../const';

export const fetchReviewsAction = createAsyncThunk(
  'data/fetchReviews',
  async (id: number) => {
    try {
      const {data} = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
      return data;
    } catch (error) {
      errorHandle(error);
      throw error;
    }
  },
);

export const sendUserReviewAction = createAsyncThunk(
  'data/sendUserReview',
  async ({id, rating, comment}: userComment) => {
    try {
      const {data} = await api.post<userComment>(`${APIRoute.Comments}/${id}`, {rating, comment});
      store.dispatch(redirectToRoute(`${AppRoute.Film}/${id}`));
      return data;
    } catch (error) {
      errorHandle(error);
    }
  },
);

const initialState: ReviewsData = {
  reviews: [],
  userReview: null,
  isReviewsLoaded: LoadingStatus.IDLE,
  isReviewSended: LoadingStatus.IDLE,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsLoaded = LoadingStatus.LOADING;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoaded = LoadingStatus.SUCCEEDED;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoaded = LoadingStatus.FAILED;
      })
      .addCase(sendUserReviewAction.pending, (state) => {
        state.isReviewSended = LoadingStatus.LOADING;
      })
      .addCase(sendUserReviewAction.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.isReviewSended = LoadingStatus.SUCCEEDED;
      })
      .addCase(sendUserReviewAction.rejected, (state) => {
        state.isReviewSended = LoadingStatus.FAILED;
      });
  },
});
