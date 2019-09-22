import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpResponse } from '../Models/HttpResponse';
import { Configuration } from 'app/Core/Configuration';

@Injectable()
export class PhonesRepository {

	constructor(
		private http: HttpClient,
		private configuration: Configuration
	) { }
	hostUrl: string = this.configuration.HostUrl;
	apiUrl: string = this.hostUrl + 'Phone/';

	GetPhones(id) {
		const url = this.apiUrl + 'GetPhones/';
		return this.http.get<HttpResponse>(url + id);
	}

	AddPhone(model) {
		const url = this.apiUrl + 'AddPhone';
		return this.http.post<HttpResponse>(url, model);
	}

	RemovePhone(id) {
		const url = this.apiUrl + 'RemovePhone/';
		return this.http.delete<HttpResponse>(url + id);
	}

}
