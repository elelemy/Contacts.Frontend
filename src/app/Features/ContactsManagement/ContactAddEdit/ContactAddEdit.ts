import { Component, Input, NgModule, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Notify } from '../../../Shared/Services/Notify';
import { ContactsRepository } from '../../../Shared/Repositories/ContactsRepository';

@Component({
    templateUrl: 'ContactAddEdit.html'
})
export class ContactAddEdit implements OnInit {

    @Input() Contact;

    constructor(
        public activeModal: NgbActiveModal,
        public contactsRepository: ContactsRepository,
        public notify: Notify,
    ) { }

    ngOnInit() {
    }


    Save(frm: any) {
        if (frm.valid) {
            let contactCopy = Object.assign({}, this.Contact);
            this.contactsRepository.SaveContact(contactCopy).subscribe(response => {
                if(response.Success)
                {
                    this.activeModal.close(this.Contact);
                }
                else {
                    this.notify.Error("Some data are missing or incorrect.");
                }

            });
        }
    }

    Cancel() {
        this.activeModal.dismiss();
    }

}

