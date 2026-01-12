# Understanding Twenty Twenty-Five's theme.json

This file is the design foundation of the theme. Let's walk through what each part does and why it matters for your site.

---

## Quick Overview

| What It Defines | Purpose |
|-----------------|---------|
| Schema version | Tells WordPress which features to expect |
| Color palette | Your site's available colors |
| Typography | Fonts, sizes, and text styling |
| Spacing presets | Consistent margins and padding |
| Layout widths | Content and wide container sizes |
| Global styles | Default appearance for the entire site |
| Block styles | Specific styling for individual blocks |
| Template parts | Header, footer, and sidebar definitions |
| Custom templates | Special page layouts |

---

## What is theme.json?

The `theme.json` file is where block themes define their design system. Unlike `functions.php` which handles behavior, `theme.json` handles appearance. It replaced the old approach of scattering design settings across PHP files and multiple stylesheets.

Think of it as your theme's design control center. Every color, font, spacing value, and layout option lives here. When users open the Site Editor's Global Styles panel, they're actually modifying values that originated in this file.

In Twenty Twenty-Five, this file does heavy lifting. At over 700 lines, it defines a complete design system that creates cohesive styling across your entire site.

---

## How does the schema work?

```json
{
    "$schema": "https://schemas.wp.org/wp/6.7/theme.json",
    "version": 3
}
```

These two lines at the top tell WordPress what to expect from your theme.json file.

**$schema** — This URL points to a JSON schema definition. When you use an editor like VS Code, it reads this schema to give you autocomplete suggestions and error checking. If you type a property name wrong, your editor will underline it. The version number in the URL (6.7) should match your WordPress version.

**version** — This number (currently 3) indicates which theme.json API version you're using. WordPress introduced version 2 in 5.9 and version 3 in 6.6. Higher versions add new features. If you use version 3 features with version 2, they won't work.

---

## How do color presets work?

```json
{
    "settings": {
        "color": {
            "defaultPalette": false,
            "defaultDuotone": false,
            "defaultGradients": false,
            "palette": [
                {
                    "color": "#FFFFFF",
                    "name": "Base",
                    "slug": "base"
                },
                {
                    "color": "#111111",
                    "name": "Contrast",
                    "slug": "contrast"
                },
                {
                    "color": "#FFEE58",
                    "name": "Accent 1",
                    "slug": "accent-1"
                }
            ]
        }
    }
}
```

Color presets define the palette available throughout your site. When you set a background color on any block, you'll see these colors as options.

**defaultPalette: false** — This hides WordPress's built-in colors (light green, vivid red, etc.). Setting this to `false` gives you a cleaner palette with only your theme's colors. Users can't accidentally pick colors that clash with your design.

**defaultDuotone: false** — Hides the default duotone filter presets for images.

**defaultGradients: false** — Hides the default gradient presets.

**The palette array** — Each color needs three properties:
- `color` — The actual hex code
- `name` — What users see in the color picker
- `slug` — The identifier used in CSS and when referencing the color elsewhere

Twenty Twenty-Five uses an interesting color called "Accent 6":

```json
{
    "color": "color-mix(in srgb, currentColor 20%, transparent)",
    "name": "Accent 6",
    "slug": "accent-6"
}
```

This isn't a fixed color—it's a dynamic value that creates a 20% opacity version of whatever the current text color is. This technique creates borders and subtle backgrounds that automatically adapt to different color schemes.

### What CSS gets generated?

WordPress transforms your palette into CSS custom properties:

```css
--wp--preset--color--base: #FFFFFF;
--wp--preset--color--contrast: #111111;
--wp--preset--color--accent-1: #FFEE58;
```

You can use these variables in your own CSS or in the theme.json styles section.

---

## How do layout settings work?

```json
{
    "settings": {
        "layout": {
            "contentSize": "645px",
            "wideSize": "1340px"
        }
    }
}
```

These two values control how wide your content areas can be.

**contentSize** — The default maximum width for content blocks. In Twenty Twenty-Five, paragraphs and other text blocks won't exceed 645px wide. This creates comfortable reading line lengths (around 75 characters per line is considered optimal for readability).

**wideSize** — The maximum width for "wide" aligned blocks. When you select a block and choose the wide alignment option, it expands to this width. Images, videos, and other media often benefit from this extra space while text stays at the narrower content width.

These values create the classic "wide image in narrow text" layout that's popular in modern web design.

---

## How does typography configuration work?

```json
{
    "settings": {
        "typography": {
            "fluid": true,
            "writingMode": true,
            "defaultFontSizes": false,
            "fontSizes": [
                {
                    "fluid": false,
                    "name": "Small",
                    "size": "0.875rem",
                    "slug": "small"
                },
                {
                    "fluid": {
                        "max": "1.375rem",
                        "min": "1.125rem"
                    },
                    "name": "Large",
                    "size": "1.38rem",
                    "slug": "large"
                }
            ],
            "fontFamilies": [
                {
                    "name": "Manrope",
                    "slug": "manrope",
                    "fontFamily": "Manrope, sans-serif",
                    "fontFace": [
                        {
                            "src": ["file:./assets/fonts/manrope/Manrope-VariableFont_wght.woff2"],
                            "fontWeight": "200 800",
                            "fontStyle": "normal",
                            "fontFamily": "Manrope"
                        }
                    ]
                }
            ]
        }
    }
}
```

Typography settings control fonts and text sizing across your site.

**fluid: true** — Enables fluid typography globally. Font sizes automatically scale between a minimum and maximum based on the viewport width. No more media queries for responsive text.

**writingMode: true** — Allows users to set text direction (horizontal or vertical). This matters for languages written top-to-bottom.

**defaultFontSizes: false** — Hides WordPress's default size options, giving you full control over available sizes.

### Font Sizes

Each font size can be fixed or fluid:

**Fixed size:**
```json
{
    "fluid": false,
    "name": "Small",
    "size": "0.875rem",
    "slug": "small"
}
```
This stays at 0.875rem on all screen sizes.

**Fluid size:**
```json
{
    "fluid": {
        "max": "1.375rem",
        "min": "1.125rem"
    },
    "name": "Large",
    "size": "1.38rem",
    "slug": "large"
}
```
This smoothly scales from 1.125rem on small screens to 1.375rem on large screens. WordPress calculates the in-between values using `clamp()`.

### Font Families

Twenty Twenty-Five bundles fonts directly in the theme:

```json
{
    "fontFace": [
        {
            "src": ["file:./assets/fonts/manrope/Manrope-VariableFont_wght.woff2"],
            "fontWeight": "200 800",
            "fontStyle": "normal"
        }
    ]
}
```

The `file:./` prefix tells WordPress to load fonts from the theme folder. The theme uses variable fonts (one file, multiple weights) which load faster than separate files for each weight.

`fontWeight: "200 800"` means this single font file contains weights from 200 (extra light) to 800 (extra bold).

---

## How do spacing presets work?

```json
{
    "settings": {
        "spacing": {
            "defaultSpacingSizes": false,
            "spacingSizes": [
                {
                    "name": "Tiny",
                    "size": "10px",
                    "slug": "20"
                },
                {
                    "name": "Regular",
                    "size": "clamp(30px, 5vw, 50px)",
                    "slug": "50"
                },
                {
                    "name": "XX-Large",
                    "size": "clamp(70px, 10vw, 140px)",
                    "slug": "80"
                }
            ],
            "units": ["%", "px", "em", "rem", "vh", "vw"]
        }
    }
}
```

Spacing presets give users consistent margin and padding options.

**defaultSpacingSizes: false** — Replaces WordPress's built-in spacing scale with your custom values.

**The slugs (20, 30, 40, 50...)** — These follow a deliberate numbering system. The numbers increase in steps of 10, leaving room to add intermediate values later without renaming everything. It's similar to how some design systems use 100, 200, 300 for color shades.

**Responsive values with clamp():**
```json
{
    "size": "clamp(30px, 5vw, 50px)"
}
```

This creates responsive spacing:
- Minimum: 30px (won't go smaller even on tiny screens)
- Preferred: 5vw (5% of viewport width)
- Maximum: 50px (won't go larger even on huge screens)

**units** — Controls which CSS units appear in spacing controls. By including `vh` and `vw`, Twenty Twenty-Five lets users create viewport-relative spacing.

---

## How do global styles work?

```json
{
    "styles": {
        "color": {
            "background": "var:preset|color|base",
            "text": "var:preset|color|contrast"
        },
        "typography": {
            "fontFamily": "var:preset|font-family|manrope",
            "fontSize": "var:preset|font-size|large",
            "fontWeight": "300",
            "lineHeight": "1.4"
        },
        "spacing": {
            "blockGap": "1.2rem",
            "padding": {
                "left": "var:preset|spacing|50",
                "right": "var:preset|spacing|50"
            }
        }
    }
}
```

The `styles` section applies actual CSS to your site. The settings section defines what's possible; the styles section defines what's default.

**Referencing presets** — Notice the `var:preset|color|base` syntax. This references the color you defined in settings. It's cleaner than repeating `#FFFFFF` everywhere and ensures changes to your palette automatically update throughout your styles.

The format is: `var:preset|{type}|{slug}`

**blockGap** — Controls the default spacing between blocks. This single value creates consistent vertical rhythm throughout your site.

**Root padding** — The left/right padding prevents content from touching screen edges on mobile devices.

---

## How do element styles work?

```json
{
    "styles": {
        "elements": {
            "button": {
                "color": {
                    "background": "var:preset|color|contrast",
                    "text": "var:preset|color|base"
                },
                ":hover": {
                    "color": {
                        "background": "color-mix(in srgb, var(--wp--preset--color--contrast) 85%, transparent)"
                    }
                },
                "spacing": {
                    "padding": {
                        "bottom": "1rem",
                        "left": "2.25rem",
                        "right": "2.25rem",
                        "top": "1rem"
                    }
                }
            },
            "heading": {
                "typography": {
                    "fontWeight": "400",
                    "lineHeight": "1.125"
                }
            },
            "h1": {
                "typography": {
                    "fontSize": "var:preset|font-size|xx-large"
                }
            },
            "link": {
                "color": {
                    "text": "currentColor"
                },
                ":hover": {
                    "typography": {
                        "textDecoration": "none"
                    }
                }
            }
        }
    }
}
```

Element styles apply to HTML elements globally, regardless of which block generates them.

**Available elements:**
- `button` — All buttons
- `caption` — Image and other captions
- `cite` — Citations in quotes
- `heading` — All headings (h1-h6)
- `h1` through `h6` — Individual heading levels
- `link` — All links

**heading vs h1** — The `heading` element styles all headings, then `h1`, `h2`, etc. override specific levels. This is more efficient than repeating the same properties for each level.

**Pseudo-states** — The `:hover` and `:focus` keys let you style interactive states. Twenty Twenty-Five uses `color-mix()` for subtle hover effects that work with any color scheme.

---

## How do block styles work?

```json
{
    "styles": {
        "blocks": {
            "core/quote": {
                "border": {
                    "style": "solid",
                    "width": "0 0 0 2px",
                    "color": "currentColor"
                },
                "spacing": {
                    "padding": {
                        "top": "var:preset|spacing|30",
                        "right": "var:preset|spacing|40",
                        "bottom": "var:preset|spacing|30",
                        "left": "var:preset|spacing|40"
                    }
                },
                "typography": {
                    "fontSize": "var:preset|font-size|large"
                },
                "css": "& .has-text-align-right { border-width: 0 2px 0 0; }"
            }
        }
    }
}
```

Block styles target specific WordPress blocks using their `core/blockname` identifier.

**The Quote block example** shows several techniques:

1. **Border shorthand** — `"width": "0 0 0 2px"` creates a left-only border like CSS shorthand (top, right, bottom, left).

2. **currentColor** — Makes the border color match whatever text color is set, ensuring it always looks correct.

3. **Custom CSS** — The `css` property lets you add styles that theme.json can't express. The `&` symbol represents the block's wrapper.

### Common blocks you'll style:

- `core/paragraph`
- `core/heading`
- `core/image`
- `core/button`
- `core/quote`
- `core/code`
- `core/navigation`
- `core/post-title`
- `core/post-date`

---

## What are block variations?

```json
{
    "styles": {
        "blocks": {
            "core/button": {
                "variations": {
                    "outline": {
                        "border": {
                            "color": "currentColor",
                            "width": "1px"
                        }
                    }
                }
            },
            "core/quote": {
                "variations": {
                    "plain": {
                        "border": {
                            "style": "none",
                            "width": "0"
                        },
                        "spacing": {
                            "padding": {
                                "top": "0",
                                "right": "0",
                                "bottom": "0",
                                "left": "0"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Variations are style presets users can switch between. When you select a Button block, you'll see "Fill" and "Outline" as style options in the sidebar.

Twenty Twenty-Five customizes the built-in Outline variation for buttons and adds a Plain variation to quotes that removes all decorative styling.

Variations go inside the block's `variations` property, keyed by the variation's slug.

---

## What are template parts?

```json
{
    "templateParts": [
        {
            "area": "header",
            "name": "header",
            "title": "Header"
        },
        {
            "area": "header",
            "name": "vertical-header",
            "title": "Vertical site header"
        },
        {
            "area": "footer",
            "name": "footer",
            "title": "Footer"
        },
        {
            "area": "uncategorized",
            "name": "sidebar",
            "title": "Sidebar"
        }
    ]
}
```

Template parts register reusable sections that appear in your templates.

**area** — Where the part goes. WordPress recognizes three areas:
- `header` — Top of the page
- `footer` — Bottom of the page
- `uncategorized` — General purpose (like sidebars)

**name** — Matches a file in the `parts/` folder. The "header" template part loads `parts/header.html`.

**title** — What appears in the Site Editor's template part selector.

Twenty Twenty-Five includes multiple header options (standard header, vertical header, large title header) so users can choose different layouts without coding.

---

## What are custom templates?

```json
{
    "customTemplates": [
        {
            "name": "page-no-title",
            "postTypes": ["page"],
            "title": "Page No Title"
        }
    ]
}
```

Custom templates create layout options for pages and posts.

**name** — Matches a file in the `templates/` folder. "page-no-title" loads `templates/page-no-title.html`.

**postTypes** — Which content types can use this template. An array because one template might work for both pages and posts.

**title** — What appears in the template selector when editing a page.

In Twenty Twenty-Five, "Page No Title" provides a layout where the page title doesn't display—useful for landing pages where you want full control over the header area.

---

## How does the style hierarchy work?

When WordPress determines what styles to apply, it follows this order (each level overrides the previous):

```
WordPress Core Defaults
        ↓
Parent Theme theme.json
        ↓
Child Theme theme.json
        ↓
User Global Styles (Site Editor)
        ↓
Final Rendered Styles
```

This means:
1. Your theme.json overrides WordPress defaults
2. Child themes can override your values
3. Users can override everything through the Site Editor

User customizations are stored in the database, not in files. If you're developing and wondering why your theme.json changes aren't appearing, check if you've made Global Styles changes in the Site Editor—those take priority.

---

## What are useRootPaddingAwareAlignments?

```json
{
    "settings": {
        "useRootPaddingAwareAlignments": true
    }
}
```

This setting solves a tricky layout problem. When you add padding to your site's body (for that nice margin on mobile), full-width blocks like images get stuck inside that padding instead of touching the screen edges.

With this set to `true`, full-width blocks break out of the root padding and truly span edge-to-edge, while regular content respects the padding.

---

## What is appearanceTools?

```json
{
    "settings": {
        "appearanceTools": true
    }
}
```

This is a shortcut that enables multiple settings at once:

- Border controls (color, radius, style, width)
- Link color controls
- Padding and margin controls
- Block gap controls
- Minimum height
- Child layout (flex/grid controls)

Instead of enabling each one individually, `appearanceTools: true` turns them all on. It's the recommended approach for themes that want to give users full design control.

---

## How do I reference theme.json values in CSS?

If you need to use theme.json values in your own stylesheets, WordPress generates CSS custom properties for all presets:

**Colors:**
```css
var(--wp--preset--color--base)
var(--wp--preset--color--contrast)
```

**Font sizes:**
```css
var(--wp--preset--font-size--small)
var(--wp--preset--font-size--large)
```

**Font families:**
```css
var(--wp--preset--font-family--manrope)
```

**Spacing:**
```css
var(--wp--preset--spacing--50)
var(--wp--preset--spacing--80)
```

Using these variables ensures your custom CSS stays in sync with theme.json. If someone changes the primary color in Global Styles, your CSS automatically uses the new color.

---

## Related resources

For more information about the concepts covered here:

- [Global Settings & Styles (theme.json)](https://developer.wordpress.org/themes/global-settings-and-styles/) — Official documentation
- [theme.json Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/theme-json-living/) — Complete list of available properties
- [Block Theme Overview](https://developer.wordpress.org/themes/block-themes/) — Understanding block themes
- [Global Styles](https://developer.wordpress.org/themes/global-settings-and-styles/styles/) — Deep dive into the styles section
- [Create Block Theme Plugin](https://wordpress.org/plugins/create-block-theme/) — Generate theme.json visually
