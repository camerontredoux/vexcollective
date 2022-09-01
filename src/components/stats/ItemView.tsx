import { ManifestDefinitions } from "@/utils/indexeddb";
import { Badge } from "@mantine/core";
import { DestinyItemComponent } from "bungie-api-ts/destiny2";

interface ItemViewProps {
  item: DestinyItemComponent;
  manifest: ManifestDefinitions | null;
}

const ItemView: React.FC<ItemViewProps> = ({ item, manifest }) => {
  return (
    <div className="flex items-start gap-2">
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
      <div className="flex gap-2 items-center">
        <div>
          {
            manifest?.DestinyInventoryItemDefinition[item.itemHash]
              ?.displayProperties.name
          }
        </div>
        <Badge size="xs">
          {
            manifest?.DestinyInventoryItemDefinition[item.itemHash]
              ?.itemTypeDisplayName
          }
        </Badge>
      </div>
    </div>
  );
};

export default ItemView;
