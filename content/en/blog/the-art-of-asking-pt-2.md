---
title: The Art of Asking Pt. 2
date: 2026-04-22
description: Complex tickets, fading shame, and why asking AI to explain a problem is the same skill as asking it to solve one.
contactHeading: "Want to level up your team's AI workflow?"
---

A few months ago I wrote [The Art of Asking](/blog/the-art-of-asking) — about how developers who get the most out of agents don't specify code, they define intent. That post was about how you talk to agents when you want them to do something.

This one is about talking to them when you're trying to understand something.

## The question you didn't ask

Every developer I've worked with has a memory of a ticket they didn't want to open. A tangle of acceptance criteria, three comment threads pointing different directions, a Figma link dated 2021, and a description that starts with "As discussed in the refinement meeting." You stare at it for an hour and accomplish nothing. You don't want to ask in the channel because it's Tuesday and you've already asked two things this week. So you close the ticket and pick something easier.

That reflex isn't about skill. It's about shame.

## The cost of asking used to be real

There was a social ledger. Ask too many questions in standup and you looked junior. Ask the senior dev in DMs and you felt like you were taking their time. Post in #dev-help and wait, pretending to work on something else while you refreshed Slack. If you couldn't figure it out within the unwritten window — maybe a day, maybe less — you owed somebody coffee.

Most of us internalized that. We'd Google under our desks, scroll through Stack Overflow answers from 2014, and try three things that didn't work before admitting defeat.

That cost is gone.

## Asking to understand, not to do

The original post was about a shift in how you prompt agents to build. From specification ("write a React component that does X") to solution ("fix the login flow") to intent ("do you have questions for me?"). Different modes, same underlying skill — defining what matters.

The second shift is subtler. It's asking agents to help you *think*, not just build. Before you ever write a prompt that asks for code, you can spend twenty minutes asking for clarity.

"Summarize this ticket in two sentences. What's the actual user problem?"
"List every unstated assumption in this description."
"What would you need to know before starting this?"
"Break this into the smallest pieces that could be shipped independently."
"What questions would a senior engineer ask about this before touching it?"

None of those produce code. They produce understanding. The code follows.

## A Jira ticket, in practice

Last week I looked at a ticket with five acceptance criteria, three of which referenced internal docs I hadn't read. The old instinct would be to read all the docs first, assemble a mental model over two hours, then start. The new instinct is different.

I pasted the ticket into [Claude](https://claude.ai) and asked:

- What's this ticket actually asking for, in one sentence?
- What's the smallest change that would satisfy at least one of the acceptance criteria?
- Which criteria depend on each other, and which are independent?
- What assumptions is the author making that might not hold?
- What would you ask the ticket author if you could?

Five minutes later I had a split: three subtasks that could ship independently, two questions for the product owner, and a starting point that didn't require reading anything else first. The ticket wasn't simpler. I just knew how to start.

The agent didn't solve the problem. It helped me see the shape of it.

## The question before the question

This matters more for juniors than seniors, but not the way you'd expect. Juniors stop losing days to "I don't know where to begin" — the hidden tax of being new. Seniors get something different: permission to not know. The unfamiliar framework, the part of the codebase they haven't touched in two years, the domain they've never worked in — they can ask without looking junior, because the agent doesn't keep score.

Both ends of the seniority curve get the same unlock: the friction of admitting "I don't understand this yet" drops to zero. That's not a productivity bump. It's a cultural shift. The reason most complex tasks feel paralyzing isn't that they're actually complex — it's that the cost of starting stupidly is too high. When that cost goes to zero, you start.

Part 1 said the hard part was defining what matters. That's still true. But before you can define what matters, you often need to understand what's being asked — and historically, that step carried a social cost most people weren't willing to pay out loud. Now it doesn't. You can ask the dumb question as many times as it takes, in any phrasing, without judgment, and iterate until you actually understand. That step used to be private, shameful, and slow. Now it's fast and costs nothing.

The answer was always 42. The question was always the hard part. What changed is that figuring out the question got cheaper.
