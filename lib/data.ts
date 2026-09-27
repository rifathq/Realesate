import { Property, Agent } from './types';

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    slug: 'elena-vance',
    name: 'Elena Vance',
    title: 'Principal Broker & Residential Specialist',
    image: '/images/advisor_portrait_1790542274728.jpg',
    phone: '(206) 555-0149',
    email: 'elena.vance@nestora.com',
    license: 'WA #2109841',
    serviceAreas: ['Seattle Central', 'Queen Anne', 'Capitol Hill', 'Bellevue'],
    specialties: ['Modern Architecture', 'Luxury Condominiums', 'First-Time Buyers', 'Relocation'],
    experienceYears: 14,
    closedSalesVolume: '$184M',
    activeListingsCount: 8,
    rating: 4.96,
    reviewsCount: 112,
    bio: 'Elena has guided Pacific Northwest buyers and sellers for over 14 years. With a background in urban architecture and financial underwriting, she delivers sharp pricing analysis and calm, strategic negotiation.',
    languages: ['English', 'Spanish'],
  },
  {
    id: 'agent-2',
    slug: 'marcus-chen',
    name: 'Marcus Chen',
    title: 'Senior Managing Director, Nestora Premier',
    image: '/images/advisor_portrait_1790542274728.jpg',
    phone: '(512) 555-0382',
    email: 'marcus.chen@nestora.com',
    license: 'TX #749201',
    serviceAreas: ['Austin Central', 'Westlake Hills', 'Zilker', 'Bouldin Creek'],
    specialties: ['Architectural Estates', 'Investment Portfolios', 'New Construction'],
    experienceYears: 11,
    closedSalesVolume: '$142M',
    activeListingsCount: 6,
    rating: 4.98,
    reviewsCount: 88,
    bio: 'Marcus represents distinctive architectural properties throughout Central Texas. Known for data-grounded valuations and discretion, he is a trusted resource for tech founders and long-time residents alike.',
    languages: ['English', 'Mandarin'],
  },
  {
    id: 'agent-3',
    slug: 'sophia-alvarez',
    name: 'Sophia Alvarez',
    title: 'Residential Advisor & Historic Properties Lead',
    image: '/images/advisor_portrait_1790542274728.jpg',
    phone: '(303) 555-0914',
    email: 'sophia.alvarez@nestora.com',
    license: 'CO #1004829',
    serviceAreas: ['Denver Highlands', 'Cherry Creek', 'Wash Park', 'Boulder'],
    specialties: ['Historic Homes', 'Townhomes & Urban Flats', 'Green Energy Upgrades'],
    experienceYears: 9,
    closedSalesVolume: '$96M',
    activeListingsCount: 5,
    rating: 4.92,
    reviewsCount: 64,
    bio: 'Sophia is deeply passionate about sustainable construction, historic character preservation, and helping families transition seamlessly into vibrant neighborhood communities.',
    languages: ['English'],
  }
];

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: '742-evergreen-ridge-queen-anne',
    title: 'Architectural Timber Residence with Sound Views',
    listingType: 'buy',
    price: 1895000,
    address: '742 Evergreen Ridge Way',
    city: 'Seattle',
    state: 'WA',
    zip: '98119',
    neighborhood: 'Queen Anne',
    beds: 4,
    baths: 3.5,
    sqft: 3420,
    pricePerSqft: 554,
    lotSizeSqft: 6800,
    yearBuilt: 2021,
    propertyType: 'single-family',
    status: 'New',
    listedDate: '2026-09-24',
    openHouseDate: 'Sat, Oct 3 · 1:00 PM – 4:00 PM',
    description: 'Designed by Olson Kundig alumnus studio, this custom modern residence balances rich cedar cladding with refined steel details. Expansive south-facing floor-to-ceiling glass captures panoramic vistas of Puget Sound. Features an open culinary kitchen with Calacatta marble waterfall island, primary sanctuary with private cedar soaking terrace, and integrated smart radiant heating.',
    images: [
      '/images/hero_modern_residence_1790542231529.jpg',
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/craftsman_exterior_1790542263196.jpg'
    ],
    features: {
      interior: [
        'White oak wide-plank flooring',
        'Custom rift-cut white oak cabinetry',
        'Motorized architectural shades',
        'Temperature-controlled 240-bottle wine gallery',
        '10-foot ceiling heights on main level'
      ],
      exterior: [
        'Covered heated dining terrace',
        'Western red cedar rainscreen siding',
        'Drought-tolerant native rain garden',
        'Pre-wired for 2x Level-2 EV charging'
      ],
      heatingCooling: [
        'Multi-zone ductless heat pump (A/C)',
        'Hydronic radiant in-floor heating',
        'HEPA filtration whole-home ventilation'
      ],
      parking: 'Attached 2-Car Garage with epoxy floor',
      hoaFeeMonthly: 0,
      propertyTaxesAnnual: 18450,
      homeownersInsuranceAnnual: 2200
    },
    amenities: ['Central A/C', 'Water View', 'Garage Parking', 'Hardwood Floors', 'Fireplace', 'Wine Cellar'],
    coordinates: {
      lat: 47.636,
      lng: -122.358
    },
    scores: {
      walk: 86,
      transit: 78,
      bike: 82
    },
    schools: [
      { name: 'Queen Anne Elementary', type: 'Elementary', rating: 9, distance: '0.4 mi' },
      { name: 'McClure Middle School', type: 'Middle', rating: 8, distance: '0.8 mi' },
      { name: 'Ballard High School', type: 'High', rating: 9, distance: '1.9 mi' }
    ],
    priceHistory: [
      { date: 'Sep 24, 2026', price: 1895000, event: 'Listed' },
      { date: 'Jun 12, 2021', price: 1460000, event: 'Sold' }
    ],
    agentId: 'agent-1'
  },
  {
    id: 'prop-2',
    slug: '1840-hillside-terrace-westlake',
    title: 'Mid-Century Reimagined in Westlake Hills',
    listingType: 'buy',
    price: 2450000,
    address: '1840 Hillside Terrace',
    city: 'Austin',
    state: 'TX',
    zip: '78746',
    neighborhood: 'Westlake Hills',
    beds: 5,
    baths: 4,
    sqft: 4180,
    pricePerSqft: 586,
    lotSizeSqft: 18200,
    yearBuilt: 2019,
    propertyType: 'single-family',
    status: 'Active',
    listedDate: '2026-09-18',
    openHouseDate: 'Sun, Oct 4 · 2:00 PM – 5:00 PM',
    description: 'A hillside sanctuary set among mature Texas live oaks. Seamless indoor-outdoor flow featuring pocketing glass walls opening onto a limestone patio, heated negative-edge pool, and private outdoor kitchen. The chef’s galley pairs honed soapstone with Wolf and Sub-Zero appointments.',
    images: [
      '/images/craftsman_exterior_1790542263196.jpg',
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/hero_modern_residence_1790542231529.jpg'
    ],
    features: {
      interior: [
        'Vaulted tongue-and-groove cedar ceilings',
        'Custom blackened steel fireplace mantle',
        'Secondary guest suite with private garden entry',
        'Dedicated acoustic home theatre / media lounge'
      ],
      exterior: [
        'Heated saltwater negative-edge pool & spa',
        'Built-in Santa Maria style Argentine grill',
        'Fully fenced 0.42-acre private grounds'
      ],
      heatingCooling: [
        'Dual Trane high-efficiency heat pumps',
        'Smart Ecobee zoning system'
      ],
      parking: '3-Car Oversized Garage with workshop',
      hoaFeeMonthly: 45,
      propertyTaxesAnnual: 29800,
      homeownersInsuranceAnnual: 3100
    },
    amenities: ['Pool', 'Central A/C', 'Large Lot', 'Garage Parking', 'Outdoor Kitchen', 'Fireplace'],
    coordinates: {
      lat: 30.282,
      lng: -97.798
    },
    scores: {
      walk: 48,
      transit: 35,
      bike: 58
    },
    schools: [
      { name: 'Eanes Elementary', type: 'Elementary', rating: 10, distance: '0.9 mi' },
      { name: 'Hill Country Middle School', type: 'Middle', rating: 9, distance: '1.4 mi' },
      { name: 'Westlake High School', type: 'High', rating: 10, distance: '1.8 mi' }
    ],
    priceHistory: [
      { date: 'Sep 18, 2026', price: 2450000, event: 'Listed' },
      { date: 'Jul 15, 2019', price: 1980000, event: 'Sold' }
    ],
    agentId: 'agent-2'
  },
  {
    id: 'prop-3',
    slug: '410-boulder-flatiron-way',
    title: 'Passive Solar Modern with Foothill Panorama',
    listingType: 'buy',
    price: 1475000,
    address: '410 Flatiron Crest Way',
    city: 'Denver',
    state: 'CO',
    zip: '80211',
    neighborhood: 'Highlands',
    beds: 3,
    baths: 2.5,
    sqft: 2650,
    pricePerSqft: 556,
    lotSizeSqft: 4500,
    yearBuilt: 2023,
    propertyType: 'single-family',
    status: 'Price Drop',
    listedDate: '2026-09-08',
    description: 'Crisp contemporary architecture built to stringent net-zero energy standards. Features a triple-glazed window package, rooftop deck capturing front-range peaks, polished concrete main floor, and Scandinavian-inspired minimalist interior woodwork.',
    images: [
      '/images/hero_modern_residence_1790542231529.jpg',
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/craftsman_exterior_1790542263196.jpg'
    ],
    features: {
      interior: [
        'Rooftop wet bar and firepit lounge',
        'Exposed structural glu-lam beams',
        'Custom built-in Scandinavian study nook',
        'Spa bath with curbless rain shower'
      ],
      exterior: [
        'Zinc standing-seam accents',
        'Xeriscaped low-water drought garden',
        'Full rooftop sun deck with gas hookup'
      ],
      heatingCooling: [
        'Geothermal ground-source heat pump',
        'Continuous ERV air exchanger'
      ],
      parking: '2-Car Detached Alley Garage',
      hoaFeeMonthly: 0,
      propertyTaxesAnnual: 11200,
      homeownersInsuranceAnnual: 1850
    },
    amenities: ['Mountain View', 'Rooftop Deck', 'Central A/C', 'Solar Panels', 'Hardwood Floors'],
    coordinates: {
      lat: 39.761,
      lng: -105.018
    },
    scores: {
      walk: 89,
      transit: 64,
      bike: 91
    },
    schools: [
      { name: 'Brown International Elementary', type: 'Elementary', rating: 8, distance: '0.3 mi' },
      { name: 'Skinner Middle School', type: 'Middle', rating: 7, distance: '0.7 mi' },
      { name: 'North High School', type: 'High', rating: 8, distance: '1.1 mi' }
    ],
    priceHistory: [
      { date: 'Sep 22, 2026', price: 1475000, event: 'Price Drop' },
      { date: 'Sep 08, 2026', price: 1540000, event: 'Listed' }
    ],
    agentId: 'agent-3'
  },
  {
    id: 'prop-4',
    slug: '88-pike-terrace-loft-penthouse',
    title: 'Waterfront Penthouse Loft with Private Terrace',
    listingType: 'buy',
    price: 1120000,
    address: '88 Pike Terrace Blvd #704',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
    neighborhood: 'Downtown / Waterfront',
    beds: 2,
    baths: 2,
    sqft: 1720,
    pricePerSqft: 651,
    yearBuilt: 2018,
    propertyType: 'condo',
    status: 'Active',
    listedDate: '2026-09-12',
    description: 'A singular urban residence perched directly above the revitalized Seattle waterfront promenade. Industrial concrete ceilings blend with refined warm walnut cabinetry and blackened steel accents. A generous 450 sqft private landscaped terrace invites sunset dining.',
    images: [
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/hero_modern_residence_1790542231529.jpg',
      '/images/craftsman_exterior_1790542263196.jpg'
    ],
    features: {
      interior: [
        '11-foot exposed architectural board-formed concrete',
        'Custom walnut floor-to-ceiling library wall',
        'Gaggenau induction suite and wine column'
      ],
      exterior: [
        'Private 450 sqft terrace with gas & water',
        'Concierge 24/7 attended lobby'
      ],
      heatingCooling: [
        'Central ducted HVAC with building central chiller'
      ],
      parking: '2 Secured Underground Tandem Stalls with EV',
      hoaFeeMonthly: 840,
      propertyTaxesAnnual: 12400,
      homeownersInsuranceAnnual: 1100
    },
    amenities: ['Water View', 'Concierge', 'Gym & Fitness', 'Elevator', 'Private Terrace', 'Storage Unit'],
    coordinates: {
      lat: 47.608,
      lng: -122.341
    },
    scores: {
      walk: 98,
      transit: 100,
      bike: 88
    },
    schools: [
      { name: 'Lowell Elementary', type: 'Elementary', rating: 7, distance: '1.2 mi' },
      { name: 'Washington Middle', type: 'Middle', rating: 7, distance: '1.8 mi' },
      { name: 'Garfield High School', type: 'High', rating: 8, distance: '2.4 mi' }
    ],
    priceHistory: [
      { date: 'Sep 12, 2026', price: 1120000, event: 'Listed' }
    ],
    agentId: 'agent-1'
  },
  {
    id: 'prop-5',
    slug: '2415-south-congress-townhouse',
    title: 'Courtyard Rowhome in South Congress',
    listingType: 'rent',
    price: 4600,
    rentalPeriod: 'month',
    address: '2415 S Congress Ave #12',
    city: 'Austin',
    state: 'TX',
    zip: '78704',
    neighborhood: 'South Congress',
    beds: 3,
    baths: 2.5,
    sqft: 2150,
    pricePerSqft: 2.14,
    yearBuilt: 2022,
    propertyType: 'townhouse',
    status: 'Active',
    listedDate: '2026-09-20',
    description: 'Step directly out to cafes, boutique coffee roasters, and live music from this private gated rowhome. Two-story living room with clerestory windows, dedicated top-floor work-from-home aerie, private fenced brick courtyard, and two-car garage.',
    images: [
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/craftsman_exterior_1790542263196.jpg',
      '/images/hero_modern_residence_1790542231529.jpg'
    ],
    features: {
      interior: [
        'Quartz countertops with breakfast bar',
        'Custom built-in desk with fiber high-speed cabling',
        'Full-size front-loading washer & dryer included'
      ],
      exterior: [
        'Private brick courtyard with string lights and planter beds',
        'Gated access with keyless entry'
      ],
      heatingCooling: [
        'Carrier smart dual-zone cooling & heating'
      ],
      parking: 'Attached 2-Car Garage',
      hoaFeeMonthly: 0,
      propertyTaxesAnnual: 0,
      homeownersInsuranceAnnual: 0
    },
    amenities: ['In-Unit Laundry', 'Garage Parking', 'Pet Friendly', 'Private Yard', 'Central A/C'],
    coordinates: {
      lat: 30.243,
      lng: -97.751
    },
    scores: {
      walk: 92,
      transit: 68,
      bike: 90
    },
    schools: [
      { name: 'Travis Heights Elementary', type: 'Elementary', rating: 8, distance: '0.6 mi' },
      { name: 'Fulmore Middle School', type: 'Middle', rating: 7, distance: '0.8 mi' },
      { name: 'Travis High School', type: 'High', rating: 7, distance: '1.4 mi' }
    ],
    priceHistory: [
      { date: 'Sep 20, 2026', price: 4600, event: 'Listed' }
    ],
    agentId: 'agent-2'
  },
  {
    id: 'prop-6',
    slug: '530-cherry-creek-boulevard-flat',
    title: 'Sun-Drenched Garden Flat in Cherry Creek North',
    listingType: 'rent',
    price: 3850,
    rentalPeriod: 'month',
    address: '530 Cherry Creek North Dr #302',
    city: 'Denver',
    state: 'CO',
    zip: '80206',
    neighborhood: 'Cherry Creek',
    beds: 2,
    baths: 2,
    sqft: 1540,
    pricePerSqft: 2.50,
    yearBuilt: 2020,
    propertyType: 'condo',
    status: 'New',
    listedDate: '2026-09-25',
    description: 'Impeccably finished boutique residence steps from the Cherry Creek trail and shopping district. Features wide-plank French oak floors, Sub-Zero wine fridge, spa-inspired marble bath, and private covered terrace overlooking tree-lined streets.',
    images: [
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/craftsman_exterior_1790542263196.jpg',
      '/images/hero_modern_residence_1790542231529.jpg'
    ],
    features: {
      interior: [
        'Gas fireplace with quartz surround',
        'Custom California closets throughout',
        'Motorized sun shades'
      ],
      exterior: [
        'Covered corner balcony with gas line',
        'Secure heated underground garage'
      ],
      heatingCooling: [
        'Quiet ducted inverter AC'
      ],
      parking: '1 Reserved Underground Stall + Storage Locker',
      hoaFeeMonthly: 0,
      propertyTaxesAnnual: 0,
      homeownersInsuranceAnnual: 0
    },
    amenities: ['Elevator', 'In-Unit Laundry', 'Balcony', 'Fireplace', 'Covered Parking', 'Storage Unit'],
    coordinates: {
      lat: 39.721,
      lng: -104.953
    },
    scores: {
      walk: 94,
      transit: 62,
      bike: 87
    },
    schools: [
      { name: 'Bromwell Elementary', type: 'Elementary', rating: 9, distance: '0.4 mi' },
      { name: 'Morey Middle School', type: 'Middle', rating: 8, distance: '1.2 mi' },
      { name: 'East High School', type: 'High', rating: 8, distance: '1.6 mi' }
    ],
    priceHistory: [
      { date: 'Sep 25, 2026', price: 3850, event: 'Listed' }
    ],
    agentId: 'agent-3'
  },
  {
    id: 'prop-7',
    slug: '1210-bellevue-way-craftsman',
    title: 'Craftsman Estate with Heritage Cedar & Guest Suite',
    listingType: 'buy',
    price: 2190000,
    address: '1210 Bellevue Way SE',
    city: 'Seattle',
    state: 'WA',
    zip: '98004',
    neighborhood: 'Bellevue / Eastside',
    beds: 5,
    baths: 4.5,
    sqft: 4320,
    pricePerSqft: 506,
    lotSizeSqft: 14500,
    yearBuilt: 2020,
    propertyType: 'single-family',
    status: 'Open House',
    listedDate: '2026-09-15',
    openHouseDate: 'Sun, Oct 4 · 12:00 PM – 3:30 PM',
    description: 'Sublime architectural craftsmanship built to last generations. Main level encompasses grand vaulted gathering rooms, double-sided stone fireplace, private study, and culinary kitchen with dual dishwashers and butler pantry. Lower level features full accessory dwelling suite with separate entrance.',
    images: [
      '/images/craftsman_exterior_1790542263196.jpg',
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/hero_modern_residence_1790542231529.jpg'
    ],
    features: {
      interior: [
        'Double-sided granite fireplace',
        'Butler pantry with secondary sink and microwave drawer',
        'ADU guest suite with kitchenette and private laundry',
        'Main floor primary suite with private screened patio'
      ],
      exterior: [
        'Covered cedar front porch with timber framing',
        'Stone gas fire lounge in back garden',
        'Raised vegetable planters with drip irrigation'
      ],
      heatingCooling: [
        'Dual variable-speed heat pump systems',
        'Whole-house backup generator ready'
      ],
      parking: '3-Car Tandem Garage with workshop alcove',
      hoaFeeMonthly: 0,
      propertyTaxesAnnual: 22400,
      homeownersInsuranceAnnual: 2800
    },
    amenities: ['Fireplace', 'Large Lot', 'Guest Suite', 'Garage Parking', 'Central A/C', 'Hardwood Floors'],
    coordinates: {
      lat: 47.604,
      lng: -122.202
    },
    scores: {
      walk: 65,
      transit: 54,
      bike: 70
    },
    schools: [
      { name: 'Enatai Elementary', type: 'Elementary', rating: 9, distance: '0.6 mi' },
      { name: 'Chinouk Middle School', type: 'Middle', rating: 9, distance: '1.1 mi' },
      { name: 'Bellevue High School', type: 'High', rating: 10, distance: '1.5 mi' }
    ],
    priceHistory: [
      { date: 'Sep 15, 2026', price: 2190000, event: 'Listed' }
    ],
    agentId: 'agent-1'
  },
  {
    id: 'prop-8',
    slug: '904-east-sixth-street-modern',
    title: 'Architectural Courtyard Home in East Austin',
    listingType: 'buy',
    price: 985000,
    address: '904 E 6th Street',
    city: 'Austin',
    state: 'TX',
    zip: '78702',
    neighborhood: 'East Austin',
    beds: 3,
    baths: 2,
    sqft: 1890,
    pricePerSqft: 521,
    lotSizeSqft: 5200,
    yearBuilt: 2022,
    propertyType: 'single-family',
    status: 'Active',
    listedDate: '2026-09-17',
    description: 'Award-winning design celebrating private outdoor courtyards and crisp geometric lines. High ceilings with clerestory lighting keep the home bright while preserving absolute privacy. Walk to coffee shops, acclaimed eateries, and the Lady Bird Lake hike-and-bike trail.',
    images: [
      '/images/hero_modern_residence_1790542231529.jpg',
      '/images/luxury_interior_living_1790542242059.jpg',
      '/images/scandinavian_kitchen_1790542251706.jpg',
      '/images/craftsman_exterior_1790542263196.jpg'
    ],
    features: {
      interior: [
        'Polished terrazzo concrete floors',
        'Custom steel-cased interior doors',
        'Rooftop stargazing platform with skyline view'
      ],
      exterior: [
        'Private interior courtyard with Japanese maple',
        'Board-formed architectural privacy walls'
      ],
      heatingCooling: ['High-efficiency heat pump with smart humidity control'],
      parking: 'Carport + dedicated off-street stall',
      hoaFeeMonthly: 0,
      propertyTaxesAnnual: 12100,
      homeownersInsuranceAnnual: 1650
    },
    amenities: ['Hardwood Floors', 'Central A/C', 'City Views', 'Deck', 'Pet Friendly'],
    coordinates: {
      lat: 30.265,
      lng: -97.729
    },
    scores: {
      walk: 91,
      transit: 72,
      bike: 94
    },
    schools: [
      { name: 'Sanchez Elementary', type: 'Elementary', rating: 7, distance: '0.5 mi' },
      { name: 'Martin Middle School', type: 'Middle', rating: 7, distance: '0.9 mi' },
      { name: 'Eastside Memorial High', type: 'High', rating: 7, distance: '1.6 mi' }
    ],
    priceHistory: [
      { date: 'Sep 17, 2026', price: 985000, event: 'Listed' }
    ],
    agentId: 'agent-2'
  }
];

export const POPULAR_NEIGHBORHOODS = [
  {
    city: 'Seattle, WA',
    neighborhood: 'Queen Anne',
    avgPrice: '$1,320,000',
    growth: '+4.2% YoY',
    count: '34 Active Homes',
    image: '/images/hero_modern_residence_1790542231529.jpg'
  },
  {
    city: 'Austin, TX',
    neighborhood: 'Westlake Hills',
    avgPrice: '$2,150,000',
    growth: '+6.1% YoY',
    count: '28 Active Homes',
    image: '/images/craftsman_exterior_1790542263196.jpg'
  },
  {
    city: 'Denver, CO',
    neighborhood: 'Highlands & LoHi',
    avgPrice: '$890,000',
    growth: '+3.8% YoY',
    count: '42 Active Homes',
    image: '/images/luxury_interior_living_1790542242059.jpg'
  },
  {
    city: 'Seattle, WA',
    neighborhood: 'Waterfront / Pike',
    avgPrice: '$940,000',
    growth: '+2.9% YoY',
    count: '19 Active Condos',
    image: '/images/scandinavian_kitchen_1790542251706.jpg'
  }
];
