import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { AbstractContactService } from './service/abstract-contact.service';
import { LocalStorageContactService } from './service/local-storage-contact.service';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { ProfilePictureUploadComponent } from './component/profile-picture/profile-picture.component';
import { ConfirmationService } from './component/confirm-dialog/service/confirmation.service';

export function ContactServiceFactory(contactService?: Type<AbstractContactService>) {
	if (contactService) {
		return new contactService();
	}

	return new LocalStorageContactService();
}

@NgModule({
	declarations: [ConfirmDialogComponent, ProfilePictureUploadComponent],
	imports: [CommonModule, DialogModule, ButtonModule],
	exports: [ConfirmDialogComponent, ProfilePictureUploadComponent]
})
export class SharedModule {
	static forRoot(contactService?: Type<AbstractContactService>): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				{ provide: AbstractContactService, useClass: contactService ? contactService : LocalStorageContactService },
				ConfirmationService
			]
		};
	}
}
