import { Component, Input } from '@angular/core';
import { TableClient } from './TableClient';

@Component({
    selector: 'sort-field',
	template: `
		<a href="javascript:;" (click)="Sort()">
			<ng-content></ng-content> 
			<i class="fa" [ngClass]="GetSortedIcon()"></i>
		</a>
	`
})
export class SortField {

    @Input() field;

    constructor(public table: TableClient) { }
	
	Sort() {
		if (this.table.gridOptions.SortField === this.field) {
			this.table.gridOptions.SortOrder = (this.table.gridOptions.SortOrder === "Desc") ? "Asc" : "Desc";
		} else {
			this.table.gridOptions.SortField = this.field;
			this.table.gridOptions.SortOrder = "Asc";
		}
		// this.table.Render();
	};

    GetSortedIcon() {
        if (this.field === this.table.gridOptions.SortField) {
            return (this.table.gridOptions.SortOrder === 'Asc') ? 'fa-sort-asc' : 'fa-sort-desc';
        }
        return 'fa-sort';
    }
}