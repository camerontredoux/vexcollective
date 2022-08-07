import React from "react";

const Logo: React.FC<{ width: number }> = ({ width }) => {
  return (
    <picture>
      <source srcSet="/logo.png" type="image/webp" />
      <img src="/logo.png" alt="Vex Collective Logo" width={width} />
    </picture>
  );
};

export default Logo;
