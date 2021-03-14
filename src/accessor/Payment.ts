import { API } from "aws-amplify";
import { PATHS } from "./paths";

declare interface CreateSubscriptionRequest {
	email: string,
	name: string,
	paymentMethod: string
}

export function CreateSubscription(businessId: string, request: CreateSubscriptionRequest): Promise<void> {
	return API.post(
		PATHS.PAYMENT.api,
		PATHS.PAYMENT.CREATE_CUSTOMER.replace("{id}", businessId), 
		{
			body: request
		}
	);
}

declare interface UpdatePaymentRequest {
	customerId: string,
	paymentMethod: string
}

export function UpdatePayment(businessId: string, request: UpdatePaymentRequest): Promise<void> {
	return API.put(
		PATHS.PAYMENT.api,
		PATHS.PAYMENT.UPDATE_CARD.replace("{id}", businessId), 
		{
			body: request
		}
	);
}

declare interface AddUsageRequest {
	subscriptionItem: string,
	quantity: string
}

export function AddUsage(request: AddUsageRequest): Promise<void> {
	return API.put(
		PATHS.PAYMENT.api,
		PATHS.PAYMENT.UPDATE_USAGE, 
		{
			body: request
		}
	);
}