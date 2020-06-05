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
      isReuired: true,
      isTouched: false,
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
    isRequired = {};
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
          const {
            value = "",
            validator = () => true,
            isRequired = false,
            isTouched = false,
          } = fields[fieldName];

          this.refs[_addr(formName, fieldName)] = React.createRef();
          this.validators[_addr(formName, fieldName)] = validator;
          this.isRequired[_addr(formName, fieldName)] = isRequired;

          this.state[_addr(formName, fieldName)] = {
            value,
            isValid: this.validators[_addr(formName, fieldName)](value),
            isTouched,
          };
        });
      });
    }

    handleField = (formName, fieldName) => (e) => {
      const { value } = e.target;

      this.setValue(formName, fieldName, value);
    };

    setValue = (formName, fieldName, value, callback = null) => {
      const fieldAddr = _addr(formName, fieldName);

      this.setState(
        {
          [fieldAddr]: {
            value,
            isValid:
              this.validators[fieldAddr](value) &&
              (this.isRequired[fieldAddr] ? !!value : true),
            isTouched: true,
          },
        },
        callback
      );
    };

    updateField = (formName, fieldName, value) => {
      this.setValue(formName, fieldName, value);
      try {
        this.refs[_addr(formName, fieldName)].current.value = value;
      } catch (error) {
        console.error("Preform", error);
      }
    };

    connectField = (formName, fieldName, event = "onInput") => {
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

    isFieldTouched = (formName, fieldName) =>
      this.state[_addr(formName, fieldName)].isTouched;

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
            isFieldTouched: this.isFieldTouched,
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
