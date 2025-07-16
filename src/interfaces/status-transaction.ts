export interface StatusTransaction {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: string;
  created_at: Date;
  finalized_at: Date;
  amount_in_cents: number;
  reference: string;
  currency: string;
  payment_method_type: string;
  payment_method: PaymentMethod;
  payment_link_id: null;
  redirect_url: null;
  status: string;
  status_message: null;
  merchant: Merchant;
  taxes: any[];
  tip_in_cents: null;
}

export interface Merchant {
  id: number;
  name: string;
  legal_name: string;
  contact_name: string;
  phone_number: string;
  logo_url: null;
  legal_id_type: string;
  email: string;
  legal_id: string;
  public_key: string;
}

export interface PaymentMethod {
  type: string;
  extra: Extra;
  installments: number;
}

export interface Extra {
  name: string;
  brand: string;
  card_type: string;
  last_four: string;
  is_three_ds: boolean;
  three_ds_auth: ThreeDsAuth;
  three_ds_auth_type: null;
  external_identifier: string;
  processor_response_code: string;
}

export interface ThreeDsAuth {
  current_step: string;
  current_step_status: string;
}

export interface Meta {}
