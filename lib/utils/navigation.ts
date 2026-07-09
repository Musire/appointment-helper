
export type BookingParams = {
    store?: string | undefined;
    staff?: string | undefined;
    service?: string | undefined;
    dateTime?: string| undefined;
}

export function buildQuery(step: string, params: BookingParams): string {
    const pathname = `/booking/${step}`;
    
    // Filter out any undefined or empty values
    const cleanParams = Object.entries(params).filter(([_, value]) => value !== undefined) as [string, string][];
    const searchString = new URLSearchParams(cleanParams).toString();

    return searchString ? `${pathname}?${searchString}` : pathname;
}