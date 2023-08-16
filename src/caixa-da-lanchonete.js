class CaixaDaLanchonete {

    constructor() {

        // Definindo um dicionário "cardapio" para armazenar os dados dos produtos
        this.cardapio = {
            "cafe": {descricao: "Café", valor: 3.00},
            "chantily": {descricao: "Chantily (extra do Café)", valor: 1.50},
            "suco": {descricao: "Suco Natural", valor: 6.20},
            "sanduiche": {descricao: "Sanduíche", valor: 6.50},
            "queijo": {descricao: "Queijo (extra do Sanduíche)", valor: 2.00},
            "salgado": {descricao: "Salgado", valor: 7.25},
            "combo1": {descricao: "1 Suco e 1 Sanduíche", valor: 9.50},
            "combo2": {descricao: "1 Café e 1 Sanduíche", valor: 7.50},
        };

        this.formasDePagamento = ["dinheiro", "debito", "credito"];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        let total = 0;

        // Validando as formas de pagamento
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Percorrendo cada item do carrinho
        for (let item of itens) {
            const [codigo, qtd_itens] = item.split(",");
            
            // Validando se o código do item atual existe no cardápio
            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            // Validando se a quantidade de itens é maior que zero
            if (parseInt(qtd_itens) <= 0) {
                return "Quantidade inválida!";
            }
            
            // Verificando se há ao menos 1 dos itens principais com a função some(), para que seja possível adicionar seus respectivos itens extras
            if (codigo === "queijo" && !itens.some(item => item.includes("sanduiche")) || codigo === "chantily" && !itens.some(item => item.includes("cafe"))) { 
                return "Item extra não pode ser pedido sem o principal";
            }            

            // Somando ao total o preço do item atual com base na quantidade solicitada
            total += this.cardapio[codigo].valor * parseInt(qtd_itens);

        }

        // Realizando os cálculos para as diferentes formas de pagamentos
        if (formaDePagamento  === "dinheiro") {
            total = total * 0.95;
        } else if (formaDePagamento  === "credito") {
            total = total * 1.03;
        }

        // Formatando o valor total para ter duas casas decimais com "toFixed()" e trocando "." por ","
        const valor_final = total.toFixed(2).replace(".", ",");

        return `R$ ${valor_final}`;
    }
}

export { CaixaDaLanchonete };