// import { CognitoUser } from 'amazon-cognito-identity-js';

declare interface IUserContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: any;
  data: any;
  handleLogin: (email: string, password: string) => void;
  handleSignUp: (signupData: SignUpData) => Promise<UserAuth>;
  handleLogout: () => void;
  confirmSignUp: (username: string, code: string) => Promise<any>;
  addBusiness: (business: Business) => void;
}

declare interface IConfirmAccountDialog {
  open: boolean;
  redirectToLogin: () => void;
  confirmSignup: (username: string, code: string) => Promise<any>;
  username: string;
  style: string;
}
declare interface LoadingDialogProps {
  isLoading: boolean;
}

declare interface UserAuth {
  user: CognitoUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any;
}

declare interface MapCoordinates {
  lat: number;
  lng: number;
}

declare interface MapAPI {
  places: {searchBox: Function};
  event: {clearInstanceListeners: Function};
}

declare interface MapAPIEvent {
}

declare interface Subscriber {

}

declare interface BusinessButton {
  button_id: string;
}

declare interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

declare interface DealMessage {
  dealType: string;
  dealInfo: string;
}