
### **[[01 Block Theme & Full Site Editing Foundations]]**

Master the modern WordPress Full Site Editing ecosystem. Understand why block themes represent the future of WordPress theming. Learn how Gutenberg, block rendering, and Full Site Editing replace classic PHP template systems. This module establishes the conceptual and technical foundation required for professional block theme development.

| Topic                                        | Focus & Purpose                                                                                                                           |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **[[1.1 Introduction to Block Themes]]**     | What are block themes; classic vs block themes; evolution of Gutenberg; why block themes matter; industry adoption. Conceptual grounding. |
| **[[1.2 Full Site Editing (FSE) Overview]]** | Site Editor interface; template editing; global styles; navigation editor; FSE workflow. Modern WordPress paradigm.                       |
| **[[1.3 Gutenberg Architecture]]**           | How blocks are stored and rendered; block markup; block serialization; frontend rendering process. System understanding.                  |
| **[[1.4 Block Rendering Pipeline]]**         | HTML comment delimiters; block parser; render_block(); server-side rendering. Technical internals.                                        |
| **[[1.5 Development Environment Setup]]**    | LocalWP / Laragon setup; WordPress nightly or latest; enabling FSE; Node.js + npm; wp-env. Tooling setup.                                 |
| **[[1.6 Required Tech Stack]]**              | HTML, CSS, modern JS, React basics, PHP for dynamic blocks. Skill prerequisites.                                                          |
| **[[1.7 WordPress Block Directory]]**        | Core blocks overview; block categories; block capabilities; block support flags. Ecosystem awareness.                                     |
| **[[1.8 Project: FSE Playground Setup]]**    | Install WordPress + FSE theme; explore Site Editor; modify templates; test global styles. Environment readiness.                          |

---

### **[[02 Block Theme File Structure]]**

Learn the anatomy of block themes. Understand required files, folders, and how WordPress resolves block templates. This module ensures you can build a valid block theme skeleton from scratch.

| Topic                                          | Focus & Purpose                                                                                      |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **[[2.1 Required Theme Files]]**               | style.css; theme.json; templates folder; parts folder; screenshot.png. Block theme essentials.       |
| **[[2.2 Block Template Files]]**               | HTML-based templates; index.html; single.html; page.html; archive.html. Template system.             |
| **[[2.3 Template Parts]]**                     | parts/header.html; parts/footer.html; reusable layout components. Layout modularity.                 |
| **[[2.4 Template Resolution Hierarchy]]**      | How WordPress selects block templates; fallback logic; template inheritance. Core mechanics.         |
| **[[2.5 Block Markup in Templates]]**          | Using block syntax inside HTML templates; wp:group; wp:query; wp:navigation. Practical markup usage. |
| **[[2.6 Global Styles Connection]]**           | How templates consume theme.json styles; style engine overview. Styling architecture.                |
| **[[2.7 Hybrid Themes vs Pure Block Themes]]** | Understanding interoperability; migration strategies. Industry transition knowledge.                 |
| **[[2.8 Project: Minimal Block Theme]]**       | Build a working block theme with templates and template parts. Functional base theme.                |

---

### **[[03 theme.json & Global Styles Mastery]]**

Master the theme.json configuration system. Learn how design tokens, global styles, and block settings replace traditional CSS-heavy workflows. theme.json mastery defines professional block theme developers.

| Topic                                      | Focus & Purpose                                                                                    |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **[[3.1 theme.json Schema Overview]]**     | Versioning; settings vs styles; presets. Configuration fundamentals.                               |
| **[[3.2 Color & Typography Systems]]**     | Defining palettes; gradients; font families; font sizes. Design tokens.                            |
| **[[3.3 Layout & Spacing Controls]]**      | contentSize; wideSize; spacing presets; padding/margin control. Layout system.                     |
| **[[3.4 Block-Level Settings]]**           | Enabling block features; appearanceTools; border; shadow; custom spacing. Block capabilities.      |
| **[[3.5 Global Style Variations]]**        | Creating multiple style variations; light/dark themes. Design flexibility.                         |
| **[[3.6 Custom CSS in theme.json]]**       | Injecting CSS via theme.json; scoping styles. Advanced styling.                                    |
| **[[3.7 Interaction with Editor Styles]]** | Ensuring backend and frontend consistency. Editor integration.                                     |
| **[[3.8 Project: Design System Theme]]**   | Implement full color, typography, spacing system using only theme.json. Design-system-based theme. |

---

### **[[04 Block Templates & Query Loops]]**

Control dynamic content using block templates. Learn Query Loop block, post templates, and archive structures. This module replaces classic PHP Loop knowledge for block themes.

| Topic                                      | Focus & Purpose                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------- |
| **[[4.1 Page & Single Templates]]**        | Building page.html; single.html; layout composition with blocks. Content templates.   |
| **[[4.2 Archive & Blog Templates]]**       | archive.html; category.html; tag.html; blog listing. Archive systems.                 |
| **[[4.3 Query Loop Block]]**               | Query parameters; filters; pagination; custom queries. Dynamic content control.       |
| **[[4.4 Post Template Block]]**            | Customizing individual post layout inside query loops. Listing design.                |
| **[[4.5 Navigation Block]]**               | Creating and managing menus in Site Editor. Modern navigation system.                 |
| **[[4.6 Header/Footer Template Parts]]**   | Global structural components. Site-wide layout control.                               |
| **[[4.7 Template Locking & Permissions]]** | Locking blocks; restricting editing. Client-safe themes.                              |
| **[[4.8 Project: Blog & Archive Theme]]**  | Complete blog system with custom templates and query loops. Dynamic publishing theme. |

---

### **[[05 Block Patterns & Reusable Layouts]]**

Develop reusable design patterns. Block patterns accelerate site building and define design consistency across pages. Pattern libraries are essential in professional block themes.

| Topic                                           | Focus & Purpose                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| **[[5.1 Introduction to Block Patterns]]**      | What patterns are; difference from reusable blocks. Concept clarity.           |
| **[[5.2 Registering Patterns]]**                | pattern registration via PHP or pattern files. Technical implementation.       |
| **[[5.3 Pattern Categories]]**                  | Organizing pattern libraries. UX structuring.                                  |
| **[[5.4 Synced vs Unsynced Patterns]]**         | Reusable patterns vs independent instances. Content control.                   |
| **[[5.5 Pattern Design Best Practices]]**       | Responsive patterns; accessibility; consistency. Professional design.          |
| **[[5.6 Integrating Patterns into Templates]]** | Preloading layouts in templates. Site-building acceleration.                   |
| **[[5.7 Pattern Directory Standards]]**         | WordPress pattern directory guidelines. Industry compliance.                   |
| **[[5.8 Project: Pattern Library]]**            | Build full header, hero, services, CTA, footer patterns. Theme pattern system. |

---

### **[[06 Custom Block Development]]**

Extend Gutenberg by building custom blocks. Learn block.json configuration, React-based editing, and PHP rendering. Custom blocks differentiate advanced block theme developers.

| Topic                                         | Focus & Purpose                                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **[[6.1 Block Development Setup]]**           | @wordpress/create-block; build tools; npm workflow. Development environment.                     |
| **[[6.2 block.json Fundamentals]]**           | Block metadata; attributes; supports; styles. Block configuration.                               |
| **[[6.3 Edit & Save Functions]]**             | React edit components; save markup. Block behavior.                                              |
| **[[6.4 Inspector Controls]]**                | Sidebar settings; controls; attributes binding. Editor UX.                                       |
| **[[6.5 Dynamic Blocks with PHP]]**           | render_callback; server-side rendering. Dynamic content blocks.                                  |
| **[[6.6 Block Styles & Variations]]**         | Multiple block designs; style switching. Design flexibility.                                     |
| **[[6.7 Block Registration in Themes]]**      | Bundling blocks inside themes. Theme-block integration.                                          |
| **[[6.8 Project: Custom Interactive Block]]** | Build a dynamic content block with inspector controls and PHP rendering. Advanced block feature. |

---

### **[[07 Styling & Responsive Design in Block Themes]]**

Master block-based styling strategies. Learn when to use theme.json vs custom CSS. Build responsive, accessible, professional-grade designs.

| Topic                                          | Focus & Purpose                                                                            |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **[[7.1 Styling Philosophy in Block Themes]]** | Style engine; CSS specificity; block wrappers. Architecture understanding.                 |
| **[[7.2 Global vs Block Styles]]**             | Controlling scope; best practice separation. Maintainable design systems.                  |
| **[[7.3 Custom CSS Integration]]**             | Additional CSS files; enqueue strategies. Advanced customization.                          |
| **[[7.4 Responsive Block Layouts]]**           | Flexbox & Grid in blocks; responsive settings. Mobile-first layouts.                       |
| **[[7.5 Accessibility in Block Styling]]**     | Color contrast; focus states; semantic blocks. Inclusive design.                           |
| **[[7.6 Style Variations]]**                   | Multiple design presets in one theme. Commercial theme feature.                            |
| **[[7.7 Editor-Frontend Consistency]]**        | Matching backend editor styles to frontend. Professional polish.                           |
| **[[7.8 Project: Responsive Business Theme]]** | Fully responsive, accessible block theme with global design system. Portfolio-ready theme. |

---

### **[[08 PHP Integration & Dynamic Data]]**

Even block themes require PHP. Learn how to register patterns, blocks, menus, and dynamic data connections. PHP integration enables real-world functionality.

| Topic                                           | Focus & Purpose                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| **[[8.1 functions.php in Block Themes]]**       | Theme setup; registering supports; loading assets. Theme initialization.              |
| **[[8.2 Registering Block Patterns]]**          | PHP-based pattern registration. Theme extensibility.                                  |
| **[[8.3 Registering Custom Blocks]]**           | Theme-integrated blocks. Unified architecture.                                        |
| **[[8.4 Custom Post Types with Block Themes]]** | CPT integration with block templates. Structured content.                             |
| **[[8.5 Custom Queries for Blocks]]**           | Query modifications; pre_get_posts. Advanced dynamic control.                         |
| **[[8.6 Dynamic Template Logic]]**              | Conditional template loading. Advanced theming logic.                                 |
| **[[8.7 Plugin Compatibility]]**                | Ensuring blocks work with plugins. Real-world reliability.                            |
| **[[8.8 Project: Dynamic Content Theme]]**      | Block theme displaying CPT content with custom queries. Production-grade integration. |

---

### **[[09 Performance & Accessibility]]**

Professional block themes must be fast and accessible. Learn optimization, style loading efficiency, and accessibility compliance.

| Topic                                        | Focus & Purpose                                                             |
| -------------------------------------------- | --------------------------------------------------------------------------- |
| **[[9.1 Block Theme Performance Basics]]**   | How block assets load; render cost; optimization mindset.                   |
| **[[9.2 Reducing CSS Overhead]]**            | Removing unused block styles; critical CSS. Style efficiency.               |
| **[[9.3 Optimizing Block Rendering]]**       | Avoiding nested block bloat; clean markup. Render optimization.             |
| **[[9.4 Media Optimization]]**               | Responsive images; lazy loading; WebP. Media performance.                   |
| **[[9.5 Core Web Vitals for Block Themes]]** | LCP, CLS, INP improvements. SEO readiness.                                  |
| **[[9.6 Accessibility Standards]]**          | WCAG compliance; ARIA usage; keyboard navigation. Industry requirements.    |
| **[[9.7 Testing Tools]]**                    | Lighthouse; Axe; PageSpeed; Query Monitor. Audit skills.                    |
| **[[9.8 Project: Optimized Theme Audit]]**   | Performance + accessibility optimized block theme. Professional validation. |

---

### **[[10 WooCommerce & Block Themes]]**

Integrate WooCommerce blocks into block themes. Learn store templates, product blocks, and checkout customization. E-commerce readiness is highly valuable in block theming.

| Topic                                         | Focus & Purpose                                                            |
| --------------------------------------------- | -------------------------------------------------------------------------- |
| **[[10.1 WooCommerce Block Architecture]]**   | WooCommerce block-based templates; store editing. Commerce foundation.     |
| **[[10.2 Product & Shop Templates]]**         | Single product; shop; category templates using blocks. Storefront theming. |
| **[[10.3 Cart & Checkout Blocks]]**           | Customizing checkout block experience. Conversion optimization.            |
| **[[10.4 WooCommerce Global Styles]]**        | Styling WooCommerce blocks via theme.json. Visual integration.             |
| **[[10.5 Payment & Account Pages]]**          | Account and order templates. Customer experience.                          |
| **[[10.6 Performance for Stores]]**           | Store optimization strategies. Revenue protection.                         |
| **[[10.7 Plugin Compatibility]]**             | WooCommerce extensions in block themes. Stability assurance.               |
| **[[10.8 Project: Block-Based Store Theme]]** | Complete WooCommerce block theme. Commercial portfolio project.            |

---

### **[[11 Deployment & Distribution]]**

Learn how to package, document, and distribute block themes professionally. Prepare for WordPress.org or commercial marketplaces.

| Topic                                          | Focus & Purpose                                                                         |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| **[[11.1 Theme Documentation]]**               | Writing user & developer documentation. Professional delivery.                          |
| **[[11.2 WordPress Theme Standards]]**         | Block theme requirements; review guidelines. Directory compliance.                      |
| **[[11.3 Child Themes in Block Context]]**     | Extending block themes safely. Update-proof customization.                              |
| **[[11.4 Theme Packaging]]**                   | Building installable ZIP packages. Deployment workflow.                                 |
| **[[11.5 WordPress.org Submission]]**          | Submitting block themes to official directory. Open-source publishing.                  |
| **[[11.6 Commercial Marketplace Standards]]**  | ThemeForest and premium theme requirements. Business readiness.                         |
| **[[11.7 Client Handover]]**                   | Training, documentation, support strategy. Professional service.                        |
| **[[11.8 Project: Market-Ready Block Theme]]** | Fully documented, deployable, commercial-quality block theme. Career-grade deliverable. |

---

### **[[12 Capstone & Career Preparation]]**

Consolidate skills into portfolio-grade projects. Prepare for professional roles in block theme development.

| Topic                                 | Focus & Purpose                                                                   |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| **[[12.1 Capstone Planning]]**        | Selecting project scope; requirements; design planning. Project strategy.         |
| **[[12.2 Full Block Theme Build]]**   | Complete theme development end-to-end. Practical mastery.                         |
| **[[12.3 Testing & QA]]**             | Cross-browser, responsive, accessibility, performance testing. Quality assurance. |
| **[[12.4 Version Control & GitHub]]** | Professional repository management. Portfolio readiness.                          |
| **[[12.5 Live Demo Deployment]]**     | Hosting and showcasing theme. Presentation skills.                                |
| **[[12.6 Case Study Documentation]]** | Writing project case studies. Professional storytelling.                          |
| **[[12.7 Interview Preparation]]**    | Common block theme technical questions. Job readiness.                            |
| **[[12.8 Final Portfolio Review]]**   | Complete professional portfolio. Career launch readiness.                         |

---
