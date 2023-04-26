export interface IReqBody {
  question: string;
  guess_word: string;
}

export interface IResBody {
  question?: string;
  valid?: boolean;
  gpt_response?: string;
}
