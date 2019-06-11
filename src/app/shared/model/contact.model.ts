import { ContactListItem } from './contact-list-item.model';

export interface PhoneNumber {
	value: string;
	label: string;
}

export class Contact extends ContactListItem {
	email: string;
	phoneNumbers: PhoneNumber[];
}
