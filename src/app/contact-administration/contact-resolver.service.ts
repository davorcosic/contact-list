import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Contact } from '../shared/model/contact.model';
import { AbstractContactService } from '../shared/service/abstract-contact.service';

@Injectable()
export class ContactResolverService implements Resolve<Contact> {
	constructor(private contactService: AbstractContactService, private router: Router) {}

	resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
		const contactId: string = route.paramMap.get('id');

		if (!contactId || isNaN(+contactId)) {
			this.router.navigateByUrl('/404');
		}

		return this.contactService.getOne(+contactId);
	}
}
