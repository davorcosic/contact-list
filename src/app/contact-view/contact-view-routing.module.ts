import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListViewComponent } from './contact-list-view/contact-list-view.component';

const routes: Routes = [{ path: '', component: ContactListViewComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactViewRoutingModule {}
