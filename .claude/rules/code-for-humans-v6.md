# Code for Humans First

Write code that is correct, easy to understand, maintainable, and no more complex than the task requires.

## Priority

When rules conflict, the higher-priority rule MUST win.

1. Correctness and safety
2. The user's requested scope
3. Existing contracts and project conventions
4. Simplicity and readability
5. Maintainability and extensibility for known requirements
6. Evidence-based optimization

MUST NOT violate a higher-priority rule to satisfy a lower-priority rule.

## Non-Negotiable Rules

- MUST understand the existing flow before changing it.
- MUST identify and preserve business invariants, transactional boundaries, data isolation rules, and non-obvious legacy constraints before changing behavior.
- MUST NOT remove unusual guards, checks, or special cases as "obsolete" until their purpose and remaining dependencies are understood.
- MUST prefer modifying the existing implementation over creating a parallel one.
- MUST fix the underlying cause instead of stacking patches around symptoms.
- MUST remove superseded code when replacement is complete.
- MUST NOT create `V2`, `New`, `Legacy`, fallback, compatibility, or duplicate business paths unless explicitly required.
- MUST NOT keep obsolete code "just in case".
- MUST NOT add abstractions, extension points, factories, wrappers, adapters, registries, or framework layers for hypothetical future requirements.
- MUST NOT fragment cohesive business flows into unnecessary helper chains such as `handleXxx`, `processXxx`, `prepareXxx`, `buildXxx`, or `doXxx`.
- MUST NOT create scenario-specific helpers, services, handlers, managers, processors, or resolvers when simple one-time logic is clearer in the existing flow.
- MUST NOT rewrite a working subsystem when a smaller coherent change can satisfy the requirement.
- MUST NOT change unrelated code.
- MUST verify the result before claiming completion.

## 1. Understand Before Editing

- Read relevant code, tests, configuration, callers, and nearby conventions.
- Search for existing behavior before adding new behavior.
- Verify real APIs, signatures, dependencies, config keys, commands, environment variables, and file paths.
- Identify the actual owner and trace the active business flow.
- Determine whether the request is an extension, replacement, migration, or temporary coexistence.
- Identify variation that already exists or is explicitly required.
- "Likely", "possible", "may", "might", or "could be needed later" does not count as known variation.
- Do not guess when the answer can be found in the codebase or authoritative documentation.

## 2. Prefer Existing Code Before Adding More

Before adding code, evaluate in this order:

1. Reuse
2. Modify
3. Simplify or merge
4. Delete obsolete logic
5. Add only when necessary

- Make the smallest coherent change, not merely the fewest-line change.
- Prefer improving the existing flow over appending another branch, helper, handler, callback, wrapper, or stage.
- Simplify repeated special cases before adding another one.
- Preserve backward compatibility only when the project or request requires it.
- Choose the most direct implementation that fits existing project patterns.
- Do not add complexity for speculative performance gains; measure first.
- If a simple requirement touches many unrelated files, re-check the design.

## 3. Design Only for Known Variation

Design for current and explicitly confirmed variation, not hypothetical future requirements.

- For known variation, design the smallest stable extension point that the current requirements justify.
- For probable but unconfirmed variation, keep implementation details localized and boundaries clean, but MUST NOT introduce new architectural abstractions, extension mechanisms, or generic frameworks solely for that possibility.
- For hypothetical variation without concrete evidence, do not design for it.
- When multiple implementations share one responsibility, use a small stable contract for genuinely shared behavior.
- Keep provider-, task-, transport-, persistence-, and implementation-specific details local.
- For a known extension path, prefer adding an implementation and registration over repeatedly modifying core orchestration.
- Prefer implementations over growing central `if/else` or `switch` chains when the same variation appears repeatedly.
- Simple localized conditionals are acceptable.
- Share stable behavior, not merely code that looks similar.
- Do not force distinct workflows into one generic implementation through flags, type checks, optional parameters, or special cases.
- Do not generalize from a single scenario unless the project already proves the variation exists.

## 4. Keep Business Flow Cohesive

- Do not extract a function merely to name a few lines of business logic.
- Before adding a method, file, or class, check whether the responsibility naturally belongs to the current implementation or an existing owner.
- Extract only for meaningful responsibility, reuse, substantial complexity, a real boundary, or clear readability improvement.
- Avoid pass-through methods that only rename, wrap, forward, or delegate a call.
- Do not create methods solely to make another method look shorter.
- Optimize for readable control flow, not method count or arbitrary size limits.
- Keep simple scenario-specific logic local when extraction would only add indirection.
- Prefer one readable flow over many tiny methods that require navigation to understand the operation.
- Keep related business steps close enough to understand the full flow without unnecessary navigation.
- Follow existing project conventions instead of introducing an isolated personal style.
- Comments should explain why, constraints, tradeoffs, or non-obvious decisions; do not narrate obvious code.
- Validate untrusted input at system boundaries and never silently swallow errors.

## 5. Replace, Delete, and Verify

When something is removed or replaced:

- Replacement means replacement unless coexistence, migration, rollback, or backward compatibility is explicitly required.
- Trace the old behavior through the complete active path before deleting it.
- Check relevant models, controllers, services, providers, persistence mappings, configuration, frontend types, payloads, tests, imports, registrations, jobs, listeners, and feature flags.
- Search the repository for remaining references to removed or superseded behavior.
- Remove dead branches, obsolete helpers, stale comments, obsolete tests, unused configuration, unused registrations, and unreachable fallback paths.
- Do not leave old and new workflows both callable unless coexistence is explicitly required.
- If coexistence is required, keep it narrow and explicit.
- If deletion is blocked by a real dependency, report it instead of silently leaving duplicate or dead code.

Before finishing:

- Run the narrowest relevant tests, type checks, lint checks, or build commands.
- Test observable behavior and important failure paths where practical.
- Do not weaken valid tests merely to make a failing implementation pass.
- Do not claim completion with placeholders, hardcoded results, fake success paths, empty implementations, or unresolved TODOs.
- Review the final diff for duplicate paths, unnecessary abstractions, fragmented helper chains, incremental patches, obsolete code, and accidental edits.
- Check that every new method, file, class, or abstraction has a concrete reason to exist.
- If verification cannot run, state exactly what was not checked and why.

## Final Check

Before claiming completion, MUST verify every applicable item below:

- [ ] The requested behavior is complete and within scope.
- [ ] Existing code was reused, modified, simplified, or deleted before unnecessary code was added.
- [ ] No speculative architecture, duplicate owner, parallel path, dead code, or accidental edit remains.
- [ ] Known variation uses only the smallest justified extension point.
- [ ] Probable but unconfirmed variation affects boundaries only, not architecture.
- [ ] The business flow remains cohesive and easy to follow.
- [ ] Every touched file and every new method, class, or abstraction has a concrete reason to exist.
- [ ] Relevant verification passed, or anything that could not be verified is explicitly reported.

Write for the next human, who may be debugging this code with no context.