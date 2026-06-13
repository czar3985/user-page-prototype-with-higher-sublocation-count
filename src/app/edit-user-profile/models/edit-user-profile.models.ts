export type LocationSearchType = 'all' | 'primarylocation' | 'sublocation';
export interface UserProfile { id: string; clientId: string; firstName: string; lastName: string; email: string; primaryLocationId: string | null; primaryLocationName: string | null; }
export interface UpdateUserProfileRequest { firstName: string; lastName: string; email: string; primaryLocationId: string | null; }
export interface LocationSearchRequest { clientId: string; type: LocationSearchType; searchString: string; skip: number; take: number; }
export interface LocationSearchResponse { data: LocationSearchItem[]; skipCount: number; startIndex: number; takeSize: number; totalCount: number; }
export interface LocationSearchItem { id: string; name: string; parentLocationId: string | null; parentLocationName: string | null; sublocations: LocationSearchSublocation[] | null; isLinkedToUser?: boolean; }
export interface LocationSearchSublocation { id: string; name: string; isLinkedToUser?: boolean; }
export interface GroupedLocationsResponse { data: GroupedLocation[]; hasNextPage: boolean; hasPreviousPage: boolean; pageIndex: number; pageSize: number; totalCount: number; totalPages: number; }
export interface GroupedLocation { id: string; name: string; sublocations: GroupedSublocation[]; }
export interface GroupedSublocation { id: string; name: string; isLinkedToUser: boolean; }
export interface EditUserProfileState { user: UserProfile | null; groupedLocations: GroupedLocationsResponse | null; primaryLocationOptions: LocationSearchItem[]; accessibleLocationOptions: LocationSearchItem[]; loading: boolean; saving: boolean; error: string | null; }
export interface ToggleAccessibleLocationRequest { userId: string; locationId: string; linked: boolean; }
