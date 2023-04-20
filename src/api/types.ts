export interface IReqBody {
  question: string;
  target_word: string;
}

export interface IResBody {
  question?: string;
  valid?: boolean;
  gpt_response?: string;
}
