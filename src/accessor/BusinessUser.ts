import { API } from "aws-amplify";
import BusinessUser from "../model/businessUser";
import { PATHS } from "./paths";

export async function GetBusinessUser(businessUserId: string): Promise<{businessUser: BusinessUser, error?: string}> {
	let error;
	let businessUser;
	try {
		businessUser = await API.get(
			PATHS.BUSINESS_USER.api,
			PATHS.BUSINESS_USER.GET.replace("{id}", businessUserId),
			{}
		);
	} catch (e) {
		error = e;
	}

	return { businessUser, error };
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

export async function UpdateBusinessUser(businessUser: BusinessUser): Promise<BusinessUser> {
	return API.put(
		PATHS.BUSINESS_USER.api,
		PATHS.BUSINESS_USER.UPDATE.replace("{id}", businessUser.id), 
		{
			body: businessUser
		}
	);
}