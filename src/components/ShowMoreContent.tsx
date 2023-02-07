import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MAX_LINE_SHOT } from "../configs";
import ReactMarkdown from "react-markdown";
import Box from "@mui/material/Box/Box";

type Props = {
  content: string;
};

export const ShowMoreContent = ({ content }: Props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [canShowMore, setCanShowMore] = useState(false);

  const handleHide = () => {
    setShowAll(false);
  };

  useEffect(() => {
    if (
      divRef.current &&
      divRef.current.scrollHeight > divRef.current.clientHeight
    ) {
      setCanShowMore(true);
    }
  }, [divRef]);

  return (
    <>
      <Box
        ref={divRef}
        style={{ maxHeight: showAll ? "none" : "6em", overflow: "hidden" }}
      >
        <ReactMarkdown children={content} />
      </Box>

      {showAll ? (
        <Button onClick={handleHide}>Hide</Button>
      ) : (
        canShowMore && (
          <Button onClick={() => setShowAll(true)}>Show More </Button>
        )
      )}
    </>
  );
};
