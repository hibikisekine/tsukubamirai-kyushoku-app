import React from "react";

interface Product {
  title: string;
  asin: string;
  image: string;
  price: string;
  description: string;
}

interface AmazonAffiliateProps {
  products: Product[];
  title: string;
  associateId?: string;
}

export default function AmazonAffiliate({
  products,
  title,
  associateId = "mjmg-22",
}: AmazonAffiliateProps) {
  return (
    <section className="my-8 py-8 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl px-6">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>📦</span>
        <span>{title}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <a
            key={product.asin}
            href={`https://www.amazon.co.jp/dp/${product.asin}?tag=${associateId}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-white rounded-xl p-4 flex gap-4 hover:shadow-lg transition-shadow border border-orange-100"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-24 h-24 object-contain flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-orange-600 font-bold text-sm">
                {product.price}
              </p>
            </div>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center">
        ※ Amazonアソシエイトプログラムを利用しています
      </p>
    </section>
  );
}
