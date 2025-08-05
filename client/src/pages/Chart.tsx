import { NoProducts, Skeleton } from "../components";
import { useGetStats } from "../../reactQuery/user/useGetStats";
import Wrapper from "../wrapper/Chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
function Chart() {
  const { data, isPending, error } = useGetStats();
  if (isPending) return <Skeleton />;
  //console.log(error.message);
  if (error) return <NoProducts errorMessage={error.message} />;

  return (
    <Wrapper>
      <div>
        <h2>total Product Quantity sells</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.totalProductQuantity} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", color: "#000" }}
            />
            <Bar dataKey="totalQuantity" fill="#2563eb" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>top Selling Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.topSellingProducts} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis allowDecimals={false} unit="$" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", color: "#000" }}
            />
            <Bar dataKey="totalSells" fill="#2563eb" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h2>monthly total Products Ordering</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.monthlyProductOrdering} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", color: "#000" }}
            />
            <Bar dataKey="count" fill="#2563eb" barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Wrapper>
  );
}
export default Chart;
