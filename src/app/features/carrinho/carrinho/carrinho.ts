import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CarrinhoFacade } from '../../../core/facade/carrinho.facade';


@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.css',
})
export class Carrinho {
carrinhoFacade= inject(CarrinhoFacade);
quantidadeCarrinho = this.carrinhoFacade.quantidade;
totalCarrinho = this.carrinhoFacade.total
}