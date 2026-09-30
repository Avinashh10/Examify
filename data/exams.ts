export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Exam {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: number;
  difficulty: Difficulty;
  questions: Question[];
}

export const exams: Exam[] = [
  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    category: "Programming",
    description: "Practice core JavaScript syntax, values, functions, and array methods.",
    duration: 15,
    difficulty: "Easy",
    questions: [
      {
        id: "js-q1",
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        options: ["const", "let", "static", "define"],
        correctAnswer: "let",
      },
      {
        id: "js-q2",
        question: "What does the strict equality operator (===) compare?",
        options: [
          "Only the values after converting their types",
          "Only the types of the operands",
          "Both value and type without coercion",
          "Whether both variables have the same name",
        ],
        correctAnswer: "Both value and type without coercion",
      },
      {
        id: "js-q3",
        question: "Which array method returns a new array containing only elements that pass a test?",
        options: ["map()", "filter()", "forEach()", "findIndex()"],
        correctAnswer: "filter()",
      },
      {
        id: "js-q4",
        question: "What is the result of typeof null in JavaScript?",
        options: ["\"null\"", "\"undefined\"", "\"object\"", "\"number\""],
        correctAnswer: "\"object\"",
      },
      {
        id: "js-q5",
        question: "Which syntax creates an arrow function with one expression as its body?",
        options: ["function => value", "(value) -> value", "(value) => value", "value :=> value"],
        correctAnswer: "(value) => value",
      },
    ],
  },
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    category: "Web Development",
    description: "Review components, props, state, and common React rendering patterns.",
    duration: 20,
    difficulty: "Medium",
    questions: [
      {
        id: "react-q1",
        question: "What is the usual purpose of props in a React component?",
        options: [
          "To pass data from a parent component to a child",
          "To mutate the browser DOM directly",
          "To replace the component's return value",
          "To store data between server restarts",
        ],
        correctAnswer: "To pass data from a parent component to a child",
      },
      {
        id: "react-q2",
        question: "Which Hook is commonly used to add local state to a function component?",
        options: ["useRoute()", "useState()", "useMarkup()", "useClass()"],
        correctAnswer: "useState()",
      },
      {
        id: "react-q3",
        question: "Why should each item in a rendered list have a stable key?",
        options: [
          "To help React identify items between renders",
          "To make the item available as a global variable",
          "To prevent the component from receiving props",
          "To sort the list alphabetically",
        ],
        correctAnswer: "To help React identify items between renders",
      },
      {
        id: "react-q4",
        question: "When does an Effect with an empty dependency array normally run after mounting?",
        options: [
          "After every state update",
          "After the component is first committed to the page",
          "Only when the browser tab is closed",
          "Before the component renders",
        ],
        correctAnswer: "After the component is first committed to the page",
      },
      {
        id: "react-q5",
        question: "What should an event handler do when the next state depends on the previous state?",
        options: [
          "Mutate the current state object directly",
          "Use a functional state update such as setCount(current => current + 1)",
          "Assign to the state variable",
          "Call the component function manually",
        ],
        correctAnswer: "Use a functional state update such as setCount(current => current + 1)",
      },
    ],
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    category: "Web Development",
    description: "Test your knowledge of semantic markup, selectors, layout, and accessibility.",
    duration: 18,
    difficulty: "Medium",
    questions: [
      {
        id: "html-css-q1",
        question: "Which HTML element is intended for a page's main, unique content?",
        options: ["<section>", "<main>", "<aside>", "<summary>"],
        correctAnswer: "<main>",
      },
      {
        id: "html-css-q2",
        question: "Which attribute connects a label to a form control by its id?",
        options: ["name", "target", "for", "role"],
        correctAnswer: "for",
      },
      {
        id: "html-css-q3",
        question: "In the CSS box model, what does box-sizing: border-box do?",
        options: [
          "Includes padding and border in the declared width and height",
          "Adds margin inside the content area",
          "Removes padding from every element",
          "Makes the element ignore its width and height",
        ],
        correctAnswer: "Includes padding and border in the declared width and height",
      },
      {
        id: "html-css-q4",
        question: "Which CSS layout system is designed for arranging items in one dimension?",
        options: ["Float", "Flexbox", "Table layout", "Positioning"],
        correctAnswer: "Flexbox",
      },
      {
        id: "html-css-q5",
        question: "Which selector has the highest specificity?",
        options: [".content p", "main p", "#content p", "p.content"],
        correctAnswer: "#content p",
      },
    ],
  },
  {
    id: "general-computer-science",
    title: "General Computer Science",
    category: "Computer Science",
    description: "Explore foundational ideas in algorithms, data structures, and computing.",
    duration: 25,
    difficulty: "Hard",
    questions: [
      {
        id: "cs-q1",
        question: "What is the time complexity of binary search on a sorted array?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)",
      },
      {
        id: "cs-q2",
        question: "Which data structure follows the last-in, first-out (LIFO) rule?",
        options: ["Queue", "Stack", "Heap", "Graph"],
        correctAnswer: "Stack",
      },
      {
        id: "cs-q3",
        question: "Which property is required of a binary search tree's left subtree?",
        options: [
          "Every key is greater than the root key",
          "Every key is less than the root key",
          "All nodes have exactly two children",
          "All leaves are at the same depth",
        ],
        correctAnswer: "Every key is less than the root key",
      },
      {
        id: "cs-q4",
        question: "Which statement best describes a race condition in concurrent software?",
        options: [
          "The result depends on the timing or ordering of concurrent operations",
          "A loop runs faster than expected",
          "A process always uses too much memory",
          "A compiler chooses a different variable name",
        ],
        correctAnswer: "The result depends on the timing or ordering of concurrent operations",
      },
      {
        id: "cs-q5",
        question: "What is the main purpose of a database transaction's atomicity property?",
        options: [
          "To make a transaction happen completely or not at all",
          "To ensure every query uses an index",
          "To keep data sorted by primary key",
          "To allow multiple writes to skip validation",
        ],
        correctAnswer: "To make a transaction happen completely or not at all",
      },
    ],
  },
];

export function getExamById(id: string): Exam | undefined {
  return exams.find((exam) => exam.id === id);
}
