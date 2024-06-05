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
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
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
