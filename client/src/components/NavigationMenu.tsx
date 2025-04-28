import React from "react";
import { Link, useLocation } from "wouter";

interface NavigationItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

interface NavigationMenuProps {
  items: NavigationItem[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
  const [location] = useLocation();

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-1">
          <Link 
            href={item.path}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md 
              ${location === item.path 
                ? 'text-primary bg-primary/10 hover:bg-primary/20' 
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-primary'
              } transition-colors`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationMenu;
