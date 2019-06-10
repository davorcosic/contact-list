import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'cl-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
	contactFormGroup: FormGroup;

	get phoneNumbers(): FormArray {
		return this.contactFormGroup.get('phoneNumbers') as FormArray;
	}

	constructor(private fb: FormBuilder, private router: Router) {}

	ngOnInit() {
		this.createFormGroup();
	}

	returnToList() {
		this.router.navigate(['']);
	}

	saveContact() {}

	private createFormGroup() {
		this.contactFormGroup = this.fb.group({
			fullName: ['', Validators.required],
			pictureUrl: '',
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
}
