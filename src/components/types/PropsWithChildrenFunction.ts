import { ReactNode } from "react";

type PropsWithChildrenFunction<P, T> = P & {
  children?(item: T): ReactNode;
};

export default PropsWithChildrenFunction;
