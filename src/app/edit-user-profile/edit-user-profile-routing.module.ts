import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditUserProfilePageComponent} from './pages/edit-user-profile-page/edit-user-profile-page.component';

const routes: Routes = [{path: '', component: EditUserProfilePageComponent}];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditUserProfileRoutingModule {
}
