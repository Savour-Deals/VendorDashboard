

declare interface IUserContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  // user: import('amazon-cognito-identity-js').CognitoUser | null;
  user: any;
  data: any;
  handleLogin: (email: string, password: string) => void;
  handleSignUp: (signupData: SignUpData) => Promise<UserAuth>;
  handleLogout: () => void;
  addVendor: (vendor: Vendor) => void;
}

declare interface LoadingDialogProps {
  isLoading: boolean;
}

declare interface UserAuth {
  user: CognitoUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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

declare interface VendorButton {
  button_id: string;
}

declare interface Vendor {
  placeId: string;
  vendorName: string;
  primaryAddress: string;
  buttonId?: string;
  vendorDescription?: string;
  onboardDeal?: string;
  singleClickDeal?: string;
  doubleClickDeal?: string;
  subscribers?: object;
}

declare interface VendorState {
  placeId: string;
  vendorName: string;
  primaryAddress: string;
  isOpen: boolean;
  buttonId?: string;
  vendorDescription?: string;
  onboardDeal?: string;
  singleClickDeal?: string;
  doubleClickDeal?: string;
  subscribers?: object;
}

declare interface TwilioCreateResponse {
  status: boolean;
  twilioNumber: string;
}

declare interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}