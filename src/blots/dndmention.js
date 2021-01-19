import { Quill } from "react-quill";

const Embed = Quill.import("blots/embed");

class MentionBlot extends Embed {
  static create(dataAndThis) {
    const node = super.create();
    const data = dataAndThis[0];
    const This = dataAndThis[1];
    const denotationChar = document.createElement("span");
    denotationChar.className = "ql-mention-denotation-char";
    denotationChar.innerHTML = data.denotationChar;
    // node.appendChild(denotationChar);
    node.innerHTML += data.value;
    console.log(This);
    //node.addEventListener("click", () => this.props.toggleCardHandler(data.id)); // https://stackoverflow.com/questions/45421941/can-quill-blockembeds-use-arbitrary-tags  -  https://stackoverflow.com/questions/57730855/pass-props-to-react-quill-handler
    node.addEventListener("click", () => MentionBlot.onClick(data.id, This));
    return MentionBlot.setDataValues(node, data);
  }

  static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach((key) => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  static value(domNode) {
    return domNode.dataset;
  }
}

MentionBlot.blotName = "dndmention";
MentionBlot.tagName = "span";
MentionBlot.className = "dndmention";
MentionBlot.onClick = (id, This) => {
  switch (id.substring(0, 2)) {
    case "np":
      This.props.activeTabHandler("NPCs");
      break;
    case "mo":
      This.props.activeTabHandler("Monsters");
      break;
    default:
      break;
  }
  This.props.toggleCardHandler(id);
};

Quill.register(MentionBlot);
