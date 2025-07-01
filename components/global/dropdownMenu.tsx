import { useRef, useState, useEffect } from "react";
import { BiExpandVertical } from "react-icons/bi";

export type OptionType = {
  value: string;
  label: string;
  symbol?: string;
};

interface DropdownMenuProps {
  options: Array<OptionType>;
  selected: OptionType | undefined | null;
  onChange: (option: OptionType) => void;
  maxoptions?: number;
  icon?: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  selected,
  onChange,
  maxoptions,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: OptionType) => {
    onChange(option);
    setIsOpen(false);
  };

  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownMenuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn-outline !w-full flex items-center gap-4 !justify-between"
      >
        <div className="flex items-center gap-4">
          {icon}
          <span>{selected ? selected.label : "Select an option"}</span>
        </div>
        <BiExpandVertical />
      </button>

      <div
        className={`dropdown-menu profile !w-full gap-0 shadow-md z-50 ${
          maxoptions === 3 && "!max-h-[115px] overflow-y-scroll"
        }`}
        style={{
          opacity: isOpen ? "1" : "0",
          pointerEvents: isOpen ? "all" : "none",
          top: isOpen ? "calc(100% + 5px)" : "calc(100% - 10px)",
        }}
      >
        <ul>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="sidebar__nav-link cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;
