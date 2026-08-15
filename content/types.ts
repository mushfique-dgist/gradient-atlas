export type ClaimStatus =
  | "established"
  | "active-program"
  | "frontier-snapshot"
  | "open-problem"
  | "interpretive";

export type Level = "AI 101" | "AI 201" | "AI 301" | "AI 401" | "AI 404";

export type Source = {
  id: string;
  title: string;
  creators: string;
  year: number;
  kind: "close-read-book" | "book" | "paper" | "course" | "official" | "researcher-note";
  locator: string;
  url?: string;
  note: string;
};

export type LearningModule = {
  id: number;
  level: Level;
  slug: string;
  title: string;
  shortTitle: string;
  question: string;
  summary: string;
  status: ClaimStatus;
  asOf?: string;
  duration: number;
  prerequisites: string[];
  objectives: [string, string, string];
  analogy: {
    useful: string;
    boundary: string;
  };
  formal: {
    notation: string;
    explanation: string;
  };
  workedExample: {
    prompt: string;
    steps: string[];
    answer: string;
  };
  misconceptions: string[];
  lab: {
    kind: "geometry" | "gradient" | "attention" | "return" | "search" | "benchmark";
    title: string;
    instruction: string;
  };
  retrieval: [string, string, string];
  researchLimit: string;
  sourceIds: string[];
};

export type ChapterSection = {
  id: string;
  title: string;
  paragraphs: string[];
  sourceIds: string[];
};

export type PracticeProblem = {
  level: "medium" | "hard" | "challenging";
  prompt: string;
  steps: string[];
  answer: string;
};

export type ChapterContent = {
  slug: string;
  sections: ChapterSection[];
  practice: PracticeProblem[];
  transferTask: string;
  calibration: string;
};

export type AuditClaim = {
  id: string;
  claim: string;
  verdict: "sound" | "partial" | "incorrect" | "unsupported";
  correction: string;
  status: ClaimStatus;
  scope: string;
  caveat: string;
  asOf: string;
  sourceIds: string[];
};

export type AuditCluster = {
  id: string;
  title: string;
  usefulConcept: string;
  failureMode: string;
  claims: AuditClaim[];
};

export type FrontierProgram = {
  id: string;
  name: string;
  announced: string;
  disclosure: "opaque" | "partial" | "technical-report";
  publicRecord: string;
  plausibleDirection: string;
  missingEvidence: string;
  researchQuestions: string[];
  sourceIds: string[];
};
