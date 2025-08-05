import type {
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
} from "react";
import { type IconType } from "react-icons";
export type CountryObject = {
  code: string;
  name: string;
  flag: string;
  region: string;
  phoneCode: string;
};

export type FormSignupTypes = {
  name: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  storeName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
export type FormForgetPasswordTypes = {
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode: string;
};
export type FormLoginTypes = {
  email: string;
  password: string;
};
export type UploadImageType = {
  picture: FileList;
};
export type UploadProductType = {
  title: string;
  picture: FileList;
  price: number;
  description: string;
  quantity: number;
  category: string;
  productOwnerID: string;
};
export type UploadProductTypeWithID = UploadProductType & {
  productOwnerID: string;
};
export type UpdateUserProductType = {
  title: string;
  price: number;
  quantity: number;
};
export type DataForUpdateUserProduct = {
  updatedData: {
    title: string;
    price: number;
    quantity: number;
    productOwnerId: string;
  };
  productId: string;
};
export type ServerRegisterResponse = {
  msg: string;
  data: {
    user: {
      _id: string;
      name: string;
      lastName: string;
      country: string;
      phoneNumber: string;
      email: string;
      role: string;
      isVerified: boolean;
      storeName: string;
      storeProfilePicture?: string;
      storeProfilePictureID?: string;
      storeCoverPicture?: string;
      storeCoverPictureID?: string;
    };
  };
};
export type UserProduct = {
  _id: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
  productImage?: string;
  productImageID?: string;
  category: string;
  productOwnerID: string | { _id: string; email: string; phoneNumber: string };
  createdAt: Date;
  updatedAt: Date;
};
// { _id: string; email: string; phoneNumber: string } if i want later to use the committed populate productOwnerID in ProductModel
export type ServerResponseForUserProduct = {
  msg: string;
  data: {
    products: UserProduct[];
  };
};
export type ServerResponseForHubProducts = {
  page: number;
  totalPages: number;
  totalItems: number;
  hubProducts: UserProduct[];
  count: number;
};
export type ServerResponseForCreateOrder = {
  msg: string;
  orderId: string;
};
export type ServerResponse = {
  msg: string;
};
export type serverResponseForStats = {
  totalProductQuantity: { product: string; totalQuantity: number }[];
  topSellingProducts: { product: string; totalSells: number }[];
  monthlyProductOrdering: { date: string; count: number }[];
};
export type ServerErrorResponse = {
  msg: string;
};
export type emailForResetPasswordType = {
  email: string;
};
export type NavLinksType = {
  text: string;
  path: string;
  icon: IconType;
};

export type ComponentWithChildren = PropsWithChildren;

export type ClonableElement<P = unknown> = ReactElement<
  P,
  string | JSXElementConstructor<P>
>;
export type ComponentPropsWithoutName = {
  children: ClonableElement<{ onClick?: () => void }>;
  nameToOpenWindow: string;
};
export type ComponentPropsWithoutNameToOpenWindow = {
  name: string;
  children: ReactElement<{ closewindow?: () => void }>;
};
export type ComponentListProps = {
  id: string;
  children?: React.ReactNode;
};
export type ComponentButtonProps = {
  onClick: () => void;
  icon: IconType;
  children?: React.ReactNode;
};
export type TypeForToggleForImageMenuList = {
  name: string;
  children?: React.ReactNode;
};
