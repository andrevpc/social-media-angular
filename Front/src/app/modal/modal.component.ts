import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    // fundo escuro que fica atrás do modal
    trigger('overlay', [
      transition(':enter', [
        // Inicia com o opacity zerado
        style({ opacity: 0 }),
        
        // efetua a animação de 250ms para o
        // o opacity de 0 até 0.5
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        // Quando for esconder o overlay, 
        // anima do opacity atual, 0.5, até
        // o valor 0
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    
    // animação na parte branca do modal
    trigger('modal', [
      transition(':enter', [
        // inicia com o modal "lá em cima"
        style({ bottom: 0, left: -20 }),
        
        // e finaliza com o modal no meio da tela
        animate('250ms', style({  })),
      ]),
      transition(':leave', [
      
        // para esconder o modal, basta
        // "jogar ele lá para cima da tela"
        animate('250ms', style({ bottom: -50, left: -50 }))
      ])
    ]),
  ]
})
export class ModalComponent {
  mostrar: boolean = false;

  toggle () {
    this.mostrar = !this.mostrar;
  }
}