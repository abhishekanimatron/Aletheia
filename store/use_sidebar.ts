//about zustand:
// A small, fast and scalable bearbones state-management solution
//using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionated.
import { create } from "zustand"

interface SidebarStore {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false })),
    onCollapse: () => set(() => ({ collapsed: true }))
}))