import { Component, OnInit } from '@angular/core';
import Hero from './Hero';
import { HEROES } from './mockHeroes';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent
{
	heroes = HEROES;
	selectedHero?: Hero;

	onSelect(hero: Hero)
	{
		this.selectedHero = hero;
	}
}
