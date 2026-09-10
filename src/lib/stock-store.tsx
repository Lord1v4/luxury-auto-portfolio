import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { seedVehicles, type Vehicle, type VehicleStatus } from "@/lib/vehicles";

const STOCK_KEY = "apex-motors:stock:v2";
const FAV_KEY = "apex-motors:favorites:v1";

interface StockContextValue {
  vehicles: Vehicle[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addVehicle: (vehicle: Vehicle) => void;
  updateStatus: (id: string, status: VehicleStatus) => void;
  removeVehicle: (id: string) => void;
  resetStock: () => void;
}

const StockContext = createContext<StockContextValue | null>(null);

export function StockProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(seedVehicles);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawStock = localStorage.getItem(STOCK_KEY);
      if (rawStock) {
        const parsed = JSON.parse(rawStock) as Vehicle[];
        if (Array.isArray(parsed) && parsed.length) setVehicles(parsed);
      }
      const rawFav = localStorage.getItem(FAV_KEY);
      if (rawFav) setFavorites(JSON.parse(rawFav) as string[]);
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STOCK_KEY, JSON.stringify(vehicles));
  }, [vehicles, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  const value = useMemo<StockContextValue>(
    () => ({
      vehicles,
      favorites,
      toggleFavorite,
      isFavorite: (id: string) => favorites.includes(id),
      addVehicle: (vehicle) => setVehicles((prev) => [vehicle, ...prev]),
      updateStatus: (id, status) =>
        setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v))),
      removeVehicle: (id) => setVehicles((prev) => prev.filter((v) => v.id !== id)),
      resetStock: () => setVehicles(seedVehicles),
    }),
    [vehicles, favorites, toggleFavorite],
  );

  return <StockContext.Provider value={value}>{children}</StockContext.Provider>;
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock deve ser usado dentro de StockProvider");
  return ctx;
}
