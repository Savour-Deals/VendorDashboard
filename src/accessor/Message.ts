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