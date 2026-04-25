import { useEffect, useMemo, useState } from "react";
import { loadProperties } from "./data/propertySource";

const broker = {
  name: "Doha Stay Broker Services",
  phone: "97455512345",
  city: "Doha",
  areas: ["Al Sadd", "The Pearl", "Lusail", "West Bay", "Old Airport", "Muntazah"]
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-QA", {
    style: "currency",
    currency: "QAR",
    maximumFractionDigits: 0
  }).format(price);

const getPath = () => window.location.pathname;

const navigateTo = (path, setPathname) => {
  if (window.location.pathname === path) {
    return;
  }

  window.history.pushState({}, "", path);
  setPathname(path);
};

const updateMetadata = (property) => {
  const title = property
    ? `${property.title} in ${property.location} | Doha Stay Broker`
    : "Doha Stay Broker | Rooms and Apartments for Rent in Qatar";
  const description = property
    ? `${property.title} in ${property.location}. ${property.description} Contact on WhatsApp for rent, deposit, and visit details.`
    : "Find vacant rooms, studio apartments, and family flats in Doha, Qatar with direct WhatsApp contact. Local broker listings in top Doha neighborhoods.";
  const canonicalHref = `${window.location.origin}${window.location.pathname}`;

  document.title = title;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute("content", title);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute("content", description);
  }

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", canonicalHref);
};

function PropertyGallery({ images, title, compact = false }) {
  return (
    <div className={compact ? "property-gallery compact" : "property-gallery"}>
      {images.map((image, index) => (
        <div key={`${title}-${index}`} className="gallery-slide">
          <img src={image} alt={`${title} view ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

function ListingPage({ query, setQuery, type, setType, properties, sourceLabel, sourceWarning, onNavigate }) {
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchQuery = [property.title, property.location, property.area, property.seoArea]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchType = type === "All" || property.type === type;
      return matchQuery && matchType;
    });
  }, [properties, query, type]);

  const locationOptions = useMemo(() => {
    const counts = properties.reduce((map, property) => {
      const key = property.location;
      map.set(key, (map.get(key) || 0) + 1);
      return map;
    }, new Map());

    return [...counts.entries()]
      .map(([location, count]) => ({ location, count }))
      .sort((left, right) => right.count - left.count || left.location.localeCompare(right.location));
  }, [properties]);

  const activateLocationSearch = (location) => {
    setQuery(location);
    setType("All");
    const searchSection = document.getElementById("search");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="hero">
        <nav className="topbar">
          <a
            className="brand"
            href="/"
            onClick={(event) => {
              event.preventDefault();
              onNavigate("/");
            }}
          >
            <span className="brand-mark">DS</span>
            <div>
              <p>Doha Stay Broker</p>
              <span>Vacant Rooms and Apartments in Qatar</span>
            </div>
          </a>
          <a className="nav-cta" href={`https://wa.me/${broker.phone}?text=Hi%2C%20I%20want%20help%20finding%20a%20rental%20property`}>
            WhatsApp Broker
          </a>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">Local Rental Broker in Doha, Qatar</p>
            <h1>Find vacant rooms, studios, and family apartments across Doha town areas.</h1>
            <p className="hero-text">
              Browse current Doha rental listings, compare prices by neighborhood, and open each room on its own page
              for direct WhatsApp contact.
            </p>

            <div className="hero-actions">
              <a className="primary-btn" href="#search">
                Search Properties
              </a>
              <a
                className="secondary-btn"
                href={`https://wa.me/${broker.phone}?text=Hi%2C%20I%20am%20looking%20for%20a%20room%20or%20apartment%20in%20Doha%2C%20Qatar`}
              >
                Talk on WhatsApp
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>50+</strong>
                <span>Monthly Vacancies</span>
              </div>
              <div>
                <strong>{properties.length}</strong>
                <span>Live Listings Loaded</span>
              </div>
              <div>
                <strong>Fast</strong>
                <span>Visit Scheduling</span>
              </div>
            </div>
          </section>

          <aside className="hero-panel">
            <p className="panel-label">Why renters contact us</p>
            <ul>
              <li>Fresh broker-managed room and apartment listings</li>
              <li>Scrollable photo galleries for every listing</li>
              <li>Dedicated SEO-friendly room pages for sharing</li>
              <li>Direct WhatsApp contact for each property</li>
            </ul>
            <div className="data-source-panel">
              <strong>Data source</strong>
              <span>{sourceLabel}</span>
              {sourceWarning ? <p>{sourceWarning}</p> : null}
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section className="search-section" id="search">
          <div className="section-heading">
            <p className="eyebrow">Rooms Search</p>
            <h2>Search by Doha area, apartment type, or locality keyword</h2>
            <p>
              Use the filters below to find vacant rooms and rental apartments in Doha that match your budget and
              preferred area.
            </p>
          </div>

          <div className="filters">
            <label>
              Search locality or keyword
              <input
                type="text"
                placeholder="Try Al Sadd, Lusail, studio..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <label>
              Property type
              <select value={type} onChange={(event) => setType(event.target.value)}>
                <option value="All">All</option>
                {[...new Set(properties.map((property) => property.type))].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="results-meta">
            <span>{filteredProperties.length} listings available</span>
            <span>Open any listing for its own shareable room page</span>
          </div>

          <div className="cards-grid">
            {filteredProperties.map((property) => (
              <article key={property.id} className="property-card">
                <PropertyGallery images={property.images} title={property.title} compact />
                <div className="property-body">
                  <div className="property-topline">
                    <span>{property.type}</span>
                    <strong>{formatPrice(property.price)}/month</strong>
                  </div>
                  <h3>{property.title}</h3>
                  <p className="property-location">
                    {property.location} • {property.area}
                  </p>
                  <p className="property-description">{property.description}</p>

                  <div className="property-tags">
                    <span>{property.furnishing}</span>
                    <span>{property.availability}</span>
                    <span>{property.suitableFor}</span>
                  </div>

                  <div className="amenities">
                    {property.amenities.map((amenity) => (
                      <span key={amenity}>{amenity}</span>
                    ))}
                  </div>

                  <a
                    className="detail-link"
                    href={`/rooms/${property.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(`/rooms/${property.slug}`);
                    }}
                  >
                    View Room Page
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="seo-section">
          <div className="section-heading">
            <p className="eyebrow">Local SEO</p>
            <h2>Browse locations as quick search shortcuts</h2>
          </div>

          <div className="seo-content">
            <p>
              These location buttons are built from your live listing data, so when you grow to 100+ rooms the bottom
              section will automatically stay in sync with the sheet.
            </p>
            <p>
              Tap any location below to instantly fill the search box and show matching room details for that area.
            </p>
          </div>

          <div className="locality-list">
            {locationOptions.map(({ location, count }) => (
              <button
                key={location}
                type="button"
                className={`locality-chip locality-button${query === location ? " active" : ""}`}
                onClick={() => activateLocationSearch(location)}
              >
                <strong>{location}</strong>
                <span>{`${count} listing${count > 1 ? "s" : ""} available`}</span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function PropertyDetailsPage({ property, onNavigate }) {
  const whatsappText = encodeURIComponent(
    `Hi, I want details for ${property.title} in ${property.location}. Please share rent, deposit, and visit time.`
  );
  const whatsappNumber = property.whatsappNumber || broker.phone;

  return (
    <main className="detail-page">
      <a
        className="back-link"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          onNavigate("/");
        }}
      >
        Back to all rooms
      </a>

      <section className="detail-hero">
        <div className="detail-copy">
          <p className="eyebrow">{property.type}</p>
          <h1>{property.title}</h1>
          <p className="detail-location">
            {property.location} • {property.area}
          </p>
          <p className="detail-description">{property.description}</p>

          <div className="detail-price-row">
            <strong>{formatPrice(property.price)}/month</strong>
            <span>{property.availability}</span>
          </div>

          <div className="property-tags detail-tags">
            <span>{property.furnishing}</span>
            <span>{property.suitableFor}</span>
            <span>{property.seoArea}</span>
          </div>

          <div className="amenities detail-amenities">
            {property.amenities.map((amenity) => (
              <span key={amenity}>{amenity}</span>
            ))}
          </div>

          <a className="primary-btn detail-whatsapp" href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}>
            Contact on WhatsApp
          </a>
        </div>

        <div className="detail-gallery-wrap">
          <PropertyGallery images={property.images} title={property.title} />
        </div>
      </section>
    </main>
  );
}

function NotFoundPage({ onNavigate }) {
  return (
    <main className="detail-page not-found-page">
      <p className="eyebrow">Listing not found</p>
      <h1>This room page is not available.</h1>
      <a
        className="primary-btn"
        href="/"
        onClick={(event) => {
          event.preventDefault();
          onNavigate("/");
        }}
      >
        Back to listings
      </a>
    </main>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [pathname, setPathname] = useState(getPath);
  const [properties, setProperties] = useState([]);
  const [sourceLabel, setSourceLabel] = useState("Loading Google Sheet data...");
  const [sourceWarning, setSourceWarning] = useState("");

  useEffect(() => {
    const handlePopState = () => setPathname(getPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncProperties = async () => {
      const result = await loadProperties();

      if (!isMounted) {
        return;
      }

      setProperties(result.properties);
      setSourceLabel(result.source);
      setSourceWarning(
        result.usedFallback
          ? "Could not reach the configured sheet, so the app is showing sample listings."
          : `Connected to ${result.sheetUrl}`
      );
    };

    syncProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentProperty = useMemo(() => {
    const slug = pathname.startsWith("/rooms/") ? pathname.replace("/rooms/", "") : "";
    return properties.find((property) => property.slug === slug);
  }, [pathname, properties]);

  useEffect(() => {
    updateMetadata(currentProperty);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentProperty, pathname]);

  const seoSchema = currentProperty
    ? {
        "@context": "https://schema.org",
        "@type": "Residence",
        name: currentProperty.title,
        description: currentProperty.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: currentProperty.location,
          addressCountry: "QA"
        },
        offers: {
          "@type": "Offer",
          price: currentProperty.price,
          priceCurrency: "QAR",
          availability: "https://schema.org/InStock"
        }
      }
    : {
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: broker.name,
        areaServed: broker.areas.map((area) => ({
          "@type": "City",
          name: `${area}, ${broker.city}`
        })),
        telephone: `+${broker.phone}`,
        url: `${window.location.origin}/`,
        description:
          "Local broker for vacant rooms, studio apartments, and rental flats in Doha, Qatar with direct WhatsApp contact."
      };

  const isRoomPage = pathname.startsWith("/rooms/");
  const handleNavigate = (path) => navigateTo(path, setPathname);

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(seoSchema)}</script>
      <div className="page-shell">
        {isRoomPage ? (
          currentProperty ? (
            <PropertyDetailsPage property={currentProperty} onNavigate={handleNavigate} />
          ) : properties.length > 0 ? (
            <NotFoundPage onNavigate={handleNavigate} />
          ) : null
        ) : (
          <ListingPage
            query={query}
            setQuery={setQuery}
            type={type}
            setType={setType}
            properties={properties}
            sourceLabel={sourceLabel}
            sourceWarning={sourceWarning}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </>
  );
}

export default App;
