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

        // storing item in local storage
// in the local storage we can only save strings
        const check = localStorage.getItem('popular');

        if(check){
            //parsing back, string to array
            setPopular(JSON.parse(check)); 
        }
        else{
             //fetching api data
            const api =await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`)

            const data=await api.json();

//converting it to string and saving it
            localStorage.setItem('popular', JSON.stringify(data.recipes));

            setPopular(data.recipes);
    
            console.log(data.recipes);

        }
       
    }
  return (
    <div> 
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
                            <SplideSlide key={recipe.id}>
                            <Card>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient/>
                            </Card>
                            </SplideSlide>
                        )
                    } )};
                    </Splide>
                </Wrapper>
            

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
z-index:-4;
position: absolute;
width: 100%;
height: 100%;
background:linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0));

`

export default Popular
