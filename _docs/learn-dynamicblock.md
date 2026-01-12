# Learning Dynamic Blocks in WordPress

This guide teaches you how to create dynamic blocks from scratch. Dynamic blocks generate their output at runtime using PHP, making them perfect for displaying current data like recent posts, user info, or any content that changes.

---

## Quick Overview

| Concept | Description |
|---------|-------------|
| Dynamic Block | A block that renders its output via PHP at view time |
| `render_callback` | PHP function that generates the block's HTML |
| `render.php` | File-based approach for rendering (WordPress 6.1+) |
| `block.json` | Block metadata file defining settings and configuration |
| Server-side rendering | Output is generated on each page load |

---

## Why use dynamic blocks?

Static blocks save their HTML at edit time—what you see in the editor is exactly what gets stored and displayed. But some content can't be frozen:

- **Recent posts** — The list changes when you publish
- **Current user name** — Different for each visitor
- **Related content** — Depends on the current post
- **Live data** — Prices, availability, counts
- **Conditional content** — Show/hide based on context

Dynamic blocks solve this by running PHP code every time the page loads.

---

## Static vs Dynamic: The Core Difference

```
STATIC BLOCK (e.g., Paragraph)
┌─────────────────────────────────────────┐
│ Editor → Save → Database → Frontend    │
│                                         │
│ What you type IS what gets stored       │
│ The stored HTML IS what visitors see    │
└─────────────────────────────────────────┘

DYNAMIC BLOCK (e.g., Latest Posts)
┌─────────────────────────────────────────┐
│ Editor → Save → Database (just attrs)  │
│                     ↓                   │
│              PHP runs on each request   │
│                     ↓                   │
│              Fresh HTML → Frontend      │
└─────────────────────────────────────────┘
```

**In the database:**

Static block:
```html
<!-- wp:paragraph -->
<p>This exact text is stored and displayed.</p>
<!-- /wp:paragraph -->
```

Dynamic block:
```html
<!-- wp:latest-posts {"postsToShow":5} /-->
```

Notice the dynamic block has no inner HTML—just attributes. PHP generates the content.

---

## Your First Dynamic Block

Let's build a simple "Hello World" dynamic block step by step.

### Step 1: Create the folder structure

```
your-theme/
└── blocks/
    └── hello-world/
        ├── block.json
        ├── index.js
        └── render.php
```

### Step 2: Define block.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "theme/hello-world",
    "version": "1.0.0",
    "title": "Hello World",
    "category": "widgets",
    "icon": "smiley",
    "description": "A simple dynamic block example.",
    "supports": {
        "html": false
    },
    "textdomain": "your-theme",
    "render": "file:./render.php"
}
```

**Key points:**
- `name` — Unique identifier (namespace/block-name)
- `render` — Points to the PHP file that generates output
- `supports.html` — Disabled because there's no static HTML

### Step 3: Create render.php

```php
<?php
/**
 * Renders the Hello World block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content (empty for dynamic blocks).
 * @param WP_Block $block      Block instance.
 */

$wrapper_attributes = get_block_wrapper_attributes();
?>

<div <?php echo $wrapper_attributes; ?>>
    <p>Hello, World! The current time is <?php echo current_time('H:i:s'); ?></p>
</div>
```

**What's happening:**
- `$attributes` — Contains the block's saved settings
- `$content` — Inner content (usually empty for dynamic blocks)
- `$block` — The full block object with context and more
- `get_block_wrapper_attributes()` — Generates proper wrapper classes

### Step 4: Create the editor component (index.js)

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('theme/hello-world', {
    edit: function Edit() {
        const blockProps = useBlockProps();
        return (
            <div {...blockProps}>
                <p>Hello, World! (Time will show on frontend)</p>
            </div>
        );
    },
    // No save function needed - returns null by default for dynamic blocks
});
```

### Step 5: Register the block in functions.php

```php
function theme_register_blocks() {
    register_block_type( get_template_directory() . '/blocks/hello-world' );
}
add_action( 'init', 'theme_register_blocks' );
```

---

## Understanding render.php Variables

Every `render.php` file receives three variables automatically:

```php
<?php
// $attributes - Array of saved block settings
// Example: ['postsToShow' => 5, 'displayDate' => true]

// $content - Inner HTML content (for blocks with innerBlocks)
// Usually empty string for simple dynamic blocks

// $block - WP_Block object with full context
// Includes: $block->context, $block->parsed_block, etc.
```

### Using $attributes

```php
<?php
$count = $attributes['postsToShow'] ?? 3;
$show_date = $attributes['displayDate'] ?? false;
?>

<ul>
    <?php
    $posts = get_posts(['numberposts' => $count]);
    foreach ($posts as $post) {
        echo '<li>';
        echo esc_html($post->post_title);
        if ($show_date) {
            echo ' - ' . get_the_date('', $post);
        }
        echo '</li>';
    }
    ?>
</ul>
```

### Using $block->context

Context lets blocks access data from parent blocks:

```php
<?php
// Inside a Query Loop, you can access the current post
$post_id = $block->context['postId'] ?? get_the_ID();
$title = get_the_title($post_id);
?>

<h2><?php echo esc_html($title); ?></h2>
```

---

## The render_callback Approach

Before WordPress 6.1 introduced `render.php`, you used a callback function:

```php
// In functions.php or a plugin
register_block_type('theme/hello-world', [
    'render_callback' => 'theme_render_hello_world',
    'attributes' => [
        'message' => [
            'type' => 'string',
            'default' => 'Hello!'
        ]
    ]
]);

function theme_render_hello_world($attributes, $content, $block) {
    $message = $attributes['message'] ?? 'Hello!';
    
    return sprintf(
        '<div %s><p>%s</p></div>',
        get_block_wrapper_attributes(),
        esc_html($message)
    );
}
```

**render.php vs render_callback:**

| Feature | render.php | render_callback |
|---------|------------|-----------------|
| Location | Separate file | In PHP code |
| Syntax | Template-style | Function return |
| WordPress version | 6.1+ | Any |
| Easier to read | Yes (for HTML-heavy) | Yes (for logic-heavy) |

Both work—choose based on preference and complexity.

---

## Adding Block Attributes

Attributes store user settings. Define them in `block.json`:

```json
{
    "name": "theme/greeting",
    "title": "Greeting Block",
    "attributes": {
        "name": {
            "type": "string",
            "default": "World"
        },
        "showTime": {
            "type": "boolean",
            "default": true
        },
        "fontSize": {
            "type": "string",
            "default": "medium"
        }
    },
    "render": "file:./render.php"
}
```

### Attribute types

| Type | Example | Notes |
|------|---------|-------|
| `string` | `"Hello"` | Text values |
| `boolean` | `true` | On/off toggles |
| `number` | `42` | Integers or floats |
| `integer` | `5` | Whole numbers only |
| `array` | `[1, 2, 3]` | Lists |
| `object` | `{"key": "value"}` | Complex data |

### Using attributes in render.php

```php
<?php
$name = esc_html($attributes['name'] ?? 'World');
$show_time = $attributes['showTime'] ?? true;
$font_size = $attributes['fontSize'] ?? 'medium';

$classes = "greeting-block has-{$font_size}-font-size";
?>

<div <?php echo get_block_wrapper_attributes(['class' => $classes]); ?>>
    <p>Hello, <?php echo $name; ?>!</p>
    <?php if ($show_time) : ?>
        <small>Current time: <?php echo current_time('g:i A'); ?></small>
    <?php endif; ?>
</div>
```

---

## Editor Controls for Dynamic Blocks

The editor UI is defined in JavaScript. Add controls so users can customize attributes:

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

registerBlockType('theme/greeting', {
    edit: function Edit({ attributes, setAttributes }) {
        const { name, showTime } = attributes;
        const blockProps = useBlockProps();
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Settings">
                        <TextControl
                            label="Name"
                            value={name}
                            onChange={(value) => setAttributes({ name: value })}
                        />
                        <ToggleControl
                            label="Show Time"
                            checked={showTime}
                            onChange={(value) => setAttributes({ showTime: value })}
                        />
                    </PanelBody>
                </InspectorControls>
                
                <div {...blockProps}>
                    <p>Hello, {name}!</p>
                    {showTime && <small>Time will appear here on frontend</small>}
                </div>
            </>
        );
    }
});
```

**Key components:**
- `InspectorControls` — Adds settings to the sidebar
- `PanelBody` — Collapsible section in sidebar
- `TextControl` — Text input field
- `ToggleControl` — On/off switch
- `setAttributes` — Function to update values

---

## Server-Side Rendering Preview

Want to show the actual PHP output in the editor? Use `ServerSideRender`:

```javascript
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('theme/latest-events', {
    edit: function Edit({ attributes }) {
        const blockProps = useBlockProps();
        
        return (
            <div {...blockProps}>
                <ServerSideRender
                    block="theme/latest-events"
                    attributes={attributes}
                />
            </div>
        );
    }
});
```

This makes an AJAX call to render the block's PHP on the server, showing real data in the editor.

**Pros:** Exact preview of what visitors see
**Cons:** Slower, requires server requests

---

## Block Context: Sharing Data Between Blocks

Dynamic blocks can access context from parent blocks. This is how Query Loop shares post data:

### Providing context (parent block)

In `block.json`:
```json
{
    "name": "theme/product-card",
    "providesContext": {
        "theme/productId": "productId"
    },
    "attributes": {
        "productId": {
            "type": "integer"
        }
    }
}
```

### Using context (child block)

In child block's `block.json`:
```json
{
    "name": "theme/product-price",
    "usesContext": ["theme/productId"]
}
```

In child's `render.php`:
```php
<?php
$product_id = $block->context['theme/productId'] ?? 0;

if ($product_id) {
    $price = get_post_meta($product_id, '_price', true);
    echo '<span class="price">$' . esc_html($price) . '</span>';
}
```

---

## Common Dynamic Block Patterns

### Display Recent Posts

```php
<?php
// render.php for a "Recent Posts" block
$count = $attributes['count'] ?? 5;
$category = $attributes['category'] ?? '';

$args = [
    'numberposts' => $count,
    'post_status' => 'publish',
];

if ($category) {
    $args['category_name'] = $category;
}

$posts = get_posts($args);
?>

<ul <?php echo get_block_wrapper_attributes(); ?>>
    <?php foreach ($posts as $post) : ?>
        <li>
            <a href="<?php echo get_permalink($post); ?>">
                <?php echo esc_html($post->post_title); ?>
            </a>
        </li>
    <?php endforeach; ?>
</ul>
```

### Display Current User Info

```php
<?php
// render.php for a "User Greeting" block
$current_user = wp_get_current_user();
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php if ($current_user->ID) : ?>
        <p>Welcome back, <?php echo esc_html($current_user->display_name); ?>!</p>
    <?php else : ?>
        <p>Welcome, guest! <a href="<?php echo wp_login_url(); ?>">Log in</a></p>
    <?php endif; ?>
</div>
```

### Conditional Content Based on Date

```php
<?php
// render.php for a "Holiday Banner" block
$today = current_time('m-d');
$holiday_dates = [
    '12-25' => 'Merry Christmas!',
    '01-01' => 'Happy New Year!',
    '10-31' => 'Happy Halloween!',
];

if (isset($holiday_dates[$today])) :
?>
    <div <?php echo get_block_wrapper_attributes(['class' => 'holiday-banner']); ?>>
        <?php echo esc_html($holiday_dates[$today]); ?>
    </div>
<?php endif; ?>
```

---

## Debugging Dynamic Blocks

### Check if your block registered

```php
// Add to functions.php temporarily
add_action('init', function() {
    $registry = WP_Block_Type_Registry::get_instance();
    $block = $registry->get_registered('theme/your-block');
    
    if ($block) {
        error_log('Block registered: ' . print_r($block, true));
    } else {
        error_log('Block NOT registered');
    }
}, 99);
```

### Debug render.php output

```php
<?php
// Add at top of render.php during development
error_log('Rendering block with attributes: ' . print_r($attributes, true));
error_log('Block context: ' . print_r($block->context, true));
?>
```

### Common issues

| Problem | Cause | Solution |
|---------|-------|----------|
| Block not appearing | Not registered | Check `register_block_type()` path |
| PHP errors | Syntax issue | Check error logs, enable WP_DEBUG |
| Attributes empty | Wrong attribute name | Match `block.json` exactly |
| Context missing | Not declared | Add to `usesContext` in block.json |
| Editor shows nothing | JS error | Check browser console |

---

## Performance Considerations

Dynamic blocks run PHP on every page load. Keep them fast:

### Cache expensive queries

```php
<?php
$cache_key = 'theme_recent_posts_' . $attributes['count'];
$posts = wp_cache_get($cache_key);

if (false === $posts) {
    $posts = get_posts(['numberposts' => $attributes['count']]);
    wp_cache_set($cache_key, $posts, '', HOUR_IN_SECONDS);
}
?>
```

### Use transients for external data

```php
<?php
$weather = get_transient('theme_weather_data');

if (false === $weather) {
    $weather = fetch_weather_from_api(); // Your API call
    set_transient('theme_weather_data', $weather, HOUR_IN_SECONDS);
}
?>
```

### Minimize database queries

```php
<?php
// Bad: Query inside loop
foreach ($post_ids as $id) {
    $title = get_the_title($id); // Query each time
}

// Good: Single query
$posts = get_posts(['include' => $post_ids]);
foreach ($posts as $post) {
    $title = $post->post_title; // Already loaded
}
?>
```

---

## Core Dynamic Blocks Reference

WordPress includes many dynamic blocks. Study these for patterns:

| Block | Purpose | Key Features |
|-------|---------|--------------|
| `core/latest-posts` | Show recent posts | Query, formatting options |
| `core/post-title` | Current post title | Uses post context |
| `core/post-content` | Current post body | Uses post context |
| `core/post-excerpt` | Post excerpt | Uses post context |
| `core/site-title` | Site name | Reads site option |
| `core/navigation` | Menu | Complex menu rendering |
| `core/query` | Post loop | Provides context to children |
| `core/search` | Search form | Form generation |
| `core/archives` | Archive links | Date-based queries |
| `core/categories` | Category list | Taxonomy query |

---

## Related Resources

- [Block Editor Handbook - Dynamic Blocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Block Context](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-context/)
- [Server-Side Rendering](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/creating-dynamic-blocks/)
- [WP_Block Class](https://developer.wordpress.org/reference/classes/wp_block/)
