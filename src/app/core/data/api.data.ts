export const PaymentApi = {
  searchSchool: 'org/all-public',
  init: 'payment/init',
  getSchedule: 'payment/new-payment-schedule',
  signup: 'account/create',
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
