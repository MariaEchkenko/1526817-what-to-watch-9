import request from 'axios';
import { toast } from 'react-toastify';
import { ErrorType } from '../types/error';
import { HTTP_CODE } from '../const';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const {response} = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BadRequest:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.Unauthorized:
        toast.info(response.data.error);
        break;
      case HTTP_CODE.NotFound:
        toast.info(response.data.error);
        break;
      default:
        toast.info(`Unknown error: ${response.data.error}`);
    }
  }
};
