import {Routes} from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'users/9c0a801d-82fa-43e7-a5f9-316ceefb2001/edit', pathMatch: 'full'},
    {
        path: 'users/:userId/edit',
        loadChildren: () => import('./edit-user-profile/edit-user-profile.module').then((m) => m.EditUserProfileModule)
    }
];
