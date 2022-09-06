import React from "react";
import { JSONTree, StylingValue } from "react-json-tree";

interface DataTreeViewProps {
  data: any;
  expand: boolean;
}

const theme = {
  scheme: "OneDark",
  author: "Lalit Magant (http://github.com/tilal6991)",
  base00: "#00000000",
  base01: "#353b45",
  base02: "#3e4451",
  base03: "#545862",
  base04: "#565c64",
  base05: "#abb2bf",
  base06: "#b6bdca",
  base07: "#c8ccd4",
  base08: "#e06c75",
  base09: "#d19a66",
  base0A: "#e5c07b",
  base0B: "#98c379",
  base0C: "#56b6c2",
  base0D: "#61afef",
  base0E: "#c678dd",
  base0F: "#be5046",
};

const getLabelStyle: StylingValue = ({ style }) => ({
  style: {
    ...style,
  },
});

const DataTreeView: React.FC<DataTreeViewProps> = ({ data, expand }) => {
  return (
    <div
      style={{
        fontFamily: "'Ubuntu Mono', 'Destiny Keys'",
      }}
      className="rounded-sm overflow-y-auto flex-1"
    >
      <JSONTree
        data={data}
        theme={{
          extend: theme,
          nestedNodeLabel: getLabelStyle,
        }}
        hideRoot={true}
        shouldExpandNode={(_, __, level) =>
          !expand ? false : level === 1 ? true : false
        }
        invertTheme={false}
        valueRenderer={(raw) => {
          if (typeof raw === "string") {
            const text = raw.replaceAll('"', "");

            if (text.startsWith("/common/")) {
              return (
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="underline hover:text-[#565c64]"
                  href={`https://www.bungie.net/${text}`}
                >
                  {raw}
                </a>
              );
            }

            return raw;
          }

          return raw;
        }}
      />
    </div>
  );
};

export default DataTreeView;
