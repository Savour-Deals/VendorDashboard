import { API } from "aws-amplify";
import { PATHS } from "./paths";

declare interface CreateBusinessRequest {
	id: string,
	businessName: string,
	address: string,
	presetDeals: string[],
	onboardDeal: string,
	stripeCustomerId: string,
	twilioNumber: string,
	subscriberMap: {}
}

export async function CreateBusiness(request: CreateBusinessRequest): Promise<void> {
	return API.post(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.CREATE, 
		{
			body: {
				place_id: request.id,
				business_name: request.businessName,
				address: request.address,
				preset_deals: request.presetDeals,
				onboard_deal: request.onboardDeal,
				stripe_customer_id: request.stripeCustomerId,
				twilio_number: request.twilioNumber,
				subscriber_map: request.subscriberMap
			}
		}
	);
}

//TODO: Change any return type to Vendor
export async function GetBusiness(businessId: string): Promise<any> {
	return API.get(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.GET.replace("{id}", businessId), 
		{}
	);
}