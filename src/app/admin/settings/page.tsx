"use client";

import { useState } from "react";
import { getShopSettings, updateShopSettings } from "@/lib/data/settingsService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";

function paiseToRupees(paise: number): string {
  return String(paise / 100);
}

function rupeesToPaise(rupees: string): number {
  return Math.round(parseFloat(rupees || "0") * 100);
}

export default function AdminSettingsPage() {
  const initial = getShopSettings();
  const [deliveryCharge, setDeliveryCharge] = useState(paiseToRupees(initial.deliveryChargeInPaise));
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(paiseToRupees(initial.freeDeliveryThresholdInPaise));
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateShopSettings({
      deliveryChargeInPaise: rupeesToPaise(deliveryCharge),
      freeDeliveryThresholdInPaise: rupeesToPaise(freeDeliveryThreshold),
    });
    showToast("Settings saved");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-ink sm:text-2xl">Settings</h1>

      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4 rounded-lg border border-border bg-surface p-4">
        <h2 className="font-semibold text-ink">Delivery</h2>
        <Input
          label="Delivery Charge (₹)"
          type="number"
          min="0"
          step="0.01"
          value={deliveryCharge}
          onChange={(e) => setDeliveryCharge(e.target.value)}
          required
        />
        <Input
          label="Free Delivery Threshold (₹)"
          hint="Orders at or above this subtotal get free delivery. There is no minimum order amount."
          type="number"
          min="0"
          step="0.01"
          value={freeDeliveryThreshold}
          onChange={(e) => setFreeDeliveryThreshold(e.target.value)}
          required
        />
        <Button type="submit" className="mt-2">
          Save Settings
        </Button>
      </form>
    </div>
  );
}
