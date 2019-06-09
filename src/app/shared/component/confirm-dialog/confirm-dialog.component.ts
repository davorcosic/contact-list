import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'cl-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
	@Input()
	headerTitle: string = 'Delete';

	@Input()
	message: string = 'Are you sure you want to delete this contact?';

	@Input()
	actionLabel: string = 'Delete';

	@Input()
	displayDialog: boolean;

	@Output()
	cancelSelected: EventEmitter<void> = new EventEmitter();

	@Output()
	actionSelected: EventEmitter<void> = new EventEmitter();

	constructor() {}

	ngOnInit() {}

	cancel() {
		this.cancelSelected.emit();
	}

	action() {
		this.actionSelected.emit();
	}
}
