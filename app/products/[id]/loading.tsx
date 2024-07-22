import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-10 items-start order-2 md:order-1">
        <div className="flex items-start">
          <div className="grid gap-4">
            <Skeleton className="h-9 w-2/3" /> {/* Product name */}
            <Skeleton className="h-20 w-full" /> {/* Product description */}
          </div>
        </div>

        <div className="grid gap-4 md:gap-8">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Skeleton className="h-[70px]" /> {/* Price input */}
            <Skeleton className="h-[70px]" /> {/* Inventory input */}
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-20" /> {/* Colors label */}
            <Skeleton className="h-10 w-full" /> {/* Colors input */}
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-20" /> {/* Sizes label */}
            <Skeleton className="h-10 w-full" /> {/* Sizes input */}
          </div>
          <Skeleton className="h-[70px]" /> {/* Name input */}
          <Skeleton className="h-[140px]" /> {/* Description textarea */}
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Skeleton className="h-10 w-24" /> {/* Submit button */}
            <Skeleton className="h-10 w-36" /> {/* Delete button */}
          </div>
        </div>
      </div>

      <ImageSectionSkeleton />
    </div>
  );
}

function ImageSectionSkeleton() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid items-start gap-3 md:grid-cols-5">
        <div className="flex items-start gap-3 md:flex-col">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-16 h-16 rounded-lg" />
          ))}
        </div>
        <div className="md:col-span-4">
          <Skeleton className="aspect-[2/3] w-full h-[600px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}
