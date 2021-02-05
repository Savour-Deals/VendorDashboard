const dev = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_00vE68jU0",
    APP_CLIENT_ID: "1olalmrrmqjrr2c81p57pnk6s6",
    IDENTITY_POOL_ID: "us-east-1:bf7e302d-4473-4af1-9c1e-d90adb31facc"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://j4bm0f2gx1.execute-api.us-east-1.amazonaws.com/dev"
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
    URL: "https://j4bm0f2gx1.execute-api.us-east-1.amazonaws.com/dev"
  },
  STRIPE_KEY: "pk_test_PvociWFfxr6L1cjqbkYXVhkm003Rm6oZNW"
}

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default config;