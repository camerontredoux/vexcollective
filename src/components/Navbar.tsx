import Logo from "./Logo";

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col p-2 rounded-md w-64 text-gray-600">
      <div className="flex items-center mb-4">
        <Logo width={40} />
        <h1 className="ml-2 font-bold uppercase">Vex Collective</h1>
      </div>
      <ul className="flex flex-col gap-4">
        <li>Nested Layouts</li>
      </ul>
    </div>
  );
};

export default Navbar;
