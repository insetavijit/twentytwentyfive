/**
 * Recent Posts Block
 *
 * A dynamic block that displays recent post titles with dates.
 */

import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType('theme/recent-posts', {
    edit: function Edit({ attributes, setAttributes }) {
        const { postsToShow, showDate, category, dateFormat } = attributes;
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Settings', 'twentytwentyfive')}>
                        <RangeControl
                            label={__('Number of posts', 'twentytwentyfive')}
                            value={postsToShow}
                            onChange={(value) => setAttributes({ postsToShow: value })}
                            min={1}
                            max={20}
                        />
                        <ToggleControl
                            label={__('Show post date', 'twentytwentyfive')}
                            checked={showDate}
                            onChange={(value) => setAttributes({ showDate: value })}
                        />
                        <TextControl
                            label={__('Category (slug)', 'twentytwentyfive')}
                            value={category}
                            onChange={(value) => setAttributes({ category: value })}
                            help={__('Leave empty to show all categories', 'twentytwentyfive')}
                        />
                        {showDate && (
                            <TextControl
                                label={__('Date format', 'twentytwentyfive')}
                                value={dateFormat}
                                onChange={(value) => setAttributes({ dateFormat: value })}
                                help={__('PHP date format (e.g., M j, Y)', 'twentytwentyfive')}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <ServerSideRender
                        block="theme/recent-posts"
                        attributes={attributes}
                    />
                </div>
            </>
        );
    },

    // Dynamic blocks don't need a save function - PHP handles rendering
    save: function Save() {
        return null;
    },
});
