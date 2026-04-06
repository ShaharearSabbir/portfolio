import {
  VscAccount,
  VscCode,
  VscLayers,
  VscRemoteExplorer,
} from "react-icons/vsc";

const Navbar = () => {
  return (
    <header className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-4">
      <nav className="p-4 bg-white/20 rounded-full">
        <ul className="space-y-4">
          <li>
            <a href="#">
              <VscCode size={28} />
            </a>
          </li>
          <li>
            <a href="#">
              <VscLayers size={28} />
            </a><samp></samp>
          </li>
          <li>
            <a href="#">
              <VscAccount size={28} />
            </a>
          </li>
          <li>
            <a href="#">
              <VscRemoteExplorer size={28} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
