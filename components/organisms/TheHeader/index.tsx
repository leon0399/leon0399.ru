import Link from "next/link";
import Tag from "../../atoms/Tag";

const TheHeader: React.FC = () => (
  <header className="sticky top-0 z-30 filter saturate-150 backdrop-filter backdrop-blur-lg bg-white bg-opacity-80">
    <div className="container max-w-2xl flex flex-row mx-auto my-8 py-8">
      <Link href="/">
        <a className="text-2xl">
          <div className="inline-flex items-center">
            Leonid Meleshin
            <Tag className="font-medium font-mono bg-gray-200 ml-3 mt-1">beta</Tag>
          </div>
        </a>
      </Link>
    </div>
  </header>
)

export default TheHeader