import { Component, AfterViewInit, ElementRef, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';

import * as $ from 'jquery';
import 'fullcalendar';

@Component({
	template: '<div></div>',
	selector: 'full-calendar'
})
export class FullCalendar implements AfterViewInit, OnChanges, OnDestroy {
	@Input() DataSource: any[];
	@Input() Optaions;
	calendarElement = $(this.elementRef.nativeElement);
	isInitialized: boolean = false;

	constructor(private elementRef: ElementRef) { }

	ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
		//console.log("ngOnChanges");
		if (this.isInitialized) {
			this.calendarElement.fullCalendar('removeEvents');
			this.calendarElement.fullCalendar('addEventSource', this.DataSource);
		}
	}

	ngAfterViewInit() {
		//console.log("ngAfterViewInit");
		//var options = mergeOptions({}, defaults, instanceOptions);
		this.calendarElement.fullCalendar(this.Optaions);
		this.calendarElement.fullCalendar('addEventSource', this.DataSource);
		this.isInitialized = true;
	}

	ngOnDestroy() {
		//console.log("ngOnDestroy");
		this.calendarElement.fullCalendar('destroy')
	}
}
