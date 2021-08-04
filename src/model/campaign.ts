import { Colors } from "../constants/Constants"

export default interface Campaign {
	id: string,
	campaignName: string,
	campaignStatus: string,
	businessId: string,
	message: string,
	link?: string,
	campaignDateTimeUtc: string
	createdDateTimeUtc: string,
	lastUpdatedDateTimeUtc: string,
	twilioResponse?: any[],
}

export const CampaignStatus = {
	SCHEDULED: 'SCHEDULED',
	SCHEDULING_FAILED: 'SCHEDULING_FAILED',
	SENT: 'SENT',
	SENDING_FAILED: 'SENDING_FAILED'
}

export const CampaignStatusText = {
	[CampaignStatus.SCHEDULED]: 'Scheduled',
	[CampaignStatus.SCHEDULING_FAILED]: 'Failed',
	[CampaignStatus.SENT]: 'Sent',
	[CampaignStatus.SENDING_FAILED]: 'Failed'
}

export const CampaignStatusColors = {
	[CampaignStatus.SCHEDULED]: Colors.warning.light,
	[CampaignStatus.SCHEDULING_FAILED]: Colors.error.light,
	[CampaignStatus.SENT]: Colors.success.light,
	[CampaignStatus.SENDING_FAILED]: Colors.error.light
}