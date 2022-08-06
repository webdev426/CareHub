import React, { useEffect, useState } from 'react';
import { AccountType } from '~/consts';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import { Input, Radio, Checkbox } from '~/components/ui/formControls';
import { Button, Tooltip } from '~/components/ui';
import ErrorsBlock from '~/components/shared/errorsBlock';
import Loader from '../Loader';
import './styles.scss';
import {
  accountTypeValidation,
  emailValidation,
  passwordValidation,
  postalCodeValidation,
  screenNameValidation,
} from '~/consts/validation';

function validate(values) {
  console.log('values', values)
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
  const emailError = emailValidation(values.email);
  if (emailError) {
    errors.email = emailError;
  }
  const confirmEmailError = emailValidation(values.confirmEmail);
  if (confirmEmailError) {
    errors.confirmEmail = confirmEmailError;
  }
  const passwordError = passwordValidation(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  if (values.email !== values.confirmEmail) {
    errors.confirmEmail = 'Emails do not match.';
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}

function RegistrationForm(props) {
  const { initialValues, accountType, serverErrors, handleSubmit } = props;
  const [passOpen, setPassOpen] = useState(false);
  const [confirmPassOpen, setConfirmPassOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isCheckAgree, setCheckAgree] = useState(false);

  useEffect(() => {
    if (serverErrors) {
      setSubmitting(false);
    }
  }, [serverErrors]);

  const onHandleSubmit = (formData) => {
    setSubmitting(true);
    handleSubmit(formData);
  };

  const handleChange = () => {
    setCheckAgree(!isCheckAgree);
  };

  const renderInputField = (icon, name, placeholder, other) => {
    return (
      <div className="form-group">
        <div className="flex items-center">
          <i className={`form-field-icon email-blue-icon fas fa-${icon}`} />
          <div className="w-full">
            <Field
              type="text"
              name={name}
              placeholder={placeholder}
              component={Input}
            />
          </div>
          {other}
        </div>
      </div>
    );
  };

  const renderPasswordField = (name, placeholder, isOpen, onClick, other) => {
    return (
      <div className="form-group">
        <div className="flex items-center">
          <i
            className={`form-field-icon password-blue-icon fas fa-${isOpen ? 'lock' : 'eye'
              }`}
            onClick={() => onClick(!isOpen)}
            role="button"
          //tabIndex="0"
          />
          <div className="w-full">
            <Field
              type={isOpen ? 'input' : 'password'}
              name={name}
              placeholder={placeholder}
              component={Input}
            />
          </div>
          {other}
        </div>
      </div>
    );
  };

  const renderTooltip = () => {
    return (
      <Tooltip>
        <b>Password must contain the following:</b>
        <br />
        <ul className="list-reset pl-10">
          <li>1 Uppercase letter</li>
          <li>1 Special character -!"$%*@</li>
          <li>Must be longer than 6 characters</li>
        </ul>
      </Tooltip>
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

  const renderLink = (link, title) => {
    return (
      <Link to={link} className="text-dark-blue">
        {title}
      </Link>
    );
  };

  return (
    <div>
      <Form
        onSubmit={onHandleSubmit}
        validate={validate}
        initialValues={initialValues}
      >
        {({ handleSubmit, submitting, touched, errors }) => (
          <form onSubmit={handleSubmit} className="sign-up-form">
            {renderInputField('user-circle', 'displayName', 'Display Name')}
            {renderInputField('map-marker-alt', 'postalCode', 'Postal Code')}
            {renderInputField('envelope', 'email', 'Your Email')}
            {renderInputField('envelope', 'confirmEmail', 'Confirm the Email')}

            {renderPasswordField(
              'password',
              'Create a Password',
              passOpen,
              setPassOpen,
              renderTooltip()
            )}

            {renderPasswordField(
              'confirmPassword',
              'Confirm the Password',
              confirmPassOpen,
              setConfirmPassOpen
            )}

            {!accountType && (
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
            )}

            <div className="form-group one-line">
              <div className="flex items-center">
                <i className="form-field-icon" />
                <div className="w-full">
                  <Field
                    type="checkbox"
                    name="checkAgree"
                    component={Checkbox}
                    checked={isCheckAgree}
                    onClick={() => handleChange()}
                    disabled={isSubmitting ? 'disabled' : ''}
                  >
                    I agree to the {renderLink('/rules', 'rules of CareHub')}
                  </Field>
                  {touched.checkAgree && !isCheckAgree && (
                    <div className="error-msg">{'Please check agreement.'}</div>
                  )}
                </div>
              </div>
            </div>

            <ErrorsBlock errors={serverErrors} />
            <div className="text-center pt-10 signup-custom">
              <Button type="submit" disabled={isSubmitting}>
                <i className="form-field-icon user-pink-icon fas fa-user-circle" />
                <span>SIGN UP</span>
              </Button>
            </div>
            <div className="text-center">
              {isSubmitting ? (
                <div className="text-dark-blue">Already have an account?</div>
              ) : (
                renderLink('/login', 'Already have an account?')
              )}
              {!isSubmitting && (
                <div className="mt-50 text-sm text-black">
                  By Signing Up you agree to Care Hub’s{' '}
                  {renderLink('/login', 'Terms of Services')},{' '}
                  {renderLink('/login', 'Privacy Policy')} and{' '}
                  {renderLink('/login', 'Copyright Policy')}.
                </div>
              )}
            </div>
          </form>
        )}
      </Form>
      {isSubmitting && <Loader />}
    </div>
  );
}

export default RegistrationForm;
