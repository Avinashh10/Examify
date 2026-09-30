# Examify

Examify is an online examination and quiz platform for practicing multiple-choice questions, tracking a timed attempt, and reviewing results.

## Getting Started

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — start the development server.
- `npm run build` — create a production build.
- `npm run start` — serve the production build.
- `npm run lint` — run ESLint.

## Features

- Browse exams by subject and difficulty.
- Answer one multiple-choice question at a time and move between questions without losing selections.
- Complete every question before manually submitting. When time expires, the attempt submits automatically and unanswered questions are counted as unanswered.
- Review the score, percentage, answer counts, and each question after submission.
- Use a responsive layout for mobile, tablet, and desktop screens.

## Routes

- `/` — homepage.
- `/exams` — exam listing.
- `/exam/[id]` — exam interface for the requested exam ID, such as `/exam/javascript-basics`.
- `/result` — result summary and question review for the latest submitted attempt in the current browser tab.

## Project Structure

```text
app/                  App Router pages, root layout, and global styles
components/           Shared navigation, exam cards, question UI, and timer
data/exams.ts         Exam definitions and MCQ question data
data/exam-results.ts  Result data types and session storage key
public/               Static assets
```

Exam content is maintained in `data/exams.ts`. Each exam has an ID, title, category, description, duration in minutes, difficulty, and a list of questions. Each question contains its options and correct answer.

Submitted results, including question review data, are stored in browser `sessionStorage`. They remain available in that tab for page refreshes, but are not stored in a database or shared between browser sessions.

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
