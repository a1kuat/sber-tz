export interface ApiResult {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }
  
  export interface ApiResponse {
    response_code: number;
    results: ApiResult[];
  }
  
  export interface QuestionAndAnswers {
    question: string;
    correct_answer: string;
    answers: string[];
    difficulty: string;
  }
  export enum View {
    Create = 'create',
    Quiz = 'quiz',
    Done = 'done'
  }
  
  export interface CreateQuizFormValues {
    category: string;
    amount: number;
    difficulty: string;
    type: string;
  }
  
  export interface QuizFormValues {
    answers: string[];
  }