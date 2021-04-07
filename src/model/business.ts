export default interface Business {
	id: string,
	businessName: string,
	address: string,
	subscriberMap: Map<string, SubscriberInfo>,
	presetMessages: string[],
	onboardMessage: string,
	stripeCustomerId?: string,
	stripePaymentMethod?: string,
	stripeSubId?: string,
	stripeRecurringSubItem?: string,
	stripeUsageSubItem?: string,
	twilioNumber?: string,
	campaignsMap?: Map<string, Campaign>,
}

export interface SubscriberInfo {
	subscribed: boolean
}

export interface Campaign {
  businessId: string;
  campaignName: string;
  startDateTime: string;
  message: string;
	textCount: number;
}