import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Hero from './heroes/Hero';
import { HEROES } from './heroes/mockHeroes';
import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root'
})
export class HeroService
{
	constructor(private messageService: MessageService, private http: HttpClient)
	{
	}

	getHeroes(): Observable<Hero[]>
	{
		return this.http.get<Hero[]>("/api/heroes");
	}

	getHero(id: number): Observable<Hero>
	{
		const hero = HEROES.find(h => h.id === id)!;
		this.log(`HeroService: fetched hero id=${id}`);
		return of(hero);
	}

	private log(message: string)
	{
		this.messageService.add(message);
	}
}
