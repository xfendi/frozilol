import { products } from "@/data/products";
import Link from "next/link";
import React from "react";

const Products = () => {
  return (
    <section data-aos="fade-up">
      <div className="section-title text-2xl sm:text-3xl font-extrabold max-w-5xl">
        🛒 Shop Products
      </div>
      <div className="section-description !text-stone-500 text-md sm:text-xl">
        Our user-friendly interface ensures that anyone, regardless of technical{" "}
        <br />
        expertise, can effortlessly build & customize their bio-pages easily.{" "}
        <br />
        Showcase your creativity, experiences & interests in minutes.
      </div>
      <div className="section-main !w-full grid grid-cols-1 sm:grid-cols-2 gap-[32px]">
        {products.map((product, index) => (
          <div
            key={index}
            className="feature card flex flex-col justify-between gap-8"
          >
            <div>
              <div
                className={`rounded-[12px] feature-icon_${product.color} !mb-8 flex size-16 items-center justify-center text-2xl`}
              >
                <span className="transition-all duration-300 hover:scale-120 hover:rotate-12 cursor-pointer">
                  {product.icon}
                </span>
              </div>
              <div className="feature-title !mb-4 max-w-sm text-2xl font-bold">
                — {product.name}
              </div>
              <div className="text-xl !font-light !text-stone-500">
                {product.description}
              </div>
            </div>

            <Link
              href={`/shop/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="btn-primary"
            >
              <span className="text-lg font-semibold">View Details</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
