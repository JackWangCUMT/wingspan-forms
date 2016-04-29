/* Copyright (c) 2015-2016 Wingspan Technology, Inc. */
define([
    'react', '../ReactCommon'
], function (React, Common) {
    'use strict';

    const Children = React.Children;
    const PropTypes = React.PropTypes;

    var KendoPanelBar = React.createClass({
        /* Not supporting "contentUrls" or "dataSource" because React components are better content */
        propTypes: {
            animation: PropTypes.oneOfType(PropTypes.object, PropTypes.bool),
            className: PropTypes.string,
            expandMode: PropTypes.string
        },

        getDefaultProps: function () {
            return {
                expandMode: 'multiple'
            };
        },

        componentDidMount: function () {
            var $el = Common.findWidget(this);

            // The PanelBar is populated via the DOM generated by render
            $el.kendoPanelBar({
                animation: this.props.animation,
                expandMode: this.props.expandMode
            });

            // expand based on the 'data-expand' attribute used in render()
            $el.data('kendoPanelBar').expand($el.children('[data-expand=true]'));
        },

        componentWillUnmount: function () {
            // Don't destroy() because it destroys all kendo widgets owned by nested components.
            // Common.findWidget(this, 'kendoPanelBar').destroy();
        },

        render: function () {
            var kids = Children.toArray(this.props.children);

            return (
                <ul className={this.props.className}>
                    {kids.filter(child => child.props.visible !== false)}
                </ul>
            );
        }
    });

    KendoPanelBar.Item = React.createClass({
        propTypes: {
            title: PropTypes.string,
            expand: PropTypes.bool,
            visible: PropTypes.bool
        },

        render: function () {
            return (
                <li data-expand={this.props.expand}>
                    <span className="k-link k-header">{this.props.title}</span>
                    <div>{this.props.children}</div>
                </li>
            );
        }
    });

    return KendoPanelBar;
});
