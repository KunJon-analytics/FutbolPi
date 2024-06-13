import { EventSchemas, Inngest } from "inngest";

import { siteConfig } from "@/config/site";
import {
  CompetitionNewFixture,
  TelegramEventType,
} from "@/lib/notifications/telegram";

type CompleteFixture = {
  data: {
    fixtureId: number;
  };
};

type TelegramEvent = {
  data: {
    message: string;
    type: TelegramEventType;
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

type NewFixtures = {
  data: {
    competitions: CompetitionNewFixture[];
  };
};

type Events = {
  "fixtures/current-week.get": {};
  "fixtures/today.update": {};
  "fixtures/fixture.complete": CompleteFixture;
  "fixtures/fixture.finish": FinishFixture;
  "fixtures/fixture.cancel": CancelFixture;
  "notifications/telegram.send": TelegramEvent;
  "notifications/fixtures.new": NewFixtures;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: siteConfig.name,
  schemas: new EventSchemas().fromRecord<Events>(),
});
