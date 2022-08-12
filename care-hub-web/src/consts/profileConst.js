export const ProfileLinkList = [
  { url: 'my', title: 'My Profile' },
  { url: 'sharing', title: 'Sharing your Carehub' },
  { url: 'caregiving-needs', title: 'Caregiving Questions' },
  { url: 'reminders', title: 'Reminders' },
  { url: 'patients', title: 'My Patients' },
];

export const ProfileTabsForCaregiver = [
  ProfileLinkList[0], 
  ProfileLinkList[2], // Caregiving Questions
  ProfileLinkList[3], // Reminders
  ProfileLinkList[4], // My Patients
];

export const ProfileTabsForPatient = [
  ProfileLinkList[0], 
  ProfileLinkList[1], // Sharing your Carehub
  ProfileLinkList[3], // Reminders
];
