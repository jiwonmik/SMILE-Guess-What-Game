import axios from 'axios';
import { IReqBody } from './types';

const BASE_URL = 'https://www.smile-similarity.org/smile/smile-guess';

export const getOpenAIResponse = async (input: IReqBody) => {
  const response = await axios.post(`${BASE_URL}`, input);
  return response;
};
