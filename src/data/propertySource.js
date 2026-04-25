import { createSlug, sampleProperties } from "./properties";

const DEFAULT_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL || "/sample-sheet.csv";

const splitList = (value, fallback = []) => {
  if (!value) {
    return fallback;
  }

  return String(value)
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseCsv = (csvText) => {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const nextChar = csvText[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(current);
      const hasContent = row.some((cell) => cell.trim() !== "");
      if (hasContent) {
        rows.push(row);
      }
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current !== "" || row.length > 0) {
    row.push(current);
    const hasContent = row.some((cell) => cell.trim() !== "");
    if (hasContent) {
      rows.push(row);
    }
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((values) => {
    return headers.reduce((entry, header, index) => {
      entry[header] = (values[index] || "").trim();
      return entry;
    }, {});
  });
};

const normalizeProperty = (row, index) => {
  const title = row.title || row.name || `Listing ${index + 1}`;
  const location = row.location || "Doha";
  const area = row.area || "Qatar";
  const images = splitList(row.image_urls || row.images, sampleProperties[index % sampleProperties.length]?.images || []);
  const amenities = splitList(row.amenities, []);
  const whatsappNumber = (row.whatsapp_number || "97455512345").replace(/[^\d]/g, "");
  const isActiveValue = (row.is_active || "true").toLowerCase();

  return {
    id: row.id || `${index + 1}`,
    title,
    slug: row.slug || createSlug(`${title} ${location}`),
    location,
    area,
    price: Number(row.price || 0),
    type: row.type || "Room",
    availability: row.availability || "Immediate",
    furnishing: row.furnishing || "Furnished",
    suitableFor: row.suitable_for || "Professionals",
    description: row.description || "Contact on WhatsApp for current room details.",
    amenities,
    seoArea: row.seo_area || `${title} in ${location}`,
    images,
    image: images[0],
    whatsappNumber,
    isActive: !["false", "0", "no"].includes(isActiveValue)
  };
};

export const loadProperties = async () => {
  try {
    const response = await fetch(DEFAULT_SHEET_URL, {
      headers: {
        Accept: "text/csv"
      }
    });

    if (!response.ok) {
      throw new Error(`Sheet request failed with ${response.status}`);
    }

    const csvText = await response.text();
    const parsedRows = parseCsv(csvText);
    const normalized = parsedRows.map(normalizeProperty).filter((property) => property.isActive);

    if (normalized.length === 0) {
      throw new Error("Sheet returned no active listings");
    }

    return {
      properties: normalized,
      source: DEFAULT_SHEET_URL === "/sample-sheet.csv" ? "Sample Google Sheet data" : "Live Google Sheet data",
      sheetUrl: DEFAULT_SHEET_URL,
      usedFallback: false
    };
  } catch (error) {
    return {
      properties: sampleProperties,
      source: "Built-in sample data",
      sheetUrl: DEFAULT_SHEET_URL,
      usedFallback: true,
      error
    };
  }
};
