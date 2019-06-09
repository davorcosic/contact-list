import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactViewModule } from './contact-view/contact-view.module';
import { ContactAdministrationModule } from './contact-administration/contact-administration.module';
import { SharedModule } from './shared/shared.module';
// import { MockServerContactService } from './mock-server-contact.service';

@NgModule({
	declarations: [AppComponent, PageNotFoundComponent],
	imports: [
		BrowserModule,
		// SharedModule.forRoot(MockServerContactService),
		SharedModule.forRoot(),
		ContactViewModule,
		ContactAdministrationModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
