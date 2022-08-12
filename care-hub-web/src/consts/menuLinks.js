import React from 'react';
import { PermissionType } from './permissions';

import { ReactComponent as Welcome } from '~/assets/svg/Welcome.svg';
import { ReactComponent as Library } from '~/assets/svg/Library.svg';
import { ReactComponent as Notes } from '~/assets/svg/Notes.svg';
import { ReactComponent as Expenses } from '~/assets/svg/Expenses.svg';
import { ReactComponent as Health } from '~/assets/svg/Health.svg';
import { ReactComponent as Medication } from '~/assets/svg/Medication.svg';

export const MenuLinks = [
  {
    title: 'My Health Tracker',
    url: 'health-tracker',
  },
];

export const DashboardTabList = [
  {
    tabKey: PermissionType.Welcome,
    label: 'Welcome',
    url: 'welcome',
    icon: <Welcome />,
  },
  {
    tabKey: PermissionType.HealthTracker,
    label: 'Health tracker',
    url: 'health-tracker',
    icon: <Health />,
  },

];

export const PatientExceptionUrls = ['profile/caregiving-needs'];
export const CaregiverExceptionUrls = ['health-tracker', 'medication-tracker', 'care-needs-tool'];
