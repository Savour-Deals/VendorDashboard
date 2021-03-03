import { API } from "aws-amplify";
import { PATHS } from "./paths";
import { GetBusiness } from "./Business";

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

	vendorData = response.businesses ? response.businesses.map((id: string) => GetBusiness(id)) : [];
	const loadedVendors: Array<Vendor> = [];
	const loadedVendorState:  {[key: string]: boolean} = {};

	try {
		for (const vendor of vendorData) {
			const res = await vendor;
			console.log(res);
			loadedVendors.push({
				placeId: res.place_id,
				vendorName: res.business_name,
				primaryAddress: res.address,
				buttonId: res.btn_id,
				onboardMessage: res.onboard_message,
				presetMessages: res.preset_messages,
				twilioNumber: res.twilio_number,
			});
			loadedVendorState[res.place_id] = false;
		}
	} catch (e) {
		error = e;
	}

	return { loadedVendors, loadedVendorState, error };
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