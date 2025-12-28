
import { SeatSelector } from "./components/SeatSelector";
type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function MovieDetailPage({ params }: Props) {
    const { id } = await params;

    return (
        <main className="h-auto px-20 mt-20 ">
            <div>
                <h1 className="text-3xl font-bold">
                    Movie ID: {id}
                </h1>

                <p className="mt-4 text-gray-600">
                    Movie detail content here
                </p>
            </div>
            <div>
                <SeatSelector/>
            </div>

        </main>
    );
}
