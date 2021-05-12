import { API } from "aws-amplify";
import { PATHS } from "./paths";

declare interface CreateNumberResponse {
  status: boolean;
  number: string;
}

export interface CreateCampaignRequest {
	message: string,
	link: string,
	businessId: string,
	campaignDateTimeUtc: string
};

export async function CreateNumber(businessId: string): Promise<string> {
	return API.post(
		PATHS.MESSAGE.api,
		PATHS.MESSAGE.CREATE_NUMBER, 
		{
			body: {
				businessId: businessId
			}
		}
	).then((response: CreateNumberResponse) => response.number);
}

declare interface SendMessageResponse {
  messageId: string;
}
export async function SendMessage(id: string, message: string, link?: string): Promise<string> {
	return API.post(
		PATHS.MESSAGE.api,
		PATHS.MESSAGE.SEND_MESSAGE, 
		{
			body: {
				businessId: id,
				message: message,
				link: link
			}
		}
	).then((response: SendMessageResponse) => response.messageId);
}

export async function CreateCampaign(request: CreateCampaignRequest): Promise<any> {
	return API.post(
		PATHS.MESSAGE.api,
		PATHS.MESSAGE.CREATE_CAMPAIGN, 
		{
			body: request,
		}
	);
}	