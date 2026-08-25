import { Injectable, signal, computed } from '@angular/core';

type CarrinhoType ={
    nome: string
    preco: number
}

@Injectable({
providedIn: 'root'
})
export class CarrinhoService {
private carrinho = signal<{ nome: string; preco: number }[]>([]);

itens = computed(() => this.carrinho());
quantidade = computed(() => this.carrinho().length);
total = computed(() =>
this.carrinho().reduce((total, item) => total + item.preco, 0)
);

adicionar(produto: { nome: string; preco: number }) {
this.carrinho.update(lista => [...lista, produto]);
}
limpar() {
this.carrinho.set([]);
}
}