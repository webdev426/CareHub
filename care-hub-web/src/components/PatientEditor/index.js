import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Input, Radio } from '~/components/ui/formControls';
import { Button } from '~/components/ui';
import ErrorsBlock from '~/components/shared/errorsBlock';
import Loader from '../Loader';
import {
  accountTypeValidation,
  passwordValidation,
  postalCodeValidation,
  screenNameValidation,
} from '~/consts/validation';
import './styles.scss';
import { AccountType } from '~/consts';
import { postCreatePatientRequest } from '~/requests/sharedAccess';

function validate(values) {
  let errors = {};
  const accountTypeError = accountTypeValidation(values.accountType);
  if (accountTypeError) {
    errors.accountType = accountTypeError;
  }
  const nameError = screenNameValidation(values.displayName);
  if (nameError) {
    errors.displayName = nameError;
  }
  const postalCodeError = postalCodeValidation(values.postalCode);
  if (postalCodeError) {
    errors.postalCode = postalCodeError;
  }
  if (values.email != undefined) {
    const passwordError = passwordValidation(values.password);
    if (passwordError) {
      errors.password = passwordError;
    }
  }
  if (values.email !== values.confirmEmail) {
    errors.confirmEmail = 'Emails do not match.';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}

const PatientEditor = (props) => {
  const { initialValues } = props;
  const [passOpen, setPassOpen] = useState(false);
  const [confirmPassOpen, setConfirmPassOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [serverErrors, setSeverErrors] = useState(null);

  const handleSubmit = (formData) => {
    if (isSubmitting) {
      return;
    }
    setSubmitting(true);
    setSeverErrors(null);

    const noEmailAddress = formData.email == null || formData.email == '';

    // make json for createPatient api
    let profileValues = {
      displayName: formData.displayName,
      postalCode: formData.postalCode,
      email: formData.email,
      password: formData.password,
      accountType: formData.accountType,
      noEmailAddress: noEmailAddress,
    };

    postCreatePatientRequest(profileValues)
      .then((res) => {
        setSubmitting(false);
        reRunAllAPIs();
      })
      .catch((err) => {
        setSeverErrors(err);
        console.error('err', err);
        setSubmitting(false);
      });
  };

  const reRunAllAPIs = () => {
    if (props.reRunAPIs) {
      props.reRunAPIs();
    }
  };

  const renderInputField = (icon, name, placeholder, other) => {
    return (
      <div className="form-group">
        <div className="flex items-center">
          <span>
            <i className={`form-field-icon email-blue-icon fas fa-${icon}`} />
          </span>
          <div className="w-full">
            <Field
              type="text"
              name={name}
              placeholder={placeholder}
              component={Input}
              autocomplete="off"
              autofill="off"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderPasswordField = (name, placeholder, isOpen, onClick, other) => {
    return (
      <div className="form-group">
        <div className="flex items-center">
          <span>
            <i
              className={`form-field-icon password-blue-icon fas fa-${
                isOpen ? 'lock' : 'eye'
              }`}
              onClick={() => onClick(!isOpen)}
              role="button"
              tabIndex="0"
            />
          </span>
          <div className="w-full">
            <Field
              type={isOpen ? 'input' : 'password'}
              name={name}
              placeholder={placeholder}
              component={Input}
              autocomplete="off"
              autofill="off"
            />
          </div>
          {other}
        </div>
      </div>
    );
  };

  const renderRadio = (name, value, title, other) => {
    return (
      <div className="form-group one-line">
        <div className="flex items-center">
          <i className="form-field-icon" />
          <div className="w-full">
            <Field
              type="radio"
              name={name}
              value={value}
              component={Radio}
              disabled={isSubmitting ? 'disabled' : ''}
            >
              {title}
            </Field>
            {other}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="patient_editor-form">
      <hr />
      <h2 className="patient_editor-title">Add a patient</h2>
      <div className="patient_editor-description">lorem ipsum</div>
      <Form
        onSubmit={handleSubmit}
        validate={validate}
        initialValues={initialValues}
      >
        {({ handleSubmit, submitting, touched, errors }) => (
          <form onSubmit={handleSubmit} className="page-panel-group-container">
            {renderInputField('user-circle', 'displayName', 'Display Name')}
            {renderInputField('map-marker-alt', 'postalCode', 'Postal Code')}
            {renderInputField('envelope', 'email', 'Your Email')}
            {renderInputField('envelope', 'confirmEmail', 'Confirm the Email')}

            {renderPasswordField(
              'password',
              'Create a Password',
              passOpen,
              setPassOpen
            )}

            {renderPasswordField(
              'confirmPassword',
              'Confirm the Password',
              confirmPassOpen,
              setConfirmPassOpen
            )}

            <React.Fragment>
              {renderRadio(
                'accountType',
                AccountType.CareGiver,
                "I'm providing care",
                touched.accountType && errors.accountType && (
                  <div className="error-msg">{errors.accountType}</div>
                )
              )}
              {renderRadio(
                'accountType',
                AccountType.Patient,
                "I'm living with illness"
              )}
            </React.Fragment>

            <ErrorsBlock errors={serverErrors} />
            <div className="patient_btn-custom">
              <Button type="submit" disabled={isSubmitting}>
                <span>Create and Impersonate</span>
              </Button>
            </div>
          </form>
        )}
      </Form>
      {isSubmitting && <Loader />}
    </div>
  );
};

export default PatientEditor;
