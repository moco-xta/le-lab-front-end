export const mocoHeliumData = {
  physics: {
    gravity: {
      x: 0,
      y: 0.05,
      z: 0,
    },
    addForce: {
      intensity: 0.005,
      zThreshold: 0.5,
    },
  },
  wrapper: {
    args: {
      isDesktop: {
        width: 2.7,
        height: 1.1,
        depth: 0.83,
      },
      isMobile: {
        width: 1.6,
        height: 2.2,
        depth: 0.85,
      },
    },
    material: {
      opacity: 0.2,
    },
  },
  balloons: {
    position: {
      group: {
        x: 0.12,
        y: 0,
        z: 0,
      },
      m: {
        isDesktop: {
          x: -0.96,
          y: 0,
          z: 0,
        },
        isMobile: {
          x: -0.48,
          y: 0.55,
          z: 0,
        },
      },
      o1: {
        isDesktop: {
          x: -0.32,
          y: 0,
          z: 0,
        },
        isMobile: {
          x: 0.32,
          y: 0.55,
          z: 0,
        },
      },
      c: {
        isDesktop: {
          x: 0.32,
          y: 0,
          z: 0,
        },
        isMobile: {
          x: -0.32,
          y: -0.55,
          z: 0,
        },
      },
      o2: {
        isDesktop: {
          x: 0.96,
          y: 0,
          z: 0,
        },
        isMobile: {
          x: 0.32,
          y: -0.55,
          z: 0,
        },
      },
    },
    rotation: {
      y: 33,
    },
  },
}
