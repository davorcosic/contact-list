import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

import { ContactViewRoutingModule } from './contact-view-routing.module';
import { ContactListViewComponent } from './contact-list-view/contact-list-view.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactListResolverService } from './contact-list-resolver.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ContactListViewComponent, ContactCardComponent],
	imports: [CommonModule, SharedModule, ContactViewRoutingModule, InputTextModule],
	providers: [ContactListResolverService]
})
export class ContactViewModule {}
