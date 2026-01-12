# 02 Block Theme File Structure

Learn the anatomy of block themes. Understand required files, folders, and how WordPress resolves block templates. Build a valid block theme skeleton from scratch.

---

## 2.1 Required Theme Files

### Minimum Block Theme Structure

```
my-block-theme/
├── style.css              # Theme metadata (required)
├── theme.json             # Design configuration (required for block themes)
├── templates/
│   └── index.html         # Fallback template (required)
├── parts/
│   ├── header.html        # Header template part
│   └── footer.html        # Footer template part
└── screenshot.png         # Theme preview (recommended)
```

### style.css - Theme Metadata

```css
/*
Theme Name: My Block Theme
Theme URI: https://example.com/my-block-theme
Author: Your Name
Author URI: https://example.com
Description: A modern block theme for WordPress.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: my-block-theme
Tags: block-patterns, full-site-editing, blog
*/
```

> **Note**: Unlike classic themes, block themes can have an empty `style.css` body. All the styling comes from `theme.json`.

### theme.json - Design Configuration

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        "appearanceTools": true,
        "color": {
            "palette": [
                { "slug": "primary", "color": "#0073aa", "name": "Primary" },
                { "slug": "secondary", "color": "#23282d", "name": "Secondary" }
            ]
        },
        "typography": {
            "fontFamilies": [
                { "slug": "system", "fontFamily": "system-ui, sans-serif", "name": "System" }
            ]
        }
    },
    "styles": {
        "color": {
            "background": "#ffffff",
            "text": "#222222"
        }
    }
}
```

### screenshot.png

- **Dimensions**: 1200 × 900 pixels (4:3 ratio)
- **Format**: PNG or JPG
- Shows how your theme looks in Appearance → Themes

---

## 2.2 Block Template Files

### templates/ Directory

All HTML templates live in the `templates/` folder:

```
templates/
├── index.html          # Ultimate fallback (required)
├── front-page.html     # Static front page
├── home.html           # Blog posts page
├── single.html         # Single posts
├── page.html           # Static pages
├── archive.html        # Archive pages
├── category.html       # Category archives
├── tag.html            # Tag archives
├── author.html         # Author archives
├── search.html         # Search results
├── 404.html            # Not found page
└── singular.html       # Both posts and pages
```

### Basic Template Structure

**index.html** (Minimal):
```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:post-content /-->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

**single.html** (Blog Post):
```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:post-title {"level":1} /-->
    <!-- wp:post-featured-image /-->
    <!-- wp:post-date /-->
    <!-- wp:post-content /-->
    <!-- wp:post-terms {"term":"category"} /-->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

---

## 2.3 Template Parts

### parts/ Directory

Reusable layout sections stored in `parts/`:

```
parts/
├── header.html         # Site header
├── footer.html         # Site footer
├── sidebar.html        # Optional sidebar
├── post-meta.html      # Post metadata (date, author)
└── comments.html       # Comments section
```

### Example: header.html

```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:site-title {"level":0} /-->
        <!-- wp:navigation {"layout":{"type":"flex"}} /-->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
```

### Example: footer.html

```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"backgroundColor":"secondary","textColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center">© 2025 My Block Theme. All rights reserved.</p>
    <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

### Registering Template Parts in theme.json

```json
{
    "templateParts": [
        { "name": "header", "title": "Header", "area": "header" },
        { "name": "footer", "title": "Footer", "area": "footer" },
        { "name": "sidebar", "title": "Sidebar", "area": "uncategorized" }
    ]
}
```

**Areas:**
- `header` - Appears in header section
- `footer` - Appears in footer section  
- `uncategorized` - General purpose

---

## 2.4 Template Resolution Hierarchy

### How WordPress Selects Templates

WordPress uses a **hierarchical fallback system**. From most specific to least:

```
┌─────────────────────────────────────────────────────────────┐
│                  TEMPLATE HIERARCHY                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SINGLE POST (post ID: 123, slug: my-post)                 │
│  ────────────────────────────────────────                   │
│  1. single-post-my-post.html  (by slug)                    │
│  2. single-post-123.html      (by ID)                      │
│  3. single-post.html          (post type)                  │
│  4. single.html               (any single)                 │
│  5. singular.html             (posts + pages)              │
│  6. index.html                (ultimate fallback)          │
│                                                             │
│  PAGE (page ID: 456, slug: about)                          │
│  ─────────────────────────────────                          │
│  1. page-about.html           (by slug)                    │
│  2. page-456.html             (by ID)                      │
│  3. page.html                 (any page)                   │
│  4. singular.html             (posts + pages)              │
│  5. index.html                (ultimate fallback)          │
│                                                             │
│  CATEGORY (slug: news, ID: 5)                              │
│  ────────────────────────────                               │
│  1. category-news.html        (by slug)                    │
│  2. category-5.html           (by ID)                      │
│  3. category.html             (any category)               │
│  4. archive.html              (any archive)                │
│  5. index.html                (ultimate fallback)          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Custom Post Type Templates

For a CPT called `portfolio`:
```
single-portfolio-{slug}.html
single-portfolio-{id}.html
single-portfolio.html
single.html
singular.html
index.html
```

### Custom Taxonomy Templates

For a taxonomy called `genre`:
```
taxonomy-genre-{term-slug}.html
taxonomy-genre.html
taxonomy.html
archive.html
index.html
```

---

## 2.5 Block Markup in Templates

### Essential Block Syntax

```html
<!-- wp:block-name {"attribute":"value"} -->
    <inner-html-content />
<!-- /wp:block-name -->

<!-- Self-closing block -->
<!-- wp:block-name {"attribute":"value"} /-->
```

### Layout Blocks

**Group Block** - Generic container:
```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- Inner blocks here -->
</div>
<!-- /wp:group -->
```

**Columns Block**:
```html
<!-- wp:columns -->
<div class="wp-block-columns">
    <!-- wp:column {"width":"66.66%"} -->
    <div class="wp-block-column"><!-- Content --></div>
    <!-- /wp:column -->
    <!-- wp:column {"width":"33.33%"} -->
    <div class="wp-block-column"><!-- Sidebar --></div>
    <!-- /wp:column -->
</div>
<!-- /wp:columns -->
```

### Query Loop Block

```html
<!-- wp:query {"queryId":1,"query":{"perPage":10,"postType":"post"}} -->
<div class="wp-block-query">
    <!-- wp:post-template -->
        <!-- wp:post-title {"isLink":true} /-->
        <!-- wp:post-excerpt /-->
        <!-- wp:post-date /-->
    <!-- /wp:post-template -->
    <!-- wp:query-pagination -->
        <!-- wp:query-pagination-previous /-->
        <!-- wp:query-pagination-numbers /-->
        <!-- wp:query-pagination-next /-->
    <!-- /wp:query-pagination -->
</div>
<!-- /wp:query -->
```

### Navigation Block

```html
<!-- wp:navigation {"ref":123,"layout":{"type":"flex","justifyContent":"right"}} /-->
```

Or with inline links:
```html
<!-- wp:navigation {"layout":{"type":"flex"}} -->
    <!-- wp:navigation-link {"label":"Home","url":"/"} /-->
    <!-- wp:navigation-link {"label":"About","url":"/about"} /-->
    <!-- wp:navigation-link {"label":"Contact","url":"/contact"} /-->
<!-- /wp:navigation -->
```

---

## 2.6 Global Styles Connection

### How Templates Consume theme.json

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   theme.json     │────▶│   Style Engine   │────▶│   CSS Variables  │
│   (Design Tokens)│     │   (WordPress)    │     │   (Frontend)     │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

### Using Presets in Templates

Reference theme.json presets in block attributes:

```html
<!-- Using color preset -->
<!-- wp:group {"backgroundColor":"primary","textColor":"white"} -->

<!-- Using spacing preset -->
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50"}}}} -->

<!-- Using font size preset -->
<!-- wp:paragraph {"fontSize":"large"} -->
```

### CSS Custom Properties

theme.json generates CSS variables:

```css
/* Generated from theme.json */
:root {
    --wp--preset--color--primary: #0073aa;
    --wp--preset--font-size--large: 1.5rem;
    --wp--preset--spacing--50: 2rem;
}
```

---

## 2.7 Hybrid Themes vs Pure Block Themes

### Theme Types Comparison

| Aspect | Classic Theme | Hybrid Theme | Block Theme |
|--------|--------------|--------------|-------------|
| Templates | PHP only | PHP + HTML | HTML only |
| Customizer | Yes | Yes | Limited/None |
| Site Editor | No | Partial | Full |
| theme.json | Optional | Recommended | Required |
| widgets.php | Yes | Yes | Blocks instead |

### Hybrid Theme Strategy

Keep PHP templates while adding block features:

```
hybrid-theme/
├── style.css
├── theme.json          # Add block theme features
├── functions.php       # Classic setup
├── header.php          # Classic templates
├── footer.php
├── index.php
├── templates/          # Optional block templates
│   └── blank.html      # Custom block template
└── parts/              # Optional template parts
    └── header.html
```

### Migration Path

1. Add `theme.json` with settings/styles
2. Create `templates/index.html` (minimal)
3. Convert header/footer to template parts
4. Gradually convert PHP templates to HTML
5. Move patterns to `patterns/` folder
6. Remove PHP templates when fully migrated

---

## 2.8 Project: Minimal Block Theme

### Objective

Build a complete minimal block theme from scratch.

### Step 1: Create Folder Structure

```
minimal-theme/
├── style.css
├── theme.json
├── templates/
│   ├── index.html
│   ├── single.html
│   └── page.html
├── parts/
│   ├── header.html
│   └── footer.html
└── screenshot.png
```

### Step 2: style.css

```css
/*
Theme Name: Minimal Block Theme
Author: Your Name
Description: A minimal block theme for learning.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GPL-2.0-or-later
Text Domain: minimal-theme
Tags: block-patterns, full-site-editing
*/
```

### Step 3: theme.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {
        "appearanceTools": true,
        "layout": {
            "contentSize": "800px",
            "wideSize": "1200px"
        },
        "color": {
            "palette": [
                { "slug": "primary", "color": "#1e40af", "name": "Primary" },
                { "slug": "secondary", "color": "#64748b", "name": "Secondary" },
                { "slug": "background", "color": "#ffffff", "name": "Background" },
                { "slug": "foreground", "color": "#1e293b", "name": "Foreground" }
            ]
        },
        "typography": {
            "fontFamilies": [
                {
                    "slug": "system",
                    "fontFamily": "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    "name": "System"
                }
            ]
        }
    },
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--background)",
            "text": "var(--wp--preset--color--foreground)"
        },
        "typography": {
            "fontFamily": "var(--wp--preset--font-family--system)"
        }
    },
    "templateParts": [
        { "name": "header", "title": "Header", "area": "header" },
        { "name": "footer", "title": "Footer", "area": "footer" }
    ]
}
```

### Step 4: templates/index.html

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    <!-- wp:query {"queryId":1,"query":{"perPage":10,"postType":"post"}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
            <!-- wp:post-title {"isLink":true} /-->
            <!-- wp:post-excerpt /-->
        <!-- /wp:post-template -->
        <!-- wp:query-pagination -->
            <!-- wp:query-pagination-previous /-->
            <!-- wp:query-pagination-numbers /-->
            <!-- wp:query-pagination-next /-->
        <!-- /wp:query-pagination -->
    </div>
    <!-- /wp:query -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### Step 5: parts/header.html

```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:site-title /-->
        <!-- wp:navigation {"layout":{"type":"flex"}} /-->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
```

### Step 6: parts/footer.html

```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|50","bottom":"var:preset|spacing|50"}}},"backgroundColor":"primary","textColor":"background","layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:paragraph {"align":"center"} -->
    <p class="has-text-align-center">© 2025 Minimal Theme</p>
    <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

### Verification Checklist

- [ ] Theme appears in Appearance → Themes
- [ ] Theme can be activated without errors
- [ ] Site Editor loads correctly
- [ ] Header displays site title + navigation
- [ ] Posts display in index template
- [ ] Footer shows with background color
- [ ] Global styles can be modified

---

## Summary

| Topic | Key Files/Concepts |
|-------|-------------------|
| Required Files | `style.css`, `theme.json`, `templates/index.html` |
| Templates | HTML files in `templates/` folder |
| Template Parts | Reusable sections in `parts/` folder |
| Hierarchy | Most specific → `index.html` fallback |
| Block Markup | `<!-- wp:name {"attr":"val"} -->content<!-- /wp:name -->` |
| Global Styles | theme.json → CSS variables → templates |
| Hybrid Themes | Mix PHP + block templates during migration |

---

## Next Module

**[[03 theme.json & Global Styles Mastery]]** - Master design tokens, color systems, typography, and styling configuration.
