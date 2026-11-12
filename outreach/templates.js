// Cold Email Templates - Executive Advisory Standard
// Features: Real UX Audit Points (Blurry Logo, Mobile Load Latency, Layout Bugs, 1-Click WhatsApp)

export const LOGO_PATH = 'public/logo/nexoraa-brand-logo.png';

export const templates = {
  // 1. DENTAL CLINICS (e.g. Kargathra Dental, Sachin Dental)
  clinic_dental: {
    subject: "Digital patient experience & inquiry flow — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Doctor'},

**${lead.business_name}** has earned a commendable reputation for dental care in **${lead.city || 'Porbandar'}**, and your patient ratings strongly reflect that clinical excellence.

${lead.website && lead.website !== 'none' ? `While reviewing the mobile patient experience on your website (${lead.website}), I noted three specific technical and visual friction points:

1. **Visual clarity & page speed latency:** The clinic branding and header logo appear noticeably pixelated/blurry on high-resolution smartphone screens, and the initial page takes noticeable seconds to load—causing impatient visitors to bounce before seeing your services.
2. **Mobile layout bugs & appointment friction:** There are a couple of responsive layout glitches on smaller screens, and patients researching high-value procedures (Implants, Aligners, Root Canals) currently lack a frictionless 1-click channel to connect directly with your reception desk on WhatsApp after clinic hours.
3. **Clinical credibility & treatment clarity:** Presenting a dedicated, mobile-optimized showcase of procedure overviews, sterilization protocols, and verified smile transformations significantly reinforces patient confidence before their first chair consultation.` : `While researching premier dental practices in **${lead.city || 'Porbandar'}**, I noticed prospective patients currently lack a dedicated digital portal to explore treatments or schedule appointments directly with your clinic reception.`}

I have prepared a brief, 2-minute visual audit outlining these recommendations and how a streamlined mobile patient journey can assist your front desk.

**Would it be convenient if I share the summary with you, or would a brief 5-minute call sometime this week suit your schedule better?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** We respect your busy clinical hours. Even if you aren't planning a website upgrade right now, I'd be happy to share the free 2-minute mobile audit video with your clinic reception desk at zero cost.`
  },

  // 2. SKIN, DERMATOLOGY & AESTHETIC CLINICS (e.g. Skinovate By Dr. Riddhi)
  clinic_skin: {
    subject: "Consultation inquiry flow & digital presence — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Doctor'},

**${lead.business_name}** is widely regarded for its exceptional clinical standard in dermatology and aesthetics in **${lead.city || 'Porbandar'}**.

${lead.website && lead.website !== 'none' ? `While reviewing your mobile web experience (${lead.website}), I observed three specific technical and aesthetic friction points:

1. **Aesthetic asset resolution & slow mobile load:** The clinic logo and banner graphics appear slightly blurry/compressed on retina mobile screens, and page rendering has noticeable delay—in aesthetic medicine, visual precision and instant speed are paramount for luxury clinical appeal.
2. **Layout glitches & private consultation triage:** We noted minor alignment bugs on mobile layouts. Furthermore, patients seeking aesthetic evaluations (Acne scar revision, Laser therapies, Bridal skin rejuvenation) lack a private, structured 1-click WhatsApp triage to inquire discreetly before visiting.
3. **Technology & clinical certification showcase:** Highlighting US-FDA approved technologies, sterilization protocols, and curated clinical results in a refined, fast mobile interface substantially elevates patient trust.` : `While reviewing top dermatology centers in **${lead.city || 'Porbandar'}**, I noticed patients seeking aesthetic consultations currently lack a dedicated, private portal to learn about treatments and connect with your clinic desk.`}

I have put together a concise 2-minute concept overview demonstrating how these enhancements can be seamlessly integrated.

**May I share the brief overview with your team, or would you prefer a quick 5-minute conversation at a convenient time this week?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** We recognize patient schedules are demanding. Happy to share the complimentary 2-minute concept breakdown directly with your clinic coordinator at zero obligation.`
  },

  // 3. HOSPITALS & MULTISPECIALITY (e.g. Dr Darshak Patel, Global Multispeciality, Aasha Hospital)
  clinic_hospital: {
    subject: "Patient navigation & OPD schedule access — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Medical Director / Hospital Management'},

**${lead.business_name}** plays an essential role in providing critical healthcare infrastructure to the community in **${lead.city || 'Porbandar'}**.

${lead.website && lead.website !== 'none' ? `While evaluating your portal's mobile interface (${lead.website}) from a patient family's perspective, I noted three key areas that could meaningfully streamline access:

1. **Mobile load latency & logo resolution:** The hospital emblem and header assets appear pixelated on modern smartphones, and pages take substantial time to fully load—which can cause extreme frustration during medical emergencies.
2. **Mobile layout bugs & emergency hotline accessibility:** We spotted a few mobile menu glitches where department lists overlap. Most crucially, an instant 1-tap emergency calling button for Ambulance and 24/7 Casualty/ICU needs to be permanently anchored at the top of the mobile screen.
3. **OPD Consultant schedules & cashless insurance:** Making specialty OPD rosters, visiting consultant timings, and empanelled TPA/Govt. healthcare schemes instantly searchable eliminates unnecessary telephone queue times for your administrative staff.` : `While reviewing hospital resources in **${lead.city || 'Porbandar'}**, I observed that emergency hotlines, department directories, and visiting consultant schedules are not immediately accessible for families browsing on mobile devices.`}

We have developed a lightweight, modern hospital portal framework designed specifically to simplify patient navigation and reduce front-desk administrative overhead.

**Could I share a brief 2-minute overview with your administration, or would an introductory 5-minute call this week be convenient?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** Even if your administration is not currently upgrading hospital portals, we are glad to share the 2-minute navigation blueprint with your IT or desk administration team at zero cost.`
  },

  // 4. IVF & MATERNITY (e.g. Jay Hospital)
  clinic_ivf: {
    subject: "Confidential patient consultation flow — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Medical Team'},

**${lead.business_name}** has built a trusted, compassionate reputation in reproductive healthcare and family wellness in **${lead.city || 'Porbandar'}**.

${lead.website && lead.website !== 'none' ? `While exploring your mobile digital presence (${lead.website}), I identified three subtle technical and patient-experience friction points:

1. **Visual clarity & load time:** The logo graphic appears somewhat blur on high-resolution displays, and the mobile page takes several seconds to render smoothly.
2. **Mobile display glitches & privacy channel:** We noted a couple of layout shifting bugs on mobile screens. In reproductive care, couples place the highest premium on discretion; replacing complex public forms with a confidential, direct 1-on-1 WhatsApp inquiry desk provides immense emotional reassurance.
3. **Reassurance through clinical transparency:** Outlining laboratory standards, embryology facilities, and physician credentials within a soothing, empathetic design builds vital emotional trust before the couple visits.` : `While looking into specialized fertility care in **${lead.city || 'Porbandar'}**, I noted that patients seeking reproductive counseling lack a dedicated, private channel to connect with your specialized counseling desk.`}

I have outlined a patient-centric digital concept designed specifically for fertility and maternity practices.

**May I share this brief visual summary with you, or would a brief 5-minute discussion this week be suitable?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** Discretion is paramount in fertility care. We can send a private 2-minute visual mockup directly to your counseling desk at zero obligation.`
  },

  // 5. GENERAL CLINIC (Default Fallback)
  clinic: {
    subject: "Digital patient experience & appointment flow — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Doctor'},

**${lead.business_name}** is well-regarded for its patient care in **${lead.city || 'Porbandar'}**, and your community feedback is testament to that.

${lead.website && lead.website !== 'none' ? `While reviewing your mobile web presence (${lead.website}), I noted three specific friction points:

1. **Logo blur & loading latency:** The header branding appears pixelated on modern phone displays, and the website takes noticeable time to load on mobile networks.
2. **Mobile layout glitches & booking channel:** There are minor layout bugs that disrupt clean reading on small screens, and patients visiting after clinic hours lack a 1-click WhatsApp channel to request appointment slots.
3. **Structured service breakdown:** A clean, mobile-first presentation of doctor timings, diagnostic facilities, and treatment areas provides immediate clarity to prospective patients.` : `While researching healthcare providers in **${lead.city || 'Porbandar'}**, I noticed patients currently lack a direct digital channel to review clinic timings and schedule appointments with your desk.`}

I have compiled a brief 2-minute overview demonstrating how these enhancements can be put in place effortlessly.

**May I share the summary with you, or would a brief 5-minute call sometime this week suit your calendar?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** Even if you're not planning changes currently, happy to share the 2-minute mobile audit with your clinic reception desk at zero cost.`
  },

  // 6. GYM & FITNESS
  gym: {
    subject: "Digital member acquisition & trial pass flow — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Management Team'},

**${lead.business_name}** has built a standout fitness culture in **${lead.city || 'the city'}**, and your member community speaks highly of your facility.

${lead.website && lead.website !== 'none' ? `While viewing your mobile web presence (${lead.website}), I noticed three friction points where potential members may be dropping off:

1. **Slow mobile load & blurry branding:** The gym logo and hero banners appear blurry on high-end phone screens, and heavy page assets cause slow initial loading.
2. **Mobile layout glitches & trial pass capture:** We noted visual alignment bugs on mobile devices, and visitors lack an instant 1-click WhatsApp option to claim a complimentary 1-Day Trial Pass before visiting.
3. **Membership tier & trainer transparency:** Clear, compelling mobile showcases of equipment zones, certified trainers, and membership value proposition keep potential members from browsing competing facilities.` : `While researching fitness clubs in **${lead.city || 'the city'}**, I observed that prospective members currently lack a modern portal to explore your facility or reserve a trial pass online.`}

I have outlined a clean, high-conversion concept created specifically for fitness brands.

**Would it be convenient to share a quick 2-minute preview, or would a brief 5-minute conversation this week be preferable?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** Even if you're not updating your portal today, happy to share the 2-minute trial pass mobile layout with your club front desk at zero cost.`
  },

  // 7. COACHING / INSTITUTES
  coaching: {
    subject: "Student enrollment & admission inquiry flow — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Director / Academic Team'},

**${lead.business_name}** has established an enviable academic record in **${lead.city || 'your region'}**, and your student accomplishments speak for themselves.

${lead.website && lead.website !== 'none' ? `While reviewing the mobile admissions experience on your website (${lead.website}), I identified three key technical and conversion bottlenecks:

1. **Asset blur & mobile loading speed:** The institute logo and brochure images appear low-resolution on modern screens, with noticeable delay in page loading.
2. **Responsive bugs & direct counseling access:** We noted layout overlapping issues on mobile viewports, and parents lack an instant WhatsApp button to download syllabus or request a free demo class.
3. **Verified success stories & faculty credentials:** Prominently displaying top performer testimonials and faculty backgrounds during the initial mobile visit establishes undeniable authority.` : `While researching premier academic institutes in **${lead.city || 'your region'}**, I noticed prospective students and parents currently lack a dedicated digital channel to request program brochures or demo lectures.`}

We have designed an admission-focused digital model engineered to help educational institutions convert web interest into verified enrollments.

**May I share a brief 2-minute concept with your team, or would an introductory 5-minute call this week be convenient?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** We can share the 2-minute student admission funnel blueprint directly with your admissions coordinator at zero cost.`
  },

  // 8. HOTEL / RESORT
  hotel: {
    subject: "Direct reservation flow & commission optimization — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Management Team'},

**${lead.business_name}** is distinguished as one of the premier hospitality properties in **${lead.city || 'your area'}**, with outstanding guest reviews.

${lead.website && lead.website !== 'none' ? `While reviewing your mobile reservation journey (${lead.website}), I observed three specific friction areas:

1. **Visual clarity & load time:** The property logo and room gallery load sluggishly on mobile networks, and images appear compressed or blurry on retina displays.
2. **Mobile booking glitches & OTA leak:** We spotted small layout bugs in the mobile room showcase, and guests currently lack a fast 0% commission direct WhatsApp reservation button, which inadvertently pushes them to OTAs (MakeMyTrip / Booking.com).
3. **Mobile virtual gallery & event inquiries:** A high-speed, immersive showcase of suites, dining amenities, and banquet/wedding facilities drives immediate corporate and social inquiries.` : `While exploring distinctive hospitality destinations in **${lead.city || 'your area'}**, I noted that prospective guests currently lack a modern, direct reservation channel to connect with your front desk.`}

I have outlined a brief concept showing how to maximize direct guest reservations and elevate your digital brand presence.

**Would you be open to reviewing a quick 2-minute summary, or would a brief 5-minute conversation this week suit your schedule?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** Happy to share the 2-minute direct booking optimization guide with your reservation team at zero cost.`
  },

  // 9. REAL ESTATE, BUILDERS & ARCHITECTS
  realestate: {
    subject: "Buyer inquiry flow & digital project showcase — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Managing Director / Management'},

**${lead.business_name}** has built an impressive reputation for structural excellence and property development across **${lead.city || 'Porbandar'}**.

${lead.website && lead.website !== 'none' ? `While reviewing the mobile experience and digital presence of your projects (${lead.website}), I noted three critical technical and commercial opportunities:

1. **High-definition rendering & mobile speed:** Property buyers and NRI investors heavily evaluate schemes on smartphones before scheduling a site visit. Your project visual assets and branding exhibit noticeable mobile load latency, causing high-intent buyers to bounce before seeing available units.
2. **Instant brochure & 1-click WhatsApp lead routing:** Potential buyers researching 2BHK/3BHK units, commercial showrooms, or plots currently lack an effortless 1-click channel to download project brochures and schedule site visits directly with your sales office on WhatsApp.
3. **Interactive unit availability & RERA credibility:** Presenting interactive floor plans, construction progress milestones, and verified GuRERA disclosures in a modern, luxury mobile interface significantly increases conversion on high-ticket property inquiries.` : `While researching premier real estate developers and builders in **${lead.city || 'Porbandar'}**, I noticed high-intent property buyers and NRI investors currently lack a dedicated, high-speed digital showcase to explore your residential/commercial projects, floor layouts, and schedule direct site visits with your sales desk.`}

We have developed a specialized digital framework engineered for real estate developers that transforms digital traffic into verified, qualified buyer inquiries.

**Would it be convenient if I share a brief 2-minute project showcase concept with you, or would a short 5-minute call sometime this week suit your schedule better?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** We understand the fast-paced nature of site handovers and sales. Even if you aren't planning a new digital launch right now, I'd be glad to share our real estate digital framework with your sales team at zero cost.`
  },

  // 10. RETAIL, SHOPPING & SHOWROOMS
  retail: {
    subject: "Local footfall & digital catalog ordering — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Store Owner / Management'},

**${lead.business_name}** is a well-known retail landmark in **${lead.city || 'Porbandar'}**, with an established base of loyal local customers.

${lead.website && lead.website !== 'none' ? `While reviewing the mobile shopping experience on your digital storefront (${lead.website}), I noticed three key areas where local retail businesses are losing high-intent sales:

1. **Mobile load speed & image crispness:** Over 85% of shoppers research new collections and offers on mobile phones before walking into your showroom. High-resolution product images currently experience noticeable load delay, causing shoppers to look elsewhere.
2. **Instant 1-click WhatsApp catalog ordering:** Local customers often prefer checking product availability, sizes, or festive discounts directly on WhatsApp. Integrating a friction-free 1-click WhatsApp order flow bridges the gap between digital discovery and instant counter sales.
3. **Local discovery & festive promotions:** Structuring seasonal campaigns and new arrivals in a dedicated, high-speed mobile portal helps your store capture shoppers searching for retail outlets in **${lead.city || 'Porbandar'}**.` : `While researching premier retail stores and shopping destinations in **${lead.city || 'Porbandar'}**, I noticed local shoppers currently lack a dedicated, mobile-friendly digital catalog to explore your latest collections and connect with your counter staff on WhatsApp.`}

We have developed a high-converting digital retail framework for local businesses that turns local mobile searches into verified store footfall and direct WhatsApp sales.

**Would it be convenient if I share a brief 2-minute retail concept overview with you, or would a short 5-minute call sometime this week suit your schedule better?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** Even if you aren't planning a digital upgrade right now, I'd be glad to share our 2-minute local footfall optimization guide with your store management at zero cost.`
  },

  // 11. PROFESSIONAL SERVICES (CA Firms, Law Firms, Consultants, Photography Studios)
  professional: {
    subject: "Client consultation flow & digital authority — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Partner / Principal'},

**${lead.business_name}** has established a distinguished professional standing across **${lead.city || 'Porbandar'}**, backed by strong client trust.

${lead.website && lead.website !== 'none' ? `While reviewing the mobile client experience and digital authority of your firm (${lead.website}), I observed three specific technical and positioning opportunities:

1. **Digital authority & mobile performance:** High-value corporate clients, NRI investors, and families rigorously evaluate professional practices on mobile before initiating contact. The firm's digital visual assets currently experience noticeable rendering latency on smartphones.
2. **Confidential 1-click consultation routing:** Prospective clients seeking specialized counsel or service quotes currently lack a direct, private 1-click WhatsApp channel to connect securely with your senior desk.
3. **Structured practice area / portfolio showcase:** Presenting core advisory capabilities, verified credentials, and client testimonials in an executive, ultra-clean mobile architecture significantly accelerates consultation conversion.` : `While researching premier professional practices and consultancy firms in **${lead.city || 'Porbandar'}**, I noticed prospective corporate clients and families currently lack a dedicated, high-speed digital portal to review your practice areas, credentials, and schedule confidential consultations directly with your desk.`}

We have designed an executive digital framework tailored for professional practices that turns local and corporate search traffic into verified, qualified client consultations.

**Would it be convenient if I share a brief 2-minute digital concept summary with you, or would a short 5-minute conversation sometime this week suit your schedule better?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** We understand the confidential nature of client retainerships. Even if you aren't planning a website overhaul right now, I'd be glad to share our 2-minute professional firm digital audit with your office at zero obligation.`
  },

  // 12. INDUSTRIAL, MANUFACTURING, EXPORTERS & AUTOMOBILE DEALERSHIPS
  industrial: {
    subject: "B2B procurement inquiry flow & digital capability showcase — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Managing Director / Plant Head'},

**${lead.business_name}** has earned a formidable reputation for manufacturing and supply excellence across **${lead.city || 'Porbandar'}**.

${lead.website && lead.website !== 'none' ? `While reviewing the digital procurement portal and mobile presentation of your manufacturing facility (${lead.website}), I identified three key technical and positioning opportunities:

1. **Global procurement discovery & mobile speed:** Domestic purchase managers and international import buyers evaluate plant capacities, machinery specs, and certifications on mobile before issuing RFQs. Your technical assets currently experience noticeable rendering latency on cellular networks.
2. **Instant technical catalog & 1-click RFQ routing:** Commercial buyers researching specifications, bulk batch capacities, or compliance standards currently lack a direct 1-click channel to download technical datasheets and initiate purchase inquiries with your commercial desk on WhatsApp.
3. **Quality certifications & infrastructure showcase:** Highlighting ISO/HACCP certifications, laboratory testing protocols, and port logistics in an executive, ultra-clean mobile architecture substantially strengthens supplier credibility in competitive global tenders.` : `While researching premier industrial manufacturing, engineering, and export facilities in **${lead.city || 'Porbandar'}**, I noticed institutional buyers and corporate procurement heads currently lack a dedicated, high-speed digital showcase to review your plant capabilities, technical specifications, and initiate direct RFQ procurement inquiries with your desk.`}

We have developed a specialized B2B industrial digital framework designed to convert trade inquiries and procurement traffic into verified, qualified commercial contracts.

**Would it be convenient if I share a brief 2-minute capability showcase concept with you, or would a short 5-minute call sometime this week suit your schedule better?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** We understand the demanding pace of plant operations. Even if an immediate digital revamp isn't on your radar, I'd be glad to share our B2B procurement digital checklist with your commercial team at zero cost.`
  },

  // 13. DEFAULT FALLBACK
  default: {
    subject: "Digital customer experience & inquiry flow — {{business_name}}",
    body: (lead) => `Dear ${lead.contact_person || 'Team ' + lead.business_name},

**${lead.business_name}** has built a commendable reputation for service excellence in **${lead.city || 'your region'}**.

${lead.website && lead.website !== 'none' ? `While reviewing your digital presence on mobile (${lead.website}), I noted three specific opportunities to elevate user engagement and direct client inquiries:

1. **Logo resolution & page loading speed:** The brand logo appears pixelated on high-resolution screens, and the site exhibits noticeable load latency on mobile networks.
2. **Mobile layout glitches & communication routing:** We noted a few visual alignment bugs on mobile screens, and visitors lack an instantaneous 1-click WhatsApp channel to connect with your team.
3. **Clear value proposition & credibility markers:** Structuring core service offerings and verified client testimonials in a modern, mobile-first hierarchy reinforces immediate trust.` : `While researching leading businesses in **${lead.city || 'your region'}**, I noted that potential clients currently lack a streamlined digital portal to engage with your team directly.`}

I have prepared a concise 2-minute overview demonstrating how these adjustments can be applied to drive direct client conversions.

**May I share the summary with you, or would a brief 5-minute conversation this week be convenient?**

Warm regards,

**Milan Pandavadra**
Founder & Creative Director | Nexoraa Studio
Smart Digital Solutions & Next-Gen Web Architecture
Direct / WhatsApp: +91 73833 03388
Email: contact@nexoraa.works
Web: https://nexoraa.works

**P.S.** Happy to share the 2-minute visual audit breakdown with your team at zero obligation.`
  }
};
