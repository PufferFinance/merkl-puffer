import type { MetaFunction } from "@remix-run/node";
import {
  Button,
  Container,
  createColoring,
  Group,
  Icon,
  Input,
  OverrideTheme,
  Text,
  Title,
  Faq,
  Countdown,
} from "dappkit";

import { EXT } from "src/constants/routes";

export const meta: MetaFunction = () => {
  return [
    { title: "ZKsync Ignite" },
    { name: "description", content: "Welcome to ZKsync Ignite!" },
  ];
};

export function Hero() {
  return (
    <section className="hero py-xl*2 md:py-xl*4 lg:py-[8rem] bg-accent-10 w-full">
      <OverrideTheme
        coloring={createColoring(
          ["#7F89F2", "#FFA200", "#111111"],
          ["#F89B00", "#3A3D90", "#FFFFFF"]
        )}
        mode="light"
      >
        <Container>
          <Group className="mb-xl*2 justify-center">
            <div className="relative">
              <Title
                h={1}
                size="display1"
                className="text-center md:text-left !text-accent-1"
              >
                ZK<span className="font-normal">sync</span> Ignite
              </Title>
              <Title
                h={5}
                className="absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 -bottom-8 md:-bottom-4 text-main-12"
              >
                Powered by <span className="text-accent-1">Merkl</span>
              </Title>
            </div>
          </Group>
          <Group className="lg:w-1/2 xl:w-1/3 mx-auto flex-col items-center md:items-end gap-xl mt-xl*4 md:mt-0">
            <Group className="justify-center items-stretch w-full my-xl gap-xl">
              <Input
                className="!flex-1 w-full !rounded-full !px-xl !text-main-9 inline-flex items-center placeholder:!text-main-9 !bg-main-1 min-w-[300px]"
                placeholder="Enter your email for updates"
              />
              <Button
                size="xl"
                className="!py-lg !rounded-full transition-all duration-300 bg-main-12 text-accent-1 hover:bg-accent-12 hover:text-main-1 active:bg-main-3 focus-visible:border-main-9 !gap-sm"
              >
                <Icon remix="RiArrowRightLine" className="text-main-6" />
                Subscribe
              </Button>
            </Group>
            <Group className="md:justify-end items-center gap-xl">
              <Title h={5}>Follow us on</Title>
              <Group>
                <Button
                  className="transition-opacity hover:opacity-70 !rounded-full !p-md !text-main-12 !bg-main-1"
                  external
                  to={EXT.x}
                >
                  <Icon
                    className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                    remix="RiTwitterXFill"
                  />
                </Button>
                <Button
                  className="transition-opacity hover:opacity-70 !rounded-full !p-md !text-main-12 !bg-main-1"
                  external
                  to={EXT.telegram}
                >
                  <Icon
                    className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                    remix="RiTelegram2Fill"
                  />
                </Button>
              </Group>
            </Group>
          </Group>
        </Container>
      </OverrideTheme>
    </section>
  );
}

export function CountdownSection() {
  return (
    <section className="counter py-xl*2 bg-accent-10 w-full">
      <OverrideTheme mode="light">
        <Container>
          <Group className="gap-xl*2 lg:!gap-0 my-[4rem] items-center flex-wrap-reverse">
            <Group className="lg:w-1/3">
              <Title h={3} className="text-gray-12">
                Ready to ignite your protocol?
              </Title>

              <Button
                size="xl"
                className="!py-lg !rounded-full !text-sm transition-all duration-300 bg-main-12 text-accent-1 hover:bg-accent-12 hover:text-main-1 active:bg-main-3 focus-visible:border-main-12 !gap-sm"
              >
                Join the program now!
              </Button>
            </Group>
            <Group className="lg:w-2/3 text-gray-12 text-xl lg:justify-end items-center gap-y-lg">
              <Countdown targetDate={new Date("2024-12-01T12:00:00")} />

              <Text
                size="md"
                className="w-full md:w-auto text-right md:text-left md:ml-lg text-main-12 !font-bold"
              >
                left before ignition
              </Text>
            </Group>
          </Group>
        </Container>
      </OverrideTheme>
    </section>
  );
}

export default function Index() {
  return (
    <>
      <Hero />
      <CountdownSection />
      <Faq
        faqs={[
          "How to participate?",
          "What's zkSync Ignite?",
          "Why join the program?",
        ]}
      />
    </>
  );
}
