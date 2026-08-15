import type { ChapterContent } from "./types.ts";

export const chapters: ChapterContent[] = [
  {
    slug: "learning-problem",
    sections: [
      {
        id: "objects-before-models",
        title: "Name the objects before choosing a model",
        paragraphs: [
          "A learning problem starts before the algorithm. First identify the unit being predicted: one image, one patient visit, one robot trajectory, or one stretch of text. Then decide what information is available at prediction time. A feature that arrives after the outcome is label leakage, even if it makes the spreadsheet look impressive. The target also needs an operational definition. ‘Fraud’ might mean a confirmed chargeback within 60 days, while deployment staff may care about suspicious activity before settlement. Those are related events, not the same label. The population and sampling process complete the basic data contract.",
          "The hypothesis class is the set of functions the training process may choose from. Linear models, trees, and neural networks express different biases about useful structure. The loss turns prediction errors into an optimization signal, but it is not automatically the real deployment cost. Cross-entropy treats every example through a probabilistic scoring rule. A hospital may instead face highly asymmetric consequences for false negatives and false positives. Good modeling begins by writing both objects down: the trainable objective and the decision cost that matters after the model leaves the notebook.",
        ],
        sourceIds: ["bishop-prml", "murphy-pml", "stanford-cs229"],
      },
      {
        id: "splits-and-selection",
        title: "A test set estimates one conditional quantity",
        paragraphs: [
          "Training data changes the parameters. Validation data changes choices around the parameters: architecture, regularization, prompt, threshold, or checkpoint. Test data is reserved for the final estimate. If the test score influences another design decision, the test set has quietly become validation data. Repeated public leaderboard submissions create the same problem at a larger scale. Teams learn what works on the benchmark through feedback, even when they never see its labels. The final number can then overstate performance on a genuinely fresh sample.",
          "A random split assumes that rows are exchangeable. That assumption breaks when the same person appears in several rows, near-duplicate documents cross the split, or time matters. Grouped splitting keeps related observations together. Temporal splitting trains on the past and tests on the future. Geographic or institution-held-out tests expose site-specific shortcuts. None of these is universally correct. The split should imitate the deployment question. ‘How well will this model score another sample from this archive?’ is different from ‘How well will it work next winter in a hospital it has never seen?’",
        ],
        sourceIds: ["elements-statistical-learning", "helm", "hamming-art"],
      },
      {
        id: "metrics-and-shift",
        title: "Metrics compress errors, so inspect what they discard",
        paragraphs: [
          "Accuracy weights every example equally and then forgets which examples failed. Precision asks what fraction of positive predictions were correct. Recall asks what fraction of actual positives were found. Calibration asks whether events predicted at probability 0.7 occur about 70 percent of the time. These answer different questions. A threshold converts scores into decisions, so a single model can occupy many points on a precision-recall curve. The right operating point depends on prevalence, capacity, and the cost of each error, not on a universal threshold of 0.5.",
          "Distribution shift means the joint relationship among inputs, labels, and sampling conditions changes. Covariate shift changes the input distribution. Label shift changes class prevalence. Concept shift changes the mapping from input to target. The names help diagnose a failure, but real deployments mix them. Monitor raw inputs, model scores, outcomes when they eventually arrive, and subgroup behavior. A confident score under shift is still only a model output. It does not carry its own guarantee that the training contract survived the move into production.",
        ],
        sourceIds: ["bishop-prml", "murphy-pml", "helm"],
      },
    ],
    practice: [
      { level: "medium", prompt: "A disease occurs in 1 percent of 10,000 cases. A classifier has 90 percent recall and 90 percent specificity. Build the confusion counts.", steps: ["There are 100 positive and 9,900 negative cases.", "Recall gives 90 true positives and 10 false negatives.", "Specificity gives 8,910 true negatives and 990 false positives."], answer: "Precision is 90/(90+990), about 8.3 percent. High recall and specificity do not imply that most alerts are correct when prevalence is low." },
      { level: "hard", prompt: "A user-level dataset has five rows per person. Explain why a row-wise random split can inflate the test score.", steps: ["Rows from one person can land in both train and test sets.", "Stable identity or behavior features let the model recognize the person rather than generalize to a new one.", "Split by user ID and compare the score with the row-wise result."], answer: "The row-wise estimate answers performance on additional records from partly known users. A grouped split answers performance on unseen users." },
      { level: "challenging", prompt: "Design an evaluation for a moderation model that will face new slang six months after training.", steps: ["Use a temporal holdout with labels collected after the training cutoff.", "Report subgroup recall, calibration, abstention, and review workload rather than one accuracy value.", "Predeclare refresh and failure thresholds, then retain a later untouched audit sample."], answer: "The evaluation must reproduce time drift and the human review system. A random archive split would miss the central deployment risk." },
    ],
    transferTask: "Take one model claim from a release post and rewrite it as a full contract: population, observable input, target, train and test sampling, metric, threshold, resource budget, and date. Circle every field the post does not disclose. Then write the strongest conclusion the disclosed fields actually support.",
    calibration: "If train, validation, and test feel interchangeable, stop here. You should be able to explain exactly which decisions each split is allowed to influence and construct a case where random splitting produces a misleading result.",
  },
  {
    slug: "math-for-learning",
    sections: [
      {
        id: "vectors-and-linear-maps",
        title: "Vectors are coordinates, not meanings",
        paragraphs: [
          "A vector is an ordered list of numbers interpreted in a chosen coordinate system. The same physical point can have different coordinates after a rotation or change of basis. Length and angle are properties induced by an inner product, not by the list alone. In machine learning, a row of measurements, an embedding, and a gradient can all be vectors while playing completely different roles. Before manipulating one, ask what its axes mean, which units they use, and whether rescaling an axis should change the answer.",
          "A matrix defines a linear map. Multiplying x by W forms weighted sums of x's coordinates; geometrically it may rotate, scale, shear, project, or collapse directions. The rank says how many independent output directions survive. Eigenvectors identify directions that a square map only rescales. Singular value decomposition works for any matrix and reveals its strongest input-output directions. These ideas later explain principal components, low-rank adapters, attention projections, and why a large parameter count does not mean every parameter direction matters equally.",
        ],
        sourceIds: ["bishop-prml", "mackay-information", "hamming-art"],
      },
      {
        id: "probability-and-information",
        title: "Probability separates uncertainty from surprise",
        paragraphs: [
          "A conditional probability p(y|x) is indexed by both a model and available evidence. Bayes' rule reverses a conditional by combining likelihood with a prior: p(θ|D) is proportional to p(D|θ)p(θ). This is not a trick for swapping symbols. It states that evidence updates relative plausibility. Frequentist procedures instead study how estimators behave over repeated samples. Both traditions can produce useful predictive intervals; neither turns a model score into certainty about an individual event.",
          "Entropy is expected self-information. An unlikely event carries more surprise because -log p is larger. Cross-entropy scores predictions using the true data distribution, while KL divergence measures the extra coding cost of using one distribution in place of another. KL is not a symmetric distance. Mutual information measures how much observing one variable reduces uncertainty about another. A high mutual information can arise from a shortcut or common cause, so it does not by itself establish a causal relationship.",
        ],
        sourceIds: ["bishop-prml", "mackay-information"],
      },
      {
        id: "derivatives-and-optimization",
        title: "Local change is useful precisely because it is local",
        paragraphs: [
          "The derivative is the coefficient of the best local linear approximation. For a multivariable function, the gradient collects partial derivatives and points in the direction of steepest increase under the chosen Euclidean coordinates. A directional derivative is the gradient dotted with a direction. The Hessian records local curvature. Positive curvature in every direction marks a local bowl; mixed signs mark a saddle. Neural networks add flat directions, scale symmetries, noisy mini-batch estimates, and non-Euclidean effects that a clean two-dimensional bowl cannot show.",
          "Gradient descent moves against the gradient, but practical optimizers alter the path. Momentum averages directions over time. Adaptive methods rescale coordinates using running gradient statistics. A learning-rate schedule changes step size as training proceeds. Stochastic gradients use a batch estimate rather than the full dataset, adding noise that can help movement but also destabilize it. Convergence of the optimization objective is separate from generalization. A parameter vector can fit the training data perfectly and still encode the wrong rule.",
        ],
        sourceIds: ["bishop-prml", "deep-learning-book", "welch-ai"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Let a=(1,2) and b=(3,-1). Compute their dot product and explain its sign.", steps: ["Multiply matching coordinates: 1·3 and 2·(-1).", "Add them to obtain 3-2=1.", "A positive dot product means the angle is acute under these coordinates."], answer: "a·b=1. The value combines both angle and vector magnitudes; cosine similarity would divide by their norms." },
      { level: "hard", prompt: "For L(w1,w2)=w1²+4w2² at (2,1), compare one gradient step of size 0.1 on both coordinates.", steps: ["The gradient is (2w1,8w2)=(4,8).", "Subtract 0.1 times the gradient to get (1.6,0.2).", "The steeper second coordinate changes much more because its curvature is four times larger."], answer: "The anisotropic bowl makes one global learning rate awkward. This motivates scaling, conditioning, and adaptive optimization discussions." },
      { level: "challenging", prompt: "Two parameterizations represent the same prediction: y=(ab)x. Show why their raw gradients can differ even when ab is fixed.", steps: ["For squared loss, ∂L/∂a contains the factor b and ∂L/∂b contains the factor a.", "Choose (a,b)=(1,4) and (2,2); both products equal 4.", "The gradient components scale differently although the represented function is identical."], answer: "Optimization geometry depends on parameterization. A parameter-space picture is not automatically a function-space picture." },
    ],
    transferTask: "Choose one equation from a model paper. Label every scalar, vector, matrix, distribution, and index. State the shape and unit of each object, then describe which equalities are definitions, which are modeling assumptions, and which are learned approximations.",
    calibration: "You are ready to continue when you can move between an equation and its geometric or probabilistic meaning without turning that meaning into a literal picture. In particular, explain why entropy, gradient magnitude, and cosine similarity answer unrelated questions.",
  },
  {
    slug: "learning-signals",
    sections: [
      {
        id: "target-provenance",
        title: "Classify a method by where its target comes from",
        paragraphs: [
          "Supervised learning receives a target from outside the input example, often through human annotation or an existing process. Unsupervised learning models structure without a designated prediction label. Self-supervised learning constructs a target from the example or its relation to other examples. Semi-supervised learning mixes a small labeled set with a larger unlabeled set. Weak supervision uses noisy rules, distant labels, or aggregates. The labels are convenient, but the real distinction lives in the data-generating process and objective.",
          "Calling text ‘unlabeled’ can be misleading. Next-token prediction has a target at every position, provided by the observed sequence. Contrastive learning decides which views count as a positive pair. Masked modeling chooses what to hide. Each design encodes assumptions about what should remain invariant and what should be predictable. Those choices are a form of supervision even when nobody clicks a class label for each example.",
        ],
        sourceIds: ["bert", "simclr", "aima"],
      },
      {
        id: "demonstrations-and-consequences",
        title: "Demonstrations and rewards answer different questions",
        paragraphs: [
          "Imitation learning estimates behavior from demonstrations. Behavior cloning treats state-action pairs like supervised examples, so it works best when deployment stays near the demonstrated state distribution. Small mistakes can push the policy into unfamiliar states, where the next action is poorly supported. Dataset aggregation methods collect corrective demonstrations from states visited by the learned policy. The central issue is coverage, not whether the model architecture looks modern.",
          "Reinforcement learning observes consequences through rewards and tries to maximize expected return. It can discover actions not present in a demonstration, but its signal is delayed, noisy, and easy to specify badly. Offline RL learns from a fixed log without new exploration; online RL can gather new trajectories. Model-free methods learn values or policies directly. Model-based methods learn or use transition structure for planning. These axes cross rather than forming one ladder.",
        ],
        sourceIds: ["sutton-barto", "dqn", "aima"],
      },
      {
        id: "hybrid-pipelines",
        title: "Most frontier systems mix signals",
        paragraphs: [
          "A language model may begin with self-supervised next-token training, continue with supervised demonstrations, then receive preference or verifier-based post-training. A robot policy may initialize from teleoperation, learn a predictive model from video, and fine-tune with rewards in simulation. Retrieval and tool traces may create more supervised examples. Describing the final system as ‘an RL model’ or ‘an SSL model’ hides which capability came from which stage.",
          "To read a paper, draw the pipeline. For every stage, record the dataset, target, loss, parameters updated, and evaluation. Ask whether generated data came from the same model, a stronger teacher, an environment, or a human. Ask what filters remove failures. Feedback loops can compound competence, but they can also narrow diversity, amplify a grader's bias, or train against an easily gamed proxy. The source of the signal is part of the claim.",
        ],
        sourceIds: ["instructgpt", "constitutional-ai", "deepseek-r1"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Classify masked language modeling, image classification from hand labels, and behavior cloning by target source.", steps: ["Masked tokens are targets constructed from the observed text.", "Class labels come from an external annotation process.", "Behavior cloning uses demonstrated actions as supervised targets."], answer: "They are self-supervised, supervised, and imitation learning respectively, even though all three can use gradient descent." },
      { level: "hard", prompt: "A robot trains on demonstrations, then ranks four sampled actions with a learned reward model but never updates its weights online. Identify each mechanism.", steps: ["Demonstrations train the initial policy by imitation.", "Sampling four actions is generation-time search or best-of-N selection.", "The reward model is a verifier; no online RL occurs without a policy update."], answer: "The system combines imitation and fixed-policy search. Calling the selection loop online reinforcement learning would be inaccurate." },
      { level: "challenging", prompt: "Design a signal ledger for a model trained on its own verified solutions.", steps: ["Record who generates candidates and which parameters are frozen.", "Specify the verifier, rejection rule, and coverage of negative cases.", "Track how accepted synthetic data changes the next training distribution."], answer: "The ledger exposes whether the loop adds reliable information or merely reinforces what the current generator and verifier already prefer." },
    ],
    transferTask: "Take a frontier training report and turn it into a table with one row per stage: data origin, constructed target, loss or reward, updated parameters, filtering, and evaluation. If a stage is undisclosed, write ‘unknown’ rather than guessing from the model's behavior.",
    calibration: "You should be able to explain why self-supervision has targets, why imitation is not reward maximization, and why a system can use a policy trained with RL while performing no learning during a particular inference run.",
  },
  {
    slug: "classical-models",
    sections: [
      {
        id: "inductive-bias",
        title: "Every model rules out possibilities",
        paragraphs: [
          "A linear model assumes the prediction depends on a weighted sum of features. Feature engineering can make that family richer, but the boundary is still linear in the chosen features. A decision tree partitions the space with sequential rules. Nearest neighbors assumes nearby stored examples should have similar targets. These are inductive biases: preferences that let finite data support predictions about unseen cases. A model with no bias would have no reason to choose one unseen behavior over another.",
          "Capacity is not the same as quality. A flexible model can reduce approximation error while increasing sensitivity to sampling noise. Regularization changes the set of favored solutions through penalties, early stopping, pruning, or smoothing. Cross-validation estimates how a complete training procedure varies across splits. It must repeat feature selection and preprocessing inside each fold; otherwise information leaks from the held-out fold into the model-selection process.",
        ],
        sourceIds: ["elements-statistical-learning", "bishop-prml", "murphy-pml"],
      },
      {
        id: "probability-and-calibration",
        title: "Ranking, classification, and probability are separate jobs",
        paragraphs: [
          "A score can rank examples well without being calibrated as a probability. The area under an ROC curve measures how often a random positive is ranked above a random negative across thresholds. It does not choose an operating threshold or reveal performance at the prevalence that matters. Precision-recall curves respond more directly to class imbalance. Log loss and Brier score evaluate probabilistic predictions, penalizing confidence as well as correctness.",
          "Calibration is a repeated-case statement. Among cases assigned probability 0.8, roughly 80 percent should occur. A model can be calibrated overall and badly calibrated for a subgroup. Temperature scaling adjusts logits on held-out data but cannot fix a representation that misses the relevant signal. Decision theory then combines probabilities with utilities or costs. The probability model and the decision rule should be evaluated separately.",
        ],
        sourceIds: ["bishop-prml", "elements-statistical-learning"],
      },
      {
        id: "baselines-and-diagnostics",
        title: "Simple baselines reveal where the gain came from",
        paragraphs: [
          "A majority-class predictor checks whether accuracy is informative. A linear model tests whether the representation already makes the task easy. Nearest neighbors can expose duplicate or retrieval-like structure. A shallow tree produces inspectable rules and nonlinear interactions. If a large model beats weak baselines but not a tuned classical method on the same features and protocol, the architecture claim is overstated.",
          "Residual analysis asks which examples remain wrong and whether errors correlate with time, subgroup, feature range, or missingness. Learning curves plot performance as training size grows. A wide train-test gap suggests variance or leakage; poor training and test performance suggest bias, bad features, or an unsuitable objective. These patterns are clues, not automatic diagnoses. The point of the baseline is to create a falsifiable comparison, not a ceremonial low bar.",
        ],
        sourceIds: ["stanford-cs229", "mit-ml-intro", "hamming-art"],
      },
    ],
    practice: [
      { level: "medium", prompt: "A logistic model produces logit 2.197. Convert it to a probability and interpret it.", steps: ["Use σ(z)=1/(1+e^{-z}).", "e^{-2.197} is about 0.111.", "The probability is about 0.9 under this fitted model."], answer: "The output is approximately 90 percent. It is not a guarantee and should be checked for calibration on relevant held-out cases." },
      { level: "hard", prompt: "A model has ROC AUC 0.95 but only 5 percent precision at the chosen alert threshold. Explain how both can be true.", steps: ["AUC averages ranking behavior over all thresholds.", "Rare positives allow false positives to dominate the alert set.", "The deployed threshold and prevalence determine precision."], answer: "Strong global ranking can coexist with an unusable operating point. Report the precision-recall curve and decision costs." },
      { level: "challenging", prompt: "Construct a nested cross-validation plan for selecting features and regularization strength.", steps: ["Use outer folds only for final performance estimation.", "Inside each outer training fold, run feature selection and hyperparameter search on inner folds.", "Refit the chosen pipeline on the full outer training fold and evaluate once on its outer holdout."], answer: "Nesting prevents the outer test fold from influencing either feature selection or hyperparameter choice." },
    ],
    transferTask: "For one deep-learning result, propose three nontrivial baselines: a frequency or heuristic baseline, a tuned classical model, and an ablation that removes the claimed novelty. State what conclusion survives each possible outcome.",
    calibration: "Move on when you can separate model capacity, regularization, ranking, probability calibration, and decision cost. If all five collapse into ‘accuracy,’ the foundation is not secure yet.",
  },
  {
    slug: "neural-learning",
    sections: [
      {
        id: "forward-computation",
        title: "Architecture specifies a reusable computation",
        paragraphs: [
          "A feedforward network alternates affine maps with nonlinear functions. Without the nonlinearities, a stack of linear layers collapses into one linear map. ReLU keeps positive values and zeros negative ones, creating piecewise-linear regions. Sigmoid and tanh compress values into bounded ranges but can produce small derivatives in saturated regions. Convolution shares local filters across positions. Residual connections add an identity path so a block learns a change rather than rebuilding the entire representation.",
          "Initialization sets the scale of signals before learning begins. If activations or gradients grow or shrink exponentially across layers, training becomes unstable. Normalization and careful variance scaling help, but they do not choose the learned features. The architecture determines which computations are easy to express and optimize. The data and objective decide which of those computations receive pressure to emerge.",
        ],
        sourceIds: ["deep-learning-book", "bishop-prml", "understanding-deep-learning"],
      },
      {
        id: "reverse-mode",
        title: "Backpropagation reuses the chain rule",
        paragraphs: [
          "A computation graph stores intermediate values from the forward pass. Reverse-mode differentiation starts with the derivative of the loss and propagates vector-Jacobian products backward. Each node combines an upstream sensitivity with its local derivative. Shared parameters receive contributions from every path that uses them. The method is efficient when a scalar loss depends on many parameters because one reverse pass produces all parameter gradients.",
          "The gradient answers a counterfactual local question: if this parameter moved slightly while the rest stayed fixed, how would the current loss change? It is not a semantic blame score. Parameters interact, the local linear approximation has a limited radius, and many parameterizations represent similar functions. Gradient-based attribution methods inherit related limits when used as explanations.",
        ],
        sourceIds: ["deep-learning-book", "welch-ai", "bishop-prml"],
      },
      {
        id: "training-dynamics",
        title: "Optimization and generalization pull on different evidence",
        paragraphs: [
          "Mini-batch training estimates the full gradient from a sample. Batch size changes both noise and hardware efficiency. Weight decay discourages large weights under a chosen parameterization. Dropout samples subnetworks during training. Data augmentation encodes invariances by presenting transformed examples with preserved targets. Early stopping limits how far parameters adapt to the training set. Each method changes the training procedure, so comparisons need matched budgets and tuning effort.",
          "Overparameterized networks can fit random labels, yet on structured data they often generalize. Proposed explanations include optimization bias, margin growth, feature learning, data geometry, and implicit regularization. No single slogan settles the issue. Inspect train and validation curves, multiple seeds, sensitivity to data perturbations, and simpler baselines. A low training loss proves only that the optimizer found parameters that score well on the training objective.",
        ],
        sourceIds: ["understanding-deep-learning", "deep-learning-book", "stanford-cs229"],
      },
    ],
    practice: [
      { level: "medium", prompt: "For h=ReLU(wx), ŷ=vh, compute the gradient when x=2, w=-1, v=3, and L=(ŷ-1)².", steps: ["wx=-2, so ReLU outputs h=0.", "The ReLU derivative on the negative side is 0.", "Both ∂L/∂w and the gradient path through h are zero."], answer: "This unit is inactive for the example. The loss is 1, but the chosen path supplies no gradient to w." },
      { level: "hard", prompt: "Explain why three affine layers without activations cannot create a nonlinear decision boundary.", steps: ["Compose the first two maps: W2(W1x+b1)+b2 is another affine map.", "Composing the third gives W3W2W1x plus one combined bias.", "A threshold on the result still creates a hyperplane in the original input coordinates."], answer: "Depth alone does not add nonlinearity. Activations or another nonlinear operation are required." },
      { level: "challenging", prompt: "A new optimizer reaches lower training loss but worse validation loss than Adam under the same epochs. Design the next checks.", steps: ["Match compute, batch order, initialization, and hyperparameter-search budget.", "Compare learning curves, weight norms, margins, and results over several seeds.", "Tune early stopping separately and test on an untouched final set."], answer: "The first run shows an optimization-generalization tradeoff, not that either optimizer is universally better." },
    ],
    transferTask: "Trace one modern block, such as an MLP, convolutional residual block, or transformer feed-forward layer, as a computation graph. Mark tensor shapes, saved forward values, local derivatives, and every parameter that receives a gradient.",
    calibration: "You should be able to say, without metaphor, what the architecture, forward pass, loss, backpropagation, optimizer, and regularizer each contribute. None of those words is a synonym for ‘the model learns.’",
  },
  {
    slug: "representations",
    sections: [
      {
        id: "task-shaped-geometry",
        title: "Objectives decide which distinctions survive",
        paragraphs: [
          "A representation maps an input into features used by another computation. Hand-built features expose the designer's assumptions. Learned features adapt those assumptions through an objective. A classifier benefits when examples from the same class become easy to separate, even if within-class details disappear. A reconstruction model must preserve information needed to rebuild its input. A contrastive model preserves distinctions that separate chosen positive and negative pairs. There is no representation that is simply ‘the meaning’ of an object apart from a task and data process.",
          "Geometry becomes useful after its conventions are stated. Euclidean distance responds to magnitude and direction. Cosine similarity ignores magnitude. Dot products mix both. Normalization, whitening, and layer choice can change a nearest-neighbor result. When a paper shows a two-dimensional projection, the projection has discarded information and may create apparent clusters. Use the plot as a diagnostic, then test the relationship in the original space and on held-out data.",
        ],
        sourceIds: ["bishop-prml", "murphy-pml", "clip"],
      },
      {
        id: "invariance-identifiability",
        title: "Equivalent coordinates can encode the same computation",
        paragraphs: [
          "Suppose an embedding z is multiplied by an orthogonal matrix R and the next layer is adjusted by R transpose. The overall function can remain unchanged. Pairwise dot products also survive a shared orthogonal rotation. This means individual coordinate axes are not automatically identifiable. A direction called a ‘feature’ needs evidence that goes beyond one convenient basis, especially when the model can permute, rotate, or rescale internal units without changing behavior.",
          "Probes train a small predictor on frozen representations. A successful probe shows information is decodable by that probe class; it does not show the original model uses that information in the same way. Intervention is stronger evidence. Change a representation direction, activation, or circuit component and measure a predicted behavioral effect while controlling collateral changes. Even then, distributed and nonlinear representations can resist one-feature-one-direction stories.",
        ],
        sourceIds: ["understanding-deep-learning", "induction-heads", "sae-monosemanticity"],
      },
      {
        id: "latent-variables",
        title: "Latent does not mean hidden fact",
        paragraphs: [
          "A latent variable is an unobserved variable introduced by a model. In a mixture model it can indicate component membership. In a variational autoencoder it helps generate observations through a decoder. In a transformer, the phrase ‘latent space’ is often used loosely for intermediate activations. Parameters are persistent learned numbers; activations are temporary values produced for a particular input; context supplies additional temporary evidence. These should not be collapsed into one mental map.",
          "The manifold hypothesis proposes that high-dimensional observations concentrate near lower-dimensional structure. It is a useful modeling idea, not proof of a smooth finite surface with a known edge. Real data mix discrete and continuous causes, measurement artifacts, rare events, and disconnected regions. A model can recombine learned structure in a novel example while failing on a nearby-looking perturbation. Generalization has to be measured through interventions and held-out regimes, not inferred from a picture of a circle.",
        ],
        sourceIds: ["bishop-prml", "murphy-pml", "understanding-deep-learning"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Vectors a=(1,1), b=(2,2), and c=(-1,1) are compared with cosine similarity. Compute the two similarities to a.", steps: ["a·b=4 and the norm product is √2·√8=4.", "a·c=0 and both norms are √2.", "Therefore cos(a,b)=1 and cos(a,c)=0."], answer: "b points in the same direction despite its larger norm; c is orthogonal. Cosine says nothing about which vector is more truthful or useful." },
      { level: "hard", prompt: "A linear probe predicts object color from an embedding with 99 percent accuracy. Give two conclusions that do not follow.", steps: ["The base model need not use color for its own output.", "Color need not occupy one clean axis or causal feature.", "The probe may exploit a distributed correlation that fails under intervention."], answer: "The defensible conclusion is only that color is linearly decodable under the probe's dataset and protocol." },
      { level: "challenging", prompt: "Design a causal test for a proposed ‘sentiment direction’ in a language model.", steps: ["Estimate the direction on one dataset and preregister target behaviors on a separate set.", "Intervene by adding, removing, or patching the direction at selected layers with matched random-direction controls.", "Measure intended sentiment changes, semantic preservation, and off-target effects."], answer: "A clean causal claim needs reproducible behavioral movement and specificity, not just interpretable nearest tokens." },
    ],
    transferTask: "Choose one embedding visualization from a paper. Identify the original dimension, distance metric, projection algorithm, seed, labels, and sampling rule. Write three alternative plots or quantitative tests that could challenge the visual story.",
    calibration: "Do not continue until parameters, activations, embeddings, latent variables, and context are five distinct objects in your account. You should also be able to explain why a rotated representation may implement the same function.",
  },
  {
    slug: "self-supervision",
    sections: [
      {
        id: "constructed-targets",
        title: "The target is constructed, not absent",
        paragraphs: [
          "Self-supervised learning creates prediction problems from the structure of collected data. Masked language modeling hides selected tokens and predicts them from both sides. Causal language modeling predicts the next token from a prefix. Autoencoding reconstructs an input through a bottleneck. Denoising reconstructs clean structure from a corrupted view. The corruption distribution matters because it determines which dependencies the model must learn and which shortcuts remain available.",
          "The label ‘self-supervised’ says where the signal originates, not what architecture or capability follows. A transformer, convolutional network, or joint-embedding architecture can all train with self-supervision. The learned representation depends on target construction, augmentations, model capacity, data mixture, and optimization. Internet scale expands coverage but does not remove bias, duplication, contamination, or missing experience.",
        ],
        sourceIds: ["bert", "mae", "gpt3"],
      },
      {
        id: "contrast-and-collapse",
        title: "Contrastive learning defines sameness through augmentations",
        paragraphs: [
          "Contrastive methods pull selected positive views together and separate other examples. In image learning, crops and color changes often define what should remain invariant. A poor augmentation can erase task-relevant information or preserve a shortcut. Batch composition and the number of negatives affect the objective. The representation is therefore shaped by an editorial decision about which changes should not alter identity.",
          "Methods without explicit negatives need another way to avoid collapse, where every input receives the same representation. Stop-gradient paths, predictor asymmetry, variance constraints, covariance penalties, clustering, and teacher-student updates are different solutions. Joint-embedding predictive architectures predict representations of target regions from context regions. They remain self-supervised because the training target is constructed from the same observed example.",
        ],
        sourceIds: ["simclr", "ijepa", "vjepa"],
      },
      {
        id: "what-scale-buys",
        title: "Scale increases coverage and pressure, not guarantees",
        paragraphs: [
          "More data can expose rare patterns and reduce variance, while larger models can fit richer conditional relationships. Compute allows more optimization and experiments. None of these ensures the data contain the needed causal evidence or that the objective rewards the desired behavior. Duplicate and benchmark-contaminated examples can make scale look like generalization. Filtering can improve average quality while deleting minority language, unusual environments, or useful negative cases.",
          "Evaluate a self-supervised model through transfer tasks that were not part of target construction. Linear probes test accessible information. Fine-tuning tests adaptability. Few-shot evaluation tests use of context. Distribution-shift tests probe stability. Generative evaluations inspect likelihood or sample behavior under explicit protocols. A single benchmark does not reveal whether progress came from representation learning, memorization, retrieval-like matching, or a change in test procedure.",
        ],
        sourceIds: ["chinchilla", "datacomp", "helm"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Why is next-token prediction self-supervised even though the prefix is not corrupted?", steps: ["The observed sequence supplies both context and target.", "No separate human label is required for each token position.", "Withholding the future token creates a prediction task without denoising the prefix."], answer: "Self-supervision is broader than corrupt-and-reconstruct. Autoregression constructs targets from the sequence order." },
      { level: "hard", prompt: "A contrastive vision model treats color jitter as label-preserving. Name a task where that choice hurts.", steps: ["Choose a task where color is causal, such as ripeness or skin-lesion appearance.", "The augmentation pressures embeddings to ignore some color differences.", "Transfer evaluation may then lose signal needed for the target task."], answer: "Augmentations encode invariances. An invariance useful for object identity can damage a color-sensitive downstream task." },
      { level: "challenging", prompt: "Design an evaluation that separates duplicate memorization from transferable representation learning.", steps: ["Deduplicate train and evaluation data at document and semantic-neighbor levels.", "Create a held-out domain and compositional tasks whose combinations are absent from training.", "Compare frozen probes, full fine-tuning, retrieval baselines, and performance as near-duplicates are removed."], answer: "No single split proves the distinction, but the combined controls make a pure memorization account harder to sustain." },
    ],
    transferTask: "For one self-supervised paper, write the exact context function c(x), target function t(x), loss, augmentation distribution, collapse-avoidance mechanism, and transfer protocol. Then list one shortcut each design choice permits.",
    calibration: "You should now reject both extremes: self-supervision is not merely denoising, and unlabeled scale is not free understanding. Explain the objective family before discussing what the model may learn.",
  },
  {
    slug: "generative-families",
    sections: [
      {
        id: "likelihood-and-latents",
        title: "Different families approximate a distribution differently",
        paragraphs: [
          "Autoregressive models factor a joint distribution into ordered conditional probabilities. The factorization is exact, but generation is sequential and the chosen order matters computationally. Variational autoencoders introduce latent variables and optimize a lower bound containing reconstruction and regularization terms. Their encoder approximates a posterior that is usually intractable. The latent bottleneck can support smooth manipulation, but the prior and decoder assumptions shape what that smoothness means.",
          "Energy-based models assign low energy to compatible configurations without necessarily providing a normalized probability cheaply. Normalizing flows use invertible transformations with tractable Jacobian determinants, giving exact likelihood under architectural constraints. Likelihood itself is not identical to perceptual quality or usefulness. A model can assign strong likelihood to data that humans judge unrelated because density includes low-level statistical structure.",
        ],
        sourceIds: ["bishop-prml", "murphy-pml", "deep-learning-book"],
      },
      {
        id: "adversarial-and-diffusion",
        title: "GANs and diffusion learn through different comparisons",
        paragraphs: [
          "A generative adversarial network trains a generator against a discriminator. In the idealized game, the generator distribution approaches the data distribution. In practice, optimization can cycle, collapse modes, or exploit discriminator weaknesses. The discriminator supplies a learned comparison rather than a fixed reconstruction loss. Sample quality can be strong while likelihood is unavailable and coverage is hard to measure.",
          "Diffusion models define a forward noising process and learn a reverse denoising process or an equivalent score or velocity field. Sampling follows many reverse steps, though distillation and alternative solvers can reduce them. The model learns local directions across noise levels, not a database lookup from noise to one stored image. Training targets, noise schedule, parameterization, sampler, and guidance each affect the final behavior.",
        ],
        sourceIds: ["ddpm", "flow-matching", "welch-ai"],
      },
      {
        id: "conditioning-and-evaluation",
        title: "Guidance trades fidelity against coverage",
        paragraphs: [
          "Conditional generation adds information such as a class, text prompt, image, or action history. Classifier-free guidance combines conditional and unconditional predictions to push samples toward the condition. Stronger guidance can improve prompt alignment while reducing diversity or introducing artifacts. Retrieval and control modules add further constraints. These are generation-time operations, not proof that the base model learned a grounded concept.",
          "Evaluate quality, diversity, coverage, conditional faithfulness, memorization, and cost separately. FID compares feature statistics and can miss specific modes or reward a familiar feature extractor. Human preference depends on instructions and raters. Nearest-neighbor checks probe copying but are sensitive to the search representation. Downstream utility may matter more than visual appeal. A model family should be chosen for the actual density, latency, editing, or control requirement. Report failure examples across the data distribution, not only a curated sample grid.",
        ],
        sourceIds: ["ddpm", "flow-matching", "helm"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Factor p(x1,x2,x3) autoregressively in the order x2, x1, x3.", steps: ["Start with p(x2).", "Multiply by p(x1|x2).", "Finish with p(x3|x2,x1)."], answer: "p(x1,x2,x3)=p(x2)p(x1|x2)p(x3|x2,x1). Different orders define different conditional workloads but the same exact joint factorization." },
      { level: "hard", prompt: "A generator produces sharp samples from only two of ten classes. Explain why visual quality alone misses the failure.", steps: ["Sharpness measures fidelity within generated modes.", "Eight modes have zero or poor coverage.", "Use class-conditional recall, coverage, or task-specific frequency tests alongside quality."], answer: "The model has mode collapse. A few excellent samples cannot establish that it learned the full data distribution." },
      { level: "challenging", prompt: "Design a diffusion ablation that separates the training objective from the sampler.", steps: ["Hold the trained checkpoint fixed and vary solver, step count, and guidance.", "Then hold the sampler protocol fixed across models trained with different prediction parameterizations.", "Report quality, coverage, condition fidelity, latency, and variance over seeds."], answer: "The two-stage comparison prevents a faster or better sampler from being misattributed to the training objective." },
    ],
    transferTask: "Pick a generative system and draw two graphs: the training computation and the sampling computation. Label which parameters change, where randomness enters, how conditioning enters, and which component a published ablation actually tests.",
    calibration: "You should be able to distinguish autoregressive factorization, latent-variable inference, adversarial comparison, diffusion denoising, and flow transport without ranking them on one imaginary intelligence scale. For each family, name the trained target and the sampling procedure separately.",
  },
  {
    slug: "generalization",
    sections: [
      {
        id: "definitions-first",
        title: "Generalization is a relation among train and test conditions",
        paragraphs: [
          "Generalization error is expected loss on a specified data distribution after a specified training procedure. In-distribution generalization assumes train and test samples follow closely related processes. Out-of-distribution evaluation changes something: time, environment, subgroup, composition, intervention, or task. Without naming that change, ‘generalizes beyond its data’ is too vague to test. The boundary is not a visible rim around all training examples.",
          "Interpolation and extrapolation depend on coordinates. A point may lie inside the convex hull in one representation and outside it after a nonlinear transformation. Polynomial regression can extrapolate badly despite low training error, while a physics-informed linear rule can extrapolate cleanly along the right variable. The useful question is which invariant or mechanism the model captured and whether the test exposes a different one.",
        ],
        sourceIds: ["bishop-prml", "murphy-pml", "elements-statistical-learning"],
      },
      {
        id: "memorization-composition",
        title: "Memorization and rule use can coexist",
        paragraphs: [
          "A model can memorize rare strings, learn broad statistical regularities, and compose familiar operations in the same parameter set. Exact-match contamination inflates evaluation, but removing exact duplicates does not remove paraphrases, benchmark discussions, or template overlap. Conversely, a novel output is not proof of a novel rule. The components may be familiar even when their combination has not appeared verbatim.",
          "Compositional tests hold out combinations while retaining their parts. Systematic generalization asks whether learned operations apply to new arrangements. Counterfactual tests change one causal factor while holding others fixed. Adversarial tests search for small changes that break the prediction. No one protocol captures all generalization. A convincing claim uses several and states the remaining gap.",
        ],
        sourceIds: ["gpt3", "emergence-mirage", "helm"],
      },
      {
        id: "uncertainty-and-shift",
        title: "Uncertainty should rise when evidence weakens, but often does not",
        paragraphs: [
          "Aleatoric uncertainty comes from irreducible variation under the model's variables. Epistemic uncertainty reflects limited knowledge about the model or parameters. In practice they are difficult to isolate. Deep ensembles, Bayesian approximations, conformal prediction, and calibrated scores provide different guarantees under different assumptions. Softmax confidence alone is not an out-of-distribution detector.",
          "A deployment system should support abstention, monitoring, and update rules. Detect changes in input features and score distributions, but remember that silent concept shift may leave both looking normal. Sample outcomes for human review, maintain challenge sets, and test recovery after a shift is detected. Continual adaptation adds another risk: the model may forget old regimes or learn from poisoned feedback. Archive pre-update checkpoints and replay protected cases before promotion so adaptation remains reversible and auditable.",
        ],
        sourceIds: ["murphy-pml", "bishop-prml", "helm"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Give one in-distribution and one out-of-distribution split for handwritten digits.", steps: ["Randomly split writers from the same collection for an in-distribution estimate.", "Hold out writers from a new device or region for a shifted estimate.", "State which population each score represents."], answer: "The scores answer different questions. Neither is a model-wide property called ‘generalization.’" },
      { level: "hard", prompt: "A model solves 90 percent of novel arithmetic strings. Why does novelty of the string not prove arithmetic rule learning?", steps: ["The exact strings may be new while local templates or answers are memorized.", "Training may contain near-duplicates or generated variants.", "Use longer lengths, counterfactual operands, scratch checks, and contamination controls."], answer: "Behavior across controlled transformations is stronger evidence of rule use than surface novelty alone." },
      { level: "challenging", prompt: "Design a generalization matrix for a household robot.", steps: ["Cross object identity, room, lighting, instruction wording, and disturbance level.", "Hold out both single factors and novel combinations.", "Measure success, recovery, intervention count, uncertainty, and damage risk."], answer: "The matrix reveals whether competence transfers across factors or depends on one narrow training configuration." },
    ],
    transferTask: "Rewrite one broad claim that a model ‘generalizes’ into at least four testable claims: in-distribution, compositional, temporal or domain shift, and intervention-based. Give a counterexample that would falsify each one.",
    calibration: "You are ready when you instinctively ask ‘generalizes from what to what, under which representation and metric?’ before accepting an extrapolation or emergence story. Your answer should also name the held-out variation and a plausible shortcut or confound.",
  },
  {
    slug: "reinforcement-learning",
    sections: [
      {
        id: "mdp-contract",
        title: "An RL problem is a sequential contract",
        paragraphs: [
          "A Markov decision process specifies states, actions, transition probabilities, rewards, and a discount or horizon. The Markov property says the current state contains the history needed to predict the next state and reward under an action. Real observations often omit relevant state, creating a partially observed problem. A policy maps observations or belief states to action distributions. The return aggregates rewards over time; it is the optimized measurement, not a synonym for real-world value.",
          "A value function predicts expected return from a state or state-action pair under a policy. A Bellman equation decomposes that prediction into immediate reward and discounted future value. This recursion supports dynamic programming when the model is known. In model-free learning, sampled transitions update value estimates. In actor-critic methods, a critic estimates value while an actor changes the policy. The critic is not automatically a safety verifier.",
        ],
        sourceIds: ["sutton-barto", "aima", "dqn"],
      },
      {
        id: "exploration-credit",
        title: "Trial and error is limited by exploration and credit",
        paragraphs: [
          "Exploration chooses actions whose value is uncertain. Random action noise works in small smooth problems but can be unsafe or useless in sparse-reward environments. Optimism, entropy bonuses, posterior sampling, intrinsic motivation, demonstrations, and planning provide different biases. In a physical system, a failed trial may damage hardware or enter an unrecoverable state. Simulation helps only to the extent that its dynamics and observation errors transfer.",
          "Credit assignment asks which earlier actions caused a later outcome. Discounting favors nearer rewards. Eligibility traces and temporal-difference methods propagate information backward across experience. Policy gradients use sampled returns or advantages and can have high variance. Reward shaping adds intermediate signals but can change the optimal behavior if designed carelessly. A clean final score can hide a brittle path that exploits the shaping signal.",
        ],
        sourceIds: ["sutton-barto", "ppo", "dreamer"],
      },
      {
        id: "offline-model-based-safety",
        title: "Data collection determines which RL claims are safe",
        paragraphs: [
          "Offline RL learns from a fixed dataset. It cannot safely evaluate arbitrary actions when those actions are poorly covered, because the value model must extrapolate. Conservative methods penalize unsupported choices. Model-based RL learns dynamics and imagines trajectories, which can improve sample efficiency but introduces model bias. Planning may exploit errors in the learned model just as a policy exploits errors in a reward.",
          "Evaluation needs multiple seeds, learning curves, environment versions, action budgets, and safety outcomes. Return alone hides catastrophic failures, variance, and compute. Compare against imitation, planning, and simple controllers. Test altered dynamics and observation noise. Most importantly, distinguish a policy trained with RL from a system that merely samples, searches, or checks candidates at inference time while its parameters remain fixed.",
        ],
        sourceIds: ["sutton-barto", "dreamer", "reward-tampering"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Rewards are [2,0,4] with discount γ=0.5. Compute the return from the first step.", steps: ["Immediate reward contributes 2.", "The second reward contributes 0.5·0=0.", "The third contributes 0.5²·4=1."], answer: "The discounted return is 3. Later rewards count less because γ is below one." },
      { level: "hard", prompt: "A logged dataset contains only cautious driving. Explain why an offline RL policy's value for aggressive passing is unreliable.", steps: ["The action is outside or near the edge of dataset support.", "The value model must extrapolate transitions and rewards it rarely observed.", "Optimization may select the action precisely because estimation error makes it look good."], answer: "Use support constraints, conservative objectives, simulation with validation, or new controlled data before trusting the action." },
      { level: "challenging", prompt: "Create a reward-hacking test for a warehouse robot paid per scanned package.", steps: ["List proxy-preserving failures: rescanning, blocking other robots, scanning damaged items, or ignoring placement.", "Build adversarial scenarios and independent outcome measures for throughput, damage, and congestion.", "Restrict permissions and define stop conditions before online exploration."], answer: "A high scan reward is acceptable only when independent measures show that the intended warehouse outcome also improves." },
    ],
    transferTask: "For one RL result, write the MDP or POMDP contract, data-collection policy, reset mechanism, reward channel, safety constraints, and evaluation budget. Mark every way the experiment is easier than the claimed deployment.",
    calibration: "Proceed only when policy, value, model, reward, return, planner, and verifier are separate terms. You should be able to explain why a search procedure may use a value estimate without becoming reinforcement learning.",
  },
  {
    slug: "transformers",
    sections: [
      {
        id: "tokens-and-residual-stream",
        title: "A transformer begins with discrete tokens and continuous states",
        paragraphs: [
          "A tokenizer maps text into discrete IDs. Subword tokenization balances vocabulary size against sequence length, so a word may occupy one token in one language and several in another. An embedding table maps each ID to a vector. Position information is added or encoded through rotations or relative biases because attention alone does not know sequence order. These input vectors enter the residual stream, the evolving state passed through the network.",
          "Each block reads from the residual stream, computes an update, and adds it back. Attention mixes information across positions. The feed-forward sublayer applies position-wise nonlinear computation. Normalization controls scale. Residual addition lets many components contribute to the same state, which is why one attention map cannot be read as a complete explanation. The final unembedding maps the last state at each position to token logits.",
        ],
        sourceIds: ["attention", "deep-learning-book", "welch-ai"],
      },
      {
        id: "attention-mechanism",
        title: "Attention is content-addressed mixing",
        paragraphs: [
          "For each position, learned projections produce a query, key, and value. Query-key dot products measure compatibility, scaling controls their magnitude, a causal mask blocks future positions, and softmax turns scores into nonnegative weights that sum to one. The output is a weighted mixture of value vectors. Multi-head attention repeats this with different projections and then combines the results.",
          "The weights describe one mixing operation at one layer and head. They do not include information already present in the residual stream, the content of value vectors, output projections, later nonlinearities, or interactions among heads. A high weight can move unimportant content; a modest weight can move a decisive direction. Causal tracing, ablation, and activation patching are stronger tests of contribution than a colorful attention matrix alone.",
        ],
        sourceIds: ["attention", "induction-heads", "welch-ai"],
      },
      {
        id: "training-and-context",
        title: "Next-token training and in-context use are different time scales",
        paragraphs: [
          "Causal language modeling minimizes cross-entropy for the observed next token across many positions. Backpropagation changes persistent parameters. During inference, a prompt changes activations and the key-value cache, not the weights. The model can condition on demonstrations in context and exhibit task-like adaptation without a gradient update. This is called in-context learning, though the word learning here refers to changed behavior within the sequence rather than persistent parameter training.",
          "Generation samples or selects one token, appends it, and repeats. Greedy decoding, temperature, top-p sampling, beam search, and verifier-guided selection change the output distribution without changing the base model. The visible text is a generated artifact, not a guaranteed record of internal causation. A model can produce a persuasive explanation after arriving at an answer through different internal features.",
        ],
        sourceIds: ["gpt3", "induction-heads", "self-consistency"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Queries and keys are q=(1,0), k1=(1,0), k2=(0,1). With no scaling, compute the two softmax weights.", steps: ["Dot products are 1 and 0.", "Exponentials are e and 1.", "Weights are e/(e+1) and 1/(e+1), about 0.731 and 0.269."], answer: "The query mixes both value vectors, favoring the first. Compatibility is graded rather than a hard lookup." },
      { level: "hard", prompt: "Explain why a 0.9 attention weight does not show that a source token caused the final answer.", steps: ["The associated value may contain little relevant information.", "Residual pathways and other heads can carry or overwrite information.", "The final behavior depends on later layers and output projections."], answer: "Treat the weight as a local routing statistic. Test causality with ablation or patching and measure the final behavior." },
      { level: "challenging", prompt: "Design a test that separates in-context learning from memorized answer retrieval.", steps: ["Create synthetic tasks with random label mappings generated after training.", "Vary the number and order of demonstrations while holding surface form constant.", "Compare against nearest-neighbor retrieval and test systematic transfer to new inputs."], answer: "Success on fresh random mappings is stronger evidence that context changes the computation, though it still does not reveal a single internal algorithm." },
    ],
    transferTask: "Trace one generated token from token IDs to logits. Draw the embedding, positional mechanism, residual stream, attention update, feed-forward update, normalization, unembedding, and decoding rule. Mark which objects persist across requests and which exist only for this context.",
    calibration: "You should now distinguish a token, embedding, residual activation, parameter, attention score, value mixture, logit, probability, and sampled output. If ‘attention’ still means the whole model, repeat this chapter.",
  },
  {
    slug: "compute-and-context",
    sections: [
      {
        id: "three-budgets",
        title: "Parameters, training compute, and runtime memory are separate budgets",
        paragraphs: [
          "Parameter count measures learned numbers, not active arithmetic for one token. Dense models use nearly all weights on each forward pass. Mixture-of-experts models store many expert parameters but route each token through a subset, so total and active parameters differ. Training compute includes forward and backward passes, optimizer updates, communication, and experiments. Reported FLOPs usually approximate only part of that system cost.",
          "Runtime memory contains weights, current activations, temporary kernels, and the key-value cache. Precision changes bytes per number. Quantization compresses weights or activations, but calibration error and hardware support affect realized speed. Parallelism splits tensors, pipeline stages, experts, or data across devices. Communication can dominate arithmetic. A model that fits in memory may still be too slow or costly for the required latency.",
        ],
        sourceIds: ["switch", "flashattention", "deep-learning-book"],
      },
      {
        id: "context-and-kv-cache",
        title: "A context window is capacity, not guaranteed recall",
        paragraphs: [
          "The context window bounds how many tokens the model can process in one sequence under a particular implementation. Attention cost, positional encoding, and training length constrain how that window behaves. During autoregressive generation, cached keys and values avoid recomputing past layers for every new token. Cache size grows with layers, heads or latent projections, sequence length, and precision.",
          "Information inside the window may still be ignored. Models often perform worse when relevant evidence sits in the middle of long contexts or is surrounded by distractors. Retrieval can select a smaller evidence set, but retrieval errors become model errors. Compression and summarization save tokens while discarding detail. Evaluate exact placement, distractors, query type, and output faithfulness rather than quoting the maximum context length as memory capacity.",
        ],
        sourceIds: ["lost-middle", "attention", "flashattention"],
      },
      {
        id: "systems-measurement",
        title: "Throughput claims depend on workload and hardware",
        paragraphs: [
          "Latency to first token, time per output token, batch throughput, energy, and cost per successful task are different metrics. Batching improves hardware use but can increase individual waiting time. Speculative decoding may accelerate easy sequences. FlashAttention reduces memory traffic while computing exact attention. None of these changes the training objective, though systems improvements can make larger experiments or longer contexts feasible.",
          "Benchmark a deployment with the actual input and output lengths, concurrency, quantization, hardware, and quality target. Separate prefill from decoding. Report tail latency, not only the mean. Include retries and verifier calls when an agent samples several candidates. An inference method that improves pass rate by five samples may reduce cost per success or increase it, depending on baseline accuracy and serving overhead.",
        ],
        sourceIds: ["flashattention", "chinchilla", "hamming-art"],
      },
    ],
    practice: [
      { level: "medium", prompt: "A model has 7 billion parameters stored in 16-bit format. Estimate raw weight memory.", steps: ["Sixteen bits equals two bytes.", "Multiply 7 billion by two bytes.", "The result is about 14 billion bytes, roughly 14 GB before overhead."], answer: "Weights alone need about 14 GB in decimal units. Activations, cache, runtime buffers, and allocator overhead require more." },
      { level: "hard", prompt: "Why can a 128k context model fail a fact placed at token 60k while answering a 20k context correctly?", steps: ["Maximum length only establishes that the sequence can be processed.", "Position, distractors, and training distribution affect evidence use.", "Test placement curves and retrieval sensitivity across lengths."], answer: "Window size is an address-space limit, not a guarantee of uniform access or reasoning quality." },
      { level: "challenging", prompt: "Compare two serving systems when A gives 30 tokens/s at 70 percent success and B gives 15 tokens/s at 90 percent success.", steps: ["Define the task's token lengths and whether retries are allowed.", "Compute expected attempts and total tokens per success under the retry policy.", "Add first-token latency, batching, and dollar cost before ranking."], answer: "Raw token throughput cannot choose the better system. Cost and latency per successful task are the decision metrics." },
    ],
    transferTask: "Take a model card's parameter, context, and throughput claims. Build a budget sheet for weights, cache, input tokens, output tokens, number of candidates, verifier calls, and hardware. State every assumption required to reproduce the advertised number.",
    calibration: "You are ready when a long context, a large parameter count, and a high FLOP budget no longer sound like interchangeable forms of intelligence. Each is a resource with its own bottleneck.",
  },
  {
    slug: "scaling-laws",
    sections: [
      {
        id: "empirical-regimes",
        title: "A scaling law is a fitted relation over a measured regime",
        paragraphs: [
          "Neural scaling studies fit simple curves relating loss to model size, data, or compute while holding a training recipe relatively stable. Power laws summarize regularity across the sampled range. They help allocate experiments and predict diminishing returns. They do not prove the same exponent will continue after architecture, data quality, objective, hardware, or evaluation changes. Extrapolation uncertainty grows outside the observed regime.",
          "Loss is not a universal capability scale. Small average loss changes can matter differently across tasks, and benchmark metrics can show thresholds or saturation. Apparent emergent jumps may arise when a smooth underlying score is passed through a discrete metric. Other capabilities may genuinely require a minimum competence across interacting components. The right response is to inspect the measurement, not to assume either mystical emergence or complete illusion.",
        ],
        sourceIds: ["scaling-laws", "emergence-mirage", "helm"],
      },
      {
        id: "compute-optimality",
        title: "Compute-optimal training balances parameters and tokens",
        paragraphs: [
          "For a fixed training-compute budget, an oversized model trained on too few tokens may be worse than a smaller model trained longer. Chinchilla-style analysis estimated a better balance for its architecture, optimizer, data, and budget range. The result changed common allocation practice, but its numerical rule is not timeless. Repeated data, higher-quality data, mixture-of-experts routing, multimodal objectives, and longer-context training alter the tradeoff.",
          "Total project compute also includes data processing, failed runs, hyperparameter search, post-training, and evaluation. Inference demand may eventually exceed training demand for a widely used model. Economic optimization then includes latency, energy, memory, utilization, and product volume. A technical scaling paper cannot by itself explain infrastructure investment or prove that one learning method drives it.",
        ],
        sourceIds: ["chinchilla", "scaling-laws", "switch"],
      },
      {
        id: "data-and-contamination",
        title: "Data quality changes the curve",
        paragraphs: [
          "More tokens are useful only when they add relevant information. Duplicate documents increase exposure without equal coverage. Filtering removes low-quality or unsafe material but may narrow domains and languages. Synthetic data can target difficult cases or amplify a teacher's mistakes. Curriculum order, mixture weights, and recency shape the learned distribution. DataComp demonstrates that curation choices can materially change contrastive model performance under controlled compute.",
          "Benchmark contamination includes exact examples, paraphrases, solution discussions, and generated derivatives. Search for overlap at several similarity levels and use newly authored or time-separated tests. Even a clean benchmark can be overfit through repeated public feedback. Track evaluation history and reserve private audits. Scaling should be reported with data provenance and test freshness, not only parameter and token counts.",
        ],
        sourceIds: ["datacomp", "helm", "hamming-art"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Loss follows L(C)=1+4C^{-0.5}. Compare C=16 and C=64.", steps: ["At 16, C^{-0.5}=1/4, so L=2.", "At 64, the factor is 1/8, so L=1.5.", "Four times the compute reduces excess loss from 1 to 0.5."], answer: "The example shows diminishing returns. The irreducible term remains 1 under this fitted form." },
      { level: "hard", prompt: "A benchmark jumps from 49 to 51 percent while a pass threshold is 50. Explain a false emergence story.", steps: ["The underlying continuous accuracy improved by only two points.", "A binary ‘passes benchmark’ metric changes from 0 to 1 at the threshold.", "Plot continuous scores and uncertainty across scale."], answer: "The discontinuity may belong to the metric, not the capability. This does not rule out all emergent behavior; it diagnoses this measurement." },
      { level: "challenging", prompt: "Design a scaling experiment that tests data quality rather than only token count.", steps: ["Create several documented data mixtures with matched token and compute budgets.", "Train multiple model sizes and seeds under the same recipe.", "Evaluate fresh in-domain, shifted, memorization, and safety sets, then fit separate curves."], answer: "Different exponents or offsets reveal that token count alone is an incomplete resource description." },
    ],
    transferTask: "Find a scaling plot and reconstruct its axes, fitted range, held-constant choices, uncertainty, and extrapolated region. Write one decision it supports and three claims it does not support.",
    calibration: "You should be comfortable using scaling laws for resource planning while refusing to turn them into a law of unlimited capability. Always name the regime, recipe, data, and measured outcome.",
  },
  {
    slug: "post-training",
    sections: [
      {
        id: "supervised-and-preference",
        title: "Post-training changes behavior under a new data contract",
        paragraphs: [
          "Supervised fine-tuning trains on demonstrations of desired responses. It teaches format, task patterns, and behavioral priors but inherits annotator coverage and mistakes. Preference learning collects comparisons between outputs. A reward model predicts those comparisons, and an RL algorithm may optimize the policy against that learned reward while constraining drift from a reference model. The reward model is a proxy for a protocol, not direct access to human values.",
          "Direct preference optimization rewrites a class of preference objectives into a supervised-looking loss over preferred and rejected responses. It removes an explicit online RL loop from the pipeline but still depends on preference data, a reference policy, and assumptions connecting comparisons to reward. RLAIF uses model-generated feedback under written criteria. Constitutional methods can scale critique and revision, yet their principles remain incomplete natural-language instructions.",
        ],
        sourceIds: ["instructgpt", "dpo", "constitutional-ai"],
      },
      {
        id: "verifiable-rewards",
        title: "Verifiers strengthen feedback only inside their coverage",
        paragraphs: [
          "Code execution, formal proof checking, exact arithmetic, and environment outcomes can provide cheaper feedback than open-ended human judgment. Reinforcement learning with verifiable rewards uses these checks to train sampled behavior. Process supervision scores intermediate steps, while outcome supervision scores final results. A process label can localize errors but is more expensive and may still reward plausible-looking traces rather than faithful internal reasoning.",
          "A verifier checks a specification. Unit tests miss untested behavior. A theorem prover checks the formal statement, not whether the informal problem was translated correctly. A simulator can be exploited through model error. Strong optimization increases pressure on these gaps. Keep hidden tests, adversarial cases, permission limits, and independent outcome measures. Verification is an engineering surface, not a magical source of truth.",
        ],
        sourceIds: ["deepseek-r1", "process-supervision", "reward-tampering"],
      },
      {
        id: "distillation-synthetic-loops",
        title: "Synthetic data can concentrate skill and error",
        paragraphs: [
          "Rejection sampling generates several candidates, keeps those that pass a scorer, and fine-tunes on the survivors. Distillation trains a smaller or different model to match teacher outputs or distributions. Self-training labels new data with a current model. These methods can focus computation on useful examples, expose more solved trajectories, and transfer behavior without direct human annotation for every case.",
          "The filter defines the curriculum. If it prefers one style or misses a failure, repeated rounds can narrow diversity and strengthen the blind spot. Generated problems may become too easy for the generator-verifier pair. Hold out human-authored and adversarial tests, track novelty and coverage, retain negative samples, and compare each round against the original data. More accepted synthetic tokens are not automatically more independent information.",
        ],
        sourceIds: ["deepseek-r1", "alphageometry", "constitutional-ai"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Label the roles in RLHF: two candidate responses are ranked, a scorer is trained, and the policy is optimized.", steps: ["The rankings are preference data.", "The scorer is a learned reward model.", "Policy optimization changes the generator to increase predicted reward under a constraint."], answer: "Human feedback enters through a learned proxy. The final policy is not directly optimizing an all-purpose human-value function." },
      { level: "hard", prompt: "A code model passes all public tests after RL. Give three explanations besides genuine algorithmic generalization.", steps: ["Training data may include tests or close solutions.", "The policy may exploit weak cases or formatting in the test harness.", "Repeated benchmark feedback may tune the system to the public suite."], answer: "Use hidden tests, mutation tests, adversarial inputs, contamination audits, and independent tasks before widening the claim." },
      { level: "challenging", prompt: "Design a safe synthetic-data iteration contract.", steps: ["Version generator, verifier, prompt, sampling budget, and acceptance rule.", "Measure diversity, difficulty, duplication, and failure categories before training.", "Keep untouched human and adversarial evaluations and define a rollback gate."], answer: "The loop earns another round only if gains transfer outside the generator-verifier distribution without worsening protected failure classes." },
    ],
    transferTask: "Draw the post-training pipeline of one released model. For every arrow, state who produced the data, what was scored, which parameters changed, and which evidence is unavailable. Separate company description from measured result.",
    calibration: "You are ready when SFT, reward modeling, PPO-style RLHF, DPO, RLAIF, rejection sampling, and distillation occupy different boxes in your mental pipeline rather than one box called alignment.",
  },
  {
    slug: "reasoning-and-search",
    sections: [
      {
        id: "decoding-and-aggregation",
        title: "More inference compute can improve selection without learning",
        paragraphs: [
          "Greedy decoding chooses the highest-probability token at each step. Sampling explores alternatives. Beam search keeps several high-scoring prefixes, though token likelihood need not track task correctness. Best-of-N samples complete candidates and selects one with a scorer. Self-consistency groups answers across samples and chooses a majority or consensus. All can run with fixed model parameters.",
          "Compute should be reported per solved task. Ten samples can raise pass rate while multiplying tokens and verifier calls. Correlated samples reduce the benefit predicted by an independence formula. Diversity prompts, temperatures, or different models may help, but they also change calibration. Compare against using the same budget on a stronger single pass, retrieval, or a deterministic solver.",
        ],
        sourceIds: ["self-consistency", "tree-thoughts", "helm"],
      },
      {
        id: "explicit-search",
        title: "Search requires a state, expansion rule, and bookkeeping",
        paragraphs: [
          "Breadth-first search expands the shallowest frontier and finds a shortest path when edge costs are equal. Dijkstra expands the lowest accumulated cost. A* adds a heuristic estimate and is optimal under stated conditions. Monte Carlo tree search uses selection, expansion, simulation or evaluation, and value backup. These algorithms maintain explicit search state even if a neural network supplies actions or value estimates.",
          "A language model that revises its text may behave as if it is searching, but behavior does not identify implementation. Literal MCTS requires evidence of a tree, visit statistics, selection policy, and backup. Tree-of-thought prompting is an explicit scaffold around generation. A model may also internalize search-like patterns in its forward computation. Keep behavioral description separate from a claim about hidden machinery.",
        ],
        sourceIds: ["aima", "tree-thoughts", "deepseek-r1"],
      },
      {
        id: "verifiers-and-planners",
        title: "Proposal and checking have domain-specific asymmetries",
        paragraphs: [
          "Formal proof checking can be much cheaper than discovering a proof. Compilation and tests can reject many programs quickly. Chess rules make move legality exact while good play remains hard. In open-ended writing, policy, or science, the target is incomplete and disagreement is legitimate. A universal claim that the verifier must be smarter than the actor fails in the first group; a claim that checking is always easy fails in the second.",
          "A value model estimates future promise, while a hard verifier accepts or rejects a property. Search can use both. Learned value estimates may be biased outside their training trajectories. Hard checks may cover only a subset of requirements. Combine outcome tests, process constraints, uncertainty, and adversarial search. When the model and verifier share training data or architecture, correlated errors deserve special attention. Independence is evidence, not a default assumption.",
        ],
        sourceIds: ["process-supervision", "alphageometry", "alphadev"],
      },
    ],
    practice: [
      { level: "medium", prompt: "A solver samples five independent candidates with success probability 0.3. Compute the chance at least one succeeds.", steps: ["One candidate fails with probability 0.7.", "All five fail with probability 0.7⁵≈0.1681.", "At least one succeeds with probability about 0.8319."], answer: "The idealized pass@5 is about 83.2 percent. Correlated samples would reduce the gain." },
      { level: "hard", prompt: "A generated trace contains backtracking language. What evidence is needed before calling the system MCTS?", steps: ["Identify persistent nodes and an expansion procedure.", "Show selection statistics, rollout or value evaluation, and backup.", "Distinguish the external controller from tokens merely describing reconsideration."], answer: "Without these artifacts, describe self-correction behavior or sampled search, not literal Monte Carlo tree search." },
      { level: "challenging", prompt: "Design a compute-matched comparison of best-of-N and iterative revision.", steps: ["Match total generated tokens and verifier calls.", "Use the same base model, tasks, and final selection rule.", "Report success, diversity, latency, calibration, and failure correlation over seeds."], answer: "Compute matching tests whether the structure of inference, rather than a larger budget alone, produces the gain." },
    ],
    transferTask: "Take one reasoning benchmark result and decompose it into base model, prompt, sampling policy, search controller, tool calls, verifier, token budget, and stopping rule. Recalculate the claim at equal cost if the paper permits it.",
    calibration: "You should be able to watch a model correct itself without inferring a hidden tree, and watch a tree search use a learned value function without calling the whole algorithm reinforcement learning. Behavior and implementation remain separate claims.",
  },
  {
    slug: "multimodal-agents",
    sections: [
      {
        id: "alignment-and-fusion",
        title: "Multimodal alignment makes interfaces possible",
        paragraphs: [
          "Contrastive image-text training places paired views near each other under a learned metric. Captioning predicts text from visual features. Early fusion mixes modalities within shared layers; late fusion combines separate encoders or decisions. Cross-attention lets one stream query another. These designs answer how information moves, not whether the system has acquired a single grounded world model.",
          "A modality can contribute complementary evidence or correlated noise. Text labels may import cultural bias into image features. Video adds temporal cues but also editing conventions. Audio identifies timing and speaker information while raising privacy risks. Evaluate each modality's marginal contribution through ablations, missing-modality tests, conflicts, and distribution shifts. More input channels can make a model more capable and more vulnerable at the same time.",
        ],
        sourceIds: ["clip", "attention", "rt2"],
      },
      {
        id: "tools-retrieval-memory",
        title: "Agents are systems around models",
        paragraphs: [
          "A tool-using agent observes a state, decides whether to call an API or act, reads the result, and updates its working history. Retrieval adds external documents. Memory stores selected events across episodes. A planner may split tasks. A verifier may check outputs. The base model can remain fixed while the scaffold changes performance dramatically. Report the complete system, not only the checkpoint name.",
          "Each component adds a failure boundary. Retrieval can be stale or poisoned. Tools can expose permissions and side effects. Memory can preserve false or private information. Long plans become stale as the environment changes. Use typed tool schemas, least privilege, timeouts, idempotency keys, provenance, and explicit confirmation for destructive actions. Treat tool output as untrusted data rather than instructions.",
        ],
        sourceIds: ["react", "owasp-prompt-injection", "owasp-excessive-agency", "nist-genai-profile"],
      },
      {
        id: "grounding-and-interaction",
        title: "Grounding needs consequences and tests",
        paragraphs: [
          "A word or image feature is grounded to the extent that it participates in reliable perception, action, and correction under relevant conditions. An embedding association alone can support retrieval without supporting physical control. A robot additionally needs temporal state, coordinate transforms, action semantics, latency handling, and recovery. Continuous interaction models may learn timing, interruption, and feedback as native signals, but pleasant interaction is not proof of deeper reasoning.",
          "Cross-domain analogy can suggest a representation or experiment. It does not establish an isomorphism between domains. Translate the analogy into variables, causal relations, and predicted interventions. Then test it against domain-specific evidence. A useful agent should expose uncertainty and provenance when it crosses domains instead of presenting a high-dimensional association as a discovered law. The receiving field sets the validation standard.",
        ],
        sourceIds: ["rt2", "open-x", "clip"],
      },
    ],
    practice: [
      { level: "medium", prompt: "An image-text model retrieves matching captions but cannot answer where to grasp an object. Identify the missing evidence.", steps: ["Retrieval establishes alignment under the dataset's metric.", "Grasping needs geometry, action coordinates, contact outcomes, and temporal feedback.", "Evaluate closed-loop grasp success and recovery under perturbation."], answer: "Cross-modal alignment is a component, not evidence of embodied control." },
      { level: "hard", prompt: "A retrieval agent gives a confident answer from a stale policy document. Design the prevention path.", steps: ["Store document date, authority, and version in the retrieval index.", "Filter or warn on expired evidence and show the cited passage.", "Require a current authoritative source for high-stakes answers."], answer: "The fix belongs to indexing, retrieval, interface, and policy, not only to the language model prompt." },
      { level: "challenging", prompt: "Threat-model an agent with email, calendar, and shell tools.", steps: ["List data boundaries, write operations, credentials, and irreversible effects.", "Assume tool outputs and messages contain prompt injection.", "Apply least privilege, scoped confirmation, sandboxing, audit logs, and idempotent retries."], answer: "Agent safety is a systems property. A capable model cannot compensate for unconstrained permissions and untrusted context." },
    ],
    transferTask: "Choose an agent demo and redraw it as a production call graph. Include model, prompt state, retrieval, memory, every tool, credentials, retries, human gates, and evaluation. Mark which components were omitted from the reported benchmark.",
    calibration: "Move on when you can separate multimodal alignment, fusion, retrieval, tool use, memory, grounding, and autonomy. A system may have any subset, and each subset changes the claim. Draw the boundary before judging the demo.",
  },
  {
    slug: "world-models",
    sections: [
      {
        id: "roles-not-labels",
        title: "World model names a role, not one architecture",
        paragraphs: [
          "In model-based control, a world model predicts how a state changes under an action and may also predict rewards or observations. A planner uses those predictions to compare action sequences. In representation learning, a predictive model may forecast future features without decoding pixels or receiving actions. Generative video models produce plausible frames. Language models can simulate textual environments. These systems overlap, but the label alone does not tell us which variables, interventions, or evaluation they support.",
          "A renderer predicts what an observation should look like from a viewpoint. A simulator predicts how state evolves under interventions. A planner chooses actions toward a goal. One model may support all three, but competence in the first does not establish the second or third. Spatial consistency can make a generated world navigable while its hidden physics remain wrong. The functional taxonomy keeps visual impressiveness from silently becoming a claim of causal understanding.",
        ],
        sourceIds: ["worldlabs-taxonomy", "dreamer", "ijepa"],
      },
      {
        id: "state-and-memory",
        title: "Useful state must retain what future decisions need",
        paragraphs: [
          "A state representation should summarize history well enough to predict relevant futures. Partial observation makes this hard: an object behind the camera still exists, a robot's actuator may be heating, and another agent may have private information. Recurrent states, belief distributions, scene memories, and explicit maps are different attempts to preserve hidden context. Pixel accuracy can waste capacity on texture while missing a small variable that determines control.",
          "Long rollouts compound model error. A planner may steer imagined states into regions where the model is overconfident and wrong. Ensembles, uncertainty penalties, short receding horizons, and real-world replanning can reduce the damage. Evaluation should include counterfactual interventions, object permanence, topology, stochastic events, and recovery, not only one-step prediction or visually pleasing samples.",
        ],
        sourceIds: ["dreamer", "sutton-barto", "worldlabs-taxonomy"],
      },
      {
        id: "predictive-representations",
        title: "JEPA changes the predicted object, not the category of learning",
        paragraphs: [
          "Joint-embedding predictive methods encode a context and predict the representation of a target region. They avoid spending all capacity on pixel-level details and can focus on more abstract predictable structure. Masking and target construction still create a self-supervised task. The teacher or target encoder, predictor, and anti-collapse design define the actual method.",
          "For control, an action-conditioned latent model must represent how interventions change future state. A video predictor without actions may learn temporal regularities yet remain ambiguous about causation. Conversely, pixel-generative models can be useful when visual detail matters for planning or data generation. Compare representations by downstream planning, sample efficiency, shift, and calibrated uncertainty rather than declaring one target space universally superior.",
        ],
        sourceIds: ["ijepa", "vjepa", "diffusion-policy"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Classify a system that generates new views of a static room from camera pose but accepts no actions that alter the room.", steps: ["It maps viewpoint conditions to observations.", "It can preserve spatial appearance across camera motion.", "It does not model intervention-driven physical state change."], answer: "It is primarily a learned renderer. Calling it a general simulator or planner would exceed the evidence." },
      { level: "hard", prompt: "A latent model has low one-step error but poor ten-step control. Give three causes.", steps: ["Small prediction biases compound across rollout.", "The policy enters states absent from model training.", "The latent loss may ignore variables that matter to reward or controllability."], answer: "Evaluate closed-loop planning and uncertainty under policy-induced states, not only teacher-forced one-step prediction." },
      { level: "challenging", prompt: "Design an intervention test for a claimed physical world model.", steps: ["Choose controlled changes to mass, friction, occlusion, and action timing.", "Predeclare predicted trajectories and uncertainty under each intervention.", "Compare against noncausal video baselines and measure planning success after the change."], answer: "A causal claim gains support when action-conditioned predictions and plans remain calibrated under interventions not seen in training." },
    ],
    transferTask: "Take one system called a world model and fill a four-column ledger: observation renderer, action-conditioned simulator, reward or goal model, and planner. Put public evidence in each cell and leave unsupported cells blank.",
    calibration: "You should now ask ‘world model for which role?’ before discussing architecture. Rendering, prediction, simulation, and planning may share components while requiring different evidence.",
  },
  {
    slug: "embodied-ai",
    sections: [
      {
        id: "closed-loop-stack",
        title: "Embodied behavior is a timed feedback loop",
        paragraphs: [
          "A robot observes through cameras, force sensors, proprioception, audio, or other channels. State estimation combines these signals under noise and delay. A policy or planner selects an action. Controllers translate it into actuator commands. The world changes, and the loop repeats. Failure in calibration, latency, coordinate frames, mechanics, or recovery can defeat an otherwise capable policy. End-to-end learning does not remove these dependencies; it makes some boundaries less explicit.",
          "Open-loop evaluation gives a command sequence without correction. Closed-loop evaluation allows feedback after each action. Many manipulation tasks require millimeter-scale contact adjustment, so success from fixed training starts can hide brittleness. Perturb objects, vary friction and payload, inject delay, and test recovery from mistakes. Count interventions, damage, and time as well as final success.",
        ],
        sourceIds: ["aima", "rt2", "open-x"],
      },
      {
        id: "policy-families",
        title: "Cloning, diffusion, planning, and RL solve different parts",
        paragraphs: [
          "Behavior cloning learns action distributions from demonstrations. It is direct and stable but can compound error outside demonstrated states. Diffusion policies model a distribution over action sequences through iterative denoising, which helps represent several valid motions. Vision-language-action models connect broad visual and language representations to robot actions. Their web knowledge may improve semantics while leaving contact dynamics to robot data.",
          "Model-predictive control repeatedly plans over a finite horizon using a model, executes a small part, and replans. Reinforcement learning optimizes return from trajectories and can improve beyond demonstrations when safe exploration or simulation is available. Hybrid systems initialize from imitation, plan with learned dynamics, and fine-tune under rewards. Compare equal data, control rate, hardware, and resets before attributing gains to a method family.",
        ],
        sourceIds: ["diffusion-policy", "rt2", "dreamer"],
      },
      {
        id: "sim-to-real-and-safety",
        title: "The reality gap is a distribution shift with consequences",
        paragraphs: [
          "Simulation can generate large datasets and cheap failures. Domain randomization varies textures, dynamics, and sensors so a policy cannot depend on one simulator setting. System identification fits simulator parameters to the real device. Residual learning corrects a known controller. None guarantees transfer when the simulator omits a relevant contact mode, wear pattern, or human behavior.",
          "Physical exploration needs a safety envelope. Limit force, speed, workspace, and action classes. Monitor out-of-distribution observations and uncertainty. Preserve a recovery controller and emergency stop. Log synchronized sensor, action, and outcome traces. A real-world reward is still mediated by sensors and software, so it can be delayed, spoofed, or incomplete. Nature constrains the result but does not hand the algorithm a clean objective.",
        ],
        sourceIds: ["open-x", "sutton-barto", "reward-tampering"],
      },
    ],
    practice: [
      { level: "medium", prompt: "A cloning policy has a 2 percent chance of leaving the demonstrated state distribution each step. Approximate the chance it stays within distribution for 50 independent steps.", steps: ["Per-step stay probability is 0.98.", "Across 50 independent steps it is 0.98⁵⁰.", "This is about 0.364."], answer: "Only about 36 percent of trajectories remain covered under the simplified assumptions. Small per-step errors compound over a horizon." },
      { level: "hard", prompt: "A robot succeeds 95 percent in simulation and 40 percent in the lab. Design the first diagnostic matrix.", steps: ["Separate perception, state estimation, dynamics, actuator, latency, and reset differences.", "Replay real sensor logs through the policy and simulated actions through identified dynamics.", "Vary one factor at a time and measure uncertainty and recovery."], answer: "The matrix localizes the reality gap instead of treating sim-to-real as one undifferentiated failure." },
      { level: "challenging", prompt: "Design a safe online-learning gate for a contact-rich task.", steps: ["Define hard force, speed, workspace, and energy limits enforced outside the learned policy.", "Require calibrated uncertainty and route uncertain states to a recovery controller or operator.", "Promote updates only after simulation, shadow-mode replay, and bounded canary trials."], answer: "The learned objective operates inside independent safety constraints; it is never the sole authority over hazardous actions." },
    ],
    transferTask: "For a robotics result, draw the sensor-to-actuator loop with rates and delays. Add training data coverage, reset assumptions, safety controller, and evaluation perturbations. Identify which element would fail first outside the lab.",
    calibration: "You should be able to explain why physical consequences are informative yet not clean labels, and why denoising-based policies are a direct counterexample to the claim that generative prediction fails in control.",
  },
  {
    slug: "evaluation-science",
    sections: [
      {
        id: "measurement-object",
        title: "A benchmark is a measurement system",
        paragraphs: [
          "A benchmark specifies tasks, prompts or inputs, reference answers or judges, metrics, sampling, and resource limits. A model score is conditional on that entire protocol. Changing decoding, tools, few-shot examples, judge, time limit, or candidate budget can change the ranking. State of the art therefore needs coordinates: task, dataset version, protocol, metric, resources, and date.",
          "Validity asks whether the instrument measures the intended construct. Reliability asks whether repeated measurements are stable. A math benchmark may test formatting and contamination along with reasoning. A human preference test may mix factuality, style, and rater expectations. Inspect examples, error categories, judge agreement, and subgroup coverage. A precise number from a weak construct is still weak evidence.",
        ],
        sourceIds: ["helm", "hamming-art", "murphy-pml"],
      },
      {
        id: "uncertainty-and-budgets",
        title: "Scores need uncertainty and compute",
        paragraphs: [
          "A finite test set creates sampling uncertainty. Paired bootstrap or appropriate statistical tests can compare systems on the same examples. Multiple model seeds and sampling seeds add further variation. Tiny leaderboard differences often sit inside this noise. Predeclare primary metrics and avoid choosing the most favorable slice after seeing results.",
          "Pass@k measures the chance that at least one of k candidates succeeds under a sampling protocol. Higher k spends more compute. Agent evaluations may add retrieval, tools, retries, and judges. Report total tokens, wall time, hardware, tool calls, and dollar cost per successful task. A cheaper system with slightly lower raw accuracy may be better for the actual constraint.",
        ],
        sourceIds: ["livebench", "helm", "self-consistency"],
      },
      {
        id: "contamination-and-adaptation",
        title: "Public tests become part of the training environment",
        paragraphs: [
          "Benchmark items can enter pretraining corpora, fine-tuning sets, synthetic data, tutorials, or prompt templates. Exact-match searches catch only the easiest contamination. Semantic overlap and solution exposure are harder. Time-separated and newly authored evaluations reduce exposure but still need provenance. Private tests protect labels while limiting public audit, so a balanced program uses both public diagnostic sets and held-out gates.",
          "Developers adapt to leaderboards through repeated submissions. Even without item access, score feedback guides model selection and prompting. This is test-set overfitting at ecosystem scale. Rotate tasks, retain hidden variants, and measure transfer to real workflows. For adaptive agents, also test whether the system recognizes the evaluation and changes behavior. A benchmark result should expire when its data or protocol no longer represent the field. Publish that expiry rule with the score.",
        ],
        sourceIds: ["helm", "livebench", "emergence-mirage"],
      },
    ],
    practice: [
      { level: "medium", prompt: "Two models score 81/100 and 83/100 on the same items. Why is the two-point gap not automatically meaningful?", steps: ["Only two item outcomes differ in the totals.", "Paired errors, item difficulty, and sampling variation determine uncertainty.", "Inspect the disagreement cases and compute a paired interval or test."], answer: "The leaderboard order is descriptive. Statistical and practical significance need more evidence." },
      { level: "hard", prompt: "Model A solves 60 percent in one try; Model B solves 75 percent using eight tries. Design a fair comparison.", steps: ["Report pass@1 and pass@8 for both under matched sampling.", "Measure tokens, latency, verifier cost, and correlation among attempts.", "Compare cost per success at the deployment constraint."], answer: "The higher pass rate may or may not justify its eight-candidate budget. The answer depends on the task's cost and latency limits." },
      { level: "challenging", prompt: "Design a frontier benchmark resistant to rapid saturation.", steps: ["Use versioned, time-separated task generation with auditable provenance.", "Include perturbations, hidden tests, cost limits, and human or formal checks matched to the construct.", "Publish error taxonomies and refresh rules while keeping a sealed final gate."], answer: "Resistance comes from governance and measurement design, not secrecy alone. The benchmark must remain inspectable enough to diagnose what changed." },
    ],
    transferTask: "Audit one model leaderboard. Record task source, contamination controls, judge, prompting, sampling budget, tools, cost, uncertainty, and update date. Rewrite the winner claim so it says exactly what the table measured.",
    calibration: "Do not use ‘SOTA’ as a free-standing adjective. You should be able to append the complete benchmark coordinates and explain which nearby deployment claim still remains untested. Include uncertainty and cost in that sentence.",
  },
  {
    slug: "safety-and-interpretability",
    sections: [
      {
        id: "threat-models",
        title: "Safety begins with actors, assets, and failure paths",
        paragraphs: [
          "A threat model names what must be protected, who can act, which capabilities they have, and how failure can occur. Accidental error, misuse, prompt injection, data poisoning, privacy leakage, reward hacking, and autonomous side effects are different threats. A benchmark for harmless answers does not test shell permissions. An interpretability plot does not enforce an access boundary. Layer defenses according to the actual system.",
          "Tool-using models need least privilege, authenticated calls, typed arguments, output validation, rate limits, and audit logs. Separate planning from execution for high-impact actions. Use sandboxes and reversible canaries. Assume external text can contain adversarial instructions. Security controls should remain effective when the model is confused or persuaded; the model cannot be the only guard around its own permissions.",
        ],
        sourceIds: ["owasp-prompt-injection", "owasp-excessive-agency", "nist-genai-profile", "reward-tampering"],
      },
      {
        id: "interpretability-evidence",
        title: "Interpretability moves from correlation toward intervention",
        paragraphs: [
          "Feature visualization, probes, attention maps, and sparse autoencoders can suggest hypotheses about internal representation. A semantic label is an interpretation proposed by the researcher. Reconstruction quality and activating examples do not prove that a feature is monosemantic or causally used. Distributed features, superposition, and basis dependence complicate the picture.",
          "Causal evidence intervenes on components and predicts behavioral change. Ablate a head, patch an activation from another run, steer a direction, or edit a circuit, then use matched controls. Measure specificity and off-target effects. Mechanistic explanations should predict behavior on new inputs, not merely retell observed activations. Even a successful local circuit may not explain the whole model or remain stable after fine-tuning.",
        ],
        sourceIds: ["sae-monosemanticity", "induction-heads", "welch-ai"],
      },
      {
        id: "oversight-and-goodhart",
        title: "Optimization searches the difference between proxy and goal",
        paragraphs: [
          "Goodhart-style failure appears when a measurement becomes an optimization target and ceases to track the intended outcome. A policy can exploit reward bugs, blind spots, or access to the evaluator. Penalizing one discovered exploit adds a test but does not prove equivalence between reward and goal. Stronger optimization can discover less obvious variants.",
          "Scalable oversight uses decomposition, debate, process supervision, weak-to-strong training, formal checks, or model assistance to extend human judgment. Each method assumes something about task decomposition, honesty, verifier coverage, or supervisor signal. Independent channels and uncertainty help. No universal critic has been shown to verify every open-ended superhuman action. Keep claims proportional to the domain where the check is valid. Record which failures the protocol cannot observe.",
        ],
        sourceIds: ["process-supervision", "weak-to-strong", "reward-tampering"],
      },
    ],
    practice: [
      { level: "medium", prompt: "A content filter blocks known forbidden phrases. Explain one Goodhart-style failure.", steps: ["The metric checks surface phrases rather than harmful meaning.", "Optimization can paraphrase the content to pass the filter.", "Evaluate semantic intent and adversarial variants, while limiting downstream capabilities."], answer: "Patching the phrase list helps against known cases but does not align the proxy with the full safety goal." },
      { level: "hard", prompt: "A sparse autoencoder feature activates on legal text. Design the evidence ladder before calling it a ‘law feature.’", steps: ["Inspect diverse positive and negative activations and reconstruction error.", "Test stability across datasets, layers, seeds, and nearby features.", "Intervene on the feature and predict specific legal and nonlegal behavioral changes."], answer: "The label remains a hypothesis until causal and specificity tests succeed. Even then, report the tested scope." },
      { level: "challenging", prompt: "Threat-model an autonomous research agent that can run experiments and buy supplies.", steps: ["List financial, physical, data, credential, and dual-use assets plus possible attackers.", "Separate proposal, simulation, purchase, and execution permissions with independent limits.", "Require provenance, budget caps, hazardous-material rules, human approval, logging, and emergency shutdown."], answer: "The system's research skill does not grant authority. Safety comes from constrained interfaces and verified procedures around the model." },
    ],
    transferTask: "Choose one safety claim and build an assurance case with claim, evidence, assumptions, counterevidence, operational controls, and expiry. Mark whether each item prevents failure, detects it, limits impact, or only explains it after the fact.",
    calibration: "You should be able to reject both fatalism and easy reassurance. Specific formal checks can be powerful, while open-ended oversight and complete mechanistic understanding remain unsolved. Name the threat model and evidence boundary each time.",
  },
  {
    slug: "research-frontiers",
    sections: [
      {
        id: "generalization-and-continual-learning",
        title: "One frontier asks models to keep learning without erasing",
        paragraphs: [
          "Continual learning studies sequential tasks or distributions where old data may be unavailable. Catastrophic forgetting occurs when updates for new experience damage old capabilities. Rehearsal keeps representative data. Regularization protects parameters estimated to matter. Modular and adapter methods isolate changes. Dynamic architectures add capacity. Each trades memory, privacy, transfer, and interference differently.",
          "A frontier lab may claim better human-like adaptation without disclosing a method. Treat that as a research direction, not a result. Demand a stream of tasks, online data budget, held-out transfer, forgetting curves, contamination controls, and safety under updates. A system that adapts in deployment also creates privacy and poisoning risks because new experience changes future behavior.",
        ],
        sourceIds: ["ewc", "weak-to-strong", "ssi-statement"],
      },
      {
        id: "causal-symbolic-open-ended",
        title: "Causal, symbolic, and open-ended methods attack different limits",
        paragraphs: [
          "Causal representation learning seeks variables and relations stable under interventions. Identifiability requires assumptions about environments, mechanisms, or supervision. Neurosymbolic systems combine learned perception with logic, programs, or proof systems, gaining exact operations where formalization is available. They also inherit brittle symbol extraction and incomplete specifications.",
          "Open-ended learning generates new environments, goals, or challenges rather than optimizing one fixed task. Novelty can escape local objectives but can also produce endless trivia. Quality-diversity methods preserve varied solutions. POET-like systems co-evolve problems and agents. Evaluate whether generated challenges transfer to human-valued capabilities and whether complexity reflects meaningful structure rather than evaluator blind spots.",
        ],
        sourceIds: ["causal-rep", "deepproblog", "poet"],
      },
      {
        id: "active-science",
        title: "AI for science closes a loop with expensive reality",
        paragraphs: [
          "Active learning chooses which label or experiment would reduce uncertainty most. Bayesian optimization uses a surrogate model and acquisition function to select costly evaluations. Autonomous laboratories add robotics, instruments, scheduling, and measurement pipelines. Positive and negative experiments can create data unavailable in papers. Delays, batch constraints, apparatus drift, and failed measurements make the environment unlike a clean game.",
          "Current frontier companies propose using physical laboratories as verifiers. Public ambition is not evidence of discovery. Require protocols, instrument calibration, preregistered endpoints, negative controls, candidate identities, and external replication. A high experiment count does not establish scientific importance. The strongest opportunity may be disciplined generation of trustworthy negative results and targeted interventions, not a free-form ‘AI scientist’ label. Track failed runs and apparatus changes because selective reporting can make an automated loop look more reliable than it is.",
        ],
        sourceIds: ["periodic-labs-statement", "gnome", "mattergen"],
      },
    ],
    practice: [
      { level: "medium", prompt: "EWC adds a penalty weighted by parameter importance. Explain the intended effect.", steps: ["Estimate which old-task parameters strongly affect the old solution.", "Penalize moving those parameters during new-task training.", "Allow less important directions to adapt more freely."], answer: "EWC reduces some forgetting under its importance approximation. It does not guarantee no forgetting or identify a universally modular representation." },
      { level: "hard", prompt: "A causal representation is claimed because one latent coordinate correlates with object mass. Design the missing tests.", steps: ["Intervene on mass while controlling appearance and context.", "Test whether the coordinate and predicted dynamics change consistently across environments.", "Check alternative causes, identifiability assumptions, and downstream control."], answer: "Correlation supplies a candidate variable. Intervention stability and assumption audits are needed for a causal claim." },
      { level: "challenging", prompt: "Design an autonomous-lab claim gate for a new catalyst.", steps: ["Predeclare target properties, baselines, measurement uncertainty, and stopping rules.", "Log every proposal, failed synthesis, protocol deviation, and instrument calibration.", "Require blinded replication in an independent laboratory and compare full cost and hit rate."], answer: "A discovery claim survives only if the material, measurement, and selection process reproduce outside the closed automation loop." },
    ],
    transferTask: "Choose one frontier program and write four columns: public artifact, adjacent evidence, reasonable inference, and missing evidence. End with three experiments that would change your confidence. Do not fill disclosure gaps with reputation or funding.",
    calibration: "You should be able to discuss SSI, world models, autonomous science, continual learning, and neurosymbolic work as competing research bets with explicit missing evidence, not as secret achievements. For every bet, state the decisive, independently replicated public experiment that could lower your confidence today.",
  },
  {
    slug: "research-practicum",
    sections: [
      {
        id: "reproduction-contract",
        title: "Reproduce the measurement before extending the method",
        paragraphs: [
          "A reproduction begins with an exact claim: task, dataset version, preprocessing, model, baseline, metric, compute, and uncertainty. Obtain or reconstruct the official split and evaluation. Pin dependencies and seeds. Record hardware and runtime. Run the baseline before the new method. If the reported score does not reproduce, investigate the apparatus rather than building an extension on a moving target.",
          "Reproduction is calibration. It reveals hidden choices, variance, and implementation sensitivity. A failed reproduction is useful when documented, but it does not automatically refute the paper. Compare code versions, data access, compute, and ambiguous instructions. Contact authors with a minimal case when appropriate. Preserve negative results and exact commands so the next researcher does not repeat the same uncertainty.",
        ],
        sourceIds: ["hamming-art", "bishop-prml", "helm"],
      },
      {
        id: "literature-and-overlap",
        title: "Trace a limitation forward until the framing stops being new",
        paragraphs: [
          "Start from a documented limitation in the target literature. Follow papers that cite it, use later terminology, or attack an adjacent assumption. Read methods, ablations, limitations, and appendices, not only abstracts. Search patents and code when the novelty claim has practical value. Build an overlap table with task, mechanism, data, baseline, metric, and claimed contribution.",
          "An idea can be new in wording and occupied in substance. Conversely, nearby work may leave a specific regime open. Separate confirmed prior art from plausible overlap that needs checking. State novelty at the narrowest defensible level: a new mechanism, combination, analysis, dataset, theorem, or empirical finding. Do not promise publication novelty before a serious audit.",
        ],
        sourceIds: ["hamming-art", "make-it-stick", "helm"],
      },
      {
        id: "falsification-and-kill-gates",
        title: "Design the experiment that can end the favorite story",
        paragraphs: [
          "A method claim needs strong baselines, matched compute, ablations, multiple seeds, and relevant shifts. Write the causal story: component X should change mechanism Y, producing outcome Z under regime R. Then design a control that removes X, a measurement of Y, and a counterexample where the story predicts failure. If only Z is measured, another mechanism may explain the gain.",
          "Predeclare kill criteria and scope. A method may be slower, less stable, or worse outside one benchmark. Confidence intervals and practical effect sizes matter more than a lucky point estimate. Security, privacy, and data availability are feasibility gates separate from novelty. A killed idea is progress if the test was fair and the negative result narrows the search space.",
        ],
        sourceIds: ["hamming-art", "murphy-pml", "helm"],
      },
    ],
    practice: [
      { level: "medium", prompt: "A method reports 82.1 versus 81.8 for a baseline with no variance. Write the minimum next experiment.", steps: ["Reproduce both under the same code path and compute budget.", "Run enough seeds to estimate paired uncertainty.", "Predefine a practically meaningful effect size and untouched test set."], answer: "The published point difference is not yet evidence of a reliable improvement." },
      { level: "hard", prompt: "Your ablation removes a module and also cuts compute by 30 percent. Why is the causal conclusion ambiguous?", steps: ["Performance may fall because the mechanism is absent.", "It may fall because the ablated model received less compute or capacity.", "Create a compute-matched control and a parameter-matched control where possible."], answer: "An ablation should isolate the claimed mechanism. Confounded resource changes weaken the conclusion." },
      { level: "challenging", prompt: "Turn ‘continual world models improve robot generalization’ into a bounded thesis.", steps: ["Specify embodiment, task stream, update budget, world-model role, baseline, and shift.", "Measure forward transfer, forgetting, closed-loop success, uncertainty, and safety.", "Kill the thesis if a replay baseline matches gains or updates damage protected tasks beyond the threshold."], answer: "The bounded claim is smaller but testable. It separates continual learning, modeling, and control rather than hiding all three inside one slogan." },
    ],
    transferTask: "Write a one-page preregistration for a research idea: exact claim, prior-art boundary, data, baselines, compute, primary metric, uncertainty, ablations, adversarial cases, safety constraints, and kill criteria. Ask a skeptical peer to find three alternative explanations before implementation.",
    calibration: "The practicum is complete only when you can report an inconclusive or negative result without moving the goalposts. Research taste chooses important questions; research discipline makes the answer survive contact with evidence.",
  },
];

export const chapterBySlug = new Map(chapters.map((chapter) => [chapter.slug, chapter]));
