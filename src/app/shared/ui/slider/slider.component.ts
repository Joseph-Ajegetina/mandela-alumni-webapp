import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { TuiIcon } from '@taiga-ui/core';
import { Event } from '@mandela-alumni-webapp/api-interfaces';

@Component({
	selector: 'app-slider',
	imports: [CommonModule, TuiIcon],
	templateUrl: './slider.component.html',
	styleUrl: './slider.component.less',
	animations: [
		trigger('slideAnimation', [
			transition('* => *', [
				style({ transform: 'translateX(100%)', opacity: 0 }),
				animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
			]),
		]),
	],
})
export class SliderComponent implements OnInit, OnDestroy {
	@Input() slide!: Event | null;
	currentIndex = 0;
	animationState = 0;
	intervalId: number | null = null;

	constructor(private cdr: ChangeDetectorRef) {}

	get currentSlide() {
		return (this.slide && this.slide.image) || null;
	}

	ngOnInit() {}

	ngOnDestroy() {
		if (this.intervalId !== null) {
			window.clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}

	navigateTo(link: string) {
		console.log('Navigating to:', link);
		window.location.href = link;
	}
}
