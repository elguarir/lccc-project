import { Button } from "../ui/button";

import Editor from "./editor";
import CoverImageUpload from "./CoverImageUpload";
import { Subtitles } from "lucide-react";
const ArticleEditor = () => {
  return (
    <div className="grid w-full gap-y-8">
      <div className="flex items-center gap-3">
        <CoverImageUpload />
        <Button
          type="button"
          variant={"ghost"}
          size={"xs"}
          className="px-4 rounded-full text"
        >
          <Subtitles className="w-4 h-4 mr-2" />
          Add Subtitle
        </Button>
      </div>
      <div className="grid w-full gap-2">
        <div className="relative w-full py-3">
          <Editor />
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;


