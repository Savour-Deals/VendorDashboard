import { API } from "aws-amplify";
import BusinessUser from "../model/businessUser";
import { PATHS } from "./paths";

export async function CreateBusinessUser(user: BusinessUser): Promise<BusinessUser> {
	return API.post(
		PATHS.BUSINESS_USER.api,
		PATHS.BUSINESS_USER.CREATE,
		{
			body: user
		}
	);
}

export async function GetBusinessUser(businessUserId: string): Promise<BusinessUser> {
	return API.get(
		PATHS.BUSINESS_USER.api,
		PATHS.BUSINESS_USER.GET.replace("{id}", businessUserId),
		{}
	);
}

export async function AddBusiness(businessUserId: string, businessId: string): Promise<void> {
	return API.put(
		PATHS.BUSINESS_USER.api,
		PATHS.BUSINESS_USER.UPDATE.replace("{id}", businessUserId), 
		{
			body: {
				businesses: businessId,
			}
		}
	);
}