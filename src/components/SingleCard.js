import './SingleCard.css';

export default function SingleCard({ card, handlechoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handlechoice(card);
        }
    };

    return (
        <div className="relative " key={card.id}>
            <div className={flipped ? "flipped" : ""}>
                <img
                    className={`front w-full h-full block absolute transition-all duration-700 ease-in-out border-2 border-white rounded transform ${flipped ? 'delay-200' : ''}`}
                    src={card.src}
                    alt="card"
                />
                <img
                    className={`back w-full h-full block border-2 border-white rounded transition-all duration-700 ease-in-out transform ${flipped ? ' opacity-0 translate-y-full delay-500' : 'translate-y-0'}`}
                    src="img/cover.png"
                    onClick={handleClick}
                    alt="back"
                />
            </div>
        </div>
    );
}
