# Design reference board

The supplied pins are visual direction for spacious editorial layouts, image-led openings, layered section rhythm and travel photography. Their contents were not reliably accessible for visual inspection, so the kit does not claim an exact reproduction.

| Reference | Intended use in kit |
| --- | --- |
| https://www.pinterest.com/pin/12596073954475930/ | Hero composition inspiration |
| https://www.pinterest.com/pin/414120128248621357/ | Editorial split / typography inspiration |
| https://www.pinterest.com/pin/2744449765953498/ | Image story and card rhythm inspiration |
| https://pin.it/3INfNVGxV | Photo art direction reference only |
| https://pin.it/2ftkkKCYu | Photo art direction reference only |

Use original or licensed final photography. In `content/pages.json`, update every `media`, `src`, `mediaAlt` and `alt` field. Check crop and contrast at mobile widths; do not use Pinterest image URLs in production.

## Gallery · Vertical showcase

https://www.pinterest.com/pin/5840674512510770/ was inspected as a public three-second
video. It shows a vertical image carousel, an enlarged central image, smaller
neighboring images and project titles that move with the images. The
`vertical-showcase` gallery recreates that interaction with original browser code
and starter assets. See `packages/blocks/gallery/README.md` for configuration.
