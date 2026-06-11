import { chromium } from 'playwright';
import fs from 'fs';

const img = (f) => 'data:image/png;base64,' + fs.readFileSync('_instrukcja_img/' + f).toString('base64');
const logo = fs.existsSync('public/zdjecia/logo-napis.webp')
  ? 'data:image/webp;base64,' + fs.readFileSync('public/zdjecia/logo-napis.webp').toString('base64') : '';

const html = `<!doctype html><html lang="pl"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'DM Sans',sans-serif; color:#2D2825; font-size:11pt; line-height:1.55; }
  h1 { font-family:'Cormorant Garamond',serif; font-size:30pt; font-weight:600; text-align:center; color:#2D2825; }
  h2 { font-family:'Cormorant Garamond',serif; font-size:18pt; font-weight:600; color:#8a6e14; margin:22px 0 8px; border-bottom:2px solid #E49FB3; padding-bottom:4px; }
  p { margin-bottom:8px; color:#4a443f; }
  .sub { text-align:center; color:#8a807a; margin:4px 0 6px; letter-spacing:1px; }
  .logo { display:block; width:200px; margin:0 auto 6px; }
  ul,ol { margin:6px 0 10px 22px; } li { margin-bottom:5px; color:#4a443f; }
  .step { display:flex; gap:14px; align-items:flex-start; margin:12px 0; }
  .step .num { flex:0 0 28px; height:28px; border-radius:50%; background:#8a6e14; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; }
  .imgs { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin:10px 0 4px; }
  .imgs figure { text-align:center; }
  .imgs img { border:1px solid #EBE5DF; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,.06); }
  .imgs figcaption { font-size:8.5pt; color:#8a807a; margin-top:4px; }
  .box { background:#FAF3E8; border-radius:10px; padding:12px 16px; margin:12px 0; font-size:10pt; }
  .key { background:#fff5e0; border:1px dashed #8a6e14; border-radius:8px; padding:10px 14px; margin-top:6px; font-size:10pt; }
  table { width:100%; border-collapse:collapse; margin:8px 0; font-size:10pt; }
  td,th { border:1px solid #EBE5DF; padding:7px 10px; text-align:left; }
  th { background:#F4F1ED; color:#8a6e14; }
  .pink { color:#B83D5E; } .gold { color:#8a6e14; }
  a { color:#8a6e14; }
</style></head><body>

  ${logo ? `<img class="logo" src="${logo}">` : '<h1>hOla Perros</h1>'}
  <h1 style="font-size:24pt; margin-top:4px;">Twoja strona — przewodnik</h1>
  <p class="sub">SALON GROOMERSKI · holaperros.pl</p>

  <h2>🌐 Co masz — Twoja strona</h2>
  <p>Adres: <b>https://holaperros.pl</b> — Twój własny, krótki adres. Podawaj go klientom, drukuj na wizytówkach, wstawiaj w social mediach.</p>
  <p>To <b>nie zwykła wizytówka</b>, tylko kompletny system. Na stronie klient znajdzie:</p>
  <table>
    <tr><th>Sekcja</th><th>Co zawiera</th></tr>
    <tr><td>Powitanie i „O mnie"</td><td>Twoje zdjęcie, hasło salonu, kim jesteś</td></tr>
    <tr><td>Usługi i cennik</td><td>Strzyżenie, kąpiel, pielęgnacja — z cenami <b>i czasami</b></td></tr>
    <tr><td>Sklepik</td><td>Obroże, zawieszki</td></tr>
    <tr><td>Galeria metamorfoz</td><td>Zdjęcia Twoich prac (najmocniej przyciąga klientów)</td></tr>
    <tr><td>FAQ</td><td>Odpowiedzi na częste pytania klientów</td></tr>
    <tr><td>Opinie z Google</td><td>Prawdziwe recenzje — budują zaufanie</td></tr>
    <tr><td>Kontakt + mapa</td><td>Telefon, WhatsApp, Instagram, Facebook, dojazd</td></tr>
  </table>

  <h2>🏆 Jakość strony (testy Google)</h2>
  <p>Strona przeszła profesjonalne testy z najwyższymi wynikami — jest szybka, bezpieczna i gotowa, by Google ją polecał:</p>
  <table>
    <tr><th>Co sprawdzane</th><th>Wynik</th></tr>
    <tr><td>SEO (widoczność w Google)</td><td><b>100 / 100</b></td></tr>
    <tr><td>Dostępność (czytelność dla wszystkich)</td><td><b>100 / 100</b></td></tr>
    <tr><td>Dobre praktyki i bezpieczeństwo</td><td><b>100 / 100</b></td></tr>
    <tr><td>Certyfikat SSL (kłódka „https")</td><td>✅ aktywny</td></tr>
  </table>

  <h2>🔐 Jak wejść do panelu</h2>
  <p>Panel to Twoje prywatne miejsce do zarządzania — klienci go nie widzą.</p>
  <div class="step"><div class="num">1</div><div>Wejdź na <b>holaperros.pl</b> i przewiń na <b>sam dół</b> strony.</div></div>
  <div class="step"><div class="num">2</div><div>Kliknij <b>rok „2026"</b> w stopce — to ukryte wejście do panelu.</div></div>
  <div class="step"><div class="num">3</div><div>Wpisz <b>PIN</b> na klawiaturze (podany na końcu).</div></div>
  <div class="imgs">
    <figure><img src="${img('1-stopka.png')}" width="260"><figcaption>Krok 2 — kliknij „2026" w stopce</figcaption></figure>
    <figure><img src="${img('2-pin.png')}" width="150"><figcaption>Krok 3 — wpisz PIN</figcaption></figure>
  </div>

  <h2>🔑 Pierwsze logowanie — wpisz klucz (raz)</h2>
  <p>Za pierwszym razem na danym telefonie/komputerze wejdź w <b>Ustawienia</b> i wpisz <b>klucz dostępu</b> (podany na końcu), potem kliknij „Zapisz klucz". To chroni dane klientów.</p>
  <div class="imgs"><figure><img src="${img('4-klucz.png')}" width="430"><figcaption>Tu wklejasz klucz (Ustawienia → „Tajny klucz dostępu") i klikasz „Zapisz klucz"</figcaption></figure></div>

  <h2>📋 Co możesz w panelu</h2>
  <div style="display:flex; gap:16px; align-items:flex-start;">
    <img src="${img('3-menu.png')}" width="130" style="border:1px solid #EBE5DF; border-radius:8px;">
    <table style="flex:1;">
      <tr><th>Zakładka</th><th>Do czego</th></tr>
      <tr><td>Dashboard</td><td>Podgląd: dzisiejsze wizyty, przychód</td></tr>
      <tr><td>Kalendarz</td><td>Terminy, dni wolne</td></tr>
      <tr><td>Rezerwacje</td><td>Wizyty — dodawaj, oznaczaj wykonane/opłacone</td></tr>
      <tr><td>Pieski</td><td>Kartoteka psów: zdjęcie, opis, historia</td></tr>
      <tr><td>Metamorfozy</td><td>Zdjęcia prac → galeria na stronie</td></tr>
      <tr><td>Finanse</td><td>Przychody, zestawienia</td></tr>
      <tr><td>Ustawienia</td><td>Klucz dostępu, dane salonu</td></tr>
    </table>
  </div>
  <div class="box">⭐ <b>Wszystko łączy się samo:</b> rezerwacja „zrealizowana" → dopisuje się do karty psa; „opłacona" → trafia do Finansów. Nie wpisujesz nic dwa razy.</div>

  <h2>📸 Social media — link w bio</h2>
  <p>Masz gotowy link do wklejenia w profilu na <b>Instagramie</b> i <b>Facebooku</b> (Edytuj profil → Strona internetowa):</p>
  <div class="key"><b>https://holaperros.pl/bio/</b></div>
  <p style="margin-top:6px;">To ładna strona z przyciskami: Zadzwoń · WhatsApp · Oferta · Galeria · Instagram · Facebook · <b>Dodaj opinię</b> · Dojazd. Obserwujący jednym kliknięciem umawiają wizytę lub zostawiają opinię.</p>

  <h2>✅ Co zrobić na start</h2>
  <ol>
    <li>Wejdź do panelu, wpisz klucz w Ustawieniach</li>
    <li>Dodaj pierwsze <b>metamorfozy</b> (zdjęcia prac)</li>
    <li>Wklej <b>holaperros.pl/bio/</b> w bio na Instagramie</li>
    <li>Sprawdź <b>Wizytówkę Google</b> (godziny, zdjęcia, link)</li>
  </ol>

  <h2>📧 Twoja poczta e-mail</h2>
  <p>Masz firmowy adres: <b>salon@holaperros.pl</b>. Najprościej sprawdzać przez przeglądarkę: <b>poczta.cyber-folks.pl</b> (login: adres e-mail + hasło).</p>
  <table>
    <tr><th>Ustawienie (do aplikacji pocztowej)</th><th>Wartość</th></tr>
    <tr><td>Serwer poczty</td><td>s75.cyber-folks.pl</td></tr>
    <tr><td>Przychodząca (IMAP)</td><td>port 993, SSL</td></tr>
    <tr><td>Wychodząca (SMTP)</td><td>port 465, SSL</td></tr>
  </table>

  <h2>💎 Wartość Twojej strony</h2>
  <p>To kompletny system (strona + panel zarządzania), nie zwykła wizytówka. Wartość rynkowa takiego projektu to <b>ok. 9 000 – 15 000 zł</b>.</p>
  <div class="box">💰 <b>Najważniejsze — brak kosztów miesięcznych.</b> Systemy do rezerwacji (jak Booksy) kosztują 100–300 zł/mies. bez końca. Twój działa za darmo (narzędzia Google + tani hosting) — oszczędność nawet kilku tysięcy zł rocznie. Do tego <b>wszystkie dane są Twoje</b>, w Twoim koncie Google.</div>

  <h2>🔑 Dane dostępowe</h2>
  <div class="key">
    PIN do panelu: <b>_______________</b><br>
    Klucz dostępu: <b>_______________________________</b><br>
    Poczta: <b>salon@holaperros.pl</b> &nbsp; Hasło: <b>____________________</b>
  </div>
  <p style="font-size:9pt; color:#8a807a; margin-top:6px;">(uzupełnij ręcznie — przekazane osobno, dla bezpieczeństwa)</p>

  <p style="text-align:center; margin-top:24px; font-size:9pt; color:#8a807a;">Pomoc: WebStudio47 · webstudio47.pl 🐾</p>
</body></html>`;

const b = await chromium.launch();
const p = await b.newPage();
await p.setContent(html, { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
await p.pdf({ path: 'INSTRUKCJA-OLI.pdf', format: 'A4', printBackground: true });
await p.setViewportSize({ width: 794, height: 1400 });
await p.screenshot({ path: '_instrukcja_img/pdf-preview.png' });
await b.close();
console.log('PDF gotowy: PRZEWODNIK-OLI.pdf + podgląd');
