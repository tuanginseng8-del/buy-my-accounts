import { useMemo } from 'react';
import { Product } from '@/types/product';

export interface ProductGroup {
  name: string;
  category: string;
  domain: string;
  variants: Product[];
}

export const useGroupedProducts = (products: Product[]) => {
  return useMemo(() => {
    const grouped = products.reduce((acc, product) => {
      const key = product.name;
      if (!acc[key]) {
        acc[key] = {
          name: product.name,
          category: product.category,
          domain: product.domain,
          variants: []
        };
      }
      acc[key].variants.push(product);
      return acc;
    }, {} as Record<string, ProductGroup>);

    return Object.values(grouped);
  }, [products]);
};