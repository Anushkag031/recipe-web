import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

const Popular = () => {

    const [popular, setPopular]=useState([]);

    useEffect(() => {
        getPopular();
    },[])

    const getPopular =async() =>{

        const api =await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)

        const data=await api.json();
        setPopular(data.recipes);

        console.log(data.recipes);
    }
  return (
    <div>
     
            return(
                <Wrapper >
                    <h3>Trending Picks</h3>
                    <Splide>
                    {popular.map((recipe) => {
                        return(
                            <SplideSlide>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                            </Card>
                            </SplideSlide>
                        )
                    } )};
                    </Splide>
                </Wrapper>
            )

    </div>
  )
}

const Wrapper = styled.div`
margin: 4rem 0rem;
`;

const Card =styled.div`
min-height:25rem;
border-radium:2rem;
overflow: hidden;

img{
    border-radius:2rem 2rem 0 0;
}



`

export default Popular
