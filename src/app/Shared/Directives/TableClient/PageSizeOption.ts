import { Component, Input, OnInit } from '@angular/core';
import { TableClient } from './TableClient';

@Component({
    selector: 'PageSizeOption',
	template: `
    	<ul class="pagination">
			<li *ngFor="let option of table.pageSizeOptions" class="page-item" [ngClass]="{'active' : option === table.gridOptions.PageSize}">
				<a href="javascript:;" class="page-link" (click)="ChangePageSize(option)">{{option}}</a>
			</li>
		</ul> 
   `
})
export class PageSizeOption implements OnInit {
       
	constructor(public table: TableClient) { }
	
    ngOnInit() {
		
    }

    ChangePageSize(option: number) {
        this.table.gridOptions.PageSize = option;
        // this.table.Render();
    }

}