import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Hero from '../heroes/Hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit
{
	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) { }

	ngOnInit(): void
	{
		const id = Number(this.route.snapshot.paramMap.get("id"));
		this.heroService.getHero(id).subscribe(hero => this.hero = hero);
	}

	hero?: Hero;

	goBack(): void
	{
		this.location.back();
	}
	save()
	{
		if (this.hero)
		{
			this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
		}
	}
}
