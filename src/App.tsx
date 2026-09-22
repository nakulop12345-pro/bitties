import { FormEvent, ReactNode, useState } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1692700695122-5c2af61082a4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=88&w=1800";
const storyImage =
  "https://images.unsplash.com/photo-1550791970-613acd0edf84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";

type IconName =
  | "arrow"
  | "heart"
  | "home"
  | "medical"
  | "menu"
  | "people"
  | "paw"
  | "rescue"
  | "shield"
  | "spark"
  | "x";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    medical: <><path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11Z" /><path d="M9 12h6m-3-3v6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
    paw: <><circle cx="8" cy="7" r="2" /><circle cx="16" cy="7" r="2" /><circle cx="5" cy="12" r="2" /><circle cx="19" cy="12" r="2" /><path d="M12 11c-3.2 0-5.5 3.1-5 6 .4 2.2 2.6 2.4 5 1.3 2.4 1.1 4.6.9 5-1.3.5-2.9-1.8-6-5-6Z" /></>,
    rescue: <><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    shield: <><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" /><path d="M12 8v4m0 4h.01" /></>,
    spark: <><path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
    x: <path d="M6 6l12 12M18 6 6 18" />,
  };
  return (
    <svg aria-hidden="true" fill="none" height={size} viewBox="0 0 24 24" width={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
      {paths[name]}
    </svg>
  );
}

const nav = [
  ["About", "about"],
  ["Dogs needing help", "dogs"],
  ["Adopt", "adopt"],
  ["Foster", "foster"],
  ["Volunteer", "volunteer"],
  ["Corporate", "partners"],
  ["Transparency", "transparency"],
];

function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <a className={`button ${secondary ? "button-secondary" : ""}`} href={href}>
      {children}
      <Icon name="arrow" size={18} />
    </a>
  );
}

function FormShell({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <form className="form-card" onSubmit={submit}>
      <div className="form-intro">
        <h3>{title}</h3>
        <p>{intro}</p>
      </div>
      {children}
      <button className="button form-submit" type="submit">
        {sent ? "Thank you — received" : "Submit interest"}
        <Icon name={sent ? "heart" : "arrow"} size={18} />
      </button>
      <p className="privacy-note">Your details will only be used to respond to this enquiry.</p>
    </form>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      <label><span>Name</span><input required aria-label="Name" placeholder="Your name" /></label>
      <label><span>Email</span><input required aria-label="Email" type="email" placeholder="you@example.com" /></label>
      <label className="contact-message"><span>Message</span><input required aria-label="Message" placeholder="How can we help?" /></label>
      <button type="submit" aria-label="Send message"><Icon name={sent ? "heart" : "arrow"} size={24} /></button>
    </form>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<"foster" | "volunteer">("foster");

  return (
    <div className="site-shell">
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Bitties home">
          <span className="brand-mark"><Icon name="paw" size={22} /></span>
          <span>BITTIES</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.slice(0, 5).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <a className="nav-cta" href="#report">Report a dog <Icon name="arrow" size={17} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <Icon name={menuOpen ? "x" : "menu"} />
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="button" href="#report" onClick={() => setMenuOpen(false)}>Report a dog</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-kicker"><span className="pulse-dot" /> A new student-led animal-welfare initiative</div>
            <h1>Every Paw Deserves a <em>Second Chance.</em></h1>
            <p className="hero-copy">We’re building a community where stray and abandoned dogs can find safety, care, loving foster homes, and permanent families.</p>
            <div className="hero-actions">
              <ButtonLink href="#report">Help a dog</ButtonLink>
              <ButtonLink href="#adopt" secondary>Adopt</ButtonLink>
            </div>
            <div className="trust-line">
              <span><Icon name="rescue" size={19} /> Honest from day one</span>
              <span><Icon name="people" size={19} /> Community powered</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="image-frame">
              <img src={heroImage} alt="A gentle dog looking toward the camera outdoors" />
              <div className="photo-credit">Photo by Vitalii Khodzinskyi / Unsplash</div>
            </div>
            <div className="floating-note">
              <span className="note-icon"><Icon name="heart" size={20} /></span>
              <div><strong>It starts with care.</strong><small>And grows with community.</small></div>
            </div>
            <div className="sun-shape" />
          </div>
        </section>

        <section className="ticker" aria-label="Our focus areas">
          {["Rescue coordination", "Veterinary assistance", "Safe foster homes", "Responsible adoption", "A caring community"].map((item) => (
            <span key={item}><Icon name="paw" size={15} /> {item}</span>
          ))}
        </section>

        <section className="section story" id="about">
          <div className="story-image">
            <img src={storyImage} alt="A dog standing on a quiet road in warm evening light" />
            <div className="story-badge"><strong>New initiative</strong><span>Starting from the ground up</span></div>
          </div>
          <div className="story-content">
            <SectionHeading eyebrow="Our beginning" title="Starting Small. Dreaming Big." />
            <p className="lead">Bitties was created by Nakul with a simple belief: being abandoned should never mean being forgotten.</p>
            <p>We’re starting from the ground up and working toward a community that can help dogs through rescue coordination, veterinary assistance, fostering, adoption, volunteering, and partnerships.</p>
            <p>Our goal is not to simply rescue dogs for a day. We want to help create a safer path from vulnerability to recovery and, whenever possible, a loving permanent home.</p>
            <a className="text-link" href="#mission">See how we plan to help <Icon name="arrow" size={18} /></a>
          </div>
        </section>

        <section className="section mission" id="mission">
          <SectionHeading eyebrow="What guides us" title="A circle of care, built together." copy="From the first call for help to a safe home, every step matters." center />
          <div className="mission-grid">
            {[
              ["rescue", "01", "Rescue", "Connect dogs in urgent situations with appropriate, experienced assistance."],
              ["medical", "02", "Recovery", "Support access to veterinary care, treatment, and rehabilitation."],
              ["home", "03", "Foster", "Connect dogs with safe, caring temporary homes while they recover."],
              ["heart", "04", "Adoption", "Help suitable dogs find responsible, loving permanent families."],
              ["people", "05", "Community", "Build a network of volunteers, organizations, and responsible supporters."],
            ].map(([icon, number, title, copy]) => (
              <article className="mission-card" key={title}>
                <span className="card-number">{number}</span>
                <span className="mission-icon"><Icon name={icon as IconName} size={25} /></span>
                <h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section cases" id="dogs">
          <div className="cases-head">
            <SectionHeading eyebrow="Dogs needing help" title="Every case will be real. Every detail, verified." copy="This space will share confirmed rescue cases without ever exposing a vulnerable animal’s precise location." />
            <a className="text-link" href="#report">Report a dog <Icon name="arrow" size={18} /></a>
          </div>
          <div className="empty-state">
            <div className="empty-illustration">
              <span><Icon name="paw" size={34} /></span>
              <i />
              <b />
            </div>
            <div><h3>No rescue cases have been added yet.</h3><p>Bitties is new, and we won’t create stories to fill a page. Verified cases will appear here when our work begins.</p></div>
            <ButtonLink href="#volunteer" secondary>Join our starting team</ButtonLink>
          </div>
        </section>

        <section className="section adopt" id="adopt">
          <div className="adopt-panel">
            <div className="adopt-copy">
              <SectionHeading eyebrow="Responsible adoption" title="Give a Home. Change a Life." />
              <p>Adoption is a lifelong promise to provide patience, safety, healthcare, and love. We’ll aim to match each dog thoughtfully — never quickly.</p>
              <blockquote>“Adoption is a commitment, not a purchase.”</blockquote>
            </div>
            <div className="adopt-listing">
              <div className="filter-bar">
                {["Age", "Size", "City", "Temperament", "Status"].map((filter) => <button key={filter}>{filter}<span>⌄</span></button>)}
              </div>
              <div className="listing-empty">
                <span><Icon name="home" size={28} /></span>
                <h3>No dogs are currently listed for adoption.</h3>
                <p>We’ll only publish profiles for real dogs who have been assessed and are ready for the right home.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section join" id="foster">
          <span className="anchor-target" id="volunteer" />
          <SectionHeading eyebrow="Make a difference" title="There’s more than one way to help." copy="A spare room, a useful skill, a few hours — each can change what’s possible for a dog." center />
          <div className="form-tabs" role="tablist">
            <button className={activeForm === "foster" ? "active" : ""} onClick={() => setActiveForm("foster")} role="tab">Become a foster</button>
            <button className={activeForm === "volunteer" ? "active" : ""} onClick={() => setActiveForm("volunteer")} role="tab">Volunteer with us</button>
          </div>
          {activeForm === "foster" ? (
            <FormShell title="Open your home, temporarily." intro="Fostering gives a dog a safe place to rest, recover, and learn while a permanent family is found.">
              <div className="form-grid">
                <label>Full name<input required name="name" placeholder="Your name" /></label>
                <label>Age<input required min="18" name="age" type="number" placeholder="Your age" /></label>
                <label>City<input required name="city" placeholder="Your city" /></label>
                <label>Email<input required name="email" type="email" placeholder="you@example.com" /></label>
                <label className="wide">Experience with dogs<textarea name="experience" placeholder="Tell us a little about your experience" /></label>
                <label>Available space<select name="space"><option>Choose one</option><option>Apartment</option><option>House with outdoor space</option><option>Other safe space</option></select></label>
                <label>Preferred type of dog<input name="preference" placeholder="Size, age, or needs" /></label>
                <label className="wide">Availability & additional information<textarea name="availability" placeholder="When are you available, and what else should we know?" /></label>
              </div>
            </FormShell>
          ) : (
            <div id="volunteer">
              <FormShell title="Bring what you do best." intro="Our starting community needs practical, creative, and compassionate people. No single kind of experience is required.">
                <div className="form-grid">
                  <label>Full name<input required name="name" placeholder="Your name" /></label>
                  <label>Age<input required min="16" name="age" type="number" placeholder="Your age" /></label>
                  <label>City<input required name="city" placeholder="Your city" /></label>
                  <label>Email<input required name="email" type="email" placeholder="you@example.com" /></label>
                  <label className="wide">Skills<input name="skills" placeholder="Photography, driving, social media, technology..." /></label>
                  <label className="wide">How would you like to help?<select name="role"><option>Choose an area</option><option>Rescue coordination</option><option>Transport</option><option>Photography</option><option>Social media</option><option>Website / technology</option><option>Adoption outreach</option><option>Foster care</option><option>Veterinary coordination</option><option>Community outreach</option></select></label>
                </div>
              </FormShell>
            </div>
          )}
        </section>

        <section className="partners" id="partners">
          <div className="section partners-inner">
            <div className="partners-copy">
              <p className="eyebrow light">Corporate partnerships</p>
              <h2>Together, We Can Give More Dogs a Second Chance.</h2>
              <p>We welcome conversations with responsible companies that want to help build better outcomes for dogs — through practical support, expertise, or employee involvement.</p>
              <a className="button button-gold" href="#partner-form">Partner with Bitties <Icon name="arrow" size={18} /></a>
            </div>
            <div className="support-grid">
              {["Dog food", "Veterinary assistance", "Medical supplies", "Transportation", "Technology", "Employee volunteering", "Awareness campaigns", "In-kind support"].map((item, i) => (
                <div key={item}><span>0{i + 1}</span>{item}</div>
              ))}
            </div>
            <p className="legal-note">Formal partnerships and financial arrangements will be subject to applicable legal and organizational requirements. No partnership is implied unless formally confirmed.</p>
            <div className="partner-form-wrap" id="partner-form">
              <FormShell title="Start a partnership conversation" intro="Tell us how your company may be able to support responsible animal-welfare work.">
                <div className="form-grid partner-form-grid">
                  <label>Company name<input required name="company" placeholder="Company name" /></label>
                  <label>Contact person<input required name="contact" placeholder="Full name" /></label>
                  <label>Work email<input required name="email" type="email" placeholder="name@company.com" /></label>
                  <label>Company website<input name="website" type="url" placeholder="https://" /></label>
                  <label className="wide">Type of support<select name="support"><option>Choose a type of support</option><option>Food or medical supplies</option><option>Veterinary assistance</option><option>Transport or equipment</option><option>Technology</option><option>Employee volunteering</option><option>Awareness campaign</option><option>Other in-kind support</option></select></label>
                  <label className="wide">Message<textarea required name="message" placeholder="Tell us what you have in mind" /></label>
                </div>
              </FormShell>
            </div>
          </div>
        </section>

        <section className="section impact" id="impact">
          <SectionHeading eyebrow="Our impact" title="Honest numbers, always." copy="Bitties is just beginning. These numbers will grow only when the work is real and verifiable." />
          <div className="impact-grid">
            {[["Dogs helped", "0"], ["Currently needing help", "0"], ["Successful adoptions", "0"], ["Active volunteers", "0"], ["Funds received", "₹0"], ["Funds spent", "₹0"]].map(([label, value]) => (
              <div className="impact-stat" key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <p className="verified"><Icon name="shield" size={19} /> We will never publish numbers we cannot verify.</p>
        </section>

        <section className="section transparency" id="transparency">
          <div>
            <SectionHeading eyebrow="Transparency" title="Trust should be visible." copy="As Bitties grows, this will be a clear record of the support we receive and how it is used." />
            <div className="transparency-status"><span><Icon name="spark" size={21} /></span><div><strong>Financial activity has not yet begun.</strong><p>Updates will appear here when there is verified activity to report.</p></div></div>
          </div>
          <div className="ledger">
            {["Income", "Veterinary expenses", "Food", "Equipment", "Transportation", "Corporate / in-kind support"].map((item) => (
              <div key={item}><span>{item}</span><strong>—</strong></div>
            ))}
          </div>
        </section>

        <section className="section report" id="report">
          <div className="report-copy">
            <p className="eyebrow">Rescue report</p>
            <h2>Seen a dog who may need help?</h2>
            <p>Share what you safely can. We’re building our response network, so a report does not guarantee immediate assistance — but accurate information helps us understand the situation.</p>
            <div className="safety"><Icon name="shield" size={25} /><p><strong>Your safety comes first.</strong> Please do not approach an aggressive, frightened, seriously injured, or dangerous animal yourself. Contact an experienced rescuer or veterinarian.</p></div>
          </div>
          <FormShell title="Report a dog" intro="Never include a precise public location. Details are reviewed privately.">
            <div className="form-grid">
              <label>City<input required name="city" placeholder="City" /></label>
              <label>General area<input required name="area" placeholder="Neighbourhood or landmark" /></label>
              <label className="wide">Situation<textarea required name="situation" placeholder="What did you observe?" /></label>
              <label>Urgency<select name="urgency"><option>Choose urgency</option><option>Immediate danger</option><option>Injured / unwell</option><option>Needs assessment</option></select></label>
              <label>Photo<input accept="image/*" name="photo" type="file" /></label>
              <label className="wide">Contact information<input required name="contact" placeholder="Phone or email" /></label>
              <label className="wide">Additional information<textarea name="additional" placeholder="Anything else that may help" /></label>
            </div>
          </FormShell>
        </section>

        <section className="section contact" id="contact">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2>Let’s build something compassionate.</h2>
          </div>
          <div className="contact-details">
            <p>Whether you want to help, collaborate, or simply ask a question, we’d be glad to hear from you.</p>
            <div><span>Founder</span><strong>Nakul</strong></div>
            <div><span>Email</span><a href="mailto:nakulop12345@gmail.com">nakulop12345@gmail.com</a></div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><Icon name="paw" size={22} /></span><span>BITTIES</span></a><p>Every Paw Deserves a Second Chance.</p><small>A new student-led animal-welfare initiative.</small></div>
          <div className="footer-links"><strong>Explore</strong>{nav.slice(0, 5).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div>
          <div className="footer-links"><strong>Information</strong><a href="#partners">Corporate partners</a><a href="#transparency">Transparency</a><a href="#contact">Contact</a><a href="#contact">Privacy</a><a href="#contact">Terms</a></div>
        </div>
        <div className="footer-bottom"><span>© 2025 Bitties. All rights reserved.</span><span>Built with care. Beginning with honesty.</span></div>
      </footer>
    </div>
  );
}

export default App;
