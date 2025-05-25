import Product from "./Products";

export default function AllProducts({products, addToCartButton}) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <Product key={product.id} addToCartButton={addToCartButton} productData={product} />
      ))}
    </div>
  );
}
