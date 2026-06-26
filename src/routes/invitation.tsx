import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Instagram, Play, Pause } from "lucide-react";

import bg1 from "@/assets/wedding/bg_section_1.png";
import bg2 from "@/assets/wedding/bg_section_2.png";
import bg3 from "@/assets/wedding/bg_section_3.png";
import bg4 from "@/assets/wedding/bg_section_4.png";
import bg5 from "@/assets/wedding/bg_section_5.png";
import bg6 from "@/assets/wedding/bg_section_6.png";
import bg7 from "@/assets/wedding/bg_section_7.png";
import bg8 from "@/assets/wedding/bg_section_8.png";
import isi1 from "@/assets/wedding/isi_section_satu.png";
import isi2Atas from "@/assets/wedding/isi_section_2__atas.svg";
import isi2Bawah from "@/assets/wedding/isi_section_2__bawah.svg";
import isi3Asset from "@/assets/wedding/isi_section_3.svg.asset.json";
import isi8 from "@/assets/wedding/isi_section_8.png";

const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";

export const Route = createFileRoute("/invitation")({
  validateSearch: z.object({ to: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Undangan — Adventure & Ultimate" },
      { name: "description", content: "Wedding invitation of Adventure & Ultimate." },
    ],
  }),
  component: Invitation,
});

const rise = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
};

function Section({
  bg,
  children,
  contentClassName = "",
}: {
  bg: string;
  children?: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <section className="relative w-full">
      <img src={bg} alt="" className="block h-auto w-full select-none" draggable={false} />
      {children && (
        <div className={`absolute inset-0 flex w-full ${contentClassName}`}>{children}</div>
      )}
    </section>
  );
}

function Countdown() {
  const target = new Date("2026-07-26T10:00:00").getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  const items = [
    { v: d, l: "Hari" },
    { v: h, l: "Jam" },
    { v: m, l: "Menit" },
    { v: s, l: "Detik" },
  ];
  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {items.map((i) => (
        <div
          key={i.l}
          className="flex h-20 w-16 flex-col items-center justify-center rounded-xl bg-white/70 text-neutral-800 shadow-lg backdrop-blur sm:h-24 sm:w-20"
        >
          <span className="text-2xl font-semibold sm:text-3xl" suppressHydrationWarning>
            {now === null ? "--" : String(i.v).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest">{i.l}</span>
        </div>
      ))}
    </div>
  );
}

function Gallery() {
  const photos = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=900",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=900",
    "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?w=900",
    "https://images.unsplash.com/photo-1606490194859-07c18c9f0968?w=900",
    "https://images.unsplash.com/photo-1537907510278-10acdb198d0f?w=900",
  ];
  const [active, setActive] = useState<string | null>(null);
  return (
    <>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-6 sm:grid-cols-3 sm:gap-4">
        {photos.map((src, i) => (
          <motion.button
            key={src}
            type="button"
            onClick={() => setActive(src)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ scale: 1.04 }}
            className={`overflow-hidden rounded-xl shadow-lg ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            style={{ aspectRatio: "3 / 4" }}
          >
            <img src={src} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
          </motion.button>
        ))}
      </div>
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <img src={active} alt="" className="max-h-full max-w-full rounded-xl" />
        </div>
      )}
    </>
  );
}

function Invitation() {
  const { to } = Route.useSearch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.5;
    const tryPlay = () => {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };
    tryPlay();
    const onInteract = () => {
      if (a.paused) tryPlay();
      window.removeEventListener("click", onInteract);
    };
    window.addEventListener("click", onInteract);
    return () => window.removeEventListener("click", onInteract);
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative w-full overflow-x-hidden">
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label="Toggle music"
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-xl backdrop-blur transition hover:scale-110"
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* SECTION 1 */}
      <Section bg={bg1} contentClassName="flex flex-col items-center justify-center py-20">
        <motion.img
          src="https://cdn.gpteng.co/blank-app-v1.svg"
          alt="You're invited"
          {...rise}
          className="h-16 w-auto opacity-0"
        />
        <motion.div {...rise} className="mt-8 w-full max-w-md px-6">
          <img src={isi1} alt="Section 1" className="w-full" />
        </motion.div>
        {to && (
          <motion.p {...rise} className="mt-6 text-center text-sm tracking-widest text-neutral-700">
            Kepada Yth. <span className="font-semibold">{to}</span>
          </motion.p>
        )}
      </Section>

      {/* SECTION 2 */}
      <Section bg={bg2} contentClassName="flex flex-col items-center justify-center gap-10 py-24">
        <motion.div {...rise} className="text-center">
          <h2 className="font-serif text-4xl text-neutral-800 sm:text-5xl">The Bride &amp; Groom</h2>
          <p className="mt-3 text-lg italic text-neutral-700">Adventure Ultimate</p>
        </motion.div>

        <div className="flex w-full max-w-2xl flex-col items-center gap-8 px-6">
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex w-full flex-col items-center"
          >
            <img src={isi2Atas} alt="Bride" className="w-full" />
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
            >
              <Instagram size={16} /> @bride_ig
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
            className="flex w-full flex-col items-center"
          >
            <img src={isi2Bawah} alt="Groom" className="w-full" />
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-900"
            >
              <Instagram size={16} /> @groom_ig
            </a>
          </motion.div>
        </div>
      </Section>

      {/* SECTION 3 */}
      <Section bg={bg3} contentClassName="flex flex-col items-center justify-start gap-10 py-20">
        <motion.div {...rise} className="w-full px-6">
          <Countdown />
        </motion.div>
        <motion.div {...rise} className="w-full max-w-3xl px-6">
          <img src={isi3Asset.url} alt="Section 3" className="w-full" />
        </motion.div>
      </Section>

      {/* SECTION 4 */}
      <motion.img {...rise} src={bg4} alt="" className="block h-auto w-full select-none" draggable={false} />


      {/* SECTION 5 — gallery */}
      <Section bg={bg5} contentClassName="flex flex-col items-center justify-center gap-8 py-20">
        <motion.h2 {...rise} className="font-serif text-3xl text-neutral-800 sm:text-4xl">
          Wedding Gallery
        </motion.h2>
        <Gallery />
      </Section>

      {/* SECTION 6 */}
      <motion.img {...rise} src={bg6} alt="" className="block h-auto w-full select-none" draggable={false} />


      {/* SECTION 7 — RSVP Canva */}
      <Section bg={bg7} contentClassName="flex flex-col items-center justify-center gap-6 py-20">
        <motion.h2 {...rise} className="font-serif text-3xl text-neutral-800 sm:text-4xl">
          RSVP
        </motion.h2>
        <motion.div
          {...rise}
          className="w-full max-w-3xl overflow-hidden rounded-xl px-4 shadow-2xl"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingTop: "141.4286%",
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: "none",
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGabcDEFGH/view?embed"
              allow="fullscreen"
              title="RSVP Canva"
            />
          </div>
        </motion.div>
      </Section>

      {/* SECTION 8 */}
      <Section bg={bg8} contentClassName="flex flex-col items-center justify-start py-20">
        <motion.div {...rise} className="w-full max-w-2xl px-6">
          <div className="max-h-[70vh] overflow-y-auto rounded-xl bg-white/40 p-4 backdrop-blur">
            <img src={isi8} alt="Section 8" className="w-full" />
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
