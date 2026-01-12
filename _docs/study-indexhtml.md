# Understanding Twenty Twenty-Five's Templates

This file explains how WordPress block theme templates work, using the `templates/` folder as our guide. Let's walk through what each piece does and why it matters.

---

## Quick Overview

| Template File | Purpose |
|---------------|---------|
| `index.html` | The fallback template for all pages |
| `home.html` | Blog homepage template |
| `page.html` | Static page template |
| `single.html` | Single post template |
| `archive.html` | Archive/category listing page |
| `search.html` | Search results page |
| `404.html` | Page not found template |

---

## What is a template?

In block themes, templates are `.html` files that define page layouts using block markup. Unlike classic PHP templates, these files contain WordPress block comments that define structure, styling, and content placement.

Think of templates as blueprints. They tell WordPress what blocks to display, in what order, and with what settings. The actual content comes from the database—the template just defines where it goes.

Every block theme needs at least one template: `index.html`. This is the ultimate fallback that WordPress uses when no more specific template exists.

---

## How does template hierarchy work in block themes?

WordPress uses the same template hierarchy as classic themes, but with `.html` files:

```
single-{post-type}.html
        ↓
    single.html
        ↓
  singular.html
        ↓
    index.html
```

For a single blog post, WordPress looks for templates in this order:
1. `single-post.html` (specific post type)
2. `single.html` (any single post)
3. `singular.html` (any singular content)
4. `index.html` (final fallback)

This means your `index.html` catches everything that doesn't have a more specific template.

---

## What is the index.html template structure?

```html
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:group {"tagName":"main","style":{"spacing":{"margin":{"top":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<main class="wp-block-group" style="margin-top:var(--wp--preset--spacing--60)">
	<!-- wp:pattern {"slug":"twentytwentyfive/hidden-blog-heading"} /-->
	<!-- wp:pattern {"slug":"twentytwentyfive/template-query-loop"} /-->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer"} /-->
```

This template has three main sections. Let's break down each one.

---

## How do template parts work?

```html
<!-- wp:template-part {"slug":"header"} /-->
```

Template parts are reusable sections stored in the `parts/` folder. The `slug` attribute tells WordPress which file to load.

**Why use template parts?**

- **Consistency** — Change the header once, it updates everywhere
- **Simplicity** — Templates stay focused on unique content
- **User control** — Users can swap parts in the Site Editor

In Twenty Twenty-Five, the header template part is minimal:

```html
<!-- wp:pattern {"slug":"twentytwentyfive/header"} /-->
```

The part itself just references a pattern. This extra layer allows users to customize the header in the Site Editor without modifying the pattern file directly.

**Available template parts:**

| Part | File | Purpose |
|------|------|---------|
| header | `parts/header.html` | Site header |
| footer | `parts/footer.html` | Site footer |
| vertical-header | `parts/vertical-header.html` | Side navigation |
| sidebar | `parts/sidebar.html` | Widget sidebar |

---

## How does the group block structure content?

```html
<!-- wp:group {"tagName":"main","style":{"spacing":{"margin":{"top":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<main class="wp-block-group" style="margin-top:var(--wp--preset--spacing--60)">
	<!-- content blocks here -->
</main>
<!-- /wp:group -->
```

The Group block is the primary wrapper in templates. Let's understand each attribute:

**tagName: "main"** — Tells WordPress to output a `<main>` element instead of the default `<div>`. This improves accessibility and semantics.

**style.spacing.margin** — Applies spacing using `theme.json` presets. The `var:preset|spacing|60` syntax references the spacing preset with slug "60" from your theme.json file.

**layout.type: "constrained"** — Limits content width based on `theme.json` layout settings (645px for content, 1340px for wide). Inner blocks respect these constraints.

### What layout types are available?

| Type | Behavior |
|------|----------|
| `constrained` | Respects contentSize and wideSize from theme.json |
| `flow` | No width constraints, blocks stack vertically |
| `flex` | Flexbox layout for horizontal arrangements |
| `grid` | CSS Grid layout for grid-based designs |

---

## How do patterns work in templates?

```html
<!-- wp:pattern {"slug":"twentytwentyfive/hidden-blog-heading"} /-->
```

Patterns are predefined block layouts stored in the `patterns/` folder. Unlike template parts, patterns copy their content into the template—they're not linked.

The pattern slug follows this format: `{theme-slug}/{pattern-name}`

**Looking at hidden-blog-heading.php:**

```php
<?php
/**
 * Title: Hidden blog heading
 * Slug: twentytwentyfive/hidden-blog-heading
 * Description: Hidden heading for the home page and index template.
 * Inserter: no
 */
?>
<!-- wp:heading {"textAlign":"left","level":1} -->
<h1 class="wp-block-heading has-text-align-left"><?php esc_html_e( 'Blog', 'twentytwentyfive' ); ?></h1>
<!-- /wp:heading -->
```

**Pattern metadata:**
- `Title` — Display name in the inserter
- `Slug` — Unique identifier for referencing
- `Inserter: no` — Hides from block inserter (utility pattern)

**Why use "hidden" patterns?**

Hidden patterns (prefixed with `hidden-`) exist only for templates to reference. They don't clutter the block inserter. This keeps utility blocks organized while letting templates compose complex layouts from simple pieces.

---

## What is the Query Loop pattern?

```html
<!-- wp:pattern {"slug":"twentytwentyfive/template-query-loop"} /-->
```

This pattern contains the Query block that displays posts:

```html
<!-- wp:query {"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":true,"taxQuery":null,"parents":[]},"align":"full","layout":{"type":"default"}} -->
<div class="wp-block-query alignfull">
	<!-- wp:post-template {"align":"full","layout":{"type":"default"}} -->
		<!-- Post content blocks -->
	<!-- /wp:post-template -->
	<!-- wp:query-pagination -->
	<!-- /wp:query-pagination -->
</div>
<!-- /wp:query -->
```

**Key Query parameters:**

| Parameter | Value | Purpose |
|-----------|-------|---------|
| `perPage` | 3 | Posts to show per page |
| `postType` | "post" | Content type to query |
| `inherit` | true | Uses main query (respects URL context) |
| `order` | "desc" | Newest first |

**inherit: true** — This is crucial. When `true`, the Query block uses WordPress's main query instead of a custom one. This means the template automatically works for archives, searches, and categories without extra configuration.

---

## How does the page template differ?

```html
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:group {"tagName":"main",...} -->
<main class="wp-block-group" ...>
	<!-- wp:group {"align":"full",...} -->
	<div class="wp-block-group alignfull" ...>
		<!-- wp:post-featured-image {...} /-->
		<!-- wp:post-title {"level":1} /-->
		<!-- wp:post-content {"align":"full","layout":{"type":"constrained"}} /-->
	</div>
	<!-- /wp:group -->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer"} /-->
```

Page templates use **post blocks** instead of Query blocks:

- `wp:post-featured-image` — Displays the page's featured image
- `wp:post-title` — Shows the page title
- `wp:post-content` — Renders the page's block content

**Why nested groups?**

The outer group creates the page structure with main element. The inner `alignfull` group adds vertical padding while allowing blocks inside to stretch edge-to-edge if needed.

---

## How does single.html handle blog posts?

```html
<!-- wp:post-title {"level":1} /-->
<!-- wp:post-featured-image {"aspectRatio":"3/2"} /-->
<!-- wp:pattern {"slug":"twentytwentyfive/hidden-written-by"} /-->
<!-- wp:post-content {"align":"full","layout":{"type":"constrained"}} /-->
<!-- wp:post-terms {"term":"post_tag",...} /-->
<!-- wp:pattern {"slug":"twentytwentyfive/post-navigation"} /-->
<!-- wp:pattern {"slug":"twentytwentyfive/comments"} /-->
<!-- wp:pattern {"slug":"twentytwentyfive/more-posts"} /-->
```

Single post templates include:

1. **Post meta** — Title, image, author info
2. **Content** — The actual post content
3. **Taxonomy** — Tags or categories
4. **Navigation** — Previous/next post links
5. **Comments** — Comment form and list
6. **Related content** — More posts section

**aspectRatio: "3/2"** — Forces featured images to maintain a 3:2 ratio regardless of uploaded dimensions. This creates visual consistency across the site.

---

## What makes archive.html unique?

```html
<!-- wp:query-title {"type":"archive"} /-->
<!-- wp:term-description /-->
<!-- wp:pattern {"slug":"twentytwentyfive/template-query-loop"} /-->
```

Archive templates display lists of posts filtered by category, tag, author, or date.

**wp:query-title** — Automatically generates titles like "Category: News" or "Tag: WordPress". The `type` attribute tells it what kind of archive to display.

**wp:term-description** — Shows the category or tag description if one exists.

The same Query Loop pattern handles the post list—no duplication needed.

---

## How does 404.html handle errors?

```html
<!-- wp:group {"tagName":"main","style":{"spacing":{"padding":{...}}},"layout":{"type":"default"}} -->
<main class="wp-block-group" ...>
	<!-- wp:pattern {"slug":"twentytwentyfive/hidden-404"} /-->
</main>
<!-- /wp:group -->
```

The 404 template differs in two ways:

1. **layout: "default"** — No width constraints; content fills the viewport
2. **All-sides padding** — Creates a centered, contained feel

The `hidden-404` pattern contains the actual error message and search form—keeping the template clean and the content easy to customize.

---

## What are the block markup rules?

Block markup follows a specific format:

```html
<!-- wp:block-name {"attribute":"value"} -->
<html-element class="wp-block-name">
	Content or nested blocks
</html-element>
<!-- /wp:block-name -->
```

**Self-closing blocks** (no content inside):
```html
<!-- wp:post-title {"level":1} /-->
```

**Container blocks** (has content):
```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
	<!-- nested blocks -->
</div>
<!-- /wp:group -->
```

### Important markup rules:

1. **Opening comment must match closing** — `<!-- wp:group -->` needs `<!-- /wp:group -->`
2. **HTML must have correct classes** — The `wp-block-{name}` class is required
3. **Attributes in JSON format** — Proper JSON syntax in the opening comment
4. **Proper nesting** — Blocks must close in reverse order of opening

---

## How do I reference theme.json values?

Templates use the same preset references as theme.json:

```html
style="margin-top:var(--wp--preset--spacing--60)"
```

In block attributes:
```json
{"style":{"spacing":{"margin":{"top":"var:preset|spacing|60"}}}}
```

Both syntaxes reference the same value—spacing preset "60" from your theme.json. The CSS variable format appears in rendered HTML, while the shortened format appears in block attributes.

---

## How do templates, parts, and patterns relate?

```
template (index.html)
    │
    ├── template-part (header)
    │       └── pattern (header)
    │
    ├── pattern (hidden-blog-heading)
    │
    ├── pattern (template-query-loop)
    │       └── posts (from database)
    │
    └── template-part (footer)
            └── pattern (footer)
```

**Templates** define page structure
**Template Parts** are reusable, user-editable sections
**Patterns** are predefined block layouts (copied, not linked)

---

## What are the required vs optional templates?

**Required:**
- `index.html` — The fallback template

**Recommended:**
- `single.html` — Single posts
- `page.html` — Static pages
- `archive.html` — Taxonomy archives
- `search.html` — Search results
- `404.html` — Not found page
- `home.html` — Blog homepage

**Optional (for specific post types):**
- `single-{post-type}.html` — Custom post type single view
- `archive-{post-type}.html` — Custom post type archive

---

## Common template blocks reference

| Block | Purpose | Example |
|-------|---------|---------|
| `wp:template-part` | Include reusable section | `{"slug":"header"}` |
| `wp:pattern` | Include block pattern | `{"slug":"theme/pattern-name"}` |
| `wp:group` | Container wrapper | `{"tagName":"main","layout":{...}}` |
| `wp:query` | Post loop | `{"query":{"perPage":10}}` |
| `wp:post-template` | Loop iteration template | Inside wp:query |
| `wp:post-title` | Display post/page title | `{"level":1}` |
| `wp:post-content` | Display post/page content | `{"layout":{"type":"constrained"}}` |
| `wp:post-featured-image` | Display featured image | `{"aspectRatio":"16/9"}` |
| `wp:post-date` | Display publish date | `{"format":"F j, Y"}` |
| `wp:post-excerpt` | Display excerpt | `{"moreText":"Read more"}` |
| `wp:post-terms` | Display categories/tags | `{"term":"post_tag"}` |
| `wp:query-title` | Archive title | `{"type":"archive"}` |
| `wp:query-pagination` | Pagination links | In query loop |

---

## Related resources

For more information about the concepts covered here:

- [Block Theme Templates](https://developer.wordpress.org/themes/templates/) — Official documentation
- [Template Hierarchy](https://developer.wordpress.org/themes/templates/template-hierarchy/) — How WordPress chooses templates
- [Template Parts](https://developer.wordpress.org/themes/templates/template-parts/) — Creating reusable sections
- [Block Patterns](https://developer.wordpress.org/themes/features/block-patterns/) — Creating pattern files
- [Block Markup](https://developer.wordpress.org/block-editor/explanations/architecture/data-flow/) — How blocks are stored
