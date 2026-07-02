// ─────────────────────────────────────────────────────────────────────────
// Branchscaipe — data model + branching/merge/context logic
//
// Model:
//   branch   = { id, name, autoNamed, parentId, branchPointId, branchSeed,
//                createdAt, messages[], _temporary? }
//   message  = user/assistant: { id, role, text, topic?, starred?, fromMerge? }
//            = merge divider:  { id, role:"merge", source, sourceId, scope, ts }
// ─────────────────────────────────────────────────────────────────────────

let _n = 1;
export const uid = (p) => `${p || "id"}-${Date.now().toString(36)}-${(_n++).toString(36)}`;

// ── Lineage & context ──────────────────────────────────────────────────────
export function lineage(branches, id) {
  const out = [];
  let cur = branches[id];
  while (cur) { out.unshift(cur); cur = cur.parentId ? branches[cur.parentId] : null; }
  return out;
}

export function contextMessages(branches, id) {
  const chain = lineage(branches, id);
  let acc = [];
  chain.forEach((b, i) => {
    const child = chain[i + 1];
    if (child) {
      const cut = b.messages.findIndex((m) => m.id === child.branchPointId);
      acc = acc.concat(cut === -1 ? b.messages : b.messages.slice(0, cut + 1));
    } else {
      acc = acc.concat(b.messages);
    }
  });
  return acc.filter((m) => m.role === "user" || m.role === "assistant");
}

// ── Auto-naming ─────────────────────────────────────────────────────────────
const STOP_WORDS = new Set(
  "the a an of to for and or but is are be how what why when where can could would should do does this that these those your you i we it on in with from about into give me show tell explain describe compare discuss versus vs please just also".split(" ")
);

function titleCase(s) { return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase(); }

export function autoName(seed) {
  if (!seed) return "New chat";
  const words = seed.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const salient = words.filter((w) => !STOP_WORDS.has(w) && w.length > 2);
  if (!salient.length) { const f = words.find(w => w.length > 1); return f ? titleCase(f) : "New chat"; }
  return salient.sort((a, b) => b.length - a.length).slice(0, 2).map(titleCase).join(" ").slice(0, 32);
}

// ── Relative time ──────────────────────────────────────────────────────────
export function relTime(ts) {
  const s = Math.max(1, Math.round((Date.now() - ts) / 1000));
  if (s < 45) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}

// ── Context-aware, natural reply generation ────────────────────────────────
//
// Strategy:
//   1. Extract a meaningful subject from the user's text
//   2. Detect intent (question, how-to, comparison, help, opinion, example, general)
//   3. Pick from a pool of templates that reference the subject
//   4. Vary depth based on conversation turn count
//   5. Weave in branch/merge context when relevant

function pick(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// Slot the subject into a template string or function
function fill(template, subject) {
  if (typeof template === "function") return template(subject);
  return template.replace(/\{s\}/g, subject);
}

// Extract the 1-3 most meaningful words from the user's message
function extractSubject(text) {
  const clean = text.replace(/[?!.,;:'"]/g, " ").split(/\s+/).filter(Boolean);
  const meaningful = clean.filter(w => w.length > 3 && !STOP_WORDS.has(w.toLowerCase()));
  if (meaningful.length === 0) return clean[0] || "this";
  return meaningful.slice(0, 2).join(" ").toLowerCase();
}

// ── Response pools by intent ───────────────────────────────────────────────

const POOLS = {
  comparison: [
    (s) => `The choice between these approaches to ${s} usually comes down to three things: how often your requirements change, how much cognitive overhead is acceptable, and what happens when things break.\n\nThe conventional pick optimises for familiarity. The less common alternative trades legibility for composability. Which matters more in your situation?`,
    (s) => `Both options here are solving the same underlying problem — they just make different bets about what will hurt you later.\n\nFor ${s}, I'd ask: what does maintenance look like in six months? The answer usually points clearly at one of them.`,
    (s) => `These aren't as different as they appear on the surface. The real distinction with ${s} is about where complexity lives: one front-loads it, the other defers it.\n\nFront-loading usually wins if requirements are stable. Deferring wins if they're likely to shift. Which is your situation?`,
    (s) => `Comparisons like this for ${s} tend to be context-dependent rather than universal. The question worth asking first: what does the failure mode look like for each option? That framing usually makes the answer obvious faster than any feature comparison.`,
    (s) => `Both are reasonable — which is exactly why the decision feels hard. For ${s}, I'd weight: team familiarity, how well each one tests, and what "done" looks like. Pick the one that loses the fewest points across all three.`,
  ],

  help: [
    (s) => `Issues with ${s} typically trace back to one of three sources: an assumption baked in too early, a side effect that's hard to trace because it crosses boundaries, or something that works in isolation but breaks in composition.\n\nWalk me through what you expected to happen versus what's actually happening — that's usually enough to narrow it down.`,
    (s) => `When ${s} misbehaves, the most useful first move is to separate observation from explanation. What exactly is happening — not why you think it's happening, just the observed behaviour? That removes a layer of assumption and makes the real problem easier to spot.`,
    (s) => `Problems like this with ${s} usually have a simpler root cause than they look like from the outside. The noise makes it seem complex. Start by finding the smallest reproduction — if you can make it fail consistently with the fewest moving parts, the fix becomes obvious.`,
    (s) => `Debugging ${s} is often about eliminating possibilities systematically rather than guessing. What changed most recently before this started happening? That's the highest-probability culprit.`,
    (s) => `The tricky part with ${s} errors is that the symptom and the cause are rarely in the same place. I'd work backwards from the failure: what's the last thing that definitely works correctly? Then reason forward from there.`,
  ],

  howto: [
    (s) => `The key to ${s} is working backwards from the outcome rather than forwards from the tools. Start by being precise about what "done" looks like — a clear definition of the goal makes the steps fall into place.\n\nWith that said, the path usually looks like: establish a baseline, then iterate in small verifiable steps. What's your starting point?`,
    (s) => `For ${s}, there's a short path and a correct path — and they're often different. The short path gets you there faster but with hidden assumptions. The correct path takes slightly longer but stays stable under pressure.\n\nGiven the context, which matters more here?`,
    (s) => `The mental model that makes ${s} tractable: treat it as a series of decisions, not a single task. Identify the most consequential decision first, resolve it, then move to the next. This stops the whole thing from feeling overwhelming.`,
    (s) => `${s.charAt(0).toUpperCase() + s.slice(1)} has a natural sequence that's easy to skip when you're in a hurry. The first phase is almost always about understanding the constraints — not the implementation. Get the constraints clear, and the implementation tends to write itself.`,
    (s) => `Start with the simplest possible version of ${s} that could work. Make it work first, then make it right, then make it fast. Trying to do all three at once is where most of the friction comes from.`,
  ],

  explain: [
    (s) => `At its core, ${s} is about reducing a particular kind of uncertainty. Once you see what uncertainty it's designed to eliminate, the mechanics start to make intuitive sense rather than feeling like arbitrary rules.`,
    (s) => `The clearest way to think about ${s}: what problem existed before it, and what would go wrong without it? That framing makes the design decisions obvious — every piece of it is a direct response to something that used to break.`,
    (s) => `${s.charAt(0).toUpperCase() + s.slice(1)} is one of those concepts where the surface behaviour is deceptive. What you observe doesn't look like what's actually happening underneath. The underlying mechanism is simpler than it seems — want me to work through it from first principles?`,
    (s) => `The thing most explanations of ${s} get wrong is starting with how it works rather than why it exists. The "why" gives you the mental model. The "how" is just implementation detail that makes sense once the model clicks.`,
    (s) => `${s.charAt(0).toUpperCase() + s.slice(1)}: the short version is that it solves one specific problem very well, and creates a different set of problems if you use it outside that context. Understanding the intended use case is the key to understanding everything else about it.`,
  ],

  example: [
    (s) => `Here's a concrete way to see ${s} in action: imagine a system where two components need to stay in sync without either one knowing about the other directly. The pattern that works is introducing a single source of truth between them — both read from it, neither writes to the other. When state changes, the update propagates automatically.\n\nDoes the shape of your problem match that?`,
    (s) => `For ${s}, a real-world analogy that holds up well: think of it like a contract between two parties. Each side agrees to a specific interface. What's behind that interface can change freely — neither side needs to know. The moment you violate the contract is the moment complexity leaks.\n\nHow does that map to what you're building?`,
    (s) => `A minimal working example of ${s} usually has just three parts: input, transformation, and output. The transformation is where all the interesting decisions live. Everything else is just plumbing.\n\nWant me to trace through a specific scenario, or is the general pattern what you needed?`,
    (s) => `The cleanest illustration of ${s} I know: take two implementations that both produce the right output. One is readable but fragile. One is harder to follow but handles edge cases gracefully. The difference is almost always in how they handle the case that wasn't in the original requirements. That case will always arrive.`,
    (s) => `Let me give you a concrete example for ${s} and then flag where the assumption in that example is most likely to break for your specific case. The gap between the example and the real case is usually where the interesting problem lives.`,
  ],

  opinion: [
    (s) => `For ${s}, "best practice" always has an asterisk. Best for which team, at which scale, with which rate of change in requirements?\n\nIf I had to weight it for a typical situation: prioritise the option that's easiest to test independently, easiest to change without touching adjacent code, and clearest about its own failure modes.`,
    (s) => `My honest take on ${s}: the conventional recommendation is right for the common case, but the common case might not be yours. Before taking any advice — including mine — check what assumptions it's making about scale, team size, and how often this code changes.`,
    (s) => `The recommendation for ${s} depends on which failure you're most afraid of. If you're afraid of moving too slow, bias toward flexibility. If you're afraid of breaking things, bias toward explicitness. Those two goals are in genuine tension — the right answer picks a side rather than trying to optimise both.`,
    (s) => `What I'd actually do with ${s}: resist the urge to over-engineer it early. Start with the simplest approach, instrument it well so you can see where it struggles, and wait for reality to tell you what needs to change. Premature architecture creates more problems than it solves.`,
    (s) => `On ${s} — the advice that ages best is usually "understand the trade-off, then make it deliberately." Most problems come not from choosing the wrong option but from choosing without knowing what you were trading away.`,
  ],

  general: [
    (s) => `What you're hitting with ${s} is one of those things where the surface question and the actual question are slightly different. The surface question has an obvious answer. The actual question — what outcome are you trying to reach — has a more nuanced one.\n\nWhat does success look like here?`,
    (s) => `The mental model I'd bring to ${s}: separate the "what" from the "how." Get precise on what you want to achieve before thinking about implementation at all. Vague goals produce vague solutions, and the wrong solution built well is still the wrong solution.`,
    (s) => `With ${s}, it's worth asking what would tell you that you're wrong. That question sharpens the thinking faster than asking what would tell you that you're right. It forces you to name the assumptions you're carrying.`,
    (s) => `${s.charAt(0).toUpperCase() + s.slice(1)} is one of those areas where the first answer is usually right for the obvious case and wrong for the real case. The obvious case is straightforward. The real case has constraints, history, and context that the obvious case doesn't account for.\n\nWhat's the specific constraint that makes this tricky?`,
    (s) => `Let me give you the direct answer for ${s} first, then flag where that answer is most likely to break down for your situation specifically. The general answer is usually easy. The edge cases are where the interesting work lives.`,
    (s) => `The pattern I notice with ${s} is that the difficulty isn't in the core thing — it's in how it interacts with everything adjacent. Isolating it from those interactions, even mentally, usually makes the solution clear. What's the clearest version of the problem if you strip away the context?`,
  ],

  retry: [
    (s) => `Let me approach ${s} from a different angle. The previous framing might have been too abstract — here's the same idea grounded more concretely.`,
    (s) => `Taking another run at ${s}: the version I gave you was optimised for the general case. Your situation likely has specifics that change the answer. What's the part that felt off?`,
    (s) => `Different take on ${s}. Rather than working forward from principles, let's work backwards from what you're actually trying to accomplish.`,
    (s) => `Let me try ${s} again with a cleaner framing. I'll be more direct this time about where the genuine trade-offs are.`,
  ],

  merged: [
    (s) => `I've got both threads here now. The context from the merged branch is useful — it gives a fuller picture of where this started.\n\nBuilding on that: with ${s}, the most productive next step is probably to...`,
    (s) => `Bringing the merged context in alongside what we've been working through — the through-line I see is that ${s} keeps showing up as the crux. That's probably worth addressing directly rather than talking around it.\n\nWhat's the specific aspect you want to focus on?`,
  ],
};

// Turn-count variations: later turns get shorter, punchier responses sometimes
const SHORT_FOLLOWUPS = [
  "What's the specific part that's still unclear?",
  "Does that framing match what you were asking, or did I miss the mark?",
  "What would make this concrete for your situation?",
  "Is there a specific constraint I should factor in here?",
  "Which part of this are you least confident about?",
];

export function generateReply({ branch, userText, contextTopics, merged, retry }) {
  const q = (userText || "").trim();
  const qLow = q.toLowerCase();

  // Get conversation turn count for depth calibration
  const allMsgs = branch.messages.filter(m => m.role === "user" || m.role === "assistant");
  const turnCount = allMsgs.filter(m => m.role === "user").length;

  // Extract meaningful subject for natural response interpolation
  const subject = extractSubject(q);

  // ── Merged context ────────────────────────────────────────────────
  if (merged) {
    const tpl = pick(POOLS.merged);
    return fill(tpl, subject);
  }

  // ── Retry: different angle ────────────────────────────────────────
  if (retry) {
    const tpl = pick(POOLS.retry);
    return fill(tpl, subject);
  }

  // ── Detect intent ─────────────────────────────────────────────────
  let pool;
  if (/\bvs\b|versus|\bdiff(er|erence)|compar(e|ing|ison)\b/.test(qLow)) {
    pool = POOLS.comparison;
  } else if (/\bhelp\b|stuck|issue|problem|error|bug|wrong|not working|broken|fail/.test(qLow)) {
    pool = POOLS.help;
  } else if (/\bhow (to|do|can|should|would|does)\b/.test(qLow)) {
    pool = POOLS.howto;
  } else if (/\bexplain\b|what is|what are|what does|describe|clarify|mean\b/.test(qLow)) {
    pool = POOLS.explain;
  } else if (/\bexample|show me|give me (an?|some)|sample|demo\b/.test(qLow)) {
    pool = POOLS.example;
  } else if (/\bshould i\b|recommend|best (way|approach|practice)|advice|suggest/.test(qLow)) {
    pool = POOLS.opinion;
  } else {
    pool = POOLS.general;
  }

  let reply = fill(pick(pool), subject);

  // ── Late-conversation: occasionally append a short focused follow-up ──
  if (turnCount >= 3 && Math.random() > 0.55) {
    reply += "\n\n" + pick(SHORT_FOLLOWUPS);
  }

  // ── Branch context prefix: weave in parent context ─────────────────
  if (branch.parentId && contextTopics && contextTopics.length > 0 && turnCount <= 1) {
    const prev = contextTopics[contextTopics.length - 1];
    if (prev) {
      reply = `Building on "${prev}" — ${reply.charAt(0).toLowerCase() + reply.slice(1)}`;
    }
  }

  return reply;
}
