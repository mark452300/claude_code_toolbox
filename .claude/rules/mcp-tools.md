---
when: always
---

# MCP Tools Usage Guidelines

## Overview
This document provides guidelines for using MCP (Model Context Protocol) tools effectively in any project.

### 1. codegraph - Primary Code Intelligence Tool
**When to use:**
- Understanding code structure and architecture
- Finding symbol definitions (components, functions, types)
- Analyzing call relationships and dependencies
- Exploring "how does X work" questions
- Getting quick overview of files and symbols

**Workflow:**
- Start with `codegraph_context` for comprehensive understanding
- Use `codegraph_explore` to view related symbols' source code
- Use `codegraph_search` for quick symbol lookup
- Use `codegraph_files` to explore project structure

**Priority:** Use FIRST for any code exploration or understanding tasks.

### 2. serena - Semantic Code Editing Tool
**When to use:**
- Renaming symbols across the entire codebase
- Replacing function/method bodies
- Inserting code before/after symbols
- Finding all references to a symbol
- Safe deletion (checks for references first)

**Workflow:**
- Use `get_symbols_overview` to understand file structure
- Use `find_symbol` to locate specific symbols
- Use `replace_symbol_body` for precise edits
- Use `rename_symbol` for refactoring
- Use `find_referencing_symbols` to check impact

**Priority:** Use for PRECISE code modifications and refactoring.

### 3. context7 - Documentation Retrieval
**When to use:**
- Looking up framework and library documentation
- Checking component usage and API references
- Verifying patterns and best practices
- Learning about dependencies and their features

**Fallback strategy:**
- If context7 cannot find the documentation (library not indexed or query fails)
- Use playwright to navigate to the official documentation website
- Extract the relevant information directly from the web page

**Priority:** Use when implementation details are unclear or need current docs.

### 4. playwright - Browser Automation & Testing
**When to use:**
- Creating E2E tests for pages
- Testing user interactions
- Validating UI behavior
- Taking screenshots for verification
- Debugging frontend issues in real browser

**Priority:** Use for testing and browser-based validation.

## Code Modification Workflow

1. **Understand First** (codegraph)
   - Use `codegraph_context` to understand the feature/area
   - Use `codegraph_explore` to see related code

2. **Plan Changes** (serena)
   - Use `get_symbols_overview` to see file structure
   - Use `find_symbol` to locate exact symbols to modify

3. **Execute Changes** (serena)
   - Use `replace_symbol_body` for function changes
   - Use `insert_before_symbol` / `insert_after_symbol` for additions
   - Use `rename_symbol` for refactoring

4. **Verify** (playwright if UI changes)
   - Run dev server and test in browser
   - Create E2E tests for critical flows

## Tool Selection Decision Tree

```
Need to understand code?
  └─> Use codegraph_context first

Need to modify code?
  └─> Use serena (find_symbol → replace_symbol_body)

Need library documentation?
  └─> Use context7

Need to test UI?
  └─> Use playwright

Need to explore file structure?
  └─> Use codegraph_files

Need to see who calls a function?
  └─> Use codegraph_callers

Need to rename across codebase?
  └─> Use serena rename_symbol

Need to check impact of changes?
  └─> Use codegraph_impact
```

## Best Practices

- codegraph queries are sub-millisecond - use liberally
- Batch serena operations when possible
- Cache context7 documentation lookups
- Minimize full file reads - use symbol-level tools instead
- Save important patterns and decisions to memory
- Document architectural decisions and user preferences
