import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    HostUrl: string;

    constructor() {
        let local = {
            HostUrl: 'http://localhost:5000/api/'
        };
        // let local = {
        //     HostUrl: 'http://localhost:5000/api/'
        // };

        this.HostUrl = local.HostUrl;

    }
}

