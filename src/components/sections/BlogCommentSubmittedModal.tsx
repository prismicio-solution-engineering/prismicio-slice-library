import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";

type BlogCommentSubmittedProps = {
  isOpen: boolean;
  onClose: () => void;
  nickName?: string;
};

const BlogCommentSubmitted = ({
  isOpen,
  onClose,
  nickName
}: BlogCommentSubmittedProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading as="h2" size="xl" className="pr-8">
        {`Thank's for participating, ${nickName}!`}
      </Heading>
      <Copy className="mt-6" muted theme="light">
        Your comment has now been submitted, and is pending approval. As soon as
        we approved it, it will be avaliable on this post.
      </Copy>
      <Button
        as="button"
        type="button"
        className="mt-8 float-right"
        onClick={onClose}
      >
        Ok
      </Button>
    </Modal>
  );
};

export default BlogCommentSubmitted;
