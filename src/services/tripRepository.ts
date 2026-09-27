import { CurrentTripState, CurrentTripPackage, TripPackageComponent } from '../types';

const STORAGE_KEY = 'tripspark_current_trip';

export const DEFAULT_TRIP_STATE: CurrentTripState = {
  isDemoMode: false,
  inspirationSource: null,
  detectedDestination: 'Goa',
  selectedDestination: 'Goa',
  country: 'India',
  adults: 2,
  children: 0,
  infants: 0,
  totalTravellers: 2,
  travellers: 2,
  originCity: 'Delhi',
  departureAirportCode: 'DEL',
  dates: '15–19 Nov 2026',
  duration: '4 Nights / 5 Days',
  budgetPerPerson: 35000,
  selectedMatchType: 'exact',
  itinerary: [
    {
      day: 'DAY 1',
      title: 'Arrival & Beachside Check-in',
      activities: ['Flight into Goa (GOX/GOI)', 'Private AC cab to resort', 'Sunset walk at Anjuna beach'],
    },
    {
      day: 'DAY 2',
      title: 'Iconic Coastal Cafés & Scenic Spots',
      activities: ['Brunch at curated beach shack', 'Visit Chapora Fort & cliff viewpoints', 'Evening sundowner'],
    },
    {
      day: 'DAY 3',
      title: 'Water Sports & Old Goa Heritage',
      activities: ['Parasailing & coastal boating', 'Heritage Latin Quarter walk in Fontainhas', 'Seafood dining experience'],
    },
    {
      day: 'DAY 4',
      title: 'Leisure, Pool & Local Markets',
      activities: ['Relaxed resort brunch', 'Anjuna/Arpora flea market shopping', 'Farewell beach bonfire'],
    },
  ],
  flight: {
    title: 'IndiGo / Air India Direct (DEL ⇄ GOX)',
    subtitle: 'Direct round-trip flights with 15kg baggage included',
    cost: 14500,
  },
  hotel: {
    title: 'W Goa / Heritage Beach Resort (4★+)',
    subtitle: 'Deluxe sea-facing room with complimentary breakfast',
    cost: 13200,
  },
  transfers: {
    title: 'Private AC Airport & Local Transfers',
    subtitle: 'All inter-sightseeing & airport pickups included',
    cost: 3200,
  },
  experiences: {
    title: 'Curated Viral Experiences from Inspiration',
    subtitle: 'All entry passes, café credits & activities included',
    cost: 4100,
    items: ['Sunset café reservation', 'Coastal boat cruise', 'Heritage walk passes'],
  },
  packagePricePerPerson: 35000,
  groupTotal: 70000,
  package: {
    destination: 'Goa',
    country: 'India',
    originCity: 'Delhi',
    dates: '15–19 Nov 2026',
    duration: '4 Nights / 5 Days',
    flightName: 'IndiGo / Air India (DEL ⇄ GOX)',
    hotelName: 'W Goa / Heritage Beach Resort',
    hotelType: '4★+ Boutique Beach Resort',
    transfersName: 'Private AC Transfers throughout',
    topExperiences: ['Coastal Sunset Café', 'Island Boat Cruise', 'Heritage Latin Quarter Walk'],
    components: [
      { title: 'Round-trip Flights', subtitle: 'DEL ⇄ GOX Direct', cost: 14500, category: 'flight' },
      { title: 'Boutique Hotel Stay', subtitle: '4 Nights with Breakfast', cost: 13200, category: 'hotel' },
      { title: 'Airport & Local Transfers', subtitle: 'Dedicated Private Cab', cost: 3200, category: 'transfer' },
      { title: 'Curated Activities & Passes', subtitle: 'Activities & Dining', cost: 4100, category: 'experience' },
    ],
    pricePerPerson: 35000,
    groupOptimizedPricePerPerson: 30800,
    travellers: 2,
    totalGroupPrice: 70000,
    isGroupOptimized: false,
  },
  isBooked: false,
  isGroupOptimized: false,
};

class TripRepository {
  private currentTrip: CurrentTripState;

  constructor() {
    this.currentTrip = this.loadFromStorage();
  }

  private loadFromStorage(): CurrentTripState {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return { ...DEFAULT_TRIP_STATE, ...parsed };
        }
      }
    } catch {}
    return { ...DEFAULT_TRIP_STATE };
  }

  public getCurrentTrip(): CurrentTripState {
    return { ...this.currentTrip };
  }

  public saveCurrentTrip(trip: CurrentTripState): void {
    this.currentTrip = { ...trip };
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
      }
    } catch {}
  }

  public resetCurrentTrip(): CurrentTripState {
    this.currentTrip = { ...DEFAULT_TRIP_STATE };
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
    return { ...this.currentTrip };
  }
}

export const currentTripRepository = new TripRepository();
