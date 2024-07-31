export interface RTKUserState {
  status: string;
  userProfile: Record<string, any>;
  userInfoOnLogin: unknown;
  FirstName: string;
  LastName: string;
  token: string;
  errorMessage: string;
  successMessage: string;
  changePhoneNumber: boolean;
  localToken: string | undefined;
  localUserId: string | null;
  PhoneNumber: string | null;
  email: string;
  PhoneNumberInput: boolean;
  showModal: boolean;
  autoFocus: boolean;
  isLoggedIn: boolean;
  welcomeMessage: string;
  userId: string;
  userType: string;
  type: string;
  numberOfAnnouncements: number;
}

export interface RootState {
  userData: RTKUserState; // Change this to match your overall state shape
}

export type fetchUserInLoginWithPasswordPayload = {
  mobile: string;
  password: string;
};
export type fetchUserInOTPLoginPayload = {
  mobile: string;
};
export type verifyUserByOTPInLoginAndRegistrationPayload = {
  mobile: string;
  otp_code: string;
};
export type sendOTPCodeAfterRegistrationPayload = {
  name: string;
  surname: string;
  type: string;
  mobile: string;
  org_name: string | null;
  org_registration: string | null;
  org_address: string | null;
  org_phone: string | null;
};
