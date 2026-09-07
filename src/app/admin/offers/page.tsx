"use client";

import { useEffect, useState } from "react";
import { getAllOffers, getAllCategories, createOffer, deleteOffer } from "@/lib/data/productService";
import type { Offer, Category } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Trash, Plus, Tag } from "@/components/ui/icons";
import { generateId } from "@/lib/utils/id";
import { useToast } from "@/context/ToastContext";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercent, setDiscountPercent] = useState("10");
  const [categoryId, setCategoryId] = useState("");
  const [bannerEmoji, setBannerEmoji] = useState("🏷️");

  const reload = () => getAllOffers().then(setOffers);

  useEffect(() => {
    reload();
    getAllCategories().then(setCategories);
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDiscountPercent("10");
    setCategoryId("");
    setBannerEmoji("🏷️");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createOffer({
      id: generateId("off"),
      title,
      description,
      discountPercent: parseInt(discountPercent || "0", 10),
      categoryId: categoryId || undefined,
      bannerEmoji,
    });
    showToast("Offer created");
    resetForm();
    setFormOpen(false);
    reload();
  };

  const handleDelete = async (offer: Offer) => {
    if (!confirm(`Delete offer "${offer.title}"?`)) return;
    await deleteOffer(offer.id);
    showToast("Offer removed", "info");
    reload();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink sm:text-2xl">Offers</h1>
        <Button onClick={() => setFormOpen(true)}>
          <Plus width={18} height={18} /> New Offer
        </Button>
      </div>

      {offers.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface py-16 text-center text-ink-muted">
          <Tag width={32} height={32} />
          <p>No offers configured yet.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
              <span className="text-3xl" aria-hidden>
                {offer.bannerEmoji}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-ink">{offer.title}</p>
                <p className="text-sm text-ink-muted">{offer.description}</p>
                {offer.discountPercent > 0 ? <p className="mt-1 text-xs font-semibold text-accent">{offer.discountPercent}% OFF</p> : null}
              </div>
              <button
                onClick={() => handleDelete(offer)}
                aria-label={`Delete offer ${offer.title}`}
                className="rounded-md p-1.5 text-danger hover:bg-danger/10"
              >
                <Trash width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title="New Offer">
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <Input label="Offer Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Discount %" type="number" min="0" max="100" value={discountPercent} onChange={(e) => setDiscountPercent(e.target.value)} />
            <Input label="Emoji" value={bannerEmoji} onChange={(e) => setBannerEmoji(e.target.value)} />
          </div>
          <div>
            <label htmlFor="offer-category" className="mb-1.5 block text-sm font-medium text-ink-soft">
              Category (optional)
            </label>
            <select
              id="offer-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="h-12 w-full rounded-lg border border-border bg-surface px-4 text-base text-ink focus:border-brand-500"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" fullWidth onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Create Offer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
