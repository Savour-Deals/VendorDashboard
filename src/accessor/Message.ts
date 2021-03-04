import { API } from "aws-amplify";
import { PATHS } from "./paths";

declare interface CreateNumberResponse {
  status: boolean;
  number: string;
}

export async function CreateNumber(placeId: string): Promise<string> {
	return API.post(
		PATHS.MESSAGE.api,
		PATHS.MESSAGE.CREATE_NUMBER, 
		{
			body: {
				place_id: placeId
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