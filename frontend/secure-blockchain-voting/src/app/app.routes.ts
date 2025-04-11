import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';

export const routes: Routes = [

    {
        path: '', redirectTo: 'landingpage', pathMatch: 'full'
    },
    {
        path: 'landingpage', component: LandingpageComponent
    },
];
