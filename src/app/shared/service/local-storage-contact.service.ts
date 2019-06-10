import { Injectable } from '@angular/core';
import { Observable, of, EMPTY } from 'rxjs';

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
		this.saveMockDataToLocalStorage(contacts);
	}

	getAll(): Observable<ContactListItem[]> {
		return of(this.contacts);
	}

	changeFavoriteStatus(contactId: number, isFavorite: boolean): Observable<ContactListItem> {
		const contactsCopy = [...this.contacts];
		const changedContact = contactsCopy.find(contact => contact.id === contactId);

		changedContact.favorite = isFavorite;
		this.saveMockDataToLocalStorage(contactsCopy);

		return of(changedContact);
	}

	delete(contactId: number): Observable<{}> {
		const contactsCopy = [...this.contacts.filter(contact => contact.id !== contactId)];
		this.saveMockDataToLocalStorage(contactsCopy);

		return of({});
	}

	private saveMockDataToLocalStorage(contactsToSave: ContactListItem[]) {
		localStorage.setItem('contacts', JSON.stringify(contactsToSave));
	}
}
