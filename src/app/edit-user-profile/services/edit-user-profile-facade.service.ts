import {Injectable} from '@angular/core';
import {
    BehaviorSubject,
    catchError,
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    EMPTY,
    finalize,
    map,
    Observable,
    of,
    Subject,
    switchMap,
    tap
} from 'rxjs';
import {
    EditUserProfileState,
    LocationChildrenResponseItem,
    LocationSearchItem,
    PrimaryLocationSearchItem,
    SublocationsState,
    UpdateUserProfileRequest
} from '../models/edit-user-profile.models';
import {
    getMockLocationSublocations,
    getMockUserParentLocations,
    MOCK_ACCESSIBLE_LOCATION_SEARCH,
    MOCK_PRIMARY_LOCATION_SEARCH,
    MOCK_USER_PARENT_LOCATIONS,
    MOCK_USER_PROFILE
} from '../mocks/edit-user-profile.mock';
import {EditUserProfileService} from './edit-user-profile.service';

const initialState: EditUserProfileState = {
    user: null,
    userParentLocations: null,
    sublocationsMap: {},
    primaryLocationOptions: [],
    accessibleLocationOptions: [],
    loading: false,
    saving: false,
    error: null
};

@Injectable()
export class EditUserProfileFacade {
    private readonly stateSubject = new BehaviorSubject<EditUserProfileState>(initialState);
    readonly state$ = this.stateSubject.asObservable();
    readonly title$ = this.state$.pipe(map((s) => s.user ? `Editing ${s.user.firstName} ${s.user.lastName}'s Profile` : 'Editing User Profile'));
    private readonly primarySearch$ = new Subject<{ searchString: string; skip: number; take: number }>();
    private readonly accessibleSearch$ = new Subject<{ searchString: string; skip: number; take: number }>();

    constructor(private readonly api: EditUserProfileService) {
        this.primarySearch$.pipe(debounceTime(250), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), switchMap((q) => this.searchPrimary(q.searchString, q.skip, q.take))).subscribe();
        this.accessibleSearch$.pipe(debounceTime(250), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), switchMap((q) => this.searchAccessible(q.searchString, q.skip, q.take))).subscribe();
    }

    load(userId: string): void {
        this.patch({loading: true, error: null});
        combineLatest({
            user: this.api.getUserProfile(userId).pipe(catchError(() => of(MOCK_USER_PROFILE))),
            userParentLocations: this.api.getUserParentLocations(userId, 0, 5).pipe(catchError(() => of(MOCK_USER_PARENT_LOCATIONS)))
        })
            .pipe(finalize(() => this.patch({loading: false})))
            .subscribe(({user, userParentLocations}) => this.patch({user, userParentLocations}));
    }

    loadUserParentLocations(pageIndex: number, pageSize: number): void {
        const userId = this.stateSubject.value.user?.id;
        if (!userId) return;
        this.patch({loading: true});
        this.api.getUserParentLocations(userId, pageIndex, pageSize)
            .pipe(catchError(() => of(getMockUserParentLocations(pageIndex, pageSize))), finalize(() => this.patch({loading: false})))
            .subscribe((userParentLocations) => this.patch({userParentLocations, sublocationsMap: {}}));
    }

    loadSublocations(locationId: string, skip: number, take: number): void {
        const current = this.stateSubject.value.sublocationsMap[locationId];
        this.patchSublocations(locationId, {...(current ?? {data: [], totalCount: 0}), loading: true});
        this.api.getLocationSublocations(locationId, skip, take)
            .pipe(
                catchError(() => of(getMockLocationSublocations(locationId, skip, take))),
                finalize(() => this.patchSublocations(locationId, {
                    ...(this.stateSubject.value.sublocationsMap[locationId] ?? {data: [], totalCount: 0}),
                    loading: false
                }))
            )
            .subscribe((response) => {
                const existing: LocationChildrenResponseItem[] = skip > 0 ? (this.stateSubject.value.sublocationsMap[locationId]?.data ?? []) : [];
                this.patchSublocations(locationId, {
                    data: [...existing, ...response.data],
                    totalCount: response.totalCount,
                    loading: false
                });
            });
    }

    queuePrimarySearch(searchString: string, skip = 0, take = 20): void {
        if (searchString.length >= 3) this.primarySearch$.next({searchString, skip, take});
    }

    queueAccessibleSearch(searchString: string, skip = 0, take = 20): void {
        if (searchString.length >= 3) this.accessibleSearch$.next({searchString, skip, take});
    }

    saveProfile(request: UpdateUserProfileRequest): Observable<void> {
        const userId = this.stateSubject.value.user?.id;
        if (!userId) return EMPTY;
        this.patch({saving: true, error: null});
        return this.api.updateUserProfile(userId, request).pipe(tap((user) => this.patch({user})), map(() => undefined), catchError((error: unknown) => {
            this.patch({error: 'Unable to save profile.'});
            return EMPTY;
        }), finalize(() => this.patch({saving: false})));
    }

    toggleAccessibleLocation(locationId: string, linked: boolean): void {
        const userId = this.stateSubject.value.user?.id;
        if (!userId) return;
        const request = {userId, locationId, linked};
        const call$ = linked ? this.api.addAccessibleLocation(request) : this.api.removeAccessibleLocation(request);
        call$.pipe(catchError(() => {
            this.patch({error: 'Unable to update accessible location.'});
            return EMPTY;
        })).subscribe(() => this.loadUserParentLocations(
            this.stateSubject.value.userParentLocations?.pageIndex ?? 0,
            this.stateSubject.value.userParentLocations?.pageSize ?? 5
        ));
    }

    private searchPrimary(searchString: string, skip: number, take: number): Observable<unknown> {
        const clientId = this.stateSubject.value.user?.clientId ?? MOCK_USER_PROFILE.clientId;
        return this.api.searchPrimaryLocations({clientId, searchString, skip, take})
            .pipe(catchError(() => of(MOCK_PRIMARY_LOCATION_SEARCH)), tap((response) => this.patch({primaryLocationOptions: this.mergePrimaryOptions(this.stateSubject.value.primaryLocationOptions, response.data, skip)})));
    }

    private searchAccessible(searchString: string, skip: number, take: number): Observable<unknown> {
        const clientId = this.stateSubject.value.user?.clientId ?? MOCK_USER_PROFILE.clientId;
        return this.api.searchLocations({
            clientId,
            searchString,
            skip,
            take
        }).pipe(catchError(() => of(MOCK_ACCESSIBLE_LOCATION_SEARCH)), tap((response) => this.patch({accessibleLocationOptions: this.mergeOptions(this.stateSubject.value.accessibleLocationOptions, response.data, skip)})));
    }

    private mergePrimaryOptions(existing: PrimaryLocationSearchItem[], incoming: PrimaryLocationSearchItem[], skip: number): PrimaryLocationSearchItem[] {
        return skip === 0 ? incoming : [...existing, ...incoming];
    }

    private mergeOptions(existing: LocationSearchItem[], incoming: LocationSearchItem[], skip: number): LocationSearchItem[] {
        return skip === 0 ? incoming : [...existing, ...incoming];
    }

    private patchSublocations(locationId: string, state: SublocationsState): void {
        this.patch({sublocationsMap: {...this.stateSubject.value.sublocationsMap, [locationId]: state}});
    }

    private patch(partial: Partial<EditUserProfileState>): void {
        this.stateSubject.next({...this.stateSubject.value, ...partial});
    }
}
