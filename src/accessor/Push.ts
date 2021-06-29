import { API } from "aws-amplify";
import { PATHS } from "./paths";
import Campaign from '../model/campaign';

export async function GetAll(businessId: string): Promise<Array<Campaign>> {
	return API.get(
		PATHS.PUSH.api,
		PATHS.PUSH.GET_ALL.replace("{id}", businessId), 
		{}
	);
}

export async function Get(uid: string): Promise<Campaign> {
	return API.get(
		PATHS.PUSH.api,
		PATHS.PUSH.GET.replace("{id}", uid), 
		{}
	);
}

