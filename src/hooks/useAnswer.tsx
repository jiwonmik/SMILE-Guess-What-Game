import { useQuery } from '@tanstack/react-query';
import { getOpenAIResponse } from '../api/api';
import { IReqBody } from '../api/types';

export default function useAnswer({ guess_word, question }: IReqBody) {
  return useQuery({
    queryKey: ['gptAnswer'],
    queryFn: () => getOpenAIResponse({ guess_word: guess_word, question: question }),
    refetchOnWindowFocus: false,
    enabled: false,
  });
}
