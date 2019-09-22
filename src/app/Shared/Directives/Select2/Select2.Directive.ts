import { Directive, forwardRef, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import * as $ from 'jquery';
import "select2";

@Directive({
    selector: '[select2]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Select2Directive),
            multi: true
        }
    ]
})

export class Select2Directive implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
    constructor(private el: ElementRef) { }
    @Input() dataSource;
    @Input() placeholder;
    @Input() hideAllowClear: boolean;
    @Input() hideSearchbox: boolean;
    @Input() valueField;
    @Input() textField;
    select2: any;
    private onTouched = () => { };
    private onChange: (value: any) => void = () => { };

    ngOnInit(): void {
        let self = this;
        if (!self.valueField) {
            self.valueField = "Id"
        }
        if (!self.textField) {
            self.textField = "Name"
        }
    }

    ngAfterViewInit() {
		let self = this;
		this.select2 = $(this.el.nativeElement);

		let data = this.dataSource.map(function (row) {
            return { id: row[self.valueField], text: row[self.textField] };
        });

        let options = {
            data: data,
            placeholder: this.placeholder,
            //minimumInputLength:1,
            // closeOnSelect: true
        };

        options["allowClear"] = !this.hideAllowClear;

        if (this.hideSearchbox) {
            options["minimumResultsForSearch"] = Infinity;
        }

        $(this.el.nativeElement).select2(options);

		$(this.el.nativeElement).on('change', () => {
			let el = $(this.el.nativeElement);
			//console.log(el.val());
			//console.log(typeof el.val());
			if (el.val() === null) {
				this.onChange(null);
			}
			// else if (el.val() === []) {
			// 	this.onChange([]);
			// }
			else {
				if (typeof el.val() !== 'object') {
					//console.log(typeof data[0].id);
					if (typeof data[0].id === 'number') {
						this.onChange(Number(el.val()))
					} else if (typeof data[0].id === 'boolean') {
						let boolVal = el.val() === 'true' ? true : false;
						this.onChange(boolVal);
					} else { //string
						this.onChange(el.val())
					}
				} else { //multiple
					//console.log("Multiple " + typeof data[0].id);
					if (typeof data[0].id === 'number') {
						let numberArr: number[] = [];
						for (let item of el.val()) {
							numberArr.push(Number(item));
						}
						//console.log(numberArr);
						this.onChange(numberArr);
					} else if (typeof data[0].id === 'boolean') {
						let boolArr: boolean[] = [];
						for (let item of el.val()) {
							boolArr.push(item === 'true' ? true : false);
						}
						//console.log(boolArr);
						this.onChange(boolArr);
					} else { //string
						this.onChange(el.val())
					}
				}
			}
		});
    }

    writeValue(value: any) {
        $(this.el.nativeElement).val(value).trigger("change");
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    ngOnDestroy() {
        $(this.el.nativeElement).select2('destroy');
    }


}
