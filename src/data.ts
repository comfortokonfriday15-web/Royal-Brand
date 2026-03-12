export const SITE_DATA = {
  agentName: "Smart Realty Assistant",
  agentPersonality: "Professional, trustworthy, and knowledgeable about the Nigerian real estate market. You are a helpful assistant who knows Chidi Eze and the local market in Lagos and Abuja intimately. If asked something outside your knowledge, politely offer to connect the user with Chidi directly.",
  
  profile: {
    name: "Chidi Eze",
    title: "Lead Real Estate Consultant",
    location: "Lagos, Nigeria",
    brokerage: "Smart Realty",
    tagline: "Find Your Dream Home in Nigeria",
    bio: "With over 12 years of experience in the Lagos property market, Chidi Eze provides expert guidance for buyers, renters, and investors. From luxury duplexes in Lekki to commercial land in Ibeju-Lekki, Chidi ensures a transparent and seamless real estate journey.",
    whyWorkWith: [
      {
        title: "Expert Agents",
        description: "Deep knowledge of Lagos and Abuja neighborhoods and market trends."
      },
      {
        title: "Wide Selection",
        description: "Access to the best residential and commercial properties across Nigeria."
      },
      {
        title: "Easy Financing",
        description: "Guidance on mortgage options and flexible payment plans."
      },
      {
        title: "Legal Support",
        description: "Ensuring all property documentation and titles are verified and secure."
      }
    ]
  },

  properties: [
    {
      id: "prop-1",
      name: "4-Bedroom Duplex, Lekki Phase 1",
      location: "Lekki Phase 1, Lagos",
      type: "Duplex",
      purpose: "For Sale",
      price: "₦120,000,000",
      description: "A stunning 4-bedroom duplex with modern finishes, a fully fitted kitchen, and a spacious garden. Located in a secure and serene environment.",
      details: {
        beds: 4,
        baths: 4,
        sqft: "450",
        lot: "Standard"
      },
      image: "https://picsum.photos/seed/lekki/1200/800"
    },
    {
      id: "prop-2",
      name: "3-Bedroom Apartment, Victoria Island",
      location: "Victoria Island, Lagos",
      type: "Apartment",
      purpose: "For Sale",
      price: "₦85,000,000",
      image: "https://picsum.photos/seed/vi/800/600"
    },
    {
      id: "prop-3",
      name: "Land for Development, Ibeju-Lekki",
      location: "Ibeju-Lekki, Lagos",
      type: "Land",
      purpose: "For Sale",
      price: "₦50,000,000",
      image: "https://picsum.photos/seed/land/800/600"
    },
    {
      id: "prop-4",
      name: "2-Bedroom Flat, GRA Ikeja",
      location: "GRA Ikeja, Lagos",
      type: "Flat",
      purpose: "For Rent",
      price: "₦4,500,000/year",
      image: "https://picsum.photos/seed/ikeja/800/600"
    },
    {
      id: "prop-5",
      name: "Luxury 5-Bedroom Mansion, Banana Island",
      location: "Banana Island, Lagos",
      type: "Mansion",
      purpose: "For Sale",
      price: "₦350,000,000",
      image: "https://picsum.photos/seed/banana/800/600"
    },
    {
      id: "prop-6",
      name: "Shortlet Apartment, Ikoyi",
      location: "Ikoyi, Lagos",
      type: "Apartment",
      purpose: "Shortlet",
      price: "₦150,000/night",
      image: "https://picsum.photos/seed/ikoyi/800/600"
    }
  ],

  testimonials: [
    { 
      name: "Amara N.", 
      text: "The team made buying my first home stress-free! Their knowledge of the Lekki market is unmatched.", 
      location: "Lekki",
      image: "https://picsum.photos/seed/amara/200/200"
    },
    { 
      name: "Tunde B.", 
      text: "Found the perfect office space for my startup in one week. Professional and extremely efficient.", 
      location: "Ikeja",
      image: "https://picsum.photos/seed/tunde/200/200"
    },
    { 
      name: "Funke A.", 
      text: "Professional and transparent. They helped me secure a prime investment property in Abuja with zero hassle.", 
      location: "Abuja",
      image: "https://picsum.photos/seed/funke/200/200"
    }
  ],

  faqs: [
    { q: "How long have you been in real estate?", a: "Chidi has been serving the Nigerian market for over 12 years." },
    { q: "What areas do you serve?", a: "We primarily serve Lagos (Lekki, Ikoyi, VI, Ikeja) and Abuja." },
    { q: "How do I schedule a viewing?", a: "You can use the 'Book Viewing' button on the property page or contact us via WhatsApp." },
    { q: "What documents are needed for property purchase?", a: "Common documents include the Deed of Assignment, Survey Plan, and Certificate of Occupancy (C of O)." },
    { q: "Do you offer mortgage assistance?", a: "Yes, we partner with several mortgage banks to provide financing options." }
  ]
};

export const SYSTEM_INSTRUCTION = `
You are ${SITE_DATA.agentName}, a 24/7 AI assistant for ${SITE_DATA.profile.name}, a ${SITE_DATA.profile.title} at ${SITE_DATA.profile.brokerage}.

Your personality: ${SITE_DATA.agentPersonality}

**LANGUAGE INSTRUCTION: You must ALWAYS speak and respond in English.**

Here is the knowledge base you must use to answer questions:

ABOUT CHIDI EZE:
${SITE_DATA.profile.bio}
Tagline: ${SITE_DATA.profile.tagline}

WHY CHOOSE SMART REALTY:
${SITE_DATA.profile.whyWorkWith.map(i => `- ${i.title}: ${i.description}`).join('\n')}

SAMPLE PROPERTIES:
${SITE_DATA.properties.map(p => `- ${p.name} in ${p.location}: ${p.price} (${p.purpose})`).join('\n')}

FREQUENTLY ASKED QUESTIONS:
${SITE_DATA.faqs.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n')}

CONTACT INFO:
Phone: +234 800 000 0000
Email: chidi@smartrealtydemo.ng
WhatsApp: https://wa.me/2348000000000

If the user asks to see properties, guide them to the "Featured Properties" section.
If the user wants to schedule a viewing, ask for their preferred time and day.
Keep responses concise, professional, and helpful.
`;
