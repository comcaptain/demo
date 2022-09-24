import { Component, OnInit } from '@angular/core';
import { Subject, Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { HeroService } from '../hero.service';
import Hero from '../heroes/Hero';

@Component({
	selector: 'app-hero-search',
	templateUrl: './hero-search.component.html',
	styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit
{
	heroes$!: Observable<Hero[]>;

	private searchTerms = new Subject<string>();

	constructor(private heroService: HeroService) { }

	ngOnInit(): void
	{
		this.heroes$ = this.searchTerms.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			switchMap(term => this.heroService.searchHeroes(term))
		)
	}

	search(term: string)
	{
		this.searchTerms.next(term);
	}

}
