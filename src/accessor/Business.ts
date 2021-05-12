import { API } from "aws-amplify";
import Business from "../model/business";
import { PATHS } from "./paths";

export function CreateBusiness(business: Business): Promise<Business> {
	return API.post(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.CREATE, 
		{
			body: business
		}
	);
}

export function GetBusiness(businessId: string): Promise<Business> {
	return API.get(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.GET.replace("{id}", businessId), 
		{}
	);
}

export async function GetBusinesses(businessIds: Array<string>): Promise<{businesses: Array<Business>, errors: Array<string>}> {
	const businessPromises = businessIds ? businessIds.map((id: string) => GetBusiness(id)) : [];
	
	const businesses: Array<Business> = [];
	const errors: Array<string> = [];
	for (const businessPromise of businessPromises) {
		try {
			const business: Business = await businessPromise;
			businesses.push(business);
		} catch (e) {
			errors.push(e);
		}

	}

	return { businesses, errors };
}

export function UpdateBusiness(business: Business): Promise<Business> {
	return API.put(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.UPDATE.replace("{id}", business.id), 
		{
			body: business
		}
	);
}

