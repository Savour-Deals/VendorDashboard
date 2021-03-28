import { API } from "aws-amplify";
import BusinessUser from "../model/businessUser";
import { PATHS } from "./paths";
import { GetBusiness } from "./Business";
import Business from "../model/business";

// TODO: Change any to BusinessUser type
export async function GetBusinessUser(businessUserId: string): Promise<any> {
	let error;
	let response;
	try {
		response = await API.get(
			PATHS.BUSINESS_USER.api,
			PATHS.BUSINESS_USER.GET.replace("{id}", businessUserId),
			{}
		);
	} catch (e) {
		error = e;
	}


	return { error, response };
}

export async function GetBusinesses(businessUserId: string): Promise<{loadedBusinesses: Array<Business>, error?: string}> {

	const { response, error } = await GetBusinessUser(businessUserId);

	const businessData = response.businesses ? response.businesses.map((id: string) => GetBusiness(id)) : [];
	
	const loadedBusinesses: Array<Business> = [];
	for (const vendor of businessData) {
		const res = await vendor;
		loadedBusinesses.push({
			id: res.id,
			businessName: res.businessName,
			address: res.address,
			subscriberMap: new Map(),
			onboardMessage: res.onboardMessage,
			presetMessages: res.presetMessages,
			twilioNumber: res.twilioNumber,
		});
	}

	return { loadedBusinesses, error };
}

export async function CreateBusinessUser(user: BusinessUser): Promise<BusinessUser> {
	return API.post(
		PATHS.BUSINESS_USER.api,
		PATHS.BUSINESS_USER.CREATE,
		{
			body: user
		}
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
