import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ContactListItem } from '../../shared/model/contact-list-item.model';
import { ActivatedRoute } from '@angular/router';

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

	private searchSubscription: Subscription;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.getContacts();
		this.performDistinctSearchAfterDelay();
	}

	ngOnDestroy() {
		this.searchSubscription.unsubscribe();
	}

	searchContact(searchQuery: string) {
		this.searchQuerySubject.next(searchQuery);
	}

	onAddNewContact() {
		console.log('Add new contact clicked!');
	}

	private getContacts() {
		this.route.data.subscribe((data: { contacts: ContactListItem[] }) => {
			this.allContacts = data.contacts;
			this.filteredAllContacts = data.contacts;
		});
	}

	private performDistinctSearchAfterDelay() {
		this.searchSubscription = this.searchQuerySubject
			.pipe(
				debounceTime(300),
				distinctUntilChanged()
			)
			.subscribe((searchQuery: string) => {
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
}
