# Z-INDEX MADNESS (pyramid rules)

### Top → Bottom
Increment specific components by 100 to allow wiggle room.

1. **rb-modal** = 9999 (always on top)
1. **rb-dropdown** = 300
1. **rb-popover** = 200
1. **rb-nav host** (responsive) = 100 (+1 when open)
1. **rb-code scrollbars** (highest) = 6 (codemirror sets these)