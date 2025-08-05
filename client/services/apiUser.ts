import type { Order } from "../src/context/orderSlice";
import type {
  DataForUpdateUserProduct,
  ServerErrorResponse,
  ServerRegisterResponse,
  ServerResponse,
  ServerResponseForCreateOrder,
  ServerResponseForHubProducts,
  serverResponseForStats,
  ServerResponseForUserProduct,
} from "../src/utils/types";
export async function ChangeStoreImageApi(
  formData: FormData
): Promise<ServerRegisterResponse> {
  try {
    const res = await fetch("/api/v1/user/uploadImageForStore", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    //console.log("res in front end", res);
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery bu onError
    const data: ServerRegisterResponse = await res.json();
    //console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}

export async function deleteStoreImageApi(obj: {
  imageID: string;
  storeCoverPicture?: string;
  storeProfilePicture?: string;
}): Promise<ServerRegisterResponse> {
  try {
    const res = await fetch("/api/v1/user/deleteStoreImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(obj),
    });
    //console.log("res in front end", res);
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery bu onError
    const data: ServerRegisterResponse = await res.json();
    //console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function uploadProductApi(
  formData: FormData
): Promise<ServerResponse> {
  try {
    const res = await fetch("/api/v1/user/uploadProduct", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    //console.log("res in front end", res);
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery by onError
    const data: ServerResponse = await res.json();
    //console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function getUserProductsApi(): Promise<ServerResponseForUserProduct> {
  try {
    const res = await fetch(`/api/v1/user/userProducts`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery bu onError
    const data: ServerResponseForUserProduct = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function updateUserProductApi(
  obj: DataForUpdateUserProduct
): Promise<ServerResponse> {
  try {
    const res = await fetch(`/api/v1/user/userProduct/${obj.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj.updatedData),
    });
    //console.log("res in front end", res);
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery by onError
    const data: ServerResponse = await res.json();
    //console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}

export async function deleteUserProductApi(
  productId: string
): Promise<ServerResponse> {
  try {
    const res = await fetch(`/api/v1/user/userProduct/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    //console.log("res in front end", res);
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery by onError
    const data: ServerResponse = await res.json();
    //console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
export async function getHubProductsApi({
  page,
  search,
  sort,
}: {
  page: string | null;
  search: string | null;
  sort: string | null;
}): Promise<ServerResponseForHubProducts> {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (sort) params.append("sort", sort);

    const res = await fetch(`/api/v1/user/hubProducts?${params.toString()}`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery by onError
    const data: ServerResponseForHubProducts = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}

export async function createOrderApi(
  order: Order
): Promise<ServerResponseForCreateOrder> {
  try {
    const res = await fetch("/api/v1/user/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    //console.log("res in front end", res);
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery bu onError
    const data: ServerResponseForCreateOrder = await res.json();
    //console.log("data", data);
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}

export async function getStatsApi(): Promise<serverResponseForStats> {
  try {
    const res = await fetch(`/api/v1/user/stats`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      //caught error from app.use((err, req, res, next)
      const errorData: ServerErrorResponse = await res.json();
      //console.log("errorData", errorData);
      throw new Error(errorData.msg || "Something went wrong");
    }
    // all the throw error will be caught in reactQuery bu onError
    const data: serverResponseForStats = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    );
  }
}
