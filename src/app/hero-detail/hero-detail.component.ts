import { Component, OnInit, Input } from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {HeroService} from "../hero.service";
import {checkForPrivateExports} from "@angular/compiler-cli/src/ngtsc/entry_point";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
  @Input() hero?: Hero;
  constructor(
    private route: ActivatedRoute, //HeroDetailComponent의 인스턴스를 생성하면서 적용한 라우팅 규칙에 대한 정보를 담고 있음
    private location: Location, // 이전 페이지로 전환시에 사용
    private heroService: HeroService)
  {}

  ngOnInit() {
    this.getHero();
  }

  /** url에 담긴 히어로 아이디를 통해 히어로 정보를 구독하는 함수*/
  getHero(): void{
    // route.snapshot : 라우팅 규칙에 대한 정보를 가진 객체, 라우팅 변수는 언제나 문자열이므로 숫자로 변환
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  /** 저장하고 이전화면으로 돌아가기 */
  save():void{
    if(this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(()=> this.goBack())
    }
  }

  /** 이전 페이지로 돌아가는 함수*/
  goBack(): void {
    this.location.back();
  }
}
