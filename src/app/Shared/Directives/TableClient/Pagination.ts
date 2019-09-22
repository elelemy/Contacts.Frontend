import { Component } from '@angular/core';
import { TableClient } from './TableClient';

@Component({
	selector: 'Pagination',
	template: `
		<ngb-pagination [ellipses]="true"  
			[collectionSize]="table.dataSource.length" 
			[pageSize]="table.gridOptions.PageSize" 
			[page]="getCurrentPage()" 
			[boundaryLinks]="true" 
			(pageChange)="pageChanged($event)">
		</ngb-pagination>
    `
})
export class Pagination {

	constructor(public table: TableClient) { }

	getCurrentPage() {
		return this.table.gridOptions.PageIndex + 1;
	}

	pageChanged(currentPage: number) {
		this.table.gridOptions.PageIndex = currentPage - 1;
		// this.table.Render();
	}

}