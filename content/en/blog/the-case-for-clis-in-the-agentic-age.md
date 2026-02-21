---
title: The Case for CLIs in the Agentic Age
date: 2026-02-21
description: AI agents are better at Unix commands than at clicking buttons. That has consequences for how we build tools.
contactHeading: "Need help building CLI-first tools?"
---

There's a quiet shift happening in how developer tools get built. For the past decade, the trajectory was clear: wrap everything in a GUI, add a dashboard, maybe a web interface. CLIs were the thing you grudgingly maintained for CI pipelines and power users. That's reversing now, and the reason is surprisingly mechanical.

AI agents are really good at using command-line tools. They're bad at navigating graphical interfaces. And as more development work gets delegated to agents, the tools that survive are the ones agents can actually operate.

## Agents think in text

Large language models process text. They produce text. When an agent needs to interact with a system, the most natural interface is one where both input and output are text. That's a CLI.

This isn't a theoretical argument. [Vercel's engineering team](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools) wrote about replacing most of their custom agent tooling with a filesystem tool and a bash tool. Their results were concrete: execution time dropped from 274.8 seconds to 77.4 seconds (3.5x faster), token usage fell from roughly 102k to 61k tokens (37% fewer), the number of steps went from about 12 to 7, and their success rate went from 80% to 100%. They found that `grep`, `find`, `cat`, and `ls` were enough for agents to navigate complex data structures that previously required purpose-built retrieval systems.

Their takeaway was blunt: "Grep is 50 years old and still does exactly what we need. We were building custom tools for what Unix already solves."

[Peter Steinberger](https://steipete.me/posts/just-talk-to-it) made a similar observation about his own workflow. He noted that he can just refer to a CLI by name in his agent instructions. The agent will try something, the CLI will present the help menu, the context now has full info on how it works, and from that point on everything just works. No schema definitions, no tool registration overhead.

## The context window tax

Here's where it gets practical. Every tool an agent has access to costs tokens. The tool's description, its parameters, its schema — all of that gets loaded into the context window before the agent has even started working.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io) servers are a good example of this tradeoff. They provide structured, typed interfaces for agents to interact with external services. That's useful. But it comes at a cost. The [GitHub MCP server](https://github.com/github/github-mcp-server), for instance, consumes tens of thousands of tokens just by being registered. One developer reported going from 34k to 80k tokens in [Claude Code](https://claude.ai/download) just by adding the GitHub MCP. Another analysis found MCP tools alone consuming 16.3% of the available context window — before a single user message.

Peter Steinberger put it plainly: "I don't have to pay a price for any tools, unlike MCPs which are a constant cost and garbage in my context. Use GitHub's MCP and see 23k tokens gone. Or use the `gh` cli which has basically the same feature set, models already know how to use it, and pay zero context tax."

The [`gh` CLI](https://cli.github.com) and the GitHub MCP server do roughly the same things. One costs zero tokens to have available. The other burns through context just by existing.

## Why this matters economically

Context window tokens aren't free. On API-based pricing, every token in the context window gets charged on every request. A 30k token overhead from tool definitions means 30k extra input tokens on every single message in a conversation. Over a long session with dozens of back-and-forth turns, that adds up.

Token pricing has dropped significantly — roughly 80% since 2023 according to some analyses — but the volume of tokens agents consume has increased dramatically in the same period. Agents make multiple tool calls per task, maintain long conversations, and operate across large codebases. The per-token price dropped, but the total token consumption went up.

CLI tools sidestep much of this. The agent already knows how to use `git`, `npm`, `docker`, `curl`, and hundreds of other standard Unix tools from its training data. No tool description needed. No schema definition. No context overhead. The agent just calls the command, reads stdout, and moves on.

## Structured data, without the structure tax

One argument for GUIs and structured APIs is that they provide clean, predictable output formats. But CLIs do this too, just differently. Unix commands pipe text. They output JSON when asked (`gh pr list --json`). They support flags that control verbosity. And agents are remarkably good at parsing their output.

The Unix philosophy — small tools that do one thing, composable through pipes — turns out to be almost perfectly aligned with how agents reason. An agent can chain `ls | grep | head` to narrow down what it's looking at before committing tokens to reading full files. It can run `git log --oneline -5` to understand recent history without loading the entire commit graph.

This kind of incremental, lazy context loading is exactly what keeps token usage low. The agent decides what it needs, fetches just that, and moves on. Compare this to an MCP server that front-loads its entire schema into the context window whether or not the agent needs any of it.

## The `gh` vs GitHub MCP example

This is worth zooming in on because it illustrates the point so clearly.

The GitHub MCP server exposes dozens of tools: create issues, list PRs, read files, manage releases. Each tool comes with a JSON schema definition. All of those definitions load into context immediately. The total overhead is measured in tens of thousands of tokens.

The `gh` CLI does all of the same things. `gh pr list`, `gh issue create`, `gh api repos/owner/repo/pulls/123/comments`. The agent knows the syntax from training data. The overhead is zero tokens until the agent actually calls a command. And when it does call a command, it gets back plain text that's easy to parse and cheap to include in context.

Same capabilities. Dramatically different context cost.

## What this means for tool builders

If you're building developer tools in 2026, the CLI isn't a legacy interface you maintain for backwards compatibility. It's the primary interface for a growing class of users — AI agents.

A few things follow from this:

- **Text in, text out.** If your tool can be operated entirely through stdin/stdout, agents can use it without any adapter layer.
- **Good help text matters more than ever.** When an agent encounters an unfamiliar CLI, it runs `--help`. If your help text is clear and complete, the agent is self-onboarding.
- **JSON output flags are table stakes.** `--json` or `--output json` lets agents get structured data without screen-scraping formatted tables.
- **Don't require interactive input.** Agents can't navigate prompts or menus. Every operation should be expressible as a single command with flags.

None of this is new advice for CLI design. The Unix philosophy has been saying this for fifty years. What's new is that there's now a massive and growing user base — AI agents — that strongly rewards exactly these properties.

## The pendulum swings

We've been through cycles before. Mainframes to PCs, desktop apps to web apps, monoliths to microservices. Each shift changes what interfaces are optimal.

The agentic shift favours text interfaces, composable tools, and lazy context loading. It favours CLIs. Not because GUIs are going away — humans still need to see things — but because the fastest-growing consumer of developer tools doesn't have eyes.

The tools that win in the agentic age will be the ones that are easy to talk to. And the easiest thing to talk to, it turns out, is a well-designed command-line interface that speaks Unix.
