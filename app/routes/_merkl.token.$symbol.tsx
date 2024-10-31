import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { api } from "src/api";
import Heading from "src/components/composite/Heading";
import { Container } from "dappkit";
import Tag, { type TagType } from "src/components/element/Tag";

export async function loader({ params: { symbol } }: LoaderFunctionArgs) {
  const { data: tokens, ...res } = await api.v4.token.get({
    query: { symbol },
  });

  if (!tokens?.length) throw new Error("Unknown token");

  return json({ tokens });
}

export default function Index() {
  const { tokens } = useLoaderData<typeof loader>();
  const token = tokens?.[0];

  const tags = useMemo(() => {
    console.log(tokens.filter((c) => c.chainId === 167000));

    return tokens.map(
      (t) => ({ type: "tokenChain", value: t } satisfies TagType<"tokenChain">)
    );
  }, [tokens]);

  return (
    <Container>
      <Heading
        icons={[token?.icon]}
        navigation={{ label: "Back to opportunities", link: "/" }}
        title={
          <>
            {token.name}{" "}
            <span className="font-mono text-main-8">({token.symbol})</span>
          </>
        }
        description={`Deposit or earn ${token.symbol} on Merkl.`}
        tabs={[
          {
            label: "Opportunities",
            link: `/token/${token.symbol?.toLowerCase()}`,
          },
        ]}
        tags={tags.map((tag) => (
          <Tag
            key={`${tag.type}_${tag.value?.address ?? tag.value}`}
            {...tag}
            size="sm"
            look="bold"
          />
        ))}
      >
        <Outlet />
      </Heading>
    </Container>
  );
}
