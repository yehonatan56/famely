import React from "react";
import { Menu, Button } from "@mantine/core";
import { FaCirclePlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { dispatch } from "../../../store/store.js";
import { setEditAction } from "../../../store/slices/edit.slice.js";
export default function MenuComp({ open }) {
  return (
    <Menu shadow="md" width={300}>
      <Menu.Target>
        <Button style={{ position: "absolute", right: 0, bottom: 0 }}>
          <GiHamburgerMenu />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaCirclePlus
              style={{ fontSize: "20px", marginRight: "10px" }}
              onClick={() => open()}
            />
            <Menu.Label style={{ position: "relative" }}>
              Upload Image
            </Menu.Label>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div style={{ display: "flex", alignItems: "center" }}>
            <CiEdit
              style={{ fontSize: "20px", marginRight: "10px" }}
              onClick={() => dispatch(setEditAction(true))}
            />
            <Menu.Label style={{ position: "relative" }}>Edit Image</Menu.Label>
          </div>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
