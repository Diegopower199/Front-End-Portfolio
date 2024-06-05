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
  origin: { name: string; url: string };
  location: { name: string; id: string };
  image: string;
  episode: EpisodeAPIRest[];
  url: string;
  created: string;
};

export type LocationAPIRest = {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: { name: string; id: string }[];
  created: string;
};

export type EpisodeAPIRest = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
};

export type Character = Omit<CharacterAPI, "episode"> & {
  episode: Array<{
    name: string;
  }>;
};

export type Characters = Omit<CharacterAPI, "results"> & {
  results: Character[];
};
