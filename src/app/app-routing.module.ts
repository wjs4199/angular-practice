import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";

const routes: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'heroes', component:HeroesComponent},
  {path: 'detail/:id', component:HeroDetailComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 라우팅과 관련된 서비스 프로바이더와 디렉티브를 애플리케이션에 제공할 수 있음.
  exports: [RouterModule] // 앱에서도 RouterModule을 사용할 수 있도록 지정
})
export class AppRoutingModule { }
