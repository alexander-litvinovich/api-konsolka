import React, { Component } from "react";
import CodeFlask, { options } from "codeflask";

/*
ACCEPT:
interface Props {
  code: string;
  id?: string;
  editorRef?: (codeFlask: CodeFlask) => void;
  onChange?: (code: string) => void;
}
*/

class CodeFlaskConnector extends Component {
  constructor(props) {
    super(props);
    // this.codeFlask = new CodeFlask();
  }

  componentDidMount() {
    const { code, editorRef, id, onChange, ...options } = this.props;
    this.codeFlask = new CodeFlask(`#${id}`, options);

    this.codeFlask.updateCode(code);

    if (onChange) {
      this.codeFlask.onUpdate(onChange);
    }

    if (editorRef) {
      editorRef(this.codeFlask);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!this.codeFlask) {
      return;
    }

    if (newProps.code !== this.codeFlask.getCode()) {
      this.codeFlask.updateCode(newProps.code);
    }
  }

  render() {
    const { id, className } = this.props;
    return <div id={id} className={className} />;
  }
}

CodeFlaskConnector.defaultProps = {
  id: "codeflask-root",
};

export default CodeFlaskConnector;
