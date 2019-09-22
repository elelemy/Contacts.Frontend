import { Component } from '@angular/core';
import { TableClient } from './TableClient';

@Component({
    selector: 'PagingLabel',
	template: `<p>Displaying {{getStart()}} - {{getEnd()}}, of {{table.dataSource.length}} Rows</p>`
})
export class PagingLabel  {

	constructor(public table: TableClient) { }

	getStart() {
		return this.table.start + 1;
	}

	getEnd() {
		return this.table.end;
	}
}
