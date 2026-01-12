# WordPress theme.json Complete Guide

> The master configuration file for WordPress Full Site Editing (FSE) themes.

---

## What is theme.json?

`theme.json` is a **central configuration file** introduced in WordPress 5.8 that provides a standardized way to define a theme's design settings and styles. It acts as a master control panel for block-based themes, consolidating global styles, typography, colors, spacing, and block-specific configurations into a single JSON file.

### Why It Matters

| Before theme.json | After theme.json |
|-------------------|------------------|
| Scattered settings across `functions.php`, CSS files, and theme options | Single source of truth for theme configuration |
| Complex PHP hooks for enabling features | Simple JSON declarations |
| Manual CSS custom properties | Automatic CSS variable generation |
| Inconsistent editor vs. frontend styles | Unified styling across editor and frontend |

---

## Location & Structure

The `theme.json` file resides in the **root directory** of a block theme:

```plaintext
your-theme/
├── theme.json         ← The configuration file
├── style.css
├── templates/
├── parts/
└── ...
```

---

## Schema Version

Every `theme.json` starts with schema and version declarations:

```json
{
    "$schema": "https://schemas.wp.org/wp/6.7/theme.json",
    "version": 3
}
```

- **`$schema`**: Provides IDE intellisense and validation
- **`version`**: The theme.json API version (version 3 is the latest as of WordPress 6.6+)

---

## Core Sections Overview

```
                              ┌─────────────┐
                              │ theme.json  │
                              └──────┬──────┘
           ┌──────────┬───────┬──────┴──────┬──────────────┐
           ▼          ▼       ▼             ▼              ▼
     ┌──────────┐ ┌────────┐ ┌─────────────┐ ┌───────────────┐ ┌──────────┐
     │ settings │ │ styles │ │templateParts│ │customTemplates│ │ patterns │
     └────┬─────┘ └───┬────┘ └─────────────┘ └───────────────┘ └──────────┘
          │           │
    ┌─────┴─────┐  ┌──┴───────────────┐
    ▼     ▼     ▼  ▼         ▼        ▼
┌───────┐│┌─────┐┌──────────┐┌──────────┐┌──────────────┐
│ color ││spacing││Global    ││Block     ││Element       │
│       ││      ││Styles    ││Styles    ││Styles        │
└───────┘│└─────┘└──────────┘└──────────┘└──────────────┘
┌────────────┐
│ typography │
└────────────┘
┌────────┐
│ layout │
└────────┘
```

---

## 1. Settings Section

The `settings` section **enables features** and **defines presets** available in the editor.

### 1.1 Appearance Tools

Enable a suite of design controls with one setting:

```json
{
    "settings": {
        "appearanceTools": true
    }
}
```

This enables: `border`, `dimensions`, `position`, `spacing`, and `typography` options.

---

### 1.2 Color Configuration

Define your theme's color palette and color-related features:

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

**Key Properties:**
| Property | Purpose |
|----------|---------|
| `defaultPalette` | Include/exclude WordPress default colors |
| `defaultDuotone` | Include/exclude default duotone filters |
| `defaultGradients` | Include/exclude default gradients |
| `palette` | Define custom color presets |

**Generated CSS Variables:**
```css
--wp--preset--color--base: #FFFFFF;
--wp--preset--color--contrast: #111111;
--wp--preset--color--accent-1: #FFEE58;
```

---

### 1.3 Layout Configuration

Control content width constraints:

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

- **`contentSize`**: Default width for content blocks
- **`wideSize`**: Maximum width for "wide" aligned blocks

---

### 1.4 Typography Configuration

Define font families, sizes, and typography features:

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

**Fluid Typography:** Automatically scales font sizes between `min` and `max` based on viewport width.

---

### 1.5 Spacing Configuration

Define spacing presets and allowed units:

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
                }
            ],
            "units": ["%", "px", "em", "rem", "vh", "vw"]
        }
    }
}
```

**Generated CSS Variables:**
```css
--wp--preset--spacing--20: 10px;
--wp--preset--spacing--50: clamp(30px, 5vw, 50px);
```

---

## 2. Styles Section

The `styles` section applies **default styling** to the site, elements, and blocks.

### 2.1 Global Styles

Root-level styles applied to the entire site:

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

> [!TIP]
> Use the `var:preset|type|slug` syntax to reference presets defined in settings.

---

### 2.2 Element Styles

Style HTML elements globally:

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

**Available Elements:** `button`, `caption`, `cite`, `heading`, `h1`-`h6`, `link`

---

### 2.3 Block Styles

Target specific blocks with custom styling:

```json
{
    "styles": {
        "blocks": {
            "core/code": {
                "typography": {
                    "fontFamily": "var:preset|font-family|fira-code",
                    "fontSize": "var:preset|font-size|medium"
                },
                "color": {
                    "background": "var:preset|color|accent-5",
                    "text": "var:preset|color|contrast"
                },
                "spacing": {
                    "padding": {
                        "top": "var:preset|spacing|40",
                        "right": "var:preset|spacing|40",
                        "bottom": "var:preset|spacing|40",
                        "left": "var:preset|spacing|40"
                    }
                }
            },
            "core/navigation": {
                "typography": {
                    "fontSize": "var:preset|font-size|medium"
                },
                "elements": {
                    "link": {
                        ":hover": {
                            "typography": {
                                "textDecoration": "underline"
                            }
                        },
                        "typography": {
                            "textDecoration": "none"
                        }
                    }
                }
            }
        }
    }
}
```

---

### 2.4 Custom CSS in theme.json

Inject custom CSS directly within block definitions:

```json
{
    "styles": {
        "blocks": {
            "core/list": {
                "css": "& li{margin-top: 0.5rem;}"
            },
            "core/search": {
                "css": "& .wp-block-search__input{border-radius:3.125rem;}"
            }
        }
    }
}
```

> [!NOTE]
> Use `&` as the block selector placeholder. This compiles to the block's wrapper class.

---

### 2.5 Block Variations

Style block style variations:

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
                        },
                        "css": ".wp-block-button__link:not(.has-background):hover {background-color:color-mix(in srgb, var(--wp--preset--color--contrast) 5%, transparent);}"
                    }
                }
            }
        }
    }
}
```

---

## 3. Template Parts

Register reusable template parts for headers, footers, and more:

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

**Standard Areas:**
- `header` — Renders in the header position
- `footer` — Renders in the footer position
- `uncategorized` — General purpose template parts

Template part files are stored in `/parts/` directory:
```plaintext
parts/
├── header.html
├── vertical-header.html
├── footer.html
└── sidebar.html
```

---

## 4. Custom Templates

Define custom page/post templates:

```json
{
    "customTemplates": [
        {
            "name": "page-no-title",
            "postTypes": ["page"],
            "title": "Page No Title"
        },
        {
            "name": "blank-canvas",
            "postTypes": ["page", "post"],
            "title": "Blank Canvas"
        }
    ]
}
```

Template files are stored in `/templates/` directory:
```plaintext
templates/
├── index.html
├── page.html
├── page-no-title.html
└── blank-canvas.html
```

---

## Style Hierarchy

Understanding the cascade of styles in WordPress:

```
┌───────────────────────────────┐
│   WordPress Core Defaults     │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│  theme.json Settings/Styles   │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│     Child Theme theme.json    │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│      User Global Styles       │
│  (Site Editor customizations) │
└───────────────┬───────────────┘
                ▼
┌───────────────────────────────┐
│    Final Rendered Styles      │
└───────────────────────────────┘
```

> [!IMPORTANT]
> User customizations made in the Site Editor always take precedence over theme.json definitions.

---

## CSS Custom Properties

Theme.json automatically generates CSS custom properties (variables):

| Preset Type | CSS Variable Pattern | Example |
|-------------|---------------------|---------|
| Colors | `--wp--preset--color--{slug}` | `--wp--preset--color--base` |
| Font Sizes | `--wp--preset--font-size--{slug}` | `--wp--preset--font-size--large` |
| Font Families | `--wp--preset--font-family--{slug}` | `--wp--preset--font-family--manrope` |
| Spacing | `--wp--preset--spacing--{slug}` | `--wp--preset--spacing--50` |
| Gradients | `--wp--preset--gradient--{slug}` | `--wp--preset--gradient--vivid` |

**Referencing in theme.json:**
```json
"color": {
    "background": "var:preset|color|base"
}
```

**Referencing in CSS:**
```css
.my-element {
    background: var(--wp--preset--color--base);
}
```

---

## Benefits Summary

| Benefit | Description |
|---------|-------------|
| **Centralization** | All design tokens in one file |
| **Consistency** | Same styles in editor and frontend |
| **Performance** | Efficient CSS generation |
| **User Customization** | Global Styles UI integration |
| **Future-Proof** | Aligns with WordPress evolution |
| **Developer Experience** | IDE support with JSON schema |

---

## Quick Reference

### Commonly Used Settings

```json
{
    "settings": {
        "appearanceTools": true,
        "useRootPaddingAwareAlignments": true,
        "color": {
            "defaultPalette": false,
            "custom": true
        },
        "typography": {
            "fluid": true,
            "customFontSize": true
        },
        "layout": {
            "contentSize": "660px",
            "wideSize": "1200px"
        }
    }
}
```

### Minimal Block Theme theme.json

```json
{
    "$schema": "https://schemas.wp.org/wp/6.7/theme.json",
    "version": 3,
    "settings": {
        "appearanceTools": true,
        "layout": {
            "contentSize": "800px",
            "wideSize": "1200px"
        }
    },
    "styles": {
        "spacing": {
            "padding": {
                "left": "20px",
                "right": "20px"
            }
        }
    }
}
```

---

## Resources

- [WordPress Theme Handbook - theme.json](https://developer.wordpress.org/themes/advanced-topics/theme-json/)
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/)
- [Full Site Editing Documentation](https://fullsiteediting.com/)
- [theme.json Schema Reference](https://schemas.wp.org/)

---

*Last updated: January 2026*
