import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImag = [
  { "src": "/img/helmet-1.png", matched: false},
  { "src": "/img/potion-1.png", matched: false},
  { "src": "/img/ring-1.png", matched: false},
  { "src": "/img/scroll-1.png", matched: false},
  { "src": "/img/shield-1.png", matched: false},
  { "src": "/img/sword-1.png", matched: false}
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
  
  const checkMatch = () => { 
    if(cards.every((card) => card.matched)){
      return true
    }
    return null;
  }
  
  let winMessage = null; 
  if(checkMatch()){
    winMessage = (
    <div 
    className='text-4xl font-bold text-white backdrop-blur-sm bg-white/30 absolute 
    text-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 py-16
    rounded-lg shadow-inner shadow-purple-900 text-center'>
     You Win After {turns} Turns! <br/>
     <span> Click New Game to Try New One</span>
   </div>
    );
  }
  
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map((card) => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
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
    <div className="text-center bg-fuchsia-950 bg-gradient-to-r from-fuchsia-950 via-purple-700 to-pink-900"> 

      <div class="relative text-center text-white">
        <div class="bg-hero-pattern h-14 w-full bg-cover "></div>
        <p class="font-bold absolute text-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">MEMORY GAMES</p>
      </div> 

      <button type='button' 
        onClick={shuffleCard}
        className='px-4 py-2 my-3 font-bold text-white bg-purple-600 rounded hover:bg-purple-700'
      >New Game</button>

      <div className="grid place-items-center gap-5 my-7 px-32 lg:grid-cols-4  sm:grid-cols-3">
        {
          cards.map((card) => (
            <SingleCard 
              key={card.id} 
              card={card} 
              handlechoice={handlechoice}
              flipped ={card === choiceOne || card === choiceTwo || card.matched}
              disabled ={disabled}
            />
          ))
        }
      </div>
     
      <p className='px-4 py-2 font-bold text-2xl text-white bg-purple-600 rounded hover:bg-purple-700'> Turns: {turns}</p>
      {
        winMessage 
      }
    </div>
  );
}

export default App;
