import type { AuditClaim, AuditCluster } from "./types.ts";

const AUDIT_DATE = "2026-08-15";

function claim(input: Omit<AuditClaim, "asOf">): AuditClaim {
  return { ...input, asOf: AUDIT_DATE };
}

export const auditClusters: AuditCluster[] = [
  {
    id: "task-specific-sota",
    title: "State of the art is always task-specific",
    usefulConcept: "Self-supervised pretraining is foundational to many modern systems and is usually followed by task, preference, or policy adaptation.",
    failureMode: "A broad trend becomes misleading when it is presented as one universal leaderboard or one mandatory training pipeline.",
    claims: [
      claim({ id: "ssl-global-sota", claim: "Self-supervised learning is the foundation of almost all current state-of-the-art AI.", verdict: "partial", correction: "Self-supervision is central to many foundation models, but a state-of-the-art result is conditional on its task and protocol. Supervision, imitation, reinforcement learning, search, retrieval, and hybrid systems still decide results in many domains.", status: "frontier-snapshot", scope: "Foundation-model pretraining and downstream adaptation across language, vision, and control.", caveat: "The balance changes by task, data regime, compute budget, and evaluation date; there is no single global ranking.", sourceIds: ["bert", "simclr", "helm"] }),
      claim({ id: "clip-no-human-signal", claim: "CLIP avoids explicit human-annotated pairs.", verdict: "partial", correction: "CLIP uses naturally occurring image-text pairs rather than manually assigned class labels. Human-authored captions, collection choices, filtering, and web curation still provide supervision signals.", status: "established", scope: "The data construction and contrastive objective described in the original CLIP paper.", caveat: "Avoiding per-class labels is not the same as removing human influence from the dataset.", sourceIds: ["clip"] }),
    ],
  },
  {
    id: "data-quality",
    title: "Unlabeled data is not uncurated data",
    usefulConcept: "Objective design, data quality, compute, shortcut learning, and distribution shift all constrain what a model can learn.",
    failureMode: "Removing manual task labels does not remove measurement error, duplication, bias, or the need to define a test distribution.",
    claims: [
      claim({ id: "ssl-low-quality-data", claim: "Self-supervised learning thrives on low-quality, uncurated data.", verdict: "incorrect", correction: "Self-supervised methods can use examples without manual task labels, but duplication, bias, coverage, corruption, and filtering quality materially affect learned behavior and downstream performance.", status: "established", scope: "Large-scale self-supervised pretraining datasets and their effect on representation quality.", caveat: "Some noise can act as augmentation, but that does not make arbitrary corruption or poor coverage beneficial.", sourceIds: ["simclr", "datacomp"] }),
      claim({ id: "no-ood-invention", claim: "Self-supervised models cannot reason or invent beyond their training distribution.", verdict: "unsupported", correction: "Any claim about going beyond a distribution needs a defined training set, task, representation, and evaluation. Models can compose learned rules on novel inputs while still failing under many kinds of shift.", status: "open-problem", scope: "Compositional generalization, extrapolation, and distribution shift in foundation models.", caveat: "Novel-looking output does not by itself show a new underlying rule, and benchmark success does not establish unrestricted generalization.", sourceIds: ["gpt3", "emergence-mirage"] }),
    ],
  },
  {
    id: "ssl-objectives",
    title: "One objective is not all of self-supervision",
    usefulConcept: "Masked and denoising objectives do learn by recovering hidden or corrupted information.",
    failureMode: "A useful special case becomes a false law when it is applied to contrastive, autoregressive, clustering, and joint-embedding objectives.",
    claims: [
      claim({ id: "corrupt-recover-core-loop", claim: "Corrupt, predict the original, and update is the core self-supervised learning loop.", verdict: "partial", correction: "That loop describes denoising and masked reconstruction. Autoregressive, contrastive, clustering, and joint-embedding methods construct targets in different ways and need separate explanations.", status: "established", scope: "The main families of self-supervised objectives used in language and vision.", caveat: "All construct learning signals from the data, but their prediction targets and invariances are not interchangeable.", sourceIds: ["bert", "simclr", "mae", "ijepa"] }),
      claim({ id: "latent-space-rim", claim: "A converged model can interpolate inside its data map but cannot extrapolate outside it.", verdict: "incorrect", correction: "Interpolation and extrapolation depend on the chosen coordinates and test protocol. Simple models can extrapolate under the right inductive bias, while high-dimensional learned supports have no known single geometric rim.", status: "established", scope: "Function approximation and geometric interpretations of learned representations.", caveat: "A two-dimensional map can build intuition, but it cannot define the boundary of a high-dimensional data distribution.", sourceIds: ["bishop-prml", "gpt3"] }),
    ],
  },
  {
    id: "prediction-families",
    title: "Prediction objectives differ across modalities",
    usefulConcept: "Language, vision, and control systems can all learn through prediction, but they need not predict the same kind of object.",
    failureMode: "Calling every hidden target a corruption erases the distinction between autoregression, denoising, representation prediction, imitation, and action learning.",
    claims: [
      claim({ id: "next-token-is-corruption", claim: "An LLM's hidden next token is a corruption that the model reconstructs.", verdict: "incorrect", correction: "Causal language modeling predicts the observed next token from a prefix. The target is withheld from the context, but the prefix need not be corrupted and the model does not reconstruct a clean full input.", status: "established", scope: "Standard causal next-token training used by autoregressive language models.", caveat: "Denoising language models do use corrupted inputs, so the distinction depends on the stated objective.", sourceIds: ["gpt3"] }),
      claim({ id: "jepa-dominates-physical-ai", claim: "Generative prediction fails in physical AI, so JEPA dominates.", verdict: "incorrect", correction: "Physical systems use behavior cloning, diffusion policies, vision-language-action models, reinforcement learning, model-based control, predictive representations, and hybrids. Diffusion Policy is a direct counterexample.", status: "frontier-snapshot", scope: "Robot learning and embodied-control methods represented in public research through the audit date.", caveat: "Performance depends on embodiment, data, control frequency, horizon, and evaluation protocol; no family dominates every setting.", sourceIds: ["diffusion-policy", "rt2", "vjepa"] }),
      claim({ id: "jepa-not-ssl", claim: "V-JEPA is a non-self-supervised alternative to self-supervised learning.", verdict: "incorrect", correction: "I-JEPA and V-JEPA are explicitly self-supervised joint-embedding predictive methods. They replace pixel-level reconstruction with prediction in representation space.", status: "established", scope: "The method definitions in the I-JEPA and V-JEPA papers.", caveat: "Joint-embedding prediction is one self-supervised family, not a replacement for the category that contains it.", sourceIds: ["ijepa", "vjepa"] }),
    ],
  },
  {
    id: "rl-in-the-stack",
    title: "Reinforcement learning is one stage in a larger system",
    usefulConcept: "Reinforcement learning can shape policies and post-trained models when rewards or preferences provide a useful signal.",
    failureMode: "Model training, generation-time search, tool use, and verification are separate mechanisms even when a product combines them.",
    claims: [
      claim({ id: "rl-undisputed-reasoning", claim: "Reinforcement learning is the undisputed state of the art for reasoning, decisions, and self-improvement.", verdict: "incorrect", correction: "Reinforcement learning matters in bounded control and post-training, but results also depend on pretraining, supervised data, prompting, search, tools, verifiers, and compute. No single method owns all three categories.", status: "frontier-snapshot", scope: "Public language-model post-training and classical reinforcement-learning applications.", caveat: "A method can be decisive in one benchmark or control problem without becoming a universal reasoning engine.", sourceIds: ["instructgpt", "deepseek-r1", "helm"] }),
      claim({ id: "inference-is-rl", claim: "Inference-time reasoning is an internal reinforcement-learning loop.", verdict: "incorrect", correction: "Sampling, self-consistency, search, and verification can spend more inference compute while model parameters remain fixed. Reinforcement learning requires a learning update driven by reward.", status: "established", scope: "The distinction between parameter learning and generation-time computation.", caveat: "A system may use a policy trained by reinforcement learning and also run search at inference; their coexistence does not make them identical.", sourceIds: ["self-consistency", "tree-thoughts", "ppo"] }),
    ],
  },
  {
    id: "verifiable-trials",
    title: "Verifiable trials still have ceilings",
    usefulConcept: "Cheap trials and reliable checks can unlock more search, but sample cost and verifier quality remain part of the system.",
    failureMode: "A finite environment with measurable rewards does not imply unlimited discovery, and one technical mechanism cannot explain an industry investment cycle by itself.",
    claims: [
      claim({ id: "rl-infinite-scale", claim: "A verifiable environment lets reinforcement learning scale infinitely beyond human knowledge.", verdict: "incorrect", correction: "Even cheap trials face combinatorial growth, misspecified rewards, simulator error, partial observability, optimization instability, and finite energy and hardware.", status: "open-problem", scope: "Long-horizon learning and search in simulated or formally checked environments.", caveat: "Verifier-rich domains can scale farther than domains with weak feedback, but farther is not infinite.", sourceIds: ["dqn", "dreamer", "reward-tampering"] }),
      claim({ id: "rl-explains-datacenters", claim: "Reinforcement-learning discovery precisely explains the current datacenter race.", verdict: "unsupported", correction: "Published scaling studies relate compute to measured loss or performance. They do not identify reinforcement-learning discovery as the sole cause of infrastructure spending; that economic claim needs direct workload and market evidence.", status: "frontier-snapshot", scope: "What model scaling studies can establish about industry compute investment through the audit date.", caveat: "Scaling-law papers measure technical relationships under stated regimes, not the causes of capital spending.", sourceIds: ["scaling-laws", "chinchilla"] }),
      claim({ id: "alphafold-is-rl", claim: "AlphaFold 3 is an example of reinforcement-learning discovery.", verdict: "incorrect", correction: "AlphaFold 3 uses a diffusion-based architecture for biomolecular structure prediction. It is not presented as a reinforcement-learning discovery system in the published method.", status: "established", scope: "The training and inference method reported for AlphaFold 3.", caveat: "Protein-design systems can use search or reinforcement learning, but that does not change the method reported for AlphaFold 3.", sourceIds: ["alphafold3"] }),
    ],
  },
  {
    id: "search-versus-learning",
    title: "Search and reinforcement learning are related, not identical",
    usefulConcept: "Both can be described using states, actions, costs, and value estimates, which makes the analogy useful.",
    failureMode: "Shared vocabulary does not establish mathematical identity, and visible self-correction does not reveal a proprietary search algorithm.",
    claims: [
      claim({ id: "rl-is-astar", claim: "Reinforcement learning is mathematically a generalized A* or Dijkstra algorithm.", verdict: "incorrect", correction: "Graph search assumes a defined expansion procedure and usually an explicit model. Reinforcement learning changes behavior from reward-bearing trajectories. Planning and search may be components, but they are not identical to learning.", status: "established", scope: "Classical graph search, model-free reinforcement learning, and model-based planning.", caveat: "Value functions and heuristics can play analogous roles while being learned, used, and updated under different assumptions.", sourceIds: ["dqn", "ppo", "dreamer"] }),
      claim({ id: "reasoning-models-run-mcts", claim: "DeepSeek-R1 and comparable reasoning models literally run Monte Carlo tree search over words.", verdict: "unsupported", correction: "Visible self-correction and reinforcement-learning post-training do not prove literal Monte Carlo tree search at inference. That claim needs documented selection, expansion, rollout or evaluation, and backup operations.", status: "frontier-snapshot", scope: "Publicly disclosed inference mechanisms for reasoning-oriented language models.", caveat: "Search-like behavior in generated text is behavioral evidence, not an implementation trace.", sourceIds: ["deepseek-r1", "tree-thoughts"] }),
    ],
  },
  {
    id: "grounding-and-feedback",
    title: "Grounding does not make feedback unhackable",
    usefulConcept: "Continual learning, grounded updating, synthetic curricula, cross-domain transfer, and scalable oversight can reinforce one another.",
    failureMode: "Promising research connections become false certainty when sensors, reward channels, terminology, and independent validation disappear from the account.",
    claims: [
      claim({ id: "world-unhackable-verifier", claim: "The real world is the ultimate unhackable verifier.", verdict: "incorrect", correction: "Real feedback passes through sensors, actions, institutions, time, and models. It can be sparse, delayed, unsafe, biased, spoofed, or causally ambiguous.", status: "open-problem", scope: "Embodied learning and evaluation in physical and social environments.", caveat: "Physical consequences constrain a system, but the measured reward can still omit the intended outcome or reward a proxy.", sourceIds: ["rt2", "reward-tampering"] }),
      claim({ id: "cross-attention-isomorphism", claim: "Cross-attention discovers hidden isomorphisms between fields.", verdict: "unsupported", correction: "Cross-attention mixes information between representations. Cross-domain analogy can suggest a hypothesis, but a true structural isomorphism and a valid transfer need independent evidence.", status: "interpretive", scope: "Cross-modal and cross-domain representation alignment.", caveat: "Similar activation or retrieval patterns may reflect correlation, naming conventions, or dataset overlap rather than shared causal structure.", sourceIds: ["attention", "clip"] }),
      claim({ id: "alphageometry-rl-selfplay", claim: "AlphaGeometry was built through reinforcement-learning self-play, and ReST means reinforcement learning from self-play.", verdict: "incorrect", correction: "AlphaGeometry combines a neural language model, symbolic deduction, and synthetic theorem generation. ReST means Reinforced Self-Training; neither description establishes the claimed self-play pipeline.", status: "established", scope: "The method and terminology reported for AlphaGeometry and Reinforced Self-Training.", caveat: "Synthetic curriculum generation can resemble self-play at a high level, but the implementation details still matter.", sourceIds: ["alphageometry"] }),
      claim({ id: "constitutional-axioms", claim: "Constitutional AI hardcodes immutable logical axioms in the loss.", verdict: "incorrect", correction: "The published method uses written principles to elicit self-critiques and revisions, then preference learning from AI feedback. Those principles are prompts and training inputs, not immutable logical axioms.", status: "established", scope: "The Constitutional AI method described in the original paper.", caveat: "A written constitution can guide behavior without guaranteeing logical consistency or complete rule coverage.", sourceIds: ["constitutional-ai"] }),
    ],
  },
  {
    id: "verification-limits",
    title: "Verification can be easier than discovery",
    usefulConcept: "Proposing, checking, and grounding have different costs, and the gap changes by domain.",
    failureMode: "A universal claim about critic intelligence breaks on cheap formal checks at one extreme and open-ended human goals at the other.",
    claims: [
      claim({ id: "verifier-must-be-smarter", claim: "A verifier must be smarter than the actor to catch cheating.", verdict: "incorrect", correction: "Proof checking, compilation, type checking, and unit tests can verify specific properties more cheaply than discovering a solution. In open-ended domains, a weak or incomplete verifier can still be exploited.", status: "established", scope: "Formal verification, software tests, and learned critics used for process supervision.", caveat: "Cheap checking applies to specified properties; it does not guarantee that the specification captures the real goal.", sourceIds: ["process-supervision", "alphadev"] }),
      claim({ id: "universal-meta-verifier", claim: "A universal verifier can be created by adding a meta-reward and punishing reward hacking.", verdict: "unsupported", correction: "Meta-training can improve critics, but the outer reward, observations, permissions, and coverage still need justification. Penalizing known hacks does not cover unknown equivalents.", status: "open-problem", scope: "Scalable oversight, reward modeling, and critic training across domains.", caveat: "A critic can improve on a benchmark while remaining vulnerable to distribution shift, collusion, or misspecified objectives.", sourceIds: ["reward-tampering", "constitutional-ai"] }),
    ],
  },
];
