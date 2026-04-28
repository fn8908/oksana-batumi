"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MapProperty {
  id: number;
  lat: number;
  lng: number;
  type: string;
  price: string;
  district: string;
  icon: string;
}

const MAP_PROPERTIES: MapProperty[] = [
  { id: 1, lat: 41.6413, lng: 41.6375, type: "apartment", price: "$480/мес", district: "Аллея героев", icon: "🏢" },
  { id: 2, lat: 41.6251, lng: 41.6442, type: "apartment", price: "$350/мес", district: "Новый Бульвар", icon: "🌊" },
  { id: 3, lat: 41.6480, lng: 41.6330, type: "apartment", price: "$220/мес", district: "Старый город", icon: "🏛️" },
  { id: 4, lat: 41.6560, lng: 41.6310, type: "apartment", price: "$550/мес", district: "Руставели", icon: "🌳" },
  { id: 5, lat: 41.5520, lng: 41.7100, type: "villa", price: "$2500/мес", district: "Зелёный мыс", icon: "🏖️" },
  { id: 6, lat: 41.5200, lng: 41.7300, type: "house", price: "$900/мес", district: "Гонио", icon: "🏡" },
  { id: 7, lat: 41.5100, lng: 41.7800, type: "villa", price: "$1800/мес", district: "Сарпи", icon: "⛰️" },
  { id: 8, lat: 41.7800, lng: 41.9800, type: "house", price: "$1200/мес", district: "Кобулети", icon: "🌿" },
];

export default function AdjariaMap() {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selected, setSelected] = useState<MapProperty | null>(null);

  useEffect(() => {
    if (mapLoaded || !mapRef.current) return;

    let leafletCSS: HTMLLinkElement | null = null;
    let leafletScript: HTMLScriptElement | null = null;

    const initMap = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      if (!L || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [41.63, 41.67],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      // Dark-styled tiles via Carto Dark Matter
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      // Custom icon factory
      const makeIcon = (emoji: string, color: string) =>
        L.divIcon({
          html: `<div style="
            width:38px;height:38px;border-radius:50%;
            background:${color};
            display:flex;align-items:center;justify-content:center;
            font-size:16px;
            border:2px solid rgba(255,255,255,0.3);
            box-shadow:0 4px 12px rgba(0,0,0,0.5);
            cursor:pointer;
            transition:transform 0.2s;
          " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">${emoji}</div>`,
          className: "",
          iconSize: [38, 38],
          iconAnchor: [19, 19],
        });

      const colors: Record<string, string> = {
        apartment: "rgba(78,205,196,0.85)",
        villa: "rgba(201,169,110,0.85)",
        house: "rgba(130,180,100,0.85)",
      };

      MAP_PROPERTIES.forEach((prop) => {
        const icon = makeIcon(prop.icon, colors[prop.type] ?? colors.apartment);
        const marker = L.marker([prop.lat, prop.lng], { icon }).addTo(map);

        marker.bindPopup(
          `<div style="
            font-family:sans-serif;
            background:#0F1C2E;
            color:#F5F0E8;
            padding:10px 14px;
            border-radius:10px;
            border:1px solid rgba(201,169,110,0.3);
            min-width:160px;
            font-size:13px;
          ">
            <div style="font-size:16px;margin-bottom:4px;">${prop.icon} <strong>${prop.district}</strong></div>
            <div style="color:#C9A96E;font-weight:700;font-size:15px;">${prop.price}</div>
          </div>`,
          {
            className: "custom-popup",
            closeButton: false,
            maxWidth: 200,
          }
        );
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
    };

    // Load Leaflet CSS
    leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(leafletCSS);

    // Load Leaflet JS
    leafletScript = document.createElement("script");
    leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    leafletScript.onload = initMap;
    document.head.appendChild(leafletScript);

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="map"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: "#0F1C2E" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="font-cormorant font-semibold text-4xl lg:text-5xl mb-3"
            style={{ color: "#F5F0E8" }}
          >
            {t("map.title")}
          </h2>
          <p
            className="font-nunito text-base"
            style={{ color: "rgba(245,240,232,0.55)" }}
          >
            {t("map.subtitle")}
          </p>
          <div
            className="w-16 h-px mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {[
            { color: "rgba(78,205,196,0.85)", label: "Квартира / Apartment" },
            { color: "rgba(201,169,110,0.85)", label: "Вилла / Villa" },
            { color: "rgba(130,180,100,0.85)", label: "Дом / House" },
          ].map((leg) => (
            <div
              key={leg.label}
              className="flex items-center gap-2 text-sm"
              style={{ color: "rgba(245,240,232,0.7)" }}
            >
              <span
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ background: leg.color }}
              />
              {leg.label}
            </div>
          ))}
        </div>

        {/* Map container */}
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            border: "1px solid rgba(201,169,110,0.2)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
          }}
        >
          {/* Loading state */}
          {!mapLoaded && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ background: "#0d1e30" }}
            >
              <div className="text-center">
                <div
                  className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mx-auto mb-3"
                  style={{ borderColor: "#C9A96E", borderTopColor: "transparent" }}
                />
                <p
                  className="text-sm font-nunito"
                  style={{ color: "rgba(245,240,232,0.5)" }}
                >
                  Загрузка карты…
                </p>
              </div>
            </div>
          )}

          <div
            ref={mapRef}
            style={{ height: "520px", width: "100%" }}
          />
        </div>

        {/* Property list below map */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {MAP_PROPERTIES.map((prop) => (
            <button
              key={prop.id}
              className="text-left rounded-xl p-4 transition-all duration-200 hover:scale-[1.03]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border:
                  selected?.id === prop.id
                    ? "1px solid #C9A96E"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => setSelected(prop === selected ? null : prop)}
            >
              <div className="text-2xl mb-2">{prop.icon}</div>
              <div
                className="text-xs font-semibold mb-1 leading-tight"
                style={{ color: "#F5F0E8" }}
              >
                {prop.district}
              </div>
              <div
                className="text-xs font-bold"
                style={{ color: "#C9A96E" }}
              >
                {prop.price}
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .leaflet-popup-tip-container { display: none; }
        .leaflet-container { background: #0d1e30; }
      `}</style>
    </section>
  );
}
