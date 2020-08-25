import ChartPlugin from './chartPlugin'

// 注册黑暗主题
import { 
  registerTheme,
  registerGeometry,
  registerGeometryLabel,
  registerGeometryLabelLayout,
  registerAnimation,
  registerComponentController,
  registerAction,
  registerInteraction } from '@antv/g2/lib/core';
import { antvDark } from '@antv/g2/lib/theme/style-sheet/dark';
import { createThemeByStylesheet } from '@antv/g2/lib/util/theme';
registerTheme('dark', createThemeByStylesheet(antvDark));

// 注册 G2 内置的 geometry
import Area from '@antv/g2/lib/geometry/area';
import Edge from '@antv/g2/lib/geometry/edge';
import Heatmap from '@antv/g2/lib/geometry/heatmap';
import Interval from '@antv/g2/lib/geometry/interval';
import Line from '@antv/g2/lib/geometry/line';
import Path from '@antv/g2/lib/geometry/path';
import Point from '@antv/g2/lib/geometry/point';
import Polygon from '@antv/g2/lib/geometry/polygon';
import Schema from '@antv/g2/lib/geometry/schema';

registerGeometry('Polygon', Polygon);
registerGeometry('Interval', Interval);
registerGeometry('Schema', Schema);
registerGeometry('Path', Path);
registerGeometry('Point', Point);
registerGeometry('Line', Line);
registerGeometry('Area', Area);
registerGeometry('Edge', Edge);
registerGeometry('Heatmap', Heatmap);

// 引入所有内置的 shapes
import '@antv/g2/lib/geometry/shape/area/line';
import '@antv/g2/lib/geometry/shape/area/smooth';
import '@antv/g2/lib/geometry/shape/area/smooth-line';

import '@antv/g2/lib/geometry/shape/edge/arc';
import '@antv/g2/lib/geometry/shape/edge/smooth';
import '@antv/g2/lib/geometry/shape/edge/vhv';

import '@antv/g2/lib/geometry/shape/interval/funnel';
import '@antv/g2/lib/geometry/shape/interval/hollow-rect';
import '@antv/g2/lib/geometry/shape/interval/line';
import '@antv/g2/lib/geometry/shape/interval/pyramid';
import '@antv/g2/lib/geometry/shape/interval/tick';

import '@antv/g2/lib/geometry/shape/line/step';

import '@antv/g2/lib/geometry/shape/point/hollow';
import '@antv/g2/lib/geometry/shape/point/image';
import '@antv/g2/lib/geometry/shape/point/solid';

import '@antv/g2/lib/geometry/shape/schema/box';
import '@antv/g2/lib/geometry/shape/schema/candle';

import '@antv/g2/lib/geometry/shape/polygon/square';

// 注册 Geometry 内置的 label
import GeometryLabel from '@antv/g2/lib/geometry/label/base';
import IntervalLabel from '@antv/g2/lib/geometry/label/interval';
import PieLabel from '@antv/g2/lib/geometry/label/pie';
import PolarLabel from '@antv/g2/lib/geometry/label/polar';

registerGeometryLabel('base', GeometryLabel);
registerGeometryLabel('interval', IntervalLabel);
registerGeometryLabel('pie', PieLabel);
registerGeometryLabel('polar', PolarLabel);

// 注册 Geometry label 内置的布局函数
import { distribute } from '@antv/g2/lib/geometry/label/layout/distribute';
import { limitInCanvas } from '@antv/g2/lib/geometry/label/layout/limit-in-canvas';
import { limitInShape } from '@antv/g2/lib/geometry/label/layout/limit-in-shape';
import { fixedOverlap, overlap } from '@antv/g2/lib/geometry/label/layout/overlap';

registerGeometryLabelLayout('overlap', overlap);
registerGeometryLabelLayout('distribute', distribute);
registerGeometryLabelLayout('fixed-overlap', fixedOverlap);
registerGeometryLabelLayout('limit-in-shape', limitInShape);
registerGeometryLabelLayout('limit-in-canvas', limitInCanvas);

// 注册需要的动画执行函数
import { fadeIn, fadeOut } from '@antv/g2/lib/animate/animation/fade';
import { growInX, growInXY, growInY } from '@antv/g2/lib/animate/animation/grow-in';
import { pathIn } from '@antv/g2/lib/animate/animation/path-in';
import { positionUpdate } from '@antv/g2/lib/animate/animation/position-update';
import { scaleInX, scaleInY } from '@antv/g2/lib/animate/animation/scale-in';
import { sectorPathUpdate } from '@antv/g2/lib/animate/animation/sector-path-update';
import { waveIn } from '@antv/g2/lib/animate/animation/wave-in';
import { zoomIn, zoomOut } from '@antv/g2/lib/animate/animation/zoom';

registerAnimation('fade-in', fadeIn);
registerAnimation('fade-out', fadeOut);
registerAnimation('grow-in-x', growInX);
registerAnimation('grow-in-xy', growInXY);
registerAnimation('grow-in-y', growInY);
registerAnimation('scale-in-x', scaleInX);
registerAnimation('scale-in-y', scaleInY);
registerAnimation('wave-in', waveIn);
registerAnimation('zoom-in', zoomIn);
registerAnimation('zoom-out', zoomOut);
registerAnimation('position-update', positionUpdate);
registerAnimation('sector-path-update', sectorPathUpdate);
registerAnimation('path-in', pathIn);

// 注册内置的 Component, 目前只支持 Axis 和 Legend 两个组件
import Axis from '@antv/g2/lib/chart/controller/axis';
import Legend from '@antv/g2/lib/chart/controller/legend';
import Tooltip from '@antv/g2/lib/chart/controller/tooltip';

// register build-in components
registerComponentController('axis', Axis);
registerComponentController('legend', Legend);
registerComponentController('tooltip', Tooltip);

import TooltipAction from '@antv/g2/lib/interaction/action/component/tooltip';
import ElmentActive from '@antv/g2/lib/interaction/action/element/active';

registerAction('tooltip', TooltipAction);
registerAction('element-active', ElmentActive);


// 注册 tooltip 的 interaction
registerInteraction('tooltip', {
  start: [
    { trigger: 'element:mousemove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
    { trigger: 'element:touchmove', action: 'tooltip:show', throttle: { wait: 50, leading: true, trailing: false } },
  ],
  end: [
    { trigger: 'element:mouseleave', action: 'tooltip:hide' },
    { trigger: 'element:leave', action: 'tooltip:hide' },
    { trigger: 'element:touchend', action: 'tooltip:hide' },
  ],
});

registerInteraction('element-active', {
  start: [{ trigger: 'element:mouseenter', action: 'element-active:active' }],
  end: [{ trigger: 'element:mouseleave', action: 'element-active:reset' }],
});

// 因为 typescript 部分版本不支持 export * as 语法。
import * as Types from '@antv/g2/lib/interface';
export { Types };

export default ChartPlugin
