const dev = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_HWIES9skP",
    APP_CLIENT_ID: "1olalmrrmqjrr2c81p57pnk6s6",
    IDENTITY_POOL_ID: "us-east-1:bf7e302d-4473-4af1-9c1e-d90adb31facc"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6zs6jwpnw5.execute-api.us-east-1.amazonaws.com/dev"
  },
  STRIPE_KEY: "pk_test_PvociWFfxr6L1cjqbkYXVhkm003Rm6oZNW"
}

const prod = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_00vE68jU0",
    APP_CLIENT_ID: "1olalmrrmqjrr2c81p57pnk6s6",
    IDENTITY_POOL_ID: "us-east-1:bf7e302d-4473-4af1-9c1e-d90adb31facc"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6zs6jwpnw5.execute-api.us-east-1.amazonaws.com/dev"
  },
  STRIPE_KEY: "pk_live_zwDKo1RWSPCdp4N2ZWtS7nKV007mQ54KkY"
}

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default config;