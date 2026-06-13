import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AccessibleLocationsTableComponent } from '../../components/accessible-locations-table/accessible-locations-table.component';
import { LocationTypeaheadComponent } from '../../components/location-typeahead/location-typeahead.component';
import { LocationSearchItem, UpdateUserProfileRequest } from '../../models/edit-user-profile.models';
import { EditUserProfileFacade } from '../../services/edit-user-profile-facade.service';

@Component({ selector: 'app-edit-user-profile-page', imports: [AsyncPipe, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, LocationTypeaheadComponent, AccessibleLocationsTableComponent], templateUrl: './edit-user-profile-page.component.html', styleUrl: './edit-user-profile-page.component.scss', providers: [EditUserProfileFacade] })
export class EditUserProfilePageComponent implements OnInit {
  readonly state$ = this.facade.state$;
  readonly title$ = this.facade.title$;
  readonly form = this.fb.nonNullable.group({ firstName: ['', [Validators.required, Validators.maxLength(100)]], lastName: ['', [Validators.required, Validators.maxLength(100)]], email: ['', [Validators.required, Validators.email]], primaryLocationId: this.fb.control<string | null>(null), primaryLocationSearch: this.fb.control<string | null>(null), accessibleLocationSearch: this.fb.control<string | null>(null) });
  constructor(private readonly fb: FormBuilder, private readonly route: ActivatedRoute, private readonly router: Router, readonly facade: EditUserProfileFacade) {}
  ngOnInit(): void { const userId = this.route.snapshot.paramMap.get('userId') ?? ''; this.facade.load(userId); this.state$.pipe(filter((s) => !!s.user), take(1)).subscribe((s) => this.form.patchValue({ firstName: s.user!.firstName, lastName: s.user!.lastName, email: s.user!.email, primaryLocationId: s.user!.primaryLocationId, primaryLocationSearch: s.user!.primaryLocationName })); }
  saveAndExit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const request: UpdateUserProfileRequest = { firstName: this.form.controls.firstName.value, lastName: this.form.controls.lastName.value, email: this.form.controls.email.value, primaryLocationId: this.form.controls.primaryLocationId.value }; this.facade.saveProfile(request).subscribe(() => void this.router.navigateByUrl('/')); }
  discardAndExit(): void { void this.router.navigateByUrl('/'); }
  selectPrimaryLocation(option: LocationSearchItem): void { this.form.patchValue({ primaryLocationId: option.id, primaryLocationSearch: option.name }); }
}
