const dev = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_00vE68jU0",
    APP_CLIENT_ID: "3ksbmcacv0dbadrr38v1b8tdjn",
    IDENTITY_POOL_ID: "us-east-1:0f84b6c4-8395-4b67-83cb-2982c30368e1"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6s71kv10hk.execute-api.us-east-1.amazonaws.com/dev"
  },
  STRIPE_KEY: "pk_test_PvociWFfxr6L1cjqbkYXVhkm003Rm6oZNW"
}

const prod = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_00vE68jU0",
    APP_CLIENT_ID: "3ksbmcacv0dbadrr38v1b8tdjn",
    IDENTITY_POOL_ID: "us-east-1:0f84b6c4-8395-4b67-83cb-2982c30368e1"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6s71kv10hk.execute-api.us-east-1.amazonaws.com/dev"
  },
  STRIPE_KEY: "pk_test_PvociWFfxr6L1cjqbkYXVhkm003Rm6oZNW"
}

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default config;