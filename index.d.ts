declare interface Vendor {

}

declare interface IAuthContext {
  isAuthenticated: boolean;
  user: CognitoUser | null;
  handleLogin: (email: string, password: string) => void;
  handleSignUp: (email: string, password: string) => Promise<IUserAuth>;
  handleLogout: () => void;
}

declare interface IUserAuth {
  user: CognitoUser | null;
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

declare interface Vendor {
  placeId: string;
  vendorName: string;
  primaryAddress: string;
  secondaryAddress?: string;
  vendorDescription?: string;
  onboardDeal?: string;
  subscribers?: Subscriber[];
}