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
  kind: "supplied-book" | "paper" | "course" | "official" | "researcher-note";
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

export type AuditClaim = {
  claim: string;
  verdict: "sound" | "partial" | "incorrect" | "unsupported";
  correction: string;
  sourceIds: string[];
};

export type AuditTurn = {
  turn: number;
  learnerQuestion: string;
  whatWasGood: string;
  failureMode: string;
  claims: AuditClaim[];
};
