# WordPress Core Blocks Reference

A quick reference for all core blocks available in WordPress, organized by category.

---

## Text Blocks

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Paragraph | `wp:paragraph` | Basic text content | No |
| Heading | `wp:heading` | H1-H6 headings | No |
| List | `wp:list` | Bulleted or numbered lists | No |
| List Item | `wp:list-item` | Individual list items | No |
| Quote | `wp:quote` | Blockquote with citation | No |
| Code | `wp:code` | Preformatted code snippet | No |
| Preformatted | `wp:preformatted` | Whitespace-preserved text | No |
| Pullquote | `wp:pullquote` | Styled quote callout | No |
| Verse | `wp:verse` | Poetry/lyrics formatting | No |
| Table | `wp:table` | Data table | No |
| Details | `wp:details` | Collapsible content (accordion) | No |
| Footnotes | `wp:footnotes` | Footnote references | No |

---

## Media Blocks

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Image | `wp:image` | Single image | No |
| Gallery | `wp:gallery` | Image gallery grid | No |
| Audio | `wp:audio` | Audio player | No |
| Video | `wp:video` | Video player | No |
| Cover | `wp:cover` | Image/video with overlay | No |
| File | `wp:file` | Downloadable file link | No |
| Media & Text | `wp:media-text` | Side-by-side media/content | No |

---

## Design Blocks

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Group | `wp:group` | Container for blocks | No |
| Columns | `wp:columns` | Multi-column layout | No |
| Column | `wp:column` | Single column | No |
| Row | `wp:group` | Horizontal flex container | No |
| Stack | `wp:group` | Vertical flex container | No |
| Buttons | `wp:buttons` | Button group container | No |
| Button | `wp:button` | Clickable button | No |
| Separator | `wp:separator` | Horizontal divider | No |
| Spacer | `wp:spacer` | Vertical space | No |

---

## Theme Blocks (Dynamic)

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Site Title | `wp:site-title` | Site name from settings | ✅ Yes |
| Site Tagline | `wp:site-tagline` | Site description | ✅ Yes |
| Site Logo | `wp:site-logo` | Logo from customizer | ✅ Yes |
| Navigation | `wp:navigation` | Menu navigation | ✅ Yes |
| Navigation Link | `wp:navigation-link` | Single nav item | No |
| Template Part | `wp:template-part` | Include header/footer | ✅ Yes |
| Pattern | `wp:pattern` | Include a pattern | ✅ Yes |
| Login/Logout | `wp:loginout` | Login/logout link | ✅ Yes |

---

## Post Blocks (Dynamic)

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Post Title | `wp:post-title` | Current post title | ✅ Yes |
| Post Content | `wp:post-content` | Current post body | ✅ Yes |
| Post Excerpt | `wp:post-excerpt` | Current post excerpt | ✅ Yes |
| Post Featured Image | `wp:post-featured-image` | Thumbnail | ✅ Yes |
| Post Date | `wp:post-date` | Publish date | ✅ Yes |
| Post Author | `wp:post-author` | Author info | ✅ Yes |
| Post Author Name | `wp:post-author-name` | Author display name | ✅ Yes |
| Post Author Bio | `wp:post-author-biography` | Author bio | ✅ Yes |
| Post Terms | `wp:post-terms` | Categories/tags | ✅ Yes |
| Post Navigation | `wp:post-navigation-link` | Prev/next links | ✅ Yes |
| Read More | `wp:read-more` | Continue reading link | No |

---

## Query Blocks (Dynamic)

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Query Loop | `wp:query` | Post loop container | ✅ Yes |
| Post Template | `wp:post-template` | Template for each post | ✅ Yes |
| Query Pagination | `wp:query-pagination` | Pagination wrapper | ✅ Yes |
| Pagination Numbers | `wp:query-pagination-numbers` | Page numbers | ✅ Yes |
| Pagination Previous | `wp:query-pagination-previous` | Previous link | ✅ Yes |
| Pagination Next | `wp:query-pagination-next` | Next link | ✅ Yes |
| Query Title | `wp:query-title` | Archive title | ✅ Yes |
| Query No Results | `wp:query-no-results` | Empty state | No |

---

## Widget Blocks (Dynamic)

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Archives | `wp:archives` | Archive links by date | ✅ Yes |
| Categories | `wp:categories` | Category list | ✅ Yes |
| Latest Comments | `wp:latest-comments` | Recent comments | ✅ Yes |
| Latest Posts | `wp:latest-posts` | Recent posts list | ✅ Yes |
| Page List | `wp:page-list` | List of pages | ✅ Yes |
| RSS | `wp:rss` | RSS feed display | ✅ Yes |
| Search | `wp:search` | Search form | ✅ Yes |
| Tag Cloud | `wp:tag-cloud` | Tag cloud widget | ✅ Yes |
| Calendar | `wp:calendar` | Post calendar | ✅ Yes |
| Social Links | `wp:social-links` | Social media icons | No |
| Social Link | `wp:social-link` | Individual social icon | No |

---

## Comment Blocks (Dynamic)

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Comments | `wp:comments` | Comments section | ✅ Yes |
| Comment Template | `wp:comment-template` | Single comment layout | ✅ Yes |
| Comment Author | `wp:comment-author-name` | Commenter name | ✅ Yes |
| Comment Date | `wp:comment-date` | Comment timestamp | ✅ Yes |
| Comment Content | `wp:comment-content` | Comment text | ✅ Yes |
| Comment Reply | `wp:comment-reply-link` | Reply link | ✅ Yes |
| Comment Edit | `wp:comment-edit-link` | Edit link | ✅ Yes |
| Comments Form | `wp:post-comments-form` | Add comment form | ✅ Yes |
| Comments Count | `wp:comments-title` | Comment count | ✅ Yes |
| Comments Pagination | `wp:comments-pagination` | Pagination | ✅ Yes |

---

## Embed Blocks

| Block | Markup | Description | Dynamic |
|-------|--------|-------------|---------|
| Embed | `wp:embed` | Generic embed | No |
| YouTube | `wp:embed` | YouTube video | No |
| Twitter/X | `wp:embed` | Tweet embed | No |
| Vimeo | `wp:embed` | Vimeo video | No |
| Spotify | `wp:embed` | Spotify embed | No |
| SoundCloud | `wp:embed` | Audio embed | No |
| TikTok | `wp:embed` | TikTok video | No |
| Instagram | `wp:embed` | Instagram post | No |

---

## Summary by Type

| Type | Static | Dynamic |
|------|--------|---------|
| Text | 12 | 0 |
| Media | 7 | 0 |
| Design | 9 | 0 |
| Theme | 2 | 5 |
| Post | 1 | 10 |
| Query | 1 | 7 |
| Widget | 2 | 10 |
| Comment | 0 | 10 |
| Embed | 8+ | 0 |

**Total:** ~50 static blocks, ~40+ dynamic blocks

---

## Common Blocks in FSE Themes

Most frequently used in templates:

| Block | Usage |
|-------|-------|
| `wp:template-part` | Include header/footer |
| `wp:group` | Layout container |
| `wp:post-content` | Page/post body |
| `wp:query` | Post loops |
| `wp:navigation` | Menus |
| `wp:site-title` | Branding |
| `wp:pattern` | Include patterns |
