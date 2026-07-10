import { useRef } from "react";
import { useWallpaper } from "./BackgroundConext";
import { useAuth } from "../../../auth/AuthContext";
import { getSystemInfo } from "./SystemInfo";

export default function Settings() {
    const { wallpaper, setWallpaper, presets} = useWallpaper()
    const {logout} = useAuth()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const info = getSystemInfo()
}