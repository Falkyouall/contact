---
title: The Art of Asking
date: 2026-02-21
description: The agentic trap curve, Deep Thought, and why knowing what to ask for matters more than knowing how to build it.
contactHeading: "Want to level up your team's AI workflow?"
---

In [The Hitchhiker's Guide to the Galaxy](https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy), a civilization builds a supercomputer called Deep Thought to answer the ultimate question of life, the universe, and everything. Deep Thought computes for 7.5 million years and returns the answer: 42. The problem, of course, is that nobody knows what the actual question was. The answer is perfect. The question was never defined.

I keep thinking about that scene when I watch how developers interact with AI agents.

## The agentic trap

[Peter Steinberger](https://steipete.me/posts/just-talk-to-it) described something on the [Lex Fridman podcast](https://lexfridman.com/peter-steinberger/) that he calls the agentic trap. It's a curve. On the left side, you start with simple prompts. "Please fix this." Then you discover how powerful agents are and you go deep. Eight parallel agents, complex orchestration, multi-checkouts, chaining agents together, custom sub-agent workflows, a library of 18 different slash commands. You're organized. You're sophisticated. You're in full control.

And then, if you keep going, you arrive somewhere unexpected. Back at short prompts. "Hey, look at these files and then do these changes." The elite level, as Peter puts it, is zen.

That curve is interesting not because of the prompts themselves, but because of what changes between the left side and the right side. The prompts look the same. The person behind them doesn't.

## What developers ask for

I've been paying attention to how developers around me talk to agents. Not what the agents produce — what the developers ask for. And there's a pattern.

Early on, people ask for implementations. "Write me a React component that does X with Y and Z." The prompt is a specification. Every detail spelled out, because the developer knows exactly what the code should look like and is essentially dictating it through natural language. The agent is a typist.

Then they start asking for solutions. "The login flow is broken, the session expires too early, fix it." Less prescription, more intent. The agent gets room to investigate, decide on an approach, and execute.

But the people who get the most out of agents ask for something different entirely. They ask questions. "Do you have any questions for me?" Peter mentioned this in the interview — he asks the agent if it has questions, scans over them, and often the answer is just "read more code to answer your own questions." He's not directing. He's having a conversation with something that sees the codebase from scratch every single session.

The shift isn't in prompt complexity. It's in what the developer considers their job. Are you specifying code, solving problems, or defining intent?

## Deep Thought's actual problem

The joke in Hitchhiker's Guide works because it's absurd. But the underlying point is sharp. Deep Thought didn't fail. It delivered exactly what was asked. The civilization failed because they spent millions of years waiting for an answer to a question they never bothered to formulate clearly.

There's a version of this playing out in software development right now. Agents are staggeringly capable. [Claude](https://claude.ai), [Codex](https://openai.com/codex/), whatever you're using — they can navigate codebases, write tests, refactor modules, ship features. The bottleneck isn't the machine's ability to produce output. The bottleneck is the human's ability to define what matters.

And defining what matters is not a prompting skill. It's an engineering skill. It's a thinking skill.

## The background you actually need

Peter made an observation about experienced programmers that stuck with me. He said that for some world-class programmers, their expertise is almost a burden in their ability to empathize with the system. They know exactly how the code should look, down to variable names and edge case handling. That knowledge makes it hard to let go and let an agent approach the problem differently.

But there's a flip side. If you don't have enough background, you don't know what to ask for. You might get working code that solves the wrong problem, or solves it in a way that falls apart at scale. The agent won't tell you your architecture is wrong if it doesn't know your constraints. It doesn't know what you're building next month.

So what do you actually need to know in the age of AI-assisted development? I think it's this: you need to understand systems well enough to ask the right question, but loosely enough to not dictate the answer.

That means understanding how a web application fits together — what the frontend does, what the backend does, where state lives, how data flows. Not necessarily how to hand-write every piece of it. Understanding why you'd pick PostgreSQL over Firebase for a given use case, even if you've never written a raw SQL migration yourself. Understanding what WCAG compliance means for your users, even if the agent generates the accessible markup.

Architecture, tradeoffs, user needs, constraints. The things that don't change when the implementation tool changes.

## 42

Deep Thought eventually revealed that the problem wasn't computing the answer — it was that a much greater computer would be needed to figure out the actual question. That computer turned out to be the Earth itself. The question required living in it. Experiencing it. Not computing it.

There's something honest in that. The right question doesn't come from a system prompt or a carefully engineered chain of agents. It comes from knowing your domain. From having sat in a meeting where the product owner explained what users actually struggle with. From having debugged a production outage at 2 AM and understanding, viscerally, what matters and what doesn't. From having built three versions of something and knowing which decisions you'd make differently.

Peter talks about mourning the craft of programming, and I get that. The flow state of cranking out code and finding a beautiful solution — that was real. But he also reframes it: you're not just a programmer. You're a builder. And building was never just typing.

The developers who thrive in the agentic age won't be the ones who write the most detailed prompts or orchestrate the most complex agent pipelines. They'll be the ones who know what to build and why. The ones who can look at a codebase, an agent's output, a set of requirements, and say — that's not the right question. Let me rephrase.

The answer was always 42. The hard part was always the question.
