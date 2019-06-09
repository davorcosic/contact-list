import { Observable } from 'rxjs';

import { ContactListItem } from '../model/contact-list-item.model';

export abstract class AbstractContactService {
	abstract getAll(): Observable<ContactListItem[]>;
	abstract changeFavoriteStatus(contactId: number, isFavorite: boolean): Observable<ContactListItem>;
}
