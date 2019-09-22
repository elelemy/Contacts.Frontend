import { Component, Input, NgModule, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Notify } from '../../../Shared/Services/Notify';
import { Helper } from '../../../Shared/Services/Helper';
import { PhonesRepository } from '../../../Shared/Repositories/PhonesRepository';
import { Configuration } from 'app/Core/Configuration';

@Component({
    templateUrl: 'PhoneManagment.html'
})
export class PhoneManagment implements OnInit {
    @Input() Id;
    @Input() Phones;

    Phone = {
        Label: null,
        Phone: null,
        ContactId: null
    }

    constructor(
        public activeModal: NgbActiveModal,
        public phonesRepository: PhonesRepository,
        public helper: Helper,
        public notify: Notify,
        public configuration: Configuration
    ) { }

    ngOnInit() {
        this.Phone.ContactId = this.Id;
    }


    AddPhone(frm: any) {
        if (frm.valid) {
            let phoneCopy = Object.assign({}, this.Phone);
            this.phonesRepository.AddPhone(phoneCopy).subscribe(response => {
                if (response.Success) {
                    frm.submitted = false;
                    frm.reset();
                    this.phonesRepository.GetPhones(this.Id).subscribe(response => {
                        if (response.Success) {
                            this.Phones = response.Data;
                        }
                    });
                }
                else {
                    this.notify.Error("Some data are missing or incorrect.");
                }

            });
        }
    }

    RemovePhone(id) {
        this.notify.Confirm(
			'Confirm Delete',
			'Are you sure you want to delete this Record?',
			() => {
				this.phonesRepository.RemovePhone(id).subscribe(response => {
					if (response.Success) {
                        this.phonesRepository.GetPhones(this.Id).subscribe(response => {
                            if (response.Success) {
                                this.Phones = response.Data;
                            }
                        });
						this.notify.Success('Record has been deleted successfully.');
					}
				}, err => this.notify.Error("This record can't be deleted because it is related to other data."))
			},
			() => {
				this.notify.Info('Operation has been canceled.');
			}
		);
    }

    Cancel() {
        this.activeModal.dismiss();
    }

}

