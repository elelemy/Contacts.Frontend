import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ContactsRepository } from '../Repositories/ContactsRepository';

@Injectable()

export class ContactsResolver implements Resolve<any> {

    constructor(private contactsRepository: ContactsRepository) { }

    resolve(route: ActivatedRouteSnapshot) {

        return this.contactsRepository.GetContacts();
    }

}
