import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SublocationsState} from '../../models/edit-user-profile.models';

@Component({
    selector: 'app-sublocations-inner-table',
    standalone: true,
    imports: [MatCheckboxModule, MatProgressSpinnerModule],
    templateUrl: './sublocations-inner-table.component.html',
    styleUrl: './sublocations-inner-table.component.scss'
})
export class SublocationsInnerTableComponent implements OnInit, OnChanges {
    @Input({required: true}) locationId!: string;
    @Input() sublocationsState: SublocationsState | null = null;
    @Output() loadMore = new EventEmitter<{ locationId: string; skip: number; take: number }>();
    @Output() sublocationToggled = new EventEmitter<{ locationId: string; linked: boolean }>();
    @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

    readonly take = 5;

    get hasMore(): boolean {
        const state = this.sublocationsState;
        return !!state && state.data.length < state.totalCount;
    }

    ngOnInit(): void {
        if (!this.sublocationsState) {
            this.loadMore.emit({locationId: this.locationId, skip: 0, take: this.take});
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['locationId'] && !changes['locationId'].firstChange) {
            this.loadMore.emit({locationId: this.locationId, skip: 0, take: this.take});
        }
    }

    onScroll(event: Event): void {
        const el = event.target as HTMLDivElement;
        const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 60;
        if (!nearBottom) return;
        const state = this.sublocationsState;
        if (!state || state.loading) return;
        if (state.data.length >= state.totalCount) return;
        this.loadMore.emit({locationId: this.locationId, skip: state.data.length, take: this.take});
    }
}
