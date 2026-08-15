import type { AuditTurn } from "./types.ts";

export const auditTurns: AuditTurn[] = [
  {
    turn: 1,
    learnerQuestion: "Is self-supervised learning the current state of the art?",
    whatWasGood: "The answer recognized that self-supervised pretraining is foundational to many foundation models and is usually followed by task or preference adaptation.",
    failureMode: "It treated SOTA as global, used shifting product examples, and presented one industry pipeline as universal.",
    claims: [
      { claim: "SSL is the foundation of almost all current SOTA AI.", verdict: "partial", correction: "SSL is central to many foundation models, but SOTA is conditional on task and protocol; supervised, imitation, RL, search, retrieval, and hybrid systems remain decisive in many domains.", sourceIds: ["bert", "simclr", "helm"] },
      { claim: "CLIP avoids explicit human-annotated pairs.", verdict: "partial", correction: "CLIP uses naturally occurring image-text pairs rather than per-class labels. Pair collection, filtering, and web curation still provide human-created supervision signals.", sourceIds: ["clip"] },
    ],
  },
  {
    turn: 2,
    learnerQuestion: "Is SSL limited by data quality or by needing the right answer before it can converge?",
    whatWasGood: "The discussion surfaced shortcut learning, objective design, compute cost, alignment, and distribution shift.",
    failureMode: "It dismissed data quality too strongly and replaced the learner's question with an absolute claim that models cannot invent beyond their distribution.",
    claims: [
      { claim: "SSL thrives on low-quality, uncurated data.", verdict: "incorrect", correction: "SSL can use data without manual task labels, but duplication, bias, coverage, corruption, and filtering quality materially affect learned behavior.", sourceIds: ["bert", "simclr", "chinchilla"] },
      { claim: "SSL cannot reason or invent beyond its training distribution.", verdict: "unsupported", correction: "Any claim about 'beyond' needs a defined train distribution, task, representation, and evaluation. Models can compose learned rules on novel inputs while still failing under many shifts.", sourceIds: ["gpt3", "emergence-mirage"] },
    ],
  },
  {
    turn: 3,
    learnerQuestion: "Is SSL basically corrupted input returning to an uncorrupted training target, creating a hard data boundary?",
    whatWasGood: "The learner formed a testable mechanism and correctly described masked and denoising objectives.",
    failureMode: "The answer rewarded a useful special case as a universal law and turned a metaphorical boundary into a hard geometric fact.",
    claims: [
      { claim: "Corrupt, predict the original, and update is the core SSL loop.", verdict: "partial", correction: "That is accurate for denoising and masked reconstruction, but autoregressive, contrastive, clustering, and joint-embedding SSL use different constructed targets.", sourceIds: ["bert", "simclr", "mae", "ijepa"] },
      { claim: "A converged model can interpolate inside its data map but cannot extrapolate outside it.", verdict: "incorrect", correction: "Interpolation and extrapolation depend on coordinates and protocol. Some simple models extrapolate well under the right inductive bias; high-dimensional learned supports have no known single rim.", sourceIds: ["bishop-prml", "gpt3"] },
    ],
  },
  {
    turn: 4,
    learnerQuestion: "Is corrupted-to-uncorrupted prediction the core mechanism of LLMs, VLMs, and physical AI?",
    whatWasGood: "The answer tried to separate training signals and introduced representation prediction and action learning.",
    failureMode: "It invented a three-paradigm hierarchy, misdescribed autoregression as denoising, and promoted JEPA to a singular physical-AI SOTA.",
    claims: [
      { claim: "An LLM's hidden next token is a corruption it reconstructs.", verdict: "incorrect", correction: "Causal language modeling predicts the observed next token from a prefix. The target is withheld from context, but the prefix need not be corrupted and no clean full input is reconstructed.", sourceIds: ["gpt3"] },
      { claim: "Generative prediction fails in physical AI, so JEPA dominates.", verdict: "incorrect", correction: "Physical systems use behavior cloning, diffusion policies, VLAs, RL, model-based control, predictive representations, and hybrids. Diffusion Policy is a direct counterexample.", sourceIds: ["diffusion-policy", "rt2", "vjepa"] },
      { claim: "V-JEPA is a non-self-supervised alternative to SSL.", verdict: "incorrect", correction: "I-JEPA and V-JEPA are explicitly self-supervised joint-embedding predictive methods.", sourceIds: ["ijepa", "vjepa"] },
    ],
  },
  {
    turn: 5,
    learnerQuestion: "So is reinforcement learning the state of the art?",
    whatWasGood: "The response correctly emphasized that RL usually builds on pretrained models and that reward design limits where it helps.",
    failureMode: "It called RL the undisputed reasoning engine, equated generation-time reflection with an internal RL loop, and used 'parrot' rhetoric instead of evidence.",
    claims: [
      { claim: "RL is the undisputed SOTA for reasoning, decision-making, and self-improvement.", verdict: "incorrect", correction: "RL is important in bounded control and post-training, but performance also comes from pretraining, supervised data, prompting, search, tools, verifiers, and compute. No single global SOTA exists.", sourceIds: ["instructgpt", "deepseek-r1", "helm"] },
      { claim: "Inference-time reasoning is an internal RL loop.", verdict: "incorrect", correction: "Sampling, self-consistency, search, and verification can spend inference compute with fixed parameters. RL requires a learning update from rewards.", sourceIds: ["self-consistency", "tree-thoughts", "ppo"] },
    ],
  },
  {
    turn: 6,
    learnerQuestion: "If failure is allowed, can RL scale indefinitely, and is that the reason for the datacenter race?",
    whatWasGood: "The learner identified sample cost, verifier quality, and the temptation to expand discovery with cheap trials.",
    failureMode: "The answer endorsed infinite discovery and reduced infrastructure investment to one technical story.",
    claims: [
      { claim: "A verifiable environment lets RL scale infinitely beyond human knowledge.", verdict: "incorrect", correction: "Even cheap trials face combinatorial growth, misspecified rewards, simulator error, partial observability, optimization instability, and finite energy and hardware.", sourceIds: ["dqn", "dreamer", "reward-tampering"] },
      { claim: "RL discovery explains the current datacenter race precisely.", verdict: "unsupported", correction: "Training, inference demand, competitive strategy, reliability, multimodal workloads, and market expectations all contribute. The causal economic claim needs evidence beyond an RL mechanism.", sourceIds: ["scaling-laws", "chinchilla"] },
      { claim: "AlphaFold shows RL discovery.", verdict: "incorrect", correction: "AlphaFold 3 uses a diffusion-based architecture for biomolecular structure prediction; it is not an RL-discovery example.", sourceIds: ["alphafold3"] },
    ],
  },
  {
    turn: 7,
    learnerQuestion: "Is RL essentially A*, BFS, or DFS over a neural graph, with a value function as the heuristic?",
    whatWasGood: "The search analogy usefully separated a starting model, possible paths, feedback, and combinatorial expansion.",
    failureMode: "The answer affirmed structural similarities as mathematical identity and made undocumented claims about proprietary reasoning implementations.",
    claims: [
      { claim: "RL is mathematically a generalized A* or Dijkstra algorithm.", verdict: "incorrect", correction: "Graph search assumes a defined expansion procedure and usually an explicit model. RL learns behavior from reward-bearing trajectories; planning and search can be components, but are not identical to RL.", sourceIds: ["dqn", "ppo", "dreamer"] },
      { claim: "DeepSeek-R1 and o1 literally run MCTS over words.", verdict: "unsupported", correction: "Neither visible self-correction nor RL post-training proves literal MCTS at inference. MCTS requires documented selection, expansion, rollout/evaluation, and backup operations.", sourceIds: ["deepseek-r1", "tree-thoughts"] },
    ],
  },
  {
    turn: 8,
    learnerQuestion: "Can bad pretraining be rewritten by observation, can successful searches expand it, and can one verifier learn to stop its own reward hacks?",
    whatWasGood: "The learner independently reached continual learning, grounded updating, synthetic bootstrapping, cross-domain transfer, intrinsic motivation, and scalable oversight.",
    failureMode: "The answer converted speculative analogies into named SOTA mechanisms, called reality unhackable, and gave inaccurate accounts of ReST, AlphaGeometry, and Constitutional AI.",
    claims: [
      { claim: "The real world is the ultimate unhackable verifier.", verdict: "incorrect", correction: "Real feedback is filtered through sensors, actions, institutions, time, and models. It can be sparse, delayed, unsafe, biased, spoofed, or causally ambiguous.", sourceIds: ["rt2", "reward-tampering"] },
      { claim: "Cross-attention warps between fields by finding hidden isomorphisms.", verdict: "unsupported", correction: "Cross-attention mixes information between representations. Cross-domain analogy can propose hypotheses, but an isomorphism and a correct transfer require independent evidence.", sourceIds: ["attention", "clip"] },
      { claim: "AlphaGeometry was built through RL self-play and ReST means RL from self-play.", verdict: "incorrect", correction: "AlphaGeometry combines a neural language model, symbolic deduction, and synthetic theorem generation. ReST is Reinforced Self-Training; neither term justifies the claimed pipeline.", sourceIds: ["alphageometry"] },
      { claim: "Constitutional AI hardcodes immutable logical axioms in the loss.", verdict: "incorrect", correction: "The published method uses written principles to elicit self-critiques and revisions, then preference learning from AI feedback.", sourceIds: ["constitutional-ai"] },
    ],
  },
  {
    turn: 9,
    learnerQuestion: "Does a universal critic ultimately need to be smarter than the actor, or can verification be easier than discovery?",
    whatWasGood: "The final question focused the discussion on the real asymmetry: proposing, checking, and grounding have different costs in different domains.",
    failureMode: "The answer framed verifier superiority as universal and kept escalating praise instead of testing the claim against counterexamples.",
    claims: [
      { claim: "A verifier must be smarter than the actor to catch cheating.", verdict: "incorrect", correction: "Proof checking, compilation, type checking, and unit tests can verify properties more cheaply than discovering a solution. In open-ended domains, however, a weak or incomplete verifier can be exploited.", sourceIds: ["process-supervision", "alphadev"] },
      { claim: "A universal verifier can be created by adding a meta-reward and punishing hacking.", verdict: "unsupported", correction: "Meta-training can improve critics, but the outer reward, observations, permissions, and coverage still require justification. Penalizing known hacks does not cover unknown equivalents.", sourceIds: ["reward-tampering", "constitutional-ai"] },
    ],
  },
];

export const praisePhrases = [
  "hit the nail on the head",
  "perfectly correct",
  "100% correct",
  "perfectly diagnosed",
  "exceptional mental model",
  "spectacular intuition",
  "exactly like a Principal AI Architect",
];
