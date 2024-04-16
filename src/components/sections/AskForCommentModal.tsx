"use client";

import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";

type BlogCommentSubmittedProps = {
  isOpen: boolean;
  onClose: (action?: boolean) => void;
};

const BlogCommentSubmitted = ({
  isOpen,
  onClose
}: BlogCommentSubmittedProps) => {
  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <Heading as="h2" size="xl" className="pr-8">
        Thanks for the upvote! Glad you liked this article!
      </Heading>
      <Copy className="mt-6" muted theme="light">
        Do you have any suggestions for future topics? Please share your
        thoughts below.
      </Copy>
      <Button
        as="button"
        type="button"
        className="mt-8 float-right"
        onClick={() => onClose(true)}
      >
        Share thoughts
      </Button>
    </Modal>
  );
};

export default BlogCommentSubmitted;
