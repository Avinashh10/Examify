"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  EXAM_RESULT_STORAGE_KEY,
  type ExamResult,
  type QuestionResult,
} from "@/data/exam-results";

function subscribeToResult(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getStoredResult(): string | null {
  try {
    return window.sessionStorage.getItem(EXAM_RESULT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isQuestionResult(value: unknown): value is QuestionResult {
  if (!isRecord(value)) return false;

  const validAnswer = typeof value.userAnswer === "string" || value.userAnswer === null;
  if (
    typeof value.id !== "string" ||
    typeof value.question !== "string" ||
    !validAnswer ||
    typeof value.correctAnswer !== "string"
  ) {
    return false;
  }

  if (value.status === "unanswered") return value.userAnswer === null;
  if (value.status === "correct") return value.userAnswer === value.correctAnswer;
  if (value.status === "wrong") {
    return typeof value.userAnswer === "string" && value.userAnswer !== value.correctAnswer;
  }
  return false;
}

function isExamResult(value: unknown): value is ExamResult {
  if (!isRecord(value)) return false;

  const numericFields = [
    "score",
    "totalQuestions",
    "percentage",
    "correctAnswers",
    "wrongAnswers",
    "unansweredQuestions",
    "attemptedQuestions",
  ] as const;
  const hasValidNumbers = numericFields.every(
    (field) => Number.isInteger(value[field]) && Number(value[field]) >= 0,
  );

  if (
    typeof value.examId !== "string" ||
    typeof value.examTitle !== "string" ||
    typeof value.completedAt !== "string" ||
    !Number.isFinite(Date.parse(value.completedAt)) ||
    !hasValidNumbers ||
    !Array.isArray(value.questions) ||
    !value.questions.every(isQuestionResult)
  ) {
    return false;
  }

  const total = Number(value.totalQuestions);
  const correct = Number(value.correctAnswers);
  const wrong = Number(value.wrongAnswers);
  const unanswered = Number(value.unansweredQuestions);
  const attempted = Number(value.attemptedQuestions);
  const expectedPercentage = total === 0 ? 0 : Math.round((correct / total) * 100);
  const reviewQuestions = value.questions as QuestionResult[];
  const reviewCorrect = reviewQuestions.filter((question) => question.status === "correct").length;
  const reviewWrong = reviewQuestions.filter((question) => question.status === "wrong").length;
  const reviewUnanswered = reviewQuestions.filter((question) => question.status === "unanswered").length;
  const questionIdsAreUnique = new Set(reviewQuestions.map((question) => question.id)).size === total;

  return (
    value.questions.length === total &&
    questionIdsAreUnique &&
    reviewCorrect === correct &&
    reviewWrong === wrong &&
    reviewUnanswered === unanswered &&
    correct + wrong + unanswered === total &&
    correct + wrong === attempted &&
    value.score === correct &&
    value.percentage === expectedPercentage &&
    Number(value.percentage) <= 100
  );
}

function parseResult(serialized: string | null): ExamResult | null {
  if (!serialized) return null;

  try {
    const parsed: unknown = JSON.parse(serialized);
    return isExamResult(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const summaryCards = [
  { key: "correctAnswers", label: "Correct", color: "text-emerald-700", surface: "bg-emerald-50" },
  { key: "wrongAnswers", label: "Wrong", color: "text-rose-700", surface: "bg-rose-50" },
  { key: "unansweredQuestions", label: "Unanswered", color: "text-amber-700", surface: "bg-amber-50" },
  { key: "attemptedQuestions", label: "Attempted", color: "text-primary", surface: "bg-blue-50" },
] as const;

export default function ResultPage() {
  const serializedResult = useSyncExternalStore(
    subscribeToResult,
    getStoredResult,
    () => null,
  );
  const result = useMemo(() => parseResult(serializedResult), [serializedResult]);

  return (
    <>
      <Navbar />
      {!result ? (
        <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-8 text-center shadow-sm sm:p-10">
            <span aria-hidden="true" className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-primary">?</span>
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-navy">Result not available.</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              Complete an exam first to see its score and answer review here.
            </p>
            <Link
              href="/exams"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Browse Exams
            </Link>
          </div>
        </main>
      ) : (
        <main className="mx-auto min-h-[60vh] max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
            <div className="bg-gradient-to-br from-navy to-[#1e3a6d] px-6 py-8 text-center text-white sm:px-10 sm:py-10">
              <span aria-hidden="true" className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-blue-100">✓</span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">Exam Completed!</p>
              <h1 className="mt-2 break-words text-2xl font-bold tracking-tight sm:text-3xl">{result.examTitle}</h1>
              <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-4 sm:gap-5">
                <div
                  aria-label={`${result.percentage}% score`}
                  className="flex size-28 shrink-0 items-center justify-center rounded-full p-2 sm:size-32"
                  style={{ background: `conic-gradient(#93c5fd ${result.percentage}%, rgba(255,255,255,0.18) 0)` }}
                >
                  <div className="flex size-full items-center justify-center rounded-full bg-navy">
                    <span className="text-3xl font-bold tabular-nums sm:text-4xl">{result.percentage}%</span>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-blue-100">Your score</p>
                  <p className="mt-1 text-2xl font-bold tabular-nums sm:text-3xl">
                    {result.score} <span className="text-lg font-medium text-blue-100">/ {result.totalQuestions}</span>
                  </p>
                  <p className="mt-1 text-xs text-blue-100">
                    {new Date(result.completedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid grid-cols-2 gap-3 min-[1025px]:grid-cols-4">
                {summaryCards.map((card) => (
                  <div key={card.key} className="rounded-2xl border border-border p-4 sm:p-5">
                    <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${card.surface} ${card.color}`}>
                      {card.label}
                    </span>
                    <p className="mt-3 text-2xl font-bold tabular-nums text-navy sm:text-3xl">
                      {result[card.key]}
                    </p>
                    <p className="mt-1 text-xs text-muted">questions</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/exam/${encodeURIComponent(result.examId)}`}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
                >
                  Try Again
                </Link>
                <Link
                  href="/exams"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto"
                >
                  Back to Exams
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-10" aria-labelledby="question-review-heading">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Review your attempt</p>
              <h2 id="question-review-heading" className="mt-2 text-2xl font-bold tracking-tight text-navy">Question Review</h2>
            </div>
            <div className="space-y-4">
              {result.questions.map((question, index) => (
                <QuestionReview key={question.id} question={question} questionNumber={index + 1} />
              ))}
            </div>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}

function QuestionReview({ question, questionNumber }: { question: QuestionResult; questionNumber: number }) {
  const statusStyles = {
    correct: "bg-emerald-50 text-emerald-800 border-emerald-200",
    wrong: "bg-rose-50 text-rose-800 border-rose-200",
    unanswered: "bg-amber-50 text-amber-800 border-amber-200",
  }[question.status];
  const statusLabels = {
    correct: "Correct",
    wrong: "Incorrect",
    unanswered: "Unanswered",
  }[question.status];

  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="max-w-3xl font-semibold leading-6 text-navy">
          <span className="mr-2 text-sm font-medium text-muted">Q{questionNumber}.</span>
          {question.question}
        </h3>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles}`}>
          <span aria-hidden="true">{question.status === "correct" ? "✓" : question.status === "wrong" ? "×" : "–"}</span>
          {statusLabels}
        </span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Your answer</dt>
          <dd className={`mt-1 font-medium ${question.status === "correct" ? "text-emerald-700" : question.status === "wrong" ? "text-rose-700" : "text-muted"}`}>
            {question.userAnswer ?? "Not answered"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-muted">Correct answer</dt>
          <dd className="mt-1 font-medium text-emerald-700">{question.correctAnswer}</dd>
        </div>
      </dl>
    </article>
  );
}
