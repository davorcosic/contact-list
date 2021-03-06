import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ContactListItem } from '../../shared/model/contact-list-item.model';

@Component({
	selector: 'cl-contact-card',
	templateUrl: './contact-card.component.html',
	styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
	@Input()
	contact: ContactListItem;

	@Output()
	favoriteChange: EventEmitter<boolean> = new EventEmitter();

	@Output()
	deleteContact: EventEmitter<number> = new EventEmitter();

	@Output()
	editContact: EventEmitter<number> = new EventEmitter();

	@Output()
	openDetails: EventEmitter<number> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	toggleFavorite(isFavorite: boolean) {
		this.favoriteChange.emit(isFavorite);
	}

	edit() {
		this.editContact.emit(this.contact.id);
	}

	delete() {
		this.deleteContact.emit(this.contact.id);
	}

	openDetailsView() {
		this.openDetails.emit(this.contact.id);
	}
}
