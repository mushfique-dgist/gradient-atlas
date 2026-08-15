# Curriculum map

The course is a dependency graph, not a parade of model releases. Every module
uses the same teaching unit: learner question, useful analogy, analogy failure,
formal model, worked example, interactive lab, retrieval questions, source map,
and one research-facing limitation.

## AI 101: learning from data

1. What a learning problem contains: samples, features, targets, hypotheses,
   losses, train/validation/test splits, empirical risk, and distribution shift.
2. Probability, vectors, matrices, derivatives, optimization, and information.
3. Supervised, unsupervised, self-supervised, semi-supervised, weak supervision,
   imitation learning, and reinforcement learning as different signal setups.
4. Linear models, trees, nearest neighbors, calibration, bias, and variance.
5. Neural networks, backpropagation, gradient descent, regularization, and the
   difference between architecture, objective, data, and optimizer.

## AI 201: representations and generation

6. Embeddings, latent variables, distributed representations, the manifold
   hypothesis, identifiability, and why a latent space is not a fact database.
7. Autoregressive, masked, denoising, contrastive, clustering, and joint-embedding
   self-supervision.
8. VAEs, GANs, diffusion, flow matching, and energy-based perspectives.
9. Generalization, memorization, recombination, compositionality, uncertainty,
   interpolation/extrapolation caveats, and out-of-distribution evaluation.
10. RL foundations: MDP/POMDP, policy, value, return, model-free/model-based,
    on/off-policy, exploration, credit assignment, offline RL, and safety.

## AI 301: foundation models and reasoning systems

11. Tokenization, embeddings, attention, residual streams, positional encoding,
    transformers, next-token prediction, and in-context learning.
12. Parameters, activations, KV cache, context windows, lost-in-the-middle
    behavior, quantization, sparse experts, and useful compute accounting.
13. Scaling laws, data quality, compute-optimal training, contamination, and
    what benchmark curves do not prove.
14. SFT, RLHF, RLAIF, DPO, RL with verifiable rewards, rejection sampling,
    distillation, and synthetic-data feedback loops.
15. Decoding, best-of-N, self-consistency, beam/tree search, MCTS, planning,
    process/outcome verifiers, and why test-time compute is not automatically RL.
16. Multimodal alignment, fusion, grounding, tools, external memory, retrieval,
    and agent scaffolds.

## AI 401-404: frontier and research practice

17. World-model taxonomy: latent prediction, latent control dynamics,
    generative simulators, VLM hybrids, and language-space environment models.
18. Embodied AI: behavior cloning, diffusion policies, VLAs, MPC, safe
    exploration, sim-to-real, touch/force/proprioception, and recovery.
19. Evaluation science: benchmark design, pass@k, uncertainty, contamination,
    ecological validity, cost/latency, and leaderboard overfitting.
20. Interpretability, robustness, reward hacking, scalable oversight, privacy,
    and security boundaries for tool-using systems.
21. Causal representation learning, neurosymbolic systems, continual learning,
    active learning, Bayesian optimization, and open-ended learning.
22. Research practicum: reproduce a result, design a falsification, trace a
    limitation through later work, audit overlap, then propose a bounded
    extension with a kill criterion.

## Misconception repair spine

The supplied conversation becomes a parallel path with nine turns. Each turn
must preserve the user's real question while correcting the assistant's answer.
High-priority counterexamples include autoregressive SSL that is not denoising,
Diffusion Policy for physical control, AlphaFold 3 as diffusion rather than RL,
AlphaDev as bounded verifiable discovery, V-JEPA as self-supervision rather than
an alternative to it, weak tests as weak verifiers, and proof checking as an
example where verification can be much easier than generation.

## Evidence status

- Established: replicated mechanism or empirical pattern used across systems.
- Active program: credible bounded evidence with unsettled generality.
- Frontier snapshot: dated 2025-2026 result that must remain replaceable.
- Open problem: documented limitation without an accepted solution.
- Interpretive claim: a research framing or synthesis, not settled fact.

No module is complete until the guide depth contract is met, all checkable
examples are recomputed, the content verifier and browser gate pass, and the
completion marker can be appended honestly.
