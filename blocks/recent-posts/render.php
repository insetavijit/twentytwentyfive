<?php
/**
 * Renders the Recent Posts block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block content.
 * @param WP_Block $block      Block instance.
 *
 * @package theme/recent-posts
 */

// Get attributes with defaults.
$posts_to_show = $attributes['postsToShow'] ?? 5;
$show_date     = $attributes['showDate'] ?? true;
$category      = $attributes['category'] ?? '';
$date_format   = $attributes['dateFormat'] ?? 'M j, Y';

// Build query arguments.
$args = array(
    'numberposts' => $posts_to_show,
    'post_status' => 'publish',
    'orderby'     => 'date',
    'order'       => 'DESC',
);

// Add category filter if specified.
if ( ! empty( $category ) ) {
    $args['category_name'] = $category;
}

// Fetch posts.
$recent_posts = get_posts( $args );

// Get wrapper attributes with theme block supports.
$wrapper_attributes = get_block_wrapper_attributes( array(
    'class' => 'wp-block-theme-recent-posts',
) );
?>

<div <?php echo $wrapper_attributes; ?>>
    <?php if ( ! empty( $recent_posts ) ) : ?>
        <ul class="recent-posts-list">
            <?php foreach ( $recent_posts as $post ) : ?>
                <li class="recent-posts-item">
                    <a href="<?php echo esc_url( get_permalink( $post ) ); ?>" class="recent-posts-link">
                        <?php echo esc_html( get_the_title( $post ) ); ?>
                    </a>
                    <?php if ( $show_date ) : ?>
                        <time class="recent-posts-date" datetime="<?php echo esc_attr( get_the_date( 'c', $post ) ); ?>">
                            <?php echo esc_html( get_the_date( $date_format, $post ) ); ?>
                        </time>
                    <?php endif; ?>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else : ?>
        <p class="recent-posts-empty"><?php esc_html_e( 'No posts found.', 'twentytwentyfive' ); ?></p>
    <?php endif; ?>
</div>
