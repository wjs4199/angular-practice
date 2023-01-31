import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit{
  // Hero 객체형 변수들을 담은 배열 타입 선언
  heroes: Hero[] = [];
  // selectedHero? : Hero; // 변수 선언만 하고 지정되는 값은 버튼눌렀을 때 할당

  // heroService 인자를 클래스 프로퍼티로 선언하면서 HeroService 타입의 의존성 객체가 주입되기를 요청
  // Angular가 HeroesComponent를 생성할 때 의존성 주입 시스템이 HeroService의 인스턴스를 찾아서 heroService 라는 인자로 전달함
  // 생성자에 HeroService 타입의 heroService 인자를 선언
  constructor(private heroService:HeroService, private messageService:MessageService) {}
  ngOnInit(): void {
    // 클래스 인스턴스 생성한 직후에 실행되므로 프로퍼티를 지정해주는 get메소드를 여기서 실행하는 것이 좋ㄷㄷ
    this.getHeroes();
  }

  // 선택한 히어로를 selectedHero 변수에 지정하는 함수
  // onSelect(hero:Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  // 컴포넌트의 생성자는 생성자로 받은 인지라를 클래스의 프로퍼티로 연결하는 정도로 간단히 하는 것이 좋음
  // 지금도 서비스에서 받은 인자 = getHeroes 를 현재 클래스의 프로퍼티로 연결하는 정도로 간단히 함
  getHeroes() : void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
    // 서버에서 받았을 때 subscribe 가 받은 응답을 콜백함수로 전달하고 클래스 프로퍼티에 할당함
  }
}
