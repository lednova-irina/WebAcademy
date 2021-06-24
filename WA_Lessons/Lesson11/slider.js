function Slider({
  selector,
  loop = true,
  autorun = 0,
  animated = false,
  effect,
}) {
  this.props = {
    selector,
    loop,
    effect,
    autorun,
    animated,
  };

  this.state = {
    currentSlide: 0,
  };

  this.rootEl = document.querySelector(selector);

  if (!this.props.effect || !Slider.effects.includes(this.props.effect)) {
    const htmlEffect = Slider.effects.find((name) =>
      this.rootEl.classList.contains(name)
    );

    if (htmlEffect) {
      this.props.effect = htmlEffect;
    } else {
      this.props.effect = Slider.effects[0];
    }
  }

  this.bodyEl = this.rootEl.querySelector(".slider__body");
  this.stopOnClick = this.stopOnClick.bind(this);
  this.slideCollection = this.bodyEl.querySelectorAll(".slider__slide");
  this.prevBtn = this.rootEl.querySelector(".slider__prev");
  this.nextBtn = this.rootEl.querySelector(".slider__next");
  this.runBtn = this.rootEl.querySelector(".slider__run");
  this.stopBtn = this.rootEl.querySelector(".slider__stop");
  this.timeLineEl = this.rootEl.querySelector(".slider__timeline");

  if (this.prevBtn) {
    this.prevBtn.addEventListener("click", this.prevSlide.bind(this));
  }

  if (this.nextBtn) {
    this.nextBtn.addEventListener("click", this.nextSlide.bind(this));
  }

  if (this.props.effect) {
    this.render =
      this[
        `render${this.props.effect[0].toUpperCase()}${this.props.effect.slice(
          1
        )}`
      ];
  }

  if (this.timeLineEl && this.props.animated) {
    this.timeLineEl.classList.add("animated");

    if (this.props.autorun) {
      //   this.timeLineEl.style.animationDuration = `${this.props.autorun}s`;
      this.timeLineEl.style.setProperty(
        "--animationDuration",
        `${this.props.autorun}s`
      );
    }

    this.timeLineEl.addEventListener(
      "animationiteration",
      this.nextSlide.bind(this)
    );

    if (this.runBtn) {
      this.runBtn.addEventListener("click", this.startAnimation.bind(this));
      this.stopBtn.addEventListener("click", this.pauseAnimation.bind(this));
    }
  } else if (this.props.autorun > 0 && !this.props.animated) {
    setTimeout(() => this.run(), this.props.autorun * 1000);

    if (this.runBtn) {
      this.runBtn.addEventListener("click", this.startAnimation.bind(this));
      this.stopBtn.addEventListener("click", this.pauseAnimation.bind(this));
    } else {
      this.bodyEl.addEventListener("click", this.stopOnClick);
    }
  } else {
    this.runBtn.hidden = true;
    this.stopBtn.hidden = true;
  }
}

Slider.effects = ["slide", "fade"];

Slider.prototype.renderFade = function () {
  const { currentSlide } = this.state;
  const currentSlideEl = this.slideCollection[currentSlide];
  const showSlideEl = this.bodyEl.querySelector(".slider__current");

  if (showSlideEl !== currentSlideEl) {
    if (showSlideEl) {
      showSlideEl.classList.remove("slider__current");
    }
    currentSlideEl.classList.add("slider__current");
  }
};

Slider.prototype.renderSlide = function () {
  const { currentSlide } = this.state;

  this.bodyEl.style.transform = `translateX(${-currentSlide * 100}%)`;
};

Slider.prototype.stopAnimationIfLastSlide = function () {
  if (
    this.props.animated &&
    !this.props.loop &&
    this.state.currentSlide === this.slideCollection.length - 1
  ) {
    this.pauseAnimation();
  }
};

Slider.prototype.nextSlide = function () {
  this.showSlide(this.state.currentSlide + 1);
};

Slider.prototype.prevSlide = function () {
  this.showSlide(this.state.currentSlide - 1);
};

Slider.prototype.showSlide = function (slideIdx) {
  const slideCount = this.slideCollection.length;
  const { loop } = this.props;

  if (loop) {
    slideIdx = slideIdx % slideCount;
    if (slideIdx < 0) {
      slideIdx = slideCount + slideIdx;
    }
  } else {
    slideIdx = Math.max(0, Math.min(slideCount - 1, slideIdx));
  }

  this.state = {
    currentSlide: slideIdx,
  };
  this.render();
  this.stopAnimationIfLastSlide();
};

Slider.prototype.stopOnClick = function () {
  if (this._intervalID) {
    this.stop();
  } else {
    this.nextSlide();
    this.run();
  }
};

Slider.prototype.run = function () {
  this.nextSlide();
  this._intervalID = setInterval(
    this.nextSlide.bind(this),
    this.props.autorun * 1000
  );
};

Slider.prototype.stop = function () {
  if (this._intervalID) {
    clearInterval(this._intervalID);
    delete this._intervalID;
    // this.bodyEl.removeEventListener("click", this.stopOnClick);
  }
};

Slider.prototype.startAnimation = function () {
  this.timeLineEl.style.animationPlayState = "running";
};

Slider.prototype.pauseAnimation = function () {
  this.timeLineEl.style.animationPlayState = "paused";
};

const fadeSlider = new Slider({
  selector: ".slider.fade",
  loop: true,
  autorun: 5,
  animated: true,
  effect: "fade",
});
console.log(fadeSlider);
fadeSlider.showSlide(8);

const slideSlider = new Slider({
  selector: ".slider.slide",
  loop: false,
  animated: true,
});

console.log(slideSlider);
// slideSlider.showSlide(9);
