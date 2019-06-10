import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ContactAdministrationRoutingModule } from './contact-administration-routing.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ContactFormComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputTextModule,
		ButtonModule,
		SharedModule,
		ContactAdministrationRoutingModule
	]
})
export class ContactAdministrationModule {}
