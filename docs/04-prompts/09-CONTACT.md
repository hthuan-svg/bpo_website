# Prompt 09 – Contact

Read:
- `docs/02-content/CONTACT.md`
- `docs/01-design/COMPONENTS.md`

Use this only as layout inspiration:
`https://dataengineering.brycen.co.jp/contact/`

Implement:
- left contact form
- right company/department information in one vertical column
- privacy section:
  `個人情報の取り扱いについて`
- consent required
- responsive mobile stacking
- configurable destination
- validation
- safe handling

Critical:
The destination email has not yet been supplied.

Therefore:
- do not invent an email
- do not create fake mailto
- do not claim delivery
- do not create a fake success message
- use a clear configuration placeholder if the architecture supports it
- if no delivery mechanism exists, show a truthful pending/configuration state appropriate for development

Do not expose secrets in frontend code.

Test validation and UI without pretending that real email delivery exists.

Update TASKS and CHANGELOG.
Then stop.
