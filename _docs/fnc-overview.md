# functions.php Overview

| Function | Description |
|----------|-------------|
| `twentytwentyfive_post_format_setup` | Enables theme support for nine post formats including aside, audio, chat, gallery, image, link, quote, status, and video, allowing content to be styled differently based on type. |
| `twentytwentyfive_editor_style` | Loads a custom stylesheet into the block editor so content appears with the same fonts, colors, and spacing while editing as it does on the live frontend of your site. |
| `twentytwentyfive_enqueue_styles` | Loads the theme's main stylesheet on frontend pages, automatically choosing between the minified production version or full debug version based on the SCRIPT_DEBUG constant. |
| `twentytwentyfive_block_styles` | Registers a custom "Checkmark" style for the List block that replaces standard bullet points with checkmark symbols, useful for to-do lists, feature lists, and completion indicators. |
| `twentytwentyfive_pattern_categories` | Creates two custom pattern categories—Pages and Post formats—to organize the theme's 98 block patterns, making them easier to find in the pattern inserter during editing. |
| `twentytwentyfive_register_block_bindings` | Registers a block binding source called "Post format name" that allows blocks to dynamically display the current post's format without requiring custom template code. |
| `twentytwentyfive_format_binding` | Callback function that returns the human-readable post format name (like Video or Quote) for the block binding, returning nothing for standard posts to keep them clean. |
