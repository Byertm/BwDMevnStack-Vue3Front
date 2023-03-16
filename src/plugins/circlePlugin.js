(function (f) {
	function s(t) {
		this.init(t)
	}
	s.prototype = {
		value: 0,
		size: 100,
		startAngle: -Math.PI,
		thickness: "auto",
		fill: {
			gradient: ["#3aeabb", "#fdd250"]
		},
		emptyFill: "rgba(0, 0, 0, .1)",
		animation: {
			duration: 1200,
			easing: "circleProgressEasing"
		},
		animationStartValue: 0,
		reverse: !1,
		lineCap: "butt",
		insertMode: "prepend",
		constructor: s,
		el: null,
		canvas: null,
		ctx: null,
		radius: 0,
		arcFill: null,
		lastFrameValue: 0,
		init: function (t) {
			f.extend(this, t), this.radius = this.size / 2, this.initWidget(), this.initFill(), this.draw(), this.el.trigger("circle-inited")
		},
		initWidget: function () {
			this.canvas || (this.canvas = f("<canvas>")["prepend" == this.insertMode ? "prependTo" : "appendTo"](this.el)[0]);
			var t = this.canvas;
			if (t.width = this.size, t.height = this.size, this.ctx = t.getContext("2d"), 1 < window.devicePixelRatio) {
				var e = window.devicePixelRatio;
				t.style.width = t.style.height = this.size + "px", t.width = t.height = this.size * e, this.ctx.scale(e, e)
			}
		},
		initFill: function () {
			function t() {
				var t = f("<canvas>")[0];
				t.width = n.size, t.height = n.size, t.getContext("2d").drawImage(e, 0, 0, o, o), n.arcFill = n.ctx.createPattern(t, "no-repeat"), n.drawFrame(n.lastFrameValue)
			}
			var e, n = this,
				i = this.fill,
				r = this.ctx,
				o = this.size;
			if (!i) throw Error("The fill is not specified!");
			if ("string" == typeof i && (i = {
				color: i
			}), i.color && (this.arcFill = i.color), i.gradient) {
				var s = i.gradient;
				if (1 == s.length) this.arcFill = s[0];
				else if (1 < s.length) {
					for (var a = i.gradientAngle || 0, l = i.gradientDirection || [o / 2 * (1 - Math.cos(a)), o / 2 * (1 + Math.sin(a)), o / 2 * (1 + Math.cos(a)), o / 2 * (1 - Math.sin(a))], c = r.createLinearGradient.apply(r, l), h = 0; h < s.length; h++) {
						var u = s[h],
							d = h / (s.length - 1);
						f.isArray(u) && (d = u[1], u = u[0]), c.addColorStop(d, u)
					}
					this.arcFill = c
				}
			}
			i.image && (i.image instanceof Image ? e = i.image : (e = new Image).src = i.image, e.complete ? t() : e.onload = t)
		},
		draw: function () {
			this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value)
		},
		drawFrame: function (t) {
			this.lastFrameValue = t, this.ctx.clearRect(0, 0, this.size, this.size), this.drawEmptyArc(t), this.drawArc(t)
		},
		drawArc: function (t) {
			if (0 !== t) {
				var e = this.ctx,
					n = this.radius,
					i = this.getThickness(),
					r = this.startAngle;
				e.save(), e.beginPath(), this.reverse ? e.arc(n, n, n - i / 2, r - 2 * Math.PI * t, r) : e.arc(n, n, n - i / 2, r, r + 2 * Math.PI * t), e.lineWidth = i, e.lineCap = this.lineCap, e.strokeStyle = this.arcFill, e.stroke(), e.restore()
			}
		},
		drawEmptyArc: function (t) {
			var e = this.ctx,
				n = this.radius,
				i = this.getThickness(),
				r = this.startAngle;
			t < 1 && (e.save(), e.beginPath(), t <= 0 ? e.arc(n, n, n - i / 2, 0, 2 * Math.PI) : this.reverse ? e.arc(n, n, n - i / 2, r, r - 2 * Math.PI * t) : e.arc(n, n, n - i / 2, r + 2 * Math.PI * t, r), e.lineWidth = i, e.strokeStyle = this.emptyFill, e.stroke(), e.restore())
		},
		drawAnimated: function (n) {
			var i = this,
				r = this.el,
				t = f(this.canvas);
			t.stop(!0, !1), r.trigger("circle-animation-start"), t.css({
				animationProgress: 0
			}).animate({
				animationProgress: 1
			}, f.extend({}, this.animation, {
				step: function (t) {
					var e = i.animationStartValue * (1 - t) + n * t;
					i.drawFrame(e), r.trigger("circle-animation-progress", [t, e])
				}
			})).promise().always(function () {
				r.trigger("circle-animation-end")
			})
		},
		getThickness: function () {
			return f.isNumeric(this.thickness) ? this.thickness : this.size / 14
		},
		getValue: function () {
			return this.value
		},
		setValue: function (t) {
			this.animation && (this.animationStartValue = this.lastFrameValue), this.value = t, this.draw()
		}
	}, f.circleProgress = {
		defaults: s.prototype
	}, f.easing.circleProgressEasing = function (t) {
		return t < .5 ? .5 * (t *= 2) * t * t : 1 - .5 * (t = 2 - 2 * t) * t * t
	}, f.fn.circleProgress = function (r, t) {
		var o = "circle-progress",
			e = this.data(o);
		if ("widget" == r) {
			if (!e) throw Error('Calling "widget" method on not initialized instance is forbidden');
			return e.canvas
		}
		if ("value" != r) return this.each(function () {
			var t = f(this),
				e = t.data(o),
				n = f.isPlainObject(r) ? r : {};
			if (e) e.init(n);
			else {
				var i = f.extend({}, t.data());
				"string" == typeof i.fill && (i.fill = JSON.parse(i.fill)), "string" == typeof i.animation && (i.animation = JSON.parse(i.animation)), (n = f.extend(i, n)).el = t, e = new s(n), t.data(o, e)
			}
		});
		if (!e) throw Error('Calling "value" method on not initialized instance is forbidden');
		if (void 0 === t) return e.getValue();
		var n = t;
		return this.each(function () {
			f(this).data(o).setValue(n)
		})
	}
})