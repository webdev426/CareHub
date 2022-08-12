import React, { useState, useRef } from 'react';
import { PermissionAllow, PermissionType } from '~/consts';
import useAppState from '~/appState';
import { usePermission } from '~/hooks';
// import { useTrackFinanceRequest } from '~/hooks/requests';
import HeroTitle from '~/components/shared/heroTitle';
import SpendingList from '~/components/SpendingList';
import FinanceEditor from '~/components/FinanceEditor';
import FinanceTrackerForm from '~/components/financeTrackerForm';

function FinanceTracker() {
  const {
    global: { userId },
  } = useAppState();

  const financeTypes = {
    related: 1,
    other: 2,
    attendant: 3,
  };

  const { financePermission } = usePermission(PermissionType.FinanceTracker);

  const childRef = useRef();

  const selectFinance = (item) => {
    // setFinance(item);

    const financeEditElement = document.getElementById('my-finance');
    if (financeEditElement) {
      window.scrollTo({
        top: financeEditElement.offsetTop + 200,
        behavior: 'smooth',
      });
    }
  };

  const reRunAPIs = () => {
    childRef.current.reRunAPIs();
  };

  const isWritePermission = financePermission && financePermission.allowed == PermissionType.Write;

  const [finance, setFinance] = useState({});
  const [isSubmittingFinance, setSubmittingFinances] = useState(false);
  // const [shouldShowSuggestions, setShouldShowSuggestions] = useState(0);

  // const {
  //   errors: financeErrors,
  //   sendRequest: sendRequestFinance,
  // } = useTrackFinanceRequest(handleSubmitFinanceSuccess);

  // function handleSubmitFinanceSuccess(response, formData) {
  //   trackGTM(TRACK_GTM.CREATE_FINENCE, {
  //     ...formData,
  //     userId,
  //   });
  //   toast.success('All the data has been succesfully submitted.');
  //   const finences = formData.finences
  //     .filter((p) => p.intensity)
  //     .map((p) => ({ [p.financeTypeId]: true }));
  //   // const painProblem = formData.painProblem.intensity ? { pain: true } : {};
  //   let res = {};
  //   for (let i = 0; i < finences.length; i++) {
  //     res = { ...res, ...finences[i] };
  //   }
  //   if (formData.painFinences.intensity) {
  //     res = { ...res, ...{ pain: true } };
  //   }
  //   setSubmittingFinances(false);
  //   setShouldShowSuggestions(res);
  // }

  function handleSubmitFinance(formData) {
    if (isSubmittingFinance) {
      return;
    }
    setSubmittingFinances(true);
    const problems = [];
    // Object.keys(financeTypes).forEach((pt) => {
    //   const node = formData[pt];
    //   if (!node) {
    //     return;
    //   }
    //   let time = formatDateStandard(node.time);
    //   finance.push({
    //     ...node,
    //     time: time,
    //     financeTypeId: financeTypes[pt],
    //   });
    // });

    // let pain = formData.pain;
    // let time = formatDateStandard(pain.time);

    // let data = {
    //   additionalDetails: formData.additionalDetails,
    //   painProblem: {
    //     ...pain,
    //     time: time,
    //   },
    //   problems,
    // };
    // sendRequestFinance(data);
  }

  // useEffect(() => {
  //   setSubmittingFinances(false);
  // }, [financeErrors]);


  return (
    <div className="finance-tracker-page md-pb-50 lg-pb-30 sm-pb-20 relative">
      <div className="container">
        <HeroTitle imageUrl="/img/icons/exp-white.svg">
          <h1>Finance Tracker</h1>
          <div className="hero-description">
            This tool can be used to track your finances
          </div>
        </HeroTitle>

        {/* {isWritePermission && <FinanceEditor finance={finance} reRunAPIs={reRunAPIs} />} */}
        <SpendingList selectFinance={selectFinance} ref={childRef} />
        <FinanceTrackerForm
          handleSubmitFinance={handleSubmitFinance}
          // financeErrors={financeErrors}
          isProcessingFinance={isSubmittingFinance}
        // shouldShowSuggestions={shouldShowSuggestions}
        />
      </div>
    </div>
  );
}

export default FinanceTracker;
