import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useId } from "react";
import { clsx } from "@/lib/utils/clsx";

interface BaseFieldProps {
  label?: string;
  error?: string;
  hint?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseFieldProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className, required, ...props },
  ref
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={fieldId} className="text-sm font-medium text-ink-soft">
          {label}
          {required ? (
            <span className="ml-0.5 text-danger" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <input
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={!!error}
        aria-required={required}
        aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
        className={clsx(
          "h-12 w-full rounded-lg border bg-surface px-4 text-base text-ink placeholder:text-ink-muted",
          "transition-colors focus:border-brand-500",
          error ? "border-danger" : "border-border",
          className
        )}
        {...props}
      />
      {error ? (
        <span id={`${fieldId}-error`} className="text-sm text-danger">
          {error}
        </span>
      ) : hint ? (
        <span id={`${fieldId}-hint`} className="text-sm text-ink-muted">
          {hint}
        </span>
      ) : null}
    </div>
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseFieldProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, hint, id, className, required, ...props },
  ref
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={fieldId} className="text-sm font-medium text-ink-soft">
          {label}
          {required ? (
            <span className="ml-0.5 text-danger" aria-hidden>
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <textarea
        ref={ref}
        id={fieldId}
        required={required}
        aria-invalid={!!error}
        aria-required={required}
        className={clsx(
          "min-h-[96px] w-full rounded-lg border bg-surface px-4 py-3 text-base text-ink placeholder:text-ink-muted",
          "transition-colors focus:border-brand-500",
          error ? "border-danger" : "border-border",
          className
        )}
        {...props}
      />
      {error ? <span className="text-sm text-danger">{error}</span> : hint ? <span className="text-sm text-ink-muted">{hint}</span> : null}
    </div>
  );
});
