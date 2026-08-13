import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe, LowerCasePipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { CaptalizePipe } from '../../../shared/pipes/captalize-pipe';



@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, PrecoFormatadoPipe, CaptalizePipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  @Input() nome: string = "";
  @Input() preco: number= 0;
  @Output() produtoSelecionado = new EventEmitter();

  selecionarProduto(){
    this.produtoSelecionado.emit(this.nome);
  }
  
}
