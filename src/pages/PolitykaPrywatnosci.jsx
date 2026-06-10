import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function PolitykaPrywatnosci() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const h2 = { fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-dark)', margin: '36px 0 12px' };
  const p = { color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '12px', fontSize: '1.02rem' };
  const li = { color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '6px' };
  const fill = { backgroundColor: 'rgba(184,103,17,0.12)', color: '#8a6e14', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 };

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: '50px' }}>
          <Lock size={44} color="var(--gold)" style={{ margin: '0 auto 20px' }} />
          <h1 style={{ fontSize: '3rem', fontWeight: 400, color: 'var(--text-dark)' }}>
            Polityka <i className="text-italic text-pink">prywatności</i>
          </h1>
          <p style={{ color: 'var(--text-light)', marginTop: '12px' }}>Ostatnia aktualizacja: 10.06.2026</p>
        </motion.div>

        <p style={p}>Twoja prywatność jest dla nas ważna. Poniżej wyjaśniamy, jakie dane zbieramy, w jakim celu i jakie masz prawa zgodnie z RODO (Rozporządzenie UE 2016/679).</p>

        <h2 style={h2}>1. Administrator danych</h2>
        <p style={p}>Administratorem Twoich danych osobowych jest <span style={fill}>[NAZWA PODMIOTU / IMIĘ I NAZWISKO]</span>, prowadzący salon groomerski <strong>hOla Perros</strong>, ul. Opawska 67, 47-400 Racibórz.</p>
        <ul>
          <li style={li}>NIP: <span style={fill}>[NIP]</span></li>
          <li style={li}>E-mail kontaktowy w sprawach danych: <span style={fill}>salon@holaperros.pl</span></li>
          <li style={li}>Telefon: +48 512 501 558</li>
        </ul>

        <h2 style={h2}>2. Jakie dane zbieramy</h2>
        <p style={p}>W zależności od formy kontaktu możemy przetwarzać:</p>
        <ul>
          <li style={li}>imię i nazwisko,</li>
          <li style={li}>numer telefonu i/lub adres e-mail,</li>
          <li style={li}>dane dotyczące pupila (imię psa, rasa, uwagi pielęgnacyjne),</li>
          <li style={li}>historię wizyt i informacje o wykonanych usługach.</li>
        </ul>

        <h2 style={h2}>3. Cel i podstawa prawna przetwarzania</h2>
        <ul>
          <li style={li}>umówienie i realizacja wizyty oraz świadczenie usług groomerskich — art. 6 ust. 1 lit. b RODO (wykonanie umowy),</li>
          <li style={li}>kontakt telefoniczny, WhatsApp lub e-mail w sprawie wizyty — art. 6 ust. 1 lit. b i f RODO,</li>
          <li style={li}>prowadzenie kartoteki pupila i historii wizyt — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes: jakość usług),</li>
          <li style={li}>rozliczenia i obowiązki księgowe — art. 6 ust. 1 lit. c RODO.</li>
        </ul>

        <h2 style={h2}>4. Komu powierzamy dane</h2>
        <p style={p}>Dane mogą być przetwarzane przez zaufanych dostawców usług, z których korzystamy:</p>
        <ul>
          <li style={li}><strong>cyber_Folks S.A.</strong> — hosting strony (przechowywanie na serwerze),</li>
          <li style={li}><strong>Google Ireland Ltd.</strong> — narzędzia, w których prowadzimy rezerwacje i kartotekę (Arkusze i Dysk Google), oraz mapy i czcionki na stronie.</li>
        </ul>
        <p style={p}>Nie sprzedajemy ani nie udostępniamy Twoich danych w celach marketingowych podmiotom trzecim.</p>

        <h2 style={h2}>5. Jak długo przechowujemy dane</h2>
        <p style={p}>Dane przechowujemy przez okres niezbędny do realizacji usług oraz wynikający z przepisów (np. księgowych). Dane z kartoteki pupila przechowujemy do czasu wniesienia sprzeciwu lub żądania ich usunięcia.</p>

        <h2 style={h2}>6. Twoje prawa</h2>
        <p style={p}>Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu. Aby skorzystać z tych praw, skontaktuj się z nami (dane w pkt 1).</p>
        <p style={p}>Masz również prawo wniesienia skargi do organu nadzorczego — <strong>Prezesa Urzędu Ochrony Danych Osobowych (PUODO)</strong>, ul. Stawki 2, 00-193 Warszawa.</p>

        <h2 style={h2}>7. Pliki cookies</h2>
        <p style={p}>Strona korzysta z plików cookies oraz podobnych technologii:</p>
        <ul>
          <li style={li}><strong>niezbędne</strong> — zapewniają poprawne działanie strony (np. zapamiętanie zgody, działanie panelu),</li>
          <li style={li}><strong>zewnętrzne</strong> — mapy Google (dojazd) oraz czcionki Google, które mogą zapisywać własne pliki cookies.</li>
        </ul>
        <p style={p}>Możesz zarządzać plikami cookies w ustawieniach swojej przeglądarki (zablokować lub usunąć). Korzystając ze strony, akceptujesz używanie cookies zgodnie z niniejszą polityką.</p>

        <h2 style={h2}>8. Kontakt</h2>
        <p style={p}>W sprawach dotyczących danych osobowych napisz na: <span style={fill}>salon@holaperros.pl</span> lub zadzwoń: +48 512 501 558.</p>

        <div style={{ marginTop: '40px', padding: '18px 20px', borderRadius: '10px', backgroundColor: 'var(--bg-color-alt)', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          ℹ️ Dokument stanowi wzór dostosowany do tej strony. Przed publikacją uzupełnij pola oznaczone <span style={fill}>[…]</span> i — w razie wątpliwości — skonsultuj treść z osobą zajmującą się ochroną danych.
        </div>
      </div>
    </div>
  );
}
