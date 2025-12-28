import Image from "next/image";
import Img1 from "../../public/img/The Matrix Resurrections.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";


const movies = Array.from({ length: 8 }).map((_, index) => ({
  id: index+1,
  title: "The Matrix Resurrections",
  date: "12 Nov 2025",
  image: Img1,
}));

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white p-20">
      <div className="flex flex-col items-start w-full">
        <div className="mb-8 ml-12">
          <h1 className="text-xl font-bold text-[#333333]">
            Now Showing
          </h1>
          <p className="font-normal text-[#414A63]">
            Experience it now at your favorite cinema!
          </p>
        </div>

        <div className="grid grid-cols-4 gap-x-8 gap-y-12 self-center">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              className="block"
            >
              <Card
                className="
                  group
                  border-none
                  shadow-none
                  bg-transparent
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
              >
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      width={300}
                      height={450}
                      className="
                        w-full
                        h-auto
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col items-start p-0 mt-4 transition-colors duration-300">
                  <p className="text-[#414A63] text-sm group-hover:text-[#2c365a]">
                    {movie.date}
                  </p>
                  <p className="font-bold text-[#333333] text-lg leading-tight group-hover:text-black">
                    {movie.title}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}



        </div>
      </div>
    </main>
  );
}