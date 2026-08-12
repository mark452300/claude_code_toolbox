# MCP Tool Usage

Use tools to reduce uncertainty and verify results. Choose the smallest set of available tools that can complete the task reliably.

## Core Rules

1. Match the tool to the task; do not follow a fixed tool sequence.
2. Check that a tool is available before relying on it.
3. Use repository evidence and tool output instead of guessing.
4. Treat indexes, symbol graphs, documentation caches, and browser state as potentially incomplete or stale.
5. Confirm important findings against source files, current configuration, tests, or authoritative documentation.
6. If a preferred tool is unavailable or fails, use the simplest reliable fallback and continue.
7. Do not call tools that add no useful information to the current task.
8. Do not claim that a tool was used or that a result was verified when it was not.

## Tool Selection

### Codegraph: Code Relationships

Use codegraph when it is available and the task requires:

- Understanding architecture or cross-file relationships
- Finding symbol definitions, callers, references, or dependencies
- Estimating the impact of a change
- Getting an initial map of an unfamiliar area

Confirm critical results in the source code. Use repository search and direct file reads when the index is missing, stale, incomplete, or unnecessary for a small task.

### Serena: Semantic Code Operations

Use Serena when it is available and semantic precision is useful for:

- Renaming a symbol across the codebase
- Finding references before changing or deleting a symbol
- Replacing a complete function, method, class, or other symbol body
- Inserting code at a stable symbol boundary

Inspect the resulting diff after every semantic edit. Use a normal patch for small local edits, configuration, prose, generated files, or changes that do not align with symbol boundaries.

Reference lookup reduces risk but does not prove that deletion or behavior changes are safe. Also check dynamic references, reflection, configuration, templates, generated code, and external contracts when relevant.

### Context7: Library Documentation

Use Context7 when it is available and current framework or library behavior is unclear.

- Prefer documentation matching the dependency version used by the project.
- Verify signatures, configuration, migration guidance, and version-specific behavior.
- Prefer official or primary documentation for consequential decisions.

If documentation is unavailable or incomplete, inspect local types and package sources, then consult the official documentation with an available web or browser tool. Do not invent APIs or infer current behavior from memory alone.

### Playwright: Browser Verification

Use Playwright when browser behavior matters, including:

- Verifying user interactions and critical UI flows
- Reproducing browser-specific issues
- Checking layout at relevant viewport sizes
- Inspecting console errors and failed network requests
- Capturing screenshots when visual evidence is useful

Do not use browser automation when a focused unit, integration, or component test provides sufficient evidence. Reuse the project's existing test setup and avoid adding E2E tests for trivial behavior.

## Working Process

### 1. Discover

- Start with the cheapest reliable source of evidence: targeted search, direct file reading, symbol lookup, or documentation lookup.
- Read enough surrounding context to understand imports, state, error handling, and local conventions.
- Use full-file reads when module-level context matters; symbol-level views are an optimization, not a rule.

### 2. Assess Impact

- Find relevant callers, references, tests, configuration, and public contracts.
- Use multiple sources of evidence for cross-module or high-risk changes.
- Do not treat a clean reference search as proof that runtime or external consumers do not exist.

### 3. Edit

- Choose semantic editing for broad symbol-aware changes and patches for focused textual changes.
- Keep edits within the requested scope.
- Review each tool-generated change before proceeding.

### 4. Verify

- Run the narrowest relevant unit tests, integration tests, type checks, lint checks, or build commands.
- For UI changes, add browser or screenshot verification when visual or interaction behavior is involved.
- Inspect the final diff for accidental edits, missed references, and generated noise.
- Report tool failures and any verification that could not be completed.

## Fallback Order

When a preferred MCP tool is unavailable or unreliable:

1. Use repository search and direct file reads.
2. Use the project's language tooling, package metadata, and test commands.
3. Use official or primary documentation through an available documentation or web tool.
4. Ask the user only when missing information would materially change the implementation and cannot be discovered safely.

Tool choice supports engineering judgment; it does not replace it.
