import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const ProductFilter = ({ categories, selectedCategory, onCategoryChange }: ProductFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
        className={selectedCategory === null ? "bg-gradient-primary" : ""}
      >
        Tất cả
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onCategoryChange(category)}
          className={selectedCategory === category ? "bg-gradient-primary" : ""}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};