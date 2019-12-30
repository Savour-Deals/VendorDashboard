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