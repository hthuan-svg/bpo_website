# Implementation Workflow

## Before coding

1. Read `AGENTS.md`.
2. Read the relevant content/design docs.
3. Run the audit if architecture is unclear.
4. Inspect actual HTML/CSS/JS.
5. Search for existing reusable components/functions.
6. Identify data/config/image dependencies.

## During coding

- change the smallest number of files necessary
- preserve existing architecture
- reuse shared tokens/components
- preserve old working behavior
- avoid unrelated refactors

## After coding

1. inspect diff
2. validate JSON/content
3. run project validation
4. start local server if needed
5. open affected pages
6. test desktop/mobile
7. test dark/light where relevant
8. check console
9. check links/images
10. update TASKS
11. update CHANGELOG

## Stop condition

Do not automatically continue to the next phase.

The user reviews the result before the next prompt.
