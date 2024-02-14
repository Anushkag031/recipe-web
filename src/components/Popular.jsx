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
                    <Splide options={{
                        perPage: 4,
                        arrows:false,
                        pagination:false,
                        drag :'free',
                        gap:'3rem'
                    }}>
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
margin: 3rem 0rem;
`;

const Card =styled.div`
min-height:18rem;
border-radium:2rem;
overflow: hidden;
position:relative;


img{
    border-radius:2rem;
    position:absolute;
    left:0;
    width:100%;
    height:100%;
    object-fit:cover;
}
p{
    position:absolute;
    z-index:10;
    left:50%;
    bottom:0%;
    transform:translate(-50%, 0%);
    color : white;
    width : 100%;
    font-weight:bold;
    text-align:center;
    display:flex;
    justify-content:center;
    align-items:center;
}

`

const Gradient = styled.div`
z-index:3;
position: absolute;

`

export default Popular
