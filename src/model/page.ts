import Business from "./business";

export interface AuthenticatedPageProperties {
  loading: boolean;
  businesses: Array<Business>;
  setBusinesses: (businesses: Array<Business>) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  error?: string;
}
