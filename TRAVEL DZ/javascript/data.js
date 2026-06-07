const DESTINATIONS = {
  algiers: {
    id: "algiers",
    name: "Algiers",
    tagline: "The White Lady",
    category: "Cities",
    basePrice: 1200,
    image: "../images/Alger.jpg",
    description: "Experience the timeless beauty of Algiers, where white-washed French colonial buildings meet the historic, maze-like Casbah. Walk through history, visit grand botanical gardens, and enjoy sea-breeze dining at premium coastal clubs.",
    hotels: [
      { id: "algiers-standard", name: "Albert Premier Hotel", priceModifier: 0, stars: 3, image: "../images/hotel_algiers_standard.jpg" },
      { id: "algiers-premium", name: "El Aurassi Palace", priceModifier: 150, stars: 5, image: "../images/hotel_algiers_premium.jpg" },
      { id: "algiers-vip", name: "Sofitel Jardin d'Essai", priceModifier: 250, stars: 5, image: "../images/hotel_algiers_vip.jpg" }
    ],
    itinerary: [
      "Day 1: Arrival & Welcome Dinner - VIP airport reception and transfer to your luxury accommodation. Sunset cocktail overlooking Algiers Bay.",
      "Day 2: The Casbah & Historic Treasures - Private guided tour of the UNESCO-listed Casbah, visiting Ottoman palaces and tasting traditional pastries.",
      "Day 3: Jardin d'Essai & Fine Dining - Explore the botanical marvels of the Jardin d'Essai du Hamma, followed by lunch at a high-end seafood restaurant.",
      "Day 4: Roman Ruins of Tipaza - Excursion to the spectacular coastal ruins of Tipaza, visiting the Royal Mausoleum of Mauritania.",
      "Day 5: Modern Algiers & Shopping - Visit the Martyr's Monument, Museum of Modern Art, and exclusive local designer boutiques.",
      "Day 6: Culinary Masterclass - Hands-on cooking workshop with a private chef, preparing premium traditional Algerian dishes.",
      "Day 7: Coastal Cruise - Private yacht tour along the turquoise waters of the Turquoise Coast, with snorkeling and gourmet picnic on board.",
      "Day 8: Museums & Fine Art - Tour of the National Museum of Fine Arts and the Bardo National Museum, showcasing Algeria's history.",
      "Day 9: Spa & Wellness Retreat - Enjoy a luxurious traditional hammam ritual and massage session at a high-end spa center.",
      "Day 10: Departure - Luxury private transfer to Algiers Houari Boumediene Airport for your departure flight."
    ]
  },
  constantine: {
    id: "constantine",
    name: "Constantine",
    tagline: "The City of Bridges",
    category: "Cities",
    basePrice: 1400,
    image: "../images/Constantine.jpg",
    description: "Suspended in time, Constantine rises dramatically over the Rhumel River gorge. Famed for its breathtaking suspension bridges, rich Andalusian musical heritage, and cliffside mansions.",
    hotels: [
      { id: "const-standard", name: "Hotel Cirta (Classic)", priceModifier: 0, stars: 4, image: "../images/hotel_constantine_standard.jpg" },
      { id: "const-premium", name: "Novotel Constantine", priceModifier: 100, stars: 4, image: "../images/hotel_constantine_premium.jpg" },
      { id: "const-vip", name: "Marriott Constantine Palace", priceModifier: 220, stars: 5, image: "../images/hotel_constantine_vip.jpg" }
    ],
    itinerary: [
      "Day 1: Arrival & Suspension Tour - Arrive and cross the spectacular Sidi M'Cid suspension bridge, followed by check-in at your hotel.",
      "Day 2: Palace of Ahmed Bey - Visit the beautifully preserved Ottoman-era palace, featuring lush gardens and historic murals.",
      "Day 3: Rhumel Gorge Hike & Spa - Descend into the canyon paths for a majestic perspective of the cliffs, followed by a warm thermal bath.",
      "Day 4: Ancient Tiddis - Journey north to the red-tinted Roman ruins of Tiddis, built into the mountainside cliffs.",
      "Day 5: Andalusian Music Gala - Evening attendance at an intimate traditional Malouf music concert with gourmet private dinner.",
      "Day 6: Constantine Medina Exploration - Guided stroll through the narrow historic alleys, visiting local copper craft artisans.",
      "Day 7: Soummam Valley Excursion - A day trip to the scenic green valleys bordering the Constantine highlands.",
      "Day 8: High-End Wine & Dine - Wine tasting tour of local northern vineyards, followed by a panoramic view dinner.",
      "Day 9: Art Galleries & Coffee Culture - Visit local contemporary art centers and enjoy premium coffee in the European quarters.",
      "Day 10: Farewell Bridge Walk - Sunrise walk over Mellah Slimane footbridge and private airport transfer."
    ]
  },
  oran: {
    id: "oran",
    name: "Oran",
    tagline: "The Radiant Coast",
    category: "Beach",
    basePrice: 1300,
    image: "../images/Oran.jpg",
    description: "The birthplace of Rai music, Oran is a vibrant maritime city blending Spanish, French, and Algerian architecture. Home to beautiful Mediterranean bays and majestic mountain fortress views.",
    hotels: [
      { id: "oran-standard", name: "Liberté Hotel Oran", priceModifier: 0, stars: 4, image: "../images/hotel_oran_standard.jpg" },
      { id: "oran-premium", name: "Four Points by Sheraton", priceModifier: 140, stars: 4, image: "../images/hotel_oran_premium.jpg" },
      { id: "oran-vip", name: "Royal Hotel Oran (MGallery)", priceModifier: 240, stars: 5, image: "../images/hotel_oran_vip.jpg" }
    ],
    itinerary: [
      "Day 1: Arrival & Front de Mer Walk - Check-in and panoramic evening walk along Oran's seaside boulevard.",
      "Day 2: Santa Cruz Fortress - Hike or take the cable car up to Mount Murdjadjo to visit the historic Spanish fort and chapel.",
      "Day 3: Les Andalouses Beach Day - Relax on the golden sands of the premier resort beach, with optional jet-skiing and luxury cabana service.",
      "Day 4: Historic Bey's Palace - Walk through the old Spanish quarter of Sidi El Houari and the Palace of the Bey.",
      "Day 5: Rai Music Night - Experience the vibrant nightlife of Oran at an exclusive beachside lounge with live acoustic performances.",
      "Day 6: Kristel Fishing Village - Visit the quaint fishing port of Kristel and enjoy a luxury grilled sea-bass lunch by the docks.",
      "Day 7: Cap Blanc Coastal Trail - Guided panoramic coastal trail walk, showing dramatic limestone cliffs meeting the turquoise sea.",
      "Day 8: Oran Opera House - Evening performance at the renovated Oran Regional Theater, admiring its Neo-Baroque design.",
      "Day 9: Seaside Yacht Charter - Day-long cruise along Oran's western coves with deep sea fishing and custom dining.",
      "Day 10: Departure - Final morning beach walk and private chauffeur ride to Es-Sénia Airport."
    ]
  },
  tamanrasset: {
    id: "tamanrasset",
    name: "Tamanrasset",
    tagline: "Mystic Sahara",
    category: "Desert",
    basePrice: 2000,
    image: "../images/Tamanrasset.jpg",
    description: "Venture deep into the Hoggar Mountains and the absolute peace of the Sahara. Sleep under a sea of stars in a luxury glamping tent and witness the most beautiful sunrises on Earth from Assekrem.",
    hotels: [
      { id: "tam-standard", name: "Traditional Caravanserai", priceModifier: 0, stars: 3, image: "../images/hotel_tamanrasset_standard.jpg" },
      { id: "tam-premium", name: "Sahara Oasis Lodge", priceModifier: 120, stars: 4, image: "../images/hotel_tamanrasset_premium.jpg" },
      { id: "tam-vip", name: "Tuareg Luxury Glamping Camp", priceModifier: 260, stars: 5, image: "../images/hotel_tamanrasset_vip.jpg" }
    ],
    itinerary: [
      "Day 1: Desert Gateway Arrival - Fly to Tamanrasset, traditional tea welcome ceremony by Tuareg guides, and luxury camp setup.",
      "Day 2: Hoggar Volcanic Formations - 4x4 expedition through the jagged basalt rock needles of the Hoggar Mountains.",
      "Day 3: Mount Assekrem Sunset - Travel up to the high plateau of Assekrem, visiting Father de Foucauld's hermitage and watching a legendary sunset.",
      "Day 4: Ancient Rock Art - Tour the red sandstone arches of Tassili and view thousands-of-years-old prehistoric carvings and drawings.",
      "Day 5: Oasis of Outoul - Rest in the tranquil palm-filled oasis, enjoying traditional bread baked under the sand and nomadic stories.",
      "Day 6: Camel Caravan Trek - Ride majestic camels across the shifting red sand dunes, taking in the absolute silence of the desert.",
      "Day 7: Desert Stargazing - Professional astronomy night with high-end telescopes under one of the clearest skies in the world.",
      "Day 8: Tamanrasset Market - Shop for exquisite silver Tuareg jewelry, indigo tagelmusts, and hand-woven desert leathercrafts.",
      "Day 9: Mount Imarera Expedition - Scenic drive to the beautiful volcanic plains of Imarera, with unique high desert flora.",
      "Day 10: Farewell Nomadic Breakfast - Final traditional tea and transfer to Tamanrasset airport."
    ]
  },
  annaba: {
    id: "annaba",
    name: "Annaba",
    tagline: "The Coastal Paradise",
    category: "Beach",
    basePrice: 1100,
    image: "../images/Annaba.jpg",
    description: "Surrounded by cork-oak forests and green hills, Annaba (historic Hippo Regius) offers gorgeous turquoise coves, Roman cathedral ruins, and high-end mountain-top panoramas.",
    hotels: [
      { id: "anna-standard", name: "Sabri Resort Hotel", priceModifier: 0, stars: 3, image: "../images/hotel_annaba_standard.jpg" },
      { id: "anna-premium", name: "Majestic Grand Hotel", priceModifier: 90, stars: 4, image: "../images/hotel_annaba_premium.jpg" },
      { id: "anna-vip", name: "Sheraton Annaba Towers", priceModifier: 200, stars: 5, image: "../images/hotel_annaba_vip.jpg" }
    ],
    itinerary: [
      "Day 1: Arrival & Sea View Check-in - Check-in at your sea-facing suite and enjoy a welcome seafood platter by the harbor.",
      "Day 2: Basilica of Saint Augustine - Tour the stunning 19th-century basilica and the adjacent ancient Roman ruins of Hippo Regius.",
      "Day 3: Seraïdi Mountain Heights - Drive up the forested mountains to Seraïdi, enjoying the misty air and panoramic views of the bay.",
      "Day 4: Djenane Bey Secluded Cove - Spend a private day on a secluded beach accessible only by boat or private hiking trail.",
      "Day 5: Hippo Regius Archaeological Museum - Discover ancient mosaic collections and artifacts showing Annaba's Phoenician and Roman history.",
      "Day 6: Forest Hiking Trail - Guided hike through the lush cork-oak forests of Edough mountains, checking local wildlife.",
      "Day 7: La Caroube Beach Club - Relax at a luxury beach club with DJ sets, refreshing drinks, and sun-loungers.",
      "Day 8: Cape de Garde Lighthouse - Visit the wild rocky cape at the tip of the gulf, catching dramatic wave crashes.",
      "Day 9: Premium Spa Day - Rejuvenate at the Sheraton wellness center with premium Turkish baths and therapeutic pools.",
      "Day 10: Departure - Chauffeur drive to Annaba Rabah Bitat Airport."
    ]
  },
  tikjda: {
    id: "tikjda",
    name: "Tikjda",
    tagline: "Djurdjura Mountain Retreat",
    category: "Mountains",
    basePrice: 950,
    image: "../images/djurdjura.jpg",
    description: "Perched high in the Djurdjura range, Tikjda is a spectacular mountain destination. Experience hiking among ancient cedar trees, fresh alpine air, and stunning snowy views.",
    hotels: [
      { id: "tik-standard", name: "Tikjda National Lodge", priceModifier: 0, stars: 3, image: "../images/hotel_tikjda_standard.jpg" },
      { id: "tik-premium", name: "Le Djurdjura Chalet Resort", priceModifier: 70, stars: 4, image: "../images/hotel_tikjda_premium.jpg" },
      { id: "tik-vip", name: "Alp-Luxury Cedar Lodge", priceModifier: 160, stars: 5, image: "../images/hotel_tikjda_vip.jpg" }
    ],
    itinerary: [
      "Day 1: Mountain Arrival - Ascend through spectacular winding canyons to Tikjda, check-in, and enjoy fireside traditional tea.",
      "Day 2: Cedar Forest Trekking - Guided walk under ancient cedar trees, spotting the rare Barbary macaques.",
      "Day 3: Grotte du Macchabée - Excursion to the mysterious Macchabée ice cave, exploring spectacular geological formations.",
      "Day 4: Summit of Lalla Khedidja - Advanced guided hike to the highest peak of the Djurdjura range for a breathtaking 360 view.",
      "Day 5: Alpine Cheese Tasting - Visit local mountain shepherds to taste artisanal cheese and traditional flatbread (Aghrum).",
      "Day 6: Photographic Safari - Sunrise trek to capture dramatic mountain shadows, rocky crests, and wild raptors.",
      "Day 7: Mountain Bike Adventure - Guided mountain bike descent along scenic gravel trails through the valleys.",
      "Day 8: High Altitude Spa - Therapeutic hot stone massage and thermal pool therapy overlooking snowy peaks.",
      "Day 9: Lake Agoulmim Tour - Hike to the highest lake in North Africa, surrounded by alpine fields.",
      "Day 10: Departure - Morning cabin breakfast and departure transfer to Algiers airport."
    ]
  }
};
const ARTICLES = [
  {
    id: "sahara-expedition",
    title: "Visions of Sahara: A Night Under the Tamanrasset Stars",
    excerpt: "Delve into the silent grandeur of the Hoggar Mountains and the ancient nomadic cultures that call this red expanse home.",
    author: "Amine Belkacem",
    date: "May 18, 2026",
    images: ["../images/Tamanrasset.jpg", "../images/golden sahara.jpg","../images/Tamanrasset2.jpg"],
    content: "The Algerian Sahara is not merely a desert; it is a canvas of dreams painted in volcanic rock and orange sand. As you ascend Mount Assekrem at twilight, the temperature drops and a quiet stillness covers the landscape. The Hoggar Mountains appear like ancient monoliths, framing the most beautiful sunset in the world. Our luxury glamping expedition brings you the finest comforts—heated tents, silk rugs, private chefs cooking gourmet tagines—in the middle of nowhere. A night here under a pristine starry canopy is a spiritual awakening, connecting you to the ancient traditions of the Tuareg blue men."
  },
  {
    id: "constantine-history",
    title: "Suspended in Stone: The Legendary Bridges of Constantine",
    excerpt: "Cross the historic bridges that unite the rocky gorges of Algeria's oldest cliffside city.",
    author: "Nour el Houda",
    date: "April 29, 2026",
    images: ["../images/Constantine2.jpg", "../images/Sidi rached Bridge.jpg"],
    content: "Constantine, the City of Bridges, defies gravity. Built on a massive limestone cliff split by the deep Rhumel River gorge, the city is connected by a series of high-altitude bridges that offer spectacular panoramic views. Each bridge has its own history: Sidi M'Cid suspension bridge, once the highest in the world, hangs 175 meters above the valley, swaying gently in the wind. The stone arches of El Kantara reflect Ottoman and French engineering. Exploring Constantine is a sensory journey—smelling freshly roasted coffee, listening to the classical chords of Malouf music, and tasting traditional pastry like Djouzia."
  },
  {
    id: "casbah-secrets",
    title: "Secrets of the Casbah: Walking Through Algiers' Ottoman Past",
    excerpt: "Uncover the rich architectural history and local craftsman stories hidden within the white-washed streets of the Casbah.",
    author: "Yasmine Mansouri",
    date: "March 12, 2026",
    images: ["../images/Casbah.jpg", "../images/Sablette.jpg", "../images/notre-dame-d-afrique.jpg"],
    content: "Stepping into the Casbah of Algiers is like stepping back into the 16th century. The narrow, winding streets twist past Ottoman palaces, historic mosques, and ancient fountains. The houses lean towards each other, supported by cedar beams, creating a shady canopy. On our private tour, we enter hidden courtyards where local copper artisans hammer intricate designs, and families serve mint tea. Discovering the historic palaces of the Dey, the Ketchaoua Mosque, and hearing stories of the revolution gives you an unforgettable understanding of the resilient soul of Algiers."
  }
];
function saveBooking(bookingData) {
  let bookings = JSON.parse(localStorage.getItem("travel_dz_bookings") || "[]");
  bookings.push(bookingData);
  localStorage.setItem("travel_dz_bookings", JSON.stringify(bookings));
}
function getBookings() {
  return JSON.parse(localStorage.getItem("travel_dz_bookings") || "[]");
}
function saveComment(articleId, comment) {
  let comments = JSON.parse(localStorage.getItem(`comments_${articleId}`) || "[]");
  comments.push(comment);
  localStorage.setItem(`comments_${articleId}`, JSON.stringify(comments));
}
function getComments(articleId) {
  let defaultComments = [
    { name: "Sofiane K.", rating: 5, text: "Absolutely stunning read! Reminds me of my trip to the Hoggar last winter.", date: "May 20, 2026" },
    { name: "Sarah L.", rating: 4, text: "Excellent article, the photography was superb. Algeria is truly a hidden gem.", date: "May 22, 2026" }
  ];
  let localComments = JSON.parse(localStorage.getItem(`comments_${articleId}`) || "[]");
  return [...defaultComments, ...localComments];
}
function toggleLike(articleId) {
  let liked = JSON.parse(localStorage.getItem(`liked_${articleId}`) || "false");
  liked = !liked;
  localStorage.setItem(`liked_${articleId}`, JSON.stringify(liked));
  return liked;
}
function getLikeState(articleId) {
  return JSON.parse(localStorage.getItem(`liked_${articleId}`) || "false");
}