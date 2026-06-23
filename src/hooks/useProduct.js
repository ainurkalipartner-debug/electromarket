import { useEffect, useState } from 'react';
import { getProductBySlug } from '../data/products';

export function useProduct(slug) {
  const [state, setState] = useState({ product: null, loading: true });

  useEffect(() => {
    let cancelled = false;
    setState({ product: null, loading: true });
    getProductBySlug(slug).then((product) => {
      if (!cancelled) setState({ product, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return state;
}
