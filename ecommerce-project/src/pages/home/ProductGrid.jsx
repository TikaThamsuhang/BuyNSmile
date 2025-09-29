import { Product } from "./Product";

export function ProductGrid({products, loadCart}) {
  // const [quantity, setQuantity] = useState(1); //This state is shared for all the product which is incorect
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart}/>
        );
      })}
    </div>
  );
}
