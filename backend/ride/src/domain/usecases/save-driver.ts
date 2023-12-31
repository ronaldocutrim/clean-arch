export interface SaveDriver {
  perform(params: SaveDriver.Params): Promise<SaveDriver.Result>;
}

export namespace SaveDriver {
  export type Params = {
    name: string;
    email: string;
    document: string;
    carPlate: string;
  };
  export type Result = {
    driverId: string;
  };
}
