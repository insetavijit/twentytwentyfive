# Activity: Creating a Dynamic Block (Recent Posts)

This document walks through the step-by-step process of creating a dynamic WordPress block that displays recent post titles.

---

## Goal

Create a dynamic block called "Recent Posts" that:
- Displays a configurable number of post titles (default: 5)
- Shows post dates (optional)
- Allows filtering by category
- Renders via PHP on each page load

---

## Step 1: Create the Folder Structure

Dynamic blocks need their own folder with specific files:

```
twentytwentyfive/
└── blocks/
    └── recent-posts/
        ├── block.json      ← Block metadata
        ├── render.php      ← PHP rendering template
        ├── index.js        ← Editor UI (React)
        └── style.css       ← Frontend styles
```

**Why this structure?**
- WordPress 6.1+ automatically loads `render.php` when specified in `block.json`
- Each file has a single responsibility
- The `blocks/` folder keeps custom blocks organized

---

## Step 2: Define block.json

The `block.json` file is the block's identity card:

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "theme/recent-posts",
    "title": "Recent Posts",
    "category": "widgets",
    "icon": "list-view",
    "description": "Display a list of recent post titles with optional dates.",
    "supports": {
        "html": false,
        "color": { "background": true, "text": true, "link": true },
        "spacing": { "margin": true, "padding": true },
        "typography": { "fontSize": true, "lineHeight": true }
    },
    "attributes": {
        "postsToShow": { "type": "integer", "default": 5 },
        "showDate": { "type": "boolean", "default": true },
        "category": { "type": "string", "default": "" },
        "dateFormat": { "type": "string", "default": "M j, Y" }
    },
    "render": "file:./render.php",
    "editorScript": "file:./index.js",
    "style": "file:./style.css"
}
```

**Key decisions:**
| Property | Value | Why |
|----------|-------|-----|
| `name` | `theme/recent-posts` | Namespaced to avoid conflicts |
| `supports.html` | `false` | Dynamic blocks don't save HTML |
| `supports.color` | enabled | Users can customize colors |
| `render` | `file:./render.php` | Points to PHP template |
| `attributes` | defined | Stores user settings |

---

## Step 3: Create render.php

This file runs on every page load and generates the HTML:

```php
<?php
// Get attributes with safe defaults
$posts_to_show = $attributes['postsToShow'] ?? 5;
$show_date     = $attributes['showDate'] ?? true;
$category      = $attributes['category'] ?? '';
$date_format   = $attributes['dateFormat'] ?? 'M j, Y';

// Build query
$args = array(
    'numberposts' => $posts_to_show,
    'post_status' => 'publish',
    'orderby'     => 'date',
    'order'       => 'DESC',
);

if ( ! empty( $category ) ) {
    $args['category_name'] = $category;
}

$recent_posts = get_posts( $args );

// Get wrapper with block supports (colors, spacing, etc.)
$wrapper_attributes = get_block_wrapper_attributes();
?>

<div <?php echo $wrapper_attributes; ?>>
    <?php if ( ! empty( $recent_posts ) ) : ?>
        <ul class="recent-posts-list">
            <?php foreach ( $recent_posts as $post ) : ?>
                <li class="recent-posts-item">
                    <a href="<?php echo esc_url( get_permalink( $post ) ); ?>">
                        <?php echo esc_html( get_the_title( $post ) ); ?>
                    </a>
                    <?php if ( $show_date ) : ?>
                        <time datetime="<?php echo esc_attr( get_the_date( 'c', $post ) ); ?>">
                            <?php echo esc_html( get_the_date( $date_format, $post ) ); ?>
                        </time>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else : ?>
        <p><?php esc_html_e( 'No posts found.', 'twentytwentyfive' ); ?></p>
    <?php endif; ?>
</div>
```

**Key points:**
- `$attributes` — Automatically available, contains saved settings
- `get_block_wrapper_attributes()` — Applies block supports (colors, spacing)
- `esc_html()` / `esc_url()` — Security: always escape output
- `get_posts()` — Efficient for small lists (< 20)

---

## Step 4: Create index.js (Editor UI)

The JavaScript file creates the editing experience:

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl } from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('theme/recent-posts', {
    edit: function Edit({ attributes, setAttributes }) {
        const { postsToShow, showDate, category, dateFormat } = attributes;
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Settings">
                        <RangeControl
                            label="Number of posts"
                            value={postsToShow}
                            onChange={(value) => setAttributes({ postsToShow: value })}
                            min={1}
                            max={20}
                        />
                        <ToggleControl
                            label="Show post date"
                            checked={showDate}
                            onChange={(value) => setAttributes({ showDate: value })}
                        />
                        <TextControl
                            label="Category (slug)"
                            value={category}
                            onChange={(value) => setAttributes({ category: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...useBlockProps()}>
                    <ServerSideRender
                        block="theme/recent-posts"
                        attributes={attributes}
                    />
                </div>
            </>
        );
    },
    save: () => null  // Dynamic blocks return null
});
```

**Components used:**
| Component | Purpose |
|-----------|---------|
| `InspectorControls` | Adds sidebar panel |
| `RangeControl` | Slider for post count |
| `ToggleControl` | On/off for show date |
| `TextControl` | Input for category slug |
| `ServerSideRender` | Shows live PHP output in editor |

---

## Step 5: Add Styles (style.css)

```css
.wp-block-theme-recent-posts .recent-posts-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.wp-block-theme-recent-posts .recent-posts-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.wp-block-theme-recent-posts .recent-posts-link {
    font-weight: 500;
    text-decoration: none;
}

.wp-block-theme-recent-posts .recent-posts-date {
    font-size: 0.875em;
    color: #6b7280;
}
```

---

## Step 6: Register the Block

Add to `functions.php`:

```php
// Registers custom blocks.
if ( ! function_exists( 'twentytwentyfive_register_blocks' ) ) :
    function twentytwentyfive_register_blocks() {
        register_block_type( get_template_directory() . '/blocks/recent-posts' );
    }
endif;
add_action( 'init', 'twentytwentyfive_register_blocks' );
```

**Why `register_block_type()` with a path?**
- WordPress reads `block.json` from that folder
- Automatically registers scripts, styles, and render callback
- No need to manually specify each file

---

## Step 7: Build the JavaScript (Required)

The `index.js` uses ES modules and JSX, which browsers don't understand. You need to compile it:

```bash
# If using @wordpress/scripts
npm run build

# Or for development with auto-rebuild
npm run start
```

This creates a compiled `build/index.js` that WordPress can load.

**Alternative: No-build approach**
If you don't want a build step, use `render_callback` in PHP instead of `index.js`. The block will work but won't have custom editor controls.

---

## File Summary

| File | Purpose | When it runs |
|------|---------|--------------|
| `block.json` | Block definition | Registration (init) |
| `render.php` | Generate HTML | Frontend page load |
| `index.js` | Editor UI | Block editor |
| `style.css` | Styling | Frontend + Editor |

---

## What Gets Saved in Database

```html
<!-- wp:theme/recent-posts {"postsToShow":5,"showDate":true} /-->
```

Just attributes—no HTML! The PHP generates fresh content on each page view.

---

## Testing the Block

1. Go to WordPress admin → Pages/Posts → Edit
2. Click **+** to add a block
3. Search for "Recent Posts"
4. Insert the block
5. Configure settings in the sidebar
6. Save and view the page

---

## Related Files

- [block.json](file:///c:/_WORKSPACE_/wordpress-fse/twentytwentyfive/blocks/recent-posts/block.json)
- [render.php](file:///c:/_WORKSPACE_/wordpress-fse/twentytwentyfive/blocks/recent-posts/render.php)
- [index.js](file:///c:/_WORKSPACE_/wordpress-fse/twentytwentyfive/blocks/recent-posts/index.js)
- [style.css](file:///c:/_WORKSPACE_/wordpress-fse/twentytwentyfive/blocks/recent-posts/style.css)
- [functions.php](file:///c:/_WORKSPACE_/wordpress-fse/twentytwentyfive/functions.php) (block registration)
