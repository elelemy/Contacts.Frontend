import { Directive, forwardRef, ElementRef, HostListener, OnChanges, SimpleChange, Input, Output, EventEmitter, Renderer, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import "select2";
import * as $ from 'jquery';

@Directive({
	selector: '[SelectD]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => Select2NewDirective),
			multi: true
		}
	]
})

export class Select2NewDirective implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
	@Input() placeholder;
	@Input() hideAllowClear: boolean;
	@Input() hideSearchbox: boolean;

	constructor(private el: ElementRef) { }
	select2: any;
	private onTouched = () => { };
	private onChange: (value: any) => void = () => { };

	writeValue(value) {
		// console.log(value);
		$(this.el.nativeElement).val(value).trigger("change");
		if (typeof value === 'boolean') {
			$(this.el.nativeElement).val(String(value)).trigger("change");
		}
	}
	registerOnChange(fn: any) {
		this.onChange = fn;
	}
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}
	ngOnInit() { }

	ngAfterViewInit() {

		let options = {
			placeholder: this.placeholder,
			allowClear: this.hideAllowClear
		};

		if (this.hideSearchbox) {
			options["minimumResultsForSearch"] = Infinity;
		}

		this.select2 = $(this.el.nativeElement).select2(options);

		$(this.el.nativeElement).on('change', () => {
			let el = $(this.el.nativeElement);
			// console.log(el.val());

			if (!el.val()) {
				this.onChange(null);
			}
			else if (typeof el.val() !== 'object') {               //Single Selection
				let res = el.val();
				if (Number(res)) {                                 // for Id:number
					this.onChange(Number(res));
				} else if (res === 'true' || res === 'false') {    // for Id:boolean
					this.onChange((res === 'true' ? true : false));
				} else {                                           // for Id:string
					this.onChange(res);
				}
			}

			else {                                                 //Multiple Selection
				let numberArr: any[] = [];
				if (el.val()) {
					for (let item of el.val()) {
						let result = item.split(":");
						let val = result[1].trim();
						(Number(val)) ? numberArr.push(Number(val)) : numberArr.push(val);
					}
				}
				this.onChange(numberArr);
			}
		});
	}

	ngOnDestroy() {
		$(this.el.nativeElement).select2('destroy');
	}
}