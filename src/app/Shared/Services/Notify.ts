import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable()
export class Notify {

    constructor() {
        alertify.defaults.theme.ok = "btn btn-success";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.set('notifier', 'position', 'top-right');
    }

    Success(message) {
        alertify.success(message, 3);
    };

    Error(message) {
        alertify.error(message, 3);
    };

    Warning(message) {
        alertify.warning(message, 3);
    };

    Info(message) {
        alertify.notify(message, 'info', 3);
    };

    Alert(title, message) {
        alertify.alert(message).setHeader(title);
    };

    Confirm(title, message, okFunction, cancelFunction) {
        alertify.dialog('confirm')
            .set({
                'labels': { ok: 'Yes', cancel: 'Cancel' },
                'transition': 'fade',
                'closable': false,
                'message': message,
                'onok': okFunction,
                'oncancel': cancelFunction
            })
            .setHeader(title)
            .show();
    };
}
