/**
 * Nexoraa Studio - WhatsApp Outreach Templates
 * High-Converting Gujarati & Hinglish Personalized Messages
 * Founder: Milan Pandavadra (+91 73833 03388) | https://nexoraa.works
 */

const PRAY = '\u{1F64F}';
const WEB = '\u{1F310}';
const PHONE = '\u{1F4DE}';

export const whatsappTemplates = {
  // 1. Gyms & Fitness Centers
  gym: {
    gujarati: (b) => 
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

Aapna *${b.business_name}* no Google ane local market ma khub saro response che. Ame local Porbandar businesses mate high-speed mobile website ane digital branding banaviye chiye jethi direct navi gym memberships ane personal training inquiries aave.

Aapne 2 minute no time hoi to amaru portfolio share karu?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct WhatsApp: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

Aapke *${b.business_name}* ka local fitness me bahut accha naam hai. Hum Porbandar ke leading businesses ke liye premium mobile websites & lead funnels design karte hain taaki Instagram & Google se daily new member inquiries generate ho sake.

Agar aap convenient samjhein to main 2 minute me humara work share karu?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Warm regards, Milan Pandavadra`
  },

  // 2. Hotels, Beach Resorts & Dining
  hotel: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Manager Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* Porbandar/Madhavpur ma tourists ane guests mate ek prime property che. Ame hospitality properties mate direct booking landing page ane digital QR menu develop kariye chiye — jethi MakeMyTrip/Goibibo no 18-22% high commission bache ane direct room & banquet inquiries male.

Aapna convenient samaye ek nano call ke demo joye shako?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Manager Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ka Porbandar hospitality sector me premium naam hai. Hum hotels & resorts ke liye direct booking portals & digital menus banate hain jisse OTA platforms (MakeMyTrip wagera) ka 18-20% commission bachta hai aur direct room/banquet bookings aati hain.

Kya main 2 minute me humara live hospitality demo share kar sakta hoon?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Call/WA: +91 73833 03388

Regards, Milan Pandavadra`
  },

  // 3. Healthcare, Clinics & Doctors
  clinic: {
    gujarati: (b) =>
`Pranam Doctor / ${b.contact_person || 'Management'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ni healthcare services no Porbandar ma ghano viswas che. Ame doctors ane hospitals mate specialized fast patient appointment booking system ane professional clinic website banaviye chiye — jethi patients ne OPD timings, specialist doctor profile ane instant WhatsApp consultation booking mali shake.

Jo anukulta hoi to amaro healthcare portfolio share kari shaku?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Pranam Doctor / ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ki healthcare practice Porbandar me trusted maani jaati hai. Hum clinics & doctors ke liye smooth WhatsApp appointment systems & professional medical websites banate hain taaki patients ko direct OPD timings aur consult booking easily mil sake.

Agar aap free hon to kya main ek short demo portfolio share karu?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Regards, Milan Pandavadra`
  },

  // 4. Real Estate, Builders & Architects
  realestate: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* na Porbandar ma chal rahe residential/commercial projects khub impressive che. Ame builders ane architects mate modern project showcase websites, 3D plan brochure downloads ane direct buyer WhatsApp lead capture system banaviye chiye.

Aapna navi schemes mate ek quick portfolio review karvo hoi to janavso.
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ke Porbandar me chal rahe projects kafi reputed hain. Hum real estate developers & architects ke liye high-converting project landing pages & digital brochures banate hain jisse premium buyers se direct WhatsApp inquiries aati hain.

Aapke upcoming projects ke liye kya humara portfolio review karna chahenge?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Warm regards, Milan Pandavadra`
  },

  // 5. Retailers, Showrooms & Jewellers
  retail: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* no Porbandar market ma retail presence khub strong che. Ame local retail showrooms mate digital product catalogue, new arrival updates ane WhatsApp shopping catalog create kariye chiye — jethi local customers sidha mobile mathi latest collection joi ne order/inquiry kari shake.

Aapne anukul hoi to ek short demo link share karu?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ka Porbandar retail market me strong customer base hai. Hum retail showrooms & stores ke liye digital product catalogs & festive promo landing pages banate hain jisse customer direct mobile se collection dekh kar WhatsApp par order/inquiry kar sakte hain.

Kya main humara ek quick retail portfolio share karu?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Regards, Milan Pandavadra`
  },

  // 6. Education, Schools & Coaching Classes
  education: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Director Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* Porbandar ma vidhyarthio mate saru shikshan aapi rahyu che. Ame education institutes ane classes mate admission inquiry landing pages, result toppers showcase ane student registration portal design kariye chiye — jethi nava academic session ma admission leads vadhe.

Aapna anukule samaye amaru education portfolio share kari shaku?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ka Porbandar me educational contribution bahut accha hai. Hum coaching institutes & schools ke liye dedicated admission inquiry portals & topper result showcase websites design karte hain jisse upcoming session me direct parent admissions boost ho sakein.

Kya main humara education portfolio link share karu?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Regards, Milan Pandavadra`
  },

  // 7. Lifestyle, Salons, Spas & Beauty Parlours
  lifestyle: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Maam/Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* no grooming ane bridal work Porbandar ma khub popular che. Ame beauty salons ane studios mate bridal appointment booking pages, service pricing menu ane Instagram-connected WhatsApp booking setup banaviye chiye jethi wedding season ma VIP clients sidha advance booking kari shake.

Aapne anukulta hoi to amaru styling portfolio share karu?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Maam/Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ka styling & bridal makeover Porbandar me well known hai. Hum premium salons & artists ke liye digital bridal booking pages & service rate cards design karte hain taaki festive/wedding season me clients direct WhatsApp se slot book kar sakein.

Kya main humara live beauty & lifestyle demo share karu?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Warm regards, Milan Pandavadra`
  },

  // 8. Industrial, Manufacturing & GIDC Units
  industrial: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* Porbandar industrial sector ma ek reputed unit che. Ame manufacturing ane export-import units mate export-grade corporate websites, product technical specifications catalog ane global B2B buyer inquiry forms design kariye chiye.

Aapna corporate profile mate amaru portfolio share karu?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ka Porbandar industrial & manufacturing domain me strong reputation hai. Hum B2B manufacturing firms & exporters ke liye global-standard corporate websites & product spec catalogs build karte hain taaki domestic & international buyers se direct RFQ inquiries generate hon.

Kya main humara industrial portfolio share karu?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Regards, Milan Pandavadra`
  },

  // 9. Professional Services (CA, Advocates, Consultants)
  professional: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ni Porbandar ma professional consultancy khub prestigious che. Ame CA firms, advocates ane consultants mate corporate credibility portfolio, client consultation booking portal ane practice profile create kariye chiye.

Aapna anukule samaye amaru work share karu?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ka Porbandar professional circle me reputed standing hai. Hum CA firms, legal advisors & consultancies ke liye high-credibility digital profiles & consultation appointment funnels build karte hain.

Kya main humara recent work share kar sakta hoon?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Regards, Milan Pandavadra`
  },

  // Fallback default
  default: {
    gujarati: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Hu Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

Aapna *${b.business_name}* no Porbandar ma saro business presence che. Ame local businesses mate modern mobile websites, digital branding ane customer inquiry systems develop kariye chiye jethi direct mobile mathi customers vadhe.

Aapne anukul hoi to amaru portfolio share karu?
${WEB} Amaru Kaam: https://nexoraa.works
${PHONE} Direct: +91 73833 03388

Aabhar ${PRAY}`,

    hinglish: (b) =>
`Namaste ${b.contact_person || 'Sir'} ${PRAY}
Main Milan Pandavadra (Founder, Nexoraa Studio — Porbandar).

*${b.business_name}* ka Porbandar market me accha presence hai. Hum local businesses ke liye modern websites, branding & lead generation systems develop karte hain taaki mobile se direct customer leads increase ho sakein.

Kya main humara portfolio share karu?
${WEB} Portfolio: https://nexoraa.works
${PHONE} Contact: +91 73833 03388

Warm regards, Milan Pandavadra`
  }
};
