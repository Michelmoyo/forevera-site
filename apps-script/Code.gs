/**
 * Forevera store · Formulaire de démarrage du site forevera.io
 *
 * Mise en place (une seule fois) :
 * 1. Créer un Google Sheet, par exemple « Forevera - Demandes de démarrage ».
 * 2. Extensions → Apps Script → remplacer le contenu de Code.gs par ce fichier → Enregistrer.
 * 3. Choisir la fonction « initialiser » → Exécuter → autoriser l'accès.
 * 4. Déployer → Nouveau déploiement → Application Web
 *      Exécuter en tant que : Moi · Qui a accès : Tout le monde
 * 5. Copier l'URL de l'application Web (…/exec) dans config.js du site (formulaireUrl).
 *
 * Après une modification de ce fichier : Déployer → Gérer les déploiements → Modifier
 * → Nouvelle version, pour garder la même URL.
 *
 * Onglet « demandes » : une ligne par personne. Le même numéro WhatsApp renvoyé dans
 * les 7 jours met à jour sa ligne au lieu d'en créer une nouvelle.
 * Colonne « statut » : Qualifié (à contacter pour une rencontre), Plus tard, Client.
 * Colonnes « suivi » et « notes » : libres, pour votre suivi.
 */

// Doit être identique à formulaireJeton dans config.js. Ce n'est pas un secret fort
// (il est visible dans le site) : il écarte seulement les envois automatiques au hasard.
var TOKEN = 'fvd_UGxg4yJ2qJCQTrBv4NarPw';
var TZ = 'Africa/Kinshasa';
var ONGLET = 'demandes';
var JOURS_DOUBLON = 7;

var HEADERS = ['horodatage', 'statut', 'prenom', 'nom', 'whatsapp', 'commune', 'objectif', 'achat_pack',
  'temps_semaine', 'rencontre', 'connu_par', 'utm_source', 'utm_campaign', 'page', 'referrer',
  'user_agent', 'envois', 'suivi', 'notes'];

var STATUTS = ['Qualifié', 'Plus tard', 'Client'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (d.jeton !== TOKEN) return json({ ok: false, error: 'jeton' });
    var prenom = clean(d.prenom, 60), nom = clean(d.nom, 60), tel = clean(d.whatsapp, 16);
    if (!prenom || !nom) return json({ ok: false, error: 'nom' });
    if (!/^\+243[89]\d{8}$/.test(tel)) return json({ ok: false, error: 'whatsapp' });
    var statut = STATUTS.indexOf(d.statut) >= 0 ? d.statut : 'Plus tard';

    var values = {
      horodatage: stamp(), statut: statut, prenom: safe(prenom), nom: safe(nom), whatsapp: safe(tel),
      commune: safe(clean(d.commune, 60)), objectif: safe(clean(d.objectif, 60)), achat_pack: safe(clean(d.achat, 40)),
      temps_semaine: safe(clean(d.temps, 20)), rencontre: safe(clean(d.rencontre, 30)), connu_par: safe(clean(d.connu, 40)),
      utm_source: safe(clean(d.utm_source, 80)), utm_campaign: safe(clean(d.utm_campaign, 120)),
      page: safe(clean(d.page, 300)), referrer: safe(clean(d.referrer, 300)), user_agent: safe(clean(d.user_agent, 300))
    };

    var sheet = feuille();
    var row = doublon(sheet, tel);
    if (row) {
      var envois = Number(sheet.getRange(row, col('envois')).getValue()) || 1;
      values.envois = envois + 1;
      // On met à jour les réponses, sans toucher au suivi ni aux notes.
      HEADERS.forEach(function (h) {
        if (h === 'suivi' || h === 'notes' || values[h] === undefined) return;
        sheet.getRange(row, col(h)).setValue(values[h]);
      });
      return json({ ok: true, updated: true });
    }
    values.envois = 1;
    sheet.appendRow(HEADERS.map(function (h) { return values[h] !== undefined ? values[h] : ''; }));
    return json({ ok: true, created: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() { return json({ ok: true, service: 'Forevera - formulaire de démarrage' }); }

function feuille() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(ONGLET);
  if (!sheet) {
    var first = ss.getSheets()[0];
    if (first.getLastRow() === 0) { sheet = first; sheet.setName(ONGLET); }
    else sheet = ss.insertSheet(ONGLET);
  }
  var head = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (head.join('|') !== HEADERS.join('|')) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    // Couleurs du statut : vert = qualifié, jaune = plus tard, gris = client
    var plage = sheet.getRange(2, col('statut'), sheet.getMaxRows() - 1, 1);
    var regles = [['Qualifié', '#D9EAD3'], ['Plus tard', '#FFF2CC'], ['Client', '#EFEFEF']].map(function (r) {
      return SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(r[0]).setBackground(r[1]).setRanges([plage]).build();
    });
    sheet.setConditionalFormatRules(regles);
  }
  return sheet;
}

function doublon(sheet, tel) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var data = sheet.getRange(2, 1, last - 1, HEADERS.length).getDisplayValues();
  var p = col('whatsapp') - 1, h = col('horodatage') - 1;
  var limite = new Date(Date.now() - JOURS_DOUBLON * 864e5);
  for (var i = data.length - 1; i >= 0; i--) {
    if (String(data[i][p]).replace(/^'/, '') !== tel) continue;
    var quand = new Date(String(data[i][h]).replace(' ', 'T') + '+01:00');
    if (!isNaN(quand) && quand >= limite) return i + 2;
  }
  return 0;
}

function col(name) { return HEADERS.indexOf(name) + 1; }
function clean(v, max) { return String(v === undefined || v === null ? '' : v).replace(/[\r\n\t]+/g, ' ').trim().slice(0, max); }
// Empêche une valeur d'être lue comme une formule (et garde le + des numéros).
function safe(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; }
function stamp() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// À lancer une fois depuis l'éditeur (bouton Exécuter) pour créer l'onglet.
function initialiser() { feuille(); }
