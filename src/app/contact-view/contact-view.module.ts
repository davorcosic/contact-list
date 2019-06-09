import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactViewRoutingModule } from './contact-view-routing.module';
import { ContactListViewComponent } from './contact-list-view/contact-list-view.component';
import { ContactCardComponent } from './contact-card/contact-card.component';

@NgModule({
	declarations: [ContactListViewComponent, ContactCardComponent],
	imports: [CommonModule, ContactViewRoutingModule]
})
export class ContactViewModule {}
