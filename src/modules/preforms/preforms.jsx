import React from "react";

/*
shape of field description%

const loginWithPassForm = {
  _onSubmit: (e, values) => {
    console.log("form submit", values);
    return "hello";
  },
  _formName: "loginWithPassForm",
  _fields: {
    login: {
      value: "test",
      validator: (value) => !!value || true,
    },
    sublogin: {
      value: "test",
      validator: (value) => !!value || true,
    },
    password: {
      value: "test",
      validator: (value) => +value === 123,
    },
  },
};

const authApiKeyForm = {
  _onSubmit: (e, values) => {
    console.log("form fubmit", values);
    return "hello";
  },
  _formName: "authApiKeyForm",
  _fields: {
    apikey: {
      validator: (value) => true, //value.length > 0,
    },
  },
};


*/

const _addr = (formName, fieldName) => `${formName}@${fieldName}`;

const withPreform = (...formConfigs) => (WrappedComponent) => {
  return class extends React.Component {
    state = {};

    isSingle = false;
    refs = {};
    validators = {};

    formRefs = {};
    formSubmitHandlers = {};
    formFields = {};

    constructor(props) {
      super(props);

      //TODO: shorthand for single form setups
      if (formConfigs.length > 1) {
        this.isSingle = true;
      }

      formConfigs.forEach((formConfig) => {
        const {
          _formName: formName,
          _onSubmit: onSubmit,
          _fields: fields,
        } = formConfig;

        this.formSubmitHandlers[formName] = onSubmit;
        this.formRefs[formName] = React.createRef();
        this.formFields[formName] = Object.keys(fields);

        this.formFields[formName].forEach((fieldName) => {
          this.refs[_addr(formName, fieldName)] = React.createRef();
          this.validators[_addr(formName, fieldName)] =
            fields[fieldName].validator || ((value) => !!value || true);

          this.state[_addr(formName, fieldName)] = {
            value: fields[fieldName].value || "",
            isValid: this.validators[_addr(formName, fieldName)](
              fields[fieldName].value
            ),
          };
        });
      });
    }

    handleField = (formName, fieldName) => (e) => {
      const { value } = e.target;

      this.setValue(formName, fieldName, value);
    };

    setValue = (formName, fieldName, value, callback = null) => {
      this.setState(
        {
          [_addr(formName, fieldName)]: {
            value,
            isValid: this.validators[_addr(formName, fieldName)](value),
          },
        },
        callback
      );
    };

    updateField = (formName, fieldName, value) => {
      this.setValue(formName, fieldName, value);
      this.refs[_addr(formName, fieldName)].current.value = value;
    };

    connectField = (formName, fieldName, event = "onChange") => {
      if (!this.state[_addr(formName, fieldName)]) {
        console.error(
          `Problem with connectField("${formName}", "${fieldName}"). Check form name and field name.`
        );
      }

      const connection = {
        name: fieldName,
        [event]: this.handleField(formName, fieldName),
        ref: this.refs[_addr(formName, fieldName)],
        value: this.state[_addr(formName, fieldName)].value,
      };

      return connection;
    };

    getField = (formName, fieldName) => ({
      value: this.state[_addr(formName, fieldName)].value,
      isValid: this.state[_addr(formName, fieldName)].isValid,
      ref: this.refs[_addr(formName, fieldName)],
    });

    getFieldValue = (formName, fieldName) =>
      this.state[_addr(formName, fieldName)].value;

    getFormValues = (formName) => {
      return Object.fromEntries(
        this.formFields[formName].map((fieldName) => [
          fieldName,
          this.state[_addr(formName, fieldName)].value,
        ])
      );
    };

    connectForm = (formName) => {
      if (!this.formRefs[formName]) {
        console.error(
          `Problem with connectForm("${formName}"). Check form name.`
        );
      }

      const connection = {
        name: formName,
        ref: this.formRefs[formName],
        onSubmit: (e) => {
          e.preventDefault();

          this.formSubmitHandlers[formName](e, this.getFormValues(formName));
        },
      };
      return connection;
    };

    submitForm = (formName) => () => {
      //   console.log("Soon i will be submit too", formName);
      this.formRefs[formName].current.dispatchEvent(
        new Event("submit", { cancelable: true })
      );
    };

    setFormHandler = (formName, onSubmit) => {
      this.formSubmitHandlers[formName] = onSubmit;
    };

    isFieldValid = (formName, fieldName) =>
      this.state[_addr(formName, fieldName)].isValid;

    render = () => {
      return (
        <WrappedComponent
          {...this.props}
          preform={{
            handleField: this.handleField,
            getField: this.getField,
            updateField: this.updateField,
            connectField: this.connectField,
            isFieldValid: this.isFieldValid,
            connectForm: this.connectForm,
            submitForm: this.submitForm,
            getFormValues: this.getFormValues,
            setFormHandler: this.setFormHandler,
          }}
        />
      );
    };
  };
};

export { withPreform };
