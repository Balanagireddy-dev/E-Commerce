"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import type { Product, Category } from "@/types/product";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Upload } from "@/components/ui/icons";
import { slugify, generateId } from "@/lib/utils/id";
import { getProductImageSrc } from "@/lib/utils/image";

export interface ProductFormValues {
  name: string;
  categoryId: string;
  priceInRupees: string;
  discountPriceInRupees: string;
  unit: string;
  stock: string;
  description: string;
  image?: string;
}

function toFormValues(product?: Product): ProductFormValues {
  if (!product) {
    return { name: "", categoryId: "", priceInRupees: "", discountPriceInRupees: "", unit: "", stock: "", description: "", image: undefined };
  }
  return {
    name: product.name,
    categoryId: product.categoryId,
    priceInRupees: String(product.priceInPaise / 100),
    discountPriceInRupees: product.discountPriceInPaise ? String(product.discountPriceInPaise / 100) : "",
    unit: product.unit,
    stock: String(product.stock),
    description: product.description,
    image: product.images[0],
  };
}

export function ProductForm({
  product,
  categories,
  onCancel,
  onSubmit,
}: {
  product?: Product;
  categories: Category[];
  onCancel: () => void;
  onSubmit: (product: Product) => void;
}) {
  const [values, setValues] = useState<ProductFormValues>(toFormValues(product));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const category = categories.find((c) => c.id === values.categoryId);

  const setField = (field: keyof ProductFormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setValues((prev) => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const priceInPaise = Math.round(parseFloat(values.priceInRupees || "0") * 100);
    const discountPriceInPaise = values.discountPriceInRupees
      ? Math.round(parseFloat(values.discountPriceInRupees) * 100)
      : undefined;

    const result: Product = {
      id: product?.id ?? generateId("p"),
      slug: product?.slug ?? slugify(values.name),
      name: values.name,
      categoryId: values.categoryId,
      priceInPaise,
      discountPriceInPaise,
      unit: values.unit,
      images: values.image ? [values.image] : [],
      description: values.description,
      stock: parseInt(values.stock || "0", 10),
      isPopular: product?.isPopular,
      isBestSeller: product?.isBestSeller,
      isNew: product?.isNew,
      tags: product?.tags,
      rating: product?.rating,
      reviewCount: product?.reviewCount,
    };
    onSubmit(result);
  };

  const previewImage = values.image ?? getProductImageSrc([], category);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-alt">
          <Image src={previewImage} alt="Product preview" fill sizes="80px" className="object-cover" />
        </div>
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
            <Upload width={16} height={16} /> Upload Image
          </Button>
          <p className="mt-1 text-xs text-ink-muted">Falls back to category artwork if none uploaded.</p>
        </div>
      </div>

      <Input label="Product Name" value={values.name} onChange={setField("name")} required />

      <div>
        <label htmlFor="pf-category" className="mb-1.5 block text-sm font-medium text-ink-soft">
          Category
        </label>
        <select
          id="pf-category"
          value={values.categoryId}
          onChange={setField("categoryId")}
          required
          className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-base text-ink focus:border-brand-500"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="MRP (₹)" type="number" min="0" step="0.01" value={values.priceInRupees} onChange={setField("priceInRupees")} required />
        <Input label="Discount Price (₹, optional)" type="number" min="0" step="0.01" value={values.discountPriceInRupees} onChange={setField("discountPriceInRupees")} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Unit" placeholder="e.g. 500 g" value={values.unit} onChange={setField("unit")} required />
        <Input label="Stock Quantity" type="number" min="0" value={values.stock} onChange={setField("stock")} required />
      </div>

      <Textarea label="Description" value={values.description} onChange={setField("description")} required />

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" fullWidth onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" fullWidth>
          {product ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
