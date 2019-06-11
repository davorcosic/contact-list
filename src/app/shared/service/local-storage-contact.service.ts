import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { AbstractContactService } from './abstract-contact.service';
import { ContactListItem } from '../model/contact-list-item.model';
import { Contact } from '../model/contact.model';
import { contacts } from '../mock-data/contacts';

@Injectable()
export class LocalStorageContactService extends AbstractContactService {
	private contactIdSequence: number = 100;

	private get contacts(): Contact[] {
		return JSON.parse(localStorage.getItem('contacts')) as Contact[];
	}

	private get newContactId(): number {
		return this.contactIdSequence++;
	}

	constructor() {
		super();
		this.saveMockDataToLocalStorage(contacts);
		console.log('[LocalStorageContactService] Instantiated!');
	}

	getAll(): Observable<ContactListItem[]> {
		return of(this.contacts);
	}

	getOne(contactId: number): Observable<Contact> {
		const contactToReturn: Contact = this.contacts.find((contact: Contact) => contact.id === contactId);

		if (!contactToReturn) {
			throwError('No contact found!');
		}

		return of(contactToReturn);
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

	update(updatedContact: Contact): Observable<Contact> {
		const contactsCopy = [...this.contacts];
		const contactToUpdateIndex: number = contactsCopy.findIndex((contact: Contact) => contact.id === updatedContact.id);

		contactsCopy[contactToUpdateIndex] = updatedContact;
		this.saveMockDataToLocalStorage(contactsCopy);

		return of(updatedContact);
	}

	private saveMockDataToLocalStorage(contactsToSave: Contact[]) {
		localStorage.setItem('contacts', JSON.stringify(contactsToSave));
	}
}
