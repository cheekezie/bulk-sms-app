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
  TermEnums,
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
export interface StudentSearchResI {
  page: number;
  pages: number;
  count: number;
  data: StudentI[];
}

export interface SearchSchoolI {
  logo: string;
  organizationName: string;
  kycDocument: {
    logo: string;
  };
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

export interface InvoiceI {
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
  term: TermEnums;
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
  arrears: boolean;
  paymentCompleted: boolean;
  accountDetails: VirtualAccountDetailsI;
  invoice: InvoiceI;
  feeObject: FeeI;
  student: StudentI;
  classObject: SchoolSubclassI;
  orgObject: BusinessI;
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
  status: 'overdue' | 'part-payment' | 'pending';
  amount: number;
  actualAmount: number;
  totalReceived: number;
  amountToComplete: number;
  canPay?: boolean;
  variation: number;
  _id: string;
}

export interface QueryPaymentI {
  data: {
    payment: InvoiceI;
    student: StudentI;
    serverCurrentTime: number;
    walletBalanceAvailable: boolean;
    amountToPay: number;
    walletBalance: number;
    amountPaid: number;
    classObject: SchoolClassI;
  };
  status: string;
}

export interface MyTransactionsI {
  page: number;
  pages: number;
  paymentCounts: number;
  totalTransactionAmount: number;
  studentName: string;
  payments: InvoiceI[];
}
