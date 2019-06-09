import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'cl-add-new-contact-card',
	templateUrl: './add-new-contact-card.component.html',
	styleUrls: ['./add-new-contact-card.component.scss']
})
export class AddNewContactCardComponent implements OnInit {
	@Output()
	addNewContact: EventEmitter<void> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	emitAddNewContact() {
		this.addNewContact.emit();
	}
}
