/*!
  Highlight.js v11.7.0 (git: 82688fad18)
  (c) 2006-2022 undefined and other contributors
  License: BSD-3-Clause
 */
var hljs = function () {
  "use strict"; var e = { exports: {} }; function t(e) {
    return e instanceof Map ? e.clear = e.delete = e.set = () => {
      throw Error("map is read-only")
    } : e instanceof Set && (e.add = e.clear = e.delete = () => {
      throw Error("set is read-only")
    }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((n => {
      var i = e[n]
      ; "object" != typeof i || Object.isFrozen(i) || t(i)
    })), e
  }
  e.exports = t, e.exports.default = t; class n {
    constructor(e) {
      void 0 === e.data && (e.data = {}), this.data = e.data, this.isMatchIgnored = !1
    }
    ignoreMatch() { this.isMatchIgnored = !0 }
  } function i(e) {
    return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
  } function r(e, ...t) {
    const n = Object.create(null); for (const t in e) n[t] = e[t]
      ; return t.forEach((e => { for (const t in e) n[t] = e[t] })), n
  }
  const s = e => !!e.scope || e.sublanguage && e.language; class o {
    constructor(e, t) {
      this.buffer = "", this.classPrefix = t.classPrefix, e.walk(this)
    } addText(e) {
      this.buffer += i(e)
    } openNode(e) {
      if (!s(e)) return; let t = ""
        ; t = e.sublanguage ? "language-" + e.language : ((e, { prefix: t }) => {
          if (e.includes(".")) {
            const n = e.split(".")
              ; return [`${t}${n.shift()}`, ...n.map(((e, t) => `${e}${"_".repeat(t + 1)}`))].join(" ")
          } return `${t}${e}`
        })(e.scope, { prefix: this.classPrefix }), this.span(t)
    }
    closeNode(e) { s(e) && (this.buffer += "</span>") } value() { return this.buffer } span(e) {
      this.buffer += `<span class="${e}">`
    }
  } const a = (e = {}) => {
    const t = { children: [] }
    ; return Object.assign(t, e), t
  }; class c {
    constructor() {
      this.rootNode = a(), this.stack = [this.rootNode]
    } get top() {
      return this.stack[this.stack.length - 1]
    } get root() { return this.rootNode } add(e) {
      this.top.children.push(e)
    } openNode(e) {
      const t = a({ scope: e })
      ; this.add(t), this.stack.push(t)
    } closeNode() {
      if (this.stack.length > 1) return this.stack.pop()
    } closeAllNodes() {
      for (; this.closeNode(););
    } toJSON() { return JSON.stringify(this.rootNode, null, 4) }
    walk(e) { return this.constructor._walk(e, this.rootNode) } static _walk(e, t) {
      return "string" == typeof t ? e.addText(t) : t.children && (e.openNode(t),
        t.children.forEach((t => this._walk(e, t))), e.closeNode(t)), e
    } static _collapse(e) {
      "string" != typeof e && e.children && (e.children.every((e => "string" == typeof e)) ? e.children = [e.children.join("")] : e.children.forEach((e => {
        c._collapse(e)
      })))
    }
  } class l extends c {
    constructor(e) { super(), this.options = e }
    addKeyword(e, t) { "" !== e && (this.openNode(t), this.addText(e), this.closeNode()) }
    addText(e) { "" !== e && this.add(e) } addSublanguage(e, t) {
      const n = e.root
      ; n.sublanguage = !0, n.language = t, this.add(n)
    } toHTML() {
      return new o(this, this.options).value()
    } finalize() { return !0 }
  } function g(e) {
    return e ? "string" == typeof e ? e : e.source : null
  } function d(e) { return p("(?=", e, ")") }
  function u(e) { return p("(?:", e, ")*") } function h(e) { return p("(?:", e, ")?") }
  function p(...e) { return e.map((e => g(e))).join("") } function f(...e) {
    const t = (e => {
      const t = e[e.length - 1]
        ; return "object" == typeof t && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {}
    })(e); return "(" + (t.capture ? "" : "?:") + e.map((e => g(e))).join("|") + ")"
  }
  function b(e) { return RegExp(e.toString() + "|").exec("").length - 1 }
  const m = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
    ; function E(e, { joinWith: t }) {
      let n = 0; return e.map((e => {
        n += 1; const t = n
          ; let i = g(e), r = ""; for (; i.length > 0;) {
            const e = m.exec(i); if (!e) { r += i; break }
            r += i.substring(0, e.index),
              i = i.substring(e.index + e[0].length), "\\" === e[0][0] && e[1] ? r += "\\" + (Number(e[1]) + t) : (r += e[0],
                "(" === e[0] && n++)
          } return r
      })).map((e => `(${e})`)).join(t)
    }
  const x = "[a-zA-Z]\\w*", w = "[a-zA-Z_]\\w*", y = "\\b\\d+(\\.\\d+)?", _ = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", O = "\\b(0b[01]+)", v = {
    begin: "\\\\[\\s\\S]", relevance: 0
  }, N = {
    scope: "string", begin: "'", end: "'",
    illegal: "\\n", contains: [v]
  }, k = {
    scope: "string", begin: '"', end: '"', illegal: "\\n",
    contains: [v]
  }, M = (e, t, n = {}) => {
    const i = r({
      scope: "comment", begin: e, end: t,
      contains: []
    }, n); i.contains.push({
      scope: "doctag",
      begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
      end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/, excludeBegin: !0, relevance: 0
    })
      ; const s = f("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/)
      ; return i.contains.push({ begin: p(/[ ]+/, "(", s, /[.]?[:]?([.][ ]|[ ])/, "){3}") }), i
  }, S = M("//", "$"), R = M("/\\*", "\\*/"), j = M("#", "$"); var A = Object.freeze({
    __proto__: null, MATCH_NOTHING_RE: /\b\B/, IDENT_RE: x, UNDERSCORE_IDENT_RE: w,
    NUMBER_RE: y, C_NUMBER_RE: _, BINARY_NUMBER_RE: O,
    RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
    SHEBANG: (e = {}) => {
      const t = /^#![ ]*\//
      ; return e.binary && (e.begin = p(t, /.*\b/, e.binary, /\b.*/)), r({
        scope: "meta", begin: t,
        end: /$/, relevance: 0, "on:begin": (e, t) => { 0 !== e.index && t.ignoreMatch() }
      }, e)
    },
    BACKSLASH_ESCAPE: v, APOS_STRING_MODE: N, QUOTE_STRING_MODE: k, PHRASAL_WORDS_MODE: {
      begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }, COMMENT: M, C_LINE_COMMENT_MODE: S, C_BLOCK_COMMENT_MODE: R, HASH_COMMENT_MODE: j,
    NUMBER_MODE: { scope: "number", begin: y, relevance: 0 }, C_NUMBER_MODE: {
      scope: "number",
      begin: _, relevance: 0
    }, BINARY_NUMBER_MODE: { scope: "number", begin: O, relevance: 0 },
    REGEXP_MODE: {
      begin: /(?=\/[^/\n]*\/)/, contains: [{
        scope: "regexp", begin: /\//,
        end: /\/[gimuy]*/, illegal: /\n/, contains: [v, {
          begin: /\[/, end: /\]/, relevance: 0,
          contains: [v]
        }]
      }]
    }, TITLE_MODE: { scope: "title", begin: x, relevance: 0 },
    UNDERSCORE_TITLE_MODE: { scope: "title", begin: w, relevance: 0 }, METHOD_GUARD: {
      begin: "\\.\\s*[a-zA-Z_]\\w*", relevance: 0
    }, END_SAME_AS_BEGIN: e => Object.assign(e, {
      "on:begin": (e, t) => { t.data._beginMatch = e[1] }, "on:end": (e, t) => {
        t.data._beginMatch !== e[1] && t.ignoreMatch()
      }
    })
  }); function I(e, t) {
    "." === e.input[e.index - 1] && t.ignoreMatch()
  } function T(e, t) {
    void 0 !== e.className && (e.scope = e.className, delete e.className)
  } function L(e, t) {
    t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)",
      e.__beforeBegin = I, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords,
      void 0 === e.relevance && (e.relevance = 0))
  } function B(e, t) {
    Array.isArray(e.illegal) && (e.illegal = f(...e.illegal))
  } function D(e, t) {
    if (e.match) {
      if (e.begin || e.end) throw Error("begin & end are not supported with match")
        ; e.begin = e.match, delete e.match
    }
  } function H(e, t) {
    void 0 === e.relevance && (e.relevance = 1)
  } const P = (e, t) => {
    if (!e.beforeMatch) return
      ; if (e.starts) throw Error("beforeMatch cannot be used with starts")
        ; const n = Object.assign({}, e); Object.keys(e).forEach((t => {
          delete e[t]
        })), e.keywords = n.keywords, e.begin = p(n.beforeMatch, d(n.begin)), e.starts = {
          relevance: 0, contains: [Object.assign(n, { endsParent: !0 })]
        }, e.relevance = 0, delete n.beforeMatch
  }, C = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"]
    ; function $(e, t, n = "keyword") {
      const i = Object.create(null)
      ; return "string" == typeof e ? r(n, e.split(" ")) : Array.isArray(e) ? r(n, e) : Object.keys(e).forEach((n => {
        Object.assign(i, $(e[n], t, n))
      })), i; function r(e, n) {
        t && (n = n.map((e => e.toLowerCase()))), n.forEach((t => {
          const n = t.split("|")
          ; i[n[0]] = [e, U(n[0], n[1])]
        }))
      }
    } function U(e, t) {
      return t ? Number(t) : (e => C.includes(e.toLowerCase()))(e) ? 0 : 1
    } const z = {}, K = e => {
      console.error(e)
    }, W = (e, ...t) => { console.log("WARN: " + e, ...t) }, X = (e, t) => {
      z[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), z[`${e}/${t}`] = !0)
    }, G = Error(); function Z(e, t, { key: n }) {
      let i = 0; const r = e[n], s = {}, o = {}
        ; for (let e = 1; e <= t.length; e++)o[e + i] = r[e], s[e + i] = !0, i += b(t[e - 1])
          ; e[n] = o, e[n]._emit = s, e[n]._multi = !0
    } function F(e) {
      (e => {
        e.scope && "object" == typeof e.scope && null !== e.scope && (e.beginScope = e.scope,
          delete e.scope)
      })(e), "string" == typeof e.beginScope && (e.beginScope = {
        _wrap: e.beginScope
      }), "string" == typeof e.endScope && (e.endScope = {
        _wrap: e.endScope
      }), (e => {
        if (Array.isArray(e.begin)) {
          if (e.skip || e.excludeBegin || e.returnBegin) throw K("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
            G
            ; if ("object" != typeof e.beginScope || null === e.beginScope) throw K("beginScope must be object"),
              G; Z(e, e.begin, { key: "beginScope" }), e.begin = E(e.begin, { joinWith: "" })
        }
      })(e), (e => {
        if (Array.isArray(e.end)) {
          if (e.skip || e.excludeEnd || e.returnEnd) throw K("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
            G
            ; if ("object" != typeof e.endScope || null === e.endScope) throw K("endScope must be object"),
              G; Z(e, e.end, { key: "endScope" }), e.end = E(e.end, { joinWith: "" })
        }
      })(e)
    } function V(e) {
      function t(t, n) {
        return RegExp(g(t), "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (n ? "g" : ""))
      } class n {
        constructor() {
          this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0
        }
        addRule(e, t) {
          t.position = this.position++, this.matchIndexes[this.matchAt] = t, this.regexes.push([t, e]),
            this.matchAt += b(e) + 1
        } compile() {
          0 === this.regexes.length && (this.exec = () => null)
          ; const e = this.regexes.map((e => e[1])); this.matcherRe = t(E(e, {
            joinWith: "|"
          }), !0), this.lastIndex = 0
        } exec(e) {
          this.matcherRe.lastIndex = this.lastIndex
          ; const t = this.matcherRe.exec(e); if (!t) return null
            ; const n = t.findIndex(((e, t) => t > 0 && void 0 !== e)), i = this.matchIndexes[n]
            ; return t.splice(0, n), Object.assign(t, i)
        }
      } class i {
        constructor() {
          this.rules = [], this.multiRegexes = [],
            this.count = 0, this.lastIndex = 0, this.regexIndex = 0
        } getMatcher(e) {
          if (this.multiRegexes[e]) return this.multiRegexes[e]; const t = new n
            ; return this.rules.slice(e).forEach((([e, n]) => t.addRule(e, n))),
              t.compile(), this.multiRegexes[e] = t, t
        } resumingScanAtSamePosition() {
          return 0 !== this.regexIndex
        } considerAll() { this.regexIndex = 0 } addRule(e, t) {
          this.rules.push([e, t]), "begin" === t.type && this.count++
        } exec(e) {
          const t = this.getMatcher(this.regexIndex); t.lastIndex = this.lastIndex
            ; let n = t.exec(e)
            ; if (this.resumingScanAtSamePosition()) if (n && n.index === this.lastIndex); else {
              const t = this.getMatcher(0); t.lastIndex = this.lastIndex + 1, n = t.exec(e)
            }
          return n && (this.regexIndex += n.position + 1,
            this.regexIndex === this.count && this.considerAll()), n
        }
      }
      if (e.compilerExtensions || (e.compilerExtensions = []),
        e.contains && e.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
        ; return e.classNameAliases = r(e.classNameAliases || {}), function n(s, o) {
          const a = s
          ; if (s.isCompiled) return a
            ;[T, D, F, P].forEach((e => e(s, o))), e.compilerExtensions.forEach((e => e(s, o))),
              s.__beforeBegin = null, [L, B, H].forEach((e => e(s, o))), s.isCompiled = !0; let c = null
            ; return "object" == typeof s.keywords && s.keywords.$pattern && (s.keywords = Object.assign({}, s.keywords),
              c = s.keywords.$pattern,
              delete s.keywords.$pattern), c = c || /\w+/, s.keywords && (s.keywords = $(s.keywords, e.case_insensitive)),
              a.keywordPatternRe = t(c, !0),
              o && (s.begin || (s.begin = /\B|\b/), a.beginRe = t(a.begin), s.end || s.endsWithParent || (s.end = /\B|\b/),
                s.end && (a.endRe = t(a.end)),
                a.terminatorEnd = g(a.end) || "", s.endsWithParent && o.terminatorEnd && (a.terminatorEnd += (s.end ? "|" : "") + o.terminatorEnd)),
              s.illegal && (a.illegalRe = t(s.illegal)),
              s.contains || (s.contains = []), s.contains = [].concat(...s.contains.map((e => (e => (e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map((t => r(e, {
                variants: null
              }, t)))), e.cachedVariants ? e.cachedVariants : q(e) ? r(e, {
                starts: e.starts ? r(e.starts) : null
              }) : Object.isFrozen(e) ? r(e) : e))("self" === e ? s : e)))), s.contains.forEach((e => {
                n(e, a)
              })), s.starts && n(s.starts, o), a.matcher = (e => {
                const t = new i
                ; return e.contains.forEach((e => t.addRule(e.begin, {
                  rule: e, type: "begin"
                }))), e.terminatorEnd && t.addRule(e.terminatorEnd, {
                  type: "end"
                }), e.illegal && t.addRule(e.illegal, { type: "illegal" }), t
              })(a), a
        }(e)
    } function q(e) {
      return !!e && (e.endsWithParent || q(e.starts))
    } class J extends Error {
    constructor(e, t) { super(e), this.name = "HTMLInjectionError", this.html = t }
  }
  const Y = i, Q = r, ee = Symbol("nomatch"); var te = (t => {
    const i = Object.create(null), r = Object.create(null), s = []; let o = !0
      ; const a = "Could not find the language '{}', did you forget to load/include a language module?", c = {
        disableAutodetect: !0, name: "Plain text", contains: []
      }; let g = {
        ignoreUnescapedHTML: !1, throwUnescapedHTML: !1, noHighlightRe: /^(no-?highlight)$/i,
        languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i, classPrefix: "hljs-",
        cssSelector: "pre code", languages: null, __emitter: l
      }; function b(e) {
        return g.noHighlightRe.test(e)
      } function m(e, t, n) {
        let i = "", r = ""
        ; "object" == typeof t ? (i = e,
          n = t.ignoreIllegals, r = t.language) : (X("10.7.0", "highlight(lang, code, ...args) has been deprecated."),
            X("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
            r = e, i = t), void 0 === n && (n = !0); const s = { code: i, language: r }; k("before:highlight", s)
          ; const o = s.result ? s.result : E(s.language, s.code, n)
          ; return o.code = s.code, k("after:highlight", o), o
      } function E(e, t, r, s) {
        const c = Object.create(null); function l() {
          if (!N.keywords) return void M.addText(S)
            ; let e = 0; N.keywordPatternRe.lastIndex = 0; let t = N.keywordPatternRe.exec(S), n = ""
            ; for (; t;) {
              n += S.substring(e, t.index)
              ; const r = y.case_insensitive ? t[0].toLowerCase() : t[0], s = (i = r, N.keywords[i]); if (s) {
                const [e, i] = s
                  ; if (M.addText(n), n = "", c[r] = (c[r] || 0) + 1, c[r] <= 7 && (R += i), e.startsWith("_")) n += t[0]; else {
                    const n = y.classNameAliases[e] || e; M.addKeyword(t[0], n)
                  }
              } else n += t[0]
                ; e = N.keywordPatternRe.lastIndex, t = N.keywordPatternRe.exec(S)
            } var i
            ; n += S.substring(e), M.addText(n)
        } function d() {
          null != N.subLanguage ? (() => {
            if ("" === S) return; let e = null; if ("string" == typeof N.subLanguage) {
              if (!i[N.subLanguage]) return void M.addText(S)
                ; e = E(N.subLanguage, S, !0, k[N.subLanguage]), k[N.subLanguage] = e._top
            } else e = x(S, N.subLanguage.length ? N.subLanguage : null)
              ; N.relevance > 0 && (R += e.relevance), M.addSublanguage(e._emitter, e.language)
          })() : l(), S = ""
        } function u(e, t) {
          let n = 1; const i = t.length - 1; for (; n <= i;) {
            if (!e._emit[n]) { n++; continue } const i = y.classNameAliases[e[n]] || e[n], r = t[n]
              ; i ? M.addKeyword(r, i) : (S = r, l(), S = ""), n++
          }
        } function h(e, t) {
          return e.scope && "string" == typeof e.scope && M.openNode(y.classNameAliases[e.scope] || e.scope),
            e.beginScope && (e.beginScope._wrap ? (M.addKeyword(S, y.classNameAliases[e.beginScope._wrap] || e.beginScope._wrap),
              S = "") : e.beginScope._multi && (u(e.beginScope, t), S = "")), N = Object.create(e, {
                parent: {
                  value: N
                }
              }), N
        } function p(e, t, i) {
          let r = ((e, t) => {
            const n = e && e.exec(t)
            ; return n && 0 === n.index
          })(e.endRe, i); if (r) {
            if (e["on:end"]) {
              const i = new n(e)
              ; e["on:end"](t, i), i.isMatchIgnored && (r = !1)
            } if (r) {
              for (; e.endsParent && e.parent;)e = e.parent; return e
            }
          }
          if (e.endsWithParent) return p(e.parent, t, i)
        } function f(e) {
          return 0 === N.matcher.regexIndex ? (S += e[0], 1) : (I = !0, 0)
        } function b(e) {
          const n = e[0], i = t.substring(e.index), r = p(N, e, i); if (!r) return ee; const s = N
            ; N.endScope && N.endScope._wrap ? (d(),
              M.addKeyword(n, N.endScope._wrap)) : N.endScope && N.endScope._multi ? (d(),
                u(N.endScope, e)) : s.skip ? S += n : (s.returnEnd || s.excludeEnd || (S += n),
                  d(), s.excludeEnd && (S = n)); do {
                    N.scope && M.closeNode(), N.skip || N.subLanguage || (R += N.relevance), N = N.parent
                  } while (N !== r.parent); return r.starts && h(r.starts, e), s.returnEnd ? 0 : n.length
        }
        let m = {}; function w(i, s) {
          const a = s && s[0]; if (S += i, null == a) return d(), 0
            ; if ("begin" === m.type && "end" === s.type && m.index === s.index && "" === a) {
              if (S += t.slice(s.index, s.index + 1), !o) {
                const t = Error(`0 width match regex (${e})`)
                ; throw t.languageName = e, t.badRule = m.rule, t
              } return 1
            }
          if (m = s, "begin" === s.type) return (e => {
            const t = e[0], i = e.rule, r = new n(i), s = [i.__beforeBegin, i["on:begin"]]
              ; for (const n of s) if (n && (n(e, r), r.isMatchIgnored)) return f(t)
                ; return i.skip ? S += t : (i.excludeBegin && (S += t),
                  d(), i.returnBegin || i.excludeBegin || (S = t)), h(i, e), i.returnBegin ? 0 : t.length
          })(s)
            ; if ("illegal" === s.type && !r) {
              const e = Error('Illegal lexeme "' + a + '" for mode "' + (N.scope || "<unnamed>") + '"')
                ; throw e.mode = N, e
            } if ("end" === s.type) { const e = b(s); if (e !== ee) return e }
          if ("illegal" === s.type && "" === a) return 1
            ; if (A > 1e5 && A > 3 * s.index) throw Error("potential infinite loop, way more iterations than matches")
              ; return S += a, a.length
        } const y = O(e)
          ; if (!y) throw K(a.replace("{}", e)), Error('Unknown language: "' + e + '"')
            ; const _ = V(y); let v = "", N = s || _; const k = {}, M = new g.__emitter(g); (() => {
              const e = []
              ; for (let t = N; t !== y; t = t.parent)t.scope && e.unshift(t.scope)
                ; e.forEach((e => M.openNode(e)))
            })(); let S = "", R = 0, j = 0, A = 0, I = !1; try {
              for (N.matcher.considerAll(); ;) {
                A++, I ? I = !1 : N.matcher.considerAll(), N.matcher.lastIndex = j
                  ; const e = N.matcher.exec(t); if (!e) break; const n = w(t.substring(j, e.index), e)
                  ; j = e.index + n
              }
              return w(t.substring(j)), M.closeAllNodes(), M.finalize(), v = M.toHTML(), {
                language: e, value: v, relevance: R, illegal: !1, _emitter: M, _top: N
              }
            } catch (n) {
              if (n.message && n.message.includes("Illegal")) return {
                language: e, value: Y(t),
                illegal: !0, relevance: 0, _illegalBy: {
                  message: n.message, index: j,
                  context: t.slice(j - 100, j + 100), mode: n.mode, resultSoFar: v
                }, _emitter: M
              }; if (o) return {
                language: e, value: Y(t), illegal: !1, relevance: 0, errorRaised: n, _emitter: M, _top: N
              }
                ; throw n
            }
      } function x(e, t) {
        t = t || g.languages || Object.keys(i); const n = (e => {
          const t = { value: Y(e), illegal: !1, relevance: 0, _top: c, _emitter: new g.__emitter(g) }
            ; return t._emitter.addText(e), t
        })(e), r = t.filter(O).filter(N).map((t => E(t, e, !1)))
          ; r.unshift(n); const s = r.sort(((e, t) => {
            if (e.relevance !== t.relevance) return t.relevance - e.relevance
              ; if (e.language && t.language) {
                if (O(e.language).supersetOf === t.language) return 1
                  ; if (O(t.language).supersetOf === e.language) return -1
              } return 0
          })), [o, a] = s, l = o
          ; return l.secondBest = a, l
      } function w(e) {
        let t = null; const n = (e => {
          let t = e.className + " "; t += e.parentNode ? e.parentNode.className : ""
            ; const n = g.languageDetectRe.exec(t); if (n) {
              const t = O(n[1])
              ; return t || (W(a.replace("{}", n[1])),
                W("Falling back to no-highlight mode for this block.", e)), t ? n[1] : "no-highlight"
            }
          return t.split(/\s+/).find((e => b(e) || O(e)))
        })(e); if (b(n)) return
          ; if (k("before:highlightElement", {
            el: e, language: n
          }), e.children.length > 0 && (g.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
            console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),
            console.warn("The element with unescaped HTML:"),
            console.warn(e)), g.throwUnescapedHTML)) throw new J("One of your code blocks includes unescaped HTML.", e.innerHTML)
          ; t = e; const i = t.textContent, s = n ? m(i, { language: n, ignoreIllegals: !0 }) : x(i)
          ; e.innerHTML = s.value, ((e, t, n) => {
            const i = t && r[t] || n
            ; e.classList.add("hljs"), e.classList.add("language-" + i)
          })(e, n, s.language), e.result = {
            language: s.language, re: s.relevance,
            relevance: s.relevance
          }, s.secondBest && (e.secondBest = {
            language: s.secondBest.language, relevance: s.secondBest.relevance
          }), k("after:highlightElement", { el: e, result: s, text: i })
      } let y = !1; function _() {
        "loading" !== document.readyState ? document.querySelectorAll(g.cssSelector).forEach(w) : y = !0
      } function O(e) { return e = (e || "").toLowerCase(), i[e] || i[r[e]] }
    function v(e, { languageName: t }) {
      "string" == typeof e && (e = [e]), e.forEach((e => {
        r[e.toLowerCase()] = t
      }))
    } function N(e) {
      const t = O(e)
      ; return t && !t.disableAutodetect
    } function k(e, t) {
      const n = e; s.forEach((e => {
        e[n] && e[n](t)
      }))
    }
    "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", (() => {
      y && _()
    }), !1), Object.assign(t, {
      highlight: m, highlightAuto: x, highlightAll: _,
      highlightElement: w,
      highlightBlock: e => (X("10.7.0", "highlightBlock will be removed entirely in v12.0"),
        X("10.7.0", "Please use highlightElement now."), w(e)), configure: e => { g = Q(g, e) },
      initHighlighting: () => {
        _(), X("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.")
      },
      initHighlightingOnLoad: () => {
        _(), X("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
      }, registerLanguage: (e, n) => {
        let r = null; try { r = n(t) } catch (t) {
          if (K("Language definition for '{}' could not be registered.".replace("{}", e)),
            !o) throw t; K(t), r = c
        }
        r.name || (r.name = e), i[e] = r, r.rawDefinition = n.bind(null, t), r.aliases && v(r.aliases, {
          languageName: e
        })
      }, unregisterLanguage: e => {
        delete i[e]
        ; for (const t of Object.keys(r)) r[t] === e && delete r[t]
      },
      listLanguages: () => Object.keys(i), getLanguage: O, registerAliases: v,
      autoDetection: N, inherit: Q, addPlugin: e => {
        (e => {
          e["before:highlightBlock"] && !e["before:highlightElement"] && (e["before:highlightElement"] = t => {
            e["before:highlightBlock"](Object.assign({ block: t.el }, t))
          }), e["after:highlightBlock"] && !e["after:highlightElement"] && (e["after:highlightElement"] = t => {
            e["after:highlightBlock"](Object.assign({ block: t.el }, t))
          })
        })(e), s.push(e)
      }
    }), t.debugMode = () => { o = !1 }, t.safeMode = () => {
      o = !0
    }, t.versionString = "11.7.0", t.regex = {
      concat: p, lookahead: d, either: f, optional: h,
      anyNumberOfTimes: u
    }; for (const t in A) "object" == typeof A[t] && e.exports(A[t])
      ; return Object.assign(t, A), t
  })({}); return te
}()
  ; "object" == typeof exports && "undefined" != typeof module && (module.exports = hljs);/*! `fortran` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, a = {
        variants: [e.COMMENT("!", "$", { relevance: 0 }), e.COMMENT("^C[ ]", "$", {
          relevance: 0
        }), e.COMMENT("^C$", "$", { relevance: 0 })]
      }, t = /(_[a-z_\d]+)?/, i = /([de][+-]?\d+)?/, c = {
        className: "number", variants: [{
          begin: n.concat(/\b\d+/, /\.(\d*)/, i, t)
        }, { begin: n.concat(/\b\d+/, i, t) }, {
          begin: n.concat(/\.\d+/, i, t)
        }], relevance: 0
      }, o = {
        className: "function",
        beginKeywords: "subroutine function program", illegal: "[${=\\n]",
        contains: [e.UNDERSCORE_TITLE_MODE, { className: "params", begin: "\\(", end: "\\)" }]
      }
      ; return {
        name: "Fortran", case_insensitive: !0, aliases: ["f90", "f95"], keywords: {
          keyword: ["kind", "do", "concurrent", "local", "shared", "while", "private", "call", "intrinsic", "where", "elsewhere", "type", "endtype", "endmodule", "endselect", "endinterface", "end", "enddo", "endif", "if", "forall", "endforall", "only", "contains", "default", "return", "stop", "then", "block", "endblock", "endassociate", "public", "subroutine|10", "function", "program", ".and.", ".or.", ".not.", ".le.", ".eq.", ".ge.", ".gt.", ".lt.", "goto", "save", "else", "use", "module", "select", "case", "access", "blank", "direct", "exist", "file", "fmt", "form", "formatted", "iostat", "name", "named", "nextrec", "number", "opened", "rec", "recl", "sequential", "status", "unformatted", "unit", "continue", "format", "pause", "cycle", "exit", "c_null_char", "c_alert", "c_backspace", "c_form_feed", "flush", "wait", "decimal", "round", "iomsg", "synchronous", "nopass", "non_overridable", "pass", "protected", "volatile", "abstract", "extends", "import", "non_intrinsic", "value", "deferred", "generic", "final", "enumerator", "class", "associate", "bind", "enum", "c_int", "c_short", "c_long", "c_long_long", "c_signed_char", "c_size_t", "c_int8_t", "c_int16_t", "c_int32_t", "c_int64_t", "c_int_least8_t", "c_int_least16_t", "c_int_least32_t", "c_int_least64_t", "c_int_fast8_t", "c_int_fast16_t", "c_int_fast32_t", "c_int_fast64_t", "c_intmax_t", "C_intptr_t", "c_float", "c_double", "c_long_double", "c_float_complex", "c_double_complex", "c_long_double_complex", "c_bool", "c_char", "c_null_ptr", "c_null_funptr", "c_new_line", "c_carriage_return", "c_horizontal_tab", "c_vertical_tab", "iso_c_binding", "c_loc", "c_funloc", "c_associated", "c_f_pointer", "c_ptr", "c_funptr", "iso_fortran_env", "character_storage_size", "error_unit", "file_storage_size", "input_unit", "iostat_end", "iostat_eor", "numeric_storage_size", "output_unit", "c_f_procpointer", "ieee_arithmetic", "ieee_support_underflow_control", "ieee_get_underflow_mode", "ieee_set_underflow_mode", "newunit", "contiguous", "recursive", "pad", "position", "action", "delim", "readwrite", "eor", "advance", "nml", "interface", "procedure", "namelist", "include", "sequence", "elemental", "pure", "impure", "integer", "real", "character", "complex", "logical", "codimension", "dimension", "allocatable|10", "parameter", "external", "implicit|10", "none", "double", "precision", "assign", "intent", "optional", "pointer", "target", "in", "out", "common", "equivalence", "data"],
          literal: [".False.", ".True."],
          built_in: ["alog", "alog10", "amax0", "amax1", "amin0", "amin1", "amod", "cabs", "ccos", "cexp", "clog", "csin", "csqrt", "dabs", "dacos", "dasin", "datan", "datan2", "dcos", "dcosh", "ddim", "dexp", "dint", "dlog", "dlog10", "dmax1", "dmin1", "dmod", "dnint", "dsign", "dsin", "dsinh", "dsqrt", "dtan", "dtanh", "float", "iabs", "idim", "idint", "idnint", "ifix", "isign", "max0", "max1", "min0", "min1", "sngl", "algama", "cdabs", "cdcos", "cdexp", "cdlog", "cdsin", "cdsqrt", "cqabs", "cqcos", "cqexp", "cqlog", "cqsin", "cqsqrt", "dcmplx", "dconjg", "derf", "derfc", "dfloat", "dgamma", "dimag", "dlgama", "iqint", "qabs", "qacos", "qasin", "qatan", "qatan2", "qcmplx", "qconjg", "qcos", "qcosh", "qdim", "qerf", "qerfc", "qexp", "qgamma", "qimag", "qlgama", "qlog", "qlog10", "qmax1", "qmin1", "qmod", "qnint", "qsign", "qsin", "qsinh", "qsqrt", "qtan", "qtanh", "abs", "acos", "aimag", "aint", "anint", "asin", "atan", "atan2", "char", "cmplx", "conjg", "cos", "cosh", "exp", "ichar", "index", "int", "log", "log10", "max", "min", "nint", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "print", "write", "dim", "lge", "lgt", "lle", "llt", "mod", "nullify", "allocate", "deallocate", "adjustl", "adjustr", "all", "allocated", "any", "associated", "bit_size", "btest", "ceiling", "count", "cshift", "date_and_time", "digits", "dot_product", "eoshift", "epsilon", "exponent", "floor", "fraction", "huge", "iand", "ibclr", "ibits", "ibset", "ieor", "ior", "ishft", "ishftc", "lbound", "len_trim", "matmul", "maxexponent", "maxloc", "maxval", "merge", "minexponent", "minloc", "minval", "modulo", "mvbits", "nearest", "pack", "present", "product", "radix", "random_number", "random_seed", "range", "repeat", "reshape", "rrspacing", "scale", "scan", "selected_int_kind", "selected_real_kind", "set_exponent", "shape", "size", "spacing", "spread", "sum", "system_clock", "tiny", "transpose", "trim", "ubound", "unpack", "verify", "achar", "iachar", "transfer", "dble", "entry", "dprod", "cpu_time", "command_argument_count", "get_command", "get_command_argument", "get_environment_variable", "is_iostat_end", "ieee_arithmetic", "ieee_support_underflow_control", "ieee_get_underflow_mode", "ieee_set_underflow_mode", "is_iostat_eor", "move_alloc", "new_line", "selected_char_kind", "same_type_as", "extends_type_of", "acosh", "asinh", "atanh", "bessel_j0", "bessel_j1", "bessel_jn", "bessel_y0", "bessel_y1", "bessel_yn", "erf", "erfc", "erfc_scaled", "gamma", "log_gamma", "hypot", "norm2", "atomic_define", "atomic_ref", "execute_command_line", "leadz", "trailz", "storage_size", "merge_bits", "bge", "bgt", "ble", "blt", "dshiftl", "dshiftr", "findloc", "iall", "iany", "iparity", "image_index", "lcobound", "ucobound", "maskl", "maskr", "num_images", "parity", "popcnt", "poppar", "shifta", "shiftl", "shiftr", "this_image", "sync", "change", "team", "co_broadcast", "co_max", "co_min", "co_sum", "co_reduce"]
        }, illegal: /\/\*/, contains: [{
          className: "string", relevance: 0,
          variants: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
        }, o, {
          begin: /^C\s*=(?!=)/,
          relevance: 0
        }, a, c]
      }
    }
  })(); hljs.registerLanguage("fortran", e)
})();/*! `go` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = {
        keyword: ["break", "case", "chan", "const", "continue", "default", "defer", "else", "fallthrough", "for", "func", "go", "goto", "if", "import", "interface", "map", "package", "range", "return", "select", "struct", "switch", "type", "var"],
        type: ["bool", "byte", "complex64", "complex128", "error", "float32", "float64", "int8", "int16", "int32", "int64", "string", "uint8", "uint16", "uint32", "uint64", "int", "uint", "uintptr", "rune"],
        literal: ["true", "false", "iota", "nil"],
        built_in: ["append", "cap", "close", "complex", "copy", "imag", "len", "make", "new", "panic", "print", "println", "real", "recover", "delete"]
      }; return {
        name: "Go", aliases: ["golang"], keywords: n, illegal: "</",
        contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
          className: "string",
          variants: [e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, { begin: "`", end: "`" }]
        }, {
          className: "number", variants: [{
            begin: e.C_NUMBER_RE + "[i]", relevance: 1
          }, e.C_NUMBER_MODE]
        }, { begin: /:=/ }, {
          className: "function", beginKeywords: "func",
          end: "\\s*(\\{|$)", excludeEnd: !0, contains: [e.TITLE_MODE, {
            className: "params",
            begin: /\(/, end: /\)/, endsParent: !0, keywords: n, illegal: /["']/
          }]
        }]
      }
    }
  })()
  ; hljs.registerLanguage("go", e)
})();/*! `perl` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, t = /[dualxmsipngr]{0,12}/, r = {
        $pattern: /[\w.]+/,
        keyword: "abs accept alarm and atan2 bind binmode bless break caller chdir chmod chomp chop chown chr chroot close closedir connect continue cos crypt dbmclose dbmopen defined delete die do dump each else elsif endgrent endhostent endnetent endprotoent endpwent endservent eof eval exec exists exit exp fcntl fileno flock for foreach fork format formline getc getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr getnetbyname getnetent getpeername getpgrp getpriority getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid getservbyname getservbyport getservent getsockname getsockopt given glob gmtime goto grep gt hex if index int ioctl join keys kill last lc lcfirst length link listen local localtime log lstat lt ma map mkdir msgctl msgget msgrcv msgsnd my ne next no not oct open opendir or ord our pack package pipe pop pos print printf prototype push q|0 qq quotemeta qw qx rand read readdir readline readlink readpipe recv redo ref rename require reset return reverse rewinddir rindex rmdir say scalar seek seekdir select semctl semget semop send setgrent sethostent setnetent setpgrp setpriority setprotoent setpwent setservent setsockopt shift shmctl shmget shmread shmwrite shutdown sin sleep socket socketpair sort splice split sprintf sqrt srand stat state study sub substr symlink syscall sysopen sysread sysseek system syswrite tell telldir tie tied time times tr truncate uc ucfirst umask undef unless unlink unpack unshift untie until use utime values vec wait waitpid wantarray warn when while write x|0 xor y|0"
      }, s = { className: "subst", begin: "[$@]\\{", end: "\\}", keywords: r }, i = {
        begin: /->\{/,
        end: /\}/
      }, a = {
        variants: [{ begin: /\$\d/ }, {
          begin: n.concat(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
        }, { begin: /[$%@][^\s\w{]/, relevance: 0 }]
      }, c = [e.BACKSLASH_ESCAPE, s, a], o = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/], g = (e, r, s = "\\1") => {
        const i = "\\1" === s ? s : n.concat(s, r)
          ; return n.concat(n.concat("(?:", e, ")"), r, /(?:\\.|[^\\\/])*?/, i, /(?:\\.|[^\\\/])*?/, s, t)
      }, l = (e, r, s) => n.concat(n.concat("(?:", e, ")"), r, /(?:\\.|[^\\\/])*?/, s, t), d = [a, e.HASH_COMMENT_MODE, e.COMMENT(/^=\w/, /=cut/, {
        endsWithParent: !0
      }), i, {
        className: "string", contains: c, variants: [{
          begin: "q[qwxr]?\\s*\\(", end: "\\)", relevance: 5
        }, {
          begin: "q[qwxr]?\\s*\\[",
          end: "\\]", relevance: 5
        }, { begin: "q[qwxr]?\\s*\\{", end: "\\}", relevance: 5 }, {
          begin: "q[qwxr]?\\s*\\|", end: "\\|", relevance: 5
        }, {
          begin: "q[qwxr]?\\s*<", end: ">",
          relevance: 5
        }, { begin: "qw\\s+q", end: "q", relevance: 5 }, {
          begin: "'", end: "'",
          contains: [e.BACKSLASH_ESCAPE]
        }, { begin: '"', end: '"' }, {
          begin: "`", end: "`",
          contains: [e.BACKSLASH_ESCAPE]
        }, { begin: /\{\w+\}/, relevance: 0 }, {
          begin: "-?\\w+\\s*=>", relevance: 0
        }]
        }, {
          className: "number",
          begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
          relevance: 0
        }, {
          begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
          keywords: "split return print reverse grep", relevance: 0,
          contains: [e.HASH_COMMENT_MODE, {
            className: "regexp", variants: [{
              begin: g("s|tr|y", n.either(...o, { capture: !0 }))
            }, { begin: g("s|tr|y", "\\(", "\\)") }, {
              begin: g("s|tr|y", "\\[", "\\]")
            }, { begin: g("s|tr|y", "\\{", "\\}") }], relevance: 2
          }, {
            className: "regexp", variants: [{ begin: /(m|qr)\/\//, relevance: 0 }, {
              begin: l("(?:m|qr)?", /\//, /\//)
            }, {
              begin: l("m|qr", n.either(...o, {
                capture: !0
              }), /\1/)
            }, { begin: l("m|qr", /\(/, /\)/) }, { begin: l("m|qr", /\[/, /\]/) }, {
              begin: l("m|qr", /\{/, /\}/)
            }]
          }]
        }, {
          className: "function", beginKeywords: "sub",
          end: "(\\s*\\(.*?\\))?[;{]", excludeEnd: !0, relevance: 5, contains: [e.TITLE_MODE]
        }, {
          begin: "-\\w\\b", relevance: 0
        }, {
          begin: "^__DATA__$", end: "^__END__$",
          subLanguage: "mojolicious", contains: [{ begin: "^@@.*", end: "$", className: "comment" }]
        }]; return s.contains = d, i.contains = d, {
          name: "Perl", aliases: ["pl", "pm"], keywords: r,
          contains: d
        }
    }
  })(); hljs.registerLanguage("perl", e)
})();/*! `css` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"
      ; const e = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"], i = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"], r = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"], t = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"], o = ["align-content", "align-items", "align-self", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inline-size", "isolation", "justify-content", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "rest", "rest-after", "rest-before", "right", "row-gap", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "speak", "speak-as", "src", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index"].reverse()
      ; return n => {
        const a = n.regex, l = (e => ({
          IMPORTANT: { scope: "meta", begin: "!important" },
          BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE, HEXCOLOR: {
            scope: "number",
            begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
          }, FUNCTION_DISPATCH: {
            className: "built_in", begin: /[\w-]+(?=\()/
          }, ATTRIBUTE_SELECTOR_MODE: {
            scope: "selector-attr", begin: /\[/, end: /\]/, illegal: "$",
            contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
          }, CSS_NUMBER_MODE: {
            scope: "number",
            begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            relevance: 0
          }, CSS_VARIABLE: { className: "attr", begin: /--[A-Za-z][A-Za-z0-9_-]*/ }
        }))(n), s = [n.APOS_STRING_MODE, n.QUOTE_STRING_MODE]; return {
          name: "CSS",
          case_insensitive: !0, illegal: /[=|'\$]/, keywords: { keyframePosition: "from to" },
          classNameAliases: { keyframePosition: "selector-tag" }, contains: [l.BLOCK_COMMENT, {
            begin: /-(webkit|moz|ms|o)-(?=[a-z])/
          }, l.CSS_NUMBER_MODE, {
            className: "selector-id", begin: /#[A-Za-z0-9_-]+/, relevance: 0
          }, {
            className: "selector-class", begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*", relevance: 0
          }, l.ATTRIBUTE_SELECTOR_MODE, {
            className: "selector-pseudo", variants: [{
              begin: ":(" + r.join("|") + ")"
            }, { begin: ":(:)?(" + t.join("|") + ")" }]
          }, l.CSS_VARIABLE, {
            className: "attribute", begin: "\\b(" + o.join("|") + ")\\b"
          }, {
            begin: /:/, end: /[;}{]/,
            contains: [l.BLOCK_COMMENT, l.HEXCOLOR, l.IMPORTANT, l.CSS_NUMBER_MODE, ...s, {
              begin: /(url|data-uri)\(/, end: /\)/, relevance: 0, keywords: {
                built_in: "url data-uri"
              }, contains: [...s, {
                className: "string", begin: /[^)]/, endsWithParent: !0,
                excludeEnd: !0
              }]
            }, l.FUNCTION_DISPATCH]
          }, {
            begin: a.lookahead(/@/), end: "[{;]",
            relevance: 0, illegal: /:/, contains: [{
              className: "keyword", begin: /@-?\w[\w]*(-\w+)*/
            }, {
              begin: /\s/, endsWithParent: !0, excludeEnd: !0, relevance: 0, keywords: {
                $pattern: /[a-z-]+/, keyword: "and or not only", attribute: i.join(" ")
              }, contains: [{
                begin: /[a-z-]+(?=:)/, className: "attribute"
              }, ...s, l.CSS_NUMBER_MODE]
            }]
          }, {
            className: "selector-tag", begin: "\\b(" + e.join("|") + ")\\b"
          }]
        }
      }
  })()
  ; hljs.registerLanguage("css", e)
})();/*! `xml` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = e.regex, n = a.concat(/[\p{L}_]/u, a.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), s = {
        className: "symbol", begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
      }, t = {
        begin: /\s/,
        contains: [{ className: "keyword", begin: /#?[a-z_][a-z1-9_-]+/, illegal: /\n/ }]
      }, i = e.inherit(t, { begin: /\(/, end: /\)/ }), c = e.inherit(e.APOS_STRING_MODE, {
        className: "string"
      }), l = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), r = {
        endsWithParent: !0, illegal: /</, relevance: 0, contains: [{
          className: "attr",
          begin: /[\p{L}0-9._:-]+/u, relevance: 0
        }, {
          begin: /=\s*/, relevance: 0, contains: [{
            className: "string", endsParent: !0, variants: [{ begin: /"/, end: /"/, contains: [s] }, {
              begin: /'/, end: /'/, contains: [s]
            }, { begin: /[^\s"'=<>`]+/ }]
          }]
        }]
      }; return {
        name: "HTML, XML",
        aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
        case_insensitive: !0, unicodeRegex: !0, contains: [{
          className: "meta", begin: /<![a-z]/,
          end: />/, relevance: 10, contains: [t, l, c, i, {
            begin: /\[/, end: /\]/, contains: [{
              className: "meta", begin: /<![a-z]/, end: />/, contains: [t, i, l, c]
            }]
          }]
        }, e.COMMENT(/<!--/, /-->/, { relevance: 10 }), {
          begin: /<!\[CDATA\[/, end: /\]\]>/,
          relevance: 10
        }, s, {
          className: "meta", end: /\?>/, variants: [{
            begin: /<\?xml/,
            relevance: 10, contains: [l]
          }, { begin: /<\?[a-z][a-z0-9]+/ }]
        }, {
          className: "tag",
          begin: /<style(?=\s|>)/, end: />/, keywords: { name: "style" }, contains: [r], starts: {
            end: /<\/style>/, returnEnd: !0, subLanguage: ["css", "xml"]
          }
        }, {
          className: "tag",
          begin: /<script(?=\s|>)/, end: />/, keywords: { name: "script" }, contains: [r], starts: {
            end: /<\/script>/, returnEnd: !0, subLanguage: ["javascript", "handlebars", "xml"]
          }
        }, {
          className: "tag", begin: /<>|<\/>/
        }, {
          className: "tag",
          begin: a.concat(/</, a.lookahead(a.concat(n, a.either(/\/>/, />/, /\s/)))),
          end: /\/?>/, contains: [{ className: "name", begin: n, relevance: 0, starts: r }]
        }, {
          className: "tag", begin: a.concat(/<\//, a.lookahead(a.concat(n, />/))), contains: [{
            className: "name", begin: n, relevance: 0
          }, { begin: />/, relevance: 0, endsParent: !0 }]
        }]
      }
    }
  })(); hljs.registerLanguage("xml", e)
})();/*! `php` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const t = e.regex, a = /(?![A-Za-z0-9])(?![$])/, r = t.concat(/[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/, a), n = t.concat(/(\\?[A-Z][a-z0-9_\x7f-\xff]+|\\?[A-Z]+(?=[A-Z][a-z0-9_\x7f-\xff])){1,}/, a), o = {
        scope: "variable", match: "\\$+" + r
      }, c = {
        scope: "subst", variants: [{ begin: /\$\w+/ }, {
          begin: /\{\$/, end: /\}/
        }]
      }, i = e.inherit(e.APOS_STRING_MODE, {
        illegal: null
      }), s = "[ \t\n]", l = {
        scope: "string", variants: [e.inherit(e.QUOTE_STRING_MODE, {
          illegal: null, contains: e.QUOTE_STRING_MODE.contains.concat(c)
        }), i, e.END_SAME_AS_BEGIN({
          begin: /<<<[ \t]*(\w+)\n/, end: /[ \t]*(\w+)\b/,
          contains: e.QUOTE_STRING_MODE.contains.concat(c)
        })]
      }, _ = {
        scope: "number",
        variants: [{ begin: "\\b0[bB][01]+(?:_[01]+)*\\b" }, {
          begin: "\\b0[oO][0-7]+(?:_[0-7]+)*\\b"
        }, {
          begin: "\\b0[xX][\\da-fA-F]+(?:_[\\da-fA-F]+)*\\b"
        }, {
          begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:[eE][+-]?\\d+)?"
        }], relevance: 0
      }, d = ["false", "null", "true"], p = ["__CLASS__", "__DIR__", "__FILE__", "__FUNCTION__", "__COMPILER_HALT_OFFSET__", "__LINE__", "__METHOD__", "__NAMESPACE__", "__TRAIT__", "die", "echo", "exit", "include", "include_once", "print", "require", "require_once", "array", "abstract", "and", "as", "binary", "bool", "boolean", "break", "callable", "case", "catch", "class", "clone", "const", "continue", "declare", "default", "do", "double", "else", "elseif", "empty", "enddeclare", "endfor", "endforeach", "endif", "endswitch", "endwhile", "enum", "eval", "extends", "final", "finally", "float", "for", "foreach", "from", "global", "goto", "if", "implements", "instanceof", "insteadof", "int", "integer", "interface", "isset", "iterable", "list", "match|0", "mixed", "new", "never", "object", "or", "private", "protected", "public", "readonly", "real", "return", "string", "switch", "throw", "trait", "try", "unset", "use", "var", "void", "while", "xor", "yield"], b = ["Error|0", "AppendIterator", "ArgumentCountError", "ArithmeticError", "ArrayIterator", "ArrayObject", "AssertionError", "BadFunctionCallException", "BadMethodCallException", "CachingIterator", "CallbackFilterIterator", "CompileError", "Countable", "DirectoryIterator", "DivisionByZeroError", "DomainException", "EmptyIterator", "ErrorException", "Exception", "FilesystemIterator", "FilterIterator", "GlobIterator", "InfiniteIterator", "InvalidArgumentException", "IteratorIterator", "LengthException", "LimitIterator", "LogicException", "MultipleIterator", "NoRewindIterator", "OutOfBoundsException", "OutOfRangeException", "OuterIterator", "OverflowException", "ParentIterator", "ParseError", "RangeException", "RecursiveArrayIterator", "RecursiveCachingIterator", "RecursiveCallbackFilterIterator", "RecursiveDirectoryIterator", "RecursiveFilterIterator", "RecursiveIterator", "RecursiveIteratorIterator", "RecursiveRegexIterator", "RecursiveTreeIterator", "RegexIterator", "RuntimeException", "SeekableIterator", "SplDoublyLinkedList", "SplFileInfo", "SplFileObject", "SplFixedArray", "SplHeap", "SplMaxHeap", "SplMinHeap", "SplObjectStorage", "SplObserver", "SplPriorityQueue", "SplQueue", "SplStack", "SplSubject", "SplTempFileObject", "TypeError", "UnderflowException", "UnexpectedValueException", "UnhandledMatchError", "ArrayAccess", "BackedEnum", "Closure", "Fiber", "Generator", "Iterator", "IteratorAggregate", "Serializable", "Stringable", "Throwable", "Traversable", "UnitEnum", "WeakReference", "WeakMap", "Directory", "__PHP_Incomplete_Class", "parent", "php_user_filter", "self", "static", "stdClass"], E = {
        keyword: p, literal: (e => {
          const t = []; return e.forEach((e => {
            t.push(e), e.toLowerCase() === e ? t.push(e.toUpperCase()) : t.push(e.toLowerCase())
          })), t
        })(d), built_in: b
      }, u = e => e.map((e => e.replace(/\|\d+$/, ""))), g = {
        variants: [{
          match: [/new/, t.concat(s, "+"), t.concat("(?!", u(b).join("\\b|"), "\\b)"), n], scope: {
            1: "keyword", 4: "title.class"
          }
        }]
      }, h = t.concat(r, "\\b(?!\\()"), m = {
        variants: [{
          match: [t.concat(/::/, t.lookahead(/(?!class\b)/)), h], scope: {
            2: "variable.constant"
          }
        }, { match: [/::/, /class/], scope: { 2: "variable.language" } }, {
          match: [n, t.concat(/::/, t.lookahead(/(?!class\b)/)), h], scope: {
            1: "title.class",
            3: "variable.constant"
          }
        }, {
          match: [n, t.concat("::", t.lookahead(/(?!class\b)/))],
          scope: { 1: "title.class" }
        }, {
          match: [n, /::/, /class/], scope: {
            1: "title.class",
            3: "variable.language"
          }
        }]
      }, I = {
        scope: "attr",
        match: t.concat(r, t.lookahead(":"), t.lookahead(/(?!::)/))
      }, f = {
        relevance: 0,
        begin: /\(/, end: /\)/, keywords: E, contains: [I, o, m, e.C_BLOCK_COMMENT_MODE, l, _, g]
      }, O = {
        relevance: 0,
        match: [/\b/, t.concat("(?!fn\\b|function\\b|", u(p).join("\\b|"), "|", u(b).join("\\b|"), "\\b)"), r, t.concat(s, "*"), t.lookahead(/(?=\()/)],
        scope: { 3: "title.function.invoke" }, contains: [f]
      }; f.contains.push(O)
        ; const v = [I, m, e.C_BLOCK_COMMENT_MODE, l, _, g]; return {
          case_insensitive: !1,
          keywords: E, contains: [{
            begin: t.concat(/#\[\s*/, n), beginScope: "meta", end: /]/,
            endScope: "meta", keywords: { literal: d, keyword: ["new", "array"] }, contains: [{
              begin: /\[/, end: /]/, keywords: { literal: d, keyword: ["new", "array"] },
              contains: ["self", ...v]
            }, ...v, { scope: "meta", match: n }]
          }, e.HASH_COMMENT_MODE, e.COMMENT("//", "$"), e.COMMENT("/\\*", "\\*/", {
            contains: [{
              scope: "doctag", match: "@[A-Za-z]+"
            }]
          }), {
            match: /__halt_compiler\(\);/,
            keywords: "__halt_compiler", starts: {
              scope: "comment", end: e.MATCH_NOTHING_RE,
              contains: [{ match: /\?>/, scope: "meta", endsParent: !0 }]
            }
          }, {
            scope: "meta", variants: [{
              begin: /<\?php/, relevance: 10
            }, { begin: /<\?=/ }, { begin: /<\?/, relevance: .1 }, {
              begin: /\?>/
            }]
          }, { scope: "variable.language", match: /\$this\b/ }, o, O, m, {
            match: [/const/, /\s/, r], scope: { 1: "keyword", 3: "variable.constant" }
          }, g, {
            scope: "function", relevance: 0, beginKeywords: "fn function", end: /[;{]/,
            excludeEnd: !0, illegal: "[$%\\[]", contains: [{
              beginKeywords: "use"
            }, e.UNDERSCORE_TITLE_MODE, { begin: "=>", endsParent: !0 }, {
              scope: "params",
              begin: "\\(", end: "\\)", excludeBegin: !0, excludeEnd: !0, keywords: E,
              contains: ["self", o, m, e.C_BLOCK_COMMENT_MODE, l, _]
            }]
          }, {
            scope: "class", variants: [{
              beginKeywords: "enum", illegal: /[($"]/
            }, {
              beginKeywords: "class interface trait",
              illegal: /[:($"]/
            }], relevance: 0, end: /\{/, excludeEnd: !0, contains: [{
              beginKeywords: "extends implements"
            }, e.UNDERSCORE_TITLE_MODE]
          }, {
            beginKeywords: "namespace", relevance: 0, end: ";", illegal: /[.']/,
            contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, { scope: "title.class" })]
          }, {
            beginKeywords: "use", relevance: 0, end: ";", contains: [{
              match: /\b(as|const|function)\b/, scope: "keyword"
            }, e.UNDERSCORE_TITLE_MODE]
          }, l, _]
        }
    }
  })(); hljs.registerLanguage("php", e)
})();/*! `php-template` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var n = (() => {
    "use strict"; return n => ({
      name: "PHP template",
      subLanguage: "xml", contains: [{
        begin: /<\?(php|=)?/, end: /\?>/, subLanguage: "php",
        contains: [{ begin: "/\\*", end: "\\*/", skip: !0 }, { begin: 'b"', end: '"', skip: !0 }, {
          begin: "b'", end: "'", skip: !0
        }, n.inherit(n.APOS_STRING_MODE, {
          illegal: null,
          className: null, contains: null, skip: !0
        }), n.inherit(n.QUOTE_STRING_MODE, {
          illegal: null, className: null, contains: null, skip: !0
        })]
      }]
    })
  })()
  ; hljs.registerLanguage("php-template", n)
})();/*! `latex` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = [{ begin: /\^{6}[0-9a-f]{6}/ }, {
        begin: /\^{5}[0-9a-f]{5}/
      }, { begin: /\^{4}[0-9a-f]{4}/ }, {
        begin: /\^{3}[0-9a-f]{3}/
      }, { begin: /\^{2}[0-9a-f]{2}/ }, { begin: /\^{2}[\u0000-\u007f]/ }], a = [{
        className: "keyword", begin: /\\/, relevance: 0, contains: [{
          endsParent: !0,
          begin: e.regex.either(...["(?:NeedsTeXFormat|RequirePackage|GetIdInfo)", "Provides(?:Expl)?(?:Package|Class|File)", "(?:DeclareOption|ProcessOptions)", "(?:documentclass|usepackage|input|include)", "makeat(?:letter|other)", "ExplSyntax(?:On|Off)", "(?:new|renew|provide)?command", "(?:re)newenvironment", "(?:New|Renew|Provide|Declare)(?:Expandable)?DocumentCommand", "(?:New|Renew|Provide|Declare)DocumentEnvironment", "(?:(?:e|g|x)?def|let)", "(?:begin|end)", "(?:part|chapter|(?:sub){0,2}section|(?:sub)?paragraph)", "caption", "(?:label|(?:eq|page|name)?ref|(?:paren|foot|super)?cite)", "(?:alpha|beta|[Gg]amma|[Dd]elta|(?:var)?epsilon|zeta|eta|[Tt]heta|vartheta)", "(?:iota|(?:var)?kappa|[Ll]ambda|mu|nu|[Xx]i|[Pp]i|varpi|(?:var)rho)", "(?:[Ss]igma|varsigma|tau|[Uu]psilon|[Pp]hi|varphi|chi|[Pp]si|[Oo]mega)", "(?:frac|sum|prod|lim|infty|times|sqrt|leq|geq|left|right|middle|[bB]igg?)", "(?:[lr]angle|q?quad|[lcvdi]?dots|d?dot|hat|tilde|bar)"].map((e => e + "(?![a-zA-Z@:_])")))
        }, {
          endsParent: !0,
          begin: RegExp(["(?:__)?[a-zA-Z]{2,}_[a-zA-Z](?:_?[a-zA-Z])+:[a-zA-Z]*", "[lgc]__?[a-zA-Z](?:_?[a-zA-Z])*_[a-zA-Z]{2,}", "[qs]__?[a-zA-Z](?:_?[a-zA-Z])+", "use(?:_i)?:[a-zA-Z]*", "(?:else|fi|or):", "(?:if|cs|exp):w", "(?:hbox|vbox):n", "::[a-zA-Z]_unbraced", "::[a-zA-Z:]"].map((e => e + "(?![a-zA-Z:_])")).join("|"))
        }, { endsParent: !0, variants: n }, {
          endsParent: !0, relevance: 0, variants: [{
            begin: /[a-zA-Z@]+/
          }, { begin: /[^a-zA-Z@]?/ }]
        }]
      }, {
        className: "params", relevance: 0,
        begin: /#+\d?/
      }, { variants: n }, { className: "built_in", relevance: 0, begin: /[$&^_]/ }, {
        className: "meta", begin: /% ?!(T[eE]X|tex|BIB|bib)/, end: "$", relevance: 10
      }, e.COMMENT("%", "$", { relevance: 0 })], i = {
        begin: /\{/, end: /\}/, relevance: 0,
        contains: ["self", ...a]
      }, t = e.inherit(i, {
        relevance: 0, endsParent: !0,
        contains: [i, ...a]
      }), r = {
        begin: /\[/, end: /\]/, endsParent: !0, relevance: 0,
        contains: [i, ...a]
      }, s = { begin: /\s+/, relevance: 0 }, c = [t], l = [r], o = (e, n) => ({
        contains: [s], starts: { relevance: 0, contains: e, starts: n }
      }), d = (e, n) => ({
        begin: "\\\\" + e + "(?![a-zA-Z@:_])", keywords: {
          $pattern: /\\[a-zA-Z]+/, keyword: "\\" + e
        }, relevance: 0, contains: [s], starts: n
      }), g = (n, a) => e.inherit({
        begin: "\\\\begin(?=[ \t]*(\\r?\\n[ \t]*)?\\{" + n + "\\})", keywords: {
          $pattern: /\\[a-zA-Z]+/, keyword: "\\begin"
        }, relevance: 0
      }, o(c, a)), m = (n = "string") => e.END_SAME_AS_BEGIN({
        className: n, begin: /(.|\r?\n)/,
        end: /(.|\r?\n)/, excludeBegin: !0, excludeEnd: !0, endsParent: !0
      }), b = e => ({
        className: "string", end: "(?=\\\\end\\{" + e + "\\})"
      }), p = (e = "string") => ({
        relevance: 0,
        begin: /\{/, starts: {
          endsParent: !0, contains: [{
            className: e, end: /(?=\})/,
            endsParent: !0, contains: [{ begin: /\{/, end: /\}/, relevance: 0, contains: ["self"] }]
          }]
        }
      }); return {
        name: "LaTeX", aliases: ["tex"],
        contains: [...["verb", "lstinline"].map((e => d(e, { contains: [m()] }))), d("mint", o(c, {
          contains: [m()]
        })), d("mintinline", o(c, { contains: [p(), m()] })), d("url", {
          contains: [p("link"), p("link")]
        }), d("hyperref", {
          contains: [p("link")]
        }), d("href", o(l, {
          contains: [p("link")]
        })), ...[].concat(...["", "\\*"].map((e => [g("verbatim" + e, b("verbatim" + e)), g("filecontents" + e, o(c, b("filecontents" + e))), ...["", "B", "L"].map((n => g(n + "Verbatim" + e, o(l, b(n + "Verbatim" + e)))))]))), g("minted", o(l, o(c, b("minted")))), ...a]
      }
    }
  })(); hljs.registerLanguage("latex", e)
})();/*! `rust` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const t = e.regex, a = {
        className: "title.function.invoke", relevance: 0,
        begin: t.concat(/\b/, /(?!let\b)/, e.IDENT_RE, t.lookahead(/\s*\(/))
      }, n = "([ui](8|16|32|64|128|size)|f(32|64))?", s = ["drop ", "Copy", "Send", "Sized", "Sync", "Drop", "Fn", "FnMut", "FnOnce", "ToOwned", "Clone", "Debug", "PartialEq", "PartialOrd", "Eq", "Ord", "AsRef", "AsMut", "Into", "From", "Default", "Iterator", "Extend", "IntoIterator", "DoubleEndedIterator", "ExactSizeIterator", "SliceConcatExt", "ToString", "assert!", "assert_eq!", "bitflags!", "bytes!", "cfg!", "col!", "concat!", "concat_idents!", "debug_assert!", "debug_assert_eq!", "env!", "panic!", "file!", "format!", "format_args!", "include_bytes!", "include_str!", "line!", "local_data_key!", "module_path!", "option_env!", "print!", "println!", "select!", "stringify!", "try!", "unimplemented!", "unreachable!", "vec!", "write!", "writeln!", "macro_rules!", "assert_ne!", "debug_assert_ne!"], r = ["i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64", "u128", "usize", "f32", "f64", "str", "char", "bool", "Box", "Option", "Result", "String", "Vec"]
      ; return {
        name: "Rust", aliases: ["rs"], keywords: {
          $pattern: e.IDENT_RE + "!?", type: r,
          keyword: ["abstract", "as", "async", "await", "become", "box", "break", "const", "continue", "crate", "do", "dyn", "else", "enum", "extern", "false", "final", "fn", "for", "if", "impl", "in", "let", "loop", "macro", "match", "mod", "move", "mut", "override", "priv", "pub", "ref", "return", "self", "Self", "static", "struct", "super", "trait", "true", "try", "type", "typeof", "unsafe", "unsized", "use", "virtual", "where", "while", "yield"],
          literal: ["true", "false", "Some", "None", "Ok", "Err"], built_in: s
        }, illegal: "</",
        contains: [e.C_LINE_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", {
          contains: ["self"]
        }), e.inherit(e.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }), {
          className: "string", variants: [{ begin: /b?r(#*)"(.|\n)*?"\1(?!#)/ }, {
            begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
          }]
        }, {
          className: "symbol",
          begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
        }, {
          className: "number", variants: [{
            begin: "\\b0b([01_]+)" + n
          }, { begin: "\\b0o([0-7_]+)" + n }, {
            begin: "\\b0x([A-Fa-f0-9_]+)" + n
          }, {
            begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n
          }], relevance: 0
        }, {
          begin: [/fn/, /\s+/, e.UNDERSCORE_IDENT_RE], className: {
            1: "keyword",
            3: "title.function"
          }
        }, {
          className: "meta", begin: "#!?\\[", end: "\\]", contains: [{
            className: "string", begin: /"/, end: /"/
          }]
        }, {
          begin: [/let/, /\s+/, /(?:mut\s+)?/, e.UNDERSCORE_IDENT_RE], className: {
            1: "keyword",
            3: "keyword", 4: "variable"
          }
        }, {
          begin: [/for/, /\s+/, e.UNDERSCORE_IDENT_RE, /\s+/, /in/], className: {
            1: "keyword",
            3: "variable", 5: "keyword"
          }
        }, {
          begin: [/type/, /\s+/, e.UNDERSCORE_IDENT_RE],
          className: { 1: "keyword", 3: "title.class" }
        }, {
          begin: [/(?:trait|enum|struct|union|impl|for)/, /\s+/, e.UNDERSCORE_IDENT_RE],
          className: { 1: "keyword", 3: "title.class" }
        }, {
          begin: e.IDENT_RE + "::", keywords: {
            keyword: "Self", built_in: s, type: r
          }
        }, { className: "punctuation", begin: "->" }, a]
      }
    }
  })()
  ; hljs.registerLanguage("rust", e)
})();/*! `graphql` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = e.regex; return {
        name: "GraphQL",
        aliases: ["gql"], case_insensitive: !0, disableAutodetect: !1, keywords: {
          keyword: ["query", "mutation", "subscription", "type", "input", "schema", "directive", "interface", "union", "scalar", "fragment", "enum", "on"],
          literal: ["true", "false", "null"]
        },
        contains: [e.HASH_COMMENT_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, {
          scope: "punctuation", match: /[.]{3}/, relevance: 0
        }, {
          scope: "punctuation",
          begin: /[\!\(\)\:\=\[\]\{\|\}]{1}/, relevance: 0
        }, {
          scope: "variable", begin: /\$/,
          end: /\W/, excludeEnd: !0, relevance: 0
        }, { scope: "meta", match: /@\w+/, excludeEnd: !0 }, {
          scope: "symbol", begin: a.concat(/[_A-Za-z][_0-9A-Za-z]*/, a.lookahead(/\s*:/)),
          relevance: 0
        }], illegal: [/[;<']/, /BEGIN/]
      }
    }
  })(); hljs.registerLanguage("graphql", e)
})();/*! `bash` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const s = e.regex, t = {}, n = {
        begin: /\$\{/,
        end: /\}/, contains: ["self", { begin: /:-/, contains: [t] }]
      }; Object.assign(t, {
        className: "variable", variants: [{
          begin: s.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
        }, n]
      }); const a = {
        className: "subst", begin: /\$\(/, end: /\)/, contains: [e.BACKSLASH_ESCAPE]
      }, i = {
        begin: /<<-?\s*(?=\w+)/, starts: {
          contains: [e.END_SAME_AS_BEGIN({
            begin: /(\w+)/,
            end: /(\w+)/, className: "string"
          })]
        }
      }, c = {
        className: "string", begin: /"/, end: /"/,
        contains: [e.BACKSLASH_ESCAPE, t, a]
      }; a.contains.push(c); const o = {
        begin: /\$?\(\(/,
        end: /\)\)/, contains: [{ begin: /\d+#[0-9a-f]+/, className: "number" }, e.NUMBER_MODE, t]
      }, r = e.SHEBANG({
        binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)", relevance: 10
      }), l = {
        className: "function", begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/, returnBegin: !0,
        contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })], relevance: 0
      }; return {
        name: "Bash", aliases: ["sh"], keywords: {
          $pattern: /\b[a-z][a-z0-9._-]+\b/,
          keyword: ["if", "then", "else", "elif", "fi", "for", "while", "in", "do", "done", "case", "esac", "function"],
          literal: ["true", "false"],
          built_in: ["break", "cd", "continue", "eval", "exec", "exit", "export", "getopts", "hash", "pwd", "readonly", "return", "shift", "test", "times", "trap", "umask", "unset", "alias", "bind", "builtin", "caller", "command", "declare", "echo", "enable", "help", "let", "local", "logout", "mapfile", "printf", "read", "readarray", "source", "type", "typeset", "ulimit", "unalias", "set", "shopt", "autoload", "bg", "bindkey", "bye", "cap", "chdir", "clone", "comparguments", "compcall", "compctl", "compdescribe", "compfiles", "compgroups", "compquote", "comptags", "comptry", "compvalues", "dirs", "disable", "disown", "echotc", "echoti", "emulate", "fc", "fg", "float", "functions", "getcap", "getln", "history", "integer", "jobs", "kill", "limit", "log", "noglob", "popd", "print", "pushd", "pushln", "rehash", "sched", "setcap", "setopt", "stat", "suspend", "ttyctl", "unfunction", "unhash", "unlimit", "unsetopt", "vared", "wait", "whence", "where", "which", "zcompile", "zformat", "zftp", "zle", "zmodload", "zparseopts", "zprof", "zpty", "zregexparse", "zsocket", "zstyle", "ztcp", "chcon", "chgrp", "chown", "chmod", "cp", "dd", "df", "dir", "dircolors", "ln", "ls", "mkdir", "mkfifo", "mknod", "mktemp", "mv", "realpath", "rm", "rmdir", "shred", "sync", "touch", "truncate", "vdir", "b2sum", "base32", "base64", "cat", "cksum", "comm", "csplit", "cut", "expand", "fmt", "fold", "head", "join", "md5sum", "nl", "numfmt", "od", "paste", "ptx", "pr", "sha1sum", "sha224sum", "sha256sum", "sha384sum", "sha512sum", "shuf", "sort", "split", "sum", "tac", "tail", "tr", "tsort", "unexpand", "uniq", "wc", "arch", "basename", "chroot", "date", "dirname", "du", "echo", "env", "expr", "factor", "groups", "hostid", "id", "link", "logname", "nice", "nohup", "nproc", "pathchk", "pinky", "printenv", "printf", "pwd", "readlink", "runcon", "seq", "sleep", "stat", "stdbuf", "stty", "tee", "test", "timeout", "tty", "uname", "unlink", "uptime", "users", "who", "whoami", "yes"]
        }, contains: [r, e.SHEBANG(), l, o, e.HASH_COMMENT_MODE, i, { match: /(\/[a-z._-]+)+/ }, c, {
          className: "", begin: /\\"/
        }, { className: "string", begin: /'/, end: /'/ }, t]
      }
    }
  })()
  ; hljs.registerLanguage("bash", e)
})();/*! `shell` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var s = (() => {
    "use strict"; return s => ({
      name: "Shell Session",
      aliases: ["console", "shellsession"], contains: [{
        className: "meta.prompt",
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/, starts: {
          end: /[^\\](?=\s*$)/,
          subLanguage: "bash"
        }
      }]
    })
  })(); hljs.registerLanguage("shell", s)
})();/*! `cmake` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => ({
      name: "CMake", aliases: ["cmake.in"],
      case_insensitive: !0, keywords: {
        keyword: "break cmake_host_system_information cmake_minimum_required cmake_parse_arguments cmake_policy configure_file continue elseif else endforeach endfunction endif endmacro endwhile execute_process file find_file find_library find_package find_path find_program foreach function get_cmake_property get_directory_property get_filename_component get_property if include include_guard list macro mark_as_advanced math message option return separate_arguments set_directory_properties set_property set site_name string unset variable_watch while add_compile_definitions add_compile_options add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_link_options add_subdirectory add_test aux_source_directory build_command create_test_sourcelist define_property enable_language enable_testing export fltk_wrap_ui get_source_file_property get_target_property get_test_property include_directories include_external_msproject include_regular_expression install link_directories link_libraries load_cache project qt_wrap_cpp qt_wrap_ui remove_definitions set_source_files_properties set_target_properties set_tests_properties source_group target_compile_definitions target_compile_features target_compile_options target_include_directories target_link_directories target_link_libraries target_link_options target_sources try_compile try_run ctest_build ctest_configure ctest_coverage ctest_empty_binary_directory ctest_memcheck ctest_read_custom_files ctest_run_script ctest_sleep ctest_start ctest_submit ctest_test ctest_update ctest_upload build_name exec_program export_library_dependencies install_files install_programs install_targets load_command make_directory output_required_files remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or not command policy target test exists is_newer_than is_directory is_symlink is_absolute matches less greater equal less_equal greater_equal strless strgreater strequal strless_equal strgreater_equal version_less version_greater version_equal version_less_equal version_greater_equal in_list defined"
      }, contains: [{
        className: "variable", begin: /\$\{/, end: /\}/
      }, e.COMMENT(/#\[\[/, /]]/), e.HASH_COMMENT_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE]
    })
  })(); hljs.registerLanguage("cmake", e)
})();/*! `javascript` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"
      ; const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], t = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"], s = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], r = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], c = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], i = [].concat(r, t, s)
      ; return o => {
        const l = o.regex, b = e, d = {
          begin: /<[A-Za-z0-9\\._:-]+/,
          end: /\/[A-Za-z0-9\\._:-]+>|\/>/, isTrulyOpeningTag: (e, n) => {
            const a = e[0].length + e.index, t = e.input[a]
              ; if ("<" === t || "," === t) return void n.ignoreMatch(); let s
              ; ">" === t && (((e, { after: n }) => {
                const a = "</" + e[0].slice(1)
                ; return -1 !== e.input.indexOf(a, n)
              })(e, { after: a }) || n.ignoreMatch())
              ; const r = e.input.substring(a)
              ; ((s = r.match(/^\s*=/)) || (s = r.match(/^\s+extends\s+/)) && 0 === s.index) && n.ignoreMatch()
          }
        }, g = {
          $pattern: e, keyword: n, literal: a, built_in: i, "variable.language": c
        }, u = "\\.([0-9](_?[0-9])*)", m = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", E = {
          className: "number", variants: [{
            begin: `(\\b(${m})((${u})|\\.)?|(${u}))[eE][+-]?([0-9](_?[0-9])*)\\b`
          }, {
            begin: `\\b(${m})\\b((${u})\\b|\\.)?|(${u})\\b`
          }, {
            begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
          }, {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
          }, {
            begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
          }, { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" }, {
            begin: "\\b0[0-7]+n?\\b"
          }], relevance: 0
        }, A = {
          className: "subst", begin: "\\$\\{",
          end: "\\}", keywords: g, contains: []
        }, y = {
          begin: "html`", end: "", starts: {
            end: "`",
            returnEnd: !1, contains: [o.BACKSLASH_ESCAPE, A], subLanguage: "xml"
          }
        }, N = {
          begin: "css`", end: "", starts: {
            end: "`", returnEnd: !1,
            contains: [o.BACKSLASH_ESCAPE, A], subLanguage: "css"
          }
        }, _ = {
          className: "string",
          begin: "`", end: "`", contains: [o.BACKSLASH_ESCAPE, A]
        }, h = {
          className: "comment",
          variants: [o.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
            relevance: 0, contains: [{
              begin: "(?=@[A-Za-z]+)", relevance: 0, contains: [{
                className: "doctag",
                begin: "@[A-Za-z]+"
              }, {
                className: "type", begin: "\\{", end: "\\}", excludeEnd: !0,
                excludeBegin: !0, relevance: 0
              }, {
                className: "variable", begin: b + "(?=\\s*(-)|$)",
                endsParent: !0, relevance: 0
              }, { begin: /(?=[^\n])\s/, relevance: 0 }]
            }]
          }), o.C_BLOCK_COMMENT_MODE, o.C_LINE_COMMENT_MODE]
        }, f = [o.APOS_STRING_MODE, o.QUOTE_STRING_MODE, y, N, _, { match: /\$\d+/ }, E]
        ; A.contains = f.concat({
          begin: /\{/, end: /\}/, keywords: g, contains: ["self"].concat(f)
        }); const v = [].concat(h, A.contains), p = v.concat([{
          begin: /\(/, end: /\)/, keywords: g,
          contains: ["self"].concat(v)
        }]), S = {
          className: "params", begin: /\(/, end: /\)/,
          excludeBegin: !0, excludeEnd: !0, keywords: g, contains: p
        }, w = {
          variants: [{
            match: [/class/, /\s+/, b, /\s+/, /extends/, /\s+/, l.concat(b, "(", l.concat(/\./, b), ")*")],
            scope: { 1: "keyword", 3: "title.class", 5: "keyword", 7: "title.class.inherited" }
          }, {
            match: [/class/, /\s+/, b], scope: { 1: "keyword", 3: "title.class" }
          }]
        }, R = {
          relevance: 0,
          match: l.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
          className: "title.class", keywords: { _: [...t, ...s] }
        }, O = {
          variants: [{
            match: [/function/, /\s+/, b, /(?=\s*\()/]
          }, { match: [/function/, /\s*(?=\()/] }],
          className: { 1: "keyword", 3: "title.function" }, label: "func.def", contains: [S],
          illegal: /%/
        }, k = {
          match: l.concat(/\b/, (I = [...r, "super", "import"], l.concat("(?!", I.join("|"), ")")), b, l.lookahead(/\(/)),
          className: "title.function", relevance: 0
        }; var I; const x = {
          begin: l.concat(/\./, l.lookahead(l.concat(b, /(?![0-9A-Za-z$_(])/))), end: b,
          excludeBegin: !0, keywords: "prototype", className: "property", relevance: 0
        }, T = {
          match: [/get|set/, /\s+/, b, /(?=\()/], className: { 1: "keyword", 3: "title.function" },
          contains: [{ begin: /\(\)/ }, S]
        }, C = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + o.UNDERSCORE_IDENT_RE + ")\\s*=>", M = {
          match: [/const|var|let/, /\s+/, b, /\s*/, /=\s*/, /(async\s*)?/, l.lookahead(C)],
          keywords: "async", className: { 1: "keyword", 3: "title.function" }, contains: [S]
        }
          ; return {
            name: "Javascript", aliases: ["js", "jsx", "mjs", "cjs"], keywords: g, exports: {
              PARAMS_CONTAINS: p, CLASS_REFERENCE: R
            }, illegal: /#(?![$_A-z])/,
            contains: [o.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }), {
              label: "use_strict", className: "meta", relevance: 10,
              begin: /^\s*['"]use (strict|asm)['"]/
            }, o.APOS_STRING_MODE, o.QUOTE_STRING_MODE, y, N, _, h, { match: /\$\d+/ }, E, R, {
              className: "attr", begin: b + l.lookahead(":"), relevance: 0
            }, M, {
              begin: "(" + o.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
              keywords: "return throw case", relevance: 0, contains: [h, o.REGEXP_MODE, {
                className: "function", begin: C, returnBegin: !0, end: "\\s*=>", contains: [{
                  className: "params", variants: [{ begin: o.UNDERSCORE_IDENT_RE, relevance: 0 }, {
                    className: null, begin: /\(\s*\)/, skip: !0
                  }, {
                    begin: /\(/, end: /\)/, excludeBegin: !0,
                    excludeEnd: !0, keywords: g, contains: p
                  }]
                }]
              }, { begin: /,/, relevance: 0 }, {
                match: /\s+/,
                  relevance: 0
                }, {
                  variants: [{ begin: "<>", end: "</>" }, {
                    match: /<[A-Za-z0-9\\._:-]+\s*\/>/
                  }, {
                    begin: d.begin,
                    "on:begin": d.isTrulyOpeningTag, end: d.end
                  }], subLanguage: "xml", contains: [{
                    begin: d.begin, end: d.end, skip: !0, contains: ["self"]
                  }]
                }]
            }, O, {
              beginKeywords: "while if switch catch for"
            }, {
              begin: "\\b(?!function)" + o.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
              returnBegin: !0, label: "func.def", contains: [S, o.inherit(o.TITLE_MODE, {
                begin: b,
                className: "title.function"
              })]
            }, { match: /\.\.\./, relevance: 0 }, x, {
              match: "\\$" + b,
              relevance: 0
            }, {
              match: [/\bconstructor(?=\s*\()/], className: { 1: "title.function" },
              contains: [S]
            }, k, {
              relevance: 0, match: /\b[A-Z][A-Z_0-9]+\b/,
              className: "variable.constant"
            }, w, T, { match: /\$[(.]/ }]
          }
      }
  })()
  ; hljs.registerLanguage("javascript", e)
})();/*! `lua` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const t = "\\[=*\\[", a = "\\]=*\\]", n = {
        begin: t, end: a, contains: ["self"]
      }, o = [e.COMMENT("--(?!\\[=*\\[)", "$"), e.COMMENT("--\\[=*\\[", a, {
        contains: [n],
        relevance: 10
      })]; return {
        name: "Lua", keywords: {
          $pattern: e.UNDERSCORE_IDENT_RE,
          literal: "true false nil",
          keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
          built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
        }, contains: o.concat([{
          className: "function", beginKeywords: "function", end: "\\)",
          contains: [e.inherit(e.TITLE_MODE, {
            begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
          }), {
            className: "params",
            begin: "\\(", endsWithParent: !0, contains: o
          }].concat(o)
        }, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
          className: "string",
          begin: t, end: a, contains: [n], relevance: 5
        }])
      }
    }
  })(); hljs.registerLanguage("lua", e)
})();/*! `ruby` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, a = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)", s = n.either(/\b([A-Z]+[a-z0-9]+)+/, /\b([A-Z]+[a-z0-9]+)+[A-Z]+/), i = n.concat(s, /(::\w+)*/), t = {
        "variable.constant": ["__FILE__", "__LINE__", "__ENCODING__"],
        "variable.language": ["self", "super"],
        keyword: ["alias", "and", "begin", "BEGIN", "break", "case", "class", "defined", "do", "else", "elsif", "end", "END", "ensure", "for", "if", "in", "module", "next", "not", "or", "redo", "require", "rescue", "retry", "return", "then", "undef", "unless", "until", "when", "while", "yield", "include", "extend", "prepend", "public", "private", "protected", "raise", "throw"],
        built_in: ["proc", "lambda", "attr_accessor", "attr_reader", "attr_writer", "define_method", "private_constant", "module_function"],
        literal: ["true", "false", "nil"]
      }, c = { className: "doctag", begin: "@[A-Za-z]+" }, r = {
        begin: "#<", end: ">"
      }, b = [e.COMMENT("#", "$", {
        contains: [c]
      }), e.COMMENT("^=begin", "^=end", {
        contains: [c], relevance: 10
      }), e.COMMENT("^__END__", e.MATCH_NOTHING_RE)], l = {
        className: "subst", begin: /#\{/,
        end: /\}/, keywords: t
      }, d = {
        className: "string", contains: [e.BACKSLASH_ESCAPE, l],
        variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }, { begin: /`/, end: /`/ }, {
          begin: /%[qQwWx]?\(/, end: /\)/
        }, { begin: /%[qQwWx]?\[/, end: /\]/ }, {
          begin: /%[qQwWx]?\{/, end: /\}/
        }, { begin: /%[qQwWx]?</, end: />/ }, {
          begin: /%[qQwWx]?\//,
          end: /\//
        }, { begin: /%[qQwWx]?%/, end: /%/ }, { begin: /%[qQwWx]?-/, end: /-/ }, {
          begin: /%[qQwWx]?\|/, end: /\|/
        }, { begin: /\B\?(\\\d{1,3})/ }, {
          begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
        }, { begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/ }, {
          begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
        }, {
          begin: /\B\?\\(c|C-)[\x20-\x7e]/
        }, { begin: /\B\?\\?\S/ }, {
          begin: n.concat(/<<[-~]?'?/, n.lookahead(/(\w+)(?=\W)[^\n]*\n(?:[^\n]*\n)*?\s*\1\b/)),
          contains: [e.END_SAME_AS_BEGIN({
            begin: /(\w+)/, end: /(\w+)/,
            contains: [e.BACKSLASH_ESCAPE, l]
          })]
        }]
      }, o = "[0-9](_?[0-9])*", g = {
        className: "number",
        relevance: 0, variants: [{
          begin: `\\b([1-9](_?[0-9])*|0)(\\.(${o}))?([eE][+-]?(${o})|r)?i?\\b`
        }, {
          begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
        }, {
          begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
        }, { begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" }, {
          begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
        }, {
          begin: "\\b0(_?[0-7])+r?i?\\b"
        }]
      }, _ = {
        variants: [{ match: /\(\)/ }, {
          className: "params", begin: /\(/, end: /(?=\))/, excludeBegin: !0, endsParent: !0,
          keywords: t
        }]
      }, u = [d, {
        variants: [{ match: [/class\s+/, i, /\s+<\s+/, i] }, {
          match: [/\b(class|module)\s+/, i]
        }], scope: {
          2: "title.class",
          4: "title.class.inherited"
        }, keywords: t
      }, {
        match: [/(include|extend)\s+/, i], scope: {
          2: "title.class"
        }, keywords: t
        }, {
          relevance: 0, match: [i, /\.new[. (]/], scope: {
            1: "title.class"
          }
        }, {
          relevance: 0, match: /\b[A-Z][A-Z_0-9]+\b/,
          className: "variable.constant"
        }, { relevance: 0, match: s, scope: "title.class" }, {
          match: [/def/, /\s+/, a], scope: { 1: "keyword", 3: "title.function" }, contains: [_]
        }, {
          begin: e.IDENT_RE + "::"
        }, {
          className: "symbol",
          begin: e.UNDERSCORE_IDENT_RE + "(!|\\?)?:", relevance: 0
        }, {
          className: "symbol",
          begin: ":(?!\\s)", contains: [d, { begin: a }], relevance: 0
        }, g, {
          className: "variable",
          begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
        }, {
          className: "params", begin: /\|/, end: /\|/, excludeBegin: !0, excludeEnd: !0,
          relevance: 0, keywords: t
        }, {
          begin: "(" + e.RE_STARTERS_RE + "|unless)\\s*",
          keywords: "unless", contains: [{
            className: "regexp", contains: [e.BACKSLASH_ESCAPE, l],
            illegal: /\n/, variants: [{ begin: "/", end: "/[a-z]*" }, { begin: /%r\{/, end: /\}[a-z]*/ }, {
              begin: "%r\\(", end: "\\)[a-z]*"
            }, { begin: "%r!", end: "![a-z]*" }, {
              begin: "%r\\[",
              end: "\\][a-z]*"
            }]
          }].concat(r, b), relevance: 0
        }].concat(r, b)
        ; l.contains = u, _.contains = u; const m = [{
          begin: /^\s*=>/, starts: { end: "$", contains: u }
        }, {
          className: "meta.prompt",
          begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+[>*]|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
          starts: { end: "$", keywords: t, contains: u }
        }]; return b.unshift(r), {
          name: "Ruby",
          aliases: ["rb", "gemspec", "podspec", "thor", "irb"], keywords: t, illegal: /\/\*/,
          contains: [e.SHEBANG({ binary: "ruby" })].concat(m).concat(b).concat(u)
        }
    }
  })()
  ; hljs.registerLanguage("ruby", e)
})();/*! `dockerfile` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => ({
      name: "Dockerfile", aliases: ["docker"],
      case_insensitive: !0,
      keywords: ["from", "maintainer", "expose", "env", "arg", "user", "onbuild", "stopsignal"],
      contains: [e.HASH_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, {
        beginKeywords: "run cmd entrypoint volume add copy workdir label healthcheck shell",
        starts: { end: /[^\\]$/, subLanguage: "bash" }
      }], illegal: "</"
    })
  })()
  ; hljs.registerLanguage("dockerfile", e)
})();/*! `less` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"
      ; const e = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"], t = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"], r = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"], i = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"], o = ["align-content", "align-items", "align-self", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inline-size", "isolation", "justify-content", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "rest", "rest-after", "rest-before", "right", "row-gap", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "speak", "speak-as", "src", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index"].reverse(), n = r.concat(i)
      ; return a => {
        const l = (e => ({
          IMPORTANT: { scope: "meta", begin: "!important" },
          BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE, HEXCOLOR: {
            scope: "number",
            begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
          }, FUNCTION_DISPATCH: {
            className: "built_in", begin: /[\w-]+(?=\()/
          }, ATTRIBUTE_SELECTOR_MODE: {
            scope: "selector-attr", begin: /\[/, end: /\]/, illegal: "$",
            contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
          }, CSS_NUMBER_MODE: {
            scope: "number",
            begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            relevance: 0
          }, CSS_VARIABLE: { className: "attr", begin: /--[A-Za-z][A-Za-z0-9_-]*/ }
        }))(a), s = n, d = "([\\w-]+|@\\{[\\w-]+\\})", c = [], g = [], b = e => ({
          className: "string",
          begin: "~?" + e + ".*?" + e
        }), m = (e, t, r) => ({ className: e, begin: t, relevance: r }), p = {
          $pattern: /[a-z-]+/, keyword: "and or not only", attribute: t.join(" ")
        }, u = {
          begin: "\\(", end: "\\)", contains: g, keywords: p, relevance: 0
        }
        ; g.push(a.C_LINE_COMMENT_MODE, a.C_BLOCK_COMMENT_MODE, b("'"), b('"'), l.CSS_NUMBER_MODE, {
          begin: "(url|data-uri)\\(", starts: {
            className: "string", end: "[\\)\\n]",
            excludeEnd: !0
          }
        }, l.HEXCOLOR, u, m("variable", "@@?[\\w-]+", 10), m("variable", "@\\{[\\w-]+\\}"), m("built_in", "~?`[^`]*?`"), {
          className: "attribute", begin: "[\\w-]+\\s*:", end: ":", returnBegin: !0, excludeEnd: !0
        }, l.IMPORTANT, { beginKeywords: "and not" }, l.FUNCTION_DISPATCH); const h = g.concat({
          begin: /\{/, end: /\}/, contains: c
        }), f = {
          beginKeywords: "when", endsWithParent: !0,
          contains: [{ beginKeywords: "and not" }].concat(g)
        }, k = {
          begin: d + "\\s*:",
          returnBegin: !0, end: /[;}]/, relevance: 0, contains: [{
            begin: /-(webkit|moz|ms|o)-/
          }, l.CSS_VARIABLE, {
            className: "attribute", begin: "\\b(" + o.join("|") + ")\\b",
            end: /(?=:)/, starts: { endsWithParent: !0, illegal: "[<=$]", relevance: 0, contains: g }
          }]
        }, w = {
          className: "keyword",
          begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
          starts: { end: "[;{}]", keywords: p, returnEnd: !0, contains: g, relevance: 0 }
        }, v = {
          className: "variable", variants: [{ begin: "@[\\w-]+\\s*:", relevance: 15 }, {
            begin: "@[\\w-]+"
          }], starts: { end: "[;}]", returnEnd: !0, contains: h }
        }, y = {
          variants: [{
            begin: "[\\.#:&\\[>]", end: "[;{}]"
          }, { begin: d, end: /\{/ }], returnBegin: !0,
          returnEnd: !0, illegal: "[<='$\"]", relevance: 0,
          contains: [a.C_LINE_COMMENT_MODE, a.C_BLOCK_COMMENT_MODE, f, m("keyword", "all\\b"), m("variable", "@\\{[\\w-]+\\}"), {
            begin: "\\b(" + e.join("|") + ")\\b", className: "selector-tag"
          }, l.CSS_NUMBER_MODE, m("selector-tag", d, 0), m("selector-id", "#" + d), m("selector-class", "\\." + d, 0), m("selector-tag", "&", 0), l.ATTRIBUTE_SELECTOR_MODE, {
            className: "selector-pseudo", begin: ":(" + r.join("|") + ")"
          }, {
            className: "selector-pseudo", begin: ":(:)?(" + i.join("|") + ")"
          }, {
            begin: /\(/,
            end: /\)/, relevance: 0, contains: h
          }, { begin: "!important" }, l.FUNCTION_DISPATCH]
        }, x = {
          begin: `[\\w-]+:(:)?(${s.join("|")})`, returnBegin: !0, contains: [y]
        }
          ; return c.push(a.C_LINE_COMMENT_MODE, a.C_BLOCK_COMMENT_MODE, w, v, x, k, y, f, l.FUNCTION_DISPATCH),
            { name: "Less", case_insensitive: !0, illegal: "[=>'/<($\"]", contains: c }
      }
  })()
  ; hljs.registerLanguage("less", e)
})();/*! `csharp` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = {
        keyword: ["abstract", "as", "base", "break", "case", "catch", "class", "const", "continue", "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach", "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace", "new", "operator", "out", "override", "params", "private", "protected", "public", "readonly", "record", "ref", "return", "scoped", "sealed", "sizeof", "stackalloc", "static", "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe", "using", "virtual", "void", "volatile", "while"].concat(["add", "alias", "and", "ascending", "async", "await", "by", "descending", "equals", "from", "get", "global", "group", "init", "into", "join", "let", "nameof", "not", "notnull", "on", "or", "orderby", "partial", "remove", "select", "set", "unmanaged", "value|0", "var", "when", "where", "with", "yield"]),
        built_in: ["bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float", "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong", "uint", "ushort"],
        literal: ["default", "false", "null", "true"]
      }, a = e.inherit(e.TITLE_MODE, {
        begin: "[a-zA-Z](\\.?\\w)*"
      }), i = {
        className: "number", variants: [{
          begin: "\\b(0b[01']+)"
        }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }], relevance: 0
      }, s = {
        className: "string", begin: '@"', end: '"', contains: [{ begin: '""' }]
      }, t = e.inherit(s, { illegal: /\n/ }), r = {
        className: "subst", begin: /\{/, end: /\}/,
        keywords: n
      }, l = e.inherit(r, { illegal: /\n/ }), c = {
        className: "string", begin: /\$"/,
        end: '"', illegal: /\n/, contains: [{ begin: /\{\{/ }, {
          begin: /\}\}/
        }, e.BACKSLASH_ESCAPE, l]
      }, o = {
        className: "string", begin: /\$@"/, end: '"', contains: [{
          begin: /\{\{/
        }, { begin: /\}\}/ }, { begin: '""' }, r]
      }, d = e.inherit(o, {
        illegal: /\n/,
        contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, { begin: '""' }, l]
      })
      ; r.contains = [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, i, e.C_BLOCK_COMMENT_MODE],
        l.contains = [d, c, t, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, i, e.inherit(e.C_BLOCK_COMMENT_MODE, {
          illegal: /\n/
        })]; const g = {
          variants: [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
        }, E = {
          begin: "<", end: ">", contains: [{ beginKeywords: "in out" }, a]
        }, _ = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?", b = {
          begin: "@" + e.IDENT_RE, relevance: 0
        }; return {
          name: "C#", aliases: ["cs", "c#"],
          keywords: n, illegal: /::/, contains: [e.COMMENT("///", "$", {
            returnBegin: !0,
            contains: [{
              className: "doctag", variants: [{ begin: "///", relevance: 0 }, {
                begin: "\x3c!--|--\x3e"
              }, { begin: "</?", end: ">" }]
            }]
          }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
            className: "meta", begin: "#",
            end: "$", keywords: {
              keyword: "if else elif endif define undef warning error line region endregion pragma checksum"
            }
          }, g, i, {
            beginKeywords: "class interface", relevance: 0, end: /[{;=]/,
            illegal: /[^\s:,]/, contains: [{
              beginKeywords: "where class"
            }, a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          }, {
            beginKeywords: "namespace",
            relevance: 0, end: /[{;=]/, illegal: /[^\s:]/,
            contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          }, {
            beginKeywords: "record", relevance: 0, end: /[{;=]/, illegal: /[^\s:]/,
            contains: [a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          }, {
            className: "meta",
            begin: "^\\s*\\[(?=[\\w])", excludeBegin: !0, end: "\\]", excludeEnd: !0, contains: [{
              className: "string", begin: /"/, end: /"/
            }]
          }, {
            beginKeywords: "new return throw await else", relevance: 0
          }, {
            className: "function",
            begin: "(" + _ + "\\s+)+" + e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(", returnBegin: !0,
            end: /\s*[{;=]/, excludeEnd: !0, keywords: n, contains: [{
              beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
              relevance: 0
            }, {
              begin: e.IDENT_RE + "\\s*(<[^=]+>\\s*)?\\(", returnBegin: !0,
              contains: [e.TITLE_MODE, E], relevance: 0
            }, { match: /\(\)/ }, {
              className: "params",
              begin: /\(/, end: /\)/, excludeBegin: !0, excludeEnd: !0, keywords: n, relevance: 0,
              contains: [g, i, e.C_BLOCK_COMMENT_MODE]
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          }, b]
        }
    }
  })()
  ; hljs.registerLanguage("csharp", e)
})();/*! `typescript` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"
      ; const e = "[A-Za-z$_][0-9A-Za-z$_]*", n = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"], a = ["true", "false", "null", "undefined", "NaN", "Infinity"], t = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"], s = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], c = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], r = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], i = [].concat(c, t, s)
      ; function o(o) {
        const l = o.regex, d = e, b = {
          begin: /<[A-Za-z0-9\\._:-]+/,
          end: /\/[A-Za-z0-9\\._:-]+>|\/>/, isTrulyOpeningTag: (e, n) => {
            const a = e[0].length + e.index, t = e.input[a]
              ; if ("<" === t || "," === t) return void n.ignoreMatch(); let s
              ; ">" === t && (((e, { after: n }) => {
                const a = "</" + e[0].slice(1)
                ; return -1 !== e.input.indexOf(a, n)
              })(e, { after: a }) || n.ignoreMatch())
              ; const c = e.input.substring(a)
              ; ((s = c.match(/^\s*=/)) || (s = c.match(/^\s+extends\s+/)) && 0 === s.index) && n.ignoreMatch()
          }
        }, g = {
          $pattern: e, keyword: n, literal: a, built_in: i, "variable.language": r
        }, u = "\\.([0-9](_?[0-9])*)", m = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", E = {
          className: "number", variants: [{
            begin: `(\\b(${m})((${u})|\\.)?|(${u}))[eE][+-]?([0-9](_?[0-9])*)\\b`
          }, {
            begin: `\\b(${m})\\b((${u})\\b|\\.)?|(${u})\\b`
          }, {
            begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
          }, {
            begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
          }, {
            begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
          }, { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" }, {
            begin: "\\b0[0-7]+n?\\b"
          }], relevance: 0
        }, y = {
          className: "subst", begin: "\\$\\{",
          end: "\\}", keywords: g, contains: []
        }, A = {
          begin: "html`", end: "", starts: {
            end: "`",
            returnEnd: !1, contains: [o.BACKSLASH_ESCAPE, y], subLanguage: "xml"
          }
        }, p = {
          begin: "css`", end: "", starts: {
            end: "`", returnEnd: !1,
            contains: [o.BACKSLASH_ESCAPE, y], subLanguage: "css"
          }
        }, _ = {
          className: "string",
          begin: "`", end: "`", contains: [o.BACKSLASH_ESCAPE, y]
        }, N = {
          className: "comment",
          variants: [o.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
            relevance: 0, contains: [{
              begin: "(?=@[A-Za-z]+)", relevance: 0, contains: [{
                className: "doctag",
                begin: "@[A-Za-z]+"
              }, {
                className: "type", begin: "\\{", end: "\\}", excludeEnd: !0,
                excludeBegin: !0, relevance: 0
              }, {
                className: "variable", begin: d + "(?=\\s*(-)|$)",
                endsParent: !0, relevance: 0
              }, { begin: /(?=[^\n])\s/, relevance: 0 }]
            }]
          }), o.C_BLOCK_COMMENT_MODE, o.C_LINE_COMMENT_MODE]
        }, f = [o.APOS_STRING_MODE, o.QUOTE_STRING_MODE, A, p, _, { match: /\$\d+/ }, E]
        ; y.contains = f.concat({
          begin: /\{/, end: /\}/, keywords: g, contains: ["self"].concat(f)
        }); const h = [].concat(N, y.contains), v = h.concat([{
          begin: /\(/, end: /\)/, keywords: g,
          contains: ["self"].concat(h)
        }]), S = {
          className: "params", begin: /\(/, end: /\)/,
          excludeBegin: !0, excludeEnd: !0, keywords: g, contains: v
        }, w = {
          variants: [{
            match: [/class/, /\s+/, d, /\s+/, /extends/, /\s+/, l.concat(d, "(", l.concat(/\./, d), ")*")],
            scope: { 1: "keyword", 3: "title.class", 5: "keyword", 7: "title.class.inherited" }
          }, {
            match: [/class/, /\s+/, d], scope: { 1: "keyword", 3: "title.class" }
          }]
        }, R = {
          relevance: 0,
          match: l.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
          className: "title.class", keywords: { _: [...t, ...s] }
        }, x = {
          variants: [{
            match: [/function/, /\s+/, d, /(?=\s*\()/]
          }, { match: [/function/, /\s*(?=\()/] }],
          className: { 1: "keyword", 3: "title.function" }, label: "func.def", contains: [S],
          illegal: /%/
        }, k = {
          match: l.concat(/\b/, (O = [...c, "super", "import"], l.concat("(?!", O.join("|"), ")")), d, l.lookahead(/\(/)),
          className: "title.function", relevance: 0
        }; var O; const I = {
          begin: l.concat(/\./, l.lookahead(l.concat(d, /(?![0-9A-Za-z$_(])/))), end: d,
          excludeBegin: !0, keywords: "prototype", className: "property", relevance: 0
        }, C = {
          match: [/get|set/, /\s+/, d, /(?=\()/], className: { 1: "keyword", 3: "title.function" },
          contains: [{ begin: /\(\)/ }, S]
        }, T = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + o.UNDERSCORE_IDENT_RE + ")\\s*=>", M = {
          match: [/const|var|let/, /\s+/, d, /\s*/, /=\s*/, /(async\s*)?/, l.lookahead(T)],
          keywords: "async", className: { 1: "keyword", 3: "title.function" }, contains: [S]
        }
          ; return {
            name: "Javascript", aliases: ["js", "jsx", "mjs", "cjs"], keywords: g, exports: {
              PARAMS_CONTAINS: v, CLASS_REFERENCE: R
            }, illegal: /#(?![$_A-z])/,
            contains: [o.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }), {
              label: "use_strict", className: "meta", relevance: 10,
              begin: /^\s*['"]use (strict|asm)['"]/
            }, o.APOS_STRING_MODE, o.QUOTE_STRING_MODE, A, p, _, N, { match: /\$\d+/ }, E, R, {
              className: "attr", begin: d + l.lookahead(":"), relevance: 0
            }, M, {
              begin: "(" + o.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
              keywords: "return throw case", relevance: 0, contains: [N, o.REGEXP_MODE, {
                className: "function", begin: T, returnBegin: !0, end: "\\s*=>", contains: [{
                  className: "params", variants: [{ begin: o.UNDERSCORE_IDENT_RE, relevance: 0 }, {
                    className: null, begin: /\(\s*\)/, skip: !0
                  }, {
                    begin: /\(/, end: /\)/, excludeBegin: !0,
                    excludeEnd: !0, keywords: g, contains: v
                  }]
                }]
              }, { begin: /,/, relevance: 0 }, {
                match: /\s+/,
                  relevance: 0
                }, {
                  variants: [{ begin: "<>", end: "</>" }, {
                    match: /<[A-Za-z0-9\\._:-]+\s*\/>/
                  }, {
                    begin: b.begin,
                    "on:begin": b.isTrulyOpeningTag, end: b.end
                  }], subLanguage: "xml", contains: [{
                    begin: b.begin, end: b.end, skip: !0, contains: ["self"]
                  }]
                }]
            }, x, {
              beginKeywords: "while if switch catch for"
            }, {
              begin: "\\b(?!function)" + o.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
              returnBegin: !0, label: "func.def", contains: [S, o.inherit(o.TITLE_MODE, {
                begin: d,
                className: "title.function"
              })]
            }, { match: /\.\.\./, relevance: 0 }, I, {
              match: "\\$" + d,
              relevance: 0
            }, {
              match: [/\bconstructor(?=\s*\()/], className: { 1: "title.function" },
              contains: [S]
            }, k, {
              relevance: 0, match: /\b[A-Z][A-Z_0-9]+\b/,
              className: "variable.constant"
            }, w, C, { match: /\$[(.]/ }]
          }
      } return t => {
        const s = o(t), c = ["any", "void", "number", "boolean", "string", "object", "never", "symbol", "bigint", "unknown"], l = {
          beginKeywords: "namespace", end: /\{/, excludeEnd: !0,
          contains: [s.exports.CLASS_REFERENCE]
        }, d = {
          beginKeywords: "interface", end: /\{/,
          excludeEnd: !0, keywords: { keyword: "interface extends", built_in: c },
          contains: [s.exports.CLASS_REFERENCE]
        }, b = {
          $pattern: e,
          keyword: n.concat(["type", "namespace", "interface", "public", "private", "protected", "implements", "declare", "abstract", "readonly", "enum", "override"]),
          literal: a, built_in: i.concat(c), "variable.language": r
        }, g = {
          className: "meta",
          begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
        }, u = (e, n, a) => {
          const t = e.contains.findIndex((e => e.label === n))
            ; if (-1 === t) throw Error("can not find mode to replace"); e.contains.splice(t, 1, a)
        }
          ; return Object.assign(s.keywords, b),
            s.exports.PARAMS_CONTAINS.push(g), s.contains = s.contains.concat([g, l, d]),
            u(s, "shebang", t.SHEBANG()), u(s, "use_strict", {
              className: "meta", relevance: 10,
              begin: /^\s*['"]use strict['"]/
            }), s.contains.find((e => "func.def" === e.label)).relevance = 0, Object.assign(s, {
              name: "TypeScript", aliases: ["ts", "tsx"]
            }), s
      }
  })()
  ; hljs.registerLanguage("typescript", e)
})();/*! `python` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, a = /[\p{XID_Start}_]\p{XID_Continue}*/u, i = ["and", "as", "assert", "async", "await", "break", "case", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "match", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"], s = {
        $pattern: /[A-Za-z]\w+|__\w+__/, keyword: i,
        built_in: ["__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"],
        literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
        type: ["Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"]
      }, t = { className: "meta", begin: /^(>>>|\.\.\.) / }, r = {
        className: "subst", begin: /\{/,
        end: /\}/, keywords: s, illegal: /#/
      }, l = { begin: /\{\{/, relevance: 0 }, b = {
        className: "string", contains: [e.BACKSLASH_ESCAPE], variants: [{
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/, end: /'''/,
          contains: [e.BACKSLASH_ESCAPE, t], relevance: 10
        }, {
          begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/, end: /"""/,
          contains: [e.BACKSLASH_ESCAPE, t], relevance: 10
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])'''/, end: /'''/,
          contains: [e.BACKSLASH_ESCAPE, t, l, r]
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])"""/,
          end: /"""/, contains: [e.BACKSLASH_ESCAPE, t, l, r]
        }, {
          begin: /([uU]|[rR])'/, end: /'/,
          relevance: 10
        }, { begin: /([uU]|[rR])"/, end: /"/, relevance: 10 }, {
          begin: /([bB]|[bB][rR]|[rR][bB])'/, end: /'/
        }, {
          begin: /([bB]|[bB][rR]|[rR][bB])"/,
          end: /"/
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])'/, end: /'/,
          contains: [e.BACKSLASH_ESCAPE, l, r]
        }, {
          begin: /([fF][rR]|[rR][fF]|[fF])"/, end: /"/,
          contains: [e.BACKSLASH_ESCAPE, l, r]
        }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
      }, o = "[0-9](_?[0-9])*", c = `(\\b(${o}))?\\.(${o})|\\b(${o})\\.`, d = "\\b|" + i.join("|"), g = {
        className: "number", relevance: 0, variants: [{
          begin: `(\\b(${o})|(${c}))[eE][+-]?(${o})[jJ]?(?=${d})`
        }, { begin: `(${c})[jJ]?` }, {
          begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${d})`
        }, {
          begin: `\\b0[bB](_?[01])+[lL]?(?=${d})`
        }, {
          begin: `\\b0[oO](_?[0-7])+[lL]?(?=${d})`
        }, { begin: `\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${d})` }, {
          begin: `\\b(${o})[jJ](?=${d})`
        }]
      }, p = {
        className: "comment", begin: n.lookahead(/# type:/), end: /$/, keywords: s,
        contains: [{ begin: /# type:/ }, { begin: /#/, end: /\b\B/, endsWithParent: !0 }]
      }, m = {
        className: "params", variants: [{ className: "", begin: /\(\s*\)/, skip: !0 }, {
          begin: /\(/,
          end: /\)/, excludeBegin: !0, excludeEnd: !0, keywords: s,
          contains: ["self", t, g, b, e.HASH_COMMENT_MODE]
        }]
      }; return r.contains = [b, g, t], {
        name: "Python", aliases: ["py", "gyp", "ipython"], unicodeRegex: !0, keywords: s,
        illegal: /(<\/|->|\?)|=>/, contains: [t, g, { begin: /\bself\b/ }, {
          beginKeywords: "if",
          relevance: 0
        }, b, p, e.HASH_COMMENT_MODE, {
          match: [/\bdef/, /\s+/, a], scope: {
            1: "keyword", 3: "title.function"
          }, contains: [m]
          }, {
            variants: [{
              match: [/\bclass/, /\s+/, a, /\s*/, /\(\s*/, a, /\s*\)/]
            }, { match: [/\bclass/, /\s+/, a] }],
            scope: { 1: "keyword", 3: "title.class", 6: "title.class.inherited" }
          }, {
            className: "meta", begin: /^[\t ]*@/, end: /(?=#)|$/, contains: [g, m, b]
          }]
      }
    }
  })()
  ; hljs.registerLanguage("python", e)
})();/*! `r` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = e.regex, n = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/, i = a.either(/0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/, /0[xX][0-9a-fA-F]+(?:[pP][+-]?\d+)?[Li]?/, /(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?[Li]?/), s = /[=!<>:]=|\|\||&&|:::?|<-|<<-|->>|->|\|>|[-+*\/?!$&|:<=>@^~]|\*\*/, t = a.either(/[()]/, /[{}]/, /\[\[/, /[[\]]/, /\\/, /,/)
        ; return {
          name: "R", keywords: {
            $pattern: n,
            keyword: "function if in break next repeat else for while",
            literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
            built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
          }, contains: [e.COMMENT(/#'/, /$/, {
            contains: [{
              scope: "doctag", match: /@examples/,
              starts: {
                end: a.lookahead(a.either(/\n^#'\s*(?=@[a-zA-Z]+)/, /\n^(?!#')/)),
                endsParent: !0
              }
            }, {
              scope: "doctag", begin: "@param", end: /$/, contains: [{
                scope: "variable", variants: [{ match: n }, { match: /`(?:\\.|[^`\\])+`/ }], endsParent: !0
              }]
            }, { scope: "doctag", match: /@[a-zA-Z]+/ }, { scope: "keyword", match: /\\[a-zA-Z]+/ }]
          }), e.HASH_COMMENT_MODE, {
            scope: "string", contains: [e.BACKSLASH_ESCAPE],
            variants: [e.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\(/, end: /\)(-*)"/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\{/, end: /\}(-*)"/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]"(-*)\[/, end: /\](-*)"/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]'(-*)\(/, end: /\)(-*)'/
            }), e.END_SAME_AS_BEGIN({
              begin: /[rR]'(-*)\{/, end: /\}(-*)'/
            }), e.END_SAME_AS_BEGIN({ begin: /[rR]'(-*)\[/, end: /\](-*)'/ }), {
              begin: '"', end: '"',
              relevance: 0
            }, { begin: "'", end: "'", relevance: 0 }]
          }, {
            relevance: 0, variants: [{
              scope: {
                1: "operator", 2: "number"
              }, match: [s, i]
            }, {
              scope: { 1: "operator", 2: "number" },
              match: [/%[^%]*%/, i]
            }, { scope: { 1: "punctuation", 2: "number" }, match: [t, i] }, {
              scope: {
                2: "number"
              }, match: [/[^a-zA-Z0-9._]|^/, i]
            }]
          }, {
            scope: { 3: "operator" },
            match: [n, /\s+/, /<-/, /\s+/]
          }, {
            scope: "operator", relevance: 0, variants: [{ match: s }, {
              match: /%[^%]*%/
            }]
          }, { scope: "punctuation", relevance: 0, match: t }, {
            begin: "`", end: "`",
            contains: [{ begin: /\\./ }]
          }]
        }
    }
  })(); hljs.registerLanguage("r", e)
})();/*! `glsl` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => ({
      name: "GLSL", keywords: {
        keyword: "break continue discard do else for if return while switch case default attribute binding buffer ccw centroid centroid varying coherent column_major const cw depth_any depth_greater depth_less depth_unchanged early_fragment_tests equal_spacing flat fractional_even_spacing fractional_odd_spacing highp in index inout invariant invocations isolines layout line_strip lines lines_adjacency local_size_x local_size_y local_size_z location lowp max_vertices mediump noperspective offset origin_upper_left out packed patch pixel_center_integer point_mode points precise precision quads r11f_g11f_b10f r16 r16_snorm r16f r16i r16ui r32f r32i r32ui r8 r8_snorm r8i r8ui readonly restrict rg16 rg16_snorm rg16f rg16i rg16ui rg32f rg32i rg32ui rg8 rg8_snorm rg8i rg8ui rgb10_a2 rgb10_a2ui rgba16 rgba16_snorm rgba16f rgba16i rgba16ui rgba32f rgba32i rgba32ui rgba8 rgba8_snorm rgba8i rgba8ui row_major sample shared smooth std140 std430 stream triangle_strip triangles triangles_adjacency uniform varying vertices volatile writeonly",
        type: "atomic_uint bool bvec2 bvec3 bvec4 dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 dmat4x4 double dvec2 dvec3 dvec4 float iimage1D iimage1DArray iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect image3D imageBuffer imageCube imageCubeArray int isampler1D isampler1DArray isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow image1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint usampler1D usampler1DArray usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D samplerBuffer usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 vec2 vec3 vec4 void",
        built_in: "gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs gl_MaxCombinedTextureImageUnits gl_MaxComputeAtomicCounterBuffers gl_MaxComputeAtomicCounters gl_MaxComputeImageUniforms gl_MaxComputeTextureImageUnits gl_MaxComputeUniformComponents gl_MaxComputeWorkGroupCount gl_MaxComputeWorkGroupSize gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents gl_MaxFragmentInputVectors gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexOutputVectors gl_MaxVertexTextureImageUnits gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial gl_FrontSecondaryColor gl_GlobalInvocationID gl_InstanceID gl_InvocationID gl_Layer gl_LightModel gl_LightSource gl_LocalInvocationID gl_LocalInvocationIndex gl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix gl_NormalScale gl_NumSamples gl_NumWorkGroups gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor gl_TextureMatrix gl_TextureMatrixInverse gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID gl_ViewportIndex gl_WorkGroupID gl_WorkGroupSize gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive abs acos acosh all any asin asinh atan atanh atomicAdd atomicAnd atomicCompSwap atomicCounter atomicCounterDecrement atomicCounterIncrement atomicExchange atomicMax atomicMin atomicOr atomicXor barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan greaterThanEqual groupMemoryBarrier imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageSize imageStore imulExtended intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier memoryBarrierAtomicCounter memoryBarrierBuffer memoryBarrierImage memoryBarrierShared min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod textureProjLodOffset textureProjOffset textureQueryLevels textureQueryLod textureSize transpose trunc uaddCarry uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 unpackUnorm2x16 unpackUnorm4x8 usubBorrow",
        literal: "true false"
      }, illegal: '"',
      contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, {
        className: "meta", begin: "#", end: "$"
      }]
    })
  })(); hljs.registerLanguage("glsl", e)
})();/*! `vbnet` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, t = /\d{1,2}\/\d{1,2}\/\d{4}/, a = /\d{4}-\d{1,2}-\d{1,2}/, i = /(\d|1[012])(:\d+){0,2} *(AM|PM)/, s = /\d{1,2}(:\d{1,2}){1,2}/, r = {
        className: "literal", variants: [{ begin: n.concat(/# */, n.either(a, t), / *#/) }, {
          begin: n.concat(/# */, s, / *#/)
        }, { begin: n.concat(/# */, i, / *#/) }, {
          begin: n.concat(/# */, n.either(a, t), / +/, n.either(i, s), / *#/)
        }]
      }, l = e.COMMENT(/'''/, /$/, {
        contains: [{ className: "doctag", begin: /<\/?/, end: />/ }]
      }), o = e.COMMENT(null, /$/, { variants: [{ begin: /'/ }, { begin: /([\t ]|^)REM(?=\s)/ }] })
        ; return {
          name: "Visual Basic .NET", aliases: ["vb"], case_insensitive: !0,
          classNameAliases: { label: "symbol" }, keywords: {
            keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
            built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
            type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
            literal: "true false nothing"
          },
          illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ", contains: [{
            className: "string", begin: /"(""|[^/n])"C\b/
          }, {
            className: "string", begin: /"/,
            end: /"/, illegal: /\n/, contains: [{ begin: /""/ }]
          }, r, {
            className: "number", relevance: 0,
            variants: [{
              begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
            }, { begin: /\b\d[\d_]*((U?[SIL])|[%&])?/ }, { begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/ }, {
              begin: /&O[0-7_]+((U?[SIL])|[%&])?/
            }, { begin: /&B[01_]+((U?[SIL])|[%&])?/ }]
          }, {
            className: "label", begin: /^\w+:/
          }, l, o, {
            className: "meta",
            begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
            end: /$/, keywords: {
              keyword: "const disable else elseif enable end externalsource if region then"
            },
            contains: [o]
          }]
        }
    }
  })(); hljs.registerLanguage("vbnet", e)
})();/*! `diff` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = e.regex; return {
        name: "Diff",
        aliases: ["patch"], contains: [{
          className: "meta", relevance: 10,
          match: a.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/, /^\*\*\* +\d+,\d+ +\*\*\*\*$/, /^--- +\d+,\d+ +----$/)
        }, {
          className: "comment", variants: [{
            begin: a.either(/Index: /, /^index/, /={3,}/, /^-{3}/, /^\*{3} /, /^\+{3}/, /^diff --git/),
            end: /$/
          }, { match: /^\*{15}$/ }]
        }, { className: "addition", begin: /^\+/, end: /$/ }, {
          className: "deletion", begin: /^-/, end: /$/
        }, {
          className: "addition", begin: /^!/,
          end: /$/
        }]
      }
    }
  })(); hljs.registerLanguage("diff", e)
})();/*! `scss` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"
      ; const e = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"], r = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"], i = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"], t = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"], o = ["align-content", "align-items", "align-self", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "clip-rule", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "flow", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "gap", "glyph-orientation-vertical", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-gap", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inline-size", "isolation", "justify-content", "left", "letter-spacing", "line-break", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "mix-blend-mode", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "rest", "rest-after", "rest-before", "right", "row-gap", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "speak", "speak-as", "src", "tab-size", "table-layout", "text-align", "text-align-all", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index"].reverse()
      ; return n => {
        const a = (e => ({
          IMPORTANT: { scope: "meta", begin: "!important" },
          BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE, HEXCOLOR: {
            scope: "number",
            begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
          }, FUNCTION_DISPATCH: {
            className: "built_in", begin: /[\w-]+(?=\()/
          }, ATTRIBUTE_SELECTOR_MODE: {
            scope: "selector-attr", begin: /\[/, end: /\]/, illegal: "$",
            contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
          }, CSS_NUMBER_MODE: {
            scope: "number",
            begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            relevance: 0
          }, CSS_VARIABLE: { className: "attr", begin: /--[A-Za-z][A-Za-z0-9_-]*/ }
        }))(n), l = t, s = i, d = "@[a-z-]+", c = {
          className: "variable",
          begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b", relevance: 0
        }; return {
          name: "SCSS",
          case_insensitive: !0, illegal: "[=/|']",
          contains: [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE, a.CSS_NUMBER_MODE, {
            className: "selector-id", begin: "#[A-Za-z0-9_-]+", relevance: 0
          }, {
            className: "selector-class", begin: "\\.[A-Za-z0-9_-]+", relevance: 0
          }, a.ATTRIBUTE_SELECTOR_MODE, {
            className: "selector-tag",
            begin: "\\b(" + e.join("|") + ")\\b", relevance: 0
          }, {
            className: "selector-pseudo",
            begin: ":(" + s.join("|") + ")"
          }, {
            className: "selector-pseudo",
            begin: ":(:)?(" + l.join("|") + ")"
          }, c, {
            begin: /\(/, end: /\)/,
            contains: [a.CSS_NUMBER_MODE]
          }, a.CSS_VARIABLE, {
            className: "attribute",
            begin: "\\b(" + o.join("|") + ")\\b"
          }, {
            begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
          }, {
            begin: /:/, end: /[;}{]/, relevance: 0,
            contains: [a.BLOCK_COMMENT, c, a.HEXCOLOR, a.CSS_NUMBER_MODE, n.QUOTE_STRING_MODE, n.APOS_STRING_MODE, a.IMPORTANT, a.FUNCTION_DISPATCH]
          }, { begin: "@(page|font-face)", keywords: { $pattern: d, keyword: "@page @font-face" } }, {
            begin: "@", end: "[{;]", returnBegin: !0, keywords: {
              $pattern: /[a-z-]+/,
              keyword: "and or not only", attribute: r.join(" ")
            }, contains: [{
              begin: d,
              className: "keyword"
            }, {
              begin: /[a-z-]+(?=:)/, className: "attribute"
            }, c, n.QUOTE_STRING_MODE, n.APOS_STRING_MODE, a.HEXCOLOR, a.CSS_NUMBER_MODE]
          }, a.FUNCTION_DISPATCH]
        }
      }
  })(); hljs.registerLanguage("scss", e)
})();/*! `python-repl` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var a = (() => {
    "use strict"; return a => ({
      aliases: ["pycon"], contains: [{
        className: "meta.prompt", starts: {
          end: / |$/, starts: { end: "$", subLanguage: "python" }
        }, variants: [{ begin: /^>>>(?=[ ]|$)/ }, { begin: /^\.\.\.(?=[ ]|$)/ }]
      }]
    })
  })()
  ; hljs.registerLanguage("python-repl", a)
})();/*! `swift` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; function e(e) {
      return e ? "string" == typeof e ? e : e.source : null
    } function a(e) { return t("(?=", e, ")") }
    function t(...a) { return a.map((a => e(a))).join("") } function n(...a) {
      const t = (e => {
        const a = e[e.length - 1]
          ; return "object" == typeof a && a.constructor === Object ? (e.splice(e.length - 1, 1), a) : {}
      })(a); return "(" + (t.capture ? "" : "?:") + a.map((a => e(a))).join("|") + ")"
    }
    const i = e => t(/\b/, e, /\w$/.test(e) ? /\b/ : /\B/), s = ["Protocol", "Type"].map(i), u = ["init", "self"].map(i), c = ["Any", "Self"], r = ["actor", "any", "associatedtype", "async", "await", /as\?/, /as!/, "as", "break", "case", "catch", "class", "continue", "convenience", "default", "defer", "deinit", "didSet", "distributed", "do", "dynamic", "else", "enum", "extension", "fallthrough", /fileprivate\(set\)/, "fileprivate", "final", "for", "func", "get", "guard", "if", "import", "indirect", "infix", /init\?/, /init!/, "inout", /internal\(set\)/, "internal", "in", "is", "isolated", "nonisolated", "lazy", "let", "mutating", "nonmutating", /open\(set\)/, "open", "operator", "optional", "override", "postfix", "precedencegroup", "prefix", /private\(set\)/, "private", "protocol", /public\(set\)/, "public", "repeat", "required", "rethrows", "return", "set", "some", "static", "struct", "subscript", "super", "switch", "throws", "throw", /try\?/, /try!/, "try", "typealias", /unowned\(safe\)/, /unowned\(unsafe\)/, "unowned", "var", "weak", "where", "while", "willSet"], o = ["false", "nil", "true"], l = ["assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right"], m = ["#colorLiteral", "#column", "#dsohandle", "#else", "#elseif", "#endif", "#error", "#file", "#fileID", "#fileLiteral", "#filePath", "#function", "#if", "#imageLiteral", "#keyPath", "#line", "#selector", "#sourceLocation", "#warn_unqualified_access", "#warning"], p = ["abs", "all", "any", "assert", "assertionFailure", "debugPrint", "dump", "fatalError", "getVaList", "isKnownUniquelyReferenced", "max", "min", "numericCast", "pointwiseMax", "pointwiseMin", "precondition", "preconditionFailure", "print", "readLine", "repeatElement", "sequence", "stride", "swap", "swift_unboxFromSwiftValueWithType", "transcode", "type", "unsafeBitCast", "unsafeDowncast", "withExtendedLifetime", "withUnsafeMutablePointer", "withUnsafePointer", "withVaList", "withoutActuallyEscaping", "zip"], d = n(/[/=\-+!*%<>&|^~?]/, /[\u00A1-\u00A7]/, /[\u00A9\u00AB]/, /[\u00AC\u00AE]/, /[\u00B0\u00B1]/, /[\u00B6\u00BB\u00BF\u00D7\u00F7]/, /[\u2016-\u2017]/, /[\u2020-\u2027]/, /[\u2030-\u203E]/, /[\u2041-\u2053]/, /[\u2055-\u205E]/, /[\u2190-\u23FF]/, /[\u2500-\u2775]/, /[\u2794-\u2BFF]/, /[\u2E00-\u2E7F]/, /[\u3001-\u3003]/, /[\u3008-\u3020]/, /[\u3030]/), F = n(d, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/), b = t(d, F, "*"), h = n(/[a-zA-Z_]/, /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/, /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/, /[\u1E00-\u1FFF]/, /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/, /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/, /[\u2C00-\u2DFF\u2E80-\u2FFF]/, /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/, /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/, /[\uFE47-\uFEFE\uFF00-\uFFFD]/), f = n(h, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/), w = t(h, f, "*"), y = t(/[A-Z]/, f, "*"), g = ["autoclosure", t(/convention\(/, n("swift", "block", "c"), /\)/), "discardableResult", "dynamicCallable", "dynamicMemberLookup", "escaping", "frozen", "GKInspectable", "IBAction", "IBDesignable", "IBInspectable", "IBOutlet", "IBSegueAction", "inlinable", "main", "nonobjc", "NSApplicationMain", "NSCopying", "NSManaged", t(/objc\(/, w, /\)/), "objc", "objcMembers", "propertyWrapper", "requires_stored_property_inits", "resultBuilder", "testable", "UIApplicationMain", "unknown", "usableFromInline"], E = ["iOS", "iOSApplicationExtension", "macOS", "macOSApplicationExtension", "macCatalyst", "macCatalystApplicationExtension", "watchOS", "watchOSApplicationExtension", "tvOS", "tvOSApplicationExtension", "swift"]
      ; return e => {
        const d = { match: /\s+/, relevance: 0 }, h = e.COMMENT("/\\*", "\\*/", {
          contains: ["self"]
        }), v = [e.C_LINE_COMMENT_MODE, h], A = {
          match: [/\./, n(...s, ...u)],
          className: { 2: "keyword" }
        }, N = {
          match: t(/\./, n(...r)), relevance: 0
        }, C = r.filter((e => "string" == typeof e)).concat(["_|0"]), D = {
          variants: [{
            className: "keyword",
            match: n(...r.filter((e => "string" != typeof e)).concat(c).map(i), ...u)
          }]
        }, k = {
          $pattern: n(/\b\w+/, /#\w+/), keyword: C.concat(m), literal: o
        }, B = [A, N, D], _ = [{
          match: t(/\./, n(...p)), relevance: 0
        }, {
          className: "built_in",
          match: t(/\b/, n(...p), /(?=\()/)
        }], S = { match: /->/, relevance: 0 }, M = [S, {
          className: "operator", relevance: 0, variants: [{ match: b }, { match: `\\.(\\.|${F})+` }]
        }], x = "([0-9a-fA-F]_*)+", I = {
          className: "number", relevance: 0, variants: [{
            match: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
          }, {
            match: `\\b0x(${x})(\\.(${x}))?([pP][+-]?(([0-9]_*)+))?\\b`
          }, {
            match: /\b0o([0-7]_*)+\b/
          }, { match: /\b0b([01]_*)+\b/ }]
        }, L = (e = "") => ({
          className: "subst", variants: [{ match: t(/\\/, e, /[0\\tnr"']/) }, {
            match: t(/\\/, e, /u\{[0-9a-fA-F]{1,8}\}/)
          }]
        }), O = (e = "") => ({
          className: "subst",
          match: t(/\\/, e, /[\t ]*(?:[\r\n]|\r\n)/)
        }), T = (e = "") => ({
          className: "subst",
          label: "interpol", begin: t(/\\/, e, /\(/), end: /\)/
        }), $ = (e = "") => ({
          begin: t(e, /"""/),
          end: t(/"""/, e), contains: [L(e), O(e), T(e)]
        }), j = (e = "") => ({
          begin: t(e, /"/),
          end: t(/"/, e), contains: [L(e), T(e)]
        }), P = {
          className: "string",
          variants: [$(), $("#"), $("##"), $("###"), j(), j("#"), j("##"), j("###")]
        }, K = {
          match: t(/`/, w, /`/)
        }, z = [K, { className: "variable", match: /\$\d+/ }, {
          className: "variable", match: `\\$${f}+`
        }], q = [{
          match: /(@|#(un)?)available/,
          className: "keyword", starts: {
            contains: [{
              begin: /\(/, end: /\)/, keywords: E,
              contains: [...M, I, P]
            }]
          }
        }, { className: "keyword", match: t(/@/, n(...g)) }, {
          className: "meta", match: t(/@/, w)
        }], U = {
          match: a(/\b[A-Z]/), relevance: 0, contains: [{
            className: "type",
            match: t(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, f, "+")
          }, { className: "type", match: y, relevance: 0 }, { match: /[?!]+/, relevance: 0 }, {
            match: /\.\.\./, relevance: 0
          }, { match: t(/\s+&\s+/, a(y)), relevance: 0 }]
        }, Z = {
          begin: /</, end: />/, keywords: k, contains: [...v, ...B, ...q, S, U]
        }; U.contains.push(Z)
          ; const V = {
            begin: /\(/, end: /\)/, relevance: 0, keywords: k, contains: ["self", {
              match: t(w, /\s*:/), keywords: "_|0", relevance: 0
            }, ...v, ...B, ..._, ...M, I, P, ...z, ...q, U]
          }, W = {
            begin: /</, end: />/, contains: [...v, U]
          }, G = {
            begin: /\(/, end: /\)/, keywords: k, contains: [{
              begin: n(a(t(w, /\s*:/)), a(t(w, /\s+/, w, /\s*:/))), end: /:/, relevance: 0, contains: [{
                className: "keyword", match: /\b_\b/
              }, { className: "params", match: w }]
            }, ...v, ...B, ...M, I, P, ...q, U, V], endsParent: !0, illegal: /["']/
          }, R = {
            match: [/func/, /\s+/, n(K.match, w, b)], className: { 1: "keyword", 3: "title.function" },
            contains: [W, G, d], illegal: [/\[/, /%/]
          }, X = {
            match: [/\b(?:subscript|init[?!]?)/, /\s*(?=[<(])/], className: { 1: "keyword" },
            contains: [W, G, d], illegal: /\[|%/
          }, H = {
            match: [/operator/, /\s+/, b], className: {
              1: "keyword", 3: "title"
            }
          }, J = {
            begin: [/precedencegroup/, /\s+/, y], className: {
              1: "keyword", 3: "title"
            }, contains: [U], keywords: [...l, ...o], end: /}/
          }
          ; for (const e of P.variants) {
            const a = e.contains.find((e => "interpol" === e.label))
            ; a.keywords = k; const t = [...B, ..._, ...M, I, P, ...z]; a.contains = [...t, {
              begin: /\(/,
              end: /\)/, contains: ["self", ...t]
            }]
          } return {
            name: "Swift", keywords: k,
            contains: [...v, R, X, {
              beginKeywords: "struct protocol class extension enum actor",
              end: "\\{", excludeEnd: !0, keywords: k, contains: [e.inherit(e.TITLE_MODE, {
                className: "title.class", begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
              }), ...B]
            }, H, J, {
              beginKeywords: "import", end: /$/, contains: [...v], relevance: 0
            }, ...B, ..._, ...M, I, P, ...z, ...q, U, V]
          }
      }
  })(); hljs.registerLanguage("swift", e)
})();/*! `yaml` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = "true false yes no null", a = "[\\w#;/?:@&=+$,.~*'()[\\]]+", s = {
        className: "string", relevance: 0, variants: [{ begin: /'/, end: /'/ }, {
          begin: /"/, end: /"/
        }, { begin: /\S+/ }], contains: [e.BACKSLASH_ESCAPE, {
          className: "template-variable",
          variants: [{ begin: /\{\{/, end: /\}\}/ }, { begin: /%\{/, end: /\}/ }]
        }]
      }, i = e.inherit(s, {
        variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }, { begin: /[^\s,{}[\]]+/ }]
      }), l = {
        end: ",", endsWithParent: !0, excludeEnd: !0, keywords: n, relevance: 0
      }, t = {
        begin: /\{/,
        end: /\}/, contains: [l], illegal: "\\n", relevance: 0
      }, g = {
        begin: "\\[", end: "\\]",
        contains: [l], illegal: "\\n", relevance: 0
      }, b = [{
        className: "attr", variants: [{
          begin: "\\w[\\w :\\/.-]*:(?=[ \t]|$)"
        }, { begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)' }, {
          begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)"
        }]
      }, {
        className: "meta", begin: "^---\\s*$",
        relevance: 10
      }, {
        className: "string",
        begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
      }, {
        begin: "<%[%=-]?", end: "[%-]?%>", subLanguage: "ruby", excludeBegin: !0, excludeEnd: !0,
        relevance: 0
      }, { className: "type", begin: "!\\w+!" + a }, {
        className: "type",
        begin: "!<" + a + ">"
      }, { className: "type", begin: "!" + a }, {
        className: "type", begin: "!!" + a
      }, { className: "meta", begin: "&" + e.UNDERSCORE_IDENT_RE + "$" }, {
        className: "meta",
        begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
      }, {
        className: "bullet", begin: "-(?=[ ]|$)",
        relevance: 0
      }, e.HASH_COMMENT_MODE, { beginKeywords: n, keywords: { literal: n } }, {
        className: "number",
        begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
      }, { className: "number", begin: e.C_NUMBER_RE + "\\b", relevance: 0 }, t, g, s], r = [...b]
        ; return r.pop(), r.push(i), l.contains = r, {
          name: "YAML", case_insensitive: !0,
          aliases: ["yml"], contains: b
        }
    }
  })(); hljs.registerLanguage("yaml", e)
})();/*! `json` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = ["true", "false", "null"], n = {
        scope: "literal", beginKeywords: a.join(" ")
      }; return {
        name: "JSON", keywords: {
          literal: a
        }, contains: [{
          className: "attr", begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
          relevance: 1.01
        }, {
          match: /[{}[\],:]/, className: "punctuation", relevance: 0
        }, e.QUOTE_STRING_MODE, n, e.C_NUMBER_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE],
        illegal: "\\S"
      }
    }
  })(); hljs.registerLanguage("json", e)
})();/*! `llvm` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const a = e.regex, n = /([-a-zA-Z$._][\w$.-]*)/, t = {
        className: "variable", variants: [{
          begin: a.concat(/%/, n)
        }, { begin: /%\d+/ }, { begin: /#\d+/ }]
      }, i = {
        className: "title",
        variants: [{ begin: a.concat(/@/, n) }, { begin: /@\d+/ }, { begin: a.concat(/!/, n) }, {
          begin: a.concat(/!\d+/, n)
        }, { begin: /!\d+/ }]
      }; return {
        name: "LLVM IR",
        keywords: "begin end true false declare define global constant private linker_private internal available_externally linkonce linkonce_odr weak weak_odr appending dllimport dllexport common default hidden protected extern_weak external thread_local zeroinitializer undef null to tail target triple datalayout volatile nuw nsw nnan ninf nsz arcp fast exact inbounds align addrspace section alias module asm sideeffect gc dbg linker_private_weak attributes blockaddress initialexec localdynamic localexec prefix unnamed_addr ccc fastcc coldcc x86_stdcallcc x86_fastcallcc arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ptx_kernel intel_ocl_bicc msp430_intrcc spir_func spir_kernel x86_64_sysvcc x86_64_win64cc x86_thiscallcc cc c signext zeroext inreg sret nounwind noreturn noalias nocapture byval nest readnone readonly inlinehint noinline alwaysinline optsize ssp sspreq noredzone noimplicitfloat naked builtin cold nobuiltin noduplicate nonlazybind optnone returns_twice sanitize_address sanitize_memory sanitize_thread sspstrong uwtable returned type opaque eq ne slt sgt sle sge ult ugt ule uge oeq one olt ogt ole oge ord uno ueq une x acq_rel acquire alignstack atomic catch cleanup filter inteldialect max min monotonic nand personality release seq_cst singlethread umax umin unordered xchg add fadd sub fsub mul fmul udiv sdiv fdiv urem srem frem shl lshr ashr and or xor icmp fcmp phi call trunc zext sext fptrunc fpext uitofp sitofp fptoui fptosi inttoptr ptrtoint bitcast addrspacecast select va_arg ret br switch invoke unwind unreachable indirectbr landingpad resume malloc alloca free load store getelementptr extractelement insertelement shufflevector getresult extractvalue insertvalue atomicrmw cmpxchg fence argmemonly double",
        contains: [{ className: "type", begin: /\bi\d+(?=\s|\b)/ }, e.COMMENT(/;\s*$/, null, {
          relevance: 0
        }), e.COMMENT(/;/, /$/), {
          className: "string", begin: /"/, end: /"/,
          contains: [{ className: "char.escape", match: /\\\d\d/ }]
        }, i, {
          className: "punctuation",
          relevance: 0, begin: /,/
        }, { className: "operator", relevance: 0, begin: /=/ }, t, {
          className: "symbol", variants: [{ begin: /^\s*[a-z]+:/ }], relevance: 0
        }, {
          className: "number", variants: [{ begin: /[su]?0[xX][KMLHR]?[a-fA-F0-9]+/ }, {
            begin: /[-+]?\d+(?:[.]\d+)?(?:[eE][-+]?\d+(?:[.]\d+)?)?/
          }], relevance: 0
        }]
      }
    }
  })()
  ; hljs.registerLanguage("llvm", e)
})();/*! `java` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"
      ; var e = "\\.([0-9](_*[0-9])*)", a = "[0-9a-fA-F](_*[0-9a-fA-F])*", n = {
        className: "number", variants: [{
          begin: `(\\b([0-9](_*[0-9])*)((${e})|\\.)?|(${e}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, { begin: `\\b([0-9](_*[0-9])*)((${e})[fFdD]?\\b|\\.([fFdD]\\b)?)` }, {
          begin: `(${e})[fFdD]?\\b`
        }, { begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b" }, {
          begin: `\\b0[xX]((${a})\\.?|(${a})?\\.(${a}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" }, { begin: `\\b0[xX](${a})[lL]?\\b` }, {
          begin: "\\b0(_*[0-7])*[lL]?\\b"
        }, { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }],
        relevance: 0
      }; function s(e, a, n) { return -1 === n ? "" : e.replace(a, (t => s(e, a, n - 1))) }
    return e => {
      const a = e.regex, t = "[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*", i = t + s("(?:<" + t + "~~~(?:\\s*,\\s*" + t + "~~~)*>)?", /~~~/g, 2), r = {
        keyword: ["synchronized", "abstract", "private", "var", "static", "if", "const ", "for", "while", "strictfp", "finally", "protected", "import", "native", "final", "void", "enum", "else", "break", "transient", "catch", "instanceof", "volatile", "case", "assert", "package", "default", "public", "try", "switch", "continue", "throws", "protected", "public", "private", "module", "requires", "exports", "do", "sealed", "yield", "permits"],
        literal: ["false", "true", "null"],
        type: ["char", "boolean", "long", "float", "int", "byte", "short", "double"],
        built_in: ["super", "this"]
      }, l = {
        className: "meta", begin: "@" + t, contains: [{
          begin: /\(/, end: /\)/, contains: ["self"]
        }]
      }, c = {
        className: "params", begin: /\(/,
        end: /\)/, keywords: r, relevance: 0, contains: [e.C_BLOCK_COMMENT_MODE], endsParent: !0
      }
        ; return {
          name: "Java", aliases: ["jsp"], keywords: r, illegal: /<\/|#/,
          contains: [e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0, contains: [{
              begin: /\w+@/,
              relevance: 0
            }, { className: "doctag", begin: "@[A-Za-z]+" }]
          }), {
            begin: /import java\.[a-z]+\./, keywords: "import", relevance: 2
          }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
            begin: /"""/, end: /"""/,
            className: "string", contains: [e.BACKSLASH_ESCAPE]
          }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
            match: [/\b(?:class|interface|enum|extends|implements|new)/, /\s+/, t], className: {
              1: "keyword", 3: "title.class"
            }
          }, { match: /non-sealed/, scope: "keyword" }, {
            begin: [a.concat(/(?!else)/, t), /\s+/, t, /\s+/, /=(?!=)/], className: {
              1: "type",
              3: "variable", 5: "operator"
            }
          }, {
            begin: [/record/, /\s+/, t], className: {
              1: "keyword",
              3: "title.class"
            }, contains: [c, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          }, {
            beginKeywords: "new throw return else", relevance: 0
          }, {
            begin: ["(?:" + i + "\\s+)", e.UNDERSCORE_IDENT_RE, /\s*(?=\()/], className: {
              2: "title.function"
            }, keywords: r, contains: [{
              className: "params", begin: /\(/,
              end: /\)/, keywords: r, relevance: 0,
              contains: [l, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, n, e.C_BLOCK_COMMENT_MODE]
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
          }, n, l]
        }
    }
  })()
  ; hljs.registerLanguage("java", e)
})();/*! `kotlin` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"
      ; var e = "\\.([0-9](_*[0-9])*)", n = "[0-9a-fA-F](_*[0-9a-fA-F])*", a = {
        className: "number", variants: [{
          begin: `(\\b([0-9](_*[0-9])*)((${e})|\\.)?|(${e}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, { begin: `\\b([0-9](_*[0-9])*)((${e})[fFdD]?\\b|\\.([fFdD]\\b)?)` }, {
          begin: `(${e})[fFdD]?\\b`
        }, { begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b" }, {
          begin: `\\b0[xX]((${n})\\.?|(${n})?\\.(${n}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" }, { begin: `\\b0[xX](${n})[lL]?\\b` }, {
          begin: "\\b0(_*[0-7])*[lL]?\\b"
        }, { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }],
        relevance: 0
      }; return e => {
        const n = {
          keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
          built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
          literal: "true false null"
        }, i = {
          className: "symbol", begin: e.UNDERSCORE_IDENT_RE + "@"
        }, s = { className: "subst", begin: /\$\{/, end: /\}/, contains: [e.C_NUMBER_MODE] }, t = {
          className: "variable", begin: "\\$" + e.UNDERSCORE_IDENT_RE
        }, r = {
          className: "string",
          variants: [{ begin: '"""', end: '"""(?=[^"])', contains: [t, s] }, {
            begin: "'", end: "'",
            illegal: /\n/, contains: [e.BACKSLASH_ESCAPE]
          }, {
            begin: '"', end: '"', illegal: /\n/,
            contains: [e.BACKSLASH_ESCAPE, t, s]
          }]
        }; s.contains.push(r); const l = {
          className: "meta",
          begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
        }, c = {
          className: "meta", begin: "@" + e.UNDERSCORE_IDENT_RE, contains: [{
            begin: /\(/,
            end: /\)/, contains: [e.inherit(r, { className: "string" }), "self"]
          }]
        }, o = a, b = e.COMMENT("/\\*", "\\*/", { contains: [e.C_BLOCK_COMMENT_MODE] }), E = {
          variants: [{ className: "type", begin: e.UNDERSCORE_IDENT_RE }, {
            begin: /\(/, end: /\)/,
            contains: []
          }]
        }, d = E; return d.variants[1].contains = [E], E.variants[1].contains = [d],
        {
          name: "Kotlin", aliases: ["kt", "kts"], keywords: n,
          contains: [e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0, contains: [{
              className: "doctag",
              begin: "@[A-Za-z]+"
            }]
          }), e.C_LINE_COMMENT_MODE, b, {
            className: "keyword",
            begin: /\b(break|continue|return|this)\b/, starts: {
              contains: [{
                className: "symbol",
                begin: /@\w+/
              }]
            }
          }, i, l, c, {
            className: "function", beginKeywords: "fun", end: "[(]|$",
            returnBegin: !0, excludeEnd: !0, keywords: n, relevance: 5, contains: [{
              begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(", returnBegin: !0, relevance: 0,
              contains: [e.UNDERSCORE_TITLE_MODE]
            }, {
              className: "type", begin: /</, end: />/,
              keywords: "reified", relevance: 0
            }, {
              className: "params", begin: /\(/, end: /\)/,
              endsParent: !0, keywords: n, relevance: 0, contains: [{
                begin: /:/, end: /[=,\/]/,
                endsWithParent: !0, contains: [E, e.C_LINE_COMMENT_MODE, b], relevance: 0
              }, e.C_LINE_COMMENT_MODE, b, l, c, r, e.C_NUMBER_MODE]
            }, b]
          }, {
            begin: [/class|interface|trait/, /\s+/, e.UNDERSCORE_IDENT_RE], beginScope: {
              3: "title.class"
            }, keywords: "class interface trait", end: /[:\{(]|$/, excludeEnd: !0,
            illegal: "extends implements", contains: [{
              beginKeywords: "public protected internal private constructor"
            }, e.UNDERSCORE_TITLE_MODE, {
              className: "type", begin: /</, end: />/, excludeBegin: !0,
              excludeEnd: !0, relevance: 0
            }, {
              className: "type", begin: /[,:]\s*/, end: /[<\(,){\s]|$/,
              excludeBegin: !0, returnEnd: !0
            }, l, c]
          }, r, {
            className: "meta", begin: "^#!/usr/bin/env",
            end: "$", illegal: "\n"
          }, o]
        }
      }
  })(); hljs.registerLanguage("kotlin", e)
})();/*! `makefile` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const i = {
        className: "variable",
        variants: [{
          begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
          contains: [e.BACKSLASH_ESCAPE]
        }, { begin: /\$[@%<?\^\+\*]/ }]
      }, a = {
        className: "string",
        begin: /"/, end: /"/, contains: [e.BACKSLASH_ESCAPE, i]
      }, n = {
        className: "variable",
        begin: /\$\([\w-]+\s/, end: /\)/, keywords: {
          built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
        }, contains: [i]
      }, s = { begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)" }, r = {
        className: "section", begin: /^[^\s]+:/, end: /$/, contains: [i]
      }; return {
        name: "Makefile", aliases: ["mk", "mak", "make"], keywords: {
          $pattern: /[\w-]+/,
          keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
        }, contains: [e.HASH_COMMENT_MODE, i, a, n, s, {
          className: "meta", begin: /^\.PHONY:/,
          end: /$/, keywords: { $pattern: /[\.\w]+/, keyword: ".PHONY" }
        }, r]
      }
    }
  })()
  ; hljs.registerLanguage("makefile", e)
})();/*! `cpp` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const t = e.regex, a = e.COMMENT("//", "$", {
        contains: [{ begin: /\\\n/ }]
      }), n = "[a-zA-Z_]\\w*::", r = "(?!struct)(decltype\\(auto\\)|" + t.optional(n) + "[a-zA-Z_]\\w*" + t.optional("<[^<>]+>") + ")", i = {
        className: "type", begin: "\\b[a-z\\d_]*_t\\b"
      }, s = {
        className: "string", variants: [{
          begin: '(u8?|U|L)?"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE]
        }, {
          begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
          end: "'", illegal: "."
        }, e.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/, end: /\)([^()\\ ]{0,16})"/
        })]
      }, c = {
        className: "number", variants: [{ begin: "\\b(0b[01']+)" }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }], relevance: 0
      }, o = {
        className: "meta", begin: /#\s*[a-z]+\b/, end: /$/, keywords: {
          keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
        }, contains: [{ begin: /\\\n/, relevance: 0 }, e.inherit(s, { className: "string" }), {
          className: "string", begin: /<.*?>/
        }, a, e.C_BLOCK_COMMENT_MODE]
      }, l = {
        className: "title", begin: t.optional(n) + e.IDENT_RE, relevance: 0
      }, d = t.optional(n) + e.IDENT_RE + "\\s*\\(", u = {
        type: [
          "u64",
          "i64",
          "i32",
          "i16",
          "i8",
          "u64",
          "u32",
          "u16",
          "u8",
          "f16",
          "f32",
          "f64",
          "bool", "char", "char16_t", "char32_t", "char8_t", "double", "float", "int", "long", "short", "void", "wchar_t", "unsigned", "signed", "const", "static"],
        keyword: ["alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept", "auto", "bitand", "bitor", "break", "case", 
        "catch", "class", "co_await", "co_return", "co_yield", "compl", "concept", "const_cast|10", "consteval", "constexpr", "constinit", "continue", "decltype", 
        "default", "delete", "do", "dynamic_cast|10", "else", "enum", "explicit", "export", "extern", "false", "final", "for", "friend", "goto", "if", "import", 
        "inline", "module", "mutable", "namespace", "new", "noexcept", "not", "not_eq", "nullptr", "operator", "or", "or_eq", "override", "private", "protected", 
        "public", "reflexpr", "register", "reinterpret_cast|10", "requires", "return", "sizeof", "static_assert", "static_cast|10", "struct", "switch", "synchronized", 
        "template", "this", "thread_local", "throw", "transaction_safe", "transaction_safe_dynamic", "true", "try", "typedef", "typeid", "typename", "union", "using", 
        "virtual", "volatile", "while", "xor", "xor_eq"],
        literal: ["NULL", "false", "nullopt", "nullptr", "true"], built_in: ["_Pragma"],
        _type_hints: ["any", "auto_ptr", "barrier", "binary_semaphore", "bitset", "complex", "condition_variable", "condition_variable_any", "counting_semaphore", 
        "deque", "false_type", "future", "imaginary", "initializer_list", "istringstream", "jthread", "latch", "lock_guard", "multimap", "multiset", "mutex", 
        "optional", "ostringstream", "packaged_task", "pair", "promise", "priority_queue", "queue", "recursive_mutex", "recursive_timed_mutex", "scoped_lock", 
        "set", "shared_future", "shared_lock", "shared_mutex", "shared_timed_mutex", "shared_ptr", "stack", "string_view", "stringstream", "timed_mutex", "thread", 
        "true_type", "tuple", "unique_lock", "unique_ptr", "unordered_map", "unordered_multimap", "unordered_multiset", "unordered_set", "variant", "vector", "weak_ptr", 
        "wstring", "wstring_view"]
      }, p = {
        className: "function.dispatch", relevance: 0, keywords: {
          _hint: ["abort", "abs", "acos", "apply", "as_const", "asin", "atan", "atan2", "calloc", "ceil", "cerr", "cin", "clog", "cos", "cosh", "cout", "declval", "endl", "exchange", 
          "exit", "exp", "fabs", "floor", "fmod", "forward", "fprintf", "fputs", "free", "frexp", "fscanf", "future", "invoke", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", 
          "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "labs", "launder", "ldexp", "log", "log10", "make_pair", "make_shared", "make_shared_for_overwrite", 
          "make_tuple", "make_unique", "malloc", "memchr", "memcmp", "memcpy", "memset", "modf", "move", "pow", "printf", "putchar", "puts", "realloc", "scanf", "sin", "sinh", 
          "snprintf", "sprintf", "sqrt", "sscanf", "std", "stderr", "stdin", "stdout", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", 
          "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "swap", "tan", "tanh", "terminate", "to_underlying", "tolower", "toupper", "vfprintf", "visit", "vprintf", "vsprintf"]
        },
        begin: t.concat(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!switch)/, /(?!while)/, e.IDENT_RE, t.lookahead(/(<[^<>]+>|)\s*\(/))
      }, _ = [p, o, i, a, e.C_BLOCK_COMMENT_MODE, c, s], m = {
        variants: [{ begin: /=/, end: /;/ }, {
          begin: /\(/, end: /\)/
        }, { beginKeywords: "new throw return else", end: /;/ }],
        keywords: u, contains: _.concat([{
          begin: /\(/, end: /\)/, keywords: u,
          contains: _.concat(["self"]), relevance: 0
        }]), relevance: 0
      }, g = {
        className: "function",
        begin: "(" + r + "[\\*&\\s]+)+" + d, returnBegin: !0, end: /[{;=]/, excludeEnd: !0,
        keywords: u, illegal: /[^\w\s\*&:<>.]/, contains: [{
          begin: "decltype\\(auto\\)",
          keywords: u, relevance: 0
        }, { begin: d, returnBegin: !0, contains: [l], relevance: 0 }, {
          begin: /::/, relevance: 0
        }, { begin: /:/, endsWithParent: !0, contains: [s, c] }, {
          relevance: 0, match: /,/
        }, {
          className: "params", begin: /\(/, end: /\)/, keywords: u,
          relevance: 0, contains: [a, e.C_BLOCK_COMMENT_MODE, s, c, i, {
            begin: /\(/, end: /\)/,
            keywords: u, relevance: 0, contains: ["self", a, e.C_BLOCK_COMMENT_MODE, s, c, i]
          }]
        }, i, a, e.C_BLOCK_COMMENT_MODE, o]
      }; return {
        name: "C++",
        aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"], keywords: u, illegal: "</",
        classNameAliases: { "function.dispatch": "built_in" },
        contains: [].concat(m, g, p, _, [o, {
          begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function)\\s*<(?!<)",
          end: ">", keywords: u, contains: ["self", i]
        }, { begin: e.IDENT_RE + "::", keywords: u }, {
            match: [/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/, /\s+/, /\w+/],
            className: { 1: "keyword", 3: "title.class" }
          }])
      }
    }
  })(); hljs.registerLanguage("cpp", e)
})();/*! `c` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, t = e.COMMENT("//", "$", {
        contains: [{ begin: /\\\n/ }]
      }), s = "[a-zA-Z_]\\w*::", a = "(decltype\\(auto\\)|" + n.optional(s) + "[a-zA-Z_]\\w*" + n.optional("<[^<>]+>") + ")", r = {
        className: "type", variants: [{ begin: "\\b[a-z\\d_]*_t\\b" }, {
          match: /\batomic_[a-z]{3,6}\b/
        }]
      }, i = {
        className: "string", variants: [{
          begin: '(u8?|U|L)?"', end: '"', illegal: "\\n", contains: [e.BACKSLASH_ESCAPE]
        }, {
          begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
          end: "'", illegal: "."
        }, e.END_SAME_AS_BEGIN({
          begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/, end: /\)([^()\\ ]{0,16})"/
        })]
      }, l = {
        className: "number", variants: [{ begin: "\\b(0b[01']+)" }, {
          begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
        }, {
          begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
        }], relevance: 0
      }, o = {
        className: "meta", begin: /#\s*[a-z]+\b/, end: /$/, keywords: {
          keyword: "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
        }, contains: [{ begin: /\\\n/, relevance: 0 }, e.inherit(i, { className: "string" }), {
          className: "string", begin: /<.*?>/
        }, t, e.C_BLOCK_COMMENT_MODE]
      }, c = {
        className: "title", begin: n.optional(s) + e.IDENT_RE, relevance: 0
      }, d = n.optional(s) + e.IDENT_RE + "\\s*\\(", u = {
        keyword: ["asm", "auto", "break", "case", "continue", "default", "do", "else", "enum", "extern", "for", "fortran", "goto", "if", "inline", "register", "restrict", "return", "sizeof", "struct", "switch", "typedef", "union", "volatile", "while", "_Alignas", "_Alignof", "_Atomic", "_Generic", "_Noreturn", "_Static_assert", "_Thread_local", "alignas", "alignof", "noreturn", "static_assert", "thread_local", "_Pragma"],
        type: ["float", "double", "signed", "unsigned", "int", "short", "long", "char", "void", "_Bool", "_Complex", "_Imaginary", "_Decimal32", "_Decimal64", "_Decimal128", "const", "static", "complex", "bool", "imaginary"],
        literal: "true false NULL",
        built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr"
      }, g = [o, r, t, e.C_BLOCK_COMMENT_MODE, l, i], m = {
        variants: [{ begin: /=/, end: /;/ }, {
          begin: /\(/, end: /\)/
        }, { beginKeywords: "new throw return else", end: /;/ }],
        keywords: u, contains: g.concat([{
          begin: /\(/, end: /\)/, keywords: u,
          contains: g.concat(["self"]), relevance: 0
        }]), relevance: 0
      }, p = {
        begin: "(" + a + "[\\*&\\s]+)+" + d, returnBegin: !0, end: /[{;=]/, excludeEnd: !0,
        keywords: u, illegal: /[^\w\s\*&:<>.]/, contains: [{
          begin: "decltype\\(auto\\)",
          keywords: u, relevance: 0
        }, {
          begin: d, returnBegin: !0, contains: [e.inherit(c, {
            className: "title.function"
          })], relevance: 0
        }, { relevance: 0, match: /,/ }, {
          className: "params", begin: /\(/, end: /\)/, keywords: u, relevance: 0,
          contains: [t, e.C_BLOCK_COMMENT_MODE, i, l, r, {
            begin: /\(/, end: /\)/, keywords: u,
            relevance: 0, contains: ["self", t, e.C_BLOCK_COMMENT_MODE, i, l, r]
          }]
        }, r, t, e.C_BLOCK_COMMENT_MODE, o]
      }; return {
        name: "C", aliases: ["h"], keywords: u,
        disableAutodetect: !0, illegal: "</", contains: [].concat(m, p, g, [o, {
          begin: e.IDENT_RE + "::", keywords: u
        }, {
          className: "class",
            beginKeywords: "enum class struct union", end: /[{;:<>=]/, contains: [{
              beginKeywords: "final class struct"
            }, e.TITLE_MODE]
          }]), exports: {
            preprocessor: o,
            strings: i, keywords: u
          }
      }
    }
  })(); hljs.registerLanguage("c", e)
})();/*! `plaintext` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var t = (() => {
    "use strict"; return t => ({
      name: "Plain text",
      aliases: ["text", "txt"], disableAutodetect: !0
    })
  })()
  ; hljs.registerLanguage("plaintext", t)
})();/*! `sql` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const r = e.regex, t = e.COMMENT("--", "$"), n = ["true", "false", "unknown"], a = ["bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary"], i = ["abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"], s = ["create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"], o = i, c = ["abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year", "add", "asc", "collation", "desc", "final", "first", "last", "view"].filter((e => !i.includes(e))), l = {
        begin: r.concat(/\b/, r.either(...o), /\s*\(/), relevance: 0, keywords: { built_in: o }
      }
        ; return {
          name: "SQL", case_insensitive: !0, illegal: /[{}]|<\//, keywords: {
            $pattern: /\b[\w\.]+/, keyword: ((e, { exceptions: r, when: t } = {}) => {
              const n = t
              ; return r = r || [], e.map((e => e.match(/\|\d+$/) || r.includes(e) ? e : n(e) ? e + "|0" : e))
            })(c, { when: e => e.length < 3 }), literal: n, type: a,
            built_in: ["current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"]
          }, contains: [{
            begin: r.either(...s), relevance: 0, keywords: {
              $pattern: /[\w\.]+/,
              keyword: c.concat(s), literal: n, type: a
            }
          }, {
            className: "type",
            begin: r.either("double precision", "large object", "with timezone", "without timezone")
          }, l, { className: "variable", begin: /@[a-z0-9]+/ }, {
            className: "string", variants: [{
              begin: /'/, end: /'/, contains: [{ begin: /''/ }]
            }]
          }, {
            begin: /"/, end: /"/, contains: [{
              begin: /""/
            }]
          }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, t, {
            className: "operator",
            begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/, relevance: 0
          }]
        }
    }
  })()
  ; hljs.registerLanguage("sql", e)
})();/*! `markdown` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = {
        begin: /<\/?[A-Za-z_]/,
        end: ">", subLanguage: "xml", relevance: 0
      }, a = {
        variants: [{
          begin: /\[.+?\]\[.*?\]/,
          relevance: 0
        }, {
          begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
          relevance: 2
        }, {
          begin: e.regex.concat(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
          relevance: 2
        }, { begin: /\[.+?\]\([./?&#].*?\)/, relevance: 1 }, {
          begin: /\[.*?\]\(.*?\)/, relevance: 0
        }], returnBegin: !0, contains: [{
          match: /\[(?=\])/
        }, {
          className: "string", relevance: 0, begin: "\\[", end: "\\]", excludeBegin: !0,
          returnEnd: !0
        }, {
          className: "link", relevance: 0, begin: "\\]\\(", end: "\\)",
          excludeBegin: !0, excludeEnd: !0
        }, {
          className: "symbol", relevance: 0, begin: "\\]\\[",
          end: "\\]", excludeBegin: !0, excludeEnd: !0
        }]
      }, i = {
        className: "strong", contains: [],
        variants: [{ begin: /_{2}(?!\s)/, end: /_{2}/ }, { begin: /\*{2}(?!\s)/, end: /\*{2}/ }]
      }, s = {
        className: "emphasis", contains: [], variants: [{ begin: /\*(?![*\s])/, end: /\*/ }, {
          begin: /_(?![_\s])/, end: /_/, relevance: 0
        }]
      }, c = e.inherit(i, {
        contains: []
      }), t = e.inherit(s, { contains: [] }); i.contains.push(t), s.contains.push(c)
        ; let g = [n, a]; return [i, s, c, t].forEach((e => {
          e.contains = e.contains.concat(g)
        })), g = g.concat(i, s), {
          name: "Markdown", aliases: ["md", "mkdown", "mkd"], contains: [{
            className: "section", variants: [{ begin: "^#{1,6}", end: "$", contains: g }, {
              begin: "(?=^.+?\\n[=-]{2,}$)", contains: [{ begin: "^[=-]*$" }, {
                begin: "^", end: "\\n",
                contains: g
              }]
            }]
          }, n, {
            className: "bullet", begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
            end: "\\s+", excludeEnd: !0
          }, i, s, {
            className: "quote", begin: "^>\\s+", contains: g,
            end: "$"
          }, {
            className: "code", variants: [{ begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" }, {
              begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
            }, { begin: "```", end: "```+[ ]*$" }, {
              begin: "~~~", end: "~~~+[ ]*$"
            }, { begin: "`.+?`" }, {
              begin: "(?=^( {4}|\\t))",
              contains: [{ begin: "^( {4}|\\t)", end: "(\\n)$" }], relevance: 0
            }]
          }, {
            begin: "^[-\\*]{3,}", end: "$"
          }, a, {
            begin: /^\[[^\n]+\]:/, returnBegin: !0, contains: [{
              className: "symbol", begin: /\[/, end: /\]/, excludeBegin: !0, excludeEnd: !0
            }, {
              className: "link", begin: /:\s*/, end: /$/, excludeBegin: !0
            }]
          }]
        }
    }
  })()
  ; hljs.registerLanguage("markdown", e)
})();/*! `x86asm` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var s = (() => {
    "use strict"; return s => ({
      name: "Intel x86 Assembly",
      case_insensitive: !0, keywords: {
        $pattern: "[.%]?" + s.IDENT_RE,
        keyword: "lock rep repe repz repne repnz xaquire xrelease bnd nobnd aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63",
        built_in: "ip eip rip al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 cs ds es fs gs ss st st0 st1 st2 st3 st4 st5 st6 st7 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 k0 k1 k2 k3 k4 k5 k6 k7 bnd0 bnd1 bnd2 bnd3 cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d r0h r1h r2h r3h r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l db dw dd dq dt ddq do dy dz resb resw resd resq rest resdq reso resy resz incbin equ times byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr",
        meta: "%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif %if %ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep %endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment .nolist __FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ __UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend align alignb sectalign daz nodaz up down zero default option assume public bits use16 use32 use64 default section segment absolute extern global common cpu float __utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ __float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ __Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__"
      }, contains: [s.COMMENT(";", "$", { relevance: 0 }), {
        className: "number", variants: [{
          begin: "\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|(0[Xx])?[0-9][0-9_]*(\\.[0-9_]*)?(?:[pP](?:[+-]?[0-9_]+)?)?)\\b",
          relevance: 0
        }, { begin: "\\$[0-9][0-9A-Fa-f]*", relevance: 0 }, {
          begin: "\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[Hh]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b"
        }, {
          begin: "\\b(?:0[Xx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b"
        }]
      }, s.QUOTE_STRING_MODE, {
        className: "string", variants: [{
          begin: "'", end: "[^\\\\]'"
        }, { begin: "`", end: "[^\\\\]`" }], relevance: 0
      }, {
        className: "symbol", variants: [{
          begin: "^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)"
        }, {
          begin: "^\\s*%%[A-Za-z0-9_$#@~.?]*:"
        }], relevance: 0
      }, {
        className: "subst",
        begin: "%[0-9]+", relevance: 0
      }, { className: "subst", begin: "%!S+", relevance: 0 }, {
        className: "meta", begin: /^\s*\.[\w_-]+/
      }]
    })
  })(); hljs.registerLanguage("x86asm", s)
})();/*! `wasm` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      e.regex; const a = e.COMMENT(/\(;/, /;\)/)
        ; return a.contains.push("self"), {
          name: "WebAssembly", keywords: {
            $pattern: /[\w.]+/,
            keyword: ["anyfunc", "block", "br", "br_if", "br_table", "call", "call_indirect", "data", "drop", "elem", "else", "end", "export", "func", "global.get", "global.set", "local.get", "local.set", "local.tee", "get_global", "get_local", "global", "if", "import", "local", "loop", "memory", "memory.grow", "memory.size", "module", "mut", "nop", "offset", "param", "result", "return", "select", "set_global", "set_local", "start", "table", "tee_local", "then", "type", "unreachable"]
          }, contains: [e.COMMENT(/;;/, /$/), a, {
            match: [/(?:offset|align)/, /\s*/, /=/],
            className: { 1: "keyword", 3: "operator" }
          }, { className: "variable", begin: /\$[\w_]+/ }, {
            match: /(\((?!;)|\))+/, className: "punctuation", relevance: 0
          }, {
            begin: [/(?:func|call|call_indirect)/, /\s+/, /\$[^\s)]+/], className: {
              1: "keyword",
              3: "title.function"
            }
          }, e.QUOTE_STRING_MODE, {
            match: /(i32|i64|f32|f64)(?!\.)/,
            className: "type"
          }, {
            className: "keyword",
            match: /\b(f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))\b/
          }, {
            className: "number", relevance: 0,
            match: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/
          }]
        }
    }
  })(); hljs.registerLanguage("wasm", e)
})();/*! `objectivec` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = /[a-zA-Z@][a-zA-Z0-9_]*/, _ = {
        $pattern: n, keyword: ["@interface", "@class", "@protocol", "@implementation"]
      }
      ; return {
        name: "Objective-C",
        aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"], keywords: {
          "variable.language": ["this", "super"], $pattern: n,
          keyword: ["while", "export", "sizeof", "typedef", "const", "struct", "for", "union", "volatile", "static", "mutable", "if", "do", "return", "goto", "enum", "else", "break", "extern", "asm", "case", "default", "register", "explicit", "typename", "switch", "continue", "inline", "readonly", "assign", "readwrite", "self", "@synchronized", "id", "typeof", "nonatomic", "IBOutlet", "IBAction", "strong", "weak", "copy", "in", "out", "inout", "bycopy", "byref", "oneway", "__strong", "__weak", "__block", "__autoreleasing", "@private", "@protected", "@public", "@try", "@property", "@end", "@throw", "@catch", "@finally", "@autoreleasepool", "@synthesize", "@dynamic", "@selector", "@optional", "@required", "@encode", "@package", "@import", "@defs", "@compatibility_alias", "__bridge", "__bridge_transfer", "__bridge_retained", "__bridge_retain", "__covariant", "__contravariant", "__kindof", "_Nonnull", "_Nullable", "_Null_unspecified", "__FUNCTION__", "__PRETTY_FUNCTION__", "__attribute__", "getter", "setter", "retain", "unsafe_unretained", "nonnull", "nullable", "null_unspecified", "null_resettable", "class", "instancetype", "NS_DESIGNATED_INITIALIZER", "NS_UNAVAILABLE", "NS_REQUIRES_SUPER", "NS_RETURNS_INNER_POINTER", "NS_INLINE", "NS_AVAILABLE", "NS_DEPRECATED", "NS_ENUM", "NS_OPTIONS", "NS_SWIFT_UNAVAILABLE", "NS_ASSUME_NONNULL_BEGIN", "NS_ASSUME_NONNULL_END", "NS_REFINED_FOR_SWIFT", "NS_SWIFT_NAME", "NS_SWIFT_NOTHROW", "NS_DURING", "NS_HANDLER", "NS_ENDHANDLER", "NS_VALUERETURN", "NS_VOIDRETURN"],
          literal: ["false", "true", "FALSE", "TRUE", "nil", "YES", "NO", "NULL"],
          built_in: ["dispatch_once_t", "dispatch_queue_t", "dispatch_sync", "dispatch_async", "dispatch_once"],
          type: ["int", "float", "char", "unsigned", "signed", "short", "long", "double", "wchar_t", "unichar", "void", "bool", "BOOL", "id|0", "_Bool"]
        }, illegal: "</", contains: [{
          className: "built_in",
          begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
        }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
          className: "string", variants: [{
            begin: '@"', end: '"', illegal: "\\n",
            contains: [e.BACKSLASH_ESCAPE]
          }]
        }, {
          className: "meta", begin: /#\s*[a-z]+\b/, end: /$/,
          keywords: {
            keyword: "if else elif endif define undef warning error line pragma ifdef ifndef include"
          }, contains: [{ begin: /\\\n/, relevance: 0 }, e.inherit(e.QUOTE_STRING_MODE, {
            className: "string"
          }), {
            className: "string", begin: /<.*?>/, end: /$/, illegal: "\\n"
          }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
        }, {
          className: "class",
          begin: "(" + _.keyword.join("|") + ")\\b", end: /(\{|$)/, excludeEnd: !0, keywords: _,
          contains: [e.UNDERSCORE_TITLE_MODE]
        }, {
          begin: "\\." + e.UNDERSCORE_IDENT_RE,
          relevance: 0
        }]
      }
    }
  })(); hljs.registerLanguage("objectivec", e)
})();/*! `ini` grammar compiled for Highlight.js 11.7.0 */
(() => {
  var e = (() => {
    "use strict"; return e => {
      const n = e.regex, a = {
        className: "number",
        relevance: 0, variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: e.NUMBER_RE }]
      }, s = e.COMMENT(); s.variants = [{ begin: /;/, end: /$/ }, { begin: /#/, end: /$/ }]; const i = {
        className: "variable", variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, {
          begin: /\$\{(.*?)\}/
        }]
      }, t = { className: "literal", begin: /\bon|off|true|false|yes|no\b/ }, r = {
        className: "string", contains: [e.BACKSLASH_ESCAPE], variants: [{
          begin: "'''",
          end: "'''", relevance: 10
        }, { begin: '"""', end: '"""', relevance: 10 }, {
          begin: '"', end: '"'
        }, { begin: "'", end: "'" }]
      }, l = {
        begin: /\[/, end: /\]/, contains: [s, t, i, r, a, "self"],
        relevance: 0
      }, c = n.either(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/); return {
        name: "TOML, also INI", aliases: ["toml"], case_insensitive: !0, illegal: /\S/,
        contains: [s, { className: "section", begin: /\[+/, end: /\]+/ }, {
          begin: n.concat(c, "(\\s*\\.\\s*", c, ")*", n.lookahead(/\s*=\s*[^#\s]/)),
          className: "attr", starts: { end: /$/, contains: [s, l, t, i, r, a] }
        }]
      }
    }
  })()
  ; hljs.registerLanguage("ini", e)
})();