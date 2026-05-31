import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CalendarClock, HeartPulse, AlertTriangle } from 'lucide-react';

export default function Regulamin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
          
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <ShieldCheck size={48} color="var(--gold)" style={{ margin: '0 auto 24px' }} />
            <h1 style={{ fontSize: '3rem', fontWeight: 400, marginBottom: '24px', color: 'var(--text-dark)' }}>
              Regulamin <i className="text-italic text-pink">Salonu</i>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', lineHeight: 1.8 }}>
              Dziękuję za zaufanie! Aby wizyta Twojego pupila przebiegła bez stresu i w pełnym bezpieczeństwie, proszę o zapoznanie się z moim regulaminem. Umawiając wizytę, akceptujesz poniższe zasady.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Sekcja 1 */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="editorial-card"
              style={{ padding: '40px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <CalendarClock size={28} color="var(--pink)" />
                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-dark)', margin: 0 }}>Wizyty i umawianie terminów</h2>
              </div>
              <ul className="blog-content" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '16px' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  Wizyty odbywają się wyłącznie po wcześniejszym umówieniu.
                </li>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '16px' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  Proszę o punktualne przybycie. Spóźnienie powyżej 15 minut może skutkować odwołaniem wizyty.
                </li>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '0' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  W przypadku rezygnacji z wizyty, proszę o informację najpóźniej 24 godziny wcześniej.
                </li>
              </ul>
            </motion.div>

            {/* Sekcja 2 */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="editorial-card"
              style={{ padding: '40px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <HeartPulse size={28} color="var(--pink)" />
                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-dark)', margin: 0 }}>Stan zdrowia i bezpieczeństwo</h2>
              </div>
              <ul className="blog-content" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '16px' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  Przyjmuję wyłącznie zwierzęta zdrowe, bez oznak chorób zakaźnych i pasożytów.
                </li>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '16px' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  Proszę o aktualne szczepienia pupila – mam prawo odmówić wykonania usługi w przypadku ich braku.
                </li>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '0' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  Właściciel zobowiązany jest do poinformowania o wszelkich problemach zdrowotnych, alergiach, agresji lub lękach zwierzaka.
                </li>
              </ul>
            </motion.div>

            {/* Sekcja 3 */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              className="editorial-card"
              style={{ padding: '40px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <AlertTriangle size={28} color="var(--pink)" />
                <h2 style={{ fontSize: '1.8rem', fontWeight: 400, color: 'var(--text-dark)', margin: 0 }}>Zachowanie zwierzęcia</h2>
              </div>
              <ul className="blog-content" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '16px' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  W trosce o moje bezpieczeństwo i pupila, agresywne psy mogą wymagać kagańca.
                </li>
                <li style={{ position: 'relative', paddingLeft: '24px', marginBottom: '0' }}>
                  <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }}></span>
                  Jeśli pies nie pozwala na wykonanie zabiegu mimo prób uspokojenia, mam prawo przerwać usługę – w takim przypadku pobierana jest opłata proporcjonalna do wykonanej pracy.
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
}
