import { API } from "aws-amplify";
import { PATHS } from "./paths";

declare interface CreateBusinessRequest {
	id: string,
	businessName: string,
	address: string,
	presetMessages: string[],
	onboardMessage: string,
	stripeCustomerId: string,
	twilioNumber: string,
	subscriberMap: {}
}

export function CreateBusiness(request: CreateBusinessRequest): Promise<void> {
	return API.post(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.CREATE, 
		{
			body: {
				place_id: request.id,
				business_name: request.businessName,
				address: request.address,
				preset_messages: request.presetMessages,
				onboard_message: request.onboardMessage,
				stripe_customer_id: request.stripeCustomerId,
				twilio_number: request.twilioNumber,
				subscriber_map: request.subscriberMap
			}
		}
	);
}

//TODO: Change any return type to Vendor
export function GetBusiness(businessId: string): Promise<any> {
	return API.get(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.GET.replace("{id}", businessId), 
		{}
	);
}