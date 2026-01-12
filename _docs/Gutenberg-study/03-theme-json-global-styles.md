# 03 theme.json & Global Styles Mastery

Master the theme.json configuration system. Learn how design tokens, global styles, and block settings replace traditional CSS-heavy workflows. theme.json mastery defines professional block theme developers.

---

## 3.1 theme.json Schema Overview

### What is theme.json?

`theme.json` is the **central configuration file** for block themes. It defines:
- Design tokens (colors, fonts, spacing)
- Global styles (site-wide defaults)
- Block-level settings and styles
- Feature toggles (what users can customize)

### Schema Version

Always specify the schema and version:

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3
}
```

| Version | WordPress | Key Features |
|---------|-----------|--------------|
| 1 | 5.8+ | Initial release |
| 2 | 5.9+ | appearanceTools, custom CSS |
| 3 | 6.6+ | defaultFontSizes, background images |

### Top-Level Structure

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "settings": { },      // What features are available
    "styles": { },        // Default visual appearance
    "customTemplates": [ ], // Custom template definitions
    "templateParts": [ ],   // Template part definitions
    "patterns": [ ]         // Pattern slugs to register
}
```

### Settings vs Styles

```
┌─────────────────────────────────────────────────────────────┐
│                     theme.json                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SETTINGS                      STYLES                       │
│  ─────────                     ──────                       │
│  "What options exist?"         "What do they look like?"    │
│                                                             │
│  • Color palette               • Background color           │
│  • Font families               • Text color                 │
│  • Font sizes                  • Font family                │
│  • Spacing scale               • Link styles                │
│  • Layout widths               • Element defaults           │
│  • Feature toggles             • Block defaults             │
│                                                             │
│  Generates:                    Generates:                   │
│  CSS Custom Properties         CSS Rules                    │
│  --wp--preset--color--*        body { color: #222; }        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3.2 Color & Typography Systems

### Defining Color Palettes

```json
{
    "settings": {
        "color": {
            "palette": [
                { "slug": "primary", "color": "#1e40af", "name": "Primary" },
                { "slug": "secondary", "color": "#64748b", "name": "Secondary" },
                { "slug": "accent", "color": "#f59e0b", "name": "Accent" },
                { "slug": "background", "color": "#ffffff", "name": "Background" },
                { "slug": "foreground", "color": "#0f172a", "name": "Foreground" }
            ],
            "gradients": [
                {
                    "slug": "primary-to-accent",
                    "gradient": "linear-gradient(135deg, #1e40af 0%, #f59e0b 100%)",
                    "name": "Primary to Accent"
                }
            ],
            "duotone": [
                {
                    "slug": "blue-orange",
                    "colors": ["#1e40af", "#f59e0b"],
                    "name": "Blue Orange"
                }
            ]
        }
    }
}
```

### Generated CSS Variables

```css
:root {
    --wp--preset--color--primary: #1e40af;
    --wp--preset--color--secondary: #64748b;
    --wp--preset--color--accent: #f59e0b;
    --wp--preset--gradient--primary-to-accent: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
}
```

### Typography Settings

```json
{
    "settings": {
        "typography": {
            "fontFamilies": [
                {
                    "slug": "heading",
                    "fontFamily": "'Outfit', sans-serif",
                    "name": "Heading",
                    "fontFace": [
                        {
                            "fontFamily": "Outfit",
                            "fontWeight": "400 700",
                            "fontStyle": "normal",
                            "src": ["file:./assets/fonts/outfit-variable.woff2"]
                        }
                    ]
                },
                {
                    "slug": "body",
                    "fontFamily": "'Inter', sans-serif",
                    "name": "Body",
                    "fontFace": [
                        {
                            "fontFamily": "Inter",
                            "fontWeight": "400",
                            "fontStyle": "normal",
                            "src": ["file:./assets/fonts/inter-regular.woff2"]
                        },
                        {
                            "fontFamily": "Inter",
                            "fontWeight": "600",
                            "fontStyle": "normal",
                            "src": ["file:./assets/fonts/inter-semibold.woff2"]
                        }
                    ]
                }
            ],
            "fontSizes": [
                { "slug": "small", "size": "0.875rem", "name": "Small" },
                { "slug": "medium", "size": "1rem", "name": "Medium" },
                { "slug": "large", "size": "1.25rem", "name": "Large" },
                { "slug": "x-large", "size": "1.5rem", "name": "X-Large" },
                { "slug": "xx-large", "size": "2rem", "name": "XX-Large" }
            ],
            "fluid": true,
            "lineHeight": true,
            "letterSpacing": true,
            "textTransform": true
        }
    }
}
```

### Fluid Typography

```json
{
    "settings": {
        "typography": {
            "fluid": true,
            "fontSizes": [
                {
                    "slug": "large",
                    "size": "1.5rem",
                    "fluid": {
                        "min": "1.25rem",
                        "max": "1.75rem"
                    }
                }
            ]
        }
    }
}
```

---

## 3.3 Layout & Spacing Controls

### Layout Settings

```json
{
    "settings": {
        "layout": {
            "contentSize": "800px",
            "wideSize": "1200px"
        }
    }
}
```

**Usage in templates:**
```html
<!-- Constrained (800px max) -->
<!-- wp:group {"layout":{"type":"constrained"}} -->

<!-- Wide alignment (1200px max) -->
<!-- wp:image {"align":"wide"} -->

<!-- Full width (no max) -->
<!-- wp:cover {"align":"full"} -->
```

### Spacing Presets

```json
{
    "settings": {
        "spacing": {
            "spacingScale": {
                "steps": 7,
                "mediumStep": 1.5,
                "unit": "rem",
                "operator": "*",
                "increment": 1.5
            },
            "spacingSizes": [
                { "slug": "10", "size": "0.25rem", "name": "1" },
                { "slug": "20", "size": "0.5rem", "name": "2" },
                { "slug": "30", "size": "0.75rem", "name": "3" },
                { "slug": "40", "size": "1rem", "name": "4" },
                { "slug": "50", "size": "1.5rem", "name": "5" },
                { "slug": "60", "size": "2rem", "name": "6" },
                { "slug": "70", "size": "3rem", "name": "7" },
                { "slug": "80", "size": "4rem", "name": "8" }
            ],
            "padding": true,
            "margin": true,
            "blockGap": true,
            "units": ["px", "rem", "em", "%", "vw"]
        }
    }
}
```

### Using Spacing in Styles

```json
{
    "styles": {
        "spacing": {
            "blockGap": "var:preset|spacing|40",
            "padding": {
                "top": "var:preset|spacing|50",
                "right": "var:preset|spacing|40",
                "bottom": "var:preset|spacing|50",
                "left": "var:preset|spacing|40"
            }
        }
    }
}
```

---

## 3.4 Block-Level Settings

### Global Feature Toggles

```json
{
    "settings": {
        "appearanceTools": true
    }
}
```

`appearanceTools: true` enables:
- Border (color, radius, style, width)
- Link colors
- Typography (lineHeight, letterSpacing, textDecoration, textTransform)
- Spacing (margin, padding, blockGap)
- Dimensions (minHeight)
- Position (sticky)
- Background images

### Granular Feature Control

```json
{
    "settings": {
        "border": {
            "color": true,
            "radius": true,
            "style": true,
            "width": true
        },
        "shadow": {
            "presets": [
                { "slug": "sm", "shadow": "0 1px 2px rgba(0,0,0,0.05)", "name": "Small" },
                { "slug": "md", "shadow": "0 4px 6px rgba(0,0,0,0.1)", "name": "Medium" },
                { "slug": "lg", "shadow": "0 10px 15px rgba(0,0,0,0.1)", "name": "Large" }
            ]
        },
        "dimensions": {
            "aspectRatio": true,
            "minHeight": true
        },
        "position": {
            "sticky": true
        }
    }
}
```

### Block-Specific Settings

Override settings for specific blocks:

```json
{
    "settings": {
        "blocks": {
            "core/paragraph": {
                "color": {
                    "palette": [
                        { "slug": "text-muted", "color": "#6b7280", "name": "Muted" }
                    ]
                }
            },
            "core/button": {
                "border": {
                    "radius": true
                },
                "spacing": {
                    "padding": true
                }
            },
            "core/heading": {
                "typography": {
                    "fontSizes": [
                        { "slug": "h1", "size": "3rem", "name": "H1" },
                        { "slug": "h2", "size": "2.25rem", "name": "H2" },
                        { "slug": "h3", "size": "1.75rem", "name": "H3" }
                    ]
                }
            }
        }
    }
}
```

---

## 3.5 Global Style Variations

### What Are Style Variations?

Style variations are **alternative theme.json files** that offer different color schemes, typography, or layouts for the same theme.

### Creating Variations

Place variation files in `styles/` folder:

```
my-theme/
├── theme.json           # Default styles
└── styles/
    ├── dark.json        # Dark mode variation
    ├── warm.json        # Warm color scheme
    └── minimal.json     # Minimal typography
```

### Example: dark.json

```json
{
    "$schema": "https://schemas.wp.org/trunk/theme.json",
    "version": 3,
    "title": "Dark",
    "settings": {
        "color": {
            "palette": [
                { "slug": "primary", "color": "#60a5fa", "name": "Primary" },
                { "slug": "background", "color": "#0f172a", "name": "Background" },
                { "slug": "foreground", "color": "#f1f5f9", "name": "Foreground" }
            ]
        }
    },
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--background)",
            "text": "var(--wp--preset--color--foreground)"
        }
    }
}
```

### Accessing Variations

Users find variations in: **Styles → Browse Styles**

---

## 3.6 Custom CSS in theme.json

### Global Custom CSS

```json
{
    "styles": {
        "css": "body { scroll-behavior: smooth; } ::selection { background: var(--wp--preset--color--primary); color: white; }"
    }
}
```

### Block-Specific CSS

```json
{
    "styles": {
        "blocks": {
            "core/button": {
                "css": "& { transition: all 0.2s ease; } &:hover { transform: translateY(-2px); }"
            },
            "core/navigation": {
                "css": "& .wp-block-navigation-link { position: relative; } & .wp-block-navigation-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: currentColor; transition: width 0.3s; } & .wp-block-navigation-link:hover::after { width: 100%; }"
            }
        }
    }
}
```

### CSS Selector `&`

The `&` represents the block's root element:

```json
{
    "styles": {
        "blocks": {
            "core/image": {
                "css": "& img { border-radius: 8px; }"
            }
        }
    }
}
```

Generates:
```css
.wp-block-image img { border-radius: 8px; }
```

---

## 3.7 Interaction with Editor Styles

### Editor-Frontend Consistency

theme.json styles automatically apply to **both** frontend and editor. This ensures WYSIWYG editing.

### When Styles Don't Match

If custom CSS breaks editor styling, use editor-specific overrides:

```css
/* In style.css or editor-style.css */
.editor-styles-wrapper .wp-block-heading {
    /* Editor-only adjustments */
}
```

### Enqueuing Editor Styles

```php
// functions.php
function mytheme_editor_styles() {
    add_editor_style( 'style.css' );
    add_editor_style( 'editor.css' ); // Editor-specific overrides
}
add_action( 'after_setup_theme', 'mytheme_editor_styles' );
```

### iframed Editor (WP 6.3+)

The Site Editor uses an iframe. Styles load automatically from theme.json.

---

## 3.8 Project: Design System Theme

### Objective

Create a complete design system using only theme.json - no custom CSS files.

### Step 1: Color System

```json
{
    "settings": {
        "color": {
            "palette": [
                { "slug": "primary", "color": "#2563eb", "name": "Primary" },
                { "slug": "primary-light", "color": "#3b82f6", "name": "Primary Light" },
                { "slug": "primary-dark", "color": "#1d4ed8", "name": "Primary Dark" },
                { "slug": "secondary", "color": "#64748b", "name": "Secondary" },
                { "slug": "accent", "color": "#f59e0b", "name": "Accent" },
                { "slug": "success", "color": "#10b981", "name": "Success" },
                { "slug": "warning", "color": "#f59e0b", "name": "Warning" },
                { "slug": "error", "color": "#ef4444", "name": "Error" },
                { "slug": "surface", "color": "#f8fafc", "name": "Surface" },
                { "slug": "background", "color": "#ffffff", "name": "Background" },
                { "slug": "foreground", "color": "#0f172a", "name": "Foreground" },
                { "slug": "muted", "color": "#94a3b8", "name": "Muted" }
            ],
            "gradients": [
                {
                    "slug": "primary-gradient",
                    "gradient": "linear-gradient(135deg, var(--wp--preset--color--primary) 0%, var(--wp--preset--color--primary-dark) 100%)",
                    "name": "Primary Gradient"
                }
            ]
        }
    }
}
```

### Step 2: Typography System

```json
{
    "settings": {
        "typography": {
            "fontFamilies": [
                {
                    "slug": "heading",
                    "fontFamily": "'Inter', system-ui, sans-serif",
                    "name": "Heading"
                },
                {
                    "slug": "body",
                    "fontFamily": "'Inter', system-ui, sans-serif",
                    "name": "Body"
                },
                {
                    "slug": "mono",
                    "fontFamily": "'JetBrains Mono', monospace",
                    "name": "Monospace"
                }
            ],
            "fontSizes": [
                { "slug": "xs", "size": "0.75rem", "name": "XS" },
                { "slug": "sm", "size": "0.875rem", "name": "SM" },
                { "slug": "base", "size": "1rem", "name": "Base" },
                { "slug": "lg", "size": "1.125rem", "name": "LG" },
                { "slug": "xl", "size": "1.25rem", "name": "XL" },
                { "slug": "2xl", "size": "1.5rem", "name": "2XL" },
                { "slug": "3xl", "size": "1.875rem", "name": "3XL" },
                { "slug": "4xl", "size": "2.25rem", "name": "4XL" },
                { "slug": "5xl", "size": "3rem", "name": "5XL" }
            ]
        }
    }
}
```

### Step 3: Spacing System

```json
{
    "settings": {
        "spacing": {
            "spacingSizes": [
                { "slug": "0", "size": "0", "name": "0" },
                { "slug": "1", "size": "0.25rem", "name": "1" },
                { "slug": "2", "size": "0.5rem", "name": "2" },
                { "slug": "3", "size": "0.75rem", "name": "3" },
                { "slug": "4", "size": "1rem", "name": "4" },
                { "slug": "5", "size": "1.25rem", "name": "5" },
                { "slug": "6", "size": "1.5rem", "name": "6" },
                { "slug": "8", "size": "2rem", "name": "8" },
                { "slug": "10", "size": "2.5rem", "name": "10" },
                { "slug": "12", "size": "3rem", "name": "12" },
                { "slug": "16", "size": "4rem", "name": "16" },
                { "slug": "20", "size": "5rem", "name": "20" }
            ]
        },
        "layout": {
            "contentSize": "768px",
            "wideSize": "1280px"
        }
    }
}
```

### Step 4: Global Styles

```json
{
    "styles": {
        "color": {
            "background": "var(--wp--preset--color--background)",
            "text": "var(--wp--preset--color--foreground)"
        },
        "typography": {
            "fontFamily": "var(--wp--preset--font-family--body)",
            "fontSize": "var(--wp--preset--font-size--base)",
            "lineHeight": "1.6"
        },
        "spacing": {
            "blockGap": "var(--wp--preset--spacing--6)"
        },
        "elements": {
            "heading": {
                "typography": {
                    "fontFamily": "var(--wp--preset--font-family--heading)",
                    "fontWeight": "700",
                    "lineHeight": "1.2"
                }
            },
            "h1": { "typography": { "fontSize": "var(--wp--preset--font-size--5xl)" } },
            "h2": { "typography": { "fontSize": "var(--wp--preset--font-size--4xl)" } },
            "h3": { "typography": { "fontSize": "var(--wp--preset--font-size--3xl)" } },
            "h4": { "typography": { "fontSize": "var(--wp--preset--font-size--2xl)" } },
            "link": {
                "color": { "text": "var(--wp--preset--color--primary)" },
                ":hover": { "color": { "text": "var(--wp--preset--color--primary-dark)" } }
            },
            "button": {
                "color": {
                    "background": "var(--wp--preset--color--primary)",
                    "text": "var(--wp--preset--color--background)"
                },
                "border": { "radius": "0.375rem" },
                ":hover": {
                    "color": { "background": "var(--wp--preset--color--primary-dark)" }
                }
            }
        }
    }
}
```

### Step 5: Block Styles

```json
{
    "styles": {
        "blocks": {
            "core/button": {
                "spacing": {
                    "padding": {
                        "top": "var(--wp--preset--spacing--3)",
                        "right": "var(--wp--preset--spacing--6)",
                        "bottom": "var(--wp--preset--spacing--3)",
                        "left": "var(--wp--preset--spacing--6)"
                    }
                },
                "css": "& { transition: all 0.2s ease; font-weight: 500; } &:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }"
            },
            "core/code": {
                "typography": { "fontFamily": "var(--wp--preset--font-family--mono)" },
                "color": { "background": "var(--wp--preset--color--surface)" },
                "spacing": { "padding": "var(--wp--preset--spacing--4)" },
                "border": { "radius": "0.5rem" }
            },
            "core/quote": {
                "border": {
                    "left": { "color": "var(--wp--preset--color--primary)", "width": "4px" }
                },
                "spacing": { "padding": { "left": "var(--wp--preset--spacing--6)" } },
                "typography": { "fontStyle": "italic" }
            }
        }
    }
}
```

### Verification Checklist

- [ ] Color palette appears in editor color picker
- [ ] Typography options available in block settings
- [ ] Spacing presets work in margin/padding controls
- [ ] Heading styles apply automatically
- [ ] Button hover effects work
- [ ] Code blocks use monospace font
- [ ] All styles consistent between editor and frontend

---

## Summary

| Topic | Key Concept |
|-------|-------------|
| Schema | version 3, settings vs styles separation |
| Colors | palette array, gradients, duotone |
| Typography | fontFamilies with fontFace, fluid sizes |
| Layout | contentSize, wideSize for alignments |
| Spacing | spacingSizes presets, padding/margin/blockGap |
| Block Settings | appearanceTools, per-block overrides |
| Style Variations | Alternative theme.json files in styles/ |
| Custom CSS | css property with & selector |
| Editor Styles | Automatic consistency via theme.json |

---

## Next Module

**[[04 Block Templates & Query Loops]]** - Control dynamic content using Query Loop block and post templates.
