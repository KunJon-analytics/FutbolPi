import Spinner from "@/components/animata/progress/spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-full w-full flex justify-center">
      <Spinner
        childSize="h-6 w-6"
        className="bg-gradient-to-bl from-background to-blue-400"
        outerSize="h-8 w-8"
      />
    </div>
  );
}
