import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {MOCK_GROUPED_LOCATIONS, MOCK_PRIMARY_LOCATION_SEARCH, MOCK_USER_PROFILE} from '../mocks/edit-user-profile.mock';
import {EditUserProfileService} from './edit-user-profile.service';
import {EditUserProfileFacade} from './edit-user-profile-facade.service';

describe('EditUserProfileFacade', () => {
    let facade: EditUserProfileFacade;
    let api: jasmine.SpyObj<EditUserProfileService>;
    beforeEach(() => {
        api = jasmine.createSpyObj('EditUserProfileService', ['getUserProfile', 'getGroupedLocations', 'searchLocations', 'updateUserProfile', 'addAccessibleLocation', 'removeAccessibleLocation']);
        api.getUserProfile.and.returnValue(of(MOCK_USER_PROFILE));
        api.getGroupedLocations.and.returnValue(of(MOCK_GROUPED_LOCATIONS));
        api.searchLocations.and.returnValue(of(MOCK_PRIMARY_LOCATION_SEARCH));
        api.updateUserProfile.and.returnValue(of(MOCK_USER_PROFILE));
        api.addAccessibleLocation.and.returnValue(of(void 0));
        api.removeAccessibleLocation.and.returnValue(of(void 0));
        TestBed.configureTestingModule({
            providers: [EditUserProfileFacade, {
                provide: EditUserProfileService,
                useValue: api
            }]
        });
        facade = TestBed.inject(EditUserProfileFacade);
    });
    it('loads user and grouped locations into state', (done) => {
        facade.load(MOCK_USER_PROFILE.id);
        facade.state$.subscribe((state) => {
            if (state.user) {
                expect(state.user.firstName).toBe('Avery');
                expect(state.groupedLocations?.data.length).toBe(2);
                done();
            }
        });
    });
    it('debounces primary location search and requires three characters', fakeAsync(() => {
        facade.load(MOCK_USER_PROFILE.id);
        facade.queuePrimarySearch('pr');
        tick(300);
        expect(api.searchLocations).not.toHaveBeenCalled();
        facade.queuePrimarySearch('pri');
        tick(300);
        expect(api.searchLocations).toHaveBeenCalledWith(jasmine.objectContaining({
            type: 'primarylocation',
            searchString: 'pri'
        }));
    }));
    it('calls add endpoint when linking a location', () => {
        facade.load(MOCK_USER_PROFILE.id);
        facade.toggleAccessibleLocation('loc-1', true);
        expect(api.addAccessibleLocation).toHaveBeenCalledWith({
            userId: MOCK_USER_PROFILE.id,
            locationId: 'loc-1',
            linked: true
        });
    });
});
