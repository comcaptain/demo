import { Component, Input, OnInit } from '@angular/core';
import Hero from '../heroes/Hero';

@Component({
	selector: 'app-hero-detail',
	templateUrl: './hero-detail.component.html',
	styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent
{
	@Input() hero?: Hero;
}