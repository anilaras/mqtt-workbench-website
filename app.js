"use strict";

(() => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#main-nav");
    const mobileViewport = window.matchMedia("(max-width: 800px)");

    function setMenu(open) {
        navigation.hidden = mobileViewport.matches && !open;
        menuButton.setAttribute("aria-expanded", String(open));
    }

    menuButton.hidden = false;
    setMenu(false);
    mobileViewport.addEventListener("change", () => setMenu(false));
    menuButton.addEventListener("click", () => {
        setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && mobileViewport.matches && !navigation.hidden) {
            setMenu(false);
            menuButton.focus();
        }
    });

    const tabList = document.querySelector(".showcase-tabs");
    const tabs = Array.from(tabList.querySelectorAll("[data-screen]"));
    const panels = Array.from(document.querySelectorAll(".screen-panel"));
    tabList.setAttribute("role", "tablist");

    function selectScreen(tab, focus = false) {
        tabs.forEach((item) => {
            const selected = item === tab;
            item.setAttribute("aria-selected", String(selected));
            item.tabIndex = selected ? 0 : -1;
            item.classList.toggle("is-active", selected);
        });
        panels.forEach((panel) => {
            panel.hidden = panel.id !== "screen-" + tab.dataset.screen;
        });
        if (focus) tab.focus();
    }

    function updateTabOrientation() {
        tabList.setAttribute("aria-orientation", mobileViewport.matches ? "horizontal" : "vertical");
    }
    updateTabOrientation();
    mobileViewport.addEventListener("change", updateTabOrientation);
    tabs.forEach((tab, index) => {
        const panel = panels[index];
        tab.id = "tab-" + tab.dataset.screen;
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-controls", panel.id);
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tab.id);
        panel.tabIndex = 0;
        tab.addEventListener("click", (event) => {
            event.preventDefault();
            selectScreen(tab);
        });
        tab.addEventListener("keydown", (event) => {
            let target;
            if (event.key === "ArrowDown" || event.key === "ArrowRight") target = (index + 1) % tabs.length;
            if (event.key === "ArrowUp" || event.key === "ArrowLeft") target = (index - 1 + tabs.length) % tabs.length;
            if (event.key === "Home") target = 0;
            if (event.key === "End") target = tabs.length - 1;
            if (event.key === " ") {
                event.preventDefault();
                selectScreen(tab);
            }
            if (target !== undefined) {
                event.preventDefault();
                selectScreen(tabs[target], true);
            }
        });
    });

    function selectHashScreen() {
        const tab = tabs.find((item) => item.hash === window.location.hash);
        if (tab) selectScreen(tab);
    }
    selectScreen(tabs[0]);
    selectHashScreen();
    window.addEventListener("hashchange", selectHashScreen);

    // Invalid targets stay unavailable; configuration must never create script URLs.
    function publicHttpsUrl(value) {
        if (typeof value !== "string" || !value.trim()) return null;
        try {
            const url = new URL(value);
            return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
        } catch {
            return null;
        }
    }

    const downloads = window.MQTT_WORKBENCH_SITE?.downloads ?? {};
    let hasDownload = false;
    document.querySelectorAll("[data-download]").forEach((link) => {
        const key = link.dataset.download;
        const url = publicHttpsUrl(downloads[key]);
        if (!url) return;
        link.href = url;
        link.hidden = false;
        hasDownload = true;
        const platform = key === "store" ? "windows" : key;
        document.querySelector('[data-pending="' + platform + '"]').hidden = true;
    });
    if (hasDownload) {
        document.querySelector("#release-note").textContent =
            "Platformunuzu seçin ve yayınlanan indirme bağlantısından devam edin.";
    }
})();
