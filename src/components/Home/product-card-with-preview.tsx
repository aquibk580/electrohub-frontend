"use client"

import type { Dispatch, SetStateAction } from "react"
import type { Product } from "../../types/entityTypes"
import HoverProductPreview from "./hover-product-preview"
import ProductCard from "./ProductCard" // Import your existing ProductCard

interface ProductCardWithPreviewProps {
  product: Product
  wishlist: Set<number>
  setWishlist: Dispatch<SetStateAction<Set<number>>>
}

export default function ProductCardWithPreview({ product, wishlist, setWishlist }: ProductCardWithPreviewProps) {
  return (
    <HoverProductPreview product={product} className="hover-product-preview">
      <ProductCard product={product} wishlist={wishlist} setWishlist={setWishlist} />
    </HoverProductPreview>
  )
}

