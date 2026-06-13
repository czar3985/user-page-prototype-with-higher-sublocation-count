import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {LocationSearchItem, PrimaryLocationSearchItem} from '../../models/edit-user-profile.models';

@Component({
    selector: 'app-location-typeahead',
    standalone: true,
    imports: [ReactiveFormsModule, MatAutocompleteModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule],
    templateUrl: './location-typeahead.component.html',
    styleUrl: './location-typeahead.component.scss'
})
export class LocationTypeaheadComponent {
    @Input({required: true}) control!: FormControl<string | null>;
    @Input() label = 'Location';
    @Input() options: PrimaryLocationSearchItem[] = [];
    @Input() selectableWithCheckbox = false;
    @Input() additionalHint = '';
    @Output() searchChanged = new EventEmitter<string>();
    @Output() optionSelected = new EventEmitter<PrimaryLocationSearchItem>();
    @Output() optionToggled = new EventEmitter<{ option: PrimaryLocationSearchItem; linked: boolean }>();
    readonly minSearchLength = 3;

    onInput(value: string): void {
        if (value.length >= this.minSearchLength) this.searchChanged.emit(value);
    }

    onSelected(event: MatAutocompleteSelectedEvent): void {
        this.optionSelected.emit(event.option.value as PrimaryLocationSearchItem);
    }

    getDescription(option: PrimaryLocationSearchItem): string {
        const item = option as LocationSearchItem;
        if (item.parentLocationId && item.parentLocationName) return `Parent Location: ${item.parentLocationName}`;
        if (item.sublocations?.length) return `Sub Locations: ${item.sublocations.map((s) => s.name).join(', ')}`;
        return '';
    }

    displayLocation(option?: PrimaryLocationSearchItem | string | null): string {
        return typeof option === 'string' ? option : option?.name ?? '';
    }
}
