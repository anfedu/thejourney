import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromHTML } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

const Editor = dynamic(
  async () => {
    return import("react-draft-wysiwyg").then((mod) => mod.Editor);
  },
  { loading: () => null, ssr: false }
);

const useStyles = makeStyles((theme) => ({
  wrapper: {
    // backgroundColor: "pink",
  },
  editor: {
    padding: "0 1%",
    backgroundColor: "white",
    minHeight: 215,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  toolbar: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // backgroundColor: "#eee",
  },
  popupImage: {
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      left: "-500%",
    },
    [theme.breakpoints.down("xs")]: {
      left: "-250%",
    },
  },
  image: {},
}));

const EditorContainer = ({ values, setValues }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [editorState, setEditorState] = React.useState("");
  const editor = React.useRef(null);
  let isImageAdded = false;

  const uploadImageCallBack = (file) => {
    setValues({ ...values, image: file });
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };
    return new Promise((resolve) => {
      resolve({
        data: {
          link: imageObject.localSrc,
        },
      });
    });
  };

  const onEditorStateChangeCallback = (editorState) => {
    if (isImageAdded) {
      // setSelection();
      isImageAdded = false;
    }
    setEditorState(editorState);
  };
  return (
    <div>
      <Editor
        editorState={editorState}
        ref={editor}
        toolbar={{
          options: ["inline", "textAlign", "image"],
          image: {
            uploadCallback: uploadImageCallBack,
            previewImage: false,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            defaultSize: {
              height: 300,
              width: 450,
            },
            alt: { present: false, mandatory: false },
            popupClassName: classes.popupImage,
            className: classes.image,
          },
        }}
        onEditorStateChange={onEditorStateChangeCallback}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        toolbarClassName={classes.toolbar}
      />
    </div>
  );
};

export default function NewJourney({ values, setValues }) {
  return <EditorContainer values={values} setValues={setValues} />;
}
