import React, { useState, useEffect } from "react";

export default function CardBoard() {
  const [deckID, setDeckID] = useState("");
  const [card, setCard] = useState({
    code: "5C",
    image: "https://deckofcardsapi.com/static/img/X1.png",
    value: "Joker",
    suit: "Deck",
    remaining: 52,
  });
  const cardChangeHandler = async () => {
    const fetchCard = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    );
    const cardJSON = await fetchCard.json();
    setCard(
      {
        code: cardJSON.cards[0].code,
        image: cardJSON.cards[0].image,
        value: cardJSON.cards[0].value,
        suit: cardJSON.cards[0].suit,
        remaining: cardJSON.remaining,
      },
      []
    );
  };
  useEffect(() => {
    const fetchDeckID = async () => {
      const shuffleDeck = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const deckJSON = await shuffleDeck.json();
      setDeckID(deckJSON.deck_id);
    };
    fetchDeckID();
  }, []);
  return (
    <div>
      <div
        className="cardboard-wrapper"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1520589884715-55ac7417f2ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
          backgroundSize: "cover",
        }}
      >
        <div className="cardboard">
          <div className="container">
            <div
              className="row"
              style={{
                backgroundImage:
                  "linear-gradient(to left, transparent, #fff, transparent)",
              }}
            >
              <div
                className="col-sm-12 d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
              >
                <div className="inner">
                  <span className="card-suit-value py-3 d-block text-center display-6">{`${card.value} of ${card.suit}`}</span>
                  <div className="card-container d-block text-center">
                    <img
                      src={card.image}
                      alt="card-image"
                      className="img-fluid card"
                    />
                  </div>
                  <div className="new-card-button py-3 d-block text-center">
                    <button
                      onClick={cardChangeHandler}
                      className="btn btn-primary"
                    >
                      New Card
                    </button>
                  </div>
                  <div className="content">
                    <p className="d-block text-center">
                      {" "}
                      {card.remaining
                        ? `Remaining ${card.remaining}`
                        : "Out Of Cards, Please reload the page!!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
