import CommentIcon from '@/assets/svg/comment.svg';

interface CommentCountProps {
  count: number | null | undefined;
}

export const CommentCount = ({ count }: CommentCountProps) => {
  if (!count) return null;

  return (
    <div className="flex items-center">
      <CommentIcon className="inline-block w-6 h-6 mr-1" />
      {count}
    </div>
  );
};
