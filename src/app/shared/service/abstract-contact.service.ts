import { Observable } from 'rxjs';

import { ContactListItem } from '../model/contact-list-item.model';
import { Contact } from '../model/contact.model';

export abstract class AbstractContactService {
	abstract getAll(): Observable<ContactListItem[]>;

	abstract changeFavoriteStatus(contactId: number, isFavorite: boolean): Observable<ContactListItem>;

	abstract delete(contactId: number): Observable<{}>;

	abstract save(contact: Contact): Observable<Contact>;
}
