export interface QuizDto {
  id?: number;
  authorId?: number;
  title: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  questions: QuizQuestionDto[];
}

export interface QuizQuestionDto {
  id?: number;
  quizId?: number;
  text: string;
  allowsMultipleAnswers: boolean;
  options: QuizAnswerOptionDto[];
}

export interface QuizAnswerOptionDto {
  id?: number;
  questionId?: number;
  text: string;
  feedback: string;
  isCorrect: boolean;
}

export interface SubmitQuizAnswersDto {
  quizId: number;
  answers: QuestionAnswerDto[];
}

export interface QuestionAnswerDto {
  questionId: number;
  selectedOptionIds: number[];
}

export interface QuizEvaluationResultDto {
  quizId: number;
  questions: QuestionEvaluationResultDto[];
}

export interface QuestionEvaluationResultDto {
  questionId: number;
  isCompletelyCorrect: boolean;
  options: OptionEvaluationDto[];
}

export interface OptionEvaluationDto {
  optionId: number;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
  feedback: string;
}