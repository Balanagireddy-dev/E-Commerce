export interface CheckoutFormValues {
  fullName: string;
  mobile: string;
  addressLine: string;
  landmark: string;
  pincode: string;
}

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormValues, string>>;

export function validateCheckoutForm(values: CheckoutFormValues): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (!values.fullName.trim()) errors.fullName = "Please enter your name";
  if (!/^[6-9]\d{9}$/.test(values.mobile.trim())) errors.mobile = "Enter a valid 10-digit mobile number";
  if (!values.addressLine.trim() || values.addressLine.trim().length < 10)
    errors.addressLine = "Please enter your full delivery address";
  if (!/^\d{6}$/.test(values.pincode.trim())) errors.pincode = "Enter a valid 6-digit pincode";

  return errors;
}
