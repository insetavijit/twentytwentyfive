# Environment Setup Recommendations for Twenty Twenty-Five Theme

> WordPress Full Site Editing (FSE) Block Theme Development Environment

---

## 📋 Project Overview

| Property | Value |
|----------|-------|
| **Theme** | Twenty Twenty-Five v1.4 |
| **Type** | WordPress FSE/Block Theme |
| **WP Version** | Requires 6.7+, Tested up to 6.9 |
| **PHP Version** | ≥ 7.2 |
| **Node.js** | ≥ 20.10.0 |
| **NPM** | ≥ 10.2.3 |

---

## 🖥️ Local Development Environment

### Option 1: Laravel Herd (Recommended for Windows)
```bash
# Download and install Laravel Herd for Windows
# https://herd.laravel.com/windows
# Herd includes PHP, Nginx, and easy WordPress site setup
```

### Option 2: Local by Flywheel (WordPress-Focused)
- Download: https://localwp.com/
- Benefits: One-click WordPress setup, SSL, Mailhog, WP-CLI included

### Option 3: XAMPP/Laragon
```bash
# Laragon (Windows) - Lightweight alternative
# https://laragon.org/download/
```

### Option 4: Docker with WordPress
```yaml
# docker-compose.yml
version: '3.8'
services:
  wordpress:
    image: wordpress:latest
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
    volumes:
      - ./:/var/www/html/wp-content/themes/twentytwentyfive
  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress
      MYSQL_ROOT_PASSWORD: rootpassword
```

---

## 📦 Node.js Dependencies

### Install Dependencies
```bash
npm install
```

### Current Dev Dependencies (from package.json)
| Package | Version | Purpose |
|---------|---------|---------|
| `@wordpress/browserslist-config` | ^6.34.0 | Browser compatibility config |
| `postcss` | ^8.5.6 | CSS processing |
| `postcss-cli` | ^11.0.1 | PostCSS command line |
| `cssnano` | ^7.1.2 | CSS minification |

### Available Scripts
```bash
npm run build   # Build minified CSS (style.min.css)
npm run watch   # Watch mode for CSS development
```

---

## 🔌 Recommended WordPress Plugins

### Essential for FSE Theme Development

| Plugin | Purpose | Link |
|--------|---------|------|
| **Gutenberg** | Latest block editor features | [Download](https://wordpress.org/plugins/gutenberg/) |
| **Query Monitor** | Debug queries, hooks, assets | [Download](https://wordpress.org/plugins/query-monitor/) |
| **Create Block Theme** | Export/create block themes | [Download](https://wordpress.org/plugins/create-block-theme/) |

### Development & Debugging

| Plugin | Purpose |
|--------|---------|
| **Debug Bar** | Debug information panel |
| **Theme Check** | Validate theme code standards |
| **Developer** | Dev-oriented WP config |
| **Log Deprecated Notices** | Track deprecated function usage |

### Block Pattern & Design

| Plugin | Purpose |
|--------|---------|
| **Pattern Manager** | Organize block patterns |
| **Starter Templates** | Additional design patterns |
| **Spectra** | Advanced block controls |

### Performance Testing

| Plugin | Purpose |
|--------|---------|
| **Asset CleanUp** | Analyze loaded assets |
| **LiteSpeed Cache** | Performance optimization |
| **WP Performance Profiler** | Identify bottlenecks |

---

## ⚙️ WordPress Configuration (wp-config.php)

```php
// Enable WordPress Debug Mode
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );

// Script/Style Debug (loads non-minified assets)
define( 'SCRIPT_DEBUG', true );

// Theme Development
define( 'WP_ENVIRONMENT_TYPE', 'local' );
define( 'SAVEQUERIES', true );

// Allow Theme/Plugin File Editing (caution in production)
define( 'DISALLOW_FILE_EDIT', false );

// Auto-save interval
define( 'AUTOSAVE_INTERVAL', 120 );
```

---

## 🛠️ VS Code Extensions

### Essential Extensions

| Extension | ID | Purpose |
|-----------|----|---------| 
| **PHP Intelephense** | `bmewburn.vscode-intelephense-client` | PHP intelligence |
| **WordPress Snippets** | `wordpresstoolbox.wordpress-toolbox` | WP code snippets |
| **PHP DocBlocker** | `neilbrayfield.php-docblocker` | PHP documentation |
| **EditorConfig** | `editorconfig.editorconfig` | Consistent coding style |

### Block Theme Specific

| Extension | ID | Purpose |
|-----------|----|---------| 
| **JSON Schema Store** | `remcohaszing.schemastore` | theme.json schema support |
| **PostCSS Language Support** | `csstools.postcss` | PostCSS syntax |
| **Prettier** | `esbenp.prettier-vscode` | Code formatting |
| **CSS Peek** | `pranaygp.vscode-css-peek` | CSS class navigation |

### Optional Recommended

| Extension | Purpose |
|-----------|---------|
| **Error Lens** | Inline error highlighting |
| **GitLens** | Git integration |
| **Todo Tree** | Track TODOs in code |
| **Color Highlight** | CSS color previews |

### VS Code Settings
```json
{
  "[php]": {
    "editor.defaultFormatter": "bmewburn.vscode-intelephense-client"
  },
  "files.associations": {
    "*.json": "jsonc",
    "theme.json": "json"
  },
  "json.schemas": [
    {
      "fileMatch": ["theme.json"],
      "url": "https://schemas.wp.org/wp/6.7/theme.json"
    }
  ],
  "emmet.includeLanguages": {
    "php": "html"
  }
}
```

---

## 📁 Project Structure Overview

```
twentytwentyfive/
├── assets/
│   ├── css/          # Editor styles
│   ├── fonts/        # Custom fonts (Manrope, Fira Code)
│   └── images/       # Theme images
├── parts/            # Template parts (headers, footers)
├── patterns/         # 98 block patterns
├── styles/           # 32 style variations (JSON)
├── templates/        # 8 page templates
├── functions.php     # Theme functions
├── style.css         # Theme metadata & frontend styles
├── style.min.css     # Minified CSS (production)
└── theme.json        # Global styles & settings (WP 6.7 schema)
```

---

## 🧪 Testing Tools

### PHP Testing
```bash
# PHPUnit with WordPress Test Suite
composer require --dev phpunit/phpunit
composer require --dev yoast/phpunit-polyfills

# PHP CodeSniffer with WordPress Standards
composer require --dev squizlabs/php_codesniffer
composer require --dev wp-coding-standards/wpcs
composer require --dev phpcompatibility/phpcompatibility-wp
```

### Linting & Code Quality
```bash
# Add these to package.json devDependencies
npm install --save-dev stylelint stylelint-config-wordpress

# Run PHP CodeSniffer
./vendor/bin/phpcs --standard=WordPress .
```

---

## 🌐 Additional CLI Tools

### WP-CLI (Essential)
```bash
# Install WP-CLI globally (if not using Local)
# https://make.wordpress.org/cli/handbook/guides/installing/

# Useful WP-CLI commands for theme dev:
wp theme activate twentytwentyfive
wp theme list
wp theme status twentytwentyfive
wp export --dir=./backups
wp db export backup.sql
wp cache flush
```

### @wordpress/env (Docker-based)
```bash
# Alternative WordPress development environment
npm install -g @wordpress/env

# Start environment
wp-env start

# Stop environment
wp-env stop
```

### @wordpress/create-block
```bash
# For creating custom blocks
npx @wordpress/create-block my-custom-block
```

---

## 📊 Theme Features to Note

### Typography
- **Heading Font**: Manrope (Variable, 200-800 weight)
- **Code Font**: Fira Code (Monospace, Variable)
- Fluid typography enabled

### Colors (8 palette colors)
| Slug | Color | Use |
|------|-------|-----|
| base | #FFFFFF | Background |
| contrast | #111111 | Text |
| accent-1 | #FFEE58 | Yellow accent |
| accent-2 | #F6CFF4 | Pink accent |
| accent-3 | #503AA8 | Purple accent |
| accent-4 | #686868 | Muted text |
| accent-5 | #FBFAF3 | Alt background |
| accent-6 | currentColor 20% | Borders |

### Style Variations (32 presets)
- Time-based: Evening, Noon, Dusk, Afternoon, Twilight, Morning, Sunrise, Midnight
- Color variations, Typography variations, Section variations

---

## 🚀 Quick Start Checklist

- [ ] Install local WordPress environment (Herd/Local/Docker)
- [ ] Ensure WordPress 6.7+ installed
- [ ] Clone/copy theme to `wp-content/themes/`
- [ ] Run `npm install` in theme directory
- [ ] Activate theme in WordPress admin
- [ ] Install Gutenberg plugin for latest features
- [ ] Install Query Monitor for debugging
- [ ] Configure `wp-config.php` debug settings
- [ ] Install VS Code extensions
- [ ] Run `npm run watch` for CSS development

---

## 🔗 Useful Resources

- [WordPress Block Theme Handbook](https://developer.wordpress.org/themes/block-themes/)
- [theme.json Reference](https://developer.wordpress.org/themes/global-settings-and-styles/)
- [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Full Site Editing Documentation](https://fullsiteediting.com/)
- [Twenty Twenty-Five Theme Page](https://wordpress.org/themes/twentytwentyfive/)
- [WordPress GitHub Repository](https://github.com/WordPress/gutenberg)
