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
	addHero(hero: Hero): Observable<Hero>
	{
		return this.http.post<Hero>("/api/heroes", hero, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		}).pipe(
			tap(_ => this.log(`created new hero ${hero.name}`)),
			catchError(this.handleError<Hero>(`addHero id=${hero.id}`))
		)
	}
	deleteHero(id: number): Observable<Hero>
	{
		return this.http.delete<Hero>(`/api/heroes/${id}`, {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		}).pipe(
			tap(_ => this.log(`deleted hero id=${id}`)),
			catchError(this.handleError<Hero>(`deleteHero id=${id}`)))
	}

	searchHeroes(term: string): Observable<Hero[]>
	{
		if (!term.trim()) return of([]);
		return this.http.get<Hero[]>(`/api/heroes?name=${term}`).pipe(
			tap(x => x.length > 0 ? this.log(`found ${x.length} heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
			catchError(this.handleError("searchHeroes", []))
		)
	}

	private log(message: string)
	{
		this.messageService.add(message);
	}
}
