export const PaymentApi = {
  searchSchool: 'org/all-public',
  searchStudent: 'student/search',
  init: 'payment/init-new',
  myTransactions: 'payment/my-transaction',
  getSchedule: 'payment/new-payment-schedule',
  queryPayment: 'payment/payment-qr',
  adminUserList: 'account/admin',
  updateProfile: 'account/update-profile',
  changePassword: 'account/change-password',
  verifyPayer: 'student/getByRegNumber',
};

export const FeeApi = {
  feeListBySchool: 'fee/all-fees',
  feeListByRegNumber: 'fee/all-public',
  singleFeeById: 'fee/single-fee-public',
};
