import { auditTurns } from "../content/audit.ts";
import { modules } from "../content/curriculum.ts";
import { sources } from "../content/sources.ts";
import { validateContent } from "../lib/content-validation.ts";

const errors = validateContent({ modules, auditTurns, sources });
if (errors.length > 0) {
  console.error(`Content verification failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const claims = auditTurns.reduce((count, turn) => count + turn.claims.length, 0);
  console.log(`Content verified: ${modules.length} modules, ${claims} audited claims, ${sources.length} sources.`);
}
