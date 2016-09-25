import THREE from 'three';
import PropTypes from 'react/lib/ReactPropTypes';

import Object3DDescriptor from '../Object3DDescriptor';
import propTypeInstanceOf from '../../../utils/propTypeInstanceOf';

class GridHelperDescriptor extends Object3DDescriptor {
  constructor(react3Instance) {
    super(react3Instance);

    this.hasProp('size', {
      type: PropTypes.number.isRequired,
      update: this.triggerRemount,
      default: 1,
    });

    this.hasProp('step', {
      type: PropTypes.number,
      update: this.triggerRemount,
      default: 1,
    });

    this.hasProp('colorCenterLine', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Color),
        PropTypes.number,
        PropTypes.string,
      ]),
      update: (grid, color) => {
        grid.setColors(color, grid.color2);
      },
      default: 0x444444,
      updateInitial: true,
    });

    this.hasProp('colorGrid', {
      type: PropTypes.oneOfType([
        propTypeInstanceOf(THREE.Color),
        PropTypes.number,
        PropTypes.string,
      ]),
      update: (grid, color) => {
        grid.setColors(grid.color1, color);
      },
      default: 0x888888,
      updateInitial: true,
    });
  }

  applyInitialProps(threeObject: THREE.Object3D, props) {
    super.applyInitialProps(threeObject, props);
  }

  construct(props) {
    const {
      size,
      step,
    } = props;
    return new THREE.GridHelper(size, step);
  }

  unmount(threeObject) {
    threeObject.geometry.dispose();
    threeObject.material.dispose();

    super.unmount(threeObject);
  }
}

module.exports = GridHelperDescriptor;