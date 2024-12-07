import React from "react";
import { Menu, Button } from "@mantine/core";
import { FaCirclePlus } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
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
      </Menu.Dropdown>
    </Menu>
  );
}
