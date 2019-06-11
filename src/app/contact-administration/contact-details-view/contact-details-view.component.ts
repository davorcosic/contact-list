import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact } from '../../shared/model/contact.model';
import { AbstractContactService } from '../../shared/service/abstract-contact.service';

@Component({
	selector: 'cl-contact-details-view',
	templateUrl: './contact-details-view.component.html',
	styleUrls: ['./contact-details-view.component.scss']
})
export class ContactDetailsViewComponent implements OnInit {
	contact: Contact;

	constructor(private route: ActivatedRoute, private router: Router, private contactService: AbstractContactService) {}

	ngOnInit() {
		this.getContactFromRoute();
	}

	returnToList() {
		this.router.navigate(['']);
	}

	toggleFavorite(isFavorite: boolean) {
		this.contactService.changeFavoriteStatus(this.contact.id, isFavorite).subscribe(() => this.getContact());
	}

	edit() {
		this.router.navigate([`contact/${this.contact.id}/edit`]);
	}

	private getContactFromRoute() {
		this.route.data.subscribe((data: { contact: Contact }) => (this.contact = data.contact));
	}

	private getContact() {
		this.contactService.getOne(this.contact.id).subscribe((contact: Contact) => (this.contact = contact));
	}
}
