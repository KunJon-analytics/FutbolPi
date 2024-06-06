import { EventSchemas, Inngest } from "inngest";

import { siteConfig } from "@/config/site";

type CompleteFixture = {
  data: {
    fixtureId: number;
  };
};

type CancelFixture = {
  data: {
    idsToDelete: number[];
  };
};

export type FinishFixture = {
  data: {
    fixtureId: number;
    awayGoals: number;
    homeGoals: number;
  };
};

type Events = {
  "fixtures/current-week.get": {};
  "fixtures/today.update": {};
  "fixtures/fixture.complete": CompleteFixture;
  "fixtures/fixture.finish": FinishFixture;
  "fixtures/fixture.cancel": CancelFixture;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: siteConfig.name,
  schemas: new EventSchemas().fromRecord<Events>(),
});
