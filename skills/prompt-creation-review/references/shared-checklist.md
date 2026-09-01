---
_organized: true
---
# Shared prompt checklist

Use this checklist before finalizing any prompt, regardless of provider.

## 1. Task clarity
- State the task in one sentence.
- State what success looks like.
- State whether the model should create, transform, classify, analyze, review, or act.
- Remove vague verbs like "help", "improve", or "handle" unless followed by concrete requirements.

## 2. Output contract
- Specify the required output format.
- Specify section order.
- Specify length constraints only where they matter.
- If structured output is required, say so explicitly.
- If only one format is allowed, say "output only ...".

## 3. Scope and grounding
- State what sources the model may rely on.
- State whether it may use general knowledge.
- If grounding to supplied material matters, say it explicitly.
- If unsupported claims are unacceptable, require the model to say what is missing.

## 4. Context structure
- Separate instructions, context, examples, and input data.
- Keep reusable instructions stable.
- Keep task-specific context variable.
- Put long source material in clearly delimited sections.

## 5. Examples
- Use examples only if they improve reliability.
- Prefer realistic examples.
- Cover edge cases if they matter.
- Avoid examples that accidentally narrow the task too much.

## 6. Constraints
- State must-do requirements positively and explicitly.
- State critical prohibitions clearly.
- Avoid long walls of negative constraints.
- Convert vague quality requests into observable checks.

## 7. Tool and action behavior
- State when the model should use tools.
- State when it must ask before acting.
- State what counts as high-risk or irreversible.
- State whether to continue until verification or stop after first answer.

## 8. Review questions
- Is the task unambiguous?
- Is the output contract explicit?
- Are grounding rules clear?
- Are examples helping or harming?
- Are constraints placed where this provider is likely to honor them?
- Does the prompt rely on undocumented behavior?
- Is there any instruction conflict?
- Is the prompt longer than necessary?

## 9. Rewrite strategy
When improving a prompt:
1. Keep the original intent.
2. Preserve constraints that matter.
3. Make hidden assumptions explicit.
4. Remove redundancy.
5. Add provider-specific structure only where it helps.

## 10. Final check
Before returning a prompt, verify:
- exact task covered
- exact output format covered
- grounding behavior covered
- ambiguity reduced
- provider notes separated from base prompt
