const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");

const inputNome = document.getElementById("nome");
const inputQuantidade = document.getElementById("quantidade");

const itens = JSON.parse(localStorage.getItem("item")) || [];

itens.forEach(element => {
    criarElemento(element)
});


form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    
    let nome = evento.target.elements['nome']
    let quantidade = evento.target.elements['quantidade']
    // forma simples - console.log(evento.target[0].value)
    // forma dinâmica - console.log(evento.target.elements['nome'].value)
    
    let existeItem = itens.find(elemento => elemento.nome === nome.value);
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };
    
    
    if(existeItem){
        itemAtual.id = existeItem.id;

        atualizarElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existeItem.id)] = itemAtual

    } else {
        itemAtual.id = itens[itens.length -1] ? itens[itens.length -1].id + 1 : 0;
        
        criarElemento(itemAtual);
        
        itens.push(itemAtual)
    }
    
    
    localStorage.setItem("item", JSON.stringify(itens));
    
    
    inputNome.value = "";
    inputQuantidade.value = "";
    
})

function criarElemento(item) {
    let novoItem = document.createElement("li");
    novoItem.classList.add("item");
    
    let novaQuantidade = document.createElement("strong");
    novaQuantidade.innerHTML = item.quantidade;
    novaQuantidade.dataset.id = item.id;
    
    novoItem.appendChild(novaQuantidade);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem);
    
}

function atualizarElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}


function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.classList.add('botao-deleta');

    elementoBotao.addEventListener("click", function() {
      deletarElemento(this.parentNode, id)
        
        
    }); 

    return elementoBotao
}


function deletarElemento(tag, id){
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    console.log(itens);

    localStorage.setItem("item", JSON.stringify(itens));

}