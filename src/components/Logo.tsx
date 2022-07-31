import React from "react";

interface Props {
  width: number;
}

const Logo: React.FC<Props> = ({ width }) => {
  return (
    <picture>
      <source srcSet="/logo.png" type="image/webp" />
      <img src="/logo.png" alt="Vex Collective Logo" width={width} />
    </picture>
  );
};

export default Logo;
