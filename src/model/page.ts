import Business from "./business";
import BusinessUser from "./businessUser";

export interface AuthenticatedPageProperties {
  loading: boolean;
  businesses: Array<Business>;
  businessUser?: BusinessUser;
  setBusinessUser: (businessUser: BusinessUser) => void;
  setBusinesses: (businesses: Array<Business>) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  error?: string;
}
