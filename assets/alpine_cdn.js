(() => {
      var Xe = !1,
            Ze = !1,
            V = [],
            Qe = -1;
      function Kt(e) {
            En(e);
      }
      function En(e) {
            V.includes(e) || V.push(e), Sn();
      }
      function ye(e) {
            let t = V.indexOf(e);
            t !== -1 && t > Qe && V.splice(t, 1);
      }
      function Sn() {
            !Ze && !Xe && ((Xe = !0), queueMicrotask(An));
      }
      function An() {
            (Xe = !1), (Ze = !0);
            for (let e = 0; e < V.length; e++) V[e](), (Qe = e);
            (V.length = 0), (Qe = -1), (Ze = !1);
      }
      var C,
            D,
            $,
            et,
            tt = !0;
      function zt(e) {
            (tt = !1), e(), (tt = !0);
      }
      function Vt(e) {
            (C = e.reactive),
                  ($ = e.release),
                  (D = (t) =>
                        e.effect(t, {
                              scheduler: (r) => {
                                    tt ? Kt(r) : r();
                              },
                        })),
                  (et = e.raw);
      }
      function rt(e) {
            D = e;
      }
      function Ht(e) {
            let t = () => {};
            return [
                  (n) => {
                        let i = D(n);
                        return (
                              e._x_effects ||
                                    ((e._x_effects = new Set()),
                                    (e._x_runEffects = () => {
                                          e._x_effects.forEach((o) => o());
                                    })),
                              e._x_effects.add(i),
                              (t = () => {
                                    i !== void 0 && (e._x_effects.delete(i), $(i));
                              }),
                              i
                        );
                  },
                  () => {
                        t();
                  },
            ];
      }
      var qt = [],
            Ut = [],
            Wt = [];
      function Gt(e) {
            Wt.push(e);
      }
      function be(e, t) {
            typeof t == "function"
                  ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
                  : ((t = e), Ut.push(t));
      }
      function Jt(e) {
            qt.push(e);
      }
      function Yt(e, t, r) {
            e._x_attributeCleanups || (e._x_attributeCleanups = {}),
                  e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
                  e._x_attributeCleanups[t].push(r);
      }
      function nt(e, t) {
            !e._x_attributeCleanups ||
                  Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
                        (t === void 0 || t.includes(r)) && (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
                  });
      }
      var ot = new MutationObserver(it),
            st = !1;
      function se() {
            ot.observe(document, { subtree: !0, childList: !0, attributes: !0, attributeOldValue: !0 }), (st = !0);
      }
      function at() {
            On(), ot.disconnect(), (st = !1);
      }
      var ae = [],
            ct = !1;
      function On() {
            (ae = ae.concat(ot.takeRecords())),
                  ae.length &&
                        !ct &&
                        ((ct = !0),
                        queueMicrotask(() => {
                              Tn(), (ct = !1);
                        }));
      }
      function Tn() {
            it(ae), (ae.length = 0);
      }
      function h(e) {
            if (!st) return e();
            at();
            let t = e();
            return se(), t;
      }
      var lt = !1,
            ve = [];
      function Xt() {
            lt = !0;
      }
      function Zt() {
            (lt = !1), it(ve), (ve = []);
      }
      function it(e) {
            if (lt) {
                  ve = ve.concat(e);
                  return;
            }
            let t = [],
                  r = [],
                  n = new Map(),
                  i = new Map();
            for (let o = 0; o < e.length; o++)
                  if (
                        !e[o].target._x_ignoreMutationObserver &&
                        (e[o].type === "childList" &&
                              (e[o].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)),
                              e[o].removedNodes.forEach((s) => s.nodeType === 1 && r.push(s))),
                        e[o].type === "attributes")
                  ) {
                        let s = e[o].target,
                              a = e[o].attributeName,
                              c = e[o].oldValue,
                              l = () => {
                                    n.has(s) || n.set(s, []), n.get(s).push({ name: a, value: s.getAttribute(a) });
                              },
                              u = () => {
                                    i.has(s) || i.set(s, []), i.get(s).push(a);
                              };
                        s.hasAttribute(a) && c === null ? l() : s.hasAttribute(a) ? (u(), l()) : u();
                  }
            i.forEach((o, s) => {
                  nt(s, o);
            }),
                  n.forEach((o, s) => {
                        qt.forEach((a) => a(s, o));
                  });
            for (let o of r)
                  if (!t.includes(o) && (Ut.forEach((s) => s(o)), o._x_cleanups))
                        for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
            t.forEach((o) => {
                  (o._x_ignoreSelf = !0), (o._x_ignore = !0);
            });
            for (let o of t)
                  r.includes(o) ||
                        !o.isConnected ||
                        (delete o._x_ignoreSelf,
                        delete o._x_ignore,
                        Wt.forEach((s) => s(o)),
                        (o._x_ignore = !0),
                        (o._x_ignoreSelf = !0));
            t.forEach((o) => {
                  delete o._x_ignoreSelf, delete o._x_ignore;
            }),
                  (t = null),
                  (r = null),
                  (n = null),
                  (i = null);
      }
      function we(e) {
            return F(L(e));
      }
      function N(e, t, r) {
            return (
                  (e._x_dataStack = [t, ...L(r || e)]),
                  () => {
                        e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
                  }
            );
      }
      function L(e) {
            return e._x_dataStack
                  ? e._x_dataStack
                  : typeof ShadowRoot == "function" && e instanceof ShadowRoot
                  ? L(e.host)
                  : e.parentNode
                  ? L(e.parentNode)
                  : [];
      }
      function F(e) {
            let t = new Proxy(
                  {},
                  {
                        ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
                        has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
                        get: (r, n) =>
                              (e.find((i) => {
                                    if (i.hasOwnProperty(n)) {
                                          let o = Object.getOwnPropertyDescriptor(i, n);
                                          if ((o.get && o.get._x_alreadyBound) || (o.set && o.set._x_alreadyBound))
                                                return !0;
                                          if ((o.get || o.set) && o.enumerable) {
                                                let s = o.get,
                                                      a = o.set,
                                                      c = o;
                                                (s = s && s.bind(t)),
                                                      (a = a && a.bind(t)),
                                                      s && (s._x_alreadyBound = !0),
                                                      a && (a._x_alreadyBound = !0),
                                                      Object.defineProperty(i, n, { ...c, get: s, set: a });
                                          }
                                          return !0;
                                    }
                                    return !1;
                              }) || {})[n],
                        set: (r, n, i) => {
                              let o = e.find((s) => s.hasOwnProperty(n));
                              return o ? (o[n] = i) : (e[e.length - 1][n] = i), !0;
                        },
                  }
            );
            return t;
      }
      function Ee(e) {
            let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null,
                  r = (n, i = "") => {
                        Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
                              ([o, { value: s, enumerable: a }]) => {
                                    if (a === !1 || s === void 0) return;
                                    let c = i === "" ? o : `${i}.${o}`;
                                    typeof s == "object" && s !== null && s._x_interceptor
                                          ? (n[o] = s.initialize(e, c, o))
                                          : t(s) && s !== n && !(s instanceof Element) && r(s, c);
                              }
                        );
                  };
            return r(e);
      }
      function Se(e, t = () => {}) {
            let r = {
                  initialValue: void 0,
                  _x_interceptor: !0,
                  initialize(n, i, o) {
                        return e(
                              this.initialValue,
                              () => Cn(n, i),
                              (s) => ut(n, i, s),
                              i,
                              o
                        );
                  },
            };
            return (
                  t(r),
                  (n) => {
                        if (typeof n == "object" && n !== null && n._x_interceptor) {
                              let i = r.initialize.bind(r);
                              r.initialize = (o, s, a) => {
                                    let c = n.initialize(o, s, a);
                                    return (r.initialValue = c), i(o, s, a);
                              };
                        } else r.initialValue = n;
                        return r;
                  }
            );
      }
      function Cn(e, t) {
            return t.split(".").reduce((r, n) => r[n], e);
      }
      function ut(e, t, r) {
            if ((typeof t == "string" && (t = t.split(".")), t.length === 1)) e[t[0]] = r;
            else {
                  if (t.length === 0) throw error;
                  return e[t[0]] || (e[t[0]] = {}), ut(e[t[0]], t.slice(1), r);
            }
      }
      var Qt = {};
      function y(e, t) {
            Qt[e] = t;
      }
      function ce(e, t) {
            return (
                  Object.entries(Qt).forEach(([r, n]) => {
                        let i = null;
                        function o() {
                              if (i) return i;
                              {
                                    let [s, a] = ft(t);
                                    return (i = { interceptor: Se, ...s }), be(t, a), i;
                              }
                        }
                        Object.defineProperty(e, `$${r}`, {
                              get() {
                                    return n(t, o());
                              },
                              enumerable: !1,
                        });
                  }),
                  e
            );
      }
      function er(e, t, r, ...n) {
            try {
                  return r(...n);
            } catch (i) {
                  X(i, e, t);
            }
      }
      function X(e, t, r = void 0) {
            Object.assign(e, { el: t, expression: r }),
                  console.warn(
                        `Alpine Expression Error: ${e.message}

${
      r
            ? 'Expression: "' +
              r +
              `"

`
            : ""
}`,
                        t
                  ),
                  setTimeout(() => {
                        throw e;
                  }, 0);
      }
      var Ae = !0;
      function Oe(e) {
            let t = Ae;
            Ae = !1;
            let r = e();
            return (Ae = t), r;
      }
      function R(e, t, r = {}) {
            let n;
            return x(e, t)((i) => (n = i), r), n;
      }
      function x(...e) {
            return tr(...e);
      }
      var tr = dt;
      function rr(e) {
            tr = e;
      }
      function dt(e, t) {
            let r = {};
            ce(r, e);
            let n = [r, ...L(e)],
                  i = typeof t == "function" ? Rn(n, t) : Mn(n, t, e);
            return er.bind(null, e, t, i);
      }
      function Rn(e, t) {
            return (r = () => {}, { scope: n = {}, params: i = [] } = {}) => {
                  let o = t.apply(F([n, ...e]), i);
                  Te(r, o);
            };
      }
      var pt = {};
      function Nn(e, t) {
            if (pt[e]) return pt[e];
            let r = Object.getPrototypeOf(async function () {}).constructor,
                  n = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e) ? `(async()=>{ ${e} })()` : e,
                  o = (() => {
                        try {
                              return new r(
                                    ["__self", "scope"],
                                    `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
                              );
                        } catch (s) {
                              return X(s, t, e), Promise.resolve();
                        }
                  })();
            return (pt[e] = o), o;
      }
      function Mn(e, t, r) {
            let n = Nn(t, r);
            return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
                  (n.result = void 0), (n.finished = !1);
                  let a = F([o, ...e]);
                  if (typeof n == "function") {
                        let c = n(n, a).catch((l) => X(l, r, t));
                        n.finished
                              ? (Te(i, n.result, a, s, r), (n.result = void 0))
                              : c
                                      .then((l) => {
                                            Te(i, l, a, s, r);
                                      })
                                      .catch((l) => X(l, r, t))
                                      .finally(() => (n.result = void 0));
                  }
            };
      }
      function Te(e, t, r, n, i) {
            if (Ae && typeof t == "function") {
                  let o = t.apply(r, n);
                  o instanceof Promise ? o.then((s) => Te(e, s, r, n)).catch((s) => X(s, i, t)) : e(o);
            } else typeof t == "object" && t instanceof Promise ? t.then((o) => e(o)) : e(t);
      }
      var mt = "x-";
      function O(e = "") {
            return mt + e;
      }
      function nr(e) {
            mt = e;
      }
      var ht = {};
      function p(e, t) {
            return (
                  (ht[e] = t),
                  {
                        before(r) {
                              if (!ht[r]) {
                                    console.warn(
                                          "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
                                    );
                                    return;
                              }
                              let n = H.indexOf(r);
                              H.splice(n >= 0 ? n : H.indexOf("DEFAULT"), 0, e);
                        },
                  }
            );
      }
      function le(e, t, r) {
            if (((t = Array.from(t)), e._x_virtualDirectives)) {
                  let o = Object.entries(e._x_virtualDirectives).map(([a, c]) => ({ name: a, value: c })),
                        s = _t(o);
                  (o = o.map((a) =>
                        s.find((c) => c.name === a.name) ? { name: `x-bind:${a.name}`, value: `"${a.value}"` } : a
                  )),
                        (t = t.concat(o));
            }
            let n = {};
            return t
                  .map(ir((o, s) => (n[o] = s)))
                  .filter(or)
                  .map(In(n, r))
                  .sort(Dn)
                  .map((o) => Pn(e, o));
      }
      function _t(e) {
            return Array.from(e)
                  .map(ir())
                  .filter((t) => !or(t));
      }
      var gt = !1,
            ue = new Map(),
            sr = Symbol();
      function ar(e) {
            gt = !0;
            let t = Symbol();
            (sr = t), ue.set(t, []);
            let r = () => {
                        for (; ue.get(t).length; ) ue.get(t).shift()();
                        ue.delete(t);
                  },
                  n = () => {
                        (gt = !1), r();
                  };
            e(r), n();
      }
      function ft(e) {
            let t = [],
                  r = (a) => t.push(a),
                  [n, i] = Ht(e);
            return (
                  t.push(i),
                  [
                        { Alpine: j, effect: n, cleanup: r, evaluateLater: x.bind(x, e), evaluate: R.bind(R, e) },
                        () => t.forEach((a) => a()),
                  ]
            );
      }
      function Pn(e, t) {
            let r = () => {},
                  n = ht[t.type] || r,
                  [i, o] = ft(e);
            Yt(e, t.original, o);
            let s = () => {
                  e._x_ignore ||
                        e._x_ignoreSelf ||
                        (n.inline && n.inline(e, t, i), (n = n.bind(n, e, t, i)), gt ? ue.get(sr).push(n) : n());
            };
            return (s.runCleanups = o), s;
      }
      var Ce =
                  (e, t) =>
                  ({ name: r, value: n }) => (r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }),
            Re = (e) => e;
      function ir(e = () => {}) {
            return ({ name: t, value: r }) => {
                  let { name: n, value: i } = cr.reduce((o, s) => s(o), { name: t, value: r });
                  return n !== t && e(n, t), { name: n, value: i };
            };
      }
      var cr = [];
      function Z(e) {
            cr.push(e);
      }
      function or({ name: e }) {
            return lr().test(e);
      }
      var lr = () => new RegExp(`^${mt}([^:^.]+)\\b`);
      function In(e, t) {
            return ({ name: r, value: n }) => {
                  let i = r.match(lr()),
                        o = r.match(/:([a-zA-Z0-9\-:]+)/),
                        s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                        a = t || e[r] || r;
                  return {
                        type: i ? i[1] : null,
                        value: o ? o[1] : null,
                        modifiers: s.map((c) => c.replace(".", "")),
                        expression: n,
                        original: a,
                  };
            };
      }
      var xt = "DEFAULT",
            H = [
                  "ignore",
                  "ref",
                  "data",
                  "id",
                  "bind",
                  "init",
                  "for",
                  "model",
                  "modelable",
                  "transition",
                  "show",
                  "if",
                  xt,
                  "teleport",
            ];
      function Dn(e, t) {
            let r = H.indexOf(e.type) === -1 ? xt : e.type,
                  n = H.indexOf(t.type) === -1 ? xt : t.type;
            return H.indexOf(r) - H.indexOf(n);
      }
      function q(e, t, r = {}) {
            e.dispatchEvent(new CustomEvent(t, { detail: r, bubbles: !0, composed: !0, cancelable: !0 }));
      }
      function T(e, t) {
            if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
                  Array.from(e.children).forEach((i) => T(i, t));
                  return;
            }
            let r = !1;
            if ((t(e, () => (r = !0)), r)) return;
            let n = e.firstElementChild;
            for (; n; ) T(n, t, !1), (n = n.nextElementSibling);
      }
      function S(e, ...t) {
            console.warn(`Alpine Warning: ${e}`, ...t);
      }
      var ur = !1;
      function dr() {
            ur &&
                  S(
                        "Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."
                  ),
                  (ur = !0),
                  document.body ||
                        S(
                              "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
                        ),
                  q(document, "alpine:init"),
                  q(document, "alpine:initializing"),
                  se(),
                  Gt((t) => E(t, T)),
                  be((t) => yt(t)),
                  Jt((t, r) => {
                        le(t, r).forEach((n) => n());
                  });
            let e = (t) => !U(t.parentElement, !0);
            Array.from(document.querySelectorAll(fr()))
                  .filter(e)
                  .forEach((t) => {
                        E(t);
                  }),
                  q(document, "alpine:initialized");
      }
      var bt = [],
            pr = [];
      function mr() {
            return bt.map((e) => e());
      }
      function fr() {
            return bt.concat(pr).map((e) => e());
      }
      function Me(e) {
            bt.push(e);
      }
      function Ne(e) {
            pr.push(e);
      }
      function U(e, t = !1) {
            return Q(e, (r) => {
                  if ((t ? fr() : mr()).some((i) => r.matches(i))) return !0;
            });
      }
      function Q(e, t) {
            if (!!e) {
                  if (t(e)) return e;
                  if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement)) return Q(e.parentElement, t);
            }
      }
      function hr(e) {
            return mr().some((t) => e.matches(t));
      }
      var _r = [];
      function gr(e) {
            _r.push(e);
      }
      function E(e, t = T, r = () => {}) {
            ar(() => {
                  t(e, (n, i) => {
                        r(n, i),
                              _r.forEach((o) => o(n, i)),
                              le(n, n.attributes).forEach((o) => o()),
                              n._x_ignore && i();
                  });
            });
      }
      function yt(e) {
            T(e, (t) => nt(t));
      }
      var vt = [],
            wt = !1;
      function ee(e = () => {}) {
            return (
                  queueMicrotask(() => {
                        wt ||
                              setTimeout(() => {
                                    Pe();
                              });
                  }),
                  new Promise((t) => {
                        vt.push(() => {
                              e(), t();
                        });
                  })
            );
      }
      function Pe() {
            for (wt = !1; vt.length; ) vt.shift()();
      }
      function xr() {
            wt = !0;
      }
      function fe(e, t) {
            return Array.isArray(t)
                  ? yr(e, t.join(" "))
                  : typeof t == "object" && t !== null
                  ? kn(e, t)
                  : typeof t == "function"
                  ? fe(e, t())
                  : yr(e, t);
      }
      function yr(e, t) {
            let r = (o) => o.split(" ").filter(Boolean),
                  n = (o) =>
                        o
                              .split(" ")
                              .filter((s) => !e.classList.contains(s))
                              .filter(Boolean),
                  i = (o) => (
                        e.classList.add(...o),
                        () => {
                              e.classList.remove(...o);
                        }
                  );
            return (t = t === !0 ? (t = "") : t || ""), i(n(t));
      }
      function kn(e, t) {
            let r = (a) => a.split(" ").filter(Boolean),
                  n = Object.entries(t)
                        .flatMap(([a, c]) => (c ? r(a) : !1))
                        .filter(Boolean),
                  i = Object.entries(t)
                        .flatMap(([a, c]) => (c ? !1 : r(a)))
                        .filter(Boolean),
                  o = [],
                  s = [];
            return (
                  i.forEach((a) => {
                        e.classList.contains(a) && (e.classList.remove(a), s.push(a));
                  }),
                  n.forEach((a) => {
                        e.classList.contains(a) || (e.classList.add(a), o.push(a));
                  }),
                  () => {
                        s.forEach((a) => e.classList.add(a)), o.forEach((a) => e.classList.remove(a));
                  }
            );
      }
      function W(e, t) {
            return typeof t == "object" && t !== null ? $n(e, t) : Ln(e, t);
      }
      function $n(e, t) {
            let r = {};
            return (
                  Object.entries(t).forEach(([n, i]) => {
                        (r[n] = e.style[n]), n.startsWith("--") || (n = Fn(n)), e.style.setProperty(n, i);
                  }),
                  setTimeout(() => {
                        e.style.length === 0 && e.removeAttribute("style");
                  }),
                  () => {
                        W(e, r);
                  }
            );
      }
      function Ln(e, t) {
            let r = e.getAttribute("style", t);
            return (
                  e.setAttribute("style", t),
                  () => {
                        e.setAttribute("style", r || "");
                  }
            );
      }
      function Fn(e) {
            return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function de(e, t = () => {}) {
            let r = !1;
            return function () {
                  r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments));
            };
      }
      p("transition", (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
            typeof n == "function" && (n = i(n)), n !== !1 && (!n || typeof n == "boolean" ? Bn(e, r, t) : jn(e, n, t));
      });
      function jn(e, t, r) {
            br(e, fe, ""),
                  {
                        enter: (i) => {
                              e._x_transition.enter.during = i;
                        },
                        "enter-start": (i) => {
                              e._x_transition.enter.start = i;
                        },
                        "enter-end": (i) => {
                              e._x_transition.enter.end = i;
                        },
                        leave: (i) => {
                              e._x_transition.leave.during = i;
                        },
                        "leave-start": (i) => {
                              e._x_transition.leave.start = i;
                        },
                        "leave-end": (i) => {
                              e._x_transition.leave.end = i;
                        },
                  }[r](t);
      }
      function Bn(e, t, r) {
            br(e, W);
            let n = !t.includes("in") && !t.includes("out") && !r,
                  i = n || t.includes("in") || ["enter"].includes(r),
                  o = n || t.includes("out") || ["leave"].includes(r);
            t.includes("in") && !n && (t = t.filter((_, b) => b < t.indexOf("out"))),
                  t.includes("out") && !n && (t = t.filter((_, b) => b > t.indexOf("out")));
            let s = !t.includes("opacity") && !t.includes("scale"),
                  a = s || t.includes("opacity"),
                  c = s || t.includes("scale"),
                  l = a ? 0 : 1,
                  u = c ? pe(t, "scale", 95) / 100 : 1,
                  d = pe(t, "delay", 0) / 1e3,
                  m = pe(t, "origin", "center"),
                  v = "opacity, transform",
                  k = pe(t, "duration", 150) / 1e3,
                  xe = pe(t, "duration", 75) / 1e3,
                  f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
            i &&
                  ((e._x_transition.enter.during = {
                        transformOrigin: m,
                        transitionDelay: `${d}s`,
                        transitionProperty: v,
                        transitionDuration: `${k}s`,
                        transitionTimingFunction: f,
                  }),
                  (e._x_transition.enter.start = { opacity: l, transform: `scale(${u})` }),
                  (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
                  o &&
                        ((e._x_transition.leave.during = {
                              transformOrigin: m,
                              transitionDelay: `${d}s`,
                              transitionProperty: v,
                              transitionDuration: `${xe}s`,
                              transitionTimingFunction: f,
                        }),
                        (e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
                        (e._x_transition.leave.end = { opacity: l, transform: `scale(${u})` }));
      }
      function br(e, t, r = {}) {
            e._x_transition ||
                  (e._x_transition = {
                        enter: { during: r, start: r, end: r },
                        leave: { during: r, start: r, end: r },
                        in(n = () => {}, i = () => {}) {
                              Ie(
                                    e,
                                    t,
                                    { during: this.enter.during, start: this.enter.start, end: this.enter.end },
                                    n,
                                    i
                              );
                        },
                        out(n = () => {}, i = () => {}) {
                              Ie(
                                    e,
                                    t,
                                    { during: this.leave.during, start: this.leave.start, end: this.leave.end },
                                    n,
                                    i
                              );
                        },
                  });
      }
      window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, r, n) {
            let i = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout,
                  o = () => i(r);
            if (t) {
                  e._x_transition && (e._x_transition.enter || e._x_transition.leave)
                        ? e._x_transition.enter &&
                          (Object.entries(e._x_transition.enter.during).length ||
                                Object.entries(e._x_transition.enter.start).length ||
                                Object.entries(e._x_transition.enter.end).length)
                              ? e._x_transition.in(r)
                              : o()
                        : e._x_transition
                        ? e._x_transition.in(r)
                        : o();
                  return;
            }
            (e._x_hidePromise = e._x_transition
                  ? new Promise((s, a) => {
                          e._x_transition.out(
                                () => {},
                                () => s(n)
                          ),
                                e._x_transitioning.beforeCancel(() => a({ isFromCancelledTransition: !0 }));
                    })
                  : Promise.resolve(n)),
                  queueMicrotask(() => {
                        let s = vr(e);
                        s
                              ? (s._x_hideChildren || (s._x_hideChildren = []), s._x_hideChildren.push(e))
                              : i(() => {
                                      let a = (c) => {
                                            let l = Promise.all([
                                                  c._x_hidePromise,
                                                  ...(c._x_hideChildren || []).map(a),
                                            ]).then(([u]) => u());
                                            return delete c._x_hidePromise, delete c._x_hideChildren, l;
                                      };
                                      a(e).catch((c) => {
                                            if (!c.isFromCancelledTransition) throw c;
                                      });
                                });
                  });
      };
      function vr(e) {
            let t = e.parentNode;
            if (!!t) return t._x_hidePromise ? t : vr(t);
      }
      function Ie(e, t, { during: r, start: n, end: i } = {}, o = () => {}, s = () => {}) {
            if (
                  (e._x_transitioning && e._x_transitioning.cancel(),
                  Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0)
            ) {
                  o(), s();
                  return;
            }
            let a, c, l;
            Kn(e, {
                  start() {
                        a = t(e, n);
                  },
                  during() {
                        c = t(e, r);
                  },
                  before: o,
                  end() {
                        a(), (l = t(e, i));
                  },
                  after: s,
                  cleanup() {
                        c(), l();
                  },
            });
      }
      function Kn(e, t) {
            let r,
                  n,
                  i,
                  o = de(() => {
                        h(() => {
                              (r = !0),
                                    n || t.before(),
                                    i || (t.end(), Pe()),
                                    t.after(),
                                    e.isConnected && t.cleanup(),
                                    delete e._x_transitioning;
                        });
                  });
            (e._x_transitioning = {
                  beforeCancels: [],
                  beforeCancel(s) {
                        this.beforeCancels.push(s);
                  },
                  cancel: de(function () {
                        for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
                        o();
                  }),
                  finish: o,
            }),
                  h(() => {
                        t.start(), t.during();
                  }),
                  xr(),
                  requestAnimationFrame(() => {
                        if (r) return;
                        let s =
                                    Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) *
                                    1e3,
                              a = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
                        s === 0 && (s = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
                              h(() => {
                                    t.before();
                              }),
                              (n = !0),
                              requestAnimationFrame(() => {
                                    r ||
                                          (h(() => {
                                                t.end();
                                          }),
                                          Pe(),
                                          setTimeout(e._x_transitioning.finish, s + a),
                                          (i = !0));
                              });
                  });
      }
      function pe(e, t, r) {
            if (e.indexOf(t) === -1) return r;
            let n = e[e.indexOf(t) + 1];
            if (!n || (t === "scale" && isNaN(n))) return r;
            if (t === "duration" || t === "delay") {
                  let i = n.match(/([0-9]+)ms/);
                  if (i) return i[1];
            }
            return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
                  ? [n, e[e.indexOf(t) + 2]].join(" ")
                  : n;
      }
      var te = !1;
      function P(e, t = () => {}) {
            return (...r) => (te ? t(...r) : e(...r));
      }
      function wr(e) {
            return (...t) => te && e(...t);
      }
      function Er(e, t) {
            t._x_dataStack || (t._x_dataStack = e._x_dataStack),
                  (te = !0),
                  Vn(() => {
                        zn(t);
                  }),
                  (te = !1);
      }
      function zn(e) {
            let t = !1;
            E(e, (n, i) => {
                  T(n, (o, s) => {
                        if (t && hr(o)) return s();
                        (t = !0), i(o, s);
                  });
            });
      }
      function Vn(e) {
            let t = D;
            rt((r, n) => {
                  let i = t(r);
                  return $(i), () => {};
            }),
                  e(),
                  rt(t);
      }
      function me(e, t, r, n = []) {
            switch (
                  (e._x_bindings || (e._x_bindings = C({})),
                  (e._x_bindings[t] = r),
                  (t = n.includes("camel") ? Gn(t) : t),
                  t)
            ) {
                  case "value":
                        Hn(e, r);
                        break;
                  case "style":
                        Un(e, r);
                        break;
                  case "class":
                        qn(e, r);
                        break;
                  case "selected":
                  case "checked":
                        Wn(e, t, r);
                        break;
                  default:
                        Sr(e, t, r);
                        break;
            }
      }
      function Hn(e, t) {
            if (e.type === "radio")
                  e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = Ar(e.value, t));
            else if (e.type === "checkbox")
                  Number.isInteger(t)
                        ? (e.value = t)
                        : !Number.isInteger(t) &&
                          !Array.isArray(t) &&
                          typeof t != "boolean" &&
                          ![null, void 0].includes(t)
                        ? (e.value = String(t))
                        : Array.isArray(t)
                        ? (e.checked = t.some((r) => Ar(r, e.value)))
                        : (e.checked = !!t);
            else if (e.tagName === "SELECT") Jn(e, t);
            else {
                  if (e.value === t) return;
                  e.value = t;
            }
      }
      function qn(e, t) {
            e._x_undoAddedClasses && e._x_undoAddedClasses(), (e._x_undoAddedClasses = fe(e, t));
      }
      function Un(e, t) {
            e._x_undoAddedStyles && e._x_undoAddedStyles(), (e._x_undoAddedStyles = W(e, t));
      }
      function Wn(e, t, r) {
            Sr(e, t, r), Yn(e, t, r);
      }
      function Sr(e, t, r) {
            [null, void 0, !1].includes(r) && Zn(t) ? e.removeAttribute(t) : (Or(t) && (r = t), Xn(e, t, r));
      }
      function Xn(e, t, r) {
            e.getAttribute(t) != r && e.setAttribute(t, r);
      }
      function Yn(e, t, r) {
            e[t] !== r && (e[t] = r);
      }
      function Jn(e, t) {
            let r = [].concat(t).map((n) => n + "");
            Array.from(e.options).forEach((n) => {
                  n.selected = r.includes(n.value);
            });
      }
      function Gn(e) {
            return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
      }
      function Ar(e, t) {
            return e == t;
      }
      function Or(e) {
            return [
                  "disabled",
                  "checked",
                  "required",
                  "readonly",
                  "hidden",
                  "open",
                  "selected",
                  "autofocus",
                  "itemscope",
                  "multiple",
                  "novalidate",
                  "allowfullscreen",
                  "allowpaymentrequest",
                  "formnovalidate",
                  "autoplay",
                  "controls",
                  "loop",
                  "muted",
                  "playsinline",
                  "default",
                  "ismap",
                  "reversed",
                  "async",
                  "defer",
                  "nomodule",
            ].includes(e);
      }
      function Zn(e) {
            return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(e);
      }
      function Cr(e, t, r) {
            return e._x_bindings && e._x_bindings[t] !== void 0 ? e._x_bindings[t] : Tr(e, t, r);
      }
      function Rr(e, t, r, n = !0) {
            if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
            if (e._x_inlineBindings && e._x_inlineBindings[t] !== void 0) {
                  let i = e._x_inlineBindings[t];
                  return (i.extract = n), Oe(() => R(e, i.expression));
            }
            return Tr(e, t, r);
      }
      function Tr(e, t, r) {
            let n = e.getAttribute(t);
            return n === null
                  ? typeof r == "function"
                        ? r()
                        : r
                  : n === ""
                  ? !0
                  : Or(t)
                  ? !![t, "true"].includes(n)
                  : n;
      }
      function De(e, t) {
            var r;
            return function () {
                  var n = this,
                        i = arguments,
                        o = function () {
                              (r = null), e.apply(n, i);
                        };
                  clearTimeout(r), (r = setTimeout(o, t));
            };
      }
      function ke(e, t) {
            let r;
            return function () {
                  let n = this,
                        i = arguments;
                  r || (e.apply(n, i), (r = !0), setTimeout(() => (r = !1), t));
            };
      }
      function Mr(e) {
            (Array.isArray(e) ? e : [e]).forEach((r) => r(j));
      }
      var G = {},
            Nr = !1;
      function Pr(e, t) {
            if ((Nr || ((G = C(G)), (Nr = !0)), t === void 0)) return G[e];
            (G[e] = t),
                  typeof t == "object" &&
                        t !== null &&
                        t.hasOwnProperty("init") &&
                        typeof t.init == "function" &&
                        G[e].init(),
                  Ee(G[e]);
      }
      function Ir() {
            return G;
      }
      var Dr = {};
      function kr(e, t) {
            let r = typeof t != "function" ? () => t : t;
            e instanceof Element ? Et(e, r()) : (Dr[e] = r);
      }
      function $r(e) {
            return (
                  Object.entries(Dr).forEach(([t, r]) => {
                        Object.defineProperty(e, t, {
                              get() {
                                    return (...n) => r(...n);
                              },
                        });
                  }),
                  e
            );
      }
      function Et(e, t, r) {
            let n = [];
            for (; n.length; ) n.pop()();
            let i = Object.entries(t).map(([s, a]) => ({ name: s, value: a })),
                  o = _t(i);
            (i = i.map((s) =>
                  o.find((a) => a.name === s.name) ? { name: `x-bind:${s.name}`, value: `"${s.value}"` } : s
            )),
                  le(e, i, r).map((s) => {
                        n.push(s.runCleanups), s();
                  });
      }
      var Lr = {};
      function Fr(e, t) {
            Lr[e] = t;
      }
      function jr(e, t) {
            return (
                  Object.entries(Lr).forEach(([r, n]) => {
                        Object.defineProperty(e, r, {
                              get() {
                                    return (...i) => n.bind(t)(...i);
                              },
                              enumerable: !1,
                        });
                  }),
                  e
            );
      }
      var Qn = {
                  get reactive() {
                        return C;
                  },
                  get release() {
                        return $;
                  },
                  get effect() {
                        return D;
                  },
                  get raw() {
                        return et;
                  },
                  version: "3.12.3",
                  flushAndStopDeferringMutations: Zt,
                  dontAutoEvaluateFunctions: Oe,
                  disableEffectScheduling: zt,
                  startObservingMutations: se,
                  stopObservingMutations: at,
                  setReactivityEngine: Vt,
                  closestDataStack: L,
                  skipDuringClone: P,
                  onlyDuringClone: wr,
                  addRootSelector: Me,
                  addInitSelector: Ne,
                  addScopeToNode: N,
                  deferMutations: Xt,
                  mapAttributes: Z,
                  evaluateLater: x,
                  interceptInit: gr,
                  setEvaluator: rr,
                  mergeProxies: F,
                  extractProp: Rr,
                  findClosest: Q,
                  closestRoot: U,
                  destroyTree: yt,
                  interceptor: Se,
                  transition: Ie,
                  setStyles: W,
                  mutateDom: h,
                  directive: p,
                  throttle: ke,
                  debounce: De,
                  evaluate: R,
                  initTree: E,
                  nextTick: ee,
                  prefixed: O,
                  prefix: nr,
                  plugin: Mr,
                  magic: y,
                  store: Pr,
                  start: dr,
                  clone: Er,
                  bound: Cr,
                  $data: we,
                  walk: T,
                  data: Fr,
                  bind: kr,
            },
            j = Qn;
      function St(e, t) {
            let r = Object.create(null),
                  n = e.split(",");
            for (let i = 0; i < n.length; i++) r[n[i]] = !0;
            return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
      }
      var ys = {
                  [1]: "TEXT",
                  [2]: "CLASS",
                  [4]: "STYLE",
                  [8]: "PROPS",
                  [16]: "FULL_PROPS",
                  [32]: "HYDRATE_EVENTS",
                  [64]: "STABLE_FRAGMENT",
                  [128]: "KEYED_FRAGMENT",
                  [256]: "UNKEYED_FRAGMENT",
                  [512]: "NEED_PATCH",
                  [1024]: "DYNAMIC_SLOTS",
                  [2048]: "DEV_ROOT_FRAGMENT",
                  [-1]: "HOISTED",
                  [-2]: "BAIL",
            },
            bs = { [1]: "STABLE", [2]: "DYNAMIC", [3]: "FORWARDED" };
      var ei = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
      var vs = St(
            ei +
                  ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
      );
      var Br = Object.freeze({}),
            ws = Object.freeze([]);
      var At = Object.assign;
      var ti = Object.prototype.hasOwnProperty,
            he = (e, t) => ti.call(e, t),
            B = Array.isArray,
            re = (e) => Kr(e) === "[object Map]";
      var ri = (e) => typeof e == "string",
            $e = (e) => typeof e == "symbol",
            _e = (e) => e !== null && typeof e == "object";
      var ni = Object.prototype.toString,
            Kr = (e) => ni.call(e),
            Ot = (e) => Kr(e).slice(8, -1);
      var Le = (e) => ri(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
      var Fe = (e) => {
                  let t = Object.create(null);
                  return (r) => t[r] || (t[r] = e(r));
            },
            ii = /-(\w)/g,
            Es = Fe((e) => e.replace(ii, (t, r) => (r ? r.toUpperCase() : ""))),
            oi = /\B([A-Z])/g,
            Ss = Fe((e) => e.replace(oi, "-$1").toLowerCase()),
            Tt = Fe((e) => e.charAt(0).toUpperCase() + e.slice(1)),
            As = Fe((e) => (e ? `on${Tt(e)}` : "")),
            Ct = (e, t) => e !== t && (e === e || t === t);
      var Rt = new WeakMap(),
            ge = [],
            I,
            J = Symbol("iterate"),
            Mt = Symbol("Map key iterate");
      function si(e) {
            return e && e._isEffect === !0;
      }
      function zr(e, t = Br) {
            si(e) && (e = e.raw);
            let r = ai(e, t);
            return t.lazy || r(), r;
      }
      function Hr(e) {
            e.active && (Vr(e), e.options.onStop && e.options.onStop(), (e.active = !1));
      }
      var ci = 0;
      function ai(e, t) {
            let r = function () {
                  if (!r.active) return e();
                  if (!ge.includes(r)) {
                        Vr(r);
                        try {
                              return li(), ge.push(r), (I = r), e();
                        } finally {
                              ge.pop(), qr(), (I = ge[ge.length - 1]);
                        }
                  }
            };
            return (
                  (r.id = ci++),
                  (r.allowRecurse = !!t.allowRecurse),
                  (r._isEffect = !0),
                  (r.active = !0),
                  (r.raw = e),
                  (r.deps = []),
                  (r.options = t),
                  r
            );
      }
      function Vr(e) {
            let { deps: t } = e;
            if (t.length) {
                  for (let r = 0; r < t.length; r++) t[r].delete(e);
                  t.length = 0;
            }
      }
      var ne = !0,
            Nt = [];
      function ui() {
            Nt.push(ne), (ne = !1);
      }
      function li() {
            Nt.push(ne), (ne = !0);
      }
      function qr() {
            let e = Nt.pop();
            ne = e === void 0 ? !0 : e;
      }
      function M(e, t, r) {
            if (!ne || I === void 0) return;
            let n = Rt.get(e);
            n || Rt.set(e, (n = new Map()));
            let i = n.get(r);
            i || n.set(r, (i = new Set())),
                  i.has(I) ||
                        (i.add(I),
                        I.deps.push(i),
                        I.options.onTrack && I.options.onTrack({ effect: I, target: e, type: t, key: r }));
      }
      function K(e, t, r, n, i, o) {
            let s = Rt.get(e);
            if (!s) return;
            let a = new Set(),
                  c = (u) => {
                        u &&
                              u.forEach((d) => {
                                    (d !== I || d.allowRecurse) && a.add(d);
                              });
                  };
            if (t === "clear") s.forEach(c);
            else if (r === "length" && B(e))
                  s.forEach((u, d) => {
                        (d === "length" || d >= n) && c(u);
                  });
            else
                  switch ((r !== void 0 && c(s.get(r)), t)) {
                        case "add":
                              B(e) ? Le(r) && c(s.get("length")) : (c(s.get(J)), re(e) && c(s.get(Mt)));
                              break;
                        case "delete":
                              B(e) || (c(s.get(J)), re(e) && c(s.get(Mt)));
                              break;
                        case "set":
                              re(e) && c(s.get(J));
                              break;
                  }
            let l = (u) => {
                  u.options.onTrigger &&
                        u.options.onTrigger({
                              effect: u,
                              target: e,
                              key: r,
                              type: t,
                              newValue: n,
                              oldValue: i,
                              oldTarget: o,
                        }),
                        u.options.scheduler ? u.options.scheduler(u) : u();
            };
            a.forEach(l);
      }
      var fi = St("__proto__,__v_isRef,__isVue"),
            Ur = new Set(
                  Object.getOwnPropertyNames(Symbol)
                        .map((e) => Symbol[e])
                        .filter($e)
            ),
            di = je(),
            pi = je(!1, !0),
            mi = je(!0),
            hi = je(!0, !0),
            Be = {};
      ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
            let t = Array.prototype[e];
            Be[e] = function (...r) {
                  let n = g(this);
                  for (let o = 0, s = this.length; o < s; o++) M(n, "get", o + "");
                  let i = t.apply(n, r);
                  return i === -1 || i === !1 ? t.apply(n, r.map(g)) : i;
            };
      });
      ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
            let t = Array.prototype[e];
            Be[e] = function (...r) {
                  ui();
                  let n = t.apply(this, r);
                  return qr(), n;
            };
      });
      function je(e = !1, t = !1) {
            return function (n, i, o) {
                  if (i === "__v_isReactive") return !e;
                  if (i === "__v_isReadonly") return e;
                  if (i === "__v_raw" && o === (e ? (t ? gi : Gr) : t ? _i : Wr).get(n)) return n;
                  let s = B(n);
                  if (!e && s && he(Be, i)) return Reflect.get(Be, i, o);
                  let a = Reflect.get(n, i, o);
                  return ($e(i) ? Ur.has(i) : fi(i)) || (e || M(n, "get", i), t)
                        ? a
                        : Pt(a)
                        ? !s || !Le(i)
                              ? a.value
                              : a
                        : _e(a)
                        ? e
                              ? Jr(a)
                              : Ke(a)
                        : a;
            };
      }
      var xi = Yr(),
            yi = Yr(!0);
      function Yr(e = !1) {
            return function (r, n, i, o) {
                  let s = r[n];
                  if (!e && ((i = g(i)), (s = g(s)), !B(r) && Pt(s) && !Pt(i))) return (s.value = i), !0;
                  let a = B(r) && Le(n) ? Number(n) < r.length : he(r, n),
                        c = Reflect.set(r, n, i, o);
                  return r === g(o) && (a ? Ct(i, s) && K(r, "set", n, i, s) : K(r, "add", n, i)), c;
            };
      }
      function bi(e, t) {
            let r = he(e, t),
                  n = e[t],
                  i = Reflect.deleteProperty(e, t);
            return i && r && K(e, "delete", t, void 0, n), i;
      }
      function vi(e, t) {
            let r = Reflect.has(e, t);
            return (!$e(t) || !Ur.has(t)) && M(e, "has", t), r;
      }
      function wi(e) {
            return M(e, "iterate", B(e) ? "length" : J), Reflect.ownKeys(e);
      }
      var Xr = { get: di, set: xi, deleteProperty: bi, has: vi, ownKeys: wi },
            Zr = {
                  get: mi,
                  set(e, t) {
                        return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
                  },
                  deleteProperty(e, t) {
                        return (
                              console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0
                        );
                  },
            },
            Ns = At({}, Xr, { get: pi, set: yi }),
            Ps = At({}, Zr, { get: hi }),
            It = (e) => (_e(e) ? Ke(e) : e),
            Dt = (e) => (_e(e) ? Jr(e) : e),
            kt = (e) => e,
            ze = (e) => Reflect.getPrototypeOf(e);
      function Ve(e, t, r = !1, n = !1) {
            e = e.__v_raw;
            let i = g(e),
                  o = g(t);
            t !== o && !r && M(i, "get", t), !r && M(i, "get", o);
            let { has: s } = ze(i),
                  a = n ? kt : r ? Dt : It;
            if (s.call(i, t)) return a(e.get(t));
            if (s.call(i, o)) return a(e.get(o));
            e !== i && e.get(t);
      }
      function He(e, t = !1) {
            let r = this.__v_raw,
                  n = g(r),
                  i = g(e);
            return e !== i && !t && M(n, "has", e), !t && M(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i);
      }
      function qe(e, t = !1) {
            return (e = e.__v_raw), !t && M(g(e), "iterate", J), Reflect.get(e, "size", e);
      }
      function Qr(e) {
            e = g(e);
            let t = g(this);
            return ze(t).has.call(t, e) || (t.add(e), K(t, "add", e, e)), this;
      }
      function tn(e, t) {
            t = g(t);
            let r = g(this),
                  { has: n, get: i } = ze(r),
                  o = n.call(r, e);
            o ? en(r, n, e) : ((e = g(e)), (o = n.call(r, e)));
            let s = i.call(r, e);
            return r.set(e, t), o ? Ct(t, s) && K(r, "set", e, t, s) : K(r, "add", e, t), this;
      }
      function rn(e) {
            let t = g(this),
                  { has: r, get: n } = ze(t),
                  i = r.call(t, e);
            i ? en(t, r, e) : ((e = g(e)), (i = r.call(t, e)));
            let o = n ? n.call(t, e) : void 0,
                  s = t.delete(e);
            return i && K(t, "delete", e, void 0, o), s;
      }
      function nn() {
            let e = g(this),
                  t = e.size !== 0,
                  r = re(e) ? new Map(e) : new Set(e),
                  n = e.clear();
            return t && K(e, "clear", void 0, void 0, r), n;
      }
      function Ue(e, t) {
            return function (n, i) {
                  let o = this,
                        s = o.__v_raw,
                        a = g(s),
                        c = t ? kt : e ? Dt : It;
                  return !e && M(a, "iterate", J), s.forEach((l, u) => n.call(i, c(l), c(u), o));
            };
      }
      function We(e, t, r) {
            return function (...n) {
                  let i = this.__v_raw,
                        o = g(i),
                        s = re(o),
                        a = e === "entries" || (e === Symbol.iterator && s),
                        c = e === "keys" && s,
                        l = i[e](...n),
                        u = r ? kt : t ? Dt : It;
                  return (
                        !t && M(o, "iterate", c ? Mt : J),
                        {
                              next() {
                                    let { value: d, done: m } = l.next();
                                    return m
                                          ? { value: d, done: m }
                                          : { value: a ? [u(d[0]), u(d[1])] : u(d), done: m };
                              },
                              [Symbol.iterator]() {
                                    return this;
                              },
                        }
                  );
            };
      }
      function z(e) {
            return function (...t) {
                  {
                        let r = t[0] ? `on key "${t[0]}" ` : "";
                        console.warn(`${Tt(e)} operation ${r}failed: target is readonly.`, g(this));
                  }
                  return e === "delete" ? !1 : this;
            };
      }
      var on = {
                  get(e) {
                        return Ve(this, e);
                  },
                  get size() {
                        return qe(this);
                  },
                  has: He,
                  add: Qr,
                  set: tn,
                  delete: rn,
                  clear: nn,
                  forEach: Ue(!1, !1),
            },
            sn = {
                  get(e) {
                        return Ve(this, e, !1, !0);
                  },
                  get size() {
                        return qe(this);
                  },
                  has: He,
                  add: Qr,
                  set: tn,
                  delete: rn,
                  clear: nn,
                  forEach: Ue(!1, !0),
            },
            an = {
                  get(e) {
                        return Ve(this, e, !0);
                  },
                  get size() {
                        return qe(this, !0);
                  },
                  has(e) {
                        return He.call(this, e, !0);
                  },
                  add: z("add"),
                  set: z("set"),
                  delete: z("delete"),
                  clear: z("clear"),
                  forEach: Ue(!0, !1),
            },
            cn = {
                  get(e) {
                        return Ve(this, e, !0, !0);
                  },
                  get size() {
                        return qe(this, !0);
                  },
                  has(e) {
                        return He.call(this, e, !0);
                  },
                  add: z("add"),
                  set: z("set"),
                  delete: z("delete"),
                  clear: z("clear"),
                  forEach: Ue(!0, !0),
            },
            Ei = ["keys", "values", "entries", Symbol.iterator];
      Ei.forEach((e) => {
            (on[e] = We(e, !1, !1)), (an[e] = We(e, !0, !1)), (sn[e] = We(e, !1, !0)), (cn[e] = We(e, !0, !0));
      });
      function Ge(e, t) {
            let r = t ? (e ? cn : sn) : e ? an : on;
            return (n, i, o) =>
                  i === "__v_isReactive"
                        ? !e
                        : i === "__v_isReadonly"
                        ? e
                        : i === "__v_raw"
                        ? n
                        : Reflect.get(he(r, i) && i in n ? r : n, i, o);
      }
      var Si = { get: Ge(!1, !1) },
            Is = { get: Ge(!1, !0) },
            Ai = { get: Ge(!0, !1) },
            Ds = { get: Ge(!0, !0) };
      function en(e, t, r) {
            let n = g(r);
            if (n !== r && t.call(e, n)) {
                  let i = Ot(e);
                  console.warn(
                        `Reactive ${i} contains both the raw and reactive versions of the same object${
                              i === "Map" ? " as keys" : ""
                        }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
                  );
            }
      }
      var Wr = new WeakMap(),
            _i = new WeakMap(),
            Gr = new WeakMap(),
            gi = new WeakMap();
      function Oi(e) {
            switch (e) {
                  case "Object":
                  case "Array":
                        return 1;
                  case "Map":
                  case "Set":
                  case "WeakMap":
                  case "WeakSet":
                        return 2;
                  default:
                        return 0;
            }
      }
      function Ti(e) {
            return e.__v_skip || !Object.isExtensible(e) ? 0 : Oi(Ot(e));
      }
      function Ke(e) {
            return e && e.__v_isReadonly ? e : ln(e, !1, Xr, Si, Wr);
      }
      function Jr(e) {
            return ln(e, !0, Zr, Ai, Gr);
      }
      function ln(e, t, r, n, i) {
            if (!_e(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
            if (e.__v_raw && !(t && e.__v_isReactive)) return e;
            let o = i.get(e);
            if (o) return o;
            let s = Ti(e);
            if (s === 0) return e;
            let a = new Proxy(e, s === 2 ? n : r);
            return i.set(e, a), a;
      }
      function g(e) {
            return (e && g(e.__v_raw)) || e;
      }
      function Pt(e) {
            return Boolean(e && e.__v_isRef === !0);
      }
      y("nextTick", () => ee);
      y("dispatch", (e) => q.bind(q, e));
      y("watch", (e, { evaluateLater: t, effect: r }) => (n, i) => {
            let o = t(n),
                  s = !0,
                  a,
                  c = r(() =>
                        o((l) => {
                              JSON.stringify(l),
                                    s
                                          ? (a = l)
                                          : queueMicrotask(() => {
                                                  i(l, a), (a = l);
                                            }),
                                    (s = !1);
                        })
                  );
            e._x_effects.delete(c);
      });
      y("store", Ir);
      y("data", (e) => we(e));
      y("root", (e) => U(e));
      y("refs", (e) => (e._x_refs_proxy || (e._x_refs_proxy = F(Ci(e))), e._x_refs_proxy));
      function Ci(e) {
            let t = [],
                  r = e;
            for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode);
            return t;
      }
      var $t = {};
      function Lt(e) {
            return $t[e] || ($t[e] = 0), ++$t[e];
      }
      function un(e, t) {
            return Q(e, (r) => {
                  if (r._x_ids && r._x_ids[t]) return !0;
            });
      }
      function fn(e, t) {
            e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = Lt(t));
      }
      y("id", (e) => (t, r = null) => {
            let n = un(e, t),
                  i = n ? n._x_ids[t] : Lt(t);
            return r ? `${t}-${i}-${r}` : `${t}-${i}`;
      });
      y("el", (e) => e);
      dn("Focus", "focus", "focus");
      dn("Persist", "persist", "persist");
      function dn(e, t, r) {
            y(t, (n) =>
                  S(
                        `You can't use [$${directiveName}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,
                        n
                  )
            );
      }
      function pn({ get: e, set: t }, { get: r, set: n }) {
            let i = !0,
                  o,
                  s,
                  a,
                  c,
                  l = D(() => {
                        let u, d;
                        i
                              ? ((u = e()), n(u), (d = r()), (i = !1))
                              : ((u = e()),
                                (d = r()),
                                (a = JSON.stringify(u)),
                                (c = JSON.stringify(d)),
                                a !== o ? ((d = r()), n(u), (d = u)) : (t(d), (u = d))),
                              (o = JSON.stringify(u)),
                              (s = JSON.stringify(d));
                  });
            return () => {
                  $(l);
            };
      }
      p("modelable", (e, { expression: t }, { effect: r, evaluateLater: n, cleanup: i }) => {
            let o = n(t),
                  s = () => {
                        let u;
                        return o((d) => (u = d)), u;
                  },
                  a = n(`${t} = __placeholder`),
                  c = (u) => a(() => {}, { scope: { __placeholder: u } }),
                  l = s();
            c(l),
                  queueMicrotask(() => {
                        if (!e._x_model) return;
                        e._x_removeModelListeners.default();
                        let u = e._x_model.get,
                              d = e._x_model.set,
                              m = pn(
                                    {
                                          get() {
                                                return u();
                                          },
                                          set(v) {
                                                d(v);
                                          },
                                    },
                                    {
                                          get() {
                                                return s();
                                          },
                                          set(v) {
                                                c(v);
                                          },
                                    }
                              );
                        i(m);
                  });
      });
      var Ri = document.createElement("div");
      p("teleport", (e, { modifiers: t, expression: r }, { cleanup: n }) => {
            e.tagName.toLowerCase() !== "template" && S("x-teleport can only be used on a <template> tag", e);
            let i = P(
                  () => document.querySelector(r),
                  () => Ri
            )();
            i || S(`Cannot find x-teleport element for selector: "${r}"`);
            let o = e.content.cloneNode(!0).firstElementChild;
            (e._x_teleport = o),
                  (o._x_teleportBack = e),
                  e._x_forwardEvents &&
                        e._x_forwardEvents.forEach((s) => {
                              o.addEventListener(s, (a) => {
                                    a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
                              });
                        }),
                  N(o, {}, e),
                  h(() => {
                        t.includes("prepend")
                              ? i.parentNode.insertBefore(o, i)
                              : t.includes("append")
                              ? i.parentNode.insertBefore(o, i.nextSibling)
                              : i.appendChild(o),
                              E(o),
                              (o._x_ignore = !0);
                  }),
                  n(() => o.remove());
      });
      var mn = () => {};
      mn.inline = (e, { modifiers: t }, { cleanup: r }) => {
            t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
                  r(() => {
                        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
                  });
      };
      p("ignore", mn);
      p("effect", (e, { expression: t }, { effect: r }) => r(x(e, t)));
      function ie(e, t, r, n) {
            let i = e,
                  o = (c) => n(c),
                  s = {},
                  a = (c, l) => (u) => l(c, u);
            if (
                  (r.includes("dot") && (t = Mi(t)),
                  r.includes("camel") && (t = Ni(t)),
                  r.includes("passive") && (s.passive = !0),
                  r.includes("capture") && (s.capture = !0),
                  r.includes("window") && (i = window),
                  r.includes("document") && (i = document),
                  r.includes("debounce"))
            ) {
                  let c = r[r.indexOf("debounce") + 1] || "invalid-wait",
                        l = Je(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
                  o = De(o, l);
            }
            if (r.includes("throttle")) {
                  let c = r[r.indexOf("throttle") + 1] || "invalid-wait",
                        l = Je(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
                  o = ke(o, l);
            }
            return (
                  r.includes("prevent") &&
                        (o = a(o, (c, l) => {
                              l.preventDefault(), c(l);
                        })),
                  r.includes("stop") &&
                        (o = a(o, (c, l) => {
                              l.stopPropagation(), c(l);
                        })),
                  r.includes("self") &&
                        (o = a(o, (c, l) => {
                              l.target === e && c(l);
                        })),
                  (r.includes("away") || r.includes("outside")) &&
                        ((i = document),
                        (o = a(o, (c, l) => {
                              e.contains(l.target) ||
                                    (l.target.isConnected !== !1 &&
                                          ((e.offsetWidth < 1 && e.offsetHeight < 1) || (e._x_isShown !== !1 && c(l))));
                        }))),
                  r.includes("once") &&
                        (o = a(o, (c, l) => {
                              c(l), i.removeEventListener(t, o, s);
                        })),
                  (o = a(o, (c, l) => {
                        (Pi(t) && Ii(l, r)) || c(l);
                  })),
                  i.addEventListener(t, o, s),
                  () => {
                        i.removeEventListener(t, o, s);
                  }
            );
      }
      function Mi(e) {
            return e.replace(/-/g, ".");
      }
      function Ni(e) {
            return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
      }
      function Je(e) {
            return !Array.isArray(e) && !isNaN(e);
      }
      function Di(e) {
            return [" ", "_"].includes(e)
                  ? e
                  : e
                          .replace(/([a-z])([A-Z])/g, "$1-$2")
                          .replace(/[_\s]/, "-")
                          .toLowerCase();
      }
      function Pi(e) {
            return ["keydown", "keyup"].includes(e);
      }
      function Ii(e, t) {
            let r = t.filter((o) => !["window", "document", "prevent", "stop", "once", "capture"].includes(o));
            if (r.includes("debounce")) {
                  let o = r.indexOf("debounce");
                  r.splice(o, Je((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
            }
            if (r.includes("throttle")) {
                  let o = r.indexOf("throttle");
                  r.splice(o, Je((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
            }
            if (r.length === 0 || (r.length === 1 && hn(e.key).includes(r[0]))) return !1;
            let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) => r.includes(o));
            return (
                  (r = r.filter((o) => !i.includes(o))),
                  !(
                        i.length > 0 &&
                        i.filter((s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length ===
                              i.length &&
                        hn(e.key).includes(r[0])
                  )
            );
      }
      function hn(e) {
            if (!e) return [];
            e = Di(e);
            let t = {
                  ctrl: "control",
                  slash: "/",
                  space: " ",
                  spacebar: " ",
                  cmd: "meta",
                  esc: "escape",
                  up: "arrow-up",
                  down: "arrow-down",
                  left: "arrow-left",
                  right: "arrow-right",
                  period: ".",
                  equal: "=",
                  minus: "-",
                  underscore: "_",
            };
            return (
                  (t[e] = e),
                  Object.keys(t)
                        .map((r) => {
                              if (t[r] === e) return r;
                        })
                        .filter((r) => r)
            );
      }
      p("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
            let o = e;
            t.includes("parent") && (o = e.parentNode);
            let s = x(o, r),
                  a;
            typeof r == "string"
                  ? (a = x(o, `${r} = __placeholder`))
                  : typeof r == "function" && typeof r() == "string"
                  ? (a = x(o, `${r()} = __placeholder`))
                  : (a = () => {});
            let c = () => {
                        let m;
                        return s((v) => (m = v)), _n(m) ? m.get() : m;
                  },
                  l = (m) => {
                        let v;
                        s((k) => (v = k)), _n(v) ? v.set(m) : a(() => {}, { scope: { __placeholder: m } });
                  };
            typeof r == "string" &&
                  e.type === "radio" &&
                  h(() => {
                        e.hasAttribute("name") || e.setAttribute("name", r);
                  });
            var u =
                  e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy")
                        ? "change"
                        : "input";
            let d = te
                  ? () => {}
                  : ie(e, u, t, (m) => {
                          l(ki(e, t, m, c()));
                    });
            if (
                  (t.includes("fill") && [null, ""].includes(c()) && e.dispatchEvent(new Event(u, {})),
                  e._x_removeModelListeners || (e._x_removeModelListeners = {}),
                  (e._x_removeModelListeners.default = d),
                  i(() => e._x_removeModelListeners.default()),
                  e.form)
            ) {
                  let m = ie(e.form, "reset", [], (v) => {
                        ee(() => e._x_model && e._x_model.set(e.value));
                  });
                  i(() => m());
            }
            (e._x_model = {
                  get() {
                        return c();
                  },
                  set(m) {
                        l(m);
                  },
            }),
                  (e._x_forceModelUpdate = (m) => {
                        (m = m === void 0 ? c() : m),
                              m === void 0 && typeof r == "string" && r.match(/\./) && (m = ""),
                              (window.fromModel = !0),
                              h(() => me(e, "value", m)),
                              delete window.fromModel;
                  }),
                  n(() => {
                        let m = c();
                        (t.includes("unintrusive") && document.activeElement.isSameNode(e)) || e._x_forceModelUpdate(m);
                  });
      });
      function ki(e, t, r, n) {
            return h(() => {
                  if (r instanceof CustomEvent && r.detail !== void 0) return r.detail ?? r.target.value;
                  if (e.type === "checkbox")
                        if (Array.isArray(n)) {
                              let i = t.includes("number") ? Ft(r.target.value) : r.target.value;
                              return r.target.checked ? n.concat([i]) : n.filter((o) => !$i(o, i));
                        } else return r.target.checked;
                  else {
                        if (e.tagName.toLowerCase() === "select" && e.multiple)
                              return t.includes("number")
                                    ? Array.from(r.target.selectedOptions).map((i) => {
                                            let o = i.value || i.text;
                                            return Ft(o);
                                      })
                                    : Array.from(r.target.selectedOptions).map((i) => i.value || i.text);
                        {
                              let i = r.target.value;
                              return t.includes("number") ? Ft(i) : t.includes("trim") ? i.trim() : i;
                        }
                  }
            });
      }
      function Ft(e) {
            let t = e ? parseFloat(e) : null;
            return Li(t) ? t : e;
      }
      function $i(e, t) {
            return e == t;
      }
      function Li(e) {
            return !Array.isArray(e) && !isNaN(e);
      }
      function _n(e) {
            return e !== null && typeof e == "object" && typeof e.get == "function" && typeof e.set == "function";
      }
      p("cloak", (e) => queueMicrotask(() => h(() => e.removeAttribute(O("cloak")))));
      Ne(() => `[${O("init")}]`);
      p(
            "init",
            P((e, { expression: t }, { evaluate: r }) =>
                  typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)
            )
      );
      p("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
            let i = n(t);
            r(() => {
                  i((o) => {
                        h(() => {
                              e.textContent = o;
                        });
                  });
            });
      });
      p("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
            let i = n(t);
            r(() => {
                  i((o) => {
                        h(() => {
                              (e.innerHTML = o), (e._x_ignoreSelf = !0), E(e), delete e._x_ignoreSelf;
                        });
                  });
            });
      });
      Z(Ce(":", Re(O("bind:"))));
      var gn = (e, { value: t, modifiers: r, expression: n, original: i }, { effect: o }) => {
            if (!t) {
                  let a = {};
                  $r(a),
                        x(e, n)(
                              (l) => {
                                    Et(e, l, i);
                              },
                              { scope: a }
                        );
                  return;
            }
            if (t === "key") return Fi(e, n);
            if (e._x_inlineBindings && e._x_inlineBindings[t] && e._x_inlineBindings[t].extract) return;
            let s = x(e, n);
            o(() =>
                  s((a) => {
                        a === void 0 && typeof n == "string" && n.match(/\./) && (a = ""), h(() => me(e, t, a, r));
                  })
            );
      };
      gn.inline = (e, { value: t, modifiers: r, expression: n }) => {
            !t ||
                  (e._x_inlineBindings || (e._x_inlineBindings = {}),
                  (e._x_inlineBindings[t] = { expression: n, extract: !1 }));
      };
      p("bind", gn);
      function Fi(e, t) {
            e._x_keyExpression = t;
      }
      Me(() => `[${O("data")}]`);
      p(
            "data",
            P((e, { expression: t }, { cleanup: r }) => {
                  t = t === "" ? "{}" : t;
                  let n = {};
                  ce(n, e);
                  let i = {};
                  jr(i, n);
                  let o = R(e, t, { scope: i });
                  (o === void 0 || o === !0) && (o = {}), ce(o, e);
                  let s = C(o);
                  Ee(s);
                  let a = N(e, s);
                  s.init && R(e, s.init),
                        r(() => {
                              s.destroy && R(e, s.destroy), a();
                        });
            })
      );
      p("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
            let i = x(e, r);
            e._x_doHide ||
                  (e._x_doHide = () => {
                        h(() => {
                              e.style.setProperty("display", "none", t.includes("important") ? "important" : void 0);
                        });
                  }),
                  e._x_doShow ||
                        (e._x_doShow = () => {
                              h(() => {
                                    e.style.length === 1 && e.style.display === "none"
                                          ? e.removeAttribute("style")
                                          : e.style.removeProperty("display");
                              });
                        });
            let o = () => {
                        e._x_doHide(), (e._x_isShown = !1);
                  },
                  s = () => {
                        e._x_doShow(), (e._x_isShown = !0);
                  },
                  a = () => setTimeout(s),
                  c = de(
                        (d) => (d ? s() : o()),
                        (d) => {
                              typeof e._x_toggleAndCascadeWithTransitions == "function"
                                    ? e._x_toggleAndCascadeWithTransitions(e, d, s, o)
                                    : d
                                    ? a()
                                    : o();
                        }
                  ),
                  l,
                  u = !0;
            n(() =>
                  i((d) => {
                        (!u && d === l) || (t.includes("immediate") && (d ? a() : o()), c(d), (l = d), (u = !1));
                  })
            );
      });
      p("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
            let i = Bi(t),
                  o = x(e, i.items),
                  s = x(e, e._x_keyExpression || "index");
            (e._x_prevKeys = []),
                  (e._x_lookup = {}),
                  r(() => ji(e, i, o, s)),
                  n(() => {
                        Object.values(e._x_lookup).forEach((a) => a.remove()), delete e._x_prevKeys, delete e._x_lookup;
                  });
      });
      function ji(e, t, r, n) {
            let i = (s) => typeof s == "object" && !Array.isArray(s),
                  o = e;
            r((s) => {
                  Ki(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)), s === void 0 && (s = []);
                  let a = e._x_lookup,
                        c = e._x_prevKeys,
                        l = [],
                        u = [];
                  if (i(s))
                        s = Object.entries(s).map(([f, _]) => {
                              let b = xn(t, _, f, s);
                              n((w) => u.push(w), { scope: { index: f, ...b } }), l.push(b);
                        });
                  else
                        for (let f = 0; f < s.length; f++) {
                              let _ = xn(t, s[f], f, s);
                              n((b) => u.push(b), { scope: { index: f, ..._ } }), l.push(_);
                        }
                  let d = [],
                        m = [],
                        v = [],
                        k = [];
                  for (let f = 0; f < c.length; f++) {
                        let _ = c[f];
                        u.indexOf(_) === -1 && v.push(_);
                  }
                  c = c.filter((f) => !v.includes(f));
                  let xe = "template";
                  for (let f = 0; f < u.length; f++) {
                        let _ = u[f],
                              b = c.indexOf(_);
                        if (b === -1) c.splice(f, 0, _), d.push([xe, f]);
                        else if (b !== f) {
                              let w = c.splice(f, 1)[0],
                                    A = c.splice(b - 1, 1)[0];
                              c.splice(f, 0, A), c.splice(b, 0, w), m.push([w, A]);
                        } else k.push(_);
                        xe = _;
                  }
                  for (let f = 0; f < v.length; f++) {
                        let _ = v[f];
                        a[_]._x_effects && a[_]._x_effects.forEach(ye), a[_].remove(), (a[_] = null), delete a[_];
                  }
                  for (let f = 0; f < m.length; f++) {
                        let [_, b] = m[f],
                              w = a[_],
                              A = a[b],
                              Y = document.createElement("div");
                        h(() => {
                              A || S('x-for ":key" is undefined or invalid', o),
                                    A.after(Y),
                                    w.after(A),
                                    A._x_currentIfEl && A.after(A._x_currentIfEl),
                                    Y.before(w),
                                    w._x_currentIfEl && w.after(w._x_currentIfEl),
                                    Y.remove();
                        }),
                              A._x_refreshXForScope(l[u.indexOf(b)]);
                  }
                  for (let f = 0; f < d.length; f++) {
                        let [_, b] = d[f],
                              w = _ === "template" ? o : a[_];
                        w._x_currentIfEl && (w = w._x_currentIfEl);
                        let A = l[b],
                              Y = u[b],
                              oe = document.importNode(o.content, !0).firstElementChild,
                              Bt = C(A);
                        N(oe, Bt, o),
                              (oe._x_refreshXForScope = (bn) => {
                                    Object.entries(bn).forEach(([vn, wn]) => {
                                          Bt[vn] = wn;
                                    });
                              }),
                              h(() => {
                                    w.after(oe), E(oe);
                              }),
                              typeof Y == "object" &&
                                    S("x-for key cannot be an object, it must be a string or an integer", o),
                              (a[Y] = oe);
                  }
                  for (let f = 0; f < k.length; f++) a[k[f]]._x_refreshXForScope(l[u.indexOf(k[f])]);
                  o._x_prevKeys = u;
            });
      }
      function Bi(e) {
            let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
                  r = /^\s*\(|\)\s*$/g,
                  n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
                  i = e.match(n);
            if (!i) return;
            let o = {};
            o.items = i[2].trim();
            let s = i[1].replace(r, "").trim(),
                  a = s.match(t);
            return (
                  a
                        ? ((o.item = s.replace(t, "").trim()),
                          (o.index = a[1].trim()),
                          a[2] && (o.collection = a[2].trim()))
                        : (o.item = s),
                  o
            );
      }
      function xn(e, t, r, n) {
            let i = {};
            return (
                  /^\[.*\]$/.test(e.item) && Array.isArray(t)
                        ? e.item
                                .replace("[", "")
                                .replace("]", "")
                                .split(",")
                                .map((s) => s.trim())
                                .forEach((s, a) => {
                                      i[s] = t[a];
                                })
                        : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
                        ? e.item
                                .replace("{", "")
                                .replace("}", "")
                                .split(",")
                                .map((s) => s.trim())
                                .forEach((s) => {
                                      i[s] = t[s];
                                })
                        : (i[e.item] = t),
                  e.index && (i[e.index] = r),
                  e.collection && (i[e.collection] = n),
                  i
            );
      }
      function Ki(e) {
            return !Array.isArray(e) && !isNaN(e);
      }
      function yn() {}
      yn.inline = (e, { expression: t }, { cleanup: r }) => {
            let n = U(e);
            n._x_refs || (n._x_refs = {}), (n._x_refs[t] = e), r(() => delete n._x_refs[t]);
      };
      p("ref", yn);
      p("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
            let i = x(e, t),
                  o = () => {
                        if (e._x_currentIfEl) return e._x_currentIfEl;
                        let a = e.content.cloneNode(!0).firstElementChild;
                        return (
                              N(a, {}, e),
                              h(() => {
                                    e.after(a), E(a);
                              }),
                              (e._x_currentIfEl = a),
                              (e._x_undoIf = () => {
                                    T(a, (c) => {
                                          c._x_effects && c._x_effects.forEach(ye);
                                    }),
                                          a.remove(),
                                          delete e._x_currentIfEl;
                              }),
                              a
                        );
                  },
                  s = () => {
                        !e._x_undoIf || (e._x_undoIf(), delete e._x_undoIf);
                  };
            r(() =>
                  i((a) => {
                        a ? o() : s();
                  })
            ),
                  n(() => e._x_undoIf && e._x_undoIf());
      });
      p("id", (e, { expression: t }, { evaluate: r }) => {
            r(t).forEach((i) => fn(e, i));
      });
      Z(Ce("@", Re(O("on:"))));
      p(
            "on",
            P((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
                  let o = n ? x(e, n) : () => {};
                  e.tagName.toLowerCase() === "template" &&
                        (e._x_forwardEvents || (e._x_forwardEvents = []),
                        e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
                  let s = ie(e, t, r, (a) => {
                        o(() => {}, { scope: { $event: a }, params: [a] });
                  });
                  i(() => s());
            })
      );
      Ye("Collapse", "collapse", "collapse");
      Ye("Intersect", "intersect", "intersect");
      Ye("Focus", "trap", "focus");
      Ye("Mask", "mask", "mask");
      function Ye(e, t, r) {
            p(t, (n) =>
                  S(
                        `You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${r}`,
                        n
                  )
            );
      }
      j.setEvaluator(dt);
      j.setReactivityEngine({ reactive: Ke, effect: zr, release: Hr, raw: g });
      var jt = j;
      window.Alpine = jt;
      queueMicrotask(() => {
            jt.start();
      });
})();
