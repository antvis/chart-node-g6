import { View } from '@antv/g2'
import { IGroup } from '@antv/g-base';
import { ViewPadding, ViewAppendPadding, Options, LooseObject } from '@antv/g2/lib/interface';
import { GROUP_Z_INDEX } from '@antv/g2/lib/constant'

const getChartRegion = (
  params: {
    group: IGroup,
    width: number,
    height: number,
    x: number,
    y: number
  }) => {
  const {
    group,
    height,
    width,
    x,
    y
  } = params;

  const canvas = group.get('canvas');
  const canvasWidth = canvas.get('width');
  const canvasHeight = canvas.get('height');
  const region = {
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 0,
      y: 0
    }
  }
  region.start.x = x / canvasWidth;
  region.start.y = y / canvasHeight;
  region.end.x = (x + width) / canvasWidth;
  region.end.y = (y + height) / canvasHeight;
  return region;
} 

interface ChartPlugin {
  readonly group: IGroup;
  /** 图表的宽度和高度 */
  readonly width: number;
  readonly height: number;
  /** 图表的起始 x y 坐标 */
  readonly x?: number;
  readonly y?: number;
  /** 设置设备像素比，默认取浏览器的值 `window.devicePixelRatio`。 */
  readonly pixelRatio?: number;
  /**
   * 设置图表的内边距，使用方式参考 CSS 盒模型。
   * 下图黄色区域即为 padding 的范围。
   * ![](https://gw.alipayobjects.com/mdn/rms_2274c3/afts/img/A*pYwiQrdXGJ8AAAAAAAAAAABkARQnAQ)
   *
   * @example
   * 1. padding: 20
   * 2. padding: [ 10, 30, 30 ]
   */
  readonly padding?: ViewPadding;
  /**
   * 图表的内边距会在图表的padding的基础上加上appendPadding，使用方式参考 CSS 盒模型。
   * @example
   * 1. appendPadding: 20
   * 2. appendPadding: [ 10, 30, 30 ]
   */
  readonly appendPadding?: ViewAppendPadding;
  /**
   * chart 是否可见，默认为 true，设置为 false 则会隐藏。
   */
  readonly visible?: boolean;
  /**
   * 当使用配置项式创建 chart 时使用，详见 [配置项式创建图表教程](docs/tutorial/schema)。
   */
  readonly options?: Options;
  
  /** 是否对超出坐标系范围的 Geometry 进行剪切 */
  readonly limitInPlot?: boolean;
  /** 主题 */
  readonly theme?: LooseObject | string;
}

export default class G6ChartPlugin extends View {
  constructor(props: ChartPlugin) {
    const {
      // 给定一个默认值，否则更新时有问题
      padding = 1,
      appendPadding,
      visible,
      options,
      limitInPlot,
      theme,
      group,
      width,
      height,
      x = 0,
      y = 0
    } = props

    const container = group.get('canvas')

    const backgroundGroup = group.addGroup({ zIndex: GROUP_Z_INDEX.BG, name: 'plot' })
    const middleGroup = group.addGroup({ zIndex: GROUP_Z_INDEX.MID, name: 'plot' })
    const foregroundGroup = group.addGroup({ zIndex: GROUP_Z_INDEX.FORE, name: 'plot' })

    const region = getChartRegion({ group, width, height, x, y })

    super({
      parent: null,
      canvas: container,
      backgroundGroup,
      middleGroup,
      foregroundGroup,
      padding,
      appendPadding,
      visible,
      options,
      limitInPlot,
      theme,
      region
    })
  }

  /**
   * 改变图表大小，同时重新渲染。
   * @param width 图表宽度
   * @param height 图表高度
   * @returns
   */
  public changeSize(width: number, height: number) {
    this.canvas.changeSize(width, height);

    // 重新渲染
    this.render(true);

    return this;
  }

  /**
   * 销毁图表，同时解绑事件，销毁创建的 G.Canvas 实例。
   * @returns void
   */
  public destroy() {
    super.destroy();
    this.canvas.destroy();
  }

  /**
   * 显示或隐藏图表
   * @param visible 是否可见，true 表示显示，false 表示隐藏
   * @returns
   */
  public changeVisible(visible: boolean) {
    super.changeVisible(visible); // 需要更新 visible 变量
    return this;
  }
}