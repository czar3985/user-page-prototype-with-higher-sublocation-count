import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {EditUserProfileService} from './edit-user-profile.service';

describe('EditUserProfileService', () => {
    let service: EditUserProfileService;
    let http: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({providers: [provideHttpClient(), provideHttpClientTesting()]});
        service = TestBed.inject(EditUserProfileService);
        http = TestBed.inject(HttpTestingController);
    });
    afterEach(() => http.verify());
    it('searches locations with typed query params', () => {
        service.searchLocations({
            clientId: 'client-1',
            type: 'all',
            searchString: 'pri',
            skip: 0,
            take: 20
        }).subscribe();
        const req = http.expectOne((r) => r.url === '/api/locations' && r.params.get('client') === 'client-1' && r.params.get('type') === 'all');
        expect(req.request.method).toBe('GET');
        req.flush({data: [], skipCount: 0, startIndex: 0, takeSize: 20, totalCount: 0});
    });
    it('adds accessible location links', () => {
        service.addAccessibleLocation({userId: 'user-1', locationId: 'loc-1', linked: true}).subscribe();
        const req = http.expectOne('/users/user-1/locations');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({locationId: 'loc-1'});
        req.flush(null);
    });
});
