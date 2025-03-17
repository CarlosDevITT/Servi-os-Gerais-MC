// Variável que mantém o estado visível do carrinho
var carrinhoVisivel = false;

// Esperamos que todos os elementos da página carreguem para executar o script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', pronto);
} else {
    pronto();
}

function pronto() {
    // Adicionamos funcionalidade aos botões de exclusão do carrinho
    var botoesExcluirItem = document.getElementsByClassName('btn-excluir');
    for (var i = 0; i < botoesExcluirItem.length; i++) {
        var botao = botoesExcluirItem[i];
        botao.addEventListener('click', excluirItemCarrinho);
    }

    // Adiciono funcionalidade ao botão de aumentar quantidade
    var botoesAumentarQuantidade = document.getElementsByClassName('aumentar-quantidade');
    for (var i = 0; i < botoesAumentarQuantidade.length; i++) {
        var botao = botoesAumentarQuantidade[i];
        botao.addEventListener('click', aumentarQuantidade);
    }

    // Adiciono funcionalidade ao botão de diminuir quantidade
    var botoesDiminuirQuantidade = document.getElementsByClassName('diminuir-quantidade');
    for (var i = 0; i < botoesDiminuirQuantidade.length; i++) {
        var botao = botoesDiminuirQuantidade[i];
        botao.addEventListener('click', diminuirQuantidade);
    }

    // Adicionamos funcionalidade ao botão "Adicionar ao carrinho"
    var botoesAdicionarAoCarrinho = document.getElementsByClassName('botao-item');
    for (var i = 0; i < botoesAdicionarAoCarrinho.length; i++) {
        var botao = botoesAdicionarAoCarrinho[i];
        botao.addEventListener('click', adicionarAoCarrinhoClicado);
    }

    // Adicionamos funcionalidade ao botão "Pagar"
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicado);
}

// Eliminamos todos os elementos do carrinho e o ocultamos
function pagarClicado() {
    alert("Obrigado pela compra!");
    // Removo todos os elementos do carrinho
    var itensCarrinho = document.getElementsByClassName('carrinho-itens')[0];
    while (itensCarrinho.hasChildNodes()) {
        itensCarrinho.removeChild(itensCarrinho.firstChild);
    }
    atualizarTotalCarrinho();
    ocultarCarrinho();
}

// Função que controla o botão clicado de adicionar ao carrinho
function adicionarAoCarrinhoClicado(event) {
    var botao = event.target;
    var item = botao.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var preco = item.getElementsByClassName('preco-item')[0].innerText;
    var imagemSrc = item.getElementsByClassName('imagem-item')[0].src;
    console.log(imagemSrc);

    adicionarItemAoCarrinho(titulo, preco, imagemSrc);

    tornarCarrinhoVisivel();
}

// Função que torna o carrinho visível
function tornarCarrinhoVisivel() {
    carrinhoVisivel = true;
    var carrinho = document.getElementsByClassName('carrinho')[0];
    carrinho.style.marginRight = '0';
    carrinho.style.opacity = '1';

    var itens = document.getElementsByClassName('container-itens')[0];
    itens.style.width = '60%';
}

// Função que adiciona um item ao carrinho
function adicionarItemAoCarrinho(titulo, preco, imagemSrc) {
    var item = document.createElement('div');
    item.classList.add('item');
    var itensCarrinho = document.getElementsByClassName('carrinho-itens')[0];

    // Controlamos se o item que tenta ser adicionado já está no carrinho
    var nomesItensCarrinho = itensCarrinho.getElementsByClassName('carrinho-item-titulo');
    for (var i = 0; i < nomesItensCarrinho.length; i++) {
        if (nomesItensCarrinho[i].innerText == titulo) {
            alert("O item já está no carrinho");
            return;
        }
    }

    var conteudoItemCarrinho = `
        <div class="carrinho-item">
            <img src="${imagemSrc}" width="80px" alt="">
            <div class="carrinho-item-detalhes">
                <span class="carrinho-item-titulo">${titulo}</span>
                <div class="seletor-quantidade">
                    <i class="fa-solid fa-minus diminuir-quantidade"></i>
                    <input type="text" value="1" class="carrinho-item-quantidade" disabled>
                    <i class="fa-solid fa-plus aumentar-quantidade"></i>
                </div>
                <span class="carrinho-item-preco">${preco}</span>
            </div>
            <button class="btn-excluir">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = conteudoItemCarrinho;
    itensCarrinho.append(item);

    // Adicionamos a funcionalidade de exclusão ao novo item
    item.getElementsByClassName('btn-excluir')[0].addEventListener('click', excluirItemCarrinho);

    // Adicionamos a funcionalidade de diminuir quantidade ao novo item
    var botaoDiminuirQuantidade = item.getElementsByClassName('diminuir-quantidade')[0];
    botaoDiminuirQuantidade.addEventListener('click', diminuirQuantidade);

    // Adicionamos a funcionalidade de aumentar quantidade ao novo item
    var botaoAumentarQuantidade = item.getElementsByClassName('aumentar-quantidade')[0];
    botaoAumentarQuantidade.addEventListener('click', aumentarQuantidade);

    // Atualizamos o total
    atualizarTotalCarrinho();
}

// Aumento em um a quantidade do elemento selecionado
function aumentarQuantidade(event) {
    var botaoClicado = event.target;
    var seletor = botaoClicado.parentElement;
    console.log(seletor.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var quantidadeAtual = seletor.getElementsByClassName('carrinho-item-quantidade')[0].value;
    quantidadeAtual++;
    seletor.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
    atualizarTotalCarrinho();
}

// Diminuo em um a quantidade do elemento selecionado
function diminuirQuantidade(event) {
    var botaoClicado = event.target;
    var seletor = botaoClicado.parentElement;
    console.log(seletor.getElementsByClassName('carrinho-item-quantidade')[0].value);
    var quantidadeAtual = seletor.getElementsByClassName('carrinho-item-quantidade')[0].value;
    quantidadeAtual--;
    if (quantidadeAtual >= 1) {
        seletor.getElementsByClassName('carrinho-item-quantidade')[0].value = quantidadeAtual;
        atualizarTotalCarrinho();
    }
}

// Excluo o item selecionado do carrinho
function excluirItemCarrinho(event) {
    var botaoClicado = event.target;
    botaoClicado.parentElement.parentElement.remove();
    // Atualizamos o total do carrinho
    atualizarTotalCarrinho();

    // A seguinte função verifica se há elementos no carrinho
    // Se não houver, oculto o carrinho
    ocultarCarrinho();
}

// Função que controla se há elementos no carrinho. Se não houver, oculto o carrinho.
function ocultarCarrinho() {
    var itensCarrinho = document.getElementsByClassName('carrinho-itens')[0];
    if (itensCarrinho.childElementCount == 0) {
        var carrinho = document.getElementsByClassName('carrinho')[0];
        carrinho.style.marginRight = '-100%';
        carrinho.style.opacity = '0';
        carrinhoVisivel = false;

        var itens = document.getElementsByClassName('container-itens')[0];
        itens.style.width = '100%';
    }
}

// Atualizamos o total do carrinho
function atualizarTotalCarrinho() {
    // Selecionamos o container do carrinho
    var carrinhoContainer = document.getElementsByClassName('carrinho')[0];
    var itensCarrinho = carrinhoContainer.getElementsByClassName('carrinho-item');
    var total = 0;
    // Percorremos cada elemento do carrinho para atualizar o total
    for (var i = 0; i < itensCarrinho.length; i++) {
        var item = itensCarrinho[i];
        var precoElemento = item.getElementsByClassName('carrinho-item-preco')[0];
        // Removemos o símbolo de real e o ponto dos milhares
        var preco = parseFloat(precoElemento.innerText.replace('R$', '').replace('.', ''));
        var quantidadeItem = item.getElementsByClassName('carrinho-item-quantidade')[0];
        console.log(preco);
        var quantidade = quantidadeItem.value;
        total = total + (preco * quantidade);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrinho-preco-total')[0].innerText = 'R$' + total.toLocaleString("pt-BR") + ",00";
}