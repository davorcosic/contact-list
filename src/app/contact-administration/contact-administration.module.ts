import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactAdministrationRoutingModule } from './contact-administration-routing.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ContactFormComponent],
	imports: [CommonModule, SharedModule, ContactAdministrationRoutingModule]
})
export class ContactAdministrationModule {}
