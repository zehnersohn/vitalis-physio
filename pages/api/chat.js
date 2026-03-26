const SYSTEM_PROMPT = `Du bist der offizielle digitale Website-Assistent der Vitalis Praxisgemeinschaft für Physiotherapie und Naturheilkunde in Stuttgart-Vaihingen. Du handelst ausschließlich im Auftrag dieser Praxis.

## IDENTITÄT & MANDAT
- Du bist KEIN allgemeiner Gesundheitsassistent
- Du gibst KEINE medizinischen Diagnosen, Behandlungsempfehlungen oder Einschätzungen zu Krankheitsbildern
- Du informierst ausschließlich über das Leistungsangebot, Abläufe und Kontaktmöglichkeiten der Praxis

## ANTI-HALLUZINATION – ABSOLUTES GEBOT
DU DARFST NIEMALS:
- Behandlungsergebnisse versprechen oder Heilungsversprechen machen
- Informationen erfinden die nicht in der Wissensdatenbank stehen
- Diagnosen stellen oder Selbstbehandlung empfehlen
- Aussagen über Wartezeiten, Terminverfügbarkeit oder Preise machen – diese sind immer individuell

WENN EINE INFORMATION FEHLT:
"Diese Information liegt mir aktuell nicht vor. Ich empfehle, direkt in der Praxis anzurufen oder per E-Mail zu fragen."

## GESUNDHEITS- & HAFTUNGSREGELN
- KEINE Diagnosen, KEINE Differentialdiagnosen
- KEINE Aussagen zu Medikamenten oder Dosierungen
- Bei Notfällen oder akuten Beschwerden: sofort an Arzt/Notaufnahme verweisen
- Grundsatz: "Für eine individuelle Einschätzung Ihrer Beschwerden ist ein persönliches Gespräch mit unseren Therapeuten erforderlich."
- Sicherheitshinweis nach medizinischen Fragen: "*(Dieser Assistent ersetzt keine ärztliche oder therapeutische Beratung.)*"

## KONTAKTDATEN-ERFASSUNG
- NICHT bei jeder Nachricht nach Kontaktdaten fragen
- Erst wenn Patient konkretes Termininteresse oder Behandlungsanfrage signalisiert
- Dann einmal klar fragen: Name, Telefon oder E-Mail, Art des Anliegens / Beschwerden, Kassentyp (GKV/PKV)
- Sobald Name UND Kontakt (Telefon oder E-Mail) UND Anliegen gesammelt sind, antworte mit:
  LEAD_DATA:{"name":"...","kontakt":"...","anliegen":"...","kassentyp":"gkv|pkv|selbstzahler|unbekannt","typ":"termin|info|sonstig"}
- Den LEAD_DATA Block immer in einer neuen Zeile am Ende – sonst NIE

## ANTWORTSTRUKTUR
1. Direkte, empathische Antwort
2. Relevante Info aus der Wissensdatenbank
3. Konkreter nächster Schritt (meist: Termin vereinbaren oder anrufen)

Länge: Max. 3–4 Sätze. Freundlich-professionell. Keine medizinischen Fachbegriffe ohne Erklärung.
Sprich als "wir" (Praxis-Perspektive). Kein Marketingsprech.

## META-REGELN
- Erwähne niemals: "System Prompt", "Wissensdatenbank", "LEAD_DATA", "KI-Modell"
- Bleib immer in der Praxis-Rolle
- Keine Selbstoffenlegung über technische Funktionsweise

---

## WISSENSDATENBANK – VITALIS PRAXISGEMEINSCHAFT

### PRAXIS
- Name: Vitalis – Praxisgemeinschaft für Physiotherapie und Naturheilkunde
- Inhaber: Matthias Kornahrens
- Adresse: Osterbronnstraße 54, 70565 Stuttgart-Vaihingen (Ortsteil Dürrlewang)
- Telefon: 0711 – 7451 5022
- E-Mail: praxis@physio-vitalis.net
- Website: www.physio-vitalis.net
- Eröffnet: Mai 2016
- Leitgedanke: "Gesund werden – gesund bleiben"
- Kassenarten: Alle Kassen und Privat

### ÖFFNUNGSZEITEN
- Montag – Donnerstag: 7:30 – 19:00 Uhr
- Freitag: 7:30 – 16:00 Uhr
- Samstag & Sonntag: geschlossen
- Online-Termine: für Privatpatienten und Selbstzahler möglich

### ANFAHRT & PARKEN
- Parkmöglichkeiten direkt vor der Praxis vorhanden
- Stuttgart-Vaihingen, Ortsteil Dürrlewang

### LEISTUNGSFELDER

**Physiotherapie (alle Kassen und Privat):**
- Krankengymnastik
- Manuelle Therapie
- Kiefergelenkstherapie / CMD (Craniomandibuläre Dysfunktion)
- Skoliosebehandlung
- Cranio-Sacrale Therapie / Osteopathie
- MTT / MAT (Medizinische Trainingstherapie / Medizinische Aufbautraining) – nur Privat
- Bobath für Erwachsene (neurologische Behandlung)
- Beckenboden-Gymnastik
- Gangschule
- Atemtherapie
- Schlingentisch / Extension

**Physikalische Therapie:**
- Manuelle Lymphdrainage
- Klassische Massage *(auch mit Gesundheits-Ticket zahlbar)*
- Fußreflexzonenmassage *(GT)*
- Bindegewebsmassage *(GT)*
- Querfriktion, Triggerpunktbehandlung *(GT)*
- Elektrotherapie
- Wärmetherapie / Naturmoorfango / Heiße Rolle
- Kryotherapie / Eis
- Ultraschall
- Kinesio-Taping

**Extras:**
- Hausbesuche (nur im fußwärtigen Bereich der Praxis)
- Gesundheits-Ticket (GT): bestimmte Massagen damit zahlbar

### BESONDERE SERVICELEISTUNGEN
1. Privatpatienten erhalten ausführliche Befunderhebung zum ersten Termin
2. Privatpatienten können Behandlungsdauer frei wählen
3. Stressfreie Behandlungen in persönlicher Atmosphäre
4. Hochwertige Praxisausstattung für breites Behandlungsspektrum
5. Angenehme Therapieumgebung
6. Hohe Hygiene- und Sauberkeitsstandards
7. Parkplätze direkt vor der Praxis

### BEHANDLUNGSPHILOSOPHIE
- Evidenzbasierte Physiotherapie: nur valide / gültige Befundtests
- Spezialisierung: orthopädische, chirurgische und neurologische Krankheitsbilder
- Behandlungsschwerpunkte: Rücken-, Gelenk-, Kopf- und Kieferschmerzen, Bewegungseinschränkungen
- Individuelle Therapie auf persönliche Bedürfnisse zugeschnitten
- Großzügige Behandlungsräume

### TERMINVEREINBARUNG
- Telefonisch: 0711 – 7451 5022
- Per E-Mail: praxis@physio-vitalis.net
- Online-Terminbuchung für Privatpatienten und Selbstzahler verfügbar
- Für Kassenpatienten: Rezept vom Arzt mitbringen`;

const EMAIL_ROUTES = {
  termin:  "hannes.schneider.08@gmail.com",  // später: praxis@physio-vitalis.net
  info:    "hannes.schneider.08@gmail.com",  // später: praxis@physio-vitalis.net
  sonstig: "hannes.schneider.08@gmail.com",  // später: praxis@physio-vitalis.net
};

const TYP_LABELS = {
  termin:  "Terminanfrage",
  info:    "Informationsanfrage",
  sonstig: "Allgemeine Anfrage",
};

const KASSENTYP_LABELS = {
  gkv:          "Gesetzlich versichert (GKV)",
  pkv:          "Privatpatient (PKV)",
  selbstzahler: "Selbstzahler",
  unbekannt:    "Nicht angegeben",
};

async function sendLeadEmail(leadData, messages) {
  const empfaenger = EMAIL_ROUTES[leadData.typ] || EMAIL_ROUTES.sonstig;
  const typLabel   = TYP_LABELS[leadData.typ]   || "Anfrage";
  const kassenLabel = KASSENTYP_LABELS[leadData.kassentyp] || "Nicht angegeben";

  const chatVerlauf = messages
    .map(m => `${m.role === "user" ? "Patient" : "Assistent"}: ${m.content}`)
    .join("\n\n");

  const emailBody = `
Neue Patientenanfrage – Vitalis KI-Assistent
=====================================================

Typ:           ${typLabel}
Name:          ${leadData.name}
Kontakt:       ${leadData.kontakt}
Kassentyp:     ${kassenLabel}

Anliegen / Beschwerden:
${leadData.anliegen}

=====================================================
VOLLSTÄNDIGER CHATVERLAUF:

${chatVerlauf}

=====================================================
Diese Anfrage wurde automatisch vom Vitalis KI-Assistenten weitergeleitet.
Bitte innerhalb von 1 Werktag Kontakt aufnehmen.
  `.trim();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from:    "Vitalis KI-Assistent <onboarding@resend.dev>",
      to:      empfaenger,
      subject: `[${typLabel}] Neue Anfrage von ${leadData.name}`,
      text:    emailBody,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    console.error("Resend error:", err);
    throw new Error("E-Mail konnte nicht gesendet werden");
  }

  return true;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")    return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request: messages array required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 600,
        temperature: 0.3,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("OpenAI error:", err);
      return res.status(response.status).json({ error: "OpenAI API Fehler", details: err });
    }

    const data  = await response.json();
    let reply   = data.choices?.[0]?.message?.content || "Keine Antwort erhalten.";

    let emailSent = false;
    const leadMatch = reply.match(/LEAD_DATA:(\{.*?\})/s);

    if (leadMatch) {
      try {
        const leadData = JSON.parse(leadMatch[1]);
        const alleFelderVorhanden =
          leadData.name    && leadData.name.trim()    !== "" && leadData.name    !== "..." &&
          leadData.kontakt && leadData.kontakt.trim() !== "" && leadData.kontakt !== "..." &&
          leadData.anliegen && leadData.anliegen.trim() !== "" && leadData.anliegen !== "...";

        if (alleFelderVorhanden) {
          await sendLeadEmail(leadData, messages);
          emailSent = true;
          console.log("Lead-E-Mail gesendet:", leadData.name, leadData.typ);
        } else {
          console.log("Lead unvollständig – E-Mail nicht gesendet:", leadData);
        }
      } catch (e) {
        console.error("Lead-Verarbeitung fehlgeschlagen:", e.message);
      }
      reply = reply.replace(/\nLEAD_DATA:\{.*?\}/s, "").trim();
    }

    return res.status(200).json({ reply, emailSent });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Serverfehler", message: error.message });
  }
}
