import { Component, Input, OnInit } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as _ from 'underscore';
import { TableClient } from './TableClient';

@Component({
    selector: 'export-csv-client',
    template: `
        <button title="Export" class="btn btn-xs btn-csv" (click)="Export()">
	        <i class="fa fa-file-excel-o"></i>
        </button> 
    `
})
export class ExportCsvClient implements OnInit {
    @Input('options') Options: any;
    constructor(public table: TableClient) { }

    ngOnInit() {
    }

    Export() {
        let self = this;
        let exportedRows = _.map(self.table.dataSource, function (row) {
            return _.pick(row, self.Options.Columns);
        });

        let options = {
            filename: this.Options.Filename,
            headers: this.Options.Headers
        }

        new Angular2Csv(exportedRows, options.filename, options);
    }

}