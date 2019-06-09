import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbstractContactService } from './service/abstract-contact.service';
import { LocalStorageContactService } from './service/local-storage-contact.service';

export function ContactServiceFactory(contactService?: Type<AbstractContactService>) {
	if (contactService) {
		return new contactService();
	}

	return new LocalStorageContactService();
}

@NgModule({
	declarations: [],
	imports: [CommonModule]
})
export class SharedModule {
	static forRoot(contactService?: Type<AbstractContactService>): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				{ provide: AbstractContactService, useClass: contactService ? contactService : LocalStorageContactService }
			]
		};
	}
}
