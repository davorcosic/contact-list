import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractContactService } from '../../shared/service/abstract-contact.service';
import { Contact } from '../../shared/model/contact.model';

@Component({
	selector: 'cl-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
	contactFormGroup: FormGroup;

	isEdit: boolean;

	get phoneNumbers(): FormArray {
		return this.contactFormGroup.get('phoneNumbers') as FormArray;
	}

	get profilePicture(): FormControl {
		return this.contactFormGroup.get('profilePicture') as FormControl;
	}

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private contactService: AbstractContactService
	) {}

	ngOnInit() {
		this.createFormGroup();
		this.getContact();
	}

	returnToList() {
		this.router.navigate(['']);
	}

	saveContact() {
		console.log(this.contactFormGroup.value);
		const contactToSave: Contact = this.mapContactFromForm();
		console.log(contactToSave);

		this.contactService.save(contactToSave).subscribe(() => this.returnToList());
	}

	addPhoneNumber() {
		this.phoneNumbers.push(this.buildPhoneNumber());
	}

	removePhoneNumber(index: number) {
		this.phoneNumbers.removeAt(index);
	}

	// TODO: For edit form create appropriate form array if contact has more than 1 phone number
	private createFormGroup() {
		this.contactFormGroup = this.fb.group({
			fullName: ['', Validators.required],
			profilePicture: '',
			email: ['', [Validators.required, Validators.email]],
			phoneNumbers: this.fb.array([this.buildPhoneNumber()])
		});
	}

	private buildPhoneNumber() {
		return this.fb.group({
			value: ['', Validators.required],
			label: ['', Validators.required]
		});
	}

	private getContact() {
		this.route.data.subscribe((data: { contact: Contact }) => {
			if (data.contact) {
				this.isEdit = true;
				this.contactFormGroup.patchValue(data.contact);
				this.contactFormGroup.get('fullName').setValue(`${data.contact.firstName} ${data.contact.lastName}`);
			}
		});
	}

	private mapContactFromForm() {
		const contact: Contact = this.contactFormGroup.value;
		const fullName: string = this.contactFormGroup.get('fullName').value as string;

		delete contact['fullName'];

		contact.firstName = fullName.split(' ')[0];

		if (!contact.firstName) {
			contact.firstName = fullName;
		} else {
			contact.lastName = fullName.split(' ')[1];
		}

		return contact;
	}
}
