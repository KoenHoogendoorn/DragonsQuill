import "./NewNPCEditorToolbar.css";
import "../../../../shared/quillEditorOverall.css";

const NewNPCEditorToolbar = () => (
  <div id="toolbarNPC" className="toolbarNPC toolbar">
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-blockquote"></button>
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-list ql-ul-list" value="bullet"></button>
    <button className="ql-list ql-ol-list" value="ordered"></button>
  </div>
);

export default NewNPCEditorToolbar;
