import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactViewRoutingModule } from './contact-view-routing.module';
import { ContactListViewComponent } from './contact-list-view/contact-list-view.component';

@NgModule({
	declarations: [ContactListViewComponent],
	imports: [CommonModule, ContactViewRoutingModule]
})
export class ContactViewModule {}
