import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Slide } from '../../interfaces/menu-item';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'app-slider',
  imports: [NgFor, NgIf, NgClass, NgStyle, TuiIcon,],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.less',
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slide!: Slide; 
  currentIndex = 0;
  animationState = 0;
  intervalId: number | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  get currentSlide() {
    return this.slide.images[this.currentIndex];
   }

  ngOnInit() {
    
    setTimeout(() => {
      this.startSlider();
    }, 0);
  }

  ngOnDestroy() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  startSlider() {
   
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }
    
    
    this.intervalId = window.setInterval(() => {
      if (this.slide.images && this.slide.images.length > 1) {
        this.currentIndex = (this.currentIndex + 1) % this.slide.images.length;
        this.animationState++;
        this.cdr.detectChanges(); 
      }
    }, 5000); 
  }

  navigateTo(link: string) {
    console.log('Navigating to:', link);
    window.location.href = link; 
  }
}