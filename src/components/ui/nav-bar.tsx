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

export function NavBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-black/0 backdrop-blur-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex space-x-2">
          {brands.map((brand) => (
            <Link key={brand} href={`/${brand}`}>
              <Button
                variant="ghost"
                className="text-white hover:text-white/80"
              >
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex space-x-2">
          <Link href="/summary">
            <Button variant="ghost" className="text-white hover:text-white/80">
              Summary
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="ghost" className="text-white hover:text-white/80">
              About
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
