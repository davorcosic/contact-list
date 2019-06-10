import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactResolverService } from './contact-resolver.service';

const routes: Routes = [
	{ path: 'contact', component: ContactFormComponent },
	{ path: 'contact/:id/edit', component: ContactFormComponent, resolve: { contact: ContactResolverService } }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ContactAdministrationRoutingModule {}
