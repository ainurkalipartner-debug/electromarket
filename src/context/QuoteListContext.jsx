import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const QuoteListContext = createContext(null);
const STORAGE_KEY = 'electromarket.quoteList';

function readStoredIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function QuoteListProvider({ children }) {
  const [items, setItems] = useState(() => readStoredIds());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable — quote list just won't persist across reloads
    }
  }, [items]);

  const addItem = useCallback((product) => {
    setItems((prev) => {
      if (prev.some((p) => p.slug === product.slug)) return prev;
      return [...prev, { slug: product.slug, name: product.name, sku: product.sku || null }];
    });
  }, []);

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const hasItem = useCallback((slug) => items.some((p) => p.slug === slug), [items]);

  const value = useMemo(
    () => ({ items, count: items.length, addItem, removeItem, clear, hasItem }),
    [items, addItem, removeItem, clear, hasItem]
  );

  return <QuoteListContext.Provider value={value}>{children}</QuoteListContext.Provider>;
}

export function useQuoteList() {
  const ctx = useContext(QuoteListContext);
  if (!ctx) throw new Error('useQuoteList must be used within QuoteListProvider');
  return ctx;
}
