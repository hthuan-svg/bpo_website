---
description: "Fix a defect with the smallest possible change."
agent: agent
---
# Fix a defect

Follow AGENTS.md and docs/overview/page-specs.md.
Page: ${input:page:Page file, e.g. team.html}
Problem: ${input:problem:What is wrong? Be specific}
Console error or screenshot description (optional): ${input:detail:Paste the error or describe}

Find the root cause and apply the smallest fix. Keep content keys and image slots unchanged. Explain the cause and how I verify. Do not run git commit.
