import type { MetaFunction } from "@remix-run/node";
import {
  Button,
  createColoring,
  Group,
  Icon,
  Input,
  OverrideTheme,
  Text,
  Title,
} from "dappkit";
import Container from "src/components/composite/layout/Container";
import { EXT } from "src/constants/routes";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <section className="hero py-xl*4  bg-accent-10 w-full">
        <Container>
          <OverrideTheme
            coloring={createColoring(
              ["#7F89F2", "#FFA200", "#111111"],
              ["#F89B00", "#3A3D90", "#FFFFFF"]
            )}
            mode="light"
          >
            <Group className="mb-xl*2 justify-center">
              <div className="relative">
                <Title h={1} className="text-[128px] font-bold">
                  ZK<span className="">sync</span> Ignite
                </Title>
                <Text className="absolute right-0 bottom-0 text-main-12">
                  Powered by <span className="text-accent-1">Merkl</span>
                </Text>
              </div>
            </Group>
            <Group className="w-1/2 mx-auto flex-col !items-end">
              <Group className="justify-center items-stretch">
                <Input
                  className="!rounded-full !px-xl !text-main-9 inline-flex items-center placeholder:!text-sm !text-sm placeholder:!text-main-9 !bg-main-1 min-w-[300px]"
                  placeholder="Enter your email for updates"
                />
                <Button
                  size="xl"
                  className="!rounded-full !text-sm transition-all duration-300 bg-main-12 text-accent-1 hover:bg-accent-12 hover:text-main-1 active:bg-main-3 focus-visible:border-main-9 !gap-sm"
                >
                  <Icon
                    size="sm"
                    remix="RiArrowRightLine"
                    className="text-main-6"
                  />
                  Subscribe
                </Button>
              </Group>
              <Group className="justify-end gap-xl">
                <Title h={5} className="uppercase">
                  Follow us on
                </Title>
                <Group>
                  <Button
                    className="!rounded-full !p-md !text-main-12 !bg-main-1"
                    external
                    to={EXT.x}
                  >
                    <Icon
                      className="!h-xl*1.5 w-lg*2 lg:w-xl*1.5"
                      remix="RiTwitterXFill"
                    />
                  </Button>
                  <Button
                    className="!rounded-full !p-md !text-main-12 !bg-main-1"
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
          </OverrideTheme>
        </Container>
      </section>
    </>
  );
}
