import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { GroupedLocationsResponse } from '../../models/edit-user-profile.models';

@Component({ selector: 'app-accessible-locations-table', standalone: true, imports: [MatCheckboxModule, MatPaginatorModule, MatTableModule], templateUrl: './accessible-locations-table.component.html', styleUrl: './accessible-locations-table.component.scss' })
export class AccessibleLocationsTableComponent {
  @Input() groupedLocations: GroupedLocationsResponse | null = null;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Output() sublocationToggled = new EventEmitter<{ locationId: string; linked: boolean }>();
}
