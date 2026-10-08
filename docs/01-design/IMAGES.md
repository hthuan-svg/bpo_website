# Image Strategy

## Principles

Images are business content, not decoration.

Use:
- supplied assets
- approved company/client imagery
- explicit placeholders

Do not fetch random stock images.

## Recommended logical slots

### Home
- home_stat_start
- home_stat_people
- home_stat_projects
- home_stat_top1
- home_services_strip_*
- home_commitment_bg
- home_subaru_partner

### Subaru
- subaru_hero_bg
- subaru_boxer_bg
- subaru_sawd_bg
- subaru_eyesight_bg
- subaru_sgp_bg

### About
- about_history_*
- about_multinational_bg
- about_office_main
- about_office_branch

### Team
- team_structure_bg
- team_operation_bg
- team_training_japan_bg

### Achievements
- achievements_bg
- projects_bg

### Vision
- vision_direction_bg
- vision_current_bg
- vision_next_bg
- vision_later_bg

### Services Annotation
- annotation_category_*
- annotation_quality_bg
- annotation_quality_principles
- annotation_security_bg

## Placeholder policy

If `content/images.json` marks a slot as:

```json
{
  "placeholder": true
}
```

keep it.

Do not delete it because the final image is not available.

## Background readability

Text over images needs a contrast layer/overlay.

Never assume a supplied image is dark enough.
