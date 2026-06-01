import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Camera, Sparkles, MessageCircle } from 'lucide-react';

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
              <a href="tel:+48512501558" style={{ textDecoration: 'none' }}>
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
                src="./zdjecia/hero.jpg"
                alt="Ekskluzywna pielęgnacja" 
                style={{ width: '100%', maxWidth: '420px', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }} 
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
          <img src="./zdjecia/lapka.png" alt="" style={{ width: '100%', height: 'auto', filter: 'hue-rotate(-55deg) saturate(0.7) brightness(1.3)' }} />
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
                    { rasa: 'Rasy mini', przyklad: 'Yorkshire terrier, Maltańczyk, Bolończyk, Maltipoo, Papillon', cena: '160–200 zł' },
                    { rasa: 'Rasy małe', przyklad: 'Shih-tzu, West Highland White Terrier, Bichon Frise', cena: '170–220 zł' },
                    { rasa: 'Rasy średnie', przyklad: 'Pudel, Goldendoodle', cena: '190–250 zł' },
                  ].map(r => (
                    <div key={r.rasa} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ paddingRight: '16px' }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>{r.rasa}</h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. {r.przyklad})</p>
                      </div>
                      <div style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>{r.cena}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRYMOWANIE */}
              <div>
                <h3 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Trymowanie</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                  {[
                    { rasa: 'Rasy małe', przyklad: 'Jack Russell Terrier, Parson Russell Terrier, Sznaucer miniaturowy, Jamnik szorstkowłosy', cena: '190–290 zł' },
                    { rasa: 'Rasy średnie', przyklad: 'Cocker Spaniel, Sznaucer średni, West Highland White Terrier', cena: '200–330 zł' },
                    { rasa: 'Rasy duże', przyklad: 'Sznaucer olbrzym', cena: '230–390 zł' },
                  ].map(r => (
                    <div key={r.rasa} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <div style={{ paddingRight: '16px' }}>
                        <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>{r.rasa}</h4>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. {r.przyklad})</p>
                      </div>
                      <div style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>{r.cena}</div>
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
                    <div style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>150–200 zł</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy małe</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Jamnik, Mops, Boston terrier)</p>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>160–220 zł</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy średnie</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Beagle, Buldog francuski, Shiba Inu, Cavalier, Owczarek Szetlandzki)</p>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>180–280 zł</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy duże</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Border Collie, Owczarek australijski, Owczarek niemiecki, Golden retriever, Labrador, Husky)</p>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>190–390 zł</div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ paddingRight: '16px' }}>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '6px' }}>Rasy olbrzymie</h4>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-light)', lineHeight: '1.5' }}>(np. Berneński pies pasterski, Malamut, Akita, Nowofundland)</p>
                    </div>
                    <div style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>450–800 zł</div>
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
                  <span style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>190 zł</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>Bezpieczne i komfortowe usuwanie osadu nazębnego bez znieczulenia. Odświeża oddech i poprawia estetykę uzębienia.</p>
              </div>

              <div className="editorial-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 500 }}>Obcinanie pazurków</h4>
                  <span style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>35 zł</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>Precyzyjne skrócenie pazurów dla komfortu i estetyki łap. Zabieg wykonany z dbałością o higienę i dobro pupila.</p>
              </div>

              <div className="editorial-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 500 }}>Czyszczenie oczu</h4>
                  <span style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>25 zł</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-light)', lineHeight: '1.6' }}>Delikatne oczyszczenie okolic oczu usuwa nadmiar wydzieliny i zanieczyszczenia.</p>
              </div>

              <div className="editorial-card" style={{ padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: 500 }}>Czyszczenie uszu</h4>
                  <span style={{ fontSize: '1.2rem', color: 'var(--gold)', whiteSpace: 'nowrap' }}>25 zł</span>
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

          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', textAlign: 'center', opacity: 0.7 }}>
            * Ceny mają charakter orientacyjny. Ostateczny koszt ustalany jest indywidualnie w zależności od stanu szaty i zachowania pupila.
          </p>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" style={{ padding: '120px 0', borderTop: '1px solid var(--border-color)' }}>
        <div className="container">
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
                    <a href="tel:+48512501558" style={{ textDecoration: 'none', color: 'var(--text-light)', fontSize: '1.05rem' }}>+48 512 501 558</a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <MessageCircle size={22} style={{ flexShrink: 0, marginTop: '3px', color: '#25D366' }}/>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', color: 'var(--text-dark)' }}>WhatsApp</p>
                    <a href="https://wa.me/48512501558" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'var(--text-light)', fontSize: '1.05rem' }}>+48 512 501 558</a>
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
    </>
  );
}
