import { API } from "aws-amplify";
import BusinessUser from "../model/businessUser";
import { PATHS } from "./paths";
import { GetBusiness } from "./Business";
import Business from "../model/business";

// TODO: Change any to BusinessUser type
export async function GetBusinessUser(businessUserId: string): Promise<any> {
	let error;
	let response;
	let vendorData;
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

export async function getVendors(businessUserId: string) {

	const { response } = await GetBusinessUser(businessUserId);

	let error;
	let vendorData;
	vendorData = response.businesses ? response.businesses.map((id: string) => GetBusiness(id)) : [];
	const loadedVendors: Array<Business> = [];
	const loadedVendorState:  {[key: string]: boolean} = {};

	try {
		for (const vendor of vendorData) {
			const res = await vendor;
			loadedVendors.push({
				id: res.place_id,
				businessName: res.business_name,
				address: res.address,
				: res.btn_id,
				onboardMessage: res.onboard_message,
				presetMessages: res.preset_messages,
				twilioNumber: res.twilio_number,
			});
			loadedVendorState[res.place_id] = false;
		}
	} catch (e) {
		error = e;
	}

	return { loadedVendors, loadedVendorState, error, response };
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