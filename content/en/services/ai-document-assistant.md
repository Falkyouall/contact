---
title: AI Assistant for Company Documents
subtitle: Questions in plain language, answers with sources from the company's own documents, running on its own network
date: 2026-11-13
description: "A chat assistant like ChatGPT that searches and reads company documents and cites its sources. On the company's own network, with secure SSO login, roles, cost limits, and language models on Microsoft Azure in the EU. From connecting an existing DMS to building everything from scratch."
contactHeading: "Ask documents instead of searching them?"
---

The documents are all there. Contracts, reports, correspondence, filed in the document management system, on network drives, in mailboxes. Getting to them is the hard part: finding something means knowing what it's called, where it lives, and which exact word appears in the text. Whoever doesn't know asks a colleague. Or gives up.

I build an assistant that can be asked like ChatGPT. It searches the company's documents, reads the relevant ones, and answers with sources, so every statement can be checked with a single click.

## Typical starting situation

- Search only finds what is typed in word for word, and only if it's clear where to look
- An AI assistant would be handy, but company documents shouldn't end up in some third-party chat tool
- Data protection, access rights, running costs: the questions have been asked, nobody has answered them
- The AI bill arrives as one number, and nobody knows who used what

## Scope of service

- **Chat interface that works like ChatGPT**, running on a dedicated server inside the company network and only reachable internally
- **Secure single sign-on** with the existing company account, including multi-factor authentication. No separate password login; groups and roles come from the existing user directory
- **Read-only access to the documents.** Roles control who can search, who can read full texts, and which areas stay protected
- **Language models on Microsoft Azure in the EU**, in a subscription owned by the company (details in the data protection section)
- **Cost control:** monthly budget with alerts, limits per group, usage visible per employee
- **Complete handover:** source code, documentation, operations manual, quick-start guide, onboarding for team and admin

Once the base is in place, it can grow. More data sources. Creating and editing Word, Excel, and PDF files right in the chat. A semantic search that finds the clause even when it shares no single word with the question. Or a gateway that breaks costs down in euros per employee. Each one on its own, and only once it turns out to be needed.

## Starting points

Nothing needs to be in place. Where the project starts depends on what already exists:

- **A DMS with a search index exists.** Then the assistant gets connected, and whatever already runs stays as it is.
- **The documents exist, but aren't searchable.** Then I build the indexing, so the assistant has something to find in the first place.
- **There's nothing yet.** Then the project covers the full package: document management, indexing, server, login, Azure subscription, and the assistant on top.

Most companies are somewhere in between. That gets sorted out in the first conversation.

## Full-text search or vector search?

For the assistant to find anything, the documents have to be indexed. There are two ways to do that, and they solve different problems.

**Full-text search** finds documents in which the search terms appear word for word. For invoice numbers, names, amounts, or case references that's exactly right, because there the exact match counts, not the meaning. New documents are findable immediately. And where a search index already exists, nothing extra is needed. The limit: without knowing the document's wording, it won't be found. The assistant partly makes up for that by trying several search terms and synonyms on its own, which often leads to similarly good results.

**Vector search** additionally finds documents that mean the same thing but are worded differently. The question "How do we get out of this contract?" then also finds the clause "termination of the contractual relationship", even though not a single word matches. That pays off for content questions about long texts such as contracts, reports, or correspondence. Technically, the documents are split into sections, embedded through an embedding model on Azure in the EU, and stored in a dedicated vector index, with the same role and area filters as full-text search. Things to consider:

- On the first embedding run, the entire document collection is sent to Azure in the EU once
- One-off costs for the existing collection, then small ongoing costs only for new and changed documents
- New documents only show up in vector search after the next sync, in full-text search immediately

**In practice, both run together** as hybrid search: full text for the exact, vectors for the meaning. The sensible path is usually to start with full-text search and decide based on the test questions and the pilot whether vector search is worth the effort. If it isn't, that saves cost and complexity.

## Data protection: Microsoft Azure in the EU, in the company's own subscription

The language models run on Azure OpenAI from Microsoft, in an EU region or the EU data zone. And in an Azure subscription owned by the company: either the existing one or a newly set-up one. Not mine, and with no third party in between. Sounds like a detail. It's the foundation for everything else:

- **The contract is with Microsoft.** The resource, the keys, and the bill belong to the company, and the data processing agreement is directly with Microsoft. After handover, nothing depends on me.
- **Document content leaves the company network in one direction only:** to the models in the EU. The interface, database, chats, and uploaded files stay on the company's own server.
- **No web search in the document assistant.** Features that send requests to the open internet stay switched off there, so no document content ends up in search queries.
- **Chats are deleted automatically**, along with uploaded and generated files, after a freely chosen retention period. Backups are encrypted.
- **Admins don't read along** unless that's explicitly wanted. Then only usage and costs are evaluated.
- **Documentation for the data protection officer:** data flows, storage locations, retention, and deletion policy, described technically.

This doesn't replace legal advice. But the data protection officer gets something concrete to review instead of a black box.

## Why the assistant doesn't guess

An assistant that hallucinates is worse than none at all. That's why most of the work goes not into the model but into the environment around it, the [harness](/de/blog/harness-engineering) (article in German).

In practice: the assistant only gets the tools it really needs, such as search, read, and open the source. Any extra tool would just eat context. Its instructions say "search, don't guess", name the source, ask back when nothing matches. And without a valid login or the right role, it simply doesn't get to see any documents. No fallback, no maybe.

Whether the answers are any good isn't decided by gut feeling either. The basis is a set of typical questions from daily work, which the assistant is tuned and tested against; then a few employees run a pilot, and only after sign-off does it go out to everyone.

## Approach

It starts with a kick-off covering the decisions that have to be made before building: who may see what? Which models? How long are chats kept, and how big is the monthly budget? After that it's step by step, from the platform through the assistant to pilot, training, and handover. Every step ends with a tangible result.

I work remotely and coordinate directly with the IT provider when network or user management is handled externally.

## How pricing works

It starts with a conversation: which documents, which questions, who should see what, and what's already in place? That turns into a proposal with individual work packages and an effort range per package. Billing follows actual effort, with a cap that won't be exceeded without prior agreement. Extensions can be ordered individually, at the start or later.

Running costs for the language models are billed by Microsoft directly through the company's Azure subscription, not through me. The chat interface itself has no license fees. The source code of everything custom-built is handed over with a perpetual right of use.

---

*Not a chatbot experiment. An assistant that knows where it's written, and can prove it.*
