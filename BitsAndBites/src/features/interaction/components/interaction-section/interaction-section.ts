import { Component } from '@angular/core';
import { ActionButtons } from '../action-buttons/action-buttons';
import { Comments } from '../comments/comments';
import { JoinUs } from '../join-us/join-us';

@Component({
  selector: 'app-interaction-section',
  imports: [ActionButtons, Comments, JoinUs],
  templateUrl: './interaction-section.html',
  styleUrl: '../../styles/interaction.css',
})
export class InteractionSection {}
