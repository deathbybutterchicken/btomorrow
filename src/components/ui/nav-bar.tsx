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

export function NavBar({ textColor = "#4A2B0F" }: NavBarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex space-x-2">
          {brands.map((brand) => (
            <Link key={brand} href={`/${brand}`}>
              <Button
                variant="ghost"
                className="hover:opacity-80 transition-opacity rounded-lg hover:bg-white/50 backdrop-blur-sm"
                style={{ 
                  color: textColor,
                  fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
                  padding: "0.5rem 1rem",
                }}
              >
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex space-x-2">
          <Link href="/summary">
            <Button 
              variant="ghost"
              className="hover:opacity-80 transition-opacity rounded-lg hover:bg-white/50 backdrop-blur-sm"
              style={{ 
                color: textColor,
                fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
                padding: "0.5rem 1rem",
              }}
            >
              Summary
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              variant="ghost"
              className="hover:opacity-80 transition-opacity rounded-lg hover:bg-white/50 backdrop-blur-sm"
              style={{ 
                color: textColor,
                fontFamily: "'Proxima Nova', 'Helvetica', 'Arial', sans-serif",
                padding: "0.5rem 1rem",
              }}
            >
              About
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
