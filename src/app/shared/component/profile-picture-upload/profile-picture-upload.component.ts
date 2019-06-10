import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'cl-profile-picture-upload',
	templateUrl: './profile-picture-upload.component.html',
	styleUrls: ['./profile-picture-upload.component.scss']
})
export class ProfilePictureUploadComponent implements OnInit {
	@Input()
	pictureUrl: string;

	constructor() {}

	ngOnInit() {}
}
