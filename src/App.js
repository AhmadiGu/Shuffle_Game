 
import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImag = [
  {"src": "https://via.placeholder.com/150/FF5733/FFFFFF?text=Image+1","match": false},
  {"src": "https://via.placeholder.com/150/3498db/FFFFFF?text=Image+2","match": false},
  {"src": "https://via.placeholder.com/150/e74c3c/FFFFFF?text=Image+3","match": false},
  {"src": "https://via.placeholder.com/150/2ecc71/FFFFFF?text=Image+4","match": false},
  {"src": "https://via.placeholder.com/150/9b59b6/FFFFFF?text=Image+5","match": false},
  {"src": "https://via.placeholder.com/150/f1c40f/FFFFFF?text=Image+6","match": false}
]

function App() {
 
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCard = () => {
    const shuffleCards =[...cardImag, ...cardImag]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
   
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }
  
  const handlechoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map((card) => {
            if(card.src === choiceOne.src){
              return {...card, match: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000) 
      }
    }
  }, [choiceOne, choiceTwo])
 
  const resetTurn = () => { 
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(preTurn => preTurn + 1)
    setDisabled(false)
  }
  
  useEffect(() => { 
    shuffleCard()
  }
  , []) 
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCard} >New Game</button>

      <div className="card-grid">
        {
          cards.map((card) => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handlechoice={handlechoice}
              flipped ={card === choiceOne || card === choiceTwo || card.match}
              disabled ={disabled}
            />
          ))
        }
      </div>
       
       <p> Turns: {turns}</p>
    </div>
  );
}

export default App;
