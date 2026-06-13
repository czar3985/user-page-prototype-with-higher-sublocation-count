import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
    AccessibleLocationsTableComponent
} from './components/accessible-locations-table/accessible-locations-table.component';
import {LocationTypeaheadComponent} from './components/location-typeahead/location-typeahead.component';
import {EditUserProfileRoutingModule} from './edit-user-profile-routing.module';
import {EditUserProfilePageComponent} from './pages/edit-user-profile-page/edit-user-profile-page.component';

@NgModule({
    declarations: [],
    imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, LocationTypeaheadComponent, AccessibleLocationsTableComponent, EditUserProfileRoutingModule, EditUserProfilePageComponent]
})
export class EditUserProfileModule {
}
