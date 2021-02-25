import { API } from "aws-amplify";
import { PATHS } from "./paths";

// TODO: Change any to BusinessUser type
export async function GetBusinessUser(businessUserId: string): Promise<any> {
	return API.get(
		PATHS.BUSINESS_USER.api,
		PATHS.BUSINESS_USER.GET.replace("{id}", businessUserId),
		{}
	);
}

export async function AddBusiness(businessUserId: string, businessId: string): Promise<void> {
	return API.post(
		PATHS.BUSINESS_USER.api,
		PATHS.BUSINESS_USER.UPDATE.replace("{id}", businessUserId), 
		{
			body: {
				businesses: businessId,
			}
		}
	);
}