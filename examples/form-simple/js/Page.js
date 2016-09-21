define([
    'underscore', 'react', 'react-dom', 'jquery', 'wingspan-forms'
], function (_, React, ReactDOM, $, Forms) {
    'use strict';


    var SimpleFormMetadata = {
        firstName: { label: 'First Name' },
        lastName: { label: 'Last Name' },
        gender: { label: 'Gender' },
        age: { label: 'Age' },
        birthday: { label: 'Birthday'}
    };

    var MyForm = React.createClass({

        genderOptions: [{ value: 'male', label: 'Male'}, { value: 'female', label: 'Female'}],

        getInitialState: function () {
            return {
                firstName: '',
                lastName: '',
                gender: '',
                age: null,
                birthday: null
            };
        },

        render: function () {
            return (
                <div className="MyForm">
                    <div>
                        <FormField fieldInfo={SimpleFormMetadata.firstName} isValid={this.isFieldValid('firstName')}>
                            <KendoText value={this.state.firstName} onChange={_.partial(this.onFieldChange, 'firstName')} />
                        </FormField>

                        <FormField fieldInfo={SimpleFormMetadata.lastName} isValid={this.isFieldValid('lastName')}>
                            <KendoText value={this.state.lastName} onChange={_.partial(this.onFieldChange, 'lastName')} />
                        </FormField>

                        <FormField fieldInfo={SimpleFormMetadata.gender} isValid={this.isFieldValid('gender')}>
                            <KendoComboBox
                                dataSource={this.genderOptions}
                                displayField="label"
                                valueField="value"
                                value={this.state.gender}
                                onChange={_.partial(this.onFieldChange, 'gender')} />
                        </FormField>

                        <FormField fieldInfo={SimpleFormMetadata.age} isValid={this.isFieldValid('age')}>
                            <KendoNumericTextBox spinners={true} value={this.state.age} onChange={_.partial(this.onFieldChange, 'age')} />
                        </FormField>

                        <FormField fieldInfo={SimpleFormMetadata.birthday} isValid={this.isFieldValid('birthday')}>
                            <KendoDatePicker value={this.state.birthday} onChange={_.partial(this.onFieldChange, 'birthday')} />
                        </FormField>

                    </div>
                    <pre>{JSON.stringify(this.state, undefined, 2)}</pre>
                </div>
            );
        },

        onFieldChange: function (fieldName, value) {
            this.setState(_.object([[fieldName, value]]));
        },

        isFieldValid: function (fieldName) {
            var val = this.state[fieldName];

            return val !== null && val !== ''
                ? [true, '']
                : [false, 'This field is required.'];
        }
    });


    function entrypoint(rootEl) {
        ReactDOM.render(<MyForm/>, rootEl);
        Forms.ControlCommon.attachFormTooltips($(document.body));
    }


    var FormField = Forms.FormField;
    var KendoText = Forms.KendoText;
    var KendoComboBox = Forms.KendoComboBox;
    var KendoNumericTextBox = Forms.KendoNumericTextBox;
    var KendoDatePicker = Forms.KendoDatePicker;

    return {
        entrypoint: entrypoint
    };
});
