
define([
    'underscore', 'jquery', 'react',
    '../ImmutableOptimizations'
], function (_, $, React, ImmutableOptimizations) {
    'use strict';

    return React.createClass({
        mixins: [ImmutableOptimizations(['onChange'])],

        statics: { fieldClass: function () { return 'formFieldCheckbox'; } },

        getDefaultProps: function () {
            return {
                value: undefined,
                onChange: function () {},
                id: undefined,
                label: undefined, //checkbox label, not field label
                isValid: [true, ''],
                disabled: false,
                readonly: false
            };
        },

        componentWillMount: function () {
          this.stableUniqueId = this.props.id ? this.props.id : _.uniqueId();
        },

        /*jshint ignore:start */
        render: function () {
            var props = this.props;

            if (props.noControl) {
                return (<span>{this.getDisplayValue()}</span>);
            }

            function onKeyDown(e) {
                if (e.key === ' ') {
                    props.onChange(!props.value);
                }
            }
            return (
                <span className="CheckBox" tabIndex="0" onKeyDown={onKeyDown}>
                    <input type="checkbox" id={this.stableUniqueId}
                        checked={props.value} data-checked={props.value ? '' : null}
                        onChange={this.onChange}
                        disabled={props.disabled || props.readonly} />
                    <label htmlFor={this.stableUniqueId}>{props.label}</label>
                </span>
            );
        },
        /*jshint ignore:end */

        onChange: function (event) {
            var val = event.target.checked;
            this.props.onChange(val);
        },

        getDisplayValue: function () {
            return !!this.props.value ? 'Yes' : 'No';
        }
    });

});
