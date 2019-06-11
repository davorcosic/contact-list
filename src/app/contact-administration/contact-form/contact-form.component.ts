import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractContactService } from '../../shared/service/abstract-contact.service';
import { Contact } from '../../shared/model/contact.model';
import { ConfirmationProperties } from '../../shared/component/confirm-dialog/model/confirmation-properties.model';
import { ConfirmationService } from '../../shared/component/confirm-dialog/service/confirmation.service';

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
		private contactService: AbstractContactService,
		private confirmationService: ConfirmationService
	) {}

	ngOnInit() {
		this.createFormGroup();
		this.getContact();
	}

	returnToList() {
		this.router.navigate(['']);
	}

	saveContact() {
		const contactToSave: Contact = this.mapContactFromForm();

		if (this.isEdit) {
			this.contactService.update(contactToSave).subscribe(() => this.returnToList());
		} else {
			this.contactService.save(contactToSave).subscribe(() => this.returnToList());
		}
	}

	addPhoneNumber() {
		this.phoneNumbers.push(this.createPhoneNumberFormGroup());
	}

	removePhoneNumber(index: number) {
		this.phoneNumbers.removeAt(index);
	}

	onDeleteContact() {
		const confirmationProperties: ConfirmationProperties = {
			headerTitle: 'Delete',
			message: 'Are you sure you want to delete this contact?',
			acceptLabel: 'Delete',
			acceptFunction: () => this.deleteContact()
		};

		this.confirmationService.activateConfirmation(confirmationProperties);
	}

	deleteContact() {
		const contactId: number = +this.contactFormGroup.get('id').value;

		this.contactService.delete(contactId).subscribe(() => {
			this.confirmationService.setVisibility(false);
			this.returnToList();
		});
	}

	private createFormGroup() {
		this.contactFormGroup = this.fb.group({
			id: '',
			fullName: ['', Validators.required],
			profilePicture: '',
			favorite: '',
			email: ['', [Validators.required, Validators.email]],
			phoneNumbers: this.fb.array([this.createPhoneNumberFormGroup()])
		});
	}

	private createPhoneNumberFormGroup() {
		return this.fb.group({
			value: ['', Validators.required],
			label: ['', Validators.required]
		});
	}

	private getContact() {
		this.route.data.subscribe((data: { contact: Contact }) => {
			if (data.contact) {
				this.isEdit = true;
				this.updateFormGroupForEdit(data.contact);

				this.contactFormGroup.patchValue(data.contact);
				this.contactFormGroup.get('fullName').setValue(`${data.contact.firstName} ${data.contact.lastName}`);
			}
		});
	}

	private updateFormGroupForEdit(contact: Contact) {
		if (!contact.phoneNumbers || !contact.phoneNumbers.length) {
			return;
		}

		for (let i = 1; i <= contact.phoneNumbers.length - 1; i++) {
			this.phoneNumbers.push(this.createPhoneNumberFormGroup());
		}
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
