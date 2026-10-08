# Contact Content Specification

Reference for layout inspiration:
`https://dataengineering.brycen.co.jp/contact/`

This is inspiration only. Do not copy source code.

## Layout

Desktop:
- left: contact form
- right: company/department information in one vertical column

Mobile:
- form first
- company information below

## Privacy

Include:
`個人情報の取り扱いについて`

Require consent before submit.

## Form fields

Use only fields that are necessary and approved by the business.
Typical examples may include:
- name
- company
- email
- phone
- department
- message

Do not collect unnecessary sensitive information.

## Email delivery

Destination email will be supplied later.

Until configured:
- no fake address
- no fake mailto
- no fake success message
- no claim that an email was delivered

Keep destination configurable.

## Security

Validate:
- required fields
- email format
- message length
- safe encoding

Do not expose secrets in client-side code.

## Open issue

Actual form delivery mechanism must be selected and configured before production.
