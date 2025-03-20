// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import type { Selection } from "@heroui/react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  let defaultTheme: string;

  if (theme === "light") {
    defaultTheme = "light";
  } else {
    defaultTheme = "dark";
  }

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([defaultTheme])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="capitalize" variant="bordered">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="dark" onPress={() => setTheme("dark")}>
          Dark
        </DropdownItem>
        <DropdownItem key="light" onPress={() => setTheme("light")}>
          Light
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeSwitcher;
