import { useGetAllUserProducts } from "../../reactQuery/user/useGetAllUserProducts";

import NoProducts from "./NoProducts";
import ProductCard from "./ProductCard";
import Skeleton from "./Skeleton";
function UserProducts() {
  const { products, isPending, error } = useGetAllUserProducts();

  if (isPending) return <Skeleton />;
  //console.log(error.message);
  if (error) return <NoProducts errorMessage={error.message} />;
  //console.log(products);
  // css in ProfilePage.ts
  return (
    <div className="user-products">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} show={true} />
      ))}
    </div>
  );
}
export default UserProducts;
