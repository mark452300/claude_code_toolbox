# Code for Humans First

> "Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson

Write code that is correct, easy to understand, and no larger than the task requires.

## Priority Order

When principles conflict, use this order:

1. Correctness and safety
2. The user's requested scope
3. Existing contracts and project conventions
4. Simplicity and readability
5. Extensibility and optimization

Do not sacrifice a higher-priority goal for a lower-priority one.

## Required Workflow

### 1. Understand Before Editing

- Read the relevant code, tests, configuration, and nearby conventions.
- Search for existing behavior before adding a new implementation.
- Verify real APIs, signatures, dependencies, commands, config keys, environment variables, and file paths.
- Check callers before changing inputs, outputs, side effects, errors, or public behavior.
- Do not guess when the answer can be found in the codebase or authoritative documentation.

### 2. Make the Smallest Complete Change

- Before adding code, check whether the outcome can be achieved by doing nothing, deleting code, reusing an existing implementation, using the standard library or platform, or using an already-installed dependency.
- Change only what is needed to satisfy the request.
- Prefer modifying the existing implementation over creating a parallel path.
- Fix the underlying cause in the correct owner instead of patching individual symptoms.
- Treat the smallest change as the smallest coherent change, not merely the fewest edited lines.
- Do not refactor, rename, reformat, or clean up unrelated code.
- Preserve backward compatibility only when the project or request requires it.
- Mention broader issues separately instead of silently expanding the task.

### 3. Keep Code Simple and Readable

- Choose the most direct implementation that matches existing project patterns.
- Do not design for hypothetical future requirements.
- Add an abstraction only when it removes meaningful duplication, reduces current complexity, or follows an established local pattern.
- Do not add speculative helpers, wrappers, factories, feature flags, fallbacks, dependencies, or extension points.
- Use names that reveal intent and keep control flow direct.
- Keep functions and modules focused without splitting them only to satisfy arbitrary size limits.
- Follow existing conventions instead of introducing an isolated personal style.
- Comments should explain why, constraints, or non-obvious decisions; they should not narrate the code.
- Validate untrusted input at system boundaries and never silently swallow errors.
- Do not add complexity for speculative performance gains; measure first.

### 4. Delete Completely When Asked

- When removing a field, option, parameter, or feature, remove it from the entire active path, not only from the visible UI.
- Trace the change through models, validation, controllers, services, providers, persistence mappings, configuration, frontend types and payloads, tests, documentation, and imports where relevant.
- Search the repository for remaining references before declaring the removal complete.
- Do not leave compatibility fields, unused helpers, dead branches, stale comments, or obsolete tests unless backward compatibility is explicitly required.
- Verify both that the old symbol is gone and that the remaining flow still works.

### 5. Verify the Result

- Run the narrowest relevant tests, type checks, lint checks, or build commands.
- Test observable behavior rather than implementation details.
- Cover important failure paths when practical.
- Do not weaken, delete, or rewrite tests merely to make a failing implementation pass.
- Do not claim completion with placeholders, hardcoded results, empty implementations, or unresolved TODOs.
- Review the diff for accidental edits, duplication, hidden behavior changes, and unnecessary code.
- Do not claim the change works without verification.
- If verification cannot be run, state what was not checked and why.

## Completion Criteria

Before finishing, confirm:

- [ ] The requested behavior is fully implemented and stays within scope.
- [ ] Existing code and interfaces were reused where appropriate.
- [ ] No unnecessary abstraction, dependency, fallback, compatibility code, or configuration was added.
- [ ] Any requested deletion was traced through the full active path.
- [ ] Relevant verification passed, or missing verification is clearly reported.
- [ ] The final diff contains no accidental or unnecessary changes.

Write for the next human, who may be debugging this code with no context.
