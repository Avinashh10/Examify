import Link from "next/link";
import type { Exam } from "@/data/exams";

interface ExamCardProps {
  exam: Exam;
}

const difficultyStyles: Record<Exam["difficulty"], string> = {
  Easy: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Medium: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Hard: "bg-rose-50 text-rose-700 ring-rose-600/15",
};

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">
          {exam.category}
        </span>
        <span className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${difficultyStyles[exam.difficulty]}`}>
          {exam.difficulty}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-bold tracking-tight text-navy">{exam.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-6 text-muted">{exam.description}</p>

      <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-sm text-muted">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Duration</dt>
          <span aria-hidden="true" className="text-primary">◷</span>
          <dd>{exam.duration} min</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Questions</dt>
          <span aria-hidden="true" className="text-primary">▤</span>
          <dd>{exam.questions.length} questions</dd>
        </div>
      </dl>

      <Link
        href={`/exam/${exam.id}`}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Start Exam
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
          <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </article>
  );
}
