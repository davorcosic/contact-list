import { PhoneNumber } from '../../shared/model/contact.model';

export class ContactForm {
	id: number;
	fullName: string;
	profilePicture: string;
	favorite: boolean;
	email: string;
	phoneNumbers: PhoneNumber[];
}
