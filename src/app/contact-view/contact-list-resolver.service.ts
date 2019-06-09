import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { ContactListItem } from '../shared/model/contact-list-item.model';
import { AbstractContactService } from '../shared/service/abstract-contact.service';

@Injectable()
export class ContactListResolverService implements Resolve<ContactListItem[]> {
	constructor(private contactService: AbstractContactService) {}

	resolve(): Observable<ContactListItem[]> {
		return this.contactService.getAll();
	}
}
