import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupedLocationsResponse, LocationSearchRequest, LocationSearchResponse, ToggleAccessibleLocationRequest, UpdateUserProfileRequest, UserProfile } from '../models/edit-user-profile.models';

@Injectable({ providedIn: 'root' })
export class EditUserProfileService {
  constructor(private readonly http: HttpClient) {}
  getUserProfile(userId: string): Observable<UserProfile> { return this.http.get<UserProfile>(`/users/${userId}`); }
  updateUserProfile(userId: string, request: UpdateUserProfileRequest): Observable<UserProfile> { return this.http.put<UserProfile>(`/users/${userId}`, request); }
  searchLocations(request: LocationSearchRequest): Observable<LocationSearchResponse> {
    const params = new HttpParams().set('client', request.clientId).set('type', request.type).set('searchString', request.searchString).set('skip', request.skip).set('take', request.take);
    return this.http.get<LocationSearchResponse>('/api/locations', { params });
  }
  getGroupedLocations(userId: string, pageIndex: number, pageSize: number): Observable<GroupedLocationsResponse> { return this.http.get<GroupedLocationsResponse>(`/users/${userId}/locations/grouped-by-parent`, { params: new HttpParams().set('pageIndex', pageIndex).set('pageSize', pageSize) }); }
  addAccessibleLocation(request: ToggleAccessibleLocationRequest): Observable<void> { return this.http.post<void>(`/users/${request.userId}/locations`, { locationId: request.locationId }); }
  removeAccessibleLocation(request: ToggleAccessibleLocationRequest): Observable<void> { return this.http.delete<void>(`/users/${request.userId}/locations/${request.locationId}`); }
}
