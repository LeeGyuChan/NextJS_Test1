import styled from "@emotion/styled";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ListResponse } from "../types/pokemon";
import { formatNumbering } from "../utils/common";
import usePokemon, { usePokemonPage } from "../hooks/usePokemon";
import Link from "next/link";
import { dehydrate, QueryClient } from "react-query";
import { pokemon2Api, pokemonApi } from "../apis/pokemonApi";
import { GetServerSideProps } from "next";


const Base = styled.div`
margin-top: 24px;
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    display: block;

`;

const ListItem = styled.li`
position: relative;
list-style: none;
display: flex;
align-items: center;
box-shadow: 6px 4px 14px 5px rgba(0,0,0,0.21);
border-radius: 12px;

& + & {
        margin-top: 18px;
    }

`;

const List = styled.ul`
margin: 0;
padding: 0;
`;

const Image = styled.img``;

const Name = styled.p`
margin: 0;
padding: 0 0 0 12px;
flex : 1 1 100%;
color: #374151;
text-transform: capitalize;
font-size: 16px;
font-weight: bold;
`;

const Index = styled.p`
position: absolute;
margin: 0;
padding: 0;
right: 24px;
font-size: 24px;
font-weight: bold;
color:#D1D5DB;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh -180px);
`;
const Loading = styled.img``;


const getImageUrl = (pokemonIndex: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`


  
  const PokemonList = () => {
      
    //const {data, isLoading, isError} = usePokemon<ListResponse>('');
    const [ref, inView] = useInView()
    const {data, isLoading, isError, fetchNextPage} = usePokemonPage('');

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView) {
            console.log(inView);
            fetchNextPage()
        }
      }, [inView])


      console.log(data);
    return(
        <Base>
        {
            isLoading || isError? (
                <LoadingWrapper>
                    <Loading src="/loding.gif" alt="loading"/>
                </LoadingWrapper>
            ) : (
                <List>
                    {
                        
                        data && data.pages.map((page)=>{
                            
                            const pokemonArray = page.data.results;
                            
                            return(
                                pokemonArray.map((pokemon, idx)=>(
                                        <StyledLink key={pokemon.name} href={`pokemon/detail/${idx+1}`} ref ={ref}>
                                            <ListItem ref ={ref}>
                                                    <Image src={getImageUrl(idx +1)}/>
                                                    <Name>{pokemon.name}</Name>
                                                    <Index>{formatNumbering(idx+1)}</Index>
                                            </ListItem>
                                        </StyledLink>
                                ))
                            )
                            
                        })
                    }
            </List>

            )
        }
        </Base>
    )

}


export default PokemonList




// import styled from "@emotion/styled";
// import Link from "next/link";
// import usePokemon from "../hooks/usePokemon";
// import { ListResponse, PokemonResponse } from "../types/pokemon";


// const Base = styled.div`
// margin-top: 24px;
// `;

// const ListItem = styled.li`
// position: relative;
// list-style: none;
// display: flex;
// align-items: center;
// box-shadow: 6px 4px 14px 5px rgba(0,0,0,0.21);
// border-radius: 12px;
// & + & {
//     margin-top: 18px;
// }
// `;

// const List = styled.ul`
// margin: 0;
// padding: 0;
// `;

// const Image = styled.img``;

// const Name = styled.p`
// margin: 0;
// padding: 0 0 0 12px;
// flex : 1 1 100%;
// color: #374151;
// text-transform: capitalize;
// font-size: 16px;
// font-weight: bold;
// `;

// const Index = styled.p`
// position: absolute;
// margin: 0;
// padding: 0;
// right: 24px;
// font-size: 24px;
// font-weight: bold;
// color:#D1D5DB;
// `;

// const LoadingWrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
//     height: calc(100vh -180px);
// `;
// const Loading = styled.img``;

// const StyledLink = styled(Link)`
//     text-decoration: none;
//     display: block;

// `;



// const getImageUrl = (pokemonIndex: number): string =>
//   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`



//   const PokemonList = () => {

//     const {data, isLoading, isError} = usePokemon<ListResponse>('');

//     const formatNumbering = (index : number) : string => {
//         return `#${String(index).padStart(3,'0')}`;
//     }
//     return(
//         <Base>
//         {
//             isLoading || isError? (
//                 <LoadingWrapper>
//                     <Loading src="/loding.gif" alt="loading"/>
//                 </LoadingWrapper>
//             ) : (
//                 <List>
//                     {
//                         data && data?.data.results.map( (pokemon, idx) =>(
//                                         <StyledLink key={pokemon.name} href={`pokemon/detail/${idx+1}`}>
//                                             <ListItem>
//                                                     <Image src={getImageUrl(idx +1)}/>
//                                                     <Name>{pokemon.name}</Name>
//                                                     <Index>{formatNumbering(idx+1)}</Index>
//                                             </ListItem>
//                                         </StyledLink>
//                         ))
//                     } 
//             </List>
//             )
//         }
//         </Base>
//     )

// }

// export default PokemonList 