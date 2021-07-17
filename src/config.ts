interface Config {
  cognito: {
    REGION: string,
    USER_POOL_ID: string,
    APP_CLIENT_ID: string,
    IDENTITY_POOL_ID: string
  },
  apiGateway: {
    REGION: string,
    URL: string
  },
  STRIPE_KEY: string
}

const local: Config = {
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

const live: Config = {
  cognito: {
    REGION: process.env.REGION!!,
    USER_POOL_ID: process.env.USER_POOL_ID!!,
    APP_CLIENT_ID: process.env.APP_CLIENT_ID!!,
    IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID!!
  },
  apiGateway: {
    REGION: process.env.REGION!!,
    URL: process.env.API_GATEWAY_URL!!,
  },
  STRIPE_KEY: process.env.STRIPE_KEY!!
}

const config = (process.env.STAGE === "prod" || process.env.STAGE === "dev") ? live : local;

export default config;