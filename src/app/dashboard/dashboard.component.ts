import {Component, OnInit} from '@angular/core';
import {HeroesComponent} from "../heroes/heroes.component";
import {HeroService} from "../hero.service";
import {HEROES} from "../mock-heroes";
import {Hero} from "../hero";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  heroes: Hero[] = [];
  constructor(private heroService:HeroService) {
  }
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes() : void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1,5))
  }
}
