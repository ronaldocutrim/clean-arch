export interface SavePassenger {
  perform(params: SavePassenger.Params): Promise<SavePassenger.Result>;
}

export namespace SavePassenger {
  export type Params = {
    id?: string;
    name: string;
    email: string;
    document: string;
  };
  export type Result = {
    passengerId: string;
  };
}
