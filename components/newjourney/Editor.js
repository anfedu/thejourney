import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ButtonSubmit from "./ButtomSubmit";

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
    minHeight: 190,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    color: "#777",
  },
  toolbar: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    // backgroundColor: "#eee",
  },
  popupImage: {
    position: "absolute",
    [theme.breakpoints.down("xs")]: {
      left: "-150%",
    },
  },
  image: {},
}));

const EditorContainer = ({ values, setValues, setAlert }) => {
  const classes = useStyles();
  const [files, setFiles] = React.useState(null);

  const [state, setState] = React.useState({
    editorState: EditorState.createEmpty(),
  });

  const uploadImageCallBack = (file) => {
    setFiles(file);
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
    setState({ editorState });
    let data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setValues({ ...values, editor: data });
  };

  const { editorState } = state;
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbar={{
          options: ["inline", "blockType", "image", "textAlign"],
          image: {
            uploadCallback: uploadImageCallBack,
            defaultSize: { width: "100%", height: 300 },
            previewImage: false,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: true, mandatory: false },
            popupClassName: classes.popupImage,
            className: classes.image,
          },
        }}
        onEditorStateChange={onEditorStateChangeCallback}
        wrapperClassName={classes.wrapper}
        editorClassName={classes.editor}
        toolbarClassName={classes.toolbar}
      />
      <ButtonSubmit
        values={values}
        files={files}
        setAlert={setAlert}
        setValues={setValues}
        setFiles={setFiles}
        setState={setState}
        EditorState={EditorState}
      />
    </div>
  );
};

export default EditorContainer;
