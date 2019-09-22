import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'contacts-management',
		pathMatch: 'full',
	},
	{
		path: 'contacts-management',
		loadChildren: '../Features/ContactsManagement/ContactsManagement.module#ContactsManagementModule',
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
