import { SectionTitle } from '@/components/SectionTitle';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/content';

export function Products() {
  return (
    <section id="products" className="relative py-32 bg-ink-50/50 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionTitle
          eyebrow="Product Verticals"
          title="Multiple Platforms. One Company."
          subtitle="Each product is a part of a larger architecture. We are building with continuity, not fragmentation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 [perspective:1200px]">
          {products.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
