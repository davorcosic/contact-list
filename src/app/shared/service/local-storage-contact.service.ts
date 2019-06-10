import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AbstractContactService } from './abstract-contact.service';
import { ContactListItem } from '../model/contact-list-item.model';
import { Contact } from '../model/contact.model';
import { contacts } from '../mock-data/contacts';

@Injectable()
export class LocalStorageContactService extends AbstractContactService {
	private contactIdSequence: number = 100;

	private get contacts(): ContactListItem[] {
		return JSON.parse(localStorage.getItem('contacts')) as ContactListItem[];
	}

	private get newContactId(): number {
		return this.contactIdSequence++;
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

	save(contact: Contact): Observable<Contact> {
		const contactsCopy = [...this.contacts];

		contact.id = this.newContactId;
		contactsCopy.push(contact);
		this.saveMockDataToLocalStorage(contactsCopy);

		return of(contact);
	}

	private saveMockDataToLocalStorage(contactsToSave: ContactListItem[]) {
		localStorage.setItem('contacts', JSON.stringify(contactsToSave));
	}
}
