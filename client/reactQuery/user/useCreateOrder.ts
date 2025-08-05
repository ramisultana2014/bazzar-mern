import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createOrderApi } from "../../services/apiUser";
import type { Order } from "../../src/context/orderSlice";
export function useCreateOrder() {
  const navigate = useNavigate();
  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: (orderObj: Order) => createOrderApi(orderObj),
    onSuccess: (data) => {
      //console.log(data.data.user);
      toast.success(`${data.msg}`);
      navigate(`/checkout/${data.orderId}`);
    },
    onError: (error) => {
      //console.log("error", error);
      const errorMessage = error.message || "Something went wrong";
      toast.error(errorMessage);
    },
  });
  return { createOrder, isPending };
}
