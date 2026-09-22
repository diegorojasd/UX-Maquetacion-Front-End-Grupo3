import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon } from '../../../shared/ui/icon/icon';

/**
 * Footer — identical on every screen (encryption seal, mobile
 * compatibility, copyright). Sourced from the "Operational Brand Footer"
 * frame (node 1:881) in the same Figma file, since it is not present
 * inside the W-06 frame itself (docs/screens/W-06.md, discrepancy D6).
 *
 * Both seal icons use fixed colors in the source (`shield` teal,
 * `phone` orange) instead of inheriting the label's text color — kept as
 * designed via per-icon color, not by baking the color into the sprite.
 * The label and copyright greys sit outside the 17 documented tokens and
 * use the extended palette (docs/screens/W-06.md, discrepancy D1).
 */
@Component({
  selector: 'tc-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <footer class="tc-footer">
      <div class="tc-footer__row">
        <ul class="tc-footer__seals">
          <li class="tc-footer__seal tc-footer__seal--shield">
            <tc-icon name="shield" [size]="14" />
            <span>Sincronización cifrada de extremo a extremo</span>
          </li>
          <li class="tc-footer__seal tc-footer__seal--phone">
            <tc-icon name="phone" [size]="14" />
            <span>Compatible con Tempo Móvil iOS / Android</span>
          </li>
        </ul>
        <p class="tc-footer__copyright">
          TEMPO COCINA © 2026 — Sistema de Logística y Alarmas Culinarias. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  `,
  styles: `
    @use 'typography' as *;

    // Pushes the footer to the bottom of the shell's flex column when the
    // routed screen is shorter than the viewport.
    :host {
      display: block;
      margin-top: auto;
    }

    .tc-footer {
      background: var(--tc-surface);
      border-top: 1px solid var(--tc-border);
      padding: var(--tc-space-21) var(--tc-space-48) var(--tc-space-20);
    }

    .tc-footer__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--tc-space-16);
      max-width: 1560px;
      margin-inline: auto;
    }

    .tc-footer__seals {
      display: flex;
      align-items: center;
      gap: var(--tc-space-24);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .tc-footer__seal {
      @include tc-text-meta-strong;

      display: flex;
      align-items: center;
      gap: var(--tc-space-8);
      color: var(--tc-text-muted);
    }

    .tc-footer__seal--shield {
      color: var(--tc-primary);
    }

    .tc-footer__seal--shield span {
      color: var(--tc-text-muted);
    }

    .tc-footer__seal--phone {
      color: var(--tc-secondary);
    }

    .tc-footer__seal--phone span {
      color: var(--tc-text-muted);
    }

    .tc-footer__copyright {
      @include tc-text-meta;

      margin: 0;
      color: var(--tc-text-tertiary);
      text-align: right;
    }
  `,
})
export class Footer {}
