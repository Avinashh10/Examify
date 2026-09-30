export const EXAM_RESULT_STORAGE_KEY = "examify:latest-result";

export type QuestionResultStatus = "correct" | "wrong" | "unanswered";

export interface QuestionResult {
  id: string;
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  status: QuestionResultStatus;
}

export interface ExamResult {
  examId: string;
  examTitle: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  correctAnswers: number;
  wrongAnswers: number;
  unansweredQuestions: number;
  attemptedQuestions: number;
  questions: QuestionResult[];
}
