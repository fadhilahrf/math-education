import { Component, EventEmitter, Input, Output } from '@angular/core';
import SharedModule from '../shared.module';

export interface Query {
  field?: string | null;
  search?: string | null;
}

@Component({
  selector: 'search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  FILTERED_BY = 'filtered by';

  @Input()
  searchOption: string[] = [];

  @Input()
  searchQuery: Query = { field: '', search: '' };

  @Output() searchEmitter = new EventEmitter<any>();

  selectSearchOption(option: string): void {
    this.searchQuery.field = option;
  }

  search(): void {
    this.searchEmitter.emit(this.searchQuery);
  }

}
