import { AxiosError, AxiosResponse } from "axios";
import { useInfiniteQuery, useQueries, useQuery } from "react-query"
import { pokemonApi, pokemon2Api } from "../apis/pokemonApi";
import { UseQueryResult } from 'react-query/types/react/types';
import { ListResponse } from "../types/pokemon";
import axiosInstance from "../apis/index";

// export const usePokemonPage = (query:string) => useInfiniteQuery<AxiosResponse<ListResponse, AxiosError>>('pokemons' , ({pageParam = 150})=>  axiosInstance.get(`/pokemon/${query}`, {params:{limit:pageParam}}),
//     {
//         getNextPageParam : (lastPage, allPage) => {
//             return 300;
//         }
//     }
// )

export const usePokemonPage = (query:string) => useInfiniteQuery<AxiosResponse<ListResponse, AxiosError>>('pokemons' , ({pageParam = 150})=>  pokemon2Api(query, pageParam),
    {
        getNextPageParam : (lastPage, allPage) => {
            return 300;
        }
    }
)

const usePokemon = <T = any>(query:string, count? : number) :  UseQueryResult<AxiosResponse<T>, AxiosError> => useQuery(query ? ['pokemons', query] : 'pokemons', () => pokemonApi(query, count));



export const usePokemonQueries = <T = any>(names:string[]) : Array<UseQueryResult<AxiosResponse<T>, AxiosError>> => {
    
    const queries = names.map((name, idx) => ({
        queryKey : ['evolution', `${name}+${idx}`],
        queryFn : () => pokemonApi(name)  
    }))

    return useQueries(queries) as Array<UseQueryResult<AxiosResponse<T>, AxiosError>>
}


export default usePokemon