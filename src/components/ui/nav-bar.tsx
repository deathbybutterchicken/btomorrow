import Link from "next/link";
import { Button } from "./button";

const brands = [
  "liquiddeath",
  "poppi",
  "olipop",
  "delacalle",
  "lemonperfect",
  "hint",
  "athletic",
  "cellucor",
  "biolyte",
];

interface NavBarProps {
  textColor?: string;
}

export function NavBar({ textColor = "text-white" }: NavBarProps) {
  return (
    <nav className={`fixed top-0 w-full z-50 ${textColor}`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex space-x-2">
          {brands.map((brand) => (
            <Link key={brand} href={`/${brand}`}>
              <Button
                variant="ghost"
                className={`${textColor} hover:${textColor}/80`}
              >
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex space-x-2">
          <Link href="/summary">
            <Button variant="ghost" className={`${textColor} hover:${textColor}/80`}>
              Summary
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className={`${textColor} hover:${textColor}/80`}>
              About
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
