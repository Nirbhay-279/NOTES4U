"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import Text from "@tiptap/extension-text";
import axios from "axios";
import { NoteType } from "@/lib/db/schema";
import { useCompletion } from "ai/react";
import { useState } from "react";

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const [auto_complete_loading, setauto_complete_loading] = useState(false);
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });
  const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          // take the last 30 words
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          setauto_complete_loading(true);
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });
  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    let { text } = JSON.parse(completion);
    if (!text) text = " failed";
    setauto_complete_loading(false);
    console.log("====================================");
    console.log(lastCompletion);
    console.log("====================================");
    const diff = " " + text;
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debouncedEditorState = useDebounce(editorState, 500);
  React.useEffect(() => {
    // save to db
    if (debouncedEditorState === "") return;
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log("success update!", data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);

  return (
    <div className=" text-accent">
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"} className=" bg-secondary">
          {saveNote.isLoading ? "Saving..." : "Saved"}
        </Button>
        {auto_complete_loading ? (
          <span className="loading loading-infinity loading-lg"></span>
        ) : (
          <></>
        )}
      </div>

      <div
        className="prose 
         prose-h1:text-accent prose-h2:text-accent prose-h3:text-accent prose-h4:text-accent prose-h5:text-accent prose-h6:text-accent text-accent 
      w-full mt-4  
      
      "
      >
        <EditorContent className="" editor={editor} />
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip: Press{" "}
        <kbd
          className="px-2 py-1.5 text-xs font-semibold   bg-primary border  border-secondary rounded-lg "
          onClick={() => {
            const prompt = editor!.getText().split(" ").slice(-30).join(" ");
            setauto_complete_loading(true);
            complete(prompt);
          }}
        >
          Shift + A
        </kbd>{" "}
        for AI autocomplete
      </span>
    </div>
  );
};

export default TipTapEditor;
