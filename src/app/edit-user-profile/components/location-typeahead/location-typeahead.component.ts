import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LocationSearchItem } from '../../models/edit-user-profile.models';

@Component({ selector: 'app-location-typeahead', standalone: true, imports: [ReactiveFormsModule, MatAutocompleteModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule], templateUrl: './location-typeahead.component.html', styleUrl: './location-typeahead.component.scss' })
export class LocationTypeaheadComponent {
  @Input({ required: true }) control!: FormControl<string | null>;
  @Input() label = 'Location';
  @Input() options: LocationSearchItem[] = [];
  @Input() selectableWithCheckbox = false;
  @Output() searchChanged = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<LocationSearchItem>();
  @Output() optionToggled = new EventEmitter<{ option: LocationSearchItem; linked: boolean }>();
  readonly minSearchLength = 3;
  onInput(value: string): void { if (value.length >= this.minSearchLength) this.searchChanged.emit(value); }
  onSelected(event: MatAutocompleteSelectedEvent): void { this.optionSelected.emit(event.option.value as LocationSearchItem); }
  getDescription(option: LocationSearchItem): string { if (option.parentLocationId && option.parentLocationName) return `Parent Location: ${option.parentLocationName}`; if (option.sublocations?.length) return `Sub Locations: ${option.sublocations.map((s) => s.name).join(', ')}`; return ''; }
  displayLocation(option?: LocationSearchItem | string | null): string { return typeof option === 'string' ? option : option?.name ?? ''; }
}
