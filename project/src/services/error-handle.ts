import request from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/error';
import { HttpCode } from '../const';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.info(response.data.error);
        break;
      case HttpCode.Unauthorized:
        toast.info('You are not logged in. Application features are limited');
        break;
      case HttpCode.NotFound:
        toast.info(response.data.error);
        break;
      default:
        toast.info(`Unknown error: ${response.data.error}`);
    }
  }
};
