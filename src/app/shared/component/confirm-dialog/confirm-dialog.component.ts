import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ConfirmationService } from './service/confirmation.service';
import { ConfirmationProperties } from './model/confirmation-properties.model';

@Component({
	selector: 'cl-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
	displayDialog: boolean;

	confirmationProperties: ConfirmationProperties;

	confirmationSubscription: Subscription;

	visibilitySubscription: Subscription;

	constructor(private confirmationService: ConfirmationService) {}

	ngOnInit() {
		this.getConfirmationProperties();
		this.getVisibility();
	}

	ngOnDestroy() {
		this.confirmationSubscription.unsubscribe();
		this.visibilitySubscription.unsubscribe();
	}

	cancel() {
		this.displayDialog = false;
	}

	action() {
		this.confirmationProperties.acceptFunction();
	}

	private getConfirmationProperties() {
		this.confirmationSubscription = this.confirmationService
			.getConfirmation()
			.subscribe((confirmationProperties: ConfirmationProperties) => {
				this.confirmationProperties = confirmationProperties;
				this.displayDialog = true;
			});
	}

	private getVisibility() {
		this.visibilitySubscription = this.confirmationService
			.getVisibility()
			.subscribe((visible: boolean) => (this.displayDialog = visible));
	}
}
