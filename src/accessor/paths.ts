export const PATHS = {
	MESSAGE: {
		api: "message",
		CREATE_NUMBER: "/message/number",
		SEND_MESSAGE: "/message/send"
	},
	BUSINESS: {
		api: "business",
		CREATE: "/business",
		GET: "/business/{id}",
		UPDATE: "/business/{id}"
	},
	BUSINESS_USER: {
		api: "business_user",
		UPDATE: "/business_user/{id}",
		GET: "/business_user/{id}",
		CREATE: "/business_user"
	},
	PAYMENT: {
		api: "payment",
		CREATE_CUSTOMER: "/payment/subscription/{id}",
		UPDATE_CARD: "/payment/card/{id}",
		UPDATE_USAGE: "/payment/usage/{id}"
	},
	PUSH: {
		api: "push",
		GET_ALL: "/push/q/{id}",
		GET: "/push/g/{id}"
	}
}