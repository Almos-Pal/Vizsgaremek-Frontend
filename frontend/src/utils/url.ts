export const getPageFromSearchParams = (searchParams: any): number => {
  if (searchParams?.f) {
    return Math.round(parseInt(searchParams?.f) / 10);
  }
  return parseInt(searchParams?.page || "1") - 1;
};

export const getQueryStringFromSearchParams = (searchParams: {
  [key: string]: string;
}) => {
  const queryString = Object.entries(searchParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  return queryString ? `?${queryString}` : "";
};
