// Жилые комплексы Батуми: страницы /en/zhk/<slug> под рекламу по названиям ЖК.
// Только английский. В текстах - лишь факты, подтверждённые источниками (ноябрь 2026).
export interface Complex {
  slug: string;
  name: string;
  about: string;
}

export const complexes: Complex[] = [
  {
    slug: "orbi-city",
    name: "Orbi City",
    about:
      "Orbi City is a multi-tower complex in Batumi developed by Orbi Group. It stands at 7 Sherif Khimshiashvili Street in the Khimshiashvili district, close to the sea. The complex combines apartments and hotel-format units with a shopping mall, and its first towers were completed in 2019.",
  },
  {
    slug: "bagrationi-residence",
    name: "Bagrationi Residence",
    about:
      "Bagrationi Residence is a 32-floor residential building at 131 Petre Bagrationi Street in Batumi, about 1 km from the sea. The building is completed and has a rooftop swimming pool, a terrace and underground parking.",
  },
  {
    slug: "orbi-plaza",
    name: "Orbi Plaza",
    about:
      "Orbi Plaza is a 22-floor apartment building in Batumi developed by Orbi Group and completed in 2015. It stands at 4 Iusup Kobaladze Street in the Khimshiashvili district, with only Sherif Khimshiashvili Street between it and the sea. The building is designed in a hotel style and has underground parking.",
  },
  {
    slug: "le-port",
    name: "Le Port",
    about:
      "Le Port is an apart-hotel with 45 apartments at 30 Gogebashvili Street in central Batumi, near the port. It was developed by Redix Group. The building has a restaurant, a bar and an event hall.",
  },
  {
    slug: "citron-residence",
    name: "Citron Residence",
    about:
      "Citron Residence is a residential complex in Batumi developed by Citron Group. It is located at 49 Grigol Eliava Street in the Airport district, close to the sea. The building has about 15 floors and is listed with a swimming pool and underground parking.",
  },
  {
    slug: "black-sea-towers",
    name: "Black Sea Towers",
    about:
      "Black Sea Towers is a residential complex of two high-rise towers at 16 Zhiuli Shartava Street in Batumi, developed by Real Palace. Facilities listed for residents include a swimming pool, a fitness and spa center and a children's playground.",
  },
  {
    slug: "sunrise-residence",
    name: "Sunrise Residence",
    about:
      "Sunrise Residence is a residential complex in Batumi with apartments in an aparthotel format.",
  },
];
