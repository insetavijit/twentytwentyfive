# Patterns vs Custom Blocks: When to Use Each

A quick guide to choosing between patterns and custom blocks in WordPress theme development.

---

## At a Glance

| Feature | Pattern | Custom Block |
|---------|---------|--------------|
| Complexity | Low (just markup) | Higher (PHP + JS) |
| Dynamic data | No | Yes |
| Build tools required | No | Usually yes |
| Time to create | Minutes | Hours |
| Reuses core blocks | Yes | No (creates new) |
| Editor controls | Uses block defaults | Fully custom |

---

## When to Use a Pattern

**Patterns are arrangements of existing blocks.** Use them when:

- ✅ You can build it with core blocks (Group, Cover, Columns, etc.)
- ✅ Content is static or user-editable
- ✅ No server-side logic needed
- ✅ You want something quick to create
- ✅ No build tools/bundling required

### Pattern Examples

| Use Case | Why Pattern Works |
|----------|-------------------|
| Hero section | Cover + Heading + Buttons |
| Pricing table | Columns + Groups + Lists |
| Team member cards | Columns + Image + Paragraphs |
| FAQ section | Heading + Details blocks |
| Footer layout | Groups + Navigation + Paragraphs |
| Testimonials | Quote blocks in Columns |

### Creating a Pattern

Just a PHP file:

```php
<?php
/**
 * Title: Hero Section
 * Slug: theme/hero-section
 * Categories: featured
 */
?>
<!-- wp:cover {"dimRatio":50} -->
<div class="wp-block-cover">
    <!-- wp:heading {"level":1} -->
    <h1>Welcome</h1>
    <!-- /wp:heading -->
</div>
<!-- /wp:cover -->
```

**Done.** No build step, no JavaScript, no registration code.

---

## When to Use a Custom Block

**Custom blocks are new block types.** Use them when:

- ✅ Data changes on each page load (dynamic)
- ✅ Core blocks can't do what you need
- ✅ You need custom PHP logic
- ✅ You need a unique editor experience
- ✅ Functionality will be reused across projects

### Custom Block Examples

| Use Case | Why Block Is Needed |
|----------|---------------------|
| Recent posts | PHP queries database each load |
| Current user greeting | Depends on logged-in user |
| Weather widget | Fetches external API data |
| Stock prices | Real-time data |
| Event countdown | Calculates from current time |
| Custom post type grid | Dynamic query |

### Creating a Custom Block

Requires multiple files:

```
blocks/my-block/
├── block.json       ← Metadata
├── render.php       ← PHP rendering
├── index.js         ← Editor UI (needs bundling)
└── style.css        ← Styles
```

Plus registration in `functions.php` and a build step for JavaScript.

---

## Decision Flowchart

```
Can you build it with existing blocks?
│
├── YES → Does data need to be dynamic?
│         │
│         ├── NO → Use a PATTERN ✓
│         │
│         └── YES → Use a CUSTOM BLOCK
│
└── NO → Use a CUSTOM BLOCK
```

---

## Comparison by Criteria

### Development Time

| Approach | Time |
|----------|------|
| Pattern | 5-15 minutes |
| Static block | 1-3 hours |
| Dynamic block | 2-5 hours |

### Technical Requirements

| Aspect | Pattern | Custom Block |
|--------|---------|--------------|
| PHP knowledge | Basic | Intermediate |
| JavaScript | None | Required |
| Build tools | None | Usually (webpack) |
| Block API | None | Required |

### Maintenance

| Aspect | Pattern | Custom Block |
|--------|---------|--------------|
| WordPress updates | Usually fine | May need updates |
| Complexity | Low | Higher |
| Debugging | Easy | Harder |

---

## The Hybrid Approach

**Best of both worlds:** Create custom blocks for dynamic functionality, then use patterns to arrange them with core blocks.

```php
<?php
/**
 * Title: Blog Sidebar
 * Slug: theme/blog-sidebar
 */
?>
<!-- wp:group -->
<div class="wp-block-group">
    <!-- wp:heading -->
    <h2>Recent Posts</h2>
    <!-- /wp:heading -->
    
    <!-- wp:theme/recent-posts {"postsToShow":5} /-->
    
    <!-- wp:heading -->
    <h2>Categories</h2>
    <!-- /wp:heading -->
    
    <!-- wp:categories /-->
</div>
<!-- /wp:group -->
```

The pattern arranges things. The custom block provides dynamic data.

---

## Real-World Decision Examples

| Need | Solution | Reasoning |
|------|----------|-----------|
| Homepage hero | Pattern | Static, uses Cover + Heading + Buttons |
| Latest 5 posts | Custom Block | Dynamic data, PHP query |
| About page layout | Pattern | Static, uses core blocks |
| User dashboard | Custom Block | User-specific data |
| Contact info section | Pattern | Static text + social links |
| Search results count | Custom Block | Dynamic, context-dependent |
| Pricing cards | Pattern | Static, Columns + Groups |
| Live stock ticker | Custom Block | External API, real-time |

---

## Summary

| Start with... | When... |
|---------------|---------|
| **Pattern** | Building layouts with existing blocks |
| **Custom Block** | You need dynamic data or new functionality |

**Rule of thumb:** Try a pattern first. Only build a custom block when patterns can't solve the problem.
