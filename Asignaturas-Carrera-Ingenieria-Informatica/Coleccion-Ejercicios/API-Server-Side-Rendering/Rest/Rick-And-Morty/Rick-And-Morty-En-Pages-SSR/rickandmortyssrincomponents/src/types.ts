export type CharactersAPI = {
  info: Info;
  results: Character[];
};

export type EpisodessAPI = {
  info: Info;
  results: EpisodeAPIRest[];
};

export type LocationsAPI = {
  info: Info;
  results: LocationAPIRest[];
};

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type CharacterAPIRest = {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
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
  residents: CharacterAPIRest[];
  created: string;
};

export type EpisodeAPIRest = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: CharacterAPIRest[];
  created: string;
};

export type Character = Omit<CharacterAPIRest, "episode"> & {
  episode: Array<{
    name: string;
  }>;
};

export type Characters = Omit<CharacterAPIRest, "results"> & {
  results: Character[];
};
