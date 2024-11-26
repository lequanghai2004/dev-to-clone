export default () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="h-9 w-9">
        <div className="h-full w-full animate-spin rounded-[50%] border-4 border-b-purple-700 border-t-purple-500"></div>
      </div>
      <span className="ml-4 text-3xl text-gray-600">Loading ...</span>
    </div>
  );
};

// loading.tsx only replace page.tsx while loading
// the layout.tsx and other wrapper components remains interative !
