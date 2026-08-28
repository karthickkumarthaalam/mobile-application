export type DonationFrequency = "one_time" | "monthly";

export interface CreateDonationRequest {
  donor_name: string;
  email: string;
  phone: string;
  country: string;
  amount: number;
  currency: string;
  frequency: DonationFrequency;
  source: "mobile" | "web";
  success_url: string;
  cancel_url: string;
}

export interface DonationResponseData {
  checkout_url: string;
  donation_id?: string | number;
}

export interface DonationResponse {
  success: boolean;
  message?: string;
  data?: DonationResponseData;
}
