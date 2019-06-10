import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ContactAdministrationRoutingModule } from './contact-administration-routing.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SharedModule } from '../shared/shared.module';
import { ContactResolverService } from './contact-resolver.service';

@NgModule({
	declarations: [ContactFormComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputTextModule,
		ButtonModule,
		SharedModule,
		ContactAdministrationRoutingModule
	],
	providers: [ContactResolverService]
})
export class ContactAdministrationModule {}
