import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'cl-profile-picture',
	templateUrl: './profile-picture.component.html',
	styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureUploadComponent implements OnInit {
	@Input()
	pictureUrl: string;

	constructor() {}

	ngOnInit() {}
}
