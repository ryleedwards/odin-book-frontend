type FeedProps = {
  className?: string;
  children?: React.ReactNode;
};

const loader = () => {
  return null;
};

const Feed = ({ className }: FeedProps) => {
  return (
    <div className={`${className} bg-slate-500 w-full`}>
      <h1>Feed Display</h1>
    </div>
  );
};

Feed.loader = loader;

export default Feed;
