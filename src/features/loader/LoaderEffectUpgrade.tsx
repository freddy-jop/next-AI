export const LoaderEffectUpgrade = () => {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 px-4 py-2">
      <div className="size-5 animate-bounce rounded-full bg-fuchsia-400"></div>
      <div className="size-5 animate-bounce rounded-full bg-purple-500 [animation-delay:-.3s]"></div>
      <div className="size-5 animate-bounce rounded-full bg-indigo-600 [animation-delay:-.5s]"></div>
    </div>
  );
};
