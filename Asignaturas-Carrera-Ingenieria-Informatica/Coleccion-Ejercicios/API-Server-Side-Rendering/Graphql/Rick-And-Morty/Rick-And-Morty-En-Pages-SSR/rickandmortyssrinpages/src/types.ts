export type RickAndMortyAPI = {
  characters: CharactersAPI;
  locations: "https://rickandmortyapi.com/api/location";
  episodes: "https://rickandmortyapi.com/api/episode";
};

export type CharactersAPI = {
  info: Info;
  results: Character[];
};

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type CharacterAPI = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { id: string; name: string };
  location: { id: string; name: string };
  image: string;
  episode: { id: string; name: string }[];
  url: string;
  created: string;
};

export type Character = Omit<CharacterAPI, "episode"> & {
  episode: Array<{
    name: string;
  }>;
};
