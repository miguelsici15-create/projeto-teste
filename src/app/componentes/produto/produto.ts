import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe, LowerCasePipe } from '@angular/common';
import { PrecoFormatadoPipe } from '../../pipes/preco-formatado-pipe';
import { CaptalizePipe } from '../../pipes/captalize-pipe';

@Component({
  selector: 'app-produto',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, PrecoFormatadoPipe, CaptalizePipe],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
  nome = "Produto exemplo"
  preco = 199.90;
  mostrarpreco = true;
  produtos = [
    {nome: "Notebook", preco:3500},
    {nome: "Mouse", preco:150},
    {nome: "Teclado", preco:250}
  ]
}
