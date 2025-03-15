

export type TStatus = "success" | "error"

export type TUpload = "upload" | "url"

export interface iCloudinaryInfo {
  id: string;
  batchId: string;
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  asset_folder: string;
  display_name: string;
  original_filename: string;
  api_key: string;
  path: string;
  thumbnail_url: string;
}

export interface iMedia {
  secure_url: string;
  public_id: string;
  type: string;
  resource_type: string
}

export interface iStatus {
  message: string;
  status: TStatus;
  data?: Record<string, any>;
}

export interface iUploadResource {
  file?: File;
  folder: string;
  url?: string
}

export interface iItem {
  label: string;
  value: string;
}

export type TGender = "male" | "female"

export type TParent = "mother" | "father"


export interface iXata {
  createdAt: Date;
  updatedAt: Date;
  version: number
}


export interface iMedia {
  secure_url: string;
  public_id: string;
  type: string;
  resource_type: string
}

export interface iChild {
  id: string;
  name: string
  image: iMedia;
  codeName: string;
  gallery: string[]
  email: string;
  birthday: string;
  location: "island" | "mainland" | "abroad";
  gender: TGender;
  mother: iParent;
  father: iParent;
  xata: iXata;
}

export interface iInfo {
  name: string;
  imageUrl: string;
  userEmail: string;
}

export interface iParent {
  id: string;
  xata: iXata;
  name: string;
  type: TParent;
  image: string;
  email: string;
  children: string[];
  phone: string;
  address: string;
}
export interface iEmailAddress {
  id: string;
  object: string;
  email_address: string;
  reserved: boolean;
  verification: {
    status: string;
    strategy: string;
    attempts: number | null;
    expire_at: number | null
  },
  linked_to: [
    {
      type: string;
      id: string;
    }
  ],
  created_at: number;
  updated_at: number;
}

export interface iExternalAccount {
  object: string;
  id: string;
  google_id: string;
  approved_scopes: string;
  email_address: string;
  given_name: string;
  family_name: string;
  picture: string;
  username: string;
  public_metadata: Record<string, any>;
  label: string | null;
  created_at: number;
  updated_at: number;
  verification: {
    status: string;
    strategy: string;
    attempts: number | null;
    expire_at: number | null
  }
}

export interface iUser {
  id: string;
  object: string;
  username: string | null;
  first_name: string;
  last_name: string;
  image_url: string;
  has_image: boolean;
  primary_email_address_id: string;
  primary_phone_number_id: string | null;
  primary_web3_wallet_id: string | null;
  password_enabled: boolean;
  two_factor_enabled: boolean;
  totp_enabled: boolean;
  backup_code_enabled: boolean;
  email_addresses: iEmailAddress[];
  phone_numbers: [];
  web3_wallets: [];
  passkeys: [];
  external_accounts: iExternalAccount[];
  saml_accounts: [];
  public_metadata: Record<string, any>;
  private_metadata: Record<string, any>;
  unsafe_metadata: Record<string, any>;
  external_id: string | null;
  last_sign_in_at: number;
  banned: boolean;
  locked: boolean;
  lockout_expires_in_seconds: number | null;
  verification_attempts_remaining: number;
  created_at: number;
  updated_at: number;
  delete_self_enabled: boolean;
  create_organization_enabled: boolean;
  last_active_at: number;
  mfa_enabled_at: number | null;
  mfa_disabled_at: number | null;
  profile_image_url: string;
}

export interface iResult {
  message: string;
  status: TStatus;
  data?: any
}

export interface iRoute {
  name: string;
  href: string;
  icon?: any
}

export interface iDashboardCard {
  title: string;
  count: number;
  icon: any
}

export interface iLinkItem {
  icon: any;
  label: string;
  href: string;
  visible: string[]
}

export interface iMenu {
  title?: string;
  items?: iLinkItem[];
  icon?: any;
  label?: string;
  href?: string;
  visible?: string[]
}

export interface iPhone { value: string; selectedCountry: string }

export interface iUpload {
  fileId: string;
  id: string;
  url: string;
}

export interface iSection {
  id: string;
  title: string;
  content: string;
}