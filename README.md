### @antv/chart-node-g6

自定义 G6 图表节点的工具包。

在一些复杂的场景中，需要的节点类型也比较复杂，如在节点中展示某类数据的分布、趋势等，就像下面的节点：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*D00uR5wb__kAAAAAAAAAAABkARQnAQ' width=220 />

为了方便用户在使用 G6 自定义节点时支持统计图表，我们基于 G2 封装了 @antv/chart-node-g6 工具包，该工具包支持将 G6.registerNode / G6.registerEdge / G6.registerCombo 方法中的第二个参数 group 作为容器。除过不支持交互外，其他使用方式基本和 G2 的用法完全一致。

#### 自定义带有统计图表的节点
定义上面节点的代码如下所示。

```
import G6 from '@antv/g6'
import Chart from '@antv/chart-node-g6'

G6.registerNode('node-with-interval', {
  draw(cfg, group) {
    const keyShape = group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 400,
        height: 200,
        fill: cfg.style.fill
      }
    })

    group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 400,
        height: 40,
        fill: '#69c0ff'
      }
    })

    group.addShape('text', {
      attrs: {
        text: '浏览申请完成率',
        x: 10, 
        y:25,
        fontSize: 14,
        fill: '#fff' 
      }
    })

    group.addShape('text', {
      attrs: {
        text: '2020-06-07 ~ 2020-06-14 | 均值',
        x: 20,
        y: 70,
        fontSize: 13,
        fill: '#8c8c8c'
      }
    })

    group.addShape('text', {
      attrs: {
        text: '8.8%',
        x: 20,
        y: 110,
        fontSize: 30,
        fill: '#000'
      }
    })

    // 统计图表部分
    const view = new Chart({
      group,
      region: {
        start: {
          x: 0.01,
          y: 0.2
        },
        end: {
          x: 0.8,
          y: 0.35
        }
      },
    })
    
    
    view.data(cfg.trendData);
    
    view
      .interval()
      .position("genre*sold")
      .color("genre");
    
    view.legend("genre", false);
    
    view.scale({
      genre: {
        alias: "游戏种类" // 列定义，定义该属性显示的别名
      },
      sold: {
        alias: "销售量"
      }
    });

    view.axis('sold', false)
    
    view.render();

    keyShape.set('intervalView', view)

    return keyShape
  },
  update(cfg, item) {
    const keyShape = item.getKeyShape()
    const view = keyShape.get('intervalView')
    view.changeData(cfg.trendData)
  }
}, 'single-node')
```
