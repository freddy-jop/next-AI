export const LoaderEffect = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-4 px-4 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="size-10 animate-bounce rounded-full bg-fuchsia-400"></div>
      <div className="size-10 animate-bounce rounded-full bg-purple-500 [animation-delay:-.3s]"></div>
      <div className="size-10 animate-bounce rounded-full bg-indigo-600 [animation-delay:-.5s]"></div>
    </div>
  );
};
