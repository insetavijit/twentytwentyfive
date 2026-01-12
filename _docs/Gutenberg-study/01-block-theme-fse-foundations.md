# 01 Block Theme & Full Site Editing Foundations

Master the modern WordPress Full Site Editing ecosystem. Understand why block themes represent the future of WordPress theming. Learn how Gutenberg, block rendering, and Full Site Editing replace classic PHP template systems.

---

## 1.1 Introduction to Block Themes

### What Are Block Themes?

Block themes are the **next generation of WordPress themes**. Unlike classic themes that rely on PHP template files (`header.php`, `footer.php`, `single.php`), block themes use **HTML-based templates** containing block markup.

```html
<!-- A block theme template (index.html) -->
<!-- wp:template-part {"slug":"header"} /-->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:post-content /-->
</div>
<!-- /wp:group -->
<!-- wp:template-part {"slug":"footer"} /-->
```

### Classic vs Block Themes

| Aspect | Classic Themes | Block Themes |
|--------|---------------|--------------|
| Templates | PHP files (`single.php`) | HTML files (`single.html`) |
| Styling | `style.css` with manual CSS | `theme.json` with design tokens |
| Customization | Customizer (limited) | Site Editor (full control) |
| Header/Footer | `header.php` / `footer.php` | Template Parts (visual editing) |
| Menus | `wp_nav_menu()` PHP | Navigation Block (visual) |
| Widgets | Widget Areas | Block-based Widget Areas |

### Why Block Themes Matter

1. **No-code editing**: Clients can edit headers, footers, and layouts visually
2. **Design tokens**: Colors, fonts, spacing defined once in `theme.json`
3. **Future-proof**: WordPress is investing heavily in FSE
4. **Faster development**: Less PHP, more visual composition
5. **Better UX**: Site Editor provides unified editing experience

### Industry Adoption

- **Twenty Twenty-Two** (2022) - First default block theme
- **Twenty Twenty-Three** (2023) - Style variations showcase
- **Twenty Twenty-Four** (2024) - Pattern-focused design
- **Twenty Twenty-Five** (2025) - Current default

---

## 1.2 Full Site Editing (FSE) Overview

### What is Full Site Editing?

FSE is a collection of features that bring block editing to **every part of your website** - not just post/page content, but headers, footers, sidebars, and entire page layouts.

### The Site Editor Interface

Access: **Appearance → Editor** (or **Site Editor** in WP 6.x+)

Key areas:
- **Templates**: Full page layouts (single, page, archive, 404, etc.)
- **Template Parts**: Reusable sections (header, footer, sidebar)
- **Styles**: Global design settings (colors, typography, spacing)
- **Navigation**: Menu management via blocks
- **Patterns**: Pre-designed block combinations

### FSE Workflow

```
┌─────────────────────────────────────────────────┐
│                   SITE EDITOR                    │
├─────────────────────────────────────────────────┤
│  Navigation    Templates    Styles    Patterns  │
├─────────────────────────────────────────────────┤
│                                                  │
│   ┌─────────────────────────────────────────┐   │
│   │           TEMPLATE CANVAS                │   │
│   │  ┌─────────────────────────────────┐    │   │
│   │  │      HEADER (Template Part)     │    │   │
│   │  ├─────────────────────────────────┤    │   │
│   │  │                                 │    │   │
│   │  │         CONTENT AREA            │    │   │
│   │  │    (Post Content / Query)       │    │   │
│   │  │                                 │    │   │
│   │  ├─────────────────────────────────┤    │   │
│   │  │      FOOTER (Template Part)     │    │   │
│   │  └─────────────────────────────────┘    │   │
│   └─────────────────────────────────────────┘   │
│                                                  │
└─────────────────────────────────────────────────┘
```

### Global Styles Panel

The **Styles** section controls:
- **Typography**: Font family, size, line height globally
- **Colors**: Palette, background, text colors
- **Layout**: Content width, padding
- **Blocks**: Per-block style overrides

---

## 1.3 Gutenberg Architecture

### How Blocks Are Stored

When you save a post with blocks, WordPress stores **HTML comments** as delimiters:

```html
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Hello World</p>
<!-- /wp:paragraph -->
```

This is called **block serialization**. The comment contains:
- Block name: `wp:paragraph`
- Attributes: `{"align":"center"}`
- Inner content: The actual HTML

### Block Markup Structure

```html
<!-- wp:blockname {"attribute":"value"} -->
    <actual-html-content>
        <!-- Nested blocks can go here -->
    </actual-html-content>
<!-- /wp:blockname -->
```

### Self-Closing Blocks

Some blocks have no inner content:

```html
<!-- wp:separator /-->
<!-- wp:spacer {"height":"50px"} /-->
<!-- wp:template-part {"slug":"header"} /-->
```

### Static vs Dynamic Blocks

| Type | Rendering | Example |
|------|-----------|---------|
| **Static** | Saved HTML used as-is | Paragraph, Image, Heading |
| **Dynamic** | PHP renders at runtime | Query Loop, Latest Posts, Site Title |

---

## 1.4 Block Rendering Pipeline

### Frontend Rendering Process

```
┌──────────────────┐
│   Post Content   │  (Stored in database as serialized blocks)
│   (HTML + Comments)│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Block Parser   │  (parse_blocks() function)
│                  │  Converts HTML to block array
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  render_block()  │  For each block:
│                  │  - Static: return inner HTML
│                  │  - Dynamic: call render_callback
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   Final HTML     │  Complete rendered page
└──────────────────┘
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `parse_blocks($content)` | Parse serialized blocks into array |
| `render_block($block)` | Render a single block |
| `do_blocks($content)` | Parse and render all blocks |
| `serialize_block($block)` | Convert block array back to HTML |

### Block Wrapper

WordPress automatically wraps block output:

```php
// What you write in save.js
<p>My content</p>

// What WordPress outputs (with useBlockProps)
<p class="wp-block-my-plugin-my-block">My content</p>
```

---

## 1.5 Development Environment Setup

### Option 1: LocalWP (Recommended for Beginners)

1. Download [LocalWP](https://localwp.com/)
2. Create new site → Choose "Preferred" settings
3. Install latest WordPress
4. Activate any block theme (Twenty Twenty-Five)

### Option 2: Laragon (Windows)

1. Download [Laragon](https://laragon.org/)
2. Start services → Right-click → Quick App → WordPress
3. Access via `localhost/sitename`

### Option 3: wp-env (For Developers)

Requires: Node.js 18+, Docker

```bash
# Install globally
npm install -g @wordpress/env

# In your theme folder
wp-env start

# Access at http://localhost:8888
```

### Essential Tools

| Tool | Purpose |
|------|---------|
| **VS Code** | Code editor with good PHP/JS support |
| **Node.js** | Required for block development |
| **Query Monitor** (plugin) | Debug queries, hooks, blocks |
| **Theme Check** (plugin) | Validate theme requirements |

### Enabling FSE Features

Ensure your theme has:
```json
// theme.json (required for block themes)
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": {},
    "styles": {}
}
```

And `templates/index.html` exists.

---

## 1.6 Required Tech Stack

### Must-Know Technologies

| Technology | Why It's Needed |
|------------|-----------------|
| **HTML5** | Block templates are HTML files |
| **CSS3** | Custom styling beyond theme.json |
| **Modern JavaScript (ES6+)** | Block development uses modern JS |
| **React Basics** | Editor UI is built with React |
| **PHP** | Dynamic blocks, functions.php, patterns |
| **JSON** | theme.json, block.json configuration |

### Skill Levels Required

```
HTML/CSS        ████████████████████  Essential
JavaScript      ████████████████░░░░  Important
React           ████████████░░░░░░░░  Helpful
PHP             ████████████████░░░░  Important
JSON            ████████████████████  Essential
WordPress APIs  ████████████████████  Essential
```

### Learning Priority

1. **First**: HTML block markup syntax
2. **Second**: theme.json configuration
3. **Third**: Block patterns (PHP/HTML)
4. **Fourth**: Dynamic blocks (React + PHP)

---

## 1.7 WordPress Block Directory

### Core Block Categories

| Category | Example Blocks |
|----------|---------------|
| **Text** | Paragraph, Heading, List, Quote |
| **Media** | Image, Gallery, Video, Audio |
| **Design** | Group, Columns, Separator, Spacer |
| **Widgets** | Latest Posts, Categories, Search |
| **Theme** | Navigation, Site Title, Post Content |
| **Embed** | YouTube, Twitter, Vimeo |

### Block Capabilities (Supports)

Each block declares what it supports in `block.json`:

```json
{
    "supports": {
        "color": {
            "background": true,
            "text": true
        },
        "typography": {
            "fontSize": true,
            "lineHeight": true
        },
        "spacing": {
            "margin": true,
            "padding": true
        },
        "align": ["wide", "full"]
    }
}
```

### Commonly Used Core Blocks

**For Templates:**
- `wp:template-part` - Header/Footer
- `wp:group` - Layout container
- `wp:post-content` - Main content area
- `wp:query` - Post loops
- `wp:navigation` - Menus

**For Content:**
- `wp:paragraph` - Text blocks
- `wp:heading` - H1-H6
- `wp:image` - Images with captions
- `wp:columns` - Multi-column layouts

---

## 1.8 Project: FSE Playground Setup

### Objective

Set up a working WordPress environment with a block theme and explore the Site Editor.

### Steps

#### Step 1: Install WordPress Locally

Choose LocalWP, Laragon, or wp-env (see section 1.5).

#### Step 2: Activate a Block Theme

```
Appearance → Themes → Activate "Twenty Twenty-Five"
```

Or install any block theme from WordPress.org.

#### Step 3: Explore the Site Editor

```
Appearance → Editor
```

Try each section:
- [ ] **Templates**: Open `index.html` and see block structure
- [ ] **Template Parts**: Edit the header
- [ ] **Styles**: Change the global color palette
- [ ] **Navigation**: Create a menu

#### Step 4: Modify a Template

1. Go to Templates → Single Posts
2. Click the header Template Part
3. Add a new block (try a Cover block with site title)
4. Save and view a post on frontend

#### Step 5: Test Global Styles

1. Go to Styles → Colors
2. Change the background color
3. Go to Styles → Typography
4. Change the heading font
5. Save and verify changes on frontend

### Verification Checklist

- [ ] WordPress installed and accessible
- [ ] Block theme activated
- [ ] Site Editor opens without errors
- [ ] Can edit templates visually
- [ ] Global style changes appear on frontend
- [ ] Template Parts (header/footer) are editable

---

## Summary

| Topic | Key Takeaway |
|-------|--------------|
| Block Themes | HTML templates + theme.json replace PHP |
| FSE | Edit entire site visually, not just content |
| Gutenberg Architecture | Blocks = HTML comments with JSON attributes |
| Rendering Pipeline | Parser → render_block() → Final HTML |
| Dev Environment | LocalWP/Laragon + Node.js + VS Code |
| Tech Stack | HTML, CSS, JS, React basics, PHP, JSON |
| Block Directory | Core blocks cover 90% of needs |

---

## Next Module

**[[02 Block Theme File Structure]]** - Learn the anatomy of block themes, required files, and template resolution.
