import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppBar } from './core/layout/app-bar/app-bar';
import { Footer } from './core/layout/footer/footer';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AppBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
