import { Component, OnInit } from '@angular/core';

import { ContactListItem } from '../../shared/model/contact-list-item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'cl-contact-list-view',
	templateUrl: './contact-list-view.component.html',
	styleUrls: ['./contact-list-view.component.scss']
})
export class ContactListViewComponent implements OnInit {
	contacts: ContactListItem[];

	displayFavoriteContacts: boolean;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.data.subscribe((data: { contacts: ContactListItem[] }) => {
			this.contacts = data.contacts;
		});
	}
}
