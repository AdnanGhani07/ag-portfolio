import Link from "next/link"
import { Button } from "./ui/button"

//components
import Nav from "./Nav";
import MobileNav from "./MobileNav";


const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
        <div className="container mx-auto flex justify-between items-center">
            {/*Logo*/}
            <Link href="/">
                <h1 className="text-4xl font-semibold">
                    Adnan<span className="text-cyan-400">.</span>
                </h1>
            </Link>


            {/*Desktop Nav & hire me button*/}
            <div className="hidden xl:flex items-center gap-8">
                <Nav/>
            </div>

            {/* mobile nav */}
            <div className="xl:hidden">
                <MobileNav/>
            </div>

        </div>
    </header>
  )
}

export default Header
