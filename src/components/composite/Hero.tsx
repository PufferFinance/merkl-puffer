import { useLocation } from "@remix-run/react";
import {
  Container,
  Divider,
  Group,
  Icon,
  type IconProps,
  Icons,
  OverrideTheme,
  Tabs,
  Text,
  Title,
  Value,
  useTheme,
} from "dappkit";
import { Button } from "dappkit";
import config from "merkl.config";
import type { PropsWithChildren, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export type HeroProps = PropsWithChildren<{
  icons?: IconProps[];
  title: ReactNode;
  breadcrumbs?: { name?: string; link: string; component?: ReactNode }[];
  navigation?: { label: ReactNode; link: string };
  description: ReactNode;
  tags?: ReactNode[];
  sideDatas?: HeroInformations[];
  tabs?: { label: ReactNode; link: string; key: string }[];
}>;

export type HeroInformations = {
  data: React.ReactNode;
  label: string;
  key: string;
};

export default function Hero({
  navigation,
  breadcrumbs,
  icons,
  title,
  description,
  tags,
  sideDatas,
  tabs,
  children,
}: HeroProps) {
  const location = useLocation();
  const { mode } = useTheme();

  return (
    <>
      <OverrideTheme mode={!!config.hero.invertColors ? (mode === "dark" ? "light" : "dark") : mode}>
        <Group
          className={`${
            !!config.hero.bannerOnAllPages
              ? "bg-cover"
              : location?.pathname === "/" || location?.pathname === "/opportunities"
                ? "bg-cover"
                : "bg-main-6"
          } flex-row justify-between bg-no-repeat xl:aspect-auto xl:min-h-[350px] aspect-[1440/300]`}
          style={{
            backgroundImage: !!config.hero.bannerOnAllPages
              ? `url('${config.images.hero}')`
              : location?.pathname === "/" || location?.pathname === "/opportunities"
                ? `url('${config.images.hero}')`
                : "none",
          }}>
          <Container>
            <Group className="flex-col h-full py-xl gap-xl lg:gap-xs">
              <Group className="items-center" size="sm">
                <Button to={navigation?.link ?? "/"} look="soft" bold size="xs">
                  Home
                </Button>
                {breadcrumbs?.map(breadcrumb => {
                  if (breadcrumb.component) return <>{breadcrumb.component}</>;
                  return (
                    <Button key={breadcrumb.link} to={breadcrumb.link} look="soft" size="xs">
                      <Icon remix="RiArrowRightSLine" />
                      {breadcrumb.name}
                    </Button>
                  );
                })}
              </Group>
              <Group className="grow items-center justify-between gap-xl lg:gap-xl*4">
                <Group className="flex-col flex-1 gap-lg">
                  <Group className="gap-0 md:gap-lg flex-nowrap w-full items-center">
                    {!!icons && (
                      <Icons size="lg">
                        {icons?.length > 1
                          ? icons?.map(icon => (
                              <Icon
                                className="hidden md:block text-main-12 !w-lg*4 !h-lg*4"
                                key={`${Object.values(icon)}`}
                                {...icon}
                              />
                            ))
                          : icons?.map(icon => (
                              <Icon
                                className="hidden md:block text-main-12 !w-xl*4 !h-xl*4"
                                key={`${Object.values(icon)}`}
                                {...icon}
                              />
                            ))}
                      </Icons>
                    )}
                    <Title h={1} size={2} className="flex-1">
                      {title}
                    </Title>
                  </Group>

                  {!!description && (
                    <>
                      <Divider look="base" />
                      <Text size="lg" bold>
                        {description}
                      </Text>
                    </>
                  )}
                  {!!tags && <Group className="mb-lg">{tags}</Group>}
                </Group>
                {!!sideDatas && (
                  <Group className="w-full lg:w-auto lg:flex-col mr-xl*2" size="lg">
                    {sideDatas.map(data => (
                      <Group key={data.key} className="flex-col" size="xs">
                        <Text size={4} className="!text-main-12">
                          {data.data}
                        </Text>

                        <Text size="md" bold>
                          {data.label}
                        </Text>
                      </Group>
                    ))}
                  </Group>
                )}
              </Group>
            </Group>
          </Container>
        </Group>
      </OverrideTheme>

      {!!tabs?.length && <Tabs tabs={tabs} look="base" size="lg" />}

      <div>{children}</div>
    </>
  );
}

export function defaultHeroSideDatas(count: number, maxApr: number, dailyRewards: number) {
  return [
    !!count && {
      data: (
        <Value format="0" size={4} className="!text-main-12">
          {count}
        </Value>
      ),
      label: "Live opportunities",
      key: uuidv4(),
    },
    !!dailyRewards && {
      data: (
        <Value format={config.decimalFormat.dollar} size={4} className="!text-main-12">
          {dailyRewards}
        </Value>
      ),
      label: "Daily rewards",
      key: uuidv4(),
    },
    !!maxApr && {
      data: (
        <Value format="0a%" size={4} className="!text-main-12">
          {maxApr / 100}
        </Value>
      ),
      label: "Max APR",
      key: uuidv4(),
    },
  ].filter(data => !!data);
}
