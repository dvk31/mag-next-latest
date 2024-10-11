import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-r from-blue-400 to-purple-500">
      <h1 className="text-5xl font-bold mb-8">Welcome to Our App</h1>
      <p className="text-xl mb-8">Experience the future of authentication.</p>
      <div className="flex gap-4"> {/* Use flexbox for better spacing control */}
        <Link href="/login"> {/* Wrap Link around Button */}
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline">Register</Button>
        </Link>
      </div>
    </div>
  );
}