import { Injectable } from '@angular/core';

@Injectable()
export class Helper {

	DateToObj(date) {
		if (date) {
			return {
				year: date.getFullYear(),
				month: (date.getMonth() + 1),
				day: date.getDate()
			}
		}
		return null;
	}

	ObjToDate(dateObj) {
		if (dateObj) {
			return new Date(dateObj.year, dateObj.month - 1, dateObj.day, 0, 0, 0, 0);
		}
		return null;
	}

	FixTimeZone(date) {
		date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
	}

	AddDays(date, days) {
		if (date) {
			date.setDate(date.getDate() + days);
			return date;
		}
		return null;
	}

	SetLocalStorage(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	}

	SetSessionStorage(key, obj) {
		sessionStorage.setItem(key, JSON.stringify(obj));
	}

	GetLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	GetSessionStorage(key) {
		return JSON.parse(sessionStorage.getItem(key));
	}

	RemoveLocalStorage(key) {
		localStorage.removeItem(key);
	}

	RemoveSessionlStorage(key) {
		sessionStorage.removeItem(key);
	}




}