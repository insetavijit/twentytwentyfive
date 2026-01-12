# WordPress Header Block Development Guide

A comprehensive study guide for WordPress block theme developers, covering header implementation, best practices, and interview-level technical knowledge.

---

## Table of Contents

1. [Header Architecture Overview](#header-architecture-overview)
2. [Block Markup Deep Dive](#block-markup-deep-dive)
3. [Core Header Blocks](#core-header-blocks)
4. [Layout Techniques](#layout-techniques)
5. [Template-Part-Pattern Chain](#template-part-pattern-chain)
6. [Under the Hood: Rendering Pipeline](#under-the-hood-rendering-pipeline)
7. [Best Practices](#best-practices)
8. [Common Interview Questions](#common-interview-questions)

---

## Header Architecture Overview

### The Three-File System

WordPress block themes separate headers into three distinct files:

```
templates/index.html (or any template)
    └── references template part
            └── parts/header.html
                    └── references pattern
                            └── patterns/header.php
```

| File | Location | Purpose | User Editable |
|------|----------|---------|---------------|
| Template Part Reference | `templates/*.html` | Points to the part | No (code level) |
| Template Part | `parts/header.html` | User customization layer | Yes (Site Editor) |
| Pattern | `patterns/header.php` | Default design | No (code level) |

**Why this separation?**

1. **Templates stay clean** — Just a single line referencing the header
2. **User edits persist** — Changes in Site Editor don't modify theme files
3. **Reset capability** — Users can restore pattern defaults anytime
4. **Multiple options** — Theme can offer multiple header patterns

---

## Block Markup Deep Dive

### Anatomy of a Block Comment

```html
<!-- wp:namespace/block-name {"attribute":"value","nested":{"key":"value"}} -->
<html-element class="wp-block-name additional-class" style="...">
    <!-- Inner content or nested blocks -->
</html-element>
<!-- /wp:namespace/block-name -->
```

### Core Blocks Omit Namespace

```html
<!-- wp:group -->        ← Correct for core/group
<!-- wp:core/group -->   ← Works but redundant
```

### Attribute Types

| Type | Example | JSON Format |
|------|---------|-------------|
| String | `"align":"full"` | `{"align":"full"}` |
| Number | `"level":1` | `{"level":1}` |
| Boolean | `"isLink":true` | `{"isLink":true}` |
| Object | `"layout":{...}` | `{"layout":{"type":"flex"}}` |
| Array | `"ids":[1,2,3]` | `{"ids":[1,2,3]}` |

### Self-Closing vs Container Blocks

**Self-closing (no children):**
```html
<!-- wp:site-title {"level":0} /-->
<!-- wp:navigation /-->
<!-- wp:post-title /-->
```

**Container (has children):**
```html
<!-- wp:group -->
    <!-- child blocks -->
<!-- /wp:group -->
```

---

## Core Header Blocks

### Site Title Block

```html
<!-- wp:site-title {"level":0,"isLink":true,"linkTarget":"_self"} /-->
```

| Attribute | Type | Default | Purpose |
|-----------|------|---------|---------|
| `level` | number | 2 | Heading level (0 = `<p>`) |
| `isLink` | boolean | true | Wrap in anchor tag |
| `linkTarget` | string | "_self" | Link target attribute |
| `textAlign` | string | - | Text alignment |
| `fontSize` | string | - | Font size preset slug |

**Output with level:0:**
```html
<p class="wp-block-site-title">
    <a href="https://example.com">Site Name</a>
</p>
```

**Interview insight:** Use `level: 0` in headers to avoid multiple H1s on a page. The main page content should have the only H1.

---

### Site Logo Block

```html
<!-- wp:site-logo {"width":120,"shouldSyncIcon":true} /-->
```

| Attribute | Type | Purpose |
|-----------|------|---------|
| `width` | number | Logo width in pixels |
| `shouldSyncIcon` | boolean | Sync with site icon |
| `isLink` | boolean | Link to homepage |
| `className` | string | Additional CSS classes |

---

### Navigation Block

```html
<!-- wp:navigation {
    "ref":123,
    "overlayMenu":"mobile",
    "overlayBackgroundColor":"base",
    "overlayTextColor":"contrast",
    "layout":{"type":"flex","justifyContent":"right"}
} /-->
```

| Attribute | Type | Purpose |
|-----------|------|---------|
| `ref` | number | Navigation post ID |
| `overlayMenu` | string | "never", "mobile", "always" |
| `overlayBackgroundColor` | string | Mobile menu background |
| `overlayTextColor` | string | Mobile menu text |
| `hasIcon` | boolean | Show hamburger icon |
| `icon` | string | "handle" or "menu" |
| `layout` | object | Flex layout settings |

**How Navigation Renders:**

1. WordPress queries `wp_navigation` post type
2. Parses stored block content (links, submenus)
3. Generates `<nav>` with proper ARIA attributes
4. Adds JavaScript for mobile overlay functionality

**Interview insight:** Navigation is a dynamic block—it queries the database on every page load. There's no static HTML saved in the template.

---

### Site Tagline Block

```html
<!-- wp:site-tagline {"textAlign":"center"} /-->
```

Outputs the tagline from Settings → General.

---

### Search Block

```html
<!-- wp:search {"label":"Search","showLabel":false,"buttonPosition":"button-inside","buttonUseIcon":true} /-->
```

| Attribute | Purpose |
|-----------|---------|
| `showLabel` | Hide/show label text |
| `buttonPosition` | "button-inside", "button-outside", "no-button" |
| `buttonUseIcon` | Use icon instead of text |
| `placeholder` | Input placeholder text |

---

## Layout Techniques

### The Standard Header Pattern

```html
<!-- Layer 1: Full-width background -->
<!-- wp:group {"align":"full","layout":{"type":"default"}} -->
<div class="wp-block-group alignfull">

    <!-- Layer 2: Constrained content width -->
    <!-- wp:group {"layout":{"type":"constrained"}} -->
    <div class="wp-block-group">

        <!-- Layer 3: Flex for horizontal arrangement -->
        <!-- wp:group {"align":"wide","layout":{"type":"flex","justifyContent":"space-between"}} -->
        <div class="wp-block-group alignwide">
            <!-- wp:site-title /-->
            <!-- wp:navigation /-->
        </div>
        <!-- /wp:group -->

    </div>
    <!-- /wp:group -->

</div>
<!-- /wp:group -->
```

### Layout Types Explained

| Type | CSS Behavior | Use Case |
|------|-------------|----------|
| `default` | No constraints | Full-width wrappers |
| `constrained` | `max-width` + `margin: auto` | Content areas |
| `flex` | `display: flex` | Horizontal layouts |
| `grid` | `display: grid` | Grid layouts |

### Flex Layout Options

```json
{
    "layout": {
        "type": "flex",
        "flexWrap": "nowrap",
        "justifyContent": "space-between",
        "verticalAlignment": "center",
        "orientation": "horizontal"
    }
}
```

| Property | Values | Purpose |
|----------|--------|---------|
| `flexWrap` | "wrap", "nowrap" | Allow line breaks |
| `justifyContent` | "left", "center", "right", "space-between" | Horizontal distribution |
| `verticalAlignment` | "top", "center", "bottom", "stretch" | Vertical alignment |
| `orientation` | "horizontal", "vertical" | Main axis direction |

### Alignment Values

| Value | Width | Behavior |
|-------|-------|----------|
| (none) | contentSize | Default from theme.json |
| `wide` | wideSize | Wider than content |
| `full` | 100% | Edge to edge |

---

## Template-Part-Pattern Chain

### Step-by-Step Flow

**1. Template references template part:**
```html
<!-- In templates/index.html -->
<!-- wp:template-part {"slug":"header","area":"header"} /-->
```

**2. Template part contains pattern reference:**
```html
<!-- In parts/header.html -->
<!-- wp:pattern {"slug":"twentytwentyfive/header"} /-->
```

**3. Pattern provides actual blocks:**
```php
<?php
// In patterns/header.php
/**
 * Title: Header
 * Slug: twentytwentyfive/header
 * Categories: header
 * Block Types: core/template-part/header
 */
?>
<!-- wp:group ... -->
    <!-- actual header blocks -->
<!-- /wp:group -->
```

### Pattern Metadata Fields

| Field | Example | Purpose |
|-------|---------|---------|
| `Title` | Header | Display name |
| `Slug` | theme/header | Unique identifier |
| `Categories` | header, featured | Categorization |
| `Block Types` | core/template-part/header | Template part replacement |
| `Description` | Site header with... | Tooltip text |
| `Inserter` | no | Hide from inserter |
| `Keywords` | navigation, menu | Search terms |
| `Viewport Width` | 1200 | Preview width |

### Block Types for Template Parts

| Block Type | For Area |
|------------|----------|
| `core/template-part/header` | Header parts |
| `core/template-part/footer` | Footer parts |
| `core/template-part/uncategorized` | General parts |

---

## Under the Hood: Rendering Pipeline

### Complete Rendering Flow

```
Browser requests page
        ↓
WordPress determines template (template hierarchy)
        ↓
Loads template file (e.g., index.html)
        ↓
Block parser encounters <!-- wp:template-part -->
        ↓
Checks database for user customizations
        ↓
If none: loads parts/header.html from theme
        ↓
Block parser encounters <!-- wp:pattern -->
        ↓
Loads patterns/header.php, executes PHP
        ↓
Returns block markup from pattern
        ↓
Recursively parses all blocks
        ↓
For each block:
    ├── Static blocks: use saved innerHTML
    └── Dynamic blocks: call render_callback()
        ├── wp:site-title → queries site name
        ├── wp:navigation → queries nav menus
        └── wp:group → outputs wrapper HTML
        ↓
Applies block supports (spacing, colors, typography)
        ↓
Generates inline styles and CSS classes
        ↓
Combines into final HTML string
        ↓
Wraps in document structure
        ↓
Sends to browser
```

### Key Functions Involved

| Function | Purpose |
|----------|---------|
| `do_blocks()` | Main block rendering entry point |
| `parse_blocks()` | Converts markup to block array |
| `render_block()` | Renders a single block |
| `get_block_template_part()` | Loads template part content |
| `WP_Block_Patterns_Registry::get_registered()` | Gets pattern content |

### Database vs File Priority

```
User customization (database)
        ↓ (overrides)
Child theme file
        ↓ (overrides)
Parent theme file
```

**Interview insight:** User customizations made in Site Editor are stored in the `wp_template_part` post type in the database, NOT in theme files. This is why user changes persist across theme updates.

---

## Best Practices

### 1. Semantic Structure

**Do:**
```html
<!-- wp:group {"tagName":"header"} -->
<header class="wp-block-group">
```

**Don't:**
```html
<!-- wp:group -->
<div class="wp-block-group"> <!-- Not semantic -->
```

### 2. Level 0 for Site Title in Headers

**Do:**
```html
<!-- wp:site-title {"level":0} /-->
```

**Why:** Preserves H1 for page content. Multiple H1s harm SEO and accessibility.

### 3. Use Theme.json Presets

**Do:**
```json
{"style":{"spacing":{"padding":{"top":"var:preset|spacing|30"}}}}
```

**Don't:**
```json
{"style":{"spacing":{"padding":{"top":"20px"}}}}
```

**Why:** Presets ensure consistency and let users customize via Global Styles.

### 4. Mobile-First Navigation

**Do:**
```html
<!-- wp:navigation {"overlayMenu":"mobile","overlayBackgroundColor":"base","overlayTextColor":"contrast"} /-->
```

**Why:** Ensures accessible mobile experience with proper contrast.

### 5. Accessibility Considerations

- Always provide `overlayBackgroundColor` and `overlayTextColor` for navigation
- Use `aria-label` on groups when semantically meaningful
- Ensure sufficient color contrast for all interactive elements
- Test with keyboard navigation

### 6. Pattern Organization

| Pattern Type | Naming Convention | Inserter |
|--------------|-------------------|----------|
| User-facing | `header`, `footer-columns` | Yes |
| Utility/helper | `hidden-header-content` | No |
| Template-specific | `template-home-header` | No |

### 7. Avoid Hardcoded Text

**Do:**
```php
<h1><?php esc_html_e( 'Site Name', 'theme-slug' ); ?></h1>
```

**Better:**
```html
<!-- wp:site-title /-->
```

**Why:** Dynamic blocks pull from WordPress settings, enabling proper localization.

### 8. Layer Structure for Headers

Always use the three-layer pattern:

1. **Full-width wrapper** — For backgrounds that span edge-to-edge
2. **Constrained wrapper** — For centering content
3. **Flex wrapper** — For horizontal arrangement

---

## Common Interview Questions

### Q1: What's the difference between a Template Part and a Pattern?

**Answer:**

| Aspect | Template Part | Pattern |
|--------|---------------|---------|
| **Stored in** | `parts/` folder | `patterns/` folder |
| **User editable** | Yes, via Site Editor | No (copied on insert) |
| **Reference behavior** | Linked—changes sync | Copied—independent |
| **Database storage** | `wp_template_part` post type | Not stored separately |
| **Registration** | `theme.json` templateParts array | PHP file metadata |

---

### Q2: How does WordPress decide which template to use?

**Answer:** WordPress follows the Template Hierarchy, checking for files in this order:

```
Specific → Generic → Fallback

Example for single post:
single-{post-type}-{slug}.html
single-{post-type}.html
single.html
singular.html
index.html
```

---

### Q3: Why are there both HTML and PHP pattern files?

**Answer:**

| Format | When to Use |
|--------|-------------|
| `.html` | Static content only |
| `.php` | Need translatable strings, dynamic data, or PHP logic |

PHP patterns can use `esc_html_e()` for translation-ready text or access WordPress functions.

---

### Q4: What happens when a user customizes a header in Site Editor?

**Answer:**

1. User edits header in Site Editor
2. Changes are saved to `wp_template_part` post type in database
3. On next page load, WordPress checks database first
4. If customization exists, uses database version
5. Original theme file remains unchanged
6. User can "Reset" to restore theme defaults

---

### Q5: How do you make a sticky header?

**Answer:**

```html
<!-- wp:group {"style":{"position":{"type":"sticky","top":"0px"}},"layout":{"type":"default"}} -->
<div class="wp-block-group" style="position:sticky;top:0;">
    <!-- header content -->
</div>
<!-- /wp:group -->
```

Key attributes:
- `position.type`: "sticky"
- `position.top`: "0px"

---

### Q6: What's the purpose of `Block Types` in pattern metadata?

**Answer:**

`Block Types: core/template-part/header` tells WordPress this pattern can replace a header template part. When clicking "Replace" on a template part in Site Editor, only patterns with matching Block Types appear as options.

---

### Q7: How does the Navigation block get its menu items?

**Answer:**

1. Navigation references a `wp_navigation` post by ID (`ref` attribute)
2. That post contains serialized block markup (links, submenus)
3. On render, WordPress parses and outputs as `<nav>` HTML
4. If no `ref`, WordPress uses fallback (page list or empty)

---

### Q8: Explain the `align` attribute values.

**Answer:**

| Value | Width Source | Behavior |
|-------|--------------|----------|
| (none) | `contentSize` | Default constrained width |
| `wide` | `wideSize` | Wider but still constrained |
| `full` | 100vw | Edge to edge, breaks out of parent |
| `left/right` | - | Float alignment |

Values come from `theme.json → settings.layout`.

---

### Q9: What's the difference between static and dynamic blocks?

**Answer:**

| Aspect | Static Block | Dynamic Block |
|--------|--------------|---------------|
| **HTML source** | Saved in database | Generated by PHP |
| **Examples** | Paragraph, Heading | Navigation, Post Title |
| **save() returns** | HTML string | null |
| **Render speed** | Faster (no PHP) | Slightly slower |
| **Use when** | Content is fixed | Content needs to be current |

---

### Q10: How would you add a search icon to the header?

**Answer:**

```html
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
    <!-- wp:navigation /-->
    <!-- wp:search {"label":"Search","showLabel":false,"buttonPosition":"button-only","buttonUseIcon":true} /-->
</div>
<!-- /wp:group -->
```

Wrap navigation and search in a flex group for horizontal alignment.

---

## Quick Reference Card

```
HEADER FILE LOCATIONS
├── templates/*.html     → References template parts
├── parts/header.html    → User-customizable layer
└── patterns/header.php  → Default design source

ESSENTIAL BLOCKS
├── wp:site-title       → Dynamic, outputs site name
├── wp:site-logo        → Dynamic, outputs logo
├── wp:navigation       → Dynamic, outputs menu
├── wp:group            → Static, layout container
└── wp:search           → Static with dynamic form

LAYOUT TYPES
├── default      → No constraints
├── constrained  → Centers with max-width
├── flex         → Flexbox horizontal/vertical
└── grid         → CSS Grid

KEY ATTRIBUTES
├── align: "full" | "wide" | ""
├── tagName: "header" | "nav" | "div"
├── layout.type: "flex" | "constrained"
├── layout.justifyContent: "space-between"
└── style.position.type: "sticky"

PATTERN METADATA
├── Title       → Display name
├── Slug        → twentytwentyfive/header
├── Categories  → header, footer
├── Block Types → core/template-part/header
└── Inserter    → no (for hidden patterns)
```

---

## Related Resources

- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Theme JSON Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)
- [Core Blocks Reference](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/)
- [Template Hierarchy](https://developer.wordpress.org/themes/templates/template-hierarchy/)
- [Block Patterns](https://developer.wordpress.org/themes/features/block-patterns/)
- [Global Styles](https://developer.wordpress.org/themes/global-settings-and-styles/)
