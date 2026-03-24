var bu = Object.defineProperty;
var ss = (e) => {
  throw TypeError(e);
};
var Su = (e, t, r) => t in e ? bu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var kt = (e, t, r) => Su(e, typeof t != "symbol" ? t + "" : t, r), $n = (e, t, r) => t.has(e) || ss("Cannot " + r);
var Q = (e, t, r) => ($n(e, t, "read from private field"), r ? r.call(e) : t.get(e)), De = (e, t, r) => t.has(e) ? ss("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), Ie = (e, t, r, n) => ($n(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r), Ge = (e, t, r) => ($n(e, t, "access private method"), r);
import ic, { ipcMain as wn, app as qt, BrowserWindow as ac } from "electron";
import se from "node:path";
import { fileURLToPath as Ru } from "node:url";
import ue from "node:process";
import { promisify as ve, isDeepStrictEqual as is } from "node:util";
import ee from "node:fs";
import jt from "node:crypto";
import as from "node:assert";
import cc from "node:os";
import "node:events";
import "node:stream";
const En = {
  metaGet: "app:meta:get",
  settingsGet: "app:settings:get",
  settingsUpdate: "app:settings:update"
};
function q(e, t, r) {
  function n(a, u) {
    if (a._zod || Object.defineProperty(a, "_zod", {
      value: {
        def: u,
        constr: i,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), a._zod.traits.has(e))
      return;
    a._zod.traits.add(e), t(a, u);
    const f = i.prototype, c = Object.keys(f);
    for (let p = 0; p < c.length; p++) {
      const l = c[p];
      l in a || (a[l] = f[l].bind(a));
    }
  }
  const o = (r == null ? void 0 : r.Parent) ?? Object;
  class s extends o {
  }
  Object.defineProperty(s, "name", { value: e });
  function i(a) {
    var u;
    const f = r != null && r.Parent ? new s() : this;
    n(f, a), (u = f._zod).deferred ?? (u.deferred = []);
    for (const c of f._zod.deferred)
      c();
    return f;
  }
  return Object.defineProperty(i, "init", { value: n }), Object.defineProperty(i, Symbol.hasInstance, {
    value: (a) => {
      var u, f;
      return r != null && r.Parent && a instanceof r.Parent ? !0 : (f = (u = a == null ? void 0 : a._zod) == null ? void 0 : u.traits) == null ? void 0 : f.has(e);
    }
  }), Object.defineProperty(i, "name", { value: e }), i;
}
class Pt extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class uc extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const fc = {};
function dt(e) {
  return fc;
}
function lc(e) {
  const t = Object.values(e).filter((n) => typeof n == "number");
  return Object.entries(e).filter(([n, o]) => t.indexOf(+n) === -1).map(([n, o]) => o);
}
function Ao(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Lo(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Mo(e) {
  return e == null;
}
function Fo(e) {
  const t = e.startsWith("^") ? 1 : 0, r = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, r);
}
const cs = Symbol("evaluating");
function ce(e, t, r) {
  let n;
  Object.defineProperty(e, t, {
    get() {
      if (n !== cs)
        return n === void 0 && (n = cs, n = r()), n;
    },
    set(o) {
      Object.defineProperty(e, t, {
        value: o
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function mt(e, t, r) {
  Object.defineProperty(e, t, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function ot(...e) {
  const t = {};
  for (const r of e) {
    const n = Object.getOwnPropertyDescriptors(r);
    Object.assign(t, n);
  }
  return Object.defineProperties({}, t);
}
function us(e) {
  return JSON.stringify(e);
}
function Pu(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const dc = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Br(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Ou = Lo(() => {
  var e;
  if (typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) != null && e.includes("Cloudflare")))
    return !1;
  try {
    const t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function Lt(e) {
  if (Br(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const r = t.prototype;
  return !(Br(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function hc(e) {
  return Lt(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const Iu = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function rn(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function st(e, t, r) {
  const n = new e._zod.constr(t ?? e._zod.def);
  return (!t || r != null && r.parent) && (n._zod.parent = e), n;
}
function X(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if ((t == null ? void 0 : t.message) !== void 0) {
    if ((t == null ? void 0 : t.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function Nu(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
function Tu(e, t) {
  const r = e._zod.def, n = r.checks;
  if (n && n.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const s = ot(e._zod.def, {
    get shape() {
      const i = {};
      for (const a in t) {
        if (!(a in r.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && (i[a] = r.shape[a]);
      }
      return mt(this, "shape", i), i;
    },
    checks: []
  });
  return st(e, s);
}
function ku(e, t) {
  const r = e._zod.def, n = r.checks;
  if (n && n.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const s = ot(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape };
      for (const a in t) {
        if (!(a in r.shape))
          throw new Error(`Unrecognized key: "${a}"`);
        t[a] && delete i[a];
      }
      return mt(this, "shape", i), i;
    },
    checks: []
  });
  return st(e, s);
}
function ju(e, t) {
  if (!Lt(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const r = e._zod.def.checks;
  if (r && r.length > 0) {
    const s = e._zod.def.shape;
    for (const i in t)
      if (Object.getOwnPropertyDescriptor(s, i) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const o = ot(e._zod.def, {
    get shape() {
      const s = { ...e._zod.def.shape, ...t };
      return mt(this, "shape", s), s;
    }
  });
  return st(e, o);
}
function Au(e, t) {
  if (!Lt(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const r = ot(e._zod.def, {
    get shape() {
      const n = { ...e._zod.def.shape, ...t };
      return mt(this, "shape", n), n;
    }
  });
  return st(e, r);
}
function zu(e, t) {
  const r = ot(e._zod.def, {
    get shape() {
      const n = { ...e._zod.def.shape, ...t._zod.def.shape };
      return mt(this, "shape", n), n;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return st(e, r);
}
function Cu(e, t, r) {
  const o = t._zod.def.checks;
  if (o && o.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const i = ot(t._zod.def, {
    get shape() {
      const a = t._zod.def.shape, u = { ...a };
      if (r)
        for (const f in r) {
          if (!(f in a))
            throw new Error(`Unrecognized key: "${f}"`);
          r[f] && (u[f] = e ? new e({
            type: "optional",
            innerType: a[f]
          }) : a[f]);
        }
      else
        for (const f in a)
          u[f] = e ? new e({
            type: "optional",
            innerType: a[f]
          }) : a[f];
      return mt(this, "shape", u), u;
    },
    checks: []
  });
  return st(t, i);
}
function Du(e, t, r) {
  const n = ot(t._zod.def, {
    get shape() {
      const o = t._zod.def.shape, s = { ...o };
      if (r)
        for (const i in r) {
          if (!(i in s))
            throw new Error(`Unrecognized key: "${i}"`);
          r[i] && (s[i] = new e({
            type: "nonoptional",
            innerType: o[i]
          }));
        }
      else
        for (const i in o)
          s[i] = new e({
            type: "nonoptional",
            innerType: o[i]
          });
      return mt(this, "shape", s), s;
    }
  });
  return st(t, n);
}
function bt(e, t = 0) {
  var r;
  if (e.aborted === !0)
    return !0;
  for (let n = t; n < e.issues.length; n++)
    if (((r = e.issues[n]) == null ? void 0 : r.continue) !== !0)
      return !0;
  return !1;
}
function pc(e, t) {
  return t.map((r) => {
    var n;
    return (n = r).path ?? (n.path = []), r.path.unshift(e), r;
  });
}
function Zt(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function ht(e, t, r) {
  var o, s, i, a, u, f;
  const n = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const c = Zt((i = (s = (o = e.inst) == null ? void 0 : o._zod.def) == null ? void 0 : s.error) == null ? void 0 : i.call(s, e)) ?? Zt((a = t == null ? void 0 : t.error) == null ? void 0 : a.call(t, e)) ?? Zt((u = r.customError) == null ? void 0 : u.call(r, e)) ?? Zt((f = r.localeError) == null ? void 0 : f.call(r, e)) ?? "Invalid input";
    n.message = c;
  }
  return delete n.inst, delete n.continue, t != null && t.reportInput || delete n.input, n;
}
function Vo(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Mt(...e) {
  const [t, r, n] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: r,
    inst: n
  } : { ...t };
}
const mc = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, Ao, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, yc = q("$ZodError", mc), gc = q("$ZodError", mc, { Parent: Error });
function qu(e, t = (r) => r.message) {
  const r = {}, n = [];
  for (const o of e.issues)
    o.path.length > 0 ? (r[o.path[0]] = r[o.path[0]] || [], r[o.path[0]].push(t(o))) : n.push(t(o));
  return { formErrors: n, fieldErrors: r };
}
function Lu(e, t = (r) => r.message) {
  const r = { _errors: [] }, n = (o) => {
    for (const s of o.issues)
      if (s.code === "invalid_union" && s.errors.length)
        s.errors.map((i) => n({ issues: i }));
      else if (s.code === "invalid_key")
        n({ issues: s.issues });
      else if (s.code === "invalid_element")
        n({ issues: s.issues });
      else if (s.path.length === 0)
        r._errors.push(t(s));
      else {
        let i = r, a = 0;
        for (; a < s.path.length; ) {
          const u = s.path[a];
          a === s.path.length - 1 ? (i[u] = i[u] || { _errors: [] }, i[u]._errors.push(t(s))) : i[u] = i[u] || { _errors: [] }, i = i[u], a++;
        }
      }
  };
  return n(e), r;
}
const Uo = (e) => (t, r, n, o) => {
  const s = n ? Object.assign(n, { async: !1 }) : { async: !1 }, i = t._zod.run({ value: r, issues: [] }, s);
  if (i instanceof Promise)
    throw new Pt();
  if (i.issues.length) {
    const a = new ((o == null ? void 0 : o.Err) ?? e)(i.issues.map((u) => ht(u, s, dt())));
    throw dc(a, o == null ? void 0 : o.callee), a;
  }
  return i.value;
}, Zo = (e) => async (t, r, n, o) => {
  const s = n ? Object.assign(n, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: r, issues: [] }, s);
  if (i instanceof Promise && (i = await i), i.issues.length) {
    const a = new ((o == null ? void 0 : o.Err) ?? e)(i.issues.map((u) => ht(u, s, dt())));
    throw dc(a, o == null ? void 0 : o.callee), a;
  }
  return i.value;
}, nn = (e) => (t, r, n) => {
  const o = n ? { ...n, async: !1 } : { async: !1 }, s = t._zod.run({ value: r, issues: [] }, o);
  if (s instanceof Promise)
    throw new Pt();
  return s.issues.length ? {
    success: !1,
    error: new (e ?? yc)(s.issues.map((i) => ht(i, o, dt())))
  } : { success: !0, data: s.value };
}, Mu = /* @__PURE__ */ nn(gc), on = (e) => async (t, r, n) => {
  const o = n ? Object.assign(n, { async: !0 }) : { async: !0 };
  let s = t._zod.run({ value: r, issues: [] }, o);
  return s instanceof Promise && (s = await s), s.issues.length ? {
    success: !1,
    error: new e(s.issues.map((i) => ht(i, o, dt())))
  } : { success: !0, data: s.value };
}, Fu = /* @__PURE__ */ on(gc), Vu = (e) => (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return Uo(e)(t, r, o);
}, Uu = (e) => (t, r, n) => Uo(e)(t, r, n), Zu = (e) => async (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return Zo(e)(t, r, o);
}, Gu = (e) => async (t, r, n) => Zo(e)(t, r, n), Ku = (e) => (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return nn(e)(t, r, o);
}, Ju = (e) => (t, r, n) => nn(e)(t, r, n), Hu = (e) => async (t, r, n) => {
  const o = n ? Object.assign(n, { direction: "backward" }) : { direction: "backward" };
  return on(e)(t, r, o);
}, xu = (e) => async (t, r, n) => on(e)(t, r, n), Wu = /^[cC][^\s-]{8,}$/, Bu = /^[0-9a-z]+$/, Xu = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/, Yu = /^[0-9a-vA-V]{20}$/, Qu = /^[A-Za-z0-9]{27}$/, ef = /^[a-zA-Z0-9_-]{21}$/, tf = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, rf = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, fs = (e) => e ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, nf = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, of = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
function sf() {
  return new RegExp(of, "u");
}
const af = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, cf = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, uf = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, ff = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, lf = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, _c = /^[A-Za-z0-9_-]*$/, df = /^\+[1-9]\d{6,14}$/, vc = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", hf = /* @__PURE__ */ new RegExp(`^${vc}$`);
function $c(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function pf(e) {
  return new RegExp(`^${$c(e)}$`);
}
function mf(e) {
  const t = $c({ precision: e.precision }), r = ["Z"];
  e.local && r.push(""), e.offset && r.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const n = `${t}(?:${r.join("|")})`;
  return new RegExp(`^${vc}T(?:${n})$`);
}
const yf = (e) => {
  const t = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, gf = /^(?:true|false)$/i, _f = /^[^A-Z]*$/, vf = /^[^a-z]*$/, Ze = /* @__PURE__ */ q("$ZodCheck", (e, t) => {
  var r;
  e._zod ?? (e._zod = {}), e._zod.def = t, (r = e._zod).onattach ?? (r.onattach = []);
}), $f = /* @__PURE__ */ q("$ZodCheckMaxLength", (e, t) => {
  var r;
  Ze.init(e, t), (r = e._zod.def).when ?? (r.when = (n) => {
    const o = n.value;
    return !Mo(o) && o.length !== void 0;
  }), e._zod.onattach.push((n) => {
    const o = n._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < o && (n._zod.bag.maximum = t.maximum);
  }), e._zod.check = (n) => {
    const o = n.value;
    if (o.length <= t.maximum)
      return;
    const i = Vo(o);
    n.issues.push({
      origin: i,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), wf = /* @__PURE__ */ q("$ZodCheckMinLength", (e, t) => {
  var r;
  Ze.init(e, t), (r = e._zod.def).when ?? (r.when = (n) => {
    const o = n.value;
    return !Mo(o) && o.length !== void 0;
  }), e._zod.onattach.push((n) => {
    const o = n._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > o && (n._zod.bag.minimum = t.minimum);
  }), e._zod.check = (n) => {
    const o = n.value;
    if (o.length >= t.minimum)
      return;
    const i = Vo(o);
    n.issues.push({
      origin: i,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: o,
      inst: e,
      continue: !t.abort
    });
  };
}), Ef = /* @__PURE__ */ q("$ZodCheckLengthEquals", (e, t) => {
  var r;
  Ze.init(e, t), (r = e._zod.def).when ?? (r.when = (n) => {
    const o = n.value;
    return !Mo(o) && o.length !== void 0;
  }), e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.minimum = t.length, o.maximum = t.length, o.length = t.length;
  }), e._zod.check = (n) => {
    const o = n.value, s = o.length;
    if (s === t.length)
      return;
    const i = Vo(o), a = s > t.length;
    n.issues.push({
      origin: i,
      ...a ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), sn = /* @__PURE__ */ q("$ZodCheckStringFormat", (e, t) => {
  var r, n;
  Ze.init(e, t), e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.format = t.format, t.pattern && (s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(t.pattern));
  }), t.pattern ? (r = e._zod).check ?? (r.check = (o) => {
    t.pattern.lastIndex = 0, !t.pattern.test(o.value) && o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: o.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (n = e._zod).check ?? (n.check = () => {
  });
}), bf = /* @__PURE__ */ q("$ZodCheckRegex", (e, t) => {
  sn.init(e, t), e._zod.check = (r) => {
    t.pattern.lastIndex = 0, !t.pattern.test(r.value) && r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: r.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), Sf = /* @__PURE__ */ q("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = _f), sn.init(e, t);
}), Rf = /* @__PURE__ */ q("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = vf), sn.init(e, t);
}), Pf = /* @__PURE__ */ q("$ZodCheckIncludes", (e, t) => {
  Ze.init(e, t);
  const r = rn(t.includes), n = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${r}` : r);
  t.pattern = n, e._zod.onattach.push((o) => {
    const s = o._zod.bag;
    s.patterns ?? (s.patterns = /* @__PURE__ */ new Set()), s.patterns.add(n);
  }), e._zod.check = (o) => {
    o.value.includes(t.includes, t.position) || o.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: o.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Of = /* @__PURE__ */ q("$ZodCheckStartsWith", (e, t) => {
  Ze.init(e, t);
  const r = new RegExp(`^${rn(t.prefix)}.*`);
  t.pattern ?? (t.pattern = r), e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(r);
  }), e._zod.check = (n) => {
    n.value.startsWith(t.prefix) || n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), If = /* @__PURE__ */ q("$ZodCheckEndsWith", (e, t) => {
  Ze.init(e, t);
  const r = new RegExp(`.*${rn(t.suffix)}$`);
  t.pattern ?? (t.pattern = r), e._zod.onattach.push((n) => {
    const o = n._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(r);
  }), e._zod.check = (n) => {
    n.value.endsWith(t.suffix) || n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Nf = /* @__PURE__ */ q("$ZodCheckOverwrite", (e, t) => {
  Ze.init(e, t), e._zod.check = (r) => {
    r.value = t.tx(r.value);
  };
});
class Tf {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const n = t.split(`
`).filter((i) => i), o = Math.min(...n.map((i) => i.length - i.trimStart().length)), s = n.map((i) => i.slice(o)).map((i) => " ".repeat(this.indent * 2) + i);
    for (const i of s)
      this.content.push(i);
  }
  compile() {
    const t = Function, r = this == null ? void 0 : this.args, o = [...((this == null ? void 0 : this.content) ?? [""]).map((s) => `  ${s}`)];
    return new t(...r, o.join(`
`));
  }
}
const kf = {
  major: 4,
  minor: 3,
  patch: 6
}, de = /* @__PURE__ */ q("$ZodType", (e, t) => {
  var o;
  var r;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = kf;
  const n = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && n.unshift(e);
  for (const s of n)
    for (const i of s._zod.onattach)
      i(e);
  if (n.length === 0)
    (r = e._zod).deferred ?? (r.deferred = []), (o = e._zod.deferred) == null || o.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const s = (a, u, f) => {
      let c = bt(a), p;
      for (const l of u) {
        if (l._zod.def.when) {
          if (!l._zod.def.when(a))
            continue;
        } else if (c)
          continue;
        const h = a.issues.length, $ = l._zod.check(a);
        if ($ instanceof Promise && (f == null ? void 0 : f.async) === !1)
          throw new Pt();
        if (p || $ instanceof Promise)
          p = (p ?? Promise.resolve()).then(async () => {
            await $, a.issues.length !== h && (c || (c = bt(a, h)));
          });
        else {
          if (a.issues.length === h)
            continue;
          c || (c = bt(a, h));
        }
      }
      return p ? p.then(() => a) : a;
    }, i = (a, u, f) => {
      if (bt(a))
        return a.aborted = !0, a;
      const c = s(u, n, f);
      if (c instanceof Promise) {
        if (f.async === !1)
          throw new Pt();
        return c.then((p) => e._zod.parse(p, f));
      }
      return e._zod.parse(c, f);
    };
    e._zod.run = (a, u) => {
      if (u.skipChecks)
        return e._zod.parse(a, u);
      if (u.direction === "backward") {
        const c = e._zod.parse({ value: a.value, issues: [] }, { ...u, skipChecks: !0 });
        return c instanceof Promise ? c.then((p) => i(p, a, u)) : i(c, a, u);
      }
      const f = e._zod.parse(a, u);
      if (f instanceof Promise) {
        if (u.async === !1)
          throw new Pt();
        return f.then((c) => s(c, n, u));
      }
      return s(f, n, u);
    };
  }
  ce(e, "~standard", () => ({
    validate: (s) => {
      var i;
      try {
        const a = Mu(e, s);
        return a.success ? { value: a.data } : { issues: (i = a.error) == null ? void 0 : i.issues };
      } catch {
        return Fu(e, s).then((u) => {
          var f;
          return u.success ? { value: u.data } : { issues: (f = u.error) == null ? void 0 : f.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Go = /* @__PURE__ */ q("$ZodString", (e, t) => {
  var r;
  de.init(e, t), e._zod.pattern = [...((r = e == null ? void 0 : e._zod.bag) == null ? void 0 : r.patterns) ?? []].pop() ?? yf(e._zod.bag), e._zod.parse = (n, o) => {
    if (t.coerce)
      try {
        n.value = String(n.value);
      } catch {
      }
    return typeof n.value == "string" || n.issues.push({
      expected: "string",
      code: "invalid_type",
      input: n.value,
      inst: e
    }), n;
  };
}), fe = /* @__PURE__ */ q("$ZodStringFormat", (e, t) => {
  sn.init(e, t), Go.init(e, t);
}), jf = /* @__PURE__ */ q("$ZodGUID", (e, t) => {
  t.pattern ?? (t.pattern = rf), fe.init(e, t);
}), Af = /* @__PURE__ */ q("$ZodUUID", (e, t) => {
  if (t.version) {
    const n = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[t.version];
    if (n === void 0)
      throw new Error(`Invalid UUID version: "${t.version}"`);
    t.pattern ?? (t.pattern = fs(n));
  } else
    t.pattern ?? (t.pattern = fs());
  fe.init(e, t);
}), zf = /* @__PURE__ */ q("$ZodEmail", (e, t) => {
  t.pattern ?? (t.pattern = nf), fe.init(e, t);
}), Cf = /* @__PURE__ */ q("$ZodURL", (e, t) => {
  fe.init(e, t), e._zod.check = (r) => {
    try {
      const n = r.value.trim(), o = new URL(n);
      t.hostname && (t.hostname.lastIndex = 0, t.hostname.test(o.hostname) || r.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: t.hostname.source,
        input: r.value,
        inst: e,
        continue: !t.abort
      })), t.protocol && (t.protocol.lastIndex = 0, t.protocol.test(o.protocol.endsWith(":") ? o.protocol.slice(0, -1) : o.protocol) || r.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: t.protocol.source,
        input: r.value,
        inst: e,
        continue: !t.abort
      })), t.normalize ? r.value = o.href : r.value = n;
      return;
    } catch {
      r.issues.push({
        code: "invalid_format",
        format: "url",
        input: r.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), Df = /* @__PURE__ */ q("$ZodEmoji", (e, t) => {
  t.pattern ?? (t.pattern = sf()), fe.init(e, t);
}), qf = /* @__PURE__ */ q("$ZodNanoID", (e, t) => {
  t.pattern ?? (t.pattern = ef), fe.init(e, t);
}), Lf = /* @__PURE__ */ q("$ZodCUID", (e, t) => {
  t.pattern ?? (t.pattern = Wu), fe.init(e, t);
}), Mf = /* @__PURE__ */ q("$ZodCUID2", (e, t) => {
  t.pattern ?? (t.pattern = Bu), fe.init(e, t);
}), Ff = /* @__PURE__ */ q("$ZodULID", (e, t) => {
  t.pattern ?? (t.pattern = Xu), fe.init(e, t);
}), Vf = /* @__PURE__ */ q("$ZodXID", (e, t) => {
  t.pattern ?? (t.pattern = Yu), fe.init(e, t);
}), Uf = /* @__PURE__ */ q("$ZodKSUID", (e, t) => {
  t.pattern ?? (t.pattern = Qu), fe.init(e, t);
}), Zf = /* @__PURE__ */ q("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = mf(t)), fe.init(e, t);
}), Gf = /* @__PURE__ */ q("$ZodISODate", (e, t) => {
  t.pattern ?? (t.pattern = hf), fe.init(e, t);
}), Kf = /* @__PURE__ */ q("$ZodISOTime", (e, t) => {
  t.pattern ?? (t.pattern = pf(t)), fe.init(e, t);
}), Jf = /* @__PURE__ */ q("$ZodISODuration", (e, t) => {
  t.pattern ?? (t.pattern = tf), fe.init(e, t);
}), Hf = /* @__PURE__ */ q("$ZodIPv4", (e, t) => {
  t.pattern ?? (t.pattern = af), fe.init(e, t), e._zod.bag.format = "ipv4";
}), xf = /* @__PURE__ */ q("$ZodIPv6", (e, t) => {
  t.pattern ?? (t.pattern = cf), fe.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (r) => {
    try {
      new URL(`http://[${r.value}]`);
    } catch {
      r.issues.push({
        code: "invalid_format",
        format: "ipv6",
        input: r.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
}), Wf = /* @__PURE__ */ q("$ZodCIDRv4", (e, t) => {
  t.pattern ?? (t.pattern = uf), fe.init(e, t);
}), Bf = /* @__PURE__ */ q("$ZodCIDRv6", (e, t) => {
  t.pattern ?? (t.pattern = ff), fe.init(e, t), e._zod.check = (r) => {
    const n = r.value.split("/");
    try {
      if (n.length !== 2)
        throw new Error();
      const [o, s] = n;
      if (!s)
        throw new Error();
      const i = Number(s);
      if (`${i}` !== s)
        throw new Error();
      if (i < 0 || i > 128)
        throw new Error();
      new URL(`http://[${o}]`);
    } catch {
      r.issues.push({
        code: "invalid_format",
        format: "cidrv6",
        input: r.value,
        inst: e,
        continue: !t.abort
      });
    }
  };
});
function wc(e) {
  if (e === "")
    return !0;
  if (e.length % 4 !== 0)
    return !1;
  try {
    return atob(e), !0;
  } catch {
    return !1;
  }
}
const Xf = /* @__PURE__ */ q("$ZodBase64", (e, t) => {
  t.pattern ?? (t.pattern = lf), fe.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (r) => {
    wc(r.value) || r.issues.push({
      code: "invalid_format",
      format: "base64",
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
});
function Yf(e) {
  if (!_c.test(e))
    return !1;
  const t = e.replace(/[-_]/g, (n) => n === "-" ? "+" : "/"), r = t.padEnd(Math.ceil(t.length / 4) * 4, "=");
  return wc(r);
}
const Qf = /* @__PURE__ */ q("$ZodBase64URL", (e, t) => {
  t.pattern ?? (t.pattern = _c), fe.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (r) => {
    Yf(r.value) || r.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), el = /* @__PURE__ */ q("$ZodE164", (e, t) => {
  t.pattern ?? (t.pattern = df), fe.init(e, t);
});
function tl(e, t = null) {
  try {
    const r = e.split(".");
    if (r.length !== 3)
      return !1;
    const [n] = r;
    if (!n)
      return !1;
    const o = JSON.parse(atob(n));
    return !("typ" in o && (o == null ? void 0 : o.typ) !== "JWT" || !o.alg || t && (!("alg" in o) || o.alg !== t));
  } catch {
    return !1;
  }
}
const rl = /* @__PURE__ */ q("$ZodJWT", (e, t) => {
  fe.init(e, t), e._zod.check = (r) => {
    tl(r.value, t.alg) || r.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), nl = /* @__PURE__ */ q("$ZodBoolean", (e, t) => {
  de.init(e, t), e._zod.pattern = gf, e._zod.parse = (r, n) => {
    if (t.coerce)
      try {
        r.value = !!r.value;
      } catch {
      }
    const o = r.value;
    return typeof o == "boolean" || r.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input: o,
      inst: e
    }), r;
  };
}), ol = /* @__PURE__ */ q("$ZodUnknown", (e, t) => {
  de.init(e, t), e._zod.parse = (r) => r;
}), sl = /* @__PURE__ */ q("$ZodNever", (e, t) => {
  de.init(e, t), e._zod.parse = (r, n) => (r.issues.push({
    expected: "never",
    code: "invalid_type",
    input: r.value,
    inst: e
  }), r);
});
function ls(e, t, r) {
  e.issues.length && t.issues.push(...pc(r, e.issues)), t.value[r] = e.value;
}
const il = /* @__PURE__ */ q("$ZodArray", (e, t) => {
  de.init(e, t), e._zod.parse = (r, n) => {
    const o = r.value;
    if (!Array.isArray(o))
      return r.issues.push({
        expected: "array",
        code: "invalid_type",
        input: o,
        inst: e
      }), r;
    r.value = Array(o.length);
    const s = [];
    for (let i = 0; i < o.length; i++) {
      const a = o[i], u = t.element._zod.run({
        value: a,
        issues: []
      }, n);
      u instanceof Promise ? s.push(u.then((f) => ls(f, r, i))) : ls(u, r, i);
    }
    return s.length ? Promise.all(s).then(() => r) : r;
  };
});
function Xr(e, t, r, n, o) {
  if (e.issues.length) {
    if (o && !(r in n))
      return;
    t.issues.push(...pc(r, e.issues));
  }
  e.value === void 0 ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
function Ec(e) {
  var n, o, s, i;
  const t = Object.keys(e.shape);
  for (const a of t)
    if (!((i = (s = (o = (n = e.shape) == null ? void 0 : n[a]) == null ? void 0 : o._zod) == null ? void 0 : s.traits) != null && i.has("$ZodType")))
      throw new Error(`Invalid element at key "${a}": expected a Zod schema`);
  const r = Nu(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(r)
  };
}
function bc(e, t, r, n, o, s) {
  const i = [], a = o.keySet, u = o.catchall._zod, f = u.def.type, c = u.optout === "optional";
  for (const p in t) {
    if (a.has(p))
      continue;
    if (f === "never") {
      i.push(p);
      continue;
    }
    const l = u.run({ value: t[p], issues: [] }, n);
    l instanceof Promise ? e.push(l.then((h) => Xr(h, r, p, t, c))) : Xr(l, r, p, t, c);
  }
  return i.length && r.issues.push({
    code: "unrecognized_keys",
    keys: i,
    input: t,
    inst: s
  }), e.length ? Promise.all(e).then(() => r) : r;
}
const al = /* @__PURE__ */ q("$ZodObject", (e, t) => {
  de.init(e, t);
  const r = Object.getOwnPropertyDescriptor(t, "shape");
  if (!(r != null && r.get)) {
    const a = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const u = { ...a };
        return Object.defineProperty(t, "shape", {
          value: u
        }), u;
      }
    });
  }
  const n = Lo(() => Ec(t));
  ce(e._zod, "propValues", () => {
    const a = t.shape, u = {};
    for (const f in a) {
      const c = a[f]._zod;
      if (c.values) {
        u[f] ?? (u[f] = /* @__PURE__ */ new Set());
        for (const p of c.values)
          u[f].add(p);
      }
    }
    return u;
  });
  const o = Br, s = t.catchall;
  let i;
  e._zod.parse = (a, u) => {
    i ?? (i = n.value);
    const f = a.value;
    if (!o(f))
      return a.issues.push({
        expected: "object",
        code: "invalid_type",
        input: f,
        inst: e
      }), a;
    a.value = {};
    const c = [], p = i.shape;
    for (const l of i.keys) {
      const h = p[l], $ = h._zod.optout === "optional", v = h._zod.run({ value: f[l], issues: [] }, u);
      v instanceof Promise ? c.push(v.then((m) => Xr(m, a, l, f, $))) : Xr(v, a, l, f, $);
    }
    return s ? bc(c, f, a, u, n.value, e) : c.length ? Promise.all(c).then(() => a) : a;
  };
}), cl = /* @__PURE__ */ q("$ZodObjectJIT", (e, t) => {
  al.init(e, t);
  const r = e._zod.parse, n = Lo(() => Ec(t)), o = (l) => {
    var g;
    const h = new Tf(["shape", "payload", "ctx"]), $ = n.value, v = (b) => {
      const y = us(b);
      return `shape[${y}]._zod.run({ value: input[${y}], issues: [] }, ctx)`;
    };
    h.write("const input = payload.value;");
    const m = /* @__PURE__ */ Object.create(null);
    let _ = 0;
    for (const b of $.keys)
      m[b] = `key_${_++}`;
    h.write("const newResult = {};");
    for (const b of $.keys) {
      const y = m[b], w = us(b), S = l[b], O = ((g = S == null ? void 0 : S._zod) == null ? void 0 : g.optout) === "optional";
      h.write(`const ${y} = ${v(b)};`), O ? h.write(`
        if (${y}.issues.length) {
          if (${w} in input) {
            payload.issues = payload.issues.concat(${y}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${w}, ...iss.path] : [${w}]
            })));
          }
        }
        
        if (${y}.value === undefined) {
          if (${w} in input) {
            newResult[${w}] = undefined;
          }
        } else {
          newResult[${w}] = ${y}.value;
        }
        
      `) : h.write(`
        if (${y}.issues.length) {
          payload.issues = payload.issues.concat(${y}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${w}, ...iss.path] : [${w}]
          })));
        }
        
        if (${y}.value === undefined) {
          if (${w} in input) {
            newResult[${w}] = undefined;
          }
        } else {
          newResult[${w}] = ${y}.value;
        }
        
      `);
    }
    h.write("payload.value = newResult;"), h.write("return payload;");
    const d = h.compile();
    return (b, y) => d(l, b, y);
  };
  let s;
  const i = Br, a = !fc.jitless, f = a && Ou.value, c = t.catchall;
  let p;
  e._zod.parse = (l, h) => {
    p ?? (p = n.value);
    const $ = l.value;
    return i($) ? a && f && (h == null ? void 0 : h.async) === !1 && h.jitless !== !0 ? (s || (s = o(t.shape)), l = s(l, h), c ? bc([], $, l, h, p, e) : l) : r(l, h) : (l.issues.push({
      expected: "object",
      code: "invalid_type",
      input: $,
      inst: e
    }), l);
  };
});
function ds(e, t, r, n) {
  for (const s of e)
    if (s.issues.length === 0)
      return t.value = s.value, t;
  const o = e.filter((s) => !bt(s));
  return o.length === 1 ? (t.value = o[0].value, o[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: r,
    errors: e.map((s) => s.issues.map((i) => ht(i, n, dt())))
  }), t);
}
const ul = /* @__PURE__ */ q("$ZodUnion", (e, t) => {
  de.init(e, t), ce(e._zod, "optin", () => t.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0), ce(e._zod, "optout", () => t.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0), ce(e._zod, "values", () => {
    if (t.options.every((o) => o._zod.values))
      return new Set(t.options.flatMap((o) => Array.from(o._zod.values)));
  }), ce(e._zod, "pattern", () => {
    if (t.options.every((o) => o._zod.pattern)) {
      const o = t.options.map((s) => s._zod.pattern);
      return new RegExp(`^(${o.map((s) => Fo(s.source)).join("|")})$`);
    }
  });
  const r = t.options.length === 1, n = t.options[0]._zod.run;
  e._zod.parse = (o, s) => {
    if (r)
      return n(o, s);
    let i = !1;
    const a = [];
    for (const u of t.options) {
      const f = u._zod.run({
        value: o.value,
        issues: []
      }, s);
      if (f instanceof Promise)
        a.push(f), i = !0;
      else {
        if (f.issues.length === 0)
          return f;
        a.push(f);
      }
    }
    return i ? Promise.all(a).then((u) => ds(u, o, e, s)) : ds(a, o, e, s);
  };
}), fl = /* @__PURE__ */ q("$ZodIntersection", (e, t) => {
  de.init(e, t), e._zod.parse = (r, n) => {
    const o = r.value, s = t.left._zod.run({ value: o, issues: [] }, n), i = t.right._zod.run({ value: o, issues: [] }, n);
    return s instanceof Promise || i instanceof Promise ? Promise.all([s, i]).then(([u, f]) => hs(r, u, f)) : hs(r, s, i);
  };
});
function zo(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (Lt(e) && Lt(t)) {
    const r = Object.keys(t), n = Object.keys(e).filter((s) => r.indexOf(s) !== -1), o = { ...e, ...t };
    for (const s of n) {
      const i = zo(e[s], t[s]);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [s, ...i.mergeErrorPath]
        };
      o[s] = i.data;
    }
    return { valid: !0, data: o };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const r = [];
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = t[n], i = zo(o, s);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [n, ...i.mergeErrorPath]
        };
      r.push(i.data);
    }
    return { valid: !0, data: r };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function hs(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  let o;
  for (const a of t.issues)
    if (a.code === "unrecognized_keys") {
      o ?? (o = a);
      for (const u of a.keys)
        n.has(u) || n.set(u, {}), n.get(u).l = !0;
    } else
      e.issues.push(a);
  for (const a of r.issues)
    if (a.code === "unrecognized_keys")
      for (const u of a.keys)
        n.has(u) || n.set(u, {}), n.get(u).r = !0;
    else
      e.issues.push(a);
  const s = [...n].filter(([, a]) => a.l && a.r).map(([a]) => a);
  if (s.length && o && e.issues.push({ ...o, keys: s }), bt(e))
    return e;
  const i = zo(t.value, r.value);
  if (!i.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`);
  return e.value = i.data, e;
}
const ll = /* @__PURE__ */ q("$ZodEnum", (e, t) => {
  de.init(e, t);
  const r = lc(t.entries), n = new Set(r);
  e._zod.values = n, e._zod.pattern = new RegExp(`^(${r.filter((o) => Iu.has(typeof o)).map((o) => typeof o == "string" ? rn(o) : o.toString()).join("|")})$`), e._zod.parse = (o, s) => {
    const i = o.value;
    return n.has(i) || o.issues.push({
      code: "invalid_value",
      values: r,
      input: i,
      inst: e
    }), o;
  };
}), dl = /* @__PURE__ */ q("$ZodTransform", (e, t) => {
  de.init(e, t), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      throw new uc(e.constructor.name);
    const o = t.transform(r.value, r);
    if (n.async)
      return (o instanceof Promise ? o : Promise.resolve(o)).then((i) => (r.value = i, r));
    if (o instanceof Promise)
      throw new Pt();
    return r.value = o, r;
  };
});
function ps(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const Sc = /* @__PURE__ */ q("$ZodOptional", (e, t) => {
  de.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", ce(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), ce(e._zod, "pattern", () => {
    const r = t.innerType._zod.pattern;
    return r ? new RegExp(`^(${Fo(r.source)})?$`) : void 0;
  }), e._zod.parse = (r, n) => {
    if (t.innerType._zod.optin === "optional") {
      const o = t.innerType._zod.run(r, n);
      return o instanceof Promise ? o.then((s) => ps(s, r.value)) : ps(o, r.value);
    }
    return r.value === void 0 ? r : t.innerType._zod.run(r, n);
  };
}), hl = /* @__PURE__ */ q("$ZodExactOptional", (e, t) => {
  Sc.init(e, t), ce(e._zod, "values", () => t.innerType._zod.values), ce(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (r, n) => t.innerType._zod.run(r, n);
}), pl = /* @__PURE__ */ q("$ZodNullable", (e, t) => {
  de.init(e, t), ce(e._zod, "optin", () => t.innerType._zod.optin), ce(e._zod, "optout", () => t.innerType._zod.optout), ce(e._zod, "pattern", () => {
    const r = t.innerType._zod.pattern;
    return r ? new RegExp(`^(${Fo(r.source)}|null)$`) : void 0;
  }), ce(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (r, n) => r.value === null ? r : t.innerType._zod.run(r, n);
}), ml = /* @__PURE__ */ q("$ZodDefault", (e, t) => {
  de.init(e, t), e._zod.optin = "optional", ce(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      return t.innerType._zod.run(r, n);
    if (r.value === void 0)
      return r.value = t.defaultValue, r;
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => ms(s, t)) : ms(o, t);
  };
});
function ms(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const yl = /* @__PURE__ */ q("$ZodPrefault", (e, t) => {
  de.init(e, t), e._zod.optin = "optional", ce(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (r, n) => (n.direction === "backward" || r.value === void 0 && (r.value = t.defaultValue), t.innerType._zod.run(r, n));
}), gl = /* @__PURE__ */ q("$ZodNonOptional", (e, t) => {
  de.init(e, t), ce(e._zod, "values", () => {
    const r = t.innerType._zod.values;
    return r ? new Set([...r].filter((n) => n !== void 0)) : void 0;
  }), e._zod.parse = (r, n) => {
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => ys(s, e)) : ys(o, e);
  };
});
function ys(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const _l = /* @__PURE__ */ q("$ZodCatch", (e, t) => {
  de.init(e, t), ce(e._zod, "optin", () => t.innerType._zod.optin), ce(e._zod, "optout", () => t.innerType._zod.optout), ce(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      return t.innerType._zod.run(r, n);
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => (r.value = s.value, s.issues.length && (r.value = t.catchValue({
      ...r,
      error: {
        issues: s.issues.map((i) => ht(i, n, dt()))
      },
      input: r.value
    }), r.issues = []), r)) : (r.value = o.value, o.issues.length && (r.value = t.catchValue({
      ...r,
      error: {
        issues: o.issues.map((s) => ht(s, n, dt()))
      },
      input: r.value
    }), r.issues = []), r);
  };
}), vl = /* @__PURE__ */ q("$ZodPipe", (e, t) => {
  de.init(e, t), ce(e._zod, "values", () => t.in._zod.values), ce(e._zod, "optin", () => t.in._zod.optin), ce(e._zod, "optout", () => t.out._zod.optout), ce(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (r, n) => {
    if (n.direction === "backward") {
      const s = t.out._zod.run(r, n);
      return s instanceof Promise ? s.then((i) => Gt(i, t.in, n)) : Gt(s, t.in, n);
    }
    const o = t.in._zod.run(r, n);
    return o instanceof Promise ? o.then((s) => Gt(s, t.out, n)) : Gt(o, t.out, n);
  };
});
function Gt(e, t, r) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, r);
}
const $l = /* @__PURE__ */ q("$ZodReadonly", (e, t) => {
  de.init(e, t), ce(e._zod, "propValues", () => t.innerType._zod.propValues), ce(e._zod, "values", () => t.innerType._zod.values), ce(e._zod, "optin", () => {
    var r, n;
    return (n = (r = t.innerType) == null ? void 0 : r._zod) == null ? void 0 : n.optin;
  }), ce(e._zod, "optout", () => {
    var r, n;
    return (n = (r = t.innerType) == null ? void 0 : r._zod) == null ? void 0 : n.optout;
  }), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      return t.innerType._zod.run(r, n);
    const o = t.innerType._zod.run(r, n);
    return o instanceof Promise ? o.then(gs) : gs(o);
  };
});
function gs(e) {
  return e.value = Object.freeze(e.value), e;
}
const wl = /* @__PURE__ */ q("$ZodCustom", (e, t) => {
  Ze.init(e, t), de.init(e, t), e._zod.parse = (r, n) => r, e._zod.check = (r) => {
    const n = r.value, o = t.fn(n);
    if (o instanceof Promise)
      return o.then((s) => _s(s, r, n, e));
    _s(o, r, n, e);
  };
});
function _s(e, t, r, n) {
  if (!e) {
    const o = {
      code: "custom",
      input: r,
      inst: n,
      // incorporates params.error into issue reporting
      path: [...n._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !n._zod.def.abort
      // params: inst._zod.def.params,
    };
    n._zod.def.params && (o.params = n._zod.def.params), t.issues.push(Mt(o));
  }
}
var vs;
class El {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...r) {
    const n = r[0];
    return this._map.set(t, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, t), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const r = this._map.get(t);
    return r && typeof r == "object" && "id" in r && this._idmap.delete(r.id), this._map.delete(t), this;
  }
  get(t) {
    const r = t._zod.parent;
    if (r) {
      const n = { ...this.get(r) ?? {} };
      delete n.id;
      const o = { ...n, ...this._map.get(t) };
      return Object.keys(o).length ? o : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function bl() {
  return new El();
}
(vs = globalThis).__zod_globalRegistry ?? (vs.__zod_globalRegistry = bl());
const Dt = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Sl(e, t) {
  return new e({
    type: "string",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Rl(e, t) {
  return new e({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function $s(e, t) {
  return new e({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Pl(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ol(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Il(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Nl(e, t) {
  return new e({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Tl(e, t) {
  return new e({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function kl(e, t) {
  return new e({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function jl(e, t) {
  return new e({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Al(e, t) {
  return new e({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function zl(e, t) {
  return new e({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Cl(e, t) {
  return new e({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Dl(e, t) {
  return new e({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function ql(e, t) {
  return new e({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ll(e, t) {
  return new e({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ml(e, t) {
  return new e({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Fl(e, t) {
  return new e({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Vl(e, t) {
  return new e({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Ul(e, t) {
  return new e({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Zl(e, t) {
  return new e({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Gl(e, t) {
  return new e({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Kl(e, t) {
  return new e({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Jl(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Hl(e, t) {
  return new e({
    type: "string",
    format: "date",
    check: "string_format",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function xl(e, t) {
  return new e({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Wl(e, t) {
  return new e({
    type: "string",
    format: "duration",
    check: "string_format",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Bl(e, t) {
  return new e({
    type: "boolean",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Xl(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function Yl(e, t) {
  return new e({
    type: "never",
    ...X(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Rc(e, t) {
  return new $f({
    check: "max_length",
    ...X(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Yr(e, t) {
  return new wf({
    check: "min_length",
    ...X(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Pc(e, t) {
  return new Ef({
    check: "length_equals",
    ...X(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function Ql(e, t) {
  return new bf({
    check: "string_format",
    format: "regex",
    ...X(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function ed(e) {
  return new Sf({
    check: "string_format",
    format: "lowercase",
    ...X(e)
  });
}
// @__NO_SIDE_EFFECTS__
function td(e) {
  return new Rf({
    check: "string_format",
    format: "uppercase",
    ...X(e)
  });
}
// @__NO_SIDE_EFFECTS__
function rd(e, t) {
  return new Pf({
    check: "string_format",
    format: "includes",
    ...X(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function nd(e, t) {
  return new Of({
    check: "string_format",
    format: "starts_with",
    ...X(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function od(e, t) {
  return new If({
    check: "string_format",
    format: "ends_with",
    ...X(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function It(e) {
  return new Nf({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function sd(e) {
  return /* @__PURE__ */ It((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function id() {
  return /* @__PURE__ */ It((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ad() {
  return /* @__PURE__ */ It((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function cd() {
  return /* @__PURE__ */ It((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function ud() {
  return /* @__PURE__ */ It((e) => Pu(e));
}
// @__NO_SIDE_EFFECTS__
function fd(e, t, r) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...X(r)
  });
}
// @__NO_SIDE_EFFECTS__
function ld(e, t, r) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...X(r)
  });
}
// @__NO_SIDE_EFFECTS__
function dd(e) {
  const t = /* @__PURE__ */ hd((r) => (r.addIssue = (n) => {
    if (typeof n == "string")
      r.issues.push(Mt(n, r.value, t._zod.def));
    else {
      const o = n;
      o.fatal && (o.continue = !1), o.code ?? (o.code = "custom"), o.input ?? (o.input = r.value), o.inst ?? (o.inst = t), o.continue ?? (o.continue = !t._zod.def.abort), r.issues.push(Mt(o));
    }
  }, e(r.value, r)));
  return t;
}
// @__NO_SIDE_EFFECTS__
function hd(e, t) {
  const r = new Ze({
    check: "custom",
    ...X(t)
  });
  return r._zod.check = e, r;
}
function Oc(e) {
  let t = (e == null ? void 0 : e.target) ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: (e == null ? void 0 : e.metadata) ?? Dt,
    target: t,
    unrepresentable: (e == null ? void 0 : e.unrepresentable) ?? "throw",
    override: (e == null ? void 0 : e.override) ?? (() => {
    }),
    io: (e == null ? void 0 : e.io) ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: (e == null ? void 0 : e.cycles) ?? "ref",
    reused: (e == null ? void 0 : e.reused) ?? "inline",
    external: (e == null ? void 0 : e.external) ?? void 0
  };
}
function _e(e, t, r = { path: [], schemaPath: [] }) {
  var c, p;
  var n;
  const o = e._zod.def, s = t.seen.get(e);
  if (s)
    return s.count++, r.schemaPath.includes(e) && (s.cycle = r.path), s.schema;
  const i = { schema: {}, count: 1, cycle: void 0, path: r.path };
  t.seen.set(e, i);
  const a = (p = (c = e._zod).toJSONSchema) == null ? void 0 : p.call(c);
  if (a)
    i.schema = a;
  else {
    const l = {
      ...r,
      schemaPath: [...r.schemaPath, e],
      path: r.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, i.schema, l);
    else {
      const $ = i.schema, v = t.processors[o.type];
      if (!v)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);
      v(e, t, $, l);
    }
    const h = e._zod.parent;
    h && (i.ref || (i.ref = h), _e(h, t, l), t.seen.get(h).isParent = !0);
  }
  const u = t.metadataRegistry.get(e);
  return u && Object.assign(i.schema, u), t.io === "input" && Se(e) && (delete i.schema.examples, delete i.schema.default), t.io === "input" && i.schema._prefault && ((n = i.schema).default ?? (n.default = i.schema._prefault)), delete i.schema._prefault, t.seen.get(e).schema;
}
function Ic(e, t) {
  var i, a, u, f;
  const r = e.seen.get(t);
  if (!r)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const n = /* @__PURE__ */ new Map();
  for (const c of e.seen.entries()) {
    const p = (i = e.metadataRegistry.get(c[0])) == null ? void 0 : i.id;
    if (p) {
      const l = n.get(p);
      if (l && l !== c[0])
        throw new Error(`Duplicate schema id "${p}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      n.set(p, c[0]);
    }
  }
  const o = (c) => {
    var v;
    const p = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const m = (v = e.external.registry.get(c[0])) == null ? void 0 : v.id, _ = e.external.uri ?? ((g) => g);
      if (m)
        return { ref: _(m) };
      const d = c[1].defId ?? c[1].schema.id ?? `schema${e.counter++}`;
      return c[1].defId = d, { defId: d, ref: `${_("__shared")}#/${p}/${d}` };
    }
    if (c[1] === r)
      return { ref: "#" };
    const h = `#/${p}/`, $ = c[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: $, ref: h + $ };
  }, s = (c) => {
    if (c[1].schema.$ref)
      return;
    const p = c[1], { ref: l, defId: h } = o(c);
    p.def = { ...p.schema }, h && (p.defId = h);
    const $ = p.schema;
    for (const v in $)
      delete $[v];
    $.$ref = l;
  };
  if (e.cycles === "throw")
    for (const c of e.seen.entries()) {
      const p = c[1];
      if (p.cycle)
        throw new Error(`Cycle detected: #/${(a = p.cycle) == null ? void 0 : a.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const c of e.seen.entries()) {
    const p = c[1];
    if (t === c[0]) {
      s(c);
      continue;
    }
    if (e.external) {
      const h = (u = e.external.registry.get(c[0])) == null ? void 0 : u.id;
      if (t !== c[0] && h) {
        s(c);
        continue;
      }
    }
    if ((f = e.metadataRegistry.get(c[0])) == null ? void 0 : f.id) {
      s(c);
      continue;
    }
    if (p.cycle) {
      s(c);
      continue;
    }
    if (p.count > 1 && e.reused === "ref") {
      s(c);
      continue;
    }
  }
}
function Nc(e, t) {
  var i, a, u;
  const r = e.seen.get(t);
  if (!r)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const n = (f) => {
    const c = e.seen.get(f);
    if (c.ref === null)
      return;
    const p = c.def ?? c.schema, l = { ...p }, h = c.ref;
    if (c.ref = null, h) {
      n(h);
      const v = e.seen.get(h), m = v.schema;
      if (m.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (p.allOf = p.allOf ?? [], p.allOf.push(m)) : Object.assign(p, m), Object.assign(p, l), f._zod.parent === h)
        for (const d in p)
          d === "$ref" || d === "allOf" || d in l || delete p[d];
      if (m.$ref && v.def)
        for (const d in p)
          d === "$ref" || d === "allOf" || d in v.def && JSON.stringify(p[d]) === JSON.stringify(v.def[d]) && delete p[d];
    }
    const $ = f._zod.parent;
    if ($ && $ !== h) {
      n($);
      const v = e.seen.get($);
      if (v != null && v.schema.$ref && (p.$ref = v.schema.$ref, v.def))
        for (const m in p)
          m === "$ref" || m === "allOf" || m in v.def && JSON.stringify(p[m]) === JSON.stringify(v.def[m]) && delete p[m];
    }
    e.override({
      zodSchema: f,
      jsonSchema: p,
      path: c.path ?? []
    });
  };
  for (const f of [...e.seen.entries()].reverse())
    n(f[0]);
  const o = {};
  if (e.target === "draft-2020-12" ? o.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? o.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? o.$schema = "http://json-schema.org/draft-04/schema#" : e.target, (i = e.external) != null && i.uri) {
    const f = (a = e.external.registry.get(t)) == null ? void 0 : a.id;
    if (!f)
      throw new Error("Schema is missing an `id` property");
    o.$id = e.external.uri(f);
  }
  Object.assign(o, r.def ?? r.schema);
  const s = ((u = e.external) == null ? void 0 : u.defs) ?? {};
  for (const f of e.seen.entries()) {
    const c = f[1];
    c.def && c.defId && (s[c.defId] = c.def);
  }
  e.external || Object.keys(s).length > 0 && (e.target === "draft-2020-12" ? o.$defs = s : o.definitions = s);
  try {
    const f = JSON.parse(JSON.stringify(o));
    return Object.defineProperty(f, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: Qr(t, "input", e.processors),
          output: Qr(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), f;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Se(e, t) {
  const r = t ?? { seen: /* @__PURE__ */ new Set() };
  if (r.seen.has(e))
    return !1;
  r.seen.add(e);
  const n = e._zod.def;
  if (n.type === "transform")
    return !0;
  if (n.type === "array")
    return Se(n.element, r);
  if (n.type === "set")
    return Se(n.valueType, r);
  if (n.type === "lazy")
    return Se(n.getter(), r);
  if (n.type === "promise" || n.type === "optional" || n.type === "nonoptional" || n.type === "nullable" || n.type === "readonly" || n.type === "default" || n.type === "prefault")
    return Se(n.innerType, r);
  if (n.type === "intersection")
    return Se(n.left, r) || Se(n.right, r);
  if (n.type === "record" || n.type === "map")
    return Se(n.keyType, r) || Se(n.valueType, r);
  if (n.type === "pipe")
    return Se(n.in, r) || Se(n.out, r);
  if (n.type === "object") {
    for (const o in n.shape)
      if (Se(n.shape[o], r))
        return !0;
    return !1;
  }
  if (n.type === "union") {
    for (const o of n.options)
      if (Se(o, r))
        return !0;
    return !1;
  }
  if (n.type === "tuple") {
    for (const o of n.items)
      if (Se(o, r))
        return !0;
    return !!(n.rest && Se(n.rest, r));
  }
  return !1;
}
const pd = (e, t = {}) => (r) => {
  const n = Oc({ ...r, processors: t });
  return _e(e, n), Ic(n, e), Nc(n, e);
}, Qr = (e, t, r = {}) => (n) => {
  const { libraryOptions: o, target: s } = n ?? {}, i = Oc({ ...o ?? {}, target: s, io: t, processors: r });
  return _e(e, i), Ic(i, e), Nc(i, e);
}, md = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, yd = (e, t, r, n) => {
  const o = r;
  o.type = "string";
  const { minimum: s, maximum: i, format: a, patterns: u, contentEncoding: f } = e._zod.bag;
  if (typeof s == "number" && (o.minLength = s), typeof i == "number" && (o.maxLength = i), a && (o.format = md[a] ?? a, o.format === "" && delete o.format, a === "time" && delete o.format), f && (o.contentEncoding = f), u && u.size > 0) {
    const c = [...u];
    c.length === 1 ? o.pattern = c[0].source : c.length > 1 && (o.allOf = [
      ...c.map((p) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: p.source
      }))
    ]);
  }
}, gd = (e, t, r, n) => {
  r.type = "boolean";
}, _d = (e, t, r, n) => {
  r.not = {};
}, vd = (e, t, r, n) => {
}, $d = (e, t, r, n) => {
  const o = e._zod.def, s = lc(o.entries);
  s.every((i) => typeof i == "number") && (r.type = "number"), s.every((i) => typeof i == "string") && (r.type = "string"), r.enum = s;
}, wd = (e, t, r, n) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, Ed = (e, t, r, n) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, bd = (e, t, r, n) => {
  const o = r, s = e._zod.def, { minimum: i, maximum: a } = e._zod.bag;
  typeof i == "number" && (o.minItems = i), typeof a == "number" && (o.maxItems = a), o.type = "array", o.items = _e(s.element, t, { ...n, path: [...n.path, "items"] });
}, Sd = (e, t, r, n) => {
  var f;
  const o = r, s = e._zod.def;
  o.type = "object", o.properties = {};
  const i = s.shape;
  for (const c in i)
    o.properties[c] = _e(i[c], t, {
      ...n,
      path: [...n.path, "properties", c]
    });
  const a = new Set(Object.keys(i)), u = new Set([...a].filter((c) => {
    const p = s.shape[c]._zod;
    return t.io === "input" ? p.optin === void 0 : p.optout === void 0;
  }));
  u.size > 0 && (o.required = Array.from(u)), ((f = s.catchall) == null ? void 0 : f._zod.def.type) === "never" ? o.additionalProperties = !1 : s.catchall ? s.catchall && (o.additionalProperties = _e(s.catchall, t, {
    ...n,
    path: [...n.path, "additionalProperties"]
  })) : t.io === "output" && (o.additionalProperties = !1);
}, Rd = (e, t, r, n) => {
  const o = e._zod.def, s = o.inclusive === !1, i = o.options.map((a, u) => _e(a, t, {
    ...n,
    path: [...n.path, s ? "oneOf" : "anyOf", u]
  }));
  s ? r.oneOf = i : r.anyOf = i;
}, Pd = (e, t, r, n) => {
  const o = e._zod.def, s = _e(o.left, t, {
    ...n,
    path: [...n.path, "allOf", 0]
  }), i = _e(o.right, t, {
    ...n,
    path: [...n.path, "allOf", 1]
  }), a = (f) => "allOf" in f && Object.keys(f).length === 1, u = [
    ...a(s) ? s.allOf : [s],
    ...a(i) ? i.allOf : [i]
  ];
  r.allOf = u;
}, Od = (e, t, r, n) => {
  const o = e._zod.def, s = _e(o.innerType, t, n), i = t.seen.get(e);
  t.target === "openapi-3.0" ? (i.ref = o.innerType, r.nullable = !0) : r.anyOf = [s, { type: "null" }];
}, Id = (e, t, r, n) => {
  const o = e._zod.def;
  _e(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType;
}, Nd = (e, t, r, n) => {
  const o = e._zod.def;
  _e(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType, r.default = JSON.parse(JSON.stringify(o.defaultValue));
}, Td = (e, t, r, n) => {
  const o = e._zod.def;
  _e(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType, t.io === "input" && (r._prefault = JSON.parse(JSON.stringify(o.defaultValue)));
}, kd = (e, t, r, n) => {
  const o = e._zod.def;
  _e(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType;
  let i;
  try {
    i = o.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  r.default = i;
}, jd = (e, t, r, n) => {
  const o = e._zod.def, s = t.io === "input" ? o.in._zod.def.type === "transform" ? o.out : o.in : o.out;
  _e(s, t, n);
  const i = t.seen.get(e);
  i.ref = s;
}, Ad = (e, t, r, n) => {
  const o = e._zod.def;
  _e(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType, r.readOnly = !0;
}, Tc = (e, t, r, n) => {
  const o = e._zod.def;
  _e(o.innerType, t, n);
  const s = t.seen.get(e);
  s.ref = o.innerType;
}, zd = /* @__PURE__ */ q("ZodISODateTime", (e, t) => {
  Zf.init(e, t), le.init(e, t);
});
function Cd(e) {
  return /* @__PURE__ */ Jl(zd, e);
}
const Dd = /* @__PURE__ */ q("ZodISODate", (e, t) => {
  Gf.init(e, t), le.init(e, t);
});
function qd(e) {
  return /* @__PURE__ */ Hl(Dd, e);
}
const Ld = /* @__PURE__ */ q("ZodISOTime", (e, t) => {
  Kf.init(e, t), le.init(e, t);
});
function Md(e) {
  return /* @__PURE__ */ xl(Ld, e);
}
const Fd = /* @__PURE__ */ q("ZodISODuration", (e, t) => {
  Jf.init(e, t), le.init(e, t);
});
function Vd(e) {
  return /* @__PURE__ */ Wl(Fd, e);
}
const Ud = (e, t) => {
  yc.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (r) => Lu(e, r)
      // enumerable: false,
    },
    flatten: {
      value: (r) => qu(e, r)
      // enumerable: false,
    },
    addIssue: {
      value: (r) => {
        e.issues.push(r), e.message = JSON.stringify(e.issues, Ao, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (r) => {
        e.issues.push(...r), e.message = JSON.stringify(e.issues, Ao, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, ze = q("ZodError", Ud, {
  Parent: Error
}), Zd = /* @__PURE__ */ Uo(ze), Gd = /* @__PURE__ */ Zo(ze), Kd = /* @__PURE__ */ nn(ze), Jd = /* @__PURE__ */ on(ze), Hd = /* @__PURE__ */ Vu(ze), xd = /* @__PURE__ */ Uu(ze), Wd = /* @__PURE__ */ Zu(ze), Bd = /* @__PURE__ */ Gu(ze), Xd = /* @__PURE__ */ Ku(ze), Yd = /* @__PURE__ */ Ju(ze), Qd = /* @__PURE__ */ Hu(ze), eh = /* @__PURE__ */ xu(ze), he = /* @__PURE__ */ q("ZodType", (e, t) => (de.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: Qr(e, "input"),
    output: Qr(e, "output")
  }
}), e.toJSONSchema = pd(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...r) => e.clone(ot(t, {
  checks: [
    ...t.checks ?? [],
    ...r.map((n) => typeof n == "function" ? { _zod: { check: n, def: { check: "custom" }, onattach: [] } } : n)
  ]
}), {
  parent: !0
}), e.with = e.check, e.clone = (r, n) => st(e, r, n), e.brand = () => e, e.register = ((r, n) => (r.add(e, n), e)), e.parse = (r, n) => Zd(e, r, n, { callee: e.parse }), e.safeParse = (r, n) => Kd(e, r, n), e.parseAsync = async (r, n) => Gd(e, r, n, { callee: e.parseAsync }), e.safeParseAsync = async (r, n) => Jd(e, r, n), e.spa = e.safeParseAsync, e.encode = (r, n) => Hd(e, r, n), e.decode = (r, n) => xd(e, r, n), e.encodeAsync = async (r, n) => Wd(e, r, n), e.decodeAsync = async (r, n) => Bd(e, r, n), e.safeEncode = (r, n) => Xd(e, r, n), e.safeDecode = (r, n) => Yd(e, r, n), e.safeEncodeAsync = async (r, n) => Qd(e, r, n), e.safeDecodeAsync = async (r, n) => eh(e, r, n), e.refine = (r, n) => e.check(Kh(r, n)), e.superRefine = (r) => e.check(Jh(r)), e.overwrite = (r) => e.check(/* @__PURE__ */ It(r)), e.optional = () => Ss(e), e.exactOptional = () => jh(e), e.nullable = () => Rs(e), e.nullish = () => Ss(Rs(e)), e.nonoptional = (r) => Lh(e, r), e.array = () => jc(e), e.or = (r) => Ph([e, r]), e.and = (r) => Ih(e, r), e.transform = (r) => Ps(e, Th(r)), e.default = (r) => Ch(e, r), e.prefault = (r) => qh(e, r), e.catch = (r) => Fh(e, r), e.pipe = (r) => Ps(e, r), e.readonly = () => Zh(e), e.describe = (r) => {
  const n = e.clone();
  return Dt.add(n, { description: r }), n;
}, Object.defineProperty(e, "description", {
  get() {
    var r;
    return (r = Dt.get(e)) == null ? void 0 : r.description;
  },
  configurable: !0
}), e.meta = (...r) => {
  if (r.length === 0)
    return Dt.get(e);
  const n = e.clone();
  return Dt.add(n, r[0]), n;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (r) => r(e), e)), kc = /* @__PURE__ */ q("_ZodString", (e, t) => {
  Go.init(e, t), he.init(e, t), e._zod.processJSONSchema = (n, o, s) => yd(e, n, o);
  const r = e._zod.bag;
  e.format = r.format ?? null, e.minLength = r.minimum ?? null, e.maxLength = r.maximum ?? null, e.regex = (...n) => e.check(/* @__PURE__ */ Ql(...n)), e.includes = (...n) => e.check(/* @__PURE__ */ rd(...n)), e.startsWith = (...n) => e.check(/* @__PURE__ */ nd(...n)), e.endsWith = (...n) => e.check(/* @__PURE__ */ od(...n)), e.min = (...n) => e.check(/* @__PURE__ */ Yr(...n)), e.max = (...n) => e.check(/* @__PURE__ */ Rc(...n)), e.length = (...n) => e.check(/* @__PURE__ */ Pc(...n)), e.nonempty = (...n) => e.check(/* @__PURE__ */ Yr(1, ...n)), e.lowercase = (n) => e.check(/* @__PURE__ */ ed(n)), e.uppercase = (n) => e.check(/* @__PURE__ */ td(n)), e.trim = () => e.check(/* @__PURE__ */ id()), e.normalize = (...n) => e.check(/* @__PURE__ */ sd(...n)), e.toLowerCase = () => e.check(/* @__PURE__ */ ad()), e.toUpperCase = () => e.check(/* @__PURE__ */ cd()), e.slugify = () => e.check(/* @__PURE__ */ ud());
}), th = /* @__PURE__ */ q("ZodString", (e, t) => {
  Go.init(e, t), kc.init(e, t), e.email = (r) => e.check(/* @__PURE__ */ Rl(rh, r)), e.url = (r) => e.check(/* @__PURE__ */ Tl(nh, r)), e.jwt = (r) => e.check(/* @__PURE__ */ Kl(_h, r)), e.emoji = (r) => e.check(/* @__PURE__ */ kl(oh, r)), e.guid = (r) => e.check(/* @__PURE__ */ $s(ws, r)), e.uuid = (r) => e.check(/* @__PURE__ */ Pl(Kt, r)), e.uuidv4 = (r) => e.check(/* @__PURE__ */ Ol(Kt, r)), e.uuidv6 = (r) => e.check(/* @__PURE__ */ Il(Kt, r)), e.uuidv7 = (r) => e.check(/* @__PURE__ */ Nl(Kt, r)), e.nanoid = (r) => e.check(/* @__PURE__ */ jl(sh, r)), e.guid = (r) => e.check(/* @__PURE__ */ $s(ws, r)), e.cuid = (r) => e.check(/* @__PURE__ */ Al(ih, r)), e.cuid2 = (r) => e.check(/* @__PURE__ */ zl(ah, r)), e.ulid = (r) => e.check(/* @__PURE__ */ Cl(ch, r)), e.base64 = (r) => e.check(/* @__PURE__ */ Ul(mh, r)), e.base64url = (r) => e.check(/* @__PURE__ */ Zl(yh, r)), e.xid = (r) => e.check(/* @__PURE__ */ Dl(uh, r)), e.ksuid = (r) => e.check(/* @__PURE__ */ ql(fh, r)), e.ipv4 = (r) => e.check(/* @__PURE__ */ Ll(lh, r)), e.ipv6 = (r) => e.check(/* @__PURE__ */ Ml(dh, r)), e.cidrv4 = (r) => e.check(/* @__PURE__ */ Fl(hh, r)), e.cidrv6 = (r) => e.check(/* @__PURE__ */ Vl(ph, r)), e.e164 = (r) => e.check(/* @__PURE__ */ Gl(gh, r)), e.datetime = (r) => e.check(Cd(r)), e.date = (r) => e.check(qd(r)), e.time = (r) => e.check(Md(r)), e.duration = (r) => e.check(Vd(r));
});
function Et(e) {
  return /* @__PURE__ */ Sl(th, e);
}
const le = /* @__PURE__ */ q("ZodStringFormat", (e, t) => {
  fe.init(e, t), kc.init(e, t);
}), rh = /* @__PURE__ */ q("ZodEmail", (e, t) => {
  zf.init(e, t), le.init(e, t);
}), ws = /* @__PURE__ */ q("ZodGUID", (e, t) => {
  jf.init(e, t), le.init(e, t);
}), Kt = /* @__PURE__ */ q("ZodUUID", (e, t) => {
  Af.init(e, t), le.init(e, t);
}), nh = /* @__PURE__ */ q("ZodURL", (e, t) => {
  Cf.init(e, t), le.init(e, t);
}), oh = /* @__PURE__ */ q("ZodEmoji", (e, t) => {
  Df.init(e, t), le.init(e, t);
}), sh = /* @__PURE__ */ q("ZodNanoID", (e, t) => {
  qf.init(e, t), le.init(e, t);
}), ih = /* @__PURE__ */ q("ZodCUID", (e, t) => {
  Lf.init(e, t), le.init(e, t);
}), ah = /* @__PURE__ */ q("ZodCUID2", (e, t) => {
  Mf.init(e, t), le.init(e, t);
}), ch = /* @__PURE__ */ q("ZodULID", (e, t) => {
  Ff.init(e, t), le.init(e, t);
}), uh = /* @__PURE__ */ q("ZodXID", (e, t) => {
  Vf.init(e, t), le.init(e, t);
}), fh = /* @__PURE__ */ q("ZodKSUID", (e, t) => {
  Uf.init(e, t), le.init(e, t);
}), lh = /* @__PURE__ */ q("ZodIPv4", (e, t) => {
  Hf.init(e, t), le.init(e, t);
}), dh = /* @__PURE__ */ q("ZodIPv6", (e, t) => {
  xf.init(e, t), le.init(e, t);
}), hh = /* @__PURE__ */ q("ZodCIDRv4", (e, t) => {
  Wf.init(e, t), le.init(e, t);
}), ph = /* @__PURE__ */ q("ZodCIDRv6", (e, t) => {
  Bf.init(e, t), le.init(e, t);
}), mh = /* @__PURE__ */ q("ZodBase64", (e, t) => {
  Xf.init(e, t), le.init(e, t);
}), yh = /* @__PURE__ */ q("ZodBase64URL", (e, t) => {
  Qf.init(e, t), le.init(e, t);
}), gh = /* @__PURE__ */ q("ZodE164", (e, t) => {
  el.init(e, t), le.init(e, t);
}), _h = /* @__PURE__ */ q("ZodJWT", (e, t) => {
  rl.init(e, t), le.init(e, t);
}), vh = /* @__PURE__ */ q("ZodBoolean", (e, t) => {
  nl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => gd(e, r, n);
});
function Es(e) {
  return /* @__PURE__ */ Bl(vh, e);
}
const $h = /* @__PURE__ */ q("ZodUnknown", (e, t) => {
  ol.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => vd();
});
function bs() {
  return /* @__PURE__ */ Xl($h);
}
const wh = /* @__PURE__ */ q("ZodNever", (e, t) => {
  sl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => _d(e, r, n);
});
function Eh(e) {
  return /* @__PURE__ */ Yl(wh, e);
}
const bh = /* @__PURE__ */ q("ZodArray", (e, t) => {
  il.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => bd(e, r, n, o), e.element = t.element, e.min = (r, n) => e.check(/* @__PURE__ */ Yr(r, n)), e.nonempty = (r) => e.check(/* @__PURE__ */ Yr(1, r)), e.max = (r, n) => e.check(/* @__PURE__ */ Rc(r, n)), e.length = (r, n) => e.check(/* @__PURE__ */ Pc(r, n)), e.unwrap = () => e.element;
});
function jc(e, t) {
  return /* @__PURE__ */ fd(bh, e, t);
}
const Sh = /* @__PURE__ */ q("ZodObject", (e, t) => {
  cl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Sd(e, r, n, o), ce(e, "shape", () => t.shape), e.keyof = () => Ko(Object.keys(e._zod.def.shape)), e.catchall = (r) => e.clone({ ...e._zod.def, catchall: r }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: bs() }), e.loose = () => e.clone({ ...e._zod.def, catchall: bs() }), e.strict = () => e.clone({ ...e._zod.def, catchall: Eh() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (r) => ju(e, r), e.safeExtend = (r) => Au(e, r), e.merge = (r) => zu(e, r), e.pick = (r) => Tu(e, r), e.omit = (r) => ku(e, r), e.partial = (...r) => Cu(Ac, e, r[0]), e.required = (...r) => Du(zc, e, r[0]);
});
function Co(e, t) {
  const r = {
    type: "object",
    shape: e ?? {},
    ...X(t)
  };
  return new Sh(r);
}
const Rh = /* @__PURE__ */ q("ZodUnion", (e, t) => {
  ul.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Rd(e, r, n, o), e.options = t.options;
});
function Ph(e, t) {
  return new Rh({
    type: "union",
    options: e,
    ...X(t)
  });
}
const Oh = /* @__PURE__ */ q("ZodIntersection", (e, t) => {
  fl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Pd(e, r, n, o);
});
function Ih(e, t) {
  return new Oh({
    type: "intersection",
    left: e,
    right: t
  });
}
const Do = /* @__PURE__ */ q("ZodEnum", (e, t) => {
  ll.init(e, t), he.init(e, t), e._zod.processJSONSchema = (n, o, s) => $d(e, n, o), e.enum = t.entries, e.options = Object.values(t.entries);
  const r = new Set(Object.keys(t.entries));
  e.extract = (n, o) => {
    const s = {};
    for (const i of n)
      if (r.has(i))
        s[i] = t.entries[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new Do({
      ...t,
      checks: [],
      ...X(o),
      entries: s
    });
  }, e.exclude = (n, o) => {
    const s = { ...t.entries };
    for (const i of n)
      if (r.has(i))
        delete s[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new Do({
      ...t,
      checks: [],
      ...X(o),
      entries: s
    });
  };
});
function Ko(e, t) {
  const r = Array.isArray(e) ? Object.fromEntries(e.map((n) => [n, n])) : e;
  return new Do({
    type: "enum",
    entries: r,
    ...X(t)
  });
}
const Nh = /* @__PURE__ */ q("ZodTransform", (e, t) => {
  dl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Ed(e, r), e._zod.parse = (r, n) => {
    if (n.direction === "backward")
      throw new uc(e.constructor.name);
    r.addIssue = (s) => {
      if (typeof s == "string")
        r.issues.push(Mt(s, r.value, t));
      else {
        const i = s;
        i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = r.value), i.inst ?? (i.inst = e), r.issues.push(Mt(i));
      }
    };
    const o = t.transform(r.value, r);
    return o instanceof Promise ? o.then((s) => (r.value = s, r)) : (r.value = o, r);
  };
});
function Th(e) {
  return new Nh({
    type: "transform",
    transform: e
  });
}
const Ac = /* @__PURE__ */ q("ZodOptional", (e, t) => {
  Sc.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Tc(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function Ss(e) {
  return new Ac({
    type: "optional",
    innerType: e
  });
}
const kh = /* @__PURE__ */ q("ZodExactOptional", (e, t) => {
  hl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Tc(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function jh(e) {
  return new kh({
    type: "optional",
    innerType: e
  });
}
const Ah = /* @__PURE__ */ q("ZodNullable", (e, t) => {
  pl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Od(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function Rs(e) {
  return new Ah({
    type: "nullable",
    innerType: e
  });
}
const zh = /* @__PURE__ */ q("ZodDefault", (e, t) => {
  ml.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Nd(e, r, n, o), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Ch(e, t) {
  return new zh({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : hc(t);
    }
  });
}
const Dh = /* @__PURE__ */ q("ZodPrefault", (e, t) => {
  yl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Td(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function qh(e, t) {
  return new Dh({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : hc(t);
    }
  });
}
const zc = /* @__PURE__ */ q("ZodNonOptional", (e, t) => {
  gl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Id(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function Lh(e, t) {
  return new zc({
    type: "nonoptional",
    innerType: e,
    ...X(t)
  });
}
const Mh = /* @__PURE__ */ q("ZodCatch", (e, t) => {
  _l.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => kd(e, r, n, o), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Fh(e, t) {
  return new Mh({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const Vh = /* @__PURE__ */ q("ZodPipe", (e, t) => {
  vl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => jd(e, r, n, o), e.in = t.in, e.out = t.out;
});
function Ps(e, t) {
  return new Vh({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const Uh = /* @__PURE__ */ q("ZodReadonly", (e, t) => {
  $l.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => Ad(e, r, n, o), e.unwrap = () => e._zod.def.innerType;
});
function Zh(e) {
  return new Uh({
    type: "readonly",
    innerType: e
  });
}
const Gh = /* @__PURE__ */ q("ZodCustom", (e, t) => {
  wl.init(e, t), he.init(e, t), e._zod.processJSONSchema = (r, n, o) => wd(e, r);
});
function Kh(e, t = {}) {
  return /* @__PURE__ */ ld(Gh, e, t);
}
function Jh(e) {
  return /* @__PURE__ */ dd(e);
}
const Hh = Co({
  appName: Et(),
  appVersion: Et(),
  desktopFocus: Et(),
  layers: jc(
    Co({
      name: Et(),
      responsibility: Et()
    })
  )
}), xh = Ko(["system", "linen", "harbor"]), Wh = Ko(["compact", "comfortable"]), Cc = Co({
  theme: xh,
  density: Wh,
  launchOnStartup: Es(),
  sidebarCollapsed: Es(),
  workspaceName: Et().trim().min(2).max(32)
}), Bh = {
  theme: "linen",
  density: "comfortable",
  launchOnStartup: !1,
  sidebarCollapsed: !1,
  workspaceName: "Northstar Desk"
}, Dc = Cc, pt = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, qc = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Lc = 1e6, Xh = (e) => e >= "0" && e <= "9";
function Mc(e) {
  if (e === "0")
    return !0;
  if (/^[1-9]\d*$/.test(e)) {
    const t = Number.parseInt(e, 10);
    return t <= Number.MAX_SAFE_INTEGER && t <= Lc;
  }
  return !1;
}
function bn(e, t) {
  return qc.has(e) ? !1 : (e && Mc(e) ? t.push(Number.parseInt(e, 10)) : t.push(e), !0);
}
function Yh(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  const t = [];
  let r = "", n = "start", o = !1, s = 0;
  for (const i of e) {
    if (s++, o) {
      r += i, o = !1;
      continue;
    }
    if (i === "\\") {
      if (n === "index")
        throw new Error(`Invalid character '${i}' in an index at position ${s}`);
      if (n === "indexEnd")
        throw new Error(`Invalid character '${i}' after an index at position ${s}`);
      o = !0, n = n === "start" ? "property" : n;
      continue;
    }
    switch (i) {
      case ".": {
        if (n === "index")
          throw new Error(`Invalid character '${i}' in an index at position ${s}`);
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (!bn(r, t))
          return [];
        r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error(`Invalid character '${i}' in an index at position ${s}`);
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (n === "property" || n === "start") {
          if ((r || n === "property") && !bn(r, t))
            return [];
          r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          if (r === "")
            r = (t.pop() || "") + "[]", n = "property";
          else {
            const a = Number.parseInt(r, 10);
            !Number.isNaN(a) && Number.isFinite(a) && a >= 0 && a <= Number.MAX_SAFE_INTEGER && a <= Lc && r === String(a) ? t.push(a) : t.push(r), r = "", n = "indexEnd";
          }
          break;
        }
        if (n === "indexEnd")
          throw new Error(`Invalid character '${i}' after an index at position ${s}`);
        r += i;
        break;
      }
      default: {
        if (n === "index" && !Xh(i))
          throw new Error(`Invalid character '${i}' in an index at position ${s}`);
        if (n === "indexEnd")
          throw new Error(`Invalid character '${i}' after an index at position ${s}`);
        n === "start" && (n = "property"), r += i;
      }
    }
  }
  switch (o && (r += "\\"), n) {
    case "property": {
      if (!bn(r, t))
        return [];
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function an(e) {
  if (typeof e == "string")
    return Yh(e);
  if (Array.isArray(e)) {
    const t = [];
    for (const [r, n] of e.entries()) {
      if (typeof n != "string" && typeof n != "number")
        throw new TypeError(`Expected a string or number for path segment at index ${r}, got ${typeof n}`);
      if (typeof n == "number" && !Number.isFinite(n))
        throw new TypeError(`Path segment at index ${r} must be a finite number, got ${n}`);
      if (qc.has(n))
        return [];
      typeof n == "string" && Mc(n) ? t.push(Number.parseInt(n, 10)) : t.push(n);
    }
    return t;
  }
  return [];
}
function Os(e, t, r) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return r === void 0 ? e : r;
  const n = an(t);
  if (n.length === 0)
    return r;
  for (let o = 0; o < n.length; o++) {
    const s = n[o];
    if (e = e[s], e == null) {
      if (o !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Jt(e, t, r) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return e;
  const n = e, o = an(t);
  if (o.length === 0)
    return e;
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    if (s === o.length - 1)
      e[i] = r;
    else if (!pt(e[i])) {
      const u = typeof o[s + 1] == "number";
      e[i] = u ? [] : {};
    }
    e = e[i];
  }
  return n;
}
function Qh(e, t) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = an(t);
  if (r.length === 0)
    return !1;
  for (let n = 0; n < r.length; n++) {
    const o = r[n];
    if (n === r.length - 1)
      return Object.hasOwn(e, o) ? (delete e[o], !0) : !1;
    if (e = e[o], !pt(e))
      return !1;
  }
}
function Sn(e, t) {
  if (!pt(e) || typeof t != "string" && !Array.isArray(t))
    return !1;
  const r = an(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!pt(e) || !(n in e))
      return !1;
    e = e[n];
  }
  return !0;
}
const tt = cc.homedir(), Jo = cc.tmpdir(), { env: St } = ue, ep = (e) => {
  const t = se.join(tt, "Library");
  return {
    data: se.join(t, "Application Support", e),
    config: se.join(t, "Preferences", e),
    cache: se.join(t, "Caches", e),
    log: se.join(t, "Logs", e),
    temp: se.join(Jo, e)
  };
}, tp = (e) => {
  const t = St.APPDATA || se.join(tt, "AppData", "Roaming"), r = St.LOCALAPPDATA || se.join(tt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: se.join(r, e, "Data"),
    config: se.join(t, e, "Config"),
    cache: se.join(r, e, "Cache"),
    log: se.join(r, e, "Log"),
    temp: se.join(Jo, e)
  };
}, rp = (e) => {
  const t = se.basename(tt);
  return {
    data: se.join(St.XDG_DATA_HOME || se.join(tt, ".local", "share"), e),
    config: se.join(St.XDG_CONFIG_HOME || se.join(tt, ".config"), e),
    cache: se.join(St.XDG_CACHE_HOME || se.join(tt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: se.join(St.XDG_STATE_HOME || se.join(tt, ".local", "state"), e),
    temp: se.join(Jo, t, e)
  };
};
function np(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), ue.platform === "darwin" ? ep(e) : ue.platform === "win32" ? tp(e) : rp(e);
}
const Be = (e, t) => {
  const { onError: r } = t;
  return function(...o) {
    return e.apply(void 0, o).catch(r);
  };
}, Ke = (e, t) => {
  const { onError: r } = t;
  return function(...o) {
    try {
      return e.apply(void 0, o);
    } catch (s) {
      return r(s);
    }
  };
}, op = 250, Xe = (e, t) => {
  const { isRetriable: r } = t;
  return function(o) {
    const { timeout: s } = o, i = o.interval ?? op, a = Date.now() + s;
    return function u(...f) {
      return e.apply(void 0, f).catch((c) => {
        if (!r(c) || Date.now() >= a)
          throw c;
        const p = Math.round(i * Math.random());
        return p > 0 ? new Promise((h) => setTimeout(h, p)).then(() => u.apply(void 0, f)) : u.apply(void 0, f);
      });
    };
  };
}, Ye = (e, t) => {
  const { isRetriable: r } = t;
  return function(o) {
    const { timeout: s } = o, i = Date.now() + s;
    return function(...u) {
      for (; ; )
        try {
          return e.apply(void 0, u);
        } catch (f) {
          if (!r(f) || Date.now() >= i)
            throw f;
          continue;
        }
    };
  };
}, Rt = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!Rt.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !sp && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!Rt.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!Rt.isNodeError(e))
      throw e;
    if (!Rt.isChangeErrorOk(e))
      throw e;
  }
}, Ht = {
  onError: Rt.onChangeError
}, Te = {
  onError: () => {
  }
}, sp = ue.getuid ? !ue.getuid() : !1, $e = {
  isRetriable: Rt.isRetriableError
}, we = {
  attempt: {
    /* ASYNC */
    chmod: Be(ve(ee.chmod), Ht),
    chown: Be(ve(ee.chown), Ht),
    close: Be(ve(ee.close), Te),
    fsync: Be(ve(ee.fsync), Te),
    mkdir: Be(ve(ee.mkdir), Te),
    realpath: Be(ve(ee.realpath), Te),
    stat: Be(ve(ee.stat), Te),
    unlink: Be(ve(ee.unlink), Te),
    /* SYNC */
    chmodSync: Ke(ee.chmodSync, Ht),
    chownSync: Ke(ee.chownSync, Ht),
    closeSync: Ke(ee.closeSync, Te),
    existsSync: Ke(ee.existsSync, Te),
    fsyncSync: Ke(ee.fsync, Te),
    mkdirSync: Ke(ee.mkdirSync, Te),
    realpathSync: Ke(ee.realpathSync, Te),
    statSync: Ke(ee.statSync, Te),
    unlinkSync: Ke(ee.unlinkSync, Te)
  },
  retry: {
    /* ASYNC */
    close: Xe(ve(ee.close), $e),
    fsync: Xe(ve(ee.fsync), $e),
    open: Xe(ve(ee.open), $e),
    readFile: Xe(ve(ee.readFile), $e),
    rename: Xe(ve(ee.rename), $e),
    stat: Xe(ve(ee.stat), $e),
    write: Xe(ve(ee.write), $e),
    writeFile: Xe(ve(ee.writeFile), $e),
    /* SYNC */
    closeSync: Ye(ee.closeSync, $e),
    fsyncSync: Ye(ee.fsyncSync, $e),
    openSync: Ye(ee.openSync, $e),
    readFileSync: Ye(ee.readFileSync, $e),
    renameSync: Ye(ee.renameSync, $e),
    statSync: Ye(ee.statSync, $e),
    writeSync: Ye(ee.writeSync, $e),
    writeFileSync: Ye(ee.writeFileSync, $e)
  }
}, ip = "utf8", Is = 438, ap = 511, cp = {}, up = ue.geteuid ? ue.geteuid() : -1, fp = ue.getegid ? ue.getegid() : -1, lp = 1e3, dp = !!ue.getuid;
ue.getuid && ue.getuid();
const Ns = 128, hp = (e) => e instanceof Error && "code" in e, Ts = (e) => typeof e == "string", Rn = (e) => e === void 0, pp = ue.platform === "linux", Fc = ue.platform === "win32", Ho = ["SIGHUP", "SIGINT", "SIGTERM"];
Fc || Ho.push("SIGALRM", "SIGABRT", "SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
pp && Ho.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
class mp {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (Fc && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? ue.kill(ue.pid, "SIGTERM") : ue.kill(ue.pid, t));
      }
    }, this.hook = () => {
      ue.once("exit", () => this.exit());
      for (const t of Ho)
        try {
          ue.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const yp = new mp(), gp = yp.register, Ee = {
  /* VARIABLES */
  store: {},
  // filePath => purge
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), o = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${o}`;
  },
  get: (e, t, r = !0) => {
    const n = Ee.truncate(t(e));
    return n in Ee.store ? Ee.get(e, t, r) : (Ee.store[n] = r, [n, () => delete Ee.store[n]]);
  },
  purge: (e) => {
    Ee.store[e] && (delete Ee.store[e], we.attempt.unlink(e));
  },
  purgeSync: (e) => {
    Ee.store[e] && (delete Ee.store[e], we.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in Ee.store)
      Ee.purgeSync(e);
  },
  truncate: (e) => {
    const t = se.basename(e);
    if (t.length <= Ns)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Ns;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
gp(Ee.purgeSyncAll);
function Vc(e, t, r = cp) {
  if (Ts(r))
    return Vc(e, t, { encoding: r });
  const o = { timeout: r.timeout ?? lp };
  let s = null, i = null, a = null;
  try {
    const u = we.attempt.realpathSync(e), f = !!u;
    e = u || e, [i, s] = Ee.get(e, r.tmpCreate || Ee.create, r.tmpPurge !== !1);
    const c = dp && Rn(r.chown), p = Rn(r.mode);
    if (f && (c || p)) {
      const l = we.attempt.statSync(e);
      l && (r = { ...r }, c && (r.chown = { uid: l.uid, gid: l.gid }), p && (r.mode = l.mode));
    }
    if (!f) {
      const l = se.dirname(e);
      we.attempt.mkdirSync(l, {
        mode: ap,
        recursive: !0
      });
    }
    a = we.retry.openSync(o)(i, "w", r.mode || Is), r.tmpCreated && r.tmpCreated(i), Ts(t) ? we.retry.writeSync(o)(a, t, 0, r.encoding || ip) : Rn(t) || we.retry.writeSync(o)(a, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? we.retry.fsyncSync(o)(a) : we.attempt.fsync(a)), we.retry.closeSync(o)(a), a = null, r.chown && (r.chown.uid !== up || r.chown.gid !== fp) && we.attempt.chownSync(i, r.chown.uid, r.chown.gid), r.mode && r.mode !== Is && we.attempt.chmodSync(i, r.mode);
    try {
      we.retry.renameSync(o)(i, e);
    } catch (l) {
      if (!hp(l) || l.code !== "ENAMETOOLONG")
        throw l;
      we.retry.renameSync(o)(i, Ee.truncate(e));
    }
    s(), i = null;
  } finally {
    a && we.attempt.closeSync(a), i && Ee.purge(i);
  }
}
function Uc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var xt = { exports: {} }, Pn = {}, Je = {}, it = {}, On = {}, In = {}, Nn = {}, ks;
function en() {
  return ks || (ks = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
    class t {
    }
    e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    class r extends t {
      constructor(d) {
        if (super(), !e.IDENTIFIER.test(d))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = d;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return !1;
      }
      get names() {
        return { [this.str]: 1 };
      }
    }
    e.Name = r;
    class n extends t {
      constructor(d) {
        super(), this._items = typeof d == "string" ? [d] : d;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return !1;
        const d = this._items[0];
        return d === "" || d === '""';
      }
      get str() {
        var d;
        return (d = this._str) !== null && d !== void 0 ? d : this._str = this._items.reduce((g, b) => `${g}${b}`, "");
      }
      get names() {
        var d;
        return (d = this._names) !== null && d !== void 0 ? d : this._names = this._items.reduce((g, b) => (b instanceof r && (g[b.str] = (g[b.str] || 0) + 1), g), {});
      }
    }
    e._Code = n, e.nil = new n("");
    function o(_, ...d) {
      const g = [_[0]];
      let b = 0;
      for (; b < d.length; )
        a(g, d[b]), g.push(_[++b]);
      return new n(g);
    }
    e._ = o;
    const s = new n("+");
    function i(_, ...d) {
      const g = [h(_[0])];
      let b = 0;
      for (; b < d.length; )
        g.push(s), a(g, d[b]), g.push(s, h(_[++b]));
      return u(g), new n(g);
    }
    e.str = i;
    function a(_, d) {
      d instanceof n ? _.push(...d._items) : d instanceof r ? _.push(d) : _.push(p(d));
    }
    e.addCodeArg = a;
    function u(_) {
      let d = 1;
      for (; d < _.length - 1; ) {
        if (_[d] === s) {
          const g = f(_[d - 1], _[d + 1]);
          if (g !== void 0) {
            _.splice(d - 1, 3, g);
            continue;
          }
          _[d++] = "+";
        }
        d++;
      }
    }
    function f(_, d) {
      if (d === '""')
        return _;
      if (_ === '""')
        return d;
      if (typeof _ == "string")
        return d instanceof r || _[_.length - 1] !== '"' ? void 0 : typeof d != "string" ? `${_.slice(0, -1)}${d}"` : d[0] === '"' ? _.slice(0, -1) + d.slice(1) : void 0;
      if (typeof d == "string" && d[0] === '"' && !(_ instanceof r))
        return `"${_}${d.slice(1)}`;
    }
    function c(_, d) {
      return d.emptyStr() ? _ : _.emptyStr() ? d : i`${_}${d}`;
    }
    e.strConcat = c;
    function p(_) {
      return typeof _ == "number" || typeof _ == "boolean" || _ === null ? _ : h(Array.isArray(_) ? _.join(",") : _);
    }
    function l(_) {
      return new n(h(_));
    }
    e.stringify = l;
    function h(_) {
      return JSON.stringify(_).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    e.safeStringify = h;
    function $(_) {
      return typeof _ == "string" && e.IDENTIFIER.test(_) ? new n(`.${_}`) : o`[${_}]`;
    }
    e.getProperty = $;
    function v(_) {
      if (typeof _ == "string" && e.IDENTIFIER.test(_))
        return new n(`${_}`);
      throw new Error(`CodeGen: invalid export name: ${_}, use explicit $id name mapping`);
    }
    e.getEsmExportName = v;
    function m(_) {
      return new n(_.toString());
    }
    e.regexpCode = m;
  })(Nn)), Nn;
}
var Tn = {}, js;
function As() {
  return js || (js = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
    const t = /* @__PURE__ */ en();
    class r extends Error {
      constructor(f) {
        super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
      }
    }
    var n;
    (function(u) {
      u[u.Started = 0] = "Started", u[u.Completed = 1] = "Completed";
    })(n || (e.UsedValueState = n = {})), e.varKinds = {
      const: new t.Name("const"),
      let: new t.Name("let"),
      var: new t.Name("var")
    };
    class o {
      constructor({ prefixes: f, parent: c } = {}) {
        this._names = {}, this._prefixes = f, this._parent = c;
      }
      toName(f) {
        return f instanceof t.Name ? f : this.name(f);
      }
      name(f) {
        return new t.Name(this._newName(f));
      }
      _newName(f) {
        const c = this._names[f] || this._nameGroup(f);
        return `${f}${c.index++}`;
      }
      _nameGroup(f) {
        var c, p;
        if (!((p = (c = this._parent) === null || c === void 0 ? void 0 : c._prefixes) === null || p === void 0) && p.has(f) || this._prefixes && !this._prefixes.has(f))
          throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
        return this._names[f] = { prefix: f, index: 0 };
      }
    }
    e.Scope = o;
    class s extends t.Name {
      constructor(f, c) {
        super(c), this.prefix = f;
      }
      setValue(f, { property: c, itemIndex: p }) {
        this.value = f, this.scopePath = (0, t._)`.${new t.Name(c)}[${p}]`;
      }
    }
    e.ValueScopeName = s;
    const i = (0, t._)`\n`;
    class a extends o {
      constructor(f) {
        super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? i : t.nil };
      }
      get() {
        return this._scope;
      }
      name(f) {
        return new s(f, this._newName(f));
      }
      value(f, c) {
        var p;
        if (c.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const l = this.toName(f), { prefix: h } = l, $ = (p = c.key) !== null && p !== void 0 ? p : c.ref;
        let v = this._values[h];
        if (v) {
          const d = v.get($);
          if (d)
            return d;
        } else
          v = this._values[h] = /* @__PURE__ */ new Map();
        v.set($, l);
        const m = this._scope[h] || (this._scope[h] = []), _ = m.length;
        return m[_] = c.ref, l.setValue(c, { property: h, itemIndex: _ }), l;
      }
      getValue(f, c) {
        const p = this._values[f];
        if (p)
          return p.get(c);
      }
      scopeRefs(f, c = this._values) {
        return this._reduceValues(c, (p) => {
          if (p.scopePath === void 0)
            throw new Error(`CodeGen: name "${p}" has no value`);
          return (0, t._)`${f}${p.scopePath}`;
        });
      }
      scopeCode(f = this._values, c, p) {
        return this._reduceValues(f, (l) => {
          if (l.value === void 0)
            throw new Error(`CodeGen: name "${l}" has no value`);
          return l.value.code;
        }, c, p);
      }
      _reduceValues(f, c, p = {}, l) {
        let h = t.nil;
        for (const $ in f) {
          const v = f[$];
          if (!v)
            continue;
          const m = p[$] = p[$] || /* @__PURE__ */ new Map();
          v.forEach((_) => {
            if (m.has(_))
              return;
            m.set(_, n.Started);
            let d = c(_);
            if (d) {
              const g = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
              h = (0, t._)`${h}${g} ${_} = ${d};${this.opts._n}`;
            } else if (d = l == null ? void 0 : l(_))
              h = (0, t._)`${h}${d}${this.opts._n}`;
            else
              throw new r(_);
            m.set(_, n.Completed);
          });
        }
        return h;
      }
    }
    e.ValueScope = a;
  })(Tn)), Tn;
}
var zs;
function Y() {
  return zs || (zs = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
    const t = /* @__PURE__ */ en(), r = /* @__PURE__ */ As();
    var n = /* @__PURE__ */ en();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return n._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return n.str;
    } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
      return n.strConcat;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return n.nil;
    } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
      return n.getProperty;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return n.stringify;
    } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
      return n.regexpCode;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return n.Name;
    } });
    var o = /* @__PURE__ */ As();
    Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
      return o.Scope;
    } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
      return o.ValueScope;
    } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
      return o.ValueScopeName;
    } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
      return o.varKinds;
    } }), e.operators = {
      GT: new t._Code(">"),
      GTE: new t._Code(">="),
      LT: new t._Code("<"),
      LTE: new t._Code("<="),
      EQ: new t._Code("==="),
      NEQ: new t._Code("!=="),
      NOT: new t._Code("!"),
      OR: new t._Code("||"),
      AND: new t._Code("&&"),
      ADD: new t._Code("+")
    };
    class s {
      optimizeNodes() {
        return this;
      }
      optimizeNames(E, R) {
        return this;
      }
    }
    class i extends s {
      constructor(E, R, z) {
        super(), this.varKind = E, this.name = R, this.rhs = z;
      }
      render({ es5: E, _n: R }) {
        const z = E ? r.varKinds.var : this.varKind, x = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${z} ${this.name}${x};` + R;
      }
      optimizeNames(E, R) {
        if (E[this.name.str])
          return this.rhs && (this.rhs = j(this.rhs, E, R)), this;
      }
      get names() {
        return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
      }
    }
    class a extends s {
      constructor(E, R, z) {
        super(), this.lhs = E, this.rhs = R, this.sideEffects = z;
      }
      render({ _n: E }) {
        return `${this.lhs} = ${this.rhs};` + E;
      }
      optimizeNames(E, R) {
        if (!(this.lhs instanceof t.Name && !E[this.lhs.str] && !this.sideEffects))
          return this.rhs = j(this.rhs, E, R), this;
      }
      get names() {
        const E = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
        return G(E, this.rhs);
      }
    }
    class u extends a {
      constructor(E, R, z, x) {
        super(E, z, x), this.op = R;
      }
      render({ _n: E }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + E;
      }
    }
    class f extends s {
      constructor(E) {
        super(), this.label = E, this.names = {};
      }
      render({ _n: E }) {
        return `${this.label}:` + E;
      }
    }
    class c extends s {
      constructor(E) {
        super(), this.label = E, this.names = {};
      }
      render({ _n: E }) {
        return `break${this.label ? ` ${this.label}` : ""};` + E;
      }
    }
    class p extends s {
      constructor(E) {
        super(), this.error = E;
      }
      render({ _n: E }) {
        return `throw ${this.error};` + E;
      }
      get names() {
        return this.error.names;
      }
    }
    class l extends s {
      constructor(E) {
        super(), this.code = E;
      }
      render({ _n: E }) {
        return `${this.code};` + E;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(E, R) {
        return this.code = j(this.code, E, R), this;
      }
      get names() {
        return this.code instanceof t._CodeOrName ? this.code.names : {};
      }
    }
    class h extends s {
      constructor(E = []) {
        super(), this.nodes = E;
      }
      render(E) {
        return this.nodes.reduce((R, z) => R + z.render(E), "");
      }
      optimizeNodes() {
        const { nodes: E } = this;
        let R = E.length;
        for (; R--; ) {
          const z = E[R].optimizeNodes();
          Array.isArray(z) ? E.splice(R, 1, ...z) : z ? E[R] = z : E.splice(R, 1);
        }
        return E.length > 0 ? this : void 0;
      }
      optimizeNames(E, R) {
        const { nodes: z } = this;
        let x = z.length;
        for (; x--; ) {
          const B = z[x];
          B.optimizeNames(E, R) || (D(E, B.names), z.splice(x, 1));
        }
        return z.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((E, R) => V(E, R.names), {});
      }
    }
    class $ extends h {
      render(E) {
        return "{" + E._n + super.render(E) + "}" + E._n;
      }
    }
    class v extends h {
    }
    class m extends $ {
    }
    m.kind = "else";
    class _ extends $ {
      constructor(E, R) {
        super(R), this.condition = E;
      }
      render(E) {
        let R = `if(${this.condition})` + super.render(E);
        return this.else && (R += "else " + this.else.render(E)), R;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const E = this.condition;
        if (E === !0)
          return this.nodes;
        let R = this.else;
        if (R) {
          const z = R.optimizeNodes();
          R = this.else = Array.isArray(z) ? new m(z) : z;
        }
        if (R)
          return E === !1 ? R instanceof _ ? R : R.nodes : this.nodes.length ? this : new _(H(E), R instanceof _ ? [R] : R.nodes);
        if (!(E === !1 || !this.nodes.length))
          return this;
      }
      optimizeNames(E, R) {
        var z;
        if (this.else = (z = this.else) === null || z === void 0 ? void 0 : z.optimizeNames(E, R), !!(super.optimizeNames(E, R) || this.else))
          return this.condition = j(this.condition, E, R), this;
      }
      get names() {
        const E = super.names;
        return G(E, this.condition), this.else && V(E, this.else.names), E;
      }
    }
    _.kind = "if";
    class d extends $ {
    }
    d.kind = "for";
    class g extends d {
      constructor(E) {
        super(), this.iteration = E;
      }
      render(E) {
        return `for(${this.iteration})` + super.render(E);
      }
      optimizeNames(E, R) {
        if (super.optimizeNames(E, R))
          return this.iteration = j(this.iteration, E, R), this;
      }
      get names() {
        return V(super.names, this.iteration.names);
      }
    }
    class b extends d {
      constructor(E, R, z, x) {
        super(), this.varKind = E, this.name = R, this.from = z, this.to = x;
      }
      render(E) {
        const R = E.es5 ? r.varKinds.var : this.varKind, { name: z, from: x, to: B } = this;
        return `for(${R} ${z}=${x}; ${z}<${B}; ${z}++)` + super.render(E);
      }
      get names() {
        const E = G(super.names, this.from);
        return G(E, this.to);
      }
    }
    class y extends d {
      constructor(E, R, z, x) {
        super(), this.loop = E, this.varKind = R, this.name = z, this.iterable = x;
      }
      render(E) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(E);
      }
      optimizeNames(E, R) {
        if (super.optimizeNames(E, R))
          return this.iterable = j(this.iterable, E, R), this;
      }
      get names() {
        return V(super.names, this.iterable.names);
      }
    }
    class w extends $ {
      constructor(E, R, z) {
        super(), this.name = E, this.args = R, this.async = z;
      }
      render(E) {
        return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(E);
      }
    }
    w.kind = "func";
    class S extends h {
      render(E) {
        return "return " + super.render(E);
      }
    }
    S.kind = "return";
    class O extends $ {
      render(E) {
        let R = "try" + super.render(E);
        return this.catch && (R += this.catch.render(E)), this.finally && (R += this.finally.render(E)), R;
      }
      optimizeNodes() {
        var E, R;
        return super.optimizeNodes(), (E = this.catch) === null || E === void 0 || E.optimizeNodes(), (R = this.finally) === null || R === void 0 || R.optimizeNodes(), this;
      }
      optimizeNames(E, R) {
        var z, x;
        return super.optimizeNames(E, R), (z = this.catch) === null || z === void 0 || z.optimizeNames(E, R), (x = this.finally) === null || x === void 0 || x.optimizeNames(E, R), this;
      }
      get names() {
        const E = super.names;
        return this.catch && V(E, this.catch.names), this.finally && V(E, this.finally.names), E;
      }
    }
    class M extends $ {
      constructor(E) {
        super(), this.error = E;
      }
      render(E) {
        return `catch(${this.error})` + super.render(E);
      }
    }
    M.kind = "catch";
    class Z extends $ {
      render(E) {
        return "finally" + super.render(E);
      }
    }
    Z.kind = "finally";
    class C {
      constructor(E, R = {}) {
        this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...R, _n: R.lines ? `
` : "" }, this._extScope = E, this._scope = new r.Scope({ parent: E }), this._nodes = [new v()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(E) {
        return this._scope.name(E);
      }
      // reserves unique name in the external scope
      scopeName(E) {
        return this._extScope.name(E);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(E, R) {
        const z = this._extScope.value(E, R);
        return (this._values[z.prefix] || (this._values[z.prefix] = /* @__PURE__ */ new Set())).add(z), z;
      }
      getScopeValue(E, R) {
        return this._extScope.getValue(E, R);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(E) {
        return this._extScope.scopeRefs(E, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(E, R, z, x) {
        const B = this._scope.toName(R);
        return z !== void 0 && x && (this._constants[B.str] = z), this._leafNode(new i(E, B, z)), B;
      }
      // `const` declaration (`var` in es5 mode)
      const(E, R, z) {
        return this._def(r.varKinds.const, E, R, z);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(E, R, z) {
        return this._def(r.varKinds.let, E, R, z);
      }
      // `var` declaration with optional assignment
      var(E, R, z) {
        return this._def(r.varKinds.var, E, R, z);
      }
      // assignment code
      assign(E, R, z) {
        return this._leafNode(new a(E, R, z));
      }
      // `+=` code
      add(E, R) {
        return this._leafNode(new u(E, e.operators.ADD, R));
      }
      // appends passed SafeExpr to code or executes Block
      code(E) {
        return typeof E == "function" ? E() : E !== t.nil && this._leafNode(new l(E)), this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...E) {
        const R = ["{"];
        for (const [z, x] of E)
          R.length > 1 && R.push(","), R.push(z), (z !== x || this.opts.es5) && (R.push(":"), (0, t.addCodeArg)(R, x));
        return R.push("}"), new t._Code(R);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(E, R, z) {
        if (this._blockNode(new _(E)), R && z)
          this.code(R).else().code(z).endIf();
        else if (R)
          this.code(R).endIf();
        else if (z)
          throw new Error('CodeGen: "else" body without "then" body');
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(E) {
        return this._elseNode(new _(E));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new m());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(_, m);
      }
      _for(E, R) {
        return this._blockNode(E), R && this.code(R).endFor(), this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(E, R) {
        return this._for(new g(E), R);
      }
      // `for` statement for a range of values
      forRange(E, R, z, x, B = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
        const ie = this._scope.toName(E);
        return this._for(new b(B, ie, R, z), () => x(ie));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(E, R, z, x = r.varKinds.const) {
        const B = this._scope.toName(E);
        if (this.opts.es5) {
          const ie = R instanceof t.Name ? R : this.var("_arr", R);
          return this.forRange("_i", 0, (0, t._)`${ie}.length`, (oe) => {
            this.var(B, (0, t._)`${ie}[${oe}]`), z(B);
          });
        }
        return this._for(new y("of", x, B, R), () => z(B));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(E, R, z, x = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
        if (this.opts.ownProperties)
          return this.forOf(E, (0, t._)`Object.keys(${R})`, z);
        const B = this._scope.toName(E);
        return this._for(new y("in", x, B, R), () => z(B));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(d);
      }
      // `label` statement
      label(E) {
        return this._leafNode(new f(E));
      }
      // `break` statement
      break(E) {
        return this._leafNode(new c(E));
      }
      // `return` statement
      return(E) {
        const R = new S();
        if (this._blockNode(R), this.code(E), R.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(S);
      }
      // `try` statement
      try(E, R, z) {
        if (!R && !z)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const x = new O();
        if (this._blockNode(x), this.code(E), R) {
          const B = this.name("e");
          this._currNode = x.catch = new M(B), R(B);
        }
        return z && (this._currNode = x.finally = new Z(), this.code(z)), this._endBlockNode(M, Z);
      }
      // `throw` statement
      throw(E) {
        return this._leafNode(new p(E));
      }
      // start self-balancing block
      block(E, R) {
        return this._blockStarts.push(this._nodes.length), E && this.code(E).endBlock(R), this;
      }
      // end the current self-balancing block
      endBlock(E) {
        const R = this._blockStarts.pop();
        if (R === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const z = this._nodes.length - R;
        if (z < 0 || E !== void 0 && z !== E)
          throw new Error(`CodeGen: wrong number of nodes: ${z} vs ${E} expected`);
        return this._nodes.length = R, this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(E, R = t.nil, z, x) {
        return this._blockNode(new w(E, R, z)), x && this.code(x).endFunc(), this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(w);
      }
      optimize(E = 1) {
        for (; E-- > 0; )
          this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
      }
      _leafNode(E) {
        return this._currNode.nodes.push(E), this;
      }
      _blockNode(E) {
        this._currNode.nodes.push(E), this._nodes.push(E);
      }
      _endBlockNode(E, R) {
        const z = this._currNode;
        if (z instanceof E || R && z instanceof R)
          return this._nodes.pop(), this;
        throw new Error(`CodeGen: not in block "${R ? `${E.kind}/${R.kind}` : E.kind}"`);
      }
      _elseNode(E) {
        const R = this._currNode;
        if (!(R instanceof _))
          throw new Error('CodeGen: "else" without "if"');
        return this._currNode = R.else = E, this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const E = this._nodes;
        return E[E.length - 1];
      }
      set _currNode(E) {
        const R = this._nodes;
        R[R.length - 1] = E;
      }
    }
    e.CodeGen = C;
    function V(I, E) {
      for (const R in E)
        I[R] = (I[R] || 0) + (E[R] || 0);
      return I;
    }
    function G(I, E) {
      return E instanceof t._CodeOrName ? V(I, E.names) : I;
    }
    function j(I, E, R) {
      if (I instanceof t.Name)
        return z(I);
      if (!x(I))
        return I;
      return new t._Code(I._items.reduce((B, ie) => (ie instanceof t.Name && (ie = z(ie)), ie instanceof t._Code ? B.push(...ie._items) : B.push(ie), B), []));
      function z(B) {
        const ie = R[B.str];
        return ie === void 0 || E[B.str] !== 1 ? B : (delete E[B.str], ie);
      }
      function x(B) {
        return B instanceof t._Code && B._items.some((ie) => ie instanceof t.Name && E[ie.str] === 1 && R[ie.str] !== void 0);
      }
    }
    function D(I, E) {
      for (const R in E)
        I[R] = (I[R] || 0) - (E[R] || 0);
    }
    function H(I) {
      return typeof I == "boolean" || typeof I == "number" || I === null ? !I : (0, t._)`!${k(I)}`;
    }
    e.not = H;
    const K = P(e.operators.AND);
    function U(...I) {
      return I.reduce(K);
    }
    e.and = U;
    const J = P(e.operators.OR);
    function A(...I) {
      return I.reduce(J);
    }
    e.or = A;
    function P(I) {
      return (E, R) => E === t.nil ? R : R === t.nil ? E : (0, t._)`${k(E)} ${I} ${k(R)}`;
    }
    function k(I) {
      return I instanceof t.Name ? I : (0, t._)`(${I})`;
    }
  })(In)), In;
}
var te = {}, Cs;
function ne() {
  if (Cs) return te;
  Cs = 1, Object.defineProperty(te, "__esModule", { value: !0 }), te.checkStrictMode = te.getErrorPath = te.Type = te.useFunc = te.setEvaluated = te.evaluatedPropsToName = te.mergeEvaluated = te.eachItem = te.unescapeJsonPointer = te.escapeJsonPointer = te.escapeFragment = te.unescapeFragment = te.schemaRefOrVal = te.schemaHasRulesButRef = te.schemaHasRules = te.checkUnknownRules = te.alwaysValidSchema = te.toHash = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ en();
  function r(y) {
    const w = {};
    for (const S of y)
      w[S] = !0;
    return w;
  }
  te.toHash = r;
  function n(y, w) {
    return typeof w == "boolean" ? w : Object.keys(w).length === 0 ? !0 : (o(y, w), !s(w, y.self.RULES.all));
  }
  te.alwaysValidSchema = n;
  function o(y, w = y.schema) {
    const { opts: S, self: O } = y;
    if (!S.strictSchema || typeof w == "boolean")
      return;
    const M = O.RULES.keywords;
    for (const Z in w)
      M[Z] || b(y, `unknown keyword: "${Z}"`);
  }
  te.checkUnknownRules = o;
  function s(y, w) {
    if (typeof y == "boolean")
      return !y;
    for (const S in y)
      if (w[S])
        return !0;
    return !1;
  }
  te.schemaHasRules = s;
  function i(y, w) {
    if (typeof y == "boolean")
      return !y;
    for (const S in y)
      if (S !== "$ref" && w.all[S])
        return !0;
    return !1;
  }
  te.schemaHasRulesButRef = i;
  function a({ topSchemaRef: y, schemaPath: w }, S, O, M) {
    if (!M) {
      if (typeof S == "number" || typeof S == "boolean")
        return S;
      if (typeof S == "string")
        return (0, e._)`${S}`;
    }
    return (0, e._)`${y}${w}${(0, e.getProperty)(O)}`;
  }
  te.schemaRefOrVal = a;
  function u(y) {
    return p(decodeURIComponent(y));
  }
  te.unescapeFragment = u;
  function f(y) {
    return encodeURIComponent(c(y));
  }
  te.escapeFragment = f;
  function c(y) {
    return typeof y == "number" ? `${y}` : y.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  te.escapeJsonPointer = c;
  function p(y) {
    return y.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  te.unescapeJsonPointer = p;
  function l(y, w) {
    if (Array.isArray(y))
      for (const S of y)
        w(S);
    else
      w(y);
  }
  te.eachItem = l;
  function h({ mergeNames: y, mergeToName: w, mergeValues: S, resultToName: O }) {
    return (M, Z, C, V) => {
      const G = C === void 0 ? Z : C instanceof e.Name ? (Z instanceof e.Name ? y(M, Z, C) : w(M, Z, C), C) : Z instanceof e.Name ? (w(M, C, Z), Z) : S(Z, C);
      return V === e.Name && !(G instanceof e.Name) ? O(M, G) : G;
    };
  }
  te.mergeEvaluated = {
    props: h({
      mergeNames: (y, w, S) => y.if((0, e._)`${S} !== true && ${w} !== undefined`, () => {
        y.if((0, e._)`${w} === true`, () => y.assign(S, !0), () => y.assign(S, (0, e._)`${S} || {}`).code((0, e._)`Object.assign(${S}, ${w})`));
      }),
      mergeToName: (y, w, S) => y.if((0, e._)`${S} !== true`, () => {
        w === !0 ? y.assign(S, !0) : (y.assign(S, (0, e._)`${S} || {}`), v(y, S, w));
      }),
      mergeValues: (y, w) => y === !0 ? !0 : { ...y, ...w },
      resultToName: $
    }),
    items: h({
      mergeNames: (y, w, S) => y.if((0, e._)`${S} !== true && ${w} !== undefined`, () => y.assign(S, (0, e._)`${w} === true ? true : ${S} > ${w} ? ${S} : ${w}`)),
      mergeToName: (y, w, S) => y.if((0, e._)`${S} !== true`, () => y.assign(S, w === !0 ? !0 : (0, e._)`${S} > ${w} ? ${S} : ${w}`)),
      mergeValues: (y, w) => y === !0 ? !0 : Math.max(y, w),
      resultToName: (y, w) => y.var("items", w)
    })
  };
  function $(y, w) {
    if (w === !0)
      return y.var("props", !0);
    const S = y.var("props", (0, e._)`{}`);
    return w !== void 0 && v(y, S, w), S;
  }
  te.evaluatedPropsToName = $;
  function v(y, w, S) {
    Object.keys(S).forEach((O) => y.assign((0, e._)`${w}${(0, e.getProperty)(O)}`, !0));
  }
  te.setEvaluated = v;
  const m = {};
  function _(y, w) {
    return y.scopeValue("func", {
      ref: w,
      code: m[w.code] || (m[w.code] = new t._Code(w.code))
    });
  }
  te.useFunc = _;
  var d;
  (function(y) {
    y[y.Num = 0] = "Num", y[y.Str = 1] = "Str";
  })(d || (te.Type = d = {}));
  function g(y, w, S) {
    if (y instanceof e.Name) {
      const O = w === d.Num;
      return S ? O ? (0, e._)`"[" + ${y} + "]"` : (0, e._)`"['" + ${y} + "']"` : O ? (0, e._)`"/" + ${y}` : (0, e._)`"/" + ${y}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return S ? (0, e.getProperty)(y).toString() : "/" + c(y);
  }
  te.getErrorPath = g;
  function b(y, w, S = y.opts.strictSchema) {
    if (S) {
      if (w = `strict mode: ${w}`, S === !0)
        throw new Error(w);
      y.self.logger.warn(w);
    }
  }
  return te.checkStrictMode = b, te;
}
var Wt = {}, Ds;
function Le() {
  if (Ds) return Wt;
  Ds = 1, Object.defineProperty(Wt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = {
    // validation function arguments
    data: new e.Name("data"),
    // data passed to validation function
    // args passed from referencing schema
    valCxt: new e.Name("valCxt"),
    // validation/data context - should not be used directly, it is destructured to the names below
    instancePath: new e.Name("instancePath"),
    parentData: new e.Name("parentData"),
    parentDataProperty: new e.Name("parentDataProperty"),
    rootData: new e.Name("rootData"),
    // root data - same as the data passed to the first/top validation function
    dynamicAnchors: new e.Name("dynamicAnchors"),
    // used to support recursiveRef and dynamicRef
    // function scoped variables
    vErrors: new e.Name("vErrors"),
    // null or array of validation errors
    errors: new e.Name("errors"),
    // counter of validation errors
    this: new e.Name("this"),
    // "globals"
    self: new e.Name("self"),
    scope: new e.Name("scope"),
    // JTD serialize/parse name for JSON string and position
    json: new e.Name("json"),
    jsonPos: new e.Name("jsonPos"),
    jsonLen: new e.Name("jsonLen"),
    jsonPart: new e.Name("jsonPart")
  };
  return Wt.default = t, Wt;
}
var qs;
function cn() {
  return qs || (qs = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
    const t = /* @__PURE__ */ Y(), r = /* @__PURE__ */ ne(), n = /* @__PURE__ */ Le();
    e.keywordError = {
      message: ({ keyword: m }) => (0, t.str)`must pass "${m}" keyword validation`
    }, e.keyword$DataError = {
      message: ({ keyword: m, schemaType: _ }) => _ ? (0, t.str)`"${m}" keyword must be ${_} ($data)` : (0, t.str)`"${m}" keyword is invalid ($data)`
    };
    function o(m, _ = e.keywordError, d, g) {
      const { it: b } = m, { gen: y, compositeRule: w, allErrors: S } = b, O = p(m, _, d);
      g ?? (w || S) ? u(y, O) : f(b, (0, t._)`[${O}]`);
    }
    e.reportError = o;
    function s(m, _ = e.keywordError, d) {
      const { it: g } = m, { gen: b, compositeRule: y, allErrors: w } = g, S = p(m, _, d);
      u(b, S), y || w || f(g, n.default.vErrors);
    }
    e.reportExtraError = s;
    function i(m, _) {
      m.assign(n.default.errors, _), m.if((0, t._)`${n.default.vErrors} !== null`, () => m.if(_, () => m.assign((0, t._)`${n.default.vErrors}.length`, _), () => m.assign(n.default.vErrors, null)));
    }
    e.resetErrorsCount = i;
    function a({ gen: m, keyword: _, schemaValue: d, data: g, errsCount: b, it: y }) {
      if (b === void 0)
        throw new Error("ajv implementation error");
      const w = m.name("err");
      m.forRange("i", b, n.default.errors, (S) => {
        m.const(w, (0, t._)`${n.default.vErrors}[${S}]`), m.if((0, t._)`${w}.instancePath === undefined`, () => m.assign((0, t._)`${w}.instancePath`, (0, t.strConcat)(n.default.instancePath, y.errorPath))), m.assign((0, t._)`${w}.schemaPath`, (0, t.str)`${y.errSchemaPath}/${_}`), y.opts.verbose && (m.assign((0, t._)`${w}.schema`, d), m.assign((0, t._)`${w}.data`, g));
      });
    }
    e.extendErrors = a;
    function u(m, _) {
      const d = m.const("err", _);
      m.if((0, t._)`${n.default.vErrors} === null`, () => m.assign(n.default.vErrors, (0, t._)`[${d}]`), (0, t._)`${n.default.vErrors}.push(${d})`), m.code((0, t._)`${n.default.errors}++`);
    }
    function f(m, _) {
      const { gen: d, validateName: g, schemaEnv: b } = m;
      b.$async ? d.throw((0, t._)`new ${m.ValidationError}(${_})`) : (d.assign((0, t._)`${g}.errors`, _), d.return(!1));
    }
    const c = {
      keyword: new t.Name("keyword"),
      schemaPath: new t.Name("schemaPath"),
      // also used in JTD errors
      params: new t.Name("params"),
      propertyName: new t.Name("propertyName"),
      message: new t.Name("message"),
      schema: new t.Name("schema"),
      parentSchema: new t.Name("parentSchema")
    };
    function p(m, _, d) {
      const { createErrors: g } = m.it;
      return g === !1 ? (0, t._)`{}` : l(m, _, d);
    }
    function l(m, _, d = {}) {
      const { gen: g, it: b } = m, y = [
        h(b, d),
        $(m, d)
      ];
      return v(m, _, y), g.object(...y);
    }
    function h({ errorPath: m }, { instancePath: _ }) {
      const d = _ ? (0, t.str)`${m}${(0, r.getErrorPath)(_, r.Type.Str)}` : m;
      return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, d)];
    }
    function $({ keyword: m, it: { errSchemaPath: _ } }, { schemaPath: d, parentSchema: g }) {
      let b = g ? _ : (0, t.str)`${_}/${m}`;
      return d && (b = (0, t.str)`${b}${(0, r.getErrorPath)(d, r.Type.Str)}`), [c.schemaPath, b];
    }
    function v(m, { params: _, message: d }, g) {
      const { keyword: b, data: y, schemaValue: w, it: S } = m, { opts: O, propertyName: M, topSchemaRef: Z, schemaPath: C } = S;
      g.push([c.keyword, b], [c.params, typeof _ == "function" ? _(m) : _ || (0, t._)`{}`]), O.messages && g.push([c.message, typeof d == "function" ? d(m) : d]), O.verbose && g.push([c.schema, w], [c.parentSchema, (0, t._)`${Z}${C}`], [n.default.data, y]), M && g.push([c.propertyName, M]);
    }
  })(On)), On;
}
var Ls;
function _p() {
  if (Ls) return it;
  Ls = 1, Object.defineProperty(it, "__esModule", { value: !0 }), it.boolOrEmptySchema = it.topBoolOrEmptySchema = void 0;
  const e = /* @__PURE__ */ cn(), t = /* @__PURE__ */ Y(), r = /* @__PURE__ */ Le(), n = {
    message: "boolean schema is false"
  };
  function o(a) {
    const { gen: u, schema: f, validateName: c } = a;
    f === !1 ? i(a, !1) : typeof f == "object" && f.$async === !0 ? u.return(r.default.data) : (u.assign((0, t._)`${c}.errors`, null), u.return(!0));
  }
  it.topBoolOrEmptySchema = o;
  function s(a, u) {
    const { gen: f, schema: c } = a;
    c === !1 ? (f.var(u, !1), i(a)) : f.var(u, !0);
  }
  it.boolOrEmptySchema = s;
  function i(a, u) {
    const { gen: f, data: c } = a, p = {
      gen: f,
      keyword: "false schema",
      data: c,
      schema: !1,
      schemaCode: !1,
      schemaValue: !1,
      params: {},
      it: a
    };
    (0, e.reportError)(p, n, void 0, u);
  }
  return it;
}
var ge = {}, at = {}, Ms;
function Zc() {
  if (Ms) return at;
  Ms = 1, Object.defineProperty(at, "__esModule", { value: !0 }), at.getRules = at.isJSONType = void 0;
  const e = ["string", "number", "integer", "boolean", "null", "object", "array"], t = new Set(e);
  function r(o) {
    return typeof o == "string" && t.has(o);
  }
  at.isJSONType = r;
  function n() {
    const o = {
      number: { type: "number", rules: [] },
      string: { type: "string", rules: [] },
      array: { type: "array", rules: [] },
      object: { type: "object", rules: [] }
    };
    return {
      types: { ...o, integer: !0, boolean: !0, null: !0 },
      rules: [{ rules: [] }, o.number, o.string, o.array, o.object],
      post: { rules: [] },
      all: {},
      keywords: {}
    };
  }
  return at.getRules = n, at;
}
var He = {}, Fs;
function Gc() {
  if (Fs) return He;
  Fs = 1, Object.defineProperty(He, "__esModule", { value: !0 }), He.shouldUseRule = He.shouldUseGroup = He.schemaHasRulesForType = void 0;
  function e({ schema: n, self: o }, s) {
    const i = o.RULES.types[s];
    return i && i !== !0 && t(n, i);
  }
  He.schemaHasRulesForType = e;
  function t(n, o) {
    return o.rules.some((s) => r(n, s));
  }
  He.shouldUseGroup = t;
  function r(n, o) {
    var s;
    return n[o.keyword] !== void 0 || ((s = o.definition.implements) === null || s === void 0 ? void 0 : s.some((i) => n[i] !== void 0));
  }
  return He.shouldUseRule = r, He;
}
var Vs;
function tn() {
  if (Vs) return ge;
  Vs = 1, Object.defineProperty(ge, "__esModule", { value: !0 }), ge.reportTypeError = ge.checkDataTypes = ge.checkDataType = ge.coerceAndCheckDataType = ge.getJSONTypes = ge.getSchemaTypes = ge.DataType = void 0;
  const e = /* @__PURE__ */ Zc(), t = /* @__PURE__ */ Gc(), r = /* @__PURE__ */ cn(), n = /* @__PURE__ */ Y(), o = /* @__PURE__ */ ne();
  var s;
  (function(d) {
    d[d.Correct = 0] = "Correct", d[d.Wrong = 1] = "Wrong";
  })(s || (ge.DataType = s = {}));
  function i(d) {
    const g = a(d.type);
    if (g.includes("null")) {
      if (d.nullable === !1)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!g.length && d.nullable !== void 0)
        throw new Error('"nullable" cannot be used without "type"');
      d.nullable === !0 && g.push("null");
    }
    return g;
  }
  ge.getSchemaTypes = i;
  function a(d) {
    const g = Array.isArray(d) ? d : d ? [d] : [];
    if (g.every(e.isJSONType))
      return g;
    throw new Error("type must be JSONType or JSONType[]: " + g.join(","));
  }
  ge.getJSONTypes = a;
  function u(d, g) {
    const { gen: b, data: y, opts: w } = d, S = c(g, w.coerceTypes), O = g.length > 0 && !(S.length === 0 && g.length === 1 && (0, t.schemaHasRulesForType)(d, g[0]));
    if (O) {
      const M = $(g, y, w.strictNumbers, s.Wrong);
      b.if(M, () => {
        S.length ? p(d, g, S) : m(d);
      });
    }
    return O;
  }
  ge.coerceAndCheckDataType = u;
  const f = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
  function c(d, g) {
    return g ? d.filter((b) => f.has(b) || g === "array" && b === "array") : [];
  }
  function p(d, g, b) {
    const { gen: y, data: w, opts: S } = d, O = y.let("dataType", (0, n._)`typeof ${w}`), M = y.let("coerced", (0, n._)`undefined`);
    S.coerceTypes === "array" && y.if((0, n._)`${O} == 'object' && Array.isArray(${w}) && ${w}.length == 1`, () => y.assign(w, (0, n._)`${w}[0]`).assign(O, (0, n._)`typeof ${w}`).if($(g, w, S.strictNumbers), () => y.assign(M, w))), y.if((0, n._)`${M} !== undefined`);
    for (const C of b)
      (f.has(C) || C === "array" && S.coerceTypes === "array") && Z(C);
    y.else(), m(d), y.endIf(), y.if((0, n._)`${M} !== undefined`, () => {
      y.assign(w, M), l(d, M);
    });
    function Z(C) {
      switch (C) {
        case "string":
          y.elseIf((0, n._)`${O} == "number" || ${O} == "boolean"`).assign(M, (0, n._)`"" + ${w}`).elseIf((0, n._)`${w} === null`).assign(M, (0, n._)`""`);
          return;
        case "number":
          y.elseIf((0, n._)`${O} == "boolean" || ${w} === null
              || (${O} == "string" && ${w} && ${w} == +${w})`).assign(M, (0, n._)`+${w}`);
          return;
        case "integer":
          y.elseIf((0, n._)`${O} === "boolean" || ${w} === null
              || (${O} === "string" && ${w} && ${w} == +${w} && !(${w} % 1))`).assign(M, (0, n._)`+${w}`);
          return;
        case "boolean":
          y.elseIf((0, n._)`${w} === "false" || ${w} === 0 || ${w} === null`).assign(M, !1).elseIf((0, n._)`${w} === "true" || ${w} === 1`).assign(M, !0);
          return;
        case "null":
          y.elseIf((0, n._)`${w} === "" || ${w} === 0 || ${w} === false`), y.assign(M, null);
          return;
        case "array":
          y.elseIf((0, n._)`${O} === "string" || ${O} === "number"
              || ${O} === "boolean" || ${w} === null`).assign(M, (0, n._)`[${w}]`);
      }
    }
  }
  function l({ gen: d, parentData: g, parentDataProperty: b }, y) {
    d.if((0, n._)`${g} !== undefined`, () => d.assign((0, n._)`${g}[${b}]`, y));
  }
  function h(d, g, b, y = s.Correct) {
    const w = y === s.Correct ? n.operators.EQ : n.operators.NEQ;
    let S;
    switch (d) {
      case "null":
        return (0, n._)`${g} ${w} null`;
      case "array":
        S = (0, n._)`Array.isArray(${g})`;
        break;
      case "object":
        S = (0, n._)`${g} && typeof ${g} == "object" && !Array.isArray(${g})`;
        break;
      case "integer":
        S = O((0, n._)`!(${g} % 1) && !isNaN(${g})`);
        break;
      case "number":
        S = O();
        break;
      default:
        return (0, n._)`typeof ${g} ${w} ${d}`;
    }
    return y === s.Correct ? S : (0, n.not)(S);
    function O(M = n.nil) {
      return (0, n.and)((0, n._)`typeof ${g} == "number"`, M, b ? (0, n._)`isFinite(${g})` : n.nil);
    }
  }
  ge.checkDataType = h;
  function $(d, g, b, y) {
    if (d.length === 1)
      return h(d[0], g, b, y);
    let w;
    const S = (0, o.toHash)(d);
    if (S.array && S.object) {
      const O = (0, n._)`typeof ${g} != "object"`;
      w = S.null ? O : (0, n._)`!${g} || ${O}`, delete S.null, delete S.array, delete S.object;
    } else
      w = n.nil;
    S.number && delete S.integer;
    for (const O in S)
      w = (0, n.and)(w, h(O, g, b, y));
    return w;
  }
  ge.checkDataTypes = $;
  const v = {
    message: ({ schema: d }) => `must be ${d}`,
    params: ({ schema: d, schemaValue: g }) => typeof d == "string" ? (0, n._)`{type: ${d}}` : (0, n._)`{type: ${g}}`
  };
  function m(d) {
    const g = _(d);
    (0, r.reportError)(g, v);
  }
  ge.reportTypeError = m;
  function _(d) {
    const { gen: g, data: b, schema: y } = d, w = (0, o.schemaRefOrVal)(d, y, "type");
    return {
      gen: g,
      keyword: "type",
      data: b,
      schema: y.type,
      schemaCode: w,
      schemaValue: w,
      parentSchema: y,
      params: {},
      it: d
    };
  }
  return ge;
}
var At = {}, Us;
function vp() {
  if (Us) return At;
  Us = 1, Object.defineProperty(At, "__esModule", { value: !0 }), At.assignDefaults = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne();
  function r(o, s) {
    const { properties: i, items: a } = o.schema;
    if (s === "object" && i)
      for (const u in i)
        n(o, u, i[u].default);
    else s === "array" && Array.isArray(a) && a.forEach((u, f) => n(o, f, u.default));
  }
  At.assignDefaults = r;
  function n(o, s, i) {
    const { gen: a, compositeRule: u, data: f, opts: c } = o;
    if (i === void 0)
      return;
    const p = (0, e._)`${f}${(0, e.getProperty)(s)}`;
    if (u) {
      (0, t.checkStrictMode)(o, `default is ignored for: ${p}`);
      return;
    }
    let l = (0, e._)`${p} === undefined`;
    c.useDefaults === "empty" && (l = (0, e._)`${l} || ${p} === null || ${p} === ""`), a.if(l, (0, e._)`${p} = ${(0, e.stringify)(i)}`);
  }
  return At;
}
var qe = {}, ae = {}, Zs;
function Me() {
  if (Zs) return ae;
  Zs = 1, Object.defineProperty(ae, "__esModule", { value: !0 }), ae.validateUnion = ae.validateArray = ae.usePattern = ae.callValidateCode = ae.schemaProperties = ae.allSchemaProperties = ae.noPropertyInData = ae.propertyInData = ae.isOwnProperty = ae.hasPropFunc = ae.reportMissingProp = ae.checkMissingProp = ae.checkReportMissingProp = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Le(), n = /* @__PURE__ */ ne();
  function o(d, g) {
    const { gen: b, data: y, it: w } = d;
    b.if(c(b, y, g, w.opts.ownProperties), () => {
      d.setParams({ missingProperty: (0, e._)`${g}` }, !0), d.error();
    });
  }
  ae.checkReportMissingProp = o;
  function s({ gen: d, data: g, it: { opts: b } }, y, w) {
    return (0, e.or)(...y.map((S) => (0, e.and)(c(d, g, S, b.ownProperties), (0, e._)`${w} = ${S}`)));
  }
  ae.checkMissingProp = s;
  function i(d, g) {
    d.setParams({ missingProperty: g }, !0), d.error();
  }
  ae.reportMissingProp = i;
  function a(d) {
    return d.scopeValue("func", {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      ref: Object.prototype.hasOwnProperty,
      code: (0, e._)`Object.prototype.hasOwnProperty`
    });
  }
  ae.hasPropFunc = a;
  function u(d, g, b) {
    return (0, e._)`${a(d)}.call(${g}, ${b})`;
  }
  ae.isOwnProperty = u;
  function f(d, g, b, y) {
    const w = (0, e._)`${g}${(0, e.getProperty)(b)} !== undefined`;
    return y ? (0, e._)`${w} && ${u(d, g, b)}` : w;
  }
  ae.propertyInData = f;
  function c(d, g, b, y) {
    const w = (0, e._)`${g}${(0, e.getProperty)(b)} === undefined`;
    return y ? (0, e.or)(w, (0, e.not)(u(d, g, b))) : w;
  }
  ae.noPropertyInData = c;
  function p(d) {
    return d ? Object.keys(d).filter((g) => g !== "__proto__") : [];
  }
  ae.allSchemaProperties = p;
  function l(d, g) {
    return p(g).filter((b) => !(0, t.alwaysValidSchema)(d, g[b]));
  }
  ae.schemaProperties = l;
  function h({ schemaCode: d, data: g, it: { gen: b, topSchemaRef: y, schemaPath: w, errorPath: S }, it: O }, M, Z, C) {
    const V = C ? (0, e._)`${d}, ${g}, ${y}${w}` : g, G = [
      [r.default.instancePath, (0, e.strConcat)(r.default.instancePath, S)],
      [r.default.parentData, O.parentData],
      [r.default.parentDataProperty, O.parentDataProperty],
      [r.default.rootData, r.default.rootData]
    ];
    O.opts.dynamicRef && G.push([r.default.dynamicAnchors, r.default.dynamicAnchors]);
    const j = (0, e._)`${V}, ${b.object(...G)}`;
    return Z !== e.nil ? (0, e._)`${M}.call(${Z}, ${j})` : (0, e._)`${M}(${j})`;
  }
  ae.callValidateCode = h;
  const $ = (0, e._)`new RegExp`;
  function v({ gen: d, it: { opts: g } }, b) {
    const y = g.unicodeRegExp ? "u" : "", { regExp: w } = g.code, S = w(b, y);
    return d.scopeValue("pattern", {
      key: S.toString(),
      ref: S,
      code: (0, e._)`${w.code === "new RegExp" ? $ : (0, n.useFunc)(d, w)}(${b}, ${y})`
    });
  }
  ae.usePattern = v;
  function m(d) {
    const { gen: g, data: b, keyword: y, it: w } = d, S = g.name("valid");
    if (w.allErrors) {
      const M = g.let("valid", !0);
      return O(() => g.assign(M, !1)), M;
    }
    return g.var(S, !0), O(() => g.break()), S;
    function O(M) {
      const Z = g.const("len", (0, e._)`${b}.length`);
      g.forRange("i", 0, Z, (C) => {
        d.subschema({
          keyword: y,
          dataProp: C,
          dataPropType: t.Type.Num
        }, S), g.if((0, e.not)(S), M);
      });
    }
  }
  ae.validateArray = m;
  function _(d) {
    const { gen: g, schema: b, keyword: y, it: w } = d;
    if (!Array.isArray(b))
      throw new Error("ajv implementation error");
    if (b.some((Z) => (0, t.alwaysValidSchema)(w, Z)) && !w.opts.unevaluated)
      return;
    const O = g.let("valid", !1), M = g.name("_valid");
    g.block(() => b.forEach((Z, C) => {
      const V = d.subschema({
        keyword: y,
        schemaProp: C,
        compositeRule: !0
      }, M);
      g.assign(O, (0, e._)`${O} || ${M}`), d.mergeValidEvaluated(V, M) || g.if((0, e.not)(O));
    })), d.result(O, () => d.reset(), () => d.error(!0));
  }
  return ae.validateUnion = _, ae;
}
var Gs;
function $p() {
  if (Gs) return qe;
  Gs = 1, Object.defineProperty(qe, "__esModule", { value: !0 }), qe.validateKeywordUsage = qe.validSchemaType = qe.funcKeywordCode = qe.macroKeywordCode = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ Le(), r = /* @__PURE__ */ Me(), n = /* @__PURE__ */ cn();
  function o(l, h) {
    const { gen: $, keyword: v, schema: m, parentSchema: _, it: d } = l, g = h.macro.call(d.self, m, _, d), b = f($, v, g);
    d.opts.validateSchema !== !1 && d.self.validateSchema(g, !0);
    const y = $.name("valid");
    l.subschema({
      schema: g,
      schemaPath: e.nil,
      errSchemaPath: `${d.errSchemaPath}/${v}`,
      topSchemaRef: b,
      compositeRule: !0
    }, y), l.pass(y, () => l.error(!0));
  }
  qe.macroKeywordCode = o;
  function s(l, h) {
    var $;
    const { gen: v, keyword: m, schema: _, parentSchema: d, $data: g, it: b } = l;
    u(b, h);
    const y = !g && h.compile ? h.compile.call(b.self, _, d, b) : h.validate, w = f(v, m, y), S = v.let("valid");
    l.block$data(S, O), l.ok(($ = h.valid) !== null && $ !== void 0 ? $ : S);
    function O() {
      if (h.errors === !1)
        C(), h.modifying && i(l), V(() => l.error());
      else {
        const G = h.async ? M() : Z();
        h.modifying && i(l), V(() => a(l, G));
      }
    }
    function M() {
      const G = v.let("ruleErrs", null);
      return v.try(() => C((0, e._)`await `), (j) => v.assign(S, !1).if((0, e._)`${j} instanceof ${b.ValidationError}`, () => v.assign(G, (0, e._)`${j}.errors`), () => v.throw(j))), G;
    }
    function Z() {
      const G = (0, e._)`${w}.errors`;
      return v.assign(G, null), C(e.nil), G;
    }
    function C(G = h.async ? (0, e._)`await ` : e.nil) {
      const j = b.opts.passContext ? t.default.this : t.default.self, D = !("compile" in h && !g || h.schema === !1);
      v.assign(S, (0, e._)`${G}${(0, r.callValidateCode)(l, w, j, D)}`, h.modifying);
    }
    function V(G) {
      var j;
      v.if((0, e.not)((j = h.valid) !== null && j !== void 0 ? j : S), G);
    }
  }
  qe.funcKeywordCode = s;
  function i(l) {
    const { gen: h, data: $, it: v } = l;
    h.if(v.parentData, () => h.assign($, (0, e._)`${v.parentData}[${v.parentDataProperty}]`));
  }
  function a(l, h) {
    const { gen: $ } = l;
    $.if((0, e._)`Array.isArray(${h})`, () => {
      $.assign(t.default.vErrors, (0, e._)`${t.default.vErrors} === null ? ${h} : ${t.default.vErrors}.concat(${h})`).assign(t.default.errors, (0, e._)`${t.default.vErrors}.length`), (0, n.extendErrors)(l);
    }, () => l.error());
  }
  function u({ schemaEnv: l }, h) {
    if (h.async && !l.$async)
      throw new Error("async keyword in sync schema");
  }
  function f(l, h, $) {
    if ($ === void 0)
      throw new Error(`keyword "${h}" failed to compile`);
    return l.scopeValue("keyword", typeof $ == "function" ? { ref: $ } : { ref: $, code: (0, e.stringify)($) });
  }
  function c(l, h, $ = !1) {
    return !h.length || h.some((v) => v === "array" ? Array.isArray(l) : v === "object" ? l && typeof l == "object" && !Array.isArray(l) : typeof l == v || $ && typeof l > "u");
  }
  qe.validSchemaType = c;
  function p({ schema: l, opts: h, self: $, errSchemaPath: v }, m, _) {
    if (Array.isArray(m.keyword) ? !m.keyword.includes(_) : m.keyword !== _)
      throw new Error("ajv implementation error");
    const d = m.dependencies;
    if (d != null && d.some((g) => !Object.prototype.hasOwnProperty.call(l, g)))
      throw new Error(`parent schema must have dependencies of ${_}: ${d.join(",")}`);
    if (m.validateSchema && !m.validateSchema(l[_])) {
      const b = `keyword "${_}" value is invalid at path "${v}": ` + $.errorsText(m.validateSchema.errors);
      if (h.validateSchema === "log")
        $.logger.error(b);
      else
        throw new Error(b);
    }
  }
  return qe.validateKeywordUsage = p, qe;
}
var xe = {}, Ks;
function wp() {
  if (Ks) return xe;
  Ks = 1, Object.defineProperty(xe, "__esModule", { value: !0 }), xe.extendSubschemaMode = xe.extendSubschemaData = xe.getSubschema = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne();
  function r(s, { keyword: i, schemaProp: a, schema: u, schemaPath: f, errSchemaPath: c, topSchemaRef: p }) {
    if (i !== void 0 && u !== void 0)
      throw new Error('both "keyword" and "schema" passed, only one allowed');
    if (i !== void 0) {
      const l = s.schema[i];
      return a === void 0 ? {
        schema: l,
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(i)}`,
        errSchemaPath: `${s.errSchemaPath}/${i}`
      } : {
        schema: l[a],
        schemaPath: (0, e._)`${s.schemaPath}${(0, e.getProperty)(i)}${(0, e.getProperty)(a)}`,
        errSchemaPath: `${s.errSchemaPath}/${i}/${(0, t.escapeFragment)(a)}`
      };
    }
    if (u !== void 0) {
      if (f === void 0 || c === void 0 || p === void 0)
        throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
      return {
        schema: u,
        schemaPath: f,
        topSchemaRef: p,
        errSchemaPath: c
      };
    }
    throw new Error('either "keyword" or "schema" must be passed');
  }
  xe.getSubschema = r;
  function n(s, i, { dataProp: a, dataPropType: u, data: f, dataTypes: c, propertyName: p }) {
    if (f !== void 0 && a !== void 0)
      throw new Error('both "data" and "dataProp" passed, only one allowed');
    const { gen: l } = i;
    if (a !== void 0) {
      const { errorPath: $, dataPathArr: v, opts: m } = i, _ = l.let("data", (0, e._)`${i.data}${(0, e.getProperty)(a)}`, !0);
      h(_), s.errorPath = (0, e.str)`${$}${(0, t.getErrorPath)(a, u, m.jsPropertySyntax)}`, s.parentDataProperty = (0, e._)`${a}`, s.dataPathArr = [...v, s.parentDataProperty];
    }
    if (f !== void 0) {
      const $ = f instanceof e.Name ? f : l.let("data", f, !0);
      h($), p !== void 0 && (s.propertyName = p);
    }
    c && (s.dataTypes = c);
    function h($) {
      s.data = $, s.dataLevel = i.dataLevel + 1, s.dataTypes = [], i.definedProperties = /* @__PURE__ */ new Set(), s.parentData = i.data, s.dataNames = [...i.dataNames, $];
    }
  }
  xe.extendSubschemaData = n;
  function o(s, { jtdDiscriminator: i, jtdMetadata: a, compositeRule: u, createErrors: f, allErrors: c }) {
    u !== void 0 && (s.compositeRule = u), f !== void 0 && (s.createErrors = f), c !== void 0 && (s.allErrors = c), s.jtdDiscriminator = i, s.jtdMetadata = a;
  }
  return xe.extendSubschemaMode = o, xe;
}
var be = {}, kn, Js;
function Kc() {
  return Js || (Js = 1, kn = function e(t, r) {
    if (t === r) return !0;
    if (t && r && typeof t == "object" && typeof r == "object") {
      if (t.constructor !== r.constructor) return !1;
      var n, o, s;
      if (Array.isArray(t)) {
        if (n = t.length, n != r.length) return !1;
        for (o = n; o-- !== 0; )
          if (!e(t[o], r[o])) return !1;
        return !0;
      }
      if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
      if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
      if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
      if (s = Object.keys(t), n = s.length, n !== Object.keys(r).length) return !1;
      for (o = n; o-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(r, s[o])) return !1;
      for (o = n; o-- !== 0; ) {
        var i = s[o];
        if (!e(t[i], r[i])) return !1;
      }
      return !0;
    }
    return t !== t && r !== r;
  }), kn;
}
var jn = { exports: {} }, Hs;
function Ep() {
  if (Hs) return jn.exports;
  Hs = 1;
  var e = jn.exports = function(n, o, s) {
    typeof o == "function" && (s = o, o = {}), s = o.cb || s;
    var i = typeof s == "function" ? s : s.pre || function() {
    }, a = s.post || function() {
    };
    t(o, i, a, n, "", n);
  };
  e.keywords = {
    additionalItems: !0,
    items: !0,
    contains: !0,
    additionalProperties: !0,
    propertyNames: !0,
    not: !0,
    if: !0,
    then: !0,
    else: !0
  }, e.arrayKeywords = {
    items: !0,
    allOf: !0,
    anyOf: !0,
    oneOf: !0
  }, e.propsKeywords = {
    $defs: !0,
    definitions: !0,
    properties: !0,
    patternProperties: !0,
    dependencies: !0
  }, e.skipKeywords = {
    default: !0,
    enum: !0,
    const: !0,
    required: !0,
    maximum: !0,
    minimum: !0,
    exclusiveMaximum: !0,
    exclusiveMinimum: !0,
    multipleOf: !0,
    maxLength: !0,
    minLength: !0,
    pattern: !0,
    format: !0,
    maxItems: !0,
    minItems: !0,
    uniqueItems: !0,
    maxProperties: !0,
    minProperties: !0
  };
  function t(n, o, s, i, a, u, f, c, p, l) {
    if (i && typeof i == "object" && !Array.isArray(i)) {
      o(i, a, u, f, c, p, l);
      for (var h in i) {
        var $ = i[h];
        if (Array.isArray($)) {
          if (h in e.arrayKeywords)
            for (var v = 0; v < $.length; v++)
              t(n, o, s, $[v], a + "/" + h + "/" + v, u, a, h, i, v);
        } else if (h in e.propsKeywords) {
          if ($ && typeof $ == "object")
            for (var m in $)
              t(n, o, s, $[m], a + "/" + h + "/" + r(m), u, a, h, i, m);
        } else (h in e.keywords || n.allKeys && !(h in e.skipKeywords)) && t(n, o, s, $, a + "/" + h, u, a, h, i);
      }
      s(i, a, u, f, c, p, l);
    }
  }
  function r(n) {
    return n.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  return jn.exports;
}
var xs;
function un() {
  if (xs) return be;
  xs = 1, Object.defineProperty(be, "__esModule", { value: !0 }), be.getSchemaRefs = be.resolveUrl = be.normalizeId = be._getFullPath = be.getFullPath = be.inlineRef = void 0;
  const e = /* @__PURE__ */ ne(), t = Kc(), r = Ep(), n = /* @__PURE__ */ new Set([
    "type",
    "format",
    "pattern",
    "maxLength",
    "minLength",
    "maxProperties",
    "minProperties",
    "maxItems",
    "minItems",
    "maximum",
    "minimum",
    "uniqueItems",
    "multipleOf",
    "required",
    "enum",
    "const"
  ]);
  function o(v, m = !0) {
    return typeof v == "boolean" ? !0 : m === !0 ? !i(v) : m ? a(v) <= m : !1;
  }
  be.inlineRef = o;
  const s = /* @__PURE__ */ new Set([
    "$ref",
    "$recursiveRef",
    "$recursiveAnchor",
    "$dynamicRef",
    "$dynamicAnchor"
  ]);
  function i(v) {
    for (const m in v) {
      if (s.has(m))
        return !0;
      const _ = v[m];
      if (Array.isArray(_) && _.some(i) || typeof _ == "object" && i(_))
        return !0;
    }
    return !1;
  }
  function a(v) {
    let m = 0;
    for (const _ in v) {
      if (_ === "$ref")
        return 1 / 0;
      if (m++, !n.has(_) && (typeof v[_] == "object" && (0, e.eachItem)(v[_], (d) => m += a(d)), m === 1 / 0))
        return 1 / 0;
    }
    return m;
  }
  function u(v, m = "", _) {
    _ !== !1 && (m = p(m));
    const d = v.parse(m);
    return f(v, d);
  }
  be.getFullPath = u;
  function f(v, m) {
    return v.serialize(m).split("#")[0] + "#";
  }
  be._getFullPath = f;
  const c = /#\/?$/;
  function p(v) {
    return v ? v.replace(c, "") : "";
  }
  be.normalizeId = p;
  function l(v, m, _) {
    return _ = p(_), v.resolve(m, _);
  }
  be.resolveUrl = l;
  const h = /^[a-z_][-a-z0-9._]*$/i;
  function $(v, m) {
    if (typeof v == "boolean")
      return {};
    const { schemaId: _, uriResolver: d } = this.opts, g = p(v[_] || m), b = { "": g }, y = u(d, g, !1), w = {}, S = /* @__PURE__ */ new Set();
    return r(v, { allKeys: !0 }, (Z, C, V, G) => {
      if (G === void 0)
        return;
      const j = y + C;
      let D = b[G];
      typeof Z[_] == "string" && (D = H.call(this, Z[_])), K.call(this, Z.$anchor), K.call(this, Z.$dynamicAnchor), b[C] = D;
      function H(U) {
        const J = this.opts.uriResolver.resolve;
        if (U = p(D ? J(D, U) : U), S.has(U))
          throw M(U);
        S.add(U);
        let A = this.refs[U];
        return typeof A == "string" && (A = this.refs[A]), typeof A == "object" ? O(Z, A.schema, U) : U !== p(j) && (U[0] === "#" ? (O(Z, w[U], U), w[U] = Z) : this.refs[U] = j), U;
      }
      function K(U) {
        if (typeof U == "string") {
          if (!h.test(U))
            throw new Error(`invalid anchor "${U}"`);
          H.call(this, `#${U}`);
        }
      }
    }), w;
    function O(Z, C, V) {
      if (C !== void 0 && !t(Z, C))
        throw M(V);
    }
    function M(Z) {
      return new Error(`reference "${Z}" resolves to more than one schema`);
    }
  }
  return be.getSchemaRefs = $, be;
}
var Ws;
function Ft() {
  if (Ws) return Je;
  Ws = 1, Object.defineProperty(Je, "__esModule", { value: !0 }), Je.getData = Je.KeywordCxt = Je.validateFunctionCode = void 0;
  const e = /* @__PURE__ */ _p(), t = /* @__PURE__ */ tn(), r = /* @__PURE__ */ Gc(), n = /* @__PURE__ */ tn(), o = /* @__PURE__ */ vp(), s = /* @__PURE__ */ $p(), i = /* @__PURE__ */ wp(), a = /* @__PURE__ */ Y(), u = /* @__PURE__ */ Le(), f = /* @__PURE__ */ un(), c = /* @__PURE__ */ ne(), p = /* @__PURE__ */ cn();
  function l(N) {
    if (y(N) && (S(N), b(N))) {
      m(N);
      return;
    }
    h(N, () => (0, e.topBoolOrEmptySchema)(N));
  }
  Je.validateFunctionCode = l;
  function h({ gen: N, validateName: T, schema: L, schemaEnv: F, opts: W }, re) {
    W.code.es5 ? N.func(T, (0, a._)`${u.default.data}, ${u.default.valCxt}`, F.$async, () => {
      N.code((0, a._)`"use strict"; ${d(L, W)}`), v(N, W), N.code(re);
    }) : N.func(T, (0, a._)`${u.default.data}, ${$(W)}`, F.$async, () => N.code(d(L, W)).code(re));
  }
  function $(N) {
    return (0, a._)`{${u.default.instancePath}="", ${u.default.parentData}, ${u.default.parentDataProperty}, ${u.default.rootData}=${u.default.data}${N.dynamicRef ? (0, a._)`, ${u.default.dynamicAnchors}={}` : a.nil}}={}`;
  }
  function v(N, T) {
    N.if(u.default.valCxt, () => {
      N.var(u.default.instancePath, (0, a._)`${u.default.valCxt}.${u.default.instancePath}`), N.var(u.default.parentData, (0, a._)`${u.default.valCxt}.${u.default.parentData}`), N.var(u.default.parentDataProperty, (0, a._)`${u.default.valCxt}.${u.default.parentDataProperty}`), N.var(u.default.rootData, (0, a._)`${u.default.valCxt}.${u.default.rootData}`), T.dynamicRef && N.var(u.default.dynamicAnchors, (0, a._)`${u.default.valCxt}.${u.default.dynamicAnchors}`);
    }, () => {
      N.var(u.default.instancePath, (0, a._)`""`), N.var(u.default.parentData, (0, a._)`undefined`), N.var(u.default.parentDataProperty, (0, a._)`undefined`), N.var(u.default.rootData, u.default.data), T.dynamicRef && N.var(u.default.dynamicAnchors, (0, a._)`{}`);
    });
  }
  function m(N) {
    const { schema: T, opts: L, gen: F } = N;
    h(N, () => {
      L.$comment && T.$comment && G(N), Z(N), F.let(u.default.vErrors, null), F.let(u.default.errors, 0), L.unevaluated && _(N), O(N), j(N);
    });
  }
  function _(N) {
    const { gen: T, validateName: L } = N;
    N.evaluated = T.const("evaluated", (0, a._)`${L}.evaluated`), T.if((0, a._)`${N.evaluated}.dynamicProps`, () => T.assign((0, a._)`${N.evaluated}.props`, (0, a._)`undefined`)), T.if((0, a._)`${N.evaluated}.dynamicItems`, () => T.assign((0, a._)`${N.evaluated}.items`, (0, a._)`undefined`));
  }
  function d(N, T) {
    const L = typeof N == "object" && N[T.schemaId];
    return L && (T.code.source || T.code.process) ? (0, a._)`/*# sourceURL=${L} */` : a.nil;
  }
  function g(N, T) {
    if (y(N) && (S(N), b(N))) {
      w(N, T);
      return;
    }
    (0, e.boolOrEmptySchema)(N, T);
  }
  function b({ schema: N, self: T }) {
    if (typeof N == "boolean")
      return !N;
    for (const L in N)
      if (T.RULES.all[L])
        return !0;
    return !1;
  }
  function y(N) {
    return typeof N.schema != "boolean";
  }
  function w(N, T) {
    const { schema: L, gen: F, opts: W } = N;
    W.$comment && L.$comment && G(N), C(N), V(N);
    const re = F.const("_errs", u.default.errors);
    O(N, re), F.var(T, (0, a._)`${re} === ${u.default.errors}`);
  }
  function S(N) {
    (0, c.checkUnknownRules)(N), M(N);
  }
  function O(N, T) {
    if (N.opts.jtd)
      return H(N, [], !1, T);
    const L = (0, t.getSchemaTypes)(N.schema), F = (0, t.coerceAndCheckDataType)(N, L);
    H(N, L, !F, T);
  }
  function M(N) {
    const { schema: T, errSchemaPath: L, opts: F, self: W } = N;
    T.$ref && F.ignoreKeywordsWithRef && (0, c.schemaHasRulesButRef)(T, W.RULES) && W.logger.warn(`$ref: keywords ignored in schema at path "${L}"`);
  }
  function Z(N) {
    const { schema: T, opts: L } = N;
    T.default !== void 0 && L.useDefaults && L.strictSchema && (0, c.checkStrictMode)(N, "default is ignored in the schema root");
  }
  function C(N) {
    const T = N.schema[N.opts.schemaId];
    T && (N.baseId = (0, f.resolveUrl)(N.opts.uriResolver, N.baseId, T));
  }
  function V(N) {
    if (N.schema.$async && !N.schemaEnv.$async)
      throw new Error("async schema in sync schema");
  }
  function G({ gen: N, schemaEnv: T, schema: L, errSchemaPath: F, opts: W }) {
    const re = L.$comment;
    if (W.$comment === !0)
      N.code((0, a._)`${u.default.self}.logger.log(${re})`);
    else if (typeof W.$comment == "function") {
      const me = (0, a.str)`${F}/$comment`, Ce = N.scopeValue("root", { ref: T.root });
      N.code((0, a._)`${u.default.self}.opts.$comment(${re}, ${me}, ${Ce}.schema)`);
    }
  }
  function j(N) {
    const { gen: T, schemaEnv: L, validateName: F, ValidationError: W, opts: re } = N;
    L.$async ? T.if((0, a._)`${u.default.errors} === 0`, () => T.return(u.default.data), () => T.throw((0, a._)`new ${W}(${u.default.vErrors})`)) : (T.assign((0, a._)`${F}.errors`, u.default.vErrors), re.unevaluated && D(N), T.return((0, a._)`${u.default.errors} === 0`));
  }
  function D({ gen: N, evaluated: T, props: L, items: F }) {
    L instanceof a.Name && N.assign((0, a._)`${T}.props`, L), F instanceof a.Name && N.assign((0, a._)`${T}.items`, F);
  }
  function H(N, T, L, F) {
    const { gen: W, schema: re, data: me, allErrors: Ce, opts: Pe, self: Oe } = N, { RULES: ye } = Oe;
    if (re.$ref && (Pe.ignoreKeywordsWithRef || !(0, c.schemaHasRulesButRef)(re, ye))) {
      W.block(() => x(N, "$ref", ye.all.$ref.definition));
      return;
    }
    Pe.jtd || U(N, T), W.block(() => {
      for (const je of ye.rules)
        yt(je);
      yt(ye.post);
    });
    function yt(je) {
      (0, r.shouldUseGroup)(re, je) && (je.type ? (W.if((0, n.checkDataType)(je.type, me, Pe.strictNumbers)), K(N, je), T.length === 1 && T[0] === je.type && L && (W.else(), (0, n.reportTypeError)(N)), W.endIf()) : K(N, je), Ce || W.if((0, a._)`${u.default.errors} === ${F || 0}`));
    }
  }
  function K(N, T) {
    const { gen: L, schema: F, opts: { useDefaults: W } } = N;
    W && (0, o.assignDefaults)(N, T.type), L.block(() => {
      for (const re of T.rules)
        (0, r.shouldUseRule)(F, re) && x(N, re.keyword, re.definition, T.type);
    });
  }
  function U(N, T) {
    N.schemaEnv.meta || !N.opts.strictTypes || (J(N, T), N.opts.allowUnionTypes || A(N, T), P(N, N.dataTypes));
  }
  function J(N, T) {
    if (T.length) {
      if (!N.dataTypes.length) {
        N.dataTypes = T;
        return;
      }
      T.forEach((L) => {
        I(N.dataTypes, L) || R(N, `type "${L}" not allowed by context "${N.dataTypes.join(",")}"`);
      }), E(N, T);
    }
  }
  function A(N, T) {
    T.length > 1 && !(T.length === 2 && T.includes("null")) && R(N, "use allowUnionTypes to allow union type keyword");
  }
  function P(N, T) {
    const L = N.self.RULES.all;
    for (const F in L) {
      const W = L[F];
      if (typeof W == "object" && (0, r.shouldUseRule)(N.schema, W)) {
        const { type: re } = W.definition;
        re.length && !re.some((me) => k(T, me)) && R(N, `missing type "${re.join(",")}" for keyword "${F}"`);
      }
    }
  }
  function k(N, T) {
    return N.includes(T) || T === "number" && N.includes("integer");
  }
  function I(N, T) {
    return N.includes(T) || T === "integer" && N.includes("number");
  }
  function E(N, T) {
    const L = [];
    for (const F of N.dataTypes)
      I(T, F) ? L.push(F) : T.includes("integer") && F === "number" && L.push("integer");
    N.dataTypes = L;
  }
  function R(N, T) {
    const L = N.schemaEnv.baseId + N.errSchemaPath;
    T += ` at "${L}" (strictTypes)`, (0, c.checkStrictMode)(N, T, N.opts.strictTypes);
  }
  class z {
    constructor(T, L, F) {
      if ((0, s.validateKeywordUsage)(T, L, F), this.gen = T.gen, this.allErrors = T.allErrors, this.keyword = F, this.data = T.data, this.schema = T.schema[F], this.$data = L.$data && T.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, c.schemaRefOrVal)(T, this.schema, F, this.$data), this.schemaType = L.schemaType, this.parentSchema = T.schema, this.params = {}, this.it = T, this.def = L, this.$data)
        this.schemaCode = T.gen.const("vSchema", oe(this.$data, T));
      else if (this.schemaCode = this.schemaValue, !(0, s.validSchemaType)(this.schema, L.schemaType, L.allowUndefined))
        throw new Error(`${F} value must be ${JSON.stringify(L.schemaType)}`);
      ("code" in L ? L.trackErrors : L.errors !== !1) && (this.errsCount = T.gen.const("_errs", u.default.errors));
    }
    result(T, L, F) {
      this.failResult((0, a.not)(T), L, F);
    }
    failResult(T, L, F) {
      this.gen.if(T), F ? F() : this.error(), L ? (this.gen.else(), L(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    pass(T, L) {
      this.failResult((0, a.not)(T), void 0, L);
    }
    fail(T) {
      if (T === void 0) {
        this.error(), this.allErrors || this.gen.if(!1);
        return;
      }
      this.gen.if(T), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
    }
    fail$data(T) {
      if (!this.$data)
        return this.fail(T);
      const { schemaCode: L } = this;
      this.fail((0, a._)`${L} !== undefined && (${(0, a.or)(this.invalid$data(), T)})`);
    }
    error(T, L, F) {
      if (L) {
        this.setParams(L), this._error(T, F), this.setParams({});
        return;
      }
      this._error(T, F);
    }
    _error(T, L) {
      (T ? p.reportExtraError : p.reportError)(this, this.def.error, L);
    }
    $dataError() {
      (0, p.reportError)(this, this.def.$dataError || p.keyword$DataError);
    }
    reset() {
      if (this.errsCount === void 0)
        throw new Error('add "trackErrors" to keyword definition');
      (0, p.resetErrorsCount)(this.gen, this.errsCount);
    }
    ok(T) {
      this.allErrors || this.gen.if(T);
    }
    setParams(T, L) {
      L ? Object.assign(this.params, T) : this.params = T;
    }
    block$data(T, L, F = a.nil) {
      this.gen.block(() => {
        this.check$data(T, F), L();
      });
    }
    check$data(T = a.nil, L = a.nil) {
      if (!this.$data)
        return;
      const { gen: F, schemaCode: W, schemaType: re, def: me } = this;
      F.if((0, a.or)((0, a._)`${W} === undefined`, L)), T !== a.nil && F.assign(T, !0), (re.length || me.validateSchema) && (F.elseIf(this.invalid$data()), this.$dataError(), T !== a.nil && F.assign(T, !1)), F.else();
    }
    invalid$data() {
      const { gen: T, schemaCode: L, schemaType: F, def: W, it: re } = this;
      return (0, a.or)(me(), Ce());
      function me() {
        if (F.length) {
          if (!(L instanceof a.Name))
            throw new Error("ajv implementation error");
          const Pe = Array.isArray(F) ? F : [F];
          return (0, a._)`${(0, n.checkDataTypes)(Pe, L, re.opts.strictNumbers, n.DataType.Wrong)}`;
        }
        return a.nil;
      }
      function Ce() {
        if (W.validateSchema) {
          const Pe = T.scopeValue("validate$data", { ref: W.validateSchema });
          return (0, a._)`!${Pe}(${L})`;
        }
        return a.nil;
      }
    }
    subschema(T, L) {
      const F = (0, i.getSubschema)(this.it, T);
      (0, i.extendSubschemaData)(F, this.it, T), (0, i.extendSubschemaMode)(F, T);
      const W = { ...this.it, ...F, items: void 0, props: void 0 };
      return g(W, L), W;
    }
    mergeEvaluated(T, L) {
      const { it: F, gen: W } = this;
      F.opts.unevaluated && (F.props !== !0 && T.props !== void 0 && (F.props = c.mergeEvaluated.props(W, T.props, F.props, L)), F.items !== !0 && T.items !== void 0 && (F.items = c.mergeEvaluated.items(W, T.items, F.items, L)));
    }
    mergeValidEvaluated(T, L) {
      const { it: F, gen: W } = this;
      if (F.opts.unevaluated && (F.props !== !0 || F.items !== !0))
        return W.if(L, () => this.mergeEvaluated(T, a.Name)), !0;
    }
  }
  Je.KeywordCxt = z;
  function x(N, T, L, F) {
    const W = new z(N, L, T);
    "code" in L ? L.code(W, F) : W.$data && L.validate ? (0, s.funcKeywordCode)(W, L) : "macro" in L ? (0, s.macroKeywordCode)(W, L) : (L.compile || L.validate) && (0, s.funcKeywordCode)(W, L);
  }
  const B = /^\/(?:[^~]|~0|~1)*$/, ie = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
  function oe(N, { dataLevel: T, dataNames: L, dataPathArr: F }) {
    let W, re;
    if (N === "")
      return u.default.rootData;
    if (N[0] === "/") {
      if (!B.test(N))
        throw new Error(`Invalid JSON-pointer: ${N}`);
      W = N, re = u.default.rootData;
    } else {
      const Oe = ie.exec(N);
      if (!Oe)
        throw new Error(`Invalid JSON-pointer: ${N}`);
      const ye = +Oe[1];
      if (W = Oe[2], W === "#") {
        if (ye >= T)
          throw new Error(Pe("property/index", ye));
        return F[T - ye];
      }
      if (ye > T)
        throw new Error(Pe("data", ye));
      if (re = L[T - ye], !W)
        return re;
    }
    let me = re;
    const Ce = W.split("/");
    for (const Oe of Ce)
      Oe && (re = (0, a._)`${re}${(0, a.getProperty)((0, c.unescapeJsonPointer)(Oe))}`, me = (0, a._)`${me} && ${re}`);
    return me;
    function Pe(Oe, ye) {
      return `Cannot access ${Oe} ${ye} levels up, current level is ${T}`;
    }
  }
  return Je.getData = oe, Je;
}
var Bt = {}, Bs;
function fn() {
  if (Bs) return Bt;
  Bs = 1, Object.defineProperty(Bt, "__esModule", { value: !0 });
  class e extends Error {
    constructor(r) {
      super("validation failed"), this.errors = r, this.ajv = this.validation = !0;
    }
  }
  return Bt.default = e, Bt;
}
var Xt = {}, Xs;
function Vt() {
  if (Xs) return Xt;
  Xs = 1, Object.defineProperty(Xt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ un();
  class t extends Error {
    constructor(n, o, s, i) {
      super(i || `can't resolve reference ${s} from id ${o}`), this.missingRef = (0, e.resolveUrl)(n, o, s), this.missingSchema = (0, e.normalizeId)((0, e.getFullPath)(n, this.missingRef));
    }
  }
  return Xt.default = t, Xt;
}
var ke = {}, Ys;
function ln() {
  if (Ys) return ke;
  Ys = 1, Object.defineProperty(ke, "__esModule", { value: !0 }), ke.resolveSchema = ke.getCompilingSchema = ke.resolveRef = ke.compileSchema = ke.SchemaEnv = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ fn(), r = /* @__PURE__ */ Le(), n = /* @__PURE__ */ un(), o = /* @__PURE__ */ ne(), s = /* @__PURE__ */ Ft();
  class i {
    constructor(_) {
      var d;
      this.refs = {}, this.dynamicAnchors = {};
      let g;
      typeof _.schema == "object" && (g = _.schema), this.schema = _.schema, this.schemaId = _.schemaId, this.root = _.root || this, this.baseId = (d = _.baseId) !== null && d !== void 0 ? d : (0, n.normalizeId)(g == null ? void 0 : g[_.schemaId || "$id"]), this.schemaPath = _.schemaPath, this.localRefs = _.localRefs, this.meta = _.meta, this.$async = g == null ? void 0 : g.$async, this.refs = {};
    }
  }
  ke.SchemaEnv = i;
  function a(m) {
    const _ = c.call(this, m);
    if (_)
      return _;
    const d = (0, n.getFullPath)(this.opts.uriResolver, m.root.baseId), { es5: g, lines: b } = this.opts.code, { ownProperties: y } = this.opts, w = new e.CodeGen(this.scope, { es5: g, lines: b, ownProperties: y });
    let S;
    m.$async && (S = w.scopeValue("Error", {
      ref: t.default,
      code: (0, e._)`require("ajv/dist/runtime/validation_error").default`
    }));
    const O = w.scopeName("validate");
    m.validateName = O;
    const M = {
      gen: w,
      allErrors: this.opts.allErrors,
      data: r.default.data,
      parentData: r.default.parentData,
      parentDataProperty: r.default.parentDataProperty,
      dataNames: [r.default.data],
      dataPathArr: [e.nil],
      // TODO can its length be used as dataLevel if nil is removed?
      dataLevel: 0,
      dataTypes: [],
      definedProperties: /* @__PURE__ */ new Set(),
      topSchemaRef: w.scopeValue("schema", this.opts.code.source === !0 ? { ref: m.schema, code: (0, e.stringify)(m.schema) } : { ref: m.schema }),
      validateName: O,
      ValidationError: S,
      schema: m.schema,
      schemaEnv: m,
      rootId: d,
      baseId: m.baseId || d,
      schemaPath: e.nil,
      errSchemaPath: m.schemaPath || (this.opts.jtd ? "" : "#"),
      errorPath: (0, e._)`""`,
      opts: this.opts,
      self: this
    };
    let Z;
    try {
      this._compilations.add(m), (0, s.validateFunctionCode)(M), w.optimize(this.opts.code.optimize);
      const C = w.toString();
      Z = `${w.scopeRefs(r.default.scope)}return ${C}`, this.opts.code.process && (Z = this.opts.code.process(Z, m));
      const G = new Function(`${r.default.self}`, `${r.default.scope}`, Z)(this, this.scope.get());
      if (this.scope.value(O, { ref: G }), G.errors = null, G.schema = m.schema, G.schemaEnv = m, m.$async && (G.$async = !0), this.opts.code.source === !0 && (G.source = { validateName: O, validateCode: C, scopeValues: w._values }), this.opts.unevaluated) {
        const { props: j, items: D } = M;
        G.evaluated = {
          props: j instanceof e.Name ? void 0 : j,
          items: D instanceof e.Name ? void 0 : D,
          dynamicProps: j instanceof e.Name,
          dynamicItems: D instanceof e.Name
        }, G.source && (G.source.evaluated = (0, e.stringify)(G.evaluated));
      }
      return m.validate = G, m;
    } catch (C) {
      throw delete m.validate, delete m.validateName, Z && this.logger.error("Error compiling schema, function code:", Z), C;
    } finally {
      this._compilations.delete(m);
    }
  }
  ke.compileSchema = a;
  function u(m, _, d) {
    var g;
    d = (0, n.resolveUrl)(this.opts.uriResolver, _, d);
    const b = m.refs[d];
    if (b)
      return b;
    let y = l.call(this, m, d);
    if (y === void 0) {
      const w = (g = m.localRefs) === null || g === void 0 ? void 0 : g[d], { schemaId: S } = this.opts;
      w && (y = new i({ schema: w, schemaId: S, root: m, baseId: _ }));
    }
    if (y !== void 0)
      return m.refs[d] = f.call(this, y);
  }
  ke.resolveRef = u;
  function f(m) {
    return (0, n.inlineRef)(m.schema, this.opts.inlineRefs) ? m.schema : m.validate ? m : a.call(this, m);
  }
  function c(m) {
    for (const _ of this._compilations)
      if (p(_, m))
        return _;
  }
  ke.getCompilingSchema = c;
  function p(m, _) {
    return m.schema === _.schema && m.root === _.root && m.baseId === _.baseId;
  }
  function l(m, _) {
    let d;
    for (; typeof (d = this.refs[_]) == "string"; )
      _ = d;
    return d || this.schemas[_] || h.call(this, m, _);
  }
  function h(m, _) {
    const d = this.opts.uriResolver.parse(_), g = (0, n._getFullPath)(this.opts.uriResolver, d);
    let b = (0, n.getFullPath)(this.opts.uriResolver, m.baseId, void 0);
    if (Object.keys(m.schema).length > 0 && g === b)
      return v.call(this, d, m);
    const y = (0, n.normalizeId)(g), w = this.refs[y] || this.schemas[y];
    if (typeof w == "string") {
      const S = h.call(this, m, w);
      return typeof (S == null ? void 0 : S.schema) != "object" ? void 0 : v.call(this, d, S);
    }
    if (typeof (w == null ? void 0 : w.schema) == "object") {
      if (w.validate || a.call(this, w), y === (0, n.normalizeId)(_)) {
        const { schema: S } = w, { schemaId: O } = this.opts, M = S[O];
        return M && (b = (0, n.resolveUrl)(this.opts.uriResolver, b, M)), new i({ schema: S, schemaId: O, root: m, baseId: b });
      }
      return v.call(this, d, w);
    }
  }
  ke.resolveSchema = h;
  const $ = /* @__PURE__ */ new Set([
    "properties",
    "patternProperties",
    "enum",
    "dependencies",
    "definitions"
  ]);
  function v(m, { baseId: _, schema: d, root: g }) {
    var b;
    if (((b = m.fragment) === null || b === void 0 ? void 0 : b[0]) !== "/")
      return;
    for (const S of m.fragment.slice(1).split("/")) {
      if (typeof d == "boolean")
        return;
      const O = d[(0, o.unescapeFragment)(S)];
      if (O === void 0)
        return;
      d = O;
      const M = typeof d == "object" && d[this.opts.schemaId];
      !$.has(S) && M && (_ = (0, n.resolveUrl)(this.opts.uriResolver, _, M));
    }
    let y;
    if (typeof d != "boolean" && d.$ref && !(0, o.schemaHasRulesButRef)(d, this.RULES)) {
      const S = (0, n.resolveUrl)(this.opts.uriResolver, _, d.$ref);
      y = h.call(this, g, S);
    }
    const { schemaId: w } = this.opts;
    if (y = y || new i({ schema: d, schemaId: w, root: g, baseId: _ }), y.schema !== y.root.schema)
      return y;
  }
  return ke;
}
const bp = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Sp = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Rp = "object", Pp = ["$data"], Op = { $data: { type: "string", anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }] } }, Ip = !1, Np = {
  $id: bp,
  description: Sp,
  type: Rp,
  required: Pp,
  properties: Op,
  additionalProperties: Ip
};
var Yt = {}, zt = { exports: {} }, An, Qs;
function Jc() {
  if (Qs) return An;
  Qs = 1;
  const e = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), t = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
  function r(l) {
    let h = "", $ = 0, v = 0;
    for (v = 0; v < l.length; v++)
      if ($ = l[v].charCodeAt(0), $ !== 48) {
        if (!($ >= 48 && $ <= 57 || $ >= 65 && $ <= 70 || $ >= 97 && $ <= 102))
          return "";
        h += l[v];
        break;
      }
    for (v += 1; v < l.length; v++) {
      if ($ = l[v].charCodeAt(0), !($ >= 48 && $ <= 57 || $ >= 65 && $ <= 70 || $ >= 97 && $ <= 102))
        return "";
      h += l[v];
    }
    return h;
  }
  const n = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
  function o(l) {
    return l.length = 0, !0;
  }
  function s(l, h, $) {
    if (l.length) {
      const v = r(l);
      if (v !== "")
        h.push(v);
      else
        return $.error = !0, !1;
      l.length = 0;
    }
    return !0;
  }
  function i(l) {
    let h = 0;
    const $ = { error: !1, address: "", zone: "" }, v = [], m = [];
    let _ = !1, d = !1, g = s;
    for (let b = 0; b < l.length; b++) {
      const y = l[b];
      if (!(y === "[" || y === "]"))
        if (y === ":") {
          if (_ === !0 && (d = !0), !g(m, v, $))
            break;
          if (++h > 7) {
            $.error = !0;
            break;
          }
          b > 0 && l[b - 1] === ":" && (_ = !0), v.push(":");
          continue;
        } else if (y === "%") {
          if (!g(m, v, $))
            break;
          g = o;
        } else {
          m.push(y);
          continue;
        }
    }
    return m.length && (g === o ? $.zone = m.join("") : d ? v.push(m.join("")) : v.push(r(m))), $.address = v.join(""), $;
  }
  function a(l) {
    if (u(l, ":") < 2)
      return { host: l, isIPV6: !1 };
    const h = i(l);
    if (h.error)
      return { host: l, isIPV6: !1 };
    {
      let $ = h.address, v = h.address;
      return h.zone && ($ += "%" + h.zone, v += "%25" + h.zone), { host: $, isIPV6: !0, escapedHost: v };
    }
  }
  function u(l, h) {
    let $ = 0;
    for (let v = 0; v < l.length; v++)
      l[v] === h && $++;
    return $;
  }
  function f(l) {
    let h = l;
    const $ = [];
    let v = -1, m = 0;
    for (; m = h.length; ) {
      if (m === 1) {
        if (h === ".")
          break;
        if (h === "/") {
          $.push("/");
          break;
        } else {
          $.push(h);
          break;
        }
      } else if (m === 2) {
        if (h[0] === ".") {
          if (h[1] === ".")
            break;
          if (h[1] === "/") {
            h = h.slice(2);
            continue;
          }
        } else if (h[0] === "/" && (h[1] === "." || h[1] === "/")) {
          $.push("/");
          break;
        }
      } else if (m === 3 && h === "/..") {
        $.length !== 0 && $.pop(), $.push("/");
        break;
      }
      if (h[0] === ".") {
        if (h[1] === ".") {
          if (h[2] === "/") {
            h = h.slice(3);
            continue;
          }
        } else if (h[1] === "/") {
          h = h.slice(2);
          continue;
        }
      } else if (h[0] === "/" && h[1] === ".") {
        if (h[2] === "/") {
          h = h.slice(2);
          continue;
        } else if (h[2] === "." && h[3] === "/") {
          h = h.slice(3), $.length !== 0 && $.pop();
          continue;
        }
      }
      if ((v = h.indexOf("/", 1)) === -1) {
        $.push(h);
        break;
      } else
        $.push(h.slice(0, v)), h = h.slice(v);
    }
    return $.join("");
  }
  function c(l, h) {
    const $ = h !== !0 ? escape : unescape;
    return l.scheme !== void 0 && (l.scheme = $(l.scheme)), l.userinfo !== void 0 && (l.userinfo = $(l.userinfo)), l.host !== void 0 && (l.host = $(l.host)), l.path !== void 0 && (l.path = $(l.path)), l.query !== void 0 && (l.query = $(l.query)), l.fragment !== void 0 && (l.fragment = $(l.fragment)), l;
  }
  function p(l) {
    const h = [];
    if (l.userinfo !== void 0 && (h.push(l.userinfo), h.push("@")), l.host !== void 0) {
      let $ = unescape(l.host);
      if (!t($)) {
        const v = a($);
        v.isIPV6 === !0 ? $ = `[${v.escapedHost}]` : $ = l.host;
      }
      h.push($);
    }
    return (typeof l.port == "number" || typeof l.port == "string") && (h.push(":"), h.push(String(l.port))), h.length ? h.join("") : void 0;
  }
  return An = {
    nonSimpleDomain: n,
    recomposeAuthority: p,
    normalizeComponentEncoding: c,
    removeDotSegments: f,
    isIPv4: t,
    isUUID: e,
    normalizeIPv6: a,
    stringArrayToHexStripped: r
  }, An;
}
var zn, ei;
function Tp() {
  if (ei) return zn;
  ei = 1;
  const { isUUID: e } = Jc(), t = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu, r = (
    /** @type {const} */
    [
      "http",
      "https",
      "ws",
      "wss",
      "urn",
      "urn:uuid"
    ]
  );
  function n(y) {
    return r.indexOf(
      /** @type {*} */
      y
    ) !== -1;
  }
  function o(y) {
    return y.secure === !0 ? !0 : y.secure === !1 ? !1 : y.scheme ? y.scheme.length === 3 && (y.scheme[0] === "w" || y.scheme[0] === "W") && (y.scheme[1] === "s" || y.scheme[1] === "S") && (y.scheme[2] === "s" || y.scheme[2] === "S") : !1;
  }
  function s(y) {
    return y.host || (y.error = y.error || "HTTP URIs must have a host."), y;
  }
  function i(y) {
    const w = String(y.scheme).toLowerCase() === "https";
    return (y.port === (w ? 443 : 80) || y.port === "") && (y.port = void 0), y.path || (y.path = "/"), y;
  }
  function a(y) {
    return y.secure = o(y), y.resourceName = (y.path || "/") + (y.query ? "?" + y.query : ""), y.path = void 0, y.query = void 0, y;
  }
  function u(y) {
    if ((y.port === (o(y) ? 443 : 80) || y.port === "") && (y.port = void 0), typeof y.secure == "boolean" && (y.scheme = y.secure ? "wss" : "ws", y.secure = void 0), y.resourceName) {
      const [w, S] = y.resourceName.split("?");
      y.path = w && w !== "/" ? w : void 0, y.query = S, y.resourceName = void 0;
    }
    return y.fragment = void 0, y;
  }
  function f(y, w) {
    if (!y.path)
      return y.error = "URN can not be parsed", y;
    const S = y.path.match(t);
    if (S) {
      const O = w.scheme || y.scheme || "urn";
      y.nid = S[1].toLowerCase(), y.nss = S[2];
      const M = `${O}:${w.nid || y.nid}`, Z = b(M);
      y.path = void 0, Z && (y = Z.parse(y, w));
    } else
      y.error = y.error || "URN can not be parsed.";
    return y;
  }
  function c(y, w) {
    if (y.nid === void 0)
      throw new Error("URN without nid cannot be serialized");
    const S = w.scheme || y.scheme || "urn", O = y.nid.toLowerCase(), M = `${S}:${w.nid || O}`, Z = b(M);
    Z && (y = Z.serialize(y, w));
    const C = y, V = y.nss;
    return C.path = `${O || w.nid}:${V}`, w.skipEscape = !0, C;
  }
  function p(y, w) {
    const S = y;
    return S.uuid = S.nss, S.nss = void 0, !w.tolerant && (!S.uuid || !e(S.uuid)) && (S.error = S.error || "UUID is not valid."), S;
  }
  function l(y) {
    const w = y;
    return w.nss = (y.uuid || "").toLowerCase(), w;
  }
  const h = (
    /** @type {SchemeHandler} */
    {
      scheme: "http",
      domainHost: !0,
      parse: s,
      serialize: i
    }
  ), $ = (
    /** @type {SchemeHandler} */
    {
      scheme: "https",
      domainHost: h.domainHost,
      parse: s,
      serialize: i
    }
  ), v = (
    /** @type {SchemeHandler} */
    {
      scheme: "ws",
      domainHost: !0,
      parse: a,
      serialize: u
    }
  ), m = (
    /** @type {SchemeHandler} */
    {
      scheme: "wss",
      domainHost: v.domainHost,
      parse: v.parse,
      serialize: v.serialize
    }
  ), g = (
    /** @type {Record<SchemeName, SchemeHandler>} */
    {
      http: h,
      https: $,
      ws: v,
      wss: m,
      urn: (
        /** @type {SchemeHandler} */
        {
          scheme: "urn",
          parse: f,
          serialize: c,
          skipNormalize: !0
        }
      ),
      "urn:uuid": (
        /** @type {SchemeHandler} */
        {
          scheme: "urn:uuid",
          parse: p,
          serialize: l,
          skipNormalize: !0
        }
      )
    }
  );
  Object.setPrototypeOf(g, null);
  function b(y) {
    return y && (g[
      /** @type {SchemeName} */
      y
    ] || g[
      /** @type {SchemeName} */
      y.toLowerCase()
    ]) || void 0;
  }
  return zn = {
    wsIsSecure: o,
    SCHEMES: g,
    isValidSchemeName: n,
    getSchemeHandler: b
  }, zn;
}
var ti;
function kp() {
  if (ti) return zt.exports;
  ti = 1;
  const { normalizeIPv6: e, removeDotSegments: t, recomposeAuthority: r, normalizeComponentEncoding: n, isIPv4: o, nonSimpleDomain: s } = Jc(), { SCHEMES: i, getSchemeHandler: a } = Tp();
  function u(m, _) {
    return typeof m == "string" ? m = /** @type {T} */
    l($(m, _), _) : typeof m == "object" && (m = /** @type {T} */
    $(l(m, _), _)), m;
  }
  function f(m, _, d) {
    const g = d ? Object.assign({ scheme: "null" }, d) : { scheme: "null" }, b = c($(m, g), $(_, g), g, !0);
    return g.skipEscape = !0, l(b, g);
  }
  function c(m, _, d, g) {
    const b = {};
    return g || (m = $(l(m, d), d), _ = $(l(_, d), d)), d = d || {}, !d.tolerant && _.scheme ? (b.scheme = _.scheme, b.userinfo = _.userinfo, b.host = _.host, b.port = _.port, b.path = t(_.path || ""), b.query = _.query) : (_.userinfo !== void 0 || _.host !== void 0 || _.port !== void 0 ? (b.userinfo = _.userinfo, b.host = _.host, b.port = _.port, b.path = t(_.path || ""), b.query = _.query) : (_.path ? (_.path[0] === "/" ? b.path = t(_.path) : ((m.userinfo !== void 0 || m.host !== void 0 || m.port !== void 0) && !m.path ? b.path = "/" + _.path : m.path ? b.path = m.path.slice(0, m.path.lastIndexOf("/") + 1) + _.path : b.path = _.path, b.path = t(b.path)), b.query = _.query) : (b.path = m.path, _.query !== void 0 ? b.query = _.query : b.query = m.query), b.userinfo = m.userinfo, b.host = m.host, b.port = m.port), b.scheme = m.scheme), b.fragment = _.fragment, b;
  }
  function p(m, _, d) {
    return typeof m == "string" ? (m = unescape(m), m = l(n($(m, d), !0), { ...d, skipEscape: !0 })) : typeof m == "object" && (m = l(n(m, !0), { ...d, skipEscape: !0 })), typeof _ == "string" ? (_ = unescape(_), _ = l(n($(_, d), !0), { ...d, skipEscape: !0 })) : typeof _ == "object" && (_ = l(n(_, !0), { ...d, skipEscape: !0 })), m.toLowerCase() === _.toLowerCase();
  }
  function l(m, _) {
    const d = {
      host: m.host,
      scheme: m.scheme,
      userinfo: m.userinfo,
      port: m.port,
      path: m.path,
      query: m.query,
      nid: m.nid,
      nss: m.nss,
      uuid: m.uuid,
      fragment: m.fragment,
      reference: m.reference,
      resourceName: m.resourceName,
      secure: m.secure,
      error: ""
    }, g = Object.assign({}, _), b = [], y = a(g.scheme || d.scheme);
    y && y.serialize && y.serialize(d, g), d.path !== void 0 && (g.skipEscape ? d.path = unescape(d.path) : (d.path = escape(d.path), d.scheme !== void 0 && (d.path = d.path.split("%3A").join(":")))), g.reference !== "suffix" && d.scheme && b.push(d.scheme, ":");
    const w = r(d);
    if (w !== void 0 && (g.reference !== "suffix" && b.push("//"), b.push(w), d.path && d.path[0] !== "/" && b.push("/")), d.path !== void 0) {
      let S = d.path;
      !g.absolutePath && (!y || !y.absolutePath) && (S = t(S)), w === void 0 && S[0] === "/" && S[1] === "/" && (S = "/%2F" + S.slice(2)), b.push(S);
    }
    return d.query !== void 0 && b.push("?", d.query), d.fragment !== void 0 && b.push("#", d.fragment), b.join("");
  }
  const h = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
  function $(m, _) {
    const d = Object.assign({}, _), g = {
      scheme: void 0,
      userinfo: void 0,
      host: "",
      port: void 0,
      path: "",
      query: void 0,
      fragment: void 0
    };
    let b = !1;
    d.reference === "suffix" && (d.scheme ? m = d.scheme + ":" + m : m = "//" + m);
    const y = m.match(h);
    if (y) {
      if (g.scheme = y[1], g.userinfo = y[3], g.host = y[4], g.port = parseInt(y[5], 10), g.path = y[6] || "", g.query = y[7], g.fragment = y[8], isNaN(g.port) && (g.port = y[5]), g.host)
        if (o(g.host) === !1) {
          const O = e(g.host);
          g.host = O.host.toLowerCase(), b = O.isIPV6;
        } else
          b = !0;
      g.scheme === void 0 && g.userinfo === void 0 && g.host === void 0 && g.port === void 0 && g.query === void 0 && !g.path ? g.reference = "same-document" : g.scheme === void 0 ? g.reference = "relative" : g.fragment === void 0 ? g.reference = "absolute" : g.reference = "uri", d.reference && d.reference !== "suffix" && d.reference !== g.reference && (g.error = g.error || "URI is not a " + d.reference + " reference.");
      const w = a(d.scheme || g.scheme);
      if (!d.unicodeSupport && (!w || !w.unicodeSupport) && g.host && (d.domainHost || w && w.domainHost) && b === !1 && s(g.host))
        try {
          g.host = URL.domainToASCII(g.host.toLowerCase());
        } catch (S) {
          g.error = g.error || "Host's domain name can not be converted to ASCII: " + S;
        }
      (!w || w && !w.skipNormalize) && (m.indexOf("%") !== -1 && (g.scheme !== void 0 && (g.scheme = unescape(g.scheme)), g.host !== void 0 && (g.host = unescape(g.host))), g.path && (g.path = escape(unescape(g.path))), g.fragment && (g.fragment = encodeURI(decodeURIComponent(g.fragment)))), w && w.parse && w.parse(g, d);
    } else
      g.error = g.error || "URI can not be parsed.";
    return g;
  }
  const v = {
    SCHEMES: i,
    normalize: u,
    resolve: f,
    resolveComponent: c,
    equal: p,
    serialize: l,
    parse: $
  };
  return zt.exports = v, zt.exports.default = v, zt.exports.fastUri = v, zt.exports;
}
var ri;
function jp() {
  if (ri) return Yt;
  ri = 1, Object.defineProperty(Yt, "__esModule", { value: !0 });
  const e = kp();
  return e.code = 'require("ajv/dist/runtime/uri").default', Yt.default = e, Yt;
}
var ni;
function Hc() {
  return ni || (ni = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
    var t = /* @__PURE__ */ Ft();
    Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
      return t.KeywordCxt;
    } });
    var r = /* @__PURE__ */ Y();
    Object.defineProperty(e, "_", { enumerable: !0, get: function() {
      return r._;
    } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
      return r.str;
    } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
      return r.stringify;
    } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
      return r.nil;
    } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
      return r.Name;
    } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
      return r.CodeGen;
    } });
    const n = /* @__PURE__ */ fn(), o = /* @__PURE__ */ Vt(), s = /* @__PURE__ */ Zc(), i = /* @__PURE__ */ ln(), a = /* @__PURE__ */ Y(), u = /* @__PURE__ */ un(), f = /* @__PURE__ */ tn(), c = /* @__PURE__ */ ne(), p = Np, l = /* @__PURE__ */ jp(), h = (A, P) => new RegExp(A, P);
    h.code = "new RegExp";
    const $ = ["removeAdditional", "useDefaults", "coerceTypes"], v = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]), m = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    }, _ = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    }, d = 200;
    function g(A) {
      var P, k, I, E, R, z, x, B, ie, oe, N, T, L, F, W, re, me, Ce, Pe, Oe, ye, yt, je, gn, _n;
      const Tt = A.strict, vn = (P = A.code) === null || P === void 0 ? void 0 : P.optimize, ns = vn === !0 || vn === void 0 ? 1 : vn || 0, os = (I = (k = A.code) === null || k === void 0 ? void 0 : k.regExp) !== null && I !== void 0 ? I : h, Eu = (E = A.uriResolver) !== null && E !== void 0 ? E : l.default;
      return {
        strictSchema: (z = (R = A.strictSchema) !== null && R !== void 0 ? R : Tt) !== null && z !== void 0 ? z : !0,
        strictNumbers: (B = (x = A.strictNumbers) !== null && x !== void 0 ? x : Tt) !== null && B !== void 0 ? B : !0,
        strictTypes: (oe = (ie = A.strictTypes) !== null && ie !== void 0 ? ie : Tt) !== null && oe !== void 0 ? oe : "log",
        strictTuples: (T = (N = A.strictTuples) !== null && N !== void 0 ? N : Tt) !== null && T !== void 0 ? T : "log",
        strictRequired: (F = (L = A.strictRequired) !== null && L !== void 0 ? L : Tt) !== null && F !== void 0 ? F : !1,
        code: A.code ? { ...A.code, optimize: ns, regExp: os } : { optimize: ns, regExp: os },
        loopRequired: (W = A.loopRequired) !== null && W !== void 0 ? W : d,
        loopEnum: (re = A.loopEnum) !== null && re !== void 0 ? re : d,
        meta: (me = A.meta) !== null && me !== void 0 ? me : !0,
        messages: (Ce = A.messages) !== null && Ce !== void 0 ? Ce : !0,
        inlineRefs: (Pe = A.inlineRefs) !== null && Pe !== void 0 ? Pe : !0,
        schemaId: (Oe = A.schemaId) !== null && Oe !== void 0 ? Oe : "$id",
        addUsedSchema: (ye = A.addUsedSchema) !== null && ye !== void 0 ? ye : !0,
        validateSchema: (yt = A.validateSchema) !== null && yt !== void 0 ? yt : !0,
        validateFormats: (je = A.validateFormats) !== null && je !== void 0 ? je : !0,
        unicodeRegExp: (gn = A.unicodeRegExp) !== null && gn !== void 0 ? gn : !0,
        int32range: (_n = A.int32range) !== null && _n !== void 0 ? _n : !0,
        uriResolver: Eu
      };
    }
    class b {
      constructor(P = {}) {
        this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), P = this.opts = { ...P, ...g(P) };
        const { es5: k, lines: I } = this.opts.code;
        this.scope = new a.ValueScope({ scope: {}, prefixes: v, es5: k, lines: I }), this.logger = V(P.logger);
        const E = P.validateFormats;
        P.validateFormats = !1, this.RULES = (0, s.getRules)(), y.call(this, m, P, "NOT SUPPORTED"), y.call(this, _, P, "DEPRECATED", "warn"), this._metaOpts = Z.call(this), P.formats && O.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), P.keywords && M.call(this, P.keywords), typeof P.meta == "object" && this.addMetaSchema(P.meta), S.call(this), P.validateFormats = E;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data: P, meta: k, schemaId: I } = this.opts;
        let E = p;
        I === "id" && (E = { ...p }, E.id = E.$id, delete E.$id), k && P && this.addMetaSchema(E, E[I], !1);
      }
      defaultMeta() {
        const { meta: P, schemaId: k } = this.opts;
        return this.opts.defaultMeta = typeof P == "object" ? P[k] || P : void 0;
      }
      validate(P, k) {
        let I;
        if (typeof P == "string") {
          if (I = this.getSchema(P), !I)
            throw new Error(`no schema with key or ref "${P}"`);
        } else
          I = this.compile(P);
        const E = I(k);
        return "$async" in I || (this.errors = I.errors), E;
      }
      compile(P, k) {
        const I = this._addSchema(P, k);
        return I.validate || this._compileSchemaEnv(I);
      }
      compileAsync(P, k) {
        if (typeof this.opts.loadSchema != "function")
          throw new Error("options.loadSchema should be a function");
        const { loadSchema: I } = this.opts;
        return E.call(this, P, k);
        async function E(oe, N) {
          await R.call(this, oe.$schema);
          const T = this._addSchema(oe, N);
          return T.validate || z.call(this, T);
        }
        async function R(oe) {
          oe && !this.getSchema(oe) && await E.call(this, { $ref: oe }, !0);
        }
        async function z(oe) {
          try {
            return this._compileSchemaEnv(oe);
          } catch (N) {
            if (!(N instanceof o.default))
              throw N;
            return x.call(this, N), await B.call(this, N.missingSchema), z.call(this, oe);
          }
        }
        function x({ missingSchema: oe, missingRef: N }) {
          if (this.refs[oe])
            throw new Error(`AnySchema ${oe} is loaded but ${N} cannot be resolved`);
        }
        async function B(oe) {
          const N = await ie.call(this, oe);
          this.refs[oe] || await R.call(this, N.$schema), this.refs[oe] || this.addSchema(N, oe, k);
        }
        async function ie(oe) {
          const N = this._loading[oe];
          if (N)
            return N;
          try {
            return await (this._loading[oe] = I(oe));
          } finally {
            delete this._loading[oe];
          }
        }
      }
      // Adds schema to the instance
      addSchema(P, k, I, E = this.opts.validateSchema) {
        if (Array.isArray(P)) {
          for (const z of P)
            this.addSchema(z, void 0, I, E);
          return this;
        }
        let R;
        if (typeof P == "object") {
          const { schemaId: z } = this.opts;
          if (R = P[z], R !== void 0 && typeof R != "string")
            throw new Error(`schema ${z} must be string`);
        }
        return k = (0, u.normalizeId)(k || R), this._checkUnique(k), this.schemas[k] = this._addSchema(P, I, k, E, !0), this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(P, k, I = this.opts.validateSchema) {
        return this.addSchema(P, k, !0, I), this;
      }
      //  Validate schema against its meta-schema
      validateSchema(P, k) {
        if (typeof P == "boolean")
          return !0;
        let I;
        if (I = P.$schema, I !== void 0 && typeof I != "string")
          throw new Error("$schema must be a string");
        if (I = I || this.opts.defaultMeta || this.defaultMeta(), !I)
          return this.logger.warn("meta-schema not available"), this.errors = null, !0;
        const E = this.validate(I, P);
        if (!E && k) {
          const R = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(R);
          else
            throw new Error(R);
        }
        return E;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(P) {
        let k;
        for (; typeof (k = w.call(this, P)) == "string"; )
          P = k;
        if (k === void 0) {
          const { schemaId: I } = this.opts, E = new i.SchemaEnv({ schema: {}, schemaId: I });
          if (k = i.resolveSchema.call(this, E, P), !k)
            return;
          this.refs[P] = k;
        }
        return k.validate || this._compileSchemaEnv(k);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(P) {
        if (P instanceof RegExp)
          return this._removeAllSchemas(this.schemas, P), this._removeAllSchemas(this.refs, P), this;
        switch (typeof P) {
          case "undefined":
            return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
          case "string": {
            const k = w.call(this, P);
            return typeof k == "object" && this._cache.delete(k.schema), delete this.schemas[P], delete this.refs[P], this;
          }
          case "object": {
            const k = P;
            this._cache.delete(k);
            let I = P[this.opts.schemaId];
            return I && (I = (0, u.normalizeId)(I), delete this.schemas[I], delete this.refs[I]), this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(P) {
        for (const k of P)
          this.addKeyword(k);
        return this;
      }
      addKeyword(P, k) {
        let I;
        if (typeof P == "string")
          I = P, typeof k == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), k.keyword = I);
        else if (typeof P == "object" && k === void 0) {
          if (k = P, I = k.keyword, Array.isArray(I) && !I.length)
            throw new Error("addKeywords: keyword must be string or non-empty array");
        } else
          throw new Error("invalid addKeywords parameters");
        if (j.call(this, I, k), !k)
          return (0, c.eachItem)(I, (R) => D.call(this, R)), this;
        K.call(this, k);
        const E = {
          ...k,
          type: (0, f.getJSONTypes)(k.type),
          schemaType: (0, f.getJSONTypes)(k.schemaType)
        };
        return (0, c.eachItem)(I, E.type.length === 0 ? (R) => D.call(this, R, E) : (R) => E.type.forEach((z) => D.call(this, R, E, z))), this;
      }
      getKeyword(P) {
        const k = this.RULES.all[P];
        return typeof k == "object" ? k.definition : !!k;
      }
      // Remove keyword
      removeKeyword(P) {
        const { RULES: k } = this;
        delete k.keywords[P], delete k.all[P];
        for (const I of k.rules) {
          const E = I.rules.findIndex((R) => R.keyword === P);
          E >= 0 && I.rules.splice(E, 1);
        }
        return this;
      }
      // Add format
      addFormat(P, k) {
        return typeof k == "string" && (k = new RegExp(k)), this.formats[P] = k, this;
      }
      errorsText(P = this.errors, { separator: k = ", ", dataVar: I = "data" } = {}) {
        return !P || P.length === 0 ? "No errors" : P.map((E) => `${I}${E.instancePath} ${E.message}`).reduce((E, R) => E + k + R);
      }
      $dataMetaSchema(P, k) {
        const I = this.RULES.all;
        P = JSON.parse(JSON.stringify(P));
        for (const E of k) {
          const R = E.split("/").slice(1);
          let z = P;
          for (const x of R)
            z = z[x];
          for (const x in I) {
            const B = I[x];
            if (typeof B != "object")
              continue;
            const { $data: ie } = B.definition, oe = z[x];
            ie && oe && (z[x] = J(oe));
          }
        }
        return P;
      }
      _removeAllSchemas(P, k) {
        for (const I in P) {
          const E = P[I];
          (!k || k.test(I)) && (typeof E == "string" ? delete P[I] : E && !E.meta && (this._cache.delete(E.schema), delete P[I]));
        }
      }
      _addSchema(P, k, I, E = this.opts.validateSchema, R = this.opts.addUsedSchema) {
        let z;
        const { schemaId: x } = this.opts;
        if (typeof P == "object")
          z = P[x];
        else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          if (typeof P != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let B = this._cache.get(P);
        if (B !== void 0)
          return B;
        I = (0, u.normalizeId)(z || I);
        const ie = u.getSchemaRefs.call(this, P, I);
        return B = new i.SchemaEnv({ schema: P, schemaId: x, meta: k, baseId: I, localRefs: ie }), this._cache.set(B.schema, B), R && !I.startsWith("#") && (I && this._checkUnique(I), this.refs[I] = B), E && this.validateSchema(P, !0), B;
      }
      _checkUnique(P) {
        if (this.schemas[P] || this.refs[P])
          throw new Error(`schema with key or id "${P}" already exists`);
      }
      _compileSchemaEnv(P) {
        if (P.meta ? this._compileMetaSchema(P) : i.compileSchema.call(this, P), !P.validate)
          throw new Error("ajv implementation error");
        return P.validate;
      }
      _compileMetaSchema(P) {
        const k = this.opts;
        this.opts = this._metaOpts;
        try {
          i.compileSchema.call(this, P);
        } finally {
          this.opts = k;
        }
      }
    }
    b.ValidationError = n.default, b.MissingRefError = o.default, e.default = b;
    function y(A, P, k, I = "error") {
      for (const E in A) {
        const R = E;
        R in P && this.logger[I](`${k}: option ${E}. ${A[R]}`);
      }
    }
    function w(A) {
      return A = (0, u.normalizeId)(A), this.schemas[A] || this.refs[A];
    }
    function S() {
      const A = this.opts.schemas;
      if (A)
        if (Array.isArray(A))
          this.addSchema(A);
        else
          for (const P in A)
            this.addSchema(A[P], P);
    }
    function O() {
      for (const A in this.opts.formats) {
        const P = this.opts.formats[A];
        P && this.addFormat(A, P);
      }
    }
    function M(A) {
      if (Array.isArray(A)) {
        this.addVocabulary(A);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const P in A) {
        const k = A[P];
        k.keyword || (k.keyword = P), this.addKeyword(k);
      }
    }
    function Z() {
      const A = { ...this.opts };
      for (const P of $)
        delete A[P];
      return A;
    }
    const C = { log() {
    }, warn() {
    }, error() {
    } };
    function V(A) {
      if (A === !1)
        return C;
      if (A === void 0)
        return console;
      if (A.log && A.warn && A.error)
        return A;
      throw new Error("logger must implement log, warn and error methods");
    }
    const G = /^[a-z_$][a-z0-9_$:-]*$/i;
    function j(A, P) {
      const { RULES: k } = this;
      if ((0, c.eachItem)(A, (I) => {
        if (k.keywords[I])
          throw new Error(`Keyword ${I} is already defined`);
        if (!G.test(I))
          throw new Error(`Keyword ${I} has invalid name`);
      }), !!P && P.$data && !("code" in P || "validate" in P))
        throw new Error('$data keyword must have "code" or "validate" function');
    }
    function D(A, P, k) {
      var I;
      const E = P == null ? void 0 : P.post;
      if (k && E)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: R } = this;
      let z = E ? R.post : R.rules.find(({ type: B }) => B === k);
      if (z || (z = { type: k, rules: [] }, R.rules.push(z)), R.keywords[A] = !0, !P)
        return;
      const x = {
        keyword: A,
        definition: {
          ...P,
          type: (0, f.getJSONTypes)(P.type),
          schemaType: (0, f.getJSONTypes)(P.schemaType)
        }
      };
      P.before ? H.call(this, z, x, P.before) : z.rules.push(x), R.all[A] = x, (I = P.implements) === null || I === void 0 || I.forEach((B) => this.addKeyword(B));
    }
    function H(A, P, k) {
      const I = A.rules.findIndex((E) => E.keyword === k);
      I >= 0 ? A.rules.splice(I, 0, P) : (A.rules.push(P), this.logger.warn(`rule ${k} is not defined`));
    }
    function K(A) {
      let { metaSchema: P } = A;
      P !== void 0 && (A.$data && this.opts.$data && (P = J(P)), A.validateSchema = this.compile(P, !0));
    }
    const U = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function J(A) {
      return { anyOf: [A, U] };
    }
  })(Pn)), Pn;
}
var Qt = {}, er = {}, tr = {}, oi;
function Ap() {
  if (oi) return tr;
  oi = 1, Object.defineProperty(tr, "__esModule", { value: !0 });
  const e = {
    keyword: "id",
    code() {
      throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
    }
  };
  return tr.default = e, tr;
}
var Qe = {}, si;
function xo() {
  if (si) return Qe;
  si = 1, Object.defineProperty(Qe, "__esModule", { value: !0 }), Qe.callRef = Qe.getValidate = void 0;
  const e = /* @__PURE__ */ Vt(), t = /* @__PURE__ */ Me(), r = /* @__PURE__ */ Y(), n = /* @__PURE__ */ Le(), o = /* @__PURE__ */ ln(), s = /* @__PURE__ */ ne(), i = {
    keyword: "$ref",
    schemaType: "string",
    code(f) {
      const { gen: c, schema: p, it: l } = f, { baseId: h, schemaEnv: $, validateName: v, opts: m, self: _ } = l, { root: d } = $;
      if ((p === "#" || p === "#/") && h === d.baseId)
        return b();
      const g = o.resolveRef.call(_, d, h, p);
      if (g === void 0)
        throw new e.default(l.opts.uriResolver, h, p);
      if (g instanceof o.SchemaEnv)
        return y(g);
      return w(g);
      function b() {
        if ($ === d)
          return u(f, v, $, $.$async);
        const S = c.scopeValue("root", { ref: d });
        return u(f, (0, r._)`${S}.validate`, d, d.$async);
      }
      function y(S) {
        const O = a(f, S);
        u(f, O, S, S.$async);
      }
      function w(S) {
        const O = c.scopeValue("schema", m.code.source === !0 ? { ref: S, code: (0, r.stringify)(S) } : { ref: S }), M = c.name("valid"), Z = f.subschema({
          schema: S,
          dataTypes: [],
          schemaPath: r.nil,
          topSchemaRef: O,
          errSchemaPath: p
        }, M);
        f.mergeEvaluated(Z), f.ok(M);
      }
    }
  };
  function a(f, c) {
    const { gen: p } = f;
    return c.validate ? p.scopeValue("validate", { ref: c.validate }) : (0, r._)`${p.scopeValue("wrapper", { ref: c })}.validate`;
  }
  Qe.getValidate = a;
  function u(f, c, p, l) {
    const { gen: h, it: $ } = f, { allErrors: v, schemaEnv: m, opts: _ } = $, d = _.passContext ? n.default.this : r.nil;
    l ? g() : b();
    function g() {
      if (!m.$async)
        throw new Error("async schema referenced by sync schema");
      const S = h.let("valid");
      h.try(() => {
        h.code((0, r._)`await ${(0, t.callValidateCode)(f, c, d)}`), w(c), v || h.assign(S, !0);
      }, (O) => {
        h.if((0, r._)`!(${O} instanceof ${$.ValidationError})`, () => h.throw(O)), y(O), v || h.assign(S, !1);
      }), f.ok(S);
    }
    function b() {
      f.result((0, t.callValidateCode)(f, c, d), () => w(c), () => y(c));
    }
    function y(S) {
      const O = (0, r._)`${S}.errors`;
      h.assign(n.default.vErrors, (0, r._)`${n.default.vErrors} === null ? ${O} : ${n.default.vErrors}.concat(${O})`), h.assign(n.default.errors, (0, r._)`${n.default.vErrors}.length`);
    }
    function w(S) {
      var O;
      if (!$.opts.unevaluated)
        return;
      const M = (O = p == null ? void 0 : p.validate) === null || O === void 0 ? void 0 : O.evaluated;
      if ($.props !== !0)
        if (M && !M.dynamicProps)
          M.props !== void 0 && ($.props = s.mergeEvaluated.props(h, M.props, $.props));
        else {
          const Z = h.var("props", (0, r._)`${S}.evaluated.props`);
          $.props = s.mergeEvaluated.props(h, Z, $.props, r.Name);
        }
      if ($.items !== !0)
        if (M && !M.dynamicItems)
          M.items !== void 0 && ($.items = s.mergeEvaluated.items(h, M.items, $.items));
        else {
          const Z = h.var("items", (0, r._)`${S}.evaluated.items`);
          $.items = s.mergeEvaluated.items(h, Z, $.items, r.Name);
        }
    }
  }
  return Qe.callRef = u, Qe.default = i, Qe;
}
var ii;
function xc() {
  if (ii) return er;
  ii = 1, Object.defineProperty(er, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ap(), t = /* @__PURE__ */ xo(), r = [
    "$schema",
    "$id",
    "$defs",
    "$vocabulary",
    { keyword: "$comment" },
    "definitions",
    e.default,
    t.default
  ];
  return er.default = r, er;
}
var rr = {}, nr = {}, ai;
function zp() {
  if (ai) return nr;
  ai = 1, Object.defineProperty(nr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = e.operators, r = {
    maximum: { okStr: "<=", ok: t.LTE, fail: t.GT },
    minimum: { okStr: ">=", ok: t.GTE, fail: t.LT },
    exclusiveMaximum: { okStr: "<", ok: t.LT, fail: t.GTE },
    exclusiveMinimum: { okStr: ">", ok: t.GT, fail: t.LTE }
  }, n = {
    message: ({ keyword: s, schemaCode: i }) => (0, e.str)`must be ${r[s].okStr} ${i}`,
    params: ({ keyword: s, schemaCode: i }) => (0, e._)`{comparison: ${r[s].okStr}, limit: ${i}}`
  }, o = {
    keyword: Object.keys(r),
    type: "number",
    schemaType: "number",
    $data: !0,
    error: n,
    code(s) {
      const { keyword: i, data: a, schemaCode: u } = s;
      s.fail$data((0, e._)`${a} ${r[i].fail} ${u} || isNaN(${a})`);
    }
  };
  return nr.default = o, nr;
}
var or = {}, ci;
function Cp() {
  if (ci) return or;
  ci = 1, Object.defineProperty(or, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), r = {
    keyword: "multipleOf",
    type: "number",
    schemaType: "number",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must be multiple of ${n}`,
      params: ({ schemaCode: n }) => (0, e._)`{multipleOf: ${n}}`
    },
    code(n) {
      const { gen: o, data: s, schemaCode: i, it: a } = n, u = a.opts.multipleOfPrecision, f = o.let("res"), c = u ? (0, e._)`Math.abs(Math.round(${f}) - ${f}) > 1e-${u}` : (0, e._)`${f} !== parseInt(${f})`;
      n.fail$data((0, e._)`(${i} === 0 || (${f} = ${s}/${i}, ${c}))`);
    }
  };
  return or.default = r, or;
}
var sr = {}, ir = {}, ui;
function Dp() {
  if (ui) return ir;
  ui = 1, Object.defineProperty(ir, "__esModule", { value: !0 });
  function e(t) {
    const r = t.length;
    let n = 0, o = 0, s;
    for (; o < r; )
      n++, s = t.charCodeAt(o++), s >= 55296 && s <= 56319 && o < r && (s = t.charCodeAt(o), (s & 64512) === 56320 && o++);
    return n;
  }
  return ir.default = e, e.code = 'require("ajv/dist/runtime/ucs2length").default', ir;
}
var fi;
function qp() {
  if (fi) return sr;
  fi = 1, Object.defineProperty(sr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Dp(), o = {
    keyword: ["maxLength", "minLength"],
    type: "string",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: s, schemaCode: i }) {
        const a = s === "maxLength" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${a} than ${i} characters`;
      },
      params: ({ schemaCode: s }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { keyword: i, data: a, schemaCode: u, it: f } = s, c = i === "maxLength" ? e.operators.GT : e.operators.LT, p = f.opts.unicode === !1 ? (0, e._)`${a}.length` : (0, e._)`${(0, t.useFunc)(s.gen, r.default)}(${a})`;
      s.fail$data((0, e._)`${p} ${c} ${u}`);
    }
  };
  return sr.default = o, sr;
}
var ar = {}, li;
function Lp() {
  if (li) return ar;
  li = 1, Object.defineProperty(ar, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Me(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Y(), o = {
    keyword: "pattern",
    type: "string",
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: s }) => (0, r.str)`must match pattern "${s}"`,
      params: ({ schemaCode: s }) => (0, r._)`{pattern: ${s}}`
    },
    code(s) {
      const { gen: i, data: a, $data: u, schema: f, schemaCode: c, it: p } = s, l = p.opts.unicodeRegExp ? "u" : "";
      if (u) {
        const { regExp: h } = p.opts.code, $ = h.code === "new RegExp" ? (0, r._)`new RegExp` : (0, t.useFunc)(i, h), v = i.let("valid");
        i.try(() => i.assign(v, (0, r._)`${$}(${c}, ${l}).test(${a})`), () => i.assign(v, !1)), s.fail$data((0, r._)`!${v}`);
      } else {
        const h = (0, e.usePattern)(s, f);
        s.fail$data((0, r._)`!${h}.test(${a})`);
      }
    }
  };
  return ar.default = o, ar;
}
var cr = {}, di;
function Mp() {
  if (di) return cr;
  di = 1, Object.defineProperty(cr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), r = {
    keyword: ["maxProperties", "minProperties"],
    type: "object",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: o }) {
        const s = n === "maxProperties" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${o} properties`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: o, data: s, schemaCode: i } = n, a = o === "maxProperties" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`Object.keys(${s}).length ${a} ${i}`);
    }
  };
  return cr.default = r, cr;
}
var ur = {}, hi;
function Fp() {
  if (hi) return ur;
  hi = 1, Object.defineProperty(ur, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Me(), t = /* @__PURE__ */ Y(), r = /* @__PURE__ */ ne(), o = {
    keyword: "required",
    type: "object",
    schemaType: "array",
    $data: !0,
    error: {
      message: ({ params: { missingProperty: s } }) => (0, t.str)`must have required property '${s}'`,
      params: ({ params: { missingProperty: s } }) => (0, t._)`{missingProperty: ${s}}`
    },
    code(s) {
      const { gen: i, schema: a, schemaCode: u, data: f, $data: c, it: p } = s, { opts: l } = p;
      if (!c && a.length === 0)
        return;
      const h = a.length >= l.loopRequired;
      if (p.allErrors ? $() : v(), l.strictRequired) {
        const d = s.parentSchema.properties, { definedProperties: g } = s.it;
        for (const b of a)
          if ((d == null ? void 0 : d[b]) === void 0 && !g.has(b)) {
            const y = p.schemaEnv.baseId + p.errSchemaPath, w = `required property "${b}" is not defined at "${y}" (strictRequired)`;
            (0, r.checkStrictMode)(p, w, p.opts.strictRequired);
          }
      }
      function $() {
        if (h || c)
          s.block$data(t.nil, m);
        else
          for (const d of a)
            (0, e.checkReportMissingProp)(s, d);
      }
      function v() {
        const d = i.let("missing");
        if (h || c) {
          const g = i.let("valid", !0);
          s.block$data(g, () => _(d, g)), s.ok(g);
        } else
          i.if((0, e.checkMissingProp)(s, a, d)), (0, e.reportMissingProp)(s, d), i.else();
      }
      function m() {
        i.forOf("prop", u, (d) => {
          s.setParams({ missingProperty: d }), i.if((0, e.noPropertyInData)(i, f, d, l.ownProperties), () => s.error());
        });
      }
      function _(d, g) {
        s.setParams({ missingProperty: d }), i.forOf(d, u, () => {
          i.assign(g, (0, e.propertyInData)(i, f, d, l.ownProperties)), i.if((0, t.not)(g), () => {
            s.error(), i.break();
          });
        }, t.nil);
      }
    }
  };
  return ur.default = o, ur;
}
var fr = {}, pi;
function Vp() {
  if (pi) return fr;
  pi = 1, Object.defineProperty(fr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), r = {
    keyword: ["maxItems", "minItems"],
    type: "array",
    schemaType: "number",
    $data: !0,
    error: {
      message({ keyword: n, schemaCode: o }) {
        const s = n === "maxItems" ? "more" : "fewer";
        return (0, e.str)`must NOT have ${s} than ${o} items`;
      },
      params: ({ schemaCode: n }) => (0, e._)`{limit: ${n}}`
    },
    code(n) {
      const { keyword: o, data: s, schemaCode: i } = n, a = o === "maxItems" ? e.operators.GT : e.operators.LT;
      n.fail$data((0, e._)`${s}.length ${a} ${i}`);
    }
  };
  return fr.default = r, fr;
}
var lr = {}, dr = {}, mi;
function Wo() {
  if (mi) return dr;
  mi = 1, Object.defineProperty(dr, "__esModule", { value: !0 });
  const e = Kc();
  return e.code = 'require("ajv/dist/runtime/equal").default', dr.default = e, dr;
}
var yi;
function Up() {
  if (yi) return lr;
  yi = 1, Object.defineProperty(lr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ tn(), t = /* @__PURE__ */ Y(), r = /* @__PURE__ */ ne(), n = /* @__PURE__ */ Wo(), s = {
    keyword: "uniqueItems",
    type: "array",
    schemaType: "boolean",
    $data: !0,
    error: {
      message: ({ params: { i, j: a } }) => (0, t.str)`must NOT have duplicate items (items ## ${a} and ${i} are identical)`,
      params: ({ params: { i, j: a } }) => (0, t._)`{i: ${i}, j: ${a}}`
    },
    code(i) {
      const { gen: a, data: u, $data: f, schema: c, parentSchema: p, schemaCode: l, it: h } = i;
      if (!f && !c)
        return;
      const $ = a.let("valid"), v = p.items ? (0, e.getSchemaTypes)(p.items) : [];
      i.block$data($, m, (0, t._)`${l} === false`), i.ok($);
      function m() {
        const b = a.let("i", (0, t._)`${u}.length`), y = a.let("j");
        i.setParams({ i: b, j: y }), a.assign($, !0), a.if((0, t._)`${b} > 1`, () => (_() ? d : g)(b, y));
      }
      function _() {
        return v.length > 0 && !v.some((b) => b === "object" || b === "array");
      }
      function d(b, y) {
        const w = a.name("item"), S = (0, e.checkDataTypes)(v, w, h.opts.strictNumbers, e.DataType.Wrong), O = a.const("indices", (0, t._)`{}`);
        a.for((0, t._)`;${b}--;`, () => {
          a.let(w, (0, t._)`${u}[${b}]`), a.if(S, (0, t._)`continue`), v.length > 1 && a.if((0, t._)`typeof ${w} == "string"`, (0, t._)`${w} += "_"`), a.if((0, t._)`typeof ${O}[${w}] == "number"`, () => {
            a.assign(y, (0, t._)`${O}[${w}]`), i.error(), a.assign($, !1).break();
          }).code((0, t._)`${O}[${w}] = ${b}`);
        });
      }
      function g(b, y) {
        const w = (0, r.useFunc)(a, n.default), S = a.name("outer");
        a.label(S).for((0, t._)`;${b}--;`, () => a.for((0, t._)`${y} = ${b}; ${y}--;`, () => a.if((0, t._)`${w}(${u}[${b}], ${u}[${y}])`, () => {
          i.error(), a.assign($, !1).break(S);
        })));
      }
    }
  };
  return lr.default = s, lr;
}
var hr = {}, gi;
function Zp() {
  if (gi) return hr;
  gi = 1, Object.defineProperty(hr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Wo(), o = {
    keyword: "const",
    $data: !0,
    error: {
      message: "must be equal to constant",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValue: ${s}}`
    },
    code(s) {
      const { gen: i, data: a, $data: u, schemaCode: f, schema: c } = s;
      u || c && typeof c == "object" ? s.fail$data((0, e._)`!${(0, t.useFunc)(i, r.default)}(${a}, ${f})`) : s.fail((0, e._)`${c} !== ${a}`);
    }
  };
  return hr.default = o, hr;
}
var pr = {}, _i;
function Gp() {
  if (_i) return pr;
  _i = 1, Object.defineProperty(pr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Wo(), o = {
    keyword: "enum",
    schemaType: "array",
    $data: !0,
    error: {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode: s }) => (0, e._)`{allowedValues: ${s}}`
    },
    code(s) {
      const { gen: i, data: a, $data: u, schema: f, schemaCode: c, it: p } = s;
      if (!u && f.length === 0)
        throw new Error("enum must have non-empty array");
      const l = f.length >= p.opts.loopEnum;
      let h;
      const $ = () => h ?? (h = (0, t.useFunc)(i, r.default));
      let v;
      if (l || u)
        v = i.let("valid"), s.block$data(v, m);
      else {
        if (!Array.isArray(f))
          throw new Error("ajv implementation error");
        const d = i.const("vSchema", c);
        v = (0, e.or)(...f.map((g, b) => _(d, b)));
      }
      s.pass(v);
      function m() {
        i.assign(v, !1), i.forOf("v", c, (d) => i.if((0, e._)`${$()}(${a}, ${d})`, () => i.assign(v, !0).break()));
      }
      function _(d, g) {
        const b = f[g];
        return typeof b == "object" && b !== null ? (0, e._)`${$()}(${a}, ${d}[${g}])` : (0, e._)`${a} === ${b}`;
      }
    }
  };
  return pr.default = o, pr;
}
var vi;
function Wc() {
  if (vi) return rr;
  vi = 1, Object.defineProperty(rr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ zp(), t = /* @__PURE__ */ Cp(), r = /* @__PURE__ */ qp(), n = /* @__PURE__ */ Lp(), o = /* @__PURE__ */ Mp(), s = /* @__PURE__ */ Fp(), i = /* @__PURE__ */ Vp(), a = /* @__PURE__ */ Up(), u = /* @__PURE__ */ Zp(), f = /* @__PURE__ */ Gp(), c = [
    // number
    e.default,
    t.default,
    // string
    r.default,
    n.default,
    // object
    o.default,
    s.default,
    // array
    i.default,
    a.default,
    // any
    { keyword: "type", schemaType: ["string", "array"] },
    { keyword: "nullable", schemaType: "boolean" },
    u.default,
    f.default
  ];
  return rr.default = c, rr;
}
var mr = {}, gt = {}, $i;
function Bc() {
  if ($i) return gt;
  $i = 1, Object.defineProperty(gt, "__esModule", { value: !0 }), gt.validateAdditionalItems = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), n = {
    keyword: "additionalItems",
    type: "array",
    schemaType: ["boolean", "object"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: s } }) => (0, e.str)`must NOT have more than ${s} items`,
      params: ({ params: { len: s } }) => (0, e._)`{limit: ${s}}`
    },
    code(s) {
      const { parentSchema: i, it: a } = s, { items: u } = i;
      if (!Array.isArray(u)) {
        (0, t.checkStrictMode)(a, '"additionalItems" is ignored when "items" is not an array of schemas');
        return;
      }
      o(s, u);
    }
  };
  function o(s, i) {
    const { gen: a, schema: u, data: f, keyword: c, it: p } = s;
    p.items = !0;
    const l = a.const("len", (0, e._)`${f}.length`);
    if (u === !1)
      s.setParams({ len: i.length }), s.pass((0, e._)`${l} <= ${i.length}`);
    else if (typeof u == "object" && !(0, t.alwaysValidSchema)(p, u)) {
      const $ = a.var("valid", (0, e._)`${l} <= ${i.length}`);
      a.if((0, e.not)($), () => h($)), s.ok($);
    }
    function h($) {
      a.forRange("i", i.length, l, (v) => {
        s.subschema({ keyword: c, dataProp: v, dataPropType: t.Type.Num }, $), p.allErrors || a.if((0, e.not)($), () => a.break());
      });
    }
  }
  return gt.validateAdditionalItems = o, gt.default = n, gt;
}
var yr = {}, _t = {}, wi;
function Xc() {
  if (wi) return _t;
  wi = 1, Object.defineProperty(_t, "__esModule", { value: !0 }), _t.validateTuple = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Me(), n = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "array", "boolean"],
    before: "uniqueItems",
    code(s) {
      const { schema: i, it: a } = s;
      if (Array.isArray(i))
        return o(s, "additionalItems", i);
      a.items = !0, !(0, t.alwaysValidSchema)(a, i) && s.ok((0, r.validateArray)(s));
    }
  };
  function o(s, i, a = s.schema) {
    const { gen: u, parentSchema: f, data: c, keyword: p, it: l } = s;
    v(f), l.opts.unevaluated && a.length && l.items !== !0 && (l.items = t.mergeEvaluated.items(u, a.length, l.items));
    const h = u.name("valid"), $ = u.const("len", (0, e._)`${c}.length`);
    a.forEach((m, _) => {
      (0, t.alwaysValidSchema)(l, m) || (u.if((0, e._)`${$} > ${_}`, () => s.subschema({
        keyword: p,
        schemaProp: _,
        dataProp: _
      }, h)), s.ok(h));
    });
    function v(m) {
      const { opts: _, errSchemaPath: d } = l, g = a.length, b = g === m.minItems && (g === m.maxItems || m[i] === !1);
      if (_.strictTuples && !b) {
        const y = `"${p}" is ${g}-tuple, but minItems or maxItems/${i} are not specified or different at path "${d}"`;
        (0, t.checkStrictMode)(l, y, _.strictTuples);
      }
    }
  }
  return _t.validateTuple = o, _t.default = n, _t;
}
var Ei;
function Kp() {
  if (Ei) return yr;
  Ei = 1, Object.defineProperty(yr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Xc(), t = {
    keyword: "prefixItems",
    type: "array",
    schemaType: ["array"],
    before: "uniqueItems",
    code: (r) => (0, e.validateTuple)(r, "items")
  };
  return yr.default = t, yr;
}
var gr = {}, bi;
function Jp() {
  if (bi) return gr;
  bi = 1, Object.defineProperty(gr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Me(), n = /* @__PURE__ */ Bc(), s = {
    keyword: "items",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    error: {
      message: ({ params: { len: i } }) => (0, e.str)`must NOT have more than ${i} items`,
      params: ({ params: { len: i } }) => (0, e._)`{limit: ${i}}`
    },
    code(i) {
      const { schema: a, parentSchema: u, it: f } = i, { prefixItems: c } = u;
      f.items = !0, !(0, t.alwaysValidSchema)(f, a) && (c ? (0, n.validateAdditionalItems)(i, c) : i.ok((0, r.validateArray)(i)));
    }
  };
  return gr.default = s, gr;
}
var _r = {}, Si;
function Hp() {
  if (Si) return _r;
  Si = 1, Object.defineProperty(_r, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), n = {
    keyword: "contains",
    type: "array",
    schemaType: ["object", "boolean"],
    before: "uniqueItems",
    trackErrors: !0,
    error: {
      message: ({ params: { min: o, max: s } }) => s === void 0 ? (0, e.str)`must contain at least ${o} valid item(s)` : (0, e.str)`must contain at least ${o} and no more than ${s} valid item(s)`,
      params: ({ params: { min: o, max: s } }) => s === void 0 ? (0, e._)`{minContains: ${o}}` : (0, e._)`{minContains: ${o}, maxContains: ${s}}`
    },
    code(o) {
      const { gen: s, schema: i, parentSchema: a, data: u, it: f } = o;
      let c, p;
      const { minContains: l, maxContains: h } = a;
      f.opts.next ? (c = l === void 0 ? 1 : l, p = h) : c = 1;
      const $ = s.const("len", (0, e._)`${u}.length`);
      if (o.setParams({ min: c, max: p }), p === void 0 && c === 0) {
        (0, t.checkStrictMode)(f, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
        return;
      }
      if (p !== void 0 && c > p) {
        (0, t.checkStrictMode)(f, '"minContains" > "maxContains" is always invalid'), o.fail();
        return;
      }
      if ((0, t.alwaysValidSchema)(f, i)) {
        let g = (0, e._)`${$} >= ${c}`;
        p !== void 0 && (g = (0, e._)`${g} && ${$} <= ${p}`), o.pass(g);
        return;
      }
      f.items = !0;
      const v = s.name("valid");
      p === void 0 && c === 1 ? _(v, () => s.if(v, () => s.break())) : c === 0 ? (s.let(v, !0), p !== void 0 && s.if((0, e._)`${u}.length > 0`, m)) : (s.let(v, !1), m()), o.result(v, () => o.reset());
      function m() {
        const g = s.name("_valid"), b = s.let("count", 0);
        _(g, () => s.if(g, () => d(b)));
      }
      function _(g, b) {
        s.forRange("i", 0, $, (y) => {
          o.subschema({
            keyword: "contains",
            dataProp: y,
            dataPropType: t.Type.Num,
            compositeRule: !0
          }, g), b();
        });
      }
      function d(g) {
        s.code((0, e._)`${g}++`), p === void 0 ? s.if((0, e._)`${g} >= ${c}`, () => s.assign(v, !0).break()) : (s.if((0, e._)`${g} > ${p}`, () => s.assign(v, !1).break()), c === 1 ? s.assign(v, !0) : s.if((0, e._)`${g} >= ${c}`, () => s.assign(v, !0)));
      }
    }
  };
  return _r.default = n, _r;
}
var Cn = {}, Ri;
function Bo() {
  return Ri || (Ri = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
    const t = /* @__PURE__ */ Y(), r = /* @__PURE__ */ ne(), n = /* @__PURE__ */ Me();
    e.error = {
      message: ({ params: { property: u, depsCount: f, deps: c } }) => {
        const p = f === 1 ? "property" : "properties";
        return (0, t.str)`must have ${p} ${c} when property ${u} is present`;
      },
      params: ({ params: { property: u, depsCount: f, deps: c, missingProperty: p } }) => (0, t._)`{property: ${u},
    missingProperty: ${p},
    depsCount: ${f},
    deps: ${c}}`
      // TODO change to reference
    };
    const o = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: e.error,
      code(u) {
        const [f, c] = s(u);
        i(u, f), a(u, c);
      }
    };
    function s({ schema: u }) {
      const f = {}, c = {};
      for (const p in u) {
        if (p === "__proto__")
          continue;
        const l = Array.isArray(u[p]) ? f : c;
        l[p] = u[p];
      }
      return [f, c];
    }
    function i(u, f = u.schema) {
      const { gen: c, data: p, it: l } = u;
      if (Object.keys(f).length === 0)
        return;
      const h = c.let("missing");
      for (const $ in f) {
        const v = f[$];
        if (v.length === 0)
          continue;
        const m = (0, n.propertyInData)(c, p, $, l.opts.ownProperties);
        u.setParams({
          property: $,
          depsCount: v.length,
          deps: v.join(", ")
        }), l.allErrors ? c.if(m, () => {
          for (const _ of v)
            (0, n.checkReportMissingProp)(u, _);
        }) : (c.if((0, t._)`${m} && (${(0, n.checkMissingProp)(u, v, h)})`), (0, n.reportMissingProp)(u, h), c.else());
      }
    }
    e.validatePropertyDeps = i;
    function a(u, f = u.schema) {
      const { gen: c, data: p, keyword: l, it: h } = u, $ = c.name("valid");
      for (const v in f)
        (0, r.alwaysValidSchema)(h, f[v]) || (c.if(
          (0, n.propertyInData)(c, p, v, h.opts.ownProperties),
          () => {
            const m = u.subschema({ keyword: l, schemaProp: v }, $);
            u.mergeValidEvaluated(m, $);
          },
          () => c.var($, !0)
          // TODO var
        ), u.ok($));
    }
    e.validateSchemaDeps = a, e.default = o;
  })(Cn)), Cn;
}
var vr = {}, Pi;
function xp() {
  if (Pi) return vr;
  Pi = 1, Object.defineProperty(vr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), n = {
    keyword: "propertyNames",
    type: "object",
    schemaType: ["object", "boolean"],
    error: {
      message: "property name must be valid",
      params: ({ params: o }) => (0, e._)`{propertyName: ${o.propertyName}}`
    },
    code(o) {
      const { gen: s, schema: i, data: a, it: u } = o;
      if ((0, t.alwaysValidSchema)(u, i))
        return;
      const f = s.name("valid");
      s.forIn("key", a, (c) => {
        o.setParams({ propertyName: c }), o.subschema({
          keyword: "propertyNames",
          data: c,
          dataTypes: ["string"],
          propertyName: c,
          compositeRule: !0
        }, f), s.if((0, e.not)(f), () => {
          o.error(!0), u.allErrors || s.break();
        });
      }), o.ok(f);
    }
  };
  return vr.default = n, vr;
}
var $r = {}, Oi;
function Yc() {
  if (Oi) return $r;
  Oi = 1, Object.defineProperty($r, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Me(), t = /* @__PURE__ */ Y(), r = /* @__PURE__ */ Le(), n = /* @__PURE__ */ ne(), s = {
    keyword: "additionalProperties",
    type: ["object"],
    schemaType: ["boolean", "object"],
    allowUndefined: !0,
    trackErrors: !0,
    error: {
      message: "must NOT have additional properties",
      params: ({ params: i }) => (0, t._)`{additionalProperty: ${i.additionalProperty}}`
    },
    code(i) {
      const { gen: a, schema: u, parentSchema: f, data: c, errsCount: p, it: l } = i;
      if (!p)
        throw new Error("ajv implementation error");
      const { allErrors: h, opts: $ } = l;
      if (l.props = !0, $.removeAdditional !== "all" && (0, n.alwaysValidSchema)(l, u))
        return;
      const v = (0, e.allSchemaProperties)(f.properties), m = (0, e.allSchemaProperties)(f.patternProperties);
      _(), i.ok((0, t._)`${p} === ${r.default.errors}`);
      function _() {
        a.forIn("key", c, (w) => {
          !v.length && !m.length ? b(w) : a.if(d(w), () => b(w));
        });
      }
      function d(w) {
        let S;
        if (v.length > 8) {
          const O = (0, n.schemaRefOrVal)(l, f.properties, "properties");
          S = (0, e.isOwnProperty)(a, O, w);
        } else v.length ? S = (0, t.or)(...v.map((O) => (0, t._)`${w} === ${O}`)) : S = t.nil;
        return m.length && (S = (0, t.or)(S, ...m.map((O) => (0, t._)`${(0, e.usePattern)(i, O)}.test(${w})`))), (0, t.not)(S);
      }
      function g(w) {
        a.code((0, t._)`delete ${c}[${w}]`);
      }
      function b(w) {
        if ($.removeAdditional === "all" || $.removeAdditional && u === !1) {
          g(w);
          return;
        }
        if (u === !1) {
          i.setParams({ additionalProperty: w }), i.error(), h || a.break();
          return;
        }
        if (typeof u == "object" && !(0, n.alwaysValidSchema)(l, u)) {
          const S = a.name("valid");
          $.removeAdditional === "failing" ? (y(w, S, !1), a.if((0, t.not)(S), () => {
            i.reset(), g(w);
          })) : (y(w, S), h || a.if((0, t.not)(S), () => a.break()));
        }
      }
      function y(w, S, O) {
        const M = {
          keyword: "additionalProperties",
          dataProp: w,
          dataPropType: n.Type.Str
        };
        O === !1 && Object.assign(M, {
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }), i.subschema(M, S);
      }
    }
  };
  return $r.default = s, $r;
}
var wr = {}, Ii;
function Wp() {
  if (Ii) return wr;
  Ii = 1, Object.defineProperty(wr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Ft(), t = /* @__PURE__ */ Me(), r = /* @__PURE__ */ ne(), n = /* @__PURE__ */ Yc(), o = {
    keyword: "properties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: i, schema: a, parentSchema: u, data: f, it: c } = s;
      c.opts.removeAdditional === "all" && u.additionalProperties === void 0 && n.default.code(new e.KeywordCxt(c, n.default, "additionalProperties"));
      const p = (0, t.allSchemaProperties)(a);
      for (const m of p)
        c.definedProperties.add(m);
      c.opts.unevaluated && p.length && c.props !== !0 && (c.props = r.mergeEvaluated.props(i, (0, r.toHash)(p), c.props));
      const l = p.filter((m) => !(0, r.alwaysValidSchema)(c, a[m]));
      if (l.length === 0)
        return;
      const h = i.name("valid");
      for (const m of l)
        $(m) ? v(m) : (i.if((0, t.propertyInData)(i, f, m, c.opts.ownProperties)), v(m), c.allErrors || i.else().var(h, !0), i.endIf()), s.it.definedProperties.add(m), s.ok(h);
      function $(m) {
        return c.opts.useDefaults && !c.compositeRule && a[m].default !== void 0;
      }
      function v(m) {
        s.subschema({
          keyword: "properties",
          schemaProp: m,
          dataProp: m
        }, h);
      }
    }
  };
  return wr.default = o, wr;
}
var Er = {}, Ni;
function Bp() {
  if (Ni) return Er;
  Ni = 1, Object.defineProperty(Er, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Me(), t = /* @__PURE__ */ Y(), r = /* @__PURE__ */ ne(), n = /* @__PURE__ */ ne(), o = {
    keyword: "patternProperties",
    type: "object",
    schemaType: "object",
    code(s) {
      const { gen: i, schema: a, data: u, parentSchema: f, it: c } = s, { opts: p } = c, l = (0, e.allSchemaProperties)(a), h = l.filter((b) => (0, r.alwaysValidSchema)(c, a[b]));
      if (l.length === 0 || h.length === l.length && (!c.opts.unevaluated || c.props === !0))
        return;
      const $ = p.strictSchema && !p.allowMatchingProperties && f.properties, v = i.name("valid");
      c.props !== !0 && !(c.props instanceof t.Name) && (c.props = (0, n.evaluatedPropsToName)(i, c.props));
      const { props: m } = c;
      _();
      function _() {
        for (const b of l)
          $ && d(b), c.allErrors ? g(b) : (i.var(v, !0), g(b), i.if(v));
      }
      function d(b) {
        for (const y in $)
          new RegExp(b).test(y) && (0, r.checkStrictMode)(c, `property ${y} matches pattern ${b} (use allowMatchingProperties)`);
      }
      function g(b) {
        i.forIn("key", u, (y) => {
          i.if((0, t._)`${(0, e.usePattern)(s, b)}.test(${y})`, () => {
            const w = h.includes(b);
            w || s.subschema({
              keyword: "patternProperties",
              schemaProp: b,
              dataProp: y,
              dataPropType: n.Type.Str
            }, v), c.opts.unevaluated && m !== !0 ? i.assign((0, t._)`${m}[${y}]`, !0) : !w && !c.allErrors && i.if((0, t.not)(v), () => i.break());
          });
        });
      }
    }
  };
  return Er.default = o, Er;
}
var br = {}, Ti;
function Xp() {
  if (Ti) return br;
  Ti = 1, Object.defineProperty(br, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ne(), t = {
    keyword: "not",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    code(r) {
      const { gen: n, schema: o, it: s } = r;
      if ((0, e.alwaysValidSchema)(s, o)) {
        r.fail();
        return;
      }
      const i = n.name("valid");
      r.subschema({
        keyword: "not",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, i), r.failResult(i, () => r.reset(), () => r.error());
    },
    error: { message: "must NOT be valid" }
  };
  return br.default = t, br;
}
var Sr = {}, ki;
function Yp() {
  if (ki) return Sr;
  ki = 1, Object.defineProperty(Sr, "__esModule", { value: !0 });
  const t = {
    keyword: "anyOf",
    schemaType: "array",
    trackErrors: !0,
    code: (/* @__PURE__ */ Me()).validateUnion,
    error: { message: "must match a schema in anyOf" }
  };
  return Sr.default = t, Sr;
}
var Rr = {}, ji;
function Qp() {
  if (ji) return Rr;
  ji = 1, Object.defineProperty(Rr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), n = {
    keyword: "oneOf",
    schemaType: "array",
    trackErrors: !0,
    error: {
      message: "must match exactly one schema in oneOf",
      params: ({ params: o }) => (0, e._)`{passingSchemas: ${o.passing}}`
    },
    code(o) {
      const { gen: s, schema: i, parentSchema: a, it: u } = o;
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      if (u.opts.discriminator && a.discriminator)
        return;
      const f = i, c = s.let("valid", !1), p = s.let("passing", null), l = s.name("_valid");
      o.setParams({ passing: p }), s.block(h), o.result(c, () => o.reset(), () => o.error(!0));
      function h() {
        f.forEach(($, v) => {
          let m;
          (0, t.alwaysValidSchema)(u, $) ? s.var(l, !0) : m = o.subschema({
            keyword: "oneOf",
            schemaProp: v,
            compositeRule: !0
          }, l), v > 0 && s.if((0, e._)`${l} && ${c}`).assign(c, !1).assign(p, (0, e._)`[${p}, ${v}]`).else(), s.if(l, () => {
            s.assign(c, !0), s.assign(p, v), m && o.mergeEvaluated(m, e.Name);
          });
        });
      }
    }
  };
  return Rr.default = n, Rr;
}
var Pr = {}, Ai;
function em() {
  if (Ai) return Pr;
  Ai = 1, Object.defineProperty(Pr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ne(), t = {
    keyword: "allOf",
    schemaType: "array",
    code(r) {
      const { gen: n, schema: o, it: s } = r;
      if (!Array.isArray(o))
        throw new Error("ajv implementation error");
      const i = n.name("valid");
      o.forEach((a, u) => {
        if ((0, e.alwaysValidSchema)(s, a))
          return;
        const f = r.subschema({ keyword: "allOf", schemaProp: u }, i);
        r.ok(i), r.mergeEvaluated(f);
      });
    }
  };
  return Pr.default = t, Pr;
}
var Or = {}, zi;
function tm() {
  if (zi) return Or;
  zi = 1, Object.defineProperty(Or, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), n = {
    keyword: "if",
    schemaType: ["object", "boolean"],
    trackErrors: !0,
    error: {
      message: ({ params: s }) => (0, e.str)`must match "${s.ifClause}" schema`,
      params: ({ params: s }) => (0, e._)`{failingKeyword: ${s.ifClause}}`
    },
    code(s) {
      const { gen: i, parentSchema: a, it: u } = s;
      a.then === void 0 && a.else === void 0 && (0, t.checkStrictMode)(u, '"if" without "then" and "else" is ignored');
      const f = o(u, "then"), c = o(u, "else");
      if (!f && !c)
        return;
      const p = i.let("valid", !0), l = i.name("_valid");
      if (h(), s.reset(), f && c) {
        const v = i.let("ifClause");
        s.setParams({ ifClause: v }), i.if(l, $("then", v), $("else", v));
      } else f ? i.if(l, $("then")) : i.if((0, e.not)(l), $("else"));
      s.pass(p, () => s.error(!0));
      function h() {
        const v = s.subschema({
          keyword: "if",
          compositeRule: !0,
          createErrors: !1,
          allErrors: !1
        }, l);
        s.mergeEvaluated(v);
      }
      function $(v, m) {
        return () => {
          const _ = s.subschema({ keyword: v }, l);
          i.assign(p, l), s.mergeValidEvaluated(_, p), m ? i.assign(m, (0, e._)`${v}`) : s.setParams({ ifClause: v });
        };
      }
    }
  };
  function o(s, i) {
    const a = s.schema[i];
    return a !== void 0 && !(0, t.alwaysValidSchema)(s, a);
  }
  return Or.default = n, Or;
}
var Ir = {}, Ci;
function rm() {
  if (Ci) return Ir;
  Ci = 1, Object.defineProperty(Ir, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ne(), t = {
    keyword: ["then", "else"],
    schemaType: ["object", "boolean"],
    code({ keyword: r, parentSchema: n, it: o }) {
      n.if === void 0 && (0, e.checkStrictMode)(o, `"${r}" without "if" is ignored`);
    }
  };
  return Ir.default = t, Ir;
}
var Di;
function Qc() {
  if (Di) return mr;
  Di = 1, Object.defineProperty(mr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Bc(), t = /* @__PURE__ */ Kp(), r = /* @__PURE__ */ Xc(), n = /* @__PURE__ */ Jp(), o = /* @__PURE__ */ Hp(), s = /* @__PURE__ */ Bo(), i = /* @__PURE__ */ xp(), a = /* @__PURE__ */ Yc(), u = /* @__PURE__ */ Wp(), f = /* @__PURE__ */ Bp(), c = /* @__PURE__ */ Xp(), p = /* @__PURE__ */ Yp(), l = /* @__PURE__ */ Qp(), h = /* @__PURE__ */ em(), $ = /* @__PURE__ */ tm(), v = /* @__PURE__ */ rm();
  function m(_ = !1) {
    const d = [
      // any
      c.default,
      p.default,
      l.default,
      h.default,
      $.default,
      v.default,
      // object
      i.default,
      a.default,
      s.default,
      u.default,
      f.default
    ];
    return _ ? d.push(t.default, n.default) : d.push(e.default, r.default), d.push(o.default), d;
  }
  return mr.default = m, mr;
}
var Nr = {}, vt = {}, qi;
function eu() {
  if (qi) return vt;
  qi = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.dynamicAnchor = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ Le(), r = /* @__PURE__ */ ln(), n = /* @__PURE__ */ xo(), o = {
    keyword: "$dynamicAnchor",
    schemaType: "string",
    code: (a) => s(a, a.schema)
  };
  function s(a, u) {
    const { gen: f, it: c } = a;
    c.schemaEnv.root.dynamicAnchors[u] = !0;
    const p = (0, e._)`${t.default.dynamicAnchors}${(0, e.getProperty)(u)}`, l = c.errSchemaPath === "#" ? c.validateName : i(a);
    f.if((0, e._)`!${p}`, () => f.assign(p, l));
  }
  vt.dynamicAnchor = s;
  function i(a) {
    const { schemaEnv: u, schema: f, self: c } = a.it, { root: p, baseId: l, localRefs: h, meta: $ } = u.root, { schemaId: v } = c.opts, m = new r.SchemaEnv({ schema: f, schemaId: v, root: p, baseId: l, localRefs: h, meta: $ });
    return r.compileSchema.call(c, m), (0, n.getValidate)(a, m);
  }
  return vt.default = o, vt;
}
var $t = {}, Li;
function tu() {
  if (Li) return $t;
  Li = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.dynamicRef = void 0;
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ Le(), r = /* @__PURE__ */ xo(), n = {
    keyword: "$dynamicRef",
    schemaType: "string",
    code: (s) => o(s, s.schema)
  };
  function o(s, i) {
    const { gen: a, keyword: u, it: f } = s;
    if (i[0] !== "#")
      throw new Error(`"${u}" only supports hash fragment reference`);
    const c = i.slice(1);
    if (f.allErrors)
      p();
    else {
      const h = a.let("valid", !1);
      p(h), s.ok(h);
    }
    function p(h) {
      if (f.schemaEnv.root.dynamicAnchors[c]) {
        const $ = a.let("_v", (0, e._)`${t.default.dynamicAnchors}${(0, e.getProperty)(c)}`);
        a.if($, l($, h), l(f.validateName, h));
      } else
        l(f.validateName, h)();
    }
    function l(h, $) {
      return $ ? () => a.block(() => {
        (0, r.callRef)(s, h), a.let($, !0);
      }) : () => (0, r.callRef)(s, h);
    }
  }
  return $t.dynamicRef = o, $t.default = n, $t;
}
var Tr = {}, Mi;
function nm() {
  if (Mi) return Tr;
  Mi = 1, Object.defineProperty(Tr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ eu(), t = /* @__PURE__ */ ne(), r = {
    keyword: "$recursiveAnchor",
    schemaType: "boolean",
    code(n) {
      n.schema ? (0, e.dynamicAnchor)(n, "") : (0, t.checkStrictMode)(n.it, "$recursiveAnchor: false is ignored");
    }
  };
  return Tr.default = r, Tr;
}
var kr = {}, Fi;
function om() {
  if (Fi) return kr;
  Fi = 1, Object.defineProperty(kr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ tu(), t = {
    keyword: "$recursiveRef",
    schemaType: "string",
    code: (r) => (0, e.dynamicRef)(r, r.schema)
  };
  return kr.default = t, kr;
}
var Vi;
function sm() {
  if (Vi) return Nr;
  Vi = 1, Object.defineProperty(Nr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ eu(), t = /* @__PURE__ */ tu(), r = /* @__PURE__ */ nm(), n = /* @__PURE__ */ om(), o = [e.default, t.default, r.default, n.default];
  return Nr.default = o, Nr;
}
var jr = {}, Ar = {}, Ui;
function im() {
  if (Ui) return Ar;
  Ui = 1, Object.defineProperty(Ar, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Bo(), t = {
    keyword: "dependentRequired",
    type: "object",
    schemaType: "object",
    error: e.error,
    code: (r) => (0, e.validatePropertyDeps)(r)
  };
  return Ar.default = t, Ar;
}
var zr = {}, Zi;
function am() {
  if (Zi) return zr;
  Zi = 1, Object.defineProperty(zr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Bo(), t = {
    keyword: "dependentSchemas",
    type: "object",
    schemaType: "object",
    code: (r) => (0, e.validateSchemaDeps)(r)
  };
  return zr.default = t, zr;
}
var Cr = {}, Gi;
function cm() {
  if (Gi) return Cr;
  Gi = 1, Object.defineProperty(Cr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ ne(), t = {
    keyword: ["maxContains", "minContains"],
    type: "array",
    schemaType: "number",
    code({ keyword: r, parentSchema: n, it: o }) {
      n.contains === void 0 && (0, e.checkStrictMode)(o, `"${r}" without "contains" is ignored`);
    }
  };
  return Cr.default = t, Cr;
}
var Ki;
function um() {
  if (Ki) return jr;
  Ki = 1, Object.defineProperty(jr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ im(), t = /* @__PURE__ */ am(), r = /* @__PURE__ */ cm(), n = [e.default, t.default, r.default];
  return jr.default = n, jr;
}
var Dr = {}, qr = {}, Ji;
function fm() {
  if (Ji) return qr;
  Ji = 1, Object.defineProperty(qr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), r = /* @__PURE__ */ Le(), o = {
    keyword: "unevaluatedProperties",
    type: "object",
    schemaType: ["boolean", "object"],
    trackErrors: !0,
    error: {
      message: "must NOT have unevaluated properties",
      params: ({ params: s }) => (0, e._)`{unevaluatedProperty: ${s.unevaluatedProperty}}`
    },
    code(s) {
      const { gen: i, schema: a, data: u, errsCount: f, it: c } = s;
      if (!f)
        throw new Error("ajv implementation error");
      const { allErrors: p, props: l } = c;
      l instanceof e.Name ? i.if((0, e._)`${l} !== true`, () => i.forIn("key", u, (m) => i.if($(l, m), () => h(m)))) : l !== !0 && i.forIn("key", u, (m) => l === void 0 ? h(m) : i.if(v(l, m), () => h(m))), c.props = !0, s.ok((0, e._)`${f} === ${r.default.errors}`);
      function h(m) {
        if (a === !1) {
          s.setParams({ unevaluatedProperty: m }), s.error(), p || i.break();
          return;
        }
        if (!(0, t.alwaysValidSchema)(c, a)) {
          const _ = i.name("valid");
          s.subschema({
            keyword: "unevaluatedProperties",
            dataProp: m,
            dataPropType: t.Type.Str
          }, _), p || i.if((0, e.not)(_), () => i.break());
        }
      }
      function $(m, _) {
        return (0, e._)`!${m} || !${m}[${_}]`;
      }
      function v(m, _) {
        const d = [];
        for (const g in m)
          m[g] === !0 && d.push((0, e._)`${_} !== ${g}`);
        return (0, e.and)(...d);
      }
    }
  };
  return qr.default = o, qr;
}
var Lr = {}, Hi;
function lm() {
  if (Hi) return Lr;
  Hi = 1, Object.defineProperty(Lr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ ne(), n = {
    keyword: "unevaluatedItems",
    type: "array",
    schemaType: ["boolean", "object"],
    error: {
      message: ({ params: { len: o } }) => (0, e.str)`must NOT have more than ${o} items`,
      params: ({ params: { len: o } }) => (0, e._)`{limit: ${o}}`
    },
    code(o) {
      const { gen: s, schema: i, data: a, it: u } = o, f = u.items || 0;
      if (f === !0)
        return;
      const c = s.const("len", (0, e._)`${a}.length`);
      if (i === !1)
        o.setParams({ len: f }), o.fail((0, e._)`${c} > ${f}`);
      else if (typeof i == "object" && !(0, t.alwaysValidSchema)(u, i)) {
        const l = s.var("valid", (0, e._)`${c} <= ${f}`);
        s.if((0, e.not)(l), () => p(l, f)), o.ok(l);
      }
      u.items = !0;
      function p(l, h) {
        s.forRange("i", h, c, ($) => {
          o.subschema({ keyword: "unevaluatedItems", dataProp: $, dataPropType: t.Type.Num }, l), u.allErrors || s.if((0, e.not)(l), () => s.break());
        });
      }
    }
  };
  return Lr.default = n, Lr;
}
var xi;
function dm() {
  if (xi) return Dr;
  xi = 1, Object.defineProperty(Dr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ fm(), t = /* @__PURE__ */ lm(), r = [e.default, t.default];
  return Dr.default = r, Dr;
}
var Mr = {}, Fr = {}, Wi;
function hm() {
  if (Wi) return Fr;
  Wi = 1, Object.defineProperty(Fr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), r = {
    keyword: "format",
    type: ["number", "string"],
    schemaType: "string",
    $data: !0,
    error: {
      message: ({ schemaCode: n }) => (0, e.str)`must match format "${n}"`,
      params: ({ schemaCode: n }) => (0, e._)`{format: ${n}}`
    },
    code(n, o) {
      const { gen: s, data: i, $data: a, schema: u, schemaCode: f, it: c } = n, { opts: p, errSchemaPath: l, schemaEnv: h, self: $ } = c;
      if (!p.validateFormats)
        return;
      a ? v() : m();
      function v() {
        const _ = s.scopeValue("formats", {
          ref: $.formats,
          code: p.code.formats
        }), d = s.const("fDef", (0, e._)`${_}[${f}]`), g = s.let("fType"), b = s.let("format");
        s.if((0, e._)`typeof ${d} == "object" && !(${d} instanceof RegExp)`, () => s.assign(g, (0, e._)`${d}.type || "string"`).assign(b, (0, e._)`${d}.validate`), () => s.assign(g, (0, e._)`"string"`).assign(b, d)), n.fail$data((0, e.or)(y(), w()));
        function y() {
          return p.strictSchema === !1 ? e.nil : (0, e._)`${f} && !${b}`;
        }
        function w() {
          const S = h.$async ? (0, e._)`(${d}.async ? await ${b}(${i}) : ${b}(${i}))` : (0, e._)`${b}(${i})`, O = (0, e._)`(typeof ${b} == "function" ? ${S} : ${b}.test(${i}))`;
          return (0, e._)`${b} && ${b} !== true && ${g} === ${o} && !${O}`;
        }
      }
      function m() {
        const _ = $.formats[u];
        if (!_) {
          y();
          return;
        }
        if (_ === !0)
          return;
        const [d, g, b] = w(_);
        d === o && n.pass(S());
        function y() {
          if (p.strictSchema === !1) {
            $.logger.warn(O());
            return;
          }
          throw new Error(O());
          function O() {
            return `unknown format "${u}" ignored in schema at path "${l}"`;
          }
        }
        function w(O) {
          const M = O instanceof RegExp ? (0, e.regexpCode)(O) : p.code.formats ? (0, e._)`${p.code.formats}${(0, e.getProperty)(u)}` : void 0, Z = s.scopeValue("formats", { key: u, ref: O, code: M });
          return typeof O == "object" && !(O instanceof RegExp) ? [O.type || "string", O.validate, (0, e._)`${Z}.validate`] : ["string", O, Z];
        }
        function S() {
          if (typeof _ == "object" && !(_ instanceof RegExp) && _.async) {
            if (!h.$async)
              throw new Error("async format in sync schema");
            return (0, e._)`await ${b}(${i})`;
          }
          return typeof g == "function" ? (0, e._)`${b}(${i})` : (0, e._)`${b}.test(${i})`;
        }
      }
    }
  };
  return Fr.default = r, Fr;
}
var Bi;
function ru() {
  if (Bi) return Mr;
  Bi = 1, Object.defineProperty(Mr, "__esModule", { value: !0 });
  const t = [(/* @__PURE__ */ hm()).default];
  return Mr.default = t, Mr;
}
var ct = {}, Xi;
function nu() {
  return Xi || (Xi = 1, Object.defineProperty(ct, "__esModule", { value: !0 }), ct.contentVocabulary = ct.metadataVocabulary = void 0, ct.metadataVocabulary = [
    "title",
    "description",
    "default",
    "deprecated",
    "readOnly",
    "writeOnly",
    "examples"
  ], ct.contentVocabulary = [
    "contentMediaType",
    "contentEncoding",
    "contentSchema"
  ]), ct;
}
var Yi;
function pm() {
  if (Yi) return Qt;
  Yi = 1, Object.defineProperty(Qt, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ xc(), t = /* @__PURE__ */ Wc(), r = /* @__PURE__ */ Qc(), n = /* @__PURE__ */ sm(), o = /* @__PURE__ */ um(), s = /* @__PURE__ */ dm(), i = /* @__PURE__ */ ru(), a = /* @__PURE__ */ nu(), u = [
    n.default,
    e.default,
    t.default,
    (0, r.default)(!0),
    i.default,
    a.metadataVocabulary,
    a.contentVocabulary,
    o.default,
    s.default
  ];
  return Qt.default = u, Qt;
}
var Vr = {}, Ct = {}, Qi;
function mm() {
  if (Qi) return Ct;
  Qi = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.DiscrError = void 0;
  var e;
  return (function(t) {
    t.Tag = "tag", t.Mapping = "mapping";
  })(e || (Ct.DiscrError = e = {})), Ct;
}
var ea;
function ou() {
  if (ea) return Vr;
  ea = 1, Object.defineProperty(Vr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ Y(), t = /* @__PURE__ */ mm(), r = /* @__PURE__ */ ln(), n = /* @__PURE__ */ Vt(), o = /* @__PURE__ */ ne(), i = {
    keyword: "discriminator",
    type: "object",
    schemaType: "object",
    error: {
      message: ({ params: { discrError: a, tagName: u } }) => a === t.DiscrError.Tag ? `tag "${u}" must be string` : `value of tag "${u}" must be in oneOf`,
      params: ({ params: { discrError: a, tag: u, tagName: f } }) => (0, e._)`{error: ${a}, tag: ${f}, tagValue: ${u}}`
    },
    code(a) {
      const { gen: u, data: f, schema: c, parentSchema: p, it: l } = a, { oneOf: h } = p;
      if (!l.opts.discriminator)
        throw new Error("discriminator: requires discriminator option");
      const $ = c.propertyName;
      if (typeof $ != "string")
        throw new Error("discriminator: requires propertyName");
      if (c.mapping)
        throw new Error("discriminator: mapping is not supported");
      if (!h)
        throw new Error("discriminator: requires oneOf keyword");
      const v = u.let("valid", !1), m = u.const("tag", (0, e._)`${f}${(0, e.getProperty)($)}`);
      u.if((0, e._)`typeof ${m} == "string"`, () => _(), () => a.error(!1, { discrError: t.DiscrError.Tag, tag: m, tagName: $ })), a.ok(v);
      function _() {
        const b = g();
        u.if(!1);
        for (const y in b)
          u.elseIf((0, e._)`${m} === ${y}`), u.assign(v, d(b[y]));
        u.else(), a.error(!1, { discrError: t.DiscrError.Mapping, tag: m, tagName: $ }), u.endIf();
      }
      function d(b) {
        const y = u.name("valid"), w = a.subschema({ keyword: "oneOf", schemaProp: b }, y);
        return a.mergeEvaluated(w, e.Name), y;
      }
      function g() {
        var b;
        const y = {}, w = O(p);
        let S = !0;
        for (let C = 0; C < h.length; C++) {
          let V = h[C];
          if (V != null && V.$ref && !(0, o.schemaHasRulesButRef)(V, l.self.RULES)) {
            const j = V.$ref;
            if (V = r.resolveRef.call(l.self, l.schemaEnv.root, l.baseId, j), V instanceof r.SchemaEnv && (V = V.schema), V === void 0)
              throw new n.default(l.opts.uriResolver, l.baseId, j);
          }
          const G = (b = V == null ? void 0 : V.properties) === null || b === void 0 ? void 0 : b[$];
          if (typeof G != "object")
            throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${$}"`);
          S = S && (w || O(V)), M(G, C);
        }
        if (!S)
          throw new Error(`discriminator: "${$}" must be required`);
        return y;
        function O({ required: C }) {
          return Array.isArray(C) && C.includes($);
        }
        function M(C, V) {
          if (C.const)
            Z(C.const, V);
          else if (C.enum)
            for (const G of C.enum)
              Z(G, V);
          else
            throw new Error(`discriminator: "properties/${$}" must have "const" or "enum"`);
        }
        function Z(C, V) {
          if (typeof C != "string" || C in y)
            throw new Error(`discriminator: "${$}" values must be unique strings`);
          y[C] = V;
        }
      }
    }
  };
  return Vr.default = i, Vr;
}
var Ur = {};
const ym = "https://json-schema.org/draft/2020-12/schema", gm = "https://json-schema.org/draft/2020-12/schema", _m = { "https://json-schema.org/draft/2020-12/vocab/core": !0, "https://json-schema.org/draft/2020-12/vocab/applicator": !0, "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0, "https://json-schema.org/draft/2020-12/vocab/validation": !0, "https://json-schema.org/draft/2020-12/vocab/meta-data": !0, "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0, "https://json-schema.org/draft/2020-12/vocab/content": !0 }, vm = "meta", $m = "Core and Validation specifications meta-schema", wm = [{ $ref: "meta/core" }, { $ref: "meta/applicator" }, { $ref: "meta/unevaluated" }, { $ref: "meta/validation" }, { $ref: "meta/meta-data" }, { $ref: "meta/format-annotation" }, { $ref: "meta/content" }], Em = ["object", "boolean"], bm = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", Sm = { definitions: { $comment: '"definitions" has been replaced by "$defs".', type: "object", additionalProperties: { $dynamicRef: "#meta" }, deprecated: !0, default: {} }, dependencies: { $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.', type: "object", additionalProperties: { anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }] }, deprecated: !0, default: {} }, $recursiveAnchor: { $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".', $ref: "meta/core#/$defs/anchorString", deprecated: !0 }, $recursiveRef: { $comment: '"$recursiveRef" has been replaced by "$dynamicRef".', $ref: "meta/core#/$defs/uriReferenceString", deprecated: !0 } }, Rm = {
  $schema: ym,
  $id: gm,
  $vocabulary: _m,
  $dynamicAnchor: vm,
  title: $m,
  allOf: wm,
  type: Em,
  $comment: bm,
  properties: Sm
}, Pm = "https://json-schema.org/draft/2020-12/schema", Om = "https://json-schema.org/draft/2020-12/meta/applicator", Im = { "https://json-schema.org/draft/2020-12/vocab/applicator": !0 }, Nm = "meta", Tm = "Applicator vocabulary meta-schema", km = ["object", "boolean"], jm = { prefixItems: { $ref: "#/$defs/schemaArray" }, items: { $dynamicRef: "#meta" }, contains: { $dynamicRef: "#meta" }, additionalProperties: { $dynamicRef: "#meta" }, properties: { type: "object", additionalProperties: { $dynamicRef: "#meta" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $dynamicRef: "#meta" }, propertyNames: { format: "regex" }, default: {} }, dependentSchemas: { type: "object", additionalProperties: { $dynamicRef: "#meta" }, default: {} }, propertyNames: { $dynamicRef: "#meta" }, if: { $dynamicRef: "#meta" }, then: { $dynamicRef: "#meta" }, else: { $dynamicRef: "#meta" }, allOf: { $ref: "#/$defs/schemaArray" }, anyOf: { $ref: "#/$defs/schemaArray" }, oneOf: { $ref: "#/$defs/schemaArray" }, not: { $dynamicRef: "#meta" } }, Am = { schemaArray: { type: "array", minItems: 1, items: { $dynamicRef: "#meta" } } }, zm = {
  $schema: Pm,
  $id: Om,
  $vocabulary: Im,
  $dynamicAnchor: Nm,
  title: Tm,
  type: km,
  properties: jm,
  $defs: Am
}, Cm = "https://json-schema.org/draft/2020-12/schema", Dm = "https://json-schema.org/draft/2020-12/meta/unevaluated", qm = { "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0 }, Lm = "meta", Mm = "Unevaluated applicator vocabulary meta-schema", Fm = ["object", "boolean"], Vm = { unevaluatedItems: { $dynamicRef: "#meta" }, unevaluatedProperties: { $dynamicRef: "#meta" } }, Um = {
  $schema: Cm,
  $id: Dm,
  $vocabulary: qm,
  $dynamicAnchor: Lm,
  title: Mm,
  type: Fm,
  properties: Vm
}, Zm = "https://json-schema.org/draft/2020-12/schema", Gm = "https://json-schema.org/draft/2020-12/meta/content", Km = { "https://json-schema.org/draft/2020-12/vocab/content": !0 }, Jm = "meta", Hm = "Content vocabulary meta-schema", xm = ["object", "boolean"], Wm = { contentEncoding: { type: "string" }, contentMediaType: { type: "string" }, contentSchema: { $dynamicRef: "#meta" } }, Bm = {
  $schema: Zm,
  $id: Gm,
  $vocabulary: Km,
  $dynamicAnchor: Jm,
  title: Hm,
  type: xm,
  properties: Wm
}, Xm = "https://json-schema.org/draft/2020-12/schema", Ym = "https://json-schema.org/draft/2020-12/meta/core", Qm = { "https://json-schema.org/draft/2020-12/vocab/core": !0 }, ey = "meta", ty = "Core vocabulary meta-schema", ry = ["object", "boolean"], ny = { $id: { $ref: "#/$defs/uriReferenceString", $comment: "Non-empty fragments not allowed.", pattern: "^[^#]*#?$" }, $schema: { $ref: "#/$defs/uriString" }, $ref: { $ref: "#/$defs/uriReferenceString" }, $anchor: { $ref: "#/$defs/anchorString" }, $dynamicRef: { $ref: "#/$defs/uriReferenceString" }, $dynamicAnchor: { $ref: "#/$defs/anchorString" }, $vocabulary: { type: "object", propertyNames: { $ref: "#/$defs/uriString" }, additionalProperties: { type: "boolean" } }, $comment: { type: "string" }, $defs: { type: "object", additionalProperties: { $dynamicRef: "#meta" } } }, oy = { anchorString: { type: "string", pattern: "^[A-Za-z_][-A-Za-z0-9._]*$" }, uriString: { type: "string", format: "uri" }, uriReferenceString: { type: "string", format: "uri-reference" } }, sy = {
  $schema: Xm,
  $id: Ym,
  $vocabulary: Qm,
  $dynamicAnchor: ey,
  title: ty,
  type: ry,
  properties: ny,
  $defs: oy
}, iy = "https://json-schema.org/draft/2020-12/schema", ay = "https://json-schema.org/draft/2020-12/meta/format-annotation", cy = { "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0 }, uy = "meta", fy = "Format vocabulary meta-schema for annotation results", ly = ["object", "boolean"], dy = { format: { type: "string" } }, hy = {
  $schema: iy,
  $id: ay,
  $vocabulary: cy,
  $dynamicAnchor: uy,
  title: fy,
  type: ly,
  properties: dy
}, py = "https://json-schema.org/draft/2020-12/schema", my = "https://json-schema.org/draft/2020-12/meta/meta-data", yy = { "https://json-schema.org/draft/2020-12/vocab/meta-data": !0 }, gy = "meta", _y = "Meta-data vocabulary meta-schema", vy = ["object", "boolean"], $y = { title: { type: "string" }, description: { type: "string" }, default: !0, deprecated: { type: "boolean", default: !1 }, readOnly: { type: "boolean", default: !1 }, writeOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 } }, wy = {
  $schema: py,
  $id: my,
  $vocabulary: yy,
  $dynamicAnchor: gy,
  title: _y,
  type: vy,
  properties: $y
}, Ey = "https://json-schema.org/draft/2020-12/schema", by = "https://json-schema.org/draft/2020-12/meta/validation", Sy = { "https://json-schema.org/draft/2020-12/vocab/validation": !0 }, Ry = "meta", Py = "Validation vocabulary meta-schema", Oy = ["object", "boolean"], Iy = { type: { anyOf: [{ $ref: "#/$defs/simpleTypes" }, { type: "array", items: { $ref: "#/$defs/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, const: !0, enum: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/$defs/nonNegativeInteger" }, minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, maxItems: { $ref: "#/$defs/nonNegativeInteger" }, minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, maxContains: { $ref: "#/$defs/nonNegativeInteger" }, minContains: { $ref: "#/$defs/nonNegativeInteger", default: 1 }, maxProperties: { $ref: "#/$defs/nonNegativeInteger" }, minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" }, required: { $ref: "#/$defs/stringArray" }, dependentRequired: { type: "object", additionalProperties: { $ref: "#/$defs/stringArray" } } }, Ny = { nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { $ref: "#/$defs/nonNegativeInteger", default: 0 }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Ty = {
  $schema: Ey,
  $id: by,
  $vocabulary: Sy,
  $dynamicAnchor: Ry,
  title: Py,
  type: Oy,
  properties: Iy,
  $defs: Ny
};
var ta;
function ky() {
  if (ta) return Ur;
  ta = 1, Object.defineProperty(Ur, "__esModule", { value: !0 });
  const e = Rm, t = zm, r = Um, n = Bm, o = sy, s = hy, i = wy, a = Ty, u = ["/properties"];
  function f(c) {
    return [
      e,
      t,
      r,
      n,
      o,
      p(this, s),
      i,
      p(this, a)
    ].forEach((l) => this.addMetaSchema(l, void 0, !1)), this;
    function p(l, h) {
      return c ? l.$dataMetaSchema(h, u) : h;
    }
  }
  return Ur.default = f, Ur;
}
var ra;
function jy() {
  return ra || (ra = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
    const r = /* @__PURE__ */ Hc(), n = /* @__PURE__ */ pm(), o = /* @__PURE__ */ ou(), s = /* @__PURE__ */ ky(), i = "https://json-schema.org/draft/2020-12/schema";
    class a extends r.default {
      constructor(h = {}) {
        super({
          ...h,
          dynamicRef: !0,
          next: !0,
          unevaluated: !0
        });
      }
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(o.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        const { $data: h, meta: $ } = this.opts;
        $ && (s.default.call(this, h), this.refs["http://json-schema.org/schema"] = i);
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(i) ? i : void 0);
      }
    }
    t.Ajv2020 = a, e.exports = t = a, e.exports.Ajv2020 = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
    var u = /* @__PURE__ */ Ft();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return u.KeywordCxt;
    } });
    var f = /* @__PURE__ */ Y();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return f._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return f.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return f.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return f.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return f.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return f.CodeGen;
    } });
    var c = /* @__PURE__ */ fn();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return c.default;
    } });
    var p = /* @__PURE__ */ Vt();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return p.default;
    } });
  })(xt, xt.exports)), xt.exports;
}
var Ay = /* @__PURE__ */ jy(), Zr = { exports: {} }, Dn = {}, na;
function zy() {
  return na || (na = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
    function t(C, V) {
      return { validate: C, compare: V };
    }
    e.fullFormats = {
      // date: http://tools.ietf.org/html/rfc3339#section-5.6
      date: t(s, i),
      // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
      time: t(u(!0), f),
      "date-time": t(l(!0), h),
      "iso-time": t(u(), c),
      "iso-date-time": t(l(), $),
      // duration: https://tools.ietf.org/html/rfc3339#appendix-A
      duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
      uri: _,
      "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
      // uri-template: https://tools.ietf.org/html/rfc6570
      "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
      // For the source: https://gist.github.com/dperini/729294
      // For test cases: https://mathiasbynens.be/demo/url-regex
      url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
      email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
      hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
      // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
      ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
      ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
      regex: Z,
      // uuid: http://tools.ietf.org/html/rfc4122
      uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
      // JSON-pointer: https://tools.ietf.org/html/rfc6901
      // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
      "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
      "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
      // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
      "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
      // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
      // byte: https://github.com/miguelmota/is-base64
      byte: g,
      // signed 32 bit integer
      int32: { type: "number", validate: w },
      // signed 64 bit integer
      int64: { type: "number", validate: S },
      // C-type float
      float: { type: "number", validate: O },
      // C-type double
      double: { type: "number", validate: O },
      // hint to the UI to hide input strings
      password: !0,
      // unchecked string payload
      binary: !0
    }, e.fastFormats = {
      ...e.fullFormats,
      date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, i),
      time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
      "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
      "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, c),
      "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, $),
      // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
      uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
      "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
      // email (sources from jsen validator):
      // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
      // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
      email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
    }, e.formatNames = Object.keys(e.fullFormats);
    function r(C) {
      return C % 4 === 0 && (C % 100 !== 0 || C % 400 === 0);
    }
    const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, o = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function s(C) {
      const V = n.exec(C);
      if (!V)
        return !1;
      const G = +V[1], j = +V[2], D = +V[3];
      return j >= 1 && j <= 12 && D >= 1 && D <= (j === 2 && r(G) ? 29 : o[j]);
    }
    function i(C, V) {
      if (C && V)
        return C > V ? 1 : C < V ? -1 : 0;
    }
    const a = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
    function u(C) {
      return function(G) {
        const j = a.exec(G);
        if (!j)
          return !1;
        const D = +j[1], H = +j[2], K = +j[3], U = j[4], J = j[5] === "-" ? -1 : 1, A = +(j[6] || 0), P = +(j[7] || 0);
        if (A > 23 || P > 59 || C && !U)
          return !1;
        if (D <= 23 && H <= 59 && K < 60)
          return !0;
        const k = H - P * J, I = D - A * J - (k < 0 ? 1 : 0);
        return (I === 23 || I === -1) && (k === 59 || k === -1) && K < 61;
      };
    }
    function f(C, V) {
      if (!(C && V))
        return;
      const G = (/* @__PURE__ */ new Date("2020-01-01T" + C)).valueOf(), j = (/* @__PURE__ */ new Date("2020-01-01T" + V)).valueOf();
      if (G && j)
        return G - j;
    }
    function c(C, V) {
      if (!(C && V))
        return;
      const G = a.exec(C), j = a.exec(V);
      if (G && j)
        return C = G[1] + G[2] + G[3], V = j[1] + j[2] + j[3], C > V ? 1 : C < V ? -1 : 0;
    }
    const p = /t|\s/i;
    function l(C) {
      const V = u(C);
      return function(j) {
        const D = j.split(p);
        return D.length === 2 && s(D[0]) && V(D[1]);
      };
    }
    function h(C, V) {
      if (!(C && V))
        return;
      const G = new Date(C).valueOf(), j = new Date(V).valueOf();
      if (G && j)
        return G - j;
    }
    function $(C, V) {
      if (!(C && V))
        return;
      const [G, j] = C.split(p), [D, H] = V.split(p), K = i(G, D);
      if (K !== void 0)
        return K || f(j, H);
    }
    const v = /\/|:/, m = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
    function _(C) {
      return v.test(C) && m.test(C);
    }
    const d = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
    function g(C) {
      return d.lastIndex = 0, d.test(C);
    }
    const b = -2147483648, y = 2 ** 31 - 1;
    function w(C) {
      return Number.isInteger(C) && C <= y && C >= b;
    }
    function S(C) {
      return Number.isInteger(C);
    }
    function O() {
      return !0;
    }
    const M = /[^\\]\\Z/;
    function Z(C) {
      if (M.test(C))
        return !1;
      try {
        return new RegExp(C), !0;
      } catch {
        return !1;
      }
    }
  })(Dn)), Dn;
}
var qn = {}, Gr = { exports: {} }, Kr = {}, oa;
function Cy() {
  if (oa) return Kr;
  oa = 1, Object.defineProperty(Kr, "__esModule", { value: !0 });
  const e = /* @__PURE__ */ xc(), t = /* @__PURE__ */ Wc(), r = /* @__PURE__ */ Qc(), n = /* @__PURE__ */ ru(), o = /* @__PURE__ */ nu(), s = [
    e.default,
    t.default,
    (0, r.default)(),
    n.default,
    o.metadataVocabulary,
    o.contentVocabulary
  ];
  return Kr.default = s, Kr;
}
const Dy = "http://json-schema.org/draft-07/schema#", qy = "http://json-schema.org/draft-07/schema#", Ly = "Core schema meta-schema", My = { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, Fy = ["object", "boolean"], Vy = { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, Uy = {
  $schema: Dy,
  $id: qy,
  title: Ly,
  definitions: My,
  type: Fy,
  properties: Vy,
  default: !0
};
var sa;
function Zy() {
  return sa || (sa = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
    const r = /* @__PURE__ */ Hc(), n = /* @__PURE__ */ Cy(), o = /* @__PURE__ */ ou(), s = Uy, i = ["/properties"], a = "http://json-schema.org/draft-07/schema";
    class u extends r.default {
      _addVocabularies() {
        super._addVocabularies(), n.default.forEach(($) => this.addVocabulary($)), this.opts.discriminator && this.addKeyword(o.default);
      }
      _addDefaultMetaSchema() {
        if (super._addDefaultMetaSchema(), !this.opts.meta)
          return;
        const $ = this.opts.$data ? this.$dataMetaSchema(s, i) : s;
        this.addMetaSchema($, a, !1), this.refs["http://json-schema.org/schema"] = a;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
      }
    }
    t.Ajv = u, e.exports = t = u, e.exports.Ajv = u, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = u;
    var f = /* @__PURE__ */ Ft();
    Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
      return f.KeywordCxt;
    } });
    var c = /* @__PURE__ */ Y();
    Object.defineProperty(t, "_", { enumerable: !0, get: function() {
      return c._;
    } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
      return c.str;
    } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
      return c.stringify;
    } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
      return c.nil;
    } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
      return c.Name;
    } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
      return c.CodeGen;
    } });
    var p = /* @__PURE__ */ fn();
    Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
      return p.default;
    } });
    var l = /* @__PURE__ */ Vt();
    Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
      return l.default;
    } });
  })(Gr, Gr.exports)), Gr.exports;
}
var ia;
function Gy() {
  return ia || (ia = 1, (function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
    const t = /* @__PURE__ */ Zy(), r = /* @__PURE__ */ Y(), n = r.operators, o = {
      formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
      formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
      formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
      formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
    }, s = {
      message: ({ keyword: a, schemaCode: u }) => (0, r.str)`should be ${o[a].okStr} ${u}`,
      params: ({ keyword: a, schemaCode: u }) => (0, r._)`{comparison: ${o[a].okStr}, limit: ${u}}`
    };
    e.formatLimitDefinition = {
      keyword: Object.keys(o),
      type: "string",
      schemaType: "string",
      $data: !0,
      error: s,
      code(a) {
        const { gen: u, data: f, schemaCode: c, keyword: p, it: l } = a, { opts: h, self: $ } = l;
        if (!h.validateFormats)
          return;
        const v = new t.KeywordCxt(l, $.RULES.all.format.definition, "format");
        v.$data ? m() : _();
        function m() {
          const g = u.scopeValue("formats", {
            ref: $.formats,
            code: h.code.formats
          }), b = u.const("fmt", (0, r._)`${g}[${v.schemaCode}]`);
          a.fail$data((0, r.or)((0, r._)`typeof ${b} != "object"`, (0, r._)`${b} instanceof RegExp`, (0, r._)`typeof ${b}.compare != "function"`, d(b)));
        }
        function _() {
          const g = v.schema, b = $.formats[g];
          if (!b || b === !0)
            return;
          if (typeof b != "object" || b instanceof RegExp || typeof b.compare != "function")
            throw new Error(`"${p}": format "${g}" does not define "compare" function`);
          const y = u.scopeValue("formats", {
            key: g,
            ref: b,
            code: h.code.formats ? (0, r._)`${h.code.formats}${(0, r.getProperty)(g)}` : void 0
          });
          a.fail$data(d(y));
        }
        function d(g) {
          return (0, r._)`${g}.compare(${f}, ${c}) ${o[p].fail} 0`;
        }
      },
      dependencies: ["format"]
    };
    const i = (a) => (a.addKeyword(e.formatLimitDefinition), a);
    e.default = i;
  })(qn)), qn;
}
var aa;
function Ky() {
  return aa || (aa = 1, (function(e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 });
    const r = zy(), n = Gy(), o = /* @__PURE__ */ Y(), s = new o.Name("fullFormats"), i = new o.Name("fastFormats"), a = (f, c = { keywords: !0 }) => {
      if (Array.isArray(c))
        return u(f, c, r.fullFormats, s), f;
      const [p, l] = c.mode === "fast" ? [r.fastFormats, i] : [r.fullFormats, s], h = c.formats || r.formatNames;
      return u(f, h, p, l), c.keywords && (0, n.default)(f), f;
    };
    a.get = (f, c = "full") => {
      const l = (c === "fast" ? r.fastFormats : r.fullFormats)[f];
      if (!l)
        throw new Error(`Unknown format "${f}"`);
      return l;
    };
    function u(f, c, p, l) {
      var h, $;
      (h = ($ = f.opts.code).formats) !== null && h !== void 0 || ($.formats = (0, o._)`require("ajv-formats/dist/formats").${l}`);
      for (const v of c)
        f.addFormat(v, p[v]);
    }
    e.exports = t = a, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = a;
  })(Zr, Zr.exports)), Zr.exports;
}
var Jy = Ky();
const Hy = /* @__PURE__ */ Uc(Jy), xy = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const o = Object.getOwnPropertyDescriptor(e, r), s = Object.getOwnPropertyDescriptor(t, r);
  !Wy(o, s) && n || Object.defineProperty(e, r, s);
}, Wy = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, By = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, Xy = (e, t) => `/* Wrapped ${e}*/
${t}`, Yy = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), Qy = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), eg = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, o = Xy.bind(null, n, t.toString());
  Object.defineProperty(o, "name", Qy);
  const { writable: s, enumerable: i, configurable: a } = Yy;
  Object.defineProperty(e, "toString", { value: o, writable: s, enumerable: i, configurable: a });
};
function tg(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const o of Reflect.ownKeys(t))
    xy(e, t, o, r);
  return By(e, t), eg(e, t, n), e;
}
const ca = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: o = !1,
    after: s = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!o && !s)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let i, a, u;
  const f = function(...c) {
    const p = this, l = () => {
      i = void 0, a && (clearTimeout(a), a = void 0), s && (u = e.apply(p, c));
    }, h = () => {
      a = void 0, i && (clearTimeout(i), i = void 0), s && (u = e.apply(p, c));
    }, $ = o && !i;
    return clearTimeout(i), i = setTimeout(l, r), n > 0 && n !== Number.POSITIVE_INFINITY && !a && (a = setTimeout(h, n)), $ && (u = e.apply(p, c)), u;
  };
  return tg(f, e), f.cancel = () => {
    i && (clearTimeout(i), i = void 0), a && (clearTimeout(a), a = void 0);
  }, f;
};
var Jr = { exports: {} }, Ln, ua;
function dn() {
  if (ua) return Ln;
  ua = 1;
  const e = "2.0.0", t = 256, r = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, n = 16, o = t - 6;
  return Ln = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: o,
    MAX_SAFE_INTEGER: r,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, Ln;
}
var Mn, fa;
function hn() {
  return fa || (fa = 1, Mn = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), Mn;
}
var la;
function Ut() {
  return la || (la = 1, (function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: r,
      MAX_SAFE_BUILD_LENGTH: n,
      MAX_LENGTH: o
    } = dn(), s = hn();
    t = e.exports = {};
    const i = t.re = [], a = t.safeRe = [], u = t.src = [], f = t.safeSrc = [], c = t.t = {};
    let p = 0;
    const l = "[a-zA-Z0-9-]", h = [
      ["\\s", 1],
      ["\\d", o],
      [l, n]
    ], $ = (m) => {
      for (const [_, d] of h)
        m = m.split(`${_}*`).join(`${_}{0,${d}}`).split(`${_}+`).join(`${_}{1,${d}}`);
      return m;
    }, v = (m, _, d) => {
      const g = $(_), b = p++;
      s(m, b, _), c[m] = b, u[b] = _, f[b] = g, i[b] = new RegExp(_, d ? "g" : void 0), a[b] = new RegExp(g, d ? "g" : void 0);
    };
    v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${l}*`), v("MAINVERSION", `(${u[c.NUMERICIDENTIFIER]})\\.(${u[c.NUMERICIDENTIFIER]})\\.(${u[c.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${u[c.NUMERICIDENTIFIERLOOSE]})\\.(${u[c.NUMERICIDENTIFIERLOOSE]})\\.(${u[c.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${u[c.NONNUMERICIDENTIFIER]}|${u[c.NUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${u[c.NONNUMERICIDENTIFIER]}|${u[c.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASE", `(?:-(${u[c.PRERELEASEIDENTIFIER]}(?:\\.${u[c.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${u[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[c.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${l}+`), v("BUILD", `(?:\\+(${u[c.BUILDIDENTIFIER]}(?:\\.${u[c.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${u[c.MAINVERSION]}${u[c.PRERELEASE]}?${u[c.BUILD]}?`), v("FULL", `^${u[c.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${u[c.MAINVERSIONLOOSE]}${u[c.PRERELEASELOOSE]}?${u[c.BUILD]}?`), v("LOOSE", `^${u[c.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${u[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${u[c.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${u[c.XRANGEIDENTIFIER]})(?:\\.(${u[c.XRANGEIDENTIFIER]})(?:\\.(${u[c.XRANGEIDENTIFIER]})(?:${u[c.PRERELEASE]})?${u[c.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${u[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[c.XRANGEIDENTIFIERLOOSE]})(?:${u[c.PRERELEASELOOSE]})?${u[c.BUILD]}?)?)?`), v("XRANGE", `^${u[c.GTLT]}\\s*${u[c.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${u[c.GTLT]}\\s*${u[c.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), v("COERCE", `${u[c.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", u[c.COERCEPLAIN] + `(?:${u[c.PRERELEASE]})?(?:${u[c.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", u[c.COERCE], !0), v("COERCERTLFULL", u[c.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${u[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", v("TILDE", `^${u[c.LONETILDE]}${u[c.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${u[c.LONETILDE]}${u[c.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${u[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", v("CARET", `^${u[c.LONECARET]}${u[c.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${u[c.LONECARET]}${u[c.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${u[c.GTLT]}\\s*(${u[c.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${u[c.GTLT]}\\s*(${u[c.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${u[c.GTLT]}\\s*(${u[c.LOOSEPLAIN]}|${u[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${u[c.XRANGEPLAIN]})\\s+-\\s+(${u[c.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${u[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[c.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(Jr, Jr.exports)), Jr.exports;
}
var Fn, da;
function Xo() {
  if (da) return Fn;
  da = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return Fn = (n) => n ? typeof n != "object" ? e : n : t, Fn;
}
var Vn, ha;
function su() {
  if (ha) return Vn;
  ha = 1;
  const e = /^[0-9]+$/, t = (n, o) => {
    if (typeof n == "number" && typeof o == "number")
      return n === o ? 0 : n < o ? -1 : 1;
    const s = e.test(n), i = e.test(o);
    return s && i && (n = +n, o = +o), n === o ? 0 : s && !i ? -1 : i && !s ? 1 : n < o ? -1 : 1;
  };
  return Vn = {
    compareIdentifiers: t,
    rcompareIdentifiers: (n, o) => t(o, n)
  }, Vn;
}
var Un, pa;
function Re() {
  if (pa) return Un;
  pa = 1;
  const e = hn(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: r } = dn(), { safeRe: n, t: o } = Ut(), s = Xo(), { compareIdentifiers: i } = su();
  class a {
    constructor(f, c) {
      if (c = s(c), f instanceof a) {
        if (f.loose === !!c.loose && f.includePrerelease === !!c.includePrerelease)
          return f;
        f = f.version;
      } else if (typeof f != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof f}".`);
      if (f.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", f, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
      const p = f.trim().match(c.loose ? n[o.LOOSE] : n[o.FULL]);
      if (!p)
        throw new TypeError(`Invalid Version: ${f}`);
      if (this.raw = f, this.major = +p[1], this.minor = +p[2], this.patch = +p[3], this.major > r || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > r || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > r || this.patch < 0)
        throw new TypeError("Invalid patch version");
      p[4] ? this.prerelease = p[4].split(".").map((l) => {
        if (/^[0-9]+$/.test(l)) {
          const h = +l;
          if (h >= 0 && h < r)
            return h;
        }
        return l;
      }) : this.prerelease = [], this.build = p[5] ? p[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(f) {
      if (e("SemVer.compare", this.version, this.options, f), !(f instanceof a)) {
        if (typeof f == "string" && f === this.version)
          return 0;
        f = new a(f, this.options);
      }
      return f.version === this.version ? 0 : this.compareMain(f) || this.comparePre(f);
    }
    compareMain(f) {
      return f instanceof a || (f = new a(f, this.options)), this.major < f.major ? -1 : this.major > f.major ? 1 : this.minor < f.minor ? -1 : this.minor > f.minor ? 1 : this.patch < f.patch ? -1 : this.patch > f.patch ? 1 : 0;
    }
    comparePre(f) {
      if (f instanceof a || (f = new a(f, this.options)), this.prerelease.length && !f.prerelease.length)
        return -1;
      if (!this.prerelease.length && f.prerelease.length)
        return 1;
      if (!this.prerelease.length && !f.prerelease.length)
        return 0;
      let c = 0;
      do {
        const p = this.prerelease[c], l = f.prerelease[c];
        if (e("prerelease compare", c, p, l), p === void 0 && l === void 0)
          return 0;
        if (l === void 0)
          return 1;
        if (p === void 0)
          return -1;
        if (p === l)
          continue;
        return i(p, l);
      } while (++c);
    }
    compareBuild(f) {
      f instanceof a || (f = new a(f, this.options));
      let c = 0;
      do {
        const p = this.build[c], l = f.build[c];
        if (e("build compare", c, p, l), p === void 0 && l === void 0)
          return 0;
        if (l === void 0)
          return 1;
        if (p === void 0)
          return -1;
        if (p === l)
          continue;
        return i(p, l);
      } while (++c);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(f, c, p) {
      if (f.startsWith("pre")) {
        if (!c && p === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (c) {
          const l = `-${c}`.match(this.options.loose ? n[o.PRERELEASELOOSE] : n[o.PRERELEASE]);
          if (!l || l[1] !== c)
            throw new Error(`invalid identifier: ${c}`);
        }
      }
      switch (f) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", c, p);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", c, p);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", c, p), this.inc("pre", c, p);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", c, p), this.inc("pre", c, p);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const l = Number(p) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [l];
          else {
            let h = this.prerelease.length;
            for (; --h >= 0; )
              typeof this.prerelease[h] == "number" && (this.prerelease[h]++, h = -2);
            if (h === -1) {
              if (c === this.prerelease.join(".") && p === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(l);
            }
          }
          if (c) {
            let h = [c, l];
            p === !1 && (h = [c]), i(this.prerelease[0], c) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = h) : this.prerelease = h;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${f}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return Un = a, Un;
}
var Zn, ma;
function Nt() {
  if (ma) return Zn;
  ma = 1;
  const e = Re();
  return Zn = (r, n, o = !1) => {
    if (r instanceof e)
      return r;
    try {
      return new e(r, n);
    } catch (s) {
      if (!o)
        return null;
      throw s;
    }
  }, Zn;
}
var Gn, ya;
function rg() {
  if (ya) return Gn;
  ya = 1;
  const e = Nt();
  return Gn = (r, n) => {
    const o = e(r, n);
    return o ? o.version : null;
  }, Gn;
}
var Kn, ga;
function ng() {
  if (ga) return Kn;
  ga = 1;
  const e = Nt();
  return Kn = (r, n) => {
    const o = e(r.trim().replace(/^[=v]+/, ""), n);
    return o ? o.version : null;
  }, Kn;
}
var Jn, _a;
function og() {
  if (_a) return Jn;
  _a = 1;
  const e = Re();
  return Jn = (r, n, o, s, i) => {
    typeof o == "string" && (i = s, s = o, o = void 0);
    try {
      return new e(
        r instanceof e ? r.version : r,
        o
      ).inc(n, s, i).version;
    } catch {
      return null;
    }
  }, Jn;
}
var Hn, va;
function sg() {
  if (va) return Hn;
  va = 1;
  const e = Nt();
  return Hn = (r, n) => {
    const o = e(r, null, !0), s = e(n, null, !0), i = o.compare(s);
    if (i === 0)
      return null;
    const a = i > 0, u = a ? o : s, f = a ? s : o, c = !!u.prerelease.length;
    if (!!f.prerelease.length && !c) {
      if (!f.patch && !f.minor)
        return "major";
      if (f.compareMain(u) === 0)
        return f.minor && !f.patch ? "minor" : "patch";
    }
    const l = c ? "pre" : "";
    return o.major !== s.major ? l + "major" : o.minor !== s.minor ? l + "minor" : o.patch !== s.patch ? l + "patch" : "prerelease";
  }, Hn;
}
var xn, $a;
function ig() {
  if ($a) return xn;
  $a = 1;
  const e = Re();
  return xn = (r, n) => new e(r, n).major, xn;
}
var Wn, wa;
function ag() {
  if (wa) return Wn;
  wa = 1;
  const e = Re();
  return Wn = (r, n) => new e(r, n).minor, Wn;
}
var Bn, Ea;
function cg() {
  if (Ea) return Bn;
  Ea = 1;
  const e = Re();
  return Bn = (r, n) => new e(r, n).patch, Bn;
}
var Xn, ba;
function ug() {
  if (ba) return Xn;
  ba = 1;
  const e = Nt();
  return Xn = (r, n) => {
    const o = e(r, n);
    return o && o.prerelease.length ? o.prerelease : null;
  }, Xn;
}
var Yn, Sa;
function Fe() {
  if (Sa) return Yn;
  Sa = 1;
  const e = Re();
  return Yn = (r, n, o) => new e(r, o).compare(new e(n, o)), Yn;
}
var Qn, Ra;
function fg() {
  if (Ra) return Qn;
  Ra = 1;
  const e = Fe();
  return Qn = (r, n, o) => e(n, r, o), Qn;
}
var eo, Pa;
function lg() {
  if (Pa) return eo;
  Pa = 1;
  const e = Fe();
  return eo = (r, n) => e(r, n, !0), eo;
}
var to, Oa;
function Yo() {
  if (Oa) return to;
  Oa = 1;
  const e = Re();
  return to = (r, n, o) => {
    const s = new e(r, o), i = new e(n, o);
    return s.compare(i) || s.compareBuild(i);
  }, to;
}
var ro, Ia;
function dg() {
  if (Ia) return ro;
  Ia = 1;
  const e = Yo();
  return ro = (r, n) => r.sort((o, s) => e(o, s, n)), ro;
}
var no, Na;
function hg() {
  if (Na) return no;
  Na = 1;
  const e = Yo();
  return no = (r, n) => r.sort((o, s) => e(s, o, n)), no;
}
var oo, Ta;
function pn() {
  if (Ta) return oo;
  Ta = 1;
  const e = Fe();
  return oo = (r, n, o) => e(r, n, o) > 0, oo;
}
var so, ka;
function Qo() {
  if (ka) return so;
  ka = 1;
  const e = Fe();
  return so = (r, n, o) => e(r, n, o) < 0, so;
}
var io, ja;
function iu() {
  if (ja) return io;
  ja = 1;
  const e = Fe();
  return io = (r, n, o) => e(r, n, o) === 0, io;
}
var ao, Aa;
function au() {
  if (Aa) return ao;
  Aa = 1;
  const e = Fe();
  return ao = (r, n, o) => e(r, n, o) !== 0, ao;
}
var co, za;
function es() {
  if (za) return co;
  za = 1;
  const e = Fe();
  return co = (r, n, o) => e(r, n, o) >= 0, co;
}
var uo, Ca;
function ts() {
  if (Ca) return uo;
  Ca = 1;
  const e = Fe();
  return uo = (r, n, o) => e(r, n, o) <= 0, uo;
}
var fo, Da;
function cu() {
  if (Da) return fo;
  Da = 1;
  const e = iu(), t = au(), r = pn(), n = es(), o = Qo(), s = ts();
  return fo = (a, u, f, c) => {
    switch (u) {
      case "===":
        return typeof a == "object" && (a = a.version), typeof f == "object" && (f = f.version), a === f;
      case "!==":
        return typeof a == "object" && (a = a.version), typeof f == "object" && (f = f.version), a !== f;
      case "":
      case "=":
      case "==":
        return e(a, f, c);
      case "!=":
        return t(a, f, c);
      case ">":
        return r(a, f, c);
      case ">=":
        return n(a, f, c);
      case "<":
        return o(a, f, c);
      case "<=":
        return s(a, f, c);
      default:
        throw new TypeError(`Invalid operator: ${u}`);
    }
  }, fo;
}
var lo, qa;
function pg() {
  if (qa) return lo;
  qa = 1;
  const e = Re(), t = Nt(), { safeRe: r, t: n } = Ut();
  return lo = (s, i) => {
    if (s instanceof e)
      return s;
    if (typeof s == "number" && (s = String(s)), typeof s != "string")
      return null;
    i = i || {};
    let a = null;
    if (!i.rtl)
      a = s.match(i.includePrerelease ? r[n.COERCEFULL] : r[n.COERCE]);
    else {
      const h = i.includePrerelease ? r[n.COERCERTLFULL] : r[n.COERCERTL];
      let $;
      for (; ($ = h.exec(s)) && (!a || a.index + a[0].length !== s.length); )
        (!a || $.index + $[0].length !== a.index + a[0].length) && (a = $), h.lastIndex = $.index + $[1].length + $[2].length;
      h.lastIndex = -1;
    }
    if (a === null)
      return null;
    const u = a[2], f = a[3] || "0", c = a[4] || "0", p = i.includePrerelease && a[5] ? `-${a[5]}` : "", l = i.includePrerelease && a[6] ? `+${a[6]}` : "";
    return t(`${u}.${f}.${c}${p}${l}`, i);
  }, lo;
}
var ho, La;
function mg() {
  if (La) return ho;
  La = 1;
  class e {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(r) {
      const n = this.map.get(r);
      if (n !== void 0)
        return this.map.delete(r), this.map.set(r, n), n;
    }
    delete(r) {
      return this.map.delete(r);
    }
    set(r, n) {
      if (!this.delete(r) && n !== void 0) {
        if (this.map.size >= this.max) {
          const s = this.map.keys().next().value;
          this.delete(s);
        }
        this.map.set(r, n);
      }
      return this;
    }
  }
  return ho = e, ho;
}
var po, Ma;
function Ve() {
  if (Ma) return po;
  Ma = 1;
  const e = /\s+/g;
  class t {
    constructor(D, H) {
      if (H = o(H), D instanceof t)
        return D.loose === !!H.loose && D.includePrerelease === !!H.includePrerelease ? D : new t(D.raw, H);
      if (D instanceof s)
        return this.raw = D.value, this.set = [[D]], this.formatted = void 0, this;
      if (this.options = H, this.loose = !!H.loose, this.includePrerelease = !!H.includePrerelease, this.raw = D.trim().replace(e, " "), this.set = this.raw.split("||").map((K) => this.parseRange(K.trim())).filter((K) => K.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const K = this.set[0];
        if (this.set = this.set.filter((U) => !v(U[0])), this.set.length === 0)
          this.set = [K];
        else if (this.set.length > 1) {
          for (const U of this.set)
            if (U.length === 1 && m(U[0])) {
              this.set = [U];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let D = 0; D < this.set.length; D++) {
          D > 0 && (this.formatted += "||");
          const H = this.set[D];
          for (let K = 0; K < H.length; K++)
            K > 0 && (this.formatted += " "), this.formatted += H[K].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(D) {
      const K = ((this.options.includePrerelease && h) | (this.options.loose && $)) + ":" + D, U = n.get(K);
      if (U)
        return U;
      const J = this.options.loose, A = J ? u[f.HYPHENRANGELOOSE] : u[f.HYPHENRANGE];
      D = D.replace(A, V(this.options.includePrerelease)), i("hyphen replace", D), D = D.replace(u[f.COMPARATORTRIM], c), i("comparator trim", D), D = D.replace(u[f.TILDETRIM], p), i("tilde trim", D), D = D.replace(u[f.CARETTRIM], l), i("caret trim", D);
      let P = D.split(" ").map((R) => d(R, this.options)).join(" ").split(/\s+/).map((R) => C(R, this.options));
      J && (P = P.filter((R) => (i("loose invalid filter", R, this.options), !!R.match(u[f.COMPARATORLOOSE])))), i("range list", P);
      const k = /* @__PURE__ */ new Map(), I = P.map((R) => new s(R, this.options));
      for (const R of I) {
        if (v(R))
          return [R];
        k.set(R.value, R);
      }
      k.size > 1 && k.has("") && k.delete("");
      const E = [...k.values()];
      return n.set(K, E), E;
    }
    intersects(D, H) {
      if (!(D instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((K) => _(K, H) && D.set.some((U) => _(U, H) && K.every((J) => U.every((A) => J.intersects(A, H)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(D) {
      if (!D)
        return !1;
      if (typeof D == "string")
        try {
          D = new a(D, this.options);
        } catch {
          return !1;
        }
      for (let H = 0; H < this.set.length; H++)
        if (G(this.set[H], D, this.options))
          return !0;
      return !1;
    }
  }
  po = t;
  const r = mg(), n = new r(), o = Xo(), s = mn(), i = hn(), a = Re(), {
    safeRe: u,
    t: f,
    comparatorTrimReplace: c,
    tildeTrimReplace: p,
    caretTrimReplace: l
  } = Ut(), { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: $ } = dn(), v = (j) => j.value === "<0.0.0-0", m = (j) => j.value === "", _ = (j, D) => {
    let H = !0;
    const K = j.slice();
    let U = K.pop();
    for (; H && K.length; )
      H = K.every((J) => U.intersects(J, D)), U = K.pop();
    return H;
  }, d = (j, D) => (j = j.replace(u[f.BUILD], ""), i("comp", j, D), j = w(j, D), i("caret", j), j = b(j, D), i("tildes", j), j = O(j, D), i("xrange", j), j = Z(j, D), i("stars", j), j), g = (j) => !j || j.toLowerCase() === "x" || j === "*", b = (j, D) => j.trim().split(/\s+/).map((H) => y(H, D)).join(" "), y = (j, D) => {
    const H = D.loose ? u[f.TILDELOOSE] : u[f.TILDE];
    return j.replace(H, (K, U, J, A, P) => {
      i("tilde", j, K, U, J, A, P);
      let k;
      return g(U) ? k = "" : g(J) ? k = `>=${U}.0.0 <${+U + 1}.0.0-0` : g(A) ? k = `>=${U}.${J}.0 <${U}.${+J + 1}.0-0` : P ? (i("replaceTilde pr", P), k = `>=${U}.${J}.${A}-${P} <${U}.${+J + 1}.0-0`) : k = `>=${U}.${J}.${A} <${U}.${+J + 1}.0-0`, i("tilde return", k), k;
    });
  }, w = (j, D) => j.trim().split(/\s+/).map((H) => S(H, D)).join(" "), S = (j, D) => {
    i("caret", j, D);
    const H = D.loose ? u[f.CARETLOOSE] : u[f.CARET], K = D.includePrerelease ? "-0" : "";
    return j.replace(H, (U, J, A, P, k) => {
      i("caret", j, U, J, A, P, k);
      let I;
      return g(J) ? I = "" : g(A) ? I = `>=${J}.0.0${K} <${+J + 1}.0.0-0` : g(P) ? J === "0" ? I = `>=${J}.${A}.0${K} <${J}.${+A + 1}.0-0` : I = `>=${J}.${A}.0${K} <${+J + 1}.0.0-0` : k ? (i("replaceCaret pr", k), J === "0" ? A === "0" ? I = `>=${J}.${A}.${P}-${k} <${J}.${A}.${+P + 1}-0` : I = `>=${J}.${A}.${P}-${k} <${J}.${+A + 1}.0-0` : I = `>=${J}.${A}.${P}-${k} <${+J + 1}.0.0-0`) : (i("no pr"), J === "0" ? A === "0" ? I = `>=${J}.${A}.${P}${K} <${J}.${A}.${+P + 1}-0` : I = `>=${J}.${A}.${P}${K} <${J}.${+A + 1}.0-0` : I = `>=${J}.${A}.${P} <${+J + 1}.0.0-0`), i("caret return", I), I;
    });
  }, O = (j, D) => (i("replaceXRanges", j, D), j.split(/\s+/).map((H) => M(H, D)).join(" ")), M = (j, D) => {
    j = j.trim();
    const H = D.loose ? u[f.XRANGELOOSE] : u[f.XRANGE];
    return j.replace(H, (K, U, J, A, P, k) => {
      i("xRange", j, K, U, J, A, P, k);
      const I = g(J), E = I || g(A), R = E || g(P), z = R;
      return U === "=" && z && (U = ""), k = D.includePrerelease ? "-0" : "", I ? U === ">" || U === "<" ? K = "<0.0.0-0" : K = "*" : U && z ? (E && (A = 0), P = 0, U === ">" ? (U = ">=", E ? (J = +J + 1, A = 0, P = 0) : (A = +A + 1, P = 0)) : U === "<=" && (U = "<", E ? J = +J + 1 : A = +A + 1), U === "<" && (k = "-0"), K = `${U + J}.${A}.${P}${k}`) : E ? K = `>=${J}.0.0${k} <${+J + 1}.0.0-0` : R && (K = `>=${J}.${A}.0${k} <${J}.${+A + 1}.0-0`), i("xRange return", K), K;
    });
  }, Z = (j, D) => (i("replaceStars", j, D), j.trim().replace(u[f.STAR], "")), C = (j, D) => (i("replaceGTE0", j, D), j.trim().replace(u[D.includePrerelease ? f.GTE0PRE : f.GTE0], "")), V = (j) => (D, H, K, U, J, A, P, k, I, E, R, z) => (g(K) ? H = "" : g(U) ? H = `>=${K}.0.0${j ? "-0" : ""}` : g(J) ? H = `>=${K}.${U}.0${j ? "-0" : ""}` : A ? H = `>=${H}` : H = `>=${H}${j ? "-0" : ""}`, g(I) ? k = "" : g(E) ? k = `<${+I + 1}.0.0-0` : g(R) ? k = `<${I}.${+E + 1}.0-0` : z ? k = `<=${I}.${E}.${R}-${z}` : j ? k = `<${I}.${E}.${+R + 1}-0` : k = `<=${k}`, `${H} ${k}`.trim()), G = (j, D, H) => {
    for (let K = 0; K < j.length; K++)
      if (!j[K].test(D))
        return !1;
    if (D.prerelease.length && !H.includePrerelease) {
      for (let K = 0; K < j.length; K++)
        if (i(j[K].semver), j[K].semver !== s.ANY && j[K].semver.prerelease.length > 0) {
          const U = j[K].semver;
          if (U.major === D.major && U.minor === D.minor && U.patch === D.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return po;
}
var mo, Fa;
function mn() {
  if (Fa) return mo;
  Fa = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, p) {
      if (p = r(p), c instanceof t) {
        if (c.loose === !!p.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), i("comparator", c, p), this.options = p, this.loose = !!p.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, i("comp", this);
    }
    parse(c) {
      const p = this.options.loose ? n[o.COMPARATORLOOSE] : n[o.COMPARATOR], l = c.match(p);
      if (!l)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = l[1] !== void 0 ? l[1] : "", this.operator === "=" && (this.operator = ""), l[2] ? this.semver = new a(l[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (i("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new a(c, this.options);
        } catch {
          return !1;
        }
      return s(c, this.operator, this.semver, this.options);
    }
    intersects(c, p) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new u(c.value, p).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new u(this.value, p).test(c.semver) : (p = r(p), p.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !p.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || s(this.semver, "<", c.semver, p) && this.operator.startsWith(">") && c.operator.startsWith("<") || s(this.semver, ">", c.semver, p) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  mo = t;
  const r = Xo(), { safeRe: n, t: o } = Ut(), s = cu(), i = hn(), a = Re(), u = Ve();
  return mo;
}
var yo, Va;
function yn() {
  if (Va) return yo;
  Va = 1;
  const e = Ve();
  return yo = (r, n, o) => {
    try {
      n = new e(n, o);
    } catch {
      return !1;
    }
    return n.test(r);
  }, yo;
}
var go, Ua;
function yg() {
  if (Ua) return go;
  Ua = 1;
  const e = Ve();
  return go = (r, n) => new e(r, n).set.map((o) => o.map((s) => s.value).join(" ").trim().split(" ")), go;
}
var _o, Za;
function gg() {
  if (Za) return _o;
  Za = 1;
  const e = Re(), t = Ve();
  return _o = (n, o, s) => {
    let i = null, a = null, u = null;
    try {
      u = new t(o, s);
    } catch {
      return null;
    }
    return n.forEach((f) => {
      u.test(f) && (!i || a.compare(f) === -1) && (i = f, a = new e(i, s));
    }), i;
  }, _o;
}
var vo, Ga;
function _g() {
  if (Ga) return vo;
  Ga = 1;
  const e = Re(), t = Ve();
  return vo = (n, o, s) => {
    let i = null, a = null, u = null;
    try {
      u = new t(o, s);
    } catch {
      return null;
    }
    return n.forEach((f) => {
      u.test(f) && (!i || a.compare(f) === 1) && (i = f, a = new e(i, s));
    }), i;
  }, vo;
}
var $o, Ka;
function vg() {
  if (Ka) return $o;
  Ka = 1;
  const e = Re(), t = Ve(), r = pn();
  return $o = (o, s) => {
    o = new t(o, s);
    let i = new e("0.0.0");
    if (o.test(i) || (i = new e("0.0.0-0"), o.test(i)))
      return i;
    i = null;
    for (let a = 0; a < o.set.length; ++a) {
      const u = o.set[a];
      let f = null;
      u.forEach((c) => {
        const p = new e(c.semver.version);
        switch (c.operator) {
          case ">":
            p.prerelease.length === 0 ? p.patch++ : p.prerelease.push(0), p.raw = p.format();
          /* fallthrough */
          case "":
          case ">=":
            (!f || r(p, f)) && (f = p);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${c.operator}`);
        }
      }), f && (!i || r(i, f)) && (i = f);
    }
    return i && o.test(i) ? i : null;
  }, $o;
}
var wo, Ja;
function $g() {
  if (Ja) return wo;
  Ja = 1;
  const e = Ve();
  return wo = (r, n) => {
    try {
      return new e(r, n).range || "*";
    } catch {
      return null;
    }
  }, wo;
}
var Eo, Ha;
function rs() {
  if (Ha) return Eo;
  Ha = 1;
  const e = Re(), t = mn(), { ANY: r } = t, n = Ve(), o = yn(), s = pn(), i = Qo(), a = ts(), u = es();
  return Eo = (c, p, l, h) => {
    c = new e(c, h), p = new n(p, h);
    let $, v, m, _, d;
    switch (l) {
      case ">":
        $ = s, v = a, m = i, _ = ">", d = ">=";
        break;
      case "<":
        $ = i, v = u, m = s, _ = "<", d = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (o(c, p, h))
      return !1;
    for (let g = 0; g < p.set.length; ++g) {
      const b = p.set[g];
      let y = null, w = null;
      if (b.forEach((S) => {
        S.semver === r && (S = new t(">=0.0.0")), y = y || S, w = w || S, $(S.semver, y.semver, h) ? y = S : m(S.semver, w.semver, h) && (w = S);
      }), y.operator === _ || y.operator === d || (!w.operator || w.operator === _) && v(c, w.semver))
        return !1;
      if (w.operator === d && m(c, w.semver))
        return !1;
    }
    return !0;
  }, Eo;
}
var bo, xa;
function wg() {
  if (xa) return bo;
  xa = 1;
  const e = rs();
  return bo = (r, n, o) => e(r, n, ">", o), bo;
}
var So, Wa;
function Eg() {
  if (Wa) return So;
  Wa = 1;
  const e = rs();
  return So = (r, n, o) => e(r, n, "<", o), So;
}
var Ro, Ba;
function bg() {
  if (Ba) return Ro;
  Ba = 1;
  const e = Ve();
  return Ro = (r, n, o) => (r = new e(r, o), n = new e(n, o), r.intersects(n, o)), Ro;
}
var Po, Xa;
function Sg() {
  if (Xa) return Po;
  Xa = 1;
  const e = yn(), t = Fe();
  return Po = (r, n, o) => {
    const s = [];
    let i = null, a = null;
    const u = r.sort((l, h) => t(l, h, o));
    for (const l of u)
      e(l, n, o) ? (a = l, i || (i = l)) : (a && s.push([i, a]), a = null, i = null);
    i && s.push([i, null]);
    const f = [];
    for (const [l, h] of s)
      l === h ? f.push(l) : !h && l === u[0] ? f.push("*") : h ? l === u[0] ? f.push(`<=${h}`) : f.push(`${l} - ${h}`) : f.push(`>=${l}`);
    const c = f.join(" || "), p = typeof n.raw == "string" ? n.raw : String(n);
    return c.length < p.length ? c : n;
  }, Po;
}
var Oo, Ya;
function Rg() {
  if (Ya) return Oo;
  Ya = 1;
  const e = Ve(), t = mn(), { ANY: r } = t, n = yn(), o = Fe(), s = (p, l, h = {}) => {
    if (p === l)
      return !0;
    p = new e(p, h), l = new e(l, h);
    let $ = !1;
    e: for (const v of p.set) {
      for (const m of l.set) {
        const _ = u(v, m, h);
        if ($ = $ || _ !== null, _)
          continue e;
      }
      if ($)
        return !1;
    }
    return !0;
  }, i = [new t(">=0.0.0-0")], a = [new t(">=0.0.0")], u = (p, l, h) => {
    if (p === l)
      return !0;
    if (p.length === 1 && p[0].semver === r) {
      if (l.length === 1 && l[0].semver === r)
        return !0;
      h.includePrerelease ? p = i : p = a;
    }
    if (l.length === 1 && l[0].semver === r) {
      if (h.includePrerelease)
        return !0;
      l = a;
    }
    const $ = /* @__PURE__ */ new Set();
    let v, m;
    for (const O of p)
      O.operator === ">" || O.operator === ">=" ? v = f(v, O, h) : O.operator === "<" || O.operator === "<=" ? m = c(m, O, h) : $.add(O.semver);
    if ($.size > 1)
      return null;
    let _;
    if (v && m) {
      if (_ = o(v.semver, m.semver, h), _ > 0)
        return null;
      if (_ === 0 && (v.operator !== ">=" || m.operator !== "<="))
        return null;
    }
    for (const O of $) {
      if (v && !n(O, String(v), h) || m && !n(O, String(m), h))
        return null;
      for (const M of l)
        if (!n(O, String(M), h))
          return !1;
      return !0;
    }
    let d, g, b, y, w = m && !h.includePrerelease && m.semver.prerelease.length ? m.semver : !1, S = v && !h.includePrerelease && v.semver.prerelease.length ? v.semver : !1;
    w && w.prerelease.length === 1 && m.operator === "<" && w.prerelease[0] === 0 && (w = !1);
    for (const O of l) {
      if (y = y || O.operator === ">" || O.operator === ">=", b = b || O.operator === "<" || O.operator === "<=", v) {
        if (S && O.semver.prerelease && O.semver.prerelease.length && O.semver.major === S.major && O.semver.minor === S.minor && O.semver.patch === S.patch && (S = !1), O.operator === ">" || O.operator === ">=") {
          if (d = f(v, O, h), d === O && d !== v)
            return !1;
        } else if (v.operator === ">=" && !n(v.semver, String(O), h))
          return !1;
      }
      if (m) {
        if (w && O.semver.prerelease && O.semver.prerelease.length && O.semver.major === w.major && O.semver.minor === w.minor && O.semver.patch === w.patch && (w = !1), O.operator === "<" || O.operator === "<=") {
          if (g = c(m, O, h), g === O && g !== m)
            return !1;
        } else if (m.operator === "<=" && !n(m.semver, String(O), h))
          return !1;
      }
      if (!O.operator && (m || v) && _ !== 0)
        return !1;
    }
    return !(v && b && !m && _ !== 0 || m && y && !v && _ !== 0 || S || w);
  }, f = (p, l, h) => {
    if (!p)
      return l;
    const $ = o(p.semver, l.semver, h);
    return $ > 0 ? p : $ < 0 || l.operator === ">" && p.operator === ">=" ? l : p;
  }, c = (p, l, h) => {
    if (!p)
      return l;
    const $ = o(p.semver, l.semver, h);
    return $ < 0 ? p : $ > 0 || l.operator === "<" && p.operator === "<=" ? l : p;
  };
  return Oo = s, Oo;
}
var Io, Qa;
function Pg() {
  if (Qa) return Io;
  Qa = 1;
  const e = Ut(), t = dn(), r = Re(), n = su(), o = Nt(), s = rg(), i = ng(), a = og(), u = sg(), f = ig(), c = ag(), p = cg(), l = ug(), h = Fe(), $ = fg(), v = lg(), m = Yo(), _ = dg(), d = hg(), g = pn(), b = Qo(), y = iu(), w = au(), S = es(), O = ts(), M = cu(), Z = pg(), C = mn(), V = Ve(), G = yn(), j = yg(), D = gg(), H = _g(), K = vg(), U = $g(), J = rs(), A = wg(), P = Eg(), k = bg(), I = Sg(), E = Rg();
  return Io = {
    parse: o,
    valid: s,
    clean: i,
    inc: a,
    diff: u,
    major: f,
    minor: c,
    patch: p,
    prerelease: l,
    compare: h,
    rcompare: $,
    compareLoose: v,
    compareBuild: m,
    sort: _,
    rsort: d,
    gt: g,
    lt: b,
    eq: y,
    neq: w,
    gte: S,
    lte: O,
    cmp: M,
    coerce: Z,
    Comparator: C,
    Range: V,
    satisfies: G,
    toComparators: j,
    maxSatisfying: D,
    minSatisfying: H,
    minVersion: K,
    validRange: U,
    outside: J,
    gtr: A,
    ltr: P,
    intersects: k,
    simplifyRange: I,
    subset: E,
    SemVer: r,
    re: e.re,
    src: e.src,
    tokens: e.t,
    SEMVER_SPEC_VERSION: t.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: t.RELEASE_TYPES,
    compareIdentifiers: n.compareIdentifiers,
    rcompareIdentifiers: n.rcompareIdentifiers
  }, Io;
}
var Og = Pg();
const wt = /* @__PURE__ */ Uc(Og), Ig = Object.prototype.toString, Ng = "[object Uint8Array]", Tg = "[object ArrayBuffer]";
function uu(e, t, r) {
  return e ? e.constructor === t ? !0 : Ig.call(e) === r : !1;
}
function fu(e) {
  return uu(e, Uint8Array, Ng);
}
function kg(e) {
  return uu(e, ArrayBuffer, Tg);
}
function jg(e) {
  return fu(e) || kg(e);
}
function Ag(e) {
  if (!fu(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function zg(e) {
  if (!jg(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function No(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((o, s) => o + s.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const o of e)
    Ag(o), r.set(o, n), n += o.length;
  return r;
}
const Hr = {
  utf8: new globalThis.TextDecoder("utf8")
};
function xr(e, t = "utf8") {
  return zg(e), Hr[t] ?? (Hr[t] = new globalThis.TextDecoder(t)), Hr[t].decode(e);
}
function Cg(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const Dg = new globalThis.TextEncoder();
function To(e) {
  return Cg(e), Dg.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const ec = "aes-256-cbc", lu = /* @__PURE__ */ new Set([
  "aes-256-cbc",
  "aes-256-gcm",
  "aes-256-ctr"
]), qg = (e) => typeof e == "string" && lu.has(e), We = () => /* @__PURE__ */ Object.create(null), tc = (e) => e !== void 0, ko = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, et = "__internal__", jo = `${et}.migrations.version`;
var rt, nt, ut, Ne, Ae, ft, lt, Ot, Ue, pe, du, hu, pu, mu, yu, gu, _u, vu;
class Lg {
  constructor(t = {}) {
    De(this, pe);
    kt(this, "path");
    kt(this, "events");
    De(this, rt);
    De(this, nt);
    De(this, ut);
    De(this, Ne);
    De(this, Ae, {});
    De(this, ft, !1);
    De(this, lt);
    De(this, Ot);
    De(this, Ue);
    kt(this, "_deserialize", (t) => JSON.parse(t));
    kt(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = Ge(this, pe, du).call(this, t);
    Ie(this, Ne, r), Ge(this, pe, hu).call(this, r), Ge(this, pe, mu).call(this, r), Ge(this, pe, yu).call(this, r), this.events = new EventTarget(), Ie(this, nt, r.encryptionKey), Ie(this, ut, r.encryptionAlgorithm ?? ec), this.path = Ge(this, pe, gu).call(this, r), Ge(this, pe, _u).call(this, r), r.watch && this._watch();
  }
  get(t, r) {
    if (Q(this, Ne).accessPropertiesByDotNotation)
      return this._get(t, r);
    const { store: n } = this;
    return t in n ? n[t] : r;
  }
  set(t, r) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${et} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, o = (s, i) => {
      if (ko(s, i), Q(this, Ne).accessPropertiesByDotNotation)
        Jt(n, s, i);
      else {
        if (s === "__proto__" || s === "constructor" || s === "prototype")
          return;
        n[s] = i;
      }
    };
    if (typeof t == "object") {
      const s = t;
      for (const [i, a] of Object.entries(s))
        o(i, a);
    } else
      o(t, r);
    this.store = n;
  }
  has(t) {
    return Q(this, Ne).accessPropertiesByDotNotation ? Sn(this.store, t) : t in this.store;
  }
  appendToArray(t, r) {
    ko(t, r);
    const n = Q(this, Ne).accessPropertiesByDotNotation ? this._get(t, []) : t in this.store ? this.store[t] : [];
    if (!Array.isArray(n))
      throw new TypeError(`The key \`${t}\` is already set to a non-array value`);
    this.set(t, [...n, r]);
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      tc(Q(this, Ae)[r]) && this.set(r, Q(this, Ae)[r]);
  }
  delete(t) {
    const { store: r } = this;
    Q(this, Ne).accessPropertiesByDotNotation ? Qh(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    const t = We();
    for (const r of Object.keys(Q(this, Ae)))
      tc(Q(this, Ae)[r]) && (ko(r, Q(this, Ae)[r]), Q(this, Ne).accessPropertiesByDotNotation ? Jt(t, r, Q(this, Ae)[r]) : t[r] = Q(this, Ae)[r]);
    this.store = t;
  }
  onDidChange(t, r) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleValueChange(() => this.get(t), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleStoreChange(t);
  }
  get size() {
    return Object.keys(this.store).filter((r) => !this._isReservedKeyPath(r)).length;
  }
  /**
      Get all the config as an object or replace the current config with an object.
  
      @example
      ```
      console.log(config.store);
      //=> {name: 'John', age: 30}
      ```
  
      @example
      ```
      config.store = {
          hello: 'world'
      };
      ```
      */
  get store() {
    var t;
    try {
      const r = ee.readFileSync(this.path, Q(this, nt) ? null : "utf8"), n = this._decryptData(r);
      return ((s) => {
        const i = this._deserialize(s);
        return Q(this, ft) || this._validate(i), Object.assign(We(), i);
      })(n);
    } catch (r) {
      if ((r == null ? void 0 : r.code) === "ENOENT")
        return this._ensureDirectory(), We();
      if (Q(this, Ne).clearInvalidConfig) {
        const n = r;
        if (n.name === "SyntaxError" || (t = n.message) != null && t.startsWith("Config schema violation:") || n.message === "Failed to decrypt config data.")
          return We();
      }
      throw r;
    }
  }
  set store(t) {
    if (this._ensureDirectory(), !Sn(t, et))
      try {
        const r = ee.readFileSync(this.path, Q(this, nt) ? null : "utf8"), n = this._decryptData(r), o = this._deserialize(n);
        Sn(o, et) && Jt(t, et, Os(o, et));
      } catch {
      }
    Q(this, ft) || this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      this._isReservedKeyPath(t) || (yield [t, r]);
  }
  /**
  Close the file watcher if one exists. This is useful in tests to prevent the process from hanging.
  */
  _closeWatcher() {
    Q(this, lt) && (Q(this, lt).close(), Ie(this, lt, void 0)), Q(this, Ot) && (ee.unwatchFile(this.path), Ie(this, Ot, !1)), Ie(this, Ue, void 0);
  }
  _decryptData(t) {
    const r = Q(this, nt);
    if (!r)
      return typeof t == "string" ? t : xr(t);
    const n = Q(this, ut), o = n === "aes-256-gcm" ? 16 : 0, s = ":".codePointAt(0), i = typeof t == "string" ? t.codePointAt(16) : t[16];
    if (!(s !== void 0 && i === s)) {
      if (n === "aes-256-cbc")
        return typeof t == "string" ? t : xr(t);
      throw new Error("Failed to decrypt config data.");
    }
    const u = (h) => {
      if (o === 0)
        return { ciphertext: h };
      const $ = h.length - o;
      if ($ < 0)
        throw new Error("Invalid authentication tag length.");
      return {
        ciphertext: h.slice(0, $),
        authenticationTag: h.slice($)
      };
    }, f = t.slice(0, 16), c = t.slice(17), p = typeof c == "string" ? To(c) : c, l = (h) => {
      const { ciphertext: $, authenticationTag: v } = u(p), m = jt.pbkdf2Sync(r, h, 1e4, 32, "sha512"), _ = jt.createDecipheriv(n, m, f);
      return v && _.setAuthTag(v), xr(No([_.update($), _.final()]));
    };
    try {
      return l(f);
    } catch {
      try {
        return l(f.toString());
      } catch {
      }
    }
    if (n === "aes-256-cbc")
      return typeof t == "string" ? t : xr(t);
    throw new Error("Failed to decrypt config data.");
  }
  _handleStoreChange(t) {
    let r = this.store;
    const n = () => {
      const o = r, s = this.store;
      is(s, o) || (r = s, t.call(this, s, o));
    };
    return this.events.addEventListener("change", n), () => {
      this.events.removeEventListener("change", n);
    };
  }
  _handleValueChange(t, r) {
    let n = t();
    const o = () => {
      const s = n, i = t();
      is(i, s) || (n = i, r.call(this, i, s));
    };
    return this.events.addEventListener("change", o), () => {
      this.events.removeEventListener("change", o);
    };
  }
  _validate(t) {
    if (!Q(this, rt) || Q(this, rt).call(this, t) || !Q(this, rt).errors)
      return;
    const n = Q(this, rt).errors.map(({ instancePath: o, message: s = "" }) => `\`${o.slice(1)}\` ${s}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    ee.mkdirSync(se.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    const n = Q(this, nt);
    if (n) {
      const o = jt.randomBytes(16), s = jt.pbkdf2Sync(n, o, 1e4, 32, "sha512"), i = jt.createCipheriv(Q(this, ut), s, o), a = No([i.update(To(r)), i.final()]), u = [o, To(":"), a];
      Q(this, ut) === "aes-256-gcm" && u.push(i.getAuthTag()), r = No(u);
    }
    if (ue.env.SNAP)
      ee.writeFileSync(this.path, r, { mode: Q(this, Ne).configFileMode });
    else
      try {
        Vc(this.path, r, { mode: Q(this, Ne).configFileMode });
      } catch (o) {
        if ((o == null ? void 0 : o.code) === "EXDEV") {
          ee.writeFileSync(this.path, r, { mode: Q(this, Ne).configFileMode });
          return;
        }
        throw o;
      }
  }
  _watch() {
    if (this._ensureDirectory(), ee.existsSync(this.path) || this._write(We()), ue.platform === "win32" || ue.platform === "darwin") {
      Q(this, Ue) ?? Ie(this, Ue, ca(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 100 }));
      const t = se.dirname(this.path), r = se.basename(this.path);
      Ie(this, lt, ee.watch(t, { persistent: !1, encoding: "utf8" }, (n, o) => {
        o && o !== r || typeof Q(this, Ue) == "function" && Q(this, Ue).call(this);
      }));
    } else
      Q(this, Ue) ?? Ie(this, Ue, ca(() => {
        this.events.dispatchEvent(new Event("change"));
      }, { wait: 1e3 })), ee.watchFile(this.path, { persistent: !1 }, (t, r) => {
        typeof Q(this, Ue) == "function" && Q(this, Ue).call(this);
      }), Ie(this, Ot, !0);
  }
  _migrate(t, r, n) {
    let o = this._get(jo, "0.0.0");
    const s = Object.keys(t).filter((a) => this._shouldPerformMigration(a, o, r));
    let i = structuredClone(this.store);
    for (const a of s)
      try {
        n && n(this, {
          fromVersion: o,
          toVersion: a,
          finalVersion: r,
          versions: s
        });
        const u = t[a];
        u == null || u(this), this._set(jo, a), o = a, i = structuredClone(this.store);
      } catch (u) {
        this.store = i;
        const f = u instanceof Error ? u.message : String(u);
        throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${f}`);
      }
    (this._isVersionInRangeFormat(o) || !wt.eq(o, r)) && this._set(jo, r);
  }
  _containsReservedKey(t) {
    return typeof t == "string" ? this._isReservedKeyPath(t) : !t || typeof t != "object" ? !1 : this._objectContainsReservedKey(t);
  }
  _objectContainsReservedKey(t) {
    if (!t || typeof t != "object")
      return !1;
    for (const [r, n] of Object.entries(t))
      if (this._isReservedKeyPath(r) || this._objectContainsReservedKey(n))
        return !0;
    return !1;
  }
  _isReservedKeyPath(t) {
    return t === et || t.startsWith(`${et}.`);
  }
  _isVersionInRangeFormat(t) {
    return wt.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && wt.satisfies(r, t) ? !1 : wt.satisfies(n, t) : !(wt.lte(t, r) || wt.gt(t, n));
  }
  _get(t, r) {
    return Os(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    Jt(n, t, r), this.store = n;
  }
}
rt = new WeakMap(), nt = new WeakMap(), ut = new WeakMap(), Ne = new WeakMap(), Ae = new WeakMap(), ft = new WeakMap(), lt = new WeakMap(), Ot = new WeakMap(), Ue = new WeakMap(), pe = new WeakSet(), du = function(t) {
  const r = {
    configName: "config",
    fileExtension: "json",
    projectSuffix: "nodejs",
    clearInvalidConfig: !1,
    accessPropertiesByDotNotation: !0,
    configFileMode: 438,
    ...t
  };
  if (r.encryptionAlgorithm ?? (r.encryptionAlgorithm = ec), !qg(r.encryptionAlgorithm))
    throw new TypeError(`The \`encryptionAlgorithm\` option must be one of: ${[...lu].join(", ")}`);
  if (!r.cwd) {
    if (!r.projectName)
      throw new Error("Please specify the `projectName` option.");
    r.cwd = np(r.projectName, { suffix: r.projectSuffix }).config;
  }
  return typeof r.fileExtension == "string" && (r.fileExtension = r.fileExtension.replace(/^\.+/, "")), r;
}, hu = function(t) {
  if (!(t.schema ?? t.ajvOptions ?? t.rootSchema))
    return;
  if (t.schema && typeof t.schema != "object")
    throw new TypeError("The `schema` option must be an object.");
  const r = Hy.default, n = new Ay.Ajv2020({
    allErrors: !0,
    useDefaults: !0,
    ...t.ajvOptions
  });
  r(n);
  const o = {
    ...t.rootSchema,
    type: "object",
    properties: t.schema
  };
  Ie(this, rt, n.compile(o)), Ge(this, pe, pu).call(this, t.schema);
}, pu = function(t) {
  const r = Object.entries(t ?? {});
  for (const [n, o] of r) {
    if (!o || typeof o != "object" || !Object.hasOwn(o, "default"))
      continue;
    const { default: s } = o;
    s !== void 0 && (Q(this, Ae)[n] = s);
  }
}, mu = function(t) {
  t.defaults && Object.assign(Q(this, Ae), t.defaults);
}, yu = function(t) {
  t.serialize && (this._serialize = t.serialize), t.deserialize && (this._deserialize = t.deserialize);
}, gu = function(t) {
  const r = typeof t.fileExtension == "string" ? t.fileExtension : void 0, n = r ? `.${r}` : "";
  return se.resolve(t.cwd, `${t.configName ?? "config"}${n}`);
}, _u = function(t) {
  if (t.migrations) {
    Ge(this, pe, vu).call(this, t), this._validate(this.store);
    return;
  }
  const r = this.store, n = Object.assign(We(), t.defaults ?? {}, r);
  this._validate(n);
  try {
    as.deepEqual(r, n);
  } catch {
    this.store = n;
  }
}, vu = function(t) {
  const { migrations: r, projectVersion: n } = t;
  if (r) {
    if (!n)
      throw new Error("Please specify the `projectVersion` option.");
    Ie(this, ft, !0);
    try {
      const o = this.store, s = Object.assign(We(), t.defaults ?? {}, o);
      try {
        as.deepEqual(o, s);
      } catch {
        this._write(s);
      }
      this._migrate(r, n, t.beforeEachMigration);
    } finally {
      Ie(this, ft, !1);
    }
  }
};
const { app: Wr, ipcMain: qo, shell: Mg } = ic;
let rc = !1;
const nc = () => {
  if (!qo || !Wr)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Wr.getPath("userData"),
    appVersion: Wr.getVersion()
  };
  return rc || (qo.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), rc = !0), e;
};
class Fg extends Lg {
  constructor(t) {
    let r, n;
    if (ue.type === "renderer") {
      const o = ic.ipcRenderer.sendSync("electron-store-get-data");
      if (!o)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = o);
    } else qo && Wr && ({ defaultCwd: r, appVersion: n } = nc());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = se.isAbsolute(t.cwd) ? t.cwd : se.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    nc();
  }
  async openInEditor() {
    const t = await Mg.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
const $u = new Fg({
  name: "northstar-preferences",
  defaults: {
    preferences: {
      ui: Bh
    }
  }
});
function wu() {
  return Cc.parse($u.get("preferences.ui"));
}
function Vg(e) {
  const t = Dc.parse(e);
  return $u.set("preferences.ui", t), wu();
}
function Ug() {
  wn.handle(En.metaGet, () => {
    const e = {
      appName: "Northstar Desk",
      appVersion: qt.getVersion(),
      desktopFocus: "面向 AI 持续扩展页面的 Electron 工作台基座。",
      layers: [
        {
          name: "main",
          responsibility: "窗口、系统能力、设置存储和 IPC handler。"
        },
        {
          name: "preload",
          responsibility: "对渲染层暴露最小且强类型的桥接 API。"
        },
        {
          name: "renderer",
          responsibility: "React 路由、界面、表单、查询和交互状态。"
        },
        {
          name: "shared",
          responsibility: "跨层共享 schema、类型、导航元数据和 IPC 合约。"
        }
      ]
    };
    return Hh.parse(e);
  }), wn.handle(En.settingsGet, () => wu()), wn.handle(En.settingsUpdate, (e, t) => Vg(Dc.parse(t)));
}
const oc = se.dirname(Ru(import.meta.url));
function sc() {
  const e = new ac({
    width: 1440,
    height: 920,
    minWidth: 1180,
    minHeight: 760,
    backgroundColor: "#f4efe7",
    title: "Northstar Desk",
    webPreferences: {
      preload: se.join(oc, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    }
  });
  return process.env.VITE_DEV_SERVER_URL ? e.loadURL(process.env.VITE_DEV_SERVER_URL) : e.loadFile(se.join(oc, "../dist/index.html")), e;
}
qt.whenReady().then(() => {
  Ug(), sc(), qt.on("activate", () => {
    ac.getAllWindows().length === 0 && sc();
  });
});
qt.on("window-all-closed", () => {
  process.platform !== "darwin" && qt.quit();
});
