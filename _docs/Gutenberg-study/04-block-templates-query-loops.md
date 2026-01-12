# 04 Block Templates & Query Loops

Control dynamic content using block templates. Learn Query Loop block, post templates, and archive structures. This module replaces classic PHP Loop knowledge for block themes.

---

## 4.1 Page & Single Templates

### page.html - Static Pages

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">
    
    <!-- wp:post-title {"level":1} /-->
    
    <!-- wp:post-featured-image {"align":"wide"} /-->
    
    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->

</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### single.html - Blog Posts

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">

    <!-- wp:post-title {"level":1} /-->
    
    <!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"}} -->
    <div class="wp-block-group">
        <!-- wp:post-date /-->
        <!-- wp:post-author {"showAvatar":false} /-->
        <!-- wp:post-terms {"term":"category"} /-->
    </div>
    <!-- /wp:group -->
    
    <!-- wp:post-featured-image {"align":"wide"} /-->
    
    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->
    
    <!-- wp:separator /-->
    
    <!-- wp:post-terms {"term":"post_tag","prefix":"Tags: "} /-->
    
    <!-- wp:comments /-->

</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### Post Blocks Reference

| Block | Purpose |
|-------|---------|
| `wp:post-title` | Post/page title |
| `wp:post-content` | Main content area |
| `wp:post-excerpt` | Post excerpt |
| `wp:post-date` | Published/modified date |
| `wp:post-author` | Author name/avatar |
| `wp:post-featured-image` | Featured image |
| `wp:post-terms` | Categories/tags |
| `wp:post-navigation-link` | Previous/next post |
| `wp:comments` | Comments section |

---

## 4.2 Archive & Blog Templates

### home.html - Blog Posts Page

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">

    <!-- wp:heading {"level":1} -->
    <h1>Latest Posts</h1>
    <!-- /wp:heading -->

    <!-- wp:query {"queryId":1,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date"}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
            <!-- wp:post-featured-image {"isLink":true} /-->
            <!-- wp:post-title {"isLink":true} /-->
            <!-- wp:post-excerpt /-->
            <!-- wp:post-date /-->
        <!-- /wp:post-template -->
        
        <!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"space-between"}} -->
            <!-- wp:query-pagination-previous /-->
            <!-- wp:query-pagination-numbers /-->
            <!-- wp:query-pagination-next /-->
        <!-- /wp:query-pagination -->
        
        <!-- wp:query-no-results -->
            <!-- wp:paragraph -->
            <p>No posts found.</p>
            <!-- /wp:paragraph -->
        <!-- /wp:query-no-results -->
    </div>
    <!-- /wp:query -->

</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### archive.html - Archive Pages

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">

    <!-- wp:query-title {"type":"archive"} /-->
    
    <!-- wp:term-description /-->

    <!-- wp:query {"queryId":2,"query":{"perPage":12,"inherit":true}} -->
    <div class="wp-block-query">
        <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
            <!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/9"} /-->
            <!-- wp:post-title {"isLink":true,"fontSize":"large"} /-->
            <!-- wp:post-excerpt {"excerptLength":20} /-->
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

### Archive Blocks

| Block | Purpose |
|-------|---------|
| `wp:query-title` | Archive title (uses type: archive, search) |
| `wp:term-description` | Category/tag description |
| `wp:query-no-results` | Content when no posts found |

---

## 4.3 Query Loop Block

### Query Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      wp:query                               │
│  (Defines the query parameters)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                wp:post-template                       │  │
│  │  (Loops through each post)                            │  │
│  │                                                       │  │
│  │    ┌─────────────────────────────────────────────┐   │  │
│  │    │  Post 1                                     │   │  │
│  │    │  wp:post-title, wp:post-excerpt, etc.      │   │  │
│  │    └─────────────────────────────────────────────┘   │  │
│  │    ┌─────────────────────────────────────────────┐   │  │
│  │    │  Post 2                                     │   │  │
│  │    │  wp:post-title, wp:post-excerpt, etc.      │   │  │
│  │    └─────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               wp:query-pagination                     │  │
│  │  (Previous, Numbers, Next)                            │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │               wp:query-no-results                     │  │
│  │  (Fallback content)                                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Query Parameters

```html
<!-- wp:query {
    "queryId": 1,
    "query": {
        "perPage": 10,
        "pages": 0,
        "offset": 0,
        "postType": "post",
        "order": "desc",
        "orderBy": "date",
        "author": "",
        "search": "",
        "exclude": [],
        "sticky": "",
        "inherit": false,
        "taxQuery": null,
        "parents": []
    }
} -->
```

| Parameter | Values | Purpose |
|-----------|--------|---------|
| `perPage` | number | Posts per page |
| `postType` | "post", "page", "cpt-slug" | Content type |
| `order` | "asc", "desc" | Sort direction |
| `orderBy` | "date", "title", "modified", "rand" | Sort field |
| `sticky` | "", "only", "exclude" | Sticky post handling |
| `inherit` | true/false | Inherit from URL (archives) |

### Custom Queries

**Latest 3 Posts from Category:**
```html
<!-- wp:query {"query":{"perPage":3,"postType":"post","taxQuery":{"category":[5]}}} -->
```

**Random Posts:**
```html
<!-- wp:query {"query":{"perPage":4,"orderBy":"rand"}} -->
```

**Exclude Sticky Posts:**
```html
<!-- wp:query {"query":{"perPage":10,"sticky":"exclude"}} -->
```

---

## 4.4 Post Template Block

### Layout Options

**List Layout (default):**
```html
<!-- wp:post-template -->
    <!-- Inner blocks -->
<!-- /wp:post-template -->
```

**Grid Layout:**
```html
<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
    <!-- Inner blocks -->
<!-- /wp:post-template -->
```

**Constrained Layout:**
```html
<!-- wp:post-template {"layout":{"type":"constrained"}} -->
    <!-- Inner blocks -->
<!-- /wp:post-template -->
```

### Card-Style Post Layout

```html
<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->

    <!-- wp:group {"style":{"border":{"radius":"8px"},"spacing":{"padding":{"bottom":"var:preset|spacing|40"}}},"backgroundColor":"surface"} -->
    <div class="wp-block-group">
        
        <!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/9","style":{"border":{"radius":{"topLeft":"8px","topRight":"8px"}}}} /-->
        
        <!-- wp:group {"style":{"spacing":{"padding":{"right":"var:preset|spacing|40","left":"var:preset|spacing|40"}}}} -->
        <div class="wp-block-group">
            <!-- wp:post-terms {"term":"category","fontSize":"small"} /-->
            <!-- wp:post-title {"isLink":true,"level":3} /-->
            <!-- wp:post-excerpt {"excerptLength":15} /-->
            <!-- wp:post-date {"fontSize":"small"} /-->
        </div>
        <!-- /wp:group -->
        
    </div>
    <!-- /wp:group -->

<!-- /wp:post-template -->
```

---

## 4.5 Navigation Block

### Basic Navigation

```html
<!-- wp:navigation {"ref":123} /-->
```

The `ref` refers to a saved navigation menu ID.

### Inline Navigation Links

```html
<!-- wp:navigation {"layout":{"type":"flex","justifyContent":"center"}} -->
    <!-- wp:navigation-link {"label":"Home","url":"/","kind":"custom"} /-->
    <!-- wp:navigation-link {"label":"About","url":"/about","kind":"custom"} /-->
    <!-- wp:navigation-link {"label":"Services","url":"/services","kind":"custom"} /-->
    <!-- wp:navigation-link {"label":"Blog","url":"/blog","kind":"custom"} /-->
    <!-- wp:navigation-link {"label":"Contact","url":"/contact","kind":"custom"} /-->
<!-- /wp:navigation -->
```

### Navigation with Submenu

```html
<!-- wp:navigation -->
    <!-- wp:navigation-link {"label":"Products","url":"/products"} -->
        <!-- wp:navigation-link {"label":"Category A","url":"/products/category-a"} /-->
        <!-- wp:navigation-link {"label":"Category B","url":"/products/category-b"} /-->
    <!-- /wp:navigation-link -->
<!-- /wp:navigation -->
```

### Navigation Attributes

```html
<!-- wp:navigation {
    "ref": 123,
    "textColor": "foreground",
    "backgroundColor": "background",
    "overlayMenu": "mobile",
    "icon": "menu",
    "layout": {
        "type": "flex",
        "justifyContent": "right"
    },
    "style": {
        "spacing": {
            "blockGap": "var:preset|spacing|40"
        }
    }
} /-->
```

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `overlayMenu` | "mobile", "always", "never" | When to show hamburger |
| `icon` | "menu", "close" | Hamburger icon style |
| `hasIcon` | true/false | Show icon for submenu |

---

## 4.6 Header/Footer Template Parts

### Header Pattern Examples

**Simple Header:**
```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|30","bottom":"var:preset|spacing|30"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:site-logo {"width":48} /-->
        <!-- wp:site-title {"level":0} /-->
        <!-- wp:navigation {"overlayMenu":"mobile"} /-->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
```

**Sticky Header:**
```html
<!-- wp:group {"style":{"position":{"type":"sticky","top":"0px"}},"backgroundColor":"background","layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- Header content -->
</div>
<!-- /wp:group -->
```

**Header with CTA:**
```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:site-title /-->
        <!-- wp:navigation /-->
        <!-- wp:buttons -->
        <div class="wp-block-buttons">
            <!-- wp:button {"className":"is-style-outline"} -->
            <div class="wp-block-button is-style-outline"><a class="wp-block-button__link">Get Started</a></div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
```

### Footer Pattern Examples

**Multi-Column Footer:**
```html
<!-- wp:group {"backgroundColor":"foreground","textColor":"background","layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:columns -->
    <div class="wp-block-columns">
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:site-title /-->
            <!-- wp:paragraph -->
            <p>Brief description of your site.</p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:heading {"level":4} -->
            <h4>Quick Links</h4>
            <!-- /wp:heading -->
            <!-- wp:navigation {"layout":{"type":"flex","orientation":"vertical"}} /-->
        </div>
        <!-- /wp:column -->
        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:heading {"level":4} -->
            <h4>Contact</h4>
            <!-- /wp:heading -->
            <!-- wp:paragraph -->
            <p>email@example.com</p>
            <!-- /wp:paragraph -->
        </div>
        <!-- /wp:column -->
    </div>
    <!-- /wp:columns -->
    
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"center"}} -->
    <div class="wp-block-group">
        <!-- wp:paragraph {"fontSize":"small"} -->
        <p class="has-small-font-size">© 2025 All rights reserved.</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->
```

---

## 4.7 Template Locking & Permissions

### Block Locking

Lock blocks to prevent editing:

```html
<!-- wp:group {"lock":{"move":true,"remove":true}} -->
```

**Lock Types:**
| Lock | Effect |
|------|--------|
| `move` | Prevent moving |
| `remove` | Prevent deleting |
| Both | Fully locked |

### Template-Level Locking

```html
<!-- wp:group {"templateLock":"all"} -->
```

**templateLock Values:**
| Value | Effect |
|-------|--------|
| `"all"` | No adding, removing, or moving |
| `"insert"` | No adding blocks |
| `"contentOnly"` | Only edit text content |
| `false` | No restrictions |

### Content-Only Editing

For client-safe templates:

```html
<!-- wp:group {"templateLock":"contentOnly"} -->
<div class="wp-block-group">
    <!-- wp:heading -->
    <h2>Editable Title</h2>
    <!-- /wp:heading -->
    <!-- wp:paragraph -->
    <p>Editable text only - structure is locked.</p>
    <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

---

## 4.8 Project: Blog & Archive Theme

### Objective

Build a complete blog system with custom templates and query loops.

### File Structure

```
blog-theme/
├── style.css
├── theme.json
├── templates/
│   ├── index.html
│   ├── home.html       # Blog listing
│   ├── single.html     # Single post
│   ├── archive.html    # Category/tag archives
│   ├── search.html     # Search results
│   └── 404.html        # Not found
└── parts/
    ├── header.html
    ├── footer.html
    └── post-meta.html  # Reusable post metadata
```

### templates/home.html

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">

    <!-- Featured Post -->
    <!-- wp:query {"query":{"perPage":1,"sticky":"only"}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
            <!-- wp:cover {"useFeaturedImage":true,"dimRatio":50,"minHeight":400,"isDark":true} -->
            <div class="wp-block-cover is-dark">
                <span class="wp-block-cover__background has-background-dim-50"></span>
                <div class="wp-block-cover__inner-container">
                    <!-- wp:post-title {"isLink":true,"level":1,"textColor":"white"} /-->
                    <!-- wp:post-excerpt {"textColor":"white"} /-->
                </div>
            </div>
            <!-- /wp:cover -->
        <!-- /wp:post-template -->
    </div>
    <!-- /wp:query -->

    <!-- wp:spacer {"height":"40px"} -->
    <div style="height:40px" class="wp-block-spacer"></div>
    <!-- /wp:spacer -->

    <!-- Regular Posts Grid -->
    <!-- wp:query {"query":{"perPage":9,"sticky":"exclude"}} -->
    <div class="wp-block-query">
        <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
            <!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/9"} /-->
            <!-- wp:post-terms {"term":"category","fontSize":"small"} /-->
            <!-- wp:post-title {"isLink":true,"level":3} /-->
            <!-- wp:post-date {"fontSize":"small"} /-->
        <!-- /wp:post-template -->
        
        <!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"center"}} -->
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

### templates/single.html

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">

    <!-- wp:post-terms {"term":"category","separator":" · "} /-->
    
    <!-- wp:post-title {"level":1} /-->
    
    <!-- wp:template-part {"slug":"post-meta"} /-->
    
    <!-- wp:post-featured-image {"align":"wide"} /-->
    
    <!-- wp:post-content {"layout":{"type":"constrained"}} /-->
    
    <!-- wp:separator {"className":"is-style-wide"} -->
    <hr class="wp-block-separator is-style-wide"/>
    <!-- /wp:separator -->
    
    <!-- wp:post-terms {"term":"post_tag","prefix":"Tagged: "} /-->
    
    <!-- Post Navigation -->
    <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
    <div class="wp-block-group">
        <!-- wp:post-navigation-link {"type":"previous","label":"Previous Post"} /-->
        <!-- wp:post-navigation-link {"label":"Next Post"} /-->
    </div>
    <!-- /wp:group -->
    
    <!-- wp:comments /-->

</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### parts/post-meta.html

```html
<!-- wp:group {"layout":{"type":"flex","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"fontSize":"small","textColor":"muted"} -->
<div class="wp-block-group">
    <!-- wp:post-author {"showAvatar":true,"avatarSize":32} /-->
    <!-- wp:paragraph -->
    <p>·</p>
    <!-- /wp:paragraph -->
    <!-- wp:post-date /-->
    <!-- wp:paragraph -->
    <p>·</p>
    <!-- /wp:paragraph -->
    <!-- wp:paragraph -->
    <p>5 min read</p>
    <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

### templates/search.html

```html
<!-- wp:template-part {"slug":"header","tagName":"header"} /-->

<!-- wp:group {"tagName":"main","layout":{"type":"constrained"}} -->
<main class="wp-block-group">

    <!-- wp:query-title {"type":"search"} /-->
    
    <!-- wp:search {"showLabel":false,"buttonText":"Search","buttonPosition":"button-inside"} /-->
    
    <!-- wp:query {"query":{"inherit":true}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
            <!-- wp:post-title {"isLink":true} /-->
            <!-- wp:post-excerpt {"moreText":"Continue reading →"} /-->
        <!-- /wp:post-template -->
        
        <!-- wp:query-pagination -->
            <!-- wp:query-pagination-previous /-->
            <!-- wp:query-pagination-numbers /-->
            <!-- wp:query-pagination-next /-->
        <!-- /wp:query-pagination -->
        
        <!-- wp:query-no-results -->
            <!-- wp:paragraph -->
            <p>No results found. Try a different search term.</p>
            <!-- /wp:paragraph -->
        <!-- /wp:query-no-results -->
    </div>
    <!-- /wp:query -->

</main>
<!-- /wp:group -->

<!-- wp:template-part {"slug":"footer","tagName":"footer"} /-->
```

### Verification Checklist

- [ ] Blog listing shows featured post + grid
- [ ] Single post template displays correctly
- [ ] Categories/tags link to archive pages
- [ ] Pagination works on blog and archives
- [ ] Search results display correctly
- [ ] 404 page appears for missing content
- [ ] Post navigation (previous/next) works
- [ ] Comments section appears on posts

---

## Summary

| Topic | Key Blocks/Concepts |
|-------|---------------------|
| Page/Single | `wp:post-title`, `wp:post-content`, `wp:post-featured-image` |
| Archives | `wp:query-title`, `wp:term-description`, `inherit: true` |
| Query Loop | `wp:query` → `wp:post-template` → `wp:query-pagination` |
| Post Template | Grid/list layouts, card-style designs |
| Navigation | `wp:navigation`, submenu, overlay options |
| Header/Footer | Sticky positioning, multi-column layouts |
| Locking | `templateLock`, `lock` for client-safe templates |

---

## Next Module

**[[05 Block Patterns & Reusable Layouts]]** - Develop reusable design patterns for accelerated site building.
