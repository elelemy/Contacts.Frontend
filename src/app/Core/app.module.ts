import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { PubNubAngular } from 'pubnub-angular2';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from '../Shared/Shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { Configuration } from './Configuration';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		BsDropdownModule.forRoot(),
		TabsModule.forRoot(),
		SharedModule.forRoot(),
		BlockUIModule.forRoot(),
		LocalStorageModule.withConfig({
			prefix: 'Dash',
			storageType: 'localStorage'
			// storageType: 'sessionStorage'
		})
	],
	declarations: [
		AppComponent
	],
	providers: [
		Configuration,
		PubNubAngular,
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		}],
	bootstrap: [AppComponent]
})
export class AppModule { }
