import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CarrinhoService } from '../../../core/services/carrinho.services';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private carrinhoService = inject(CarrinhoService);

  formulario = new FormGroup({
    nome: new FormControl (''),
    endereço: new FormControl (''),
    email: new FormControl ('')
  });

  finalizar (){
    console.log('Dados do formulario:', this.formulario)
    console.log('Itens do Carrinho:', this.carrinhoService.itens())
  }
}
