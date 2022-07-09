import styled from "@emotion/styled"
import { AxiosError, AxiosResponse } from "axios";
import { dehydrate, QueryClient } from "react-query";
import { pokemon2Api, pokemonApi } from "../../src/apis/pokemonApi";
import PokemonList from "../../src/components/PokemonList";
import { usePokemonPage } from "../../src/hooks/usePokemon";
import { ListResponse } from "../../src/types/pokemon";

const Base = styled.div`
  position: absolute;
  padding: 12px 18px;
  overflow: hidden;
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  color: #d34f49;
  font-weight: bold;
`;

const Description = styled.small`
  color: #6B7280;
  padding: 0;
  margin: 16px 0 0 0;
  display: block;
`;

const ImageWrapper = styled.div`
  position: fixed;
  width: 288px;
  height: 288px;
  top: 0;
  right: 0;
  opacity: 0.4;
  transform: translate(96px, -96px);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;



const IndexPage = () => {
    return(
        <Base>
        <Title>Pokédex</Title>
        <Description>The Pokédex contains detailed stats for every creature from the Pokémon games.</Description>
        <PokemonList/>
        <ImageWrapper>
          <Image src="/assets/pocketball.svg" />
        </ImageWrapper>


      </Base>
    )
}

const getPokemons = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
  const data = await response.json();

  const obj = {
    data : data
  }

  const obj2 = {
    pages : [{
      data : data
    }]
  }
  
  return obj2;
};


const getPokemons2 = async () => {
  const data =  ({pageParam = 150})=>  pokemon2Api('', pageParam);

  console.log({data});

  return data;
};



export async function getServerSideProps() {

  const queryClient = new QueryClient();


  await queryClient.prefetchQuery('pokemons', getPokemons)
  
//  await queryClient.prefetchInfiniteQuery<AxiosResponse<ListResponse, AxiosError>>('pokemons' , ()=>  pokemon2Api('', 150), {staleTime: 1000})

  // await queryClient.prefetchInfiniteQuery(
  //     'pokemons' , ()=>  pokemon2Api('', 150),
  //         {
  //           getPreviousPageParam: undefined,
  //           getNextPageParam: undefined,
  //             staleTime : 1000
  //         },
  //     );

  return {
    props: {
      
      dehydratedState: dehydrate(queryClient),
      //dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      //위와 같이 dehydrate한 것을 stringify했다가 다시 parse하는 것은 InfiniteQuery를 사용할 때 발생하는 이슈이다. 그냥 dehydrate한 상태로 넘겨주면 다음과 같은 오류가 난다.
      //InfiniteQuery에서 맨 처음 페이지에 해당하는 데이터의 pageParam이 undefined로 설정되기 때문에 hydration과정에서 직렬화가 되지 않아서 저렇게 해주었다. 더 궁금하다면 이슈를 참고해보면 좋을 것 같다.
    },
  };
}



export default IndexPage