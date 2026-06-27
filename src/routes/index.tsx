import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      open();
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-end justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${coverImg})` }}
    >
      <motion.div
        className="mb-8 flex w-full max-w-sm flex-col items-center gap-4 px-4 text-center sm:mb-12 sm:px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/90 drop-shadow sm:text-sm">
          Kepada Yth.
        </p>
        {guest && (
          <motion.p
            className="text-sm font-semibold tracking-wide text-white drop-shadow sm:text-base"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {guest}
          </motion.p>
        )}
        <input
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nama Tamu"
          className="w-full rounded-full border border-white/40 bg-white/20 px-4 py-2 text-center text-xs text-white placeholder:text-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/50 sm:px-5 sm:py-3 sm:text-sm"
        />
        <button
          onClick={open}
          className="mt-2 rounded-full bg-white/90 px-6 py-2 text-xs font-medium uppercase tracking-widest text-neutral-900 shadow-lg transition hover:scale-105 hover:bg-white active:scale-95 sm:mt-4 sm:px-8 sm:py-3 sm:text-sm"
        >
          Buka Undangan
        </button>
      </motion.div>
    </div>
  );
}
