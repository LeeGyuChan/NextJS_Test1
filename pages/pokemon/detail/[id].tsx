import { useMemo, useState } from "react";
import { PokemonResponse } from "../../../src/types/pokemon";
import styled from '@emotion/styled';
import { keyframes } from "@emotion/react";
import { useRouter } from "next/router";
import usePokemon from "../../../src/hooks/usePokemon";
import PokemonInfo from "../../../src/components/PokemonInfo";


const slideInLeft = keyframes`
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;
const slideOutLeft = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
`;

const slideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutRight = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
`;


const Base = styled.div`
    position: absolute;
    background-color: #fff;
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;


type Params = {
    id: string;
}

type Tab = 'about' | 'stats' | 'evolution';

const DetailPage = () => {

    const router = useRouter();
    const { id }  = router.query;

    const pokemonResult = usePokemon<PokemonResponse>('');

    const { name, types, height, weight, abilities, baseExp, stats } = useMemo(() => ({
        name: pokemonResult.data?.data.name,
        types: pokemonResult.data?.data.types,
        height: pokemonResult.data?.data.height,
        weight: pokemonResult.data?.data.weight,
        abilities: pokemonResult.data?.data.abilities,
        baseExp: pokemonResult.data?.data.base_experience,
        stats: pokemonResult.data?.data.stats,
      }), [pokemonResult]);


    return(
            <Base>
                <PokemonInfo id={id ? id :''} name={name} types={types}/>
            </Base>
    )
}

export default DetailPage