import { BaseQuestionKeys, Question } from "@types";

export const BASE_QUESTIONS = {
  question1: {
    id: "question1",
    type: "select",
    question: "Knowledge about automation?",
    value: "",
    options: ["Novice", "Knowledgable", "Expert"],
    rules: {
      required: "Field is required",
    },
  },
  question2: {
    id: "question2",
    type: "select",
    question: "Is your process ready for automation?",
    value: "",
    options: ["Yes", "No"],
  },
  question3: {
    id: "question3",
    type: "select",
    question: "Knowledge about automation?",
    value: "",
    options: ["Complex", "Simple"],
  },
  question4: {
    id: "question4",
    type: "input",
    question: "What are your biggest pain points?",
    value: "",
    rules: {
      required: "Field is required",
    },
  },
  question5: {
    id: "question5",
    type: "input",
    question: "Biggest bottlenecks in your process?",
    value: "",
  },
} as Record<string, Question>;

const mappedQuestions = {} as Record<BaseQuestionKeys, string>;
Object.entries(BASE_QUESTIONS).forEach(([id, question]) => {
  const { value } = question;
  mappedQuestions[id] = value;
});

export const FORM_STATE = {
  selectedIndex: 0,
  steps: {
    contactDetails: {
      valid: false,
      dirty: false,
      value: {
        name: "",
        phone: "",
        email: "",
        company: "",
        companyType: "",
        designation: "",
      },
    },
    preferences: {
      valid: false,
      dirty: false,
      value: {
        needConsulting: "",
        preferredMedium: "",
        categories: [] as string[],
      },
    },
    budget: {
      valid: false,
      dirty: false,
      value: {
        budget: "",
      },
    },
    questions: {
      valid: true,
      dirty: false,
      value: mappedQuestions,
    },
  },
};

export const FORM_STEPS = [
  {
    label: `contact-details`,
  },
  {
    label: `preferences`,
  },
  {
    label: `questions`,
  },
  {
    label: `budget`,
  },
  {
    label: `review`,
  },
];

export const YES_NO = ["Yes", "No"];
export const PREFERRED_MEDIUM = ["Phone", "Email", "On-site visit"];
export const CATEGORIES = [
  {
    label: "Automate General Manufacturing (Material Handling)",
    value: "AGM",
  },
  {
    label: "Automate Fabrication Processes (Welding/Grinding/Etc)",
    value: "AFP",
  },
  {
    label: "Automate Inspection Processes (Sorting, Validating)",
    value: "AIP",
  },
  {
    label:
      "Manufacturing Engineering Support (Fixtures, Jogs, Process Improvement)",
    value: "MES",
  },
  {
    label:
      "Product Design Support (Enhancement, Performance, Features, Quality)",
    value: "PDS",
  },
  {
    label: "Project Preparation and Planning (Scheduling/Budgeting)",
    value: "PPP",
  },
  {
    label: "Project Scoping",
    value: "PS",
  },
];

export const BUDGET = [
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "$20,000 - $50,000",
  "$50,000 +",
];
