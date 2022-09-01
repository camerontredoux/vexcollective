import { useManifestStore } from "@/utils/stores";
import { Badge } from "@mantine/core";
import { DestinyItemComponent } from "bungie-api-ts/destiny2";

interface ItemViewProps {
  item: DestinyItemComponent;
}

const ItemView: React.FC<ItemViewProps> = ({ item }) => {
  const manifest = useManifestStore((state) => state.manifest);

  return (
    <div className="flex gap-2">
      <img
        width={50}
        className="rounded-md"
        alt={
          manifest?.DestinyInventoryItemDefinition[item.itemHash]
            ?.displayProperties.name
        }
        src={`https://bungie.net${
          manifest?.DestinyInventoryItemDefinition[item.itemHash]
            ?.displayProperties.icon
        }`}
      />
      {
        manifest?.DestinyInventoryItemDefinition[item.itemHash]
          ?.displayProperties.name
      }
      <Badge>
        {manifest?.DestinyInventoryItemDefinition[item.itemHash]?.flavorText}
      </Badge>
    </div>
  );
};

export default ItemView;
