import { API } from "aws-amplify";
import { PATHS } from "./paths";



//TODO: change any to MessageAudit list type
export async function GetAll(businessId: string): Promise<any> {
	return API.get(
		PATHS.PUSH.api,
		PATHS.PUSH.GET_ALL.replace("{id}", businessId), 
		{}
	);
}

//TODO: change any to MessageAudit type
export async function Get(uid: string): Promise<any> {
	return API.get(
		PATHS.PUSH.api,
		PATHS.PUSH.GET.replace("{id}", uid), 
		{}
	);
}

