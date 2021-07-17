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

const dev: Config = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_99Rfz0HLh",
    APP_CLIENT_ID: "3i676cplem2mu4esqj2pjh39sg",
    IDENTITY_POOL_ID: "us-east-1:003092b5-97c1-49a9-bf37-92aa035324cc"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://6zs6jwpnw5.execute-api.us-east-1.amazonaws.com/dev"
  },
  STRIPE_KEY: "pk_test_PvociWFfxr6L1cjqbkYXVhkm003Rm6oZNW"
}

const prod: Config = {
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_u9El8rFRy",
    APP_CLIENT_ID: "6sko6vk038tcuhk31e5tju9ilm",
    IDENTITY_POOL_ID: "us-east-1:26242418-2b37-4aba-8a9a-1a12a5be9c9b"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://waujulq2ic.execute-api.us-east-1.amazonaws.com/prod	"
  },
  STRIPE_KEY: "pk_live_zwDKo1RWSPCdp4N2ZWtS7nKV007mQ54KkY"
}

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default config;