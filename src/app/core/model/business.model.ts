import {
  ActivationStatusEnums,
  BvnStatusEnums,
  kycDocumentStatusEnums,
  OrganizationCategoryEnums,
  SchoolTypesEnums,
  TermEnums,
} from './enums';

export interface BusinessI {
  _id: string;
  organizationName: string;
  email: string;
  phoneNumber: string;
  organizationCategory: OrganizationCategoryEnums;
  schoolType: SchoolTypesEnums;
  schoolCategoryBoard: string;
  organizationType: string;
  disabled: boolean;
  tinNumber: string;
  address: string;
  lga: string;
  state: string;
  bankAccountSet: boolean;
  monifyApiKey: string;
  directors: any[];
  createdAt: string;
  updatedAt: string;
  kycDocument: { logo: string };
  mySchoolPortalId: string;
  logo: string;

  kycDocumentStatus: kycDocumentStatusEnums;
  activated: boolean;
  activationFee: number;
  activationFeeStatus: ActivationStatusEnums;
  activationFeeRef: string;
  manageGroupFees: boolean;
  group: BusinessI;
  serialNum: string;
  merchantNumber: string;
  staticAccountName: string;
  bvnUpdated: boolean;
  partSettlement: boolean;
  bvnApproved: Boolean;
  bvnApprovalStatus: BvnStatusEnums;
  bvn: string;
}

export interface SessionI {
  term: TermEnums;
  formatedTerm: string;
  organization: string;
  status: 'active' | 'inactive' | 'expired' | 'completed';
  year: string;
  termDetails: {
    no: number;
    title: string;
    type: 'term' | 'semester';
  };
  _id: string;
  createdAt: string;
  updatedAt: string;
}
