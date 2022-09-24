import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import Hero from './heroes/Hero';
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
		return this.http.get<Hero[]>("/api/heroes").pipe(
			tap(_ => this.log('fetched heroes')),
			catchError(this.handleError("getHeroes", []))
		);
	}

	private handleError<T>(operation: string, result?: T)
	{
		return (error: any): Observable<T> =>
		{
			console.error(error);
			this.log(`${operation} failed: ${error.message}`);
			return result ? of(result) : of();
		}
	}

	getHero(id: number): Observable<Hero>
	{
		return this.http.get<Hero>(`/api/heroes/${id}`).pipe(
			tap(_ => this.log(`fetched, hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		)
	}

	updateHero(hero: Hero)
	{
		return this.http.put("/api/heroes", hero, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		}).pipe(
			tap(_ => this.log(`updated hero id=${hero.id}`)),
			catchError(this.handleError(`updateHero id=${hero.id}`))
		)
	}

	private log(message: string)
	{
		this.messageService.add(message);
	}
}
