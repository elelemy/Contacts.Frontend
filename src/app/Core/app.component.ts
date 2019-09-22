import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { RoutingState } from './../Shared/Services/RoutingState';
@Component({
	// tslint:disable-next-line
	selector: 'body',
	template: '<block-ui><router-outlet></router-outlet></block-ui>'
})
export class AppComponent implements OnInit {
	
	constructor(
		private titleService: Title,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		routingState: RoutingState
	) { 
		routingState.loadRouting();
	}

	ngOnInit() {
		this.router.events
			.filter((event) => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map((route) => {
				while (route.firstChild) {
					route = route.firstChild;
				}
				return route;
			})
			.filter((route) => route.outlet === 'primary')
			.mergeMap((route) => route.data)
			.subscribe((event) => this.titleService.setTitle("Task | " + event['title']));
	}
}
