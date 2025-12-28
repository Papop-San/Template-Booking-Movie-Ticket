import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Fullstack Template
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          <p className="text-center text-zinc-600 dark:text-zinc-400">
            Starter template using Next.js, TypeScript and shadcn/ui
          </p>

          <div className="flex flex-col gap-3">
            <Button className="w-full">
              Get Started
            </Button>

            <Button variant="outline" className="w-full">
              Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
