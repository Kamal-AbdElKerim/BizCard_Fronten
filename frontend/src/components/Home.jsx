import React from "react";
import CreateCard from "./CreateCard";
import Cardes from "./Cardes";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';


export default function Home() {
    const [cards, setCards] = useState([]);
    const [isCrrated, setIsCrrated] = useState(false);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const fetchCurrentUser = async () => {
        try {
          const accessToken = localStorage.getItem('access_token');
          const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error('Failed to fetch current user:', error);
        }
      };
  
      fetchCurrentUser();
    }, []);

    const fetchCards = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/business_cards",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
                    },
                }
            );
             
            setCards(response.data.business_cards);
            console.log(response.data.business_cards)

        } catch (error) {
            setError("Failed to fetch cards");
        }
    };  


    useEffect(() => {
        fetchCards();
    }, [isCrrated]);




    const handleDeleteCard = async (cardId) => {
      try {
        const result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });
    
        if (result.isConfirmed) {
          const response = await axios.get(`http://127.0.0.1:8000/api/deleteBusinessCard/${cardId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          console.log(response)
    
          if (response) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
    
            // Remove the deleted card from the list
            setCards(cards.filter(card => card.id !== cardId));
          } else {
            throw new Error("Failed to delete card");
          }
        }
      } catch (error) {
        setError('Failed to delete card');
      }
    }
    
    return (
        <div className="mb-5">
            <hr />
            <CreateCard setIsCrrated={setIsCrrated} />
            <hr />
            <h2>Cards</h2>
            <div className="row g-2 mt-5">
                {error && <p>{error}</p>}
                    {cards &&
                        cards.map((card) => (
                                <Cardes setIsCrrated={setIsCrrated} key={card.id} card={card} currentUser={currentUser} onDelete={() => handleDeleteCard(card.id)}/>
                        ))}
            </div>
        </div>
    );
}
