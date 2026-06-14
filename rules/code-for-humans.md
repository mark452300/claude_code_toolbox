---
when: [writing_code, reviewing_code]
---

# Code for Humans First

> "Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson

Every design principle exists to reduce cognitive load for humans, not to please the compiler.

---

## Core Principles

### 1. KISS (Keep It Simple, Stupid)
Choose the simplest implementation. Don't over-engineer for hypothetical futures or show off with complex nested expressions.

### 2. Empathy-Driven Programming
Write assuming the reader is you in 6 months with zero context. Ask: "Would a stranger understand this without asking me?"

### 3. Clarity Over Brevity
Use intermediate variables to name sub-expressions. Break complex conditions into named booleans. Two clear lines beat one cryptic line.

```javascript
// Bad: if (u.age > 18 && u.status === 'active' && !u.banned && u.verified) { ... }

// Good:
const isAdult = user.age > 18;
const isActiveUser = user.status === 'active' && !user.banned;
const canAccess = isAdult && isActiveUser && user.verified;
if (canAccess) { ... }
```

### 4. Name Things Honestly
Names reveal intent, not implementation. Functions describe *what*, not *how*. Variables describe *what they hold*, not their type.

### 5. Self-Documenting Code
Code explains *what*. Comments explain *why* (context, constraints, non-obvious decisions). Delete comments that restate code.

### 6. Minimize Cognitive Load
- Keep functions short (one screen, one responsibility)
- Limit parameters (3-4 max; use objects for more)
- Avoid deep nesting (use early returns, guard clauses)
- Reduce mutable state and side effects

### 7. Make Errors Impossible
Use types, enums, and immutability to catch mistakes at compile time, not runtime. Make invalid states unrepresentable.

### 8. Consistency Over Cleverness
Follow existing codebase patterns even if you know a "better" way. Consistency reduces surprise. Refactor the whole area or don't create islands of inconsistency.

### 9. Delete More Than You Add
Every line is a liability. Before adding features or dependencies, ask: "Can we solve this by removing something or writing 10 lines instead?"

### 10. Optimize for Change
Code is modified more than written. Isolate what changes from what stays the same. Use dependency injection. Keep business logic separate from framework code.

### 11. Clear Module Boundaries
Each module owns one domain. Dependencies flow in one direction. No circular imports. Public API vs internal implementation (prefix private with `_`). Ask: "If I change this module's internals, will other modules break?"

### 12. Consistent Error Handling
Use domain-specific exceptions, not generic `Exception`. Fail fast at boundaries (validate inputs early). Include context in error messages (what failed, why, what was expected). Never silently swallow exceptions (`except: pass` is banned).

### 13. Explicit Resource Ownership
Every resource has one clear owner responsible for cleanup. Use context managers for resources (files, connections, locks). Avoid resource leaks. RAII pattern: acquire in constructor, release in destructor.

### 14. Concurrency: Explicit Synchronization
Shared mutable state requires explicit protection. Default to immutable data. Name locks after what they protect: `user_cache_lock` not `lock1`. Document lock order to prevent deadlocks. Prefer thread-safe data structures.

### 15. Configuration Over Magic Numbers
All tunable values belong in configuration, not scattered in code. No magic numbers (timeouts, limits, thresholds). Validate config at startup. Separate: defaults → config file → env vars → CLI args.

### 16. Logging: For Future Debugging
Logs should tell a story when things go wrong. Log state transitions (started, completed, failed). Log errors with context (input, state, expected vs actual). Use appropriate levels: DEBUG, INFO, WARN, ERROR. Avoid noise in tight loops.

### 17. Measure Before Optimizing
Premature optimization is the root of all evil. Profile first, optimize second. Optimize hot paths (frequently executed). Keep cold paths simple (startup, config, rare operations). Mark hot paths with comments.

### 18. Test Behavior, Not Implementation
Tests should survive refactoring. Test public APIs, not private methods. Test outcomes, not internal state. One test = one behavior. Test names describe what they verify.

### 19. Write Elegant Code
Elegance is simplicity refined. Elegant code is not about being clever or terse—it's about being clear, intentional, and effortless to read. Remove redundancy. Eliminate unnecessary variables. Use early returns to flatten logic. Choose the most direct path. When you finish, ask: "Could this be simpler?" If yes, simplify. Elegant code feels inevitable, like it couldn't have been written any other way.

```python
# Not elegant: redundant variable, nested if
def process_user(user):
    result = validate_user(user)
    if result:
        status = user.get_status()
        if status == 'active':
            return True
    return False

# Elegant: direct, flat, obvious
def process_user(user):
    if not validate_user(user):
        return False
    return user.get_status() == 'active'
```

---

## SOLID Principles (Object-Oriented)

**Note:** SOLID is for OOP but underlying ideas apply across paradigms via pure functions, immutability, and composition.

### S - Single Responsibility
One class/module, one reason to change. Each does one thing well. If you describe it with "and" or "or", it's doing too much.

### O - Open/Closed
Open for extension, closed for modification. Add new code instead of modifying existing. Use abstraction (interfaces, protocols) to allow new behavior without touching old code.

### L - Liskov Substitution
Subtypes must be substitutable for base types without breaking correctness. Child classes strengthen, not weaken, parent contracts.

### I - Interface Segregation
Many small, focused interfaces beat one bloated interface. Clients shouldn't depend on methods they don't use.

### D - Dependency Inversion
High-level modules shouldn't depend on low-level modules. Both depend on abstractions. Inject dependencies instead of hardcoding.

**SOLID Summary:**

| Principle | Core Idea | Benefit |
|-----------|-----------|---------|
| **S**ingle Responsibility | One reason to change | Easier to understand/modify |
| **O**pen/Closed | Extend, don't modify | Safer changes, less regression |
| **L**iskov Substitution | Honor parent contracts | Polymorphism works correctly |
| **I**nterface Segregation | Small, focused interfaces | No unused dependencies |
| **D**ependency Inversion | Depend on abstractions | Flexible, testable, decoupled |

---

## Readability Checklist

Before committing:
- [ ] Can someone understand this without asking me?
- [ ] Are names honest and descriptive?
- [ ] Is the simplest approach used?
- [ ] Is the intent obvious?
- [ ] Are complex expressions broken into named parts?
- [ ] Are comments explaining *why*, not *what*?
- [ ] Is nesting minimized?
- [ ] Does it follow the project's existing patterns?
- [ ] Could I delete anything without losing clarity?
- [ ] Will this be easy to change later?
- [ ] Are module boundaries clear with no circular dependencies?
- [ ] Do errors include context and use domain-specific exceptions?
- [ ] Are resources properly managed (context managers, cleanup)?
- [ ] Is shared state protected with explicit synchronization?
- [ ] Are magic numbers replaced with named config values?
- [ ] Do tests verify behavior, not implementation details?
- [ ] Is the code elegant—simple, direct, and effortless to read?

---

**Final Thought:** You're writing for the next human — who might be you at 2 AM fixing a production bug. Be kind to that person.
