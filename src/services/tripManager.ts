import { CurrentTripState, CurrentTripPackage, TripPackageComponent, ItineraryDay } from '../types';

export interface CreateTripInput {
  destination?: string;
  country?: string;
  budgetPerPerson?: number;
  adults?: number;
  children?: number;
  infants?: number;
  totalTravellers?: number;
  travellers?: number;
  originCity?: string;
  departureAirportCode?: string;
  inspirationSource?: CurrentTripState['inspirationSource'];
}

export function generateTripPackage(
  destination: string,
  country: string,
  originCity: string,
  budgetPerPerson: number,
  travellers: number,
  dates: string = '15–19 Nov 2026'
): CurrentTripPackage {
  const isDomestic = country.toLowerCase() === 'india';
  const flightCost = Math.round(budgetPerPerson * 0.42);
  const hotelCost = Math.round(budgetPerPerson * 0.38);
  const transferCost = Math.round(budgetPerPerson * 0.09);
  const experienceCost = budgetPerPerson - flightCost - hotelCost - transferCost;

  const components: TripPackageComponent[] = [
    {
      title: `Flights: ${originCity} ⇄ ${destination}`,
      subtitle: isDomestic ? 'IndiGo / Air India Direct' : 'International Direct / 1-Stop',
      cost: flightCost,
      category: 'flight',
    },
    {
      title: `4-Star Boutique Stay in ${destination}`,
      subtitle: '4 Nights Stay with Daily Breakfast',
      cost: hotelCost,
      category: 'hotel',
    },
    {
      title: 'Dedicated AC Airport & Local Transfers',
      subtitle: 'Private chauffeur for complete itinerary',
      cost: transferCost,
      category: 'transfer',
    },
    {
      title: `Signature Experiences in ${destination}`,
      subtitle: 'Curated viral highlights & entry passes',
      cost: experienceCost,
      category: 'experience',
    },
  ];

  const groupOptimizedPrice = Math.round(budgetPerPerson * 0.88);

  return {
    destination,
    country,
    originCity,
    dates,
    duration: '4 Nights / 5 Days',
    flightName: `${originCity} ⇄ ${destination} Direct Flights`,
    hotelName: `Curated Boutique Resort, ${destination}`,
    hotelType: '4★+ Boutique Resort with Pool',
    transfersName: 'Private AC Cab throughout',
    topExperiences: [
      `Scenic Sunset Viewpoint in ${destination}`,
      `Authentic Local Dining & Café Strip`,
      `Cultural & Heritage Highlight Trail`,
    ],
    components,
    pricePerPerson: budgetPerPerson,
    groupOptimizedPricePerPerson: groupOptimizedPrice,
    travellers,
    totalGroupPrice: budgetPerPerson * travellers,
    isGroupOptimized: false,
  };
}

export function createNewTripState(input: CreateTripInput): CurrentTripState {
  const dest = input.destination?.trim() || 'Goa';
  const country = input.country?.trim() || 'India';
  const adults = input.adults ?? 2;
  const children = input.children ?? 0;
  const infants = input.infants ?? 0;
  const totalTravellers = input.totalTravellers ?? input.travellers ?? (adults + children);
  const origin = input.originCity || 'Delhi';
  const budget = input.budgetPerPerson || 35000;
  const pkg = generateTripPackage(dest, country, origin, budget, totalTravellers);

  const itinerary: ItineraryDay[] = [
    {
      day: 'DAY 1',
      title: `Arrival in ${dest} & Check-in`,
      activities: [`Flight from ${origin} to ${dest}`, 'Private AC transfer to hotel', 'Evening walk & welcome dinner'],
    },
    {
      day: 'DAY 2',
      title: 'Viral Spots & Iconic Highlights',
      activities: [`Explore scenic hotspots in ${dest}`, 'Iconic café lunch', 'Golden hour sunset viewing'],
    },
    {
      day: 'DAY 3',
      title: 'Adventure, Water & Local Culture',
      activities: ['Curated guided morning activity', 'Local market & handicraft exploration', 'Signature dining experience'],
    },
    {
      day: 'DAY 4',
      title: 'Leisure & Farewell Evening',
      activities: ['Relaxed resort morning', 'Optional spa / beach lounge visit', 'Farewell dinner & celebration'],
    },
  ];

  return {
    isDemoMode: false,
    inspirationSource: input.inspirationSource || null,
    detectedDestination: dest,
    selectedDestination: dest,
    country,
    adults,
    children,
    infants,
    totalTravellers,
    travellers: totalTravellers,
    originCity: origin,
    departureAirportCode: input.departureAirportCode || 'DEL',
    dates: '15–19 Nov 2026',
    duration: '4 Nights / 5 Days',
    budgetPerPerson: budget,
    selectedMatchType: 'exact',
    itinerary,
    flight: {
      title: `${origin} ⇄ ${dest} Direct`,
      subtitle: 'Round-trip flight with check-in baggage',
      cost: pkg.components[0].cost,
    },
    hotel: {
      title: `4-Star Boutique Resort, ${dest}`,
      subtitle: 'Deluxe room with breakfast included',
      cost: pkg.components[1].cost,
    },
    transfers: {
      title: 'Private AC Airport & Local Transfers',
      subtitle: 'Complete itinerary transport included',
      cost: pkg.components[2].cost,
    },
    experiences: {
      title: `Curated ${dest} Highlights`,
      subtitle: 'All passes & activity bookings included',
      cost: pkg.components[3].cost,
      items: pkg.topExperiences,
    },
    packagePricePerPerson: budget,
    groupTotal: budget * totalTravellers,
    package: pkg,
    isBooked: false,
    isGroupOptimized: false,
  };
}

export function validateAndSyncTripState(
  state: CurrentTripState,
  regeneratePackage: boolean = false
): CurrentTripState {
  const travellers = state.totalTravellers || state.travellers || 2;
  const budget = state.budgetPerPerson || 35000;
  const dest = state.selectedDestination || 'Goa';
  const country = state.country || 'India';
  const origin = state.originCity || 'Delhi';

  let pkg = state.package;
  if (!pkg || regeneratePackage || pkg.destination !== dest) {
    pkg = generateTripPackage(dest, country, origin, budget, travellers, state.dates);
  } else {
    pkg = {
      ...pkg,
      destination: dest,
      country,
      originCity: origin,
      travellers,
      pricePerPerson: budget,
      groupOptimizedPricePerPerson: Math.round(budget * 0.88),
      totalGroupPrice: (state.isGroupOptimized ? Math.round(budget * 0.88) : budget) * travellers,
    };
  }

  const effectivePerPerson = state.isGroupOptimized
    ? pkg.groupOptimizedPricePerPerson
    : state.packagePricePerPerson || budget;

  return {
    ...state,
    selectedDestination: dest,
    country,
    originCity: origin,
    travellers,
    totalTravellers: travellers,
    budgetPerPerson: budget,
    packagePricePerPerson: effectivePerPerson,
    groupTotal: effectivePerPerson * travellers,
    package: pkg,
  };
}
