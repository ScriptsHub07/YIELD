import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function RecipeSkeleton() {
  return (
    <Card className="mt-8 w-full max-w-2xl shadow-xl">
      <CardHeader className="bg-muted/50 rounded-t-lg">
        <Skeleton className="h-8 w-3/4 mx-auto" />
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Skeleton className="h-6 w-1/3 mb-3" /> 
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
        </div>
        <Separator />
        <div>
          <Skeleton className="h-6 w-1/3 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-11/12 mb-2" />
        </div>
        <Separator />
        <div>
          <Skeleton className="h-6 w-1/3 mb-3" />
          <Skeleton className="h-4 w-1/2 mb-2" />
        </div>
      </CardContent>
    </Card>
  );
}
