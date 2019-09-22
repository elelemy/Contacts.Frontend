import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomFormsModule } from 'ng2-validation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ContactList } from './ContactList/ContactList';
import { ContactAddEdit } from './ContactAddEdit/ContactAddEdit';
import { PhoneManagment } from './PhoneManagment/PhoneManagment';
import { SharedModule } from '../../Shared/Shared.module';
import { ContactsResolver } from 'app/Shared/Resolvers/ContactsResolver';

const contactsManagementRoutes: Routes = [
	{
		path: '',
		component: ContactList,
		data: {
			title: 'Contact Management'
		},
		resolve: {
			Contacts: ContactsResolver
		}
	}
];
export const ContactsManagementRouting = RouterModule.forChild(contactsManagementRoutes);


@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		CustomFormsModule,
		ContactsManagementRouting,
		SharedModule,
		BsDropdownModule,
		NgbModule.forRoot()
	],
	declarations: [ContactList, ContactAddEdit, PhoneManagment],
	providers: [ContactsResolver],
	entryComponents: [ContactAddEdit, PhoneManagment],

})
export class ContactsManagementModule { }
