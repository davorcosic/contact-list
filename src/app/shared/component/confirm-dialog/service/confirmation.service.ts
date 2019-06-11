import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ConfirmationProperties } from '../model/confirmation-properties.model';

@Injectable()
export class ConfirmationService {
	private confirmation: Subject<ConfirmationProperties> = new Subject();

	private visibility: Subject<boolean> = new Subject();

	activateConfirmation(confirmationProperties: ConfirmationProperties) {
		this.confirmation.next(confirmationProperties);
	}

	getConfirmation(): Observable<ConfirmationProperties> {
		return this.confirmation.asObservable();
	}

	setVisibility(visible: boolean) {
		this.visibility.next(visible);
	}

	getVisibility(): Observable<boolean> {
		return this.visibility.asObservable();
	}
}
