import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration } from '../../Core/Configuration';
import { HttpResponse } from '../Models/HttpResponse'

@Injectable()
export class ContactsRepository {


    constructor(
        private http: HttpClient,
        private configuration: Configuration
    ) { }

    hostUrl: string = this.configuration.HostUrl;
    apiUrl: string = this.hostUrl + 'Contact/';

    GetContacts() {
        const url = this.apiUrl + 'GetContacts';
        return this.http.get<HttpResponse>(url);
    }

    SaveContact(model) {
		const url = this.apiUrl + 'SaveContact';
		return this.http.post<HttpResponse>(url, model);
    }

    DeleteContact(id) {
        const url = this.apiUrl + 'DeleteContact/';
        return this.http.delete<HttpResponse>(url + id);
    }
    
}
