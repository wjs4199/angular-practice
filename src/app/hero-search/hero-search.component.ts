import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {Hero} from "../hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
  heroes$! : Observable<Hero[]>;
  private searchTerms = new Subject<string>(); // 옵저버블의 원천소스이자 그 자체, 옵저버블처럼 구독할 수 있음
  constructor(private heroService: HeroService) {
  }


  // 사용자가 입력한 검색어를 옵저버블 스트림으로 보냄
  search(term:string) :void{
    this.searchTerms.next(term);// 옵저버블로 값을 보내기 위해 next 함수를 사용할 수 있음
  }
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // 연속된 키 입력을 처리하기 위해 300ms 대기함. 300마다 하나씩 요청이 옴
      // 사용자가 입력한 검색어가 바로 넘어가면 키 입력마다 수많은 http요청이 발생하해 서버 과부하 + 네트워크 요금 증가할 수 있음
      // 따라서 바로 searchHeroes()로 검색어를 보내기보다
      // ngOnInit() 내에서 RxJS 연산자를 체이닝한 후ㅜ searchHeroes() 로 전달하는 것이 최적화에 좋은
      debounceTime(300),

      // 이전에 입력한 검색어와 같으면 무시함. 변경되었을 때마 옵저버블 스트림을 전달
      distinctUntilChanged(),

      // 검색어가 변경되면 새로운 옵저버블을 생성함
      // 요청을 300 ms 당 한 번으로 제한하더라도 동작중인 HTTP 요청은 여러개가 될 수 있으며, 응답이 돌아오는 순서도 보낸 순서와 다를 수 있음
      // 이 연산자를 활용하면 이전에 보낸 HTTP 요청을 취소하고 젤 마지막 HTTP 요청만 남김. 이미 보낸 HTTP 요청에 대한 응답은 애플리케이션 코드에 도달하지 못하고 그냥 폐기됨
      switchMap((term:string) => this.heroService.searchHeroes(term))
      //이전에 발생한 searchHeroes() Observable 을 취소했다고 해서 이미 보낸 HTTP 요청을 취소하지는 않음. 필요없는 응답은 애플리케이션 코드에서 처리
    );
  }


}
