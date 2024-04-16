import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = ({ refine }: { refine: any }) => {
  return (
    <input
      type="search"
      className="blog-search w-full bg-gray-F7 pl-12 pr-2 h-10 rounded-[10px] focus:outline-none focus:ring-4 focus:ring-tertiary-purple"
      placeholder="What are you looking for?"
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        refine(e.currentTarget.value)
      }
    />
  );
};

export default connectSearchBox(SearchBox);
