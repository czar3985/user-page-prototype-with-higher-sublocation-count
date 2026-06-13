import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUserProfileModule } from '../../edit-user-profile.module';
import { MOCK_GROUPED_LOCATIONS, MOCK_USER_PROFILE } from '../../mocks/edit-user-profile.mock';
import { EditUserProfileService } from '../../services/edit-user-profile.service';
import { EditUserProfilePageComponent } from './edit-user-profile-page.component';

describe('EditUserProfilePageComponent', () => {
  let fixture: ComponentFixture<EditUserProfilePageComponent>;
  const api = jasmine.createSpyObj('EditUserProfileService', ['getUserProfile', 'getGroupedLocations', 'updateUserProfile', 'searchLocations']);
  beforeEach(async () => { api.getUserProfile.and.returnValue(of(MOCK_USER_PROFILE)); api.getGroupedLocations.and.returnValue(of(MOCK_GROUPED_LOCATIONS)); api.updateUserProfile.and.returnValue(of(MOCK_USER_PROFILE)); api.searchLocations.and.returnValue(of({ data: [], skipCount: 0, startIndex: 0, takeSize: 20, totalCount: 0 })); await TestBed.configureTestingModule({ imports: [EditUserProfileModule], providers: [{ provide: EditUserProfileService, useValue: api }, { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => MOCK_USER_PROFILE.id } } } }, { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }] }).compileComponents(); fixture = TestBed.createComponent(EditUserProfilePageComponent); fixture.detectChanges(); });
  it('renders the edit profile title', () => { expect(fixture.nativeElement.textContent).toContain("Editing Avery Johnson's Profile"); });
  it('patches profile form from loaded user', () => { expect(fixture.componentInstance.form.controls.email.value).toBe('avery.johnson@example.com'); });
});
