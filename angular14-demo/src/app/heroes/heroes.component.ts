import { Component, OnInit } from '@angular/core';
import Hero from './Hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit
{
	heroes?: Hero[];

	constructor(private heroService: HeroService, private messageService: MessageService)
	{
	}

	ngOnInit(): void
	{
		this.getHeroes();
	}

	getHeroes()
	{
		this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
	}

	add(heroName: string)
	{
		heroName = heroName.trim();
		if (!heroName) return;
		this.heroService.addHero({ name: heroName } as Hero).subscribe(hero => this.heroes?.push(hero))
	}

	delete(hero: Hero)
	{
		this.heroService.deleteHero(hero.id).subscribe(() =>
		{
			this.heroes = this.heroes?.filter(h => h.id !== hero.id);
		});
	}
}