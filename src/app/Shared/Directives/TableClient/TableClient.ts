import { Component, OnInit, NgModule, Input, Output, EventEmitter, SimpleChange, OnChanges, DoCheck, KeyValueDiffers, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'underscore';

@Component({
	selector: 'table-client',
	template: `
	<ng-content></ng-content>  `,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TableClient),
			multi: true
		}
	]
})
export class TableClient implements OnInit, OnChanges, DoCheck, ControlValueAccessor {
	@Input() dataSource;
	@Input() gridOptions;
	@Input() pageSizeOptions;
	start: number;
	end: number;
	differ: any;
	propagateChange = (_: any) => { };

	constructor(private differs: KeyValueDiffers) {
		this.differ = differs.find({}).create();
	}

	ngOnInit() {
		if (!this.pageSizeOptions) {
			this.pageSizeOptions = [10, 25, 50, 100];
		}

		if (!this.gridOptions.PageIndex) {
			this.gridOptions.PageIndex = 0;
		}

		if (!this.gridOptions.PageSize) {
			this.gridOptions.PageSize = this.pageSizeOptions[0];
		}
	}

	writeValue(value: any) {
		this.Render();
	}

	registerOnChange(fn) {
		this.propagateChange = fn;
	}

	registerOnTouched() {

	}

	ngDoCheck() {
		var changes = this.differ.diff(this.gridOptions);
		if (changes) {
			this.Render();
		}
	}

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		if (changes.dataSource) {
			this.Render();
		}
	}

	Render() {
		var that = this;
		var sortedRows = _.sortBy(that.dataSource, function (row) {
			if (typeof row[that.gridOptions.SortField] === "string") {
				return row[that.gridOptions.SortField].toLowerCase();
			} else {
				return row[that.gridOptions.SortField];
			}
		});

		if (that.gridOptions.SortOrder === 'Desc') {
			sortedRows.reverse();
		}

		this.start = this.gridOptions.PageIndex * this.gridOptions.PageSize;
		this.end = this.start + this.gridOptions.PageSize;
		if (this.end > (this.dataSource.length - 1)) {
			this.end = this.dataSource.length;
		}
		let page = sortedRows.slice(this.start, this.end)
		this.propagateChange(page);
		// this.sortedArray.emit(page);
	};
}
