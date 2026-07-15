/**
 * Designsystem: Editorial Modernism mit warmem Papier, präziser Typografie,
 * Active-Value-Grün und asymmetrischen, magazinartigen Kompositionen.
 * Jede visuelle Entscheidung stärkt Lesbarkeit, strategische Klarheit und Markenvertrauen.
 */
import { useEffect, useMemo, useState } from "react";

const ASSET_BASE = import.meta.env.BASE_URL;
const LOGO_URL = `${ASSET_BASE}assets/active-value-logo.png`;
const HERO_IMAGE_URL = `${ASSET_BASE}assets/buchmarkt-hero.webp`;

const trackedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "account"];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function ChapterMarker({ index }: { index: string }) {
  const [number, label] = index.split(" · ", 2);

  return (
    <div className="chapter-marker" aria-label={index}>
      <span className="chapter-number" aria-hidden="true">
        {number}
      </span>
      <span className="chapter-label" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}

function SectionHead({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-head" data-reveal>
      <ChapterMarker index={index} />
      <h2>{children}</h2>
    </div>
  );
}

function MailCta() {
  const href = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const tracking = trackedKeys
      .map((key) => [key, params.get(key)] as const)
      .filter((entry): entry is readonly [string, string] => Boolean(entry[1]));
    const trackingLine = tracking.length
      ? `\n\nReferenz: ${tracking.map(([key, value]) => `${key}=${value}`).join(" | ")}`
      : "";
    const body = `Hallo Anton,\n\nwir möchten die Management-Präsentation zum Buchmarkt anfragen.${trackingLine}\n\nViele Grüße`;
    return `mailto:anton.klees@active-value.de?subject=${encodeURIComponent("Management-Präsentation Buchmarkt")}&body=${encodeURIComponent(body)}`;
  }, []);

  const handleClick = () => {
    const params = new URLSearchParams(window.location.search);
    const tracking = Object.fromEntries(
      trackedKeys.filter((key) => params.get(key)).map((key) => [key, params.get(key)]),
    );
    const dataLayer = ((window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer ??= []);
    dataLayer.push({ event: "management_insight_cta_click", insight_id: "buchmarkt-01", ...tracking });
  };

  return (
    <a className="button" data-insight-id="buchmarkt-01" href={href} onClick={handleClick}>
      Präsentation anfragen
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const progress = useScrollProgress();
  useReveal();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tracking = Object.fromEntries(
      trackedKeys.filter((key) => params.get(key)).map((key) => [key, params.get(key)]),
    );
    const dataLayer = ((window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer ??= []);
    dataLayer.push({ event: "management_insight_view", insight_id: "buchmarkt-01", ...tracking });
  }, []);

  return (
    <div id="top" className="page-shell">
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <div className="progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Active Value – zum Seitenanfang">
            <img src={LOGO_URL} alt="Active Value" />
          </a>
          <div className="header-meta">
            <span className="series">Management Insights · #01 · Juli 2026</span>
            <a className="header-cta" href="#kontakt">
              Präsentation anfragen
            </a>
          </div>
        </div>
      </header>

      <main id="inhalt">
        <section className="hero" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy" data-reveal>
              <div className="kicker">Buchmarkt · Mediennutzung · Wertschöpfung</div>
              <h1 id="hero-title">Eine Grundannahme des Buchmarktes verliert gerade ihre Gültigkeit.</h1>
              <p className="hero-subline">
                Aktuelle deutsche Marktdaten und internationale Befunde zeigen: Vor allem junge
                Zielgruppen wechseln nicht einfach vom gedruckten Buch zu einem anderen Format. Sie
                lösen sich zunehmend vom langen, linearen Lesen als selbstverständlichem
                Alltagsritual. Damit steht nicht nur ein Absatzkanal infrage, sondern die bisherige
                Logik von Nutzung, Kundenzugang und Wertschöpfung.
              </p>
              <a className="scroll-link" href="#annahme">
                Die Argumentation lesen <span aria-hidden="true">↓</span>
              </a>
            </div>

            <figure className="hero-visual" data-reveal>
              <img
                src={HERO_IMAGE_URL}
                alt="Ein Buch bleibt hinter analogem TV-Graurauschen und gestörten Signallinien sichtbar."
                fetchPriority="high"
              />
              <figcaption>
                <strong>
                  Die entscheidende Nachricht liegt nicht in einer einzelnen Zahl, sondern im Muster
                  der Entwicklungen.
                </strong>
                <span>
                  Diese Kurzfassung macht das Muster sichtbar. Das vollständige Briefing überträgt
                  es auf das jeweilige Geschäftsmodell.
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section assumption" id="annahme">
          <div className="shell">
            <SectionHead index="01 · Die Annahme / strategische These">
              Wer den Inhalt besitzt, kontrolliert auch die Wertschöpfung. Diese Gleichung beginnt
              sich aufzulösen.
            </SectionHead>
            <p className="lead" data-reveal>
              Verlage verfügen weiterhin über Inhalte, Rechte, Programme und starke Autorenmarken.
              Doch ein wachsender Teil der entscheidenden Schnittstellen liegt inzwischen bei
              anderen Akteuren: Amazon und Audible organisieren Kauf und Nutzung, Spotify und weitere
              Streamingdienste besetzen neue Alltagssituationen, TikTok, YouTube und Creator prägen
              Aufmerksamkeit und Empfehlung, KI-Systeme beantworten Fragen, bevor ein Nutzer
              überhaupt eine Verlagsseite oder Buchhandlung erreicht.
            </p>
            <div className="thesis-box" data-reveal>
              <div className="label">Unsere These</div>
              <blockquote>
                Der Kunde war nie kontrollierbar. Neu ist, wie viel Einfluss auf Sichtbarkeit,
                Auswahl, Nutzung, Daten und Wiederkehr heute außerhalb des Verlages entsteht.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section" id="signale">
          <div className="shell">
            <SectionHead index="02 · Die Signale / Marktdaten">
              Junge Zielgruppen entfernen sich sichtbar vom klassischen Buchkauf.
            </SectionHead>
            <p className="lead" data-reveal>
              Junge Menschen verlieren nicht grundsätzlich das Interesse an Geschichten. Der klassische
              Buchmarkt erreicht sie jedoch nicht mehr selbstverständlich und nicht mehr in seiner
              gesamten Breite.
            </p>

            <div className="signal-grid">
              <article className="signal-card signal-card--wide" data-reveal>
                <div>
                  <div className="metric">
                    −30,6<span>%</span>
                  </div>
                  <div className="metric-context">
                    <span>Bezugsgröße</span>
                    <strong>Käuferzahl 2025 gegenüber 2024</strong>
                  </div>
                </div>
                <div>
                  <h3>Weniger Buchkäufer zwischen 10 und 15 Jahren</h3>
                  <p>
                    Veränderung 2025 gegenüber dem Vorjahr. Auch bei den 20- bis 29-Jährigen sank die
                    Käuferzahl um 17,8 Prozent.
                  </p>
                </div>
              </article>

              <article className="signal-card signal-card--audio" data-reveal>
                <div>
                  <div className="metric">
                    +13,2<span>%</span>
                  </div>
                  <div
                    className="donut"
                    role="img"
                    aria-label="Hörbuchmarkt: Streaming 47,2 Prozent, Download 47,4 Prozent und CD 5,3 Prozent."
                  />
                  <div className="legend" aria-hidden="true">
                    <span>Streaming 47,2 %</span>
                    <span>Download 47,4 %</span>
                    <span>CD 5,3 %</span>
                  </div>
                </div>
                <div>
                  <h3>Audio wächst zweistellig und ist nahezu vollständig digital</h3>
                  <p>
                    Streaming und Download stehen zusammen für rund 95 Prozent des
                    Hörbuchumsatzes.
                  </p>
                </div>
              </article>

              <article className="signal-card signal-card--compact" data-reveal>
                <div className="metric">
                  4,2 <small>Mio.</small>
                </div>
                <div>
                  <h3>Käufer digitaler Hörbücher</h3>
                  <p>
                    2020 waren es 2,6 Millionen. Die Nutzung wächst kontinuierlich, nicht nur in
                    einzelnen Saisons.
                  </p>
                </div>
              </article>
            </div>

            <aside className="signal-counter" data-reveal>
              <div className="label">Das Gegensignal präzisiert den Befund</div>
              <div>
                <strong>
                  Dort, wo Genres, Communities und neue Formen der Entdeckung funktionieren,
                  entstehen weiterhin starke Wachstumsfelder.
                </strong>
                <p>
                  Young und New Adult zeigen, dass Genres, Communities und neue Formen der
                  Entdeckung weiterhin Wachstum erzeugen können: Die Käuferzahl stieg seit 2021 von
                  3,0 auf 4,5 Millionen; New Adult legte 2025 beim Umsatz um 9,6 Prozent zu, Young
                  Adult um 4,8 Prozent.
                </p>
              </div>
            </aside>
            <div className="thesis-box" data-reveal>
              <div className="label">Unsere These</div>
              <blockquote>
                Der Buchmarkt verliert junge Käufer schneller, als er neue Nutzung erschließt.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section interpretation" id="interpretation">
          <div className="shell">
            <div className="split-copy interpretation-copy" data-reveal>
              <ChapterMarker index="03 · Die neue Nutzung" />
              <h2>
                Audio verändert nicht nur das Format, sondern die Nutzungssituation.
              </h2>
              <p>
                Ein E-Book verlagert das Lesen auf einen Bildschirm, verlangt aber weiterhin Zeit,
                Konzentration und lineare Aufmerksamkeit. Ein Hörbuch verändert dagegen die
                Verwendungssituation: Es kann unterwegs, beim Sport, im Auto oder parallel zu
                anderen Tätigkeiten genutzt werden.
              </p>
              <p>
                Der US-Markt zeigt diese Polarisierung früher und schärfer. Dort entfallen mehr als
                80 Prozent aller gelesenen Bücher auf rund 20 Prozent der Erwachsenen. Lesen
                konzentriert sich auf einen loyalen Kern, während ein breites Publikum Inhalte
                zunehmend über leichter zugängliche und in den Alltag integrierbare Formate
                aufnimmt.
              </p>
              <div className="source-note">
                US-Frühindikator auf Basis der im Atlantic-Beitrag zusammengeführten Erhebungen. Die
                Zahl wird nicht als deutsche Marktkennzahl verwendet.
              </div>
              <div className="thesis-box thesis-box--inverse">
                <div className="label">Unsere These</div>
                <blockquote>
                  Audio wächst nicht als Zusatzgeschäft. Es ersetzt zunehmend das klassische
                  Leseritual.
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="section economics" id="wirtschaft">
          <div className="shell">
            <SectionHead index="04 · Die Konsequenz / wirtschaftliche Lesart">
              Inhaltseigentum allein sichert weder Kundenzugang noch Wertschöpfung.
            </SectionHead>
            <p className="lead" data-reveal>
              Wenn Aufmerksamkeit, Empfehlung, Nutzung und Bezahlung zunehmend über Plattformen und
              fremde Schnittstellen organisiert werden, verändert sich die Rolle des Verlages. Er
              besitzt weiterhin den Inhalt, kontrolliert aber nicht automatisch den Zugang, die
              Nutzungsdaten, die wiederkehrende Kundenbeziehung oder die Bedingungen der
              Monetarisierung.
            </p>
            <div className="economics-grid">
              {[
                ["01", "Kundenzugang", "Wer stellt den ersten relevanten Kontakt zum Inhalt her?"],
                ["02", "Daten und Beziehung", "Wer versteht Nutzung, Präferenzen und Wiederkehr?"],
                ["03", "Marge und Geschäftsmodell", "Wer bestimmt Zugang, Preislogik und wirtschaftliche Beteiligung?"],
              ].map(([number, title, text]) => (
                <article className="economics-card" data-reveal key={number}>
                  <div className="num">{number}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
            <div className="thesis-box" data-reveal>
              <div className="label">Unsere These</div>
              <blockquote>
                Inhalte bleiben die Grundlage. Die wirtschaftliche Bedrohung entsteht dort, wo
                Plattformen Kundenzugang, Nutzungsdaten und Marge besetzen.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section value-section" id="wertschoepfung">
          <div className="shell">
            <SectionHead index="05 · Die Verschiebung / Wertschöpfung">
              Die Wertschöpfung verschiebt sich zu den Akteuren, die Aufmerksamkeit, Empfehlung und
              Nutzung organisieren.
            </SectionHead>
            <div className="value-intro">
              <p className="lead" data-reveal>
                Plattformen müssen Inhalte nicht selbst besitzen, um wirtschaftlich an ihnen zu
                partizipieren. Ihre Stärke liegt darin, Nachfrage zu bündeln, Empfehlungen zu
                steuern, Nutzung zu vereinfachen und Kundenbeziehungen dauerhaft zu besetzen.
              </p>
            </div>

            <ol className="value-flow" aria-label="Konzeptionelle Wertschöpfungskette" data-reveal>
              {[
                ["01", "Inhalte & Rechte", "Hier liegt die traditionelle Stärke der Verlage.", "primary"],
                ["02", "Erster Kontakt", "Plattformen, Communities und Creator prägen den ersten relevanten Impuls.", "shifted"],
                ["03", "Empfehlung", "Algorithmen und Creator gewinnen Einfluss auf die Auswahl.", "shifted"],
                ["04", "Nutzung", "Neue Rituale und Modelle bestimmen die Alltagstauglichkeit.", "shifted"],
                ["05", "Kundenbeziehung", "Direkter Zugang, Daten und Bindung sind nicht automatisch gesichert.", "shifted"],
              ].map(([number, title, text, variant]) => (
                <li className={`value-node ${variant}`} key={number}>
                  <div className="num">{number}</div>
                  <div>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </div>
                </li>
              ))}
            </ol>
            <div className="value-disclaimer" data-reveal>
              Konzeptionelle Darstellung, keine Messdaten. Sie zeigt die strategische Verschiebung
              zwischen den Stufen, nicht deren quantitativen Anteil.
            </div>
            <div className="thesis-box value-conclusion" data-reveal>
              <div className="label">Unsere These</div>
              <blockquote>
                Verlage besitzen weiterhin die entscheidenden Assets. Sie müssen diese Assets jedoch
                zunehmend in eigene Zugänge, Nutzungssituationen und wiederkehrende Beziehungen
                übersetzen.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="section executive-summary" id="fazit">
          <div className="shell">
            <div className="executive-summary-head" data-reveal>
              <div className="section-index closing-label">Fazit</div>
              <h2>Die Marktlogik verschiebt sich.</h2>
            </div>
            <div className="thesis-box thesis-box--summary" data-reveal>
              <blockquote>
                Junge Käufer brechen weg. Neue Nutzungsrituale entstehen. Plattformen besetzen den
                Kundenzugang. Entscheidend ist, welche Annahmen über Kunden, Produkte und
                Wertschöpfung weiterhin tragen.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="cta" id="kontakt">
          <div className="shell cta-grid">
            <div data-reveal>
              <div className="offer-heading">
                <div className="eyebrow closing-label">Angebot</div>
                <div className="offer-type">Individuell vorbereitete Management-Präsentation</div>
              </div>
              <h2>
                In 90 Minuten wird aus einer unübersichtlichen Marktbewegung eine belastbare
                Entscheidungsgrundlage für Ihr Haus.
              </h2>
              <p className="cta-intro">
                Wir führen die vollständige Datenlage zusammen, ordnen die wirtschaftliche Tragweite
                ein und übertragen die Entwicklung auf die öffentlich erkennbare Ausgangslage Ihres
                Unternehmens.
              </p>
              <div className="outcomes">
                {[
                  "Konsolidiertes Marktbild statt verteilter Einzelstudien",
                  "Einordnung der Folgen für Kundenzugang, Wertschöpfung und Geschäftsmodell",
                  "Erste unternehmensbezogene Perspektive und konkrete Managementfragen",
                  "Klare Grundlage für die Entscheidung, welche Weichen jetzt geprüft werden sollten",
                ].map((text, index) => (
                  <div key={text}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="contact-card" data-reveal>
              <div className="eyebrow">Angebot anfragen</div>
              <h3>Präsentation anfragen</h3>
              <p>
                Für Geschäftsführung, Verlagsleitung und die Verantwortlichen, die strategische
                Entscheidungen vorbereiten.
              </p>
              <div className="price-block" aria-label="Investition für die 90-minütige Management-Präsentation">
                <span>Investition</span>
                <strong>Preis auf Anfrage</strong>
                <small>90 Minuten · individuell vorbereitet</small>
              </div>
              <MailCta />
              <div className="contact-meta">
                Anton Klees
                <br />
                active value GmbH
                <br />
                <a href="mailto:anton.klees@active-value.de">anton.klees@active-value.de</a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="sources">
        <div className="shell sources-grid">
          <div>
            <div className="footer-brand">
              <img src={LOGO_URL} alt="Active Value" />
              <div className="footer-publisher">
                <span>Herausgeber</span>
                <strong>active value GmbH</strong>
                <small>Management Insights · Strategische Entscheidungsgrundlagen</small>
              </div>
            </div>
            <strong>Quellenbasis dieser Kurzfassung</strong>
            <p>
              Börsenverein des Deutschen Buchhandels, „Buchmarkt kompakt 2025/2026“, 9. Juli 2026;
              Rose Horowitch, „The End of Reading Is Here“, <em>The Atlantic</em>, August-Ausgabe
              2026, online veröffentlicht am 8. Juli 2026. Der Atlantic-Beitrag bündelt unter anderem
              Daten des National Endowment for the Arts und der American Time Use Survey. US-Daten
              werden hier ausdrücklich als Frühindikator und nicht als deutsche Marktkennzahl
              verwendet. Die Darstellung der Wertschöpfungskette ist konzeptionell und enthält keine
              Messwerte.
            </p>
          </div>
          <nav aria-label="Quellenlinks">
            <a
              href="https://www.boersenverein.de/markt-daten/marktforschung/wirtschaftszahlen/"
              target="_blank"
              rel="noreferrer"
            >
              Börsenverein: Wirtschaftszahlen ↗
            </a>
            <a
              href="https://www.theatlantic.com/magazine/2026/08/reading-crisis-postliterate-age/687618/"
              target="_blank"
              rel="noreferrer"
            >
              The Atlantic: Artikel ↗
            </a>
            <a href="#top">Nach oben ↑</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
