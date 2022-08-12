import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import useAppState, { useAppDispatch } from '~/appState';
import Select from 'react-select';

import { MenuButton, Menu, SetFontSizeButtons } from '~/components/ui';

import { GetName } from '~/consts/global';
import { usePermission } from '~/hooks';
import {
  useGetImpersonate,
  useActiveImpersonate,
  useDeActiveImpersonate,
} from '~/hooks/requests';
import {
  setImpersonationMode,
  setAbleToImpersonate,
} from '~/actions/permissions';
import { AccountType, PermissionType } from '~/consts';
import { login } from '~/actions/account';
import jwtDecode from 'jwt-decode';
import { trackGTM } from '~/utils';
import { TRACK_GTM } from '~/consts';

import './styles.scss';

function UserHeader({ history }) {
  const dispatch = useAppDispatch();
  const {
    global: { accountType },
  } = useAppState();

  const myName = GetName();

  const { isImpersonationMode, isAccessAllowed } = usePermission(
    PermissionType.HealthReports
  );

  const { sendRequest } = useGetImpersonate(handleGetImpersonateSuccess);
  const { sendRequest: sendImpersonateActive } = useActiveImpersonate(
    handleActiveImpersonateSuccess
  );
  const { sendRequest: sendImpersonateDeactive } = useDeActiveImpersonate(
    handleDeActiveImpersonateSuccess
  );

  const impersonateMode = { value: '-1', label: 'Impersonate' };
  const [shareList, setShareList] = useState([{ value: '0', label: myName }]);

  const [shareValue, setShareValue] = useState(shareList[0]);
  const [isFirstLoad, setFirstLoad] = useState(true);

  // name according to View As
  const [viewName, setViewName] = useState(myName);

  const changeViewAs = (value) => {
    setShareValue(value);
    if (value.value == '-1') {
      handleEnableImpersonate();
    }
  };

  const handleEnableImpersonate = () => {
    const impersonateDetail = JSON.parse(
      localStorage.getItem('impersonateDetail')
    );

    // set ViewName to impersonate name
    setViewName(
      impersonateDetail.name ? impersonateDetail.name : impersonateDetail.email
    );
    sendImpersonateActive(impersonateDetail.email);
    dispatch(setImpersonationMode(true, impersonateDetail));

    localStorage.setItem('isImpersonationMode', '1');
  };

  function handleDeActiveImpersonateSuccess(loginResult) {
    const { authToken } = loginResult;
    const decoded = jwtDecode(authToken);

    localStorage.setItem('authToken', authToken);

    dispatch(login(loginResult, true));
    trackGTM(TRACK_GTM.LOGIN, {
      userId: decoded.user_id,
    });

    localStorage.removeItem('isImpersonationMode');
    window.location.href = '/';
  }

  const handleDeImpersonate = () => {
    sendImpersonateDeactive();
  };

  const isBack =
    history.location.pathname.includes('/profile') ||
    history.location.pathname.includes('/calendar_add') ||
    history.location.pathname.includes('/reports') ||
    history.location.pathname.includes('/calendar');

  const linkButton = (to, title) => {
    return (
      <Link to={to} className="btn btn-purpure btn-flex">
        <img src="/img/icons/heart.png" alt="" /> {title}
      </Link>
    );
  };

  function handleGetImpersonateSuccess(impersonateResponse) {
    if (impersonateResponse.length > 0 && impersonateResponse[0].email) {
      const impersonateDetail = impersonateResponse[0];

      setShareList([...shareList, impersonateMode]);
      dispatch(setAbleToImpersonate(true));
      // set impersonate detail to localstorage
      localStorage.setItem(
        'impersonateDetail',
        JSON.stringify(impersonateDetail)
      );
    }
  }

  function handleActiveImpersonateSuccess(loginResult) {
    const { authToken } = loginResult;
    localStorage.setItem('authToken', authToken);
  }

  useEffect(() => {
    const isImpersonationModeLocal =
      localStorage.getItem('isImpersonationMode') == '1';

    if (isFirstLoad) {
      setFirstLoad(false);
      if (isImpersonationModeLocal) {
        handleEnableImpersonate();
      } else {
        sendRequest();
      }
    }
  }, []);

  useEffect(() => {
    const isImpersonationModeLocal =
      localStorage.getItem('isImpersonationMode') == '1';

    if (!isImpersonationModeLocal) {
      setViewName(myName);
    }

    let myInfo = { value: '0', label: myName };

    const impersonateDetail = JSON.parse(
      localStorage.getItem('impersonateDetail')
    );
    if (impersonateDetail) {
      setShareList([myInfo, impersonateMode]);
    } else {
      setShareList([myInfo]);
    }

    if (shareValue.value == '0') {
      setShareValue(myInfo);
    }
  }, myName);

  const renderLinkButton = () => {
    if (isImpersonationMode) {
      return isBack
        ? linkButton('/welcome', 'Back to Dashboard')
        : isAccessAllowed
        ? linkButton('/reports', 'View Health Report')
        : '';
    }
    return isBack
      ? linkButton('/welcome', 'Back to Dashboard')
      : linkButton('/reports', 'View Health Report');
  };

  return (
    <div
      className={`header${history.location.pathname === '/' ? ' main-page-header' : ''
        }`}
    >
      <div className="container">
        <div className="container-nav">
          <div className="nav-block">
            <div className="viewas-element">
              {isImpersonationMode ? (
                <>
                  <div className="viewas-title">Impersonation mode</div>
                  <button onClick={handleDeImpersonate}>Exit</button>
                </>
              ) : (
                <>
                  <div className="viewas-title">View&nbsp;as:</div>
                  <div className="viewas-value">
                    <Select
                      name="viewAs"
                      options={shareList}
                      value={shareValue}
                      onChange={changeViewAs}
                      className="viewas-select"
                      classNamePrefix="select"
                      isSearchable={false}
                    />
                  </div>
                </>
              )}
            </div>
            <ul className="header-nav">
              <li className="header-nav-item">
                <a href="/help" className="header-nav-list">
                  <img src="/img/icons/icon-help.png" alt="" />
                  <span>Help</span>
                </a>
              </li>
            </ul>
            <MenuButton />
          </div>

          <div className="nav-block-resp">
            <div className="viewas-element">
              <div className="viewas-title">View&nbsp;as:</div>
              <div className="viewas-value">
                <Select
                  name="viewAs"
                  options={shareList}
                  value={shareValue}
                  onChange={changeViewAs}
                  className="viewas-select"
                  classNamePrefix="select"
                  isSearchable={false}
                />
              </div>
            </div>
          </div>
          <SetFontSizeButtons />
          {renderLinkButton()}
        </div>
        <div className="flex flex-wrap items-center mx-0 row-mx-15">
          <div className="page-logo">
            <Link className="logo" to="/welcome">
              {accountType === AccountType.CareGiver
                ? `${viewName}'s Caregiver CareHub`
                : `${viewName}'s CareHub`}
            </Link>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
}

export default withRouter(UserHeader);
