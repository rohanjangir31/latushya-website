import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Phone, CheckCircle, ChevronDown, X } from "lucide-react";
import { COMPANY } from "../data/content";

const PINK    = "#DF4C73";
const DARK    = "#03070E";
const CARD    = "#080f1a";
const DISPLAY = "'DM Serif Display', 'Cormorant Garamond', Georgia, serif";
const SANS    = "'Inter', system-ui, sans-serif";

function waLink(name, phone, service) {
  const msg = `Hello Latushya! I'm interested in ${service}.\nName: ${name}\nPhone: ${phone}`;
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function LeadForm({ compact = false }) {
  const [form, setForm]   = useState({ name: "", phone: "", service: "" });
  const [done, setDone]   = useState(false);
  const [error, setError] = useState("");

  const services = [
    "Custom Wardrobes",
    "Modular Kitchen",
    "Full Home Interiors",
    "Living Room Design",
    "Not sure yet — need advice",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.service) {
      setError("Please fill in all fields.");
      return;
    }
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", { send_to: "AW-663510360/2lJmCM7Co-EbENi6sbwC" });
    }
    window.open(waLink(form.name, form.phone, form.service), "_blank");
    setDone(true);
  };

  const inputBase = {
    fontFamily: SANS, fontSize: "13px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "10px", color: "#fff",
    padding: "12px 16px", width: "100%", outline: "none",
    transition: "border-color 0.25s", boxSizing: "border-box",
  };

  return (
    <div style={{
      background: "rgba(8,15,26,0.80)",
      backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: "20px", padding: compact ? "24px" : "36px",
      boxShadow: "0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
    }}>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{ fontFamily: DISPLAY, fontSize: compact ? "22px" : "26px", color: "#fff", lineHeight: 1.2, marginBottom: "6px" }}>
              Book a <em style={{ color: PINK, fontStyle: "italic" }}>consultation</em>
            </p>
            <p style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.45)", marginBottom: "22px" }}>
              Expert advice. No obligation. We come to you.
            </p>
            {error && <p style={{ fontFamily: SANS, fontSize: "12px", color: "#ff6b6b", marginBottom: "14px" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                style={inputBase} placeholder="Your name" value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setError(""); }}
                onFocus={e => (e.target.style.borderColor = PINK)}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
              <input
                style={inputBase} placeholder="Phone number" type="tel" value={form.phone}
                onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setError(""); }}
                onFocus={e => (e.target.style.borderColor = PINK)}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
              <div style={{ position: "relative" }}>
                <select
                  style={{ ...inputBase, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
                  value={form.service}
                  onChange={e => { setForm(f => ({ ...f, service: e.target.value })); setError(""); }}
                  onFocus={e => (e.target.style.borderColor = PINK)}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
                >
                  <option value="" disabled style={{ background: "#080f1a" }}>What do you need?</option>
                  {services.map(s => <option key={s} value={s} style={{ background: "#080f1a" }}>{s}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)", pointerEvents: "none" }} />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(223,76,115,0.45)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: "6px", height: "50px",
                  background: `linear-gradient(135deg, ${PINK} 0%, #F07595 100%)`,
                  color: "#fff", border: "none", borderRadius: "12px",
                  fontFamily: SANS, fontWeight: 700, fontSize: "13px",
                  letterSpacing: "0.04em", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Send on WhatsApp
              </motion.button>
              <p style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
                We usually reply within 30 minutes.
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <CheckCircle size={24} color="#25D366" />
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: "24px", color: "#fff", marginBottom: "8px" }}>Message sent!</p>
            <p style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>Check WhatsApp. We will get back to you shortly.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LPHeader() {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(3,7,14,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", height: "64px",
    }}>
      <img src="/logo-2d.png" alt="Latushya" style={{ height: "36px", objectFit: "contain" }} />
      <a href={`tel:${COMPANY.phone}`} id="lp-call-header" style={{
        display: "flex", alignItems: "center", gap: "8px",
        fontFamily: SANS, fontSize: "13px", fontWeight: 600, color: "#fff",
        background: `linear-gradient(135deg, ${PINK}, #c73d60)`,
        padding: "9px 18px", borderRadius: "999px", textDecoration: "none",
        boxShadow: "0 4px 14px rgba(223,76,115,0.3)",
      }}>
        <Phone size={14} /> Call Now
      </a>
    </header>
  );
}

function TrustPill({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.75)",
      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "999px", padding: "6px 14px",
    }}>
      <CheckCircle size={13} color={PINK} style={{ flexShrink: 0 }} />
      {children}
    </div>
  );
}

const GALLERY = [
  { src: "/projects/interior-geometric-wardrobe.jpg", alt: "Custom geometric wardrobe" },
  { src: "/projects/interior-mint-kitchen.jpg", alt: "Modular mint kitchen" },
  { src: "/projects/luxury-living-room.jpg", alt: "Luxury living room" },
  { src: "/projects/real-ftc-wardrobe.jpg", alt: "Floor-to-ceiling wardrobe" },
  { src: "/projects/interior-open-kitchen-living.jpg", alt: "Open kitchen and living" },
  { src: "/projects/interior-circular-ceiling.jpg", alt: "Premium ceiling design" },
];

const SERVICES_LIST = [
  {
    icon: "🚪", title: "Custom Wardrobes",
    items: ["Floor-to-ceiling (FTC)", "Sliding & hinged doors", "Loft storage", "Walk-in configurations"],
    image: "/projects/interior-geometric-wardrobe.jpg",
  },
  {
    icon: "🍳", title: "Modular Kitchens",
    items: ["L-shaped / U-shaped / Parallel", "Quartz & granite counters", "Soft-close shutters", "Full electrical planning"],
    image: "/projects/interior-mint-kitchen.jpg",
  },
  {
    icon: "🛋️", title: "Full Home Interiors",
    items: ["Turnkey execution", "Living & dining rooms", "TV units & wall panels", "Pooja rooms & study areas"],
    image: "/projects/luxury-living-room.jpg",
  },
];

const PROCESS = [
  { num: "01", title: "We visit your home", body: "We take accurate measurements and listen carefully to understand your requirements." },
  { num: "02", title: "You approve design & quote", body: "We share a 3D plan and final price. Nothing moves until you say yes." },
  { num: "03", title: "We install & hand over", body: "Our team installs everything on-site. You do a walkthrough before we leave." },
];

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function LandingPage() {
  const [galleryOpen, setGalleryOpen] = useState(null);

  const handleWA = (id) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", { send_to: "AW-663510360/2lJmCM7Co-EbENi6sbwC" });
    }
    window.open(
      `https://wa.me/${COMPANY.whatsapp}?text=Hello%20Latushya!%20I%20saw%20your%20ad%20and%20want%20to%20book%20a%20consultation.`,
      "_blank"
    );
  };

  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: SANS, overflowX: "hidden" }}>
      {/* Grain */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.025 }} />

      <LPHeader />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: "64px" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/projects/master_suite_hd.jpg" alt="" aria-hidden style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(3,7,14,0.96) 0%, rgba(3,7,14,0.75) 55%, rgba(3,7,14,0.40) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(3,7,14,1) 0%, transparent 45%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "60px 24px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
              <div style={{ width: "24px", height: "1px", background: PINK }} />
              <span style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Bangalore's custom interior studio</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: DISPLAY, fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px", fontWeight: 300 }}>
              Wardrobes & Interiors<br /><em style={{ color: PINK, fontStyle: "italic" }}>built for your home.</em>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontFamily: SANS, fontSize: "clamp(14px, 2vw, 16px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "480px", marginBottom: "32px" }}>
              Everything measured on-site, designed around your actual space, and installed by our own team. Custom wardrobes, modular kitchens, and full home interiors — done properly.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
              <TrustPill>Expert consultation</TrustPill>
              <TrustPill>Häfele & Hettich hardware</TrustPill>
              <TrustPill>500+ projects in Bangalore</TrustPill>
              <TrustPill>No middlemen</TrustPill>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={() => handleWA("hero")} id="lp-hero-wa" style={{ display: "flex", alignItems: "center", gap: "8px", background: "#25D366", color: "#fff", border: "none", borderRadius: "999px", padding: "14px 28px", fontFamily: SANS, fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 20px rgba(37,211,102,0.35)" }}>
                {WA_SVG} WhatsApp Us
              </button>
              <a href={`tel:${COMPANY.phone}`} id="lp-hero-call" style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.07)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "999px", padding: "14px 28px", fontFamily: SANS, fontWeight: 600, fontSize: "13px", cursor: "pointer", textDecoration: "none" }}>
                <Phone size={15} /> {COMPANY.phone}
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            <LeadForm />
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: "80px 24px", background: CARD, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(223,76,115,0.3), transparent)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(223,76,115,0.7)", marginBottom: "12px" }}>What we do</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em" }}>
                Everything for your home, <em style={{ color: PINK, fontStyle: "italic" }}>done right.</em>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {SERVICES_LIST.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", overflow: "hidden" }}>
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img src={svc.image} alt={svc.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", display: "block" }} onMouseEnter={e => (e.target.style.transform = "scale(1.05)")} onMouseLeave={e => (e.target.style.transform = "scale(1)")} />
                  </div>
                  <div style={{ padding: "24px" }}>
                    <div style={{ fontSize: "24px", marginBottom: "10px" }}>{svc.icon}</div>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: "22px", color: "#fff", fontWeight: 300, marginBottom: "14px" }}>{svc.title}</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {svc.items.map(item => (
                        <li key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: PINK, flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ padding: "80px 24px", background: DARK }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(223,76,115,0.7)", marginBottom: "12px" }}>Our work</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em" }}>Real projects. Real homes.</h2>
              <p style={{ fontFamily: SANS, fontSize: "14px", color: "rgba(255,255,255,0.45)", marginTop: "10px" }}>Every photo below was taken after installation in a Bangalore home.</p>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {GALLERY.map((img, i) => (
              <FadeUp key={img.src} delay={i * 0.07}>
                <div onClick={() => setGalleryOpen(img)} style={{ borderRadius: "12px", overflow: "hidden", cursor: "pointer", aspectRatio: "4/3", position: "relative" }}>
                  <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }} onMouseEnter={e => (e.target.style.transform = "scale(1.06)")} onMouseLeave={e => (e.target.style.transform = "scale(1)")} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)", pointerEvents: "none" }} />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setGalleryOpen(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <button onClick={() => setGalleryOpen(null)} style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "40px", height: "40px", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <X size={18} />
            </button>
            <motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={galleryOpen.src} alt={galleryOpen.alt} onClick={e => e.stopPropagation()} style={{ maxWidth: "100%", maxHeight: "90vh", borderRadius: "12px", objectFit: "contain" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px", background: CARD, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(90,185,234,0.25), transparent)" }} />
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(223,76,115,0.7)", marginBottom: "12px" }}>How we work</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em" }}>Three steps, no stress.</h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
            {PROCESS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div style={{ textAlign: "center", padding: "0 16px" }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: "52px", color: "rgba(223,76,115,0.15)", fontWeight: 700, lineHeight: 1, marginBottom: "16px" }}>{step.num}</div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "22px", color: "#fff", fontWeight: 300, marginBottom: "10px" }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: "relative", padding: "90px 24px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/projects/interior-living-teal.jpg" alt="" aria-hidden style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(3,7,14,0.82)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(223,76,115,0.8)", marginBottom: "16px" }}>Book your consultation</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "18px" }}>
              Ready when <em style={{ color: PINK, fontStyle: "italic" }}>you are.</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "40px" }}>
              Most consultations are booked within 24 hours. We will come to your home, take measurements, and provide a proper design and quote.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => handleWA("final")} id="lp-final-wa" style={{ display: "flex", alignItems: "center", gap: "10px", background: "#25D366", color: "#fff", border: "none", borderRadius: "999px", padding: "16px 36px", fontFamily: SANS, fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
                {WA_SVG} WhatsApp Us Now
              </button>
              <a href={`tel:${COMPANY.phone}`} id="lp-final-call" style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "16px 36px", fontFamily: SANS, fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                <Phone size={17} /> {COMPANY.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── MINIMAL FOOTER ── */}
      <footer style={{ background: "#020508", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "28px 24px", textAlign: "center" }}>
        <img src="/logo-2d.png" alt="Latushya" style={{ height: "28px", objectFit: "contain", marginBottom: "12px", opacity: 0.7 }} />
        <p style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>{COMPANY.address}</p>
        <p style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} LATUSHYA · GST: 29COPPP3833M1Z2</p>
      </footer>

      {/* ── MOBILE STICKY BAR ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90, display: "grid", gridTemplateColumns: "1fr 1fr", background: "rgba(3,7,14,0.97)", borderTop: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }} className="lg:hidden">
        <a href={`tel:${COMPANY.phone}`} id="lp-mobile-call" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px", fontFamily: SANS, fontSize: "13px", fontWeight: 600, color: "#fff", textDecoration: "none", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
          <Phone size={16} /> Call Now
        </a>
        <button onClick={() => handleWA("mobile")} id="lp-mobile-wa" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "16px", fontFamily: SANS, fontSize: "13px", fontWeight: 700, color: "#fff", border: "none", cursor: "pointer", background: "linear-gradient(135deg, #25D366, #1da851)" }}>
          {WA_SVG} WhatsApp
        </button>
      </div>
    </div>
  );
}
