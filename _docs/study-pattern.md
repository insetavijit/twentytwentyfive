# Understanding WordPress Block Patterns

This guide explains how patterns work in WordPress Full Site Editing themes, using Twenty Twenty-Five as a reference.

---

## Quick Overview

| Concept | Description |
|---------|-------------|
| Pattern | A pre-designed arrangement of blocks |
| Pattern file | PHP file in `patterns/` folder |
| Slug | Unique identifier (`theme-name/pattern-name`) |
| Category | Grouping for the pattern inserter |
| Block Types | Associates pattern with specific blocks |
| Inserter | Controls visibility in block inserter |

---

## What is a pattern?

A pattern is a reusable collection of blocks—like a template for common layouts. Instead of building a hero section from scratch each time, you insert a pattern and customize it.

**Examples:**
- Headers and footers
- Hero sections
- Pricing tables
- Team member cards
- FAQ accordions

---

## Pattern vs Template Part

These are often confused. Here's the key difference:

| Feature | Pattern | Template Part |
|---------|---------|---------------|
| Copied on insert | Yes (in post editor) | No (stays as reference) |
| User can edit globally | No | Yes (Site Editor) |
| Creates wrapper element | No | Optional (header, footer, etc.) |
| Syncs changes | Only in templates | Always |
| Stored in | `patterns/` folder | `parts/` folder |

**When a pattern is inserted in the post editor**, its blocks are copied into your content. Changes to the original pattern don't affect already-inserted instances.

**In templates**, patterns work differently—they're included by reference and render fresh each time.

---

## Anatomy of a Pattern File

Every pattern file has two parts:

### 1. PHP Header (metadata)

```php
<?php
/**
 * Title: Header
 * Slug: twentytwentyfive/header
 * Categories: header
 * Block Types: core/template-part/header
 * Description: Site header with site title and navigation.
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_Five
 * @since Twenty Twenty-Five 1.0
 */
?>
```

### 2. Block Markup (content)

```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:site-title /-->
    <!-- wp:navigation /-->
</div>
<!-- /wp:group -->
```

---

## Pattern Header Fields

| Field | Required | Description |
|-------|----------|-------------|
| `Title` | Yes | Display name in inserter |
| `Slug` | Yes | Unique ID: `theme-name/pattern-name` |
| `Categories` | No | Groupings (header, footer, featured, etc.) |
| `Block Types` | No | Associates with specific blocks |
| `Description` | No | Tooltip text in inserter |
| `Inserter` | No | `no` hides from inserter |
| `Keywords` | No | Search terms for pattern |
| `Viewport Width` | No | Preview width in inserter |

### Example: Hidden Pattern

```php
<?php
/**
 * Title: 404
 * Slug: twentytwentyfive/hidden-404
 * Inserter: no
 */
?>
```

Setting `Inserter: no` hides the pattern from the inserter. It can still be used via `<!-- wp:pattern {"slug":"..."} /-->` in templates.

---

## Categories

Patterns are grouped by category in the inserter:

**Built-in categories:**
- `featured` — Highlighted patterns
- `header` — Site headers
- `footer` — Site footers
- `query` — Post loops
- `text` — Text-focused patterns
- `gallery` — Image galleries
- `call-to-action` — CTAs
- `banner` — Promotional banners
- `posts` — Blog post patterns

**Custom categories** can be registered in `functions.php`:

```php
register_block_pattern_category(
    'twentytwentyfive_page',
    array(
        'label'       => __( 'Pages', 'twentytwentyfive' ),
        'description' => __( 'A collection of full page layouts.', 'twentytwentyfive' ),
    )
);
```

---

## Block Types Association

The `Block Types` field connects patterns to specific blocks:

```php
/**
 * Block Types: core/template-part/header
 */
```

This means: when editing a header template part, this pattern appears in suggestions.

**Common block type associations:**

| Block Type | Where it appears |
|------------|------------------|
| `core/template-part/header` | Header template part editing |
| `core/template-part/footer` | Footer template part editing |
| `core/post-content` | Post content editing |
| `core/query` | Query block variations |

---

## Using PHP in Patterns

Patterns are PHP files, so you can use dynamic content:

### Translatable Strings

```php
<!-- wp:paragraph -->
<p><?php esc_html_e( 'Welcome to our site', 'twentytwentyfive' ); ?></p>
<!-- /wp:paragraph -->
```

### Theme Assets

```php
<!-- wp:image -->
<figure class="wp-block-image">
    <img src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/hero.webp" alt="" />
</figure>
<!-- /wp:image -->
```

### Conditional Content

```php
<?php if ( is_user_logged_in() ) : ?>
    <!-- wp:paragraph -->
    <p>Welcome back!</p>
    <!-- /wp:paragraph -->
<?php endif; ?>
```

### Dynamic Links

```php
<!-- wp:navigation-link {"label":"<?php esc_attr_e( 'Blog', 'twentytwentyfive' ); ?>","url":"#"} /-->
```

---

## Pattern Naming Conventions

Twenty Twenty-Five uses clear naming:

| Prefix | Purpose | Example |
|--------|---------|---------|
| `header-` | Header variations | `header-centered.php` |
| `footer-` | Footer variations | `footer-columns.php` |
| `hero-` | Hero sections | `hero-book.php` |
| `cta-` | Call-to-action | `cta-newsletter.php` |
| `template-` | For use in templates | `template-query-loop.php` |
| `hidden-` | Hidden from inserter | `hidden-404.php` |
| `page-` | Full page layouts | `page-cv-bio.php` |
| `banner-` | Banner sections | `banner-intro.php` |

---

## Inserting Patterns in Templates

In template files (`.html`), reference patterns with:

```html
<!-- wp:pattern {"slug":"twentytwentyfive/header"} /-->
```

WordPress replaces this with the pattern's blocks at render time.

**Example template structure:**

```html
<!-- wp:template-part {"slug":"header"} /-->

<!-- wp:group {"tagName":"main"} -->
<main class="wp-block-group">
    <!-- wp:pattern {"slug":"twentytwentyfive/template-query-loop"} /-->
</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer"} /-->
```

---

## Creating a New Pattern

### Step 1: Create the file

```
patterns/my-custom-hero.php
```

### Step 2: Add the header

```php
<?php
/**
 * Title: Custom Hero
 * Slug: twentytwentyfive/my-custom-hero
 * Categories: featured, banner
 * Description: A hero section with heading and call-to-action.
 */
?>
```

### Step 3: Add block markup

```html
<!-- wp:cover {"dimRatio":50,"minHeight":500} -->
<div class="wp-block-cover" style="min-height:500px">
    <span class="wp-block-cover__background has-background-dim-50 has-background-dim"></span>
    <div class="wp-block-cover__inner-container">
        <!-- wp:heading {"textAlign":"center","level":1} -->
        <h1 class="wp-block-heading has-text-align-center">
            <?php esc_html_e( 'Welcome to Our Site', 'twentytwentyfive' ); ?>
        </h1>
        <!-- /wp:heading -->
        
        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
        <div class="wp-block-buttons">
            <!-- wp:button -->
            <div class="wp-block-button">
                <a class="wp-block-button__link wp-element-button">
                    <?php esc_html_e( 'Get Started', 'twentytwentyfive' ); ?>
                </a>
            </div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
    </div>
</div>
<!-- /wp:cover -->
```

### Step 4: Done!

WordPress automatically discovers patterns in the `patterns/` folder.

---

## Pattern Categories in Twenty Twenty-Five

The theme organizes its 98 patterns into groups:

| Category | Example Patterns |
|----------|------------------|
| header | header.php, header-centered.php, header-large-title.php |
| footer | footer.php, footer-columns.php, footer-newsletter.php |
| featured | hero-book.php, hero-podcast.php |
| page | page-cv-bio.php, page-portfolio-home.php |
| query | template-query-loop.php variants |
| hidden | hidden-404.php, hidden-search.php |

---

## Debugging Patterns

### Pattern not showing?

1. **Check the slug** — Must be unique and match the theme name
2. **Check `Inserter`** — Make sure it's not set to `no`
3. **Check syntax** — PHP errors will break the pattern
4. **Check categories** — Use valid category names

### Preview issues?

1. **Check block markup** — Invalid markup breaks patterns
2. **Check attribute JSON** — Must be valid JSON with double quotes
3. **Check closing tags** — All `<!-- wp:block -->` need `<!-- /wp:block -->`

### Enable debugging

Add to `wp-config.php`:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
```

Then check `wp-content/debug.log` for errors.

---

## Best Practices

### 1. Use semantic structure

```html
<!-- Good: Clear nesting -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:heading -->
    <h2>Title</h2>
    <!-- /wp:heading -->
</div>
<!-- /wp:group -->

<!-- Bad: Flat structure with no grouping -->
<!-- wp:heading -->
<h2>Title</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Text</p>
<!-- /wp:paragraph -->
```

### 2. Use theme.json spacing tokens

```html
<!-- Good: Uses theme spacing -->
{"style":{"spacing":{"padding":{"top":"var:preset|spacing|50"}}}}

<!-- Bad: Hard-coded values -->
{"style":{"spacing":{"padding":{"top":"2rem"}}}}
```

### 3. Make text translatable

```php
<!-- Good -->
<p><?php esc_html_e( 'Hello', 'theme-name' ); ?></p>

<!-- Bad -->
<p>Hello</p>
```

### 4. Escape all output

```php
<!-- Good -->
<?php echo esc_url( get_template_directory_uri() ); ?>
<?php echo esc_html( $text ); ?>
<?php echo esc_attr( $attribute ); ?>

<!-- Bad: Direct output -->
<?php echo $whatever; ?>
```

---

## Related Resources

- [Block Patterns Documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/)
- [Theme.json Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)
- [Core Block Reference](https://developer.wordpress.org/block-editor/reference-guides/core-blocks/)
- [Pattern Directory](https://wordpress.org/patterns/)
