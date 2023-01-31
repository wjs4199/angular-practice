import { Injectable } from '@angular/core';
import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, tap} from "rxjs/operators";

/**
 HttpClient : 리모트 서버와 http 통신을 하기 위해 angular가 제공하는 서비스
 HttpClient가 제공하는 메소드는 모두 RxJs Observable 타입을 한 번만 반환
 HTTP는 요청과 응답으로 구성되는 프로토콜. 그래서 요청이 한 번 있으면 응답도 한 번
 HttpClient.get 함수는 HTTP 응답으로 JSON 객체 보냄. 그래서 이 객체에 타입을 지정하려면 <Hero[]>와 같이 제네릭을 지정해야함
 HTTP 응답으로 받은 객체 안에 깊숙히 들어있을 수도 있음. 이런 경우에는 원하는 데이터를 추출하기 위해 RxJS map 연산자를 사용해야 함

 에러를 처리하려면 http.get()으로 받은 옵저버블에 "pipe"를 사용해서 catchError() 연산자를 연결하면 됨
 tap 연산자 : 이 연산자는 옵저버블 데이터를 변경하지 않고 그대로 전달, 옵저버블 데이터를 확인에 사용

 pipe(): 함수 여러개를 함수 하나인 것처럼 변환하는 함수.
 인자로 조합할 함수를 받아서 이 함수들을 조합한 새로운 함수를 생성하고, 옵저버블에서 데이터가 전달될 때 순서대로 실행함

 of(): 인자로 전달한 배열의 항목을 하나씩 전달하는 Observable 인스턴스를 생성
 **/

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService:MessageService) { }

  private heroesUrl = 'api/heroes';  // 웹 API 형식의 URL로 사용


  private log(message:string){
    this.messageService.add(`HeroService:  ${message}`);
  }

  /** GET: 서버에서 히어로 목록 가져오기 */
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl) //json형식을 반환하므로 타입을 지정
      .pipe(
        tap((_: any) => this.log("fetched heroes")),
        catchError(this.handleError<Hero[]>('getHeroes',[]))
      )
  }

  /** GET: id에 해당하는 히어로 데이터 가져오기. 존재하지 않으면 404를 반환합니다. */
  getHero(id:number): Observable<Hero> {
    // const hero = HEROES.find(h => h.id === id)!;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_:any)=>this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  /** HTTP 요청이 실패한 경우를 처리*/
  private handleError<T>(operation = 'operation', result?: T) { // 실패한 동작이름, 기본값으로 반환할 객체
    return (error: any): Observable<T> => {
      // TODO: 리모트 서버로 에러 메시지 보내기
      console.error(error); // 지금은 콘솔에 로그를 출력합니다.
      // TODO: 사용자가 이해할 수 있는 형태로 변환하기
      this.log(`${operation} failed: ${error.message}`);
      // 애플리케이션 로직이 끊기지 않도록 기본값으로 받은 객체를 반환합니다.
      return of(result as T);
    };
  }
}
