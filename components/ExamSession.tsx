"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Exam } from "@/data/exams";
import { EXAM_RESULT_STORAGE_KEY, type ExamResult } from "@/data/exam-results";
import QuestionCard from "@/components/QuestionCard";
import Timer from "@/components/Timer";

interface ExamSessionProps {
  exam: Exam;
}

export default function ExamSession({ exam }: ExamSessionProps) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showIncompleteMessage, setShowIncompleteMessage] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const hasSubmittedRef = useRef(false);
  const totalQuestions = exam.questions.length;
  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  const answeredCount = exam.questions.filter((question) => selectedAnswers[question.id] !== undefined).length;
  const unansweredCount = totalQuestions - answeredCount;

  useEffect(() => {
    window.sessionStorage.removeItem(EXAM_RESULT_STORAGE_KEY);
  }, []);

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-navy">No questions available</h2>
        <p className="mt-2 text-sm text-muted">This exam does not have any questions yet.</p>
      </div>
    );
  }

  function selectAnswer(answer: string) {
    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: answer,
    }));
  }

  function submitExam() {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    const questions = exam.questions.map((question) => {
      const userAnswer = selectedAnswers[question.id] ?? null;
      const status = userAnswer === null
        ? "unanswered"
        : userAnswer === question.correctAnswer
          ? "correct"
          : "wrong";

      return {
        id: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        status,
      } as const;
    });
    const correctAnswers = questions.filter((question) => question.status === "correct").length;
    const wrongAnswers = questions.filter((question) => question.status === "wrong").length;
    const unansweredQuestions = questions.filter((question) => question.status === "unanswered").length;
    const totalQuestions = questions.length;
    const result: ExamResult = {
      examId: exam.id,
      examTitle: exam.title,
      completedAt: new Date().toISOString(),
      score: correctAnswers,
      totalQuestions,
      percentage: totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100),
      correctAnswers,
      wrongAnswers,
      unansweredQuestions,
      attemptedQuestions: correctAnswers + wrongAnswers,
      questions,
    };

    try {
      window.sessionStorage.setItem(EXAM_RESULT_STORAGE_KEY, JSON.stringify(result));
      setIsSubmitted(true);
      router.push("/result");
    } catch {
      hasSubmittedRef.current = false;
      setSubmissionError("We couldn’t save your result in this browser. Please try submitting again.");
    }
  }

  function handleManualSubmit() {
    if (unansweredCount > 0) {
      setShowIncompleteMessage(true);
      return;
    }

    setShowIncompleteMessage(false);
    submitExam();
  }

  return (
    <div>
      {submissionError && (
        <p role="alert" className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {submissionError}
        </p>
      )}
      {showIncompleteMessage && unansweredCount > 0 && !isSubmitted && (
        <p role="alert" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          You have {unansweredCount} unanswered {unansweredCount === 1 ? "question" : "questions"}. Please answer all questions before submitting the exam.
        </p>
      )}
      {isSubmitted ? (
        <div role="status" className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Exam submitted. Results are not available yet.
        </div>
      ) : (
        <div className="mb-6 flex justify-end">
          <Timer duration={exam.duration} onTimeUp={submitExam} />
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted">Question</p>
          <p className="mt-1 text-lg font-semibold text-navy">
            {currentQuestionIndex + 1} <span className="font-normal text-muted">of {totalQuestions}</span>
          </p>
        </div>
        <p className="text-sm text-muted">
          <span className="font-semibold text-navy">{answeredCount}</span> of {totalQuestions} answered
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="Question progress"
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-valuenow={currentQuestionIndex + 1}
        className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <QuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        selectedAnswer={selectedAnswers[currentQuestion.id]}
        disabled={isSubmitted}
        onSelect={selectAnswer}
      />

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrentQuestionIndex((index) => Math.max(0, index - 1))}
          disabled={isSubmitted || currentQuestionIndex === 0}
          className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45 sm:px-5"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentQuestionIndex((index) => Math.min(totalQuestions - 1, index + 1))}
          disabled={isSubmitted || currentQuestionIndex === totalQuestions - 1}
          className="inline-flex min-h-12 min-w-0 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-45"
        >
          Next
        </button>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 border-t border-border pt-6">
        <button
          type="button"
          onClick={handleManualSubmit}
          disabled={isSubmitted}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-navy px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          Submit Exam
        </button>
        {!isSubmitted && <p className="text-xs text-muted">Submitting ends this attempt and opens your results.</p>}
      </div>
    </div>
  );
}
