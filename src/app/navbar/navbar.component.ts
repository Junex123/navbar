import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.updateMenuIconColor();
    window.addEventListener('resize', () => this.updateMenuIconColor());
  }

  private isBackgroundLight(): boolean {
    const body = document.body;
    const backgroundColor = window.getComputedStyle(body).backgroundColor;
    const brightness = this.getBrightness(backgroundColor);
    return brightness > 128;
  }

  private getBrightness(color: string): number {
    const rgb = color.match(/\d+/g);
    if (rgb) {
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
      return brightness;
    } else {
      // Handle the case when rgb is null (e.g., return a default value)
      return 0;
    }
  }
  
  private updateMenuIconColor(): void {
    const menuIcon = document.querySelector('.menu-icon');
    const isLight = this.isBackgroundLight();
    this.renderer.setStyle(menuIcon, 'color', isLight ? 'black' : 'white');
  }

  toggleNav(): void {
    const body = document.body;
    const navContent = document.querySelector('.nav__content');
    body.classList.toggle('nav-active');
    this.renderer.setStyle(navContent, 'visibility', body.classList.contains('nav-active') ? 'visible' : 'hidden');
  }

  closeNav(event: MouseEvent): void {
    const body = document.body;
    const navContent = document.querySelector('.nav__content');
    if (event.target === navContent) {
      this.toggleNav();
    }
  }
}
