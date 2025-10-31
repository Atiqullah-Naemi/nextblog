import { Combine } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface CardProps {
  totalCategories: number;
  totalPosts: number;
  totalViews: number;
}

export default function DashboardCard({
  totalCategories,
  totalPosts,
  totalViews,
}: CardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-6">
      <Card className="shadow-lg min-h-36 flex items-center flex-col justify-center">
        <CardHeader className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <CardDescription className="text-lg font-medium">
              Total number of categories
            </CardDescription>
            <Combine />
          </div>
          <CardTitle className="text-2xl">{totalCategories} </CardTitle>
        </CardHeader>
      </Card>

      <Card className="shadow-lg min-h-36 flex items-center flex-col justify-center">
        <CardHeader className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <CardDescription className="text-lg font-medium">
              Total number of posts
            </CardDescription>
            <Combine />
          </div>
          <CardTitle className="text-2xl">{totalPosts} </CardTitle>
        </CardHeader>
      </Card>

      <Card className="shadow-lg min-h-36 flex items-center flex-col justify-center">
        <CardHeader className="flex flex-col w-full">
          <div className="w-full flex justify-between">
            <CardDescription className="text-lg font-medium">
              Total number of views
            </CardDescription>
            <Combine />
          </div>
          <CardTitle className="text-2xl">{totalViews} </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
