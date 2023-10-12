import { useState } from 'react';
import './App.css';

function App() {
  const [endereco, setEndereco] = useState({})

  async function manipulaEndereco(e) {
    const cep = e.target.value
    setEndereco({ 
      cep
    })

    if(cep && cep.length === 8) {
      const conexao = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const conexaoJson = await conexao.json()
      setEndereco(enderecoAntigo => {
        return {
          ...enderecoAntigo,
          bairro: conexaoJson.bairro,
          cidade: conexaoJson.localidade,
          estado: conexaoJson.uf
        }
      })
    }
  }
  return (
    <div className="App">
      <h1>viaCep</h1>
      <div className="cep__item">
        <label htmlFor="labelcep">Digite seu cep</label>
        <input type="number" name="" id="labelcep" onChange={manipulaEndereco} placeholder='Digite o CEP'/>
        <ul>
          <li>CEP: {endereco.cep}</li>
          <li>{endereco.bairro}</li>
          <li>{endereco.cidade}</li>
          <li>{endereco.estado}</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
