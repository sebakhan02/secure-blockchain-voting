import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { SigninpageComponent } from './pages/signinpage/signinpage.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';

export const routes: Routes = [

    {
        path: '', redirectTo: 'landingpage', pathMatch: 'full'
    },
    {
        path: 'landingpage', component: LandingpageComponent
    },
    {
        path:'signup', component: SignuppageComponent
    },
    {
        path:'signin', component: SigninpageComponent
    },
    {
        path:'auth', component: AuthenticationComponent
    }
];
