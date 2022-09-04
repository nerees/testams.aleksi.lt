(() => {
    var n = {
        105: () => {
            !function (s) {
                function a(e, t) {
                    this.options = t, this.$elementFilestyle = [], this.$element = s(e)
                }

                var r = 0;
                a.prototype = {
                    clear: function () {
                        this.$element.val(""), this.$elementFilestyle.find(":text").val(""), this.$elementFilestyle.find(".badge").remove()
                    }, destroy: function () {
                        this.$element.removeAttr("style").removeData("filestyle"), this.$elementFilestyle.remove()
                    }, disabled: function (e) {
                        if (!0 === e) this.options.disabled || (this.$element.attr("disabled", "true"), this.$elementFilestyle.find("label").attr("disabled", "true"), this.options.disabled = !0); else {
                            if (!1 !== e) return this.options.disabled;
                            this.options.disabled && (this.$element.removeAttr("disabled"), this.$elementFilestyle.find("label").removeAttr("disabled"), this.options.disabled = !1)
                        }
                    }, buttonBefore: function (e) {
                        if (!0 === e) this.options.buttonBefore || (this.options.buttonBefore = !0, this.options.input && (this.$elementFilestyle.remove(), this.constructor(), this.pushNameFiles())); else {
                            if (!1 !== e) return this.options.buttonBefore;
                            this.options.buttonBefore && (this.options.buttonBefore = !1, this.options.input && (this.$elementFilestyle.remove(), this.constructor(), this.pushNameFiles()))
                        }
                    }, icon: function (e) {
                        if (!0 === e) this.options.icon || (this.options.icon = !0, this.$elementFilestyle.find("label").prepend(this.htmlIcon())); else {
                            if (!1 !== e) return this.options.icon;
                            this.options.icon && (this.options.icon = !1, this.$elementFilestyle.find(".icon-span-filestyle").remove())
                        }
                    }, input: function (e) {
                        if (!0 === e) this.options.input || (this.options.input = !0, this.options.buttonBefore ? this.$elementFilestyle.append(this.htmlInput()) : this.$elementFilestyle.prepend(this.htmlInput()), this.$elementFilestyle.find(".badge").remove(), this.pushNameFiles(), this.$elementFilestyle.find(".group-span-filestyle").addClass("input-group-btn")); else {
                            if (!1 !== e) return this.options.input;
                            this.options.input && (this.options.input = !1, this.$elementFilestyle.find(":text").remove(), 0 < (e = this.pushNameFiles()).length && this.options.badge && this.$elementFilestyle.find("label").append(' <span class="badge">' + e.length + "</span>"), this.$elementFilestyle.find(".group-span-filestyle").removeClass("input-group-btn"))
                        }
                    }, size: function (e) {
                        if (void 0 === e) return this.options.size;
                        var t = this.$elementFilestyle.find("label"), n = this.$elementFilestyle.find("input");
                        t.removeClass("btn-lg btn-sm"), n.removeClass("input-lg input-sm"), "nr" != e && (t.addClass("btn-" + e), n.addClass("input-" + e))
                    }, placeholder: function (e) {
                        if (void 0 === e) return this.options.placeholder;
                        this.options.placeholder = e, this.$elementFilestyle.find("input").attr("placeholder", e)
                    }, buttonText: function (e) {
                        if (void 0 === e) return this.options.buttonText;
                        this.options.buttonText = e, this.$elementFilestyle.find("label .buttonText").html(this.options.buttonText)
                    }, buttonName: function (e) {
                        if (void 0 === e) return this.options.buttonName;
                        this.options.buttonName = e, this.$elementFilestyle.find("label").attr({class: "btn " + this.options.buttonName})
                    }, iconName: function (e) {
                        if (void 0 === e) return this.options.iconName;
                        this.$elementFilestyle.find(".icon-span-filestyle").attr({class: "icon-span-filestyle " + this.options.iconName})
                    }, htmlIcon: function () {
                        return this.options.icon ? '<span class="icon-span-filestyle ' + this.options.iconName + '"></span> ' : ""
                    }, htmlInput: function () {
                        return this.options.input ? '<input type="text" class="form-control ' + ("nr" == this.options.size ? "" : "input-" + this.options.size) + '" placeholder="' + this.options.placeholder + '" disabled> ' : ""
                    }, pushNameFiles: function () {
                        var e = "", t = [];
                        void 0 === this.$element[0].files ? t[0] = {name: this.$element[0] && this.$element[0].value} : t = this.$element[0].files;
                        for (var n = 0; n < t.length; n++) e += t[n].name.split("\\").pop() + ", ";
                        return "" !== e ? this.$elementFilestyle.find(":text").val(e.replace(/\, $/g, "")) : this.$elementFilestyle.find(":text").val(""), t
                    }, constructor: function () {
                        var e, t, n = this, i = n.$element.attr("id");
                        "" !== i && i || (n.$element.attr({id: i = "filestyle-" + r}), r++), t = '<span class="group-span-filestyle ' + (n.options.input ? "input-group-btn" : "") + '"><label for="' + i + '" class="btn ' + n.options.buttonName + " " + ("nr" == n.options.size ? "" : "btn-" + n.options.size) + '" ' + (n.options.disabled ? 'disabled="true"' : "") + ">" + n.htmlIcon() + '<span class="buttonText">' + n.options.buttonText + "</span></label></span>", e = n.options.buttonBefore ? t + n.htmlInput() : n.htmlInput() + t, n.$elementFilestyle = s('<div class="bootstrap-filestyle input-group">' + e + "</div>"), n.$elementFilestyle.find(".group-span-filestyle").attr("tabindex", "0").keypress(function (e) {
                            if (13 === e.keyCode || 32 === e.charCode) return n.$elementFilestyle.find("label").click(), !1
                        }), n.$element.css({
                            position: "absolute",
                            clip: "rect(0px 0px 0px 0px)"
                        }).attr("tabindex", "-1").after(n.$elementFilestyle), n.options.disabled && n.$element.attr("disabled", "true"), n.$element.change(function () {
                            var e = n.pushNameFiles();
                            0 == n.options.input && n.options.badge ? 0 == n.$elementFilestyle.find(".badge").length ? n.$elementFilestyle.find("label").append(' <span class="badge">' + e.length + "</span>") : 0 == e.length ? n.$elementFilestyle.find(".badge").remove() : n.$elementFilestyle.find(".badge").html(e.length) : n.$elementFilestyle.find(".badge").remove()
                        }), -1 < window.navigator.userAgent.search(/firefox/i) && n.$elementFilestyle.find("label").click(function () {
                            return n.$element.click(), !1
                        })
                    }
                };
                var e = s.fn.filestyle;
                s.fn.filestyle = function (i, r) {
                    var o = "";
                    this.each(function () {
                        var e, t, n;
                        "file" === s(this).attr("type") && (t = (e = s(this)).data("filestyle"), n = s.extend({}, s.fn.filestyle.defaults, i, "object" == typeof i && i), t || (e.data("filestyle", t = new a(this, n)), t.constructor()), "string" == typeof i && (o = t[i](r)))
                    });
                    return o
                }, s.fn.filestyle.defaults = {
                    buttonText: "Choose file",
                    iconName: "glyphicon glyphicon-folder-open",
                    buttonName: "btn-default",
                    size: "nr",
                    input: !0,
                    badge: !0,
                    icon: !0,
                    buttonBefore: !1,
                    disabled: !1,
                    placeholder: ""
                }, s.fn.filestyle.noConflict = function () {
                    return s.fn.filestyle = e, this
                }, s(function () {
                    s(".filestyle").each(function () {
                        var e = s(this), t = {
                            input: "false" !== e.attr("data-input"),
                            icon: "false" !== e.attr("data-icon"),
                            buttonBefore: "true" === e.attr("data-buttonBefore"),
                            disabled: "true" === e.attr("data-disabled"),
                            size: e.attr("data-size"),
                            buttonText: e.attr("data-buttonText"),
                            buttonName: e.attr("data-buttonName"),
                            iconName: e.attr("data-iconName"),
                            badge: "false" !== e.attr("data-badge"),
                            placeholder: e.attr("data-placeholder")
                        };
                        e.filestyle(t)
                    })
                })
            }(window.jQuery)
        }, 285: () => {
            var g;
            (g = jQuery).fn.scrollbox = function (m) {
                return (m = g.extend({
                    linear: !1,
                    startDelay: 2,
                    delay: 3,
                    step: 5,
                    speed: 32,
                    switchItems: 1,
                    direction: "vertical",
                    distance: "auto",
                    autoPlay: !0,
                    onMouseOverPause: !0,
                    paused: !1,
                    queue: null,
                    listElement: "ul",
                    listItemElement: "li",
                    infiniteLoop: !0,
                    switchAmount: 0,
                    afterForward: null,
                    afterBackward: null,
                    triggerStackable: !1
                }, m)).scrollOffset = "vertical" === m.direction ? "scrollTop" : "scrollLeft", m.queue && (m.queue = g("#" + m.queue)), this.each(function () {
                    var i, r, e, o, t, n, s, a, l, c = g(this), u = null, f = null, d = !1, h = 0, p = 0;
                    m.onMouseOverPause && (c.bind("mouseover", function () {
                        d = !0
                    }), c.bind("mouseout", function () {
                        d = !1
                    })), i = c.children(m.listElement + ":first-child"), !1 === m.infiniteLoop && 0 === m.switchAmount && (m.switchAmount = i.children().length), n = function () {
                        if (!d) {
                            var e, t = i.children(m.listItemElement + ":first-child"),
                                t = "auto" !== m.distance ? m.distance : "vertical" === m.direction ? t.outerHeight(!0) : t.outerWidth(!0),
                                n = m.linear ? Math.min(c[0][m.scrollOffset] + m.step, t) : (n = Math.max(3, parseInt(.3 * (t - c[0][m.scrollOffset]), 10)), Math.min(c[0][m.scrollOffset] + n, t));
                            if (t <= (c[0][m.scrollOffset] = n)) {
                                for (e = 0; e < m.switchItems; e++) m.queue && 0 < m.queue.find(m.listItemElement).length ? (i.append(m.queue.find(m.listItemElement)[0]), i.children(m.listItemElement + ":first-child").remove()) : i.append(i.children(m.listItemElement + ":first-child")), ++h;
                                c[0][m.scrollOffset] = 0, clearInterval(u), u = null, g.isFunction(m.afterForward) && m.afterForward.call(c, {
                                    switchCount: h,
                                    currentFirstChild: i.children(m.listItemElement + ":first-child")
                                }), m.triggerStackable && 0 !== p ? r() : !1 === m.infiniteLoop && h >= m.switchAmount || m.autoPlay && (f = setTimeout(o, 1e3 * m.delay))
                            }
                        }
                    }, s = function () {
                        if (!d) {
                            var e, t, n;
                            if (0 === c[0][m.scrollOffset]) {
                                for (e = 0; e < m.switchItems; e++) i.children(m.listItemElement + ":last-child").insertBefore(i.children(m.listItemElement + ":first-child"));
                                t = i.children(m.listItemElement + ":first-child"), t = "auto" !== m.distance ? m.distance : "vertical" === m.direction ? t.height() : t.width(), c[0][m.scrollOffset] = t
                            }
                            n = m.linear ? Math.max(c[0][m.scrollOffset] - m.step, 0) : (n = Math.max(3, parseInt(.3 * c[0][m.scrollOffset], 10)), Math.max(c[0][m.scrollOffset] - n, 0)), 0 === (c[0][m.scrollOffset] = n) && (--h, clearInterval(u), u = null, g.isFunction(m.afterBackward) && m.afterBackward.call(c, {
                                switchCount: h,
                                currentFirstChild: i.children(m.listItemElement + ":first-child")
                            }), m.triggerStackable && 0 !== p ? r() : m.autoPlay && (f = setTimeout(o, 1e3 * m.delay)))
                        }
                    }, r = function () {
                        0 !== p && (f = 0 < p ? (p--, setTimeout(o, 0)) : (p++, setTimeout(e, 0)))
                    }, o = function () {
                        clearInterval(u), u = setInterval(n, m.speed)
                    }, e = function () {
                        clearInterval(u), u = setInterval(s, m.speed)
                    }, a = function () {
                        m.autoPlay = !0, d = !1, clearInterval(u), u = setInterval(n, m.speed)
                    }, l = function () {
                        d = !0
                    }, t = function (e) {
                        m.delay = e || m.delay, clearTimeout(f), m.autoPlay && (f = setTimeout(o, 1e3 * m.delay))
                    }, m.autoPlay && (f = setTimeout(o, 1e3 * m.startDelay)), c.bind("resetClock", function (e) {
                        t(e)
                    }), c.bind("forward", function () {
                        m.triggerStackable ? null !== u ? p++ : o() : (clearTimeout(f), o())
                    }), c.bind("backward", function () {
                        m.triggerStackable ? null !== u ? p-- : e() : (clearTimeout(f), e())
                    }), c.bind("pauseHover", function () {
                        l()
                    }), c.bind("forwardHover", function () {
                        a()
                    }), c.bind("speedUp", function (e, t) {
                        "undefined" === t && (t = Math.max(1, parseInt(m.speed / 2, 10))), m.speed = t
                    }), c.bind("speedDown", function (e, t) {
                        "undefined" === t && (t = 2 * m.speed), m.speed = t
                    }), c.bind("updateConfig", function (e, t) {
                        m = g.extend(m, t)
                    })
                })
            }
        }, 877: () => {
            !function (_) {
                "use strict";
                var S = 0;

                function T(e, t) {
                    return _.map(e, function (e) {
                        return e + ".touchspin_" + t
                    })
                }

                _.fn.TouchSpin = function (b) {
                    if ("destroy" !== b) {
                        var w = {
                            min: 0,
                            max: 100,
                            initval: "",
                            replacementval: "",
                            step: 1,
                            decimals: 0,
                            stepinterval: 100,
                            forcestepdivisibility: "round",
                            stepintervaldelay: 500,
                            verticalbuttons: !1,
                            verticalupclass: "glyphicon glyphicon-chevron-up",
                            verticaldownclass: "glyphicon glyphicon-chevron-down",
                            prefix: "",
                            postfix: "",
                            prefix_extraclass: "",
                            postfix_extraclass: "",
                            booster: !0,
                            boostat: 10,
                            maxboostedstep: !1,
                            mousewheel: !0,
                            buttondown_class: "btn btn-default",
                            buttonup_class: "btn btn-default",
                            buttondown_txt: "-",
                            buttonup_txt: "+"
                        }, x = {
                            min: "min",
                            max: "max",
                            initval: "init-val",
                            replacementval: "replacement-val",
                            step: "step",
                            decimals: "decimals",
                            stepinterval: "step-interval",
                            verticalbuttons: "vertical-buttons",
                            verticalupclass: "vertical-up-class",
                            verticaldownclass: "vertical-down-class",
                            forcestepdivisibility: "force-step-divisibility",
                            stepintervaldelay: "step-interval-delay",
                            prefix: "prefix",
                            postfix: "postfix",
                            prefix_extraclass: "prefix-extra-class",
                            postfix_extraclass: "postfix-extra-class",
                            booster: "booster",
                            boostat: "boostat",
                            maxboostedstep: "max-boosted-step",
                            mousewheel: "mouse-wheel",
                            buttondown_class: "button-down-class",
                            buttonup_class: "button-up-class",
                            buttondown_txt: "button-down-txt",
                            buttonup_txt: "button-up-txt"
                        };
                        return this.each(function () {
                            var a, l, n, i, e, t, r, o, c = _(this), s = c.data(), u = 0, f = !1;

                            function d() {
                                var e, t, n = c.val();
                                "" !== n ? 0 < a.decimals && "." === n || (e = parseFloat(n), (t = e = isNaN(e) ? "" !== a.replacementval ? a.replacementval : 0 : e).toString() !== n && (t = e), e < a.min && (t = a.min), t = function (e) {
                                    switch (a.forcestepdivisibility) {
                                        case"round":
                                            return (Math.round(e / a.step) * a.step).toFixed(a.decimals);
                                        case"floor":
                                            return (Math.floor(e / a.step) * a.step).toFixed(a.decimals);
                                        case"ceil":
                                            return (Math.ceil(e / a.step) * a.step).toFixed(a.decimals);
                                        default:
                                            return e
                                    }
                                }(t = e > a.max ? a.max : t), Number(n).toString() !== t.toString() && (c.val(t), c.trigger("change"))) : "" !== a.replacementval && (c.val(a.replacementval), c.trigger("change"))
                            }

                            function h() {
                                if (a.booster) {
                                    var e = Math.pow(2, Math.floor(u / a.boostat)) * a.step;
                                    return a.maxboostedstep && e > a.maxboostedstep && (e = a.maxboostedstep, i = Math.round(i / e) * e), Math.max(a.step, e)
                                }
                                return a.step
                            }

                            function p() {
                                d(), i = parseFloat(n.input.val());
                                var e = i = isNaN(i) ? 0 : i, t = h();
                                (i += t) > a.max && (i = a.max, c.trigger("touchspin.on.max"), v()), n.input.val(Number(i).toFixed(a.decimals)), e !== i && c.trigger("change")
                            }

                            function m() {
                                d(), i = parseFloat(n.input.val());
                                var e = i = isNaN(i) ? 0 : i, t = h();
                                (i -= t) < a.min && (i = a.min, c.trigger("touchspin.on.min"), v()), n.input.val(i.toFixed(a.decimals)), e !== i && c.trigger("change")
                            }

                            function g() {
                                v(), u = 0, f = "down", c.trigger("touchspin.on.startspin"), c.trigger("touchspin.on.startdownspin"), r = setTimeout(function () {
                                    e = setInterval(function () {
                                        u++, m()
                                    }, a.stepinterval)
                                }, a.stepintervaldelay)
                            }

                            function y() {
                                v(), u = 0, f = "up", c.trigger("touchspin.on.startspin"), c.trigger("touchspin.on.startupspin"), o = setTimeout(function () {
                                    t = setInterval(function () {
                                        u++, p()
                                    }, a.stepinterval)
                                }, a.stepintervaldelay)
                            }

                            function v() {
                                switch (clearTimeout(r), clearTimeout(o), clearInterval(e), clearInterval(t), f) {
                                    case"up":
                                        c.trigger("touchspin.on.stopupspin"), c.trigger("touchspin.on.stopspin");
                                        break;
                                    case"down":
                                        c.trigger("touchspin.on.stopdownspin"), c.trigger("touchspin.on.stopspin")
                                }
                                u = 0, f = !1
                            }

                            c.data("alreadyinitialized") || (c.data("alreadyinitialized", !0), S += 1, c.data("spinnerid", S), c.is("input") && ("" !== (a = _.extend({}, w, s, function () {
                                var n = {};
                                return _.each(x, function (e, t) {
                                    t = "bts-" + t;
                                    c.is("[data-" + t + "]") && (n[e] = c.data(t))
                                }), n
                            }(), b)).initval && "" === c.val() && c.val(a.initval), d(), function () {
                                var e = c.val(), t = c.parent();
                                "" !== e && (e = Number(e).toFixed(a.decimals));
                                c.data("initvalue", e).val(e), c.addClass("form-control"), t.hasClass("input-group") ? function (e) {
                                    e.addClass("bootstrap-touchspin");
                                    var t, n, i = c.prev(), r = c.next(),
                                        o = '<span class="input-group-addon bootstrap-touchspin-prefix">' + a.prefix + "</span>",
                                        s = '<span class="input-group-addon bootstrap-touchspin-postfix">' + a.postfix + "</span>";
                                    i.hasClass("input-group-btn") ? (t = '<button class="' + a.buttondown_class + ' bootstrap-touchspin-down" type="button">' + a.buttondown_txt + "</button>", i.append(t)) : (t = '<span class="input-group-btn"><button class="' + a.buttondown_class + ' bootstrap-touchspin-down" type="button">' + a.buttondown_txt + "</button></span>", _(t).insertBefore(c));
                                    r.hasClass("input-group-btn") ? (n = '<button class="' + a.buttonup_class + ' bootstrap-touchspin-up" type="button">' + a.buttonup_txt + "</button>", r.prepend(n)) : (n = '<span class="input-group-btn"><button class="' + a.buttonup_class + ' bootstrap-touchspin-up" type="button">' + a.buttonup_txt + "</button></span>", _(n).insertAfter(c));
                                    _(o).insertBefore(c), _(s).insertAfter(c), l = e
                                }(t) : function () {
                                    var e;
                                    e = a.verticalbuttons ? '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' + a.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + a.postfix + '</span><span class="input-group-btn-vertical"><button class="' + a.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + a.verticalupclass + '"></i></button><button class="' + a.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + a.verticaldownclass + '"></i></button></span></div>' : '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' + a.buttondown_class + ' bootstrap-touchspin-down" type="button">' + a.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' + a.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + a.postfix + '</span><span class="input-group-btn"><button class="' + a.buttonup_class + ' bootstrap-touchspin-up" type="button">' + a.buttonup_txt + "</button></span></div>";
                                    l = _(e).insertBefore(c), _(".bootstrap-touchspin-prefix", l).after(c), c.hasClass("input-sm") ? l.addClass("input-group-sm") : c.hasClass("input-lg") && l.addClass("input-group-lg")
                                }()
                            }(), n = {
                                down: _(".bootstrap-touchspin-down", l),
                                up: _(".bootstrap-touchspin-up", l),
                                input: _("input", l),
                                prefix: _(".bootstrap-touchspin-prefix", l).addClass(a.prefix_extraclass),
                                postfix: _(".bootstrap-touchspin-postfix", l).addClass(a.postfix_extraclass)
                            }, function () {
                                "" === a.prefix && n.prefix.hide();
                                "" === a.postfix && n.postfix.hide()
                            }(), c.on("keydown", function (e) {
                                var t = e.keyCode || e.which;
                                38 === t ? ("up" !== f && (p(), y()), e.preventDefault()) : 40 === t && ("down" !== f && (m(), g()), e.preventDefault())
                            }), c.on("keyup", function (e) {
                                e = e.keyCode || e.which;
                                38 !== e && 40 !== e || v()
                            }), c.on("blur", function () {
                                d()
                            }), n.down.on("keydown", function (e) {
                                var t = e.keyCode || e.which;
                                32 !== t && 13 !== t || ("down" !== f && (m(), g()), e.preventDefault())
                            }), n.down.on("keyup", function (e) {
                                e = e.keyCode || e.which;
                                32 !== e && 13 !== e || v()
                            }), n.up.on("keydown", function (e) {
                                var t = e.keyCode || e.which;
                                32 !== t && 13 !== t || ("up" !== f && (p(), y()), e.preventDefault())
                            }), n.up.on("keyup", function (e) {
                                e = e.keyCode || e.which;
                                32 !== e && 13 !== e || v()
                            }), n.down.on("mousedown.touchspin", function (e) {
                                n.down.off("touchstart.touchspin"), c.is(":disabled") || (m(), g(), e.preventDefault(), e.stopPropagation())
                            }), n.down.on("touchstart.touchspin", function (e) {
                                n.down.off("mousedown.touchspin"), c.is(":disabled") || (m(), g(), e.preventDefault(), e.stopPropagation())
                            }), n.up.on("mousedown.touchspin", function (e) {
                                n.up.off("touchstart.touchspin"), c.is(":disabled") || (p(), y(), e.preventDefault(), e.stopPropagation())
                            }), n.up.on("touchstart.touchspin", function (e) {
                                n.up.off("mousedown.touchspin"), c.is(":disabled") || (p(), y(), e.preventDefault(), e.stopPropagation())
                            }), n.up.on("mouseout touchleave touchend touchcancel", function (e) {
                                f && (e.stopPropagation(), v())
                            }), n.down.on("mouseout touchleave touchend touchcancel", function (e) {
                                f && (e.stopPropagation(), v())
                            }), n.down.on("mousemove touchmove", function (e) {
                                f && (e.stopPropagation(), e.preventDefault())
                            }), n.up.on("mousemove touchmove", function (e) {
                                f && (e.stopPropagation(), e.preventDefault())
                            }), _(document).on(T(["mouseup", "touchend", "touchcancel"], S).join(" "), function (e) {
                                f && (e.preventDefault(), v())
                            }), _(document).on(T(["mousemove", "touchmove", "scroll", "scrollstart"], S).join(" "), function (e) {
                                f && (e.preventDefault(), v())
                            }), c.on("mousewheel DOMMouseScroll", function (e) {
                                var t;
                                a.mousewheel && c.is(":focus") && (t = e.originalEvent.wheelDelta || -e.originalEvent.deltaY || -e.originalEvent.detail, e.stopPropagation(), e.preventDefault(), (t < 0 ? m : p)())
                            }), c.on("touchspin.uponce", function () {
                                v(), p()
                            }), c.on("touchspin.downonce", function () {
                                v(), m()
                            }), c.on("touchspin.startupspin", function () {
                                y()
                            }), c.on("touchspin.startdownspin", function () {
                                g()
                            }), c.on("touchspin.stopspin", function () {
                                v()
                            }), c.on("touchspin.updatesettings", function (e, t) {
                                !function (e) {
                                    (function (e) {
                                        a = _.extend({}, a, e)
                                    })(e), d();
                                    e = n.input.val();
                                    "" !== e && (e = Number(n.input.val()), n.input.val(e.toFixed(a.decimals)))
                                }(t)
                            }), n.input.css("display", "block")))
                        })
                    }
                    this.each(function () {
                        var e = _(this).data();
                        _(document).off(T(["mouseup", "touchend", "touchcancel", "mousemove", "touchmove", "scroll", "scrollstart"], e.spinnerid).join(" "))
                    })
                }
            }(jQuery)
        }, 948: () => {
            if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

            function w(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function e(e) {
                var t = this, n = !1;
                return r(this).one(o.TRANSITION_END, function () {
                    n = !0
                }), setTimeout(function () {
                    n || o.triggerTransitionEnd(t)
                }, e), this
            }

            function i(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                }
            }

            var r, t, n, o, x, _, S, m;
            !function () {
                var e = jQuery.fn.jquery.split(" ")[0].split(".");
                if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || 4 <= e[0]) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
            }(), x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }, r = jQuery, t = !(_ = function (e, t, n) {
                return t && i(e.prototype, t), n && i(e, n), e
            }), n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            }, o = {
                TRANSITION_END: "bsTransitionEnd", getUID: function (e) {
                    for (; e += ~~(1e6 * Math.random()), document.getElementById(e);) ;
                    return e
                }, getSelectorFromElement: function (e) {
                    var t = e.getAttribute("data-target");
                    return t || (t = e.getAttribute("href") || "", t = /^#[a-z]/i.test(t) ? t : null), t
                }, reflow: function (e) {
                    new Function("bs", "return bs")(e.offsetHeight)
                }, triggerTransitionEnd: function (e) {
                    r(e).trigger(t.end)
                }, supportsTransitionEnd: function () {
                    return Boolean(t)
                }, typeCheckConfig: function (e, t, n) {
                    for (var i in n) if (n.hasOwnProperty(i)) {
                        var r = n[i], o = t[i],
                            s = o && ((a = o)[0] || a).nodeType ? "element" : (o = o, {}.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
                        if (!new RegExp(r).test(s)) throw new Error(e.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + r + '".')
                    }
                    var a
                }
            }, t = function () {
                if (window.QUnit) return !1;
                var e, t = document.createElement("bootstrap");
                for (e in n) if (void 0 !== t.style[e]) return {end: n[e]};
                return !1
            }(), r.fn.emulateTransitionEnd = e, o.supportsTransitionEnd() && (r.event.special[o.TRANSITION_END] = {
                bindType: t.end,
                delegateType: t.end,
                handle: function (e) {
                    if (r(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }), S = o, function (i) {
                var e = "alert", r = "bs.alert", t = "." + r, n = i.fn[e],
                    o = {CLOSE: "close" + t, CLOSED: "closed" + t, CLICK_DATA_API: "click" + t + ".data-api"},
                    s = "alert", a = "fade", l = "in", c = (u.prototype.close = function (e) {
                        e = e || this._element;
                        e = this._getRootElement(e);
                        this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
                    }, u.prototype.dispose = function () {
                        i.removeData(this._element, r), this._element = null
                    }, u.prototype._getRootElement = function (e) {
                        var t = S.getSelectorFromElement(e), n = !1;
                        return n = (n = t ? i(t)[0] : n) || i(e).closest("." + s)[0]
                    }, u.prototype._triggerCloseEvent = function (e) {
                        var t = i.Event(o.CLOSE);
                        return i(e).trigger(t), t
                    }, u.prototype._removeElement = function (e) {
                        return i(e).removeClass(l), S.supportsTransitionEnd() && i(e).hasClass(a) ? void i(e).one(S.TRANSITION_END, i.proxy(this._destroyElement, this, e)).emulateTransitionEnd(150) : void this._destroyElement(e)
                    }, u.prototype._destroyElement = function (e) {
                        i(e).detach().trigger(o.CLOSED).remove()
                    }, u._jQueryInterface = function (n) {
                        return this.each(function () {
                            var e = i(this), t = e.data(r);
                            t || (t = new u(this), e.data(r, t)), "close" === n && t[n](this)
                        })
                    }, u._handleDismiss = function (t) {
                        return function (e) {
                            e && e.preventDefault(), t.close(this)
                        }
                    }, _(u, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }]), u);

                function u(e) {
                    w(this, u), this._element = e
                }

                i(document).on(o.CLICK_DATA_API, '[data-dismiss="alert"]', c._handleDismiss(new c)), i.fn[e] = c._jQueryInterface, i.fn[e].Constructor = c, i.fn[e].noConflict = function () {
                    return i.fn[e] = n, c._jQueryInterface
                }
            }(jQuery), function (i) {
                var e = "button", n = "bs.button", t = "." + n, r = ".data-api", o = i.fn[e], s = "active", a = "btn",
                    l = "focus", c = '[data-toggle^="button"]', u = '[data-toggle="buttons"]', f = "input",
                    d = ".active", h = ".btn",
                    r = {CLICK_DATA_API: "click" + t + r, FOCUS_BLUR_DATA_API: "focus" + t + r + " blur" + t + r},
                    p = (m.prototype.toggle = function () {
                        var e, t = !0, n = i(this._element).closest(u)[0];
                        n ? (e = i(this._element).find(f)[0]) && ("radio" === e.type && (e.checked && i(this._element).hasClass(s) ? t = !1 : (n = i(n).find(d)[0]) && i(n).removeClass(s)), t && (e.checked = !i(this._element).hasClass(s), i(this._element).trigger("change")), e.focus()) : this._element.setAttribute("aria-pressed", !i(this._element).hasClass(s)), t && i(this._element).toggleClass(s)
                    }, m.prototype.dispose = function () {
                        i.removeData(this._element, n), this._element = null
                    }, m._jQueryInterface = function (t) {
                        return this.each(function () {
                            var e = i(this).data(n);
                            e || (e = new m(this), i(this).data(n, e)), "toggle" === t && e[t]()
                        })
                    }, _(m, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }]), m);

                function m(e) {
                    w(this, m), this._element = e
                }

                i(document).on(r.CLICK_DATA_API, c, function (e) {
                    e.preventDefault();
                    e = e.target;
                    i(e).hasClass(a) || (e = i(e).closest(h)), p._jQueryInterface.call(i(e), "toggle")
                }).on(r.FOCUS_BLUR_DATA_API, c, function (e) {
                    var t = i(e.target).closest(h)[0];
                    i(t).toggleClass(l, /^focus(in)?$/.test(e.type))
                }), i.fn[e] = p._jQueryInterface, i.fn[e].Constructor = p, i.fn[e].noConflict = function () {
                    return i.fn[e] = o, p._jQueryInterface
                }
            }(jQuery), function (a) {
                var t = "carousel", r = "bs.carousel", e = "." + r, n = ".data-api", i = a.fn[t],
                    o = {interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0}, s = {
                        interval: "(number|boolean)",
                        keyboard: "boolean",
                        slide: "(boolean|string)",
                        pause: "(string|boolean)",
                        wrap: "boolean"
                    }, l = "next", c = "prev", u = {
                        SLIDE: "slide" + e,
                        SLID: "slid" + e,
                        KEYDOWN: "keydown" + e,
                        MOUSEENTER: "mouseenter" + e,
                        MOUSELEAVE: "mouseleave" + e,
                        LOAD_DATA_API: "load" + e + n,
                        CLICK_DATA_API: "click" + e + n
                    }, f = "carousel", d = "active", h = "slide", p = "right", m = "left", g = {
                        ACTIVE: ".active",
                        ACTIVE_ITEM: ".active.carousel-item",
                        ITEM: ".carousel-item",
                        NEXT_PREV: ".next, .prev",
                        INDICATORS: ".carousel-indicators",
                        DATA_SLIDE: "[data-slide], [data-slide-to]",
                        DATA_RIDE: '[data-ride="carousel"]'
                    }, y = (v.prototype.next = function () {
                        this._isSliding || this._slide(l)
                    }, v.prototype.nextWhenVisible = function () {
                        document.hidden || this.next()
                    }, v.prototype.prev = function () {
                        this._isSliding || this._slide(c)
                    }, v.prototype.pause = function (e) {
                        e || (this._isPaused = !0), a(this._element).find(g.NEXT_PREV)[0] && S.supportsTransitionEnd() && (S.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null
                    }, v.prototype.cycle = function (e) {
                        e || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval(a.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval))
                    }, v.prototype.to = function (e) {
                        var t = this;
                        this._activeElement = a(this._element).find(g.ACTIVE_ITEM)[0];
                        var n = this._getItemIndex(this._activeElement);
                        if (!(e > this._items.length - 1 || e < 0)) if (this._isSliding) a(this._element).one(u.SLID, function () {
                            return t.to(e)
                        }); else {
                            if (n === e) return this.pause(), void this.cycle();
                            this._slide(n < e ? l : c, this._items[e])
                        }
                    }, v.prototype.dispose = function () {
                        a(this._element).off(e), a.removeData(this._element, r), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null
                    }, v.prototype._getConfig = function (e) {
                        return e = a.extend({}, o, e), S.typeCheckConfig(t, e, s), e
                    }, v.prototype._addEventListeners = function () {
                        this._config.keyboard && a(this._element).on(u.KEYDOWN, a.proxy(this._keydown, this)), "hover" !== this._config.pause || "ontouchstart" in document.documentElement || a(this._element).on(u.MOUSEENTER, a.proxy(this.pause, this)).on(u.MOUSELEAVE, a.proxy(this.cycle, this))
                    }, v.prototype._keydown = function (e) {
                        if (e.preventDefault(), !/input|textarea/i.test(e.target.tagName)) switch (e.which) {
                            case 37:
                                this.prev();
                                break;
                            case 39:
                                this.next();
                                break;
                            default:
                                return
                        }
                    }, v.prototype._getItemIndex = function (e) {
                        return this._items = a.makeArray(a(e).parent().find(g.ITEM)), this._items.indexOf(e)
                    }, v.prototype._getItemByDirection = function (e, t) {
                        var n = e === l, i = e === c, r = this._getItemIndex(t), o = this._items.length - 1;
                        if ((i && 0 === r || n && r === o) && !this._config.wrap) return t;
                        e = (r + (e === c ? -1 : 1)) % this._items.length;
                        return -1 == e ? this._items[this._items.length - 1] : this._items[e]
                    }, v.prototype._triggerSlideEvent = function (e, t) {
                        t = a.Event(u.SLIDE, {relatedTarget: e, direction: t});
                        return a(this._element).trigger(t), t
                    }, v.prototype._setActiveIndicatorElement = function (e) {
                        this._indicatorsElement && (a(this._indicatorsElement).find(g.ACTIVE).removeClass(d), (e = this._indicatorsElement.children[this._getItemIndex(e)]) && a(e).addClass(d))
                    }, v.prototype._slide = function (e, t) {
                        var n, i = this, r = a(this._element).find(g.ACTIVE_ITEM)[0],
                            o = t || r && this._getItemByDirection(e, r), t = Boolean(this._interval), s = e === l ? m : p;
                        o && a(o).hasClass(d) ? this._isSliding = !1 : !this._triggerSlideEvent(o, s).isDefaultPrevented() && r && o && (this._isSliding = !0, t && this.pause(), this._setActiveIndicatorElement(o), n = a.Event(u.SLID, {
                            relatedTarget: o,
                            direction: s
                        }), S.supportsTransitionEnd() && a(this._element).hasClass(h) ? (a(o).addClass(e), S.reflow(o), a(r).addClass(s), a(o).addClass(s), a(r).one(S.TRANSITION_END, function () {
                            a(o).removeClass(s).removeClass(e), a(o).addClass(d), a(r).removeClass(d).removeClass(e).removeClass(s), i._isSliding = !1, setTimeout(function () {
                                return a(i._element).trigger(n)
                            }, 0)
                        }).emulateTransitionEnd(600)) : (a(r).removeClass(d), a(o).addClass(d), this._isSliding = !1, a(this._element).trigger(n)), t && this.cycle())
                    }, v._jQueryInterface = function (i) {
                        return this.each(function () {
                            var e = a(this).data(r), t = a.extend({}, o, a(this).data());
                            "object" === (void 0 === i ? "undefined" : x(i)) && a.extend(t, i);
                            var n = "string" == typeof i ? i : t.slide;
                            if (e || (e = new v(this, t), a(this).data(r, e)), "number" == typeof i) e.to(i); else if ("string" == typeof n) {
                                if (void 0 === e[n]) throw new Error('No method named "' + n + '"');
                                e[n]()
                            } else t.interval && (e.pause(), e.cycle())
                        })
                    }, v._dataApiClickHandler = function (e) {
                        var t, n, i = S.getSelectorFromElement(this);
                        !i || (t = a(i)[0]) && a(t).hasClass(f) && (n = a.extend({}, a(t).data(), a(this).data()), (i = this.getAttribute("data-slide-to")) && (n.interval = !1), v._jQueryInterface.call(a(t), n), i && a(t).data(r).to(i), e.preventDefault())
                    }, _(v, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }, {
                        key: "Default", get: function () {
                            return o
                        }
                    }]), v);

                function v(e, t) {
                    w(this, v), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this._config = this._getConfig(t), this._element = a(e)[0], this._indicatorsElement = a(this._element).find(g.INDICATORS)[0], this._addEventListeners()
                }

                a(document).on(u.CLICK_DATA_API, g.DATA_SLIDE, y._dataApiClickHandler), a(window).on(u.LOAD_DATA_API, function () {
                    a(g.DATA_RIDE).each(function () {
                        var e = a(this);
                        y._jQueryInterface.call(e, e.data())
                    })
                }), a.fn[t] = y._jQueryInterface, a.fn[t].Constructor = y, a.fn[t].noConflict = function () {
                    return a.fn[t] = i, y._jQueryInterface
                }
            }(jQuery), function (o) {
                var t = "collapse", s = "bs.collapse", e = "." + s, n = o.fn[t], r = {toggle: !0, parent: ""},
                    i = {toggle: "boolean", parent: "string"}, a = {
                        SHOW: "show" + e,
                        SHOWN: "shown" + e,
                        HIDE: "hide" + e,
                        HIDDEN: "hidden" + e,
                        CLICK_DATA_API: "click" + e + ".data-api"
                    }, l = "in", c = "collapse", u = "collapsing", f = "collapsed", d = "width", h = "height",
                    p = ".card > .in, .card > .collapsing", e = '[data-toggle="collapse"]',
                    m = (g.prototype.toggle = function () {
                        o(this._element).hasClass(l) ? this.hide() : this.show()
                    }, g.prototype.show = function () {
                        var e, t, n, i, r = this;
                        this._isTransitioning || o(this._element).hasClass(l) || (n = i = void 0, this._parent && ((i = o.makeArray(o(p))).length || (i = null)), i && ((n = o(i).data(s)) && n._isTransitioning) || (e = o.Event(a.SHOW), o(this._element).trigger(e), e.isDefaultPrevented() || (i && (g._jQueryInterface.call(o(i), "hide"), n || o(i).data(s, null)), t = this._getDimension(), o(this._element).removeClass(c).addClass(u), this._element.style[t] = 0, this._element.setAttribute("aria-expanded", !0), this._triggerArray.length && o(this._triggerArray).removeClass(f).attr("aria-expanded", !0), this.setTransitioning(!0), n = function () {
                            o(r._element).removeClass(u).addClass(c).addClass(l), r._element.style[t] = "", r.setTransitioning(!1), o(r._element).trigger(a.SHOWN)
                        }, S.supportsTransitionEnd() ? (i = "scroll" + (t[0].toUpperCase() + t.slice(1)), o(this._element).one(S.TRANSITION_END, n).emulateTransitionEnd(600), this._element.style[t] = this._element[i] + "px") : n())))
                    }, g.prototype.hide = function () {
                        var e = this;
                        if (!this._isTransitioning && o(this._element).hasClass(l)) {
                            var t = o.Event(a.HIDE);
                            if (o(this._element).trigger(t), !t.isDefaultPrevented()) {
                                var n = this._getDimension();
                                this._element.style[n] = this._element[n === d ? "offsetWidth" : "offsetHeight"] + "px", S.reflow(this._element), o(this._element).addClass(u).removeClass(c).removeClass(l), this._element.setAttribute("aria-expanded", !1), this._triggerArray.length && o(this._triggerArray).addClass(f).attr("aria-expanded", !1), this.setTransitioning(!0);
                                t = function () {
                                    e.setTransitioning(!1), o(e._element).removeClass(u).addClass(c).trigger(a.HIDDEN)
                                };
                                return this._element.style[n] = "", S.supportsTransitionEnd() ? void o(this._element).one(S.TRANSITION_END, t).emulateTransitionEnd(600) : void t()
                            }
                        }
                    }, g.prototype.setTransitioning = function (e) {
                        this._isTransitioning = e
                    }, g.prototype.dispose = function () {
                        o.removeData(this._element, s), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                    }, g.prototype._getConfig = function (e) {
                        return (e = o.extend({}, r, e)).toggle = Boolean(e.toggle), S.typeCheckConfig(t, e, i), e
                    }, g.prototype._getDimension = function () {
                        return o(this._element).hasClass(d) ? d : h
                    }, g.prototype._getParent = function () {
                        var n = this, e = o(this._config.parent)[0],
                            t = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';
                        return o(e).find(t).each(function (e, t) {
                            n._addAriaAndCollapsedClass(g._getTargetFromElement(t), [t])
                        }), e
                    }, g.prototype._addAriaAndCollapsedClass = function (e, t) {
                        var n;
                        e && (n = o(e).hasClass(l), e.setAttribute("aria-expanded", n), t.length && o(t).toggleClass(f, !n).attr("aria-expanded", n))
                    }, g._getTargetFromElement = function (e) {
                        e = S.getSelectorFromElement(e);
                        return e ? o(e)[0] : null
                    }, g._jQueryInterface = function (i) {
                        return this.each(function () {
                            var e = o(this), t = e.data(s),
                                n = o.extend({}, r, e.data(), "object" === (void 0 === i ? "undefined" : x(i)) && i);
                            if (!t && n.toggle && /show|hide/.test(i) && (n.toggle = !1), t || (t = new g(this, n), e.data(s, t)), "string" == typeof i) {
                                if (void 0 === t[i]) throw new Error('No method named "' + i + '"');
                                t[i]()
                            }
                        })
                    }, _(g, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }, {
                        key: "Default", get: function () {
                            return r
                        }
                    }]), g);

                function g(e, t) {
                    w(this, g), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(t), this._triggerArray = o.makeArray(o('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]')), this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle()
                }

                o(document).on(a.CLICK_DATA_API, e, function (e) {
                    e.preventDefault();
                    var t = m._getTargetFromElement(this), e = o(t).data(s) ? "toggle" : o(this).data();
                    m._jQueryInterface.call(o(t), e)
                }), o.fn[t] = m._jQueryInterface, o.fn[t].Constructor = m, o.fn[t].noConflict = function () {
                    return o.fn[t] = n, m._jQueryInterface
                }
            }(jQuery), function (a) {
                var e = "dropdown", n = "bs.dropdown", t = "." + n, i = ".data-api", r = a.fn[e], l = {
                        HIDE: "hide" + t,
                        HIDDEN: "hidden" + t,
                        SHOW: "show" + t,
                        SHOWN: "shown" + t,
                        CLICK: "click" + t,
                        CLICK_DATA_API: "click" + t + i,
                        KEYDOWN_DATA_API: "keydown" + t + i
                    }, o = "dropdown-backdrop", s = "disabled", c = "open", u = ".dropdown-backdrop",
                    f = '[data-toggle="dropdown"]', d = ".dropdown form", h = '[role="menu"]', i = '[role="listbox"]',
                    p = ".navbar-nav", m = '[role="menu"] li:not(.disabled) a, [role="listbox"] li:not(.disabled) a',
                    g = (y.prototype.toggle = function () {
                        if (this.disabled || a(this).hasClass(s)) return !1;
                        var e = y._getParentFromElement(this), t = a(e).hasClass(c);
                        if (y._clearMenus(), t) return !1;
                        "ontouchstart" in document.documentElement && !a(e).closest(p).length && ((n = document.createElement("div")).className = o, a(n).insertBefore(this), a(n).on("click", y._clearMenus));
                        var t = {relatedTarget: this}, n = a.Event(l.SHOW, t);
                        return a(e).trigger(n), !n.isDefaultPrevented() && (this.focus(), this.setAttribute("aria-expanded", "true"), a(e).toggleClass(c), a(e).trigger(a.Event(l.SHOWN, t)), !1)
                    }, y.prototype.dispose = function () {
                        a.removeData(this._element, n), a(this._element).off(t), this._element = null
                    }, y.prototype._addEventListeners = function () {
                        a(this._element).on(l.CLICK, this.toggle)
                    }, y._jQueryInterface = function (t) {
                        return this.each(function () {
                            var e = a(this).data(n);
                            if (e || a(this).data(n, e = new y(this)), "string" == typeof t) {
                                if (void 0 === e[t]) throw new Error('No method named "' + t + '"');
                                e[t].call(this)
                            }
                        })
                    }, y._clearMenus = function (e) {
                        if (!e || 3 !== e.which) {
                            var t = a(u)[0];
                            t && t.parentNode.removeChild(t);
                            for (var n = a.makeArray(a(f)), i = 0; i < n.length; i++) {
                                var r, o = y._getParentFromElement(n[i]), s = {relatedTarget: n[i]};
                                !a(o).hasClass(c) || e && "click" === e.type && /input|textarea/i.test(e.target.tagName) && a.contains(o, e.target) || (r = a.Event(l.HIDE, s), a(o).trigger(r), r.isDefaultPrevented() || (n[i].setAttribute("aria-expanded", "false"), a(o).removeClass(c).trigger(a.Event(l.HIDDEN, s))))
                            }
                        }
                    }, y._getParentFromElement = function (e) {
                        var t = void 0, n = S.getSelectorFromElement(e);
                        return (t = n ? a(n)[0] : t) || e.parentNode
                    }, y._dataApiKeydownHandler = function (e) {
                        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !a(this).hasClass(s))) {
                            var t = y._getParentFromElement(this), n = a(t).hasClass(c);
                            if (!n && 27 !== e.which || n && 27 === e.which) return 27 === e.which && (i = a(t).find(f)[0], a(i).trigger("focus")), void a(this).trigger("click");
                            var i, t = a.makeArray(a(m));
                            (t = t.filter(function (e) {
                                return e.offsetWidth || e.offsetHeight
                            })).length && (i = t.indexOf(e.target), 38 === e.which && 0 < i && i--, 40 === e.which && i < t.length - 1 && i++, t[i = i < 0 ? 0 : i].focus())
                        }
                    }, _(y, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }]), y);

                function y(e) {
                    w(this, y), this._element = e, this._addEventListeners()
                }

                a(document).on(l.KEYDOWN_DATA_API, f, g._dataApiKeydownHandler).on(l.KEYDOWN_DATA_API, h, g._dataApiKeydownHandler).on(l.KEYDOWN_DATA_API, i, g._dataApiKeydownHandler).on(l.CLICK_DATA_API, g._clearMenus).on(l.CLICK_DATA_API, f, g.prototype.toggle).on(l.CLICK_DATA_API, d, function (e) {
                    e.stopPropagation()
                }), a.fn[e] = g._jQueryInterface, a.fn[e].Constructor = g, a.fn[e].noConflict = function () {
                    return a.fn[e] = r, g._jQueryInterface
                }
            }(jQuery), function (o) {
                var t = "modal", s = "bs.modal", e = "." + s, n = o.fn[t],
                    i = {backdrop: !0, keyboard: !0, focus: !0, show: !0},
                    r = {backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean"}, a = {
                        HIDE: "hide" + e,
                        HIDDEN: "hidden" + e,
                        SHOW: "show" + e,
                        SHOWN: "shown" + e,
                        FOCUSIN: "focusin" + e,
                        RESIZE: "resize" + e,
                        CLICK_DISMISS: "click.dismiss" + e,
                        KEYDOWN_DISMISS: "keydown.dismiss" + e,
                        MOUSEUP_DISMISS: "mouseup.dismiss" + e,
                        MOUSEDOWN_DISMISS: "mousedown.dismiss" + e,
                        CLICK_DATA_API: "click" + e + ".data-api"
                    }, l = "modal-scrollbar-measure", c = "modal-backdrop", u = "modal-open", f = "fade", d = "in", h = {
                        DIALOG: ".modal-dialog",
                        DATA_TOGGLE: '[data-toggle="modal"]',
                        DATA_DISMISS: '[data-dismiss="modal"]',
                        FIXED_CONTENT: ".navbar-fixed-top, .navbar-fixed-bottom, .is-fixed"
                    }, p = (m.prototype.toggle = function (e) {
                        return this._isShown ? this.hide() : this.show(e)
                    }, m.prototype.show = function (e) {
                        var t = this, n = o.Event(a.SHOW, {relatedTarget: e});
                        o(this._element).trigger(n), this._isShown || n.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), o(document.body).addClass(u), this._setEscapeEvent(), this._setResizeEvent(), o(this._element).on(a.CLICK_DISMISS, h.DATA_DISMISS, o.proxy(this.hide, this)), o(this._dialog).on(a.MOUSEDOWN_DISMISS, function () {
                            o(t._element).one(a.MOUSEUP_DISMISS, function (e) {
                                o(e.target).is(t._element) && (t._ignoreBackdropClick = !0)
                            })
                        }), this._showBackdrop(o.proxy(this._showElement, this, e)))
                    }, m.prototype.hide = function (e) {
                        e && e.preventDefault();
                        e = o.Event(a.HIDE);
                        o(this._element).trigger(e), this._isShown && !e.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), o(document).off(a.FOCUSIN), o(this._element).removeClass(d), o(this._element).off(a.CLICK_DISMISS), o(this._dialog).off(a.MOUSEDOWN_DISMISS), S.supportsTransitionEnd() && o(this._element).hasClass(f) ? o(this._element).one(S.TRANSITION_END, o.proxy(this._hideModal, this)).emulateTransitionEnd(300) : this._hideModal())
                    }, m.prototype.dispose = function () {
                        o.removeData(this._element, s), o(window).off(e), o(document).off(e), o(this._element).off(e), o(this._backdrop).off(e), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._originalBodyPadding = null, this._scrollbarWidth = null
                    }, m.prototype._getConfig = function (e) {
                        return e = o.extend({}, i, e), S.typeCheckConfig(t, e, r), e
                    }, m.prototype._showElement = function (e) {
                        var t = this, n = S.supportsTransitionEnd() && o(this._element).hasClass(f);
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, n && S.reflow(this._element), o(this._element).addClass(d), this._config.focus && this._enforceFocus();
                        var i = o.Event(a.SHOWN, {relatedTarget: e}), e = function () {
                            t._config.focus && t._element.focus(), o(t._element).trigger(i)
                        };
                        n ? o(this._dialog).one(S.TRANSITION_END, e).emulateTransitionEnd(300) : e()
                    }, m.prototype._enforceFocus = function () {
                        var t = this;
                        o(document).off(a.FOCUSIN).on(a.FOCUSIN, function (e) {
                            document === e.target || t._element === e.target || o(t._element).has(e.target).length || t._element.focus()
                        })
                    }, m.prototype._setEscapeEvent = function () {
                        var t = this;
                        this._isShown && this._config.keyboard ? o(this._element).on(a.KEYDOWN_DISMISS, function (e) {
                            27 === e.which && t.hide()
                        }) : this._isShown || o(this._element).off(a.KEYDOWN_DISMISS)
                    }, m.prototype._setResizeEvent = function () {
                        this._isShown ? o(window).on(a.RESIZE, o.proxy(this._handleUpdate, this)) : o(window).off(a.RESIZE)
                    }, m.prototype._hideModal = function () {
                        var e = this;
                        this._element.style.display = "none", this._element.setAttribute("aria-hidden", "true"), this._showBackdrop(function () {
                            o(document.body).removeClass(u), e._resetAdjustments(), e._resetScrollbar(), o(e._element).trigger(a.HIDDEN)
                        })
                    }, m.prototype._removeBackdrop = function () {
                        this._backdrop && (o(this._backdrop).remove(), this._backdrop = null)
                    }, m.prototype._showBackdrop = function (e) {
                        var t, n = this, i = o(this._element).hasClass(f) ? f : "";
                        this._isShown && this._config.backdrop ? (t = S.supportsTransitionEnd() && i, this._backdrop = document.createElement("div"), this._backdrop.className = c, i && o(this._backdrop).addClass(i), o(this._backdrop).appendTo(document.body), o(this._element).on(a.CLICK_DISMISS, function (e) {
                            return n._ignoreBackdropClick ? void (n._ignoreBackdropClick = !1) : void (e.target === e.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide()))
                        }), t && S.reflow(this._backdrop), o(this._backdrop).addClass(d), e && (t ? o(this._backdrop).one(S.TRANSITION_END, e).emulateTransitionEnd(150) : e())) : !this._isShown && this._backdrop ? (o(this._backdrop).removeClass(d), t = function () {
                            n._removeBackdrop(), e && e()
                        }, S.supportsTransitionEnd() && o(this._element).hasClass(f) ? o(this._backdrop).one(S.TRANSITION_END, t).emulateTransitionEnd(150) : t()) : e && e()
                    }, m.prototype._handleUpdate = function () {
                        this._adjustDialog()
                    }, m.prototype._adjustDialog = function () {
                        var e = this._element.scrollHeight > document.documentElement.clientHeight;
                        !this._isBodyOverflowing && e && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !e && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                    }, m.prototype._resetAdjustments = function () {
                        this._element.style.paddingLeft = "", this._element.style.paddingRight = ""
                    }, m.prototype._checkScrollbar = function () {
                        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth()
                    }, m.prototype._setScrollbar = function () {
                        var e = parseInt(o(h.FIXED_CONTENT).css("padding-right") || 0, 10);
                        this._originalBodyPadding = document.body.style.paddingRight || "", this._isBodyOverflowing && (document.body.style.paddingRight = e + this._scrollbarWidth + "px")
                    }, m.prototype._resetScrollbar = function () {
                        document.body.style.paddingRight = this._originalBodyPadding
                    }, m.prototype._getScrollbarWidth = function () {
                        var e = document.createElement("div");
                        e.className = l, document.body.appendChild(e);
                        var t = e.offsetWidth - e.clientWidth;
                        return document.body.removeChild(e), t
                    }, m._jQueryInterface = function (n, i) {
                        return this.each(function () {
                            var e = o(this).data(s),
                                t = o.extend({}, m.Default, o(this).data(), "object" === (void 0 === n ? "undefined" : x(n)) && n);
                            if (e || (e = new m(this, t), o(this).data(s, e)), "string" == typeof n) {
                                if (void 0 === e[n]) throw new Error('No method named "' + n + '"');
                                e[n](i)
                            } else t.show && e.show(i)
                        })
                    }, _(m, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }, {
                        key: "Default", get: function () {
                            return i
                        }
                    }]), m);

                function m(e, t) {
                    w(this, m), this._config = this._getConfig(t), this._element = e, this._dialog = o(e).find(h.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0
                }

                o(document).on(a.CLICK_DATA_API, h.DATA_TOGGLE, function (e) {
                    var t = this, n = void 0, i = S.getSelectorFromElement(this);
                    i && (n = o(i)[0]);
                    i = o(n).data(s) ? "toggle" : o.extend({}, o(n).data(), o(this).data());
                    "A" === this.tagName && e.preventDefault();
                    var r = o(n).one(a.SHOW, function (e) {
                        e.isDefaultPrevented() || r.one(a.HIDDEN, function () {
                            o(t).is(":visible") && t.focus()
                        })
                    });
                    p._jQueryInterface.call(o(n), i, this)
                }), o.fn[t] = p._jQueryInterface, o.fn[t].Constructor = p, o.fn[t].noConflict = function () {
                    return o.fn[t] = n, p._jQueryInterface
                }
            }(jQuery), function (r) {
                var n = "scrollspy", i = "bs.scrollspy", e = "." + i, t = r.fn[n],
                    o = {offset: 10, method: "auto", target: ""},
                    s = {offset: "number", method: "string", target: "(string|element)"},
                    a = {ACTIVATE: "activate" + e, SCROLL: "scroll" + e, LOAD_DATA_API: "load" + e + ".data-api"},
                    l = "dropdown-item", c = "active", u = {
                        DATA_SPY: '[data-spy="scroll"]',
                        ACTIVE: ".active",
                        LIST_ITEM: ".list-item",
                        LI: "li",
                        LI_DROPDOWN: "li.dropdown",
                        NAV_LINKS: ".nav-link",
                        DROPDOWN: ".dropdown",
                        DROPDOWN_ITEMS: ".dropdown-item",
                        DROPDOWN_TOGGLE: ".dropdown-toggle"
                    }, f = "offset", d = "position", h = (p.prototype.refresh = function () {
                        var t = this, e = this._scrollElement !== this._scrollElement.window ? d : f,
                            n = "auto" === this._config.method ? e : this._config.method,
                            i = n === d ? this._getScrollTop() : 0;
                        this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), r.makeArray(r(this._selector)).map(function (e) {
                            var t = void 0, e = S.getSelectorFromElement(e);
                            return (t = e ? r(e)[0] : t) && (t.offsetWidth || t.offsetHeight) ? [r(t)[n]().top + i, e] : null
                        }).filter(function (e) {
                            return e
                        }).sort(function (e, t) {
                            return e[0] - t[0]
                        }).forEach(function (e) {
                            t._offsets.push(e[0]), t._targets.push(e[1])
                        })
                    }, p.prototype.dispose = function () {
                        r.removeData(this._element, i), r(this._scrollElement).off(e), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null
                    }, p.prototype._getConfig = function (e) {
                        var t;
                        return "string" != typeof (e = r.extend({}, o, e)).target && ((t = r(e.target).attr("id")) || (t = S.getUID(n), r(e.target).attr("id", t)), e.target = "#" + t), S.typeCheckConfig(n, e, s), e
                    }, p.prototype._getScrollTop = function () {
                        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop
                    }, p.prototype._getScrollHeight = function () {
                        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                    }, p.prototype._process = function () {
                        var e = this._getScrollTop() + this._config.offset, t = this._getScrollHeight(),
                            n = this._config.offset + t - this._scrollElement.offsetHeight;
                        if (this._scrollHeight !== t && this.refresh(), n <= e && (n = this._targets[this._targets.length - 1], this._activeTarget !== n && this._activate(n)), this._activeTarget && e < this._offsets[0]) return this._activeTarget = null, void this._clear();
                        for (var i = this._offsets.length; i--;) this._activeTarget !== this._targets[i] && e >= this._offsets[i] && (void 0 === this._offsets[i + 1] || e < this._offsets[i + 1]) && this._activate(this._targets[i])
                    }, p.prototype._activate = function (t) {
                        this._activeTarget = t, this._clear();
                        var e = (e = this._selector.split(",")).map(function (e) {
                            return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                        }), e = r(e.join(","));
                        e.hasClass(l) ? (e.closest(u.DROPDOWN).find(u.DROPDOWN_TOGGLE).addClass(c), e.addClass(c)) : e.parents(u.LI).find(u.NAV_LINKS).addClass(c), r(this._scrollElement).trigger(a.ACTIVATE, {relatedTarget: t})
                    }, p.prototype._clear = function () {
                        r(this._selector).filter(u.ACTIVE).removeClass(c)
                    }, p._jQueryInterface = function (n) {
                        return this.each(function () {
                            var e = r(this).data(i), t = "object" === (void 0 === n ? "undefined" : x(n)) && n || null;
                            if (e || (e = new p(this, t), r(this).data(i, e)), "string" == typeof n) {
                                if (void 0 === e[n]) throw new Error('No method named "' + n + '"');
                                e[n]()
                            }
                        })
                    }, _(p, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }, {
                        key: "Default", get: function () {
                            return o
                        }
                    }]), p);

                function p(e, t) {
                    w(this, p), this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(t), this._selector = this._config.target + " " + u.NAV_LINKS + "," + this._config.target + " " + u.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, r(this._scrollElement).on(a.SCROLL, r.proxy(this._process, this)), this.refresh(), this._process()
                }

                r(window).on(a.LOAD_DATA_API, function () {
                    for (var e = r.makeArray(r(u.DATA_SPY)), t = e.length; t--;) {
                        var n = r(e[t]);
                        h._jQueryInterface.call(n, n.data())
                    }
                }), r.fn[n] = h._jQueryInterface, r.fn[n].Constructor = h, r.fn[n].noConflict = function () {
                    return r.fn[n] = t, h._jQueryInterface
                }
            }(jQuery), function (a) {
                var i = "bs.tab", e = "." + i, t = a.fn.tab, l = {
                        HIDE: "hide" + e,
                        HIDDEN: "hidden" + e,
                        SHOW: "show" + e,
                        SHOWN: "shown" + e,
                        CLICK_DATA_API: "click" + e + ".data-api"
                    }, o = "dropdown-menu", c = "active", s = "fade", u = "in", f = ".dropdown",
                    d = "ul:not(.dropdown-menu)", r = "> .nav-item .fade, > .fade", h = ".active",
                    p = "> .nav-item > .active, > .active", e = '[data-toggle="tab"], [data-toggle="pill"]',
                    m = ".dropdown-toggle", g = "> .dropdown-menu .active", n = (y.prototype.show = function () {
                        var e, n, t, i, r, o, s = this;
                        this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && a(this._element).hasClass(c) || (n = e = void 0, o = a(this._element).closest(d)[0], t = S.getSelectorFromElement(this._element), o && (n = (n = a.makeArray(a(o).find(h)))[n.length - 1]), i = a.Event(l.HIDE, {relatedTarget: this._element}), r = a.Event(l.SHOW, {relatedTarget: n}), n && a(n).trigger(i), a(this._element).trigger(r), r.isDefaultPrevented() || i.isDefaultPrevented() || (t && (e = a(t)[0]), this._activate(this._element, o), o = function () {
                            var e = a.Event(l.HIDDEN, {relatedTarget: s._element}),
                                t = a.Event(l.SHOWN, {relatedTarget: n});
                            a(n).trigger(e), a(s._element).trigger(t)
                        }, e ? this._activate(e, e.parentNode, o) : o()))
                    }, y.prototype.dispose = function () {
                        a.removeClass(this._element, i), this._element = null
                    }, y.prototype._activate = function (e, t, n) {
                        var i = a(t).find(p)[0],
                            t = n && S.supportsTransitionEnd() && (i && a(i).hasClass(s) || Boolean(a(t).find(r)[0])),
                            n = a.proxy(this._transitionComplete, this, e, i, t, n);
                        i && t ? a(i).one(S.TRANSITION_END, n).emulateTransitionEnd(150) : n(), i && a(i).removeClass(u)
                    }, y.prototype._transitionComplete = function (e, t, n, i) {
                        var r;
                        t && (a(t).removeClass(c), (r = a(t).find(g)[0]) && a(r).removeClass(c), t.setAttribute("aria-expanded", !1)), a(e).addClass(c), e.setAttribute("aria-expanded", !0), n ? (S.reflow(e), a(e).addClass(u)) : a(e).removeClass(s), e.parentNode && a(e.parentNode).hasClass(o) && ((n = a(e).closest(f)[0]) && a(n).find(m).addClass(c), e.setAttribute("aria-expanded", !0)), i && i()
                    }, y._jQueryInterface = function (n) {
                        return this.each(function () {
                            var e = a(this), t = e.data(i);
                            if (t || (t = new y(this), e.data(i, t)), "string" == typeof n) {
                                if (void 0 === t[n]) throw new Error('No method named "' + n + '"');
                                t[n]()
                            }
                        })
                    }, _(y, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }]), y);

                function y(e) {
                    w(this, y), this._element = e
                }

                a(document).on(l.CLICK_DATA_API, e, function (e) {
                    e.preventDefault(), n._jQueryInterface.call(a(this), "show")
                }), a.fn.tab = n._jQueryInterface, a.fn.tab.Constructor = n, a.fn.tab.noConflict = function () {
                    return a.fn.tab = t, n._jQueryInterface
                }
            }(jQuery), m = function (o) {
                if (void 0 === window.Tether) throw new Error("Bootstrap tooltips require Tether (http://tether.io/)");
                var t = "tooltip", i = "bs.tooltip", e = "." + i, n = o.fn[t], r = {
                        animation: !0,
                        template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
                        trigger: "hover focus",
                        title: "",
                        delay: 0,
                        html: !1,
                        selector: !1,
                        placement: "top",
                        offset: "0 0",
                        constraints: []
                    }, s = {
                        animation: "boolean",
                        template: "string",
                        title: "(string|element|function)",
                        trigger: "string",
                        delay: "(number|object)",
                        html: "boolean",
                        selector: "(string|boolean)",
                        placement: "(string|function)",
                        offset: "string",
                        constraints: "array"
                    }, a = {TOP: "bottom center", RIGHT: "middle left", BOTTOM: "top center", LEFT: "middle right"},
                    l = "in", c = "out", u = {
                        HIDE: "hide" + e,
                        HIDDEN: "hidden" + e,
                        SHOW: "show" + e,
                        SHOWN: "shown" + e,
                        INSERTED: "inserted" + e,
                        CLICK: "click" + e,
                        FOCUSIN: "focusin" + e,
                        FOCUSOUT: "focusout" + e,
                        MOUSEENTER: "mouseenter" + e,
                        MOUSELEAVE: "mouseleave" + e
                    }, f = "fade", d = "in", h = ".tooltip-inner", p = {element: !1, enabled: !1}, m = "hover", g = "focus",
                    y = "manual", v = (b.prototype.enable = function () {
                        this._isEnabled = !0
                    }, b.prototype.disable = function () {
                        this._isEnabled = !1
                    }, b.prototype.toggleEnabled = function () {
                        this._isEnabled = !this._isEnabled
                    }, b.prototype.toggle = function (e) {
                        var t, n;
                        e ? (t = this.constructor.DATA_KEY, (n = o(e.currentTarget).data(t)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), o(e.currentTarget).data(t, n)), n._activeTrigger.click = !n._activeTrigger.click, n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)) : o(this.getTipElement()).hasClass(d) ? this._leave(null, this) : this._enter(null, this)
                    }, b.prototype.dispose = function () {
                        clearTimeout(this._timeout), this.cleanupTether(), o.removeData(this.element, this.constructor.DATA_KEY), o(this.element).off(this.constructor.EVENT_KEY), this.tip && o(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, this._tether = null, this.element = null, this.config = null, this.tip = null
                    }, b.prototype.show = function () {
                        var e, t = this, n = o.Event(this.constructor.Event.SHOW);
                        this.isWithContent() && this._isEnabled && (o(this.element).trigger(n), e = o.contains(this.element.ownerDocument.documentElement, this.element), !n.isDefaultPrevented() && e && (n = this.getTipElement(), e = S.getUID(this.constructor.NAME), n.setAttribute("id", e), this.element.setAttribute("aria-describedby", e), this.setContent(), this.config.animation && o(n).addClass(f), e = "function" == typeof this.config.placement ? this.config.placement.call(this, n, this.element) : this.config.placement, e = this._getAttachment(e), o(n).data(this.constructor.DATA_KEY, this).appendTo(document.body), o(this.element).trigger(this.constructor.Event.INSERTED), this._tether = new Tether({
                            attachment: e,
                            element: n,
                            target: this.element,
                            classes: p,
                            classPrefix: "bs-tether",
                            offset: this.config.offset,
                            constraints: this.config.constraints,
                            addTargetClasses: !1
                        }), S.reflow(n), this._tether.position(), o(n).addClass(d), n = function () {
                            var e = t._hoverState;
                            t._hoverState = null, o(t.element).trigger(t.constructor.Event.SHOWN), e === c && t._leave(null, t)
                        }, S.supportsTransitionEnd() && o(this.tip).hasClass(f) ? o(this.tip).one(S.TRANSITION_END, n).emulateTransitionEnd(b._TRANSITION_DURATION) : n()))
                    }, b.prototype.hide = function (e) {
                        function t() {
                            n._hoverState !== l && i.parentNode && i.parentNode.removeChild(i), n.element.removeAttribute("aria-describedby"), o(n.element).trigger(n.constructor.Event.HIDDEN), n.cleanupTether(), e && e()
                        }

                        var n = this, i = this.getTipElement(), r = o.Event(this.constructor.Event.HIDE);
                        o(this.element).trigger(r), r.isDefaultPrevented() || (o(i).removeClass(d), S.supportsTransitionEnd() && o(this.tip).hasClass(f) ? o(i).one(S.TRANSITION_END, t).emulateTransitionEnd(150) : t(), this._hoverState = "")
                    }, b.prototype.isWithContent = function () {
                        return Boolean(this.getTitle())
                    }, b.prototype.getTipElement = function () {
                        return this.tip = this.tip || o(this.config.template)[0]
                    }, b.prototype.setContent = function () {
                        var e = o(this.getTipElement());
                        this.setElementContent(e.find(h), this.getTitle()), e.removeClass(f).removeClass(d), this.cleanupTether()
                    }, b.prototype.setElementContent = function (e, t) {
                        var n = this.config.html;
                        "object" === (void 0 === t ? "undefined" : x(t)) && (t.nodeType || t.jquery) ? n ? o(t).parent().is(e) || e.empty().append(t) : e.text(o(t).text()) : e[n ? "html" : "text"](t)
                    }, b.prototype.getTitle = function () {
                        return this.element.getAttribute("data-original-title") || ("function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title)
                    }, b.prototype.cleanupTether = function () {
                        this._tether && this._tether.destroy()
                    }, b.prototype._getAttachment = function (e) {
                        return a[e.toUpperCase()]
                    }, b.prototype._setListeners = function () {
                        var n = this;
                        this.config.trigger.split(" ").forEach(function (e) {
                            var t;
                            "click" === e ? o(n.element).on(n.constructor.Event.CLICK, n.config.selector, o.proxy(n.toggle, n)) : e !== y && (t = e === m ? n.constructor.Event.MOUSEENTER : n.constructor.Event.FOCUSIN, e = e === m ? n.constructor.Event.MOUSELEAVE : n.constructor.Event.FOCUSOUT, o(n.element).on(t, n.config.selector, o.proxy(n._enter, n)).on(e, n.config.selector, o.proxy(n._leave, n)))
                        }), this.config.selector ? this.config = o.extend({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                    }, b.prototype._fixTitle = function () {
                        var e = x(this.element.getAttribute("data-original-title"));
                        !this.element.getAttribute("title") && "string" === e || (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""))
                    }, b.prototype._enter = function (e, t) {
                        var n = this.constructor.DATA_KEY;
                        return (t = t || o(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), o(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusin" === e.type ? g : m] = !0), o(t.getTipElement()).hasClass(d) || t._hoverState === l ? void (t._hoverState = l) : (clearTimeout(t._timeout), t._hoverState = l, t.config.delay && t.config.delay.show ? void (t._timeout = setTimeout(function () {
                            t._hoverState === l && t.show()
                        }, t.config.delay.show)) : void t.show())
                    }, b.prototype._leave = function (e, t) {
                        var n = this.constructor.DATA_KEY;
                        if ((t = t || o(e.currentTarget).data(n)) || (t = new this.constructor(e.currentTarget, this._getDelegateConfig()), o(e.currentTarget).data(n, t)), e && (t._activeTrigger["focusout" === e.type ? g : m] = !1), !t._isWithActiveTrigger()) return clearTimeout(t._timeout), t._hoverState = c, t.config.delay && t.config.delay.hide ? void (t._timeout = setTimeout(function () {
                            t._hoverState === c && t.hide()
                        }, t.config.delay.hide)) : void t.hide()
                    }, b.prototype._isWithActiveTrigger = function () {
                        for (var e in this._activeTrigger) if (this._activeTrigger[e]) return !0;
                        return !1
                    }, b.prototype._getConfig = function (e) {
                        return (e = o.extend({}, this.constructor.Default, o(this.element).data(), e)).delay && "number" == typeof e.delay && (e.delay = {
                            show: e.delay,
                            hide: e.delay
                        }), S.typeCheckConfig(t, e, this.constructor.DefaultType), e
                    }, b.prototype._getDelegateConfig = function () {
                        var e = {};
                        if (this.config) for (var t in this.config) this.constructor.Default[t] !== this.config[t] && (e[t] = this.config[t]);
                        return e
                    }, b._jQueryInterface = function (n) {
                        return this.each(function () {
                            var e = o(this).data(i), t = "object" === (void 0 === n ? "undefined" : x(n)) ? n : null;
                            if ((e || !/dispose|hide/.test(n)) && (e || (e = new b(this, t), o(this).data(i, e)), "string" == typeof n)) {
                                if (void 0 === e[n]) throw new Error('No method named "' + n + '"');
                                e[n]()
                            }
                        })
                    }, _(b, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }, {
                        key: "Default", get: function () {
                            return r
                        }
                    }, {
                        key: "NAME", get: function () {
                            return t
                        }
                    }, {
                        key: "DATA_KEY", get: function () {
                            return i
                        }
                    }, {
                        key: "Event", get: function () {
                            return u
                        }
                    }, {
                        key: "EVENT_KEY", get: function () {
                            return e
                        }
                    }, {
                        key: "DefaultType", get: function () {
                            return s
                        }
                    }]), b);

                function b(e, t) {
                    w(this, b), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._tether = null, this.element = e, this.config = this._getConfig(t), this.tip = null, this._setListeners()
                }

                return o.fn[t] = v._jQueryInterface, o.fn[t].Constructor = v, o.fn[t].noConflict = function () {
                    return o.fn[t] = n, v._jQueryInterface
                }, v
            }(jQuery), function (i) {
                var e, t = "popover", r = "bs.popover", n = "." + r, o = i.fn[t], s = i.extend({}, m.Default, {
                        placement: "right",
                        trigger: "click",
                        content: "",
                        template: '<div class="popover" role="tooltip"><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                    }), a = i.extend({}, m.DefaultType, {content: "(string|element|function)"}), l = "fade", c = "in",
                    u = ".popover-title", f = ".popover-content", d = {
                        HIDE: "hide" + n,
                        HIDDEN: "hidden" + n,
                        SHOW: "show" + n,
                        SHOWN: "shown" + n,
                        INSERTED: "inserted" + n,
                        CLICK: "click" + n,
                        FOCUSIN: "focusin" + n,
                        FOCUSOUT: "focusout" + n,
                        MOUSEENTER: "mouseenter" + n,
                        MOUSELEAVE: "mouseleave" + n
                    }, h = (function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(p, e = m), p.prototype.isWithContent = function () {
                        return this.getTitle() || this._getContent()
                    }, p.prototype.getTipElement = function () {
                        return this.tip = this.tip || i(this.config.template)[0]
                    }, p.prototype.setContent = function () {
                        var e = i(this.getTipElement());
                        this.setElementContent(e.find(u), this.getTitle()), this.setElementContent(e.find(f), this._getContent()), e.removeClass(l).removeClass(c), this.cleanupTether()
                    }, p.prototype._getContent = function () {
                        return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content)
                    }, p._jQueryInterface = function (n) {
                        return this.each(function () {
                            var e = i(this).data(r), t = "object" === (void 0 === n ? "undefined" : x(n)) ? n : null;
                            if ((e || !/destroy|hide/.test(n)) && (e || (e = new p(this, t), i(this).data(r, e)), "string" == typeof n)) {
                                if (void 0 === e[n]) throw new Error('No method named "' + n + '"');
                                e[n]()
                            }
                        })
                    }, _(p, null, [{
                        key: "VERSION", get: function () {
                            return "4.0.0-alpha.5"
                        }
                    }, {
                        key: "Default", get: function () {
                            return s
                        }
                    }, {
                        key: "NAME", get: function () {
                            return t
                        }
                    }, {
                        key: "DATA_KEY", get: function () {
                            return r
                        }
                    }, {
                        key: "Event", get: function () {
                            return d
                        }
                    }, {
                        key: "EVENT_KEY", get: function () {
                            return n
                        }
                    }, {
                        key: "DefaultType", get: function () {
                            return a
                        }
                    }]), p);

                function p() {
                    return w(this, p), function (e, t) {
                        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                        return !t || "object" != typeof t && "function" != typeof t ? e : t
                    }(this, e.apply(this, arguments))
                }

                i.fn[t] = h._jQueryInterface, i.fn[t].Constructor = h, i.fn[t].noConflict = function () {
                    return i.fn[t] = o, h._jQueryInterface
                }
            }(jQuery)
        }, 590: e => {
            function i() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function l(e) {
                return "function" == typeof e
            }

            function c(e) {
                return "object" == typeof e && null !== e
            }

            function u(e) {
                return void 0 === e
            }

            ((e.exports = i).EventEmitter = i).prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function (e) {
                if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                return this._maxListeners = e, this
            }, i.prototype.emit = function (e) {
                var t, n, i, r, o, s;
                if (this._events || (this._events = {}), "error" === e && (!this._events.error || c(this._events.error) && !this._events.error.length)) {
                    if ((t = arguments[1]) instanceof Error) throw t;
                    var a = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                    throw a.context = t, a
                }
                if (u(n = this._events[e])) return !1;
                if (l(n)) switch (arguments.length) {
                    case 1:
                        n.call(this);
                        break;
                    case 2:
                        n.call(this, arguments[1]);
                        break;
                    case 3:
                        n.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        r = Array.prototype.slice.call(arguments, 1), n.apply(this, r)
                } else if (c(n)) for (r = Array.prototype.slice.call(arguments, 1), i = (s = n.slice()).length, o = 0; o < i; o++) s[o].apply(this, r);
                return !0
            }, i.prototype.on = i.prototype.addListener = function (e, t) {
                var n;
                if (!l(t)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, l(t.listener) ? t.listener : t), this._events[e] ? c(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, c(this._events[e]) && !this._events[e].warned && (n = u(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && 0 < n && this._events[e].length > n && (this._events[e].warned = !0, console.trace), this
            }, i.prototype.once = function (e, t) {
                if (!l(t)) throw TypeError("listener must be a function");
                var n = !1;

                function i() {
                    this.removeListener(e, i), n || (n = !0, t.apply(this, arguments))
                }

                return i.listener = t, this.on(e, i), this
            }, i.prototype.removeListener = function (e, t) {
                var n, i, r, o;
                if (!l(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                if (r = (n = this._events[e]).length, i = -1, n === t || l(n.listener) && n.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t); else if (c(n)) {
                    for (o = r; 0 < o--;) if (n[o] === t || n[o].listener && n[o].listener === t) {
                        i = o;
                        break
                    }
                    if (i < 0) return this;
                    1 === n.length ? (n.length = 0, delete this._events[e]) : n.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }, i.prototype.removeAllListeners = function (e) {
                var t, n;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                if (0 === arguments.length) {
                    for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (l(n = this._events[e])) this.removeListener(e, n); else if (n) for (; n.length;) this.removeListener(e, n[n.length - 1]);
                return delete this._events[e], this
            }, i.prototype.listeners = function (e) {
                e = this._events && this._events[e] ? l(this._events[e]) ? [this._events[e]] : this._events[e].slice() : [];
                return e
            }, i.prototype.listenerCount = function (e) {
                if (this._events) {
                    e = this._events[e];
                    if (l(e)) return 1;
                    if (e) return e.length
                }
                return 0
            }, i.listenerCount = function (e, t) {
                return e.listenerCount(t)
            }
        }, 635: e => {
            e.exports = function i(r, o, s) {
                function a(n, e) {
                    if (!o[n]) {
                        if (!r[n]) {
                            if (0, l) return l(n, !0);
                            var t = new Error("Cannot find module '" + n + "'");
                            throw t.code = "MODULE_NOT_FOUND", t
                        }
                        t = o[n] = {exports: {}};
                        r[n][0].call(t.exports, function (e) {
                            var t = r[n][1][e];
                            return a(t || e)
                        }, t, t.exports, i, r, o, s)
                    }
                    return o[n].exports
                }

                for (var l = void 0, e = 0; e < s.length; e++) a(s[e]);
                return a
            }({
                1: [function (e, t, n) {
                    t.exports = function (e) {
                        var t, n, i, r = -1;
                        if (1 < e.lines.length && "flex-start" === e.style.alignContent) for (t = 0; i = e.lines[++r];) i.crossStart = t, t += i.cross; else if (1 < e.lines.length && "flex-end" === e.style.alignContent) for (t = e.flexStyle.crossSpace; i = e.lines[++r];) i.crossStart = t, t += i.cross; else if (1 < e.lines.length && "center" === e.style.alignContent) for (t = e.flexStyle.crossSpace / 2; i = e.lines[++r];) i.crossStart = t, t += i.cross; else if (1 < e.lines.length && "space-between" === e.style.alignContent) for (n = e.flexStyle.crossSpace / (e.lines.length - 1), t = 0; i = e.lines[++r];) i.crossStart = t, t += i.cross + n; else if (1 < e.lines.length && "space-around" === e.style.alignContent) for (t = (n = 2 * e.flexStyle.crossSpace / (2 * e.lines.length)) / 2; i = e.lines[++r];) i.crossStart = t, t += i.cross + n; else for (n = e.flexStyle.crossSpace / e.lines.length, t = e.flexStyle.crossInnerBefore; i = e.lines[++r];) i.crossStart = t, i.cross += n, t += i.cross
                    }
                }, {}], 2: [function (e, t, n) {
                    t.exports = function (e) {
                        for (var t, n = -1; line = e.lines[++n];) for (t = -1; child = line.children[++t];) {
                            var i = child.style.alignSelf;
                            "flex-start" === (i = "auto" === i ? e.style.alignItems : i) ? child.flexStyle.crossStart = line.crossStart : "flex-end" === i ? child.flexStyle.crossStart = line.crossStart + line.cross - child.flexStyle.crossOuter : "center" === i ? child.flexStyle.crossStart = line.crossStart + (line.cross - child.flexStyle.crossOuter) / 2 : (child.flexStyle.crossStart = line.crossStart, child.flexStyle.crossOuter = line.cross, child.flexStyle.cross = child.flexStyle.crossOuter - child.flexStyle.crossBefore - child.flexStyle.crossAfter)
                        }
                    }
                }, {}], 3: [function (e, t, n) {
                    t.exports = function (e, t) {
                        var n = "row" === t || "row-reverse" === t, i = e.mainAxis;
                        i ? n && "inline" === i || !n && "block" === i || (e.flexStyle = {
                            main: e.flexStyle.cross,
                            cross: e.flexStyle.main,
                            mainOffset: e.flexStyle.crossOffset,
                            crossOffset: e.flexStyle.mainOffset,
                            mainBefore: e.flexStyle.crossBefore,
                            mainAfter: e.flexStyle.crossAfter,
                            crossBefore: e.flexStyle.mainBefore,
                            crossAfter: e.flexStyle.mainAfter,
                            mainInnerBefore: e.flexStyle.crossInnerBefore,
                            mainInnerAfter: e.flexStyle.crossInnerAfter,
                            crossInnerBefore: e.flexStyle.mainInnerBefore,
                            crossInnerAfter: e.flexStyle.mainInnerAfter,
                            mainBorderBefore: e.flexStyle.crossBorderBefore,
                            mainBorderAfter: e.flexStyle.crossBorderAfter,
                            crossBorderBefore: e.flexStyle.mainBorderBefore,
                            crossBorderAfter: e.flexStyle.mainBorderAfter
                        }) : (e.flexStyle = n ? {
                            main: e.style.width,
                            cross: e.style.height,
                            mainOffset: e.style.offsetWidth,
                            crossOffset: e.style.offsetHeight,
                            mainBefore: e.style.marginLeft,
                            mainAfter: e.style.marginRight,
                            crossBefore: e.style.marginTop,
                            crossAfter: e.style.marginBottom,
                            mainInnerBefore: e.style.paddingLeft,
                            mainInnerAfter: e.style.paddingRight,
                            crossInnerBefore: e.style.paddingTop,
                            crossInnerAfter: e.style.paddingBottom,
                            mainBorderBefore: e.style.borderLeftWidth,
                            mainBorderAfter: e.style.borderRightWidth,
                            crossBorderBefore: e.style.borderTopWidth,
                            crossBorderAfter: e.style.borderBottomWidth
                        } : {
                            main: e.style.height,
                            cross: e.style.width,
                            mainOffset: e.style.offsetHeight,
                            crossOffset: e.style.offsetWidth,
                            mainBefore: e.style.marginTop,
                            mainAfter: e.style.marginBottom,
                            crossBefore: e.style.marginLeft,
                            crossAfter: e.style.marginRight,
                            mainInnerBefore: e.style.paddingTop,
                            mainInnerAfter: e.style.paddingBottom,
                            crossInnerBefore: e.style.paddingLeft,
                            crossInnerAfter: e.style.paddingRight,
                            mainBorderBefore: e.style.borderTopWidth,
                            mainBorderAfter: e.style.borderBottomWidth,
                            crossBorderBefore: e.style.borderLeftWidth,
                            crossBorderAfter: e.style.borderRightWidth
                        }, "content-box" === e.style.boxSizing && ("number" == typeof e.flexStyle.main && (e.flexStyle.main += e.flexStyle.mainInnerBefore + e.flexStyle.mainInnerAfter + e.flexStyle.mainBorderBefore + e.flexStyle.mainBorderAfter), "number" == typeof e.flexStyle.cross && (e.flexStyle.cross += e.flexStyle.crossInnerBefore + e.flexStyle.crossInnerAfter + e.flexStyle.crossBorderBefore + e.flexStyle.crossBorderAfter))), e.mainAxis = n ? "inline" : "block", e.crossAxis = n ? "block" : "inline", "number" == typeof e.style.flexBasis && (e.flexStyle.main = e.style.flexBasis + e.flexStyle.mainInnerBefore + e.flexStyle.mainInnerAfter + e.flexStyle.mainBorderBefore + e.flexStyle.mainBorderAfter), e.flexStyle.mainOuter = e.flexStyle.main, e.flexStyle.crossOuter = e.flexStyle.cross, "auto" === e.flexStyle.mainOuter && (e.flexStyle.mainOuter = e.flexStyle.mainOffset), "auto" === e.flexStyle.crossOuter && (e.flexStyle.crossOuter = e.flexStyle.crossOffset), "number" == typeof e.flexStyle.mainBefore && (e.flexStyle.mainOuter += e.flexStyle.mainBefore), "number" == typeof e.flexStyle.mainAfter && (e.flexStyle.mainOuter += e.flexStyle.mainAfter), "number" == typeof e.flexStyle.crossBefore && (e.flexStyle.crossOuter += e.flexStyle.crossBefore), "number" == typeof e.flexStyle.crossAfter && (e.flexStyle.crossOuter += e.flexStyle.crossAfter)
                    }
                }, {}], 4: [function (e, t, n) {
                    var r = e("../reduce");
                    t.exports = function (n) {
                        var i;
                        0 < n.mainSpace && (0 < (i = r(n.children, function (e, t) {
                            return e + parseFloat(t.style.flexGrow)
                        }, 0)) && (n.main = r(n.children, function (e, t) {
                            return "auto" === t.flexStyle.main ? t.flexStyle.main = t.flexStyle.mainOffset + parseFloat(t.style.flexGrow) / i * n.mainSpace : t.flexStyle.main += parseFloat(t.style.flexGrow) / i * n.mainSpace, t.flexStyle.mainOuter = t.flexStyle.main + t.flexStyle.mainBefore + t.flexStyle.mainAfter, e + t.flexStyle.mainOuter
                        }, 0), n.mainSpace = 0))
                    }
                }, {"../reduce": 12}], 5: [function (e, t, n) {
                    var r = e("../reduce");
                    t.exports = function (n) {
                        var i;
                        n.mainSpace < 0 && (0 < (i = r(n.children, function (e, t) {
                            return e + parseFloat(t.style.flexShrink)
                        }, 0)) && (n.main = r(n.children, function (e, t) {
                            return t.flexStyle.main += parseFloat(t.style.flexShrink) / i * n.mainSpace, t.flexStyle.mainOuter = t.flexStyle.main + t.flexStyle.mainBefore + t.flexStyle.mainAfter, e + t.flexStyle.mainOuter
                        }, 0), n.mainSpace = 0))
                    }
                }, {"../reduce": 12}], 6: [function (e, t, n) {
                    var r = e("../reduce");
                    t.exports = function (e) {
                        var t;
                        e.lines = [t = {main: 0, cross: 0, children: []}];
                        for (var n, i = -1; n = e.children[++i];) "nowrap" === e.style.flexWrap || 0 === t.children.length || "auto" === e.flexStyle.main || e.flexStyle.main - e.flexStyle.mainInnerBefore - e.flexStyle.mainInnerAfter - e.flexStyle.mainBorderBefore - e.flexStyle.mainBorderAfter >= t.main + n.flexStyle.mainOuter ? (t.main += n.flexStyle.mainOuter, t.cross = Math.max(t.cross, n.flexStyle.crossOuter)) : e.lines.push(t = {
                            main: n.flexStyle.mainOuter,
                            cross: n.flexStyle.crossOuter,
                            children: []
                        }), t.children.push(n);
                        e.flexStyle.mainLines = r(e.lines, function (e, t) {
                            return Math.max(e, t.main)
                        }, 0), e.flexStyle.crossLines = r(e.lines, function (e, t) {
                            return e + t.cross
                        }, 0), "auto" === e.flexStyle.main && (e.flexStyle.main = Math.max(e.flexStyle.mainOffset, e.flexStyle.mainLines + e.flexStyle.mainInnerBefore + e.flexStyle.mainInnerAfter + e.flexStyle.mainBorderBefore + e.flexStyle.mainBorderAfter)), "auto" === e.flexStyle.cross && (e.flexStyle.cross = Math.max(e.flexStyle.crossOffset, e.flexStyle.crossLines + e.flexStyle.crossInnerBefore + e.flexStyle.crossInnerAfter + e.flexStyle.crossBorderBefore + e.flexStyle.crossBorderAfter)), e.flexStyle.crossSpace = e.flexStyle.cross - e.flexStyle.crossInnerBefore - e.flexStyle.crossInnerAfter - e.flexStyle.crossBorderBefore - e.flexStyle.crossBorderAfter - e.flexStyle.crossLines, e.flexStyle.mainOuter = e.flexStyle.main + e.flexStyle.mainBefore + e.flexStyle.mainAfter, e.flexStyle.crossOuter = e.flexStyle.cross + e.flexStyle.crossBefore + e.flexStyle.crossAfter
                    }
                }, {"../reduce": 12}], 7: [function (r, e, t) {
                    e.exports = function (e) {
                        for (var t, n, i = -1; t = e.children[++i];) r("./flex-direction")(t, e.style.flexDirection);
                        for (r("./flex-direction")(e, e.style.flexDirection), r("./order")(e), r("./flexbox-lines")(e), r("./align-content")(e), i = -1; n = e.lines[++i];) n.mainSpace = e.flexStyle.main - e.flexStyle.mainInnerBefore - e.flexStyle.mainInnerAfter - e.flexStyle.mainBorderBefore - e.flexStyle.mainBorderAfter - n.main, r("./flex-grow")(n), r("./flex-shrink")(n), r("./margin-main")(n), r("./margin-cross")(n), r("./justify-content")(n, e.style.justifyContent, e);
                        r("./align-items")(e)
                    }
                }, {
                    "./align-content": 1,
                    "./align-items": 2,
                    "./flex-direction": 3,
                    "./flex-grow": 4,
                    "./flex-shrink": 5,
                    "./flexbox-lines": 6,
                    "./justify-content": 8,
                    "./margin-cross": 9,
                    "./margin-main": 10,
                    "./order": 11
                }], 8: [function (e, t, n) {
                    t.exports = function (e, t, n) {
                        var i, r, o, n = n.flexStyle.mainInnerBefore, s = -1;
                        if ("flex-end" === t) for (i = e.mainSpace, i += n; o = e.children[++s];) o.flexStyle.mainStart = i, i += o.flexStyle.mainOuter; else if ("center" === t) for (i = e.mainSpace / 2, i += n; o = e.children[++s];) o.flexStyle.mainStart = i, i += o.flexStyle.mainOuter; else if ("space-between" === t) for (r = e.mainSpace / (e.children.length - 1), i = 0, i += n; o = e.children[++s];) o.flexStyle.mainStart = i, i += o.flexStyle.mainOuter + r; else if ("space-around" === t) for (i = (r = 2 * e.mainSpace / (2 * e.children.length)) / 2, i += n; o = e.children[++s];) o.flexStyle.mainStart = i, i += o.flexStyle.mainOuter + r; else for (i = 0, i += n; o = e.children[++s];) o.flexStyle.mainStart = i, i += o.flexStyle.mainOuter
                    }
                }, {}], 9: [function (e, t, n) {
                    t.exports = function (e) {
                        for (var t, n = -1; t = e.children[++n];) {
                            var i = 0;
                            "auto" === t.flexStyle.crossBefore && ++i, "auto" === t.flexStyle.crossAfter && ++i;
                            var r = e.cross - t.flexStyle.crossOuter;
                            "auto" === t.flexStyle.crossBefore && (t.flexStyle.crossBefore = r / i), "auto" === t.flexStyle.crossAfter && (t.flexStyle.crossAfter = r / i), "auto" === t.flexStyle.cross ? t.flexStyle.crossOuter = t.flexStyle.crossOffset + t.flexStyle.crossBefore + t.flexStyle.crossAfter : t.flexStyle.crossOuter = t.flexStyle.cross + t.flexStyle.crossBefore + t.flexStyle.crossAfter
                        }
                    }
                }, {}], 10: [function (e, t, n) {
                    t.exports = function (e) {
                        for (var t, n = 0, i = -1; t = e.children[++i];) "auto" === t.flexStyle.mainBefore && ++n, "auto" === t.flexStyle.mainAfter && ++n;
                        if (0 < n) {
                            for (i = -1; t = e.children[++i];) "auto" === t.flexStyle.mainBefore && (t.flexStyle.mainBefore = e.mainSpace / n), "auto" === t.flexStyle.mainAfter && (t.flexStyle.mainAfter = e.mainSpace / n), "auto" === t.flexStyle.main ? t.flexStyle.mainOuter = t.flexStyle.mainOffset + t.flexStyle.mainBefore + t.flexStyle.mainAfter : t.flexStyle.mainOuter = t.flexStyle.main + t.flexStyle.mainBefore + t.flexStyle.mainAfter;
                            e.mainSpace = 0
                        }
                    }
                }, {}], 11: [function (e, t, n) {
                    var i = /^(column|row)-reverse$/;
                    t.exports = function (e) {
                        e.children.sort(function (e, t) {
                            return e.style.order - t.style.order || e.index - t.index
                        }), i.test(e.style.flexDirection) && e.children.reverse()
                    }
                }, {}], 12: [function (e, t, n) {
                    t.exports = function (e, t, n) {
                        for (var i = e.length, r = -1; ++r < i;) r in e && (n = t(n, e[r], r));
                        return n
                    }
                }, {}], 13: [function (e, t, n) {
                    var i = e("./read"), r = e("./write"), o = e("./readAll"), s = e("./writeAll");
                    t.exports = function (e) {
                        s(o(e))
                    }, t.exports.read = i, t.exports.write = r, t.exports.readAll = o, t.exports.writeAll = s
                }, {"./read": 15, "./readAll": 16, "./write": 17, "./writeAll": 18}], 14: [function (e, t, n) {
                    t.exports = function (e, t) {
                        var n = String(e).match(r);
                        if (!n) return e;
                        var i = n[1];
                        return "px" === (n = n[2]) ? +i : "cm" === n ? .3937 * i * 96 : "in" === n ? 96 * i : "mm" === n ? .3937 * i * 96 / 10 : "pc" === n ? 12 * i * 96 / 72 : "pt" === n ? 96 * i / 72 : "rem" === n ? 16 * i : function (e, t) {
                            o.style.cssText = "border:none!important;clip:rect(0 0 0 0)!important;display:block!important;font-size:1em!important;height:0!important;margin:0!important;padding:0!important;position:relative!important;width:" + e + "!important", t.parentNode.insertBefore(o, t.nextSibling);
                            e = o.offsetWidth;
                            return t.parentNode.removeChild(o), e
                        }(e, t)
                    };
                    var r = /^([-+]?\d*\.?\d+)(%|[a-z]+)$/, o = document.createElement("div")
                }, {}], 15: [function (e, t, n) {
                    t.exports = function (e) {
                        var t = {
                            alignContent: "stretch",
                            alignItems: "stretch",
                            alignSelf: "auto",
                            borderBottomWidth: 0,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderTopWidth: 0,
                            boxSizing: "content-box",
                            display: "inline",
                            flexBasis: "auto",
                            flexDirection: "row",
                            flexGrow: 0,
                            flexShrink: 1,
                            flexWrap: "nowrap",
                            justifyContent: "flex-start",
                            height: "auto",
                            marginTop: 0,
                            marginRight: 0,
                            marginLeft: 0,
                            marginBottom: 0,
                            paddingTop: 0,
                            paddingRight: 0,
                            paddingLeft: 0,
                            paddingBottom: 0,
                            maxHeight: "none",
                            maxWidth: "none",
                            minHeight: 0,
                            minWidth: 0,
                            order: 0,
                            position: "static",
                            width: "auto"
                        };
                        if (e instanceof Element) {
                            var n, i = e.hasAttribute("data-style"),
                                r = i ? e.getAttribute("data-style") : e.getAttribute("style") || "";
                            for (n in i || e.setAttribute("data-style", r), function (e, t) {
                                for (var n in e) n in t && !/^(alignSelf|height|width)$/.test(n) && (e[n] = t[n])
                            }(t, window.getComputedStyle && getComputedStyle(e) || {}), function (e, t) {
                                for (var n in e) {
                                    var i;
                                    n in t ? e[n] = t[n] : (i = n.replace(/[A-Z]/g, "-$&").toLowerCase()) in t && (e[n] = t[i])
                                }
                                "-js-display" in t && (e.display = t["-js-display"])
                            }(t, e.currentStyle || {}), function (e, t) {
                                for (var n; n = o.exec(t);) {
                                    var i = n[1].toLowerCase().replace(/-[a-z]/g, function (e) {
                                        return e.slice(1).toUpperCase()
                                    });
                                    e[i] = n[2]
                                }
                            }(t, r), t) t[n] = s(t[n], e);
                            r = e.getBoundingClientRect();
                            t.offsetHeight = r.height || e.offsetHeight, t.offsetWidth = r.width || e.offsetWidth
                        }
                        return {element: e, style: t}
                    };
                    var o = /([^\s:;]+)\s*:\s*([^;]+?)\s*(;|$)/g, s = e("./getComputedLength")
                }, {"./getComputedLength": 14}], 16: [function (e, t, n) {
                    function u(e) {
                        var t = e instanceof Element, n = t && e.getAttribute("data-style"),
                            e = t && e.currentStyle && e.currentStyle["-js-display"];
                        return i.test(n) || r.test(e)
                    }

                    t.exports = function (e) {
                        var t = [];
                        return function e(t, n) {
                            for (var i, r = u(t), o = [], s = -1; i = t.childNodes[++s];) {
                                var a = 3 === i.nodeType && !/^\s*$/.test(i.nodeValue);
                                r && a && (l = i, (i = t.insertBefore(document.createElement("flex-item"), l)).appendChild(l));
                                var l, a = i instanceof Element;
                                a && (l = e(i, n), r && ((a = i.style).display = "inline-block", a.position = "absolute", l.style = f(i).style, o.push(l)))
                            }
                            var c = {element: t, children: o};
                            return r && (c.style = f(t).style, n.push(c)), c
                        }(e, t), t
                    };
                    var f = e("../read"), i = /(^|;)\s*display\s*:\s*(inline-)?flex\s*(;|$)/i, r = /^(inline-)?flex$/i
                }, {"../read": 15}], 17: [function (e, t, n) {
                    function a(e) {
                        return "string" == typeof e ? e : Math.max(e, 0) + "px"
                    }

                    t.exports = function (e) {
                        l(e);
                        var t = e.element.style, n = "inline" === e.mainAxis ? ["main", "cross"] : ["cross", "main"];
                        t.boxSizing = "content-box", t.display = "block", t.position = "relative", t.width = a(e.flexStyle[n[0]] - e.flexStyle[n[0] + "InnerBefore"] - e.flexStyle[n[0] + "InnerAfter"] - e.flexStyle[n[0] + "BorderBefore"] - e.flexStyle[n[0] + "BorderAfter"]), t.height = a(e.flexStyle[n[1]] - e.flexStyle[n[1] + "InnerBefore"] - e.flexStyle[n[1] + "InnerAfter"] - e.flexStyle[n[1] + "BorderBefore"] - e.flexStyle[n[1] + "BorderAfter"]);
                        for (var i, r = -1; i = e.children[++r];) {
                            var o = i.element.style,
                                s = "inline" === i.mainAxis ? ["main", "cross"] : ["cross", "main"];
                            o.boxSizing = "content-box", o.display = "block", o.position = "absolute", "auto" !== i.flexStyle[s[0]] && (o.width = a(i.flexStyle[s[0]] - i.flexStyle[s[0] + "InnerBefore"] - i.flexStyle[s[0] + "InnerAfter"] - i.flexStyle[s[0] + "BorderBefore"] - i.flexStyle[s[0] + "BorderAfter"])), "auto" !== i.flexStyle[s[1]] && (o.height = a(i.flexStyle[s[1]] - i.flexStyle[s[1] + "InnerBefore"] - i.flexStyle[s[1] + "InnerAfter"] - i.flexStyle[s[1] + "BorderBefore"] - i.flexStyle[s[1] + "BorderAfter"])), o.top = a(i.flexStyle[s[1] + "Start"]), o.left = a(i.flexStyle[s[0] + "Start"]), o.marginTop = a(i.flexStyle[s[1] + "Before"]), o.marginRight = a(i.flexStyle[s[0] + "After"]), o.marginBottom = a(i.flexStyle[s[1] + "After"]), o.marginLeft = a(i.flexStyle[s[0] + "Before"])
                        }
                    };
                    var l = e("../flexbox")
                }, {"../flexbox": 7}], 18: [function (e, t, n) {
                    t.exports = function (e) {
                        for (var t, n = -1; t = e[++n];) i(t)
                    };
                    var i = e("../write")
                }, {"../write": 17}]
            }, {}, [13])(13)
        }, 990: (e, t, n) => {
            var i, r, o;
            o = function (ae) {
                "use strict";

                function i(e, s) {
                    function t(e) {
                        if (!(!0 === X.data(De + "_intouch") || 0 < ae(e.target).closest(s.excludedElements, X).length)) {
                            var t = e.originalEvent || e;
                            if (!t.pointerType || "mouse" != t.pointerType || 0 != s.fallbackToMouseEvents) {
                                var n, i = t.touches, r = i ? i[0] : t;
                                return G = Ce, i ? Z = i.length : !1 !== s.preventDefaultEvents && e.preventDefault(), Y = R = H = null, U = 1, Q = z = q = $ = W = 0, (e = {})[le] = O(le), e[ce] = O(ce), e[ue] = O(ue), e[fe] = O(fe), K = e, S(), E(0, r), !i || Z === s.fingers || s.fingers === Se || m() ? (ee = N(), 2 == Z && (E(1, i[1]), q = z = P(J[0].start, J[1].start)), (s.swipeStatus || s.pinchStatus) && (n = c(t, G))) : n = !1, !1 === n ? (c(t, G = ke), n) : (s.hold && (se = setTimeout(ae.proxy(function () {
                                    X.trigger("hold", [t.target]), s.hold && (n = s.hold.call(X, t, t.target))
                                }, this), s.longTapThreshold)), C(!0), null)
                            }
                        }
                    }

                    function n(e) {
                        var t, n, i, r, o = e.originalEvent || e;
                        G === Ae || G === ke || T() || (t = A((n = o.touches) ? n[0] : o), te = N(), n && (Z = n.length), s.hold && clearTimeout(se), G = Ee, 2 == Z && (0 == q ? (E(1, n[1]), q = z = P(J[0].start, J[1].start)) : (A(n[1]), z = P(J[0].end, J[1].end), J[0].end, J[1].end, Y = U < 1 ? he : de), U = (z / q * 1).toFixed(2), Q = Math.abs(q - z)), Z === s.fingers || s.fingers === Se || !n || m() ? (H = D(t.start, t.end), function (e, t) {
                            if (!1 !== s.preventDefaultEvents) if (s.allowPageScroll === pe) e.preventDefault(); else {
                                var n = s.allowPageScroll === me;
                                switch (t) {
                                    case le:
                                        (s.swipeLeft && n || !n && s.allowPageScroll != xe) && e.preventDefault();
                                        break;
                                    case ce:
                                        (s.swipeRight && n || !n && s.allowPageScroll != xe) && e.preventDefault();
                                        break;
                                    case ue:
                                        (s.swipeUp && n || !n && s.allowPageScroll != _e) && e.preventDefault();
                                        break;
                                    case fe:
                                        (s.swipeDown && n || !n && s.allowPageScroll != _e) && e.preventDefault()
                                }
                            }
                        }(e, R = D(t.last, t.end)), i = t.start, r = t.end, W = Math.round(Math.sqrt(Math.pow(r.x - i.x, 2) + Math.pow(r.y - i.y, 2))), $ = I(), n = W, (e = H) != pe && (n = Math.max(n, k(e)), K[e].distance = n), r = c(o, G), s.triggerOnTouchEnd && !s.triggerOnTouchLeave || (i = !0, s.triggerOnTouchLeave && (e = {
                            left: (n = (e = ae(e = this)).offset()).left,
                            right: n.left + e.outerWidth(),
                            top: n.top,
                            bottom: n.top + e.outerHeight()
                        }, t = t.end, e = e, i = t.x > e.left && t.x < e.right && t.y > e.top && t.y < e.bottom), !s.triggerOnTouchEnd && i ? G = l(Ee) : s.triggerOnTouchLeave && !i && (G = l(Ae)), G != ke && G != Ae || c(o, G))) : c(o, G = ke), !1 === r && c(o, G = ke))
                    }

                    function i(e) {
                        var t, n = e.originalEvent || e, i = n.touches;
                        if (i) {
                            if (i.length && !T()) return t = n, ne = N(), ie = t.touches.length + 1, !0;
                            if (i.length && T()) return !0
                        }
                        return T() && (Z = ie), te = N(), $ = I(), d() || !f() ? c(n, G = ke) : s.triggerOnTouchEnd || !1 === s.triggerOnTouchEnd && G === Ee ? (!1 !== s.preventDefaultEvents && !1 !== e.cancelable && e.preventDefault(), c(n, G = Ae)) : !s.triggerOnTouchEnd && w() ? u(n, G = Ae, ve) : G === Ee && c(n, G = ke), C(!1), null
                    }

                    function r() {
                        z = q = ee = te = Z = 0, S(), C(!(U = 1))
                    }

                    function o(e) {
                        e = e.originalEvent || e;
                        s.triggerOnTouchLeave && c(e, G = l(Ae))
                    }

                    function a() {
                        X.off(B, t), X.off(M, r), X.off(F, n), X.off(L, i), V && X.off(V, o), C(!1)
                    }

                    function l(e) {
                        var t = e, n = h(), i = f(), r = d();
                        return !n || r ? t = ke : !i || e != Ee || s.triggerOnTouchEnd && !s.triggerOnTouchLeave ? !i && e == Ae && s.triggerOnTouchLeave && (t = ke) : t = Ae, t
                    }

                    function c(e, t) {
                        var n, i = e.touches;
                        return (g() && y() || y()) && (n = u(e, t, ge)), (p() && m() || m()) && !1 !== n && (n = u(e, t, ye)), _() && x() && !1 !== n ? n = u(e, t, be) : $ > s.longTapThreshold && W < Te && s.longTap && !1 !== n ? n = u(e, t, we) : 1 !== Z && Oe || !(isNaN(W) || W < s.threshold) || !w() || !1 === n || (n = u(e, t, ve)), t === ke && r(), t === Ae && (i && i.length || r()), n
                    }

                    function u(e, t, n) {
                        var i;
                        if (n == ge) {
                            if (X.trigger("swipeStatus", [t, H || null, W || 0, $ || 0, Z, J, R]), s.swipeStatus && !1 === (i = s.swipeStatus.call(X, e, t, H || null, W || 0, $ || 0, Z, J, R))) return !1;
                            if (t == Ae && g()) {
                                if (clearTimeout(oe), clearTimeout(se), X.trigger("swipe", [H, W, $, Z, J, R]), s.swipe && !1 === (i = s.swipe.call(X, e, H, W, $, Z, J, R))) return !1;
                                switch (H) {
                                    case le:
                                        X.trigger("swipeLeft", [H, W, $, Z, J, R]), s.swipeLeft && (i = s.swipeLeft.call(X, e, H, W, $, Z, J, R));
                                        break;
                                    case ce:
                                        X.trigger("swipeRight", [H, W, $, Z, J, R]), s.swipeRight && (i = s.swipeRight.call(X, e, H, W, $, Z, J, R));
                                        break;
                                    case ue:
                                        X.trigger("swipeUp", [H, W, $, Z, J, R]), s.swipeUp && (i = s.swipeUp.call(X, e, H, W, $, Z, J, R));
                                        break;
                                    case fe:
                                        X.trigger("swipeDown", [H, W, $, Z, J, R]), s.swipeDown && (i = s.swipeDown.call(X, e, H, W, $, Z, J, R))
                                }
                            }
                        }
                        if (n == ye) {
                            if (X.trigger("pinchStatus", [t, Y || null, Q || 0, $ || 0, Z, U, J]), s.pinchStatus && !1 === (i = s.pinchStatus.call(X, e, t, Y || null, Q || 0, $ || 0, Z, U, J))) return !1;
                            if (t == Ae && p()) switch (Y) {
                                case de:
                                    X.trigger("pinchIn", [Y || null, Q || 0, $ || 0, Z, U, J]), s.pinchIn && (i = s.pinchIn.call(X, e, Y || null, Q || 0, $ || 0, Z, U, J));
                                    break;
                                case he:
                                    X.trigger("pinchOut", [Y || null, Q || 0, $ || 0, Z, U, J]), s.pinchOut && (i = s.pinchOut.call(X, e, Y || null, Q || 0, $ || 0, Z, U, J))
                            }
                        }
                        return n == ve ? t !== ke && t !== Ae || (clearTimeout(oe), clearTimeout(se), x() && !_() ? (re = N(), oe = setTimeout(ae.proxy(function () {
                            re = null, X.trigger("tap", [e.target]), s.tap && (i = s.tap.call(X, e, e.target))
                        }, this), s.doubleTapThreshold)) : (re = null, X.trigger("tap", [e.target]), s.tap && (i = s.tap.call(X, e, e.target)))) : n == be ? t !== ke && t !== Ae || (clearTimeout(oe), clearTimeout(se), re = null, X.trigger("doubletap", [e.target]), s.doubleTap && (i = s.doubleTap.call(X, e, e.target))) : n == we && (t !== ke && t !== Ae || (clearTimeout(oe), re = null, X.trigger("longtap", [e.target]), s.longTap && (i = s.longTap.call(X, e, e.target)))), i
                    }

                    function f() {
                        var e = !0;
                        return e = null !== s.threshold ? W >= s.threshold : e
                    }

                    function d() {
                        var e = !1;
                        return e = null !== s.cancelThreshold && null !== H ? k(H) - W >= s.cancelThreshold : e
                    }

                    function h() {
                        return !s.maxTimeThreshold || !($ >= s.maxTimeThreshold)
                    }

                    function p() {
                        var e = v(), t = b(), n = null === s.pinchThreshold || Q >= s.pinchThreshold;
                        return e && t && n
                    }

                    function m() {
                        return s.pinchStatus || s.pinchIn || s.pinchOut
                    }

                    function g() {
                        var e = h(), t = f(), n = v(), i = b();
                        return !d() && i && n && t && e
                    }

                    function y() {
                        return s.swipe || s.swipeStatus || s.swipeLeft || s.swipeRight || s.swipeUp || s.swipeDown
                    }

                    function v() {
                        return Z === s.fingers || s.fingers === Se || !Oe
                    }

                    function b() {
                        return 0 !== J[0].end.x
                    }

                    function w() {
                        return s.tap
                    }

                    function x() {
                        return !!s.doubleTap
                    }

                    function _() {
                        if (null == re) return !1;
                        var e = N();
                        return x() && e - re <= s.doubleTapThreshold
                    }

                    function S() {
                        ie = ne = 0
                    }

                    function T() {
                        var e = !1;
                        return e = ne && N() - ne <= s.fingerReleaseThreshold ? !0 : e
                    }

                    function C(e) {
                        X && (!0 === e ? (X.on(F, n), X.on(L, i), V && X.on(V, o)) : (X.off(F, n, !1), X.off(L, i, !1), V && X.off(V, o, !1)), X.data(De + "_intouch", !0 === e))
                    }

                    function E(e, t) {
                        var n = {start: {x: 0, y: 0}, last: {x: 0, y: 0}, end: {x: 0, y: 0}};
                        return n.start.x = n.last.x = n.end.x = t.pageX || t.clientX, n.start.y = n.last.y = n.end.y = t.pageY || t.clientY, J[e] = n
                    }

                    function A(e) {
                        var t = void 0 !== e.identifier ? e.identifier : 0, n = J[t] || null;
                        return (n = null === n ? E(t, e) : n).last.x = n.end.x, n.last.y = n.end.y, n.end.x = e.pageX || e.clientX, n.end.y = e.pageY || e.clientY, n
                    }

                    function k(e) {
                        return K[e] ? K[e].distance : void 0
                    }

                    function O(e) {
                        return {direction: e, distance: 0}
                    }

                    function I() {
                        return te - ee
                    }

                    function P(e, t) {
                        var n = Math.abs(e.x - t.x), t = Math.abs(e.y - t.y);
                        return Math.round(Math.sqrt(n * n + t * t))
                    }

                    function D(e, t) {
                        if (i = t, (n = e).x == i.x && n.y == i.y) return pe;
                        var n, i,
                            e = (i = t, e = (t = e).x - i.x, t = i.y - t.y, e = Math.atan2(t, e), e = (e = Math.round(180 * e / Math.PI)) < 0 ? 360 - Math.abs(e) : e);
                        return e <= 45 && 0 <= e || e <= 360 && 315 <= e ? le : 135 <= e && e <= 225 ? ce : 45 < e && e < 135 ? fe : ue
                    }

                    function N() {
                        return (new Date).getTime()
                    }

                    var s = ae.extend({}, s), j = Oe || Pe || !s.fallbackToMouseEvents,
                        B = j ? Pe ? Ie ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown",
                        F = j ? Pe ? Ie ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove",
                        L = j ? Pe ? Ie ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup",
                        V = !j || Pe ? "mouseleave" : null,
                        M = Pe ? Ie ? "MSPointerCancel" : "pointercancel" : "touchcancel", W = 0, H = null, R = null,
                        $ = 0, q = 0, z = 0, U = 1, Q = 0, Y = 0, K = null, X = ae(e), G = "start", Z = 0, J = {},
                        ee = 0, te = 0, ne = 0, ie = 0, re = 0, oe = null, se = null;
                    try {
                        X.on(B, t), X.on(M, r)
                    } catch (e) {
                        ae.error("events not supported " + B + "," + M + " on jQuery.swipe")
                    }
                    this.enable = function () {
                        return this.disable(), X.on(B, t), X.on(M, r), X
                    }, this.disable = function () {
                        return a(), X
                    }, this.destroy = function () {
                        a(), X.data(De, null), X = null
                    }, this.option = function (e, t) {
                        if ("object" == typeof e) s = ae.extend(s, e); else if (void 0 !== s[e]) {
                            if (void 0 === t) return s[e];
                            s[e] = t
                        } else {
                            if (!e) return s;
                            ae.error("Option " + e + " does not exist on jQuery.swipe.options")
                        }
                        return null
                    }
                }

                var le = "left", ce = "right", ue = "up", fe = "down", de = "in", he = "out", pe = "none", me = "auto",
                    ge = "swipe", ye = "pinch", ve = "tap", be = "doubletap", we = "longtap", xe = "horizontal",
                    _e = "vertical", Se = "all", Te = 10, Ce = "start", Ee = "move", Ae = "end", ke = "cancel",
                    Oe = "ontouchstart" in window,
                    Ie = window.navigator.msPointerEnabled && !window.PointerEvent && !Oe,
                    Pe = (window.PointerEvent || window.navigator.msPointerEnabled) && !Oe, De = "TouchSwipe";
                ae.fn.swipe = function (e) {
                    var t = ae(this), n = t.data(De);
                    if (n && "string" == typeof e) {
                        if (n[e]) return n[e].apply(n, Array.prototype.slice.call(arguments, 1));
                        ae.error("Method " + e + " does not exist on jQuery.swipe")
                    } else if (n && "object" == typeof e) n.option.apply(n, arguments); else if (!(n || "object" != typeof e && e)) return function (n) {
                        return !n || void 0 !== n.allowPageScroll || void 0 === n.swipe && void 0 === n.swipeStatus || (n.allowPageScroll = pe), void 0 !== n.click && void 0 === n.tap && (n.tap = n.click), n = ae.extend({}, ae.fn.swipe.defaults, n = n || {}), this.each(function () {
                            var e = ae(this), t = e.data(De);
                            t || (t = new i(this, n), e.data(De, t))
                        })
                    }.apply(this, arguments);
                    return t
                }, ae.fn.swipe.version = "1.6.18", ae.fn.swipe.defaults = {
                    fingers: 1,
                    threshold: 75,
                    cancelThreshold: null,
                    pinchThreshold: 20,
                    maxTimeThreshold: null,
                    fingerReleaseThreshold: 250,
                    longTapThreshold: 500,
                    doubleTapThreshold: 200,
                    swipe: null,
                    swipeLeft: null,
                    swipeRight: null,
                    swipeUp: null,
                    swipeDown: null,
                    swipeStatus: null,
                    pinchIn: null,
                    pinchOut: null,
                    pinchStatus: null,
                    click: null,
                    tap: null,
                    doubleTap: null,
                    longTap: null,
                    hold: null,
                    triggerOnTouchEnd: !0,
                    triggerOnTouchLeave: !1,
                    allowPageScroll: "auto",
                    fallbackToMouseEvents: !0,
                    excludedElements: ".noSwipe",
                    preventDefaultEvents: !0
                }, ae.fn.swipe.phases = {
                    PHASE_START: Ce,
                    PHASE_MOVE: Ee,
                    PHASE_END: Ae,
                    PHASE_CANCEL: ke
                }, ae.fn.swipe.directions = {
                    LEFT: le,
                    RIGHT: ce,
                    UP: ue,
                    DOWN: fe,
                    IN: de,
                    OUT: he
                }, ae.fn.swipe.pageScroll = {
                    NONE: pe,
                    HORIZONTAL: xe,
                    VERTICAL: _e,
                    AUTO: me
                }, ae.fn.swipe.fingers = {ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, ALL: Se}
            }, n.amdO.jQuery ? (i = [n(609)], void 0 === (r = "function" == typeof (r = o) ? r.apply(t, i) : r) || (e.exports = r)) : o(e.exports ? n(609) : jQuery)
        }, 519: function (e, t) {
            var n;
            void 0 === (n = "function" == typeof (n = function () {
                "use strict";
                var t = function () {
                    function i(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || false;
                            i.configurable = true;
                            if ("value" in i) i.writable = true;
                            Object.defineProperty(e, i.key, i)
                        }
                    }

                    return function (e, t, n) {
                        if (t) i(e.prototype, t);
                        if (n) i(e, n);
                        return e
                    }
                }();

                function i(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }

                var S = undefined;
                if (typeof S === "undefined") S = {modules: []};
                var r = null;

                function s(e) {
                    var t = e.getBoundingClientRect();
                    var n = {};
                    for (var i in t) n[i] = t[i];
                    try {
                        if (e.ownerDocument !== document) {
                            var r = e.ownerDocument.defaultView.frameElement;
                            if (r) {
                                var o = s(r);
                                n.top += o.top;
                                n.bottom += o.top;
                                n.left += o.left;
                                n.right += o.left
                            }
                        }
                    } catch (e) {
                    }
                    return n
                }

                function c(e) {
                    var t = getComputedStyle(e) || {};
                    var n = t.position;
                    var i = [];
                    if (n === "fixed") return [e];
                    var r = e;
                    while ((r = r.parentNode) && r && r.nodeType === 1) {
                        var o = undefined;
                        try {
                            o = getComputedStyle(r)
                        } catch (e) {
                        }
                        if (typeof o === "undefined" || o === null) {
                            i.push(r);
                            return i
                        }
                        var s = o;
                        var a = s.overflow;
                        var l = s.overflowX;
                        var c = s.overflowY;
                        if (/(auto|scroll|overlay)/.test(a + c + l)) if (n !== "absolute" || ["relative", "absolute", "fixed"].indexOf(o.position) >= 0) i.push(r)
                    }
                    i.push(e.ownerDocument.body);
                    if (e.ownerDocument !== document) i.push(e.ownerDocument.defaultView);
                    return i
                }

                var o = function () {
                    var e = 0;
                    return function () {
                        return ++e
                    }
                }(), a = {}, l = function e() {
                    var t = r;
                    if (!t || !document.body.contains(t)) {
                        t = document.createElement("div");
                        t.setAttribute("data-tether-id", o());
                        _(t.style, {top: 0, left: 0, position: "absolute"});
                        document.body.appendChild(t);
                        r = t
                    }
                    var n = t.getAttribute("data-tether-id");
                    if (typeof a[n] === "undefined") {
                        a[n] = s(t);
                        k(function () {
                            delete a[n]
                        })
                    }
                    return a[n]
                };

                function u() {
                    if (r) document.body.removeChild(r);
                    r = null
                }

                function T(e) {
                    var t = undefined;
                    if (e === document) {
                        t = document;
                        e = document.documentElement
                    } else t = e.ownerDocument;
                    var n = t.documentElement;
                    var i = s(e);
                    var r = l();
                    i.top -= r.top;
                    i.left -= r.left;
                    if (typeof i.width === "undefined") i.width = document.body.scrollWidth - i.left - i.right;
                    if (typeof i.height === "undefined") i.height = document.body.scrollHeight - i.top - i.bottom;
                    i.top = i.top - n.clientTop;
                    i.left = i.left - n.clientLeft;
                    i.right = t.body.clientWidth - i.width - i.left;
                    i.bottom = t.body.clientHeight - i.height - i.top;
                    return i
                }

                function C(e) {
                    return e.offsetParent || document.documentElement
                }

                var f = null;

                function E() {
                    if (f) return f;
                    var e = document.createElement("div");
                    e.style.width = "100%";
                    e.style.height = "200px";
                    var t = document.createElement("div");
                    _(t.style, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        pointerEvents: "none",
                        visibility: "hidden",
                        width: "200px",
                        height: "150px",
                        overflow: "hidden"
                    });
                    t.appendChild(e);
                    document.body.appendChild(t);
                    var n = e.offsetWidth;
                    t.style.overflow = "scroll";
                    var i = e.offsetWidth;
                    if (n === i) i = t.clientWidth;
                    document.body.removeChild(t);
                    var r = n - i;
                    f = {width: r, height: r};
                    return f
                }

                function _() {
                    var n = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                    var e = [];
                    Array.prototype.push.apply(e, arguments);
                    e.slice(1).forEach(function (e) {
                        if (e) for (var t in e) if ({}.hasOwnProperty.call(e, t)) n[t] = e[t]
                    });
                    return n
                }

                function d(t, e) {
                    if (typeof t.classList !== "undefined") e.split(" ").forEach(function (e) {
                        if (e.trim()) t.classList.remove(e)
                    }); else {
                        var n = new RegExp("(^| )" + e.split(" ").join("|") + "( |$)", "gi");
                        var i = m(t).replace(n, " ");
                        g(t, i)
                    }
                }

                function h(t, e) {
                    if (typeof t.classList !== "undefined") e.split(" ").forEach(function (e) {
                        if (e.trim()) t.classList.add(e)
                    }); else {
                        d(t, e);
                        var n = m(t) + (" " + e);
                        g(t, n)
                    }
                }

                function p(e, t) {
                    if (typeof e.classList !== "undefined") return e.classList.contains(t);
                    var n = m(e);
                    return new RegExp("(^| )" + t + "( |$)", "gi").test(n)
                }

                function m(e) {
                    if (e.className instanceof e.ownerDocument.defaultView.SVGAnimatedString) return e.className.baseVal;
                    return e.className
                }

                function g(e, t) {
                    e.setAttribute("class", t)
                }

                function A(t, n, e) {
                    e.forEach(function (e) {
                        if (n.indexOf(e) === -1 && p(t, e)) d(t, e)
                    });
                    n.forEach(function (e) {
                        if (!p(t, e)) h(t, e)
                    })
                }

                var n = [], k = function e(t) {
                    n.push(t)
                }, O = function e() {
                    var t = undefined;
                    while (t = n.pop()) t()
                }, e = function () {
                    function e() {
                        i(this, e)
                    }

                    t(e, [{
                        key: "on", value: function e(t, n, i) {
                            var r = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
                            if (typeof this.bindings === "undefined") this.bindings = {};
                            if (typeof this.bindings[t] === "undefined") this.bindings[t] = [];
                            this.bindings[t].push({handler: n, ctx: i, once: r})
                        }
                    }, {
                        key: "once", value: function e(t, n, i) {
                            this.on(t, n, i, true)
                        }
                    }, {
                        key: "off", value: function e(t, n) {
                            if (typeof this.bindings === "undefined" || typeof this.bindings[t] === "undefined") return;
                            if (typeof n === "undefined") delete this.bindings[t]; else {
                                var i = 0;
                                while (i < this.bindings[t].length) if (this.bindings[t][i].handler === n) this.bindings[t].splice(i, 1); else ++i
                            }
                        }
                    }, {
                        key: "trigger", value: function e(t) {
                            if (typeof this.bindings !== "undefined" && this.bindings[t]) {
                                var n = 0;
                                for (var i = arguments.length, r = Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++) r[o - 1] = arguments[o];
                                while (n < this.bindings[t].length) {
                                    var s = this.bindings[t][n];
                                    var a = s.handler;
                                    var l = s.ctx;
                                    var c = s.once;
                                    var u = l;
                                    if (typeof u === "undefined") u = this;
                                    a.apply(u, r);
                                    if (c) this.bindings[t].splice(n, 1); else ++n
                                }
                            }
                        }
                    }]);
                    return e
                }();
                S.Utils = {
                    getActualBoundingClientRect: s,
                    getScrollParents: c,
                    getBounds: T,
                    getOffsetParent: C,
                    extend: _,
                    addClass: h,
                    removeClass: d,
                    hasClass: p,
                    updateClasses: A,
                    defer: k,
                    flush: O,
                    uniqueId: o,
                    Evented: e,
                    getScrollBarSize: E,
                    removeUtilElements: u
                };
                var I = function () {
                    function n(e, t) {
                        var n = [];
                        var i = true;
                        var r = false;
                        var o = undefined;
                        try {
                            for (var s = e[Symbol.iterator](), a; !(i = (a = s.next()).done); i = true) {
                                n.push(a.value);
                                if (t && n.length === t) break
                            }
                        } catch (e) {
                            r = true;
                            o = e
                        } finally {
                            try {
                                if (!i && s["return"]) s["return"]()
                            } finally {
                                if (r) throw o
                            }
                        }
                        return n
                    }

                    return function (e, t) {
                        if (Array.isArray(e)) return e; else if (Symbol.iterator in Object(e)) return n(e, t); else throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(), t = function () {
                    function i(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || false;
                            i.configurable = true;
                            if ("value" in i) i.writable = true;
                            Object.defineProperty(e, i.key, i)
                        }
                    }

                    return function (e, t, n) {
                        if (t) i(e.prototype, t);
                        if (n) i(e, n);
                        return e
                    }
                }(), y = function e(t, n, i) {
                    var r = true;
                    e:while (r) {
                        var o = t, s = n, a = i;
                        r = false;
                        if (o === null) o = Function.prototype;
                        var l = Object.getOwnPropertyDescriptor(o, s);
                        if (l === undefined) {
                            var c = Object.getPrototypeOf(o);
                            if (c === null) return undefined; else {
                                t = c;
                                n = s;
                                i = a;
                                r = true;
                                l = c = undefined;
                                continue e
                            }
                        } else if ("value" in l) return l.value; else {
                            var u = l.get;
                            if (u === undefined) return undefined;
                            return u.call(a)
                        }
                    }
                };

                function i(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }

                function v(e, t) {
                    if (typeof t !== "function" && t !== null) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: false,
                            writable: true,
                            configurable: true
                        }
                    });
                    if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
                }

                if (typeof S === "undefined") throw new Error("You must include the utils.js file before tether.js");
                var b = S.Utils, c = b.getScrollParents, T = b.getBounds, C = b.getOffsetParent, _ = b.extend,
                    h = b.addClass, d = b.removeClass, A = b.updateClasses, k = b.defer, O = b.flush,
                    E = b.getScrollBarSize, u = b.removeUtilElements;

                function w(e, t) {
                    var n = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
                    return e + n >= t && t >= e - n
                }

                var x = function () {
                    if (typeof document === "undefined") return "";
                    var e = document.createElement("div");
                    var t = ["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"];
                    for (var n = 0; n < t.length; ++n) {
                        var i = t[n];
                        if (e.style[i] !== undefined) return i
                    }
                }(), P = [], D = function e() {
                    P.forEach(function (e) {
                        e.position(false)
                    });
                    O()
                };

                function N() {
                    if (typeof performance === "object" && typeof performance.now === "function") return performance.now();
                    return +new Date
                }

                (function () {
                    var t = null;
                    var n = null;
                    var i = null;
                    var r = function e() {
                        if (typeof n !== "undefined" && n > 16) {
                            n = Math.min(n - 16, 250);
                            i = setTimeout(e, 250);
                            return
                        }
                        if (typeof t !== "undefined" && N() - t < 10) return;
                        if (i != null) {
                            clearTimeout(i);
                            i = null
                        }
                        t = N();
                        D();
                        n = N() - t
                    };
                    if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined") ["resize", "scroll", "touchmove"].forEach(function (e) {
                        window.addEventListener(e, r)
                    })
                })();
                var j = {center: "center", left: "right", right: "left"},
                    B = {middle: "middle", top: "bottom", bottom: "top"},
                    F = {top: 0, left: 0, middle: "50%", center: "50%", bottom: "100%", right: "100%"},
                    L = function e(t, n) {
                        var i = t.left;
                        var r = t.top;
                        if (i === "auto") i = j[n.left];
                        if (r === "auto") r = B[n.top];
                        return {left: i, top: r}
                    }, V = function e(t) {
                        var n = t.left;
                        var i = t.top;
                        if (typeof F[t.left] !== "undefined") n = F[t.left];
                        if (typeof F[t.top] !== "undefined") i = F[t.top];
                        return {left: n, top: i}
                    };

                function M() {
                    var i = {top: 0, left: 0};
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    t.forEach(function (e) {
                        var t = e.top;
                        var n = e.left;
                        if (typeof t === "string") t = parseFloat(t, 10);
                        if (typeof n === "string") n = parseFloat(n, 10);
                        i.top += t;
                        i.left += n
                    });
                    return i
                }

                function W(e, t) {
                    if (typeof e.left === "string" && e.left.indexOf("%") !== -1) e.left = parseFloat(e.left, 10) / 100 * t.width;
                    if (typeof e.top === "string" && e.top.indexOf("%") !== -1) e.top = parseFloat(e.top, 10) / 100 * t.height;
                    return e
                }

                var H = function e(t) {
                    var n = t.split(" ");
                    var i = I(n, 2);
                    var r = i[0];
                    var o = i[1];
                    return {top: r, left: o}
                }, R = H, $ = function (e) {
                    v(n, e);

                    function n(e) {
                        var t = this;
                        i(this, n);
                        y(Object.getPrototypeOf(n.prototype), "constructor", this).call(this);
                        this.position = this.position.bind(this);
                        P.push(this);
                        this.history = [];
                        this.setOptions(e, false);
                        S.modules.forEach(function (e) {
                            if (typeof e.initialize !== "undefined") e.initialize.call(t)
                        });
                        this.position()
                    }

                    t(n, [{
                        key: "getClass", value: function e() {
                            var t = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
                            var n = this.options.classes;
                            if (typeof n !== "undefined" && n[t]) return this.options.classes[t]; else if (this.options.classPrefix) return this.options.classPrefix + "-" + t; else return t
                        }
                    }, {
                        key: "setOptions", value: function e(t) {
                            var n = this;
                            var i = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
                            var r = {
                                offset: "0 0",
                                targetOffset: "0 0",
                                targetAttachment: "auto auto",
                                classPrefix: "tether"
                            };
                            this.options = _(r, t);
                            var o = this.options;
                            var s = o.element;
                            var a = o.target;
                            var l = o.targetModifier;
                            this.element = s;
                            this.target = a;
                            this.targetModifier = l;
                            if (this.target === "viewport") {
                                this.target = document.body;
                                this.targetModifier = "visible"
                            } else if (this.target === "scroll-handle") {
                                this.target = document.body;
                                this.targetModifier = "scroll-handle"
                            }
                            ["element", "target"].forEach(function (e) {
                                if (typeof n[e] === "undefined") throw new Error("Tether Error: Both element and target must be defined");
                                if (typeof n[e].jquery !== "undefined") n[e] = n[e][0]; else if (typeof n[e] === "string") n[e] = document.querySelector(n[e])
                            });
                            h(this.element, this.getClass("element"));
                            if (!(this.options.addTargetClasses === false)) h(this.target, this.getClass("target"));
                            if (!this.options.attachment) throw new Error("Tether Error: You must provide an attachment");
                            this.targetAttachment = R(this.options.targetAttachment);
                            this.attachment = R(this.options.attachment);
                            this.offset = H(this.options.offset);
                            this.targetOffset = H(this.options.targetOffset);
                            if (typeof this.scrollParents !== "undefined") this.disable();
                            if (this.targetModifier === "scroll-handle") this.scrollParents = [this.target]; else this.scrollParents = c(this.target);
                            if (!(this.options.enabled === false)) this.enable(i)
                        }
                    }, {
                        key: "getTargetBounds", value: function e() {
                            if (typeof this.targetModifier !== "undefined") {
                                if (this.targetModifier === "visible") if (this.target === document.body) return {
                                    top: pageYOffset,
                                    left: pageXOffset,
                                    height: innerHeight,
                                    width: innerWidth
                                }; else {
                                    var t = T(this.target);
                                    var n = {height: t.height, width: t.width, top: t.top, left: t.left};
                                    n.height = Math.min(n.height, t.height - (pageYOffset - t.top));
                                    n.height = Math.min(n.height, t.height - (t.top + t.height - (pageYOffset + innerHeight)));
                                    n.height = Math.min(innerHeight, n.height);
                                    n.height -= 2;
                                    n.width = Math.min(n.width, t.width - (pageXOffset - t.left));
                                    n.width = Math.min(n.width, t.width - (t.left + t.width - (pageXOffset + innerWidth)));
                                    n.width = Math.min(innerWidth, n.width);
                                    n.width -= 2;
                                    if (n.top < pageYOffset) n.top = pageYOffset;
                                    if (n.left < pageXOffset) n.left = pageXOffset;
                                    return n
                                } else if (this.targetModifier === "scroll-handle") {
                                    var t = undefined;
                                    var i = this.target;
                                    if (i === document.body) {
                                        i = document.documentElement;
                                        t = {
                                            left: pageXOffset,
                                            top: pageYOffset,
                                            height: innerHeight,
                                            width: innerWidth
                                        }
                                    } else t = T(i);
                                    var r = getComputedStyle(i);
                                    var o = i.scrollWidth > i.clientWidth || [r.overflow, r.overflowX].indexOf("scroll") >= 0 || this.target !== document.body;
                                    var s = 0;
                                    if (o) s = 15;
                                    var a = t.height - parseFloat(r.borderTopWidth) - parseFloat(r.borderBottomWidth) - s;
                                    var n = {
                                        width: 15,
                                        height: a * .975 * (a / i.scrollHeight),
                                        left: t.left + t.width - parseFloat(r.borderLeftWidth) - 15
                                    };
                                    var l = 0;
                                    if (a < 408 && this.target === document.body) l = -11e-5 * Math.pow(a, 2) - .00727 * a + 22.58;
                                    if (this.target !== document.body) n.height = Math.max(n.height, 24);
                                    var c = this.target.scrollTop / (i.scrollHeight - a);
                                    n.top = c * (a - n.height - l) + t.top + parseFloat(r.borderTopWidth);
                                    if (this.target === document.body) n.height = Math.max(n.height, 24);
                                    return n
                                }
                            } else return T(this.target)
                        }
                    }, {
                        key: "clearCache", value: function e() {
                            this._cache = {}
                        }
                    }, {
                        key: "cache", value: function e(t, n) {
                            if (typeof this._cache === "undefined") this._cache = {};
                            if (typeof this._cache[t] === "undefined") this._cache[t] = n.call(this);
                            return this._cache[t]
                        }
                    }, {
                        key: "enable", value: function e() {
                            var t = this;
                            var n = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
                            if (!(this.options.addTargetClasses === false)) h(this.target, this.getClass("enabled"));
                            h(this.element, this.getClass("enabled"));
                            this.enabled = true;
                            this.scrollParents.forEach(function (e) {
                                if (e !== t.target.ownerDocument) e.addEventListener("scroll", t.position)
                            });
                            if (n) this.position()
                        }
                    }, {
                        key: "disable", value: function e() {
                            var t = this;
                            d(this.target, this.getClass("enabled"));
                            d(this.element, this.getClass("enabled"));
                            this.enabled = false;
                            if (typeof this.scrollParents !== "undefined") this.scrollParents.forEach(function (e) {
                                e.removeEventListener("scroll", t.position)
                            })
                        }
                    }, {
                        key: "destroy", value: function e() {
                            var n = this;
                            this.disable();
                            P.forEach(function (e, t) {
                                if (e === n) P.splice(t, 1)
                            });
                            if (P.length === 0) u()
                        }
                    }, {
                        key: "updateAttachClasses", value: function e(t, n) {
                            var i = this;
                            t = t || this.attachment;
                            n = n || this.targetAttachment;
                            var r = ["left", "top", "bottom", "right", "middle", "center"];
                            if (typeof this._addAttachClasses !== "undefined" && this._addAttachClasses.length) this._addAttachClasses.splice(0, this._addAttachClasses.length);
                            if (typeof this._addAttachClasses === "undefined") this._addAttachClasses = [];
                            var o = this._addAttachClasses;
                            if (t.top) o.push(this.getClass("element-attached") + "-" + t.top);
                            if (t.left) o.push(this.getClass("element-attached") + "-" + t.left);
                            if (n.top) o.push(this.getClass("target-attached") + "-" + n.top);
                            if (n.left) o.push(this.getClass("target-attached") + "-" + n.left);
                            var s = [];
                            r.forEach(function (e) {
                                s.push(i.getClass("element-attached") + "-" + e);
                                s.push(i.getClass("target-attached") + "-" + e)
                            });
                            k(function () {
                                if (!(typeof i._addAttachClasses !== "undefined")) return;
                                A(i.element, i._addAttachClasses, s);
                                if (!(i.options.addTargetClasses === false)) A(i.target, i._addAttachClasses, s);
                                delete i._addAttachClasses
                            })
                        }
                    }, {
                        key: "position", value: function e() {
                            var a = this;
                            var t = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
                            if (!this.enabled) return;
                            this.clearCache();
                            var n = L(this.targetAttachment, this.attachment);
                            this.updateAttachClasses(this.attachment, n);
                            var i = this.cache("element-bounds", function () {
                                return T(a.element)
                            });
                            var r = i.width;
                            var o = i.height;
                            if (r === 0 && o === 0 && typeof this.lastSize !== "undefined") {
                                var s = this.lastSize;
                                r = s.width;
                                o = s.height
                            } else this.lastSize = {width: r, height: o};
                            var l = this.cache("target-bounds", function () {
                                return a.getTargetBounds()
                            });
                            var c = l;
                            var u = W(V(this.attachment), {width: r, height: o});
                            var f = W(V(n), c);
                            var d = W(this.offset, {width: r, height: o});
                            var h = W(this.targetOffset, c);
                            u = M(u, d);
                            f = M(f, h);
                            var p = l.left + f.left - u.left;
                            var m = l.top + f.top - u.top;
                            for (var g = 0; g < S.modules.length; ++g) {
                                var y = S.modules[g];
                                var v = y.position.call(this, {
                                    left: p,
                                    top: m,
                                    targetAttachment: n,
                                    targetPos: l,
                                    elementPos: i,
                                    offset: u,
                                    targetOffset: f,
                                    manualOffset: d,
                                    manualTargetOffset: h,
                                    scrollbarSize: _,
                                    attachment: this.attachment
                                });
                                if (v === false) return false; else if (typeof v === "undefined" || typeof v !== "object") continue; else {
                                    m = v.top;
                                    p = v.left
                                }
                            }
                            var b = {
                                page: {top: m, left: p},
                                viewport: {
                                    top: m - pageYOffset,
                                    bottom: pageYOffset - m - o + innerHeight,
                                    left: p - pageXOffset,
                                    right: pageXOffset - p - r + innerWidth
                                }
                            };
                            var w = this.target.ownerDocument;
                            var x = w.defaultView;
                            var _ = undefined;
                            if (x.innerHeight > w.documentElement.clientHeight) {
                                _ = this.cache("scrollbar-size", E);
                                b.viewport.bottom -= _.height
                            }
                            if (x.innerWidth > w.documentElement.clientWidth) {
                                _ = this.cache("scrollbar-size", E);
                                b.viewport.right -= _.width
                            }
                            if (["", "static"].indexOf(w.body.style.position) === -1 || ["", "static"].indexOf(w.body.parentElement.style.position) === -1) {
                                b.page.bottom = w.body.scrollHeight - m - o;
                                b.page.right = w.body.scrollWidth - p - r
                            }
                            if (typeof this.options.optimizations !== "undefined" && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== "undefined")) (function () {
                                var e = a.cache("target-offsetparent", function () {
                                    return C(a.target)
                                });
                                var t = a.cache("target-offsetparent-bounds", function () {
                                    return T(e)
                                });
                                var n = getComputedStyle(e);
                                var i = t;
                                var r = {};
                                ["Top", "Left", "Bottom", "Right"].forEach(function (e) {
                                    r[e.toLowerCase()] = parseFloat(n["border" + e + "Width"])
                                });
                                t.right = w.body.scrollWidth - t.left - i.width + r.right;
                                t.bottom = w.body.scrollHeight - t.top - i.height + r.bottom;
                                if (b.page.top >= t.top + r.top && b.page.bottom >= t.bottom) if (b.page.left >= t.left + r.left && b.page.right >= t.right) {
                                    var o = e.scrollTop;
                                    var s = e.scrollLeft;
                                    b.offset = {
                                        top: b.page.top - t.top + o - r.top,
                                        left: b.page.left - t.left + s - r.left
                                    }
                                }
                            })();
                            this.move(b);
                            this.history.unshift(b);
                            if (this.history.length > 3) this.history.pop();
                            if (t) O();
                            return true
                        }
                    }, {
                        key: "move", value: function e(t) {
                            var a = this;
                            if (!(typeof this.element.parentNode !== "undefined")) return;
                            var n = {};
                            for (var i in t) {
                                n[i] = {};
                                for (var r in t[i]) {
                                    var o = false;
                                    for (var s = 0; s < this.history.length; ++s) {
                                        var l = this.history[s];
                                        if (typeof l[i] !== "undefined" && !w(l[i][r], t[i][r])) {
                                            o = true;
                                            break
                                        }
                                    }
                                    if (!o) n[i][r] = true
                                }
                            }
                            var c = {top: "", left: "", right: "", bottom: ""};
                            var u = function e(t, n) {
                                var i = typeof a.options.optimizations !== "undefined";
                                var r = i ? a.options.optimizations.gpu : null;
                                if (r !== false) {
                                    var o = undefined, s = undefined;
                                    if (t.top) {
                                        c.top = 0;
                                        o = n.top
                                    } else {
                                        c.bottom = 0;
                                        o = -n.bottom
                                    }
                                    if (t.left) {
                                        c.left = 0;
                                        s = n.left
                                    } else {
                                        c.right = 0;
                                        s = -n.right
                                    }
                                    if (typeof window.devicePixelRatio === "number" && devicePixelRatio % 1 === 0) {
                                        s = Math.round(s * devicePixelRatio) / devicePixelRatio;
                                        o = Math.round(o * devicePixelRatio) / devicePixelRatio
                                    }
                                    c[x] = "translateX(" + s + "px) translateY(" + o + "px)";
                                    if (x !== "msTransform") c[x] += " translateZ(0)"
                                } else {
                                    if (t.top) c.top = n.top + "px"; else c.bottom = n.bottom + "px";
                                    if (t.left) c.left = n.left + "px"; else c.right = n.right + "px"
                                }
                            };
                            var f = false;
                            if ((n.page.top || n.page.bottom) && (n.page.left || n.page.right)) {
                                c.position = "absolute";
                                u(n.page, t.page)
                            } else if ((n.viewport.top || n.viewport.bottom) && (n.viewport.left || n.viewport.right)) {
                                c.position = "fixed";
                                u(n.viewport, t.viewport)
                            } else if (typeof n.offset !== "undefined" && n.offset.top && n.offset.left) (function () {
                                c.position = "absolute";
                                var e = a.cache("target-offsetparent", function () {
                                    return C(a.target)
                                });
                                if (C(a.element) !== e) k(function () {
                                    a.element.parentNode.removeChild(a.element);
                                    e.appendChild(a.element)
                                });
                                u(n.offset, t.offset);
                                f = true
                            })(); else {
                                c.position = "absolute";
                                u({top: true, left: true}, t.page)
                            }
                            if (!f) if (this.options.bodyElement) {
                                if (this.element.parentNode !== this.options.bodyElement) this.options.bodyElement.appendChild(this.element)
                            } else {
                                var d = function e(t) {
                                    var n = t.ownerDocument;
                                    var i = n.fullscreenElement || n.webkitFullscreenElement || n.mozFullScreenElement || n.msFullscreenElement;
                                    return i === t
                                };
                                var h = true;
                                var p = this.element.parentNode;
                                while (p && p.nodeType === 1 && p.tagName !== "BODY" && !d(p)) {
                                    if (getComputedStyle(p).position !== "static") {
                                        h = false;
                                        break
                                    }
                                    p = p.parentNode
                                }
                                if (!h) {
                                    this.element.parentNode.removeChild(this.element);
                                    this.element.ownerDocument.body.appendChild(this.element)
                                }
                            }
                            var m = {};
                            var g = false;
                            for (var r in c) {
                                var y = c[r];
                                var v = this.element.style[r];
                                if (v !== y) {
                                    g = true;
                                    m[r] = y
                                }
                            }
                            if (g) k(function () {
                                _(a.element.style, m);
                                a.trigger("repositioned")
                            })
                        }
                    }]);
                    return n
                }(e);
                $.modules = [], S.position = D;
                var q = _($, S);
                "use strict";
                var I = function () {
                        function n(e, t) {
                            var n = [];
                            var i = true;
                            var r = false;
                            var o = undefined;
                            try {
                                for (var s = e[Symbol.iterator](), a; !(i = (a = s.next()).done); i = true) {
                                    n.push(a.value);
                                    if (t && n.length === t) break
                                }
                            } catch (e) {
                                r = true;
                                o = e
                            } finally {
                                try {
                                    if (!i && s["return"]) s["return"]()
                                } finally {
                                    if (r) throw o
                                }
                            }
                            return n
                        }

                        return function (e, t) {
                            if (Array.isArray(e)) return e; else if (Symbol.iterator in Object(e)) return n(e, t); else throw new TypeError("Invalid attempt to destructure non-iterable instance")
                        }
                    }(), b, T = (b = S.Utils).getBounds, _ = b.extend, A = b.updateClasses, k = b.defer,
                    z = ["left", "top", "right", "bottom"];

                function U(e, o) {
                    if (o === "scrollParent") o = e.scrollParents[0]; else if (o === "window") o = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
                    if (o === document) o = o.documentElement;
                    if (typeof o.nodeType !== "undefined") (function () {
                        var e = o;
                        var t = T(o);
                        var n = t;
                        var i = getComputedStyle(o);
                        o = [n.left, n.top, t.width + n.left, t.height + n.top];
                        if (e.ownerDocument !== document) {
                            var r = e.ownerDocument.defaultView;
                            o[0] += r.pageXOffset;
                            o[1] += r.pageYOffset;
                            o[2] += r.pageXOffset;
                            o[3] += r.pageYOffset
                        }
                        z.forEach(function (e, t) {
                            e = e[0].toUpperCase() + e.substr(1);
                            if (e === "Top" || e === "Left") o[t] += parseFloat(i["border" + e + "Width"]); else o[t] -= parseFloat(i["border" + e + "Width"])
                        })
                    })();
                    return o
                }

                S.modules.push({
                    position: function e(t) {
                        var f = this;
                        var d = t.top;
                        var h = t.left;
                        var p = t.targetAttachment;
                        if (!this.options.constraints) return true;
                        var n = this.cache("element-bounds", function () {
                            return T(f.element)
                        });
                        var m = n.height;
                        var g = n.width;
                        if (g === 0 && m === 0 && typeof this.lastSize !== "undefined") {
                            var i = this.lastSize;
                            g = i.width;
                            m = i.height
                        }
                        var r = this.cache("target-bounds", function () {
                            return f.getTargetBounds()
                        });
                        var y = r.height;
                        var v = r.width;
                        var o = [this.getClass("pinned"), this.getClass("out-of-bounds")];
                        this.options.constraints.forEach(function (e) {
                            var t = e.outOfBoundsClass;
                            var n = e.pinnedClass;
                            if (t) o.push(t);
                            if (n) o.push(n)
                        });
                        o.forEach(function (t) {
                            ["left", "top", "right", "bottom"].forEach(function (e) {
                                o.push(t + "-" + e)
                            })
                        });
                        var b = [];
                        var w = _({}, p);
                        var x = _({}, this.attachment);
                        this.options.constraints.forEach(function (e) {
                            var t = e.to;
                            var n = e.attachment;
                            var i = e.pin;
                            if (typeof n === "undefined") n = "";
                            var r = undefined, o = undefined;
                            if (n.indexOf(" ") >= 0) {
                                var s = n.split(" ");
                                var a = I(s, 2);
                                o = a[0];
                                r = a[1]
                            } else r = o = n;
                            var l = U(f, t);
                            if (o === "target" || o === "both") {
                                if (d < l[1] && w.top === "top") {
                                    d += y;
                                    w.top = "bottom"
                                }
                                if (d + m > l[3] && w.top === "bottom") {
                                    d -= y;
                                    w.top = "top"
                                }
                            }
                            if (o === "together") {
                                if (w.top === "top") if (x.top === "bottom" && d < l[1]) {
                                    d += y;
                                    w.top = "bottom";
                                    d += m;
                                    x.top = "top"
                                } else if (x.top === "top" && d + m > l[3] && d - (m - y) >= l[1]) {
                                    d -= m - y;
                                    w.top = "bottom";
                                    x.top = "bottom"
                                }
                                if (w.top === "bottom") if (x.top === "top" && d + m > l[3]) {
                                    d -= y;
                                    w.top = "top";
                                    d -= m;
                                    x.top = "bottom"
                                } else if (x.top === "bottom" && d < l[1] && d + (m * 2 - y) <= l[3]) {
                                    d += m - y;
                                    w.top = "top";
                                    x.top = "top"
                                }
                                if (w.top === "middle") if (d + m > l[3] && x.top === "top") {
                                    d -= m;
                                    x.top = "bottom"
                                } else if (d < l[1] && x.top === "bottom") {
                                    d += m;
                                    x.top = "top"
                                }
                            }
                            if (r === "target" || r === "both") {
                                if (h < l[0] && w.left === "left") {
                                    h += v;
                                    w.left = "right"
                                }
                                if (h + g > l[2] && w.left === "right") {
                                    h -= v;
                                    w.left = "left"
                                }
                            }
                            if (r === "together") if (h < l[0] && w.left === "left") {
                                if (x.left === "right") {
                                    h += v;
                                    w.left = "right";
                                    h += g;
                                    x.left = "left"
                                } else if (x.left === "left") {
                                    h += v;
                                    w.left = "right";
                                    h -= g;
                                    x.left = "right"
                                }
                            } else if (h + g > l[2] && w.left === "right") {
                                if (x.left === "left") {
                                    h -= v;
                                    w.left = "left";
                                    h -= g;
                                    x.left = "right"
                                } else if (x.left === "right") {
                                    h -= v;
                                    w.left = "left";
                                    h += g;
                                    x.left = "left"
                                }
                            } else if (w.left === "center") if (h + g > l[2] && x.left === "left") {
                                h -= g;
                                x.left = "right"
                            } else if (h < l[0] && x.left === "right") {
                                h += g;
                                x.left = "left"
                            }
                            if (o === "element" || o === "both") {
                                if (d < l[1] && x.top === "bottom") {
                                    d += m;
                                    x.top = "top"
                                }
                                if (d + m > l[3] && x.top === "top") {
                                    d -= m;
                                    x.top = "bottom"
                                }
                            }
                            if (r === "element" || r === "both") {
                                if (h < l[0]) if (x.left === "right") {
                                    h += g;
                                    x.left = "left"
                                } else if (x.left === "center") {
                                    h += g / 2;
                                    x.left = "left"
                                }
                                if (h + g > l[2]) if (x.left === "left") {
                                    h -= g;
                                    x.left = "right"
                                } else if (x.left === "center") {
                                    h -= g / 2;
                                    x.left = "right"
                                }
                            }
                            if (typeof i === "string") i = i.split(",").map(function (e) {
                                return e.trim()
                            }); else if (i === true) i = ["top", "left", "right", "bottom"];
                            i = i || [];
                            var c = [];
                            var u = [];
                            if (d < l[1]) if (i.indexOf("top") >= 0) {
                                d = l[1];
                                c.push("top")
                            } else u.push("top");
                            if (d + m > l[3]) if (i.indexOf("bottom") >= 0) {
                                d = l[3] - m;
                                c.push("bottom")
                            } else u.push("bottom");
                            if (h < l[0]) if (i.indexOf("left") >= 0) {
                                h = l[0];
                                c.push("left")
                            } else u.push("left");
                            if (h + g > l[2]) if (i.indexOf("right") >= 0) {
                                h = l[2] - g;
                                c.push("right")
                            } else u.push("right");
                            if (c.length) (function () {
                                var t = undefined;
                                if (typeof f.options.pinnedClass !== "undefined") t = f.options.pinnedClass; else t = f.getClass("pinned");
                                b.push(t);
                                c.forEach(function (e) {
                                    b.push(t + "-" + e)
                                })
                            })();
                            if (u.length) (function () {
                                var t = undefined;
                                if (typeof f.options.outOfBoundsClass !== "undefined") t = f.options.outOfBoundsClass; else t = f.getClass("out-of-bounds");
                                b.push(t);
                                u.forEach(function (e) {
                                    b.push(t + "-" + e)
                                })
                            })();
                            if (c.indexOf("left") >= 0 || c.indexOf("right") >= 0) x.left = w.left = false;
                            if (c.indexOf("top") >= 0 || c.indexOf("bottom") >= 0) x.top = w.top = false;
                            if (w.top !== p.top || w.left !== p.left || x.top !== f.attachment.top || x.left !== f.attachment.left) {
                                f.updateAttachClasses(x, w);
                                f.trigger("update", {attachment: x, targetAttachment: w})
                            }
                        });
                        k(function () {
                            if (!(f.options.addTargetClasses === false)) A(f.target, b, o);
                            A(f.element, b, o)
                        });
                        return {top: d, left: h}
                    }
                });
                var b, T = (b = S.Utils).getBounds, A = b.updateClasses, k = b.defer;
                S.modules.push({
                    position: function e(t) {
                        var n = this;
                        var i = t.top;
                        var r = t.left;
                        var o = this.cache("element-bounds", function () {
                            return T(n.element)
                        });
                        var s = o.height;
                        var a = o.width;
                        var l = this.getTargetBounds();
                        var c = i + s;
                        var u = r + a;
                        var f = [];
                        if (i <= l.bottom && c >= l.top) ["left", "right"].forEach(function (e) {
                            var t = l[e];
                            if (t === r || t === u) f.push(e)
                        });
                        if (r <= l.right && u >= l.left) ["top", "bottom"].forEach(function (e) {
                            var t = l[e];
                            if (t === i || t === c) f.push(e)
                        });
                        var d = [];
                        var h = [];
                        var p = ["left", "top", "right", "bottom"];
                        d.push(this.getClass("abutted"));
                        p.forEach(function (e) {
                            d.push(n.getClass("abutted") + "-" + e)
                        });
                        if (f.length) h.push(this.getClass("abutted"));
                        f.forEach(function (e) {
                            h.push(n.getClass("abutted") + "-" + e)
                        });
                        k(function () {
                            if (!(n.options.addTargetClasses === false)) A(n.target, h, d);
                            A(n.element, h, d)
                        });
                        return true
                    }
                });
                var I = function () {
                    function n(e, t) {
                        var n = [];
                        var i = true;
                        var r = false;
                        var o = undefined;
                        try {
                            for (var s = e[Symbol.iterator](), a; !(i = (a = s.next()).done); i = true) {
                                n.push(a.value);
                                if (t && n.length === t) break
                            }
                        } catch (e) {
                            r = true;
                            o = e
                        } finally {
                            try {
                                if (!i && s["return"]) s["return"]()
                            } finally {
                                if (r) throw o
                            }
                        }
                        return n
                    }

                    return function (e, t) {
                        if (Array.isArray(e)) return e; else if (Symbol.iterator in Object(e)) return n(e, t); else throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }();
                return S.modules.push({
                    position: function e(t) {
                        var n = t.top;
                        var i = t.left;
                        if (!this.options.shift) return;
                        var r = this.options.shift;
                        if (typeof this.options.shift === "function") r = this.options.shift.call(this, {
                            top: n,
                            left: i
                        });
                        var o = undefined, s = undefined;
                        if (typeof r === "string") {
                            r = r.split(" ");
                            r[1] = r[1] || r[0];
                            var a = r;
                            var l = I(a, 2);
                            o = l[0];
                            s = l[1];
                            o = parseFloat(o, 10);
                            s = parseFloat(s, 10)
                        } else {
                            o = r.top;
                            s = r.left
                        }
                        n += o;
                        i += s;
                        return {top: n, left: i}
                    }
                }), q
            }) ? n.apply(t, []) : n) || (e.exports = n)
        }, 5: (t, n, i) => {
            var r;
            !function (t) {
                "use strict";
                if (!t.jQuery) {
                    var c = function (e, t) {
                        return new c.fn.init(e, t)
                    };
                    c.isWindow = function (e) {
                        return e && e === e.window
                    }, c.type = function (e) {
                        return e ? "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e : e + ""
                    }, c.isArray = Array.isArray || function (e) {
                        return "array" === c.type(e)
                    }, c.isPlainObject = function (e) {
                        if (!e || "object" !== c.type(e) || e.nodeType || c.isWindow(e)) return !1;
                        try {
                            if (e.constructor && !i.call(e, "constructor") && !i.call(e.constructor.prototype, "isPrototypeOf")) return !1
                        } catch (e) {
                            return !1
                        }
                        for (var t in e) ;
                        return void 0 === t || i.call(e, t)
                    }, c.each = function (e, t, n) {
                        var i = 0, r = e.length, o = a(e);
                        if (n) {
                            if (o) for (; i < r && !1 !== t.apply(e[i], n); i++) ; else for (i in e) if (e.hasOwnProperty(i) && !1 === t.apply(e[i], n)) break
                        } else if (o) for (; i < r && !1 !== t.call(e[i], i, e[i]); i++) ; else for (i in e) if (e.hasOwnProperty(i) && !1 === t.call(e[i], i, e[i])) break;
                        return e
                    }, c.data = function (e, t, n) {
                        if (void 0 === n) {
                            var i = e[c.expando], i = i && r[i];
                            return void 0 === t ? i : i && t in i ? i[t] : void 0
                        }
                        if (void 0 !== t) {
                            e = e[c.expando] || (e[c.expando] = ++c.uuid);
                            return r[e] = r[e] || {}, r[e][t] = n
                        }
                    }, c.removeData = function (e, t) {
                        var e = e[c.expando], n = e && r[e];
                        n && (t ? c.each(t, function (e, t) {
                            delete n[t]
                        }) : delete r[e])
                    }, c.extend = function () {
                        var e, t, n, i, r, o = arguments[0] || {}, s = 1, a = arguments.length, l = !1;
                        for ("boolean" == typeof o && (l = o, o = arguments[s] || {}, s++), "object" != typeof o && "function" !== c.type(o) && (o = {}), s === a && (o = this, s--); s < a; s++) if (i = arguments[s]) for (n in i) i.hasOwnProperty(n) && (r = o[n], o !== (t = i[n]) && (l && t && (c.isPlainObject(t) || (e = c.isArray(t))) ? (r = e ? (e = !1, r && c.isArray(r) ? r : []) : r && c.isPlainObject(r) ? r : {}, o[n] = c.extend(l, r, t)) : void 0 !== t && (o[n] = t)));
                        return o
                    }, c.queue = function (e, t, n) {
                        function i(e, t) {
                            t = t || [];
                            return e && (a(Object(e)) ? function (e, t) {
                                for (var n = +t.length, i = 0, r = e.length; i < n;) e[r++] = t[i++];
                                if (n != n) for (; void 0 !== t[i];) e[r++] = t[i++];
                                e.length = r
                            }(t, "string" == typeof e ? [e] : e) : [].push.call(t, e)), t
                        }

                        if (e) {
                            var r = c.data(e, t = (t || "fx") + "queue");
                            return n ? (!r || c.isArray(n) ? r = c.data(e, t, i(n)) : r.push(n), r) : r || []
                        }
                    }, c.dequeue = function (e, r) {
                        c.each(e.nodeType ? [e] : e, function (e, t) {
                            r = r || "fx";
                            var n = c.queue(t, r), i = n.shift();
                            (i = "inprogress" === i ? n.shift() : i) && ("fx" === r && n.unshift("inprogress"), i.call(t, function () {
                                c.dequeue(t, r)
                            }))
                        })
                    }, c.fn = c.prototype = {
                        init: function (e) {
                            if (e.nodeType) return this[0] = e, this;
                            throw new Error("Not a DOM node.")
                        }, offset: function () {
                            var e = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {top: 0, left: 0};
                            return {
                                top: e.top + (t.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                                left: e.left + (t.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                            }
                        }, position: function () {
                            var e = this[0], t = function (e) {
                                    for (var t = e.offsetParent; t && "html" !== t.nodeName.toLowerCase() && t.style && "static" === t.style.position;) t = t.offsetParent;
                                    return t || document
                                }(e), n = this.offset(),
                                i = /^(?:body|html)$/i.test(t.nodeName) ? {top: 0, left: 0} : c(t).offset();
                            return n.top -= parseFloat(e.style.marginTop) || 0, n.left -= parseFloat(e.style.marginLeft) || 0, t.style && (i.top += parseFloat(t.style.borderTopWidth) || 0, i.left += parseFloat(t.style.borderLeftWidth) || 0), {
                                top: n.top - i.top,
                                left: n.left - i.left
                            }
                        }
                    };
                    var r = {};
                    c.expando = "velocity" + (new Date).getTime(), c.uuid = 0;
                    for (var n = {}, i = n.hasOwnProperty, o = n.toString, e = "Boolean Number String Function Array Date RegExp Object Error".split(" "), s = 0; s < e.length; s++) n["[object " + e[s] + "]"] = e[s].toLowerCase();
                    c.fn.init.prototype = c.fn, t.Velocity = {Utilities: c}
                }

                function a(e) {
                    var t = e.length, n = c.type(e);
                    return "function" !== n && !c.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e))
                }
            }(window), function (e) {
                "use strict";
                "object" == typeof t.exports ? t.exports = e() : void 0 === (r = "function" == typeof (r = e) ? r.call(n, i, n, t) : r) || (t.exports = r)
            }(function () {
                "use strict";
                return function (e, H, R, $) {
                    var i, t, T = function () {
                            if (R.documentMode) return R.documentMode;
                            for (var e = 7; 4 < e; e--) {
                                var t = R.createElement("div");
                                if (t.innerHTML = "\x3c!--[if IE " + e + "]><span></span><![endif]--\x3e", t.getElementsByTagName("span").length) return t = null, e
                            }
                            return $
                        }(), n = (i = 0, H.webkitRequestAnimationFrame || H.mozRequestAnimationFrame || function (e) {
                            var t = (new Date).getTime(), n = Math.max(0, 16 - (t - i));
                            return i = t + n, setTimeout(function () {
                                e(t + n)
                            }, n)
                        }),
                        C = ("function" != typeof (o = H.performance || {}).now && (t = o.timing && o.timing.navigationStart ? o.timing.navigationStart : (new Date).getTime(), o.now = function () {
                            return (new Date).getTime() - t
                        }), o);

                    function q() {
                        return Array.prototype.includes ? function (e, t) {
                            return e.includes(t)
                        } : Array.prototype.indexOf ? function (e, t) {
                            return 0 <= e.indexOf(t)
                        } : function (e, t) {
                            for (var n = 0; n < e.length; n++) if (e[n] === t) return !0;
                            return !1
                        }
                    }

                    var r = function () {
                        var a = Array.prototype.slice;
                        try {
                            return a.call(R.documentElement), a
                        } catch (e) {
                            return function (e, t) {
                                var n = this.length;
                                if ("number" != typeof e && (e = 0), "number" != typeof t && (t = n), this.slice) return a.call(this, e, t);
                                var i, r = [], o = 0 <= e ? e : Math.max(0, n + e),
                                    s = (t < 0 ? n + t : Math.min(t, n)) - o;
                                if (0 < s) if (r = new Array(s), this.charAt) for (i = 0; i < s; i++) r[i] = this.charAt(o + i); else for (i = 0; i < s; i++) r[i] = this[o + i];
                                return r
                            }
                        }
                    }();

                    function g(e) {
                        return U.isWrapped(e) ? e = r.call(e) : U.isNode(e) && (e = [e]), e
                    }

                    var z, U = {
                        isNumber: function (e) {
                            return "number" == typeof e
                        }, isString: function (e) {
                            return "string" == typeof e
                        }, isArray: Array.isArray || function (e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }, isFunction: function (e) {
                            return "[object Function]" === Object.prototype.toString.call(e)
                        }, isNode: function (e) {
                            return e && e.nodeType
                        }, isWrapped: function (e) {
                            return e && e !== H && U.isNumber(e.length) && !U.isString(e) && !U.isFunction(e) && !U.isNode(e) && (0 === e.length || U.isNode(e[0]))
                        }, isSVG: function (e) {
                            return H.SVGElement && e instanceof H.SVGElement
                        }, isEmptyObject: function (e) {
                            for (var t in e) if (e.hasOwnProperty(t)) return !1;
                            return !0
                        }
                    }, o = !1;
                    if (e.fn && e.fn.jquery ? (z = e, o = !0) : z = H.Velocity.Utilities, T <= 8 && !o) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
                    if (!(T <= 7)) {
                        var s = "swing", Q = {
                            State: {
                                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                                isAndroid: /Android/i.test(navigator.userAgent),
                                isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
                                isChrome: H.chrome,
                                isFirefox: /Firefox/i.test(navigator.userAgent),
                                prefixElement: R.createElement("div"),
                                prefixMatches: {},
                                scrollAnchor: null,
                                scrollPropertyLeft: null,
                                scrollPropertyTop: null,
                                isTicking: !1,
                                calls: [],
                                delayedElements: {count: 0}
                            },
                            CSS: {},
                            Utilities: z,
                            Redirects: {},
                            Easings: {},
                            Promise: H.Promise,
                            defaults: {
                                queue: "",
                                duration: 400,
                                easing: s,
                                begin: $,
                                complete: $,
                                progress: $,
                                display: $,
                                visibility: $,
                                loop: !1,
                                delay: !1,
                                mobileHA: !0,
                                _cacheValues: !0,
                                promiseRejectEmpty: !0
                            },
                            init: function (e) {
                                z.data(e, "velocity", {
                                    isSVG: U.isSVG(e),
                                    isAnimating: !1,
                                    computedStyle: null,
                                    tweensContainer: null,
                                    rootPropertyValueCache: {},
                                    transformCache: {}
                                })
                            },
                            hook: null,
                            mock: !1,
                            version: {major: 1, minor: 5, patch: 0},
                            debug: !1,
                            timestamp: !0,
                            pauseAll: function (n) {
                                var i = (new Date).getTime();
                                z.each(Q.State.calls, function (e, t) {
                                    if (t) {
                                        if (n !== $ && (t[2].queue !== n || !1 === t[2].queue)) return !0;
                                        t[5] = {resume: !1}
                                    }
                                }), z.each(Q.State.delayedElements, function (e, t) {
                                    t && v(t, i)
                                })
                            },
                            resumeAll: function (n) {
                                var e = (new Date).getTime();
                                z.each(Q.State.calls, function (e, t) {
                                    if (t) {
                                        if (n !== $ && (t[2].queue !== n || !1 === t[2].queue)) return !0;
                                        t[5] && (t[5].resume = !0)
                                    }
                                }), z.each(Q.State.delayedElements, function (e, t) {
                                    t && b(t)
                                })
                            }
                        };
                        H.pageYOffset !== $ ? (Q.State.scrollAnchor = H, Q.State.scrollPropertyLeft = "pageXOffset", Q.State.scrollPropertyTop = "pageYOffset") : (Q.State.scrollAnchor = R.documentElement || R.body.parentNode || R.body, Q.State.scrollPropertyLeft = "scrollLeft", Q.State.scrollPropertyTop = "scrollTop");
                        var a = function e(t, n, i) {
                            var r, o, s, a, l, c, u, f, d, h, p = {x: -1, v: 0, tension: null, friction: null}, m = [0],
                                g = 0;
                            for (t = parseFloat(t) || 500, n = parseFloat(n) || 20, i = i || null, p.tension = t, p.friction = n, o = (r = null !== i) ? (g = e(t, n)) / i * .016 : .016; l = o, d = h = d = f = u = c = void 0, c = {
                                dx: (a = s || p).v,
                                dv: w(a)
                            }, u = x(a, .5 * l, c), f = x(a, .5 * l, u), d = x(a, l, f), h = 1 / 6 * (c.dx + 2 * (u.dx + f.dx) + d.dx), d = 1 / 6 * (c.dv + 2 * (u.dv + f.dv) + d.dv), a.x = a.x + h * l, a.v = a.v + d * l, m.push(1 + (s = a).x), g += 16, 1e-4 < Math.abs(s.x) && 1e-4 < Math.abs(s.v);) ;
                            return r ? function (e) {
                                return m[e * (m.length - 1) | 0]
                            } : g
                        };
                        Q.Easings = {
                            linear: function (e) {
                                return e
                            }, swing: function (e) {
                                return .5 - Math.cos(e * Math.PI) / 2
                            }, spring: function (e) {
                                return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                            }
                        }, z.each([["ease", [.25, .1, .25, 1]], ["ease-in", [.42, 0, 1, 1]], ["ease-out", [0, 0, .58, 1]], ["ease-in-out", [.42, 0, .58, 1]], ["easeInSine", [.47, 0, .745, .715]], ["easeOutSine", [.39, .575, .565, 1]], ["easeInOutSine", [.445, .05, .55, .95]], ["easeInQuad", [.55, .085, .68, .53]], ["easeOutQuad", [.25, .46, .45, .94]], ["easeInOutQuad", [.455, .03, .515, .955]], ["easeInCubic", [.55, .055, .675, .19]], ["easeOutCubic", [.215, .61, .355, 1]], ["easeInOutCubic", [.645, .045, .355, 1]], ["easeInQuart", [.895, .03, .685, .22]], ["easeOutQuart", [.165, .84, .44, 1]], ["easeInOutQuart", [.77, 0, .175, 1]], ["easeInQuint", [.755, .05, .855, .06]], ["easeOutQuint", [.23, 1, .32, 1]], ["easeInOutQuint", [.86, 0, .07, 1]], ["easeInExpo", [.95, .05, .795, .035]], ["easeOutExpo", [.19, 1, .22, 1]], ["easeInOutExpo", [1, 0, 0, 1]], ["easeInCirc", [.6, .04, .98, .335]], ["easeOutCirc", [.075, .82, .165, 1]], ["easeInOutCirc", [.785, .135, .15, .86]]], function (e, t) {
                            Q.Easings[t[0]] = l.apply(null, t[1])
                        });
                        var Y = Q.CSS = {
                            RegEx: {
                                isHex: /^#([A-f\d]{3}){1,2}$/i,
                                valueUnwrap: /^[A-z]+\((.*)\)$/i,
                                wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                                valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                            }, Lists: {
                                colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                                transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                                transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
                                units: ["%", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px", "deg", "grad", "rad", "turn", "s", "ms"],
                                colorNames: {
                                    aliceblue: "240,248,255",
                                    antiquewhite: "250,235,215",
                                    aquamarine: "127,255,212",
                                    aqua: "0,255,255",
                                    azure: "240,255,255",
                                    beige: "245,245,220",
                                    bisque: "255,228,196",
                                    black: "0,0,0",
                                    blanchedalmond: "255,235,205",
                                    blueviolet: "138,43,226",
                                    blue: "0,0,255",
                                    brown: "165,42,42",
                                    burlywood: "222,184,135",
                                    cadetblue: "95,158,160",
                                    chartreuse: "127,255,0",
                                    chocolate: "210,105,30",
                                    coral: "255,127,80",
                                    cornflowerblue: "100,149,237",
                                    cornsilk: "255,248,220",
                                    crimson: "220,20,60",
                                    cyan: "0,255,255",
                                    darkblue: "0,0,139",
                                    darkcyan: "0,139,139",
                                    darkgoldenrod: "184,134,11",
                                    darkgray: "169,169,169",
                                    darkgrey: "169,169,169",
                                    darkgreen: "0,100,0",
                                    darkkhaki: "189,183,107",
                                    darkmagenta: "139,0,139",
                                    darkolivegreen: "85,107,47",
                                    darkorange: "255,140,0",
                                    darkorchid: "153,50,204",
                                    darkred: "139,0,0",
                                    darksalmon: "233,150,122",
                                    darkseagreen: "143,188,143",
                                    darkslateblue: "72,61,139",
                                    darkslategray: "47,79,79",
                                    darkturquoise: "0,206,209",
                                    darkviolet: "148,0,211",
                                    deeppink: "255,20,147",
                                    deepskyblue: "0,191,255",
                                    dimgray: "105,105,105",
                                    dimgrey: "105,105,105",
                                    dodgerblue: "30,144,255",
                                    firebrick: "178,34,34",
                                    floralwhite: "255,250,240",
                                    forestgreen: "34,139,34",
                                    fuchsia: "255,0,255",
                                    gainsboro: "220,220,220",
                                    ghostwhite: "248,248,255",
                                    gold: "255,215,0",
                                    goldenrod: "218,165,32",
                                    gray: "128,128,128",
                                    grey: "128,128,128",
                                    greenyellow: "173,255,47",
                                    green: "0,128,0",
                                    honeydew: "240,255,240",
                                    hotpink: "255,105,180",
                                    indianred: "205,92,92",
                                    indigo: "75,0,130",
                                    ivory: "255,255,240",
                                    khaki: "240,230,140",
                                    lavenderblush: "255,240,245",
                                    lavender: "230,230,250",
                                    lawngreen: "124,252,0",
                                    lemonchiffon: "255,250,205",
                                    lightblue: "173,216,230",
                                    lightcoral: "240,128,128",
                                    lightcyan: "224,255,255",
                                    lightgoldenrodyellow: "250,250,210",
                                    lightgray: "211,211,211",
                                    lightgrey: "211,211,211",
                                    lightgreen: "144,238,144",
                                    lightpink: "255,182,193",
                                    lightsalmon: "255,160,122",
                                    lightseagreen: "32,178,170",
                                    lightskyblue: "135,206,250",
                                    lightslategray: "119,136,153",
                                    lightsteelblue: "176,196,222",
                                    lightyellow: "255,255,224",
                                    limegreen: "50,205,50",
                                    lime: "0,255,0",
                                    linen: "250,240,230",
                                    magenta: "255,0,255",
                                    maroon: "128,0,0",
                                    mediumaquamarine: "102,205,170",
                                    mediumblue: "0,0,205",
                                    mediumorchid: "186,85,211",
                                    mediumpurple: "147,112,219",
                                    mediumseagreen: "60,179,113",
                                    mediumslateblue: "123,104,238",
                                    mediumspringgreen: "0,250,154",
                                    mediumturquoise: "72,209,204",
                                    mediumvioletred: "199,21,133",
                                    midnightblue: "25,25,112",
                                    mintcream: "245,255,250",
                                    mistyrose: "255,228,225",
                                    moccasin: "255,228,181",
                                    navajowhite: "255,222,173",
                                    navy: "0,0,128",
                                    oldlace: "253,245,230",
                                    olivedrab: "107,142,35",
                                    olive: "128,128,0",
                                    orangered: "255,69,0",
                                    orange: "255,165,0",
                                    orchid: "218,112,214",
                                    palegoldenrod: "238,232,170",
                                    palegreen: "152,251,152",
                                    paleturquoise: "175,238,238",
                                    palevioletred: "219,112,147",
                                    papayawhip: "255,239,213",
                                    peachpuff: "255,218,185",
                                    peru: "205,133,63",
                                    pink: "255,192,203",
                                    plum: "221,160,221",
                                    powderblue: "176,224,230",
                                    purple: "128,0,128",
                                    red: "255,0,0",
                                    rosybrown: "188,143,143",
                                    royalblue: "65,105,225",
                                    saddlebrown: "139,69,19",
                                    salmon: "250,128,114",
                                    sandybrown: "244,164,96",
                                    seagreen: "46,139,87",
                                    seashell: "255,245,238",
                                    sienna: "160,82,45",
                                    silver: "192,192,192",
                                    skyblue: "135,206,235",
                                    slateblue: "106,90,205",
                                    slategray: "112,128,144",
                                    snow: "255,250,250",
                                    springgreen: "0,255,127",
                                    steelblue: "70,130,180",
                                    tan: "210,180,140",
                                    teal: "0,128,128",
                                    thistle: "216,191,216",
                                    tomato: "255,99,71",
                                    turquoise: "64,224,208",
                                    violet: "238,130,238",
                                    wheat: "245,222,179",
                                    whitesmoke: "245,245,245",
                                    white: "255,255,255",
                                    yellowgreen: "154,205,50",
                                    yellow: "255,255,0"
                                }
                            }, Hooks: {
                                templates: {
                                    textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                                    boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                                    clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                                    backgroundPosition: ["X Y", "0% 0%"],
                                    transformOrigin: ["X Y Z", "50% 50% 0px"],
                                    perspectiveOrigin: ["X Y", "50% 50%"]
                                }, registered: {}, register: function () {
                                    for (var e, t, n, i, r, o = 0; o < Y.Lists.colors.length; o++) {
                                        var s = "color" === Y.Lists.colors[o] ? "0 0 0 1" : "255 255 255 1";
                                        Y.Hooks.templates[Y.Lists.colors[o]] = ["Red Green Blue Alpha", s]
                                    }
                                    if (T) for (e in Y.Hooks.templates) Y.Hooks.templates.hasOwnProperty(e) && (n = (t = Y.Hooks.templates[e])[0].split(" "), i = t[1].match(Y.RegEx.valueSplit), "Color" === n[0] && (n.push(n.shift()), i.push(i.shift()), Y.Hooks.templates[e] = [n.join(" "), i.join(" ")]));
                                    for (e in Y.Hooks.templates) if (Y.Hooks.templates.hasOwnProperty(e)) for (var a in n = (t = Y.Hooks.templates[e])[0].split(" ")) n.hasOwnProperty(a) && (r = e + n[a], Y.Hooks.registered[r] = [e, a])
                                }, getRoot: function (e) {
                                    var t = Y.Hooks.registered[e];
                                    return t ? t[0] : e
                                }, getUnit: function (e, t) {
                                    t = (e.substr(t || 0, 5).match(/^[a-z%]+/) || [])[0] || "";
                                    return t && q(Y.Lists.units) ? t : ""
                                }, fixColors: function (e) {
                                    return e.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function (e, t, n) {
                                        return Y.Lists.colorNames.hasOwnProperty(n) ? (t || "rgba(") + Y.Lists.colorNames[n] + (t ? "" : ",1)") : t + n
                                    })
                                }, cleanRootPropertyValue: function (e, t) {
                                    return Y.RegEx.valueUnwrap.test(t) && (t = t.match(Y.RegEx.valueUnwrap)[1]), t = Y.Values.isCSSNullValue(t) ? Y.Hooks.templates[e][1] : t
                                }, extractValue: function (e, t) {
                                    var n = Y.Hooks.registered[e];
                                    if (n) {
                                        e = n[0], n = n[1];
                                        return (t = Y.Hooks.cleanRootPropertyValue(e, t)).toString().match(Y.RegEx.valueSplit)[n]
                                    }
                                    return t
                                }, injectValue: function (e, t, n) {
                                    var i = Y.Hooks.registered[e];
                                    if (i) {
                                        e = i[0], i = i[1];
                                        return (e = (n = Y.Hooks.cleanRootPropertyValue(e, n)).toString().match(Y.RegEx.valueSplit))[i] = t, e.join(" ")
                                    }
                                    return n
                                }
                            }, Normalizations: {
                                registered: {
                                    clip: function (e, t, n) {
                                        switch (e) {
                                            case"name":
                                                return "clip";
                                            case"extract":
                                                var i = !Y.RegEx.wrappedValueAlreadyExtracted.test(n) && (i = n.toString().match(Y.RegEx.valueUnwrap)) ? i[1].replace(/,(\s+)?/g, " ") : n;
                                                return i;
                                            case"inject":
                                                return "rect(" + n + ")"
                                        }
                                    }, blur: function (e, t, n) {
                                        switch (e) {
                                            case"name":
                                                return Q.State.isFirefox ? "filter" : "-webkit-filter";
                                            case"extract":
                                                var i, r = parseFloat(n);
                                                return r = !r && 0 !== r ? (i = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i)) ? i[1] : 0 : r;
                                            case"inject":
                                                return parseFloat(n) ? "blur(" + n + ")" : "none"
                                        }
                                    }, opacity: function (e, t, n) {
                                        if (T <= 8) switch (e) {
                                            case"name":
                                                return "filter";
                                            case"extract":
                                                var i = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                                return n = i ? i[1] / 100 : 1;
                                            case"inject":
                                                return (t.style.zoom = 1) <= parseFloat(n) ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")"
                                        } else switch (e) {
                                            case"name":
                                                return "opacity";
                                            case"extract":
                                            case"inject":
                                                return n
                                        }
                                    }
                                }, register: function () {
                                    T && !(9 < T) || Q.State.isGingerbread || (Y.Lists.transformsBase = Y.Lists.transformsBase.concat(Y.Lists.transforms3D));
                                    for (var e = 0; e < Y.Lists.transformsBase.length; e++) !function () {
                                        var r = Y.Lists.transformsBase[e];
                                        Y.Normalizations.registered[r] = function (e, t, n) {
                                            switch (e) {
                                                case"name":
                                                    return "transform";
                                                case"extract":
                                                    return K(t) === $ || K(t).transformCache[r] === $ ? /^scale/i.test(r) ? 1 : 0 : K(t).transformCache[r].replace(/[()]/g, "");
                                                case"inject":
                                                    var i = !1;
                                                    switch (r.substr(0, r.length - 1)) {
                                                        case"translate":
                                                            i = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                                                            break;
                                                        case"scal":
                                                        case"scale":
                                                            Q.State.isAndroid && K(t).transformCache[r] === $ && n < 1 && (n = 1), i = !/(\d)$/i.test(n);
                                                            break;
                                                        case"skew":
                                                        case"rotate":
                                                            i = !/(deg|\d)$/i.test(n)
                                                    }
                                                    return i || (K(t).transformCache[r] = "(" + n + ")"), K(t).transformCache[r]
                                            }
                                        }
                                    }();
                                    for (var t = 0; t < Y.Lists.colors.length; t++) !function () {
                                        var o = Y.Lists.colors[t];
                                        Y.Normalizations.registered[o] = function (e, t, n) {
                                            switch (e) {
                                                case"name":
                                                    return o;
                                                case"extract":
                                                    var i, r = Y.RegEx.wrappedValueAlreadyExtracted.test(n) ? n : (i = {
                                                        black: "rgb(0, 0, 0)",
                                                        blue: "rgb(0, 0, 255)",
                                                        gray: "rgb(128, 128, 128)",
                                                        green: "rgb(0, 128, 0)",
                                                        red: "rgb(255, 0, 0)",
                                                        white: "rgb(255, 255, 255)"
                                                    }, /^[A-z]+$/i.test(n) ? r = i[n] !== $ ? i[n] : i.black : Y.RegEx.isHex.test(n) ? r = "rgb(" + Y.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (r = i.black), (r || n).toString().match(Y.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " "));
                                                    return (!T || 8 < T) && 3 === r.split(" ").length && (r += " 1"), r;
                                                case"inject":
                                                    return /^rgb/.test(n) ? n : (T <= 8 ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (T <= 8 ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")")
                                            }
                                        }
                                    }();

                                    function o(e, t, n) {
                                        if ("border-box" === Y.getPropertyValue(t, "boxSizing").toString().toLowerCase() !== (n || !1)) return 0;
                                        for (var i, r = 0, e = "width" === e ? ["Left", "Right"] : ["Top", "Bottom"], o = ["padding" + e[0], "padding" + e[1], "border" + e[0] + "Width", "border" + e[1] + "Width"], s = 0; s < o.length; s++) i = parseFloat(Y.getPropertyValue(t, o[s])), isNaN(i) || (r += i);
                                        return n ? -r : r
                                    }

                                    function n(i, r) {
                                        return function (e, t, n) {
                                            switch (e) {
                                                case"name":
                                                    return i;
                                                case"extract":
                                                    return parseFloat(n) + o(i, t, r);
                                                case"inject":
                                                    return parseFloat(n) - o(i, t, r) + "px"
                                            }
                                        }
                                    }

                                    Y.Normalizations.registered.innerWidth = n("width", !0), Y.Normalizations.registered.innerHeight = n("height", !0), Y.Normalizations.registered.outerWidth = n("width"), Y.Normalizations.registered.outerHeight = n("height")
                                }
                            }, Names: {
                                camelCase: function (e) {
                                    return e.replace(/-(\w)/g, function (e, t) {
                                        return t.toUpperCase()
                                    })
                                }, SVGAttribute: function (e) {
                                    var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                                    return (T || Q.State.isAndroid && !Q.State.isChrome) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                                }, prefixCheck: function (e) {
                                    if (Q.State.prefixMatches[e]) return [Q.State.prefixMatches[e], !0];
                                    for (var t = ["", "Webkit", "Moz", "ms", "O"], n = 0, i = t.length; n < i; n++) {
                                        var r = 0 === n ? e : t[n] + e.replace(/^\w/, function (e) {
                                            return e.toUpperCase()
                                        });
                                        if (U.isString(Q.State.prefixElement.style[r])) return [Q.State.prefixMatches[e] = r, !0]
                                    }
                                    return [e, !1]
                                }
                            }, Values: {
                                hexToRgb: function (e) {
                                    return e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (e, t, n, i) {
                                        return t + t + n + n + i + i
                                    }), (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)) ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : [0, 0, 0]
                                }, isCSSNullValue: function (e) {
                                    return !e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                                }, getUnitType: function (e) {
                                    return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                                }, getDisplayType: function (e) {
                                    e = e && e.tagName.toString().toLowerCase();
                                    return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(e) ? "inline" : /^(li)$/i.test(e) ? "list-item" : /^(tr)$/i.test(e) ? "table-row" : /^(table)$/i.test(e) ? "table" : /^(tbody)$/i.test(e) ? "table-row-group" : "block"
                                }, addClass: function (e, t) {
                                    var n;
                                    e && (e.classList ? e.classList.add(t) : U.isString(e.className) ? e.className += (e.className.length ? " " : "") + t : (n = e.getAttribute(T <= 7 ? "className" : "class") || "", e.setAttribute("class", n + (n ? " " : "") + t)))
                                }, removeClass: function (e, t) {
                                    var n;
                                    e && (e.classList ? e.classList.remove(t) : U.isString(e.className) ? e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ") : (n = e.getAttribute(T <= 7 ? "className" : "class") || "", e.setAttribute("class", n.replace(new RegExp("(^|s)" + t.split(" ").join("|") + "(s|$)", "gi"), " "))))
                                }
                            }, getPropertyValue: function (e, t, n, a) {
                                function l(e, t) {
                                    var n = 0;
                                    if (T <= 8) n = z.css(e, t); else {
                                        var i = !1;
                                        /^(width|height)$/.test(t) && 0 === Y.getPropertyValue(e, "display") && (i = !0, Y.setPropertyValue(e, "display", Y.Values.getDisplayType(e)));
                                        var r = function () {
                                            i && Y.setPropertyValue(e, "display", "none")
                                        };
                                        if (!a) {
                                            if ("height" === t && "border-box" !== Y.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                                var o = e.offsetHeight - (parseFloat(Y.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(Y.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(Y.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(Y.getPropertyValue(e, "paddingBottom")) || 0);
                                                return r(), o
                                            }
                                            if ("width" === t && "border-box" !== Y.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                                var s = e.offsetWidth - (parseFloat(Y.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(Y.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(Y.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(Y.getPropertyValue(e, "paddingRight")) || 0);
                                                return r(), s
                                            }
                                        }
                                        s = K(e) === $ ? H.getComputedStyle(e, null) : K(e).computedStyle ? K(e).computedStyle : K(e).computedStyle = H.getComputedStyle(e, null), "borderColor" === t && (t = "borderTopColor"), "" !== (n = 9 === T && "filter" === t ? s.getPropertyValue(t) : s[t]) && null !== n || (n = e.style[t]), r()
                                    }
                                    return "auto" !== n || !/^(top|right|bottom|left)$/i.test(t) || ("fixed" === (r = l(e, "position")) || "absolute" === r && /top|left/i.test(t)) && (n = z(e).position()[t] + "px"), n
                                }

                                var i, r;
                                if (Y.Hooks.registered[t] ? (r = Y.Hooks.getRoot(i = t), n === $ && (n = Y.getPropertyValue(e, Y.Names.prefixCheck(r)[0])), Y.Normalizations.registered[r] && (n = Y.Normalizations.registered[r]("extract", e, n)), i = Y.Hooks.extractValue(i, n)) : Y.Normalizations.registered[t] && ("transform" !== (n = Y.Normalizations.registered[t]("name", e)) && (o = l(e, Y.Names.prefixCheck(n)[0]), Y.Values.isCSSNullValue(o) && Y.Hooks.templates[t] && (o = Y.Hooks.templates[t][1])), i = Y.Normalizations.registered[t]("extract", e, o)), !/^[\d-]/.test(i)) {
                                    var o = K(e);
                                    if (o && o.isSVG && Y.Names.SVGAttribute(t)) if (/^(height|width)$/i.test(t)) try {
                                        i = e.getBBox()[t]
                                    } catch (e) {
                                        i = 0
                                    } else i = e.getAttribute(t); else i = l(e, Y.Names.prefixCheck(t)[0])
                                }
                                return Y.Values.isCSSNullValue(i) && (i = 0), Q.debug, i
                            }, setPropertyValue: function (e, t, n, i, r) {
                                var o = t;
                                if ("scroll" === t) r.container ? r.container["scroll" + r.direction] = n : "Left" === r.direction ? H.scrollTo(n, r.alternateValue) : H.scrollTo(r.alternateValue, n); else if (Y.Normalizations.registered[t] && "transform" === Y.Normalizations.registered[t]("name", e)) Y.Normalizations.registered[t]("inject", e, n), o = "transform", n = K(e).transformCache[t]; else {
                                    if (Y.Hooks.registered[t] && (s = Y.Hooks.getRoot(r = t), i = i || Y.getPropertyValue(e, s), n = Y.Hooks.injectValue(r, n, i), t = s), Y.Normalizations.registered[t] && (n = Y.Normalizations.registered[t]("inject", e, n), t = Y.Normalizations.registered[t]("name", e)), o = Y.Names.prefixCheck(t)[0], T <= 8) try {
                                        e.style[o] = n
                                    } catch (e) {
                                        Q.debug
                                    } else {
                                        var s = K(e);
                                        s && s.isSVG && Y.Names.SVGAttribute(t) ? e.setAttribute(t, n) : e.style[o] = n
                                    }
                                    Q.debug
                                }
                                return [o, n]
                            }, flushTransformCache: function (t) {
                                var n, i, r, o = "", e = K(t);
                                (T || Q.State.isAndroid && !Q.State.isChrome) && e && e.isSVG ? (n = {
                                    translate: [(e = function (e) {
                                        return parseFloat(Y.getPropertyValue(t, e))
                                    })("translateX"), e("translateY")],
                                    skewX: [e("skewX")],
                                    skewY: [e("skewY")],
                                    scale: 1 !== e("scale") ? [e("scale"), e("scale")] : [e("scaleX"), e("scaleY")],
                                    rotate: [e("rotateZ"), 0, 0]
                                }, z.each(K(t).transformCache, function (e) {
                                    /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), n[e] && (o += e + "(" + n[e].join(" ") + ") ", delete n[e])
                                })) : (z.each(K(t).transformCache, function (e) {
                                    return i = K(t).transformCache[e], "transformPerspective" === e ? (r = i, !0) : void (o += (e = 9 === T && "rotateZ" === e ? "rotate" : e) + i + " ")
                                }), r && (o = "perspective" + r + " " + o)), Y.setPropertyValue(t, "transform", o)
                            }
                        };
                        Y.Hooks.register(), Y.Normalizations.register(), Q.hook = function (e, i, r) {
                            var o;
                            return e = g(e), z.each(e, function (e, t) {
                                var n;
                                K(t) === $ && Q.init(t), r === $ ? o === $ && (o = Y.getPropertyValue(t, i)) : ("transform" === (n = Y.setPropertyValue(t, i, r))[0] && Q.CSS.flushTransformCache(t), o = n)
                            }), o
                        };
                        var y = function () {
                            function e() {
                                return t ? k.promise || null : n
                            }

                            var t, n, i, E, A,
                                r = arguments[0] && (arguments[0].p || z.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || U.isString(arguments[0].properties));
                            U.isWrapped(this) ? (t = !1, i = 0, n = E = this) : (t = !0, i = 1, E = r ? arguments[0].elements || arguments[0].e : arguments[0]);
                            var k = {promise: null, resolver: null, rejecter: null};
                            if (t && Q.Promise && (k.promise = new Q.Promise(function (e, t) {
                                k.resolver = e, k.rejecter = t
                            })), V = r ? (A = arguments[0].properties || arguments[0].p, arguments[0].options || arguments[0].o) : (A = arguments[i], arguments[i + 1]), E = g(E)) {
                                var B, F = E.length, L = 0;
                                if (!/^(stop|finish|finishAll|pause|resume)$/i.test(A) && !z.isPlainObject(V)) for (var V = {}, o = i + 1; o < arguments.length; o++) U.isArray(arguments[o]) || !/^(fast|normal|slow)$/i.test(arguments[o]) && !/^\d/.test(arguments[o]) ? U.isString(arguments[o]) || U.isArray(arguments[o]) ? V.easing = arguments[o] : U.isFunction(arguments[o]) && (V.complete = arguments[o]) : V.duration = arguments[o];
                                switch (A) {
                                    case"scroll":
                                        B = "scroll";
                                        break;
                                    case"reverse":
                                        B = "reverse";
                                        break;
                                    case"pause":
                                        var s = (new Date).getTime();
                                        return z.each(E, function (e, t) {
                                            v(t, s)
                                        }), z.each(Q.State.calls, function (e, i) {
                                            var r = !1;
                                            i && z.each(i[1], function (e, n) {
                                                var t = V === $ ? "" : V;
                                                return !0 !== t && i[2].queue !== t && (V !== $ || !1 !== i[2].queue) || (z.each(E, function (e, t) {
                                                    if (t === n) return i[5] = {resume: !1}, !(r = !0)
                                                }), !r && void 0)
                                            })
                                        }), e();
                                    case"resume":
                                        return z.each(E, function (e, t) {
                                            b(t)
                                        }), z.each(Q.State.calls, function (e, i) {
                                            var r = !1;
                                            i && z.each(i[1], function (e, n) {
                                                var t = V === $ ? "" : V;
                                                return !0 !== t && i[2].queue !== t && (V !== $ || !1 !== i[2].queue) || (!i[5] || (z.each(E, function (e, t) {
                                                    if (t === n) return i[5].resume = !0, !(r = !0)
                                                }), !r && void 0))
                                            })
                                        }), e();
                                    case"finish":
                                    case"finishAll":
                                    case"stop":
                                        z.each(E, function (e, t) {
                                            K(t) && K(t).delayTimer && (clearTimeout(K(t).delayTimer.setTimeout), K(t).delayTimer.next && K(t).delayTimer.next(), delete K(t).delayTimer), "finishAll" !== A || !0 !== V && !U.isString(V) || (z.each(z.queue(t, U.isString(V) ? V : ""), function (e, t) {
                                                U.isFunction(t) && t()
                                            }), z.queue(t, U.isString(V) ? V : "", []))
                                        });
                                        var a = [];
                                        return z.each(Q.State.calls, function (r, o) {
                                            o && z.each(o[1], function (e, n) {
                                                var i = V === $ ? "" : V;
                                                if (!0 !== i && o[2].queue !== i && (V !== $ || !1 !== o[2].queue)) return !0;
                                                z.each(E, function (e, t) {
                                                    t === n && (!0 !== V && !U.isString(V) || (z.each(z.queue(t, U.isString(V) ? V : ""), function (e, t) {
                                                        U.isFunction(t) && t(null, !0)
                                                    }), z.queue(t, U.isString(V) ? V : "", [])), "stop" === A ? ((t = K(t)) && t.tweensContainer && !1 !== i && z.each(t.tweensContainer, function (e, t) {
                                                        t.endValue = t.currentValue
                                                    }), a.push(r)) : "finish" !== A && "finishAll" !== A || (o[2].duration = 1))
                                                })
                                            })
                                        }), "stop" === A && (z.each(a, function (e, t) {
                                            O(t, !0)
                                        }), k.promise && k.resolver(E)), e();
                                    default:
                                        if (!z.isPlainObject(A) || U.isEmptyObject(A)) {
                                            if (U.isString(A) && Q.Redirects[A]) {
                                                var l, c = (l = z.extend({}, V)).duration, u = l.delay || 0;
                                                return !0 === l.backwards && (E = z.extend(!0, [], E).reverse()), z.each(E, function (e, t) {
                                                    parseFloat(l.stagger) ? l.delay = u + parseFloat(l.stagger) * e : U.isFunction(l.stagger) && (l.delay = u + l.stagger.call(t, e, F)), l.drag && (l.duration = parseFloat(c) || (/^(callout|transition)/.test(A) ? 1e3 : 400), l.duration = Math.max(l.duration * (l.backwards ? 1 - e / F : (e + 1) / F), .75 * l.duration, 200)), Q.Redirects[A].call(t, t, l || {}, e, F, E, k.promise ? k : $)
                                                }), e()
                                            }
                                            var f = "Velocity: First argument (" + A + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                            return k.promise ? k.rejecter(new Error(f)) : H.console, e()
                                        }
                                        B = "start"
                                }
                                var M = {
                                    lastParent: null,
                                    lastPosition: null,
                                    lastFontSize: null,
                                    lastPercentToPxWidth: null,
                                    lastPercentToPxHeight: null,
                                    lastEmToPx: null,
                                    remToPx: null,
                                    vwToPx: null,
                                    vhToPx: null
                                }, W = [];
                                z.each(E, function (e, t) {
                                    U.isNode(t) && m(t, e)
                                }), (l = z.extend({}, Q.defaults, V)).loop = parseInt(l.loop, 10);
                                var d = 2 * l.loop - 1;
                                if (l.loop) for (var h = 0; h < d; h++) {
                                    var p = {delay: l.delay, progress: l.progress};
                                    h === d - 1 && (p.display = l.display, p.visibility = l.visibility, p.complete = l.complete), y(E, "reverse", p)
                                }
                                return e()
                            }

                            function m(P, C) {
                                var D, e, t, N = z.extend({}, Q.defaults, V), j = {};
                                switch (K(P) === $ && Q.init(P), parseFloat(N.delay) && !1 !== N.queue && z.queue(P, N.queue, function (e) {
                                    Q.velocityQueueEntryFlag = !0;
                                    var t = Q.State.delayedElements.count++;
                                    Q.State.delayedElements[t] = P;
                                    var n, t = (n = t, function () {
                                        Q.State.delayedElements[n] = !1, e()
                                    });
                                    K(P).delayBegin = (new Date).getTime(), K(P).delay = parseFloat(N.delay), K(P).delayTimer = {
                                        setTimeout: setTimeout(e, parseFloat(N.delay)),
                                        next: t
                                    }
                                }), N.duration.toString().toLowerCase()) {
                                    case"fast":
                                        N.duration = 200;
                                        break;
                                    case"normal":
                                        N.duration = 400;
                                        break;
                                    case"slow":
                                        N.duration = 600;
                                        break;
                                    default:
                                        N.duration = parseFloat(N.duration) || 1
                                }

                                function n(e) {
                                    var O, I, t, n, i, r, o, s;
                                    if (N.begin && 0 === L) try {
                                        N.begin.call(E, E)
                                    } catch (e) {
                                        setTimeout(function () {
                                            throw e
                                        }, 1)
                                    }
                                    if ("scroll" === B) {
                                        var a, l, c, u = /^x$/i.test(N.axis) ? "Left" : "Top",
                                            f = parseFloat(N.offset) || 0;
                                        N.container ? U.isWrapped(N.container) || U.isNode(N.container) ? (N.container = N.container[0] || N.container, c = (a = N.container["scroll" + u]) + z(P).position()[u.toLowerCase()] + f) : N.container = null : (a = Q.State.scrollAnchor[Q.State["scrollProperty" + u]], l = Q.State.scrollAnchor[Q.State["scrollProperty" + ("Left" === u ? "Top" : "Left")]], c = z(P).offset()[u.toLowerCase()] + f), j = {
                                            scroll: {
                                                rootPropertyValue: !1,
                                                startValue: a,
                                                currentValue: a,
                                                endValue: c,
                                                unitType: "",
                                                easing: N.easing,
                                                scrollData: {container: N.container, direction: u, alternateValue: l}
                                            }, element: P
                                        }, Q.debug
                                    } else if ("reverse" === B) {
                                        if (!(O = K(P))) return;
                                        if (!O.tweensContainer) return void z.dequeue(P, N.queue);
                                        for (var d in "none" === O.opts.display && (O.opts.display = "auto"), "hidden" === O.opts.visibility && (O.opts.visibility = "visible"), O.opts.loop = !1, O.opts.begin = null, O.opts.complete = null, V.easing || delete N.easing, V.duration || delete N.duration, N = z.extend({}, O.opts, N), I = z.extend(!0, {}, O ? O.tweensContainer : null)) I.hasOwnProperty(d) && "element" !== d && (t = I[d].startValue, I[d].startValue = I[d].currentValue = I[d].endValue, I[d].endValue = t, U.isEmptyObject(V) || (I[d].easing = N.easing), Q.debug);
                                        j = I
                                    } else if ("start" === B) {
                                        (O = K(P)) && O.tweensContainer && !0 === O.isAnimating && (I = O.tweensContainer);
                                        var h, p = function (e, t) {
                                            var n = Y.Hooks.getRoot(e), i = !1, r = t[0], o = t[1], s = t[2];
                                            if (O && O.isSVG || "tween" === n || !1 !== Y.Names.prefixCheck(n)[1] || Y.Normalizations.registered[n] !== $) {
                                                (N.display !== $ && null !== N.display && "none" !== N.display || N.visibility !== $ && "hidden" !== N.visibility) && /opacity|filter/.test(e) && !s && 0 !== r && (s = 0), N._cacheValues && I && I[e] ? (s === $ && (s = I[e].endValue + I[e].unitType), i = O.rootPropertyValueCache[n]) : Y.Hooks.registered[e] ? s === $ ? (i = Y.getPropertyValue(P, n), s = Y.getPropertyValue(P, e, i)) : i = Y.Hooks.templates[n][1] : s === $ && (s = Y.getPropertyValue(P, e));
                                                var a, l, c = !1, t = function (e, t) {
                                                    var t = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (e) {
                                                        return n = e, ""
                                                    }), n = n || Y.Values.getUnitType(e);
                                                    return [t, n]
                                                };
                                                if (s !== r && U.isString(s) && U.isString(r)) {
                                                    for (var u = "", f = 0, d = 0, h = [], p = [], m = 0, g = 0, y = 0, s = Y.Hooks.fixColors(s), r = Y.Hooks.fixColors(r); f < s.length && d < r.length;) {
                                                        var v = s[f], b = r[d];
                                                        if (/[\d\.-]/.test(v) && /[\d\.-]/.test(b)) {
                                                            for (var w = v, x = b, _ = ".", S = "."; ++f < s.length;) {
                                                                if ((v = s[f]) === _) _ = ".."; else if (!/\d/.test(v)) break;
                                                                w += v
                                                            }
                                                            for (; ++d < r.length;) {
                                                                if ((b = r[d]) === S) S = ".."; else if (!/\d/.test(b)) break;
                                                                x += b
                                                            }
                                                            var T, C, E = Y.Hooks.getUnit(s, f),
                                                                A = Y.Hooks.getUnit(r, d);
                                                            f += E.length, d += A.length, E === A ? w === x ? u += w + E : (u += "{" + h.length + (g ? "!" : "") + "}" + E, h.push(parseFloat(w)), p.push(parseFloat(x))) : (T = parseFloat(w), C = parseFloat(x), u += (m < 5 ? "calc" : "") + "(" + (T ? "{" + h.length + (g ? "!" : "") + "}" : "0") + E + " + " + (C ? "{" + (h.length + (T ? 1 : 0)) + (g ? "!" : "") + "}" : "0") + A + ")", T && (h.push(T), p.push(0)), C && (h.push(0), p.push(C)))
                                                        } else {
                                                            if (v !== b) {
                                                                m = 0;
                                                                break
                                                            }
                                                            u += v, f++, d++, 0 === m && "c" === v || 1 === m && "a" === v || 2 === m && "l" === v || 3 === m && "c" === v || 4 <= m && "(" === v ? m++ : (m && m < 5 || 4 <= m && ")" === v && --m < 5) && (m = 0), 0 === g && "r" === v || 1 === g && "g" === v || 2 === g && "b" === v || 3 === g && "a" === v || 3 <= g && "(" === v ? (3 === g && "a" === v && (y = 1), g++) : y && "," === v ? 3 < ++y && (g = y = 0) : (y && g < (y ? 5 : 4) || (y ? 4 : 3) <= g && ")" === v && --g < (y ? 5 : 4)) && (g = y = 0)
                                                        }
                                                    }
                                                    f === s.length && d === r.length || (Q.debug, u = $), u && (h.length ? (Q.debug, s = h, r = p, a = l = "") : u = $)
                                                }
                                                u || (s = (n = t(e, s))[0], l = n[1], r = (n = t(e, r))[0].replace(/^([+-\/*])=/, function (e, t) {
                                                    return c = t, ""
                                                }), a = n[1], s = parseFloat(s) || 0, r = parseFloat(r) || 0, "%" === a && (/^(fontSize|lineHeight)$/.test(e) ? (r /= 100, a = "em") : /^scale/.test(e) ? (r /= 100, a = "") : /(Red|Green|Blue)$/i.test(e) && (r = r / 100 * 255, a = "")));
                                                if (/[\/*]/.test(c)) a = l; else if (l !== a && 0 !== s) if (0 === r) a = l; else {
                                                    D = D || function () {
                                                        var e = {
                                                                myParent: P.parentNode || R.body,
                                                                position: Y.getPropertyValue(P, "position"),
                                                                fontSize: Y.getPropertyValue(P, "fontSize")
                                                            },
                                                            t = e.position === M.lastPosition && e.myParent === M.lastParent,
                                                            n = e.fontSize === M.lastFontSize;
                                                        M.lastParent = e.myParent, M.lastPosition = e.position, M.lastFontSize = e.fontSize;
                                                        var i, r = {};
                                                        return n && t ? (r.emToPx = M.lastEmToPx, r.percentToPxWidth = M.lastPercentToPxWidth, r.percentToPxHeight = M.lastPercentToPxHeight) : (i = O && O.isSVG ? R.createElementNS("http://www.w3.org/2000/svg", "rect") : R.createElement("div"), Q.init(i), e.myParent.appendChild(i), z.each(["overflow", "overflowX", "overflowY"], function (e, t) {
                                                            Q.CSS.setPropertyValue(i, t, "hidden")
                                                        }), Q.CSS.setPropertyValue(i, "position", e.position), Q.CSS.setPropertyValue(i, "fontSize", e.fontSize), Q.CSS.setPropertyValue(i, "boxSizing", "content-box"), z.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (e, t) {
                                                            Q.CSS.setPropertyValue(i, t, "100%")
                                                        }), Q.CSS.setPropertyValue(i, "paddingLeft", "100em"), r.percentToPxWidth = M.lastPercentToPxWidth = (parseFloat(Y.getPropertyValue(i, "width", null, !0)) || 1) / 100, r.percentToPxHeight = M.lastPercentToPxHeight = (parseFloat(Y.getPropertyValue(i, "height", null, !0)) || 1) / 100, r.emToPx = M.lastEmToPx = (parseFloat(Y.getPropertyValue(i, "paddingLeft")) || 1) / 100, e.myParent.removeChild(i)), null === M.remToPx && (M.remToPx = parseFloat(Y.getPropertyValue(R.body, "fontSize")) || 16), null === M.vwToPx && (M.vwToPx = parseFloat(H.innerWidth) / 100, M.vhToPx = parseFloat(H.innerHeight) / 100), r.remToPx = M.remToPx, r.vwToPx = M.vwToPx, r.vhToPx = M.vhToPx, Q.debug, r
                                                    }();
                                                    var k = /margin|padding|left|right|width|text|word|letter/i.test(e) || /X$/.test(e) || "x" === e ? "x" : "y";
                                                    switch (l) {
                                                        case"%":
                                                            s *= "x" == k ? D.percentToPxWidth : D.percentToPxHeight;
                                                            break;
                                                        case"px":
                                                            break;
                                                        default:
                                                            s *= D[l + "ToPx"]
                                                    }
                                                    switch (a) {
                                                        case"%":
                                                            s *= 1 / ("x" == k ? D.percentToPxWidth : D.percentToPxHeight);
                                                            break;
                                                        case"px":
                                                            break;
                                                        default:
                                                            s *= 1 / D[a + "ToPx"]
                                                    }
                                                }
                                                switch (c) {
                                                    case"+":
                                                        r = s + r;
                                                        break;
                                                    case"-":
                                                        r = s - r;
                                                        break;
                                                    case"*":
                                                        r *= s;
                                                        break;
                                                    case"/":
                                                        r = s / r
                                                }
                                                j[e] = {
                                                    rootPropertyValue: i,
                                                    startValue: s,
                                                    currentValue: s,
                                                    endValue: r,
                                                    unitType: a,
                                                    easing: o
                                                }, u && (j[e].pattern = u), Q.debug
                                            } else Q.debug
                                        };
                                        for (h in A) if (A.hasOwnProperty(h)) {
                                            var m = Y.Names.camelCase(h),
                                                g = (n = A[h], s = o = r = i = void 0, U.isFunction(n) && (n = n.call(P, C, F)), U.isArray(n) ? (r = n[0], s = !U.isArray(n[1]) && /^[\d-]/.test(n[1]) || U.isFunction(n[1]) || Y.RegEx.isHex.test(n[1]) ? n[1] : U.isString(n[1]) && !Y.RegEx.isHex.test(n[1]) && Q.Easings[n[1]] || U.isArray(n[1]) ? (o = i ? n[1] : X(n[1], N.duration), n[2]) : n[1] || n[2]) : r = n, i || (o = o || N.easing), [(r = U.isFunction(r) ? r.call(P, C, F) : r) || 0, o, s = U.isFunction(s) ? s.call(P, C, F) : s]);
                                            if (q(Y.Lists.colors)) {
                                                var y = g[0], v = g[1], b = g[2];
                                                if (Y.RegEx.isHex.test(y)) {
                                                    for (var w = ["Red", "Green", "Blue"], x = Y.Values.hexToRgb(y), _ = b ? Y.Values.hexToRgb(b) : $, S = 0; S < w.length; S++) {
                                                        var T = [x[S]];
                                                        v && T.push(v), _ !== $ && T.push(_[S]), p(m + w[S], T)
                                                    }
                                                    continue
                                                }
                                            }
                                            p(m, g)
                                        }
                                        j.element = P
                                    }
                                    j.element && (Y.Values.addClass(P, "velocity-animating"), W.push(j), (O = K(P)) && ("" === N.queue && (O.tweensContainer = j, O.opts = N), O.isAnimating = !0), L === F - 1 ? (Q.State.calls.push([W, E, N, null, k.resolver, null, 0]), !1 === Q.State.isTicking && (Q.State.isTicking = !0, G())) : L++)
                                }

                                !1 !== Q.mock && (!0 === Q.mock ? N.duration = N.delay = 1 : (N.duration *= parseFloat(Q.mock) || 1, N.delay *= parseFloat(Q.mock) || 1)), N.easing = X(N.easing, N.duration), N.begin && !U.isFunction(N.begin) && (N.begin = null), N.progress && !U.isFunction(N.progress) && (N.progress = null), N.complete && !U.isFunction(N.complete) && (N.complete = null), N.display !== $ && null !== N.display && (N.display = N.display.toString().toLowerCase(), "auto" === N.display && (N.display = Q.CSS.Values.getDisplayType(P))), N.visibility !== $ && null !== N.visibility && (N.visibility = N.visibility.toString().toLowerCase()), N.mobileHA = N.mobileHA && Q.State.isMobile && !Q.State.isGingerbread, !1 === N.queue ? N.delay ? (e = Q.State.delayedElements.count++, Q.State.delayedElements[e] = P, t = e, e = function () {
                                    Q.State.delayedElements[t] = !1, n()
                                }, K(P).delayBegin = (new Date).getTime(), K(P).delay = parseFloat(N.delay), K(P).delayTimer = {
                                    setTimeout: setTimeout(n, parseFloat(N.delay)),
                                    next: e
                                }) : n() : z.queue(P, N.queue, function (e, t) {
                                    return !0 === t ? (k.promise && k.resolver(E), !0) : (Q.velocityQueueEntryFlag = !0, void n())
                                }), "" !== N.queue && "fx" !== N.queue || "inprogress" === z.queue(P)[0] || z.dequeue(P)
                            }

                            k.promise && (A && V && !1 === V.promiseRejectEmpty ? k.resolver() : k.rejecter())
                        };
                        (Q = z.extend(y, Q)).animate = y;
                        var E = H.requestAnimationFrame || n;
                        return Q.State.isMobile || R.hidden === $ || ((o = function () {
                            R.hidden ? (E = function (e) {
                                return setTimeout(function () {
                                    e(!0)
                                }, 16)
                            }, G()) : E = H.requestAnimationFrame || n
                        })(), R.addEventListener("visibilitychange", o)), e.Velocity = Q, e !== H && (e.fn.velocity = y, e.fn.velocity.defaults = Q.defaults), z.each(["Down", "Up"], function (e, u) {
                            Q.Redirects["slide" + u] = function (n, e, i, t, r, o) {
                                var e = z.extend({}, e), s = e.begin, a = e.complete, l = {}, c = {
                                    height: "",
                                    marginTop: "",
                                    marginBottom: "",
                                    paddingTop: "",
                                    paddingBottom: ""
                                };
                                e.display === $ && (e.display = "Down" === u ? "inline" === Q.CSS.Values.getDisplayType(n) ? "inline-block" : "block" : "none"), e.begin = function () {
                                    for (var e in 0 === i && s && s.call(r, r), c) {
                                        var t;
                                        c.hasOwnProperty(e) && (l[e] = n.style[e], t = Y.getPropertyValue(n, e), c[e] = "Down" === u ? [t, 0] : [0, t])
                                    }
                                    l.overflow = n.style.overflow, n.style.overflow = "hidden"
                                }, e.complete = function () {
                                    for (var e in l) l.hasOwnProperty(e) && (n.style[e] = l[e]);
                                    i === t - 1 && (a && a.call(r, r), o && o.resolver(r))
                                }, Q(n, c, e)
                            }
                        }), z.each(["In", "Out"], function (e, l) {
                            Q.Redirects["fade" + l] = function (e, t, n, i, r, o) {
                                var s = z.extend({}, t), a = s.complete, t = {opacity: "In" === l ? 1 : 0};
                                0 !== n && (s.begin = null), s.complete = n !== i - 1 ? null : function () {
                                    a && a.call(r, r), o && o.resolver(r)
                                }, s.display === $ && (s.display = "In" === l ? "auto" : "none"), Q(this, t, s)
                            }
                        }), Q
                    }

                    function K(e) {
                        e = z.data(e, "velocity");
                        return null === e ? $ : e
                    }

                    function v(e, t) {
                        e = K(e);
                        e && e.delayTimer && !e.delayPaused && (e.delayRemaining = e.delay - t + e.delayBegin, e.delayPaused = !0, clearTimeout(e.delayTimer.setTimeout))
                    }

                    function b(e) {
                        e = K(e);
                        e && e.delayTimer && e.delayPaused && (e.delayPaused = !1, e.delayTimer.setTimeout = setTimeout(e.delayTimer.next, e.delayRemaining))
                    }

                    function l(s, t, a, n) {
                        var l = 4, c = 1e-7, u = 10, f = 11, d = 1 / (f - 1), e = "Float32Array" in H;
                        if (4 !== arguments.length) return !1;
                        for (var i = 0; i < 4; ++i) if ("number" != typeof arguments[i] || isNaN(arguments[i]) || !isFinite(arguments[i])) return !1;
                        s = Math.min(s, 1), a = Math.min(a, 1), s = Math.max(s, 0), a = Math.max(a, 0);
                        var h = new (e ? Float32Array : Array)(f);

                        function r(e, t) {
                            return 1 - 3 * t + 3 * e
                        }

                        function p(e, t, n) {
                            return ((r(t, n) * e + (3 * n - 6 * t)) * e + 3 * t) * e
                        }

                        function m(e, t, n) {
                            return 3 * r(t, n) * e * e + 2 * (3 * n - 6 * t) * e + 3 * t
                        }

                        function o(e) {
                            for (var t = 0, n = 1, i = f - 1; n !== i && h[n] <= e; ++n) t += d;
                            var r = t + (e - h[--n]) / (h[n + 1] - h[n]) * d, o = m(r, s, a);
                            return .001 <= o ? function (e, t) {
                                for (var n = 0; n < l; ++n) {
                                    var i = m(t, s, a);
                                    if (0 === i) return t;
                                    t -= (p(t, s, a) - e) / i
                                }
                                return t
                            }(e, r) : 0 === o ? r : function (e, t, n) {
                                for (var i, r, o = 0; 0 < (i = p(r = t + (n - t) / 2, s, a) - e) ? n = r : t = r, Math.abs(i) > c && ++o < u;) ;
                                return r
                            }(e, t, t + d)
                        }

                        var g = !1;

                        function y() {
                            g = !0, s === t && a === n || function () {
                                for (var e = 0; e < f; ++e) h[e] = p(e * d, s, a)
                            }()
                        }

                        e = function (e) {
                            return g || y(), s === t && a === n ? e : 0 === e ? 0 : 1 === e ? 1 : p(o(e), t, n)
                        };
                        e.getControlPoints = function () {
                            return [{x: s, y: t}, {x: a, y: n}]
                        };
                        var v = "generateBezier(" + [s, t, a, n] + ")";
                        return e.toString = function () {
                            return v
                        }, e
                    }

                    function w(e) {
                        return -e.tension * e.x - e.friction * e.v
                    }

                    function x(e, t, n) {
                        e = {x: e.x + n.dx * t, v: e.v + n.dv * t, tension: e.tension, friction: e.friction};
                        return {dx: e.v, dv: w(e)}
                    }

                    function X(e, t) {
                        var n = e;
                        return U.isString(e) ? Q.Easings[e] || (n = !1) : n = U.isArray(e) && 1 === e.length ? function (t) {
                            return function (e) {
                                return Math.round(e * t) * (1 / t)
                            }
                        }.apply(null, e) : U.isArray(e) && 2 === e.length ? a.apply(null, e.concat([t])) : !(!U.isArray(e) || 4 !== e.length) && l.apply(null, e), n = !1 === n ? Q.Easings[Q.defaults.easing] ? Q.defaults.easing : s : n
                    }

                    function G(e) {
                        if (e) {
                            var t = Q.timestamp && !0 !== e ? e : C.now(), n = Q.State.calls.length;
                            1e4 < n && (Q.State.calls = function (e) {
                                for (var t = -1, n = e ? e.length : 0, i = []; ++t < n;) {
                                    var r = e[t];
                                    r && i.push(r)
                                }
                                return i
                            }(Q.State.calls), n = Q.State.calls.length);
                            for (var i = 0; i < n; i++) if (Q.State.calls[i]) {
                                var r = Q.State.calls[i], o = r[0], s = r[2], a = !!(f = r[3]), l = null, c = r[5],
                                    u = r[6], f = f || (Q.State.calls[i][3] = t - 16);
                                if (c) {
                                    if (!0 !== c.resume) continue;
                                    f = r[3] = Math.round(t - u - 16), r[5] = null
                                }
                                for (var u = r[6] = t - f, d = Math.min(u / s.duration, 1), h = 0, p = o.length; h < p; h++) {
                                    var m = o[h], g = m.element;
                                    if (K(g)) {
                                        var y, v, b, w, x, _, S = !1;
                                        for (y in s.display !== $ && null !== s.display && "none" !== s.display && ("flex" === s.display && z.each(["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"], function (e, t) {
                                            Y.setPropertyValue(g, "display", t)
                                        }), Y.setPropertyValue(g, "display", s.display)), s.visibility !== $ && "hidden" !== s.visibility && Y.setPropertyValue(g, "visibility", s.visibility), m) m.hasOwnProperty(y) && "element" !== y && (v = m[y], b = U.isString(v.easing) ? Q.Easings[v.easing] : v.easing, _ = U.isString(v.pattern) ? v.pattern.replace(/{(\d+)(!)?}/g, 1 === d ? function (e, t, n) {
                                            t = v.endValue[t];
                                            return n ? Math.round(t) : t
                                        } : function (e, t, n) {
                                            var i = v.startValue[t], t = v.endValue[t] - i, t = i + t * b(d, s, t);
                                            return n ? Math.round(t) : t
                                        }) : 1 === d ? v.endValue : (x = v.endValue - v.startValue, v.startValue + x * b(d, s, x)), !a && _ === v.currentValue || (v.currentValue = _, "tween" === y ? l = _ : (Y.Hooks.registered[y] && (w = Y.Hooks.getRoot(y), (x = K(g).rootPropertyValueCache[w]) && (v.rootPropertyValue = x)), _ = Y.setPropertyValue(g, y, v.currentValue + (T < 9 && 0 === parseFloat(_) ? "" : v.unitType), v.rootPropertyValue, v.scrollData), Y.Hooks.registered[y] && (Y.Normalizations.registered[w] ? K(g).rootPropertyValueCache[w] = Y.Normalizations.registered[w]("extract", null, _[1]) : K(g).rootPropertyValueCache[w] = _[1]), "transform" === _[0] && (S = !0))));
                                        s.mobileHA && K(g).transformCache.translate3d === $ && (K(g).transformCache.translate3d = "(0px, 0px, 0px)", S = !0), S && Y.flushTransformCache(g)
                                    }
                                }
                                s.display !== $ && "none" !== s.display && (Q.State.calls[i][2].display = !1), s.visibility !== $ && "hidden" !== s.visibility && (Q.State.calls[i][2].visibility = !1), s.progress && s.progress.call(r[1], r[1], d, Math.max(0, f + s.duration - t), f, l), 1 === d && O(i)
                            }
                        }
                        Q.State.isTicking && E(G)
                    }

                    function O(e, t) {
                        if (Q.State.calls[e]) {
                            for (var n = Q.State.calls[e][0], i = Q.State.calls[e][1], r = Q.State.calls[e][2], o = Q.State.calls[e][4], s = !1, a = 0, l = n.length; a < l; a++) {
                                var c = n[a].element;
                                t || r.loop || ("none" === r.display && Y.setPropertyValue(c, "display", r.display), "hidden" === r.visibility && Y.setPropertyValue(c, "visibility", r.visibility));
                                var u, f = K(c);
                                if (!0 === r.loop || z.queue(c)[1] !== $ && /\.velocityQueueEntryFlag/i.test(z.queue(c)[1]) || f && (f.isAnimating = !1, u = !(f.rootPropertyValueCache = {}), z.each(Y.Lists.transforms3D, function (e, t) {
                                    var n = /^scale/.test(t) ? 1 : 0, i = f.transformCache[t];
                                    f.transformCache[t] !== $ && new RegExp("^\\(" + n + "[^.]").test(i) && (u = !0, delete f.transformCache[t])
                                }), r.mobileHA && (u = !0, delete f.transformCache.translate3d), u && Y.flushTransformCache(c), Y.Values.removeClass(c, "velocity-animating")), !t && r.complete && !r.loop && a === l - 1) try {
                                    r.complete.call(i, i)
                                } catch (e) {
                                    setTimeout(function () {
                                        throw e
                                    }, 1)
                                }
                                o && !0 !== r.loop && o(i), f && !0 === r.loop && !t && (z.each(f.tweensContainer, function (e, t) {
                                    var n;
                                    /^rotate/.test(e) && (parseFloat(t.startValue) - parseFloat(t.endValue)) % 360 == 0 && (n = t.startValue, t.startValue = t.endValue, t.endValue = n), /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                                }), Q(c, "reverse", {
                                    loop: !0,
                                    delay: r.delay
                                })), !1 !== r.queue && z.dequeue(c, r.queue)
                            }
                            Q.State.calls[e] = !1;
                            for (var d = 0, h = Q.State.calls.length; d < h; d++) if (!1 !== Q.State.calls[d]) {
                                s = !0;
                                break
                            }
                            !1 === s && (Q.State.isTicking = !1, delete Q.State.calls, Q.State.calls = [])
                        }
                    }

                    jQuery.fn.velocity = jQuery.fn.animate
                }(window.jQuery || window.Zepto || window, window, window ? window.document : void 0)
            })
        }, 598: (e, t, n) => {
            e.exports = n.g.Tether = n(519)
        }, 609: e => {
            "use strict";
            e.exports = jQuery
        }
    }, i = {};

    function v(e) {
        var t = i[e];
        if (void 0 !== t) return t.exports;
        t = i[e] = {exports: {}};
        return n[e].call(t.exports, t, t.exports, v), t.exports
    }

    v.amdO = {}, v.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return v.d(t, {a: t}), t
    }, v.d = (e, t) => {
        for (var n in t) v.o(t, n) && !v.o(e, n) && Object.defineProperty(e, n, {enumerable: !0, get: t[n]})
    }, v.g = function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), v.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
    (() => {
        "use strict";
        v(598), v(948), v(635), v(877), v(990);
        var e = prestashop, l = v.n(e), e = v(609), c = v.n(e);

        function i(e, t) {
            var n = t.children().detach();
            t.empty().append(e.children().detach()), e.append(n)
        }

        function r() {
            l().responsive.mobile ? c()("*[id^='_desktop_']").each((e, t) => {
                var n = c()(`#${t.id.replace("_desktop_", "_mobile_")}`);
                n.length && i(c()(t), n)
            }) : c()("*[id^='_mobile_']").each((e, t) => {
                var n = c()(`#${t.id.replace("_mobile_", "_desktop_")}`);
                n.length && i(c()(t), n)
            }), l().emit("responsive update", {mobile: l().responsive.mobile})
        }

        l().themeSelectors = {
            product: {
                tabs: ".tabs .nav-link",
                activeNavClass: "js-product-nav-active",
                activeTabClass: "js-product-tab-active",
                activeTabs: ".tabs .nav-link.active, .js-product-nav-active",
                imagesModal: ".js-product-images-modal",
                thumb: ".js-thumb",
                thumbContainer: ".thumb-container, .js-thumb-container",
                arrows: ".js-arrows",
                selected: ".selected, .js-thumb-selected",
                modalProductCover: ".js-modal-product-cover",
                cover: ".js-qv-product-cover"
            },
            listing: {
                searchFilterToggler: "#search_filter_toggler, .js-search-toggler",
                searchFiltersWrapper: "#search_filters_wrapper",
                searchFilterControls: "#search_filter_controls",
                searchFilters: "#search_filters",
                activeSearchFilters: "#js-active-search-filters",
                listTop: "#js-product-list-top",
                list: "#js-product-list",
                listBottom: "#js-product-list-bottom",
                listHeader: "#js-product-list-header",
                searchFiltersClearAll: ".js-search-filters-clear-all",
                searchLink: ".js-search-link"
            },
            order: {returnForm: "#order-return-form, .js-order-return-form"},
            arrowDown: ".arrow-down, .js-arrow-down",
            arrowUp: ".arrow-up, .js-arrow-up",
            clear: ".clear",
            fileInput: ".js-file-input",
            contentWrapper: "#content-wrapper, .js-content-wrapper",
            footer: "#footer, .js-footer",
            modalContent: ".js-modal-content",
            modal: "#modal, .js-checkout-modal",
            touchspin: ".js-touchspin",
            checkout: {
                termsLink: ".js-terms a",
                giftCheckbox: ".js-gift-checkbox",
                imagesLink: ".card-block .cart-summary-products p a, .js-show-details",
                carrierExtraContent: ".carrier-extra-content, .js-carrier-extra-content"
            }
        }, c()(document).ready(() => {
            l().emit("themeSelectorsInit")
        }), l().responsive = l().responsive || {}, l().responsive.current_width = window.innerWidth, l().responsive.min_width = 768, l().responsive.mobile = l().responsive.current_width < l().responsive.min_width, c()(window).on("resize", () => {
            var e = l().responsive.current_width, t = l().responsive.min_width, n = window.innerWidth,
                t = t <= e && n < t || e < t && t <= n;
            l().responsive.current_width = n, l().responsive.mobile = l().responsive.current_width < l().responsive.min_width, t && r()
        }), c()(document).ready(() => {
            l().responsive.mobile && r()
        }), c()(document).ready(() => {
            1 === c()("body#checkout").length && (c()(l().themeSelectors.checkout.termsLink).on("click", e => {
                e.preventDefault();
                e = c()(e.target).attr("href");
                e && (e += "?content_only=1", c().get(e, e => {
                    c()(l().themeSelectors.modal).find(l().themeSelectors.modalContent).html(c()(e).find(".page-cms").contents())
                }).fail(e => {
                    l().emit("handleError", {eventType: "clickTerms", resp: e})
                })), c()(l().themeSelectors.modal).modal("show")
            }), c()(l().themeSelectors.checkout.giftCheckbox).on("click", () => {
                c()("#gift").collapse("toggle")
            }), c()(l().themeSelectors.checkout.imagesLink).on("click", function () {
                const e = c()(this).find("i.material-icons");
                "expand_more" === e.text() ? e.text("expand_less") : e.text("expand_more")
            })), l().on("updatedDeliveryForm", e => {
                void 0 !== e.deliveryOption && 0 !== e.deliveryOption.length && (c()(l().themeSelectors.checkout.carrierExtraContent).hide(), e.deliveryOption.next(l().themeSelectors.checkout.carrierExtraContent).slideDown())
            })
        }), c()(document).ready(function () {
            c()("body#order-detail") && c()(`${l().themeSelectors.order.returnForm} table thead input[type=checkbox]`).on("click", function () {
                const n = c()(this).prop("checked");
                c()(`${l().themeSelectors.order.returnForm} table tbody input[type=checkbox]`).each((e, t) => {
                    c()(t).prop("checked", n)
                })
            })
        });
        v(5);

        class a {
            init() {
                c()(".js-product-miniature").each((e, t) => {
                    if (5 < c()(t).find(".color").length) {
                        let n = 0;
                        c()(t).find(".color").each((e, t) => {
                            4 < e && (c()(t).hide(), n += 1)
                        }), c()(t).find(".js-count").append(`+${n}`)
                    }
                })
            }
        }

        c()(document).ready(() => {
            const t = window.location.href;
            l().on("clickQuickView", e => {
                e = {
                    action: "quickview",
                    id_product: e.dataset.idProduct,
                    id_product_attribute: e.dataset.idProductAttribute
                };
                c().post(l().urls.pages.product, e, null, "json").then(e => {
                    c()("body").append(e.quickview_html);
                    const t = c()(`#quickview-modal-${e.product.id}-${e.product.id_product_attribute}`);
                    t.modal("show"), n(t), t.on("hidden.bs.modal", () => {
                        t.remove()
                    })
                }).fail(e => {
                    l().emit("handleError", {eventType: "clickQuickView", resp: e})
                })
            });
            const n = e => {
                const t = c()(l().themeSelectors.product.arrows), n = e.find(".js-qv-product-images");
                c()(l().themeSelectors.product.thumb).on("click", e => {
                    c()(l().themeSelectors.product.thumb).hasClass("selected") && c()(l().themeSelectors.product.thumb).removeClass("selected"), c()(e.currentTarget).addClass("selected"), c()(l().themeSelectors.product.cover).attr("src", c()(e.target).data("image-large-src"))
                }), n.find("li").length <= 4 ? t.hide() : t.on("click", e => {
                    c()(e.target).hasClass("arrow-up") && c()(".js-qv-product-images").position().top < 0 ? (i("up"), c()(l().themeSelectors.arrowDown).css("opacity", "1")) : c()(e.target).hasClass("arrow-down") && n.position().top + n.height() > c()(".js-qv-mask").height() && (i("down"), c()(l().themeSelectors.arrowUp).css("opacity", "1"))
                }), e.find(l().selectors.quantityWanted).TouchSpin({
                    verticalbuttons: !0,
                    verticalupclass: "material-icons touchspin-up",
                    verticaldownclass: "material-icons touchspin-down",
                    buttondown_class: "btn btn-touchspin js-touchspin",
                    buttonup_class: "btn btn-touchspin js-touchspin",
                    min: 1,
                    max: 1e6
                }), c()(l().themeSelectors.touchspin).off("touchstart.touchspin")
            }, i = e => {
                const t = c()(".js-qv-product-images");
                var n = c()(".js-qv-product-images li img").height() + 20, i = t.position().top;
                t.velocity({translateY: "up" === e ? i + n : i - n}, () => {
                    0 <= t.position().top ? c()(".arrow-up").css("opacity", ".2") : t.position().top + t.height() <= c()(".js-qv-mask").height() && c()(".arrow-down").css("opacity", ".2")
                })
            };
            c()("body").on("click", l().themeSelectors.listing.searchFilterToggler, () => {
                c()(l().themeSelectors.listing.searchFiltersWrapper).removeClass("hidden-sm-down"), c()(l().themeSelectors.contentWrapper).addClass("hidden-sm-down"), c()(l().themeSelectors.footer).addClass("hidden-sm-down")
            }), c()(`${l().themeSelectors.listing.searchFilterControls} ${l().themeSelectors.clear}`).on("click", () => {
                c()(l().themeSelectors.listing.searchFiltersWrapper).addClass("hidden-sm-down"), c()(l().themeSelectors.contentWrapper).removeClass("hidden-sm-down"), c()(l().themeSelectors.footer).removeClass("hidden-sm-down")
            }), c()(`${l().themeSelectors.listing.searchFilterControls} .ok`).on("click", () => {
                c()(l().themeSelectors.listing.searchFiltersWrapper).addClass("hidden-sm-down"), c()(l().themeSelectors.contentWrapper).removeClass("hidden-sm-down"), c()(l().themeSelectors.footer).removeClass("hidden-sm-down")
            });
            const r = function (e) {
                if (void 0 !== e.target.dataset.searchUrl) return e.target.dataset.searchUrl;
                if (void 0 === c()(e.target).parent()[0].dataset.searchUrl) throw new Error("Can not parse search URL");
                return c()(e.target).parent()[0].dataset.searchUrl
            };
            c()("body").on("change", `${l().themeSelectors.listing.searchFilters} input[data-search-url]`, e => {
                l().emit("updateFacets", r(e))
            }), c()("body").on("click", l().themeSelectors.listing.searchFiltersClearAll, e => {
                l().emit("updateFacets", r(e))
            }), c()("body").on("click", l().themeSelectors.listing.searchLink, e => {
                e.preventDefault(), l().emit("updateFacets", c()(e.target).closest("a").get(0).href)
            }), window.addEventListener("popstate", e => {
                var {state: e} = e;
                window.location.href = e && e.current_url ? e.current_url : t
            }), c()("body").on("change", `${l().themeSelectors.listing.searchFilters} select`, e => {
                const t = c()(e.target).closest("form");
                l().emit("updateFacets", `?${t.serialize()}`)
            }), l().on("updateProductList", e => {
                !function (e) {
                    c()(l().themeSelectors.listing.searchFilters).replaceWith(e.rendered_facets), c()(l().themeSelectors.listing.activeSearchFilters).replaceWith(e.rendered_active_filters), c()(l().themeSelectors.listing.listTop).replaceWith(e.rendered_products_top), c()(l().themeSelectors.listing.list).replaceWith(e.rendered_products), c()(l().themeSelectors.listing.listBottom).replaceWith(e.rendered_products_bottom), e.rendered_products_header && c()(l().themeSelectors.listing.listHeader).replaceWith(e.rendered_products_header);
                    const t = new a;
                    t.init()
                }(e), window.scrollTo(0, 0)
            })
        });

        class u {
            init() {
                const e = c()(".js-modal-arrows"), t = c()(".js-modal-product-images");
                c()("body").on("click", ".js-modal-thumb", e => {
                    c()(".js-modal-thumb").hasClass("selected") && c()(".js-modal-thumb").removeClass("selected"), c()(e.currentTarget).addClass("selected"), c()(".js-modal-product-cover").attr("src", c()(e.target).data("image-large-src")), c()(".js-modal-product-cover").attr("title", c()(e.target).attr("title")), c()(".js-modal-product-cover").attr("alt", c()(e.target).attr("alt"))
                }).on("click", "aside#thumbnails", e => {
                    "thumbnails" === e.target.id && c()("#product-modal").modal("hide")
                }), c()(".js-modal-product-images li").length <= 5 ? e.css("opacity", ".2") : e.on("click", e => {
                    c()(e.target).hasClass("arrow-up") && t.position().top < 0 ? (this.move("up"), c()(".js-modal-arrow-down").css("opacity", "1")) : c()(e.target).hasClass("arrow-down") && t.position().top + t.height() > c()(".js-modal-mask").height() && (this.move("down"), c()(".js-modal-arrow-up").css("opacity", "1"))
                })
            }

            move(e) {
                const t = c()(".js-modal-product-images");
                var n = c()(".js-modal-product-images li img").height() + 10, i = t.position().top;
                t.velocity({translateY: "up" === e ? i + n : i - n}, () => {
                    0 <= t.position().top ? c()(".js-modal-arrow-up").css("opacity", ".2") : t.position().top + t.height() <= c()(".js-modal-mask").height() && c()(".js-modal-arrow-down").css("opacity", ".2")
                })
            }
        }

        c()(document).ready(() => {
            function o() {
                const i = c()(l().themeSelectors.product.cover);
                let r = c()(l().themeSelectors.product.selected);
                const o = (e, t) => {
                    const n = t.find(l().themeSelectors.product.thumb);
                    c()(l().themeSelectors.product.modalProductCover).attr("src", n.data("image-large-src")), e.removeClass("selected"), n.addClass("selected"), i.prop("src", n.data("image-medium-src"))
                };
                c()(l().themeSelectors.product.thumb).on("click", e => {
                    r = c()(l().themeSelectors.product.selected), o(r, c()(e.target).closest(l().themeSelectors.product.thumbContainer))
                }), i.swipe({
                    swipe: (e, t) => {
                        r = c()(l().themeSelectors.product.selected);
                        const n = r.closest(l().themeSelectors.product.thumbContainer);
                        "right" === t ? 0 < n.prev().length ? o(r, n.prev()) : 0 < n.next().length && o(r, n.next()) : "left" === t && (0 < n.next().length ? o(r, n.next()) : 0 < n.prev().length && o(r, n.prev()))
                    }
                })
            }

            function s() {
                2 < c()("#main .js-qv-product-images li").length ? (c()("#main .js-qv-mask").addClass("scroll"), c()(".scroll-box-arrows").addClass("scroll"), c()("#main .js-qv-mask").scrollbox({
                    direction: "h",
                    distance: 113,
                    autoPlay: !1
                }), c()(".scroll-box-arrows .left").click(() => {
                    c()("#main .js-qv-mask").trigger("backward")
                }), c()(".scroll-box-arrows .right").click(() => {
                    c()("#main .js-qv-mask").trigger("forward")
                })) : (c()("#main .js-qv-mask").removeClass("scroll"), c()(".scroll-box-arrows").removeClass("scroll"))
            }

            function a() {
                c()(l().themeSelectors.fileInput).on("change", e => {
                    let t;
                    (e = c()(e.currentTarget)[0]) && (t = e.files[0]) && c()(e).prev().text(t.name)
                })
            }

            !function () {
                const t = c()(l().selectors.quantityWanted);
                t.TouchSpin({
                    verticalbuttons: !0,
                    verticalupclass: "material-icons touchspin-up",
                    verticaldownclass: "material-icons touchspin-down",
                    buttondown_class: "btn btn-touchspin js-touchspin",
                    buttonup_class: "btn btn-touchspin js-touchspin",
                    min: parseInt(t.attr("min"), 10),
                    max: 1e6
                }), c()(l().themeSelectors.touchspin).off("touchstart.touchspin"), t.focusout(() => {
                    ("" === t.val() || t.val() < t.attr("min")) && (t.val(t.attr("min")), t.trigger("change"))
                }), c()("body").on("change keyup", l().selectors.quantityWanted, e => {
                    "" !== t.val() && (c()(e.currentTarget).trigger("touchspin.stopspin"), l().emit("updateProduct", {
                        eventType: "updatedProductQuantity",
                        event: e
                    }))
                })
            }(), a(), o(), s(), function () {
                const e = c()(l().themeSelectors.product.tabs);
                e.on("show.bs.tab", e => {
                    const t = c()(e.target);
                    t.addClass(l().themeSelectors.product.activeNavClass), c()(t.attr("href")).addClass(l().themeSelectors.product.activeTabClass)
                }), e.on("hide.bs.tab", e => {
                    const t = c()(e.target);
                    t.removeClass(l().themeSelectors.product.activeNavClass), c()(t.attr("href")).removeClass(l().themeSelectors.product.activeTabClass)
                })
            }(), l().on("updatedProduct", e => {
                if (a(), o(), e && e.product_minimal_quantity) {
                    var t = parseInt(e.product_minimal_quantity, 10), n = l().selectors.quantityWanted;
                    const r = c()(n);
                    r.trigger("touchspin.updatesettings", {min: t})
                }
                s(), c()(c()(l().themeSelectors.product.activeTabs).attr("href")).addClass("active").removeClass("fade"), c()(l().themeSelectors.product.imagesModal).replaceWith(e.product_images_modal);
                const i = new u;
                i.init()
            })
        }), l().cart = l().cart || {}, l().cart.active_inputs = null;
        const f = 'input[name="product-quantity-spin"]';
        let n = !1, o = !1, s = "";

        function d() {
            c().each(c()(f), (e, t) => {
                c()(t).TouchSpin({
                    verticalbuttons: !0,
                    verticalupclass: "material-icons touchspin-up",
                    verticaldownclass: "material-icons touchspin-down",
                    buttondown_class: "btn btn-touchspin js-touchspin js-increase-product-quantity",
                    buttonup_class: "btn btn-touchspin js-touchspin js-decrease-product-quantity",
                    min: parseInt(c()(t).attr("min"), 10),
                    max: 1e6
                })
            }), c()(l().themeSelectors.touchspin).off("touchstart.touchspin"), h.switchErrorStat()
        }

        c()(document).ready(() => {
            const o = ".js-cart-line-product-quantity", s = [];
            l().on("updateCart", () => {
                c()(".quickview").modal("hide")
            }), l().on("updatedCart", () => {
                d()
            }), d();
            const e = c()("body");

            function n(e, t) {
                if ("on.startupspin" !== (n = t) && "on.startdownspin" !== n) return {
                    url: e.attr("href"),
                    type: function (e) {
                        var t = e.split("-");
                        let n, i, r = "";
                        for (n = 0; n < t.length; n += 1) i = t[n], 0 !== n && (i = i.substring(0, 1).toUpperCase() + i.substring(1)), r += i;
                        return r
                    }(e.data("link-action"))
                };
                var n;
                const i = function (e) {
                    const t = e.parents(".bootstrap-touchspin").find(o);
                    return t.is(":focus") ? null : t
                }(e);
                if (!i) return !1;
                let r = {};
                return r = "on.startupspin" === t ? {
                    url: i.data("up-url"),
                    type: "increaseProductQuantity"
                } : {url: i.data("down-url"), type: "decreaseProductQuantity"}, r
            }

            const a = () => {
                let e;
                for (; 0 < s.length;) e = s.pop(), e.abort()
            };
            var t = e => {
                e.preventDefault();
                const i = c()(e.currentTarget), {dataset: r} = e.currentTarget, t = n(i, e.namespace);
                t && (a(), c().ajax({
                    url: t.url,
                    method: "POST",
                    data: {ajax: "1", action: "update"},
                    dataType: "json",
                    beforeSend(e) {
                        s.push(e)
                    }
                }).then(e => {
                    h.checkUpdateOpertation(e);
                    const t = (n = i, c()(n.parents(".bootstrap-touchspin").find("input")));
                    var n;
                    t.val(e.quantity), l().emit("updateCart", {reason: r, resp: e})
                }).fail(e => {
                    l().emit("handleError", {eventType: "updateProductInCart", resp: e, cartAction: t.type})
                }))
            };

            function i(e) {
                const t = c()(e.currentTarget);
                var n, i = t.data("update-url"), r = t.attr("value"), e = t.val();
                e != parseInt(e, 10) || e < 0 || isNaN(e) ? t.val(r) : 0 != (r = e - r) && (t.attr("value", e), i = i, r = r, r = {
                    ajax: "1",
                    qty: Math.abs(r),
                    action: "update",
                    op: 0 < r ? "up" : "down"
                }, n = t, a(), c().ajax({
                    url: i, method: "POST", data: r, dataType: "json", beforeSend(e) {
                        s.push(e)
                    }
                }).then(e => {
                    h.checkUpdateOpertation(e), n.val(e.quantity);
                    let t;
                    t = n && n.dataset ? n.dataset : e, l().emit("updateCart", {reason: t, resp: e})
                }).fail(e => {
                    l().emit("handleError", {eventType: "updateProductQuantityInCart", resp: e})
                }))
            }

            e.on("click", '[data-link-action="delete-from-cart"], [data-link-action="remove-voucher"]', t), e.on("touchspin.on.startdownspin", f, t), e.on("touchspin.on.startupspin", f, t), e.on("focusout keyup", o, e => ("keyup" === e.type ? 13 === e.keyCode && i(e) : i(e), !1));
            e.on("hidden.bs.collapse", "#promo-code", () => {
                c()(".display-promo").show(400)
            }), e.on("click", ".promo-code-button", e => {
                e.preventDefault(), c()("#promo-code").collapse("toggle")
            }), e.on("click", ".display-promo", e => {
                c()(e.currentTarget).hide(400)
            }), e.on("click", ".js-discount .code", e => {
                e.stopPropagation();
                const t = c()(e.currentTarget), n = c()("[name=discount_name]");
                return n.val(t.text()), c()("#promo-code").collapse("show"), c()(".display-promo").hide(400), !1
            })
        });
        const h = {
            switchErrorStat: () => {
                const e = c()(".checkout a");
                var t;
                (c()("#notifications article.alert-danger").length || "" !== s && !n) && e.addClass("disabled"), "" !== s ? (t = ` <article class="alert alert-danger" role="alert" data-alert="danger"><ul><li>${s}</li></ul></article>`, c()("#notifications .container").html(t), s = "", o = !1, n && e.removeClass("disabled")) : !n && o && (n = !1, o = !1, c()("#notifications .container").html(""), e.removeClass("disabled"))
            }, checkUpdateOpertation: e => {
                n = e.hasOwnProperty("hasError");
                const t = e.errors || "";
                s = t instanceof Array ? t.join(" ") : t, o = !0
            }
        };
        var e = v(590), t = v.n(e);

        class p {
            constructor(e) {
                this.el = e
            }

            init() {
                this.el.on("show.bs.dropdown", (e, t) => {
                    (t ? c()(`#${t}`) : c()(e.target)).find(".dropdown-menu").first().stop(!0, !0).slideDown()
                }), this.el.on("hide.bs.dropdown", (e, t) => {
                    (t ? c()(`#${t}`) : c()(e.target)).find(".dropdown-menu").first().stop(!0, !0).slideUp()
                }), this.el.find("select.link").each((e, t) => {
                    c()(t).on("change", function () {
                        window.location = c()(this).val()
                    })
                })
            }
        }

        class m {
            init() {
                this.parentFocus(), this.togglePasswordVisibility()
            }

            parentFocus() {
                c()(".js-child-focus").focus(function () {
                    c()(this).closest(".js-parent-focus").addClass("focus")
                }), c()(".js-child-focus").focusout(function () {
                    c()(this).closest(".js-parent-focus").removeClass("focus")
                })
            }

            togglePasswordVisibility() {
                c()('button[data-action="show-password"]').on("click", function () {
                    const e = c()(this).closest(".input-group").children("input.js-visible-password");
                    "password" === e.attr("type") ? (e.attr("type", "text"), c()(this).text(c()(this).data("textHide"))) : (e.attr("type", "password"), c()(this).text(c()(this).data("textShow")))
                })
            }
        }

        class g extends p {
            init() {
                let i;
                const e = this;
                this.el.find("li").hover(e => {
                    if (!this.el.parent().hasClass("mobile")) {
                        var t = c()(e.currentTarget).attr("class");
                        if (i !== t) {
                            const n = Array.prototype.slice.call(e.currentTarget.classList).map(e => "string" == typeof e && `.${e}`);
                            i = n.join(""), i && 0 === c()(e.target).data("depth") && c()(`${i} .js-sub-menu`).css({top: c()(`${i}`).height() + c()(`${i}`).position().top})
                        }
                    }
                }), c()("#menu-icon").on("click", () => {
                    c()("#mobile_top_menu_wrapper").toggle(), e.toggleMobileMenu()
                }), this.el.on("click", e => {
                    this.el.parent().hasClass("mobile") || e.stopPropagation()
                }), l().on("responsive update", () => {
                    c()(".js-sub-menu").removeAttr("style"), e.toggleMobileMenu()
                }), super.init()
            }

            toggleMobileMenu() {
                c()("#header").toggleClass("is-open"), c()("#mobile_top_menu_wrapper").is(":visible") ? c()("#notifications, #wrapper, #footer").hide() : c()("#notifications, #wrapper, #footer").show()
            }
        }

        v(105), v(285);
        l().blockcart = l().blockcart || {}, l().blockcart.showModal = e => {
            function t() {
                return c()("#blockcart-modal")
            }

            let n = t();
            n.length && n.remove(), c()("body").append(e), n = t(), n.modal("show").on("hidden.bs.modal", e => {
                l().emit("updateProduct", {reason: e.currentTarget.dataset, event: e})
            })
        };
        for (const y in t().prototype) l()[y] = t().prototype[y];
        c()(document).ready(() => {
            var e = c()(".js-dropdown");
            const t = new m;
            var n = c()('.js-top-menu ul[data-depth="0"]');
            const i = new p(e), r = new g(n), o = new a, s = new u;
            i.init(), t.init(), r.init(), o.init(), s.init(), c()('.carousel[data-touch="true"]').swipe({
                swipe(e, t) {
                    "left" === t && c()(this).carousel("next"), "right" === t && c()(this).carousel("prev")
                }, allowPageScroll: "vertical"
            })
        })
    })()
})();
//slick

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

                event.stopImmediatePropagation();
                var $sf = $(this);

                setTimeout(function() {

                    if( _.options.pauseOnFocus ) {
                        _.focussed = $sf.is(':focus');
                        _.autoPlay();
                    }

                }, 0);

            });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
            numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
            tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                return (val >= 0) && (val < _.slideCount);
            });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                    var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                    if ($('#' + ariaButtonControl).length) {
                        $(this).attr({
                            'aria-describedby': ariaButtonControl
                        });
                    }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
            if (_.options.focusOnChange) {
                _.$slides.eq(i).attr({'tabindex': '0'});
            } else {
                _.$slides.eq(i).removeAttr('tabindex');
            }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'previous'
                }, _.changeSlide);
            _.$nextArrow
                .off('click.slick')
                .on('click.slick', {
                    message: 'next'
                }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
        //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
        Slick.prototype.slickSetOption = function() {

            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */

            var _ = this, l, item, option, value, refresh = false, type;

            if( $.type( arguments[0] ) === 'object' ) {

                option =  arguments[0];
                refresh = arguments[1];
                type = 'multiple';

            } else if ( $.type( arguments[0] ) === 'string' ) {

                option =  arguments[0];
                value = arguments[1];
                refresh = arguments[2];

                if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                    type = 'responsive';

                } else if ( typeof arguments[1] !== 'undefined' ) {

                    type = 'single';

                }

            }

            if ( type === 'single' ) {

                _.options[option] = value;


            } else if ( type === 'multiple' ) {

                $.each( option , function( opt, val ) {

                    _.options[opt] = val;

                });


            } else if ( type === 'responsive' ) {

                for ( item in value ) {

                    if( $.type( _.options.responsive ) !== 'array' ) {

                        _.options.responsive = [ value[item] ];

                    } else {

                        l = _.options.responsive.length-1;

                        // loop through the responsive object and splice out duplicates.
                        while( l >= 0 ) {

                            if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                                _.options.responsive.splice(l,1);

                            }

                            l--;

                        }

                        _.options.responsive.push( value[item] );

                    }

                }

            }

            if ( refresh ) {

                _.unload();
                _.reinit();

            }

        };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                    infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


//slick
$(document).ready(function(){
    $('.cat-slick-akcijos').slick({
        rows: 2,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: $('.nn-next'),
        prevArrow: $('.nn-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function(){
    $('.cat-slick-vaikams').slick({
        rows: 2,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: $('.nn-next'),
        prevArrow: $('.nn-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function(){
    $('.cat-slick-moterims').slick({
        rows: 2,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: $('.nn-next'),
        prevArrow: $('.nn-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function(){
    $('.cat-slick-vyrams').slick({
        rows: 2,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: $('.nn-next'),
        prevArrow: $('.nn-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function(){
    $('.cat-slick-namams').slick({
        rows: 2,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: $('.nn-next'),
        prevArrow: $('.nn-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function() {
    let items = [];
    let clicks = [];
    let akcijos = $("#cat-akcijos");
    items.push(akcijos);
    let vaikams = $("#cat-vaikams");
    items.push(vaikams);
    let moterims = $("#cat-moterims");
    items.push(moterims);
    let vyrams = $("#cat-vyrams");
    items.push(vyrams);
    let namams = $("#cat-namams");
    items.push(namams);
    let akcijosB = $("#akcijos");
    clicks.push(akcijosB);
    let vaikamsB = $("#vaikams");
    clicks.push(vaikamsB);
    let moterimsB = $("#moterims");
    clicks.push(moterimsB);
    let vyramsB = $("#vyrams");
    clicks.push(vyramsB);
    let namamsB = $("#namams");
    clicks.push(namamsB);
    $('.cat-slick-akcijos').slick('refresh');
    //console.log(items);
    //console.log(clicks);
    vaikamsB.click(function () {
        $('.cat-slick-vaikams').slick('refresh');
    });
    akcijosB.click(function () {
        $('.cat-slick-akcijos').slick('refresh');
    });
    moterimsB.click(function () {
        $('.cat-slick-moterims').slick('refresh');
    });
    vyramsB.click(function () {
        $('.cat-slick-vyrams').slick('refresh');
    });
    namamsB.click(function () {
        $('.cat-slick-namams').slick('refresh');
    });
});

$(document).ready(function(){
    $('.cat-slick-moterims3').slick({
        rows: 1,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: $('.nav-w-next'),
        prevArrow: $('.nav-w-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function(){
    $('.cat-slick-vyrams3').slick({
        rows: 1,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: $('.nav-m-next'),
        prevArrow: $('.nav-m-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

$(document).ready(function(){
    $('.cat-slick-vaikams3').slick({
        rows: 1,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: $('.nav-k-next'),
        prevArrow: $('.nav-k-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});
$(document).ready(function(){
    $('.cat-slick-namams3').slick({
        rows: 1,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: $('.nav-h-next'),
        prevArrow: $('.nav-h-prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});
//slider
$(document).ready(function(){
    $('.nn-slider-desktop').slick({
        rows: 1,
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        nextArrow: $('.nav-k-next-slider'),
        prevArrow: $('.nav-k-prev-slider'),
    });
});
$(document).ready(function(){
    $('.nn-slider-mobile').slick({
        rows: 1,
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        pauseOnFocus: true,
        nextArrow: $('.nav-next-mobile-slider'),
        prevArrow: $('.nav-prev-mobile-slider'),
    });
});
$(document).ready(function(){
    /*$('#mobile-search').click(function (){
        if ($('#mobile-search-block').style.display == "none"){
            $('#mobile-search-block').style.display = "block";
            $(this).focus();
        }else {
            $('#mobile-search-block').style.display = "none";
        }
    });*/
});

document.addEventListener("DOMContentLoaded", ready);
function ready () {


    let akcijos = document.getElementById('cat-akcijos');
    let vaikams = document.getElementById('cat-vaikams');
    let moterims = document.getElementById('cat-moterims');
    let vyrams = document.getElementById('cat-vyrams');
    let namams = document.getElementById('cat-namams');
    let akcijosB = document.getElementById('akcijos');
    let vaikamsB = document.getElementById('vaikams');
    let moterimsB = document.getElementById('moterims');
    let vyramsB = document.getElementById('vyrams');
    let namamsB = document.getElementById('namams');

//ok susitvarkyk cia nes cia tik pirmam puslapiui aktualu
        let items = [akcijos, vaikams, moterims, vyrams, namams];
        let clicks = [akcijosB, vaikamsB, moterimsB, vyramsB, namamsB];

        //console.log(akcijos);
        //console.log(items);
        //console.log(clicks);

        if (akcijos != null && typeof clicks != "undefined" && clicks != null && clicks.length != null && clicks.length > 0) {

            for (let c = 0; c < clicks.length; c++) {
                clicks[c].addEventListener('click', () => {
                    setDisplay(items, c);
                    setActiveClass(clicks, c);
                })
            }
            setDisplay(items, 0);
            setActiveClass(clicks, 0);
        }

    // akcijos.style.display = 'block';
    // vaikams.style.display = 'none';
    // moterims.style.display = 'none';
    // vyrams.style.display = 'none';
    // namams.style.display = 'none';

    let mobileSearchIcon = document.getElementById("mobile-search");
    let mobileSearchBlock = document.getElementById("mobile-search-block");
    let menuIcon = document.getElementById('menu-icon');
    let wrapper = document.getElementById('wrapper');
    let mobileSearchStart = document.getElementById('mobile-search-start');
    let searchForm = document.getElementById('search-form');

    mobileSearchIcon.addEventListener('click', function (){
        if (mobileSearchBlock.style.display == "none"){
            mobileSearchBlock.style.display = "block";
            document.getElementById("search-field").focus();
        }else{
            mobileSearchBlock.style.display = "none";
        }
    });

    menuIcon.addEventListener("click", function (){
        if (mobileSearchBlock.style.display == "block"){
            mobileSearchBlock.style.display = "none";
        }
    });
    wrapper.addEventListener("click", function (){
        if (mobileSearchBlock.style.display == "block"){
            mobileSearchBlock.style.display = "none";
        }
    });

}

function setActiveClass(clicks, item) {
    for (let i = 0; i < clicks.length; i++) {
        if ( i === item) {
            clicks[i].classList.add('active');
        }else {
            clicks[i].classList.remove('active');
        }
    }
}

function setDisplay(items, item) {
    for (let i = 0; i < items.length; i++) {
        if ( i === item) {
            items[i].style.display = 'block';
        }else {
            items[i].style.display = 'none';
        }
    }
}