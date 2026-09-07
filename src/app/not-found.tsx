import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
      <span className="text-5xl" aria-hidden>
        🛒
      </span>
      <h1 className="text-xl font-bold text-ink dark:text-ink-dark">Page not found</h1>
      <p className="text-sm text-ink-muted dark:text-ink-muted-dark">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/">
        <Button size="lg">Go to Homepage</Button>
      </Link>
    </div>
  );
}
