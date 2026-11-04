export interface EnquiryRequest {
  name: string;
  phone: string;
  email: string;
  subject: string;
  purpose: string;
  message: string;
}

export interface AdvertiseRequest {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  site_address: string;
  requirement: string;
}
