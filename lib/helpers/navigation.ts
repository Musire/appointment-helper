
export type BookingParams = {
    store?: string | undefined;
    staff?: string | undefined;
    service?: string | undefined;
    dateTime?: string| undefined;
}

export function buildQuery(step: string, params: BookingParams) {
  return {
    pathname: `/booking/${step}`,
    query: params,
  }
}