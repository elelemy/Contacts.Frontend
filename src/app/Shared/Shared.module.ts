import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation'
import 'rxjs/Rx';
import { PhonesRepository } from './Repositories/PhonesRepository';
import { ContactsRepository } from './Repositories/ContactsRepository';
import { Helper } from './Services/Helper';
import { Notify } from './Services/Notify';
import { TableClient } from './Directives/TableClient/TableClient';
import { SortField } from './Directives/TableClient/SortField';
import { Pagination } from './Directives/TableClient/Pagination';
import { PageSizeOption } from './Directives/TableClient/PageSizeOption';
import { PagingLabel } from './Directives/TableClient/PagingLabel';
import { ExportCsvClient } from './Directives/TableClient/ExportCsvClient';
import { Select2Directive } from './Directives/Select2/Select2.Directive';
import { Select2NewDirective } from './Directives/Select2/Select2New.Directive';
import { EqualValidator } from './Directives/EqualValidator';
import { FullCalendar } from './Directives/Calender';
import { RoutingState } from './Services/RoutingState';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		NgbModule.forRoot(),
		RouterModule,
		BsDropdownModule,
		HttpClientModule,
		CustomFormsModule
	],
	declarations: [
		TableClient,
		SortField,
		Pagination,
		PageSizeOption,
		PagingLabel,
		Select2Directive,
		Select2NewDirective,
		EqualValidator,
		ExportCsvClient,
		FullCalendar
	],
	providers: [
		ContactsRepository, PhonesRepository
	],
	exports: [
		TableClient,
		SortField,
		Pagination,
		PageSizeOption,
		PagingLabel,
		ExportCsvClient,
		Select2Directive,
		Select2NewDirective,
		EqualValidator,
		FullCalendar
	],
	entryComponents: [
	],
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [ Helper, Notify, RoutingState]
		};
	}
}
