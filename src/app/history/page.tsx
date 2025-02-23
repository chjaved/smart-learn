import HistoryComponent from "@/components/HistoryComponent";
import Footer from "@/components/Footer"; // Import Footer Component
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";

type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-[400px]">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">History</CardTitle>
                <Link className={buttonVariants()} href="/dashboard">
                  <LucideLayoutDashboard className="mr-2" />
                  Back to Dashboard
                </Link>
              </div>
            </CardHeader>
            <CardContent className="max-h-[60vh] overflow-scroll">
              <HistoryComponent limit={100} userId={session.user.id} />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
