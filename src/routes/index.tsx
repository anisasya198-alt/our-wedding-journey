import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import coverImg from "@/assets/wedding/cover.png";

const searchSchema = z.object({
  to: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "The Wedding of Adventure & Ultimate" },
      { name: "description", content: "You are invited to our wedding celebration." },
      { property: "og:title", content: "The Wedding of Adventure & Ultimate" },
      { property: "og:description", content: "You are invited to our wedding celebration." },
    ],
  }),
  component: Cover,
});

function Cover() {
  const { to } = Route.useSearch();
  const navigate = useNavigate();
  const [guest, setGuest] = useState(to ?? "");

  const open = () => {
    navigate({ to: "/invitation", search: { to: guest || "Tamu Undangan" } });
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-end justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${coverImg})` }}
    >
      <div className="mb-12 flex w-full max-w-sm flex-col items-center gap-4 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-white/90 drop-shadow">Kepada Yth.</p>
        <input
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          placeholder="Nama Tamu"
          className="w-full rounded-full border border-white/40 bg-white/20 px-5 py-2 text-center text-white placeholder:text-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          onClick={open}
          className="rounded-full bg-white/90 px-8 py-3 text-sm font-medium uppercase tracking-widest text-neutral-900 shadow-lg transition hover:scale-105 hover:bg-white"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  );
}
