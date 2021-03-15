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

export function UpdateBusiness(business: Business): Promise<Business> {
	return API.put(
		PATHS.BUSINESS.api,
		PATHS.BUSINESS.UPDATE.replace("{id}", business.id), 
		{
			body: business
		}
	);
}

