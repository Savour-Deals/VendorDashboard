export default interface Business {
	id: string,
	businessName: string,
	address: string,
	presetMessages: string[],
	onboardMessage: string,
	stripeCustomerId?: string,
	stripePaymentMethod?: string,
	stripeSubId?: string,
	stripeRecurringSubItem?: string,
	stripeUsageSubItem?: string,
	messagingNumber?: string,
	subscriberMap: Map<string, SubscriberInfo>,
	campaignsMap?: Map<string, Campaign>,
}

export interface SubscriberInfo {
	subscribed: boolean,
	timestamp: string
}

export interface Campaign {
  businessId: string;
  campaignName: string;
  startDateTime: string;
  message: string;
	textCount: number;
	messageUrl?: string;
}