import { auditClusters } from "../content/audit.ts";
import { chapters } from "../content/chapters.ts";
import { modules } from "../content/curriculum.ts";
import { frontierPrograms } from "../content/frontier-programs.ts";
import { sources } from "../content/sources.ts";
import { validateContent } from "../lib/content-validation.ts";

const errors = validateContent({ modules, chapters, auditClusters, frontierPrograms, sources });
if (errors.length > 0) {
  console.error(`Content verification failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const claims = auditClusters.reduce((count, cluster) => count + cluster.claims.length, 0);
  console.log(`Content verified: ${modules.length} chapter-level modules, ${claims} audited claims, ${frontierPrograms.length} frontier programs, ${sources.length} sources.`);
}
