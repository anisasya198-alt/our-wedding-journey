import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
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
  const guestName = to || "Tamu Undangan";

  // Auto navigate ke invitation setelah 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/invitation", search: { to: guestName } });
    }, 2500);
    return () => clearTimeout(timer);
  }, [guestName, navigate]);

  const handleClick = () => {
    navigate({ to: "/invitation", search: { to: guestName } });
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${coverImg})` }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      {/* Overlay untuk memastikan text readable */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex w-full flex-col items-center justify-center px-4 text-center sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* "Kepada Yth." */}
        <motion.p
          className="text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-lg sm:text-base md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Kepada Yth.
        </motion.p>

        {/* Nama Tamu */}
        <motion.p
          className="mt-4 text-2xl font-semibold tracking-wide text-white drop-shadow-lg sm:mt-6 sm:text-3xl md:mt-8 md:text-4xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {guestName}
        </motion.p>

        {/* Click to continue */}
        <motion.p
          className="mt-12 text-xs text-white/70 drop-shadow-lg sm:mt-16 sm:text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Klik untuk melanjutkan
        </motion.p>
      </motion.div>
    </div>
  );
}
