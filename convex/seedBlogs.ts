import { mutation } from "./_generated/server";

/**
 * One-time mutation to seed 6 SEO-optimised blog posts.
 * Run from the Convex dashboard or via:
 *   npx convex run seedBlogs:seedBlogPosts
 */
export const seedBlogPosts = mutation({
  args: {},
  handler: async (ctx) => {
    const blogs = [
      // ─── Blog 1: Kedarnath from Odisha ────────────────────────────────
      {
        title: "Kedarnath Yatra from Odisha 2026 – Complete Guide for Odia Pilgrims",
        slug: "kedarnath-yatra-from-odisha-guide-2026",
        excerpt:
          "Planning a Kedarnath Yatra from Odisha? This comprehensive guide covers everything Odia pilgrims need to know – from Bhubaneswar departure schedules, Kedarnath temple darshan tips, packing essentials, to estimated costs for the 2026 season.",
        content: `## Kedarnath Yatra from Odisha – Your Ultimate 2026 Guide

Kedarnath Dham, nestled at 3,583 metres in the Garhwal Himalayas, is one of the twelve Jyotirlingas and the most sacred abode of Lord Shiva. Every year thousands of devotees from Odisha undertake this life-changing pilgrimage. If you're planning a **Kedarnath Yatra from Bhubaneswar, Cuttack, Balasore or anywhere in Odisha**, this guide is written specifically for you.

### Why Odia Pilgrims Love the Kedarnath Yatra

Odisha has a deep cultural connection to Shaivism. From the ancient Lingaraj Temple in Bhubaneswar to the Kedarnath peak in Uttarakhand, Odia devotees feel a special spiritual pull towards Mahadev. With **Ananda Rath's organised group tours**, you travel with fellow Odia pilgrims, enjoy home-cooked Odia food, and have an Odia-speaking guide throughout.

### Best Time to Visit Kedarnath from Odisha

The Kedarnath temple opens in **late April / early May** (on Akshaya Tritiya) and closes around **Bhai Dooj in November**. For Odisha pilgrims, the ideal months are:

- **May – June**: Temple just opened, moderate crowds, pleasant weather
- **September – October**: Post-monsoon, clear skies, thinner crowds
- **Avoid July–August**: Heavy rains and landslide risk on the trek route

### How to Reach Kedarnath from Bhubaneswar

**By Bus (Most Popular for Odia Groups)**
Ananda Rath operates **2x1 AC Sleeper Buses** directly from Bhubaneswar → Cuttack → Bhadrak → Balasore → Haridwar. The journey takes approximately 30-36 hours one way. This is the most comfortable and affordable option.

**By Train**
Bhubaneswar → Haridwar (Nandankanan Express or via Delhi). Then Haridwar → Rishikesh → Sonprayag by road. Not ideal for group travel.

**By Flight**
Bhubaneswar → Dehradun (Jolly Grant Airport). Then road to Sonprayag/Gaurikund.

### Kedarnath Trek – What to Expect

The trek from Gaurikund to Kedarnath is **16 km one way**. Options include:
- **On foot** – 6-8 hours, suitable for fit pilgrims
- **By pony/mule** – ₹3,000-5,000 one way
- **Palki (Doli)** – ₹6,000-12,000 one way
- **Helicopter** – ₹7,000-9,000 (from Phata/Sirsi, subject to weather)

### What to Pack for Kedarnath Yatra

- Warm jacket, thermal innerwear, monkey cap
- Comfortable trekking shoes (not chappals!)
- Rain poncho/windcheater
- Personal medicines, ORS, Diamox (altitude sickness)
- Torch/flashlight, power bank
- Light snacks: chuda, guda, biscuits

### Estimated Cost: Kedarnath Yatra from Odisha

| Component | Approx Cost |
|-----------|------------|
| Bus fare (AC Sleeper, return) | ₹6,000 – ₹8,000 |
| Hotel/Dharamshala (full trip) | ₹4,000 – ₹8,000 |
| Food (Odia veg meals) | ₹3,000 – ₹5,000 |
| Pony/Palki | ₹3,000 – ₹12,000 |
| **Total (approx)** | **₹16,000 – ₹33,000** |

With Ananda Rath's **all-inclusive packages starting at ₹19,499**, you save significantly compared to going independently.

### Spiritual Significance of Kedarnath

According to Hindu mythology, the **Pandavas** built the original Kedarnath Temple to seek Lord Shiva's forgiveness after the Kurukshetra war. The temple was restored by **Adi Shankaracharya** in the 8th century. The *lingam* here is a **Svayambhu** (self-manifested) *Jyotirlinga*, one of only 12 in the world.

### Tips for First-Time Odia Pilgrims

1. **Start physical preparation** 2-3 weeks before – walk daily
2. **Carry cash** – ATMs are unreliable in hill areas
3. **Register online** at the Uttarakhand Tourism portal for your yatra
4. **Stay hydrated** – altitude can cause headaches and nausea
5. **Travel in a group** – safer and more enjoyable

### Book Your Kedarnath Yatra with Ananda Rath

Ananda Rath has been organising **Kedarnath Yatra from Odisha since 2023**. Our packages include comfortable 2x1 AC Sleeper Bus, Odia home-cooked meals, experienced Odia-speaking guide, hotel stay, and photography support. Join us for a safe, spiritual, and memorable pilgrimage!

**📞 Call: 8249529220 / 8018958872**
**📧 Email: anandarathtours@gmail.com**

*Jai Bholenath! 🙏*`,
        cover_image: "https://images.unsplash.com/photo-1626621338321-3bf7a0e8d3da?w=1200&q=80",
        author: "Ananda Rath Team",
        category: "Yatra Guide",
        published_at: "2026-04-21",
        is_published: true,
      },

      // ─── Blog 2: Kedarnath Badrinath Combined ─────────────────────────
      {
        title: "Kedarnath Badrinath Yatra from Odisha – Do Dham Package, Route & Tips",
        slug: "kedarnath-badrinath-yatra-from-odisha-do-dham",
        excerpt:
          "Combine the divine darshan of Kedarnath (Lord Shiva) and Badrinath (Lord Vishnu) in one sacred Do Dham Yatra from Odisha. Complete route guide, costs, packing list, and how to book an organised Odia group tour.",
        content: `## Kedarnath Badrinath Do Dham Yatra from Odisha

The **Do Dham Yatra** combining Kedarnath and Badrinath is the most popular Uttarakhand pilgrimage for Odia devotees. In one trip, you receive the blessings of both **Lord Shiva** (Kedarnath) and **Lord Vishnu** (Badrinath) – the two supreme deities. This guide helps Odisha pilgrims plan the perfect Do Dham journey.

### Why Combine Kedarnath & Badrinath?

- Both temples are in the **Garhwal Himalayas**, relatively close to each other
- Save travel time, leave, and money by combining both in one 12-15 day trip
- Experience the full **Panch Kedar** region's spiritual energy
- Visit bonus destinations: **Rishikesh, Haridwar, Rudraprayag, Mana Village** (last Indian village before Tibet)

### Complete Do Dham Route from Bhubaneswar

**Day 1-2:** Bhubaneswar → Haridwar (by AC Sleeper Bus via NH-16 & NH-44)
**Day 3:** Haridwar → Guptkashi / Sitapur (by road, ~8 hrs)
**Day 4:** Guptkashi → Gaurikund → Kedarnath (16 km trek)
**Day 5:** Kedarnath Darshan → Return trek to Gaurikund
**Day 6:** Gaurikund → Rudraprayag → Joshimath (by road)
**Day 7:** Joshimath → Badrinath → Mana Village
**Day 8:** Badrinath Darshan → Joshimath
**Day 9:** Joshimath → Rishikesh
**Day 10:** Rishikesh sightseeing (Laxman Jhula, Parmarth Niketan, Ganga Aarti)
**Day 11:** Rishikesh → Haridwar (Har Ki Pauri Ganga Aarti) → Departure
**Day 12-13:** Return journey to Bhubaneswar

### Badrinath Temple – Quick Facts

- Located at **3,133 metres** in the Chamoli district
- One of the **Char Dham** and **108 Divya Desams**
- The black stone idol of Lord Vishnu is in a **meditative** posture
- **Tapt Kund** – natural hot spring near the temple for holy bath
- **Mana Village** (3 km away) – last Indian village, Vyas Gufa, Bhim Pul

### Cost Comparison: Independent vs. Organized Tour

| Expense | Independent | Ananda Rath Package |
|---------|-----------|-------------------|
| Bus (return) | ₹8,000 | ✅ Included |
| Hotels (12 nights) | ₹12,000 | ✅ Included |
| Food | ₹6,000 | ✅ Odia meals included |
| Local transport | ₹4,000 | ✅ Included |
| Guide | ₹0 (no guide) | ✅ Odia guide included |
| **Total** | **₹30,000+** | **₹19,499 onwards** |

### Essential Tips for Do Dham from Odisha

1. **Book early** – May departures fill up fast for Odia groups
2. **Acclimatize** – spend a day at Guptkashi before the Kedarnath trek
3. **Carry photocopies** of Aadhaar – required at multiple checkpoints
4. **Woollen clothes** are a must even in May – temperatures drop to 0°C at Kedarnath
5. **Medical fitness** – consult your doctor if you have heart/BP issues

### Spiritual Benefits of Do Dham

In Hindu tradition, visiting both **Kedarnath and Badrinath** in the same yatra is considered equivalent to completing a **Maha Punya** (great merit). The Skanda Purana says:

> *"He who visits Badri-Kedar in the same yatra, his sins of seven births are washed away."*

### Book Your Do Dham Yatra

Ananda Rath's **Kedarnath-Badrinath package** departs from Bhubaneswar with stops at Cuttack, Bhadrak, and Balasore. Everything is taken care of – you just need to bring your devotion!

**📞 Call Now: 8249529220 / 8018958872**

*Har Har Mahadev! Jai Badri Vishal! 🙏*`,
        cover_image: "https://images.unsplash.com/photo-1623070813305-e42e04032e93?w=1200&q=80",
        author: "Ananda Rath Team",
        category: "Yatra Guide",
        published_at: "2026-04-20",
        is_published: true,
      },

      // ─── Blog 3: Dwarika & 7 Jyotirlinga ─────────────────────────────
      {
        title: "Dwarika & 7 Jyotirlinga Yatra from Odisha – Complete Pilgrimage Guide",
        slug: "dwarika-7-jyotirlinga-yatra-from-odisha",
        excerpt:
          "Embark on a spiritual mega-tour covering Dwarikadheesh Temple and 7 sacred Jyotirlinga shrines across India. This guide helps Odia pilgrims plan the ultimate Dwarika-Jyotirlinga circuit with route, costs, and tips.",
        content: `## Dwarika & 7 Jyotirlinga Yatra from Odisha – The Ultimate Shiva Pilgrimage

For devoted Shaivites of Odisha, there is no greater pilgrimage than visiting the **12 Jyotirlingas** – the holiest shrines of Lord Shiva. While completing all 12 requires extensive travel, our specially designed **Dwarika + 7 Jyotirlinga Yatra** covers the most accessible and spiritually significant shrines in one magnificent journey.

### The 7 Jyotirlingas Covered in This Yatra

| # | Jyotirlinga | Location | Significance |
|---|-----------|----------|-------------|
| 1 | **Somnath** | Gujarat | First of the 12 Jyotirlingas, by the Arabian Sea |
| 2 | **Nageshwar** | Gujarat | Near Dwarika, Lord Shiva as protector from poison |
| 3 | **Omkareshwar** | Madhya Pradesh | Shaped like the sacred OM symbol on Mandhata island |
| 4 | **Mahakaleshwar** | Ujjain, MP | The only south-facing Jyotirlinga, famous Bhasma Aarti |
| 5 | **Trimbakeshwar** | Nashik, Maharashtra | Origin of River Godavari |
| 6 | **Bhimashankar** | Pune, Maharashtra | In the Sahyadri Hills, surrounded by dense forest |
| 7 | **Grishneshwar** | Aurangabad, Maharashtra | Nearest to Ellora Caves, last of the 12 Jyotirlingas |

### Bonus: Dwarkadhish Temple

Along with the 7 Jyotirlingas, this yatra includes the sacred **Dwarkadhish Temple** in Gujarat – the legendary kingdom of **Lord Krishna**. Standing on the shores of the Arabian Sea, Dwarika is one of the **Char Dham** of India and one of the **Sapta Puri** (seven holiest cities).

Highlights at Dwarika:
- **Dwarkadhish Temple** – 5-storey ancient temple with 60 columns
- **Nageshwar Jyotirlinga** – 12 km from Dwarika
- **Bet Dwarka** – island temple reached by boat, Krishna's actual residence
- **Sudama Setu** – the iconic bridge
- **Gomti River Ghat** – confluence with the Arabian Sea

### Route Map from Odisha

**Phase 1 – Western India:**
Bhubaneswar → (Bus/Train) → Ujjain (Mahakaleshwar) → Omkareshwar → Dwarika → Somnath → Nageshwar

**Phase 2 – Maharashtra Circuit:**
Somnath → Nashik (Trimbakeshwar) → Bhimashankar → Aurangabad (Grishneshwar + Ellora) → Return

### What Makes This Yatra Special for Odia Pilgrims?

- **Odia-speaking guide** who explains each Jyotirlinga's significance in Odia
- **Odia vegetarian food** – dalma, pakhala, saga, khichdi throughout the trip
- **2x1 AC Sleeper Bus** – comfortable overnight travel between cities
- **Group bhajans & kirtans** – sing Odia bhajans at each temple
- **Photography service** – professional photos at every Jyotirlinga

### Estimated Duration & Cost

- **Duration**: 15-18 days
- **Starting price**: ₹22,999 per person (all-inclusive)
- **Includes**: Transport, hotels, all meals, temple visits, guide

### Packing List

- Comfortable cotton clothes + 1 warm layer (for Bhimashankar hills)
- Temple-appropriate clothing (dhoti/saree for main darshan)
- Medicines, toiletries, and sunscreen
- Cash (₹10,000-15,000 for personal shopping)
- Smartphone + charger (bus has USB ports)

### Spiritual Significance

The **Shiva Purana** states that devotees who visit all 12 Jyotirlingas are freed from the cycle of birth and death. Even visiting 7 of them in a single yatra brings immense spiritual merit equivalent to **Ashwamedha Yagna**.

### Book Your Dwarika-Jyotirlinga Yatra

**📞 Call: 8249529220 / 8018958872**
**📧 Email: anandarathtours@gmail.com**
**🌐 WhatsApp: Click the button on our website**

*Om Namah Shivaya! 🙏*`,
        cover_image: "https://images.unsplash.com/photo-1621427644498-56e168a41f4b?w=1200&q=80",
        author: "Ananda Rath Team",
        category: "Yatra Guide",
        published_at: "2026-04-19",
        is_published: true,
      },

      // ─── Blog 4: Mathura Vrindavan from Odisha ────────────────────────
      {
        title: "Mathura Vrindavan Yatra from Odisha – Krishna Bhumi Pilgrimage Guide",
        slug: "mathura-vrindavan-yatra-from-odisha-krishna-bhumi",
        excerpt:
          "Visit the birthplace of Lord Krishna in Mathura and the enchanting Vrindavan where He played as a child. Complete Odia pilgrim's guide with must-visit temples, best time, route from Bhubaneswar, and organised tour packages.",
        content: `## Mathura Vrindavan Yatra from Odisha – Visit the Land of Lord Krishna

For devotees of **Jagannath Mahaprabhu** from Odisha, a pilgrimage to **Mathura and Vrindavan** holds deep spiritual significance. After all, Lord Jagannath is none other than Lord Krishna Himself! Walking the sacred streets where **Krishna leela** took place is a once-in-a-lifetime experience.

### Why Odia Pilgrims Must Visit Mathura-Vrindavan

In Odisha, we worship Lord Jagannath as the supreme deity. Mathura is where He was born as **Vasudev Krishna**, and Vrindavan is where He spent His childhood – playing with gopas, stealing butter, and enchanting everyone with His divine flute. For an Odia devotee, visiting Mathura-Vrindavan feels like visiting the original home of our beloved Jagannath.

### Must-Visit Temples in Mathura

1. **Shri Krishna Janmabhoomi** – The exact prison cell where Krishna was born
2. **Dwarkadhish Temple** – Stunning rajasthani architecture, dedicated to Krishna as king of Dwarika
3. **Vishram Ghat** – Where Krishna rested after killing Kansa
4. **Kusum Sarovar** – Beautiful ancient reservoir with cenotaphs
5. **Govardhan Hill** – Where Krishna lifted the mountain to protect his village (21 km parikrama)

### Must-Visit Temples in Vrindavan

1. **Banke Bihari Temple** – Most famous, the curtain (jhalar) opens and closes continuously
2. **ISKCON Temple (Sri Krishna-Balaram Mandir)** – Grand, international, powerful kirtans
3. **Prem Mandir** – Stunning white marble temple, magical at night with lighting
4. **Radha Raman Temple** – 500-year-old temple, self-manifested *shaligrama*
5. **Nidhivan** – Mystical forest where Krishna is said to still perform Raas Leela at night
6. **Seva Kunj** – Sacred garden, closes at sunset (no human stays after dark)
7. **Kesi Ghat** – Beautiful ghat on the Yamuna for morning prayers

### The Jagannath-Krishna Connection

Odia pilgrims visiting Vrindavan often experience a unique emotion – the same Lord they worship in Puri as **Jagannath** is worshipped here as the young, playful **Krishna**. The Banke Bihari Temple's deity has features remarkably similar to Lord Jagannath's form. Many devotees shed tears of joy realising the universal nature of their beloved Lord.

### Route from Bhubaneswar to Mathura

**By AC Sleeper Bus (Ananda Rath):**
Bhubaneswar → Cuttack → Bhadrak → Balasore → Kolkata bypass → Varanasi → Prayagraj → Agra → Mathura

**Duration:** ~28-30 hours one way

**Extended Itinerary (Most Popular):**
Many Odia groups combine Mathura-Vrindavan with:
- **Agra** (Taj Mahal) – only 54 km away
- **Prayagraj** (Triveni Sangam) – en route
- **Kashi / Varanasi** – en route
- **Ayodhya** (Ram Lalla) – nearby

### Best Time to Visit

- **Holi (March)** – Vrindavan's Holi is world-famous, played with flowers at Banke Bihari
- **Janmashtami (Aug/Sep)** – Krishna's birthday, midnight celebrations
- **Kartik month (Oct/Nov)** – Special parikrama season
- **Winter (Nov-Feb)** – Pleasant weather, comfortable darshan

### What to Eat (Odia Food Available!)

With Ananda Rath tours, you enjoy **Odia home-cooked meals** throughout. But Vrindavan also offers amazing *prasadam*:
- ISKCON temple serves free **sattvic lunch** daily
- Famous **Mathura ke pede** (milk sweets) – a must-buy
- **Lassi and samosa** at Vishram Ghat

### Package Details

| Feature | Details |
|---------|---------|
| Duration | 7-10 days |
| Starting Price | ₹12,999/person |
| Bus | 2x1 AC Sleeper |
| Meals | Odia veg food, 3 times daily |
| Guide | Odia-speaking |
| Extras | Photography, bhajan sessions |

### Book Your Krishna Bhumi Yatra

Experience the divine leela of Lord Krishna in person. Ananda Rath organises group departures from Bhubaneswar with all facilities for Odia pilgrims.

**📞 Call: 8249529220 / 8018958872**
**📧 Email: anandarathtours@gmail.com**

*Jai Shri Krishna! Jai Jagannath! 🙏*`,
        cover_image: "https://images.unsplash.com/photo-1627894006066-b45ec4c08d78?w=1200&q=80",
        author: "Ananda Rath Team",
        category: "Yatra Guide",
        published_at: "2026-04-18",
        is_published: true,
      },

      // ─── Blog 5: Top 10 Tirth Yatra from Odisha ──────────────────────
      {
        title: "Top 10 Tirth Yatra from Odisha by Bus – Best Pilgrimage Tours for Odia Devotees",
        slug: "top-10-tirth-yatra-from-odisha-bus-pilgrimage",
        excerpt:
          "Discover the top 10 most popular tirth yatra destinations for Odia pilgrims traveling by AC Sleeper Bus. From Kedarnath to Kashi, Dwarika to Rameshwaram – the ultimate list of spiritual journeys from Odisha.",
        content: `## Top 10 Tirth Yatra from Odisha by Bus

Odisha, the land of **Lord Jagannath**, has always been a state of deep spiritual devotion. Every year, thousands of Odia families embark on tirth yatra (pilgrimage) to sacred destinations across India. Here are the **top 10 most popular pilgrimage tours from Odisha** that every devotee should experience at least once.

### 1. 🏔️ Kedarnath Yatra
- **Where**: Uttarakhand (3,583m altitude)
- **Deity**: Lord Shiva (Jyotirlinga)
- **Duration from Odisha**: 12-14 days
- **Best for**: Shiva devotees seeking the ultimate Himalayan darshan
- **Highlight**: 16 km trek through stunning Himalayan landscapes

### 2. 🛕 Kashi (Varanasi) – Ayodhya Yatra
- **Where**: Uttar Pradesh
- **Deities**: Lord Vishwanath (Shiva) + Ram Lalla
- **Duration**: 6-8 days
- **Best for**: Combined Shiva-Vishnu darshan, Ganga snan
- **Highlight**: Evening Ganga Aarti at Dashashwamedh Ghat

### 3. 🏔️ Kedarnath-Badrinath (Do Dham) Yatra
- **Where**: Uttarakhand
- **Deities**: Lord Shiva + Lord Vishnu
- **Duration**: 14-16 days
- **Best for**: Those who want maximum spiritual merit in one trip
- **Highlight**: Two of the Char Dham in one journey

### 4. 🐚 Dwarika + Somnath Yatra
- **Where**: Gujarat
- **Deities**: Lord Krishna + Lord Shiva (Jyotirlinga)
- **Duration**: 10-12 days
- **Best for**: Krishna & Shiva devotees
- **Highlight**: Arabian Sea view temples, Bet Dwarka island

### 5. 💙 Mathura-Vrindavan Yatra
- **Where**: Uttar Pradesh
- **Deity**: Lord Krishna (Jagannath as child form)
- **Duration**: 7-10 days
- **Best for**: Jagannath/Krishna devotees, families
- **Highlight**: Banke Bihari darshan, Prem Mandir night view

### 6. 🔱 7 Jyotirlinga Mega Yatra
- **Where**: Gujarat + Maharashtra + Madhya Pradesh
- **Deity**: Lord Shiva (7 of 12 Jyotirlingas)
- **Duration**: 15-18 days
- **Best for**: Dedicated Shaivites wanting maximum Jyotirlinga darshan
- **Highlight**: Mahakaleshwar's Bhasma Aarti (4 AM)

### 7. 🌊 Char Dham Yatra (Uttarakhand)
- **Where**: Uttarakhand
- **Deities**: Yamunotri, Gangotri, Kedarnath, Badrinath
- **Duration**: 18-22 days
- **Best for**: Once-in-a-lifetime complete Himalayan pilgrimage
- **Highlight**: Source of Ganga and Yamuna rivers

### 8. 🙏 Tirupati Balaji Yatra
- **Where**: Andhra Pradesh
- **Deity**: Lord Venkateswara (Vishnu)
- **Duration**: 5-7 days
- **Best for**: Vishnu devotees, those seeking wish fulfillment
- **Highlight**: Richest temple in the world, powerful darshan

### 9. 🌺 Prayagraj (Triveni Sangam) Yatra
- **Where**: Uttar Pradesh
- **Deity**: Confluence of Ganga, Yamuna & Saraswati
- **Duration**: 3-5 days (usually combined with Kashi)
- **Best for**: Sacred dip at the sangam, pitru tarpan
- **Highlight**: Kumbh Mela ground, Hanuman Temple

### 10. 🏝️ Rameshwaram + Kanyakumari Yatra
- **Where**: Tamil Nadu
- **Deities**: Lord Shiva (Ramanathaswamy) + Devi Kumari
- **Duration**: 10-12 days
- **Best for**: South India pilgrimage, Ramayana trail
- **Highlight**: Temple with longest corridor in India, sunrise at Land's End

### Why Choose Ananda Rath for Your Tirth Yatra?

✅ **2x1 AC Sleeper Bus** – Spacious, USB charging, reclining seats
✅ **Odia Home-Cooked Food** – Dalma, pakhala, saga, khichdi
✅ **Odia Speaking Guide** – Explains every temple's significance in Odia
✅ **Professional Photography** – HD photos at every major spot
✅ **All-Inclusive Pricing** – No hidden charges
✅ **Medical Support** – First-aid kit, emergency contacts

### Book Any Yatra Today

**📞 Call: 8249529220 / 8018958872**
**📧 Email: anandarathtours@gmail.com**

*Choose your yatra. We'll handle the rest. 🙏*`,
        cover_image: "https://images.unsplash.com/photo-1544006659-f0b21884ce1f?w=1200&q=80",
        author: "Ananda Rath Team",
        category: "Travel Tips",
        published_at: "2026-04-17",
        is_published: true,
      },

      // ─── Blog 6: Why AC Sleeper Bus is Best ───────────────────────────
      {
        title: "Why AC Sleeper Bus is the Best Way to Travel for Tirth Yatra from Odisha",
        slug: "ac-sleeper-bus-best-tirth-yatra-odisha",
        excerpt:
          "Discover why Odia pilgrimage groups prefer 2x1 AC Sleeper Buses over trains and flights for tirth yatra. Comfort, affordability, group bonding, and door-to-door convenience explained.",
        content: `## Why AC Sleeper Bus is the Best Way for Tirth Yatra from Odisha

When planning a tirth yatra from Odisha, the biggest question after "where" is "how" — should you take a train, book flights, or go by bus? After organising hundreds of pilgrimages since 2023, Ananda Rath has found that the **2x1 AC Sleeper Bus** is overwhelmingly the preferred choice for Odia pilgrims. Here's why.

### What is a 2x1 AC Sleeper Bus?

A 2x1 configuration means there are **2 berths on one side and 1 berth on the other**, giving you more space than a regular 2x2 bus. Key features:

- **AC (Air Conditioned)** throughout the journey
- **Individual curtains** for privacy
- **Reading lights** and USB charging ports
- **Reclining seats** that convert to full beds
- **Spacious legroom** compared to regular buses

### 🚌 Bus vs. ✈️ Flight vs. 🚂 Train – Comparison

| Factor | AC Sleeper Bus | Train | Flight |
|--------|--------------|-------|--------|
| **Cost** | ₹6,000-8,000 return | ₹3,000-6,000 return | ₹8,000-15,000 return |
| **Convenience** | Door-to-door | Station to station | Airport to airport |
| **Luggage** | Unlimited | 40-70 kg | 15-20 kg |
| **Group travel** | ✅ Perfect | ❌ Hard to book 40+ seats | ❌ Very expensive |
| **Overnight travel** | ✅ Sleep while traveling | ⚠️ Sleeper class crowded | ❌ No overnight |
| **Flexibility** | ✅ Stop anywhere | ❌ Fixed stations | ❌ Fixed airports |
| **Bonding** | ✅ Group bhajans, fun | ❌ Limited | ❌ None |

### 7 Reasons Why Odia Pilgrims Prefer AC Sleeper Bus

#### 1. 💤 Sleep Through the Long Journey
The biggest advantage – you board in Bhubaneswar at 6 PM, sleep comfortably through the night, and wake up hundreds of kilometres closer to your destination. No wasted daylight hours!

#### 2. 🎒 No Luggage Restrictions
Trains and flights limit your luggage. On our buses, carry as many bags as you need – blankets, prasad, shopping bags, everything fits in the spacious cargo bay.

#### 3. 🎵 Group Bonding & Bhajans
On the bus, your entire group is together. Morning and evening bhajan sessions, singing *"Jagannath Swami Nayana Patha Gami..."* together – this bonding is the heart of a tirth yatra experience that trains and flights simply cannot offer.

#### 4. 🚏 Flexible Stops
Need a chai break at 4 AM? Want to stop at a beautiful temple spotted from the highway? Our driver stops wherever the group needs. Try asking a pilot to land for chai! 😄

#### 5. 💰 Most Affordable for Groups
For a group of 35-40 Odia pilgrims, the AC Sleeper Bus is **40-60% cheaper** than comparable train or flight arrangements. The savings can be spent on better hotels and darshan experiences.

#### 6. 🍛 Hot Odia Meals En Route
We plan stops at good restaurants and dhabas where our cook prepares **fresh Odia meals** – hot rice, dalma, saga bhaja, aloo bharta. On a train, you're stuck with stale pantry food. On a flight, you get peanuts.

#### 7. 🧳 Door-to-Door Pickup
Our buses pick up passengers from **Bhubaneswar, Cuttack, Bhadrak, and Balasore** – no need to reach an airport 3 hours early or navigate crowded railway stations.

### Safety Features of Our Buses

- **Dual drivers** – one rests while other drives
- **GPS tracked** – family can monitor location
- **Speed governors** – max 80 km/h for safety
- **Fire extinguisher** onboard
- **First-aid kit** and basic medicines
- **Emergency contact numbers** displayed

### Passenger Testimonials

> *"We were initially worried about 30 hours in a bus, but the 2x1 sleeper was so comfortable, we slept better than at home!"*
> — Ramesh Sahoo, Cuttack

> *"The bhajan sessions at 5 AM with the entire group gave me goosebumps. This can never happen on a train."*
> — Sunita Panda, Bhubaneswar

> *"My 70-year-old mother was comfortable throughout. The AC was perfect and the stops were well-timed."*
> — Prakash Jena, Balasore

### Bottom Line

For **tirth yatra from Odisha**, the 2x1 AC Sleeper Bus offers the perfect blend of **comfort, affordability, flexibility, and spiritual group experience**. It's not just transportation – it's an integral part of the pilgrimage itself.

### Ready to Experience the Best Pilgrimage Travel?

Book your next yatra with Ananda Rath and experience the comfort of our premium AC Sleeper Buses.

**📞 Call: 8249529220 / 8018958872**
**📧 Email: anandarathtours@gmail.com**

*Your comfortable spiritual journey starts here. 🙏🚌*`,
        cover_image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1200&q=80",
        author: "Ananda Rath Team",
        category: "Travel Tips",
        published_at: "2026-04-16",
        is_published: true,
      },
    ];

    const results = [];
    for (const blog of blogs) {
      // Check if slug already exists
      const existing = await ctx.db
        .query("blog_posts")
        .withIndex("by_slug", (q) => q.eq("slug", blog.slug))
        .first();

      if (!existing) {
        const id = await ctx.db.insert("blog_posts", {
          ...blog,
          created_at: Date.now(),
        });
        results.push({ slug: blog.slug, status: "created", id });
      } else {
        results.push({ slug: blog.slug, status: "already_exists" });
      }
    }

    return results;
  },
});
