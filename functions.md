# Understanding Twenty Twenty-Five's functions.php

This file is the heart of the theme's PHP functionality. Let's walk through what each part does and why it matters for your site.

---

## Quick Overview

| What It Does | When It Runs |
|--------------|--------------|
| Enables post formats (video, audio, quote, etc.) | Theme setup |
| Loads styles in the editor | Theme setup |
| Loads styles on your site | Page load |
| Adds a checkmark list style | WordPress init |
| Organizes block patterns into categories | WordPress init |
| Creates a way to show post format names in blocks | WordPress init |

---

## What is functions.php?

The `functions.php` file is where themes add features and customize WordPress behavior. Unlike plugins, everything in this file only works when this specific theme is active. Think of it as the theme's control center.

In Twenty Twenty-Five, this file is intentionally minimal. Since block themes handle most design through `theme.json` and block templates, `functions.php` only needs to set up a few specific features.

---

## How does post format support work?

```php
function twentytwentyfive_post_format_setup() {
    add_theme_support( 'post-formats', array( 
        'aside', 'audio', 'chat', 'gallery', 
        'image', 'link', 'quote', 'status', 'video' 
    ) );
}
add_action( 'after_setup_theme', 'twentytwentyfive_post_format_setup' );
```

Post formats let you style different types of content in unique ways. When you create a new post, you can choose a format like "Video" or "Quote" from the post settings panel. The theme then displays that post with special styling.

With Twenty Twenty-Five, you get nine format options:

- **Aside** — Quick notes without a title, similar to a social media status
- **Audio** — Posts featuring audio content like podcasts or music
- **Chat** — Conversation transcripts or interview logs
- **Gallery** — Collections of images
- **Image** — Posts where a single image is the main focus
- **Link** — Posts that primarily share a link to another resource
- **Quote** — Posts built around a quotation
- **Status** — Short updates, like a tweet
- **Video** — Posts featuring video content

You can find theme patterns designed for each format in the pattern library. These give you ready-made layouts optimized for each content type.

---

## How do editor styles work?

```php
function twentytwentyfive_editor_style() {
    add_editor_style( 'assets/css/editor-style.css' );
}
add_action( 'after_setup_theme', 'twentytwentyfive_editor_style' );
```

This loads a stylesheet into the block editor so your content looks the same while you're writing as it does on your live site. Without this, you might see different fonts, colors, and spacing in the editor compared to what visitors see.

The stylesheet lives at `assets/css/editor-style.css` inside the theme folder. It applies the theme's typography, colors, and other design choices directly in the editing experience.

---

## How does the theme load its stylesheet?

```php
function twentytwentyfive_enqueue_styles() {
    $suffix = SCRIPT_DEBUG ? '' : '.min';
    $src    = 'style' . $suffix . '.css';

    wp_enqueue_style(
        'twentytwentyfive-style',
        get_parent_theme_file_uri( $src ),
        array(),
        wp_get_theme()->get( 'Version' )
    );
}
add_action( 'wp_enqueue_scripts', 'twentytwentyfive_enqueue_styles' );
```

This code loads the theme's main stylesheet on your site. It includes a smart feature: if you're a developer with `SCRIPT_DEBUG` enabled in your `wp-config.php`, it loads the full `style.css` file for easier debugging. Otherwise, it loads the smaller `style.min.css` for faster page loads.

The version number from the theme is attached to the stylesheet URL. This means when you update the theme, browsers will automatically fetch the new styles instead of using cached old ones.

If you're using a child theme, this still works correctly because `get_parent_theme_file_uri()` always points to the parent theme's files.

---

## What is the checkmark list style?

```php
function twentytwentyfive_block_styles() {
    register_block_style(
        'core/list',
        array(
            'name'         => 'checkmark-list',
            'label'        => __( 'Checkmark', 'twentytwentyfive' ),
            'inline_style' => '
            ul.is-style-checkmark-list {
                list-style-type: "\2713";
            }
            ul.is-style-checkmark-list li {
                padding-inline-start: 1ch;
            }',
        )
    );
}
add_action( 'init', 'twentytwentyfive_block_styles' );
```

This adds a new style option to the List block. When you select a list in the editor and open the block settings, you'll see "Checkmark" as a style choice alongside the default options.

Choosing this style replaces the standard bullets with checkmark symbols (✓). It's useful for to-do lists, feature lists, or anywhere you want to indicate completed items or positive points.

The CSS uses `\2713`, which is the code for the checkmark character. The padding adds a small space between the checkmark and the text for better readability.

---

## How are pattern categories organized?

```php
function twentytwentyfive_pattern_categories() {

    register_block_pattern_category(
        'twentytwentyfive_page',
        array(
            'label'       => __( 'Pages', 'twentytwentyfive' ),
            'description' => __( 'A collection of full page layouts.', 'twentytwentyfive' ),
        )
    );

    register_block_pattern_category(
        'twentytwentyfive_post-format',
        array(
            'label'       => __( 'Post formats', 'twentytwentyfive' ),
            'description' => __( 'A collection of post format patterns.', 'twentytwentyfive' ),
        )
    );
}
add_action( 'init', 'twentytwentyfive_pattern_categories' );
```

Twenty Twenty-Five includes 98 block patterns—pre-built layouts you can insert into your pages and posts. This code creates two categories to help you find them:

**Pages** — Full page layouts for things like landing pages, contact pages, about pages, and more. These patterns give you complete page designs you can customize.

**Post formats** — Patterns designed specifically for different post format types. If you're creating a video post or a quote post, these patterns are optimized for that content.

You can find these categories in the pattern inserter when editing any page or post. They appear alongside WordPress's built-in pattern categories.

---

## What are block bindings?

```php
function twentytwentyfive_register_block_bindings() {
    register_block_bindings_source(
        'twentytwentyfive/format',
        array(
            'label'              => _x( 'Post format name', 'Label for the block binding placeholder in the editor', 'twentytwentyfive' ),
            'get_value_callback' => 'twentytwentyfive_format_binding',
        )
    );
}
add_action( 'init', 'twentytwentyfive_register_block_bindings' );

function twentytwentyfive_format_binding() {
    $post_format_slug = get_post_format();

    if ( $post_format_slug && 'standard' !== $post_format_slug ) {
        return get_post_format_string( $post_format_slug );
    }
}
```

Block bindings are a newer WordPress feature (introduced in 6.5) that let blocks display dynamic content. Instead of showing static text, a block can pull in information from various sources.

This code creates a binding source called "Post format name." When you connect a Paragraph or Heading block to this source, it automatically displays the current post's format (like "Video" or "Quote") without you writing any code.

For standard posts (those without a special format), the binding returns nothing, so the block stays empty. This prevents "Standard" from appearing on regular posts.

You can use this in your templates to show visitors what type of content they're viewing. The theme's post format patterns already use this binding.

---

## Why does every function use function_exists()?

You'll notice each function is wrapped like this:

```php
if ( ! function_exists( 'twentytwentyfive_post_format_setup' ) ) :
    function twentytwentyfive_post_format_setup() {
        // code here
    }
endif;
```

This pattern allows child themes to override any function. If you're building a child theme and want to change how post formats work, you can define your own version of `twentytwentyfive_post_format_setup` in your child theme's `functions.php`. Since child theme files load first, WordPress will find your function already exists and skip the parent theme's version.

This gives you complete control over theme behavior without modifying the parent theme files directly—which is important because parent theme changes would be lost during updates.

---

## When do these functions run?

WordPress uses a hook system to run code at specific times. Here's when each function in this file executes:

**after_setup_theme** — Runs early, right after the theme loads. Used for post format support and editor styles because WordPress needs to know about these features before setting up the editor.

**init** — Runs after WordPress is fully loaded but before any page content. Used for block styles, pattern categories, and bindings because these can wait until everything else is ready.

**wp_enqueue_scripts** — Runs only on the public-facing pages of your site (not in the admin). Used for loading the stylesheet where visitors can see it.

---

## Related resources

For more information about the concepts covered here:

- [Theme Functions File](https://developer.wordpress.org/themes/basics/theme-functions/) — Official documentation
- [Post Formats](https://developer.wordpress.org/themes/functionality/post-formats/) — How to use and style post formats
- [Block Styles](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/) — Adding style variations to blocks
- [Block Patterns](https://developer.wordpress.org/themes/features/block-patterns/) — Creating and organizing patterns
- [Block Bindings](https://make.wordpress.org/core/2024/03/06/new-feature-the-block-bindings-api/) — Dynamic content in blocks
