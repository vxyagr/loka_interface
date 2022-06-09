import Link from "next/link";
import type { FunctionComponent } from "react";
import ReactRoundedImage from "react-rounded-image";
/**
 * ResourcesProps is a React Component properties that passed to React Component Resources
 */
type ResourcesProps = { tokenId: number; yield: number };

/**
 * Resources is just yet another react component
 *style={{ background: "linear-gradient(206.19deg, #7BFEE8 0.2%, rgba(214, 97, 255, 0.69) 53.15%, #03A44D 88.21%)" }}
 * @link https://fettblog.eu/typescript-react/components/#functional-components
 */
const Resources: FunctionComponent<ResourcesProps> = (props) => {
    return (
        <div className="z-10 my-2 h-auto overflow-hidden rounded-2xl ">
            <div className="relative aspect-square w-[200px] " style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <ReactRoundedImage image={"dragonkin_final.jfif"} roundedColor="#C1F6ED" imageWidth="180" imageHeight="180" roundedSize="5" borderRadius="50" />
            </div>

            <div className="p-2">
                <h1 className="text-white">Loka #{props.tokenId}</h1>
                <p className="font-light text-white">Dragon</p>
                <p className="font-light text-white">{props.yield / 10}x Yield Effectivity</p>
            </div>
        </div>
    );
};

export default Resources;
