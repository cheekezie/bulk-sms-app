import { BusinessI, SessionI } from './business.model';
import {
  DisputeStatusEnums,
  FeeCycleEnums,
  GatewayEnums,
  OwnerEnums,
  PayerTypeEnums,
  PaymentChannelEnums,
  PaymentInitEnums,
  PaymentMethodTypes,
  PaymentStatusEnums,
  SettlementStatusEnums,
  SystemType,
  VirtualAccTypeEnums,
} from './enums';
import {
  DepartmentI,
  ProgramI,
  SchoolClassI,
  SchoolSubclassI,
  StudentI,
} from './student.mode';

export interface SchoolSearchResI {
  page: number;
  pages: number;
  orgCount: number;
  organizations: SearchSchoolI[];
}

export interface SearchSchoolI {
  logo: string;
  organizationName: string;
  _id: string;
}

export interface FeesDataResponse {
  page: number;
  pages: number;
  feesCount: number;
  fees: FeeI[];
  institution: BusinessI;
  sessions: SessionI[];
}

export interface FeeI {
  _id: string;
  title: string;
  organization: BusinessI;
  selfCharged: boolean;
  recurrent: boolean;
  externalList: boolean;
  cycle: FeeCycleEnums;
  payerType: PayerTypeEnums;
  active: boolean;
  removed: boolean;
  systemType: SystemType;
  formatedSystemType: string;
  requireValidation: boolean;
  amount?: number;
  schoolFee: boolean;
  owner: OwnerEnums;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  _id: string;
  studentId: string;
  regNumber: string;
  studentAcademicYear: number;
  transactionRef: string;
  studentName: string;
  customerName: string;
  payerName: string;
  organization: BusinessI;
  calendarYear: string;
  session: string;
  term: string;
  email: string;
  payerRegId: string;
  phoneNumber: string;
  classCode: number;
  orgIncurredFee: number;
  incurredFeeSquad: number;
  paymentGateway: GatewayEnums;
  invoiceRef: string;
  payattitudeOrderId: string;
  day: string;
  amount: number;
  transactionAmount: number;
  recurrent: boolean;
  settled: boolean;
  cancelled: boolean;
  toalAmountPaid: number;
  paymentType: SystemType;
  paymentStatus: PaymentStatusEnums;
  paymentChannel: PaymentChannelEnums;
  paymentMode: PaymentMethodTypes;
  paymentCompleted: boolean;
  autoWalletCompleted: boolean;
  disputeStatus: DisputeStatusEnums;
  paymentHistory: {
    day: string;
    date: string;
    amount: number;
  }[];
  arrears: boolean;
  qrCode: string;
  paymentUsed: boolean;
  fee: FeeI;
  feeTitle: string;
  dateGenerated: string;
  dateConfirmed: string;
  settlementDate: string;
  period: string;
  createdAt: string;
  updatedAt: string;
  extraInformation: string;
  settledBeneficiaries: any[];
  squad_settledBeneficiaries: any[];
  transactionHistory: any[];
  totalSettlementStatus: SettlementStatusEnums;
  virtualAccountDetails: VirtualAccountDetailsI;
}

export interface VirtualAccountDetailsI {
  accountName: string;
  accountNumber: string;
  bankName: string;
  type: VirtualAccTypeEnums;
  expires: number;
  initializedAt: number;
  serverCurrentTime: number;
}

export interface InitiatePaymentResponse {
  transferOption?: number;
  arrears: boolean;
  paymentChannel: string;
  paymentCompleted: boolean;
  payCheckout: {
    checkoutUrl: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  accountDetails: VirtualAccountDetailsI;
  qrCode: string;
  invoice: Invoice;
  feeObject: FeeI;
  classObject: SchoolSubclassI;
  orgObject: BusinessI;
  student: StudentI;
  walletBalanceAvailable: boolean;
  amountToPay: number;
  walletBalance: number;
  amountPaid: number;
  message: string;
  status: PaymentInitEnums;
}

export interface ScheduleI {
  paymentId: string;
  fee: string;
  class: SchoolClassI;
  department: DepartmentI;
  program: ProgramI;
  session: string;
  schoolType: string;
  term: 'firstTerm' | 'secondTerm' | 'thirdTerm';
  status: string;
  amount: number;
  actualAmount: number;
  totalReceived: number;
  amountToComplete: number;
  variation: number;
  _id: string;
}
