export type OrganizationCategoryType = 'school' | 'other';
export type SchoolType = 'primary' | 'secondary';

export type adminRoleEnums =
  | 'basicStaff'
  | 'orgAdmin'
  | 'portalAdmin'
  | 'stakeholderAdmin';

export enum RoleEnums {
  STAFF = 'basicStaff',
  ORGADMIN = 'orgAdmin',
  GROUPADMIN = 'groupAdmin',
  PORTALADMIN = 'portalAdmin',
  STAKEHOLDER = 'stakeholderAdmin',
}

export enum CheckoutCopyEnums {
  ACCT = 'acct_number',
  AMOUNT = 'amount',
}

export type SystemType = 'open' | 'close';

export type PaymentStatus = 'declined' | 'approved' | 'pending' | 'expired';

export type AlertState = 'success' | 'warning' | 'error';

export type PaymentMethodTypes =
  | 'ACCOUNT_TRANSFER'
  | 'CARD'
  | 'USSD'
  | 'PHONE_NUMBER'
  | 'dynamic_virtual_account';

export enum PaymentStatusEnums {
  DECLINED = 'declined',
  APPROVED = 'approved',
  SUCCESS = 'success',
  PENDING = 'pending',
  PART_PAYMENT = 'part-payment',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  MISMATCH = 'mismatch',
  SETTLED = 'settled',
  UNSETTLED = 'unsettled',
}
export enum SettlementStatusEnums {
  DECLINED = 'declined',
  APPROVED = 'approved',
  PENDING = 'pending',
  EXPIRED = 'expired',
}
export enum DisputeStatusEnums {
  RESOLVED = 'resolved',
  NONE = 'none',
  PENDING = 'pending',
  ESCALATED = 'escalated',
}

export enum PaymentChannelEnums {
  OFFLINE_USSD = 'offline',
  WEB = 'online',
}
export enum GatewayEnums {
  SQUAD = 'squad',
  MONNIFY = 'monify',
  CYBERPAY = 'cyberpay',
  PAYATTITUDE = 'payattitude',
}

export enum DateRangeEnums {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  THISWEEK = 'thisWeek',
  LASTWEEK = 'lastWeek',
  THISMONTH = 'thisMonth',
  LASTMONTH = 'lastMonth',
  THISYEAR = 'thisYear',
  CUSTOM = 'custom',
  THISTERM = 'thisTerm',
}

export enum schoolCategoryBoardEnums {
  PUBLICPRIMARY = 'publicSecondarySchool',
  PUBLICSECONDARY = 'publicSecondarySchool',
  METHODIST = 'methodistSchool',
  ANGLICAN = 'anglicanSchool',
  PRIVATE = 'privateSchool',
  UNITY = 'unitySchool',
  NONCATGORY = 'nonCategory',
  ADULT = 'adultEducation',
  TECHNICAL = 'publicTechnicalSchool',
}

export type schoolCategoryBoarType =
  | 'publicSecondarySchool'
  | 'publicPrimarySchool'
  | 'methodistSchool'
  | 'anglicanSchool'
  | 'privateSchool'
  | 'unitySchool'
  | 'nonCategory'
  | 'adultEducation'
  | 'publicTechnicalSchool';

export type kycDocumentStatusTypes =
  | 'pending'
  | 'deny'
  | 'approved'
  | 'notUploaded';

export enum kycDocumentStatusEnums {
  PENDING = 'pending',
  DENIED = 'deny',
  APPROVED = 'approved',
  NOTUPLOADED = 'notUploaded',
}

export type kycReviewActions = 'deny' | 'approved';
export type TermEnums = 'firstTerm' | 'secondTerm' | 'thirdTerm';

export type PricingType = 'fixed' | 'percentage' | 'range';

export type BusinessDocTypes =
  | 'cacForm2'
  | 'cacForm7'
  | 'utilityBill'
  | 'businessReg'
  | 'memorandum'
  | 'identityCard'
  | 'mandateLetter'
  | 'logo';

export enum LocalStoreEnums {
  INVOICE = '@invoice',
  ORG = '@org',
  FEE = '@fee',
  ORGFEES = '@orgfees',
  STUDENTPAYDATA = '@studentPayData',
  SCHOOLPAYDATA = '@schoolPayData',
  SELECTEDGROUP = '@selectedGrp',
  ORGPROFILEDATA = '_fngorg',
  ORGGROUPPROFILEDATA = '_fnggroup',
  TOKEN = '_fngtkn',
}

export enum PortalFeeEnums {
  ACTIVATION = 'activation',
  REACTIVATION = 'reactivation',
}

export enum ActivationStatusEnums {
  PAID = 'paid',
  WAIVED = 'waived',
  PENDING = 'pending',
}
export enum BvnStatusEnums {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export enum OwnerEnums {
  PORTAL = 'feesng',
  ORG = 'organization',
}

export enum StatististcMenuEnums {
  DETAILS = 'details',
  BULKDELETE = 'bulkDelete',
  DEBT = 'exportDebt',
  PAID = 'exportPaid',
}

export enum OrganizationCategoryEnums {
  SCHOOL = 'school',
  OTHERS = 'other',
}

export enum PaymentTabsEnums {
  PAYMENTHISTORY = 'payment history',
  PAYMENTINVOICE = 'payment invoice',
}

export enum SchoolTypesEnums {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum OrganizationTypeEnums {
  STANDALONE = 'standalone',
  GROUP = 'group',
}

export enum UploadErrorEnums {
  MISSINGDATA = 1,
  DUPLICATE = 2,
}
export enum StudentStatusEnums {
  ACTIVE = 'active',
  GRADUATED = 'graduated',
  DELETED = 'archive',
}

export enum ActivityLogEnums {
  CREATE_STUDENT = 'add_student',
  REMOVE_STUDENT = 'delete_student',
  RECOVER_STUDENT = 'recover_student',
  GRADUATE_STUDENT = 'graduate_student',
  UNDO_GRADUATE = 'undo_graduate_student',

  CREATE_FEE = 'add_fee',
  REMOVE_FEE = 'delete_fee',
  UPDATE_FEE_AMOUNT = 'update_fee_amount',
  SET_DISCOUNT = 'set_discount',
  EDIT_DISCOUNT = 'edit_discount',
}

export enum VirtualAccTypeEnums {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
}

export enum MenuFolderEnums {
  STUDENTS = 'students',
  PAYMENTS = 'payments',
  BUSINESS = 'business',
  ORGANIZATIONS = 'organizations',
  REPORT = 'report',
  AUDIT = 'audit',
  MESSAGING = 'messaging',
}
export enum MenuFolderPosition {
  STUDENTS = 2,
  PAYMENTS = 4,
  ORGANIZATIONS = 6,
  BUSINESS = 8,
  REPORT = 10,
  AUDIT = 12,
  MESSAGING = 13,
}

export enum ExpenditureCategoryEnums {
  DEVELOPMENT = 'development',
  DATABASE = 'database',
  HOSTING = 'hosting',
  SMS = 'sms',
  USSD = 'ussd',
  SALARY = 'salary',
  DOMAIN = 'domain',
  OTHERS = 'others',
}

export enum FeeCycleEnums {
  WEEKLY = 'weekly',
  DAILY = 'daily',
  TERMLY = 'termly',
  MONTHLY = 'monthly',
  ANNUAL = 'yearly',
  SESSION = 'session',
  BIANNUAL = 'biannual',
  OPEN = 'open',
  ONEOFF = 'once',
}

export enum PayerTypeEnums {
  STUDENTS = 'students',
  CUSTOMERS = 'customers',
  OTHERS = 'others',
}

export enum TransferOptionsTypeEnums {
  TRANSFER = 'transfer',
  PHONE = 'phoneNumber',
}

export enum FeeSystemTypeEnums {
  OPEN = 'open',
  CLOSED = 'close',
}

export enum PricingTypeEnums {
  FIXED = 'fixed',
  RANGE = 'range',
  PERCENTAGE = 'percentage',
}

export enum PaymentInitEnums {
  UPTODATE = 'uptoDate',
  LOWAMOUNT = 'lowAmount',
  WALLETCOMPLETED = 'autoWalletCompleted',
  CANGENERATE = 'canGenerate',
}

export enum SmsProviderEnums {
  SENDCHAMP = 'sendchamp',
  BULKSMSNGN = 'bulksmsnigeria',
  ATT = 'africastalking',
  TELNYX = 'telnyx',
  TERMII = 'termii',
}

export enum PaymentProviderEnums {
  SQUAD = 'squad',
  STERLING = 'sterling',
  MONIFY = 'monify',
  CYBERPAY = 'cyberpay',
}
