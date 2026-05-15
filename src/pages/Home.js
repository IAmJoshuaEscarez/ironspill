import { template } from "../components/IronManUI.js";
import { bindControls } from "../components/Controls.js";

export default function Home() {
  return template();
}

export function initHome() {
  bindControls();
}