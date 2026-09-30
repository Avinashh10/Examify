import ExamCard from "@/components/ExamCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { exams } from "@/data/exams";

export default function ExamsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh]">
        <section className="border-b border-border bg-gradient-to-b from-white to-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Learn, practice, improve
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Explore Exams
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Choose an exam and test your knowledge. Each assessment gives you
              a focused way to practice and build confidence.
            </p>
            {exams.length > 0 && (
              <p className="mt-5 text-sm font-medium text-muted">
                {exams.length} exams available
              </p>
            )}
          </div>
        </section>

        <section aria-label="Available exams" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {exams.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-4 min-[481px]:grid-cols-2 min-[481px]:gap-5 min-[1025px]:grid-cols-3">
              {exams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-14 text-center">
              <h2 className="text-lg font-semibold text-navy">No exams available yet</h2>
              <p className="mt-2 text-sm text-muted">
                Please check back soon for new exams to explore.
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
