import Link from "next/link";
import ExamSession from "@/components/ExamSession";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getExamById } from "@/data/exams";

interface ExamPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { id } = await params;
  const exam = getExamById(id);

  if (!exam) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-8 text-center shadow-sm sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Exam unavailable</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy">Exam Not Found</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              We couldn’t find an exam with that address. Browse the available exams to choose one.
            </p>
            <Link
              href="/exams"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Back to Exams
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-8 border-b border-border pb-6">
          <p className="text-sm font-semibold text-primary">{exam.category}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">{exam.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{exam.description}</p>
        </header>
        <ExamSession key={exam.id} exam={exam} />
      </main>
      <Footer />
    </>
  );
}
