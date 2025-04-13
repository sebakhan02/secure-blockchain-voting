import { Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { SigninpageComponent } from './pages/signinpage/signinpage.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { UserdashboardComponent } from './pages/userdashboard/userdashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ResultComponent } from './pages/result/result.component';
import { VoteComponent } from './pages/vote/vote.component';

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
    },

    {
        path: 'user', 
        component: UserdashboardComponent,
        // canActivate: [AuthGuard], // Uncomment this line if you want to protect the user dashboard route     
        children: [
          { path: '', redirectTo: 'vote', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'registration', component: RegistrationComponent },
          { path: 'vote', component: VoteComponent },
          { path: 'result', component: ResultComponent },
          { path: 'profile', component: ProfileComponent },
        ]
      },
      { path: '**', redirectTo: 'landingpage' }
];
