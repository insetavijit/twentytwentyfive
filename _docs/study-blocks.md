# Understanding WordPress Blocks

This document explains how blocks work in WordPress, from the basic concepts to what happens under the hood when you edit and save content.

---

## Quick Overview

| Concept | Description |
|---------|-------------|
| Block | A unit of content (paragraph, image, button) |
| Block Markup | The HTML comment format that stores blocks |
| Attributes | Data stored with each block |
| Static Block | Output defined at save time (stored in database) |
| Dynamic Block | Output generated at view time (PHP renders it) |
| Block Type | The registered definition of a block |
| Block Instance | An actual block in your content |

---

## What is a block?

A block is the fundamental unit of content in WordPress. Every piece of content—paragraphs, headings, images, buttons, groups—is a block.

Think of blocks like LEGO bricks. Each block is self-contained with its own settings and appearance. You combine them to build pages.

```html
<!-- wp:paragraph -->
<p>This is a paragraph block.</p>
<!-- /wp:paragraph -->
```

This simple structure replaced the old "blob of HTML" approach. Now content has structure, making it easier to manipulate, style, and transform.

---

## What is block markup?

Block markup is the HTML comment format that tells WordPress where blocks start and end:

```html
<!-- wp:block-name {"attribute":"value"} -->
<html content>
<!-- /wp:block-name -->
```

Let's break down each part:

**Opening delimiter:**
```html
<!-- wp:paragraph {"dropCap":true} -->
```

- `<!--` — HTML comment start
- `wp:` — WordPress block namespace prefix
- `paragraph` — Block name (without `core/`)
- `{"dropCap":true}` — Block attributes in JSON
- `-->` — HTML comment end

**Closing delimiter:**
```html
<!-- /wp:paragraph -->
```

The forward slash `/` marks the end of the block.

**Self-closing blocks (no inner content):**
```html
<!-- wp:post-title {"level":1} /-->
```

Notice the `/-->` at the end—no separate closing comment needed.

---

## How do block namespaces work?

Every block has a full name with a namespace:

| Full Name | In Markup | Publisher |
|-----------|-----------|-----------|
| `core/paragraph` | `wp:paragraph` | WordPress core |
| `core/image` | `wp:image` | WordPress core |
| `core/template-part` | `wp:template-part` | WordPress core |
| `woocommerce/cart` | `wp:woocommerce/cart` | WooCommerce |
| `theme/custom` | `wp:theme/custom` | Your theme |

**The `core/` namespace** gets special treatment. In markup, you write just `wp:paragraph` instead of `wp:core/paragraph`. All other namespaces must be explicit.

---

## What are block attributes?

Attributes are the data that make each block unique. They control appearance, behavior, and content.

```html
<!-- wp:image {"id":123,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large">
    <img src="image.jpg" alt="" class="wp-image-123"/>
</figure>
<!-- /wp:image -->
```

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `id` | 123 | Media library attachment ID |
| `sizeSlug` | "large" | Which size to display |
| `linkDestination` | "none" | Don't wrap in a link |

**Where attributes go:**

Attributes can be stored in two places:

1. **In the comment** — The JSON object: `{"id":123}`
2. **In the HTML** — Extracted from markup: `class="wp-image-123"`

WordPress blocks define where each attribute comes from using an attribute schema.

---

## How does block storage work?

When you save a post with blocks, WordPress stores the block markup as plain text in the `wp_posts` table, in the `post_content` column.

**What gets saved:**
```html
<!-- wp:paragraph {"dropCap":true} -->
<p class="has-drop-cap">First paragraph with a drop cap.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":42,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large">
    <img src="photo.jpg" alt="" class="wp-image-42"/>
</figure>
<!-- /wp:image -->
```

This is literally what sits in your database. The HTML comments are preserved.

**Why store it this way?**

1. **Backward compatible** — If Gutenberg is disabled, it's just valid HTML
2. **Portable** — Copy/paste works between sites
3. **Simple** — No complex relational structure needed
4. **Recoverable** — Even corrupted blocks show something

---

## What happens when a page loads?

When someone visits your site, WordPress transforms block markup into rendered HTML:

```
Database (post_content)
        ↓
    Parsing
        ↓
Block Tree (structured data)
        ↓
   Rendering
        ↓
Final HTML (to browser)
```

### Step 1: Parsing

WordPress's block parser reads the post content and creates a structured array:

```php
// Simplified representation of parsed blocks
[
    [
        'blockName' => 'core/paragraph',
        'attrs' => ['dropCap' => true],
        'innerHTML' => '<p class="has-drop-cap">First paragraph...</p>',
        'innerBlocks' => []
    ],
    [
        'blockName' => 'core/image',
        'attrs' => ['id' => 42, 'sizeSlug' => 'large'],
        'innerHTML' => '<figure class="wp-block-image size-large">...</figure>',
        'innerBlocks' => []
    ]
]
```

### Step 2: Rendering

For each block, WordPress checks its type:

**Static blocks** — Use the saved `innerHTML` directly (maybe with minor processing)

**Dynamic blocks** — Call a PHP render function to generate fresh output

---

## What is a static block?

Static blocks save their output at edit time. The HTML in the database IS the final output.

```html
<!-- wp:paragraph -->
<p>This exact HTML appears on the frontend.</p>
<!-- /wp:paragraph -->
```

**Examples:** Paragraph, Heading, List, Quote, Image Caption

**Pros:**
- Fast rendering (no PHP processing)
- Always shows what was saved

**Cons:**
- Can't adapt to current context
- May become stale if design changes

---

## What is a dynamic block?

Dynamic blocks generate their output at view time using PHP. The saved markup is just a placeholder.

```html
<!-- wp:latest-posts {"postsToShow":5} /-->
```

No HTML inside—WordPress runs PHP code when the page loads to generate the current list of posts.

**Examples:** Latest Posts, Site Title, Post Title, Post Content, Navigation, Query Loop

**Pros:**
- Always shows current data
- Can adapt to viewer context
- PHP has access to full WordPress API

**Cons:**
- Slightly slower (runs every page load)
- Requires server-side code

### How dynamic blocks work:

1. Block is registered with a `render_callback` or `render.php` file
2. When WordPress encounters the block during rendering, it calls the callback
3. The callback receives the block's attributes
4. It returns HTML string which replaces the block markup

```php
// Simplified example of how core/post-title renders
function render_post_title_block($attributes) {
    $tag = 'h' . ($attributes['level'] ?? 2);
    $title = get_the_title();
    return "<{$tag} class=\"wp-block-post-title\">{$title}</{$tag}>";
}
```

---

## What is a Template Part block?

```html
<!-- wp:template-part {"slug":"header"} /-->
```

Template Part is a special dynamic block that:

1. Loads content from another file (`parts/header.html`)
2. Parses that file's blocks
3. Renders those blocks in place

**Block name:** `core/template-part`
**Namespace in markup:** `wp:template-part`

**Attributes:**
| Attribute | Purpose |
|-----------|---------|
| `slug` | Which template part file to load |
| `theme` | Which theme to load from (defaults to active) |
| `tagName` | Output element (div, header, footer, aside) |
| `area` | Template part area (header, footer, uncategorized) |
---
### Under the hood flow:

```
Template encounters:
<!-- wp:template-part {"slug":"header"} /-->
        ↓
WordPress looks for:
parts/header.html in the active theme
        ↓
Loads file content:
<!-- wp:pattern {"slug":"twentytwentyfive/header"} /-->
        ↓
Recursively parses and renders that content
        ↓
Returns final HTML in place of template part block
```

**Key point:** Template parts are not copied—they're referenced. Changes to the part file update everywhere it's used.

---

## What is a Pattern block?

```html
<!-- wp:pattern {"slug":"twentytwentyfive/template-query-loop"} /-->
```

Pattern blocks work differently from template parts:

**In templates:** The pattern block tells WordPress to insert the pattern's content at render time

**In the editor:** When you insert a pattern, its blocks are COPIED into your content (the pattern reference disappears)

**Block name:** `core/pattern`
**Purpose:** Include a pattern's blocks

### Under the hood flow:

```
Template encounters:
<!-- wp:pattern {"slug":"theme/pattern-name"} /-->
        ↓
WordPress looks up pattern by slug
        ↓
Parses pattern's block content
        ↓
Renders those blocks in place
        ↓
Pattern block itself produces no wrapper HTML
```

**Template parts vs Patterns:**

| Feature | Template Part | Pattern |
|---------|---------------|---------|
| User can edit separately | Yes | No |
| Creates wrapper element | Optional | No |
| Changes sync everywhere | Yes | Only in templates |
| Stored in | `parts/` folder | `patterns/` folder |
| When inserted in editor | Stays as reference | Blocks get copied |

---

## What are inner blocks?

Some blocks contain other blocks inside them. These are called "inner blocks" or "nested blocks."

```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:heading -->
    <h2>I'm inside the group</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph -->
    <p>Me too!</p>
    <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

**Container blocks:** Group, Columns, Cover, Row, Stack

The parsed structure shows the nesting:

```php
[
    'blockName' => 'core/group',
    'attrs' => ['layout' => ['type' => 'constrained']],
    'innerBlocks' => [
        ['blockName' => 'core/heading', ...],
        ['blockName' => 'core/paragraph', ...]
    ]
]
```

Rendering happens recursively—WordPress processes child blocks and inserts their output where `innerContent` specifies.

---

## How do block supports work?

Block supports are reusable features that any block can enable:

```json
// In a block's block.json
{
    "supports": {
        "color": {
            "background": true,
            "text": true
        },
        "spacing": {
            "margin": true,
            "padding": true
        },
        "typography": {
            "fontSize": true,
            "fontFamily": true
        }
    }
}
```

When a block enables these supports, WordPress automatically:

1. Shows the relevant controls in the block sidebar
2. Saves the settings as attributes
3. Generates corresponding CSS classes or inline styles

**Example with supports applied:**

```html
<!-- wp:paragraph {"backgroundColor":"accent-1","fontSize":"large"} -->
<p class="has-accent-1-background-color has-background has-large-font-size">
    Styled with supports
</p>
<!-- /wp:paragraph -->
```

WordPress generated those classes automatically based on the attributes.

---

## What are block styles?

Block styles are visual variations registered for a block:

```html
<!-- wp:quote {"className":"is-style-plain"} -->
<blockquote class="wp-block-quote is-style-plain">
    <p>Quote text here</p>
</blockquote>
<!-- /wp:quote -->
```

The `is-style-{name}` class applies different CSS for each style variation.

**Where styles come from:**

1. **Block's built-in styles** — Defined in the block's JavaScript
2. **Theme's theme.json** — Under `styles.blocks.{block}.variations`
3. **PHP registration** — Using `register_block_style()`

---

## How does the block editor work?

The Gutenberg editor is a React application that provides visual editing:

```
User types/clicks in editor
        ↓
React component updates state
        ↓
Block attributes change
        ↓
Component re-renders with new data
        ↓
Editor preview updates instantly
```

**Two representations always exist:**

1. **Visual** — What you see in the editor (React components)
2. **Serialized** — The block markup that will be saved

When you save, the editor "serializes" the React state back into block markup for storage.

### The edit/save split:

Every block defines two functions:

**edit()** — React component shown in the editor
**save()** — Function that returns the HTML to save

```javascript
// Simplified block definition
registerBlockType('my/block', {
    edit: function(props) {
        // React component for editing
        return <p contentEditable>Edit me</p>;
    },
    save: function(props) {
        // HTML to store in database
        return <p>Saved content</p>;
    }
});
```

For dynamic blocks, `save` returns `null`—there's nothing to store because PHP generates the output.

---

## What happens when blocks break?

If saved markup doesn't match what the current block definition expects, you see a block validation error:

```
⚠️ This block has encountered an error and cannot be previewed.
```

**Common causes:**

1. Block plugin was deactivated
2. Block's `save()` function changed
3. HTML was manually edited incorrectly
4. Block was deprecated without migration

**What WordPress does:**

1. Attempts to recover by running the block's deprecation handlers
2. If recovery fails, offers options: Keep HTML, Convert to Classic Block, or Delete

**Why this matters for themes:**

Template HTML must exactly match block expectations. A misplaced space or wrong attribute can break blocks. This is why themes use patterns—they're tested to produce valid output.

---

## Block categories in Twenty Twenty-Five

The theme organizes its blocks and patterns into categories:

| Category | Examples |
|----------|----------|
| `text` | Paragraph, Heading, List |
| `media` | Image, Gallery, Video |
| `design` | Group, Columns, Cover, Spacer |
| `widgets` | Search, Latest Posts, Navigation |
| `theme` | Template Part, Post Title, Post Content |
| `embed` | YouTube, Twitter, Vimeo |

Theme patterns are categorized separately:
- `featured` — Homepage-ready patterns
- `query` — Post list patterns
- `footer` — Footer patterns
- `header` — Header patterns

---

## Core block reference for themes

These blocks appear frequently in Twenty Twenty-Five templates:

### Structural Blocks

| Block | Markup | Purpose |
|-------|--------|---------|
| Template Part | `wp:template-part` | Include header/footer |
| Pattern | `wp:pattern` | Include pattern |
| Group | `wp:group` | Container for blocks |
| Row | `wp:group` + flex layout | Horizontal layout |
| Stack | `wp:group` + flex layout | Vertical layout |

### Content Blocks

| Block | Markup | Purpose |
|-------|--------|---------|
| Post Title | `wp:post-title` | Display post/page title |
| Post Content | `wp:post-content` | Display post/page body |
| Post Excerpt | `wp:post-excerpt` | Display excerpt |
| Post Featured Image | `wp:post-featured-image` | Display thumbnail |
| Post Date | `wp:post-date` | Display publish date |
| Post Author | `wp:post-author` | Display author info |
| Post Terms | `wp:post-terms` | Display categories/tags |

### Query Blocks

| Block | Markup | Purpose |
|-------|--------|---------|
| Query | `wp:query` | Wrapper for post loop |
| Post Template | `wp:post-template` | Template for each post |
| Query Pagination | `wp:query-pagination` | Navigation links |
| Query Title | `wp:query-title` | Archive title |
| Query No Results | `wp:query-no-results` | Empty state |

---

## Debugging blocks

When troubleshooting template issues:

**1. Check block markup validity**
```html
<!-- Correct: matching open/close -->
<!-- wp:group -->
<div class="wp-block-group"></div>
<!-- /wp:group -->

<!-- Wrong: mismatched -->
<!-- wp:group -->
<div class="wp-block-group"></div>
<!-- /wp:paragraph -->
```

**2. Verify attribute JSON**
```html
<!-- Correct: valid JSON -->
<!-- wp:image {"id":123,"sizeSlug":"large"} -->

<!-- Wrong: invalid JSON (single quotes) -->
<!-- wp:image {'id':123} -->
```

**3. Match HTML to block expectations**
```html
<!-- Correct: paragraph wraps <p> -->
<!-- wp:paragraph -->
<p>Text</p>
<!-- /wp:paragraph -->

<!-- Wrong: paragraph wraps <div> -->
<!-- wp:paragraph -->
<div>Text</div>
<!-- /wp:paragraph -->
```

---

## Related resources

For more information about the concepts covered here:

- [Block Editor Handbook](https://developer.wordpress.org/block-editor/) — Complete block development docs
- [Core Blocks Reference](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/) — List of all core blocks
- [Block Supports](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/) — Available support features
- [Block Grammar](https://developer.wordpress.org/block-editor/explanations/architecture/key-concepts/) — How blocks are parsed
- [Data Flow](https://developer.wordpress.org/block-editor/explanations/architecture/data-flow/) — Editor internals
