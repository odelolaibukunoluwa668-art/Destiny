export type CuisineCategory = 
  | 'all'
  | 'main-course'
  | 'appetizers'
  | 'african'
  | 'fast-food'
  | 'continental'
  | 'chinese'
  | 'drinks'
  | 'desserts';

export interface ExtraProtein {
  name: string;
  priceUSD: number;
  priceNGN: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CuisineCategory;
  categoryLabel: string;
  priceUSD: number; // exact match to reference image ($10, $11, $12, etc.)
  priceNGN: number; // authentic Nigerian Naira pricing
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  isHalal?: boolean;
  isVegetarian?: boolean;
  preparationTime: string;
  calories?: string;
  ingredients: string[];
  portionSize: string;
  sidesOptions?: string[];
  spiceLevelOptions?: string[];
  proteinOptions?: ExtraProtein[];
}

export interface CartItem {
  id: string; // unique item id + custom options
  menuItem: MenuItem;
  quantity: number;
  selectedSpiceLevel?: string;
  selectedSide?: string;
  selectedProtein?: ExtraProtein;
  specialInstructions?: string;
  totalPriceUSD: number;
  totalPriceNGN: number;
}

export interface TableReservation {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: 'main-dining' | 'vip-lounge' | 'outdoor-terrace' | 'private-dining';
  specialRequests?: string;
  occasion?: string;
}

export interface RestaurantBranch {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  fastFoodHours: string;
  image: string;
  features: string[];
  mapCoordinates?: { lat: number; lng: number };
}

export interface ChefProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  image: string;
  experienceYears: number;
  signatureDish: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  favoriteDish: string;
  verifiedGuest: boolean;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  image: string;
  features: string[];
  badge?: string;
  deliveryTime?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
