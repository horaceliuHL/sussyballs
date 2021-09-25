// properties and initial velocity
const defaultProps = {
  bounce: 0.75,
  radius: 50,
  color: "red",
};

export default class Ball {
  constructor(x = 0, y = 0, sceneProps, props) {
    this.props = {
      ...defaultProps,
      startVelX: Math.random() * 1 + 7 || -1,
      startVelY: (Math.random() * 2 + 10) * -0.5,
      ...props,
    };
    this.sceneProps = sceneProps;

    this.x = x;
    this.y = y;
    this.velX = this.props.startVelX;
    this.velY = this.props.startVelY;
  }

  draw(ctx, img) {
    const { x, y, props } = this;

    ctx.drawImage(img, x, y, props.radius, props.radius);
  }

  update() {
    const { props, sceneProps } = this;

    // // bottom bound / floor
    // if (this.y + props.radius >= sceneProps.height) {
    //   this.velY *= -props.bounce;
    //   this.y = sceneProps.height - props.radius;
    //   this.velX *= sceneProps.friction;
    // }
    // // top bound / ceiling
    // if (this.y - props.radius <= 0) {
    //   this.velY *= -props.bounce;
    //   this.y = props.radius;
    //   this.velX *= sceneProps.friction;
    // }

    // if (this.x === 0 || this.x === 1000) console.log(this.y);

    // left bound
    if (this.x - props.radius <= 0) {
      this.velX *= -props.bounce;
      this.x = props.radius;
    }
    // right bound
    if (this.x + props.radius >= sceneProps.width + 5) {
      this.velX *= -props.bounce;
      this.x = sceneProps.width - props.radius;
    }

    // reset insignificant amounts to 0
    if (this.velX < 0.01 && this.velX > -0.01) {
      this.velX = 0;
    }
    if (this.velY < 0.01 && this.velY > -0.01) {
      this.velY = 0;
    }

    // update position
    this.velY += sceneProps.gravity;
    this.x += this.velX;
    this.y += this.velY;
  }
}
