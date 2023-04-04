import { Menu, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdLeaderboard, MdPermContactCalendar } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const location = useLocation();

  return (
    <div className={styles.menuNav}>
      <div className={styles.hamburguer}>
        <Menu shadow="md" width={200} onClose={toggle} radius="md">
          <Menu.Target>
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label={label}
              size="md"
              color="#fdd67a"
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Link to="/">
              <Menu.Item icon={<FaHome />} style={{ fontSize: "1.2em" }}>
                Home
              </Menu.Item>
            </Link>
            <Link to="/leaderboard">
              <Menu.Item icon={<MdLeaderboard />} style={{ fontSize: "1.2em" }}>
                Leaderboard
              </Menu.Item>
            </Link>
            <Link to="/about">
              <Menu.Item
                icon={<FaQuestionCircle />}
                style={{ fontSize: "1.2em" }}
              >
                About
              </Menu.Item>
            </Link>
            <Link to="/contact">
              <Menu.Item
                icon={<MdPermContactCalendar />}
                style={{ fontSize: "1.2em" }}
              >
                Contact
              </Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      </div>
      <nav className={styles.nav}>
        <Link
          to="/"
          style={
            location.pathname === "/"
              ? {
                  borderBottom: "solid 2px #fdd67a",
                  textDecoration: "none",
                  height: "100%",
                }
              : {
                  textDecoration: "none",
                  height: "100%",
                }
          }
        >
          <li>Home</li>
        </Link>
        <Link
          to="/leaderboard"
          style={
            location.pathname === "/leaderboard"
              ? {
                  borderBottom: "solid 2px #fdd67a",
                  textDecoration: "none",
                  height: "100%",
                }
              : {
                  textDecoration: "none",
                  height: "100%",
                }
          }
        >
          <li>Leaderboard</li>
        </Link>
        <Link
          to="/about"
          style={
            location.pathname === "/about"
              ? {
                  borderBottom: "solid 2px #fdd67a",
                  textDecoration: "none",
                  height: "100%",
                }
              : {
                  textDecoration: "none",
                  height: "100%",
                }
          }
        >
          <li>About</li>
        </Link>
        <Link
          to="/contact"
          style={
            location.pathname === "/contact"
              ? {
                  borderBottom: "solid 2px #fdd67a",
                  textDecoration: "none",
                  height: "100%",
                }
              : {
                  textDecoration: "none",
                  height: "100%",
                }
          }
        >
          <li>Contact</li>
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
