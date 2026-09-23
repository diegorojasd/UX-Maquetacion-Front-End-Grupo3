import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BackLink } from '../../shared/ui/back-link/back-link';
import { Button } from '../../shared/ui/button/button';
import { Icon } from '../../shared/ui/icon/icon';
import { InfoNote } from '../../shared/ui/info-note/info-note';
import { SoundListItem } from '../../shared/ui/sound-list-item/sound-list-item';
import { SyncCard } from '../../shared/ui/sync-card/sync-card';
import { SUGGESTER_SOUND } from './suggested-sound.mock';

/** W-17 — Alarmas sincronizadas (Transferencia). */
@Component({
  selector: 'tc-synced-alarms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    BackLink,
    Button,
    Icon,
    InfoNote,
    SoundListItem,
    SyncCard
  ],
  templateUrl: './suggested-sound.html',
  styleUrl: './suggested-sound.scss',
})
export default class SuggestedSound {
  protected readonly view = SUGGESTER_SOUND;
  selectedSound: string = 'campana';
}
