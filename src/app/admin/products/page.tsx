"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getAllProducts,
  getAllCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/lib/data/productService";
import type { Product, Category } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { ProductForm } from "@/components/admin/ProductForm";
import { Edit, Trash, Plus } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils/price";
import { getProductImageSrc } from "@/lib/utils/image";
import { useToast } from "@/context/ToastContext";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const { showToast } = useToast();

  const reload = () => {
    getAllProducts().then(setProducts);
  };

  useEffect(() => {
    reload();
    getAllCategories().then(setCategories);
  }, []);

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const handleSave = async (product: Product) => {
    if (editing) {
      await updateProduct(editing.id, product);
      showToast("Product updated");
    } else {
      await createProduct(product);
      showToast("Product added");
    }
    setFormOpen(false);
    setEditing(null);
    reload();
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    await deleteProduct(product.id);
    showToast("Product deleted", "info");
    reload();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Products</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setFormOpen(true);
          }}
        >
          <Plus width={18} height={18} /> Add Product
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="border-b border-border bg-surface-alt text-left text-xs uppercase text-ink-muted">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => {
              const category = categoryMap.get(product.categoryId);
              return (
                <tr key={product.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-surface-alt">
                        <Image src={getProductImageSrc(product.images, category)} alt={product.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <span className="font-medium text-ink">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{category?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {formatPrice(product.discountPriceInPaise ?? product.priceInPaise)}
                    {product.discountPriceInPaise ? (
                      <span className="ml-1 text-xs text-ink-muted line-through">{formatPrice(product.priceInPaise)}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    {product.stock <= 15 ? <Badge tone="warning">{product.stock} left</Badge> : <span className="text-ink-soft">{product.stock}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditing(product);
                          setFormOpen(true);
                        }}
                        aria-label={`Edit ${product.name}`}
                        className="rounded-md p-2 text-ink-soft hover:bg-surface-alt"
                      >
                        <Edit width={16} height={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        aria-label={`Delete ${product.name}`}
                        className="rounded-md p-2 text-danger hover:bg-danger/10"
                      >
                        <Trash width={16} height={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        title={editing ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          product={editing ?? undefined}
          categories={categories}
          onCancel={() => {
            setFormOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSave}
        />
      </Modal>
    </div>
  );
}
