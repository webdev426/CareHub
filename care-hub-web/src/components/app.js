import React from 'react';
import { hot } from 'react-hot-loader';
import useAppState, { useAppDispatch } from '~/appState';
import { setBasicInfo, setProfileInfo } from '~/actions/global';
import { setSuggestions } from '~/actions/suggestions';
import { setUserSuggestions } from '~/actions/library';
import {
  useGetSuggestionsFetchOnce,
  useGetUserSuggestionsFetchOnce,
  useGetBasicInfoFetchOnce,
  useGetProfileDataFetchOnce,
} from '~/hooks/requests';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';
import SuggestionsLoading from '~/components/modals/suggestionsLoading';
import AddResourceConfirmModal from './modals/addResourceConfirmModal';
import ChangeSettingConfirmModal from './modals/changeSettingConfirmModal';
import QuestionSaveConfirmModal from './modals/questionSaveConfirmModal';

function App() {
  const {
    account: { isAuthenticated },
  } = useAppState();

  const dispatch = useAppDispatch();

  const [_fetchSuggestionsErrors] = useGetSuggestionsFetchOnce(
    isAuthenticated,
    (suggestions) => dispatch(setSuggestions(suggestions))
  );
  const [
    _fetchUserSuggestionsErrors,
  ] = useGetUserSuggestionsFetchOnce(isAuthenticated, (userSuggestions) =>
    dispatch(setUserSuggestions(userSuggestions))
  );
  // const [_fetchGetbasicInfoErrors] = useGetBasicInfoFetchOnce(isAuthenticated, basicInfo =>
  // dispatch(setBasicInfo(basicInfo))
  // );
  const [_fetchGetProfileInfoErrors] = useGetProfileDataFetchOnce(
    (profileInfo) => {
      dispatch(
        setProfileInfo({
          screenName: profileInfo.profile.screenName,
          email: profileInfo.profile.email,
        })
      );
    }
  );

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes />
      <SuggestionsLoading />
      <AddResourceConfirmModal />
      <ChangeSettingConfirmModal />
      <QuestionSaveConfirmModal />
    </React.Fragment>
  );
}

export default hot(module)(App);
