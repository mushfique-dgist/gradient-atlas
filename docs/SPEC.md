# Spec: Gradient Atlas

## Objective

Build a public, source-traceable AI and machine-learning learning site that
starts with the learner's existing analogies, repairs the parts that are wrong,
and reaches current research without turning volatile model releases into
timeless facts.

The first publishable release must:

- expose a coherent AI 101 through AI 404 path;
- include the audited source conversation as a misconception-repair sequence;
- define the vocabulary seen in model cards and benchmarks;
- include interactive, recomputable simulations for the hardest abstractions;
- distinguish established mechanisms, active research programs, dated frontier
  snapshots, open problems, and interpretive claims;
- cite supplied books, courses, papers, and official research pages without
  reproducing copyrighted books or their artwork wholesale;
- work with keyboard, touch, reduced motion, and 320-1440 px viewports;
- keep a clean Git history and publish both source and a live site.

## Tech stack

- React 19.2.6 with the App Router API exposed by vinext 1.0.0-beta.2
- TypeScript 5.9.3
- Tailwind CSS 4.2.1 theme variables
- shadcn/ui components added from the official CLI, then visually adapted
- Node's built-in test runner for content and pure simulation logic
- Playwright for route, interaction, accessibility, and screenshot checks
- Cloudflare Worker-compatible ESM through the bundled Sites/vinext setup

Framework decisions follow the detected versions and official documentation:

- https://ui.shadcn.com/docs/installation/next
- https://tailwindcss.com/docs/theme
- https://react.dev/reference/react/useState
- https://github.com/cloudflare/vinext

## Commands

```text
Dev:        npm run dev
Build:      npm run build
Unit:       npm run test:unit
Content:    npm run verify:content
E2E:        npm run test:e2e
Lint:       npm run lint
Typecheck:  npm run typecheck
Full gate:  npm run verify
```

## Project structure

```text
app/                    Routes and route-level metadata
components/             Learning shell and reusable visual explanations
components/ui/          shadcn primitives, owned by this project
content/                 Typed curriculum, audit findings, glossary, sources
lib/                     Pure simulation and content-query logic
tests/                   Unit, content-contract, and rendered-output tests
e2e/                     Browser routes, interactions, a11y, screenshots
docs/                    Spec, curriculum map, evidence and maintenance rules
public/                  Fonts and final reviewed media only
```

## Code style

Prefer typed content and small, composable components. Keep the mathematical
model pure and test it separately from rendering.

```ts
export type ClaimStatus =
  | "established"
  | "active-program"
  | "frontier-snapshot"
  | "open-problem"
  | "interpretive";

export function discountedReturn(rewards: number[], gamma: number): number {
  return rewards.reduceRight((next, reward) => reward + gamma * next, 0);
}
```

Do not create an abstraction until at least three real uses need it. Components
should stay under roughly 200 lines. Use semantic HTML before ARIA.

## Testing strategy

Test the content as data, the simulations as mathematics, and the site as a
browser product.

- Unit tests recompute probability, gradient, attention, return, search, and
  benchmark examples from inputs rather than storing expected prose.
- Content tests require definitions, notation, misconceptions, worked examples,
  retrieval practice, source IDs, claim status, and as-of dates where needed.
- Browser tests cover every route at 320, 768, 1024, and 1440 px, keyboard
  operation, reduced motion, touch-sized controls, route errors, empty filters,
  repeated local-progress updates, and clean console output.
- An independent review pass must attempt to falsify each simulation and at
  least one advanced claim per module.

## Boundaries

Always:

- use primary technical sources for mechanism and frontier claims;
- make task, metric, protocol, compute regime, and date explicit before saying
  "state of the art";
- verify every numeric worked example with code;
- label analogies and show where they stop matching the formal object;
- keep learner progress device-local unless persistence is explicitly added;
- run the full gate before a release commit.

Ask first:

- adding accounts, analytics, external user data, payments, or server storage;
- using a supplied book screenshot in a public release;
- changing the project from educational fair use/quotation to commercial use.

Never:

- copy long book passages or artwork into the repository;
- present a vendor benchmark as general intelligence;
- equate hidden reasoning text with a faithful causal trace;
- treat a latent space as one literal map with a known outside boundary;
- commit secrets, generated build output, browser profiles, or research dumps;
- add a completion marker while the content verifier, lint, build, or browser
  gate is failing.

## Success criteria

1. The home route explains the learning contract and lets a learner enter the
   path in under two actions.
2. AI 101-404 each has a coherent module index and at least one full chapter in
   the first release; the complete goal requires every curriculum module in
   `docs/CURRICULUM.md` to reach the depth contract.
3. The conversation audit contains all nine turns and every high-risk claim has
   a verdict, correction, and supporting source.
4. At least four simulations have deterministic mathematical tests and a
   written visual contract: representation geometry, gradient learning,
   attention/context, and RL/search/verifier separation.
5. Every advanced claim shows evidence status, source, scope, caveat, and date.
6. All listed commands pass, every route is visually inspected, and the browser
   console has zero errors or warnings caused by project code.
7. No completion marker is present until the depth floor, content verifier,
   lint, build, accessibility, and visual gates pass.
8. Source is available in a public GitHub repository with readable atomic
   history, and the deployed site matches the pushed commit.

## Open questions handled by safe defaults

- Title: use Gradient Atlas as a reversible working title.
- Theme: start with a light editorial surface because the core use is sustained
  daytime reading; support OS dark mode only after both themes pass visual QA.
- Progress: store only completed lesson IDs in localStorage and make reset/export
  explicit.
- Book assets: paraphrase and cite by default. Public screenshots require a
  later page-level necessity and rights review.
