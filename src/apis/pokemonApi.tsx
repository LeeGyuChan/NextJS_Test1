import axiosInstance from ".";

export const pokemonApi = (query:string, count :number = 150) => axiosInstance.get(`/pokemon/${query}`, {params:{limit:count}});
export const pokemon2Api = (query:string, pageParam:number) => axiosInstance.get(`/pokemon/${query}`, {params:{limit:pageParam}});
export const SpeciesApi = (query:string) => axiosInstance.get(`/pokemon-species/${query}`);
export const AbilitiesApi = (query:string) => axiosInstance.get(`/ability/${query}`);
export const EvolustionChainsApi = (query:string) => axiosInstance.get(`/evolution-chain/${query}`);