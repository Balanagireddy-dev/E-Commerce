"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "@/components/ui/icons";
import { validateCheckoutForm, type CheckoutFormValues, type CheckoutFormErrors } from "@/lib/utils/validation";
import { clsx } from "@/lib/utils/clsx";
import type { PaymentMethod } from "@/types/order";

export function CheckoutForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: CheckoutFormValues, paymentMethod: PaymentMethod) => void;
  submitting?: boolean;
}) {
  const [values, setValues] = useState<CheckoutFormValues>({
    fullName: "",
    mobile: "",
    addressLine: "",
    landmark: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const setField = (field: keyof CheckoutFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCheckoutForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(values, paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <section className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4">
        <h2 className="font-semibold text-ink">Delivery Details</h2>
        <Input
          label="Full Name"
          placeholder="e.g. Ramesh Kumar"
          value={values.fullName}
          onChange={setField("fullName")}
          error={errors.fullName}
          autoComplete="name"
          required
        />
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="numeric"
          placeholder="10-digit mobile number"
          value={values.mobile}
          onChange={setField("mobile")}
          error={errors.mobile}
          autoComplete="tel"
          maxLength={10}
          required
        />
        <Textarea
          label="Delivery Address"
          placeholder="House no, street, area"
          value={values.addressLine}
          onChange={setField("addressLine")}
          error={errors.addressLine}
          autoComplete="street-address"
          required
        />
        <Input
          label="Landmark (optional)"
          placeholder="e.g. Near bus stand"
          value={values.landmark}
          onChange={setField("landmark")}
        />
        <Input
          label="Pincode"
          inputMode="numeric"
          placeholder="6-digit pincode"
          value={values.pincode}
          onChange={setField("pincode")}
          error={errors.pincode}
          maxLength={6}
          required
        />
      </section>

      <section className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4">
        <h2 className="font-semibold text-ink">Payment Method</h2>
        <PaymentOption
          label="Cash on Delivery"
          description="Pay with cash when your order arrives"
          selected={paymentMethod === "cod"}
          onSelect={() => setPaymentMethod("cod")}
        />
        <PaymentOption
          label="Online Payment"
          description="UPI / Card / Net Banking (coming soon)"
          selected={paymentMethod === "online"}
          onSelect={() => setPaymentMethod("online")}
        />
      </section>

      <Button type="submit" size="lg" fullWidth loading={submitting}>
        Place Order
      </Button>
    </form>
  );
}

function PaymentOption({
  label,
  description,
  selected,
  onSelect,
}: {
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
        selected ? "border-brand-600 bg-brand-50" : "border-border hover:bg-surface-alt"
      )}
    >
      <span
        className={clsx(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
          selected ? "border-brand-600 bg-brand-600 text-white" : "border-border"
        )}
      >
        {selected ? <CheckCircle width={14} height={14} /> : null}
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="block text-xs text-ink-muted">{description}</span>
      </span>
    </button>
  );
}
