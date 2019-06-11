import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

import { ContactListItem } from '../../shared/model/contact-list-item.model';
import { AbstractContactService } from '../../shared/service/abstract-contact.service';
import { ConfirmationProperties } from '../../shared/component/confirm-dialog/model/confirmation-properties.model';
import { ConfirmationService } from '../../shared/component/confirm-dialog/service/confirmation.service';

@Component({
	selector: 'cl-contact-list-view',
	templateUrl: './contact-list-view.component.html',
	styleUrls: ['./contact-list-view.component.scss']
})
export class ContactListViewComponent implements OnInit, OnDestroy {
	allContacts: ContactListItem[];

	filteredAllContacts: ContactListItem[];

	displayFavoriteContacts: boolean;

	searchQuerySubject: Subject<string> = new Subject();

	searchQuery: string;

	selectedContactId: number;

	displayConfirmDeletionDialog: boolean;

	private searchSubscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private contactService: AbstractContactService,
		private router: Router,
		private confirmationService: ConfirmationService
	) {}

	ngOnInit() {
		this.getContacts();
		this.performDistinctSearchAfterDelay();
	}

	ngOnDestroy() {
		this.searchSubscription.unsubscribe();
	}

	searchContact(searchQuery: string) {
		this.searchQuery = searchQuery;
		this.searchQuerySubject.next(searchQuery);
	}

	onAddNewContact() {
		this.router.navigate(['contact']);
	}

	onFavoriteChange(contactId: number, isFavorite: boolean) {
		this.contactService.changeFavoriteStatus(contactId, isFavorite).subscribe(() => this.loadContacts());
	}

	onEditContact(contactId: number) {
		this.router.navigate([`contact/${contactId}/edit`]);
	}

	onDeleteContact(contactId: number) {
		this.selectedContactId = contactId;

		const confirmationProperties: ConfirmationProperties = {
			headerTitle: 'Delete',
			message: 'Are you sure you want to delete this contact?',
			acceptLabel: 'Delete',
			acceptFunction: () => this.deleteContact()
		};

		this.confirmationService.activateConfirmation(confirmationProperties);
	}

	deleteContact() {
		this.contactService.delete(this.selectedContactId).subscribe(() => {
			this.confirmationService.setVisibility(false);
			this.loadContacts();
		});
	}

	onOpenContactDetails(contactId: number) {
		this.router.navigate([`contact/${contactId}`]);
	}

	private getContacts() {
		this.route.data.subscribe((data: { contacts: ContactListItem[] }) => {
			this.allContacts = data.contacts;
			this.filteredAllContacts = data.contacts;
		});
	}

	private performDistinctSearchAfterDelay() {
		this.searchSubscription = this.searchQuerySubject.subscribe((searchQuery: string) => {
			if (!searchQuery) {
				this.filteredAllContacts = this.allContacts;
			} else {
				this.filteredAllContacts = this.allContacts.filter(contact =>
					this.isContactMatchedBySearchQuery(contact, searchQuery)
				);
			}
		});
	}

	private isContactMatchedBySearchQuery(contact: ContactListItem, query: string): boolean {
		const searchQuery: string = query.toLowerCase();
		const firstName: string = contact.firstName.toLowerCase();
		const lastName: string = contact.lastName.toLowerCase();

		return firstName.startsWith(searchQuery) || lastName.startsWith(searchQuery);
	}

	private loadContacts() {
		this.contactService.getAll().subscribe(contacts => {
			this.allContacts = contacts;
			this.searchQuerySubject.next(this.searchQuery);
		});
	}
}
