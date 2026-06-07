/**
 * =====================================================
 * hOla Perros – System Rezerwacji
 * Google Apps Script v1.0
 * =====================================================
 * WDROŻENIE:
 * 1. Otwórz: https://script.google.com
 * 2. Utwórz nowy projekt, wklej ten kod
 * 3. Wdróż → Nowe wdrożenie → Aplikacja internetowa
 *    - Uruchamiaj jako: Ja (właściciel)
 *    - Kto ma dostęp: Wszyscy
 * 4. Skopiuj URL wdrożenia do obu plików HTML (zmienna API_URL)
 * =====================================================
 */

const CONFIG = {
  SPREADSHEET_ID: '19WzKNI_f8dnEb3CD6_CmuumGEoupEhjF908b9-gs3q4',
  SHEETS: {
    REZERWACJE: 'Rezerwacje',
    PIESKI:     'Pieski',
    BLOKADY:    'Blokady',
    FINANSE:    'Finanse',
    METAMORFOZY:'Metamorfozy',
    BAZA_PIESKI:'BazaPieski'
  },
  DRIVE_FOLDER_NAME: 'hOla Perros - Metamorfozy',
  SLOTS: ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00'],
  MAX_DZIENNIE: 8,
  EMAIL_OLA: 'cichonmariusz06@gmail.com',
  SALON_NAZWA: 'hOla Perros',
  SALON_ADRES: 'ul. Opawska 67, 47-400 Racibórz',
  SALON_TEL: '+48 512 501 558'
};

const USLUGI = [
  { id:'strzyzenie-mini',    nazwa:'Strzyżenie – Rasy mini',     opis:'York, Maltańczyk, Bolończyk, Maltipoo, Papillon',              cena:180, kat:'Strzyżenie' },
  { id:'strzyzenie-male',    nazwa:'Strzyżenie – Rasy małe',     opis:'Shih-tzu, West Highland White Terrier, Bichon Frise',          cena:195, kat:'Strzyżenie' },
  { id:'strzyzenie-srednie', nazwa:'Strzyżenie – Rasy średnie',  opis:'Pudel, Goldendoodle',                                          cena:220, kat:'Strzyżenie' },
  { id:'stylizacja-mini',    nazwa:'Stylizacja – Rasy mini',     opis:'Szpic miniaturowy, Chihuahua, Pekińczyk, Chart włoski',        cena:175, kat:'Stylizacja' },
  { id:'stylizacja-male',    nazwa:'Stylizacja – Rasy małe',     opis:'Jamnik, Mops, Boston terrier',                                 cena:190, kat:'Stylizacja' },
  { id:'stylizacja-srednie', nazwa:'Stylizacja – Rasy średnie',  opis:'Beagle, Buldog francuski, Shiba Inu',                          cena:230, kat:'Stylizacja' },
  { id:'kapiel-spa-mini',    nazwa:'Kąpiel & SPA – Rasy mini',   opis:'Kąpiel + suszenie + pielęgnacja dla ras mini',                 cena:130, kat:'Kąpiel & SPA' },
  { id:'kapiel-spa-male',    nazwa:'Kąpiel & SPA – Rasy małe',   opis:'Kąpiel + suszenie + pielęgnacja dla ras małych',               cena:150, kat:'Kąpiel & SPA' },
  { id:'kapiel-spa-srednie', nazwa:'Kąpiel & SPA – Rasy średnie',opis:'Kąpiel + suszenie + pielęgnacja dla ras średnich',             cena:170, kat:'Kąpiel & SPA' },
  { id:'czyszczenie-zebow',  nazwa:'Czyszczenie zębów',          opis:'Kosmetyczne czyszczenie ultradźwiękowe bez narkozy',            cena:190, kat:'Higiena' },
  { id:'pazurki',            nazwa:'Obcinanie pazurków',         opis:'Precyzyjne skrócenie pazurów',                                 cena:35,  kat:'Higiena' },
  { id:'czyszczenie-uszu',   nazwa:'Czyszczenie uszu',           opis:'Delikatne usunięcie nadmiaru woskowiny',                       cena:25,  kat:'Higiena' },
  { id:'czyszczenie-oczu',   nazwa:'Czyszczenie okolic oczu',    opis:'Delikatne oczyszczenie okolic oczu',                           cena:25,  kat:'Higiena' }
];

// =====================================================
// HELPERS
// =====================================================

function ss() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}

function getSheet(name) {
  const s = ss().getSheetByName(name);
  if (!s) throw new Error('Brak arkusza: ' + name);
  return s;
}

function jsonOK(data) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonErr(msg) {
  return ContentService.createTextOutput(JSON.stringify({ ok: false, error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

function genId() {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2,'0');
  const yy = String(now.getFullYear()).slice(-2);
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return 'HP-' + rand + '-' + mm + yy;
}

function formatDate(d) {
  const dt = new Date(d);
  return dt.getFullYear() + '-' + String(dt.getMonth()+1).padStart(2,'0') + '-' + String(dt.getDate()).padStart(2,'0');
}

// =====================================================
// INICJALIZACJA ARKUSZY
// =====================================================

function initSheets() {
  const spreadsheet = ss();
  const sheetDefs = {
    Rezerwacje: ['ID','Data','Godzina','Usługa','Cena','Imie_klienta','Telefon','Email','Imie_psa','Rasa','Uwagi','Status','Notatki_Ola','Co_robiono','Zaplacono','Metoda_platnosci','DataUtworzenia'],
    Pieski:     ['Email_klienta','Imie_psa','Rasa','Uwagi_behawioralne','Alergie','Notatki','Data_aktualizacji'],
    Blokady:    ['Data','Godzina','Powod'],
    Finanse:    ['ID','Data','ID_rezerwacji','Kwota','Typ','Opis','Metoda'],
    Metamorfozy:['ID','FileId','Url','Tytul','Rasa','Opis','Data'],
    BazaPieski: ['ID','FileId','Imie','Rasa','Wlasciciel','Telefon','Opis','Wizyty','DataDodania']
  };

  for (const [name, headers] of Object.entries(sheetDefs)) {
    let sheet = spreadsheet.getSheetByName(name);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(name);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#2D2825').setFontColor('#FFFFFF').setFontWeight('bold');
      sheet.setFrozenRows(1);
    }
  }
  return jsonOK('Arkusze zainicjowane');
}

// =====================================================
// GET HANDLER
// =====================================================

function doGet(e) {
  try {
    const action = e.parameter.action;
    switch (action) {
      case 'getSlots':         return getAvailableSlots(e.parameter.date);
      case 'getReservations':  return getReservations(e.parameter);
      case 'getBlocked':       return getBlocked();
      case 'getDog':           return getDog(e.parameter.email);
      case 'getFinances':      return getFinancesData(e.parameter);
      case 'getStats':         return getStats();
      case 'getServices':      return jsonOK(USLUGI);
      case 'getMetamorfozy':   return getMetamorfozy();
      case 'getPieski':        return getPieskiBaza();
      case 'init':             return initSheets();
      case 'test':             return jsonOK({ msg: 'hOla Perros API działa!' });
      default:                 return jsonErr('Nieznana akcja: ' + action);
    }
  } catch(err) {
    return jsonErr(err.toString());
  }
}

// =====================================================
// POST HANDLER
// =====================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    switch (data.action) {
      case 'createReservation':   return createReservation(data);
      case 'updateReservation':   return updateReservation(data);
      case 'blockDate':           return blockDate(data);
      case 'unblockDate':         return unblockDate(data);
      case 'saveDog':             return saveDog(data);
      case 'addFinance':          return addFinance(data);
      case 'uploadMetamorfoza':   return uploadMetamorfoza(data);
      case 'updateMetamorfoza':   return updateMetamorfoza(data);
      case 'deleteMetamorfoza':   return deleteMetamorfoza(data);
      case 'addPiesek':           return addPiesek(data);
      case 'updatePiesek':        return updatePiesek(data);
      case 'deletePiesek':        return deletePiesek(data);
      case 'addWizyta':           return addWizyta(data);
      case 'deleteWizyta':        return deleteWizyta(data);
      default:                    return jsonErr('Nieznana akcja: ' + data.action);
    }
  } catch(err) {
    return jsonErr(err.toString());
  }
}

// =====================================================
// DOSTĘPNE SLOTY
// =====================================================

function getAvailableSlots(date) {
  if (!date) return jsonErr('Brak daty');

  const rezSheet  = getSheet(CONFIG.SHEETS.REZERWACJE);
  const blkSheet  = getSheet(CONFIG.SHEETS.BLOKADY);
  const rezData   = rezSheet.getDataRange().getValues();
  const blkData   = blkSheet.getDataRange().getValues();

  // Zbierz zajęte sloty w danym dniu
  const zajete = new Set();
  for (let i = 1; i < rezData.length; i++) {
    const rowDate = formatDate(rezData[i][1]);
    const status  = rezData[i][11];
    if (rowDate === date && status !== 'anulowana') {
      zajete.add(rezData[i][2]);
    }
  }

  // Zbierz blokady
  const zablokowane = new Set();
  let calodzienna = false;
  for (let i = 1; i < blkData.length; i++) {
    const rowDate = formatDate(blkData[i][0]);
    if (rowDate === date) {
      if (blkData[i][1] === 'ALL') { calodzienna = true; break; }
      zablokowane.add(blkData[i][1]);
    }
  }

  if (calodzienna) return jsonOK([]);

  const dostepne = CONFIG.SLOTS.filter(s => !zajete.has(s) && !zablokowane.has(s));
  return jsonOK(dostepne);
}

// =====================================================
// TWORZENIE REZERWACJI
// =====================================================

function createReservation(data) {
  const id = genId();
  const now = new Date();
  const sheet = getSheet(CONFIG.SHEETS.REZERWACJE);

  const row = [
    id,
    data.data,
    data.godzina,
    data.usluga,
    data.cena,
    data.imie_klienta,
    data.telefon,
    data.email,
    data.imie_psa,
    data.rasa || '',
    data.uwagi || '',
    'oczekuje',
    '',   // Notatki_Ola
    '',   // Co_robiono
    'nie',
    '',   // Metoda_platnosci
    Utilities.formatDate(now, 'Europe/Warsaw', 'yyyy-MM-dd HH:mm:ss')
  ];

  sheet.appendRow(row);

  // Wyślij email do klienta
  try { sendConfirmationEmail(data, id); } catch(e) { Logger.log('Email error: ' + e); }
  // Wyślij powiadomienie do Oli
  try { sendNotificationToOla(data, id); } catch(e) { Logger.log('Notif error: ' + e); }

  // Utwórz/aktualizuj profil psa
  if (data.imie_psa) {
    saveDog({ email: data.email, imie_psa: data.imie_psa, rasa: data.rasa || '', uwagi: data.uwagi || '' });
  }

  return jsonOK({ id, message: 'Rezerwacja zapisana' });
}

// =====================================================
// EMAIL DO KLIENTA
// =====================================================

function sendConfirmationEmail(data, id) {
  const usluga = USLUGI.find(u => u.id === data.usluga_id) || { nazwa: data.usluga };
  const subject = `✅ Potwierdzenie rezerwacji ${id} – hOla Perros`;

  const body = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { font-family: 'DM Sans', Arial, sans-serif; background: #FCFBF8; margin: 0; padding: 0; }
  .wrap { max-width: 560px; margin: 30px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
  .header { background: #2D2825; padding: 32px; text-align: center; }
  .header h1 { color: #B8922A; font-family: Georgia, serif; font-size: 28px; margin: 0; letter-spacing: 2px; }
  .header p { color: #E49FB3; margin: 6px 0 0; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; }
  .body { padding: 36px 40px; }
  .id-box { background: #F4F1ED; border-left: 4px solid #B8922A; padding: 16px 20px; border-radius: 4px; margin-bottom: 28px; }
  .id-box .id { font-size: 22px; font-weight: 700; color: #B8922A; letter-spacing: 2px; }
  .id-box .label { font-size: 11px; text-transform: uppercase; color: #7A7571; letter-spacing: 1px; }
  .details table { width: 100%; border-collapse: collapse; }
  .details td { padding: 10px 0; border-bottom: 1px solid #EBE5DF; font-size: 15px; }
  .details td:first-child { color: #7A7571; width: 40%; }
  .details td:last-child { color: #2D2825; font-weight: 500; }
  .footer-block { background: #F4F1ED; padding: 24px 40px; text-align: center; }
  .footer-block p { color: #7A7571; font-size: 13px; margin: 4px 0; }
  .footer-block a { color: #B8922A; text-decoration: none; }
  .cta { display: inline-block; margin-top: 20px; background: #E49FB3; color: #2D2825; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>hOla Perros</h1>
    <p>Ekskluzywny Groomer w Raciborzu</p>
  </div>
  <div class="body">
    <p style="color:#2D2825;font-size:16px;">Cześć <strong>${data.imie_klienta}</strong>! 🐾</p>
    <p style="color:#7A7571;font-size:15px;line-height:1.7;">Twoja rezerwacja została przyjęta. Poniżej znajdziesz wszystkie szczegóły.</p>

    <div class="id-box">
      <div class="label">Numer rezerwacji</div>
      <div class="id">${id}</div>
    </div>

    <div class="details">
      <table>
        <tr><td>📅 Data</td><td>${data.data}</td></tr>
        <tr><td>⏰ Godzina</td><td>${data.godzina}</td></tr>
        <tr><td>✂️ Usługa</td><td>${data.usluga}</td></tr>
        <tr><td>🐶 Piesek</td><td>${data.imie_psa}</td></tr>
        <tr><td>💰 Cena</td><td>${data.cena} zł</td></tr>
      </table>
    </div>

    <p style="margin-top:24px;color:#7A7571;font-size:14px;line-height:1.7;">
      Jeśli potrzebujesz zmienić lub anulować rezerwację, skontaktuj się z nami najpóźniej na <strong>24 godziny przed wizytą</strong>.
    </p>
    <a href="tel:+48512501558" class="cta">📞 +48 512 501 558</a>
  </div>
  <div class="footer-block">
    <p><strong>hOla Perros</strong> – ul. Opawska 67, 47-400 Racibórz</p>
    <p><a href="https://www.instagram.com/holaperros_salon">@holaperros_salon</a></p>
    <p style="margin-top:12px;font-size:11px;">Do zobaczenia! 🐾</p>
  </div>
</div>
</body>
</html>`;

  MailApp.sendEmail({
    to: data.email,
    subject: subject,
    htmlBody: body,
    name: 'hOla Perros Racibórz'
  });
}

function sendNotificationToOla(data, id) {
  const email = CONFIG.EMAIL_OLA;
  if (!email) return;
  MailApp.sendEmail({
    to: email,
    subject: `🐾 Nowa rezerwacja ${id} – ${data.data} ${data.godzina}`,
    htmlBody: `<p><strong>Nowa rezerwacja!</strong></p>
      <p>ID: ${id}<br>
      Data: ${data.data} ${data.godzina}<br>
      Klient: ${data.imie_klienta} (${data.email}, ${data.telefon})<br>
      Piesek: ${data.imie_psa} (${data.rasa})<br>
      Usługa: ${data.usluga}<br>
      Cena: ${data.cena} zł</p>
      <p>Uwagi: ${data.uwagi || 'brak'}</p>`,
    name: 'System hOla Perros'
  });
}

// =====================================================
// AKTUALIZACJA REZERWACJI (panel Oli)
// =====================================================

function updateReservation(data) {
  const sheet = getSheet(CONFIG.SHEETS.REZERWACJE);
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      if (data.status !== undefined)          sheet.getRange(i+1, 12).setValue(data.status);
      if (data.notatki_ola !== undefined)     sheet.getRange(i+1, 13).setValue(data.notatki_ola);
      if (data.co_robiono !== undefined)      sheet.getRange(i+1, 14).setValue(data.co_robiono);
      if (data.zaplacono !== undefined)       sheet.getRange(i+1, 15).setValue(data.zaplacono);
      if (data.metoda_platnosci !== undefined) sheet.getRange(i+1, 16).setValue(data.metoda_platnosci);
      if (data.cena !== undefined)            sheet.getRange(i+1, 5).setValue(data.cena);

      // Jeśli opłacono → dodaj do finansów
      if (data.zaplacono === 'tak' && data.cena) {
        addFinance({
          data: rows[i][1],
          id_rezerwacji: data.id,
          kwota: data.cena,
          typ: 'usługa',
          opis: rows[i][3] + ' – ' + rows[i][8],
          metoda: data.metoda_platnosci || 'gotówka'
        });
      }
      return jsonOK('Zaktualizowano');
    }
  }
  return jsonErr('Nie znaleziono rezerwacji: ' + data.id);
}

// =====================================================
// LISTA REZERWACJI
// =====================================================

function getReservations(params) {
  const sheet = getSheet(CONFIG.SHEETS.REZERWACJE);
  const rows  = sheet.getDataRange().getValues();
  const headers = rows[0];
  let result = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r[0]) continue;

    const obj = {};
    headers.forEach((h, idx) => { obj[h] = r[idx]; });

    // Filtrowanie
    if (params.date && formatDate(r[1]) !== params.date) continue;
    if (params.month) {
      const d = new Date(r[1]);
      const ym = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
      if (ym !== params.month) continue;
    }
    if (params.status && r[11] !== params.status) continue;

    result.push(obj);
  }

  // Sortuj po dacie + godzinie
  result.sort((a, b) => {
    const da = a['Data'] + ' ' + a['Godzina'];
    const db = b['Data'] + ' ' + b['Godzina'];
    return da < db ? -1 : 1;
  });

  return jsonOK(result);
}

// =====================================================
// BLOKADY
// =====================================================

function blockDate(data) {
  const sheet = getSheet(CONFIG.SHEETS.BLOKADY);
  const godzina = data.godzina || 'ALL';
  sheet.appendRow([data.data, godzina, data.powod || '']);
  return jsonOK('Zablokowano');
}

function unblockDate(data) {
  const sheet = getSheet(CONFIG.SHEETS.BLOKADY);
  const rows  = sheet.getDataRange().getValues();
  for (let i = rows.length - 1; i >= 1; i--) {
    const rowDate = formatDate(rows[i][0]);
    if (rowDate === data.data && (data.godzina === undefined || rows[i][1] === data.godzina)) {
      sheet.deleteRow(i + 1);
    }
  }
  return jsonOK('Odblokowano');
}

function getBlocked() {
  const sheet = getSheet(CONFIG.SHEETS.BLOKADY);
  const rows  = sheet.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0]) result.push({ data: formatDate(rows[i][0]), godzina: rows[i][1], powod: rows[i][2] });
  }
  return jsonOK(result);
}

// =====================================================
// PIESKI
// =====================================================

function saveDog(data) {
  const sheet = getSheet(CONFIG.SHEETS.PIESKI);
  const rows  = sheet.getDataRange().getValues();
  const now   = Utilities.formatDate(new Date(), 'Europe/Warsaw', 'yyyy-MM-dd');

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.email && rows[i][1] === data.imie_psa) {
      if (data.uwagi_behawioralne !== undefined) sheet.getRange(i+1, 4).setValue(data.uwagi_behawioralne);
      if (data.alergie !== undefined)            sheet.getRange(i+1, 5).setValue(data.alergie);
      if (data.notatki !== undefined)            sheet.getRange(i+1, 6).setValue(data.notatki);
      if (data.rasa !== undefined)               sheet.getRange(i+1, 3).setValue(data.rasa);
      sheet.getRange(i+1, 7).setValue(now);
      return jsonOK('Piesek zaktualizowany');
    }
  }

  // Nowy piesek
  sheet.appendRow([
    data.email, data.imie_psa, data.rasa || '',
    data.uwagi_behawioralne || data.uwagi || '',
    data.alergie || '', data.notatki || '', now
  ]);
  return jsonOK('Piesek dodany');
}

function getDog(email) {
  if (!email) return jsonErr('Brak emaila');
  const sheet = getSheet(CONFIG.SHEETS.PIESKI);
  const rows  = sheet.getDataRange().getValues();
  const headers = rows[0];
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === email) {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = rows[i][idx]; });
      result.push(obj);
    }
  }
  return jsonOK(result);
}

// =====================================================
// FINANSE
// =====================================================

function addFinance(data) {
  const sheet = getSheet(CONFIG.SHEETS.FINANSE);
  const rows  = sheet.getDataRange().getValues();

  // Sprawdź czy już istnieje wpis dla tej rezerwacji
  if (data.id_rezerwacji) {
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][2] === data.id_rezerwacji && rows[i][4] === 'usługa') return jsonOK('Już istnieje');
    }
  }

  const id = 'F-' + Date.now();
  sheet.appendRow([id, data.data, data.id_rezerwacji || '', data.kwota, data.typ || 'usługa', data.opis || '', data.metoda || 'gotówka']);
  return jsonOK({ id });
}

function getFinancesData(params) {
  const sheet = getSheet(CONFIG.SHEETS.FINANSE);
  const rows  = sheet.getDataRange().getValues();
  const headers = rows[0];
  let result = [], total = 0;

  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue;
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = rows[i][idx]; });

    if (params.month) {
      const d = new Date(rows[i][1]);
      const ym = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
      if (ym !== params.month) continue;
    }
    result.push(obj);
    total += Number(rows[i][3]) || 0;
  }
  return jsonOK({ entries: result, total });
}

// =====================================================
// STATYSTYKI
// =====================================================

function getStats() {
  const rezSheet = getSheet(CONFIG.SHEETS.REZERWACJE);
  const finSheet = getSheet(CONFIG.SHEETS.FINANSE);
  const rezRows  = rezSheet.getDataRange().getValues();
  const finRows  = finSheet.getDataRange().getValues();

  const today = formatDate(new Date());
  const now   = new Date();
  const currMonth = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');

  let dzisiaj = 0, miesiac = 0, przychod = 0, oczekuje = 0;

  for (let i = 1; i < rezRows.length; i++) {
    if (!rezRows[i][0]) continue;
    const d = formatDate(rezRows[i][1]);
    const ym = d.slice(0,7);
    const status = rezRows[i][11];
    if (d === today) dzisiaj++;
    if (ym === currMonth) miesiac++;
    if (status === 'oczekuje') oczekuje++;
  }

  for (let i = 1; i < finRows.length; i++) {
    if (!finRows[i][0]) continue;
    const d = new Date(finRows[i][1]);
    const ym = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
    if (ym === currMonth) przychod += Number(finRows[i][3]) || 0;
  }

  return jsonOK({ dzisiaj, miesiac, przychod, oczekuje });
}

// =====================================================
// METAMORFOZY (Google Drive + arkusz)
// =====================================================

function getMetamorfozyFolder() {
  const folders = DriveApp.getFoldersByName(CONFIG.DRIVE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  const folder = DriveApp.createFolder(CONFIG.DRIVE_FOLDER_NAME);
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return folder;
}

function uploadMetamorfoza(data) {
  if (!data.imageBase64) return jsonErr('Brak zdjęcia');

  // Dekoduj base64 (usuń prefix data:image/...;base64, jeśli jest)
  const base64 = data.imageBase64.replace(/^data:image\/\w+;base64,/, '');
  const contentType = data.contentType || 'image/jpeg';
  const ext = contentType.indexOf('png') > -1 ? 'png' : (contentType.indexOf('webp') > -1 ? 'webp' : 'jpg');
  const decoded = Utilities.base64Decode(base64);
  const blob = Utilities.newBlob(decoded, contentType, 'metamorfoza-' + Date.now() + '.' + ext);

  // Zapisz do Drive
  const folder = getMetamorfozyFolder();
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  const fileId = file.getId();

  // Niezawodny URL do hotlinkingu
  const url = 'https://drive.google.com/thumbnail?id=' + fileId + '&sz=w1200';

  // Zapis do arkusza
  const sheet = getSheet(CONFIG.SHEETS.METAMORFOZY);
  const id = 'M-' + Date.now();
  const dataStr = Utilities.formatDate(new Date(), 'Europe/Warsaw', 'yyyy-MM-dd');
  sheet.appendRow([id, fileId, url, data.tytul || '', data.rasa || '', data.opis || '', dataStr]);

  return jsonOK({ id, url });
}

function getMetamorfozy() {
  const sheet = getSheet(CONFIG.SHEETS.METAMORFOZY);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue;
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = rows[i][idx]; });
    result.push(obj);
  }
  // Najnowsze pierwsze
  result.reverse();
  return jsonOK(result);
}

function updateMetamorfoza(data) {
  const sheet = getSheet(CONFIG.SHEETS.METAMORFOZY);
  const rows = sheet.getDataRange().getValues();
  // Kolumny: ID(1) FileId(2) Url(3) Tytul(4) Rasa(5) Opis(6) Data(7)
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      if (data.tytul !== undefined) sheet.getRange(i+1, 4).setValue(data.tytul);
      if (data.rasa  !== undefined) sheet.getRange(i+1, 5).setValue(data.rasa);
      if (data.opis  !== undefined) sheet.getRange(i+1, 6).setValue(data.opis);
      return jsonOK('Zaktualizowano');
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}

function deleteMetamorfoza(data) {
  const sheet = getSheet(CONFIG.SHEETS.METAMORFOZY);
  const rows = sheet.getDataRange().getValues();
  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][0] === data.id) {
      // Usuń plik z Drive
      try { DriveApp.getFileById(rows[i][1]).setTrashed(true); } catch(e) {}
      sheet.deleteRow(i + 1);
      return jsonOK('Usunięto');
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}

// =====================================================
// BAZA PIESKÓW (ręczna kartoteka + historia wizyt)
// Kolumny: ID(1) FileId(2) Imie(3) Rasa(4) Wlasciciel(5) Telefon(6) Opis(7) Wizyty(8) DataDodania(9)
// =====================================================

function getPieskiFolder() {
  const name = 'hOla Perros - Pieski';
  const folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) return folders.next();
  const folder = DriveApp.createFolder(name);
  folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return folder;
}

function addPiesek(data) {
  const sheet = getSheet(CONFIG.SHEETS.BAZA_PIESKI);
  const id = 'P-' + Date.now();
  let fileId = '';
  if (data.imageBase64) {
    const base64 = data.imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const ct = data.contentType || 'image/jpeg';
    const ext = ct.indexOf('png') > -1 ? 'png' : (ct.indexOf('webp') > -1 ? 'webp' : 'jpg');
    const blob = Utilities.newBlob(Utilities.base64Decode(base64), ct, 'pies-' + Date.now() + '.' + ext);
    const file = getPieskiFolder().createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    fileId = file.getId();
  }
  const dataStr = Utilities.formatDate(new Date(), 'Europe/Warsaw', 'yyyy-MM-dd');
  sheet.appendRow([id, fileId, data.imie || '', data.rasa || '', data.wlasciciel || '', data.telefon || '', data.opis || '', '[]', dataStr]);
  return jsonOK({ id });
}

function getPieskiBaza() {
  const sheet = getSheet(CONFIG.SHEETS.BAZA_PIESKI);
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue;
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = rows[i][idx]; });
    // Parsuj wizyty
    try { obj.WizytyArr = JSON.parse(rows[i][7] || '[]'); } catch(e) { obj.WizytyArr = []; }
    result.push(obj);
  }
  result.reverse();
  return jsonOK(result);
}

function updatePiesek(data) {
  const sheet = getSheet(CONFIG.SHEETS.BAZA_PIESKI);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      if (data.imie       !== undefined) sheet.getRange(i+1, 3).setValue(data.imie);
      if (data.rasa       !== undefined) sheet.getRange(i+1, 4).setValue(data.rasa);
      if (data.wlasciciel !== undefined) sheet.getRange(i+1, 5).setValue(data.wlasciciel);
      if (data.telefon    !== undefined) sheet.getRange(i+1, 6).setValue(data.telefon);
      if (data.opis       !== undefined) sheet.getRange(i+1, 7).setValue(data.opis);
      return jsonOK('Zaktualizowano');
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}

function deletePiesek(data) {
  const sheet = getSheet(CONFIG.SHEETS.BAZA_PIESKI);
  const rows = sheet.getDataRange().getValues();
  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][0] === data.id) {
      if (rows[i][1]) { try { DriveApp.getFileById(rows[i][1]).setTrashed(true); } catch(e) {} }
      sheet.deleteRow(i + 1);
      return jsonOK('Usunięto');
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}

function addWizyta(data) {
  const sheet = getSheet(CONFIG.SHEETS.BAZA_PIESKI);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      let wizyty = [];
      try { wizyty = JSON.parse(rows[i][7] || '[]'); } catch(e) {}
      wizyty.push({ data: data.data, opis: data.opis || '', cena: data.cena || '' });
      // Sortuj malejąco po dacie
      wizyty.sort(function(a,b){ return a.data < b.data ? 1 : -1; });
      sheet.getRange(i+1, 8).setValue(JSON.stringify(wizyty));
      return jsonOK({ liczba: wizyty.length });
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}

function deleteWizyta(data) {
  const sheet = getSheet(CONFIG.SHEETS.BAZA_PIESKI);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.id) {
      let wizyty = [];
      try { wizyty = JSON.parse(rows[i][7] || '[]'); } catch(e) {}
      wizyty.splice(data.index, 1);
      sheet.getRange(i+1, 8).setValue(JSON.stringify(wizyty));
      return jsonOK({ liczba: wizyty.length });
    }
  }
  return jsonErr('Nie znaleziono: ' + data.id);
}
