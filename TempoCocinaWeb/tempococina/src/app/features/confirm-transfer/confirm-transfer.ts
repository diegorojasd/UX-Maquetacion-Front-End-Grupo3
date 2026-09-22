import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/ui/button/button';
import { Icon } from '../../shared/ui/icon/icon';
import { StatusBadge } from '../../shared/ui/status-badge/status-badge';
import { SummaryTable } from '../../shared/ui/summary-table/summary-table';
import { Timeline } from '../../shared/ui/timeline/timeline';
import { CONFIRM_TRANSFER_VIEW } from './confirm-transfer.mock';

/** W-22 — Confirmar y enviar al móvil (Transferencia). */
@Component({
  selector: 'tc-confirm-transfer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Button, Icon, StatusBadge, SummaryTable, Timeline],
  templateUrl: './confirm-transfer.html',
  styleUrl: './confirm-transfer.scss',
})
export default class ConfirmTransfer {
  protected readonly view = CONFIRM_TRANSFER_VIEW;
}
