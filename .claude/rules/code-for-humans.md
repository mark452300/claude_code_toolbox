# Code for Humans First

> "Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson

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

- Before adding code, check in order whether the requested outcome can be achieved by doing nothing, deleting code, reusing an existing implementation, using the standard library or platform, or using an already-installed dependency. Write new code only when the earlier options do not fully satisfy the requirement.
- Change only what is needed to satisfy the request.
- Prefer modifying the existing implementation over creating a parallel path.
- Fix the underlying cause, not only the observed example, while keeping the change within scope. When behavior has a shared owner, fix it there instead of patching individual callers.
- The smallest change means the smallest coherent change in the correct place, not merely the fewest edited lines.
- Minimize change surface as well as code size. When behavior can be implemented cohesively through an existing extension point, keep it localized and avoid scattering edits across callers, layers, clients, or stable core modules without a demonstrated need.
- Do not refactor, rename, reformat, or clean up unrelated code.
- Preserve backward compatibility only when the project or request requires it.
- Mention broader issues separately instead of silently expanding the task.

### 3. Keep the Implementation Simple

- Choose the most direct implementation that matches existing project patterns.
- Do not design for hypothetical future requirements.
- Add an abstraction only when it removes meaningful duplication, reduces current complexity, or follows an established local pattern.
- Do not add speculative helpers, wrappers, factories, strategy layers, configuration systems, feature flags, fallbacks, or compatibility layers.
- Do not add defensive checks for states already made impossible by trusted types, schemas, or validated boundaries.
- Do not add a dependency when the project already has a suitable solution.
- When deliberately choosing a simple implementation with a non-obvious scale, performance, or concurrency limit, document the limit and the condition that would justify a more complex solution.

### 4. Write for the Next Reader

- Use names that reveal intent.
- Keep control flow direct; prefer guard clauses and early returns when they improve clarity.
- Split complex expressions into well-named parts.
- Keep functions and modules focused, but do not split them merely to satisfy arbitrary size limits.
- Keep related behavior and data together, maintain clear module boundaries, and depend on stable public contracts rather than another module's internal details.
- Follow existing conventions instead of introducing an isolated personal style.
- Comments explain why, constraints, or non-obvious decisions; they do not narrate the code.
- Remove dead code, redundant variables, duplicate logic, and obsolete comments introduced or exposed by the change when doing so is clearly in scope.

### 5. Verify the Result

- Run the narrowest relevant tests, type checks, lint checks, or build commands.
- Test observable behavior rather than implementation details.
- Cover the changed behavior and important failure paths when practical.
- Do not weaken, delete, or rewrite tests merely to make a failing implementation pass.
- Do not claim completion with placeholders, hardcoded results, empty implementations, or unresolved TODOs.
- Review the diff for accidental edits, duplication, hidden behavior changes, and unnecessary code.
- Do not claim the change works without verification.
- If verification cannot be run, state what was not checked and why.

## Rules That Apply When Relevant

Use these only when the task actually involves the corresponding concern.

### Errors and Boundaries

- Validate untrusted input at system boundaries.
- Fail clearly and include useful context in errors.
- Use the project's established error types and handling patterns.
- Never silently swallow an error unless the behavior is explicitly intentional and documented.

### Resources and Concurrency

- Give files, connections, locks, and similar resources a clear owner and cleanup path.
- Prefer language-native resource management patterns.
- Minimize shared mutable state and protect it with explicit synchronization when necessary.
- Document non-obvious lock ordering or concurrency assumptions.

### Configuration and Logging

- Name values whose meaning would otherwise be unclear; make a value configurable only when it genuinely varies by environment or use case.
- Validate required configuration at an appropriate boundary.
- Log useful state transitions and failures with context.
- Avoid secrets, sensitive data, duplicate error reporting, and noisy logs.

### Performance

- Do not optimize based on speculation.
- Measure before making non-obvious performance changes.
- Keep ordinary code clear unless evidence shows that complexity is justified.

### Object-Oriented Design

- Apply SOLID principles as heuristics, not mandatory architecture.
- Prefer composition and focused interfaces when they simplify the current design.
- Do not introduce interfaces, dependency injection, or extension points without a present need.
- Preserve substitutability and existing contracts when using inheritance or polymorphism.

## Final Check

Before finishing, confirm:

- [ ] The requested behavior is fully implemented.
- [ ] The change stays within scope and preserves existing contracts.
- [ ] Existing code and interfaces were reused where appropriate.
- [ ] New code was added only after simpler options were ruled out.
- [ ] No speculative abstraction, compatibility code, fallback, dependency, or configuration was added.
- [ ] Names, control flow, comments, and module boundaries are easy to understand.
- [ ] Relevant verification passed, or missing verification is clearly reported.
- [ ] The final diff contains no accidental or unnecessary changes.

Write for the next human, who may be debugging this code with no context.
