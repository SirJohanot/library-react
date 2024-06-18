import { useState } from "react";
import { FormattedMessage } from "react-intl";

export default function CollapsibleElements({ children }) {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            {!collapsed && children}
            <button className="collapse-button" onClick={(e) => setCollapsed((prev) => !prev)}><FormattedMessage id={collapsed ? "showMore" : "showLess"} /></button>
        </>
    );
}
