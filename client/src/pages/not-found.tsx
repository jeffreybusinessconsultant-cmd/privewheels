import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/Footer";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border shadow-lg">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-bold font-display text-white">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              The road ends here. We couldn't find the page you were looking for.
            </p>

            <div className="mt-8 flex justify-end">
               <Link href="/">
                 <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                   Return Home
                 </Button>
               </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
}
