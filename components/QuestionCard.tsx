import type { Question } from "@/data/exams";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer?: string;
  disabled?: boolean;
  onSelect: (answer: string) => void;
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  disabled = false,
  onSelect,
}: QuestionCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        Question {questionNumber}
      </p>
      <h2 className="mt-3 text-xl font-semibold leading-8 text-navy sm:text-2xl">
        {question.question}
      </h2>

      <fieldset className="mt-6 space-y-3">
        <legend className="sr-only">Choose one answer</legend>
        {question.options.map((option, index) => {
          const selected = selectedAnswer === option;

          return (
            <label
              key={option}
              className={`flex min-h-14 items-center gap-3 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${
                disabled
                  ? "cursor-not-allowed opacity-65"
                  : selected
                    ? "cursor-pointer border-primary bg-blue-50 text-navy"
                    : "cursor-pointer border-border text-slate-700 hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name={`answer-${question.id}`}
                value={option}
                checked={selected}
                disabled={disabled}
                onChange={() => onSelect(option)}
                className="size-4 accent-primary disabled:cursor-not-allowed"
              />
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-background text-xs font-semibold text-muted">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm font-medium leading-6 sm:text-base">{option}</span>
            </label>
          );
        })}
      </fieldset>
    </section>
  );
}
