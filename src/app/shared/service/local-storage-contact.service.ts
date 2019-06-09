import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AbstractContactService } from './abstract-contact.service';
import { ContactListItem } from '../model/contact-list-item.model';
import { contacts } from '../mock-data/contacts';

@Injectable()
export class LocalStorageContactService extends AbstractContactService {
	private get contacts(): ContactListItem[] {
		return JSON.parse(localStorage.getItem('contacts')) as ContactListItem[];
	}

	constructor() {
		super();
		this.saveMockDataToLocalStorage();
	}

	getAll(): Observable<ContactListItem[]> {
		// console.log(localStorage.getItem('contacts'));
		// return null;

		return of(this.contacts);
	}

	private saveMockDataToLocalStorage() {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}
}
