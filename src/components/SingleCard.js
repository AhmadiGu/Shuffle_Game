import './SingleCard.css'
export default function SingleCard({card, handlechoice, flipped, disabled}) {

    const handleClick = () => {
        if(!disabled){
           handlechoice(card) 
           console.log(disabled) 
        } 
        console.log(disabled) 
    }

    return (
        <div className="card" key={card.id}>
        <div className={flipped ? "flipped" : ""}>
            <img className='front' src={card.src} alt="card"/>
            <img 
             className='back' 
             src="https://www.w3schools.com/w3css/img_lights.jpg" 
             onClick={handleClick} 
             alt="back" />
        </div>   
        </div>
    )
}
