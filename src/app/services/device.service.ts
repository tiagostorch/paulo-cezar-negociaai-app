import { Injectable } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Platform } from '@ionic/angular';
import { LocationPermission } from '../models/location-permission.model';

@Injectable({
	providedIn: 'root'
})
export class DeviceService {

	private lastGeoposition: Geoposition;

	constructor(
		private camera: Camera,
		private diagnostic: Diagnostic,
		private geolocation: Geolocation,
		private locationAccuracy: LocationAccuracy,
		private platform: Platform
	) { }

	// CAMERA
	// ------------------------

	async getPhoto(sourceType: PictureSourceType, targetDimension?: number): Promise<string> {
		const options: CameraOptions = {
			quality: 80,
			destinationType: this.camera.DestinationType.FILE_URI,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			targetWidth: targetDimension || 1024,
			targetHeight: targetDimension || 1024,
			correctOrientation: true,
			sourceType: sourceType,
			allowEdit: false,
			saveToPhotoAlbum: false
		};
		return await this.camera.getPicture(options);
	}

	// GEOLOCATION
	// ------------------------

	async getCurrentPosition(): Promise<Geoposition> {
		if (!this.lastGeoposition) {
			this.lastGeoposition = await this.geolocation.getCurrentPosition();
		}
		return this.lastGeoposition;
	}

	async requestLocation(): Promise<LocationPermission> {
		if (this.platform.is("cordova")) {
			const locationPermission: LocationPermission = await this.ensureLocationAuthorization();
			if (locationPermission.isAuthorized) {
				const canRequest: boolean = await this.locationAccuracy.canRequest();
				if (canRequest) {
					try {
						await this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_LOW_POWER);
					} catch (error) {
						console.error(error);
					}
					return locationPermission;
				} else {
					// On iOS, this will occur if Location Services is currently on OR a request is currently in progress.
					// On Android, this will occur if the app doesn't have authorization to use location.
					console.error("iOS: it's already ON; Android: Not authorized to use");
					this.platform.is("android") ? locationPermission : new LocationPermission(true);
				}
			} else {
				console.error("User denied permission");
				return locationPermission;
			}
		} else {
			return new LocationPermission(true);
		}
	}

	private async ensureLocationAuthorization(fromRequest?: boolean): Promise<LocationPermission> {
		const locationPermission: LocationPermission = new LocationPermission();
		try {
			locationPermission.status = await this.diagnostic.getLocationAuthorizationStatus();
			switch (locationPermission.status) {
				case this.diagnostic.permissionStatus.GRANTED:
				case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
					locationPermission.isAuthorized = true;
					break;
	
				case this.diagnostic.permissionStatus.NOT_REQUESTED:
				case this.diagnostic.permissionStatus.DENIED_ONCE:
					if (!fromRequest) {
						const statusRequested: string = await this.diagnostic.requestLocationAuthorization();
						this.ensureLocationAuthorization(true);
					} else {
						locationPermission.isAuthorized = false;
					}
					break;
	
				default: // "DENIED_ALWAYS" ou outros
					locationPermission.isAuthorized = false;
					break;
			}
		} catch (error) {
			console.error(error);
		}
		return locationPermission;
	}
}
