import { ContactListItem } from './contact-list-item.model';

interface PhoneNumber {
	value: string;
	label: string;
}

export class Contact extends ContactListItem {
	email: string;
	phoneNumbers: PhoneNumber[];
}
