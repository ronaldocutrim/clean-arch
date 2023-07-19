export interface GetDriver {
  perform(params: SaveDriver.Params): Promise<SaveDriver.Result>;
}

export namespace SaveDriver {
  export type Params = {
    driverId: string;
  };

  export type Result = {
    driverId: string;
    name: string;
    email: string;
    document: string;
    carPlate: string;
  };
}
