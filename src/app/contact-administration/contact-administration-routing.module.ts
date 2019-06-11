import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactResolverService } from './contact-resolver.service';
import { ContactDetailsViewComponent } from './contact-details-view/contact-details-view.component';

const routes: Routes = [
	{ path: 'contact', component: ContactFormComponent },
	{ path: 'contact/:id/edit', component: ContactFormComponent, resolve: { contact: ContactResolverService } },
	{ path: 'contact/:id', component: ContactDetailsViewComponent, resolve: { contact: ContactResolverService } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactAdministrationRoutingModule {}
