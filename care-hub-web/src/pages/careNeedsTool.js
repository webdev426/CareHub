import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-final-form';
import CareNeedsToolQuestion from '~/components/CareNeedsToolQuestion';
import CareNeedsToolPage from '~/components/CareNeedsToolPage';
import HeroTitle from '~/components/shared/heroTitle';
import { FormContextProvider } from '~/utils/formState';
import { Button } from '../components/ui';
import arrayMutators from 'final-form-arrays';
import { useAppDispatch } from '~/appState';
import { usePostCareNeedsRequest } from '~/hooks/requests';
import { showAddedPrompt } from '~/actions/global';
import Loader from '~/components/Loader';
import { formatDateYMD } from '~/consts';

import { getCareNeedsRequest } from '~/requests/reports';
import { LOG } from '~/consts/global';

function CareNeedsTool() {
  const careNeedKeyList = [
    'bathing',
    'dressing',
    'transferring',
    'toileting',
    'continence',
    'feeding',
  ];

  const dispatch = useAppDispatch();

  const [isLoading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({});

  const { errors, sendRequest } = usePostCareNeedsRequest(handleSubmitSuccess);

  const getValues = () => {
    let nowDate = formatDateYMD();
    setLoading(true);
    getCareNeedsRequest({ dateFrom: nowDate, dateTo: nowDate })
      .then((res) => {
        const careItems = res || [];
        if (careItems.length > 0) {
          let values = {};
          const careItem = careItems[careItems.length - 1]['report'];
          careNeedKeyList.forEach((key) => {
            values[key] = `${careItem[key] || '0'}`;
          });
          if (values) {
            setFormValues(values);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        LOG(err);
      });
  };

  function handleSubmit(formData) {
    setLoading(true);
    const nowDate = formatDateYMD();
    const graphicValues = { date: nowDate, report: formData };
    sendRequest(graphicValues);
  }

  function handleSubmitSuccess(response, formData) {
    setLoading(false);
    dispatch(showAddedPrompt(true));
  }

  useEffect(() => {
    setLoading(false);
  }, [errors]);

  useEffect(() => {
    getValues();
  }, []);

  return (
    <React.Fragment>
      <div className="care-needs-tool-page md-pb-50 lg-pb-30 sm-pb-20 relative">
        <div className="container">
          <HeroTitle imageUrl="/img/medication.svg">
            <h1>Care Needs Tool</h1>
            <div className="hero-description">
              Tracking any changes that may occur in everyday living can help to
              sort out care needs. Your answers will be used to make a report so
              you can see changes over time. Helpful items will be sent to The
              Library based on your answers. You may wish to share any changes
              with healthcare providers so they can better meet any care needs.
              You can also view your answers in{' '}
              <Link className="" to="/reports">
                Health Reports
              </Link>
            </div>
          </HeroTitle>

          <CareNeedsToolPage />
          <div className="care-needs-question-style">
            <Form
              mutators={{
                ...arrayMutators,
              }}
              initialValues={formValues}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, submitting, values, touched, errors }) => {
                return (
                  <FormContextProvider
                    values={values}
                    errors={errors}
                    touched={touched}
                  >
                    <form onSubmit={handleSubmit}>
                      <CareNeedsToolQuestion />
                      <div className="btn-care-needs">
                        <Button
                          type="submit"
                          kind="purpure"
                          disabled={submitting}
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </FormContextProvider>
                );
              }}
            </Form>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </React.Fragment>
  );
}

export default CareNeedsTool;
