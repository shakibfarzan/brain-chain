export type AppParams = {
  slug: string;
};

export type PropsWithParams<T = unknown> = {
  params: AppParams;
  searchParams: Promise<Record<string, string>>;
} & T;
