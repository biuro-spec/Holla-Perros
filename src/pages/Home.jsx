import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Camera, Sparkles, MessageCircle, Plus, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const GOOGLE_REVIEWS_URL = 'https://share.google/lOQLEq6X5CbfFVTMX';

// Opinie klientów (z wizytówki Google).
const OPINIE_DATA = [
  { tekst: 'Nie zastanawiaj się dłużej, czy to odpowiedni salon dla Twojego psa – zdecydowanie tak! Ola podchodzi do każdego pupila z ogromną miłością i cierpliwością.', autor: 'Magdalena Szczygieł' },
  { tekst: 'Pięknie urządzony salon z wyjątkowym wystrojem i świetną atmosferą. Widać ogromne serce do zwierząt i dbałość o każdy detal. Super lokalizacja. Polecam!', autor: 'Klientka Google' },
  { tekst: 'Z całego serca polecam! Ola ma super podejście do piesków, salon jest uroczy. To idealny salon pielęgnacyjny dla piesków.', autor: 'Jessica Gatnar' },
  { tekst: 'Cudowne miejsce z genialnym podejściem do zwierząt. Pełen profesjonalizm. Serdecznie polecam ten salon!', autor: 'Karolina Chryczyk' },
  { tekst: 'Serdecznie polecam salon groomerski! Piesek wyszedł piękny i zadbany, a pani Ola bardzo przyjazna i profesjonalna.', autor: 'Julka Lasyk' },
];

function OpinieCard({ o, big }) {
  return (
    <div className="editorial-card" style={{ padding: big ? '40px 36px' : '30px 26px', height: big ? '320px' : '270px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg-color)', boxShadow: big ? '0 18px 50px rgba(184,146,42,0.16)' : '0 8px 24px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[...Array(5)].map((_, s) => <Star key={s} size={big ? 18 : 14} fill="var(--gold)" color="var(--gold)" />)}
      </div>
      <p style={{ color: 'var(--text-dark)', fontSize: big ? '1.08rem' : '0.95rem', lineHeight: 1.65, fontStyle: 'italic', flex: 1, overflow: 'hidden' }}>„{o.tekst}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
        <div style={{ width: big ? '46px' : '38px', height: big ? '46px' : '38px', borderRadius: '50%', backgroundColor: 'var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-heading)', fontSize: big ? '1.3rem' : '1.1rem', flexShrink: 0 }}>{o.autor.charAt(0)}</div>
        <div>
          <p style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: big ? '0.98rem' : '0.88rem' }}>{o.autor}</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>Opinia z Google</p>
        </div>
      </div>
    </div>
  );
}

function OpinieSection() {
  const [active, setActive] = useState(0);
  const len = OPINIE_DATA.length;
  const go = (d) => setActive((a) => (a + d + len) % len);

  return (
    <section id="opinie" style={{ padding: '120px 0', background: 'linear-gradient(180deg, rgba(228,159,179,0.14) 0%, var(--bg-color-alt) 45%, rgba(184,146,42,0.12) 100%)', borderTop: '1px solid var(--gold)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-100px', right: '-90px', width: '440px', height: '440px', background: 'radial-gradient(circle, rgba(228,159,179,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="container" style={{ maxWidth: '1100px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Opinie</p>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 400, marginBottom: '20px' }}>Co mówią <i className="text-italic text-pink">klienci</i></h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={22} fill="var(--gold)" color="var(--gold)" />)}
            </div>
            <span style={{ fontSize: '1.05rem', color: 'var(--text-light)' }}>5,0 · opinie w Google</span>
          </div>
        </div>

        {/* Karuzela coverflow */}
        <div style={{ position: 'relative', height: '360px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {OPINIE_DATA.map((o, i) => {
            let off = i - active;
            if (off > len / 2) off -= len;
            if (off < -len / 2) off += len;
            const visible = Math.abs(off) <= 1;
            const big = off === 0;
            return (
              <motion.div
                key={i}
                animate={{ x: off * 340, scale: big ? 1 : 0.84, opacity: visible ? (big ? 1 : 0.72) : 0, zIndex: big ? 3 : 1 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                onClick={() => !big && visible && setActive(i)}
                aria-hidden={!big}
                style={{ position: 'absolute', width: '400px', maxWidth: '88vw', cursor: big ? 'default' : 'pointer', pointerEvents: visible ? 'auto' : 'none' }}
              >
                <OpinieCard o={o} big={big} />
              </motion.div>
            );
          })}

          <button onClick={() => go(-1)} aria-label="Poprzednia opinia" className="opinie-arrow" style={{ position: 'absolute', left: '0', zIndex: 5, width: '52px', height: '52px', borderRadius: '50%', border: '1px solid var(--gold)', background: 'var(--bg-color)', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}><ChevronLeft size={26} /></button>
          <button onClick={() => go(1)} aria-label="Następna opinia" className="opinie-arrow" style={{ position: 'absolute', right: '0', zIndex: 5, width: '52px', height: '52px', borderRadius: '50%', border: '1px solid var(--gold)', background: 'var(--bg-color)', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}><ChevronRight size={26} /></button>
        </div>

        {/* Kropki */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '46px' }}>
          {OPINIE_DATA.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={'Pokaż opinię ' + (i + 1)} style={{ width: '24px', height: '24px', border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ display: 'block', width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === active ? 'var(--gold)' : 'rgba(184,146,42,0.35)', transition: 'all 0.3s ease' }} />
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '16px 30px', minHeight: '48px', textDecoration: 'none', justifyContent: 'center' }}>Zobacz wszystkie opinie</a>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" style={{ padding: '16px 30px', minHeight: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid var(--gold)', color: 'var(--text-dark)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textDecoration: 'none', boxSizing: 'border-box' }}>Wystaw opinię ⭐</a>
        </div>
      </div>
      <style>{`@media (max-width: 600px) { .opinie-arrow { width: 42px !important; height: 42px !important; } }`}</style>
    </section>
  );
}

const FAQ_DATA = [
  { q: 'Jak długo trwa strzyżenie psa?', a: 'Rezerwuję zwykle do ok. 3 godzin na psa — pracuję spokojnie i bez pośpiechu, by pupil mógł się oswoić, a efekt był dopracowany. Orientacyjne czasy znajdziesz przy każdej usłudze w cenniku. Dzwonię ok. 15 minut przed końcem, żebyś mógł/mogła spokojnie odebrać pupila.' },
  { q: 'Czy psy są strzyżone pod środkami uspokajającymi?', a: 'Nie. Nigdy nie stosuję środków uspokajających. Stawiam na cierpliwość, łagodne podejście i budowanie zaufania — wizyty są w pełni bezstresowe.' },
  { q: 'Jak przygotować psa na pierwszą wizytę?', a: 'Wystarczy, że przyprowadzisz pupila na lekko wygłodzony żołądek i po spacerze. Resztą zajmę się ja. Przy pierwszej wizycie chętnie poznam jego charakter i potrzeby.' },
  { q: 'Od jakiego wieku można strzyc szczeniaka?', a: 'Pierwszą pielęgnację warto wykonać już po zakończeniu szczepień, około 3–4 miesiąca życia. Wczesne, delikatne wizyty pomagają psu oswoić się z groomingiem.' },
  { q: 'Jak często należy strzyc psa?', a: 'Rasy z szybko rosnącą szatą (np. shih-tzu, pudel, york) zalecam strzyc co 6–8 tygodni. Dla pozostałych ras dobieram indywidualny harmonogram pielęgnacji.' },
  { q: 'Czy trzeba umawiać się wcześniej?', a: 'Tak, pracuję na umówione terminy, by każdy pies miał pełną uwagę. Wystarczy zadzwonić, napisać na WhatsApp lub Instagramie — dobierzemy dogodny termin.' },
];

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ padding: '120px 0', background: 'linear-gradient(180deg, rgba(184,146,42,0.16) 0%, var(--bg-color-alt) 38%, rgba(228,159,179,0.32) 100%)', borderTop: '1px solid var(--gold)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-120px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(184,146,42,0.18) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div className="container" style={{ maxWidth: '820px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Masz pytania?</p>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 400, marginBottom: '20px' }}>Najczęstsze <i className="text-italic text-pink">pytania</i></h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.15rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Wszystko, co warto wiedzieć przed wizytą. Nie znalazłeś odpowiedzi? Napisz lub zadzwoń!
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQ_DATA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="editorial-card" style={{ padding: 0, overflow: 'hidden', border: isOpen ? '1px solid var(--gold)' : '1px solid var(--border-color)', transition: 'border-color 0.3s ease' }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '24px 28px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', color: 'var(--text-dark)', fontWeight: 500 }}>{item.q}</span>
                  <Plus size={22} className="text-gold" style={{ flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ padding: '0 28px 26px', color: 'var(--text-light)', fontSize: '1.05rem', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const InstagramIcon = ({ size = 26, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-section" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '160px 60px 40px', backgroundColor: 'var(--bg-color)', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', width: '100%' }}>
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            style={{ position: 'relative', zIndex: 10, paddingRight: '40px' }}
          >
            <p style={{ fontSize: '1rem', color: 'var(--gold)', marginBottom: '20px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '4px' }}>
              Ekskluzywny Groomer w Raciborzu
            </p>
            <h1 style={{ fontSize: '5.5rem', fontWeight: 400, lineHeight: 0.95, marginBottom: '30px', color: 'var(--text-dark)' }}>
              Cięcie na <br className="hero-br-desktop"/><i className="text-italic">miarę</i> psich <br className="hero-br-desktop"/>marzeń.
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '50px', fontWeight: 400, lineHeight: 1.6, maxWidth: '450px' }}>
              Jako profesjonalny <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>fryzjer dla psów</strong>, zapraszam na luksusowe strzyżenie i SPA w bezstresowej atmosferze. Zapewniamy cierpliwość i miłość, aby Twój pupil wyglądał i czuł się doskonale.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#kontakt" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">
                  Zarezerwuj Termin
                </button>
              </a>
              <a href="#uslugi" style={{ textDecoration: 'none' }}>
                <button className="btn-secondary">
                  Odkryj Usługi
                </button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative', zIndex: 5, padding: '20px' }}
          >
            <div className="editorial-image-frame" style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="./zdjecia/groomer-raciborz-salon-hola-perros.webp"
                alt="Ekskluzywna pielęgnacja"
                fetchPriority="high"
                width="1209" height="1710"
                className="hero-img"
                style={{ width: '100%', maxWidth: '420px', height: 'auto', display: 'block', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* O mnie */}
      <section id="omnie" style={{ padding: '120px 0', background: 'linear-gradient(135deg, var(--bg-color-alt) 0%, rgba(228, 159, 179, 0.25) 100%)' }}>
        <div className="container">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
          >
            <div>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '30px', fontWeight: 400 }}>
                Hej! Mam na imię <i className="text-italic text-pink">Ola</i>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '24px' }}>
                Z ogromną radością zapraszam Cię do <strong style={{ color: 'var(--text-dark)', fontWeight: 600 }}>hOla Perros – salonu pielęgnacji psów w Raciborzu</strong>. Stworzyłam to miejsce z miłości do zwierząt i głębokiego przekonania, że każdy z nich zasługuje na bezstresową pielęgnację w aurze spokoju i luksusu.
              </p>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '32px' }}>
                Wierzę, że praca jako <strong>groomer</strong> to nie tylko zwykłe <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>strzyżenie psów</strong> – to zaufanie budowane między człowiekiem a zwierzęciem. Oddając w moje ręce swojego pupila, masz pewność, że zostanie potraktowany z największą delikatnością, uwagą i sercem.
              </p>
              <div style={{ width: '60px', height: '1px', backgroundColor: 'var(--gold)' }}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Usługi */}
      <section id="uslugi" style={{ padding: '120px 0' }}>
        <div className="container">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}
          >
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Moja oferta</p>
              <h2 style={{ fontSize: '4rem', fontWeight: 400 }}>Menu <i className="text-italic text-pink">Zabiegów</i></h2>
            </div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', maxWidth: '400px', margin: 0, lineHeight: 1.6 }}>
              W hOla Perros nie uznaję kompromisów. Pracuję na topowych, wegańskich kosmetykach, by zadbać o każdy detal urody Twojego psa.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}
          >
            <motion.div variants={fadeIn} className="editorial-card">
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '24px', letterSpacing: '2px' }}>01</span>
              <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 400 }}>Autorskie <br/>Strzyżenie</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>Mistrzowskie strzyżenie zgodne z wzorcem rasy, lub kreatywna stylizacja dopasowana do charakteru Twojego psa. Czysta forma i perfekcja.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="editorial-card">
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '24px', letterSpacing: '2px' }}>02</span>
              <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 400 }}>Kąpiel <br/>& SPA</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>Zastrzyk nawilżenia i blasku. Używamy selektywnych szamponów i kuracji maską, które pielęgnują i chronią najdelikatniejszą skórę.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="editorial-card">
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '24px', letterSpacing: '2px' }}>03</span>
              <h3 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 400 }}>Kosmetyka <br/>Zębów</h3>
              <p style={{ color: 'var(--text-light)', lineHeight: 1.7 }}>Świeży oddech i zdrowy uśmiech bez narkozy. Bezpieczny, bezbolesny zabieg ultradźwiękowy, który pokocha każdy psiak.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cennik & Pakiety */}
      <section id="cennik" style={{ padding: '120px 0', backgroundColor: 'var(--bg-color-alt)', position: 'relative', overflow: 'hidden' }}>
        <div className="cennik-paw" style={{ position: 'absolute', top: '25%', right: '18%', width: '46%', maxWidth: '500px', opacity: 0.1, pointerEvents: 'none', zIndex: 0 }}>
          <img src="./zdjecia/lapka.webp" alt="" width="1000" height="1152" loading="lazy" style={{ width: '100%', height: 'auto', filter: 'hue-rotate(-55deg) saturate(0.7) brightness(1.3)' }} />
        </div>
        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 400, marginBottom: '24px' }}>Cennik & <i className="text-italic text-gold">Pakiety</i></h2>
            <div style={{ width: '1px', height: '30px', backgroundColor: 'var(--border-color)', margin: '0 auto' }}></div>
          </div>

          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
              {/* STRZYŻENIE */}
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Strzyżenie</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {[
                    { rasa: 'Rasy mini', przyklad: 'Yorkshire terrier, Maltańczyk, Bolończyk, Maltipoo, Papillon', cena: '160–200 zł', czas: '2–3 h' },
                    { rasa: 'Rasy małe', przyklad: 'Shih-tzu, West Highland White Terrier, Bichon Frise', cena: '170–220 zł', czas: '2–3 h' },
                    { rasa: 'Rasy średnie', przyklad: 'Pudel, Goldendoodle', cena: '190–250 zł', czas: '2,5–3,5 h' },
                  ].map(r => (
                    <div key={r.rasa} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ paddingRight: '16px' }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>{r.rasa}</h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. {r.przyklad})</p>
                      </div>
                      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>{r.cena}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>⏱ {r.czas}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRYMOWANIE */}
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Trymowanie</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {[
                    { rasa: 'Rasy małe', przyklad: 'Jack Russell Terrier, Parson Russell Terrier, Sznaucer miniaturowy, Jamnik szorstkowłosy', cena: '190–290 zł', czas: '2–3 h' },
                    { rasa: 'Rasy średnie', przyklad: 'Cocker Spaniel, Sznaucer średni, West Highland White Terrier', cena: '200–330 zł', czas: '2,5–3,5 h' },
                    { rasa: 'Rasy duże', przyklad: 'Sznaucer olbrzym', cena: '230–390 zł', czas: '3–4 h' },
                  ].map(r => (
                    <div key={r.rasa} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ paddingRight: '16px' }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>{r.rasa}</h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. {r.przyklad})</p>
                      </div>
                      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>{r.cena}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>⏱ {r.czas}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STYLIZACJA/PIELĘGNACJA */}
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Stylizacja/Pielęgnacja</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy mini</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Szpic miniaturowy, Chihuahua, Pekińczyk, Chart włoski)</p>
                    </div>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>150–200 zł</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>⏱ 1,5–2,5 h</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy małe</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Jamnik, Mops, Boston terrier)</p>
                    </div>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>160–220 zł</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>⏱ 1,5–2,5 h</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy średnie</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Beagle, Buldog francuski, Shiba Inu, Cavalier, Owczarek Szetlandzki)</p>
                    </div>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>180–280 zł</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>⏱ 2–3 h</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy duże</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Border Collie, Owczarek australijski, Owczarek niemiecki, Golden retriever, Labrador, Husky)</p>
                    </div>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>190–390 zł</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>⏱ 3–4 h</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy olbrzymie</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Berneński pies pasterski, Malamut, Akita, Nowofundland)</p>
                    </div>
                    <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)' }}>450–800 zł</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginTop: '4px' }}>⏱ 3–4 h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USŁUGI DODATKOWE */}
          <div style={{ marginBottom: '60px' }}>
            <h3 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '32px', textAlign: 'center', color: 'var(--gold)' }}>Usługi Dodatkowe</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
              
              <div className="editorial-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 500 }}>Kosmetyczne czyszczenie zębów</h4>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)', whiteSpace: 'nowrap' }}>190 zł</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>Bezpieczne i komfortowe usuwanie osadu nazębnego bez znieczulenia. Odświeża oddech i poprawia estetykę uzębienia.</p>
              </div>

              <div className="editorial-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 500 }}>Obcinanie pazurków</h4>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)', whiteSpace: 'nowrap' }}>35 zł</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>Precyzyjne skrócenie pazurów dla komfortu i estetyki łap. Zabieg wykonany z dbałością o higienę i dobro pupila.</p>
              </div>

              <div className="editorial-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 500 }}>Czyszczenie oczu</h4>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)', whiteSpace: 'nowrap' }}>25 zł</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>Delikatne oczyszczenie okolic oczu usuwa nadmiar wydzieliny i zanieczyszczenia.</p>
              </div>

              <div className="editorial-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 500 }}>Czyszczenie uszu</h4>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)', whiteSpace: 'nowrap' }}>25 zł</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>Delikatne usunięcie nadmiaru woskowiny i zanieczyszczeń wspierające higienę i komfort psa.</p>
              </div>

            </div>
          </div>

          {/* PAKIETY */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              className="editorial-card"
              style={{ backgroundColor: 'var(--bg-color)', padding: '50px 40px' }}
            >
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--text-dark)', marginBottom: '8px' }}>PAKIET CLÁSICO</h3>
                <p style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '1rem' }}>(jak w cenniku)</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-dark)' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Kąpiel dobrana do rodzaju sierści</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Suszenie z modelowaniem włosa</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Strzyżenie/trymowanie/stylizacja (indywidualnie dopasowana fryzura)</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Higiena miejsc intymnych</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Przycięcie sierści między poduszkami łap</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Czyszczenie uszu oraz oczu</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Perfumowanie</span></div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
              variants={fadeIn}
              className="editorial-card"
              style={{ backgroundColor: 'var(--bg-color)', padding: '50px 40px', borderColor: 'var(--gold)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--gold)', color: '#fff', padding: '6px 20px', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase', borderRadius: '0 0 6px 6px', whiteSpace: 'nowrap' }}>
                Signature Experience
              </div>
              <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '10px' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--gold)', marginBottom: '8px' }}>PAKIET ÉLITE PREMIUM</h3>
                <p style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '1rem' }}>(+50 zł do ceny podstawowej)</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-dark)' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Kąpiel dobrana do rodzaju sierści</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-pink" style={{ marginTop: '4px', flexShrink: 0 }}/> <span><b>Kuracja maską pielęgnacyjną</b></span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Suszenie z modelowaniem włosa</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Strzyżenie/trymowanie/stylizacja (indywidualnie dopasowana fryzura)</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Higiena miejsc intymnych</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Przycięcie sierści między poduszkami łap</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Czyszczenie uszu oraz oczu</span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-pink" style={{ marginTop: '4px', flexShrink: 0 }}/> <span><b>Nałożenie masełka na opuszki i nosek</b></span></div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}><Sparkles size={16} className="text-gold" style={{ marginTop: '4px', flexShrink: 0 }}/> <span>Perfumowanie</span></div>
              </div>
            </motion.div>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', textAlign: 'center' }}>
            * Ceny mają charakter orientacyjny. Ostateczny koszt ustalany jest indywidualnie w zależności od stanu szaty i zachowania pupila.
          </p>
        </div>
      </section>

      {/* Sklepik */}
      <section id="sklepik" style={{ padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="sklepik-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
          >
            {/* Zdjęcie */}
            <div className="editorial-image-frame" style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="./zdjecia/sklepik/obroza-zawieszka-z-grawerem-dla-psa.webp"
                alt="Ręcznie zdobione obroże i złote zawieszki z grawerem – hOla Perros"
                style={{ width: '100%', maxWidth: '440px', aspectRatio: '9/11', objectFit: 'cover', borderRadius: '6px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              />
            </div>

            {/* Treść */}
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Butik hOla Perros</p>
              <h2 style={{ fontSize: '3.8rem', fontWeight: 400, marginBottom: '24px', lineHeight: 1.05 }}>Sklepik dla <i className="text-italic text-pink">Pupili</i></h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '20px' }}>
                W moim salonie znajdziesz <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>ręcznie zdobione obroże</strong> oraz eleganckie, <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>złote zawieszki w kształcie kości</strong>. Do każdej zawieszki wykonuję <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>grawer z imieniem pieska i numerem telefonu</strong> właściciela — całkowicie gratis.
              </p>

              {/* Cennik sklepiku */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', margin: '32px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Obroża zdobiona ręcznie</span>
                  <span style={{ fontSize: '1.3rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>119 zł</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Zawieszka z grawerem</span>
                  <span style={{ fontSize: '1.3rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>39 zł</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0', borderBottom: '2px solid var(--gold)' }}>
                  <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>Komplet <span style={{ color: 'var(--pink)', fontStyle: 'italic' }}>(obroża + zawieszka)</span></span>
                  <span style={{ fontSize: '1.3rem', color: 'var(--gold)', whiteSpace: 'nowrap', fontWeight: 600 }}>139 zł</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--pink)', fontWeight: 500, marginBottom: '28px' }}>
                <Sparkles size={18} className="text-gold" />
                <span style={{ color: 'var(--text-dark)', fontSize: '0.98rem' }}>Grawer z imieniem i numerem telefonu — <i className="text-italic text-gold">gratis</i></span>
              </div>

              <a href="#kontakt" style={{ textDecoration: 'none' }}>
                <button className="btn-primary">Zapytaj o dostępne wzory</button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* Kontakt */}
      <section id="kontakt" style={{ padding: '120px 0', background: 'linear-gradient(180deg, rgba(228,159,179,0.32) 0%, var(--bg-color-alt) 52%, rgba(228,159,179,0.14) 100%)', borderTop: '1px solid var(--gold)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-90px', width: '440px', height: '440px', background: 'radial-gradient(circle, rgba(228,159,179,0.22) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* Umów wizytę – 3 kanały */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Rezerwacja</p>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 400, marginBottom: '20px' }}>Umów wizytę <i className="text-italic text-pink">dla pupila</i></h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.15rem', maxWidth: '560px', margin: '0 auto 48px', lineHeight: 1.7 }}>
              Wybierz wygodny dla Ciebie sposób kontaktu. Zadzwoń, napisz na WhatsApp lub Instagramie — chętnie dobiorę termin i odpowiem na wszystkie pytania.
            </p>

            <div className="contact-channels" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '760px', margin: '0 auto' }}>
              {/* Telefon */}
              <a href="tel:+48512501558" style={{ textDecoration: 'none' }}>
                <div className="channel-card editorial-card" style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', height: '100%' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--gold-l, rgba(184,146,42,0.12))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={26} className="text-gold" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)' }}>Zadzwoń</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>512 501 558</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/48512501558?text=Dzie%C5%84%20dobry!%20Chcia%C5%82(a)bym%20um%C3%B3wi%C4%87%20wizyt%C4%99%20dla%20mojego%20psa%20%F0%9F%90%BE" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div className="channel-card editorial-card" style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', height: '100%' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(37,211,102,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={26} style={{ color: '#25D366' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)' }}>WhatsApp</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>Napisz wiadomość</span>
                </div>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/holaperros_salon" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div className="channel-card editorial-card" style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', height: '100%' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(228,159,179,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <InstagramIcon size={26} color="var(--pink)" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--text-dark)' }}>Instagram</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>@holaperros_salon</span>
                </div>
              </a>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '60px' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gold)', marginBottom: '16px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '2px' }}>Zapraszam</p>
              <h2 style={{ fontSize: '4rem', fontWeight: 400, marginBottom: '32px' }}>Pozostańmy w <i className="text-italic text-pink">kontakcie</i>.</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <MapPin size={22} className="text-gold" style={{ flexShrink: 0, marginTop: '3px' }}/>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', color: 'var(--text-dark)' }}>Adres</p>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.05rem' }}>ul. Opawska 67, 47-400 Racibórz</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <Phone size={22} className="text-gold" style={{ flexShrink: 0, marginTop: '3px' }}/>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', color: 'var(--text-dark)' }}>Rezerwacje</p>
                    <a href="tel:+48512501558" aria-label="Zadzwoń: +48 512 501 558" style={{ textDecoration: 'none', color: 'var(--text-light)', fontSize: '1.05rem' }}>+48 512 501 558</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <MessageCircle size={22} style={{ flexShrink: 0, marginTop: '3px', color: '#25D366' }}/>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', color: 'var(--text-dark)' }}>WhatsApp</p>
                    <a href="https://wa.me/48512501558" target="_blank" rel="noreferrer" aria-label="Napisz na WhatsApp: +48 512 501 558" style={{ textDecoration: 'none', color: 'var(--text-light)', fontSize: '1.05rem' }}>+48 512 501 558</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <MapPin size={22} className="text-gold" style={{ flexShrink: 0, marginTop: '3px' }}/>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', color: 'var(--text-dark)' }}>Google</p>
                    <a href="https://share.google/lOQLEq6X5CbfFVTMX" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--text-light)', fontSize: '1.05rem' }}>Zobacz wizytówkę i opinie</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="editorial-card" style={{ textAlign: 'center', padding: '80px 40px' }}>
              <Camera size={40} style={{ margin: '0 auto 24px', color: 'var(--text-dark)' }} />
              <h3 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '20px' }}>Śledź moje <br/>metamorfozy</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '40px' }}>Dołącz do mnie na Instagramie i zanurz się w świecie ekskluzywnej psiej pielęgnacji.</p>
              <a href="https://www.instagram.com/holaperros_salon" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  @holaperros_salon
                </button>
              </a>
            </div>
          </div>
          
          <div className="location-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ paddingRight: '20px' }}
            >
              <h3 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '24px' }}>Jak do mnie <i className="text-italic text-gold">trafić?</i></h3>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '16px' }}>
                Mój salon <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>hOla Perros</strong> znajduje się w dogodnej i świetnie skomunikowanej części Raciborza, przy głównej ulicy <strong style={{ color: 'var(--text-dark)', fontWeight: 500 }}>Opawskiej 67</strong>.
              </p>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '24px' }}>
                Wejście znajdziesz bezpośrednio od frontu budynku. Dla Twojej wygody, tuż pod salonem oraz w najbliższych alejkach dostępny jest darmowy parking – bez problemu i stresu zaparkujesz, by bezpiecznie dowieźć swojego pupila na umówiony zabieg.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--pink)', fontWeight: 600, marginBottom: '24px' }}>
                <MapPin size={24} /> 
                <span style={{ color: 'var(--text-dark)' }}>Wypatruj szyldu z moim różowo-złotym logo!</span>
              </div>
              <a href="https://maps.google.com/?q=Opawska+67,+47-400+Racibórz" target="_blank" rel="noreferrer" className="mobile-nav-btn" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '10px' }}>
                  <MapPin size={18} /> Nawiguj do salonu
                </button>
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="map-container" 
              style={{ width: '100%', height: '450px', border: '1px solid var(--gold)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
            >
              <iframe
                title="Mapa dojazdu do salonu hOla Perros — ul. Opawska 67, Racibórz"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2552.0911760193164!2d18.2045542!3d50.0945533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471161d00f681a05%3A0xc6c449c2537f55b9!2sOpawska%2067%2C%2047-400%20Racib%C3%B3rz!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                width="100%"
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opinie klientów (Google) */}
      <OpinieSection />
    </>
  );
}
