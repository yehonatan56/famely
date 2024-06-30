// https://www.npmjs.com/package/@syncfusion/ej2-diagrams?activeTab=readme
// https://ej2.syncfusion.com/documentation/diagram/getting-started?utm_source=npm&utm_medium=listing&utm_campaign=javascript-diagram-npm
// https://stackblitz.com/run?file=index.ts
import {
  Diagram,
  DataBinding,
  HierarchicalTree,
  SnapConstraints,
  ImageElement,
  TextElement,
  StackPanel,
} from "@syncfusion/ej2-diagrams";
import { DataManager, Query } from "@syncfusion/ej2-data";
import { useEffect } from "react";

Diagram.Inject(DataBinding, HierarchicalTree);

// Bind custom data with node
function getNodeTemplate(node) {
  node.annotations[0].content = node.data.Name;
  node.style.fill = codes[node.data.Role];
}

const FamilyTree = ({ data }) => {
  let items = new DataManager(data, new Query().take(7));

  useEffect(() => {
    const element = document.getElementById("#element");

    let diagram = new Diagram({
      width: "100%",
      height: "620px",
      snapSettings: { constraints: SnapConstraints.None },
      //Use automatic layout to arrange elements on the page
      layout: {
        type: "OrganizationalChart",
        margin: { left: 10, top: 10 },
        horizontalSpacing: 50,
        verticalSpacing: 50,
        orientation: "TopToBottom",
        getLayoutInfo: (node, tree) => {
          if (!tree.hasSubTree) {
            tree.orientation = "Vertical";
            tree.type = "Alternate";
          }
        },
      },
      dataSourceSettings: {
        id: "Name",
        parentId: "ReportingPerson",
        dataManager: items,
      },
      getNodeDefaults: (obj, diagram) => {
        obj.height = 30;
        obj.width = 70;
        obj.shape = { type: "Basic", shape: "Rectangle" };
        obj.annotations = [
          {
            id: "label1",
            style: {
              fontSize: 11,
              bold: true,
              fontFamily: "Segoe UI",
              color: "white",
            },
          },
        ];
        return obj;
      },
      getConnectorDefaults: (connector, diagram) => {
        connector.targetDecorator.shape = "Arrow";
        connector.type = "Orthogonal";
        return connector;
      },
      setNodeTemplate: (node) => {
        let codes = {
          Director: "rgb(0, 139,139)",
          Manager: "rgb(30, 30,113)",
          Lead: "rgb(0, 100,0)",
        };
        let content = new StackPanel();
        content.id = node.id + "_outerstack";
        content.orientation = "Horizontal";
        content.style.strokeColor = "gray";
        content.style.fill = codes[node.data.Role];
        content.padding = { left: 5, right: 5, top: 5, bottom: 5 };
        let innerContent = new ImageElement();
        innerContent.style.strokeColor = "blue";
        innerContent.id = node.id + "_innerstack";
        innerContent.style.fill = "skyblue";
        innerContent.width = 50;
        innerContent.height = 50;
        let text = new TextElement();
        text.id = node.id + "_text";
        text.content = node.data.Name;
        text.margin = { left: 15, right: 5, top: 5, bottom: 5 };
        text.style.color = "black";
        content.children = [innerContent, text];
        return content;
      },
    });

    diagram.appendTo("#element");

    return () => {
      if (element) {
        element.innerHTML = "";
      }
    };
  }, []);

  return <div id="element" style={{ width: "100%", height: "100%" }}></div>;
};

FamilyTree.defaultProps = {
  data: [
    { Name: "Elizabeth", Role: "Director" },
    { Name: "Christina", ReportingPerson: "Elizabeth", Role: "Manager" },
    { Name: "Yoshi", ReportingPerson: "Christina", Role: "Lead" },
    { Name: "Philip", ReportingPerson: "Christina", Role: "Lead" },
    { Name: "Yang", ReportingPerson: "Elizabeth", Role: "Manager" },
    { Name: "Roland", ReportingPerson: "Yang", Role: "Lead" },
    { Name: "Yvonne", ReportingPerson: "Yang", Role: "Lead" },
  ],
};

export default FamilyTree;
