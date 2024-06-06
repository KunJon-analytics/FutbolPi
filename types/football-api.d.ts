export type FixtureReturnType = {
  fixture: {
    id: number;
    referee: null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: null | number; //first half timestamp
      second: null | number; // second half timestamp
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: null | number; // minutes elapsed e.g 45
    };
  };
  goals: {
    home: null | number;
    away: null | number;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  score: {
    halftime: {
      home: null | number;
      away: null | number;
    };
    fulltime: {
      home: null | number;
      away: null | number;
    };
    extratime: {
      home: null | number;
      away: null | number;
    };
    penalty: {
      home: null | number;
      away: null | number;
    };
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: null | boolean;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: null | boolean;
    };
  };
};
