import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Notify } from '../../../Shared/Services/Notify';
import * as _ from 'underscore';
import { ContactsRepository } from 'app/Shared/Repositories/ContactsRepository';
import { PhonesRepository } from 'app/Shared/Repositories/PhonesRepository';
import { ContactAddEdit } from '../ContactAddEdit/ContactAddEdit';
import { PhoneManagment } from '../PhoneManagment/PhoneManagment';

@Component({
	templateUrl: 'ContactList.html'
})
export class ContactList implements OnInit {
	AllRows: any;
	PagedRows: any[];
	GridOptions = {
		SortField: 'Name',
		SortOrder: 'Asc'
	};
	FilteredRows: any;
	Filter = {
		Name: null
	};

	EmptyFilter = Object.assign({}, this.Filter);

	constructor(
		private modalService: NgbModal,
		private route: ActivatedRoute,
		public notify: Notify,
		private contactsRepository: ContactsRepository,
		private phonesRepository: PhonesRepository
	) { }


	ngOnInit() {
		this.route.data.subscribe(data => {
			this.AllRows = data.Contacts.Data;
			this.filterData(this.Filter);
		});
	}

	Search() {
		this.filterData(this.Filter);
	}

	Reset() {
		this.Filter = Object.assign({}, this.EmptyFilter);
		this.filterData(this.Filter);
	};


	filterData(filter) {
		this.FilteredRows = this.AllRows.filter(function (row) {
			return (
				((!filter.Name) || (row.Name.toLowerCase().indexOf(filter.Name.toLowerCase()) > -1))
			);
		});
	}

	OpenAddEditPopup(row) {
		const toBeSavedRow = Object.assign({}, row)
		const modalRef = this.modalService.open(ContactAddEdit, { size: 'lg' });
		modalRef.componentInstance.Contact = toBeSavedRow;
		modalRef.result.then((savedRow) => {
			this.contactsRepository.GetContacts().subscribe(response => {
				if (response.Success) {
					this.AllRows = response.Data;
					this.filterData(this.Filter);
				}
			});
		}, () => {

		});
	}

	OpenPhonePopup(id) {
		this.phonesRepository.GetPhones(id).subscribe(response => {
			if (response.Success) {
				const modalRef = this.modalService.open(PhoneManagment, { size: 'lg' });
				modalRef.componentInstance.Id = id;
				modalRef.componentInstance.Phones = response.Data;
			}
		});
	}

	Delete(row) {
		this.notify.Confirm(
			'Confirm Delete',
			'Are you sure you want to delete this Record?',
			() => {
				this.contactsRepository.DeleteContact(row.Id).subscribe(response => {
					if (response.Success) {
						this.contactsRepository.GetContacts().subscribe(response => {
							if (response.Success) {
								this.AllRows = response.Data;
								this.filterData(this.Filter);
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
}