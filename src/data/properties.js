const createSlug = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const rawProperties = [
  {
    id: 1,
    title: "Furnished Executive Room",
    location: "Al Sadd, Doha",
    area: "Near Joaan Metro Station",
    price: 2800,
    type: "Single Room",
    availability: "Immediate",
    furnishing: "Fully Furnished",
    suitableFor: "Working Professionals",
    description:
      "Bright private room with attached bath, wardrobe, Wi-Fi, and quick access to central Doha.",
    amenities: ["Attached Bath", "Wi-Fi", "Split AC", "Housekeeping"],
    seoArea: "rooms for rent in Al Sadd Doha",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 2,
    title: "Modern Studio Apartment",
    location: "Old Airport, Doha",
    area: "Near Airport Road",
    price: 4200,
    type: "Studio",
    availability: "This Week",
    furnishing: "Semi Furnished",
    suitableFor: "Couples and Remote Workers",
    description:
      "Well-planned studio apartment with kitchen space, balcony, and easy access to shops and transport.",
    amenities: ["Balcony", "Parking", "CCTV", "Water Included"],
    seoArea: "studio apartment in Old Airport Doha",
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 3,
    title: "Budget Sharing Room",
    location: "Muntazah, Doha",
    area: "Near Rawdat Al Khail Street",
    price: 1800,
    type: "Shared Room",
    availability: "Immediate",
    furnishing: "Furnished",
    suitableFor: "Bachelors and Staff",
    description:
      "Affordable sharing room in a well-connected part of Doha with secure building entry and daily convenience nearby.",
    amenities: ["Bed", "Cupboard", "Wi-Fi", "Laundry"],
    seoArea: "budget rooms in Muntazah Doha",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 4,
    title: "Family 2BHK Apartment",
    location: "Al Wakrah Road, Doha",
    area: "Near main road access",
    price: 6500,
    type: "2BHK",
    availability: "Next Month",
    furnishing: "Semi Furnished",
    suitableFor: "Families",
    description:
      "Spacious apartment with family-friendly layout, nearby supermarkets, and practical road connectivity.",
    amenities: ["Lift", "Security", "Play Area", "Covered Parking"],
    seoArea: "2BHK apartment in Doha",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 5,
    title: "Executive Room in Tower",
    location: "West Bay, Doha",
    area: "Near business district",
    price: 3900,
    type: "Private Room",
    availability: "Immediate",
    furnishing: "Fully Furnished",
    suitableFor: "Office Professionals",
    description:
      "Ready-to-move private room with AC, work desk, and fast access to Doha business towers and Corniche routes.",
    amenities: ["AC", "Desk", "Wi-Fi", "Security"],
    seoArea: "private rooms in West Bay Doha",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: 6,
    title: "Modern 1BHK Rental",
    location: "Lusail, Doha",
    area: "Near Marina District",
    price: 5600,
    type: "1BHK",
    availability: "This Week",
    furnishing: "Semi Furnished",
    suitableFor: "Couples and Professionals",
    description:
      "Modern 1BHK with open kitchen, natural light, and a premium location close to Lusail waterfront attractions.",
    amenities: ["Open Kitchen", "Balcony", "Water Included", "Parking"],
    seoArea: "1BHK for rent in Lusail Doha",
    images: [
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

export const sampleProperties = rawProperties.map((property) => ({
  ...property,
  slug: createSlug(`${property.title} ${property.location}`),
  image: property.images[0],
  whatsappNumber: "97455512345",
  isActive: true
}));

export { createSlug };
