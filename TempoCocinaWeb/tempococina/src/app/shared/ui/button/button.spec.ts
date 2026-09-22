import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Button } from './button';

@Component({
  imports: [Button],
  template: `
    <tc-button variant="primary" icon="play-circle">Preparar receta</tc-button>
    <tc-button variant="brand" icon="arrow-left-inv" link="/mockups">Volver al recetario</tc-button>
  `,
})
class Host {}

describe('Button', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a button with its projected label', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button.tc-button') as HTMLElement;
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Preparar receta');
    expect(button.querySelector('tc-icon')).toBeTruthy();
  });

  it('renders an anchor when a link is given, keeping the projected label', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    fixture.detectChanges();

    const anchor = fixture.nativeElement.querySelector('a.tc-button') as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.textContent).toContain('Volver al recetario');
    expect(anchor.getAttribute('href')).toBe('/mockups');
  });
});
