import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {SublocationsState, UserParentLocationsResponse} from '../../models/edit-user-profile.models';
import {SublocationsInnerTableComponent} from '../sublocations-inner-table/sublocations-inner-table.component';

@Component({
    selector: 'app-accessible-locations-table',
    standalone: true,
    imports: [MatCheckboxModule, MatPaginatorModule, MatTableModule, SublocationsInnerTableComponent],
    templateUrl: './accessible-locations-table.component.html',
    styleUrl: './accessible-locations-table.component.scss'
})
export class AccessibleLocationsTableComponent {
    @Input() userParentLocations: UserParentLocationsResponse | null = null;
    @Input() sublocationsMap: Record<string, SublocationsState> = {};
    @Output() pageChanged = new EventEmitter<PageEvent>();
    @Output() locationToggled = new EventEmitter<{ locationId: string; linked: boolean }>();
    @Output() sublocationToggled = new EventEmitter<{ locationId: string; linked: boolean }>();
    @Output() sublocationsLoadRequested = new EventEmitter<{ locationId: string; skip: number; take: number }>();
}
