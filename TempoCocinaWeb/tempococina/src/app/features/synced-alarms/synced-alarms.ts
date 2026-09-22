import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../shared/ui/button/button';
import { Icon } from '../../shared/ui/icon/icon';
import { InfoNote } from '../../shared/ui/info-note/info-note';
import { SoundListItem } from '../../shared/ui/sound-list-item/sound-list-item';
import { SyncCard } from '../../shared/ui/sync-card/sync-card';
import { SYNCED_ALARMS_VIEW } from './synced-alarms.mock';

/** W-24 — Alarmas sincronizadas (Transferencia). */
@Component({
  selector: 'tc-synced-alarms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Icon, InfoNote, SoundListItem, SyncCard],
  templateUrl: './synced-alarms.html',
  styleUrl: './synced-alarms.scss',
})
export default class SyncedAlarms {
  protected readonly view = SYNCED_ALARMS_VIEW;
}
