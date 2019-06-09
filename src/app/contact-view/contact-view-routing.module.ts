import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListViewComponent } from './contact-list-view/contact-list-view.component';
import { ContactListResolverService } from './contact-list-resolver.service';

const routes: Routes = [
	{ path: '', component: ContactListViewComponent, resolve: { contacts: ContactListResolverService } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactViewRoutingModule {}
