import {
  NoProducts,
  PaginationAndSort,
  ProductCard,
  Skeleton,
} from "../components";
import { useGetHubProducts } from "../../reactQuery/user/useGetHubProducts";
import Wrapper from "../wrapper/HomePage";
function HomePage() {
  const { data, isPending, error } = useGetHubProducts();
  if (isPending) return <Skeleton />;
  //console.log(error.message);
  if (error) return <NoProducts errorMessage={error.message} />;

  return (
    <Wrapper>
      <PaginationAndSort totalPages={data?.totalPages ?? 1} />
      <div className="container">
        {data?.hubProducts.map((product) => (
          <ProductCard key={product._id} product={product} showAdd={true} />
        ))}
      </div>
    </Wrapper>
  );
}
export default HomePage;
