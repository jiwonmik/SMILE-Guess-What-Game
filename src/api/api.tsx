import axios from 'axios';
import { IReqBody, IResBody } from './types';

const BASE_URL = 'https://www.smile-similarity.org/smile/smile-guess';

export const getOpenAIResponse = async (input: IReqBody): Promise<IResBody> => {
  const response = await axios.post<IResBody>(`${BASE_URL}`, input);
  return response.data;
};
