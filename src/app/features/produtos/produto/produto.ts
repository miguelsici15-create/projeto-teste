import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe, LowerCasePipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { CaptalizePipe } from '../../../shared/pipes/captalize-pipe';
import { MatButtonModule } from '@angular/material/button' ;
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, PrecoFormatadoPipe, CaptalizePipe, MatButtonModule, MatCardModule], 
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  @Input() nome: string = "";
  @Input() preco: number= 0;
  @Output() produtoSelecionado = new EventEmitter();
  @Output() adicionarProdutoAoCarrinho = new EventEmitter();

  selecionarProduto(){
    this.produtoSelecionado.emit(this.nome);
  }
  
  adicionarAoCarrinho() {
    this.adicionarProdutoAoCarrinho.emit({
      nome: this.nome,
      preco: this.preco,
    });
  }
}