import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactViewModule } from './contact-view/contact-view.module';
import { ContactAdministrationModule } from './contact-administration/contact-administration.module';
import { SharedModule } from './shared/shared.module';
import { MockServerContactService } from './mock-server-contact.service';

@NgModule({
	declarations: [AppComponent, PageNotFoundComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		// SharedModule.forRoot(MockServerContactService),
		SharedModule.forRoot(),
		ContactAdministrationModule,
		ContactViewModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
