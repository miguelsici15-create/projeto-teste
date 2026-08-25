import { Component, signal, computed, effect, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { CurrencyPipe } from '@angular/common';
import { ProdutosService } from '../../../core/services/produtos.services';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


type ProdutoType = { nome: string; preco: number }

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, CurrencyPipe, MatButtonModule, MatCardModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})

export class ListaProdutos {
constructor() {
  this.carregarProdutos();
  effect (() => {
    console.log('lista de produtos alterada', this.produtos());
  })
  effect(()=> {
    console.log('O valor atualizado:', this.valorTotal());
  })
effect(() => {
  if(typeof document !== 'undefined'){
    document.title = `(${this.totalProdutos()}) Minha loja`;
  }
})
}
private produtosService = inject(ProdutosService);
carregando = signal(true);
error = signal<string | null>(null);
  produtos = signal<
    {
      nome: string;
      preco: number;
    }[]
  >([]);
  produtosSelecionado = signal <string | null>(null);

totalProdutos = computed(() => this.produtos().length);

valorTotal = computed(() => {
return this.produtos().reduce(
(total, item) => total + item.preco, 0);
});

subistuirProdutos(){
this.produtos.set([
{ nome: "Novo produto", preco: 640 }
])};


  produtosNovos = [
    { nome: 'notebook', preco: 3500 },
    { nome: 'mouse', preco: 150 },
    { nome: 'teclado', preco: 250.55 },
  ];

  carregarProdutos(){
    this.error.set(null);

this.carregando.set(true);

this.produtosService.buscarProdutos()
.subscribe({
next: (dados) => {
const produtos = this.produtosService
.transformarProdutos(dados);
this.produtos.set(produtos);
this.carregando.set(false);
},
error: (erro) => {
console.error('Erro ao carregar produtos:', erro);
this.error.set('Erro ao carregar produtos. Verifique sua conexão e tente novamente.');
this.carregando.set(false);
}
});

}


//     this.http.get<{title: string, price: number; image: string}[]>(
//       'https://fakestoreapi.com/products',
//     ).subscribe({
//       next: (dados) => {

// // Adaptação da API para o nosso projeto
// const produtosFormatados = dados.map(p => ({
// nome: p.title,
// preco: p.price
// }));

// this.produtos.set(produtosFormatados);
// this.carregando.set(false); // finaliza loading
// },

// error: (erro) => {
// console.error('Erro ao carregar produtos:', erro);
// this.carregando.set(false); // evita loading infinito
// }
//   });


  filtrarNovoProduto() {
    /* Esta função irá filtar a lista atual de produtos 
    e irá retornar um objeto novo que 
    não esteja atualmente na lista de produtos */

    /* Caso a lista de produtos não tenha item nenhum 
    ele retorna e adiciona o primeiro item da lista de produtosNovos */
    if (this.produtos().length === 0) return this.produtosNovos[0];

    /* Verifica o tamanho da lista na tela, com o tamanho da lista de novos produtos
    caso a lista de novos produtos seja maior ou igual, ele continua adicionando na tela
    caso a lista de novos produtos seja menor, ele não faz nada
    */
    if (this.produtosNovos.length >= this.produtos().length) {
      /* Retorna o item na posição atual baseada na quantidade de itens na tela
      Se tiver 2 item na tela, ele vai pegar o terceiro item na lista de novos produtos
      */
      return this.produtosNovos[this.produtos().length];
    }
    /* Caso nenhuma das condições anteriores sejam aplicadas, 
    ele retorna um valor nulo para verificação na inclusão da lista */
    return null;
  }

  adicionarProduto() {
    let novoproduto: { nome: string; preco: number } | null = this.filtrarNovoProduto();

    /* Caso a minha função retorne um item novo, eu adiciono na lista */
    if (novoproduto) {
      this.produtos.update((listaAtual) => [...listaAtual, novoproduto]);
    } else {
      /* Caso contrario, não faço nada */
    }
  }
  

  exibirProduto(nome: string) {
    this.produtosSelecionado.set(nome);
    console.log('Produto selecionado é ' + nome);
  }
  carrinho = signal<ProdutoType[]>([]);
  quantidadeCarrinho = computed(()=> this.carrinho().length);

totalCarrinho = computed(() => 
this.carrinho().reduce((total, item) => total + item.preco, 0))

adicionarAoCarrinho (produto:{nome: string, preco: number}) {
this.carrinho.update((listaCarrinhoAtual) => [...listaCarrinhoAtual, produto]);
  }
};


