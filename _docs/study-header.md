# Understanding the Header Pattern

This document breaks down `patterns/header.php` and explains how header patterns work in Twenty Twenty-Five.

---

## Quick Overview

| Component | What It Does |
|-----------|--------------|
| Pattern metadata | Registers the pattern with WordPress |
| Outer group (alignfull) | Full-width container |
| Middle group (constrained) | Limits width to content size |
| Inner group (flex) | Horizontal layout for site title + nav |
| Site Title block | Dynamic site name |
| Navigation block | Menu items |

---

## Pattern file anatomy

```php
<?php
/**
 * Title: Header
 * Slug: twentytwentyfive/header
 * Categories: header
 * Block Types: core/template-part/header
 * Description: Site header with site title and navigation.
 */
?>
<!-- blocks go here -->
```

### Pattern metadata explained:

| Field | Value | Purpose |
|-------|-------|---------|
| `Title` | Header | Display name in pattern inserter |
| `Slug` | twentytwentyfive/header | Unique identifier for referencing |
| `Categories` | header | Groups pattern in "Header" category |
| `Block Types` | core/template-part/header | Shows in template part replacer |
| `Description` | Site header with... | Tooltip description |

**Block Types** is special—it tells WordPress this pattern can be used to replace a header template part. When you click "Replace" on a header template part in the Site Editor, patterns with this block type appear as options.

---

## The three-layer structure

Twenty Twenty-Five's header uses nested groups for layout control:

```
Layer 1: Full-width container (alignfull)
    └── Layer 2: Constrained container
            └── Layer 3: Flex container (space-between)
                    ├── Site Title
                    └── Navigation wrapper
                            └── Navigation
```

### Why three layers?

**Layer 1 (Full-width):** Allows background colors to span edge-to-edge.

**Layer 2 (Constrained):** Limits content to the theme's `contentSize` width (645px from theme.json).

**Layer 3 (Flex):** Positions site title and navigation on opposite sides.

This pattern is common in WordPress themes—full-width wrapper for backgrounds, constrained wrapper for content width.

---

## Layer 1: The full-width wrapper

```html
<!-- wp:group {"align":"full","layout":{"type":"default"}} -->
<div class="wp-block-group alignfull">
    <!-- inner content -->
</div>
<!-- /wp:group -->
```

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `align` | "full" | Spans entire viewport width |
| `layout.type` | "default" | No width constraints on children |

**Why default layout?** The children will control their own widths. This outer wrapper is purely for full-width backgrounds or borders.

---

## Layer 2: The constrained wrapper

```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- inner content -->
</div>
<!-- /wp:group -->
```

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `layout.type` | "constrained" | Limits width to contentSize (645px) |

**What constrained does:**

- Applies `max-width` based on theme.json `layout.contentSize`
- Centers content with `margin: auto`
- Allows children to use `alignwide` or `alignfull` to break out

---

## Layer 3: The flex container

```html
<!-- wp:group {
    "align":"wide",
    "style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},
    "layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}
} -->
<div class="wp-block-group alignwide" 
     style="padding-top:var(--wp--preset--spacing--30);padding-bottom:var(--wp--preset--spacing--30)">
    <!-- Site Title and Navigation -->
</div>
<!-- /wp:group -->
```

### Attributes breakdown:

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `align` | "wide" | Uses wideSize (1340px) instead of contentSize |
| `style.spacing.padding` | spacing 30 | Vertical padding from theme.json |
| `layout.type` | "flex" | Enables flexbox layout |
| `layout.flexWrap` | "nowrap" | Items stay on one line |
| `layout.justifyContent` | "space-between" | Pushes items to opposite ends |

### Why alignwide?

The header content spans wider than regular content (1340px vs 645px), giving the header a more prominent presence.

### How flex layout works:

```
|  Site Title  |                    |  Navigation  |
|<-------------- space-between ---------------->|
```

Flexbox with `justifyContent: "space-between"` pushes the first child (Site Title) to the left and last child (Navigation wrapper) to the right.

---

## The Site Title block

```html
<!-- wp:site-title {"level":0} /-->
```

**Block name:** `core/site-title`

This is a dynamic block that outputs your site's name from Settings → General.

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `level` | 0 | Outputs as `<p>` instead of heading |

**Why level 0?**

When `level` is 0, the site title renders as a paragraph. This is semantically correct for headers where you don't want the site title competing with `<h1>` for page heading status.

| Level | Output |
|-------|--------|
| 0 | `<p class="wp-block-site-title">` |
| 1 | `<h1 class="wp-block-site-title">` |
| 2 | `<h2 class="wp-block-site-title">` |

---

## The Navigation block

```html
<!-- wp:navigation {
    "overlayBackgroundColor":"base",
    "overlayTextColor":"contrast",
    "layout":{"type":"flex","justifyContent":"right","flexWrap":"wrap"}
} /-->
```

**Block name:** `core/navigation`

This is a complex dynamic block that:
1. Queries navigation menus from the database
2. Renders menu items with proper HTML structure
3. Adds mobile overlay functionality

### Attributes:

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `overlayBackgroundColor` | "base" | Mobile menu background (white) |
| `overlayTextColor` | "contrast" | Mobile menu text (dark) |
| `layout.type` | "flex" | Flexbox for horizontal items |
| `layout.justifyContent` | "right" | Aligns items to the right |
| `layout.flexWrap` | "wrap" | Allows items to wrap on narrow screens |

### How navigation works under the hood:

1. **No menu assigned:** Shows "Navigation" placeholder in editor
2. **Menu assigned:** Renders `<nav>` with `<ul>` and `<li>` elements
3. **Mobile view:** Collapses into hamburger with overlay menu

---

## The navigation wrapper group

```html
<!-- wp:group {"style":{"spacing":{"blockGap":"var:preset|spacing|10"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"right"}} -->
<div class="wp-block-group">
    <!-- wp:navigation {...} /-->
</div>
<!-- /wp:group -->
```

**Why wrap navigation in a group?**

This allows adding extra elements alongside navigation (search icon, social links, buttons) while keeping them visually together.

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `spacing.blockGap` | spacing 10 | Small gap between items |
| `layout.type` | "flex" | Horizontal layout |
| `layout.justifyContent` | "right" | Aligns to right side |

---

## Alternative header patterns

Twenty Twenty-Five includes multiple header variations:

### Centered header

```html
<!-- wp:site-title {"level":0,"textAlign":"center","align":"wide","fontSize":"x-large"} /-->
<!-- wp:navigation {"layout":{"type":"flex","justifyContent":"center"}} /-->
```

Both elements centered, stacked vertically.

### Large title header

```html
<!-- wp:site-title {"level":0,"style":{"typography":{"fontSize":"100px","lineHeight":"1.2"}}} /-->
<!-- wp:navigation {"layout":{"orientation":"vertical"}} /-->
```

Oversized site title with vertical navigation.

### Vertical header

```html
<!-- wp:group {"style":{"position":{"type":"sticky","top":"0px"}}} -->
    <!-- wp:navigation {"overlayMenu":"always"} /-->
    <!-- wp:site-title {"style":{"typography":{"writingMode":"vertical-rl"}}} /-->
<!-- /wp:group -->
```

Sidebar-style header with rotated text and always-visible hamburger menu.

**Key attributes:**

| Attribute | Purpose |
|-----------|---------|
| `position.type: "sticky"` | Stays fixed during scroll |
| `overlayMenu: "always"` | Always shows hamburger, not inline menu |
| `writingMode: "vertical-rl"` | Rotates text 90 degrees |

---

## How templates use this pattern

The template part → pattern connection:

```
templates/index.html
    └── <!-- wp:template-part {"slug":"header"} /-->
            └── parts/header.html
                    └── <!-- wp:pattern {"slug":"twentytwentyfive/header"} /-->
                            └── patterns/header.php (this file)
```

**Why this chain?**

1. **Template references template part** — Easy to swap headers across templates
2. **Template part references pattern** — User customizations in Site Editor are separate from pattern definition
3. **Pattern contains actual blocks** — Source of truth for default design

---

## Understanding the spacing

The header uses two spacing presets from theme.json:

| Preset | Reference | Actual Value |
|--------|-----------|--------------|
| spacing-30 | `var:preset|spacing|30` | ~20px (from spacingSizes) |
| spacing-10 | `var:preset|spacing|10` | ~10px |

**In block attributes:**
```json
{"spacing":{"padding":{"top":"var:preset|spacing|30"}}}
```

**In rendered HTML:**
```css
padding-top: var(--wp--preset--spacing--30);
```

Using presets instead of fixed values ensures the header spacing adjusts if theme.json values change.

---

## Rendering flow

When WordPress renders the header:

```
1. Parse <!-- wp:template-part {"slug":"header"} /-->
        ↓
2. Load parts/header.html
        ↓
3. Parse <!-- wp:pattern {"slug":"twentytwentyfive/header"} /-->
        ↓
4. Load patterns/header.php, execute PHP
        ↓
5. Parse block markup in pattern
        ↓
6. Render each block:
   - Group blocks: output <div> with classes and styles
   - Site Title: query database for site name
   - Navigation: query database for menu, generate <nav> structure
        ↓
7. Combine into final HTML
        ↓
8. Output in page <head> or <body>
```

---

## Common customization points

When modifying header patterns:

| Want to... | Change... |
|------------|-----------|
| Adjust spacing | `spacing.padding` values |
| Change layout | `layout.justifyContent` value |
| Add logo | Insert `wp:site-logo` block |
| Add search | Insert `wp:search` block |
| Add tagline | Insert `wp:site-tagline` block |
| Add social links | Insert `wp:social-links` block |
| Make sticky | Add `style.position` attributes |
| Add border | Add `style.border` attributes |

---

## Related resources

For more information about the concepts covered here:

- [Navigation Block](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/#navigation) — Complete navigation documentation
- [Site Title Block](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/#site-title) — Site identity blocks
- [Block Patterns](https://developer.wordpress.org/themes/features/block-patterns/) — Creating pattern files
- [Template Parts](https://developer.wordpress.org/themes/templates/template-parts/) — How template parts work
