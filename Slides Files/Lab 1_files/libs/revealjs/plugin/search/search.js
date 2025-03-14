!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? module.exports = t()
        : "function" == typeof define && define.amd
            ? define(t)
            : (e = "undefined" != typeof globalThis ? globalThis : e || self).RevealSearch = t();
}(this, (function () {
    "use strict";
    /*!
     * Handles finding a text string anywhere in the slides and showing the next occurrence to the user
     * by navigating to that slide and highlighting it.
     *
     * @author Jon Snyder <snyder.jon@gmail.com>, February 2013
     */
    return () => {
        let e, t, n, i, o, l, r;

        function s() {
            t = document.createElement("div");
            t.classList.add("searchbox");
            t.style.position = "absolute";
            t.style.top = "10px";
            t.style.right = "10px";
            t.style.zIndex = 10;
            t.innerHTML = '<input type="search" class="searchinput" placeholder="Search..." style="vertical-align: top;"/>';
            n = t.querySelector(".searchinput");
            n.style.width = "240px";
            n.style.fontSize = "14px";
            n.style.padding = "4px 6px";
            n.style.color = "#000";
            n.style.background = "#fff";
            n.style.borderRadius = "2px";
            n.style.border = "0";
            n.style.outline = "0";
            n.style.boxShadow = "0 2px 18px rgba(0, 0, 0, 0.2)";
            n.style["-webkit-appearance"] = "none";

            e.getRevealElement().appendChild(t);

            n.addEventListener("keyup", (function (t) {
                if (13 === t.keyCode) {
                    t.preventDefault();
                    (function () {
                        if (l) {
                            var t = n.value;
                            if ("" === t) {
                                r && r.remove();
                                i = null;
                            } else {
                                r = new c("slidecontent");
                                i = r.apply(t);
                                o = 0;
                            }
                        }
                        if (i) {
                            if (i.length && i.length <= o) {
                                o = 0;
                            }
                            if (i.length > o) {
                                e.slide(i[o].h, i[o].v);
                                o++;
                            }
                        }
                    })();
                    l = !1;
                } else {
                    l = !0;
                }
            }), !1);

            d();
        }

        function a() {
            t || s();
            t.style.display = "inline";
            n.focus();
            n.select();
        }

        function d() {
            t || s();
            t.style.display = "none";
            r && r.remove();
        }

        function c(t, n) {
            var i = document.getElementById(t) || document.body;
            var o = n || "EM";
            var l = new RegExp("^(?:" + o + "|SCRIPT|FORM)$");
            var r = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
            var s = [];
            var a = 0;
            var d = "";
            var c = [];

            this.setRegex = function (e) {
                e = e.trim();
                d = new RegExp("(" + e + ")", "i");
            };

            this.getRegex = function () {
                return d.toString().replace(/^\/\\b\(|\)\\b\/i$/g, "").replace(/\|/g, " ");
            };

            this.hiliteWords = function (t) {
                if (null != t && t && d && !l.test(t.nodeName)) {
                    if (t.hasChildNodes()) {
                        for (var n = 0; n < t.childNodes.length; n++) {
                            this.hiliteWords(t.childNodes[n]);
                        }
                    }
                    var i, f;
                    if (3 == t.nodeType) {
                        if ((i = t.nodeValue) && (f = d.exec(i))) {
                            var u = t;
                            while (null != u && "SECTION" != u.nodeName) {
                                u = u.parentNode;
                            }
                            var p = e.getIndices(u);
                            var h = c.length;
                            var y = !1;
                            for (n = 0; n < h; n++) {
                                if (c[n].h === p.h && c[n].v === p.v) {
                                    y = !0;
                                }
                            }
                            if (!y) {
                                c.push(p);
                            }
                            if (!s[f[0].toLowerCase()]) {
                                s[f[0].toLowerCase()] = r[a++ % r.length];
                            }
                            var g = document.createElement(o);
                            g.appendChild(document.createTextNode(f[0]));
                            g.style.backgroundColor = s[f[0].toLowerCase()];
                            g.style.fontStyle = "inherit";
                            g.style.color = "#000";
                            var v = t.splitText(f.index);
                            v.nodeValue = v.nodeValue.substring(f[0].length);
                            t.parentNode.insertBefore(g, v);
                        }
                    }
                }
            };

            this.remove = function () {
                for (var e, t = document.getElementsByTagName(o); t.length && (e = t[0]);) {
                    e.parentNode.replaceChild(e.firstChild, e);
                }
            };

            this.apply = function (e) {
                if (null != e && e) {
                    this.remove();
                    this.setRegex(e);
                    this.hiliteWords(i);
                    return c;
                }
            };
        }

        return {
            id: "search",
            init: (n) => {
                e = n;
                e.registerKeyboardShortcut("CTRL + Shift + F", "Search");
                document.addEventListener("keydown", (function (e) {
                    if ("F" == e.key && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        t || s();
                        if ("inline" !== t.style.display) {
                            a();
                        } else {
                            d();
                        }
                    }
                }), !1);
            },
            open: a
        };
    }
}));
