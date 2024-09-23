import Group from "dappkit/components/extenders/Group";
import Box from "dappkit/components/primitives/Box";
import Input from "dappkit/components/primitives/Input";
import WalletButton from "dappkit/components/dapp/WalletButton";
import { Button } from "dappkit/index";
import List from "dappkit/components/primitives/List";
import Title from "dappkit/components/primitives/Title";

export default function Header() {
    return <header className="flex flex-nowrap justify-center items-center w-full">
       <Group><Title h={3}>Merkl</Title></Group> 
       <Group className="grow flex justify-center">
        <Input look="base" placeholder="Search Merkl"/>
        </Group> 
       <Group>
        <WalletButton look="hype">Connect</WalletButton>
        </Group> 
    </header>
}