export type LayoutParams<T extends Record<string, string | string[]>> = {
  children: React.ReactNode;
  params: T;
};

export type PageParams<T extends Record<string, string | string[]>> = {
  params: Promise<T>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export type RouteLayoutType = {
  children: React.ReactNode;
};
