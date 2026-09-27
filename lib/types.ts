export type ListingType = 'buy' | 'rent';

export type PropertyType = 'single-family' | 'condo' | 'townhouse' | 'multi-family';

export interface SchoolInfo {
  name: string;
  type: 'Elementary' | 'Middle' | 'High';
  rating: number; // 1-10
  distance: string;
}

export interface PriceHistoryItem {
  date: string;
  price: number;
  event: 'Listed' | 'Price Change' | 'Price Drop' | 'Sold' | 'Pending';
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  listingType: ListingType;
  price: number;
  rentalPeriod?: 'month';
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  beds: number;
  baths: number;
  sqft: number;
  pricePerSqft: number;
  lotSizeSqft?: number;
  yearBuilt: number;
  propertyType: PropertyType;
  status: 'Active' | 'New' | 'Price Drop' | 'Pending' | 'Open House';
  listedDate: string;
  openHouseDate?: string;
  description: string;
  images: string[];
  features: {
    interior: string[];
    exterior: string[];
    heatingCooling: string[];
    parking: string;
    hoaFeeMonthly?: number;
    propertyTaxesAnnual: number;
    homeownersInsuranceAnnual: number;
  };
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  scores: {
    walk: number;
    transit: number;
    bike: number;
  };
  schools: SchoolInfo[];
  priceHistory: PriceHistoryItem[];
  agentId: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  image: string;
  phone: string;
  email: string;
  license: string;
  serviceAreas: string[];
  specialties: string[];
  experienceYears: number;
  closedSalesVolume: string;
  activeListingsCount: number;
  rating: number;
  reviewsCount: number;
  bio: string;
  languages: string[];
}

export interface FilterState {
  mode: ListingType;
  location: string;
  priceMin: number | '';
  priceMax: number | '';
  beds: number | 'any';
  baths: number | 'any';
  propertyTypes: PropertyType[];
  sqftMin: number | '';
  sqftMax: number | '';
  yearBuiltMin: number | '';
  amenities: string[];
  status: string[];
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'newest' | 'sqft-desc';
}

export interface SavedSearch {
  id: string;
  title: string;
  filters: Partial<FilterState>;
  dateCreated: string;
  alertFrequency: 'Instant' | 'Daily' | 'Weekly' | 'Never';
}

export interface ScheduledTour {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  tourType: 'In-person' | 'Live Video Tour';
  date: string;
  timeSlot: string;
  agentName: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}
