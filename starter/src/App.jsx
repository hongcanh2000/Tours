import { useEffect, useState } from "react";
import Tours from "./Tours";
import Loading from "./Loading";

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading, setLoading] =  useState(true);
  const [tours, setTours] =  useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    } catch (error) { 
      console.log(error);
    }
    setLoading(false);
  }
  useEffect(()=>{
    fetchTours();
  },[

  ])

  if(isLoading){
    return <main>
      <Loading />
    </main>
  }

  if(tours.length === 0){
    return <main>
      <h2>No have Tours</h2>
      <button type="button" class="btn"onClick={() => fetchTours()}>
        refresh
      </button>
      
    </main>
  }

  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
      
};
export default App;
