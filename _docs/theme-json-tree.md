# theme.json Structure Reference

> Complete property tree for WordPress theme.json (API Version 3)

---

## Root Structure

```
theme.json
├── $schema                              # JSON schema URL for IDE support
├── version                              # API version (3 for WP 6.6+)
├── settings                             # Feature toggles and presets
├── styles                               # Default styling values
├── customTemplates                      # Custom page/post templates
├── templateParts                        # Header, footer, sidebar definitions
└── patterns                             # Pattern slugs to include
```

---

## Settings

```
settings
│
├── appearanceTools                      # (bool) Enable all design controls at once
├── useRootPaddingAwareAlignments        # (bool) Full-width blocks break out of padding
│
├── color
│   ├── background                       # (bool) Enable background color
│   ├── custom                           # (bool) Allow custom color picker
│   ├── customDuotone                    # (bool) Allow custom duotone filters
│   ├── customGradient                   # (bool) Allow custom gradients
│   ├── defaultDuotone                   # (bool) Show default duotone presets
│   ├── defaultGradients                 # (bool) Show default gradient presets
│   ├── defaultPalette                   # (bool) Show default color palette
│   ├── duotone                          # (array) Custom duotone filter presets
│   │   └── [{ colors, name, slug }]
│   ├── gradients                        # (array) Custom gradient presets
│   │   └── [{ gradient, name, slug }]
│   ├── link                             # (bool) Enable link color control
│   ├── palette                          # (array) Custom color palette
│   │   └── [{ color, name, slug }]
│   └── text                             # (bool) Enable text color
│
├── typography
│   ├── customFontSize                   # (bool) Allow custom font sizes
│   ├── defaultFontSizes                 # (bool) Show default font sizes
│   ├── dropCap                          # (bool) Enable drop cap control
│   ├── fluid                            # (bool|object) Enable fluid typography
│   │   ├── minFontSize                  # (string) Minimum font size
│   │   └── maxViewportWidth             # (string) Max viewport for scaling
│   ├── fontFamilies                     # (array) Font family definitions
│   │   └── [{ fontFamily, name, slug, fontFace }]
│   │       └── fontFace                 # (array) Font files
│   │           └── [{ src, fontWeight, fontStyle, fontFamily }]
│   ├── fontSizes                        # (array) Font size presets
│   │   └── [{ size, name, slug, fluid }]
│   │       └── fluid                    # (object|bool) Responsive sizing
│   │           ├── min                  # (string) Minimum size
│   │           └── max                  # (string) Maximum size
│   ├── fontStyle                        # (bool) Enable font style control
│   ├── fontWeight                       # (bool) Enable font weight control
│   ├── letterSpacing                    # (bool) Enable letter spacing
│   ├── lineHeight                       # (bool) Enable line height control
│   ├── textAlign                        # (bool) Enable text alignment
│   ├── textColumns                      # (bool) Enable text columns
│   ├── textDecoration                   # (bool) Enable text decoration
│   ├── textTransform                    # (bool) Enable text transform
│   └── writingMode                      # (bool) Enable vertical text
│
├── spacing
│   ├── blockGap                         # (bool|null) Enable block gap control
│   ├── customSpacingSize                # (bool) Allow custom spacing values
│   ├── defaultSpacingSizes              # (bool) Show default spacing sizes
│   ├── margin                           # (bool) Enable margin controls
│   ├── padding                          # (bool) Enable padding controls
│   ├── spacingSizes                     # (array) Spacing size presets
│   │   └── [{ size, name, slug }]
│   └── units                            # (array) Allowed CSS units
│       └── ["%", "px", "em", "rem", "vh", "vw"]
│
├── layout
│   ├── contentSize                      # (string) Default content width
│   ├── wideSize                         # (string) Wide alignment width
│   └── allowEditing                     # (bool) Allow users to change layout
│
├── border
│   ├── color                            # (bool) Enable border color
│   ├── radius                           # (bool) Enable border radius
│   ├── style                            # (bool) Enable border style
│   └── width                            # (bool) Enable border width
│
├── shadow
│   ├── defaultPresets                   # (bool) Show default shadow presets
│   └── presets                          # (array) Custom shadow presets
│       └── [{ shadow, name, slug }]
│
├── dimensions
│   ├── aspectRatio                      # (bool) Enable aspect ratio control
│   └── minHeight                        # (bool) Enable min height control
│
├── position
│   └── sticky                           # (bool) Enable sticky positioning
│
├── lightbox
│   ├── enabled                          # (bool) Enable lightbox feature
│   └── allowEditing                     # (bool) Allow users to toggle
│
├── background
│   └── backgroundImage                  # (bool) Enable background images
│
└── blocks                               # Per-block setting overrides
    └── [core/blockname]
        └── (any settings from above)
```

---

## Styles

```
styles
│
├── color
│   ├── background                       # (string) Background color
│   ├── gradient                         # (string) Background gradient
│   └── text                             # (string) Text color
│
├── typography
│   ├── fontFamily                       # (string) Font family
│   ├── fontSize                         # (string) Font size
│   ├── fontStyle                        # (string) Font style (italic, normal)
│   ├── fontWeight                       # (string) Font weight
│   ├── letterSpacing                    # (string) Letter spacing
│   ├── lineHeight                       # (string) Line height
│   ├── textAlign                        # (string) Text alignment
│   ├── textColumns                      # (string) Column count
│   ├── textDecoration                   # (string) Text decoration
│   ├── textTransform                    # (string) Text transform
│   └── writingMode                      # (string) Writing direction
│
├── spacing
│   ├── blockGap                         # (string) Gap between blocks
│   ├── margin                           # (object) Margin values
│   │   ├── top
│   │   ├── right
│   │   ├── bottom
│   │   └── left
│   └── padding                          # (object) Padding values
│       ├── top
│       ├── right
│       ├── bottom
│       └── left
│
├── border
│   ├── color                            # (string) Border color
│   ├── radius                           # (string|object) Border radius
│   │   ├── topLeft
│   │   ├── topRight
│   │   ├── bottomRight
│   │   └── bottomLeft
│   ├── style                            # (string) Border style
│   └── width                            # (string) Border width
│
├── outline
│   ├── color                            # (string) Outline color
│   ├── offset                           # (string) Outline offset
│   ├── style                            # (string) Outline style
│   └── width                            # (string) Outline width
│
├── shadow                               # (string) Box shadow
│
├── filter
│   └── duotone                          # (string) Duotone filter preset
│
├── css                                  # (string) Custom CSS for root
│
├── elements                             # HTML element styles
│   ├── button
│   │   ├── color
│   │   ├── typography
│   │   ├── spacing
│   │   ├── border
│   │   ├── :hover
│   │   ├── :focus
│   │   └── :active
│   ├── caption
│   │   └── (same as button)
│   ├── cite
│   │   └── (same as button)
│   ├── heading                          # All headings (h1-h6)
│   │   └── (same as button)
│   ├── h1
│   │   └── (same as button)
│   ├── h2
│   │   └── (same as button)
│   ├── h3
│   │   └── (same as button)
│   ├── h4
│   │   └── (same as button)
│   ├── h5
│   │   └── (same as button)
│   ├── h6
│   │   └── (same as button)
│   └── link
│       ├── color
│       ├── typography
│       ├── :hover
│       ├── :focus
│       └── :active
│
└── blocks                               # Per-block style overrides
    └── [core/blockname]
        ├── color
        ├── typography
        ├── spacing
        ├── border
        ├── shadow
        ├── css                          # (string) Custom CSS for this block
        ├── elements                     # Element styles within this block
        │   └── (link, button, etc.)
        └── variations                   # Block style variations
            └── [variation-slug]
                └── (any style properties)
```

---

## Template Parts

```
templateParts
└── [
    {
        "area": "header|footer|uncategorized",
        "name": "filename-without-extension",
        "title": "Display Name"
    }
]
```

---

## Custom Templates

```
customTemplates
└── [
    {
        "name": "template-slug",
        "title": "Display Name",
        "postTypes": ["page", "post"]
    }
]
```

---

## Patterns

```
patterns
└── [
    "pattern-slug-from-directory"
]
```

---

## Value Reference

### Referencing Presets in Styles

```
var:preset|color|{slug}           →  --wp--preset--color--{slug}
var:preset|font-size|{slug}       →  --wp--preset--font-size--{slug}
var:preset|font-family|{slug}     →  --wp--preset--font-family--{slug}
var:preset|spacing|{slug}         →  --wp--preset--spacing--{slug}
var:preset|gradient|{slug}        →  --wp--preset--gradient--{slug}
var:preset|shadow|{slug}          →  --wp--preset--shadow--{slug}
```

### File Paths

```
file:./assets/fonts/font.woff2    →  Relative to theme root
file:./images/background.jpg      →  Relative to theme root
```

---

## Quick Examples

### Minimal theme.json

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
    }
}
```

### Custom Color

```json
{
    "settings": {
        "color": {
            "palette": [
                {
                    "color": "#0073aa",
                    "name": "Primary",
                    "slug": "primary"
                }
            ]
        }
    },
    "styles": {
        "color": {
            "background": "var:preset|color|primary"
        }
    }
}
```

### Custom Font

```json
{
    "settings": {
        "typography": {
            "fontFamilies": [
                {
                    "fontFamily": "Inter, sans-serif",
                    "name": "Inter",
                    "slug": "inter",
                    "fontFace": [
                        {
                            "src": ["file:./assets/fonts/inter.woff2"],
                            "fontWeight": "400 700",
                            "fontStyle": "normal"
                        }
                    ]
                }
            ]
        }
    }
}
```

---

*Schema: https://schemas.wp.org/wp/6.7/theme.json*
