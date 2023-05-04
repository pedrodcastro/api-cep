async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById('erro')
  mensagemErro.innerHTML = '';
  try{
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`) /* Faz a requisição */
    var consultaCEPConvertida = await consultaCEP.json(); /* Transforma em JSON */
    if (consultaCEPConvertida.erro) {
      throw Error('CEP não existente!') /* Define uma mensagem de erro */
    }
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;
    bairro.value = consultaCEPConvertida.bairro;

    console.log(consultaCEPConvertida)
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
  }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value))

