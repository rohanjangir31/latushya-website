import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Phone, CheckCircle, X, Sparkles, ShieldCheck, MapPin, ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import { COMPANY } from "../data/content";
import { trackWhatsAppConversion, trackFormLead } from "../utils/analytics";
import { submitLeadConsultation } from "../utils/formSubmit";
import SEO from "../components/SEO";

const PINK    = "#DF4C73";
const DARK    = "#03070E";
const CARD    = "#080f1a";
const DISPLAY = "'DM Serif Display', 'Cormorant Garamond', Georgia, serif";
const SANS    = "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

function waLink(name, phone, service, location) {
  let msg = `Hello Latushya! I would like a Free 3D Design & Quote for ${service || "Custom Wardrobes"}.\nName: ${name}\nPhone: ${phone}`;
  if (location && location.trim()) {
    msg += `\nBangalore Locality: ${location.trim()}`;
  }
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
  const [form, setForm]               = useState({ name: "", phone: "", location: "", service: "Custom Wardrobes" });
  const [done, setDone]               = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef               = useRef(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError]             = useState("");
  const nameInputRef                  = useRef(null);

  const services = [
    "Custom Wardrobes",
    "Modular Kitchen",
    "Full Home Interiors",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    const res = await submitLeadConsultation({
      form,
      isSubmittingRef,
      trackLeadFn: trackFormLead
    });

    setIsSubmitting(false);

    if (!res.success) {
      if (res.reason === "VALIDATION_FAILED") {
        setError(res.error || "Please enter your name and phone number.");
      } else if (res.reason !== "BLOCKED") {
        setError("Unable to submit consultation request right now. Please try again or reach out on WhatsApp.");
      }
      return;
    }

    setSubmittedData(res.data);
    setDone(true);
  };

  const inputBase = {
    fontFamily: SANS, fontSize: "16px", // 16px strictly prevents iOS Safari auto-zoom
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "12px", color: "#fff",
    padding: "14px 16px", width: "100%", outline: "none",
    minHeight: "48px", // Ensures accessible touch target
    transition: "border-color 0.25s, background-color 0.25s", boxSizing: "border-box",
  };

  return (
    <div
      id="enquiry-form"
      style={{
        background: "rgba(8,15,26,0.85)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "24px", padding: compact ? "24px" : "32px",
        boxShadow: "0 32px 64px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.1)",
        scrollMarginTop: "90px",
      }}
    >
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "rgba(223,76,115,0.15)", border: "1px solid rgba(223,76,115,0.3)", borderRadius: "999px", padding: "4px 10px", fontSize: "11px", fontWeight: 600, color: PINK, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <Sparkles size={12} /> Free Site Consultation
              </span>
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: compact ? "22px" : "28px", color: "#fff", lineHeight: 1.2, marginBottom: "6px" }}>
              Get Free 3D Design & <em style={{ color: PINK, fontStyle: "italic" }}>Quote</em>
            </p>
            <p style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.55)", marginBottom: "20px", lineHeight: 1.5 }}>
              On-site measurements across Bangalore. Precision layout. No obligation.
            </p>

            {error && (
              <div style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.3)", borderRadius: "8px", padding: "8px 12px", marginBottom: "14px" }}>
                <p style={{ fontFamily: SANS, fontSize: "12px", color: "#ff6b6b", margin: 0 }}>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Service Selection Chips */}
              <div>
                <label style={{ display: "block", fontFamily: SANS, fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>
                  Select Service
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "6px" }}>
                  {services.map(svc => {
                    const isSelected = form.service === svc;
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => { setForm(f => ({ ...f, service: svc })); setError(""); }}
                        style={{
                          padding: "10px 4px",
                          borderRadius: "10px",
                          border: isSelected ? `1px solid ${PINK}` : "1px solid rgba(255,255,255,0.1)",
                          background: isSelected ? "rgba(223,76,115,0.2)" : "rgba(255,255,255,0.04)",
                          color: isSelected ? "#fff" : "rgba(255,255,255,0.6)",
                          fontFamily: SANS,
                          fontSize: "11px",
                          fontWeight: isSelected ? 600 : 400,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          textAlign: "center",
                          lineHeight: 1.2,
                        }}
                      >
                        {svc === "Custom Wardrobes" ? "Wardrobes" : svc === "Modular Kitchen" ? "Kitchen" : "Full Home"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name */}
              <div>
                <input
                  ref={nameInputRef}
                  style={inputBase}
                  placeholder="Your Name *"
                  autoComplete="name"
                  value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setError(""); }}
                  onFocus={e => (e.target.style.borderColor = PINK)}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  style={inputBase}
                  placeholder="WhatsApp / Phone Number *"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setError(""); }}
                  onFocus={e => (e.target.style.borderColor = PINK)}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
                />
              </div>

              {/* Bangalore Locality */}
              <div>
                <div style={{ position: "relative" }}>
                  <input
                    style={{ ...inputBase, paddingLeft: "38px" }}
                    placeholder="Bangalore Locality (e.g. Indiranagar, Whitefield)"
                    value={form.location}
                    onChange={e => { setForm(f => ({ ...f, location: e.target.value })); setError(""); }}
                    onFocus={e => (e.target.style.borderColor = PINK)}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.14)")}
                  />
                  <MapPin size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.4)" }} />
                </div>
              </div>

              <motion.button
                type="submit"
                id="lp-form-submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.01, boxShadow: "0 8px 30px rgba(223,76,115,0.45)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                style={{
                  marginTop: "8px", minHeight: "52px",
                  background: `linear-gradient(135deg, ${PINK} 0%, #F07595 100%)`,
                  color: "#fff", border: "none", borderRadius: "14px",
                  fontFamily: SANS, fontWeight: 700, fontSize: "14px",
                  letterSpacing: "0.02em",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.75 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  boxShadow: "0 4px 18px rgba(223,76,115,0.35)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Get Free 3D Design & Quote</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </motion.button>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "4px" }}>
                <ShieldCheck size={13} color="#25D366" />
                <span style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>
                  Zero spam · Prompt consultation on WhatsApp & phone
                </span>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "28px 12px" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <CheckCircle size={28} color="#25D366" />
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: "26px", color: "#fff", marginBottom: "8px" }}>Consultation Requested!</p>
            <p style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "20px" }}>
              Thank you{submittedData?.name ? `, ${submittedData.name}` : ""}. Your consultation details have been received. Our team will review your requirements and contact you to discuss next steps.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
              <button
                type="button"
                onClick={() => {
                  trackWhatsAppConversion();
                  const target = submittedData || form;
                  window.open(waLink(target.name, target.phone, target.service, target.location), "_blank");
                }}
                style={{
                  width: "100%",
                  minHeight: "48px",
                  background: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  fontFamily: SANS,
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(37,211,102,0.35)",
                }}
              >
                <MessageCircle size={18} />
                <span>Chat with Designer on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setDone(false);
                  setForm({ name: "", phone: "", location: "", service: "Custom Wardrobes" });
                  setSubmittedData(null);
                }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: SANS,
                  fontSize: "12px",
                  cursor: "pointer",
                  marginTop: "6px",
                }}
              >
                Submit Another Inquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LPHeader({ onQuoteClick }) {
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(3,7,14,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", height: "64px",
    }}>
      <img src="/logo-2d.png" alt="Latushya" style={{ height: "34px", objectFit: "contain" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={onQuoteClick}
          id="lp-header-quote"
          style={{
            display: "none",
            alignItems: "center", gap: "6px",
            fontFamily: SANS, fontSize: "12px", fontWeight: 600, color: "#fff",
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)",
            padding: "8px 14px", borderRadius: "999px", cursor: "pointer",
          }}
          className="sm:flex"
        >
          <Sparkles size={13} color={PINK} /> Free 3D Quote
        </button>
        <a href={`tel:${COMPANY.phone}`} id="lp-call-header" style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: SANS, fontSize: "12px", fontWeight: 600, color: "#fff",
          background: `linear-gradient(135deg, ${PINK}, #c73d60)`,
          padding: "8px 16px", borderRadius: "999px", textDecoration: "none",
          boxShadow: "0 4px 14px rgba(223,76,115,0.3)", minHeight: "36px",
        }}>
          <Phone size={13} /> Call Now
        </a>
      </div>
    </header>
  );
}

function TrustPill({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "8px",
      fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.85)",
      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "999px", padding: "7px 14px",
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
    icon: "🚪", title: "Custom Sliding Wardrobes",
    items: ["Floor-to-ceiling (FTC) fitment", "German Häfele & Hettich sliding gear", "Lacquered glass, mirror & acrylic shutters", "Custom loft and walk-in organizers"],
    image: "/projects/interior-geometric-wardrobe.jpg",
  },
  {
    icon: "🍳", title: "Modular Kitchens",
    items: ["L-shaped / U-shaped / Island layouts", "Quartz, granite & acrylic countertops", "Soft-close tandem drawers & lift-ups", "BWP grade Century Ply core"],
    image: "/projects/interior-mint-kitchen.jpg",
  },
  {
    icon: "🛋️", title: "Turnkey Home Interiors",
    items: ["End-to-end execution across Bangalore", "TV units, wall panelling & fluted finishes", "Pooja units & custom study setups", "Dedicated project supervisor on-site"],
    image: "/projects/luxury-living-room.jpg",
  },
];

const PROCESS = [
  { num: "01", title: "On-Site Measurement", body: "We visit your home in Bangalore, measure your exact room dimensions, and discuss your storage needs." },
  { num: "02", title: "3D Design & Fixed Quote", body: "We present a photorealistic 3D layout with transparent pricing. Nothing proceeds until you approve." },
  { num: "03", title: "Precision On-Site Fitment", body: "Our own skilled carpentry team installs everything with German fittings and hands over a spotless space." },
];

const BRAND_PARTNERS = [
  "Häfele German Hardware",
  "Hettich Motion Systems",
  "Century Ply BWP Core",
  "Saint-Gobain Glass",
  "Greenply Substrates",
];

const WA_SVG = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function LandingPage() {
  const [galleryOpen, setGalleryOpen] = useState(null);

  const scrollToForm = () => {
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const firstInput = el.querySelector("input");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 400);
      }
    }
  };

  const handleWA = () => {
    trackWhatsAppConversion();
    const text = encodeURIComponent(`Hello Latushya! I saw your bespoke wardrobe ad and would like to book a free 3D design consultation.`);
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: SANS, overflowX: "hidden", paddingBottom: "92px" }}>
      <SEO
        title="Custom Wardrobes & Luxury Turnkey Interiors Bangalore | Latushya"
        description="Floor-to-ceiling custom sliding wardrobes and luxury turnkey home interiors in Bangalore. Free 3D design and quotation."
        noindex={true}
      />
      {/* Grain texture */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.025 }} />

      <LPHeader onQuoteClick={scrollToForm} />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: "64px" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="/projects/master_suite_hd.jpg" alt="" aria-hidden style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "70% center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(3,7,14,0.97) 0%, rgba(3,7,14,0.80) 55%, rgba(3,7,14,0.45) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(3,7,14,1) 0%, transparent 40%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "48px 20px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", background: PINK }} />
              <span style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                Bangalore's Custom Wardrobe Studio
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: DISPLAY, fontSize: "clamp(2.3rem, 5.2vw, 4rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "18px", fontWeight: 300 }}>
              Custom Sliding Wardrobes<br /><em style={{ color: PINK, fontStyle: "italic" }}>built for your actual space.</em>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ fontFamily: SANS, fontSize: "clamp(14px, 1.8vw, 16px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "26px" }}>
              Floor-to-ceiling fitment measured on-site in Bangalore. Engineered with German Häfele & Hettich fittings, Century Ply, and Saint-Gobain glass. Installed by our direct team with zero middlemen.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              <TrustPill>500+ Bangalore Projects Done</TrustPill>
              <TrustPill>German Häfele & Hettich</TrustPill>
              <TrustPill>Free On-Site 3D Design</TrustPill>
              <TrustPill>Direct Team · No Middlemen</TrustPill>
            </motion.div>

            {/* Mobile Hero Actions */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                onClick={scrollToForm}
                id="lp-hero-quote-btn"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: `linear-gradient(135deg, ${PINK} 0%, #F07595 100%)`,
                  color: "#fff", border: "none", borderRadius: "999px",
                  padding: "15px 28px", fontFamily: SANS, fontWeight: 700, fontSize: "14px",
                  cursor: "pointer", boxShadow: "0 6px 24px rgba(223,76,115,0.45)",
                }}
              >
                <span>Get Free 3D Design & Quote</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => handleWA("hero")}
                id="lp-hero-wa"
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "rgba(37,211,102,0.15)", color: "#25D366",
                  border: "1px solid rgba(37,211,102,0.35)", borderRadius: "999px",
                  padding: "14px 22px", fontFamily: SANS, fontWeight: 600, fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {WA_SVG} WhatsApp
              </button>
            </motion.div>
          </div>

          {/* Form Column */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            <LeadForm />
          </motion.div>
        </div>
      </section>

      {/* ── BRAND PARTNERS STRIP ── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(8,15,26,0.6)", padding: "20px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <span style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
            Verified Hardware & Core Materials:
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            {BRAND_PARTNERS.map(brand => (
              <span key={brand} style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle size={12} color={PINK} /> {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: "80px 24px", background: CARD, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(223,76,115,0.3), transparent)" }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: PINK, marginBottom: "12px", fontWeight: 600 }}>What we craft</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em" }}>
                Engineered for your bedroom, <em style={{ color: PINK, fontStyle: "italic" }}>installed to fit.</em>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {SERVICES_LIST.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img src={svc.image} alt={svc.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", display: "block" }} onMouseEnter={e => (e.target.style.transform = "scale(1.05)")} onMouseLeave={e => (e.target.style.transform = "scale(1)")} />
                  </div>
                  <div style={{ padding: "24px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "24px", marginBottom: "10px" }}>{svc.icon}</div>
                    <h3 style={{ fontFamily: DISPLAY, fontSize: "22px", color: "#fff", fontWeight: 300, marginBottom: "14px" }}>{svc.title}</h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
                      {svc.items.map(item => (
                        <li key={item} style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: PINK, flexShrink: 0 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={scrollToForm}
                      style={{
                        background: "rgba(223,76,115,0.12)", border: "1px solid rgba(223,76,115,0.3)",
                        borderRadius: "10px", padding: "10px 16px", color: "#fff",
                        fontFamily: SANS, fontSize: "12px", fontWeight: 600, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      }}
                    >
                      <span>Enquire About {svc.title.split(" ")[1]}</span>
                      <ArrowRight size={13} color={PINK} />
                    </button>
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
              <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: PINK, marginBottom: "12px", fontWeight: 600 }}>Real installations</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em" }}>Actual Bangalore Homes.</h2>
              <p style={{ fontFamily: SANS, fontSize: "14px", color: "rgba(255,255,255,0.5)", marginTop: "10px" }}>Captured after completion on-site across Bangalore.</p>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {GALLERY.map((img, i) => (
              <FadeUp key={img.src} delay={i * 0.07}>
                <div onClick={() => setGalleryOpen(img)} style={{ borderRadius: "12px", overflow: "hidden", cursor: "pointer", aspectRatio: "4/3", position: "relative" }}>
                  <img src={img.src} alt={img.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }} onMouseEnter={e => (e.target.style.transform = "scale(1.06)")} onMouseLeave={e => (e.target.style.transform = "scale(1)")} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)", pointerEvents: "none" }} />
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
              <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: PINK, marginBottom: "12px", fontWeight: 600 }}>The consultation process</p>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em" }}>Three steps to your custom wardrobe.</h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
            {PROCESS.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div style={{ textAlign: "center", padding: "0 16px" }}>
                  <div style={{ fontFamily: DISPLAY, fontSize: "52px", color: "rgba(223,76,115,0.25)", fontWeight: 700, lineHeight: 1, marginBottom: "16px" }}>{step.num}</div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: "22px", color: "#fff", fontWeight: 300, marginBottom: "10px" }}>{step.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>{step.body}</p>
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
          <div style={{ position: "absolute", inset: 0, background: "rgba(3,7,14,0.85)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <FadeUp>
            <p style={{ fontFamily: SANS, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: PINK, marginBottom: "16px", fontWeight: 600 }}>Start your project</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "18px" }}>
              Ready for a proper <em style={{ color: PINK, fontStyle: "italic" }}>3D design?</em>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "15px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "36px" }}>
              Consultations scheduled within 24 hours. We measure on-site in Bangalore and build a layout around your storage requirements.
            </p>
            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={scrollToForm}
                id="lp-final-quote"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: `linear-gradient(135deg, ${PINK} 0%, #F07595 100%)`,
                  color: "#fff", border: "none", borderRadius: "999px",
                  padding: "16px 36px", fontFamily: SANS, fontWeight: 700, fontSize: "14px",
                  cursor: "pointer", boxShadow: "0 6px 24px rgba(223,76,115,0.45)",
                }}
              >
                <span>Book Free 3D Consultation</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => handleWA("final")}
                id="lp-final-wa"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(37,211,102,0.15)", color: "#25D366",
                  border: "1px solid rgba(37,211,102,0.35)", borderRadius: "999px",
                  padding: "16px 32px", fontFamily: SANS, fontWeight: 700, fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {WA_SVG} WhatsApp Us
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── MINIMAL FOOTER ── */}
      <footer style={{ background: "#020508", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px", textAlign: "center" }}>
        <img src="/logo-2d.png" alt="Latushya" style={{ height: "28px", objectFit: "contain", marginBottom: "12px", opacity: 0.8 }} />
        <p style={{ fontFamily: SANS, fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>{COMPANY.address}</p>
        <p style={{ fontFamily: SANS, fontSize: "11px", color: "rgba(255,255,255,0.25)" }}>© {new Date().getFullYear()} LATUSHYA · GST: 29COPPP3833M1Z2 · Kasturi Nagar, Bengaluru</p>
      </footer>

      {/* ── MOBILE STICKY BOTTOM BAR (Optimized for Primary Form Conversion) ── */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 90,
          display: "flex", alignItems: "center", gap: "10px",
          padding: "12px 16px",
          paddingBottom: "max(14px, env(safe-area-inset-bottom))",
          background: "rgba(3,7,14,0.96)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
        }}
      >
        {/* Primary CTA: Free 3D Design & Quote */}
        <button
          onClick={scrollToForm}
          id="lp-mobile-sticky-quote"
          style={{
            flex: "1 1 auto",
            minHeight: "48px",
            background: `linear-gradient(135deg, ${PINK} 0%, #F07595 100%)`,
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontFamily: SANS,
            fontSize: "13px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(223,76,115,0.4)",
          }}
        >
          <Sparkles size={15} />
          <span>Get Free 3D Quote</span>
          <ArrowRight size={14} />
        </button>

        {/* Secondary Instant WhatsApp */}
        <button
          onClick={() => handleWA("mobile_sticky")}
          id="lp-mobile-sticky-wa"
          aria-label="Chat on WhatsApp"
          style={{
            flex: "0 0 50px",
            minHeight: "48px",
            background: "#25D366",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
          }}
        >
          {WA_SVG}
        </button>
      </div>
    </div>
  );
}
