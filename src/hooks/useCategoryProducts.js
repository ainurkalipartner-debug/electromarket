import { useEffect, useState } from 'react';
import { getCategoryProducts } from '../data/products';

export function useCategoryProducts(categorySlug) {
  const [state, setState] = useState({ products: [], loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ products: [], loading: true });
    getCategoryProducts(categorySlug).then((products) => {
      if (!cancelled) setState({ products, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, [categorySlug]);

  return state;
}
