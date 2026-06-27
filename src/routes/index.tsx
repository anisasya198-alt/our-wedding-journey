import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Mail } from "lucide-react";
import coverImg from "@/assets/wedding/cover.png";

const searchSchema = z.object({
  to: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "The Wedding of Adam & Kyzha" },
      { name: "description", content: "You are invited to our wedding celebration." },
    ],
  }),
  component: Cover,
});

function Cover() {
  const { to } = Route.useSearch();
  const navigate = useNavigate();

  const open = () => {
    navigate({ to: "/invitation", search: { to: to || "Tamu Undangan" } });
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-900">
      <div
        className="relative flex items-end justify-center overflow-hidden bg-cover bg-center bg-no-repeat shadow-2xl"
        style={{
          backgroundImage: `url(${coverImg})`,
          aspectRatio: "9 / 16",
          height: "min(100vh, 100dvh)",
          maxWidth: "100vw",
        }}
      >
        <div className="mb-12 flex flex-col items-center px-6 text-center">
          <button
            onClick={open}
            style={{ borderRadius: "5px", backgroundColor: "#6B4423" }}
            className="inline-flex items-center gap-3 px-8 py-3 text-sm font-medium uppercase tracking-widest text-white shadow-lg transition hover:scale-105 hover:brightness-110"
          >
            <Mail size={18} color="#ffffff" />
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
  );
}
