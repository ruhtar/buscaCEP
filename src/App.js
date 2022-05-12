import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import './style.css'
import api from "./services/api";
function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})
 
  async function searchCEP(){ //Por ser uma requisição, precisa ser uma função assincrona
    if(input === ''){
      alert('Por favor, digite algum CEP!')
    }
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }
    catch{
      alert('Ops, ocorreu um erro. Tente novamente')
      setInput('')
    }
  }
  //01001000 CEP TESTE
  return (
    <div className="container">
      <h1 className="title">Buscar CEP</h1> 
      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(event)=>{setInput(event.target.value)}}/>
        <button className="buttonSearch" onClick={searchCEP}><FiSearch size={25} color='#FFF'/></button>
      </div>
      
    {Object.keys(cep).length > 0 && (
      <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
    )}
      
     
    </div>
  );
}

export default App;
