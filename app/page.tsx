import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    title: "Interactive Exams",
    description: "Practice with focused questions that keep you engaged as you learn.",
    icon: "✳",
    color: "bg-blue-50 text-primary",
  },
  {
    title: "Timed Assessments",
    description: "Build confidence working within a clear, realistic time limit.",
    icon: "◷",
    color: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Instant Results",
    description: "See your score as soon as you finish and understand how you did.",
    icon: "✓",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Track Your Performance",
    description: "Keep an eye on your progress and find areas to practice next.",
    icon: "↗",
    color: "bg-amber-50 text-amber-700",
  },
];

const sampleExams = [
  {
    title: "Foundations of Mathematics",
    category: "Mathematics",
    questions: 20,
    duration: "30 min",
    color: "from-blue-600 to-indigo-700",
    mark: "∑",
  },
  {
    title: "General Science Essentials",
    category: "Science",
    questions: 25,
    duration: "35 min",
    color: "from-teal-600 to-emerald-700",
    mark: "⚛",
  },
  {
    title: "English Language Skills",
    category: "English",
    questions: 18,
    duration: "25 min",
    color: "from-violet-600 to-purple-700",
    mark: "Aa",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4">
      <path d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroVisual() {
  return (
    <div aria-label="Illustration of an online exam and a progress report" role="img" className="relative mx-auto w-full max-w-xl py-8 sm:py-12">
      <div className="absolute inset-8 rounded-[2.5rem] bg-blue-100/70 blur-2xl" />
      <div className="relative rounded-[2rem] border border-white/80 bg-gradient-to-br from-blue-100 via-slate-100 to-indigo-100 p-5 shadow-xl shadow-blue-900/10 sm:p-8">
        <div className="absolute right-8 top-3 size-16 rounded-full border-[12px] border-white/70 sm:right-12 sm:top-5 sm:size-20" />
        <div className="relative ml-auto max-w-sm rounded-2xl border border-border/80 bg-surface p-5 shadow-lg sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Practice session</p>
              <p className="mt-1 text-sm font-semibold text-navy">Mathematics · Set 04</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-primary">12:40</span>
          </div>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
          <p className="mt-5 text-xs font-medium text-muted">QUESTION 8 OF 12</p>
          <p className="mt-2 text-base font-semibold leading-6 text-navy sm:text-lg">What is the value of 8 × 7?</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {["54", "56", "64", "48"].map((answer, index) => (
              <div key={answer} className={`rounded-xl border px-3 py-2.5 text-sm font-medium ${index === 1 ? "border-primary bg-blue-50 text-primary" : "border-border text-slate-600"}`}>
                <span className="mr-2 text-xs text-muted">{String.fromCharCode(65 + index)}</span>{answer}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-3 left-1 sm:-bottom-5 sm:left-3">
          <div className="flex items-center gap-3 rounded-2xl border border-border/80 bg-surface px-4 py-3 shadow-lg sm:px-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-lg font-bold text-emerald-700">↗</span>
            <div>
              <p className="text-xs text-muted">Your progress</p>
              <p className="text-sm font-bold text-navy">Looking good!</p>
            </div>
            <div className="ml-2 flex h-8 items-end gap-1" aria-hidden="true">
              {[35, 52, 43, 70, 58, 88].map((height, index) => (
                <span key={index} className="w-1.5 rounded-t bg-blue-300" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -right-2 bottom-8 hidden rounded-xl bg-navy px-4 py-3 text-white shadow-lg sm:block">
          <p className="text-[10px] uppercase tracking-wider text-blue-200">Completed</p>
          <p className="mt-0.5 text-lg font-bold">12 exams</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="overflow-hidden bg-gradient-to-b from-white to-background">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 min-[1025px]:grid-cols-2 min-[1025px]:gap-12 min-[1025px]:px-8 min-[1025px]:py-24">
            <div className="relative z-10 min-w-0 text-center min-[1025px]:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-primary sm:text-sm">
                <span className="size-1.5 rounded-full bg-primary" />
                Learn at your own pace
              </span>
              <h1 className="mx-auto mt-6 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-navy min-[380px]:text-4xl sm:text-5xl min-[1025px]:mx-0 min-[1025px]:text-6xl">
                Test Your Knowledge. <span className="text-primary">Track Your Progress.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8 min-[1025px]:mx-0">
                Take interactive exams and quizzes designed to help you practice, improve your skills, and prepare with confidence.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 min-[481px]:flex-row min-[1025px]:justify-start">
                <Link href="/exams" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/15 transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Explore Exams <ArrowIcon />
                </Link>
                <Link href="#about" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  Learn More
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted min-[1025px]:justify-start">
                <span className="inline-flex items-center gap-2"><span className="text-emerald-600">✓</span>Practice anywhere</span>
                <span className="inline-flex items-center gap-2"><span className="text-emerald-600">✓</span>Get results instantly</span>
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-border bg-surface">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-16 min-[1025px]:grid-cols-[0.8fr_1.2fr] min-[1025px]:items-center min-[1025px]:gap-16 min-[1025px]:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">A better way to prepare</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Make every practice session count.</h2>
            </div>
            <div>
              <p className="text-base leading-7 text-muted">
                Examify brings online exams and practice quizzes together in one clear, easy-to-use place. Get instant results after each attempt and follow your progress as you build knowledge and confidence.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["Practice", "On your schedule"],
                  ["Learn", "One question at a time"],
                  ["Review", "Instant results"],
                  ["Improve", "Track your progress"],
                ].map(([title, detail]) => (
                  <div key={title} className="border-l-2 border-blue-200 pl-3">
                    <p className="text-sm font-semibold text-navy">{title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Everything you need to grow</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">A smarter way to study</h2>
            <p className="mt-4 leading-7 text-muted">Simple tools to help you stay focused, see how you are doing, and keep moving forward.</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 min-[481px]:grid-cols-2 min-[481px]:gap-5 min-[1025px]:mt-10 min-[1025px]:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-6">
                <span aria-hidden="true" className={`flex size-12 items-center justify-center rounded-xl text-2xl font-semibold ${feature.color}`}>{feature.icon}</span>
                <h3 className="mt-5 text-lg font-semibold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Find your next challenge</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">Explore Our Exams</h2>
                <p className="mt-3 max-w-xl leading-7 text-muted">A few subjects to get your practice started. More exams are on the way.</p>
              </div>
              <Link href="/exams" className="inline-flex items-center gap-2 self-start rounded-md text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:self-auto">
                View all exams <ArrowIcon />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 min-[481px]:grid-cols-2 min-[481px]:gap-5 min-[1025px]:grid-cols-3">
              {sampleExams.map((exam) => (
                <article key={exam.title} className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${exam.color}`}>
                    <span aria-hidden="true" className="absolute -right-4 -top-12 size-40 rounded-full border-[24px] border-white/10" />
                    <span aria-hidden="true" className="absolute -bottom-16 -left-5 size-40 rounded-full bg-white/10" />
                    <span aria-hidden="true" className="relative flex size-16 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-3xl font-bold text-white shadow-lg backdrop-blur-sm">{exam.mark}</span>
                    <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">{exam.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-navy transition-colors group-hover:text-primary">{exam.title}</h3>
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5"><span aria-hidden="true">▤</span>{exam.questions} questions</span>
                      <span className="inline-flex items-center gap-1.5"><span aria-hidden="true">◷</span>{exam.duration}</span>
                    </div>
                    <Link href="/exams" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                      Explore exams <ArrowIcon />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-navy px-6 py-9 text-center sm:px-10 sm:py-11 md:flex-row md:text-left">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Ready to put your knowledge to the test?</h2>
              <p className="mt-2 text-sm leading-6 text-blue-100">Choose a subject and start your next practice session.</p>
            </div>
            <Link href="/exams" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Browse Exams <ArrowIcon />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
